(sql)=

# SQL

<meta name="description" content="Use this Splunk Observability Cloud integration for the SQL monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the SQL monitor type to gather database usage metrics from SQL queries on your databases.

This integration is available for Kubernetes, Windows, and Linux.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml 
receivers:
  smartagent/sql:
    type: sql
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/sql]
```

### Configuration settings 

The following tables show the configuration options for this monitor:

| Option | Required | Type | Description |
| -------| -------- | ---- | ----------- |
| `queries` | Yes | `list of objects (see below)` | A list of queries that generate data points. |                                             
| `host` | No | `string`|  Host or address of the SQL instance. |                             
| `port` | No  | `integer` | Port of the SQL instance. The default value is `0`.    |
| `params`   | No | `map of strings` | Replaceable parameters, in the form of key-value pairs. The system inserts the values into `connectionString` for a specified key, using Go template syntax. For example, `{{.key}}`.   |
| `dbDriver` | No | `string`  | The database driver to use. Valid values are `postgres`, `mysql`, `sqlserver`, and `snowflake`. |
| `connectionString` | No    | `string`  | Connection string and replaceable parameters used to connect to the database. To learn more, see the list of connection string parameters for the Go `pq` package. |
| `logQueries`| No  | `bool`   | (default: `false`) If true, log query results infolevel. |

The nested `queries` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `query` | Yes  | `string`  | An SQL query text that selects one or more rows from a database.   |
| `params` | No  | `list of values`  | Optional parameters that replace placeholders in the query string.   |
| `metrics`  | No   | `list of objects (see below)` | Metrics generated from the query.   |
| `datapointExpressions` | No   | `list of strings` | A set of expressions that convert each row to a set of metrics. Each of these run for each row in the query result set, allowing you to generate multiple data points per row. Each expression must evaluate to a single data point or nil. |

The nested `metrics` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `metricName`    | Yes  | `string`  | The name of the metric as it appears in Splunk Observability Cloud.   |
| `valueColumn`   | Yes  | `string`  | The column name that holds the data point value.   |
| `dimensionColumns`   | No  | `list of strings` | The names of the columns that make up the dimensions of the data point.  |
| `isCumulative`   | No    | `bool` | Whether the value is a cumulative counters (true) or gauge (false). If you set this to the wrong value and send in your first data point for the metric name with the wrong type, you have to manually change the type, as it is set in the system based on the first type seen. The default value is `false`. |
| `dimensionPropertyColumns` | No    | `map of lists`  | Mapping between dimensions and the columns to be used to attach corresponding properties.    |

### Supported drivers

You must specify the `dbDriver` option that contains the name of the database driver to use. These names are the same as the name of the Golang SQL driver used in the agent. The monitor formats the `connectionString` according to the driver you specify. 

```{note}
Please be sure to use the correct connection string syntax based on the driver you're using. For example, if you use the `mysql` driver, you must use the connection string syntax for the `mysql` driver.
```

This is the list of the drivers currently supported:

- [`hana`](https://github.com/SAP/go-hdb)
- [`sqlserver`](https://pkg.go.dev/github.com/denisenkom/go-mssqldb)
- [`mysql`](https://pkg.go.dev/github.com/go-sql-driver/mysql)
- [`postgres`](https://pkg.go.dev/github.com/jackc/pgx)
- [`pq`](https://pkg.go.dev/github.com/lib/pq)
- [`snowflake`](https://pkg.go.dev/github.com/snowflakedb/gosnowflake)

### Parameterized connection string

The integration treats the value of `connectionString` as a Golang template with a context consisting of the variables `host` and `port` and all the parameters from the `params` option. To add a variable to the template, use the Golang `{{.varname}}` template syntax.

See the following example:

```yaml
smartagent/sql:
  type: sql
  host: localhost
  port: 1433
  dbDriver: sqlserver
  connectionString: 'Server=127.0.0.1;Database=WideWorldImporters;User Id=sa;Password=123456;'
  queries: 
    - query: 'SELECT COUNT(*) as count FROM Sales.Orders'
      metrics:
        - metricName: "orders"
          valueColumn: "count"
```

### Collect Snowflake performance and usage metrics

To configure the agents to collect Snowflake performance and usage metrics, do the following:

1. Copy the `pkg/sql/snowflake-metrics.yaml` file from the `sql` monitor repo into the same location as your `agent.yaml` file. For example, `/etc/splunk`. Find the latest version of `snowflake-metrics.yaml` [in our GitHub repo](https://github.com/splunk/observability-content-contrib/blob/main/dashboards-and-dashboard-groups/snowflakedb/Configuration/snowflake-metrics.yaml).
2. Configure the SQL monitor as follows:

```yaml
receivers:
  smartagent/sql:
    type: sql
    intervalSeconds: 3600
    dbDriver: snowflake
    params:
      account: "account.region"
      database: "SNOWFLAKE"
      schema: "ACCOUNT_USAGE"
      role: "ACCOUNTADMIN"
      user: "user"
      password: "password"
    connectionString: "{{.user}}:{{.password}}@{{.account}}/{{.database}}/{{.schema}}?role={{.role}}"
    queries:
      {"#from": "/etc/signalfx/snowflake-metrics.yaml"}
```

You can also copy the contents of `snowflake-metrics.yaml` into `agent.yaml` under `queries`. Edit `snowflake-metrics.yaml` to only include the metrics you want to monitor.

## Using the monitor

Consider the following `customers` database table:

| id | name  | country | status |
|:-------|:----------|:------------|:-----------|
| 1      | Bill      | USA         | active     |
| 2      | Mary      | USA         | inactive   |
| 3      | Joe       | USA         | active     |
| 4      | Elizabeth | Germany     | active     |

Use the following monitor configuration to generate metrics about active users and customer counts by country:

```yaml
receivers:
  smartagent/sql:
    type: sql
    host: localhost
    port: 5432
    dbDriver: postgres
    params:
      user: "${env:SQL_USERNAME}"
      password: "${env:SQL_PASSWORD}"
    # The `host` and `port` values shown in this example (also provided through autodiscovery) are interpolated
    # to the connection string as appropriate for the database driver.
    # Also, the values from the `params` configuration option above can be
    # interpolated.
    connectionString: 'host={{.host}} port={{.port}} dbname=main user={{.user}} password={{.password}} sslmode=disable'
    queries:
      - query: 'SELECT COUNT(*) as count, country, status FROM customers GROUP BY country, status;'
        metrics:
          - metricName: "customers"
            valueColumn: "count"
            dimensionColumns: ["country", "status"]
```

When you use this configuration, you get series of MTS, all with the metric name `customers`. Each MTS has a `county` and `status` dimension. The dimension value is the number of customers that belong to that combination of `country` and `status`. You can also specify multiple `metrics` items to generate more than one metric from a single query.

### Using metric expressions

If you need to do more complex logic than mapping columns to metric values and dimensions, use the `datapointExpressions` option that's available for individual metric configurations. Create more sophisticated logic to derive data points from individual rows by using the `expr` expression language. These expressions must evaluate to data points created by the `GAUGE` or `CUMULATIVE` helper functions available in the expression's context. You can also have the expression evaluate to `nil` if you don't need to generate a data point for a particular row.

Both the `GAUGE` and `CUMULATIVE` functions have the following signature:

(`metricName`, `dimensions`, `value`)

 * `metricName`: Must be a string
 * `dimensions`: Must be a map of string keys and values, and
 * `value`: Must be a numeric value.

Each of the columns in the row maps to a variable in the context of the expression with the same name.
For example, if you have a column called `name` in your SQL query result, you can use a variable called `name` in the expression. In your expression, surround string values with single quotes (`''`).

## Metrics

This integration doesn't produce any metrics.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```