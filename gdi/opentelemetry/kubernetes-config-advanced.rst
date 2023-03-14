.. _otel-kubernetes-config-advanced:

*********************************************************************************
Advanced configuration for Kubernetes
*********************************************************************************

.. meta::
      :description: Advanced configurations for the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

See the following advanced configuration options for the Collector for Kubernetes.


Run the container in non-root user mode
==================================================

Collecting logs often requires reading log files that are owned by the root user. By default, the container runs with ``securityContext.runAsUser = 0``, which gives the root user permission to read those files. To run the container in non-root user mode, set ``.agent.securityContext`` to ``20000`` to cause the container to run the required file system operations as UID and GID ``20000`` (this can be any other UID and GUI).

.. note::
   Setting the ``containerRuntime:`` parameter to ``cri-o`` did not work during internal testing for logs collection.


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

