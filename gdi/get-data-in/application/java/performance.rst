.. _java-otel-performance:

***************************************************
Performance reference for Splunk OTel Java agent
***************************************************

.. meta::
   :description: Minimum requirements of the Splunk OTel Java agent, as well as potential constraints impacting performance, and guidelines to optimize and troubleshoot the performance of the agent.

The Splunk OTel Java agent instruments your application by running inside the same Java Virtual Machine (JVM). Like any other software agent, the Java agent requires system resources like CPU, memory, and network bandwidth. The use of resources by the agent is called performance or agent overhead. The Splunk OTel Java agent has minimal impact on system performance when instrumenting JVM applications, although the final overhead depends on multiple factors.

Some factors that might increase agent overhead are environmental, such as the physical machine architecture, CPU frequency, amount and speed of memory, system temperature, and resource contention. Other factors include virtualization and containerization, the operating system and its libraries, the JVM version and vendor, JVM settings, the algorithmic design of the software being monitored, and sofware dependencies.

Due to the complexity of modern software and the broad diversity in deployment scenarios, it is impossible to come up with a single overhead estimate. To find out the overhead of any instrumentation agent in a given deployment, you have to conduct experiments and collect measurements directly. Therefore, all statements about performance in this document must be treated as general information and guidelines which are subject to evaluation in a specific system.

The following sections describe the minimum requirements of the Splunk OTel Java agent, as well as potential constraints impacting performance, and guidelines to optimize and troubleshoot the performance of the agent. 


Minimum requirements for production deployments the Java agent
=================================================================

.. include:: /_includes/gdi/java-requirements.rst

Guidelines to reduce Java agent overhead
=================================================================

The following best practices and techniques might help in reducing the overhead caused by the Java agent

Configure trace sampling
-----------------------------------------------------------------

The volume of spans processed by the instrumentation might impact overhead. You can configure trace sampling to adjust the span volume and thus reduce resource usage. See :ref:`trace-sampling-settings-java` for more information on sampling settings.

Turn off specific instrumentations
-----------------------------------------------------------------

Consider turning off instrumentations that you don't need or are producing too many spans to further reduce overhead and span volume. To turn off an instrumentation, use ``-Dotel.instrumentation.<name>.enabled=false`` or the ``OTEL_INSTRUMENTATION_<NAME>_ENABLED`` environment variable, where ``<name>`` is the name of the instrumentation.

For example, the following option turns off the JDBC instrumentation: ``-Dotel.instrumentation.jdbc.enabled=false``

Allocate more memory for the application
----------------------------------------------------------------

Incresing the maximum heap size of the JVM using the ``--Xmx<size>`` option might help in alleviating overhead issues, as instrumentations can generate a large number of short-lived objects in memory.

Use manual instrumentation sparingly


Use manual instrumentation carefully/sparingly – you probably don’t need a @WithSpan on every method
@WithSpan(debug = true) ? for debug-only spans? Could be a nice idea; perhaps some debug condition instead
Open APM and check if your traces contain spans from instrumentation libraries that you don’t really care about; you could disable these instrumentations to reduce the overhead a tiny bit. (Trace analyzer?)


Constraints impacting the performance of the Java agent
=================================================================

INT: Describe how particular instrumentation features impact Java instrumentation overhead 
Tracing - tracing methods that do very little can have considerable overhead as tracing can be more expensive than the method execution
Metrics - using high cardinality tags can cause high memory usage
Logging  – might be expensive if you log a lot (even TRACE-level logs)

INT: Describe which features have significant impact (keep to supported features)
Profiling - parsing JFR recordings requires heap space, memory profiler uses jdk.ObjectAllocationInNewTLAB and jdk.ObjectAllocationOutsideTLAB events that can have significant overhead when produced in high volume, see https://bugs.openjdk.org/browse/JDK-8257602
RUM - adds Server-Timing and Access-Control-Expose-Headers to the response which does not have much overhead
Other 

INT: Describe how enabling additional instrumentations impacts the overhead. I.e more features- more overhead 
Noisy instrumentations, e.g. JDBC and other database clients (Redis)


INT: Add warning about experimental features and unknown potential impact on performance 


Troubleshooting performance issues when deploying the Java agent
=================================================================

We welcome users of the Splunk Distribution of OpenTelemetry Java Instrumentation to repeat these experiments and to conduct comparable tests with their own services.

We welcome users of the Splunk Distribution of OpenTelemetry Java Instrumentation to repeat these experiments and to conduct comparable tests with their own services.
Some extra things that we thought of:
See if you’re CPU bound or memory bound
If your application is approaching memory limits, consider giving it more memory
If your application is using all the CPU, you might want to scale it horizontally
If these two things don’t really help you, try removing some of the features of the javaagent:
Try disabling metrics (link/reference the config property)
Try disabling memory profiling (link/reference the config property)
Try disabling profiling altogether (link/reference the config property)
Try enabling a sampler that will sample out some/most of the spans (link/reference the config property)
Try disabling the instrumentations that produce the most telemetry (in our experience, the database client instrumentations like JDBC or Redis) (link/reference the config property)


Step 1. Prepare test environment

Where this should be tested - in customer system 
What services to select - representative service from your environment
What should the environment look like - close to production environment
Something similar to: https://docs.splunk.com/Observability/gdi/get-data-in/application/java/performance.html#software-configuration 
Given the complexity in conducting such experiments in cloud-based environments, we offer up the following guidance:
To the extent that it is possible, isolate the application under test from other services. This helps to reduce interference and keeps the test results more consistent and easier to reason about.
Turn off or remove all unnecessary system services on the application host.
Use a warm-up phase prior to starting measurements. The JVM is a highly dynamic machine that performs a large number of optimizations via just-in-time compilation (JIT). The warm-up phase helps the application to finish most of its class loading and gives the JIT compiler time to perform the majority of optimizations. During the warm-up phase, the test runner should provide a standard/typical workload to the application.
During the tests, ensure that the application is not resource constrained. It should have enough memory, CPU, and network available to handle the test workload.
Be sure to run a large number of requests and to repeat the test pass many times. This helps to ensure a representative data sample.
Include error scenarios in your test data. The error rate should be similar to a normal workload, typically in a rate of 2% to 10%.
Keep in mind that your results are likely to differ. Every stack, every application, and every environment will have different operational characteristics and thus different overhead measurement results.

What to measure 
Different users may care about different aspects of overhead. Most users are primarily concerned with service latency, but others with computationally intense workloads may care more about CPU overhead. Many users are concerned with memory consumption and its impact on garbage collection characteristics (which can impact CPU and increase latency). Some users deploy frequently (often due to elastic/spiky workloads) and they care about startup time.
We distill these down into these categories of measurement:
Startup time
CPU
average (user)
peak (user)
average (machine)
GC pause time
Memory
max heap used
total allocated
Service latency
single REST call (avg, p95)
test script (avg, p95)
throughput (requests per second)
Network
read throughput (avg)
write throughput (avg)
These metrics are captured and aggregated across all test executions, and the results are compared between run configurations.
What load should be generated 
Run your typical performance test load for the service 

Step 2. Measure baseline - no instrumentation
Step 3. Measure instrumentation baseline (default features) 
Step 4. Measure target instrumentation config 
Step 5. Automate and repeat 

How to get support
=================================================================

.. include:: /_includes/troubleshooting-components.rst
