.. _profiling-intro:

***************************************************
Introduction to AlwaysOn Profiling for Splunk APM
***************************************************

.. meta:: 
   :description: AlwaysOn Profiling continuously collects stack traces so that you can discover which lines in your code are slowing down or crashing your systems as a way to reduce mean time to resolution (MTTR). As part of Splunk APM, AlwaysOn Profiling provides context to spans produced by instrumented applications.

.. toctree::
   :hidden:

   profiling-scenario-library
   get-data-in-profiling
   using-the-flamegraph
   profiling-memory-metrics
   concepts-terms-profiling
   profiling-troubleshooting
   profiling-third-party-credits

AlwaysOn Profiling continuously collects stack traces so that you can discover which lines in your code are slowing down or crashing your systems as a way to reduce mean time to resolution (MTTR). As part of Splunk APM, AlwaysOn Profiling provides context to spans produced by instrumented applications.

After you get profiling data into Observability Cloud, you can explore stack traces directly from APM and visualize the performance of each component using the flame graph. By identifying bottlenecks and inefficiencies visually, AlwaysOn Profiling can help you understand the behavior of your application's code.

.. raw:: html

  <embed>
    <h2>What you can do with AlwaysOn Profiling</h2>
  </embed>

Here are some of the things you can do with AlwaysOn Profiling for Splunk APM:

- Perform continuous profiling of your applications. The profiler is always on once you activate it.
- Collect code performance context and link it to trace data.
- Explore memory usage and garbage collection of your application.
- Analyze code bottlenecks that impact service performance.
- Identify inefficiencies that increase the need for scaling up cloud resources.

Here are some of the typical issues that AlwaysOn Profiling can identify:

- Slow or inefficient database queries
- Thread locks
- Memory leaks
- Unusual memory consumption
- Thread pool starvation
- File system bottlenecks
- Slow calls to external services

For sample scenarios, see :ref:`profiling-scenario-landingpage`.

.. raw:: html

  <embed>
    <h2>Memory profiling</h2>
  </embed>

Memory profiling adds memory allocation data to stack traces and exposes memory metrics, so that you can discover leaks and unusual consumption patterns in your instrumented services and applications. See :ref:`memory-profiling-scenario`.

After you get profiling data into Observability Cloud, you can visualize the memory allocation behavior of each component using the flame graph. See :ref:`flamegraph-howto`.

Memory profiling also exposes memory metrics for your application, which you can use to build charts and dashboards. See :ref:`profiling-memory-metrics`.

.. raw:: html

  <embed>
    <h2>Get AlwaysOn Profiling data into Splunk APM</h2>
  </embed>

To get started, instrument your application or service for Splunk APM and activate AlwaysOn Profiling.

See :ref:`get-data-in-profiling` for instructions.
