.. _loadbalancingexporter:

***************************************************
Load balancing exporter
***************************************************

.. meta::
    :description: The load balancing exporter exports spans, metrics, and log to different back-ends that you can define.

The load balancing exporter is an OpenTelemetry Collector component that can export spans, metrics, and logs to multiple different back-ends. The supported pipeline types are ``metrics``, ``traces``, and ``logs``.

.. _loadbalancing-exporter-benefits:

Benefits
============================

The load balancing exporter can send telemetry data to multiple back-ends at once, avoiding the risk of back-end bottlenecks. 

In some cases, the Collector sends data faster than a back-end can ingest it. The load balancing exporter can help you avoid this kind of issue by splitting the data between multiple routes and back-ends.

Using the load balancing exporter, you can also send data to other running instances of the OpenTelemetry Collector through Collector endpoints. For example, you can send all traces to one running instance of the Collector and all logs to another running instance. Using this method, you can process or manipulate your data in separate Collector environments.

.. _get-started-loadbalancing-exporter:

Get started
============================

To use the load balancing exporter, provide a list of back-ends that can receive telemetry data.

You can provide a static list of IP addresses, or a DNS host name to resolve. See :ref:`loadbalancing-sample-configs` for example configurations of the load balancing exporter that use each type of list.

.. _routing-keys:

Routing keys
------------------------

The load balancing exporter can export spans, metrics, and logs depending on the ``routing_key`` configured. 

The ``routing_key`` groups spans, metrics, and logs together. For example, the load balancing exporter sends all spans that belong to the same ``traceID`` to the same back-end.

The following table shows options for the ``routing_key``:

.. list-table:: 
    :header-rows: 1
    :widths: 50 50

    * - Routing key
      - Used for
    * - ``service``
      - Logs, spans, metrics
    * - ``traceID``
      - Logs, spans
    * - ``resource``
      - Metrics
    * - ``metric``
      - Metrics

By default, the routing mechanism is ``traceID`` for traces and ``service`` for metrics.

.. _loadbalancing-sample-configs:

Sample configurations
----------------------------------

This section details some example configurations for the load balancing exporter.

Static list
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example uses a static list of host names to configure the load balancing exporter for separate back-ends:

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

Kubernetes resolver
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example configures the load balancing exporter for a Kubernetes resolver:

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


.. _loadbalancing-exporter-settings: 

Settings
============================

The following table shows the configuration options for the load balancing exporter:

.. raw:: html
    
    <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tool/main/cfg-metadata/exporter/loadbalancing.yaml"></div>

Troubleshooting
============================

.. include:: /_includes/troubleshooting-components.rst
