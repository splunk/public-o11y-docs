.. _instrument-python-applications:

***************************************************************
Instrument a Python application for Splunk Observability Cloud
***************************************************************

.. meta::
   :description: The Splunk OpenTelemetry Python agent can automatically instrument your Python application or service. Follow these steps to get started.

The Python agent from the Splunk Distribution of OpenTelemetry Python can automatically instrument your Python application by dynamically patching supported libraries.

To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate all the basic installation commands for your environment and application, use the Python guided setup. To access the Python guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Python guided setup <https://login.signalfx.com/#/gdi/scripted/python-tracing/step-1?category=product-apm&gdiState=%7B"integrationId":"python-tracing"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`. 

   #. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.

   #. In the integration filter menu, select :guilabel:`By Product`.

   #. Select the :guilabel:`APM` product.

   #. Select the :guilabel:`Python` tile to open the Python guided setup.

Install the Splunk Distribution of OpenTelemetry Python manually
==================================================================

Follow these instructions to install the Splunk Distribution of OpenTelemetry Python:

- :ref:`install-enable-python-agent`
- :ref:`configure-python-instrumentation`

.. _install-enable-python-agent:

Install and activate the Python agent
----------------------------------------------------

Follow these steps to automatically instrument your application using the Python agent:

#. Check that you meet the requirements. See :ref:`python-otel-requirements`.

#. Install the ``splunk-opentelemetry[all]`` package:

   .. code-block:: bash

      pip install "splunk-opentelemetry[all]"

   If you're using a requirements.txt or pyproject.toml file, add ``splunk-opentelemetry[all]`` to it.

#. Run the bootstrap script to install instrumentation for every supported package in your environment:

   .. code-block:: bash

      splunk-py-trace-bootstrap

   To print the instrumentation packages to the console instead of installing them, run ``splunk-py-trace-bootstrap --action=requirements``. You can then add the output to your requirements or Pipfile.

#. Set the ``OTEL_SERVICE_NAME`` environment variable:

   .. tabs::

      .. code-tab:: shell Linux

         export OTEL_SERVICE_NAME=<yourServiceName>

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_SERVICE_NAME=<yourServiceName>

#. (Optional) Set the endpoint URL if the Splunk Distribution of OpenTelemetry Collector is running on a different host:

   .. tabs::

      .. code-tab:: shell Linux

         export OTEL_EXPORTER_OTLP_ENDPOINT=<yourCollectorEndpoint>:<yourCollectorPort>

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_EXPORTER_OTLP_ENDPOINT=<yourCollectorEndpoint>:<yourCollectorPort>

#. (Optional) Set the deployment environment and service version:

   .. tabs::

      .. code-tab:: bash Linux

         export OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,service.version=<version>'

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_RESOURCE_ATTRIBUTES='deployment.environment=<envtype>,service.version=<version>'

#. Activate the Splunk OTel Python agent by editing your Python service command.

   For example, if you open your Python application as follows:

      .. code-block:: bash

         python3 main.py --port=8000

   prefix the command with ``splunk-py-trace``:

      .. code-block:: bash

         splunk-py-trace python3 main.py --port=8000

   .. note:: To instrument uWSGI applications, see :ref:`python-manual-instrumentation`.

#. (Optional) Perform these additional steps if you're using the Django framework:

   - :ref:`django-instrumentation`

If no data appears in APM, see :ref:`common-python-troubleshooting`.

.. _configure-python-instrumentation:

Configure the Python agent
----------------------------------------------------

In most cases, the only configuration setting you need to enter is the service name. You can also define other basic settings, like the deployment environment, the service version, and the endpoint, among others.

For advanced configuration of the Python agent, like changing trace propagation formats, correlating traces and logs, or configuring server trace data, see :ref:`advanced-python-otel-configuration`.

.. _kubernetes_python_agent:

Deploy the Python agent in Kubernetes
----------------------------------------------------

To deploy the Python agent in Kubernetes, configure the Kubernetes Downward API to expose environment variables to Kubernetes resources.

The following example shows how to update a deployment to expose environment variables by adding the agent configuration under the ``.spec.template.spec.containers.env`` section:

.. code-block:: yaml

   apiVersion: apps/v1
   kind: Deployment
   spec:
     selector:
       matchLabels:
         app: your-application
     template:
       spec:
         containers:
           - name: myapp
             env:
               - name: SPLUNK_OTEL_AGENT
                 valueFrom:
                   fieldRef:
                     fieldPath: status.hostIP
               - name: OTEL_EXPORTER_OTLP_ENDPOINT
                 value: "http://$(SPLUNK_OTEL_AGENT):4317"
               - name: OTEL_SERVICE_NAME
                 value: "<serviceName>"
               - name: OTEL_RESOURCE_ATTRIBUTES
                 value: "deployment.environment=<environmentName>"

.. _export-directly-to-olly-cloud-python:

Send data directly to Splunk Observability Cloud
----------------------------------------------------

By default, the agent sends all telemetry to the local instance of the Splunk Distribution of OpenTelemetry Collector.

To send data directly to Splunk Observability Cloud, set the following environment variables:

.. tabs::

   .. code-tab:: bash Linux

      export SPLUNK_ACCESS_TOKEN=<access_token>
      export OTEL_TRACES_EXPORTER=jaeger-thrift-splunk
      export OTEL_EXPORTER_JAEGER_ENDPOINT=https://ingest.<realm>.signalfx.com/v2/trace

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_ACCESS_TOKEN=<access_token>
      $env:OTEL_TRACES_EXPORTER=jaeger-thrift-splunk
      $env:OTEL_EXPORTER_JAEGER_ENDPOINT=https://ingest.<realm>.signalfx.com/v2/trace

To obtain an access token, see :ref:`admin-api-access-tokens`.

In the ingest endpoint URL, ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

#. Open the navigation menu in Splunk Observability Cloud.
#. Select :menuselection:`Settings`.
#. Select your username. 

The realm name appears in the :guilabel:`Organizations` section. 

.. note:: For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>`.

.. _instrument_aws_python_functions:

Instrument Lambda functions
----------------------------------------------------

You can instrument AWS Lambda functions using the Splunk OpenTelemetry Lambda Layer. See :ref:`instrument-aws-lambda-functions` for more information.
