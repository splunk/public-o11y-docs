.. _oracledb:

Oracle Database receiver
****************************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the OracleDB / Oracle Database monitor. See benefits, install, configuration, and metrics"

The Splunk Distribution of OpenTelemetry Collector provides this
integration as the Oracle Database receiver. The receiver connects to an
Oracle Database instance and obtains metrics such as physical reads, CPU
time, and others.

Installation
=======================

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   
   - :ref:`otel-install-windows`
   
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Create a database user for this monitor
-------------------------------------------

To create an Oracle Database user for this monitor, run the following
commands:

.. code:: sql

    -- Create user and set a password
    CREATE USER <username> IDENTIFIED BY <password>;

Depending on which metrics you collect, you might need to assign the
following permissions to the database user:

-  ``GRANT SELECT ON V_$SESSION TO <username>;``
-  ``GRANT SELECT ON V_$SYSSTAT TO <username>;``
-  ``GRANT SELECT ON V_$RESOURCE_LIMIT TO <username>;``
-  ``GRANT SELECT ON DBA_TABLESPACES TO <username>;``
-  ``GRANT SELECT ON DBA_DATA_FILES TO <username>;``

Configuration
=======================

To activate this monitor in the Splunk Distribution of OpenTelemetry
Collector, make sure that the configuration contains the following:

.. code:: yaml

   receivers:
     oracledb:
       # Refer to Oracle Go Driver go_ora documentation for full connection string options
       datasource: "oracle://<user>:<password>@<host>:<port>/<database>"

To add more than one instance of Oracle Database, add as many entries of
the ``oracledb`` receiver as needed. For example:

.. code:: yaml

   receivers:
     oracledb/aninstance:
       # Refer to Oracle Go Driver go_ora documentation for full connection string options
       datasource: "oracle://<user>:<password>@<host>:<port>/<database>"
     
     oracledb/anotherinstance:
       # Refer to Oracle Go Driver go_ora documentation for full connection string options
       datasource: "oracle://<user>:<password>@<host>:<port>/<database>"

To complete the monitor activation, you must also include the
``oracledb`` receiver item in a ``metrics`` pipeline. To do this, add
the receiver item to the ``service`` > ``pipelines`` > ``metrics`` >
``receivers`` section of your configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers:
           - oracledb

Configuration options
--------------------------------

The following table shows the configuration options:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/oracledb.yaml"></div>

Metrics
=======================

The following metrics are available for this integration:

.. list-table::
   :widths: 9 24 9 9 22
   :header-rows: 1

   - 

      - Name
      - Description
      - Unit
      - Type
      - Attributes
   - 

      - ``oracledb.cpu_time``
      - Cumulative CPU time, in seconds.
      - Seconds
      - Sum(Double)
      - 
   - 

      - ``oracledb.dml_locks.limit``
      - Maximum limit of active DML (Data Manipulation Language) locks.
      - Locks
      - Gauge(Int)
      - 
   - 

      - ``oracledb.dml_locks.usage``
      - Current count of active DML (Data Manipulation Language) locks.
      - Locks
      - Gauge(Int)
      - 
   - 

      - ``oracledb.enqueue_deadlocks``
      - Total number of deadlocks between table or row locks in
         different sessions.
      - Deadlocks
      - Sum(Int)
      - 
   - 

      - ``oracledb.enqueue_locks.limit``
      - Maximum limit of active enqueue locks.
      - Locks
      - Gauge(Int)
      - 
   - 

      - ``oracledb.enqueue_locks.usage``
      - Current count of active enqueue locks.
      - Locks
      - Gauge(Int)
      - 
   - 

      - ``oracledb.enqueue_resources.limit``
      - Maximum limit of active enqueue resources.
      - Resources
      - Gauge(Int)
      - 
   - 

      - ``oracledb.enqueue_resources.usage``
      - Current count of active enqueue resources.
      - Resources
      - Gauge(Int)
      - 
   - 

      - ``oracledb.exchange_deadlocks``
      - Number of times that a process detected a potential deadlock
         when exchanging two buffers and raised an internal, restartable
         error. Index scans are the only operations that run exchanges.
      - Locks
      - Sum(Int)
      - 
   - 

      - ``oracledb.executions``
      - Total number of calls (user and recursive) that executed SQL
         statements\ ``| Executions | Sum(Int) |  | |``\ oracledb.hard_parses\ ``| Number of hard parses. | Parses | Sum(Int) |  | |``\ oracledb.logical_reads\ ``| Number of logical reads. | Reads | Sum(Int) |  | |``\ oracledb.parse_calls\ ``| Total number of parse calls. | Parses | Sum(Int) |  | |``\ oracledb.pga_memory\ ``| Session PGA (Program Global Area) memory``
      - Bytes
      - Sum(Int)
      - 
   - 

      - ``oracledb.physical_reads``
      - Number of physical reads.
      - Reads
      - Sum(Int)
      - 
   - 

      - ``oracledb.processes.limit``
      - Maximum limit of active processes.
      - Processes
      - Gauge(Int)
      - 
   - 

      - ``oracledb.processes.usage``
      - Current count of active processes.
      - Processes
      - Gauge(Int)
      - 
   - 

      - ``oracledb.sessions.limit``
      - Maximum limit of active sessions.
      - Sessions
      - Gauge(Int)
      - 
   - 

      - ``oracledb.sessions.usage``
      - Count of active sessions.
      - Sessions
      - Gauge(Int)
      - ``session_type``, ``session_status``
   - 

      - ``oracledb.tablespace_size.limit``
      - Maximum size of tablespace, in bytes.
      - Bytes
      - Gauge(Int)
      - ``tablespace_name``
   - 

      - ``oracledb.tablespace_size.usage``
      - Used tablespace, in bytes.
      - Bytes
      - Gauge(Int)
      - ``tablespace_name``
   - 

      - ``oracledb.transactions.limit``
      - Maximum limit of active transactions.
      - Transactions
      - Gauge(Int)
      - 
   - 

      - ``oracledb.transactions.usage``
      - Current count of active transactions.
      - Transactions
      - Gauge(Int)
      - 
   - 

      - ``oracledb.user_commits``
      - Number of user commits. When a user commits a transaction, the
         redo generated that reflects the changes made to database
         blocks is written to disk. Commits often represent the closest
         thing to a user transaction rate.
      - Commits
      - Sum(Int)
      - 
   - 

      - ``oracledb.user_rollbacks``
      - Number of times users manually issue the ``ROLLBACK`` statement
         or an error occurs during a user's transactions.
      - 1
      - Sum(Int)
      - 

Resource attributes
------------------------

.. list-table::
   :widths: 15 42 15
   :header-rows: 1

   - 

      - Name
      - Description
      - Type
   - 

      - ``oracledb.instance.name``
      - Name of the instance from which data is coming.
      - String

Metric attributes
-------------------------

.. list-table::
   :header-rows: 1

   - 

      - Name
      - Description
      - Values
   - 

      - ``session_status``
      - Session status
      - 
   - 

      - ``session_type``
      - Session type
      - 
   - 

      - ``tablespace_name``
      - Tablespace name
      - 

Activate or deactivate metrics
---------------------------------

You can activate or deactivate specific metrics by setting the value of the
``enabled`` option to ``true`` or ``false``.

The following example deactivates the ``oracledb.executions`` metric and
activated the ``oracledb.sessions.usage`` metric:

.. code:: yaml

   receivers:
     oracledb:
       datasource: "oracle://otel:password@localhost:51521/XE"
       metrics:
         oracledb.executions:
           enabled: false
         oracledb.sessions.usage:
           enabled: true

Get help
=======================

.. include:: /_includes/troubleshooting-components.rst
