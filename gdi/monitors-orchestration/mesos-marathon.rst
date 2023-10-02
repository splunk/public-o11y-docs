.. _marathon:

Mesos Marathon
=================

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Marathon monitor. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
Mesos Marathon monitor type to monitor a Mesos Marathon instance using
the Marathon Python plugin.

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
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/marathon:
       type: collectd/marathon
       ... # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/marathon]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for the Mesos
Marathon monitor:

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
      - Host of the exporter
   - 

      - ``port``
      - **yes**
      - ``integer``
      - Port of the exporter
   - 

      - ``username``
      - no
      - ``string``
      - Username used to authenticate with Marathon.
   - 

      - ``password``
      - no
      - ``string``
      - Password used to authenticate with Marathon.
   - 

      - ``scheme``
      - no
      - ``string``
      - Set to either ``http`` or ``https``. (**default:** ``http``)
   - 

      - ``dcosAuthURL``
      - no
      - ``string``
      - The dcos authentication URL that the plugin uses to get
         authentication tokens from. Set scheme to “https” if operating
         DC/OS in strict mode and dcosAuthURL to
         “https://leader.mesos/acs/api/v1/auth/login” (which is the
         default DNS entry provided by DC/OS)

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/marathon/metadata.yaml"></div>


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
