.. _mssql-server-receiver:

****************************
MSSQL server receiver
****************************

.. meta::
      :description: The Microsft SQL server receiver grabs metrics from a Microsoft SQL Server instance. 

The MSSQL Server receiver queries and retrieves metrics from Microsoft SQL Server instances. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

The receiver works by either using the Windows Performance Counters, or by directly connecting to the instance and querying it. Windows Performance Counters are only available when running on Windows.

.. note:: Make sure to run the Collector as an administrator in order to collect all performance counters for metrics.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the MSSQL Server receiver as described in the next section.
3. Restart the Collector.

Sample configuration
----------------------

To activate the receiver, add ``sqlserver`` to the ``receivers`` section of your configuration file:

.. code:: yaml

  receivers:
      sqlserver:
        collection_interval: 10s
      sqlserver/1:
        collection_interval: 5s
        username: sa
        password: securepassword
        server: 0.0.0.0
        port: 1433

Next, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers:
          - sqlserver

Configure a named instance on Windows
--------------------------------------------

If you're using a named instance on Windows, you need to specify a computer and instance name, for example:

.. code:: yaml

    receivers:
      sqlserver:
        collection_interval: 10s
        computer_name: CustomServer
        instance_name: CustomInstance
        resource_attributes:
          sqlserver.computer.name:
            enabled: true
          sqlserver.instance.name:
            enabled: true

Advanced configuration
--------------------------------------------

The following settings are optional:

* ``collection_interval``. ``10s`` by default. The internal at which the receiver emits metrics.
* ``instance_name``. Optional. The instance name identifies the specific SQL Server instance being monitored. If unspecified, metrics are scraped from all instances. If configured, you must also set ``computer_name`` when running on Windows.

These are the optional direct connection options:

* ``username``. The username used to connect to the SQL Server instance.
* ``password``. The password used to connect to the SQL Server instance.
* ``server``. IP address or hostname of the SQL Server instance to connect to.
* ``port``. Port of the SQL Server instance to connect to.

The following are Windows-specific optional options:

* ``computer_name``. The computer name identifies the SQL Server name or IP address of the computer being monitored. If specified, ``instance_name`` is also required. This option is ignored in non-Windows environments.

.. _mssql-server-receiver-settings:

Settings
======================

The following table shows the configuration options for the MySQL receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/sqlserver.yaml"></div>

.. _mssql-server-receiver-metrics:

Metrics
=======================

The following metrics, resource attributes, and attributes, are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/sqlserverreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst