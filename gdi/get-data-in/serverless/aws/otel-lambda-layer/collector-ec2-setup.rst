.. _ec2-otel-collector-serverless:

******************************************************************
Send serverless spans to the Splunk OpenTelemetry Collector
******************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Lambda Layer automatically instruments your AWS Lambda functions for many programming languages. Follow these steps to get started.

By default, the Splunk OpenTelemetry Lambda Layer sends telemetry to Splunk Observability Cloud endpoints, without using a Collector. Though not required, deploying a Splunk OTel Collector in the same virtual private cloud (VPC) of your Lambda can reduce latency in some cases.

To send spans to the Splunk OTel Collector from an AWS Lambda function instrumented using the Splunk Lambda layer, follow these steps:

#. Deploy the Collector in Gateway mode in a service your Lambda can reach, for example EC2. See :ref:`collector-gateway-mode`.
#. Install the Splunk OTel Lambda layer. See :ref:`instrument-aws-lambda-functions`.
#. Navigate to :guilabel:`Configuration` > :guilabel:`Environment variables`, then select :guilabel:`Edit`.
#. As you're sending telemetry to the Collector, delete the ``SPLUNK_REALM`` environment variable.
#. If you've already set the access token in the Collector configuration, delete the ``SPLUNK_ACCESS_TOKEN`` environment variable.
#. Add the following environment variables:

   -  ``OTEL_TRACES_EXPORTER`` with the value ``otlp_proto_http``
   -  ``OTEL_EXPORTER_OTLP_ENDPOINT`` with the value ``<collector-gateway-ip-or-dns-name>:4318``


