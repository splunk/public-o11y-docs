.. _lo-transition:


*****************************************************************
Splunk Log Observer transition
*****************************************************************

.. meta::
  :description: Discover how you can transition from Splunk Log Observer to Splunk Log Observer Connect where you can ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and expand into security logging by the January 2024 deadline.

All Splunk Log Observer customers must transition to Splunk Log Observer Connect by January 2024. Log Observer customers can now use Splunk Cloud Platform and Splunk Enterprise for logging and data analytics. Using the Splunk platform allows you to ingest more logs from a wider variety of data sources, use a more advanced logs pipeline, and use logging for security use cases. You can still use Splunk Observability Cloud for observability. Migrating from Log Observer to the Splunk platform for logging does not have any impact on your ability to use Splunk Observability Cloud to correlate logs, metrics, and traces.

To transition to Splunk Log Observer Connect, you must take the following actions:

1. Reach out to your Splunk regional sales manager to request assistance with the transition. The deadline is October 31, 2023.

2. Connect your Splunk platform instance to your Log Observer Connect instance. See :ref:`logs-scp` or :ref:`logs-set-up-logconnect`, depending on the type of Splunk platform deployment you have.

3. If you have a Splunk Cloud Platform deployment, set up an HEC token to forward or mirror your existing Log Observer logs to Splunk Cloud Platform. See :ref:`forward-logs` to learn how.

After completing the preceding steps, you will be able to store data in both Log Observer and your Splunk platform instance for 30 days. During the 30-day window you can verify that the data in your Splunk platform instance from Log Observer Connect matches the Log Observer data. There is no disruption to your functionality during this time. Your logs pipeline management settings continue to work normally. 

