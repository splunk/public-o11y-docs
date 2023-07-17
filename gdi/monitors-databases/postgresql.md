(postgresql)=

# PostgreSQL

<meta name="description" content="Use this Splunk Observability Cloud integration for the PostgreSQL monitor. See benefits, install, configuration, and metrics">

```{note}
You can replace this monitor with the OTel native component `postgresql` receiver. See {ref}`postgresql-receiver` for more information.
```

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the  `postgresql` monitor type to pull metrics from all PostgreSQL databases from a specific Postgres server instance using SQL queries.

## Configuration settings

The following table shows the configuration options for the `postgresql` integration:

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

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/postgresql/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

### Metrics about replication

Replication metrics aren't available on some PostgreSQL servers. For now, this monitor automatically deactivates the `replication` metrics group if the monitor detects Aurora. This helps avoid following the error: `Function pg_last_xlog_receive_location() is currently not supported for Aurora`

The metric `postgres_replication_state` will be reported only for `master` and for `postgres_replication_lag` for the `standby` role (replica).

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
