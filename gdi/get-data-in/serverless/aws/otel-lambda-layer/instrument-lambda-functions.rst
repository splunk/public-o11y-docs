.. _instrument-aws-lambda-functions:

******************************************************************
Instrument your AWS Lambda function for Splunk Observability Cloud
******************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Lambda layer automatically instruments your AWS Lambda functions for many programming languages. Follow these steps to get started.

Use the Splunk OpenTelemetry Lambda layer to automatically instrument your AWS Lambda functions for many programming languages. To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate a template that instruments your Lambda function using the Splunk OpenTelemetry Lambda layer, use the AWS Lambda guided setup. To access the AWS Lambda guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.

#. Open the :new-page:`AWS Lambda guided setup <https://login.signalfx.com/#/gdi/scripted/awslambda/step-1?category=product-apm&gdiState=%7B"integrationId":"awslambda"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`AWS Lambda`.

   #. Select the :guilabel:`AWS Lambda` tile to open the AWS Lambda guided setup.


Install the Splunk OpenTelemetry Lambda layer manually
==================================================================

If you don't use the guided setup, follow these instructions to manually install the Splunk OpenTelemetry Lambda layer for Java, Python, or Node.js functions:

- :ref:`otel-lambda-layer-requirements`
- :ref:`install-otel-lambda-layer`
- :ref:`set-env-vars-otel-lambda`


.. _otel-lambda-layer-requirements:

Check compatibility and requirements
----------------------------------------------

.. include:: /_includes/requirements/lambda.rst


.. _install-otel-lambda-layer:

Install the AWS Lambda layer for your language
-------------------------------------------------

Follow these steps to instrument your function using the Splunk OpenTelemetry Lambda layer:

#. In the AWS Lambda console, select the function that you want to instrument.

#. In the :guilabel:`Layers` section, select :guilabel:`Add a layer`, then select :guilabel:`Specify an ARN`.

#. Copy the Amazon Resource Name (ARN) for the region of your Lambda function from the list matching your architecture:

   .. tabs::

      .. tab:: Java x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-java.md

      .. tab:: Java Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-java-arm.md

      .. tab:: Node.js x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-js.md

      .. tab:: Node.js Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-js-arm.md

      .. tab:: Python x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-python.md

         .. note:: For Python functions using the Serverless Framework, see :ref:`serverless-framework-support-aws`.

      .. tab:: Python x86_64 Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-python-arm.md

         .. note:: For Python functions using the Serverless Framework, see :ref:`serverless-framework-support-aws`.

#. Paste the selected ARN in the :guilabel:`Specify an ARN` field and select :guilabel:`Add`.

#. Check that the Splunk layer appears in the :guilabel:`Layers` table.

#. Repeat the previous steps to install the Collector layer. If you don't want to use a local Collector, you must specify the address of a Collector in data forwarding mode. See :ref:`ec2-otel-collector-serverless`.

   .. tabs::

      .. tab:: Standard x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-collector.md

      .. tab:: Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-collector-arm.md

#. (Optional) Repeat the previous steps to install Lambda metrics extension layer for Splunk Infrastructure Monitoring.

   .. tabs::

      .. tab:: Standard x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics.md

      .. tab:: Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics-arm.md


.. note:: You can automate the update of the Lambda layers using the AWS CLI or other automation tools.


.. _set-env-vars-otel-lambda:

Configure the Splunk OpenTelemetry Lambda layer
----------------------------------------------------

Follow these steps to add the required configuration for the Splunk OpenTelemetry Lambda layer:

1. In the AWS Lambda console, open the function that you are instrumenting.

2. Navigate to :guilabel:`Configuration`, then :guilabel:`Environment variables`.

3. Select :guilabel:`Edit`.

4. Add each of the following environment variables by selecting :guilabel:`Add environment variable`:

   .. list-table::
      :header-rows: 1
      :widths: 20 80
      :width: 100%

      * - Environment variable
        - Description

      * - ``SPLUNK_REALM``
        - To find your Splunk realm, see :ref:`Note about realms <about-realms>`.

      * - ``SPLUNK_ACCESS_TOKEN``
        - A Splunk authentication token that lets exporters send data directly to Splunk Observability Cloud. See :ref:`Authentication token <admin-tokens>`. To send data to a Splunk OTel Collector in EC2, see :ref:`ec2-otel-collector-serverless`.

      * - ``AWS_LAMBDA_EXEC_WRAPPER``
        - Set the value for the ``AWS_LAMBDA_EXEC_WRAPPER`` environment variable:

            .. tabs::

               .. tab:: Java

                  .. code-block:: shell

                     # Select the most appropriate value

                     # Wraps regular handlers that implement RequestHandler
                     /opt/otel-handler

                     # Same as otel-handler, but proxied through API Gateway,
                     # with HTTP context propagation activated
                     /opt/otel-proxy-handler

                     # Wraps streaming handlers that implement RequestStreamHandler
                     /opt/otel-stream-handler

                  .. note:: Only AWS SDK v2 instrumentation is activated by default. To instrument other libraries, modify your code to include the corresponding library instrumentation from the OpenTelemetry Java SDK.

               .. code-tab:: shell Python

                  /opt/otel-instrument

               .. code-tab:: shell Node.js

                  /opt/nodejs-otel-handler

      * - ``OTEL_SERVICE_NAME``
        - The name of your service.

      * - (Optional) ``OTEL_RESOURCE_ATTRIBUTES``
        - Define the name of the deployment environment of your function by setting this environment variable to ``deployment.environment=<name-of-your-environment>``.

5. Select :guilabel:`Save` and check that the environment variables appear in the table.

To configure the mode of metric ingest, see :ref:`metrics-configuration-lambda`.

.. note:: By default, the layer sends telemetry to a Collector instance on `localhost` using the Collector layer. If you don't want to use a local Collector, you must specify the address of a Collector in data forwarding mode. See :ref:`ec2-otel-collector-serverless`.

.. _unified-layer-support:

Using a unified layer for all languages
------------------------------------------------

If needed, you can use a Lambda layer that contains all supported language runtimes, as well as the Collector and the metric extension. Use the following ARNs to install the bundles.

.. tabs::

   .. tab:: Standard x86_64

      .. github:: yaml
         :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm.md

   .. tab:: Graviton2 ARM64

      .. github:: yaml
         :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-arm.md


.. _ec2-otel-collector-serverless:

Send spans to a Collector in data forwarding mode
=====================================================================

You can send data from multiple instrumented functions to a Collector running in data forwarding (gateway) mode in EC2. This helps aggregate data and reduce load.

To send spans from the instrumented Lambda function to the Collector gateway running in EC2, do the following:

#. Deploy the Collector in Gateway mode in a service your Lambda can reach, for example EC2. See :ref:`collector-gateway-mode`.
#. Make sure that the Lambda functions you want to instrument can reach the Collector gateway in EC2 and are in the same VPC.
#. Instrument the functions. See :ref:`install-otel-lambda-layer`.
#. Navigate to :guilabel:`Configuration` > :guilabel:`Environment variables`, then select :guilabel:`Edit`.
#. Add the following environment variables to your instrumented functions:

   - ``OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`` with the address of the EC2 instance that runs the gateway, for example `` 10.0.0.123:4317``
   - ``OTEL_TRACES_EXPORTER`` with the value ``otlp``
   - ``OTLP_EXPORTER_OTLP_TRACES_PROTOCOL`` with the value ``http/protobuf``
   - ``SPLUNK_LAMBDA_LOCAL_COLLECTOR_ENABLED`` with the value ``false``

#. If you've already set the access token and realm in the Collector configuration, delete the ``SPLUNK_ACCESS_TOKEN`` and ``SPLUNK_REALM`` environment variables.


.. _send_directly_olly_cloud:

Send spans directly to Splunk Observability Cloud
=====================================================================

By default, the Splunk OpenTelemetry Lambda layer sends telemetry to a Collector running alongside the Lambda.

To send spans directly to Splunk Observability Cloud from an AWS Lambda function instrumented using the Splunk Lambda layer add the following environment variables:

- ``OTEL_EXPORTER_OTLP_TRACES_PROTOCOL`` with the value ``http/protobuf``
- ``OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`` with the value ``https://ingest.<realm>.signalfx.com/v2/trace/otlp``, substituting ``<realm>`` with the name of your organization's realm.


.. _check-otel-lambda-data:

Check that data appears in Splunk Observability Cloud
=====================================================================

Each time the AWS Lambda function runs, trace and metric data appears in Splunk Observability Cloud. If no data appears, see :ref:`troubleshooting-lambda-layer`.
