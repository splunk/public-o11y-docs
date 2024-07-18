.. _microsoft-sql-server:

************************************************
Microsoft SQL Server
************************************************

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Microsoft SQL / MSQL monitor. See benefits, install, configuration, and metrics

The :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
Microsoft SQL Server monitor type to send metrics from Microsoft SQL
Server instances.

Benefits
=================

.. include:: /_includes/benefits.rst

Installation
=====================

.. include:: /_includes/collector-installation.rst

Authentication
-----------------------------

This integration supports Windows and SQL authentication. Windows authentication is the default option. If you can't authenticate with Windows, use SQL authentication instead.

- Windows authentication uses the local system account to access the Microsoft SQL Server.
- SQL authentication uses an account that you configure for the integration. See :ref:`sql-installation-user`.

.. _sql-installation-user:

Microsoft SQL authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use the integration, you need to create login credentials in the
Microsoft SQL Server host. To create this login, follow these steps:

1. Log in as an administrator.
2. Start an SQL client.
3. Enter the following commands:

.. code-block:: yaml

   USE master;
   GO
   CREATE LOGIN [<user_id>] WITH PASSWORD = '<YOUR PASSWORD HERE>';
   GO
   GRANT VIEW SERVER STATE TO [<user_id>];
   GO
   GRANT VIEW ANY DEFINITION TO [<user_id>];
   GO

Configuration
===================

.. include:: /_includes/configuration.rst

Example
-------------

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/sqlserver:
       type: telegraf/sqlserver
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/sqlserver]

Example: Microsoft SQL Server receiver
--------------------------------------------

The following is an example of a Microsoft SQL Server receiver
configuration:

.. code:: yaml

   receivers:
     smartagent/sqlserver:
        type: telegraf/sqlserver
        host: <host_name>
        port: 1433
        userID: <user_id>
        password: <password>
        appName: sqlserver

Configuration settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following table shows the configuration options for the Microsoft
SQL Server monitor:

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
      - **yes**
      - ``string``
      - 
   - 

      - ``port``
      - **yes**
      - ``integer``
      - 
   - 

      - ``userID``
      - no
      - ``string``
      - UserID used to access the SQL Server instance.
   - 

      - ``password``
      - no
      - ``string``
      - Password used to access the SQL Server instance.
   - 

      - ``appName``
      - no
      - ``string``
      - The app name used by the monitor when connecting to the
         SQLServer. (**default:** ``signalfxagent``)
   - 

      - ``queryVersion``
      - no
      - ``integer``
      - The version of queries to use when accessing the cluster. See
         the documentation for the Microsoft SQL Server Telegraf Plugin,
         provided by Influxdata. (**default:** ``2``)
   - 

      - ``azureDB``
      - no
      - ``bool``
      - Whether the database is a Microsoft Azure database.
         (**default:** ``false``)
   - 

      - ``excludedQueries``
      - no
      - ``list of strings``
      - Queries to exclude. Possible values are ``PerformanceCounters``,
         ``WaitStatsCategorized``, ``DatabaseIO``,
         ``DatabaseProperties``, ``CPUHistory``, ``DatabaseSize``,
         ``DatabaseStats``, ``MemoryClerk`` ``VolumeSpace``, and
         ``PerformanceMetrics``.
   - 

      - ``log``
      - no
      - ``unsigned integer``
      - Log level to use when accessing the database (**default:**
         ``1``)

Metrics
=================

This integration provides a set of metrics. Note that some metrics might depend your type of your database instance: 

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/telegraf/monitors/mssqlserver/metadata.yaml"></div>

Notes
---------------

.. include:: /_includes/metric-defs.rst

Troubleshooting
=======================

.. include:: /_includes/troubleshooting-components.rst

TCP/IP is deactivated
-----------------------------

In some Windows-based SQL Server instances, TCP/IP has been deactivated by default. You might encounter this in a Microsoft Azure service instance. If you see error messages similar to ``Cannot read handshake packet: read tcp: wsarecv: An existing connection was forcibly closed by the remote host.``, you need to explicitly activate TCP/IP for the instance.

1. Verify agent configurations are correct.

2. In your SQL Server instance, activate TCP/IP. To do this, select
   :guilabel:`Start`, then :guilabel:`Administrative Tools`, then :guilabel:`Computer
   Management`.

3. In the :guilabel:`Computer Management` sidebar, select :menuselection:`Services and
   Applications`, then :menuselection:`SQL Server Configuration Manager`, then :menuselection:`SQL
   Server Network Configuration`.

4. Select :menuselection:`Protocols for <your_sql_server_name>`.

5. In the protocol list, right-click the :strong:`TCP/IP` protocol and select
   :strong:`Enable`.
