.. _postgresql:

PostgreSQL
==========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the PostgreSQL monitor. See benefits, install, configuration, and metrics

.. caution:: 
   
   The PostgreSQL monitor is now deprecated and will reach of End of Support on October 31st, 2024. During this period only critical security and bug fixes are provided. When End of Support is reached, the monitor will be removed and no longer be supported, and you won't be able to use it to send data to Splunk Observability Cloud. 

   To monitor your PostgreSQL databases you can use the native OpenTelemetry PostgreSQL receiver instead. See more at :ref:`postgresql-receiver`.

The :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``postgresql`` monitor type to pull metrics from all PostgreSQL
databases from a specific Postgres server instance using SQL queries.

Configuration settings
----------------------

The following table shows the configuration options for the
``postgresql`` integration:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``host``
      - no
      - ``string``
      - 
   - 

      - ``port``
      - no
      - ``integer``
      - (**default:** ``0``)
   - 

      - ``masterDBName``
      - no
      - ``string``
      - The “master” database to which the agent first connects to query
         the list of databases available in the server. This database
         should be accessible to the user specified with
         ``connectionString`` and ``params`` below, and that user should
         have permission to query ``pg_database``. If you want to filter
         which databases are monitored, use the ``databases`` option
         below. (**default:** ``postgres``)
   - 

      - ``connectionString``
      - no
      - ``string``
      - See Connection String Parameters
   - 

      - ``params``
      - no
      - ``map of strings``
      - Parameters to the connection string that can be templated into
         the connection string with the syntax ``{{.key}}``.
   - 

      - ``databases``
      - no
      - ``list of strings``
      - List of databases to send database-specific metrics about. If
         omitted, metrics about all databases will be sent. This is an
         :ref:`overridable set <filtering-smart-agent>`
         (**default:** ``[*]``)
   - 

      - ``databasePollIntervalSeconds``
      - no
      - ``integer``
      - How frequently to poll for new/deleted databases in the DB
         server. Defaults to the same as ``intervalSeconds`` if not set.
         (**default:** ``0``)
   - 

      - ``logQueries``
      - no
      - ``bool``
      - If ``true,`` queries will be logged at the info level.
         (**default:** ``false``)
   - 

      - ``topQueryLimit``
      - no
      - ``integer``
      - The number of top queries to consider when publishing
         query-related metrics (**default:** ``10``)

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
