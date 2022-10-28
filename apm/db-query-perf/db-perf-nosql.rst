
.. _db-perf-nosql:

************************************************************************
Database Query Performance for NoSQL
************************************************************************

.. meta::
   :description: Database Query Performance can help you troubleshoot performance issues the following NoSQL databases.

Database Query Performance can help you troubleshoot performance issues the following NoSQL databases. Indexing of NoSQL metrics can be managed separately. For a sample use case, see :ref:`redis-use-case`.

.. _redis-db-query-performance::

Redis
================

Database Query performance shows the top commands for Redis databases called by your application. You can sort commands by total time, P90 latency, or requests. All versions of Redis supported by your application are compatible.

To instrument Redis for infrastructure metrics and see related Infrastructure Monitoring content, see :ref:`redis`. The following screenshot shows a sample Redis service with related infrastructure content.

.. image:: /_images/apm/db-query-perf/db-perf-redis.png
   :width: 95%
   :alt: Related content for an instrumented Redis service.

For a use case focusing on Redis and NoSQL troubleshooting, see :ref:`redis-use-case`.

.. note:: Redis databases appear as "Redis" in the :guilabel:`Services` menu.

Manage NoSQL database monitoring
=======================================

You can pause and restart the indexing of NoSQL metrics at any time and separately from SQL metrics.

See :ref:`manage-TMS` for more information.