(microsoft-sql-server)=

# Microsoft SQL Server

<meta name="description" content="Documentation on the sqlserver monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `sqlserver` monitor via the Smart Agent Receiver.

This monitor sends metrics from Microsoft SQL Server instances. The monitor is based on the `sqlserver` plugin. For more information about the plugin, see [sqlserver](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sqlserver).

To use the monitor, you need to create login credentials in the Microsoft SQL Server host. To create this login, follow these steps:

1. Log in as an administrator.

2. Start an SQL client.

3. Enter these commands.

```
USE master;
GO
CREATE LOGIN [signalfxagent] WITH PASSWORD = N'<YOUR PASSWORD HERE>';
GO
GRANT VIEW SERVER STATE TO [signalfxagent];
GO
GRANT VIEW ANY DEFINITION TO [signalfxagent];
GO
```

See [mssqlserver](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/telegraf/monitors/mssqlserver) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing an `sqlserver` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: sqlserver
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/sqlserver:
    type: sqlserver
    ...  # Additional config
```

The following table shows the configuration options for the `sqlserver` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `userID` | no | `string` | UserID used to access the SQL Server instance. |
| `password` | no | `string` | Password used to access the SQL Server instance. |
| `appName` | no | `string` | The app name used by the monitor when connecting to the SQLServer. (**default:** `signalfxagent`) |
| `queryVersion` | no | `integer` | The version of queries to use when accessing the cluster. Refer to the documentation for the Microsoft SQL Server Telegraf Plugin, provided by Influxdata. (**default:** `2`) |
| `azureDB` | no | `bool` | Whether the database is a Microsoft Azure database. (**default:** `false`) |
| `excludedQueries` | no | `list of strings` | Queries to exclude. Possible values are `PerformanceCounters`, `WaitStatsCategorized`, `DatabaseIO`, `DatabaseProperties`, `CPUHistory`, `DatabaseSize`, `DatabaseStats`, `MemoryClerk` `VolumeSpace`, and `PerformanceMetrics`. |
| `log` | no | `unsigned integer` | Log level to use when accessing the database (**default:** `1`) |


### Example of an `sqlserver` monitor configuration

```yaml
monitors:
 - type: sqlserver
   host: <host_name>
   port: 1433
   userID: <user_id>
   password: <password>
   appName: signalfxagent
```

Ensure that `port` and `appName` are _always_ set to the values stated in this example.


## Troubleshooting

In some Windows-based SQL Server instances, TCP/IP has been disabled by default. You might encounter this in a Microsoft Azure service instance. If you see error messages similar to `Cannot read handshake packet: read tcp: wsarecv: An existing connection was forcibly closed by the remote host.`, you need to explicitly enable TCP/IP for the instance.

1. Verify agent configurations are correct.

2. In your SQL Server instance, enable TCP/IP. To do this, select **Start** > **Administrative Tools** > **Computer Management**.

3. In the `Computer Management` sidebar, select **Services and Applications** > **SQL Server Configuration Manager** > **SQL Server Network Configuration**.

4. Select **Protocols for `<YOUR SQL SERVER NAME>`**.

5. In the protocol list to the right, right-click the **TCP/IP** protocol and select **Enable**.


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="microsoft-sql-server" include="markdown"></div>
