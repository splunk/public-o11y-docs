.. _db-query-performance:

************************************************************************
Monitor Database Query Performance
************************************************************************

.. meta::
   :description: Learn how to use Database Query Performance to monitor the impact of your database queries on service availability directly in Splunk APM. 

.. toctree::
   :hidden:

   turn-on-db-perf
   db-perf-scenario
   db-perf-redis-scenario
   db-perf-troubleshooting
   db-perf-reference
   db-perf-nosql

Slow database queries might be the culprit of wider service availability issues. With Database Query Performance, you can monitor the impact of your database queries on service availability directly in Splunk APM. This way, you can quickly identify long-running, unoptimized, or heavy queries and mitigate issues they might be causing, without having to instrument your databases.

.. raw:: html

  <embed>
    <h2>How Database Query Performance works</h2>
  </embed>

Splunk APM identifies databases as inferred services in your system using automatically generated span tags. Databases appear throughout APM, such as in their inferred locations in the service map, in the service filter list, and in trace view. See :ref:`apm-inferred-services` to learn more about inferred services in APM.

With Database Query Performance, Splunk APM provides additional analytics for a set of supported SQL and NoSQL databases. See :ref:`supported-dbs` for the full list.

.. raw:: html

  <embed>
    <h3>Database query normalization</h3>
  </embed>

To provide analytics for database queries, Splunk APM captures SQL statements, or queries, from the span in which each call happens. Then APM replaces dynamic elements in each raw query with static placeholders to minimize cardinality, and records the following metrics about the query's performance: 

    - Total response time
    - 90th percentile (P90) of latency
    - Total number of requests
    - Requests per second 

Normalized queries have all dynamic elements replaced by the ``?`` character. The following screenshot shows database queries in Database Query Performance with replaced dynamic elements:

.. image:: /_images/apm/db-query-perf/normalized-queries.png
   :width: 100%
   :alt: Highlighted ? characters in normalized queries, which replace dynamic elements to reduce cardinality and sanitize data from sensitive information.

.. note:: To learn more about the handling of personal identifiable information for database monitoring, see :ref:`db-monitoring-pii-handling`.

.. raw:: html

  <embed>
    <h2>What you can do with Database Query Performance</h2>
  </embed>

Although Database Query Performance doesn't replace end-to-end database monitoring tools targeted at database administrators (DBAs), it can help you quickly determine whether a service availability issue is related to a particular database query, so you can alert the correct admin. 

You can use insights from Database Query Performance to address the following scenarios related to monitoring service availability, optimizing service performance, and monitoring database queries themselves: 

.. raw:: html

  <embed>
    <h3>Monitor service availability</h3>
  </embed>

You can use Database Query Performance to address the following scenarios related to service availability:

    * :strong:`Isolate database issues:` Determine whether an increase in the latency or error rate of a service is related to problems with a database. If it is, you can quickly identify which database and which specific query is contributing the most latency, so you can resolve it by involving the DBA or the owner of the service that's making the slow database call. 
    * :strong:`Identify underlying infrastructure:` Thanks to Related Content, see which host is running the database service, or get to the database service from Infrastructure Monitoring. For more information, see :ref:`get-started-relatedcontent`.
    * :strong:`Respond to alerts:` When you receive alerts about service availability, you can quickly eliminate databases as a root cause of the issue by seeing at a glance whether database latency or error rate increased, or whether a particular query is slow or bottlenecked.
    * :strong:`Dashboard with databases:` Use a dashboard to determine whether a new release to a service had an impact on database interactions by examining the average query response time, the number of query executions, and the change in these values over time. 
    * :strong:`Assess impact:` When you receive an alert related to database latency, quickly assess the radius of impact to determine whether customer-facing services were impacted.  

.. raw:: html

  <embed>
    <h3>Optimize service performance</h3>
  </embed>

You can also use Database Query Performance to identify possible opportunities to optimize your system. 

* :strong:`Compare queries within a given database:` By viewing query performance for a specific database over time, you can use the list of queries to identify the top database queries by latency or execution count and find opportunities to improve the performance of a given database.
* :strong:`Examine a specific query over time:` You can also examine the performance of a specific query over time. This lets you see whether other factors in your system have affected the latency or request frequency of a given query within a database to help you decide whether you need to adjust or optimize that query.

.. raw:: html

  <embed>
    <h2>Enable Database Query Performance in Splunk APM</h2>
  </embed>

Database Query Performance is available by default, so all you need to do is turn on the feature so that APM automatically begins indexing database-related span tags. See :ref:`turn-on-db-perf` to get started monitoring database performance in APM. 

.. raw:: html

  <embed>
    <h2>Learn more</h2>
  </embed>

See the following links for more information about Database Query Performance: 

* To turn on Database Query Performance, see :ref:`turn-on-db-perf`. 
* For a scenario focusing on MySQL and SQL troubleshooting, see :ref:`db-perf-scenario`. 
* For a scenario focusing on Redis and NoSQL troubleshooting, see :ref:`redis-scenario`.
* To troubleshoot issues with Database Query Performance, see :ref:`db-perf-troubleshooting`. 
* For reference material about Database Query Performance, see :ref:`db-perf-reference`.