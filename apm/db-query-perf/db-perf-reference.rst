.. _db-perf-reference:

************************************************************************
Reference for Database Query Performance
************************************************************************

.. meta::
   :description: Reference material for using Database Query Performance in Splunk APM. 

.. _supported-dbs:

Supported databases
--------------------------

Database Query Performance provides insights for the following database software:

- Oracle
- MySQL
- Redis
- Microsoft SQL Server
- PostgreSQL
- Aurora
- MariaDB
- OceanBase
- Db2
- Presto 
     
Database Query Performance works with all versions supported by the instrumented applications.

.. note:: Related Content is available for Oracle, MySQL, Redis, and Microsoft SQL Server. For more information on related content, see :ref:`get-started-relatedcontent`. 

.. _db-tags:

Database-related span tags
--------------------------

Enabling Database Query Performance enables indexing for the following database-related span tags: 

.. list-table::
   :header-rows: 1
   :widths: 30 20 50

   * - :strong:`Key`
     - :strong:`Value type`
     - :strong:`Value description`

   * - Normalized db.statement (``_sf_normalized_db_statement``)
     - string
     - The database statement, with dynamic elements replaced with placeholders to reduce cardinality

   * - ``db.name``
     - string
     - Name of the database
    
   * - ``db.operation``
     - string
     - Operation in the database

   * - ``db.sql.table``
     - string
     - Table in the database (SQL only)

   * - ``db.system`` 
     - string
     - System of the database


Learn more
-------------
See the following links for more information about Database Query Performance: 

* For an overview of Database Query Performance, see :ref:`db-query-performance`.
* To enable Database Query Performance, see :ref:`enable-db-perf`. 
* For a detailed use case using Database Query Performance, see :ref:`db-perf-use-case`. 
* To troubleshoot issues with Database Query Performance, see :ref:`db-perf-troubleshooting`. 
