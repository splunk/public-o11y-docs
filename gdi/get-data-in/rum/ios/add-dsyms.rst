.. _add-dsyms:

*********************************************************************
Add dSYMs
*********************************************************************


.. meta::
    :description: Your uploaded dSYMs enable Splunk RUM to convert stack traces back into a human-readable form.



When you build your iOS application in release mode, your build process generates one or more debug symbol archives, commonly referred to simply as dSYMs. A dSYM stores debug symbols and exact offsets for a particular build of your application and its modules. With this detailed information, Splunk RUM can convert crash data for that specific build of your application version into readable reports labeled with function names and line numbers, showing what code was run, in what order, and where the crash happened. This conversion is called symbolication in iOS terminology. Different dSYMs symbolicate your applications's main application code, third-party frameworks, and system libraries.

The ``splunk-rum`` CLI compresses dSYM directories into .zip files for you and uploads them. When you upload a zipped dSYM  to Splunk RUM, you enable Splunk RUM to symbolicate the debug symbols contained within that dSYM.  This in turn enables you to view stack traces with the names of functions and offsets into those functions to help you identify the line of code that was executing when the application crashed.

You can upload dSYMs from your main application code and from third-party frameworks, but not from system libraries. This means that Splunk RUM does not yet support the symbolication of stack frames for system libraries.


Prerequisites
=====================================================================

Upgrade the following Splunk components:

SplunkOtelCrashReporting :  v0.7.0 

SplunkOtel : v0.13.0

Install the splunk-rum CLI.


Find dSYMs
=====================================================================

To locate the dSYMs directory for a specific release build:

Open Xcode Organizer (Xcode → Window → Organizer) and right-click (Command-click) on the version number of the archive for your release.

Select Show in Finder. 

In the Finder window that opens, right-click on the listed entry for your release, and select Show Package Contents. 
The window now shows the dSYMs/ directory, and you can drag that directory entry into a Terminal window to copy its path there for use with the splunk-rum command. If the path has spaces in it, you may need to enclose it in double quotes when invoking the command. For example, splunk-rum ios upload --path "<path-to-dsyms>"


Upload dSYMs
=====================================================================

To upload dSYMs use the splunk-rum CLI as follows.

Splunk recommends that you upload dSYMs to Splunk RUM before you distribute corresponding binaries. To ensure this, the best practice is to integrate the splunk-rum CLI into your CI pipeline so that whenever you archive your iOS application, your pipeline uploads the corresponding dSYMs to Splunk RUM.

Upload your application's dSYMs: 



splunk-rum ios upload --path <path-to-dSYMs-directory>
(Optional) Verify that your uploads succeeded: 



splunk-rum ios list
 

Syntax
---------------------------------------------------------------------

splunk-rum ios [command] [parameters]
Command descriptions



Command descriptions
---------------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Command`
     - :strong:`Description`

   * - ``sourcemaps inject --path <path-to-production-files> [optional-parameters]`` 
     -  Search ``<path-to-production-files>`` for source map/minified file pairs and compute a source map ID for each pair. Then, inject that source map ID into each minified file as a code snippet.

        Parameters:

        * PLACEHOLDER 
        * PLACEHOLDER
        * PLACEHOLDER 
        * PLACEHOLDER
        * PLACEHOLDER 
        * PLACEHOLDER
       

   * - ``sourcemaps upload --path <path-to-production-files> --realm <value> --token <value> [optional-parameters]``  
     - 
        * PLACEHOLDER
        * PLACEHOLDER
        * PLACEHOLDER 
        * PLACEHOLDER
        * PLACEHOLDER 
        * PLACEHOLDER
        * PLACEHOLDER 
        * PLACEHOLDER
