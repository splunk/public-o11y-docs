(postgresql)=

# PostgreSQL

<meta name="description" content="Documentation on the postgresql monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) deploys this integration as the `postgresql` monitor via the Smart Agent Receiver.

This monitor pulls metrics from all PostgreSQL databases from a specific Postgres server instance. It pulls basic information that is applicable to any database and gathers these metrics via SQL queries.

See [signalfx-agent/pkg/monitors/postgresql/](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/postgresql) for the monitor source.


## Installation

This monitor is provided by the Smart Agent and is available by using the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver) in the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.

To report all available metrics, enable the `pg_stat_statements` extension in your PostgreSQL deployment. This extension must be specified in the `shared_preload_libraries` configuration option in the main PostgreSQL configuration at server start up. You must also enable the extension for each database by running `CREATE EXTENSION IF NOT EXISTS pg_stat_statements;` on each database.

Note that to get consistent and accurate query execution time metrics, you must set the [pg_stat_statements.max configuration option](https://www.postgresql.org/docs/9.3/pgstatstatements.html#AEN160631) to larger than the number of distinct queries on the server.

Here is a [sample configuration of Postgres to enable statement tracking](https://www.postgresql.org/docs/9.3/pgstatstatements.html#AEN160631).

This configuration was tested with PostgreSQL `9.2+`.

If you want to collect additional metrics about PostgreSQL, use the [sql monitor](https://github.com/signalfx/signalfx-agent/tree/main/docs/monitors/./sql.md).


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `postgresql` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: postgresql
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/postgresql:
    type: postgresql
    ...  # Additional config
```

The following table shows the configuration options for the `postgresql` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` |  |
| `port` | no | `integer` |  (**default:** `0`) |
| `masterDBName` | no | `string` | The "master" database to which the agent first connects to query the list of databases available in the server.  This database should be accessible to the user specified with `connectionString` and `params` below, and that user should have permission to query `pg_database`.  If you want to filter which databases are monitored, use the `databases` option below. (**default:** `postgres`) |
| `connectionString` | no | `string` | See [Connection String Parameters](https://godoc.org/github.com/lib/pq#hdr-Connection_String_Parameters). |
| `params` | no | `map of strings` | Parameters to the connection string that can be templated into the connection string with the syntax `{{.key}}`. |
| `databases` | no | `list of strings` | List of databases to send database-specific metrics about.  If omitted, metrics about all databases will be sent.  This is an [overridable set](https://docs.signalfx.com/en/latest/integrations/agent/filtering.html#overridable-filters). (**default:** `[*]`) |
| `databasePollIntervalSeconds` | no | `integer` | How frequently to poll for new/deleted databases in the DB server. Defaults to the same as `intervalSeconds` if not set. (**default:** `0`) |
| `logQueries` | no | `bool` | If true, queries will be logged at the info level. (**default:** `false`) |
| `topQueryLimit` | no | `integer` | The number of top queries to consider when publishing query-related metrics (**default:** `10`) |


### Example `postgresql` Smart Agent monitor configuration

This example uses the [Vault remote config source](https://github.com/signalfx/signalfx-agent/blob/main/docs/remote-config.md#nested-values-vault-only) to connect to PostgreSQL using the `params` map that allows you to pull out the username and password individually from Vault and interpolate them into the `connectionString` configuration option.

```yaml
monitors:
 - type: postgresql
   connectionString: 'sslmode=disable user={{.username}} password={{.password}}'
   params: &psqlParams
     username: {"#from": "vault:secret/my-database[username]"}
     password: {"#from": "vault:secret/my-database[password]"}
   discoveryRule: 'container_image =~ "postgres" && port == 5432'

 # This monitor will monitor additional queries from PostgreSQL using the
 # provided SQL queries.
 - type: sql
   dbDriver: postgres
   connectionString: 'sslmode=disable user={{.username}} password={{.password}}'
   # This is a YAML reference to avoid duplicating the above config.
   params: *psqlParams
   queries:
     - query: 'SELECT COUNT(*) as count, country, status FROM customers GROUP BY country, status;'
       metrics:
         - metricName: "customers"
           valueColumn: "count"
           dimensionColumns: ["country", "status"]
```


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="postgresql" include="markdown"></div>


### Metrics about replication

Replication metrics may not be available on some PostgreSQL servers. For now, this monitor automatically disables the `replication` metrics group if the monitor detects Aurora. This helps avoid following the error: `Function pg_last_xlog_receive_location() is currently not supported for Aurora`

The metric `postgres_replication_state` will be reported only for `master` and for `postgres_replication_lag` for the `standby` role (replica).
