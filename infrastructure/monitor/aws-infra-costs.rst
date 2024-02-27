.. _aws-infra-costs:
.. _aws-costs:

**********************************
Costs for AWS monitoring
**********************************

.. meta::
   :description: Costs for monitoring AWS with Splunk Infrastructure Monitoring.

To understand the costs derived from monitoring AWS with Splunk Observability Cloud, see:

* :ref:`aws-costs-splunk`
* :ref:`aws-costs-amazon`

.. _aws-costs-splunk:

Costs derived from Splunk Observability Cloud 
===========================================================

Your subscription plan determines how you'll be charged for sending AWS metrics to Splunk Observability Cloud. See more in :ref:`monitor-imm-billing-usage`.

* In MTS-based subscription plans, all metrics are custom, and you're therefore charged for them.
* In host-based subscription plans, most AWS metrics are categorized as bundled, and are part of your plan. 

Bundled metrics include all metrics from :ref:`supported namespaces <aws-integrations>` as well as metrics from the following services:
  * CWAgent
  * Glue
  * MediaLive 
  * System/Linux 
  * WAF 

For a complete list of Observability Cloud metrics, see :ref:`metric-categories`.

.. _aws-costs-amazon:

Costs derived from AWS 
===========================================================

You can send AWS data to Splunk Observability Cloud with one of two methods, which have different associated costs:

#. Streaming data with Metric Streams. 
#. Polling CloudWatch APIs:
   
   - First, the list of metrics is retrieved with ``ListMetrics``. 
   - Next, data points are fetched with ``GetMetricData``. Note that the ``GetMetricStatistics`` API is deprecated, see more in :ref:`aws-api-notice`.  

Learn more at :ref:`get-started-aws`.

AWS pricing 
-------------------------------------------------------------------

AWS :strong:`pricing is based on the amount of requested metrics`, not the number of requests. Therefore the cost of obtaining Cloudwatch metrics for a service is based on three factors: frequency of pulling data, number of metrics for a given service, and number of cloud resources.

Generally speaking, Metric Streams costs the same as polling if the integration is synced every 5 minutes, and is cheaper (up to 5 times) when synced every minute.

However, when using Metric Stream you can't control costs, while you can configure the polling frequency of the APIs. See :ref:`how to limit the metrics to collect, the resources, or the collection frequently <specify-data-metadata>`. 

Example: Cost scenarios using polling APIs
===========================================================

Let's imagine a user with the following configuration: 

- 100,000 SQS queues
- 9 available CloudWatch metrics per queue 

First, you need to retrieve your list of metrics using the ``ListMetrics`` API at a cost of USD 0.01 per 1,000 API calls:

.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 30 50 20 

   *  - :strong:`Scenario`
      - :strong:`Number of API calls per day`
      - :strong:`Cost/day`

   *  - Metrics are listed every 15 minutes, and a list contains up to 500 items
      - 1440 (number of minutes in a day)/15 (pull interval) * 100k / 500 (items) = 19200
      - USD 0.192 

Next, you retrieve the data using the ``GetMetricData`` API at a cost of USD 0.01 per 1,000 metrics requested:

.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 30 50 20 

   *  - :strong:`Scenario`
      - :strong:`Number of requested metrics per day`
      - :strong:`Cost/day`

   *  - The user wants to retrieve all metrics every 1 minute
      - 1440 (number of minutes in a day) *  9 (number of metrics) * 100k (number of SQS resources) = 1.296B
      - USD 12,960  

   *  - The user wants to retrieve all metrics every 5 minutes
      - 1440 (number of minutes in a day)/5 (pull interval) *  9 (number of metrics) * 100k (number of SQS resources) = 259.2M
      - USD 2,592 

   *  - The user wants to retrieve ONLY 4 metrics for a 1,000 queues (because they're the production instances) every 10 minutes
      - 1440 (number of minutes in a day)/10 (pull interval) *  4 (number of metrics) * 1000 (number of SQS resources) = 576k
      - USD 5.76 
