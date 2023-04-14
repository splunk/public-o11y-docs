.. _autodetect-splunk-op-apm:

Investigate a Splunk operational APM AutoDetect alert
****************************************************************************

There are three Splunk operational APM AutoDetect detectors that let you know when you reach certain limits within Splunk APM. 

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Detector
     - Description
     - Documentation
   
   * - Splunk operational - APM profiling messages are throttled 
     - Generates an alert when the number of profiling messages that are dropped due to throttling is above the specified threshold.
     - See :ref:`apm-autodetector-profile-msg-throttled` for more information about this detector.

   * - Splunk operational - APM spans are throttled
     - Generates an alert when the number of spans that are dropped due to throttling is above the specified threshold.
     - See :ref:`apm-autodetector-spans-throttled` for more information about this detector.

   * - Splunk operational - APM spans are blocked
     - Generates an alert when the number of blocked spans is above the specified threshold.
     - See :ref:`apm-autodetector-spans-blocked` for more information about this detector.


Here are some potential next steps after you receive an alert from one of a Splunk operational APM AutoDetect detectors: 

1. Identify when the alert threshold was exceeded.
2. Review additional metrics

Identify when the alert threshold was exceeded
================================================================= 

Open the APM Throttling dashboard.

#. In the navigation menu, select :guilabel:`Dashobards`.
#. Locate the Splunk Organization Metrics in the Built-in Dashboard Groups.
#. Select the :guilabel:`APM Throttling` dashboard. 
#. Review the following charts:
    #. Span drop due to ingest limits.
    #. Profiling throttling.
    #. Spans dropped because blocked
#. Use the filter, time window, and chart resolution as needed to better understand when your workload increased.
#. In the Chart Actions menu select :guilabel:`Troubleshoot this Time Window in (APM)` to further investigate.


Review additional metrics
===========================

, for example "byToken", to better understand what source is getting throttled - perhaps you have a separate token for staging, and a separate one for production. ... you can use the "byToken" metrics to see if there is anything interesting there.