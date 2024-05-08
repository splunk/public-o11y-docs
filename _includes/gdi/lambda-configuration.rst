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
        - Set the value for the environment variable given your programming language:

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