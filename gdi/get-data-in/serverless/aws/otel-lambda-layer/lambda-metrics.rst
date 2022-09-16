.. _splunk-otel-lambda-metrics:

****************************************************************
AWS Lambda metrics and dimensions for Splunk Observability Cloud
****************************************************************

.. meta::
   :description: The Splunk Lambda Extension of the Splunk OpenTelemetry Lambda Layer collects high-resolution, low-latency metrics on AWS Lambda function execution. Read on to browse the metrics that the layer collects.

The Splunk Lambda Extension of the Splunk OpenTelemetry Lambda Layer collects high-resolution, low-latency metrics each time the AWS Lambda function runs, including cold start, invocation count, function lifetime, and termination condition.

AWS Lambda metrics
============================================

The following table contains all the metrics reported by the Splunk Lambda Extension:

.. list-table:: 
   :header-rows: 1

   * - Metric name
     - Type
     - Description
   * - ``lambda.function.invocation``
     - Counter
     - Number of Lambda function calls.
   * - ``lambda.function.initialization``
     - Counter
     - Number of function cold starts.
   * - ``lambda.function.initialization.latency``
     - Gauge
     - Time spent between the start of the extension and the first Lambda invocation, in milliseconds.
   * - ``lambda.function.shutdown``
     - Counter
     - Number of function shutdowns.
   * - ``lambda.function.lifetime``
     - Gauge
     - Lifetime of the function, in milliseconds. The lifetime of the function might span multiple Lambda invocations.

AWS Lambda dimensions
================================================

The following table contains all the dimensions reported by the Splunk Lambda Extension:

.. list-table:: 
   :header-rows: 1

   * - Dimension name
     - Description
   * - ``AWSUniqueId``
     - AWS unique ID. Used to correlate metrics with AWS tags.
   * - ``aws_arn``
     - Amazon Resource Name (ARN) of the Lambda function instance.
   * - ``aws_region``
     - The AWS Region.
   * - ``aws_account_id``
     - The AWS Account ID.
   * - ``aws_function_name``
     - The name of the Lambda function.
   * - ``aws_function_version``
     - The version of the Lambda function.
   * - ``aws_function_qualifier``
     - AWS function version qualifier. Can be version or version alias. Available only for invocations.
   * - ``aws_function_runtime``
     - The AWS Lambda execution environment.
   * - ``aws_function_shutdown_cause``
     - Reason for the shutdown. Available only for the ``lambda.function.shutdown`` metrics.

Tags and properties
=================================================

By default, metrics reported by the Splunk Lambda Extension don't have tag or properties attached to them. To enable this feature, you must configure an AWS data source in Splunk Observability Cloud. See :ref:`specify-data-metadata`.
