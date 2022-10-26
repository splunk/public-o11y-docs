
.. _db-perf-nosql:

************************************************************************
Database Query Performance for NoSQL databases
************************************************************************

.. meta::
   :description: Database Query Performance is compatible with the following NoSQL databases.

Database Query Performance can help you troubleshoot performance issues with NoSQL databases.

Redis
================

Database Query performance shows the top commands for Redis databases called by your application. You can sort commands by total time, P90 latency, or requests.

The MetricSet for Redis databases include the following properties:

- Database type: ``db.type``
- Redis command: ``db.operation``
- Database system: ``db.system``

To instrument Redis for infrastructure metrics and see related Infrastructure Monitoring content, see :ref:`redis`. The following screenshot shows a sample Redis service with related infrastructure content.

.. image:: /_images/apm/db-query-perf/db-perf-redis.png
   :width: 95%
   :alt: Related content for an instrumented Redis service.

.. note:: Redis databases appear as "Redis" in the :guilabel:`Services` menu.