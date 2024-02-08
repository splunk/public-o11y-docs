.. _sqlquery-receiver:

*******************************************
SQL Query receiver
*******************************************

.. meta::
      :description: The SQL Query receiver runs custom SQL queries to generate metrics from a database connection.

The SQL Query receiver uses custom SQL queries to generate metrics from a database connection. The supported pipeline is ``metrics``. See :ref:`otel-data-processing` for more information.

.. _sql-query-receiver-start:

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

To activate the receiver add ``sqlquery`` to the ``receivers`` section of your configuration file:

.. code-block:: yaml

    receivers:
      sqlquery:
        driver: your.driver
        datasource: "your_data_source"
        queries:
          - sql: "your_query"

Next, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [sqlquery]

See :ref:`sql-query-receiver-queries-example` for a complete config example.

Advanced configuration
----------------------------------

These are the most relevant required configuration fields:

* ``driver``. The name of the database driver, either ``postgres``, ``mysql``, ``snowflake``, ``sqlserver``, ``hdb`` (SAP HANA), or ``oracle`` (Oracle DB).
* ``datasource``. The datasource value passed to ``sql.Open``. This is a driver-specific string usually consisting of at least a database name and connection information. This is sometimes referred to as the "connection string" in driver documentation. For example, ``host=localhost port=5432 user=me password=s3cr3t sslmode=disable``.
* ``queries``. A list of queries, where a query is a sql statement and one or more logs and/or metrics sections. Learn more at :ref:`sql-query-receiver-queries`.

Optional fields include:

* ``collection_interval``. ``10s`` by default. The time interval between query executions. 
* ``storage``. ``""`` by default. The ID of a storage extension to be used to track processed results.
* ``telemetry``. Defines settings for the component's own telemetry, either logs, metrics, or traces.
* ``telemetry.logs``. Defines settings for the component's own logs.
* ``telemetry.logs.query``. ``false`` by default. If set to ``true``, every time a SQL query is run, the text of the query and the values of its parameters are logged together with the debug log "Running query".

See :ref:`sql-query-receiver-settings` for the full list of settings.

.. _sql-query-receiver-queries:

Perform queries
=================================================

A query consists of an SQL statement and one or more logs and/or metrics section: 

* At least one log or one metric section is required. 
* While it's technically possible to put both logs and metrics sections in a single query section, requirements for log and metric queries are quite different. 

Query metrics
----------------------

Each metrics section consists of a ``metric_name``, a ``value_column``, and additional optional fields. For each metric queried, the sql query produces one OTel metric per row returned.

These are the most relevant required configuration fields:

* ``metric_name``. The name assigned to the OTel metric.
* ``value_column``. The column name in the returned dataset used to set the value of the metric's datapoint. For some drivers, such as Oracle DB, it might be case-sensitive.

Relevant optional fields include:

* ``attribute_columns``. A list of column names in the returned dataset used to set attibutes on the datapoint. For some drivers, such as Oracle DB, it might be case-sensitive.
* ``data_type``. ``gauge`` (default) or ``sum``. Learn more at :ref:`metric-types`.
* ``value_type``. ``int`` (default) or ``double``.
* ``monotonic``. ``false`` by default. A boolean that indicates whether a cumulative sum's value is monotonically increasing, so it never rolls over or resets.
* ``aggregation``. ``cumulative`` (default) or ``delta``. It only applies to the ``sum`` metric type.
* ``description``. The description applied to the metric.
* ``unit``. The units applied to the metric.
* ``static_attributes``. The static attributes applied to the metrics.
* ``start_ts_column``. The name of the column containing the start timestamp, the value of which is applied to the metric's start timestamp, otherwise the current time is used. It only applies to the ``sum`` metric type.
* ``ts_column``. The name of the column containing the timestamp, the value of which is applied to the metric's timestamp. This can be current timestamp depending upon the time of last recorded metric's datapoint.

.. _sql-query-receiver-queries-example:

Example: Query a movie database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the SQL Query receiver to pull information from your databases. 

For example, if you have a movie database with a list of movies and their genre:

.. list-table::
  :widths: 70 30
  :header-rows: 1
  :width: 100%

  * - Name
    - Genre

  * - E.T.	
    - sci-fi

  * - Star Wars	
    - sci-fi

  * - Die Hard	
    - action

A ``count(*)`` query returns your movies grouped by genre:

.. list-table::
  :widths: 50 50
  :header-rows: 1

  * - count
    - Genre

  * - 2	
    - sci-fi

  * - 1	
    - action

If you use the following configuration:

.. code:: yaml

  receivers:
    sqlquery:
      driver: postgres
      datasource: "host=localhost port=5432 user=postgres password=s3cr3t sslmode=disable"
      storage: file_storage
      queries:
        - sql: "select count(*) as count, genre from movie group by genre"
          metrics:
            - metric_name: movie.genres
              value_column: "count"
              attribute_columns: ["genre"]
              static_attributes:
                dbinstance: mydbinstance

The query in the configuration returns two metrics at each collection interval:

Metric #0

* Descriptor:

  * Name: movie.genres
    
  * DataType: Gauge
  
* NumberDataPoints #0
  
* Data point attributes:
    
  * genre: STRING(sci-fi)
    
  * dbinstance: STRING(mydbinstance)

* Value: 2

Metric #1

* Descriptor:

  * Name: movie.genres
    
  * DataType: Gauge
  
* NumberDataPoints #0
  
* Data point attributes:
    
  * genre: STRING(action)
    
  * dbinstance: STRING(mydbinstance)

* Value: 1

Example: Query a movie database with the ``oracle`` driver
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the Oracle DB driver to connect and query the same table schema and contents as the example above.

.. code:: yaml

  sqlquery:
    # driver name: oracle
    # username: otel
    # password: password
    # host: localhost
    # container exposed port: 51521
    # Oracle DB service name: XE
    # Refer to Oracle Go Driver go_ora documentation for full connection string options
    datasource: "oracle://otel:password@localhost:51521/XE"
    driver: oracle
    queries:
      # Note: The table name may need to be preceded by the name of the user who created the table.
      # If the table is created by an initialization script within a docker container, it would be referred
      # to as "sys.movie", as the sys user runs initialization scripts. Permission would need to be granted
      # to the "otel" user to access or modify the table in that case.
      # This example assumes "otel" created the movie table.
      - sql: "select count(*) as count, genre, avg(imdb_rating) as avg from otel.movie group by genre"
        metrics:
          - metric_name: genre.count
            # Note that COUNT and GENRE are now all capital letters, the queries will return nothing if this isn't
            # accounted for.
            value_column: "COUNT"
            attribute_columns: [ GENRE ]
          - metric_name: genre.imdb
            value_column: "AVG"
            attribute_columns: [ GENRE ]
            value_type: "double"

Example: MySQL datasource format
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``datasource`` format for MySQL is ``user:password@tcp(host:port)/databasename``.

``NULL`` values
----------------------

.. caution:: Avoid queries that produce any ``NULL`` values. 

Keep in mind the following:

* A query that produces a ``NULL`` value logs a warning. 
* A configuration that references the column that produces a ``NULL`` value logs an additional error. 

In either case, the receiver continues to operate.

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