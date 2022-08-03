.. _get-started-logs:

**************************
Troubleshoot with logs
**************************

.. meta::
   :description: Get started investigating issues with Splunk Observability Cloud.

Troubleshoot your application and infrastructure behavior using high-context logs in Splunk Observability Cloud. With Splunk Log Observer, you can perform codeless queries on logs to detect the source of problems in your systems. Log Observer is composed of these tools:

- Timeline histogram allows you to zoom in and out of time increments

- Live Tail shows incoming logs with keyword highlighting

- Raw Logs Table contains columns and headers based on fields of your choice

- Filter bar lets you refine the Raw Logs Table by keyword or field

- Log Details flyout displays JSON fields and values from the log event

- Pipeline contains a list of prepackaged and custom log processing rules

- Aggregations allow you to visually analyze groupings of logs


================================
Log Observer use cases
================================
Log Observer provides an array of tools that allow you to answer questions such as the following:

- Which path in my API has the slowest response time?

- What is the total number of errors by service?

- What error messages correlate with, for example, declines in checkout rate?

- Does a specific error message correlate with a code version?

- Can I confirm that a recent fix stopped the problem?


Let’s say you have seen in the service map that one of your services is failing. With Log Observer, you can group logs by the failing service, then filter by error message or other interesting fields to locate the problem. If it is a frequent problem, extract the field value that indicates the problem and create a log processing rule based on it. Your pipeline lets you anticipate potential future problems and your team can troubleshoot even faster.

Or use Splunk Log Observer to figure out a more nuanced problem, such as why there has been a significant decrease in checkout completion rate for this time of day, day of week, or season. Perform an aggregation, such as <logs from Service A> grouped by <Error Message B>, then drill down into a representative log to determine the problem. One more aggregation tells you whether a set of log events with a particular error message correlates with a particular code version. Once you have identified the problematic build and reverted the code to a known good state, switch to Log Observer's Live Tail to confirm that this error message is no longer appearing in real-time, incoming logs.

Develop your own queries to troubleshoot, then save and share queries with your team.

================================
Get your data into Log Observer
================================
To start using Log Observer, see :ref:`Set up Splunk Log Observer <logs-logs>`. To learn how to use Splunk Observability Cloud tools together, 
see :ref:`Splunk Observability Cloud use case <get-started-use-case>`.