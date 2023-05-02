.. _synth-alerts:

************************************************************
Set up detectors and alerts in Splunk Synthetic Monitoring
************************************************************

.. meta::
    :description: Learn about detectors alerting in Splunk Synthetic Monitoring.

In Splunk Observability Cloud, detectors monitor your tests and metrics for anomalies and generate alerts when problems arise. You can customize the alerting threshold, severity, notification method, recipients, and more. 

To learn more about advanced alerts and detectors in Splunk Observability Cloud, see :ref:`get-started-detectoralert`. Read on to learn about creating static threshold detectors specific to Synthetics. 

Use cases for detectors in Synthetics
=======================================

You can use detectors to alert on metrics at the test level, or at the page level or synthetic transaction level for Browser tests. The following table provides example use cases for detectors at each of these levels:

.. list-table::
   :header-rows: 1
   :widths: 25 75
  
   * - :strong:`Detector type`
     - :strong:`Use case`

   * - Test-level detectors
     - | Create test-level detectors to trigger alerts on metrics that correspond to the entire test.
       | 
       | For example, alert when the count of failed runs, % Uptime, or duration of the entire test exceeds a given threshold. 

   * - Page-level detectors
     - | In Browser tests, create page-level detectors to trigger alerts on metrics corresponding to a single page within a test. For example, alert when the DOM load time, largest contentful paint (LCP), or total image size on a given page exceeds a given threshold. 
       | 
       | If you don't scope your alerts to the page level for page-level metrics, the detector monitors the average metric value across pages. See :ref:`page-level-detector` to learn more.
  
   * - Transaction-level detectors
     - | In Browser tests, create synthetic transaction-level detectors to trigger alerts on metrics based on a synthetic transaction within a test. 
       | 
       | You can alert on the three transaction-level metrics that Splunk Synthetic Monitoring captures: Duration, Requests, and Size. See :ref:`transaction-level-detector` to learn more.

.. _synth-detector-setup:

Set up a detector for a Splunk Synthetic Monitoring test
==========================================================

You can set up a detector while initially creating or editing a test, or from the results view for a particular test. 

To set up a detector, do one of the following:

* While creating or editing a test, select :guilabel:`+ Create detector`. The detector dialog box opens.
* From the :guilabel:`Test results` page for a particular test, select :guilabel:`+ Create detector`. The detector dialog box opens.

Then, in the detector dialog box, do the following:

#. Check that you see the name of the test you want to monitor 
#. Type a name for your detector. 
#. Use the metric selector to select the metric you'd like to alert on. 
#. Use the condition selector to choose the default :guilabel:`Static threshold` alert condition. 
#. Use the :guilabel:`Scope alerts to` selector to scope the alerts by dimension. For Browser tests, you can use this selector to scope the detector to the entire test, a particular page within the test, or a particular synthetic transaction within the test. See the following sections for details:

    * :ref:`page-level-detector`
    * :ref:`transaction-level-detector`

#. In the :guilabel:`Alert details` section, enter the following:

    * :guilabel:`Trigger threshold`: The threshold the metric must exceed to trigger the alert
    * :guilabel:`Violates threshold`: How many times the threshold must be violated to trigger the alert
    * :guilabel:`Split by location`: Choose whether to split the detector by test location. If you don't filter by location, the detector monitors the average value across locations. 

#. Use the severity selector to select the severity of the alert.
#. Add recipients. 
#. (Optional) Add a URL to a runbook. 
#. Select :guilabel:`Activate`. 

.. _page-level-detector:

Create a page-level detector for a Browser test
----------------------------------------------------

To create a page-level detector, do the following while creating your detector:

#. While choosing a metric for the detector to alert on, select a metric that applies to the page level. Don't use metrics such as :guilabel:`Run Duration` or :guilabel:`Run count`, which apply to the entire Browser test run, not a specific page within the test.
#. Select the :guilabel:`+` button labeled :guilabel:`Scope alerts to`.
#. Under :guilabel:`Find a key`, select the ``page_position`` dimension.
#. Under :guilabel:`Find a value`, select the number corresponding to the page you want to monitor. Page position 0 is the first page your Browser test interacts with, position 1 is the second page in your test, and so on. 
#. Finish setting up your detector. See :ref:`synth-detector-setup` above. 

.. note:: 
  If you don't scope your alerts to a specific page for a page-level metric, the detector tracks the average metric value across all pages in your test. 

  If you select multiple pages, your detector monitors the aggregate metric value for the multiple pages you selected.

  If you want a detector monitoring the metric value for each of the pages in your test, create a separate detector for each page you want to monitor. 
  
.. _transaction-level-detector:

Create a transaction-level detector for a Browser test
---------------------------------------------------------

To create a transaction-level detector, do the following while creating your detector:

#. While choosing a metric for the detector to alert on, select one of the following transaction-level metrics:

    * Duration
    * Requests
    * Size

#. Select the :guilabel:`+` button labeled :guilabel:`Scope alerts to`.
#. Under :guilabel:`Find a key`, select the ``transaction`` or ``transaction_position`` dimension. Using the ``transaction`` dimension allows you to identify transactions by name rather than numerical position. 
#. Under :guilabel:`Find a value`, select the synthetic transaction you want to monitor.
#. Finish setting up your detector. See :ref:`synth-detector-setup` above. 

.. note:: 
  If you don't scope your alerts to a specific transaction for a transaction-level metric, the detector tracks the average metric value across all transactions in your test. 

  If you select multiple transactions, your detector monitors the aggregate metric value for the multiple transactions you selected.

  If you want a detector monitoring the metric value for each of the transactions in your test, create a separate detector for each transaction you want to monitor. 

See also
---------------------------------------------------------  

To learn more about synthetic transactions in Browser tests, see :ref:`set-up-transactional-browser-test`.


