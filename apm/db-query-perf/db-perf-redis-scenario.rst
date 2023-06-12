.. _redis-scenario:

Scenario: Skyler investigates Redis performance issues using Database Query Performance
*****************************************************************************************

.. meta::
   :description: This Splunk APM scenario describes how to troubleshoot latency reported by customers in a new advertisement service, which uses a Redis database.

Skyler, the lead site reliability engineer at Buttercup Games, has to troubleshoot high latencies reported by customers in the new advertisement service, which uses a Redis database.

#. :ref:`use-case-check-infrastructure-redis`
#. :ref:`use-case-check-service-latency`
#. :ref:`use-case-check-command-latency`
#. :ref:`use-case-dig-into-spans`

.. _use-case-check-infrastructure-redis:

Check the Redis infrastructure
==============================================

Skyler starts by checking the Redis infrastructure in Splunk Infrastructure Monitoring. They notice that the commands processing rate has drastically dropped, and that the total number of commands processed by the server diminished.

.. image:: /_images/apm/redis/infrastructure-redis.png
   :width: 90%
   :alt: Infrastructure view of a Redis service in Splunk Observability Cloud, with related content highlighted.

This might mean that one or more commands are causing the latency issues. To further investigate this, Skyler selects the Related Content tile at the bottom of the screen to jump to Splunk APM.

.. _use-case-check-service-latency:

Jump to the service in Splunk APM
==============================================

The service map of Splunk APM appears. Skyler immediately selects the Redis database and see at a glance which commands are the slowest. The latency and request and errors charts provide a view of the performance trend. 

.. image:: /_images/apm/redis/apm-service-map-redis.png
   :width: 90%
   :alt: View of a Redis service in the Splunk APM service map.

Skyler selects Database Query Performance to get to the root of the issue.

.. _use-case-check-command-latency:

Examine the latency of Redis commands
==============================================

After opening Database Query Performance from the service map, Skyler sees the list of Redis commands, sorted by total time. For each command, they can see the requests and latency, as well as tag spotlight data.

.. image:: /_images/apm/redis/explore-command-redis.gif
   :width: 90%
   :alt: Animation of Redis commands in Database Query Performance.

Skyler knows that commands operating on many elements, like SORT, LREM, and SUNION can be slow. They identify a command with a problematic latency, and selects the latency chart to load example traces.

.. image:: /_images/apm/redis/span-detail-redis.png
   :width: 90%
   :alt: Sample traces for a Redis command, as loaded from Database Query Performance.

Skyler selects the example trace to find out more about the latency of that particular span.

.. _use-case-dig-into-spans:

Dig into spans and related commands
==============================================

From the trace view, Skyler selects the Redis span and verifies which database statements compose the command. The performance summary points at the database spans being the main source of overhead.

.. image:: /_images/apm/redis/redis-commands-span.png
   :width: 90%
   :alt: Details of Redis command in a trace, with database statements highlighted.

With information from this and other traces, Skyler has enough information to optimize the Redis commands, which results in a noticeable performance improvement.

Learn more
============
See the following links for more information about Database Query Performance: 

* For an overview of Database Query Performance, see :ref:`db-query-performance`.
* To turn on Database Query Performance, see :ref:`turn-on-db-perf`. 
* To learn more about Related Content, see :ref:`get-started-relatedcontent`.
* To troubleshoot issues with Database Query Performance, see :ref:`db-perf-troubleshooting`. 
* For reference material about Database Query Performance, see :ref:`db-perf-reference`.