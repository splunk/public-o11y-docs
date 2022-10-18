(oracledb)=
# Oracle Database
<meta name="description" content="Documentation on the Oracle Database monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the Oracle Database receiver. The receiver connects to an Oracle Database instance and runs custom SQL queries to generate metrics from a database connection.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

### Create a database user for this monitor

To create an Oracle Database user for this monitor, run the following commands:

```sql
 -- Create user and set a password
 CREATE USER <username> IDENTIFIED BY <password>;
```

Depending on which metrics you collect, you might need to assign the following permissions to the database user:

- `GRANT SELECT ON V_$SESSION TO <username>;`
- `GRANT SELECT ON V_$SYSSTAT TO <username>;`
- `GRANT SELECT ON V_$RESOURCE_LIMIT TO <username>;`
- `GRANT SELECT ON DBA_TABLESPACES TO <username>;`
- `GRANT SELECT ON DBA_DATA_FILES TO <username>;`

## Configuration

To activate this monitor type in the Collector, add the following lines to your <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector" target="_blank">configuration (YAML) file</a>: 

### Splunk Distribution of OpenTelemetry Collector

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, make sure that the configuration contains the following:

```yaml
receivers:
  oracledb:
    # Refer to Oracle Go Driver go_ora documentation for full connection string options
    datasource: "oracle://<user>:<password>@<host>:<port>/<database>"
```

To complete the monitor activation, you must also include the `oracledb` receiver item in a `metrics` pipeline. To do this, add the receiver item to the `service` > `pipelines` > `metrics` > `receivers` section of your configuration file. For example:

```yaml
service:
  pipelines:
    metrics:
      receivers:
        - oracledb
```

## Metrics

The following metrics are available for this integration:

## Metrics

These are the metrics available for this scraper.

| Name | Description | Unit | Type | Attributes |
| ---- | ----------- | ---- | ---- | ---------- |
| `oracledb.cpu_time` | Cumulative CPU time, in seconds. | Seconds | Sum(Double) |  |
| `oracledb.dml_locks.limit` | Maximum limit of active DML (Data Manipulation Language) locks. | Locks | Gauge(Int) |  |
| `oracledb.dml_locks.usage` | Current count of active DML (Data Manipulation Language) locks. | Locks | Gauge(Int) |  |
| `oracledb.enqueue_deadlocks` | Total number of deadlocks between table or row locks in different sessions. | Deadlocks | Sum(Int) |  |
| `oracledb.enqueue_locks.limit` | Maximum limit of active enqueue locks. | Locks | Gauge(Int) |  |
| `oracledb.enqueue_locks.usage` | Current count of active enqueue locks. | Locks | Gauge(Int) |  |
| `oracledb.enqueue_resources.limit` | Maximum limit of active enqueue resources. | Resources | Gauge(Int) |  |
| `oracledb.enqueue_resources.usage` | Current count of active enqueue resources. | Resources | Gauge(Int) |  |
| `oracledb.exchange_deadlocks` | Number of times that a process detected a potential deadlock when exchanging two buffers and raised an internal, restartable error. Index scans are the only operations that run exchanges. | Locks | Sum(Int) |  |
| `oracledb.executions` | Total number of calls (user and recursive) that executed SQL statements` | Executions | Sum(Int) |  |
| `oracledb.hard_parses` | Number of hard parses. | Parses | Sum(Int) |  |
| `oracledb.logical_reads` | Number of logical reads. | Reads | Sum(Int) |  |
| `oracledb.parse_calls` | Total number of parse calls. | Parses | Sum(Int) |  |
| `oracledb.pga_memory` | Session PGA (Program Global Area) memory` | Bytes | Sum(Int) |  |
| `oracledb.physical_reads` | Number of physical reads. | Reads | Sum(Int) |  |
| `oracledb.processes.limit` | Maximum limit of active processes. | Processes | Gauge(Int) |  |
| `oracledb.processes.usage` | Current count of active processes. | Processes | Gauge(Int) |  |
| `oracledb.sessions.limit` | Maximum limit of active sessions. | Sessions | Gauge(Int) |  |
| `oracledb.sessions.usage` | Count of active sessions. | Sessions | Gauge(Int) | `session_type`, `session_status` |
| `oracledb.tablespace_size.limit` | Maximum size of tablespace, in bytes. | Bytes | Gauge(Int) | `tablespace_name` |
| `oracledb.tablespace_size.usage` | Used tablespace, in bytes. | Bytes | Gauge(Int) | `tablespace_name` |
| `oracledb.transactions.limit` | Maximum limit of active transactions. | Transactions | Gauge(Int) |  |
| `oracledb.transactions.usage` | Current count of active transactions. | Transactions | Gauge(Int) |  |
| `oracledb.user_commits` | Number of user commits. When a user commits a transaction, the redo generated that reflects the changes made to database blocks is written to disk. Commits often represent the closest thing to a user transaction rate. | Commits | Sum(Int) |  |
| `oracledb.user_rollbacks` | Number of times users manually issue the `ROLLBACK` statement or an error occurs during a user's transactions. | 1 | Sum(Int) |  |

## Resource attributes

| Name | Description | Type |
| ---- | ----------- | ---- |
| `oracledb.instance.name` | Name of the instance from which data is coming. | String |

## Metric attributes

| Name | Description | Values |
| ---- | ----------- | ------ |
| `session_status` | Session status |  |
| `session_type` | Session type |  |
| `tablespace_name` | Tablespace name |  |

### Enable or disable metrics

You can enable or disable specific metrics by setting the value of the `enabled` option to `true` or `false`.

The following example disables the `oracledb.executions` metric and enabled the `oracledb.sessions.usage` metric:

```yaml
receivers:
  oracledb:
    datasource: "oracle://otel:password@localhost:51521/XE"
    metrics:
      oracledb.executions:
        enabled: false
      oracledb.sessions.usage:
        enabled: true
```

## Get help

```{include} /_includes/troubleshooting.md