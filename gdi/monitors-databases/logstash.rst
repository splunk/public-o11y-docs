(logstash)=

Logstash
========

.. raw:: html

   <meta name="description" content="Use this Splunk Observability Cloud integration for the Logstash monitor. See benefits, install, configuration, and metrics">

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``logstash`` monitor type to monitor the health and performance of
Logstash deployments through Logstash Monitoring APIs.

Installation
------------

``{include} /_includes/collector-installation.md``

Configuration
-------------

``{include} /_includes/configuration.md``

Example
~~~~~~~

To activate this monitor in the Splunk Distribution of OpenTelemetry
Collector, add the following to your agent configuration:

::

    receivers:
      smartagent/logstash:
        type: logstash
          ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

::

   service:
     pipelines:
       metrics:
         receivers: [smartagent/logstash]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor
type:

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
      - no
      - ``string``
      - The host name of the Logstash monitoring API. The default value
         is ``127.0.0.1``.
   - 

      - ``port``
      - no
      - ``integer``
      - The port number of Logstash monitoring API. The default value is
         ``9600``.
   - 

      - ``useHTTPS``
      - no
      - ``bool``
      - If true, the agent connects to the host using HTTPS instead of
         HTTP. The default value is ``false``.
   - 

      - ``timeoutSeconds``
      - no
      - ``integer``
      - The maximum amount of time to wait for API requests, in seconds.
         The default value is ``5``.

Metrics
-------

The following metrics are available for this integration:

.. container:: metrics-yaml

Notes
~~~~~

``{include} /_includes/metric-defs.md``

Troubleshooting
---------------

``{include} /_includes/troubleshooting.md``
