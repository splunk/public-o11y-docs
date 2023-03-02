(postgresql)=

# PostgreSQL

<meta name="description" content="Use this Splunk Observability Cloud integration for the PostgreSQL monitor. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` deploys this integration as the `postgresql` monitor type for the Smart Agent Receiver.

This monitor pulls metrics from all PostgreSQL databases from a specific Postgres server instance. This monitor pulls basic information that is applicable to any database and gathers these metrics using SQL queries.


## Benefits

```{include} /_includes/benefits.md

```

## Installation

This monitor is provided by the Smart Agent and is available for the Smart Agent Receiver in the {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>`.

```{include} /_includes/collector-installation-linux.md

```

To report all available metrics, activate the `pg_stat_statements` extension in your PostgreSQL deployment. This extension must be specified in the `shared_preload_libraries` configuration option in the main PostgreSQL configuration at server start up. You must also activate the extension for each database by running `CREATE EXTENSION IF NOT EXISTS pg_stat_statements;` on each database.

Note that to get consistent and accurate query execution time metrics, you must set the [pg_stat_statements.max configuration option](https://www.postgresql.org/docs/9.3/pgstatstatements.html#AEN160631) to larger than the number of distinct queries on the server.

Here is a [sample configuration](https://www.postgresql.org/docs/9.3/pgstatstatements.html#AEN160631) of Postgres to activate statement tracking.

This configuration was tested with PostgreSQL `9.2+`.

If you want to collect additional metrics about PostgreSQL, use the sql monitor.


## Configuration

```{include} /_includes/configuration.md
```

```yaml
receivers:
  smartagent/postgresql:
    type: postgresql
    ...  # Additional config
```

To complete the monitor activation, you must also include the `smartagent/postgresql` receiver item in a `metrics` pipeline. To do this, add the receiver item to the ``service/pipelines/metrics/receivers`` section of your configuration file. For example:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/postgresql]
```

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

### Configuration settings

The following table shows the configuration options for the `postgresql` monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` |  |
| `port` | no | `integer` |  (**default:** `0`) |
| `masterDBName` | no | `string` | The "master" database to which the agent first connects to query the list of databases available in the server.  This database should be accessible to the user specified with `connectionString` and `params` below, and that user should have permission to query `pg_database`.  If you want to filter which databases are monitored, use the `databases` option below. (**default:** `postgres`) |
| `connectionString` | no | `string` | See [Connection String Parameters](https://godoc.org/github.com/lib/pq#hdr-Connection_String_Parameters). |
| `params` | no | `map of strings` | Parameters to the connection string that can be templated into the connection string with the syntax `{{.key}}`. |
| `databases` | no | `list of strings` | List of databases to send database-specific metrics about. If omitted, metrics about all databases will be sent.  This is an [overridable set](https://docs.splunk.com/Observability/gdi/smart-agent/smart-agent-resources.html#filtering-data-using-the-smart-agent). (**default:** `[*]`) |
| `databasePollIntervalSeconds` | no | `integer` | How frequently to poll for new/deleted databases in the DB server. Defaults to the same as `intervalSeconds` if not set. (**default:** `0`) |
| `logQueries` | no | `bool` | If `true,` queries will be logged at the info level. (**default:** `false`) |
| `topQueryLimit` | no | `integer` | The number of top queries to consider when publishing query-related metrics (**default:** `10`) |


The following is an example `postgresql` Smart Agent monitor configuration. This example uses the Vault remote configuration source to connect to PostgreSQL using the `params` map. This map allows you to pull out the username and password individually from Vault and interpolate them into the `connectionString` configuration option.

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

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/postgresql/metrics.yaml"></div>


### Metrics about replication

Replication metrics can't be available on some PostgreSQL servers. For now, this monitor automatically deactivates the `replication` metrics group if the monitor detects Aurora. This helps avoid following the error: `Function pg_last_xlog_receive_location() is currently not supported for Aurora`

The metric `postgres_replication_state` will be reported only for `master` and for `postgres_replication_lag` for the `standby` role (replica).

## Get help

```{include} /_includes/troubleshooting.md
```
