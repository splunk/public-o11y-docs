.. _logs-logs:

**********************************
Set up Splunk Log Observer
**********************************


.. meta::
   :description: Connect Splunk Observability Cloud to your data sources.

..	toctree::
   :hidden:


What is supported?
======================
Observability Cloud supports unstructured log data at ingest.


Prerequisites
=================
Your Observability Cloud organization must be provisioned with an entitlement for Log Observer. You must be an administrator in an Observability Cloud organization to set up integrations. 


Start using Log Observer
============================
Complete the following tasks, which are required to start using Log Observer:

- Send logs to Log Observer

- Interact with your data

-  :new-page-ref:`Transform logs to troubleshoot Log Observer setup <gdi-troubleshooting>`


Send logs to Log Observer
=============================
To send your logs to Log Observer, follow these instructions:

#. In the Observability Cloud main menu, go to :strong:`Data Setup`.

#. Click the integration tile for your data source.

#. Follow the instructions in the integration then go to the :guilabel:`Interact with your data` section on this page. 

Use the integration wizards to capture logs from your cloud environment and the :new-page:`Splunk OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector>` to capture them from your resources and applications. 

If you already have existing Fluentd or Fluent Bit deployments, you can configure them to send logs to Log Observer, though we do not recommended using Fluentd or Fluent Bit for the following reasons:

- Logs captured by your own FluentD or Fluent Bit agents do not include the resource metadata needed to correlate them with APM or Infrastructure Monitoring data. 

- Splunk Observability Cloud only supports the Splunk OpenTelemetry Collector.


Interact with your data
===========================
Verify that Log Observer is correctly processing and indexing your logs by trying basic Log Observer functionality: filtering and aggregating your logs. 

Filtering
-------------
You can use the Log Observer interface to filter your logs based on keywords or fields. To filter your data, follow these steps:

#. Click into the filter bar at the top. 

#. On the :strong:`Keyword` tab, enter a keyword. On the :strong:`Fields` tab, find a field from the list on the left and, if helpful, enter a value on the right.

#. To display only results that include the keywords, fields, or field values you entered, click the equal sign (=) next to the appropriate entry. To display only results that exclude the keywords, fields, or field values you entered, click the not equal sign (!=) next to the appropriate entry. 

The resulting logs appear in the Raw Logs Table. You can add more filters, enable and disable existing filters, and click into individual logs to learn more.

Aggregating
---------------
Perform aggregations on logs to visualize problems by showing averages, sums, and other statistics related to logs. Aggregations group related data by one field and then perform statistical calculation on other fields. See :ref:`logs-aggregations` to learn how.


