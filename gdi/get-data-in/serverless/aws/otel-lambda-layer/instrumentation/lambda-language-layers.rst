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



.. raw:: html

   <div class="include-start" id="requirements/lambda.rst"></div>

.. include:: /_includes/requirements/lambda.rst

.. raw:: html

   <div class="include-stop" id="requirements/lambda.rst"></div>





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



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-java.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-java.md

         .. raw:: html

            <div class="github-end"></div>




      .. tab:: Java ARM64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-java-arm.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-java-arm.md

         .. raw:: html

            <div class="github-end"></div>




      .. tab:: Node.js x86_64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-js.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-js.md

         .. raw:: html

            <div class="github-end"></div>




      .. tab:: Node.js ARM64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-js-arm.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-js-arm.md

         .. raw:: html

            <div class="github-end"></div>




      .. tab:: Python x86_64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-python.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-python.md

         .. raw:: html

            <div class="github-end"></div>




         .. note:: For Python functions using the Serverless Framework, see :ref:`serverless-framework-support-aws`.

      .. tab:: Python ARM64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-python-arm.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-python-arm.md

         .. raw:: html

            <div class="github-end"></div>




         .. note:: For Python functions using the Serverless Framework, see :ref:`serverless-framework-support-aws`.

#. Paste the selected ARN in the :guilabel:`Specify an ARN` field and select :guilabel:`Add`.

#. Check that the Splunk layer appears in the :guilabel:`Layers` table.

#. Repeat the previous steps to install the Collector layer. If you don't want to use a local Collector, you must specify the address of a Collector in data forwarding mode. See :ref:`ec2-otel-collector-serverless`.

   .. tabs::

      .. tab:: Standard x86_64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-collector.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-collector.md

         .. raw:: html

            <div class="github-end"></div>




      .. tab:: Graviton2 ARM64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-collector-arm.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-collector-arm.md

         .. raw:: html

            <div class="github-end"></div>




#. (Optional) Repeat the previous steps to install AWS Lambda metrics extension layer for Splunk Infrastructure Monitoring.

   .. tabs::

      .. tab:: Standard x86_64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics.md

         .. raw:: html

            <div class="github-end"></div>




      .. tab:: Graviton2 ARM64



         .. raw:: html

            <div class="github" url="https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics-arm.md"></div>

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-lambda-metrics-arm.md

         .. raw:: html

            <div class="github-end"></div>





.. note:: You can automate the update of the AWS Lambda layers using the AWS CLI or other automation tools.




.. raw:: html

   <div class="include-start" id="gdi/lambda-configuration.rst"></div>

.. include:: /_includes/gdi/lambda-configuration.rst

.. raw:: html

   <div class="include-stop" id="gdi/lambda-configuration.rst"></div>







.. raw:: html

   <div class="include-start" id="gdi/send-spans-directly-lambda.rst"></div>

.. include:: /_includes/gdi/send-spans-directly-lambda.rst

.. raw:: html

   <div class="include-stop" id="gdi/send-spans-directly-lambda.rst"></div>





Check that data appears in Splunk Observability Cloud
=====================================================================

Each time the AWS Lambda function runs, trace and metric data appears in Splunk Observability Cloud. If no data appears, see :ref:`troubleshooting-lambda-layer`.
