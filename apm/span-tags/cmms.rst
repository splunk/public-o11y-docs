.. _cmms:

*******************************************************
Generate a Monitoring MetricSet with a custom dimension
*******************************************************

.. meta::
   :description: Learn how to generate a Monitoring MetricSet with a custom dimension. 

Generate Monitoring MetricSets (MMS) with custom dimensions to glean meaningful insights about your services in real time. Splunk APM automatically provides a set of Monitoring MetricSets by default, but you can configure additional MetricSets using indexed span tags and processes as custom dimensions. You can use your Monitoring MetricSets to create custom charts, dashboards, and detectors to keep track of what matters most to your team.

Prerequisites 
==============

* You need to be a Splunk Observability Cloud Administrator. 

* To create a new Monitoring MetricSet based on a span tag or process, you need to first index the span tag or process. See :ref:`apm-index-span-tags`. 

* (Optional) If you are unfamiliar with Monitoring Metric Sets and Troubleshooting Metric Sets, start here:  :ref:`apm-metricsets`. 

* (Optional) Review :ref:`metrics-dimensions-mts` for an overview of the concepts underpinning MetricSets. 



How custom Monitoring MetricSets add value to your organization
======================================================================

APM generates a collection of MMS by default; see :ref:`mms-dimensions`. You can create additional MMS with custom dimensions to filter and aggregate the default generated metrics by a specific indexed span tag or process such as ``version`` or ``cloud.provider``.

You can create custom MMS at the service level and the endpoint (span) level. When you create a custom dimension for a service-level MMS, APM generates MMS that include the six service-level metrics listed in :ref:`service-mms`, with your chosen indexed span tag or process as a custom dimension. If you select to add endpoint-level metrics as well, APM generates MMS that include the six span-level metrics listed in :ref:`endpoint-mms`, with your chosen indexed span tag or process as a custom dimension. 

When you create an MMS with a custom dimension, you can use this custom dimension to create charts, dashboards, and alerts by leveraging the Infrastructure Monitoring platform. 

To learn more about a specific scenario for custom MMS: :ref:`custom-metricset`.

How to generate a Monitoring MetricSet with a custom dimension 
====================================================================

Before you generate an MMS, first consider:

* How you want to allocate the cardinality of your data to make your MMS most efficient. 
* Your organization's cardinality limits. See :ref:`troubleshoot-mms` for guidance on editing your MetricSet configuration to optimize your overall cardinality.

.. _mms-conf:

Select how you want to configure your Monitoring MetricSet
------------------------------------------------------------------

You can generate a Monitoring MetricSet in three ways:

* service-level MMS only
* endpoint-level MMS for specific endpoints within a given service
* orient both service-level MMS and endpoint-level MMS for all endpoints within a service

Choose the best option for your needs to allocate your organization's cardinality entitlement efficiently. See :ref:`reduce-cardinality` to learn more. 

You can also filter by specific tag values to further reduce the cardinality of your MMS. All custom MMS include service-level metrics. In addition, you can generate endpoint-level metrics.


.. list-table::
   :header-rows: 1
   :widths: 15 50

   * - :strong:`Option`
     - :strong:`Guidance`
   * - service-level MMS and endpoint-level MMS for all endpoints within a service
     -  This option creates a custom dimensionalized MMS for each selected service, as well as an MMS for each endpoint in each selected service. This is the highest cardinality option. 
   * - service-level MMS and endpoint-level MMS for specific endpoints
     - This option creates a custom dimensionalized MMS for each selected service and an MMS for specific endpoints you select. In the box labeled :guilabel:`Endpoint Filters, provide a list of endpoints or a regular expression pattern to generate MMS for specific endpoints you're interested in. This helps you to minimize unnecessary cardinality.`.
   * - Service-level MMS only
     - This option creates an MMS for each selected service and no endpoint-level MMS. This is the lowest cardinality option. 


Scope of Monitoring MetricsSets 
---------------------------------------------------------------

You can create custom MMS for endpoints (metrics starting with ``span*``) and services (metrics starting with ``service.request.*``), but not for workflows (metrics starting with ``workflow*``) or traces (metrics starting with ``trace*``) at this time. Custom MMS aren't supported for global tags.

Add a Monitoring MetricSet
------------------------------

Follow these steps to create a Monitoring MetricSet. 

1. To get to the :guilabel:`APM MetricSets` page, do one of the following: 
  
   a. In Splunk APM, select :guilabel:`APM Configuration` and select :guilabel:`APM MetricSets` from the menu. The APM MetricSets page opens.
   b. From anywhere in Splunk Observability Cloud, select :guilabel:`Settings` in the left navigation bar and select :guilabel:`APM MetricSets` under :guilabel:`Data Configuration`.   

2. On the :guilabel:`APM MetricSets` page, you have two options:
    
   * If you have already indexed the span tag or process you are interested in, it appears in the list of MetricSets and is already generating Troubleshooting MetricSets. Select the edit icon for that span tag to open the :guilabel:`Edit MetricSet` dialog box and add a Monitoring MetricSet to your configuration using the following steps. 
   * If you haven't already indexed the tag or process, select :strong:`New MetricSet`. Enter the :strong:`Name` of a span tag or process you want to index. Then continue with the following steps.

3. The :strong:`Scope` determines how APM associates the span tag or process with services in a trace. Enter the service or services for which you want to create a Monitoring MetricSet in the :guilabel:`Service` field. You can only create custom dimensionalized MMS for service-level indexed span tags. You can't create custom MMS for globally indexed span tags. 

4. In the :guilabel:`Add MetricSet` or :guilabel:`Edit MetricSet` dialog box, select the check box for :strong:`Also Create Monitoring MetricSet`.

      .. image:: /_images/apm/span-tags/cmms-modal.png
        :width: 70%
        :alt: This image shows the MetricSet creation dialog box. 


5. Select how you want to add tag or process data to your Monitoring MetricSet from the dropdown. See :ref:`mms-conf` for more details. 
    a. :guilabel:`Service and all endpoint MMS:` Create an MMS for each selected service, as well as an MMS for each endpoint in each selected service. 
    b. :guilabel:`Service and specific endpoint MMS:` Create an MMS for each selected service and an MMS for specific endpoints you select. To add :guilabel:`Endpoint Filters`, provide a list of endpoints or a regular expression pattern to generate MMS for specific the endpoints you're interested in. 
    c. :guilabel:`Service MMS only:` Create an MMS for each selected service and no endpoint-level MMS. 

6. (Optional) In the field labeled :guilabel:`Filter by tag values`, add tag filters to narrow the scope of your MMS to include only data associated with the tag values you enter. This can help further reduce cardinality in your MetricSets.

7. Select :strong:`Start Analysis` to submit the configuration. Splunk APM runs an analysis of the span tag or process to calculate the potential cardinality contribution of the MetricSet to determine whether it is within your entitlement limit. 

8. Your new metric set shows under :strong:`Pending MetricSets` section of the table with an :guilabel:`Analyzing` status while the cardinality check runs. You might have to wait a few moments for the check to run. 

   .. caution:: Your pending MetricSet expires after one hour. If your MetricSet times out before you enable it, rerun the analysis. 

9.  After the cardinality check has run, review the cardinality and enable your new MetricSet.

   * If the cardinality impact of indexing this new MetricSet is acceptable, select the check mark under :guilabel:`Actions` to enable your Troubleshooting MetricSet. 
   * If the check times out before you enable the MetricSet, rerun the analysis.
   * If the check shows as failed, your cardinality is too high to create the new MetricSet. You can edit the MetricSet to adjust the configuration to reduce cardinality or you can select the x to delete the pending Metricset.

   The following example shows a cardinality check. 

   .. image:: /_images/apm/span-tags/cardinality-check-APM.png
      :width: 60%
      :alt: This image shows the cardinality check for a Monitoring MetricSet. 

.. note:: Splunk APM replaces dots with underscores in dimension names for MMS time series.

Set up charts, dashboards, and alerts for custom dimensions
==================================================================
You can create charts, dashboards, and alerts based on your custom Monitoring MetricSet by leveraging the Infrastructure Monitoring platform. 

To use the custom dimensionalized Monitoring MetricSets you have created, apply the filter ``sf_dimensionalized:true``. This filters out the metrics generated by the default Monitoring Metricset. To filter your metrics even more, use the new dimension you have created which is the tag name.

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

To prevent overcounting metrics in aggregations, the built-in dashboards and charts in Splunk APM automatically exclude custom dimensionalized MMS. 
Custom dimensionalized MMS have a marker dimension, ``sf_dimensionalized: true``, to enable this filtering.

When you create your dashboards and charts, you can exclude custom dimensionalized MMS by adding a filter on ``!sf_dimensionalized: true``. 
If you want to look at the time series of a custom dimensionalized MMS in your charts, filter on ``sf_dimensionalized: true`` and then aggregate by the custom dimension you want to look at. 

The following tables provide the metrics and dimensions for MMS based on services, workflows, spans, and traces:

.. _service-mms: 

Service metrics and dimensions
---------------------------------

.. list-table::
   :header-rows: 1

   * - :strong:`Metrics`
     - :strong:`Dimensions`

   * - - ``service.request.count``
       - ``service.request.duration.ns.min``
       - ``service.request.duration.ns.median``
       - ``service.request.duration.ns.max``
       - ``service.request.duration.ns.p90``
       - ``service.request.duration.ns.p99``
     - - ``sf_environment``
       - ``sf_service``
       - ``sf_error``

Workflow metrics and dimensions
---------------------------------

.. list-table::
   :header-rows: 1

   * - :strong:`Metrics`
     - :strong:`Dimensions`

   * - - ``workflows.count``
       - ``workflows.duration.ns.min``
       - ``workflows.duration.ns.median``
       - ``workflows.duration.ns.max``
       - ``workflows.duration.ns.p90``
       - ``workflows.duration.ns.p99``
     - - ``sf_environment``
       - ``sf_workflow``
       - ``sf_error``

.. _endpoint-mms:

Span (endpoint-level) metrics and dimensions
----------------------------------------------

.. list-table::
   :header-rows: 1

   * - :strong:`Metrics`
     - :strong:`Dimensions`

   * - - ``spans.count``
       - ``spans.duration.ns.min``
       - ``spans.duration.ns.median``
       - ``spans.duration.ns.max``
       - ``spans.duration.ns.p90``
       - ``spans.duration.ns.p99``
     - - ``sf_environment``
       - ``sf_service``
       - ``sf_operation``
       - ``sf_kind``
       - ``sf_error``
       - ``sf_httpMethod``, where relevant

Trace metrics and dimensions
---------------------------------

.. list-table::
   :header-rows: 1

   * - :strong:`Metrics`
     - :strong:`Dimensions`

   * - - ``traces.count``
       - ``traces.duration.ns.min``
       - ``traces.duration.ns.median``
       - ``traces.duration.ns.max``
       - ``traces.duration.ns.p90``
       - ``traces.duration.ns.p99``
     - - ``sf_environment``
       - ``sf_service``
       - ``sf_operation``
       - ``sf_httpMethod``
       - ``sf_error``
