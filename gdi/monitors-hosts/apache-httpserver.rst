.. _apache-httpserver:

Apache HTTP Server
==================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Apache HTTP server monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the Apache HTTP Server monitor type to monitor Apache web servers using information ``mod_status`` provides. 

.. note:: To monitor Apache web server instances with the OpenTelemetry Collector using native OpenTelemetry components refer to the :ref:`apache-receiver`.

Apache worker threads can be in one of the following states:

.. list-table::
   :header-rows: 1

   - 

      - State
      - Remark
   - 

      - Open
      - Open (unused) slot - no process
   - 

      - Waiting
      - Idle and waiting for request
   - 

      - Sending
      - Serving response
   - 

      - KeepAlive
      - Kept alive for possible next request
   - 

      - Idle_cleanup
      - Idle and marked for cleanup
   - 

      - Closing
      - Closing connection
   - 

      - Logging
      - Writing to log file
   - 

      - Reading
      - Reading request
   - 

      - Finishing
      - Finishing as part of graceful shutdown
   - 

      - Starting
      - Starting up to serve

This integration is only available on Kubernetes and Linux.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation-linux.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~~~~~~~~~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/apache:
       type: collectd/apache
       ... # Additional config

Additional configuration options include host or port, as shown below.
If ``mod_status`` is exposed on an endpoint other than ``/mod_status``,
you can use the url config option to specify the path:

.. code-block:: yaml

       type: collectd/apache
       host: localhost
       port: 80
       url: "http://{{.Host}}:{{.Port}}/server-status?auto"

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/apache]

Configuration options
~~~~~~~~~~~~~~~~~~~~~

The following configuration options are available for this integration:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Options
      - Required
      - Type
      - Description
   - 

      - ``host``
      - **yes**
      - ``string``
      - The hostname of the Apache server
   - 

      - ``port``
      - **yes**
      - ``integer``
      - The port number of the Apache server
   - 

      - ``name``
      - no
      - ``string``
      - This will be sent as the ``plugin_instance`` dimension and can
         be any name you like.
   - 

      - ``url``
      - no
      - ``string``
      - The URL, either a final URL or a Go template that will be
         populated with the host and port values. (**default:**
         ``http://{{.Host}}:{{.Port}}/mod_status?auto``)
   - 

      - ``username``
      - no
      - ``string``
      - 
   - 

      - ``password``
      - no
      - ``string``
      - 

Apache configuration
--------------------

After you've set up the Collector, follow these steps to configure the
Apache web server to expose status metrics:

1. Activate the ``mod_status`` module in your Apache server. Make sure
   that the URL you provide for your ``mod_status`` module ends in
   ``?auto``. This returns the status page as ``text/plain``, which the
   monitor requires.

2. Add the following configuration to your Apache server:

   ::

       ExtendedStatus on
       <Location /mod_status>
       SetHandler server-status
       </Location>

3. Restart the Apache web server.

Metrics
-------

These metrics are available for this integration.

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/apache/metadata.yaml"></div>  


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
--------------------

.. include:: /_includes/troubleshooting-components.rst
