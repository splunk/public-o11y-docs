.. _instrument-aws-lambda-functions-ec2:

********************************************************************
Instrument your AWS Lambda function using a Collector gateway in EC2
********************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Lambda layer automatically instruments your AWS Lambda functions for many programming languages. Follow these steps to get started.

<<<<<<< HEAD
You can automatically instrument your Lambda function for Splunk Observability Cloud using a layer for your runtime and a Collector gateway in EC2. This helps aggregate data and reduce load.

Follow these instructions to install the Splunk OpenTelemetry Lambda layer for Java, Python, or Node.js functions. See :ref:`instrument-aws-lambda-functions` for the default deployment instructions.
=======
You can automatically instrument your AWS Lambda function for Splunk Observability Cloud using a layer for your runtime and a Collector gateway in EC2. Using a Collector gateway helps aggregate data and reduce load.

Follow these instructions to install the Splunk OpenTelemetry Lambda layer for Java, Python, or Node.js functions. See :ref:`instrument-aws-lambda-functions` for the all-in-one default deployment instructions.
>>>>>>> main


Check compatibility and requirements
==============================================

.. include:: /_includes/requirements/lambda.rst


Install the AWS Lambda layer for your language
==============================================

Follow these steps to instrument your function using the Splunk OpenTelemetry Lambda layer:

#. In the AWS Lambda console, select the function that you want to instrument.

#. In the :guilabel:`Layers` section, select :guilabel:`Add a layer`, then select :guilabel:`Specify an ARN`.

<<<<<<< HEAD
#. Copy the Amazon Resource Name (ARN) for the region of your Lambda function from the list matching your architecture:
=======
#. Copy the Amazon Resource Name (ARN) for the region of your AWS Lambda function from the list that matches your architecture:
>>>>>>> main

   .. tabs::

      .. tab:: Java x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-java.md

      .. tab:: Java ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-java-arm.md

      .. tab:: Node.js x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-js.md

      .. tab:: Node.js ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-js-arm.md

      .. tab:: Python x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-python.md

         .. note:: For Python functions using the Serverless Framework, see :ref:`serverless-framework-support-aws`.

      .. tab:: Python ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-python-arm.md

         .. note:: For Python functions using the Serverless Framework, see :ref:`serverless-framework-support-aws`.

#. Paste the selected ARN in the :guilabel:`Specify an ARN` field and select :guilabel:`Add`.

#. Check that the Splunk layer appears in the :guilabel:`Layers` table.

<<<<<<< HEAD
#. (Optional) Repeat the previous steps to install Lambda metrics extension layer for Splunk Infrastructure Monitoring.
=======
#. (Optional) Repeat the previous steps to install AWS Lambda metrics extension layer for Splunk Infrastructure Monitoring.
>>>>>>> main

   .. tabs::

      .. tab:: Standard x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics.md

      .. tab:: Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics-arm.md


.. note:: You can automate the update of the Lambda layers using the AWS CLI or other automation tools.

.. include:: /_includes/gdi/lambda-configuration.rst


.. _ec2-otel-collector-serverless:

Set up a Collector gateway in EC2
=====================================================================

<<<<<<< HEAD
To send spans from the instrumented Lambda function to the Collector gateway running in EC2, do the following:

#. Deploy the Collector in Gateway mode in a service your Lambda can reach, for example EC2. See :ref:`collector-gateway-mode`.
#. Make sure that the Lambda functions you want to instrument can reach the Collector gateway in EC2 and are in the same VPC.
#. Navigate to :guilabel:`Configuration` > :guilabel:`Environment variables`, then select :guilabel:`Edit`.
#. Add the following environment variables to your instrumented functions:

   - ``OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`` with the address of the EC2 instance that runs the gateway, for example `` 10.0.0.123:4317``
=======
To send spans from the instrumented AWS Lambda function to the Collector gateway running in EC2, do the following:

#. Deploy the Collector in gateway mode in a service your function can reach, for example EC2. See :ref:`collector-gateway-mode`.
#. Make sure that the AWS Lambda functions you want to instrument can reach the Collector gateway in EC2 and are in the same VPC.
#. Navigate to :guilabel:`Configuration`, then :guilabel:`Environment variables`, then select :guilabel:`Edit`.
#. Add the following environment variables to your instrumented functions:

   - ``OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`` with the address of the EC2 instance that runs the gateway, for example ``10.0.0.123:4317``
>>>>>>> main
   - ``OTEL_TRACES_EXPORTER`` with the value ``otlp``
   - ``OTLP_EXPORTER_OTLP_TRACES_PROTOCOL`` with the value ``http/protobuf``
   - ``SPLUNK_LAMBDA_LOCAL_COLLECTOR_ENABLED`` with the value ``false``

#. If you've already set the access token and realm in the Collector configuration, delete the ``SPLUNK_ACCESS_TOKEN`` and ``SPLUNK_REALM`` environment variables.


Check that data appears in Splunk Observability Cloud
=====================================================================

Each time the AWS Lambda function runs, trace and metric data appears in Splunk Observability Cloud. If no data appears, see :ref:`troubleshooting-lambda-layer`.
