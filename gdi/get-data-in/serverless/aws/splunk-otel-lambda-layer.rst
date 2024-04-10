.. _splunk-otel-lambda-layer:

**************************************************************
Instrument AWS Lambda functions for Splunk Observability Cloud
**************************************************************

.. meta::
   :description: Learn how to instrument your AWS Lambda functions to export spans and metrics to Splunk Observability Cloud. The layer supports numerous programming languages through integrated wrappers, and includes a metrics extension that collects high-resolution, low-latency metrics on function execution.

.. toctree::
   :hidden:

   Instrument your Lambda function <otel-lambda-layer/instrumentation/instrument-lambda-functions>
   Advanced configuration <otel-lambda-layer/advanced-configuration>
   Metrics and dimensions <otel-lambda-layer/lambda-metrics>
   Troubleshooting <otel-lambda-layer/troubleshooting-lambda-layer>

Use the Splunk OpenTelemetry Lambda Layer to automatically instrument AWS Lambda functions to send application metrics and traces to Splunk APM. The layer supports numerous programming languages through integrated wrappers, and includes a metrics extension that collects high-resolution, low-latency metrics every time the function runs.

.. raw:: html

  <embed>
    <h2>Select the deployment mode for your Lambda function<a name="lambda-deployment-modes" class="headerlink" href="#lambda-deployment-modes" title="Permalink to this headline">¶</a></h2>
  </embed>

To instrument your AWS Lambda function using the Splunk OpenTelemetry Lambda Layer, select the deployment mode that best adapts to your needs.

.. list-table::
    :widths: 40 60
    :width: 100
    :header-rows: 1

    * - Deployment mode
      - When to use

    * - :ref:`All-in-one <instrument-aws-lambda-functions>`
      - All components are in a single layer, including the Collector. This is the easiest deployment method and is recommended for production environments.

    * - :ref:`Separate layers <instrument-aws-lambda-functions-modular>`
      - Use separate layers for your language or runtime, Collector, and metric extension. This method reduces performance overhead.

    * - :ref:`Separate layers with EC2 gateway <instrument-aws-lambda-functions-ec2>`
      - Use a layer for your language or runtime and configure the Collector in data forwarding mode in EC2. This is the lightest instrumentation method, though it requires more configuration.


.. raw:: html

  <embed>
    <h2>.NET and Go functions<a name="additional-lambda-instructions" class="headerlink" href="#additional-lambda-instructions" title="Permalink to this headline">¶</a></h2>
  </embed>

.NET and Go functions require additional instructions:

* :ref:`dotnet-serverless-instrumentation`
* :ref:`go-serverless-instrumentation`

.. raw:: html

  <embed>
    <h2>Collect metrics and logs from CloudWatch<a name="cloudwatch-collect-lambda" class="headerlink" href="#cloudwatch-collect-lambda" title="Permalink to this headline">¶</a></h2>
  </embed>

Splunk Observability Cloud can also collect AWS Lambda metrics and logs from AWS CloudWatch. See :ref:`get-started-aws` for more information on how to connect Splunk Observability Cloud to your AWS services.
