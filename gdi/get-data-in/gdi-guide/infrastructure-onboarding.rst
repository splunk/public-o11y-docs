.. _infrastructure-onboarding.rst:

**********************************************************
Configure infrastructure and cloud services
**********************************************************

.. meta:: 
    :description: Configure cloud services, servers, clusters, and third-party applications to send data to Splunk Observability Cloud.

.. toctree::
    :hidden:

    infrastructure/integrate-cloud-services.rst


.. _gdi-2:

Part 2: Install the OpenTelemetry Collector to send server and cluster data
=============================================================================================================

Install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` on any hosts or clusters you're using as a part of your infrastructure, such as servers running in your data center or on a virtual machine running in the cloud to: 

- Send metrics to Infrastructure Monitoring
- Send logs to Log Observer
- Set up your environment to receive logs and traces from applications instrumented in step :ref:`gdi-4`

After you've installed the Collector and configured your servers and clusters, you can access your data in the following locations:

- View metrics in Infrastructure Monitoring navigators

   .. image:: /_images/infrastructure/hosts-navigator.png
      :width: 100%
      :alt: This screenshot shows the Hosts navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from hosts.

   For more information, see:

      - :ref:`monitor-hosts`
      - :Ref:`use-the-k8s-navigator`

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for hosts and Kubernetes

- Search for metrics :ref:`using Metric Finder <metric-finder>`

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

Steps
-------------------------------------------------------------------

- To configure Windows servers, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install on Windows <get-started-windows>`
   - :ref:`Manually install on Windows <otel-install-windows-manual>`

- To configure Linux servers, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install on Linux <get-started-linux>`
   - :ref:`Manually install on Linux <otel-install-linux-manual>`

- To configure Kubernetes clusters, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install in a Kubernetes cluster <get-started-k8s>`
   - :ref:`Manually install in a Kubernetes cluster <otel-install-k8s>`

One of the benefits of using the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud is that Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud, is easier to implement. For more information, see :ref:`get-started-relatedcontent`.

.. _gdi-3:

1. Configure third-party server applications to send metrics, logs, and traces
=========================================================================================================================

After you've completed step :ref:`gdi-2` and installed the Splunk Distribution of OpenTelemetry Collector on your servers (hosts) or in your clusters, configure the Collector's :ref:`native receivers <collector-components-receivers>` or :ref:`any of these third-party applications <monitor-data-sources>`, such as Apache, Cassandra, Hadoop, Kafka, and NGINX, to monitor your systems.

After you've configured the Collector's pipelines for your desired server applications, access your data in the following locations:

- View metrics using any built-in dashboards available for your server applications. For example, here is the built-in Kafka dashboard:

   .. image:: /_images/gdi/kafka-dashboard.png
      :width: 100%
      :alt: This screenshot shows the Kafka built-in dashboard.

   For more information about dashboards, see :ref:`view-dashboards`.

- Search for metrics :ref:`using Metric Finder <metric-finder>`. For the list of metrics provided by an application receiver, see the :ref:`documentation for the application receiver <monitor-data-sources>`.

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

- For SignalFx Forwarder only, you can:

      - View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`
      - View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`