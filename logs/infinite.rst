.. _logs-infinite:

*****************************************************************
Archive your logs with infinite logging rules
*****************************************************************

.. meta::
  :description: Archive logs in Amazon S3 buckets using infinite logging rules. Reduce the amount of logs data you index. Increase logs' retention period.

.. note:: Only customers with a Splunk Log Observer entitlement in Splunk Observability Cloud can create infinite logging rules. If you do not have a Log Observer entitlement and are using Splunk Log Observer Connect instead, see :ref:`logs-intro-logconnect` to learn what you can do with the Splunk Enterprise integration.

Create infinite logging rules to archive all or any subset of logs in Amazon S3 buckets for compliance or possible future use while not paying to index them unless and until you want to analyze them in Splunk Log Observer. 

Use cases for archiving your logs
=============================================================================
There are two primary use cases to archive your logs:

- :ref:`To reduce the amount of data you index <logs-reduce>`

- :ref:`To retain logs data longer than 30 days <logs-retain>`

.. _logs-reduce:

Reduce the amount of data you indexed
-----------------------------------------------------------------------------
Some logs may not be useful on a day-to-day basis but may still be important in case of a future incident. For example, you might not always want to index logs from a non-production environment, or index every debug message. In either case, you can create an infinite logging rule to archive those logs in S3 buckets that your team owns in AWS. 

If you want to keep a sample of your archived logs to analyze in Log Observer, you can set the sampling rate in your infinite logging rule so that some amount of the data you archive will also be indexed. You pay for only the logs that you index and analyze in Log Observer. This way, you can monitor trends across all your logs while reducing the impact on your indexing capacity. See :ref:`order-of-execution` in the next section to learn more about using pipeline rules to help reduce your indexing capacity.

.. _logs-retain:

Retain logs longer than 30 days
-----------------------------------------------------------------------------
Storing logs in S3 buckets gives you full control over retention time, which can, for example, help you meet compliance and audit requirements. To retain logs longer than Log Observer’s 30-day retention period, you can archive and index 100% of your logs. Logs that are archived and indexed will be available for analysis in Log Observer for 30 days and will also be stored in S3 buckets for as long as you want them.

.. _order-of-execution:

Order of execution of logs pipeline rules
=============================================================================
Logs pipeline rules execute in the following order:

1. All log processing rules (field extraction, field copy, and field redaction processors)

2. All log metricization rules

3. All infinite logging rules

Because infinite logging rules execute last, you can create field extraction rules, then use the resulting fields in infinite logging rules. You can also metricize logs, then archive them via infinite logging without impacting your ingest capacity. For more information, see :ref:`logs-pipeline-sequence`.

Prerequisites
================================================================================
You must be a Splunk Observability Cloud admin to create new infinite logging connections. Non-admins can send data to S3 buckets using an existing infinite logging connection, but they cannot create new connections. See AWS documentation for permissions required to create S3 buckets in the AWS Management Console.

Create an infinite logging rule
================================================================================

To create an infinite logging rule, follow these steps:

1. From the navigation menu, go to :guilabel:`Data Configuration > Logs Pipeline Management`.

2. Click :guilabel:`New infinite logging Rule`.

3. Decide where to archive your data. To send your logs to an existing S3 bucket, click the infinite logging connection you want, then skip to step 9.

4. If you want to send your data to a new S3 bucket and you are an Observability Cloud admin, click :guilabel:`Create new connection`. The :guilabel:`Establish a New S3 Connection` wizard appears.

5. On the :guilabel:`Choose an AWS Region and Authentication Type` tab, do the following:

   a. Select the AWS region you want to connect to. 
   b. Select whether you want to use the :guilabel:`External ID` or :guilabel:`Security Token` authentication type.
   c. Click :guilabel:`Next`.
   
6. On the :guilabel:`Prepare AWS Account` tab, follow the steps in the wizard to do the following in the AWS Management Console:

   a. Create an AWS policy. The wizard provides the exact policy you must copy and paste into AWS.
   b. Create a role and associate it with the AWS policy.
   c. Create and configure an S3 bucket.

7. On the :guilabel:`Establish Connection` tab, do the following:

   a. Give your new S3 connection a name.
   b. Paste the Role ARN from the AWS Management Console into the :guilabel:`Role ARN` field in the wizard.
   c. Give your S3 bucket a name.
   d. Click :guilabel:`Save`.

8. Choose the Amazon S3 infinite logging connection that you created on the first page of the wizard. Your data will go to your S3 bucket in a file that you configure in the following two steps.

9. (Optional) You can add a file prefix, which will be prepended to the front of the file you send to your S3 bucket.

10. (Optional) In :guilabel:`Advanced Configuration Options`, you can select the compression and file formats of the file you will send to your S3 bucket. 

11. Click :guilabel:`Next`.

12. On the :strong:`Filter Data` page, create a filter that matches the log lines you want to archive in your S3 bucket. Only logs matching the filter are archived. If you want to index a sample of the logs being sent to the archive, select a percentage in :guilabel:`Define indexing behavior`. Indexing a small percentage of logs in Log Observer allows you to see trends in logs that are stored in S3 buckets. Click :guilabel:`Next`.

13. Add a name and description for your infinite logging rule.

14. Review your configuration choices, then click :guilabel:`Save`.

Your infinite logging setup is now complete. Depending on your selections, your logs will be archived, indexed in Observability Cloud for analysis, or both.

Infinite logging rules limits
================================================================================
An organization can create a total of 128 infinite logging rules.

