.. _aws-api-notice:

********************************************************
GetMetricStatistics API deprecation notice 
********************************************************

.. meta::
  :description: Deprecation notice for the AWS integration GetMetricStatistics API.


.. note:: Splunk will remove support for the ``GetMetricStatistics`` API on :strike:`May 1, 2023` :strike:`May 23, 2023` **May 31, 2023**. After this date **only** the ``GetMetricData`` API will be used. Follow the instructions on this document to migrate to the ``GetMetricData`` API. 

Splunk Observability Cloud provides a unified view into metrics, traces, and logs coming from various sources through integrations with third party services, including AWS integrations.

Splunk provides the following options to integrate with CloudWatch:

- ``GetMetricStatistics``, the legacy poll-based API.
- ``GetMetricData``, the modern poll-based API. It supports bulk retrieval of CloudWatch metric data. Shifting from ``GetMetricStatistics`` to ``GetMetricData`` can result in up to 20 times fewer API calls, substantially improving performance and data latency. 
- :ref:`Metric Streams, the streaming API <aws-metricstreams>`.

Switch to the GetMetricData API
============================================

You can configure any existing integration to use the ``GetMetricData`` API, all you need to do is to ensure Splunk Observability Cloud is :ref:`allowed to use the GetMetricData API <aws-iam-policy>`. 

To do so, add ``"cloudwatch:GetMetricData"`` in the :strong:`Action` section of the AWS IAM policy JSON document.

Configure the API using the AWS UI
-----------------------------------------

Alternatively, you can configure this using the AWS Management Console. 

.. image:: /_images/gdi/GetMetricData_AWSUI.png
  :width: 90% 

Select ``GetMetricData`` (and other permissions if pertinent), choose :guilabel:`Review Policy`, and then save the changes to make them effective.

Monitor the effects of the new configuration
========================================================================================

Monitor CloudWatch integration calls by checking the ``sf.org.num.awsServiceCallCount`` metric. This metric tracks the number of calls by a ``method`` and ``aws_account_id`` so you can easily verify what API each AWS account is using.

After switching to ``GetMetricData``, you should see:

- A significant reduction (up to 20x) in the total number of calls required to obtain data.
- A related reduction in the latency of data obtained by polling CloudWatch.

Manage costs
========================================================================================

If an AWS account produces many CloudWatch metrics, the improved performance might lead to an increase in the AWS API cost.

For example, if the ``GetMetricStatistics`` API takes 5 minutes to retrieve all the data, the ``GetMetricData`` API might take only 1 minute. When an AWS integration's poll rate is set to 1 minute, the ``GetMetricData`` requests are sent up to 5 times more often, generating a larger AWS API bill, while improving data latency at the same time. Increase the poll rate to 5 minutes to keep the cost at the same level.

You can keep track of the CloudWatch API cost incurred by Splunk Observability Cloud using the AWS CloudWatch integration pricing section in the :ref:`Organization Metrics / Cloud Integrations built-in dashboards <aws-dashboards>`.
