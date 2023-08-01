.. _advanced-lambda-layer-configuration:

*****************************************************
Configure the Splunk OpenTelemetry Lambda Layer
*****************************************************

.. meta::
   :description: Configure the agent of the Splunk OpenTelemetry Lambda Layer through environment variables to suit most of your instrumentation needs for AWS Lambda functions.

You can configure the Splunk OpenTelemetry Lambda Layer to suit most of your instrumentation needs. In most cases, modifying the basic configuration is enough to get started. See :ref:`set-env-vars-otel-lambda`.

You can modify the following settings to fully configure the Lambda layer, including options for activating new features that are unique to the Splunk OpenTelemetry Lambda Layer.

.. _main-lambda-agent-settings:

General settings
=========================================================================

The following settings activate the Lambda layer to send data to Splunk Observability Cloud:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``SPLUNK_REALM``
     - The name of your organization's realm. If you don't indicate a realm, you must define custom endpoints for trace data and metric data. See :ref:`trace-exporters-settings-lambda` and :ref:`metrics-configuration-lambda`.
   * - ``SPLUNK_ACCESS_TOKEN``
     - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. Required when the ``SPLUNK_REALM`` environment variable is present. See :ref:`admin-tokens`.

.. _trace-configuration-lambda:

Trace configuration
=======================================================

The following settings control tracing limits and attributes:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_SERVICE_NAME``
     - Name of the service or application you're instrumenting. Takes precedence over the service name defined in ``OTEL_RESOURCE_ATTRIBUTES``.
   * - ``OTEL_RESOURCE_ATTRIBUTES``
     - Comma-separated list of resource attributes added to every reported span. For example, you can define the name of the deployment environment of your function by setting the variable to ``deployment.environment=<name-of-your-environment>``.
   * - ``OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT``
     - Maximum number of attributes per span. Default is unlimited.
   * - ``OTEL_SPAN_EVENT_COUNT_LIMIT``
     - Maximum number of events per span. Default is unlimited.
   * - ``OTEL_SPAN_LINK_COUNT_LIMIT``
     - Maximum number of links per span. Default is ``1000``.
   * - ``OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT``
     - Maximum length of strings for attribute values. Values larger than the limit are truncated. Default is ``1200``.

.. _trace-exporters-settings-lambda:

Exporters configuration
===============================================================

The following settings control trace exporters and their endpoints:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_TRACES_EXPORTER``
     - Trace exporter to use. You can set multiple comma-separated values. Possible values are ``otlp`` and ``jaeger-thrift-splunk``.
   * - ``OTEL_EXPORTER_OTLP_ENDPOINT``
     - The OTLP endpoint. This defaults to the collector running on localhost, ``http://localhost:4318``.
   * - ``OTEL_EXPORTER_JAEGER_ENDPOINT``
     - The endpoint for the Jaeger exporter. When you set a value for the ``SPLUNK_REALM`` environment variable, the default endpoint is in the form ``https://ingest.<realm>.signalfx.com/v2/trace``.

.. note:: Setting the exporter and the endpoint URL isn't required in most cases. By default, the layer sends telemetry directly to a Collector run in the Lambda layer which sends the data to Splunk Observability Cloud ingest endpoints.

.. _trace-propagation-configuration-lambda:

Propagators configuration
=======================================================

The following settings control trace propagation:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_PROPAGATORS``
     - Comma-separated list of propagators you want to use. Default is ``tracecontext,baggage``. You can find the list of supported propagators in the official OpenTelemetry documentation.

.. _metrics-configuration-lambda:

Metrics configuration
===============================================

The following settings control the sending of AWS Lambda metric data to Splunk Observability Cloud:

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``SPLUNK_METRICS_ENDPOINT``
     - Endpoint for metric data ingestion. When you set a value for the ``SPLUNK_REALM`` environment variable, the default endpoint is in the form ``https://ingest.<realm>.signalfx.com``.
   * - ``FAST_INGEST``
     -  Specifies the strategy used to send data points. Use ``false`` to buffer metric data and send it to Splunk Observability Cloud on intervals defined by the ``REPORTING_RATE`` variable. Default is ``true``.
   * - ``REPORTING_RATE``
     - Specifies how often the layer sends data points to Splunk Observability Cloud, in seconds. Default value is ``15``. Minimum value is ``1``.
   * - ``REPORTING_TIMEOUT``
     - Timeout for sending data points to Splunk Observability Cloud, in seconds. Default value is ``5``. Minimum value is ``1``.
   * - ``VERBOSE``
     - Activates verbose logging for metric data collection. AWS CloudWatch stores the logs as log groups associated with the Lambda function. Default is ``false``.
   * - ``HTTP_TRACING``
     - Activates detailed logs of HTTP calls to Splunk Observability Cloud. Default is ``false``.

For more information, see :ref:`splunk-otel-lambda-metrics`.

.. _server-trace-information-lambda:

Server trace information
==============================================

To connect Real User Monitoring (RUM) requests from mobile and web applications with serverless trace data, the Splunk OpenTelemetry Lambda Layer adds the following response headers to HTTP responses:

.. code-block::

   Access-Control-Expose-Headers: Server-Timing 
   Server-Timing: traceparent;desc="00-<serverTraceId>-<serverSpanId>-01"

The ``Server-Timing`` header contains the ``traceId`` and ``spanId`` parameters in ``traceparent`` format. For more information, see the Server-Timing and traceparent documentation on the W3C website.

.. _other-lambda-settings:

Other settings
================================================

.. list-table:: 
   :header-rows: 1

   * - Environment variable
     - Description
   * - ``OTEL_INSTRUMENTATION_AWS_LAMBDA_FLUSH_TIMEOUT``
     - Timeout for buffering spans, in milliseconds. The default value is ``30000`` milliseconds.
   * - ``OTEL_LOG_LEVEL``
     - Level for debug logging. Default is ``WARN``. When set to ``DEBUG``, the layer sends additional logs to AWS CloudWatch.
   * - ``SPLUNK_LAMBDA_SLS_ZIP``
     - Set to ``true`` to instrument Python libraries compressed using the Serverless Framework. The default value is ``false``.
   * - ``OTEL_PYTHON_DISABLED_INSTRUMENTATIONS``
     - Comma-separated list of Python instrumentations you want to deactivate. For a list of automatically loaded instrumentations, see the requirements list in the OpenTelemetry repository on GitHub: https://github.com/open-telemetry/opentelemetry-lambda/blob/main/python/src/otel/otel_sdk/requirements-nodeps.txt

.. caution:: Activating ``DEBUG`` logging might increase AWS CloudWatch costs.
