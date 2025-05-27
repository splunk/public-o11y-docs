.. _cmms:

*******************************************************
Create a Monitoring MetricSet with a custom dimension
*******************************************************

.. meta::
   :description: Learn how to create a Monitoring MetricSet with a custom dimension. 

Create Monitoring MetricSets (MMS) with custom dimensions to monitor your services in real time. Splunk APM provides a default set of MMS, but you can configure additional MMS using indexed span tags to create custom dimensions. Use your custom MMS to create custom charts, dashboards, and detectors to track what matters most to your team. See :ref:`charts-dashboards-alerts`. 

What are MetricSets?
=========================

MetricSets are metric time series (MTS) you can use to track the performance of specific metrics over time. To help you analyze your service performance, APM provides 2 categories of MetricSets: Troubleshooting MetricSets (TMS) and Monitoring MetricSets (MMS). Use Troubleshooting MetricSets for high-cardinality troubleshooting. Use Monitoring MetricSets for real-time monitoring and alerting. 

APM provides a collection of MetricSets by default. You can also index additional span tags or processes to create additional TMS and, as part of the indexing process, you can opt to create custom dimensionalized Monitoring MetricSets (MMS). See :ref:`apm-MetricSets` for an overview of the types of MetricSets in APM and a list of the MetricSets available by default. 

Use this topic to learn how to index a span tag or process to create Monitoring MetricSets. See :ref:`apm-index-span-tags` to learn how to create Troubleshooting MetricSets. 

Prerequisites 
==============

* To create a custom MMS, you must have an admin role. 

* To create a custom MMS, you need to index the span tag or process that you want to base your MMS on. See :ref:`apm-index-span-tags`. 

* If you are unfamiliar with MetricSets, see :ref:`apm-metricsets`. 

* (Optional) Review :ref:`metrics-dimensions-mts` for an overview of the concepts underpinning MetricSets. 

Use custom Monitoring MetricSets to monitor important metrics 
======================================================================

In addition to the MMS APM creates by default, you can create additional MMS with custom dimensions to filter and aggregate the default created metrics by a specific indexed span tag or process such as ``version`` or ``cloud.provider``.

You can create custom MMS at the service level and the endpoint or span level. When you create a custom dimension for a service-level MMS, APM creates an MMS that includes the service-level metrics with your chosen indexed span tag or process as a custom dimension. If you add endpoint-level metrics, APM creates MMS that include span-level metrics, with your chosen indexed span tag or process as a custom dimension. 

When you create an MMS with a custom dimension, you can use the custom dimension to create charts, dashboards, and alerts. See :ref:`charts-dashboards-alerts`. 

To learn more about a specific scenario for custom MMS: :ref:`custom-metricset`.

Create a Monitoring MetricSet with a custom dimension for an instrumented service
=======================================================================================

Before you create an MMS, first consider:

* How you want to allocate the cardinality of your data to make your MMS most efficient. 
* Your organization's cardinality limits. See :ref:`troubleshoot-mms` for guidance on editing your MetricSet configuration to optimize your overall cardinality.

.. _mms-conf:

Select how you want to configure your Monitoring MetricSet
------------------------------------------------------------------

You can create a Monitoring MetricSet in 3 ways:

* service-level MMS only
* endpoint-level MMS for specific endpoints within a given service
* orient both service-level MMS and endpoint-level MMS for all endpoints within a service

Select the best option for your needs to allocate your organization's cardinality entitlement efficiently. See :ref:`Configure your MMS to be more efficient<reduce-cardinality>` to learn more. 

You can also filter by specific tag values to further reduce the cardinality of your MMS. 


.. list-table::
   :header-rows: 1
   :widths: 15 50

   * - :strong:`Option`
     - :strong:`Guidance`
   * - service-level MMS and endpoint-level MMS for all endpoints within a service
     -  This option creates a custom dimensionalized MMS for each selected service, as well as an MMS for each endpoint in each selected service. This is the highest cardinality option. 
   * - service-level MMS and endpoint-level MMS for specific endpoints
     - This option creates a custom dimensionalized MMS for each selected service and an MMS for specific endpoints you select. In the box labeled :guilabel:`Endpoint Filters`, provide a list of endpoints or a regular expression pattern to create MMS for specific endpoints you're interested in. This helps you to minimize unnecessary cardinality.
   * - Service-level MMS only
     - This option creates an MMS for each selected service and no endpoint-level MMS. This is the lowest cardinality option. 


Scope of Monitoring MetricsSets 
---------------------------------------------------------------

You can create custom MMS for endpoints (metrics starting with ``span*``) and services (metrics starting with ``service.request.*``), but not for workflows (metrics starting with ``workflow*``) or traces (metrics starting with ``trace*``) at this time. Custom MMS aren't supported for global tags. See :ref:`default-mms`.

Add a Monitoring MetricSet
------------------------------

Follow these steps to create a Monitoring MetricSet for an instrumented service:

1. To get to the :guilabel:`APM MetricSets` page, do one of the following: 
  
   a. In Splunk APM, select :guilabel:`APM Configuration` and select :guilabel:`APM MetricSets` from the menu. The APM MetricSets page opens.
   b. From anywhere in Splunk Observability Cloud, select :guilabel:`Settings` in the navigation bar and select :guilabel:`APM MetricSets` under :guilabel:`Data Configuration`.   

2. On the :guilabel:`APM MetricSets` page, you have 2 options:
    
   * If you have already indexed the span tag or process, it appears in the list of MetricSets and is already generating Troubleshooting MetricSets. Select the edit icon for that span tag to open the :guilabel:`Edit MetricSet` dialog box and add a Monitoring MetricSet to your configuration using the following steps. 
   * If you haven't already indexed the tag or process, select :strong:`New MetricSet`. Enter the :strong:`Name` of a span tag or process you want to index. Then continue with the following steps.

3. The :strong:`Scope` determines how APM associates the span tag or process with services in a trace. Enter the service or services for which you want to create a Monitoring MetricSet in the :guilabel:`Service` field. You can only create custom dimensionalized MMS for service-level indexed span tags. You can't create custom MMS for globally indexed span tags. 

4. In the :guilabel:`Add MetricSet` or :guilabel:`Edit MetricSet` dialog box, select the check box for :strong:`Also Create Monitoring MetricSet`.

      .. image:: /_images/apm/span-tags/cmms-modal.png
        :width: 70%
        :alt: This image shows the MetricSet creation dialog box. 

5. Select how you want to add tag or process data to your Monitoring MetricSet from the dropdown. See :ref:`mms-conf` for more details. 
    a. :guilabel:`Service and all endpoint MMS:` Create an MMS for each selected service, as well as an MMS for each endpoint in each selected service. 
    b. :guilabel:`Service and specific endpoint MMS:` Create an MMS for each selected service and an MMS for specific endpoints you select. To add :guilabel:`Endpoint Filters`, provide a list of endpoints or a regular expression pattern to create MMS for specific endpoints you're interested in. 
    c. :guilabel:`Service MMS only:` Create an MMS for each selected service and no endpoint-level MMS. 

6. (Optional) In the field labeled :guilabel:`Filter by tag values`, add tag filters to narrow the scope of your MMS to include only data associated with the tag values you enter. This can help further reduce cardinality in your MetricSets.

7. Select :strong:`Start Analysis` to submit the configuration. Splunk APM runs an analysis of the span tag or process to calculate the potential cardinality contribution of the MetricSet to determine whether it is within your entitlement limit. 

8. Your new MetricSet shows under :strong:`Pending MetricSets` section of the table with an :guilabel:`Analyzing` status while the cardinality check runs. You might have to wait a few moments for the check to run. 

   .. caution:: Your pending MetricSet expires after 1 hour. If your MetricSet times out before you activate it, run the analysis again. 

9.  After the cardinality check has run, review the cardinality and activate your new MetricSet.

    * If the cardinality impact of indexing this new MetricSet is within your subscription limit you see a green check mark and "Within Entitlement." Select the check mark under :guilabel:`Actions` to activate your Monitoring MetricSet. 
    * If the check times out before you activate the MetricSet, run the analysis again.
    * If the check shows as failed, your cardinality is over your subscription limit for MMS or is otherwise invalid. See :ref:`cardinality-check-tms`. For steps to configure your MetricSet to be more efficient or other troubleshooting solutions, see :ref:`troubleshoot-mms`.

   The following example shows a cardinality check. 

   .. image:: /_images/apm/span-tags/cardinality-check-APM.png
      :width: 60%
      :alt: This image shows the cardinality check for a Monitoring MetricSet. 

.. note:: For standard MMS Splunk APM replaces dots with underscores in dimension names for MMS time series. For histogram MMS underscores are preserved.
.. _inferred-service-mms:

Create a Monitoring MetricSet for an inferred service
=======================================================================================

.. note:: Only 3rd-party or uninstrumented HTTP services are supported for MMS.

Follow these steps to create a Monitoring MetricSet for an inferred service:

1. To get to the :guilabel:`APM MetricSets` page, do one of the following: 
  
   a. In Splunk APM, select :guilabel:`APM Configuration` and select :guilabel:`APM MetricSets` from the menu. The APM MetricSets page opens.
   b. From anywhere in Splunk Observability Cloud, select :guilabel:`Settings` in the navigation bar and select :guilabel:`APM MetricSets` under :guilabel:`Data Configuration`.   

2. On the :guilabel:`APM MetricSets` page, scroll to the :guilabel:`Inferred Service Monitoring MetricSets` section and select :guilabel:`Add Inferred Service MMS`.
3. Select the inferred service for which you want to create a Monitoring MetricSet. 
4. Select :guilabel:`Save`.
5. Your new MetricSet shows under :strong:`Pending MetricSets` section of the table with an :guilabel:`Analyzing` status while the cardinality check runs. You might have to wait a few moments for the check to run. 

   .. caution:: Your pending MetricSet expires after 1 hour. If your MetricSet times out before you activate it, run the analysis again. 

6.  After the cardinality check has run, review the cardinality and activate your new MetricSet.

    * If the cardinality impact of indexing this new MetricSet is within your subscription limit you see a green check mark and "Within Entitlement." Select the check mark under :guilabel:`Actions` to activate your Monitoring MetricSet. 
    * If the check times out before you activate the MetricSet, run the analysis again.
    * If the check shows as failed, your cardinality is over your subscription limit for MMS or is otherwise invalid. See :ref:`cardinality-check-mms`. 

.. _cardinality-check-mms:

Cardinality contribution of indexed span tags and processes
================================================================

When you index a new span tag or process to create Monitoring MetricSets, Splunk APM runs a cardinality contribution analysis to calculate the potential total cardinality contribution after indexing the span tag or process. This gives you control of what you index and helps you to account for organization subscription limits.

If you try to index a span tag or process that might increase the total cardinality contribution beyond your limit, you can change the existing cardinality contribution of indexed tags or processes for instrumented services by modifying or removing indexed span tags or processes.

To see your TMS subscription limit, go to :guilabel:`Settings` then :guilabel:`Subscription Usage`. Depending on your organization subscription, you might need to go to :guilabel:`Settings` then :guilabel:`Billing and Usage`. Select the :guilabel:`APM` tab and then select the :guilabel:`Monitoring MetricSets` panel to view your subscription limit for MMS. You must have an admin or usage role to view subscription limits. To learn more about APM usage and billing, see :ref:`apm-billing-usage-index`.

.. _charts-dashboards-alerts:

Set up charts, dashboards, and alerts for custom dimensions
==================================================================
You can create charts, dashboards, and alerts based on your custom Monitoring MetricSet. 

To use the custom dimensionalized Monitoring MetricSets you have created, apply the filter ``sf_dimensionalized:true``. This filters out the metrics created by the default Monitoring MetricSet. To filter your metrics even more, use the new dimension you have created which is the tag name you indexed.

.. list-table::
   :header-rows: 1
   :widths: 15, 50

   * - :strong:`Task`
     - :strong:`Documentation`
   * - Create charts
     - :ref:`create-charts`
   * - Create dashboards
     - :ref:`dashboard-create-customize`
   * - Create an alert 
     - :ref:`apm-alerts`
   * - Monitor services in APM dashboards 
     - :ref:`Track service performance using dashboards in Splunk APM<apm-dashboards>`

Metrics and dimensions of Monitoring MetricSets
===================================================

Each MMS has a set of metrics and dimensions for spans and traces you can use to monitor and alert on service performance. 

To prevent over counting metrics in aggregations, the built-in dashboards and charts in Splunk APM automatically exclude custom dimensionalized MMS. 
Custom dimensionalized MMS have a marker dimension, ``sf_dimensionalized: true``, to include custom dimensionalized MMS.

When you create your dashboards and charts, you can exclude custom dimensionalized MMS by adding a filter on ``!sf_dimensionalized: true``. 
If you want to look at the time series of a custom dimensionalized MMS in your charts, filter on ``sf_dimensionalized: true`` and then aggregate by the custom dimension you want to look at. 
