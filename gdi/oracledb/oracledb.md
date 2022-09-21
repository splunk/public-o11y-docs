(oracledb)=
# Oracle Database
<meta name="description" content="Documentation on the Oracle Database monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the Oracle Database driver for the SQLQuery receiver. The receiver connects to an Oracle Database instance and runs custom SQL queries to generate metrics from a database connection.

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
 -- Give appropriate permissions
 GRANT CREATE SESSION TO <username>;
 GRANT READ ON <table_name> TO <username>;
```

The new user only has enough privileges to connect to the database. Additional privileges are not required.

## Configuration

To activate this monitor type in the Collector, add the following lines to your <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector" target="_blank">configuration (YAML) file</a>: 

### Splunk Distribution of OpenTelemetry Collector

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, make sure that the configuration contains the following:

```yaml
receivers:
  sqlquery:
    # Don't change the value of driver for Oracle Databases
    driver: oracle
    # Customize the data source with your URL, port, and access credentials
    # For example: oracle://otel:password@localhost:51521/XE"
    datasource: "oracle://<user>:<password>@<host>:<port>/<service_name>"
    queries:
      # The table name may need to be preceded by the name of the user who created the table.
      # The following is a sample query that generates two metrics from the same query
      - sql: "select count(*) as count, genre, avg(imdb_rating) as avg from otel.movie group by genre"
        metrics:
          - metric_name: genre.count
            value_column: "COUNT"
            attribute_columns: [GENRE]
          - metric_name: genre.imdb
            value_column: "AVG"
            attribute_columns: [GENRE]
            value_type: "double"
```

To complete the monitor activation, you must also include the `sqlquery` receiver item in a `metrics` pipeline. To do this, add the receiver item to the `service` > `pipelines` > `metrics` > `receivers` section of your configuration file. For example:

```yaml
service:
  pipelines:
    metrics:
      receivers:
        - sqlquery
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `driver` | Yes | `string` | Name of the database driver. For Oracle Database, set the option to `oracle`. |
| `datasource` | Yes | `string` | Datasource value passed to `sql.Open`. This is a driver-specific string usually consisting of at least a database name and connection information. For example: `oracle://otel:password@localhost:51521/XE` |
| `queries` | Yes | `list of objects` | A list of queries. See the next table for details. |
| `collection_interval` | No | `string` | Interval between query executions. The default value is `10s`. |

Each query in `queries` consists of an SQL statement and one or more metrics, where each metric consists of a metric name, a value column, and additional settings. Each metric produces one OTel metric per row returned from its SQL query.

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `metric_name` | Yes | `string` | Name of the assigned OTel metric. |
| `value_column` | No | `string` | Column name in the returned dataset used to set the value of the metric data point. Values are case-sensitive for Oracle Database. |
| `attribute_columns` | No | `list` | List of column names in the returned dataset used to set attributes on the data point. Values are case-sensitive for Oracle Database. |
| `data_type` | No | `string` | Type of metric data. Possible values are `gauge` or `sum`. The default value is `gauge`. |
| `value_type` | No | `string` | Type of value. Possible values are `int` or `double`. The default is `int`. |
| `monotonic` | No | `boolean` | Whether a cumulative sum's value is monotonically increasing, that is, never rolls over or resets, The default value is `false`. |
| `aggregation` | No | `string` | Whether to aggregate data. Only applicable for `data_type=sum`. Possible values are `cumulative` or `delta`. The default value is `cumulative`. |
| `description` | No | `string` | Description applied to the metric. |
| `unit` | No | `string` | Units applied to the metric. |
| `static_attributes` | No | `string` | Static attributes applied to the metrics. |

## Troubleshooting

```{include} /_includes/troubleshooting.md
```