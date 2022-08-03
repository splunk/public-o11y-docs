.. _get-started-get-data-in:

*********************
Start getting data in
*********************

.. meta::
   :description: Start sending data to Splunk Observability Cloud.

..	toctree::
   :hidden:

   connect/connect
   compute/compute
   application/application

This page provides an overview for sending data from common data sources to Observability Cloud. Configure integrations in Observability Cloud to collect metrics, logs, and spans from your infrastructure and services.

You have to be an administrator to configure integrations in Observability Cloud. Each integration walks you through a step-by-step process to collect supported data types. To configure an integration for any data source, select :strong:`Navigation menu > Data setup`.

The following steps describe how to configure integrations that collect metrics, logs, and spans from your infrastructure and services.  

..  image:: /_images/get-started/o11y-first-hour.png
    :alt: This image describes the steps to get data in to Observability Cloud from cloud services, infrastructure components, and services.

:strong:`Step 1. Connect cloud services`

Connect your cloud service provider to collect metrics and logs from supported cloud services. Observability Cloud provides integrations for AWS, GCP, and Azure. 

To connect to a cloud service, select :strong:`Navigation menu > Data setup` and search for the cloud service you want to connect to. 

See these pages for more information about connecting cloud services to Observability Cloud:

- :ref:`get-started-aws`
- :ref:`get-started-gcp`
- :ref:`get-started-azure`

:strong:`Step 2. Collect infrastructure data with an OpenTelemetry Collector`

Observability Cloud provides supported integrations for Kubernetes, Linux, and Windows. Integrations for these data sources help you deploy a :new-page:`Splunk OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector>` to export metrics and logs from hosts and containers to Observability Cloud. 

If you plan to instrument any services with OpenTelemetry (step three), ensure that you configure an integration to deploy an OpenTelemetry Collector on the host or in the Kubernetes cluster each service is running in before you instrument a service.

To collect metrics and logs from an infrastructure resource, select :strong:`Navigation menu > Data setup` and search for the host type or containerized environment you want to collect metrics and logs from. 

See these pages for more information about sending host or container metrics and logs to Observability Cloud:

- :ref:`get-started-k8s`
- :ref:`get-started-linux`
- :ref:`get-started-windows`

:strong:`Step 3. Export spans from services with OpenTelemetry instrumentation`

If you wish to use Observability Cloud's APM capabilities, you will need to apply language-specific instrumentation packages to each service. Each of these contains a Splunk distribution of OpenTelemetry instrumentation based on the service's language. If you did not deploy an OpenTelemetry Collector on the host or in the Kubernetes cluster the service is running in (step two), go do that first.

Once a service has been instrumented, it will export spans to an OpenTelemetry Collector running on the host or in the Kubernetes cluster that you deployed in the previous step. How you specify the OpenTelemetry Collector endpoint depends on the language you are instrumenting. For more information, see the page for the language you are instrumenting. 

To collect spans and traces from a service, select :strong:`Navigation menu > Data setup` and search for an instrumentation library for the service you want to instrument. 

See the following pages for more information about the language you want to instrument:

.. hlist::
   :columns: 2

   - :ref:`Java <get-started-java>`
   - :ref:`.NET (Core & Framework) <get-started-dotnet>`
   - :ref:`Javascript <get-started-nodejs>`
   - :ref:`Python <get-started-python>`
   - :ref:`Ruby <get-started-ruby>`
   - :ref:`PHP <get-started-php>`