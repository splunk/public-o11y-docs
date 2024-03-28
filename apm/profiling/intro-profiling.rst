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

After you get profiling data into Splunk Observability Cloud, you can explore stack traces directly from APM and visualize the performance of each component using the flame graph. By identifying bottlenecks and inefficiencies visually, AlwaysOn Profiling can help you understand the behavior of your application's code.

.. raw:: html

  <embed>
    <h2>What you can do with AlwaysOn Profiling<a name="what-can-you-do" class="headerlink" href="#what-can-you-do" title="What can you do with AlwaysOn Profiling">¶</a></h2>
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
    <h2>Memory profiling<a name="memory-profiling" class="headerlink" href="#memory-profiling" title="Memory profiling">¶</a></h2>
  </embed>

Memory profiling adds memory allocation data to stack traces and exposes memory metrics, so that you can discover leaks and unusual consumption patterns in your instrumented services and applications. See :ref:`memory-profiling-scenario`.

After you get profiling data into Splunk Observability Cloud, you can visualize the memory allocation behavior of each component using the flame graph. See :ref:`flamegraph-howto`.

Memory profiling also exposes memory metrics for your application, which you can use to build charts and dashboards. See :ref:`profiling-memory-metrics`.

.. raw:: html

  <embed>
    <h2>Supported languages<a name="supported-languages" class="headerlink" href="#supported-languages" title="Supported languages">¶</a></h2>
  </embed>

The following programming languages have instrumentation available: 

.. list-table::
   :header-rows: 1
   :widths: 20, 40, 40

   * - :strong:`Language`
     - :strong:`Available instrumentation`
     - :strong:`Documentation`
   * - Java
     - Splunk Distribution of OpenTelemetry Java version 1.14.2 or higher
       
       OpenJDK versions 15.0 to 17.0.8 are not supported for memory profiling. See :new-page:`https://bugs.openjdk.org/browse/JDK-8309862` in the JDK bug system for more information.
     - * :ref:`instrument-java-applications`
       * :ref:`profiling-configuration-java`
   * - Node.js
     - Splunk Distribution of OpenTelemetry JS version 2.0 or higher

     - * :ref:`instrument-nodejs-applications`
       * :ref:`profiling-configuration-nodejs`
   * - .NET (OpenTelemetry)
     - Splunk Distribution of OpenTelemetry .NET 1.3.0 or higher

       .NET versions 6.0 and higher are supported in AlwaysOn Profiling. .NET Framework is not supported. 
     - * :ref:`instrument-otel-dotnet-applications`
       * :ref:`profiling-configuration-otel-dotnet`
   * - .NET (SignalFx)
     - SignalFx Instrumentation for .NET version 1.0.0 or higher

       .NET versions 6.0 and higher are supported in AlwaysOn Profiling. .NET Framework is not supported. 
     - * :ref:`instrument-dotnet-applications`
       * :ref:`profiling-configuration-dotnet`
   * - Python (in beta)
     - Splunk Distribution of OpenTelemetry Python version 1.15 or higher

      Only CPU profiling is supported at the moment.
     - * :ref:`instrument-python-applications`
       * :ref:`profiling-configuration-python`


.. raw:: html

  <embed>
    <h2>Get AlwaysOn Profiling data into Splunk APM<a name="get-data-in" class="headerlink" href="#get-data-in" title="Get AlwaysOn Profiling data into Splunk APM">¶</a></h2>
  </embed>

To get started, instrument your application or service for Splunk APM and activate AlwaysOn Profiling.

See :ref:`get-data-in-profiling` for instructions.
