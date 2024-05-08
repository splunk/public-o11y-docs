.. _instrument-aws-lambda-functions:

******************************************************************
Instrument your AWS Lambda function for Splunk Observability Cloud
******************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Lambda layer automatically instruments your AWS Lambda functions for many programming languages. Follow these steps to get started.

.. toctree::
   :hidden:

   Instrument your Lambda using multiple layers <instrumentation/lambda-language-layers>
   Instrument your Lambda with a Collector in EC2 <instrumentation/lambda-ec2-collector-gateway>
   .NET lambda functions <instrumentation/dotnet-lambdas>
   Go lambda functions <instrumentation/go-lambdas>

Use the Splunk OpenTelemetry Lambda layer to automatically instrument your AWS Lambda functions for many programming languages. To get started, use the guided setup or follow the instructions manually.

.. raw:: html
<<<<<<< HEAD

  <embed>
    <h2>Generate customized instructions using the guided setup <a name="lambda-instructions" class="headerlink" href="#lambda-instructions" title="Permalink to this headline">¶</a></h2>
  </embed>
=======
>>>>>>> main

  <embed>
    <h2>Generate customized instructions using the guided setup <a name="lambda-instructions" class="headerlink" href="#lambda-instructions" title="Permalink to this headline">¶</a></h2>
  </embed>

To generate a template that instruments your AWS Lambda function using the Splunk OpenTelemetry Lambda layer, use the AWS Lambda guided setup. To access the AWS Lambda guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.

#. Open the :new-page:`AWS Lambda guided setup <https://login.signalfx.com/#/gdi/scripted/awslambda/step-1?category=product-apm&gdiState=%7B"integrationId":"awslambda"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management` to open the :guilabel:`Integrate Your Data` page.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`AWS Lambda`.

   #. Select the :guilabel:`AWS Lambda` tile to open the AWS Lambda guided setup.

.. raw:: html

  <embed>
    <h2>Install the Splunk OpenTelemetry Lambda layer manually <a name="lambda-manual-install" class="headerlink" href="#lambda-manual-install" title="Permalink to this headline">¶</a></h2>
  </embed>

If you don't use the guided setup, follow these instructions to manually install the Splunk OpenTelemetry Lambda layer.

.. raw:: html

  <embed>
    <h3>Check compatibility and requirements <a name="otel-lambda-layer-requirements" class="headerlink" href="#otel-lambda-layer-requirements" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/requirements/lambda.rst

.. raw:: html

  <embed>
    <h3>Considerations on sizing and scaling <a name="otel-lambda-layer-sizing" class="headerlink" href="#otel-lambda-layer-sizing" title="Permalink to this headline">¶</a></h2>
  </embed>

<<<<<<< HEAD
The default version of the layer supports multiple runtimes and includes the Collector, as well as the metrics extension layer. If you need to reduce performance overhead, consider the following deployment methods:
=======
The default version of the layer supports multiple runtimes and includes the Collector, as well as the metrics extension layer. If you need to reduce performance overhead, consider choosing from the following deployment methods:
>>>>>>> main

- :ref:`instrument-aws-lambda-functions-modular`
- :ref:`instrument-aws-lambda-functions-ec2`

.. raw:: html

  <embed>
    <h2>Install the all-in-one AWS Lambda layer <a name="otel-lambda-layer-all-in-one" class="headerlink" href="#otel-lambda-layer-all-in-one" title="Permalink to this headline">¶</a></h2>
  </embed>

Follow these steps to instrument your function using the Splunk OpenTelemetry Lambda layer:

#. In the AWS Lambda console, select the function that you want to instrument.

#. In the :guilabel:`Layers` section, select :guilabel:`Add a layer`, then select :guilabel:`Specify an ARN`.

#. Copy the Amazon Resource Name (ARN) for the region of your AWS Lambda function from the list that matches your architecture:

   .. tabs::

      .. tab:: Standard x86_64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm.md

      .. tab:: Graviton2 ARM64

         .. github:: yaml
            :url: https://raw.githubusercontent.com/signalfx/lambda-layer-versions/main/splunk-apm/splunk-apm-arm.md

#. Paste the selected ARN in the :guilabel:`Specify an ARN` field and select :guilabel:`Add`.

#. Check that the Splunk OpenTelemetry Lambda layer appears in the :guilabel:`Layers` table.

If you don't want to use a local Collector, you must specify the address of a Collector in data forwarding mode. See :ref:`ec2-otel-collector-serverless`.

.. note:: You can automate the update of the AWS Lambda layers using the AWS CLI or other automation tools.

<<<<<<< HEAD
If you don't want to use a local Collector, you must specify the address of a Collector in data forwarding mode. See :ref:`ec2-otel-collector-serverless`.

.. note:: You can automate the update of the Lambda layers using the AWS CLI or other automation tools.

=======
>>>>>>> main

.. _set-env-vars-otel-lambda:

.. include:: /_includes/gdi/lambda-configuration.rst


.. _send_directly_olly_cloud:

.. include:: /_includes/gdi/send-spans-directly-lambda.rst

.. raw:: html

  <embed>
    <h2>Check that data appears in Splunk Observability Cloud
 <a name="otel-lambda-check" class="headerlink" href="#otel-lambda-check" title="Permalink to this headline">¶</a></h2>
  </embed>

Each time the AWS Lambda function runs, trace and metric data appears in Splunk Observability Cloud. If no data appears, see :ref:`troubleshooting-lambda-layer`.
