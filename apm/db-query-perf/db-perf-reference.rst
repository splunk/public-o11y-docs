.. _db-perf-reference:

************************************************************************
Reference for Database Query Performance
************************************************************************

.. meta::
   :description: Reference material for using Database Query Performance in Splunk APM. 

.. _supported-dbs:

Supported databases
=======================

Database Query Performance provides insights for the following database software:

- MySQL
- Microsoft SQL Server
- PostgreSQL
- Oracle
- Redis
- Aurora
- MariaDB
- OceanBase
- Db2
- Presto 

Database Query Performance works with all versions supported by the instrumented applications.

.. note:: Related Content is available for Oracle, MySQL, Redis, and Microsoft SQL Server. For more information on related content, see :ref:`get-started-relatedcontent`. 

.. _db-tags:

Database-related span tags
=============================

Database Query Performance indexes the following span tags.

SQL databases
---------------------------

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - :strong:`Key`
     - :strong:`Type`
     - :strong:`Description`

   * - Normalized db.statement (``_sf_normalized_db_statement``)
     - string
     - The database statement, with dynamic elements replaced with placeholders to reduce cardinality

   * - ``db.name``
     - string
     - Name of the database

   * - ``db.type``
     - string
     - Type of database
    
   * - ``db.operation``
     - string
     - Operation in the database

   * - ``db.sql.table``
     - string
     - Table in the database (SQL only)

   * - ``db.system`` 
     - string
     - System of the database

Redis
---------------------------

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - :strong:`Key`
     - :strong:`Type`
     - :strong:`Description`

   * - Database operation (``_sf_db_operation``)
     - string
     - Operation in the database, derived from ``db.statement`` or ``db.operation``

   * - ``db.system`` 
     - string
     - System of the database

Learn more
==============

See the following links for more information about Database Query Performance: 

* For an overview of Database Query Performance, see :ref:`db-query-performance`.
* To turn on Database Query Performance, see :ref:`turn-on-db-perf`. 
* For a scenario focusing on MySQL and SQL troubleshooting, see :ref:`db-perf-scenario`. 
* For a scenario focusing on Redis and NoSQL troubleshooting, see :ref:`redis-scenario`.
* To troubleshoot issues with Database Query Performance, see :ref:`db-perf-troubleshooting`. 
