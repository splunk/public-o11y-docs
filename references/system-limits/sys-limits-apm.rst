.. _apm-system-limits:

*******************************************************
Splunk APM system limits 
*******************************************************

.. meta:: 
  :description: Splunk APM has system limits that help ensure performance, stability, and reliability. These limits also protect the Splunk APM multitenant environment. Exceeding these limits might degrade your Splunk APM experience.


.. note:: The following information describes aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team.

Splunk APM has system limits that help ensure performance, stability, and reliability. These limits also protect the Splunk APM multitenant environment. Exceeding these limits might degrade your Splunk APM experience.

There are several out-of-the-box charts in Splunk Observability Cloud for the metrics described below. Admins can view these charts by navigating to :guilabel:`Settings > Organization Overview`.

.. _subscription-apm:

Subscriptions 
==========================

There are two types of subscriptions: Enterprise and Standard. For more information on each type of subscription, see :new-page:`Splunk APM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-apm>`.


Span and trace limits 
========================
.. list-table::
   :header-rows: 1
   :widths: 15, 15, 70

   * - :strong:`Limit name`
     - :strong:`Default limit value`
     - :strong:`Notes`
   * - Bytes per Minute (BPM)
     - Determined by your :ref:`subscription <subscription-apm>`. 
     - Also known as trace volume. Spans are dropped after you reach the limit. 
   * - Spans Per Minute (SPM)
     - Determined by your :ref:`subscription <subscription-apm>`. 
     - Maximum number of spans per minute that Splunk APM ingests and analyzes. Spans are dropped after you reach the limit. 
   * - Span size 
     - 64kB
     - The maximum volume of an individual span in kB. Spans, and the contents of each span, are dropped and not analyzed by Splunk APM after you reach the limit.  
   * - Number of spans in a trace
     - 100,000 spans per trace
     - Spans are dropped after you reach the limit. 
   * - Trace size 
     - 16 MB
     - Spans are dropped from traces that exceed the 16 MB limit and are not analyzed by Splunk APM.  
   * - Span accumulation duration
     - 10 minutes
     - When a specific trace ID reaches this limit, subsequent spans are grouped into another trace segment. Exceeding the limit leads to suboptimal trace-based analysis for inferred services, failure root cause metrics and workflow metrics, but no spans or traces exceeding this limit are dropped. 
   * - Trace assembly delay
     - 60s 
     - Time from last span arrival for a traceId to trace assembly completed.
   * - Splunk APM API requests
     - 10 requests per min 
     - Requests return a 429 HTTP error status code when limits are throttled. 


MetricSet limits 
==================================

.. list-table::
  :header-rows: 1
  :widths: 15, 15, 70

  * - :strong:`Limit name`
    - :strong:`Default limit value`
    - :strong:`Notes`
  * - Troubleshooting MetricSets (TMS)
    - Determined by your :ref:`subscription <subscription-apm>`. Total maximum of two TMS per 10-second interval.
    - Spans and traces aren't dropped. Span tag analysis views, service graph breakdowns and trace visibility might be affected.
  * - Monitoring MetricSets (MMS) 
    - Determined by your :ref:`subscription <subscription-apm>`. 
    - Spans and traces aren't dropped. Alerting and charting on new MMS might be affected.


UI limits 
==================================


.. list-table::
  :header-rows: 1
  :widths: 70,30

  * - :strong:`Limit name`
    - :strong:`Default limit value`
  * - Number of nodes in the service map
    - 500
  * - Number of traces in trace search 
    - 1000
  * -  Number of spans per trace in trace view
    - 100k
  * - Length of service name
    - 1024 characters
  * - Length of operation name 
    - 1024 characters
  * - “Yellow” threshold for error rate
    - 5%
  * - “Red” threshold for error rate
    - 20%
  * - “Red” threshold for p90 latency
    - 1s


APM dashboards for throttling and entitlements 
============================================================================

.. note:: These dashboards are for troubleshooting purposes only. For more information, refer to the Subscription Usage page and reports for your organization.

To navigate to the APM usage dashboards, you can either go to :guilabel:`Settings > Organization overview`. 

.. list-table::
  :header-rows: 1
  :widths: 30, 70

  * - :strong:`Dashboard`
    - :strong:`Description`
  
  * - APM Entitlements
    - Shows metrics related to your usage subscription like the number of containers, hosts, trace volume, and more. 

  * - APM Throttling
    - Shows metrics related to data dropped because of limit throttling. 
    





