.. _configure-third-party-apps:

***************************************************************************************
Part 3: Configure third-party server applications to send metrics, logs, and traces
***************************************************************************************

.. meta:: 
    :description: Configure your third-party applications to send data to Splunk Observability Cloud.

After you've completed :ref:`send-server-cluster-data` and installed the Splunk Distribution of OpenTelemetry Collector on your servers (hosts) or in your clusters, configure the Collector's native receivers or third-party applications, such as Apache, Cassandra, Hadoop, Kafka, and NGINX, to monitor your systems.

Configuring these systems doesn't require any additional installation steps. Instead, you can use the Collector's configuration files to add servers and applications. 

Configure native receivers and third-party applications
==============================================================

Using the Collector's native receivers, you can gather metrics, traces, and logs from sources such as MySQL, MongoDB, and Kafka. To configure these receivers, see :ref:`otel-components`.

You can also configure third-party applications to send data to Splunk Observability Cloud. For a list of these integrations, see :ref:`integrations-list`.

View your data in Splunk Observability Cloud
==============================================================

After you've configured the Collector's pipelines for your desired server applications, use one of the following methods to access your data:

* :ref:`third-party-built-in-dashboards`
* :ref:`third-party-metric-finder`
* :ref:`third-party-query-logs`

If you can see your data in dashboards or in the metric finder, then your integration is working.

.. _third-party-built-in-dashboards:

View metrics using built-in dashboards available for your server applications
------------------------------------------------------------------------------------------

Splunk Observability Cloud uses navigators to display information about server applications.

For example, the built-in Kafka dashboard shows visualizations for Kafka data:

   .. image:: /_images/gdi/kafka-dashboard.png
      :width: 100%
      :alt: This screenshot shows the Kafka built-in dashboard.

For more information about dashboards, see :ref:`view-dashboards`.

.. _third-party-metric-finder:

Search for metrics using the metric finder
---------------------------------------------------------------------

You can search for your server application metrics using the Splunk metric finder.

For the list of metrics provided by an application receiver, see the :ref:`documentation for the application receiver <monitor-data-sources>`.

For information about how to use the metric finder, see :ref:`metric-finder`.

.. _third-party-query-logs:

Query logs in Log Observer, if you chose to ingest logs
---------------------------------------------------------------------------------------

If you chose to ingest logs, you can query them in the Splunk Log Observer. For more information, see :ref:`logs-timeline`.