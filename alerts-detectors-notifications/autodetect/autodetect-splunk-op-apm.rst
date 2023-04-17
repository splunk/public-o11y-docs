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


Here are some potential next steps after you receive an alert from one of th Splunk operational APM AutoDetect detectors: 

#. :ref:`autodetect-apm-throttling-dash`
#. :ref:`autodetect-review-metrics`

.. _autodetect-apm-throttling-dash:

Review the data in the APM Throttling dashboard
===========================================================================================

Use the APM Throttling dashboard to identify when the alert threshold was first exceeded.

To open the APM Throttling dashboard follow these steps:

#. In the navigation menu, select :guilabel:`Dashobards`.
#. Locate the Splunk Organization Metrics in the Built-in Dashboard Groups.
#. Select the :guilabel:`APM Throttling` dashboard. 
#. Review the following charts:
    #. Span drop due to ingest limits.
    #. Profiling throttling.
    #. Spans dropped because blocked
#. Use the filter, time window, and chart resolution as needed to better understand when your workload increased.

Once you determine the timeline for the increased workload, consider what else happened at that time. Was there a release, for example? 

.. _autodetect-review-metrics:

Review additional metrics
===========================

In the APM Throttling dashboard use the ``ByToken`` metrics to better understand what source is getting throttled. Perhaps you have a separate tokens for staging and production. 

To open the APM Throttling dashboard follow these steps:

#. In the navigation menu, select :guilabel:`Dashobards`.
#. Locate the Splunk Organization Metrics in the Built-in Dashboard Groups.
#. Select the :guilabel:`APM Throttling` dashboard. 
#. Review the following charts:
    #. Span drop due to ingest limits - Compare the data for each token for more insight. 
    #. Profiling throttling - Compare the data for each token for more insight. 
    #. Spans dropped because blocked by token - Compare the data for each token for more insight. 
#. Use the filter, time window, and chart resolution as needed to better understand when your workload increased.

See also
===============

To learn how to customize an AutoDetect detector, see :ref:`autodetect-customize`.
