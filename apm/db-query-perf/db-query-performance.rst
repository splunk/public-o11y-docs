.. _db-query-performance:

************************************************************************
Monitor Database Query Performance
************************************************************************

.. meta::
   :description: Slow database queries are sometimes the culprit of wider service availability issues. With Database Query Performance, you can monitor the impact of your database queries on service availability directly in Splunk APM. 

.. toctree::
   :hidden:

   enable-db-perf
   db-perf-use-case
   db-perf-troubleshooting
   db-perf-reference

Slow database queries can be the culprit of wider service availability issues. With Database Query Performance, you can monitor the impact of your database queries on service availability directly in Splunk APM. This way, you can quickly identify long-running, unoptimized, or heavy queries and mitigate issues they might be causing,  without having to instrument your databases.

.. raw:: html

  <embed>
    <h2>How Database Query Performance works</h2>
  </embed>

Splunk APM identifies databases as inferred services in your system using automatically generated span tags such as ``db.type``, ``db.instance`` and ``db.statement``. Databases appear throughout APM, such as in their inferred locations in the service map, in the service filter list, and in trace view. See :ref:`apm-inferred-services` to learn more about inferred services in APM.

With Database Query Performance, Splunk APM provides additional analytics for a set of supported SQL databases. See :ref:`supported-dbs` for the full list. 

.. raw:: html

  <embed>
    <h3>Database query normalization</h3>
  </embed>

To provide analytics for database queries, Splunk APM captures SQL statements (or queries) from the span in which each call is made. Then APM normalizes each query by replacing dynamic elements with static placeholders to minimize cardinality, and records the following metrics about the query’s performance: 

    - Total response time
    - 90th percentile (P90) of latency
    - Total number of requests
    - Requests per second 

.. raw:: html

  <embed>
    <h1>What you can do with Database Query Performance</h1>
  </embed>

Although Database Query Performance doesn't replace end-to-end database monitoring tools targeted at database administrators (DBAs), it can help you quickly determine whether a service availability issue is related to a particular database query, so you can alert the right admin. 

You can use insights from Database Query Performance to address the following use cases related to monitoring service availability, optimizing service performance, and monitoring database queries themselves: 

.. raw:: html

  <embed>
    <h2>Monitor service availability</h2>
  </embed>

You can use Database Query Performance to address the following use cases related to service availability:

    * :strong:`Isolate database issues:` Determine whether an increase in the latency or error rate of a service is related to problems with a database. If it is, you can quickly identify which database and which specific query is contributing the most latency, so you can resolve it by involving the DBA or the owner of the service that’s making the slow database call. 
    * :strong:`Respond to alerts:` When you receive alerts about service availability, you can quickly eliminate databases as a root cause of the issue by seeing at a glance whether database latency or error rate increased, or whether a particular query is slow or bottlenecked.
    * :strong:`Dashboard with databases:` Use a dashboard to determine whether a new release to a service had an impact on database interactions by examining the average query response time, the number of query executions, and the change in these values over time. 
    * :strong:`Assess impact:` When you receive an alert related to database latency, quickly assess the radius of impact to determine whether customer-facing services were impacted.  

.. raw:: html

  <embed>
    <h2>Optimize service performance</h2>
  </embed>

You can also use Database Query Performance to identify possible opportunities to optimize your system. 

* :strong:`Compare queries within a given database:` By viewing query performance for a specific database over time, you can use the list of queries to identify the top database queries by latency or execution count and find opportunities to improve the performance of a given database.
* :strong:`Examine a specific query over time:` You can also examine the performance of a specific query over time. This lets you see whether other factors in your system have affected the latency or request frequency of a given query within a database to help you decide whether you need to adjust or optimize that query.   

.. raw:: html

  <embed>
    <h1>Enable Database Query Performance in Splunk APM</h1>
  </embed>

Database Query Performance is available by default, so all you need to do is enable the feature so that APM automatically begins indexing database-related span tags. See :ref:`enable-db-perf` to get started monitoring database performance in APM. 

.. raw:: html

  <embed>
    <h2>Learn more</h2>
  </embed>

See the following links for more information about Database Query Performance: 

* To enable Database Query Performance, see :ref:`enable-db-perf`. 
* For a detailed use case using Database Query Performance, see :ref:`db-perf-use-case`. 
* To troubleshoot issues with Database Query Performance, see :ref:`db-perf-troubleshooting`. 
* For reference material about Database Query Performance, see :ref:`db-perf-reference`.