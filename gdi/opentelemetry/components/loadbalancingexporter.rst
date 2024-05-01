.. _loadbalancingexporter:

***************************************************
Loadbalancing exporter
***************************************************

.. meta::
    :description: Loadbalancing exporter

The loadbalancing exporter exports spans, metrics, and logs. The supported pipeline types are ``metrics``, ``traces``, and ``logs``. You can filter the type of data that the loadbalancing exporter exports by using a ``routing-key``.

Get started
============================

This is an exporter that exports spans, metrics and logs depending on the ``routing_key`` configured.

The following table shows options for the ``routing_key``:

.. list-table:: 
    :header-rows: 1
    :widths: 50 50

    * - routing_key
      - used for
    * - ``service``
      - logs, spans, metrics
    * - ``traceID``
      - logs, spans
    * - ``resource``
      - metrics
    * - ``metric``
      - metrics

By default, the routing mechanism is ``traceID`` for traces and ``service`` for metrics.

Sample configurations
----------------------------

This section details some example configurations for the loadbalancing exporter.

Simple example configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example is a simple configuration of the ``loadbalancing`` exporter:

.. code-block:: yaml

    receivers:
      otlp:
        protocols:
        grpc:
            endpoint: localhost:4317

    processors:

    exporters:
      loadbalancing:
        routing_key: "service"
        protocol:
        otlp:
            # all options from the OTLP exporter are supported
            # except the endpoint
          timeout: 1s
        resolver:
          static:
            hostnames:
            - backend-1:4317
            - backend-2:4317
            - backend-3:4317
            - backend-4:4317
            # Notice to config a headless service DNS in Kubernetes  
            # dns:
            #  hostname: otelcol-headless.observability.svc.cluster.local        

        service:
        pipelines:
          traces:
          receivers:
            - otlp
          processors: []
          exporters:
            - loadbalancing
          logs:
          receivers:
            - otlp
          processors: []
          exporters:
            - loadbalancing

Kubernetes resolver example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows a configuration for a Kubernetes resolver:

.. code-block:: yaml

    receivers:
      otlp:
        protocols:
      grpc:
        endpoint: localhost:4317

    processors:

    exporters:
    loadbalancing:
        routing_key: "service"
        protocol:
        otlp:
            # all options from the OTLP exporter are supported
            # except the endpoint
            timeout: 1s
        resolver:
        # use k8s service resolver, if collector runs in kubernetes environment
        k8s:
            service: lb-svc.kube-public
            ports:
            - 15317
            - 16317

    service:
    pipelines:
        traces:
        receivers:
            - otlp
        processors: []
        exporters:
            - loadbalancing
        logs:
        receivers:
            - otlp
        processors: []
        exporters:
            - loadbalancing

Settings
============================

The following table shows the configuration options for the Loadbalancing exporter:

.. raw:: html
    
    <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tool/main/cfg-metadata/exporter/loadbalancing.yaml"></div>

Troubleshooting
============================

.. include:: /_includes/troubleshooting-components.rst