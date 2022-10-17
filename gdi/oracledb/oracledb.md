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

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/pkg/receiver/oracledb/metadata.yaml"></div>

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