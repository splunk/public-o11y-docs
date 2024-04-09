.. _apm-service-view:
    
Use the service view for a complete view of your service health 
*****************************************************************************

.. meta::
   :description: Learn how to use service views in Splunk APM for a complete view of your service health.

Service owners can use the service view in Splunk APM to get a complete view of their service health in a single pane of glass. The service view includes availability, dependencies, request, error, and duration (RED) metrics, top endpoints, logs, runtime metrics, and infrastructure metrics for a selected service. 

.. note:: The service view is available for instrumented services that send spans with a service.name value.

Access the service view for your service
===========================================

You can access the service view for a specific service in several places.

You can search for the service using the search in the top toolbar.

..  image:: /_images/apm/spans-traces/service-view-global-search.gif
    :width: 95%
    :alt: Animation showing a user searching for the checkoutservice and selecting the service result. 

You can also access the service view for a specific service within the service map. Start by selecting :guilabel:`Service Map` on the APM landing page. Select a service in the service map, then select :guilabel:`Service view` in the panel.

..  image:: /_images/apm/spans-traces/service-view-service-map.png
    :width: 95%
    :alt: Screenshot of the service view button within the service map when a service is selected. 

Finally, you can also access the service view for a specific service by selecting the service from the APM landing page.

Use the service overview to monitor the health of your service
=====================================================================

When you open the service view an environment is selected based on your recently viewed environments. Adjust the environment and time range filters if necessary. Use the following sections to monitor the health of your service.

Service metrics
------------------

Use the following metrics in the :guilabel:`Service metrics` section to monitor the health of your service. Collapse sub-sections that are not relevant to you to customize your service view.

..  image:: /_images/apm/spans-traces/service-view-service-metrics.gif
    :width: 95%
    :alt: This animation shows the service metrics for a service in the service view. The user select a chart to view example traces.

* Availability SLI - The availability service-level indicator (SLI) shows the percentage of time your service was available in the last 30 days. The chart shows successful and unsuccessful requests. If you configured an availability service-level objective (SLO), a chart that displays availability over the compliance window you specified in your objective. See :ref:`create-slo`.
* Service map - The service map shows the immediate upstream and downstream dependencies for the service you are viewing. Hover over the chart and select :guilabel:`View full service map` to go to the service map.
* Service requests - The service requests chart shows streaming request data for the service. If you have detectors for the service requests configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Service latency - The service latency chart shows p50, p90, and p99 latency data for the service. If you have detectors for the service latency configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Service error - The service error chart shows streaming error data for the service. If you have detectors for the service error rate configured, triggered alerts display below the chart. Select the chart to view example traces. Select the alert icon to view alert details.
* Dependency latency by type - The dependency latency by type chart shows the latency for each of the downstream systems. Select the chart to see details about each system category. Systems are categorized as follows:
   *  Services - instrumented services
   *  Databases - not yet supported
   *  Inferred services - uninstrumented, inferred services
   *  Pub/sub queues - not yet supported

Runtime metrics
-----------------

Instrument your back-end applications to send spans to Splunk APM to view runtime metrics. The following runtime metrics are available for Java, Node.js, and .NET in the service view. See :ref:`get-started-application`.

* Memory usage
* Allocation rate
* Class loading
* GC activity
* GC overhead
* Thread count
* GC overhead
* Thread count
* Thread pools

Infrastructure metrics
-----------------------

The following infrastructure metrics are available:

* Host CPU usage
* Host memory usage
* Host disk usage
* Host network usage
* Pod CPU usage
* Pod memory utilization
* Pod disk usage
* Pod network utilization

View Tag Spotlight view for your service
=====================================================

Select :guilabel:`Tag Spotlight` to view Tag Spotlight view filtered for your service. See :ref:`apm-tag-spotlight` to learn more about Tag Spotlight.

View endpoints for your service
=================================

Select the :guilabel:`Endpoints` tab to view endpoints for the service. Use the search field to search for specific endpoints. Use the sort drop-down list to change how endpoints are sorted. Select an endpoint to view endpoint details or go to Tag Spotlight, traces, code profiling, or the dashboard for the endpoint.

View logs for your service
===============================

Select :guilabel:`Logs` to view logs for the environment and service you are viewing. 

.. note:: The environment must have a corresponding Log Observer Connect connection with at least 1 index for logs to display.

Go to the code profiling view for your service
=====================================================

Select :guilabel:`Code profiling` to go to the  code profiling view of AlwaysOn Profiling filtered for your service. See :ref:`profiling-intro` to learn more about AlwaysOn Profiling.

Go to the memory profiling view for your service
=======================================================

Select :guilabel:`Memory profiling` to go to the memory profiling view of AlwaysOn Profiling filtered for your service. See :ref:`profiling-intro` to learn more about AlwaysOn Profiling. 







