.. _add-mapping-file:

*********************************************************************
Add a mapping file
*********************************************************************


.. meta::
    :description: Your uploaded mapping file enables Splunk RUM to convert stack traces back into a human-readable form.


When you set the ``minifyEnabled`` property to true in your Android application source code, your build process minifies, optimizes, and obfuscates the code and generates a single mapping file, ``mapping.txt``. This mapping file contains the information Splunk RUM needs to convert stack traces containing obfuscated classes and filenames back into a human readable form. This conversion is called deobfuscation in Android.

Deobfuscation is available for Android application crashes only. 


 .. note::
    Make sure that the mapping file you upload to Splunk RUM matches the binary you deploy to production. To ensure this, the best practice is to integrate the ``splunk-rum`` usage into your CI pipeline so that whenever you re-build your Android application, you also re-upload its mapping file.


In order to associate a specific mapping file with a specific application build, Splunk RUM compares the ``applicationId`` and ``versionCode`` properties of the application to the parameters that you specify for the mapping file upload. You specify these parameters either as ``--app-id`` and ``--version-code`` in the ``splunk-rum android upload`` command or by including your application's merged or packaged manifest (``AndroidManifest.xml``), which includes these properties by default, in the ``splunk-rum android upload-with-manifest`` command. 


Prerequisites
=====================================================================

* Upgrade the following Splunk components:

  * :new-page:`SplunkOtelCrashReporting<https://github.com/signalfx/splunk-otel-ios-crashreporting>` :  v0.7.0 
  * :new-page:`SplunkOtel<https://github.com/signalfx/splunk-otel-ios>` : v0.13.0

* :ref:`Install the splunk-rum CLI<rum-gdi-install-cli>`.


Uploads for production builds
=====================================================================

#. Upload your application's mapping file and specify its ``applicationID`` and ``versionCode`` properties. 

   You can do this in either of these ways:

   * Run the ``upload`` command with the ``--app-id`` and ``--version-code`` parameters: 

     .. code-block:: shell

        splunk-rum android upload \
        --app-id=<applicationID> --version-code=<versionCode> \
        --path=<path-to-mapping-file> \
        [optional-parameters]

   * Run the ``upload-with-manifest`` command with the path to the application's merged or packaged ``AndroidManifest.xml`` file, along with path to the mapping file. Be sure to include the correct manifest, which is the one that's created when your application is built, and is located in the build output directory: 
     
     .. code-block:: shell

        splunk-rum android upload-with-manifest \
        --manifest <path-to-merged-manifest> \
        --path <path-to-mapping-file> \
        [optional-parameters]
       
       
       
#. (Optional) Verify that your upload succeeded:

    .. code-block:: shell

        splunk-rum android list --app-id=<applicationID>



Uploads for pre-production builds
=====================================================================

 If you're instrumenting pre-production builds where ``versionCode`` isn't updated for each build, add a unique identifier as metadata to the ``AndroidManifest.xml`` file in your source directory before building the application binary. This identifier must be named ``splunk.build_id``. To add this identifier, follow the steps below:


#. Add this snippet to the ``<application>`` block of the ``AndroidManifest.xml`` file in your source directory:

   .. code-block:: xml

      <meta-data
      android:name="splunk.build_id"
      android:value="${splunkBuildId}" />


#. Add the following code to the ``android {}`` block of the Gradle build script of your application. This code generates a new UUID for every application variant and adds it to the merged manifest file after the variant is assembled, where the Splunk RUM agent will retrieve it:

   * If you use Kotlin add this to ``build.gradle.kts``: 

     .. code-block:: 

        applicationVariants.configureEach {
            val uniqueBuildId = UUID.randomUUID().toString()
            this.mergedFlavor.manifestPlaceholders["splunkBuildId"] = uniqueBuildId

            logger.lifecycle("Splunk: Variant $name assigned build ID: $uniqueBuildId")

            val capitalizedVariantName = name.replaceFirstChar { it.uppercase() }
            tasks.named("process${capitalizedVariantName}Manifest").configure {
                outputs.upToDateWhen { false }
            }
        }


   * If you use Groovy add this to ``build.gradle``: 

     .. code-block:: 

        applicationVariants.configureEach { variant ->
            def uniqueBuildId = UUID.randomUUID().toString()
            variant.mergedFlavor.manifestPlaceholders.put("splunkBuildId", uniqueBuildId)

            project.logger.lifecycle("Splunk: Variant ${variant.name} assigned build ID: ${uniqueBuildId}")

            def capitalizedVariantName = variant.name.capitalize()
            tasks.named("process${capitalizedVariantName}Manifest").configure {
                outputs.upToDateWhen { false }
            }
        }


#. Upload your application's mapping file and specify its ``applicationID`` , ``versionCode``, and ``splunk.build_id`` properties. You can do this in either of these ways:

   * Run the upload command with the ``--app-id``, ``--version-code``, and ``--splunk-build-id`` parameters. This option only works if you added ``splunk.build_id`` to your Gradle build script (in step 1). Get the build ID from the Gradle build output or from the merged manifest:

      .. code-block:: shell

        splunk-rum android upload \
        --app-id=<applicationID> --version-code=<versionCode> \
        --splunk-build-id <value> \
        --path=<path-to-mapping-file> \
        [optional-parameters]


    * Run the ``upload-with-manifest`` command with the path to the application's merged or packaged ``AndroidManifest.xml`` file, along with path to the mapping file. Be sure to include the correct manifest, which is the one that's created when your application is built, and is located in the build output directory: 

      .. code-block:: shell

        splunk-rum android upload-with-manifest \
        --manifest <path-to-merged-manifest> \
        --path <path-to-mappping-file> \
        [optional-parameters]


#. (Optional) Verify that your upload succeeded:

   .. code-block:: shell

      splunk-rum android list --app-id=<applicationID>
 
 

Syntax
---------------------------------------------------------------------

.. code-block:: shell

    splunk-rum android [command] [parameters]



Command descriptions
---------------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Command`
     - :strong:`Description`

   * - ``upload --path <path> --app-id <value> --version-code <int> [optional-parameters]`` 
     -  Upload the mapping file ``mapping.txt`` with the application ID and version code that you specify.

        Parameters:

        * ``--path <path>`` Required. Path to the ``mapping.txt`` file. 
 
        * ``--app-id <applicationID>`` Required. The ``applicationId`` property in your application's ``build.gradle.kts`` file. 

        * ``--version-code <int>`` Required. The ``versionCode`` property of your application. 
 
        * ``--splunk-build-id <value>`` Optional. Splunk build ID for the upload.

        * ``--realm <value>`` Optional. Realm for your organization. For example, ``us0``. You can omit this parameter and set the environment variable ``SPLUNK_REALM`` instead.
 
        * ``--token <your-splunk-org-access-token>``  Optional. API access token. You can omit this parameter and set the environment variable ``SPLUNK_ACCESS_TOKEN`` instead.

        * ``--dry-run=[true|false]`` Perform a trial run with no changes made. Default: ``false``.

        * ``--debug`` Enable debug logs.

        * ``-h, --help`` Display help for this command.
     

   * - ``upload-with-manifest --manifest <path> --path <path> [optional-parameters]``  
     -  Upload the Android ``mapping.txt`` file with required metadata extracted from the ``AndroidManifest.xml`` file.

        Parameters:
        
        * ``--manifest <path>`` Required. Path to the merged or the packaged ``AndroidManifest.xml`` file that is generated when the application is built.

        * ``--path <path>`` Required. Path to the ``mapping.txt`` file.

        * ``--realm <value>`` Optional. Realm for your organization. For example, ``us0``.  You can omit this parameter and set the environment variable ``SPLUNK_REALM`` instead.
 
        * ``--token <your-splunk-org-access-token>`` Optional. API access token. You can omit this parameter and set the environment variable ``SPLUNK_ACCESS_TOKEN`` instead.

        * ``--dry-run=[true|false]`` Preview the file that will be uploaded and the parameters that will be extracted from ``AndroidManifest.xml``.
 
        * ``--debug`` Enable debug logs.

        * ``-h, --help`` Display help for command. 


   * - ``list --app-id <value> [optional-parameters]``  
     -  List the 100 most recently uploaded mapping files for the given application ID, sorted in reverse chronological order based on the upload timestamp.

        Parameters:
        
        * ``--app-id <applicationID>`` Required. The ``applicationId`` property in your app's ``build.gradle.kts`` file.

        * ``--realm <value>`` Optional. Realm for your organization. For example, ``us0``. You can omit this parameter and set the environment variable ``SPLUNK_REALM`` instead.

        * ``--token <your-splunk-org-access-token>`` Optional. API access token. You can omit this parameter and set the environment variable ``SPLUNK_ACCESS_TOKEN`` instead.

        * ``--dry-run=[true|false]`` Perform a trial run with no changes made. Default: ``false``.
 
        * ``--debug`` Enable debug logs.
 
        * ``-h, --help`` Display help for this subcommand.


