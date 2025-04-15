.. _add-dsyms:

*********************************************************************
Add dSYMs
*********************************************************************


.. meta::
    :description: PLACEHOLDER.



This page explains how to upload your dSYMs, which allow Splunk RUM to convert memory addresses in backtraces from JavaScript app errors back into a human-readable form so that you can see the exact line of source code related to an error. This conversion is called symbolication. 

To upload dSYMs use the splunk-rum CLI. You can upload dSYMs from your main application code and from third-party frameworks, but not from system libraries. This means that all iOS backtraces will only be partially symbolicated.