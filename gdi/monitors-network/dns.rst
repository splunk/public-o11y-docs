.. _dns:

DNS Query Input
===============

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Telegraf DNS monitor. See benefits, install, configuration, and metrics

.. caution:: Smart Agent monitors are being deprecated. To collect DNS data use the OpenTelemetry Collector and the :new-page:`Telegraf DNS Query Input plugin <https://github.com/influxdata/telegraf/tree/master/plugins/inputs/dns_query>`. See how in :ref:`telegraf-generic`.

You can use the Splunk Distribution of the OpenTelemetry Collector's Smart Agent receiver with the DNS Query Input monitor type (an embedded form of the Telegraf DNS Query plugin) to collect DNS data.

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

.. code-block:: yaml

   receivers:
     smartagent/dns:
       type: telegraf/dns
       ...  # Additional config

.. note:: Make sure to include the required ``servers`` configuration setting. See the following section, :strong:`Configuration settings`, for more information.

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
    pipelines:
      metrics:
        receivers: [smartagent/dns]

.. _config-settings:

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this
integration:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``domains``
      - no
      - ``list of strings``
      - Domains or subdomains to query. If this is not provided, it is
         ``["."]`` and ``RecordType`` is forced to ``NS``.
   - 

      - ``network``
      - no
      - ``string``
      - Network is the network protocol name. (**default:** ``udp``)
   - 

      - ``port``
      - no
      - ``integer``
      - DNS server port. (**default:** ``53``)
   - 

      - ``servers``
      - **yes**
      - ``list of strings``
      - Servers to query.
   - 

      - ``recordType``
      - no
      - ``string``
      - Query record type (A, AAAA, CNAME, MX, NS, PTR, TXT, SOA, SPF,
         SRV). (**default:** ``NS``)
   - 

      - ``timeout``
      - no
      - ``int64``
      - Query timeout. Use a duration string that is accepted by
         https://golang.org/pkg/time/#ParseDuration. (**default:**
         ``2s``)

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/telegraf/monitors/dns/metadata.yaml"></div>

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



