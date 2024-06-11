.. _configure-third-party-apps:

***************************************************************************************
Part 3: Configure third-party server applications to send metrics, logs, and traces
***************************************************************************************

.. meta:: 
    :description: Configure your third-party applications to send data to Splunk Observability Cloud.

After you've completed step  and installed the Splunk Distribution of OpenTelemetry Collector on your servers (hosts) or in your clusters, configure the Collector's :ref:`native receivers <collector-components-receivers>` or :ref:`any of these third-party applications <monitor-data-sources>`, such as Apache, Cassandra, Hadoop, Kafka, and NGINX, to monitor your systems.

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