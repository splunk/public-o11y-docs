.. _instrument-aws-lambda-functions-modular:

******************************************************************
Instrument your AWS Lambda function using separate layers
******************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Lambda layer automatically instruments your AWS Lambda functions for many programming languages. Follow these steps to get started.

You can automatically instrument your AWS Lambda function for Splunk Observability Cloud using layers only for your runtime or language. Instrumenting your function using separate layers can significantly reduce overhead.

Follow these instructions to install the Splunk OpenTelemetry Lambda layer for Java, Python, or Node.js functions. See :ref:`instrument-aws-lambda-functions` for the all-in-one default deployment instructions.


Check compatibility and requirements
==============================================

.. include:: /_includes/requirements/lambda.rst


Considerations on sizing and scaling
==============================================

If you need to reduce performance overhead further, consider using the Collector in a separate EC2 instance instead rather than a layer. See :ref:`instrument-aws-lambda-functions-ec2`.


Install the AWS Lambda layer for your language
==============================================

Follow these steps to instrument your function using the Splunk OpenTelemetry Lambda layer:

#. In the AWS Lambda console, select the function that you want to instrument.

#. In the :guilabel:`Layers` section, select :guilabel:`Add a layer`, then select :guilabel:`Specify an ARN`.

#. Copy the Amazon Resource Name (ARN) for the region of your AWS Lambda function from the list that matches your architecture:

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

#. Repeat the previous steps to install the Collector layer. If you don't want to use a local Collector, you must specify the address of a Collector in data forwarding mode. See :ref:`ec2-otel-collector-serverless`.

   .. tabs::

      .. tab:: Standard x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-collector.md

      .. tab:: Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-collector-arm.md

#. (Optional) Repeat the previous steps to install AWS Lambda metrics extension layer for Splunk Infrastructure Monitoring.

   .. tabs::

      .. tab:: Standard x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics.md

      .. tab:: Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics-arm.md


.. note:: You can automate the update of the AWS Lambda layers using the AWS CLI or other automation tools.


.. include:: /_includes/gdi/lambda-configuration.rst


.. include:: /_includes/gdi/send-spans-directly-lambda.rst


Check that data appears in Splunk Observability Cloud
=====================================================================

Each time the AWS Lambda function runs, trace and metric data appears in Splunk Observability Cloud. If no data appears, see :ref:`troubleshooting-lambda-layer`.
