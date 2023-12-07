.. _hana:

SAP HANA
========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the SAP HANA monitor. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``hana`` monitor type to get metrics from an SAP Hana database.

This integration is available on Kubernetes, Linux, and Windows.

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

.. code:: yaml

   receivers:
     smartagent/hana: 
       type: hana
       ... # Additional config

See additional configuration options:

.. code:: yaml

   receivers:
     smartagent/hana: 
       type: hana
       host: myhost.hana.us.hanacloud.ondemand.com
       port: 443
       username: SOMEUSER
       password: s3cr3t

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/hana]

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

      - ``tlsServerName``
      - no
      - ``string``
      - ``ServerName`` to verify the host name. This option defaults to
         ``Host`` if not specified.
   - 

      - ``insecureSkipVerify``
      - no
      - ``bool``
      - Controls whether a client verifies the server's certificate
         chain and host name. The default value is ``false``.
   - 

      - ``rootCAFiles``
      - no
      - ``list of strings``
      - Path to root certificate(s) (optional)

Metrics
-------

These are the metrics and dimensions available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/hana/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
