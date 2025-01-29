:orphan:

.. _integrate-o11y-with-grafana:

.. include:: /private-preview/splunk-o11y-plugin-for-grafana/toc.rst
    :start-after: :orphan:

***************************************************
Integrate Splunk Observability Cloud with Grafana
***************************************************

Use the Splunk Observability Cloud plugin for Grafana to monitor Splunk Observability Cloud data in Grafana. With this data source plugin, you can:

* Add and configure data sources from different Splunk Observability Cloud organizations in Grafana.
* Import and customize an application performance monitoring dashboard for data visualization.
* Build your own queries, including:
    * SignalFlow queries.
    * Templated queries with variables.
    * Queries to generate lists of pending incidents.
* Visualize query output on Grafana panels and dashboards.

Get started
=============

1. Deploy the plugin on :ref:`Kubernetes <deploy-grafana-k8s>` or the :ref:`Grafana Helm chart <deploy-grafana-helm>`.
2. Learn how to :ref:`Configure the Grafana plugin <configure-grafana-plugin>`.