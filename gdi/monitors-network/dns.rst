.. _dns:

DNS Query Input
===============

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Telegraf DNS monitor. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
DNS Query Input monitor type (an embedded form of the Telegraf DNS Query
plugin) to collect DNS data.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/dns:
       type: telegraf/dns
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
    pipelines:
      metrics:
        receivers: [smartagent/dns]

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

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
