.. _synthetics-usage:

*********************************************************************
Synthetic Monitoring subscription usage 
*********************************************************************

.. meta::
   :description: Synthetic Monitoring subscription usage.

.. note:: The following information describes aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team.

Splunk Synthetic Monitoring offers metrics you can use to track your subscription usage. You can use these metrics to create charts, dashboards, and set alerts. 

Use the following to create your own charts, or search the Dashboards section of the platform for the ``Synthetic usage`` out-of-the-box dashboard, which will automatically start to populate after Synthetic tests start to run.



.. list-table:: 
   :widths: 25 25 
   :header-rows: 1

   * - :strong:`Metric`
     - :strong:`Description`
   * - ``synthetics.run.count``
     - Total number of synthetic runs by organization. To filter by test type:
        - ``test_type=browser``
        - ``test_type=API``
        - ``test_type=http`` 
        - ``test_type=port`` 


See also
==========

To learn more, see: 

* :ref:`browser-metrics`
* :ref:`uptime-metrics`
* :ref:`api-test-metrics`

