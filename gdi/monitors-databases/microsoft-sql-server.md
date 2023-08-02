(microsoft-sql-server)=

# Microsoft SQL Server

<meta name="description" content="Use this Splunk Observability Cloud integration for the Microsoft SQL / MSQL monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Microsoft SQL Server monitor type to send metrics from Microsoft SQL Server instances. 

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

### Microsoft SQL installation

To use the integration, you need to create login credentials in the Microsoft SQL Server host. To create this login, follow these steps:

1. Log in as an administrator.
2. Start an SQL client.
3. Enter the following commands:

```
USE master;
GO
CREATE LOGIN [signalfxagent] WITH PASSWORD = '<YOUR PASSWORD HERE>';
GO
GRANT VIEW SERVER STATE TO [signalfxagent];
GO
GRANT VIEW ANY DEFINITION TO [signalfxagent];
GO
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/sqlserver:
    type: telegraf/sqserver
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/sqlserver]
```

### Example: Microsoft SQL Server receiver

The following is an example of a Microsoft SQL Server receiver configuration:

```yaml
receivers:
  smartagent/sqlserver:
     type: telegraf/sqserver
     host: <host_name>
     port: 1433
     userID: <user_id>
     password: <password>
     appName: sqlserver
```

### Configuration settings

The following table shows the configuration options for the Microsoft SQL Server monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `userID` | no | `string` | UserID used to access the SQL Server instance. |
| `password` | no | `string` | Password used to access the SQL Server instance. |
| `appName` | no | `string` | The app name used by the monitor when connecting to the SQLServer. (**default:** `signalfxagent`) |
| `queryVersion` | no | `integer` | The version of queries to use when accessing the cluster. See the documentation for the Microsoft SQL Server Telegraf Plugin, provided by Influxdata. (**default:** `2`) |
| `azureDB` | no | `bool` | Whether the database is a Microsoft Azure database. (**default:** `false`) |
| `excludedQueries` | no | `list of strings` | Queries to exclude. Possible values are `PerformanceCounters`, `WaitStatsCategorized`, `DatabaseIO`, `DatabaseProperties`, `CPUHistory`, `DatabaseSize`, `DatabaseStats`, `MemoryClerk` `VolumeSpace`, and `PerformanceMetrics`. |
| `log` | no | `unsigned integer` | Log level to use when accessing the database (**default:** `1`) |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/telegraf/monitors/mssqlserver/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```

### TCP/IP is deactivated

In some Windows-based SQL Server instances, TCP/IP has been deactivated by default. You might encounter this in a Microsoft Azure service instance. If you see error messages similar to `Cannot read handshake packet: read tcp: wsarecv: An existing connection was forcibly closed by the remote host.`, you need to explicitly activate TCP/IP for the instance.

1. Verify agent configurations are correct.

2. In your SQL Server instance, activate TCP/IP. To do this, select **Start**, then **Administrative Tools**, then **Computer Management**.

3. In the `Computer Management` sidebar, select **Services and Applications**, then **SQL Server Configuration Manager**, then **SQL Server Network Configuration**.

4. Select **Protocols for `<YOUR SQL SERVER NAME>`**.

5. In the protocol list, right-click the **TCP/IP** protocol and select **Enable**.