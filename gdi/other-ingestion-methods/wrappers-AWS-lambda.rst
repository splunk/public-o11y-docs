.. _wrapper-ingest:

**************************************************************
Observability Cloud wrappers for AWS Lambda functions and apps
**************************************************************

.. meta::
   :description: Send custom metrics using wrappers for AWS Lambda functions and apps.

In addition to using CloudWatch data to monitor AWS Lambda, you can also use wrappers. Each wrapper sends additional Lambda-specific monitoring metrics, and wrappers also allow you to send custom metrics from the apps running inside your Lambda functions. Splunk provides wrappers for NodeJS, Java, Python, Ruby, C#, and Go.

The Lambda wrappers send the following metrics to Splunk Infrastructure Monitoring:

.. list-table::
   :header-rows: 1
   :widths: 30, 15, 55

   * - :strong:`Metric Name`
     - :strong:`Type`
     - :strong:`Description`

   * - function.invocations
     - Counter
     - Count of Lambda invocations

   * - function.cold_starts
     - Counter
     - Count of cold starts

   * - function.errors
     - Counter
     - Count of errors from underlying Lambda handler

   * - function.duration
     - Gauge
     - Milliseconds in execution time of underlying Lambda handler

The Lambda wrappers add several dimensions to data points sent to Splunk Infrastructure Monitoring. These dimensions added by Lambda wrappers can be used for filtering and aggregation.

.. list-table::
   :header-rows: 1
   :widths: 30, 70

   * - :strong:`Dimension`
     - :strong:`Description`

   * - lambda_arn
     - Amazon Resource Name (ARN) of the Lambda function instance

   * - aws_region
     - AWS region where the Lambda function is executed

   * - aws_account_id
     - AWS Account ID associated with the Lambda function

   * - aws_function_name
     - Name of the Lambda function

   * - aws_function_version
     - Version of the Lambda function

   * - aws_function_qualifier
     - AWS function version qualifier (version or version alias if it is not an event source mapping Lambda invocation)

   * - event_source_mappings
     - AWS function name (if it is an event source mapping Lambda invocation)

   * - aws_execution_env
     - AWS execution environment (for example, AWS_Lambda_nodejs6.10)

   * - function_wrapper_version
     - function wrapper qualifier (for example, signalfx-lambda-0.0.9)

   * - metric_source
     - The literal value of 'lambda_wrapper'


To monitor custom metrics you are sending from your apps, you can create a new dashboard and create charts for those metrics, or you can open a Lambda dashboard and select :menuselection:`Save as` to save a copy of the Lambda dashboard(s) and then add charts to the copies.
