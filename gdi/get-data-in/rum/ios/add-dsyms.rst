.. _add-dsyms:

*********************************************************************
Add dSYMs
*********************************************************************


.. meta::
    :description: Your uploaded dSYMs enable Splunk RUM to convert stack traces back into a human-readable form.



When you build your iOS application in release mode, your build process generates one or more debug symbol archives, commonly referred to simply as dSYMs. A dSYM stores debug symbols and exact offsets for a particular build of your application and its modules. With this detailed information, Splunk RUM can convert crash data for that specific build of your application version into readable reports labeled with function names and line numbers, showing what code was run, in what order, and where the crash happened. This conversion is called symbolication in iOS terminology. Different dSYMs symbolicate your applications's main application code, third-party frameworks, and system libraries.

The ``splunk-rum`` CLI compresses dSYM directories into .zip files for you and uploads them. When you upload a zipped dSYM  to Splunk RUM, you enable Splunk RUM to symbolicate the debug symbols contained within that dSYM.  This in turn enables you to view stack traces with the names of functions and offsets into those functions to help you identify the line of code that was executing when the application crashed.

You can upload dSYMs from your main application code and from third-party frameworks, but not from system libraries. Splunk RUM does not yet support the symbolication of stack frames for system libraries.


Prerequisites
=====================================================================

* Upgrade the following Splunk components:

  * :new-page:`SplunkOtelCrashReporting<https://github.com/signalfx/splunk-otel-ios-crashreporting>` :  v0.7.0 
  * :new-page:`SplunkOtel<https://github.com/signalfx/splunk-otel-ios>` : v0.13.0

* :ref:`Install the splunk-rum CLI<rum-gdi-install-cli>`.


Find dSYMs
=====================================================================

To locate the dSYMs directory for a specific release build:

#. Open Xcode Organizer (in Xcode, select :guilabel:`Window` and then select :guilabel:`Organizer`).
#. Right-click (command-click) the version number of the archive for your release.
#. Select :guilabel:`Show in Finder`. 
#. In the Finder window that opens, right-click on the listed entry for your release, and select :guilabel:`Show Package Contents`.
   The window now shows the ``dSYMs/`` directory, and you can drag that directory entry into a Terminal window to copy its path there for use with the ``splunk-rum`` command. 


Upload dSYMs
=====================================================================

To upload dSYMs use the ``splunk-rum`` CLI as follows.

.. note::
    Splunk recommends that you upload dSYMs to Splunk RUM before you distribute corresponding binaries. To ensure this, the best practice is to integrate the ``splunk-rum`` CLI into your CI pipeline so that whenever you archive your iOS application, your pipeline uploads the corresponding dSYMs to Splunk RUM.


#. Upload your application's dSYMs: 

   .. code-block:: bash
    
    splunk-rum ios upload --path <path-to-dSYMs>

#. (Optional) Verify that your uploads succeeded:

   .. code-block:: bash
    
    splunk-rum ios list
 

Syntax
---------------------------------------------------------------------

.. code-block:: bash
    
    splunk-rum ios [command] [parameters]


Command descriptions
---------------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Command`
     - :strong:`Description`

   * - ``upload --path <path-to-dSYMs> [optional-parameters]`` 
     -  Upload dSYMs within the directory you specify. The directory may contain a single dSYM .zip file or multiple dSYMs, in which case this command will compress and upload all of them.

        Parameters:

        * ``--path <path-to-dSYMs>`` Required. Path to the directory containing dSYMs or a single ``dSYM.zip`` file. If the path has spaces in it, enclose it in double quotes. For example, ``--path "<path-to-dsyms>"``.
 
        * ``--realm <value>`` Optional. Realm for your organization. For example, ``us0``. You can omit this parameter and set the environment variable ``SPLUNK_REALM`` instead.

        * ``--token <your-splunk-org-access-token>`` Optional. API access token. You can omit this parameter and set the environment variable ``SPLUNK_ACCESS_TOKEN`` instead.

        * ``--dry-run=[true|false]`` Perform a trial run with no changes made. Default: ``false``.

        * ``--debug`` Enable debug logs.
 
        * ``-h, --help`` Display help for this command.
       

   * - ``list [optional-parameters]``  
     -  List the 100 most recently uploaded dSYMs, sorted in reverse chronological order based on the upload timestamp.

        Parameters:

        * ``--realm <value>`` Optional.  Realm for your organization. For example, ``us0``. You can omit this parameter and set the environment variable ``SPLUNK_REALM`` instead.

        * ``--token <your-splunk-org-access-token>`` Optional. API access token. You can omit this parameter and set the environment variable ``SPLUNK_ACCESS_TOKEN`` instead.

        * ``--dry-run=[true|false]`` Perform a trial run with no changes made. Default: ``false``.

        * ``--debug`` Enable debug logs.
 
        * ``-h, --help`` Display help for this command. 


