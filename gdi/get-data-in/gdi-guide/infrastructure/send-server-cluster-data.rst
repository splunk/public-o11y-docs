.. _send-server-cluster-data:

******************************************************************************
Part 2: Install the OpenTelemetry Collector to send server and cluster data
******************************************************************************

.. meta:: 
    :description: Use the OpenTelemetry Collector to collect and send data from your infrastructure, including hosts, servers, and clusters.

Install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` on any hosts or clusters you're using as a part of your infrastructure, such as servers running in your data center or on a virtual machine running in the cloud to: 

- Send metrics to Infrastructure Monitoring
- Send logs to Log Observer
- Set up your environment to receive logs and traces from applications instrumented in :ref:`instrument-back-end-services-apm`.

.. image:: /_images/infrastructure/k8s-nav-pivot.gif
    :alt: Using the Kubernetes infrastructure navigator in Splunk Observability Cloud.

Install the OpenTelemetry Collector for your servers or clusters
=======================================================================

To receive infrastructure data from your servers and clusters, install and configure the Splunk Distribution of OpenTelemetry Collector for your server or cluster.

The OpenTelemetry Collector runs as an application or pod and listens for telemetry data from your servers or clusters. After finding data, the Collector sends it to Splunk Infrastructure Monitoring. To learn more about the Collector, see :ref:`otel-understand-use`.

Guided setup
-----------------------

For a quick setup, you can follow a guided installation process through the Splunk Observability Cloud UI. To do so, see the documentation corresponding to your platform:

* Linux: :ref:`get-started-linux`
* Kubernetes :ref:`get-started-k8s`
* Windows: :ref:`get-started-windows`

Manual setup
------------------------

If you're planning to use a more advanced setup for the OpenTelemetry Collector, you can manually install and configure the Collector. To do so, follow the setup guide corresponding to your platform:

* Linux: :ref:`otel-install-linux-manual`
* Kubernetes: :ref:`otel-install-k8s`
* Windows: :ref:`otel-install-windows-manual`

View your infrastructure data in Splunk Infrastructure Monitoring
=======================================================================

After you've installed the Collector and configured your servers and clusters, you can use the following methods to access your data:

* :ref:`inframon-navigators`
* :ref:`view-metrics-inframon`
* :ref:`metric-finder-inframon`
* :ref:`query-logs-inframon`

If you can see your data in navigators, dashboards, or in the metric finder, then your integration is working.

.. _inframon-navigators:

View metrics in Infrastructure Monitoring navigators
--------------------------------------------------------------

Splunk Observability Cloud uses navigators to display information about hosts and clusters.

For example, the host navigator shows charts and other visualizations of host data:

.. image:: /_images/infrastructure/hosts-navigator.png
   :width: 100%
   :alt: This screenshot shows the Hosts navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from hosts.

To learn how to use Infrastructure Monitoring navigators, see the following:

* :ref:`monitor-hosts`
* :ref:`use-the-k8s-navigator`

.. _view-metrics-inframon:

View metrics in built-in dashboards for hosts and Kubernetes
----------------------------------------------------------------------------------------------

Splunk Observability Cloud offers built-in dashboards that display charts for your infrastructure metrics. To find your metrics in these dashboards, see :ref:`built-in-dashboards`.

.. _metric-finder-inframon:

Search for metrics using the metric finder
----------------------------------------------------------------------------------------------

You can find your infrastructure metrics by using the Splunk metric finder. For more details, see :ref:`metric-finder`.

.. _query-logs-inframon:

Query logs in Log Observer
----------------------------------------------------------------------------------------------

If you chose to ingest logs, you can query them in the Splunk Log Observer. For more information, see :ref:`logs-timeline`.

Next steps
=========================================

To finalize setting up your infrastructure, see :ref:`configure-third-party-apps`.