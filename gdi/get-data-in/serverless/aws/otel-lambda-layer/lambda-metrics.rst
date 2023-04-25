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

.. note:: To track the execution time of a function, consider using alternative indicators, such the ``lambda.function.lifetime`` metric for functions that are called rarely. Another indication of longer execution time might be an increased function concurrency.

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

.. _ingest-modes-aws-lambda:

Ingest modes for metrics
=================================================

The Splunk Extension for AWS Lambda sends metrics in real time with minimal impact on monitored functions. The following ingest modes are available. Choose the ingest mode that best suits your case. For information on how to configure the ingest modes, see :ref:`metrics-configuration-lambda`.

Fast ingest mode
------------------

The fast ingest mode is similar to real-time monitoring in that it sends a metric update every time a monitored function is invoked. Use this mode when your functions are rarely called, accept increased concurrency, or require real-time metrics.

.. caution:: Fast ingest might have significant impact on the duration of a function. To mitigate the increased duration due to fast ingest, you can activate Fast Invoke Response in AWS Lambda, although this might increase concurrenty and costs in turn.

Buffering mode
------------------

Buffering mode minimizes the impact on monitored functions by buffering data points internally and send them at an interval specified using the ``REPORTING_RATE`` and ``REPORTING_TIMEOUT`` settings.

Use buffering mode when you don't need near real-time feedback and don't want to increase function latency. Don't use buffering mode with functions that are invoked less frequently than the reporting interval, as this might cause delays in data reporting.

.. note:: Due to AWS Lambda limitations, instrumented functions that use buffering mode send the last batch of data points with significant delay. This happens when each process in the execution environment is complete and there are no pending events.

Tags and properties
=================================================

By default, metrics reported by the Splunk Lambda Extension don't have tag or properties attached to them. To activate this feature, you must configure an AWS data source in Splunk Observability Cloud. See :ref:`specify-data-metadata`.


Troubleshooting
=================================================

To troubleshoot AWS Lambda metrics, see :ref:`aws-lambda-troubleshooting`.