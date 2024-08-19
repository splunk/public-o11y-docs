.. _otel-kubernetes-config-add:

**********************************************************************************************
Configure the Collector for Kubernetes with Helm: Add components and data sources
**********************************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Kubernetes: Add components or new data sources.

After you've :ref:`installed the Collector for Kubernetes <otel-install-k8s>`, these are the available settings you can configure. Additionally, see also :ref:`the advanced configuration options <otel-kubernetes-config-advanced>` and :ref:`otel-kubernetes-config-logs`.

.. _otel-kubernetes-config-add-components:

Add additional components to the configuration
======================================================

To use any additional OTel component, integration or legacy monitor, add it the relevant sections of the configuration file. Depending on your requirements, you might want to include it in the ``agent`` or the ``clusterReceiver`` component section of the configuration. See more at :ref:`helm-chart-components`.

For a full list of available components and how to configure them, see :ref:`otel-components`. For a list of available application integrations, see :ref:`monitor-data-sources`.

How to collect data: agent or cluster receiver?
-----------------------------------------------------------------------------

Read the following table to decide which option to chose to collect your data:

.. list-table:: 
  :header-rows: 1
  :width: 100%
  :widths: 20 40 40 

  * - 
    - Collect via the Collector agent 
    - Collect via the Collector cluster receiver 

  * - Where is data collected?
    - At the node level.
    - At the Kubernetes service level, through a single point.

  * - Advantages
    - * Granularity: This option ensures that you capture the complete picture of your cluster's performance and health. 
      * Fault tolerance: If a node becomes isolated or experiences issues, its metrics are still being collected independently. This gives you visibility into problems affecting individual nodes.
    - Simplicity: This option simplifies the setup and management. 

  * - Considerations
    - Complexity: Managing and configuring agents on each node can increase operational complexity, specifically agent config file management.
    - Uncomplete data: This option might result in a partial view of your cluster's health and performance. If the service collects metrics only from a subset of nodes, you might miss critical metrics from parts of your cluster.

  * - Use cases
    - - Use this in environments where you need detailed insights into each node's operations. This allows better issue diagnosing and optimizing performance. 
      - Use this to collect metrics from application pods that have multiple replicas that can be running on multiple nodes.
    - Use this in environments where operational simplicity is a priority, or if your cluster is already simple and has only 1 node.

Example: Add the MySQL receiver
-----------------------------------------------------------------------------

This example shows how to add the :ref:`mysql-receiver` to your configuration file.

Add the MySQL receiver in the ``agent`` section
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To use the Collector agent daemonset to collect ``mysql`` metrics from every node the agent is deployed to, add this to your configuration:

.. code:: yaml

  agent:
    config:
      receivers:
        mysql:
          endpoint: localhost:3306
          ...

Add the MySQL receiver in the ``clusterReceiver`` section
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To use the Collector cluster receiver deployment to collect ``mysql`` metrics from a single endpoint, add this to your configuration:

.. code:: yaml

  clusterReceiver:
    config:
      receivers:
        mysql:
          endpoint: mysql-k8s-service:3306
          ...

Example: Add the Rabbit MQ monitor
-----------------------------------------------------------------------------

This example shows how to add the :ref:`rabbitmq` integration to your configuration file.

Add RabbitMQ in the ``agent`` section
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you want to activate the RabbitMQ monitor in the Collector agent daemonset, add ``mysql`` to the ``receivers`` section of your agent section in the configuration file:

.. code:: yaml

  agent:
    config:
      receivers:
        smartagent/rabbitmq:
          type: collectd/rabbitmq
          host: localhost
          port: 5672
          username: otel
          password: ${env:RABBITMQ_PASSWORD}

Next, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers:
          - smartagent/rabbitmq

Add RabbitMQ in the ``clusterReceiver`` section
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Similarly, if you want to activate the RabbitMQ monitor in the cluster receiver, add ``mysql`` to the ``receivers`` section of your cluster receiver section in the configuration file:

.. code:: yaml

  clusterReceiver:
    config:
      receivers:
        smartagent/rabbitmq:
          type: collectd/rabbitmq
          host: rabbitmq-service
          port: 5672
          username: otel
          password: ${env:RABBITMQ_PASSWORD}

Next, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers:
          - smartagent/rabbitmq

Activate discovery mode on the Collector
============================================

Use the discovery mode of the Splunk Distribution of OpenTelemetry Collector to detect metric sources and create
a configuration based on the results.

See :ref:`discovery-mode-k8s` for instructions on how to activate discovery mode in the Helm chart.

.. _otel-kubernetes-config-resources:

Add additional telemetry sources
===========================================

Use the ``autodetect`` configuration option to activate additional telemetry sources.

Set ``autodetect.prometheus=true`` if you want the Collector to scrape Prometheus metrics from pods that have generic Prometheus-style annotations. Add the following annotations on pods to allow a fine control of the scraping process:

* ``prometheus.io/scrape: true``: The default configuration scrapes all pods. If set to ``false``, this annotation excludes the pod from the scraping process.
* ``prometheus.io/path``: The path to scrape the metrics from. The default value is ``/metrics``.
* ``prometheus.io/port``: The port to scrape the metrics from. The default value is ``9090``.

If the Collector is running in an Istio environment, set ``autodetect.istio=true`` to make sure that all traces, metrics, and logs reported by Istio are collected in a unified manner.

For example, use the following configuration to activate automatic detection of both Prometheus and Istio telemetry sources:

.. code-block:: yaml

  splunkObservability:
    accessToken: xxxxxx
    realm: us0
  clusterName: my-k8s-cluster
  autodetect:
    istio: true
    prometheus: true

.. _otel-kubernetes-deactivate-telemetry:

Deactivate particular types of telemetry
============================================

By default, OpenTelemetry sends only metrics and traces to Splunk Observability Cloud and sends only logs to Splunk Platform. You can activate or deactivate any kind of telemetry data collection for a specific destination. 

For example, the following configuration allows the Collector to send all collected telemetry data to Splunk Observability Cloud and the Splunk Platform if you've properly configured them:

.. code-block:: yaml

  splunkObservability:
    metricsEnabled: true
    tracesEnabled: true
    logsEnabled: true
  splunkPlatform:
    metricsEnabled: true
    logsEnabled: true

