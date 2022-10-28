.. _redis-use-case:

**************************************************************************
Use case: Identify slow database queries using Database Query Performance
**************************************************************************

.. meta::
   :description: Follow a site reliability engineer (SRE)'s workflow using Database Query Performance to examine the relationship between service latency and the performance of database queries in their system.

Jax, a site reliability engineer, is in charge of identifying the root cause of service latency issues in their system. In this section, follow their workflow using Database Query Performance to examine the relationship between service latency and the performance of database queries in their system.

- :ref:``
- :ref:``
- :ref:``
- :ref:``

Flow one
==========

As an SRE/ application developer you notice high latency issue for one of your backend services. 

You look at the top latencies chart on APM landing page and notice that ‘ad service’ has high latency 

To explore ‘high latency’ of adservice, go to the service map view to review dependencies. 

You notice that the latency issue is from downstream ‘redis cache’

Click on ‘redis cache’ for deeper insights
Review redis RED metrics over the time period to look for latency spikes & patterns
Look at the ‘command performance’ of Redis to notice if any of the commands are poorly performing
If everything looks good on client metrics, you can deep dive into the server side metrics by clicking on the related content tile at the bottom

Since MGET command has high latency, compare how MGET command performs compared to rest of the database. 


Identify radius of impact from tag spotlight preview here

If there are no surprises in command analysis, check how underlying redis instance is performing or whether it has been adequately resourced.

Click on latency chart for an example trace. You can deep dive into the transactions. As you can see, redis span has a high latency here. 

You can look into the span to take a look at the db. statement. When you review the db. statement, you will notice that MGET command and its keys to go ahead and improve the command & specific keys.

As investigate if underlying infrastructure resources are sufficiently provisioned for, you notice that the following metrics are very spiky - 
CPU Utilization is high and that has been causing performance degradation
Cache hit rate has been low and can be caused by a number of factors, including data expiration and insufficient memory allocated to Redis (which could cause key eviction). Low hit rates increase latency of applications as they have to fetch data from a slower, alternative resource.

You immediately go ahead and ramp up resources 

Flow 2
=========

As an SRE you notice high latency issue for a specific redis instance. 

You review performance metrics for that instance and notice that your commands processing rate has drastically dropped
Total number of commands processed by the server has been low

This might mean that one or more slow commands are causing the latency issues as you can see that number of commands per second drop or stall completely.
You also want to understand which commands are performing poorly. Click on the tile below.

You want to learn which backend services have been impacted by this redis latency issue. Click on the tile below

You will navigate to our service map view to understand backend service dependencies on this redis cache. 

You are able to assess the bottleneck impact on the upstream services

You can jump to command insights. You notice here that you are seeing ‘MGET’ commands and their high latency values. 

Note: Usually commands operating on many elements, like SORT, LREM, SUNION can be slow

Learn more
============
See the following links for more information about Database Query Performance: 

* For an overview of Database Query Performance, see :ref:`db-query-performance`.
* To enable Database Query Performance, see :ref:`enable-db-perf`. 
* To learn more about Related Content, see :ref:`get-started-relatedcontent`.
* To troubleshoot issues with Database Query Performance, see :ref:`db-perf-troubleshooting`. 
* For reference material about Database Query Performance, see :ref:`db-perf-reference`.