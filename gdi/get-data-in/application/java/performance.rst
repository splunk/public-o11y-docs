.. _java-otel-performance:

***************************************************
Performance reference for Splunk OTel Java agent
***************************************************

.. meta::
   :description:

Observability instrumentation might add performance overhead and change the behavior of the system you monitor. The more sophisticated and thorough instrumentation is, the more visible its impact can be.

The Splunk OTel Java agent instruments your application by running inside the same Java Virtual Machine (JVM). Like any other software, the agent requires system resources like CPU, memory, and network bandwidth. This use of resources by the agent is called overhead or agent overhead.

Many factors affect performance overhead, including JVM configuration, transaction volume, deployment architecture, and hardware. The Splunk OpenTelemetry Java agent has minimal impact on system performance when instrumenting Java Virtual Machine (JVM) applications.

The following sections describe the minimum requirements of the Splunk OTel Java agent, as well as potential constraints impacting performance, and guidelines to optimize and troubleshoot the performance of the agent.

Minimum requirements for production deployments the Java agent
=================================================================

.. include:: /_includes/gdi/java-requirements.rst

Guidelines to optimize performance of the Java agent
=================================================================

These are best practices.

<General guidelines as an include>

Suggestions for storage, hardware, data ingestion, and configuration to optimize performance. For example, settings that can be tweaked or disabled according to the situation, features that can be disabled, etc. TASK: e.g. turn off instrumentations, use samplers; we might already have some in our docs, ask Fabri (add links if there are any). 

INT:Describe best practices and recommendations. Start with high level “obvious” recommendations and move to specific Java instrumentation options 

Constraints impacting the performance of the Java agent
=================================================================

<General constraints as an include>

INT: Describe how particular instrumentation features impact Java instrumentation overhead 
Tracing - tracing methods that do very little can have considerable overhead as tracing can be more expensive than the method execution
Metrics - using high cardinality tags can cause high memory usage
Logging 

INT: Describe which features have significant impact (keep to supported features)
Profiling - parsing JFR recordings requires heap space, memory profiler uses jdk.ObjectAllocationInNewTLAB and jdk.ObjectAllocationOutsideTLAB events that can have significant overhead when produced in high volume, see https://bugs.openjdk.org/browse/JDK-8257602
RUM - adds Server-Timing and Access-Control-Expose-Headers to the response which does not have much overhead
Other 

INT: Describe how enabling additional instrumentations impacts the overhead. I.e more features- more overhead 

INT: Add warning about experimental features and unknown potential impact on performance 

Troubleshooting performance issues when deploying the Java agent
=================================================================

We welcome users of the Splunk Distribution of OpenTelemetry Java Instrumentation to repeat these experiments and to conduct comparable tests with their own services.

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
