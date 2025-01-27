.. _supervisor:

Supervisor
==========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Supervisor monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the ``supervisor`` monitor type to retrieve the state of processes running by Supervisor.

This integration is available for Kubernetes, Windows, and Linux.

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
     smartagent/supervisor:
       type: supervisor
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/supervisor]

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

      - ``host``
      - No
      - ``string``
      - The host/IP address of the Supervisor XML-RPC API. Used to build
         the ``url`` option if a URL is not provided.
   - 

      - ``port``
      - No
      - ``integer``
      - The port of the Supervisor XML-RPC API. Used to build the
         ``url`` option if a URL not provided. For example,
         ``localhost``. The default value is ``9001``.
   - 

      - ``useHTTPS``
      - No
      - ``bool``
      - If true, the monitor connects to the Supervisor using the HTTPS
         protocol instead of the HTTP protocol. The default value is
         ``false``.
   - 

      - ``path``
      - No
      - ``string``
      - The URL path to use for the scrape URL for Supervisor. The
         default value is ``/RPC2``.
   - 

      - ``url``
      - No
      - ``string``
      - URL on which to scrape Supervisor XML-RPC API. If this is not
         provided, it's derived from the ``host``, ``port``,
         ``useHTTPS``, and ``path`` options. For example,
         ``http://localhost:9001/RPC2``.

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/supervisor/metadata.yaml"></div>


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



