.. _logs-pipeline:

*****************************************************************
Manage the logs pipeline
*****************************************************************

.. meta::
   :description: Manage the logs pipeline with log processing rules, log metricization rules, and Infinite Logging rules. Customize your pipeline.

.. include:: /_includes/log-observer-transition.rst

Add value to your raw logs by customizing your pipeline. The pipeline is a set of rules that execute sequentially. 

Observability Cloud lets you create three types of pipeline rules:

* :ref:`Log processing rules <logs-processors>` transform your data or a subset of your data as it arrives in Observability Cloud.
* :ref:`Log metricization rules <logs-metricization>` let you create charts to see trends in your logs.
* :ref:`Infinite Logging rules <logs-infinite>` archive unindexed logs in Amazon S3 buckets for potential future use.

.. note:: Only customers with a Splunk Log Observer entitlement in Splunk Observability Cloud can manage the Log Observer pipeline. If you do not have a Splunk Log Observer entitlement and are using Splunk Log Observer Connect instead, see :ref:`logs-intro-logconnect` to learn what you can do with the Splunk platform integration.

.. _logs-pipeline-sequence:

Sequence of logs pipeline rules
=============================================================================
Logs pipeline rules execute in the following order:

1. All log processing rules (field extraction, field copy, and field redaction processors)

2. All log metricization rules

3. All Infinite Logging rules

Adjust the order of custom rules by dragging and dropping their placement within their rule category. Log Observer indexes logs only after all three types of pipeline rules are executed. Any logs that you archive through Infinite Logging rules do not count toward your indexing capacity.

Because log processing rules execute first, you can create field extraction rules, then use the resulting fields in log metricization rules or Infinite Logging rules or both. For example, say you want to archive and not index all logs that contain the values ‘START', ‘RETRY', ‘FAIL', and ‘SUCCESS' in the :guilabel:`message` field, which also contains other information. Without any processing, you might need to create a rule with a keyword search for each value. Instead, you can use field extraction to make Infinite Logging rules easier and more manageable. First, create a log processing rule to extract a new field called :guilabel:`status` from the portion of the field message that contains the desired values. Then, create an Infinite Logging rule that filters on :guilabel:`status` to include logs with the values , ‘START', ‘RETRY', ‘FAIL', or ‘REPORT'. 

Because Infinite Logging rules are last in the pipeline, log-derived metrics are based on 100% of ingested logs, not on a sample of logs. Thus, your organization can make use of full and accurate log-derived metrics without needing to index all the logs that you metricize. For example, say you want to create a metric to count the occurrences of “puppies” or “kittens” in the message field, but you also want to archive the logs containing those occurrences without indexing. First, create a log processing rule to extract a new field called pet from the portion of the message field that contains the desired values. Then, create a metricization rule that records the count of all log messages, grouped by pet. You can now graph or alert on the count of each pet from logs in Observability Cloud dashboards and detectors. If you don't want to see the log messages in Log Observer, create an Infinite Logging rule that archives without indexing all log messages that contain the field pet. Now you have real-time visibility into logging trends without using index capacity.

Logs pipeline rules limits
================================================================================
An organization can create a total of 128 log processing rules, which includes the combined sum of field extraction rules, field copy rules, and field redaction rules. In addition, an organization can create 128 log metricization rules and 128 infinite logging rules.