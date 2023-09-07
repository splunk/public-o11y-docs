.. _lo-transition:


*****************************************************************
Splunk Log Observer transition
*****************************************************************

.. meta::
  :description: Discover how you can transition from Log Observer to Log Observer Connect where you can ingest more logs from a wider variety of data sources, enjoy a more advanced logs pipeline, and expand into security logging by the January 2024 deadline.

Log Observer is transitioning to Log Observer Connect in January 2024. Log Observer customers can now leverage the Splunk platform (Splunk Cloud Platform and Splunk Enterprise), the market leader in log and data analytics, as well as Splunk Observability Cloud, a leader in observability products. Migrating from Log Observer to the Splunk platform for logging does not have any impact on the powerful solution built around the correlation of logs, metrics, and traces in Splunk Observability Cloud.

To transition to Splunk Log Observer Connect, you must take the following actions:

1. Reach out to your Splunk Regional Sales Manager to request assistance with the transition. The deadline is October 31, 2023.

2. Connect your Splunk platform instance to your Log Observer Connect instance. See :ref:`logs-scp` or :ref:`logs-set-up-logconnect`, depending on your existing Splunk platform deployment.

3. Set up an HEC token to forward or mirror your existing Log Observer logs to Splunk Cloud Platform. See :ref:`forward-logs` to learn how.

After completing the preceding steps, you will be able to store data in both Log Observer and your Splunk platform instance for 30 days. During the 30-day window you can verify that the data in your Splunk platform instance from Log Observer Connect matches the Log Observer data. There is no disruption to your functionality during this time. Your logs pipeline management settings continue to work normally. 

By January 2024, all Log Observer customers must transition to Log Observer Connect where they can ingest more logs from a wider variety of data sources, enjoy a more advanced logs pipeline, and expand into security logging among other advantages.
