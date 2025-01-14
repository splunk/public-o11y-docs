.. _prometheus-velero:

Prometheus Velero
=================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Prometehus Velero monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the ``prometheus/velero`` monitor type to get metrics from Velero.

This integration is available on Kubernetes, Linux, and Windows.

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
     smartagent/velero:
       type: prometheus/velero
       discoveryRule: container_image =~ "velero" && port == 8085
       port: 8085    
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/velero]

Velero
~~~~~~

Use the Velero Helm chart to automatically activate Prometheus metrics
for Velero. See
https://github.com/vmware-tanzu/helm-charts/blob/main/charts/velero/README.md
on GitHub for more information.

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

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
      - HTTP timeout duration for both reads and writes. Must be a
         duration string accepted by
         https://golang.org/pkg/time/#ParseDuration. Default value is
         ``10s``.
   - 

      - ``username``
      - no
      - ``string``
      - User name to use on each request.
   - 

      - ``password``
      - no
      - ``string``
      - Password to use on each request.
   - 

      - ``useHTTPS``
      - no
      - ``bool``
      - If true, the agent connects to the server using HTTPS instead of
         plain HTTP. Default value is ``false``.
   - 

      - ``httpHeaders``
      - no
      - ``map of strings``
      - A map of HTTP header names to values. Comma-separated multiple
         values for the same message-header are supported.
   - 

      - ``skipVerify``
      - no
      - ``bool``
      - If both ``useHTTPS`` and ``skipVerify`` are ``true``, the TLS
         certificate of the exporter is not verified. Default value is
         ``false``.
   - 

      - ``caCertPath``
      - no
      - ``string``
      - Path to the CA certificate that has signed the TLS certificate,
         unnecessary if ``skipVerify`` is set to false.
   - 

      - ``clientCertPath``
      - no
      - ``string``
      - Path to the client TLS certificate to use for TLS required
         connections.
   - 

      - ``clientKeyPath``
      - no
      - ``string``
      - Path to the client TLS key to use for TLS required connections.
   - 

      - ``host``
      - Yes
      - ``string``
      - Host of the exporter.
   - 

      - ``port``
      - Yes
      - ``integer``
      - Port of the exporter.
   - 

      - ``useServiceAccount``
      - no
      - ``bool``
      - Use pod service account to authenticate. Default value is
         ``false``.
   - 

      - ``metricPath``
      - no
      - ``string``
      - Path to the metrics endpoint on the exporter server. The default
         value is ``/metrics``.
   - 

      - ``sendAllMetrics``
      - no
      - ``bool``
      - Send all the metrics that come out of the Prometheus exporter
         without any filtering. This option has no effect when using the
         Prometheus exporter monitor directly, since there is no
         built-in filtering. Default value is ``false``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/prometheus/velero/metadata.yaml"></div>


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



