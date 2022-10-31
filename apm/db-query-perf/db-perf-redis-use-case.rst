.. _redis-use-case:

.. THIS IS STILL RAW AND IN PROGRESS -- DON'T REVIEW YET

**************************************************************************
Use case: Identify slow database queries using Database Query Performance
**************************************************************************

.. meta::
   :description: Skyler, the lead site reliability engineer at Buttercup Games, has been tasked with troubleshooting high latencies that have been reported by customers in the new advertisement service, which uses a Redis database.

Skyler, the lead site reliability engineer at Buttercup Games, has been tasked with troubleshooting high latencies that have been reported by customers in the new advertisement service, which uses a Redis database.

- :ref:`use-case-check-infrastructure-redis`
- :ref:`use-case-check-service-latency`
- :ref:`use-case-check-command-latency`
- :ref:`use-case-dig-into-spans`

.. _use-case-check-infrastructure-redis:

As an SRE you notice high latency issue for a specific redis instance. 

You review performance metrics for that instance and notice that your commands processing rate has drastically dropped
Total number of commands processed by the server has been low

.. image:: /_images/apm/redis/high-latency.png
   :width: 70%
   :alt: This screenshot shows a closeup of the Top Services by Latency section of the APM landing page, where the ``order-processor`` has a latency of 1.2 minutes.

.. _use-case-check-service-latency:

This might mean that one or more slow commands are causing the latency issues as you can see that number of commands per second drop or stall completely.
You also want to understand which commands are performing poorly. Click on the tile below.

.. _use-case-check-command-latency:

.. image:: /_images/apm/redis/high-latency.png
   :width: 70%
   :alt: This screenshot shows a closeup of the Top Services by Latency section of the APM landing page, where the ``order-processor`` has a latency of 1.2 minutes.

You want to learn which backend services have been impacted by this redis latency issue. Click on the tile below

You will navigate to our service map view to understand backend service dependencies on this redis cache. 

You are able to assess the bottleneck impact on the upstream services

.. _use-case-dig-into-spans:

.. image:: /_images/apm/redis/high-latency.png
   :width: 70%
   :alt: This screenshot shows a closeup of the Top Services by Latency section of the APM landing page, where the ``order-processor`` has a latency of 1.2 minutes.

You can jump to command insights. You notice here that you are seeing ‘MGET’ commands and their high latency values. 

Note: Usually commands operating on many elements, like SORT, LREM, SUNION can be slow

Learn more
============
See the following links for more information about Database Query Performance: 

* For an overview of Database Query Performance, see :ref:`redisormance`.
* To enable Database Query Performance, see :ref:`enable-db-perf`. 
* To learn more about Related Content, see :ref:`get-started-relatedcontent`.
* To troubleshoot issues with Database Query Performance, see :ref:`db-perf-troubleshooting`. 
* For reference material about Database Query Performance, see :ref:`db-perf-reference`.