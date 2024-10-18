.. _health-checker:

Health Checker
==============

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Health Checker monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the
Health Checker monitor type to check whether the configured JSON value
is returned in the response body.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

### Example

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/health-checker:
       type: collectd/health-checker
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
    pipelines:
      metrics:
        receivers: [smartagent/health-checker]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for the Health
Checker monitor:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``pythonBinary``
      - no
      - ``string``
      - Path to a python binary that should be used to execute the
         Python code. If not set, a built-in runtime will be used. Can
         include arguments to the binary as well.
   - 

      - ``host``
      - **yes**
      - ``string``
      - 
   - 

      - ``port``
      - **yes**
      - ``integer``
      - 
   - 

      - ``name``
      - no
      - ``string``
      - 
   - 

      - ``path``
      - no
      - ``string``
      - The HTTP path that contains a JSON document to verify
         (**default:** ``/``)
   - 

      - ``jsonKey``
      - no
      - ``string``
      - If ``jsonKey`` and ``jsonVal`` are given, the given endpoint
         will be interpreted as a JSON document and will be expected to
         contain the given key and value for the service to be
         considered healthy.
   - 

      - ``jsonVal``
      - no
      - ``any``
      - This can be either a string or numeric type
   - 

      - ``useHTTPS``
      - no
      - ``bool``
      - If ``true``, the endpoint will be connected to on HTTPS instead
         of plain HTTP. It is invalid to specify this if ``tcpCheck`` is
         ``true``. (**default:** ``false``)
   - 

      - ``skipSecurity``
      - no
      - ``bool``
      - If ``true``, and ``useHTTPS`` is ``true``, the server's SSL/TLS
         cert will not be verified. (**default:** ``false``)
   - 

      - ``tcpCheck``
      - no
      - ``bool``
      - If ``true``, the plugin will verify that it can connect to the
         given host/port value. JSON checking is not supported.
         (**default:** ``false``)

Metrics
-------

The following metrics are available for this integration:

.. list-table::
   :widths: 13 34 13 13
   :header-rows: 1

   - 

      - Name
      - Description
      - Sample value
      - Category
   - 

      - ``gauge.service.health.status``
      - The HTTP response status code for the request made to the
         application being monitored. A ``200`` value means an HTTP 200
         OK success status response was returned, so the application is
         healthy.
      - ``200``
      - Default
   - 

      - ``gauge.service.health.value``
      - ``0`` means an unhealthy state, and ``1`` means a healthy state.
      - ``0`` or ``1``
      - Default

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
