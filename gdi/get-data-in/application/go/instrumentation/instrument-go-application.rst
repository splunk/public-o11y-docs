.. _instrument-go-applications:

***************************************************************
Instrument your Go application for Splunk Observability Cloud
***************************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Go can instrument your Go application or service. Follow these steps to get started.



.. raw:: html

   <div class="include-start" id="zero-code-info.rst"></div>

.. include:: /_includes/zero-code-info.rst

.. raw:: html

   <div class="include-stop" id="zero-code-info.rst"></div>



   
The Splunk Distribution of OpenTelemetry Go can instrument your Go application or service. To get started, use the guided setup or follow the instructions manually.

Generate customized instructions using the guided setup
====================================================================

To generate all the basic installation commands for your environment and application, use the Go guided setup. To access the Go guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Go guided setup <https://login.signalfx.com/#/gdi/scripted/go-tracing/step-1?category=product-apm&gdiState=%7B"integrationId":"go-tracing"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`. 

   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

   #. In the integration filter menu, select :guilabel:`By Product`.

   #. Select the :guilabel:`APM` product.

   #. Select the :guilabel:`Go` tile to open the Go guided setup.

Install the Splunk Distribution of OpenTelemetry Go manually
==================================================================

If you don't use the guided setup, follow these instructions to manually install the Splunk Distribution of OpenTelemetry Go.

.. _install-enable-go-instrumentation:

Install and activate the Go instrumentation
--------------------------------------------------------------------

Follow these steps to instrument your application using the Go instrumentation:

#. Check that you meet the requirements. See :ref:`go-otel-requirements`.

#. Install the distribution:

   .. code-block:: shell

      go get github.com/signalfx/splunk-otel-go/distro

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

#. (Optional) Set the version and environment name:

   .. tabs::

      .. code-tab:: shell Linux

         export OTEL_RESOURCE_ATTRIBUTES="service.version=<version>,deployment.environment=<environment>"

      .. code-tab:: shell Windows PowerShell

         $env:OTEL_RESOURCE_ATTRIBUTES="service.version=<version>,deployment.environment=<environment>"

#. Add the instrumentation using the ``distro`` package. The following example shows how to instrument a basic function.

   .. code-block:: go

      package main

      import (
         "context"
         "github.com/signalfx/splunk-otel-go/distro"
      )

      func main() {
         sdk, err := distro.Run()
         if err != nil {
            panic(err)
         }
         // Flush all spans before the application exits
         defer func() {
            if err := sdk.Shutdown(context.Background()); err != nil {
               panic(err)
            }
         }()

         // ...

#. Activate additional instrumentations. For more information, see :ref:`supported-go-libraries`.

#. (Optional) To link APM and RUM data, activate the HTTP instrumentation. See :ref:`server-trace-information-go`.

If no data appears in APM, see :ref:`common-go-troubleshooting`.

.. note:: If you need to add custom attributes to spans or want to manually generate spans, instrument your Go application or service manually. See :ref:`go-manual-instrumentation`.

.. _kubernetes_go:

Deploy the Go instrumentation in Kubernetes or Azure
--------------------------------------------------------------------

To deploy the Go instrumentation in Kubernetes or Azure, configure the Kubernetes Downward API to expose environment variables to Kubernetes resources.

The following example shows how to update a deployment to expose environment variables by adding the OTel configuration under the ``.spec.template.spec.containers.env`` section:

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

.. _export-directly-to-olly-cloud-go:

Send data directly to Splunk Observability Cloud
==================================================================

By default, all telemetry is sent to the local instance of the Splunk Distribution of OpenTelemetry Collector.

If you need to send data directly to Splunk Observability Cloud, set the following environment variables:

.. tabs::

   .. code-tab:: bash Linux

      export SPLUNK_ACCESS_TOKEN=<access_token>
      export SPLUNK_REALM=<realm>

   .. code-tab:: shell Windows PowerShell

      $env:SPLUNK_ACCESS_TOKEN=<access_token>
      $env:SPLUNK_REALM=<realm>

To obtain an access token, see :ref:`admin-api-access-tokens`.

To find your Splunk realm, see :ref:`Note about realms <about-realms>`. 

For more information on the ingest API endpoints, see :new-page:`Send APM traces <https://dev.splunk.com/observability/docs/apm/send_traces/>` and :new-page:`Send data points <https://dev.splunk.com/observability/docs/datamodel/ingest#Send-data-points>`.

Specify the source host 
--------------------------------------------------------------------



.. raw:: html

   <div class="include-start" id="gdi/apm-api-define-host.rst"></div>

.. include:: /_includes/gdi/apm-api-define-host.rst

.. raw:: html

   <div class="include-stop" id="gdi/apm-api-define-host.rst"></div>



