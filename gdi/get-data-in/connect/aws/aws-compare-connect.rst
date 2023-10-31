.. _aws-compare-connect:

***********************************************************************************
Compare AWS connection options 
***********************************************************************************

.. meta::
  :description: Compare the different options to integrate and connect Splunk Observability Cloud with AWS

Compare the different available options to connect Splunk Observability Cloud with AWS:

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 10 30 30 30

  * - :strong:`Connection option`
    - :strong:`Sample use cases`
    - :strong:`Advantages`
    - :strong:`Disadvantages`

  * - :ref:`Polling (default) <aws-connect-polling>` 
    - #. Your metrics are not time-sensitive, and delays are acceptable
      #. You need to use tag filtering and/or poll rate to manage cost
    - * Easiest method to set up
      * Highest granularity to manage cost through tag filtering or by prolonging polling intervals
      * Applies to selected AWS regions under the AWS account
    - * Metrics might be delayed since they're are polled at intervals
      * If polling intervals are short, this method might be more expensive

  * - :ref:`Streaming (Splunk-managed) <aws-connect-ms>` 
    - #. You're looking for real-time metrics 
      #. You need to sync metrics from multiple AWS regions
    - * Access metrics faster and at scale through Kinese Data Firehose streams
      * Less expensive than polling when you need close to real-time metrics
      * Manage stream filters in Splunk
      * Applies to all AWS regions under the AWS account
    - * Harder to manage costs due to lack of tag filtering and control of streaming input
      * You need to deploy :ref:`CloudFormation templates <aws-cloudformation>`

  * - :ref:`Streaming (AWS-managed) <aws-console-ms>`
    - You're looking for real-time metrics 
    - * Access metrics faster and at scale through Kinese Data Firehose streams
      * Less expensive than polling when you need close to real-time metrics
      * Direct control over the metric stream set-up
    - * Harder to manage costs due to lack of tag filtering and control of streaming input
      * You need create metric streams through the CloudWatch console for each AWS region