.. _sqlquery-receiver:

*******************************************
SQL Query receiver
*******************************************

.. meta::
      :description: The SQL Query receiver runs custom SQL queries to generate metrics from a database connection.

The SQL Query receiver uses custom SQL queries to generate metrics from a database connection. The supported pipeline is ``metrics``. See :ref:`otel-data-processing` for more information.

.. _get-started-sql-query-receiver:

Get started
=================================================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the SQL Query receiver as described in the next section. 
3. Restart the Collector.

Sample configuration
-------------------------------------------------

To activate the receiver add ``sqlquery`` to the ``receivers`` section of your ``agent_config.yaml`` file, as in the following example configuration:

.. code-block:: yaml

    receivers:
      sqlquery:
        xxxx

Next, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [sqlquery]

Advanced settings
----------------------

These are the most relevant configuration fields:

* ``driver``. :strong:`Required`: The name of the database driver: one of postgres, mysql, snowflake, sqlserver, hdb (SAP HANA), or oracle (Oracle DB).
* datasource(required): The datasource value passed to sql.Open. This is a driver-specific string usually consisting of at least a database name and connection information. This is sometimes referred to as the "connection string" in driver documentation. e.g. host=localhost port=5432 user=me password=s3cr3t sslmode=disable
* queries(required): A list of queries, where a query is a sql statement and one or more logs and/or metrics sections (details below).
* collection_interval(optional): The time interval between query executions. Defaults to 10s.
* storage (optional, default ""): The ID of a storage extension to be used to track processed results.
* telemetry (optional) Defines settings for the component's own telemetry - logs, metrics or traces.
* telemetry.logs (optional) Defines settings for the component's own logs.
* telemetry.logs.query (optional, default false) If set to true, every time a SQL query is run, the text of the query and the values of its parameters will be logged together with the debug log "Running query".

See :ref:`sql-query-receiver-settings` for the full list of settings.


Queries
=================================================


A query consists of a sql statement and one or more logs and/or metrics section. At least one logs or one metrics section is required. Note that technically you can put both logs and metrics sections in a single query section, but it's probably not a real world use case, as the requirements for logs and metrics queries are quite different.

Additionally, each query section supports the following properties:

tracking_column (optional, default "") Applies only to logs. In case of a parameterized query, defines the column to retrieve the value of the parameter on subsequent query runs. See the below section Tracking processed results.
tracking_start_value (optional, default "") Applies only to logs. In case of a parameterized query, defines the initial value for the parameter. See the below section Tracking processed results.
Example:

receivers:
  sqlquery:
    driver: postgres
    datasource: "host=localhost port=5432 user=postgres password=s3cr3t sslmode=disable"
    queries:
      - sql: "select * from my_logs where log_id > $$1"
        tracking_start_value: "10000"
        tracking_column: log_id
        logs:
          - body_column: log_body
      - sql: "select count(*) as count, genre from movie group by genre"
        metrics:
          - metric_name: movie.genres
            value_column: "count"


Query metrics
----------------------


Each metrics section consists of a metric_name, a value_column, and additional optional fields. Each metric in the configuration will produce one OTel metric per row returned from its sql query.

metric_name(required): the name assigned to the OTel metric.
value_column(required): the column name in the returned dataset used to set the value of the metric's datapoint. This may be case-sensitive, depending on the driver (e.g. Oracle DB).
attribute_columns(optional): a list of column names in the returned dataset used to set attibutes on the datapoint. These attributes may be case-sensitive, depending on the driver (e.g. Oracle DB).
data_type (optional): can be gauge or sum; defaults to gauge.
value_type (optional): can be int or double; defaults to int.
monotonic (optional): boolean; whether a cumulative sum's value is monotonically increasing (i.e. never rolls over or resets); defaults to false.
aggregation (optional): only applicable for data_type=sum; can be cumulative or delta; defaults to cumulative.
description (optional): the description applied to the metric.
unit (optional): the units applied to the metric.
static_attributes (optional): static attributes applied to the metrics.
start_ts_column (optional): the name of the column containing the start timestamp, the value of which is applied to the metric's start timestamp (otherwise the current time is used). Only applies if the metric is of type cumulative sum.
ts_column (optional): the name of the column containing the timestamp, the value of which is applied to the metric's timestamp. This can be current timestamp depending upon the time of last recorded metric's datapoint.




Example
receivers:
  sqlquery:
    driver: postgres
    datasource: "host=localhost port=5432 user=postgres password=s3cr3t sslmode=disable"
    storage: file_storage
    queries:
      - sql: "select * from my_logs where log_id > $$1"
        tracking_start_value: "10000"
        tracking_column: log_id
        logs:
          - body_column: log_body
      - sql: "select count(*) as count, genre from movie group by genre"
        metrics:
          - metric_name: movie.genres
            value_column: "count"
            attribute_columns: ["genre"]
            static_attributes:
              dbinstance: mydbinstance
Given a movie table with three rows:

name	genre
E.T.	sci-fi
Star Wars	sci-fi
Die Hard	action
If there are two rows returned from the query select count(*) as count, genre from movie group by genre:

count	genre
2	sci-fi
1	action
then the above config will produce two metrics at each collection interval:

Metric #0
Descriptor:
     -> Name: movie.genres
     -> DataType: Gauge
NumberDataPoints #0
Data point attributes:
     -> genre: STRING(sci-fi)
     -> dbinstance: STRING(mydbinstance)
Value: 2

Metric #1
Descriptor:
     -> Name: movie.genres
     -> DataType: Gauge
NumberDataPoints #0
Data point attributes:
     -> genre: STRING(action)
     -> dbinstance: STRING(mydbinstance)
Value: 1
NULL values
Avoid queries that produce any NULL values. If a query produces a NULL value, a warning will be logged. Furthermore, if a configuration references the column that produces a NULL value, an additional error will be logged. However, in either case, the receiver will continue to operate.

Oracle DB Driver Example
Refer to the config file provided for an example of using the Oracle DB driver to connect and query the same table schema and contents as the example above. The Oracle DB driver documentation can be found here. Another usage example is the go_ora example here.

MySQL Datasource Format Example
The datasource format for MySQL works as follows:
user:password@tcp(host:port)/databasename









.. _sql-query-receiver-settings:

Settings
=================================================

The following table shows the configuration options for the SQL Query receiver:

.. raw:: html

    <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tool/main/cfg-metadata/receiver/sqlquery.yaml"></div>


.. _troubleshoot-sql-query-receiver:

Troubleshooting
=================================================

.. include:: /_includes/troubleshooting-components.rst