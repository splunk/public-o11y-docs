.. _apm-service-centric-views:

.. admonition:: Preview: Service-centric views
    
Use service views for a complete view of your service health 
*****************************************************************************

.. meta::
   :description: Learn how to use service views in Splunk APM for a complete view of your service health.

Service owners can use the service view in Splunk APM to get a complete view of their service health in a single pane of glass. The service view includes availability, dependencies, request, error, and duration (RED) metrics, top endpoints, logs, runtime metrics, and infrastructure metrics for a selected service. 

Access the service view for your service
===========================================

You can access the service view for a specific service within the service map. Start by selecting :guilabel:`Service Map` on the APM landing page. Select a service in the service map, then select :guilabel:`Service view` in the panel.

..  image:: /_images/apm/spans-traces/service-view-access.png
    :width: 95%
    :alt: Screenshot of the service view button within the service map when a service is selected. 

You can also access the service view for a specific service by selecting the service from the APM landing page.

Use the service metrics to monitor the health of your service
=====================================================================

Use the following sections to monitor the health of your service.

Overview
------------

Use the following metrics in the :guilabel:`Overview` section to monitor the health of your service. 

..  image:: /_images/apm/spans-traces/service-centric-view-overview.png
    :width: 95%
    :alt: This screenshot shows the overview metrics for a service in the service-centric view. 

* Availability service-level objective (SLO) - The availablity service-level objective (SLO) shows the percentage of time your service was available in the last 30 days. The chart shows successful and unsuccessful requests.
* Dependency map - The dependency map shows the immediate upstream and downstream dependencies for the service you are viewing. 
* Request rate - The request rate chart shows streaming request data for the service. If you have detectors for the service request rate configured, triggered alerts display below the chart. Select the chart to view example traces. The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* Requests latency distribution - The request latency distribution chart shows p50, p90, and p99 latency data for the service. If you have detectors for the service latency configured, triggered alerts display below the chart. Select the chart to view example traces. The blue dot on the chart indicates the data is streaming, that is, you don't need to refresh to see new data.
* Error rate - The error rate chart shows streaming error data for the service. If you have detectors for the service error rate configured, triggered alerts display below the chart. Select the chart to view example traces. The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* Dependency time - The dependency time chart shows the latency for each of the downstream systems. Select the chart to see details about each system category. Systems are categorized as follows:
   *  Internal - instrumented services
   *  External - uninstrumented, inferrred services
   *  Databases
   *  Queues
* Top endpoints- Top endpoints shows up to 5 endpoints for the service. Use the search field to search for specific endpoints. Use the sort drop-down list to change how endpoints are sorted. Select :guilabel:`Explore in APM` to navigate to Endpoint Performance.

..  image:: /_images/apm/spans-traces/service-centric-view-endpoints.png
    :width: 95%
    :alt: This screenshot shows the top endpoints for a service in the service-centric view. 

Logs
------------

Select :guilabel:`Configure Service View` to add a query for the logs you want to display for your service. See :ref:`configure-service-view` for steps.

..  image:: /_images/apm/spans-traces/service-centric-view-logs.png
    :width: 95%
    :alt: This screenshot shows the logs for a service in the service-centric view. 

Runtime
-------------

The following runtime metrics are available:

* Memory usage
* Allocation rate
* # Class loading
* GC activity
* GC overhead (%)
* # Thread count
* GC overhead (%)
* # Thread count
* # Thread pools

Infrastructure
----------------

The following infrastructure metrics are available:

* Host CPU usage
* Host memory usage
* Host disk usage
* Host network usage
* Pod CPU usage
* Pod network utilization (bytes/sec)
* Pod disk usage
* Pod network utilization (bytes/sec)

..  image:: /_images/apm/spans-traces/service-centric-view-infra-metrics.png
    :width: 95%
    :alt: This screenshot shows the infrastructure metrics for a service in the service-centric view. 

Navigate to the Tag Spotlight view for your service
=====================================================

Select :guilabel:`Tag Spotlight` to navigate to the Tag Spotlight view filtered for your service. See :ref:`apm-tag-spotlight` to learn more about Tag Spotlight.

Navigate to the code profiling view for your service
=====================================================

Select :guilabel:`Code profiling` to navigate to the code profiling view of AlwaysOn Profiling filtered for your service. See :ref:`profiling-intro` to learn more about AlwaysOn Profiling.

Navigate to the memory profiling view for your service
=======================================================

Select :guilabel:`Memory profiling` to navigate to memory profiling view of AlwaysOn Profiling filtered for your service. See :ref:`profiling-intro` to learn more about AlwaysOn Profiling. 

.. _configure-service-view:

Configure the service view
=====================================================================

Select :guilabel:`Configure Service View` to modify the query for the logs you want to display for your service. 

1. In the :guilabel:`Log Observer Connection` drop-down list, select the integration ID for the Log Observer Connect connection. To find your Log Observer integration ID go to :guilabel:`Settings` then :guilabel:`Log Observer Connect`. Find the connection you want to pull logs from and select :guilabel:`Update Connection` from the more menu (|more|). The integrationID displays in the URL. 
2. Enter the SPL for the logs you want to display in the :guilabel:`SPL Query` field. For example, the following SPL queries for unhandled, exception, stacktrace or error logs:

.. code-block:: 

    linecount>3 (unhandled OR exception OR traceback OR stacktrace OR error) 
    | rex field=_raw "^[\\d-]+\\s[\\d:]+\\s(?<method>\\w+)\\s(?<severity>\\w+)\\s(?<error_message>[^\\n]+)" 
    | timechart span=1m limit=5 count() by error_message

3. Select :guilabel:`Save Changes`.

You can configure a logs query for each unique service and environment combination. 







