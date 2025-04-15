.. _add-dsyms:

*********************************************************************
Add dSYMs
*********************************************************************


.. meta::
    :description: PLACEHOLDER.



This page explains how to upload your dSYMs, which allow Splunk RUM to convert memory addresses in backtraces from JavaScript app errors back into a human-readable form so that you can see the exact line of source code related to an error. This conversion is called symbolication. 

To upload dSYMs use the splunk-rum CLI. You can upload dSYMs from your main application code and from third-party frameworks, but not from system libraries. This means that all iOS backtraces will only be partially symbolicated.




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
