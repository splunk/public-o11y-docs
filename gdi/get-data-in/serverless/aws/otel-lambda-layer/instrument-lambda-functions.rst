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

If you don't use the guided setup, follow these instructions to manually install the Splunk OpenTelemetry Lambda layer:

- :ref:`otel-lambda-layer-requirements`
- :ref:`install-otel-lambda-layer`
- :ref:`set-env-vars-otel-lambda`


.. _otel-lambda-layer-requirements:

Check compatibility and requirements
----------------------------------------------

.. include:: /_includes/requirements/lambda.rst


Considerations on sizing and scaling
----------------------------------------------

The default version of the layer supports multiple runtimes and includes the Collector, as well as the metrics extension layer. If you need to reduce performance overhead, consider the following deployment methods:

- :ref:`instrument-aws-lambda-functions-modular`
- :ref:`instrument-aws-lambda-functions-ec2`


.. _install-otel-lambda-layer:

Install the AWS Lambda layer for your language
-------------------------------------------------

Follow these steps to instrument your function using the Splunk OpenTelemetry Lambda layer:

#. In the AWS Lambda console, select the function that you want to instrument.

#. In the :guilabel:`Layers` section, select :guilabel:`Add a layer`, then select :guilabel:`Specify an ARN`.

#. Copy the Amazon Resource Name (ARN) for the region of your Lambda function from the list matching your architecture:

   .. tabs::

      .. tab:: Standard x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm.md

      .. tab:: Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-arm.md

#. Paste the selected ARN in the :guilabel:`Specify an ARN` field and select :guilabel:`Add`.

#. Check that the Splunk layer appears in the :guilabel:`Layers` table.

If you don't want to use a local Collector, you must specify the address of a Collector in data forwarding mode. See :ref:`ec2-otel-collector-serverless`.

.. note:: You can automate the update of the Lambda layers using the AWS CLI or other automation tools.


.. _set-env-vars-otel-lambda:

.. include:: /_includes/gdi/lambda-configuration.rst


.. _send_directly_olly_cloud:

.. include:: /_includes/gdi/send-spans-directly-lambda.rst



Check that data appears in Splunk Observability Cloud
=====================================================================

Each time the AWS Lambda function runs, trace and metric data appears in Splunk Observability Cloud. If no data appears, see :ref:`troubleshooting-lambda-layer`.
