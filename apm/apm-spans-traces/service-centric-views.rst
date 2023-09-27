:orphan:

.. _apm-service-centric-views:

.. admonition:: Preview: Service-centric views

    Preview features described in this document are provided by Splunk to you "as is" without any warranties, maintenance and support, or service-level commitments. Splunk makes this preview feature available in its sole discretion and may discontinue it at any time. These documents are not yet publicly available and we ask that you keep such information confidential. Use of preview features is subject to the :new-page:`Splunk Pre-Release Agreement for Hosted Services <https://www.splunk.com/en_us/legal/pre-release-agreement-for-hosted-services.html>`.
    
Use service-centric views for a complete view of your service performance 
*****************************************************************************

.. meta::
   :description: Learn how to use service-centric views in Splunk APM for a complete view of your service performance.

Service owners can use the service-centric view in Splunk APM to get a complete view of their service performance. To access service-centric views, select a service from the APM landing page.

Use the service metrics to monitor the performance of your service
=====================================================================

Use the following sections to monitor the performance of your service.

Overview
------------

Use the following metrics in the :guilabel:`Overview` section to monitor the performance of your service.

* :strong:`Availability service-level objective (SLO)` - The availablity service-level objective (SLO) shows the percentage of time your service was available in the last 30 days. The chart shows successful and unsuccessful requests.
* :strong:`Dependency map` - The dependency map shows the immediate upstream and downstream dependencies for the service you are viewing. 
* :strong:`Request rate` - The request rate chart shows streaming request data for the service. The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`Requests latency distribution` - The request latency distribution chart shows p50, p90, and p99 latency data for the service. The blue dot on the chart indicates the data is streaming, that is, you don't need to refresh to see new data.
* :strong:`Error rate` - The error rate chart shows streaming error data for the service. The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`Dependency time`
* :strong:`Top endpoints`- Top endpoints shows up to 5 endpoints for the service. Use the search field to search for specific endpoints. Use the sort drop-down list to change how endpoints are sorted. Select :guilabel:`Explore in APM` to navigate to Endpoint Performance.

Logs
------------

The :guilabel:`Logs` section shows unhandled, exception, traceback, and stacktrace logs. See :ref:`configure-service-view` for steps to modify the logs that are displayed. 

Runtime
-------------

* :strong:`Memory usage` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`Allocation rate` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`# Class loading` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`GC activity` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`GC overhead (%)` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`# Thread count` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`GC overhead (%)` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`# Thread count` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`# Thread pools` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.

Infrastructure
----------------

* :strong:`Host CPU usage` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`Host memory usage` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`Host disk usage` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`Host network usage` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`Pod CPU usage` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.
* :strong:`Pod network utilization (bytes/sec)` - The blue dot on the chart indicates the data is streaming. You don't need to refresh to see new data.

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

1. In the :guilabel:`Lob Observer Connection`` drop-down list, select the integration ID for the Log Observer Connect connection. To find your Lob Observer integration ID go to :guilabel:`Settings` then :guilabel:`Log Observer Connect`. Find the connection you want to pull logs from and :guilabel:`Update Connection` from the more menu (|more|). The integrationID displays in the URL. 
2. Enter the SPL for the logs you want to display in the :guilabel:`SPL Query` field.  
3. Select :guilabel:`Save Changes`.

You can configure a logs query for each unique service and environment combination. 






