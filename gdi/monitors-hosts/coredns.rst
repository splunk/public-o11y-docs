.. _coredns:

CoreDNS
=======

.. meta::
   :description: Use this Splunk Observability Cloud integration for the CoreDNS monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the CoreDNS monitor type to scrape Prometheus metrics exposed by CoreDNS.

The default port for these metrics are exposed on port 9153, at the ``/metrics`` path.

.. note:: If you're using the Splunk Distribution of the OpenTelemetry Collector and want to collect Prometheus metrics, see :ref:`prometheus-generic`.

Benefits
--------



.. raw:: html

   <div class="include-start" id="benefits.rst"></div>

.. include:: /_includes/benefits.rst

.. raw:: html

   <div class="include-stop" id="benefits.rst"></div>




Installation
------------



.. raw:: html

   <div class="include-start" id="collector-installation.rst"></div>

.. include:: /_includes/collector-installation.rst

.. raw:: html

   <div class="include-stop" id="collector-installation.rst"></div>




Configuration
-------------



.. raw:: html

   <div class="include-start" id="configuration.rst"></div>

.. include:: /_includes/configuration.rst

.. raw:: html

   <div class="include-stop" id="configuration.rst"></div>




Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code:: yaml

   receivers:
     smartagent/coredns:
       type: coredns
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/coredns]

Configure a Kubernetes environment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here is an example configuration for a Kubernetes environment:

.. code:: yaml

   receivers:
     smartagent/coredns:
       type: coredns
       discoveryRule: kubernetes_pod_name =~ "coredns" && port == 9153
       extraDimensions:
         metric_source: "k8s-coredns"

Configuration options
~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``httpTimeout``
      - no
      - ``int64``
      - HTTP timeout duration for both read and writes. Use a duration
         string that is accepted by
         :new-page:`https://golang.org/pkg/time/#ParseDuration` (**default:**
         ``10s``)
   - 

      - ``username``
      - no
      - ``string``
      - Basic Auth username to use on each request, if any.
   - 

      - ``password``
      - no
      - ``string``
      - Basic Auth password to use on each request, if any.
   - 

      - ``useHTTPS``
      - no
      - ``bool``
      - If true, the agent connects to the server using HTTPS instead of
         plain HTTP. (**default:** ``false``)
   - 

      - ``httpHeaders``
      - no
      - ``map of strings``
      - A map of HTTP header names to values. Comma separated multiple
         values for the same message-header is supported.
   - 

      - ``skipVerify``
      - no
      - ``bool``
      - If ``useHTTPS`` is ``true`` and this option is also ``true``,
         the exporter TLS cert is not verified. (**default:** ``false``)
   - 

      - ``caCertPath``
      - no
      - ``string``
      - Path to the CA cert that has signed the TLS cert, unnecessary if
         ``skipVerify`` is set to false.
   - 

      - ``clientCertPath``
      - no
      - ``string``
      - Path to the client TLS cert to use for TLS required connections
   - 

      - ``clientKeyPath``
      - no
      - ``string``
      - Path to the client TLS key to use for TLS required connections
   - 

      - ``host``
      - **yes**
      - ``string``
      - Host of the exporter
   - 

      - ``port``
      - **yes**
      - ``integer``
      - Port of the exporter
   - 

      - ``useServiceAccount``
      - no
      - ``bool``
      - Use pod service account to authenticate. (**default:**
         ``false``)
   - 

      - ``metricPath``
      - no
      - ``string``
      - Path to the metrics endpoint on the exporter server, usually
         ``/metrics`` (the default). (**default:** ``/metrics``)
   - 

      - ``sendAllMetrics``
      - no
      - ``bool``
      - Send all the metrics that come out of the Prometheus exporter
         without any filtering. This option has no effect when using the
         Prometheus exporter monitor directly since there is no built-in
         filtering, only when embedding it in other monitors.
         (**default:** ``false``)

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/coredns/metadata.yaml"></div>


Notes
~~~~~



.. raw:: html

   <div class="include-start" id="metric-defs.rst"></div>

.. include:: /_includes/metric-defs.rst

.. raw:: html

   <div class="include-stop" id="metric-defs.rst"></div>




Troubleshooting
---------------



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



