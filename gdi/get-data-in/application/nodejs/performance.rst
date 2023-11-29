.. _nodejs-otel-performance:

***************************************************
Performance reference for Splunk OTel Node.js agent
***************************************************

.. meta::
   :description: Minimum requirements of the Splunk OTel Node.js agent, as well as potential constraints impacting performance, and guidelines to optimize and troubleshoot the performance of the agent.

The Splunk OTel Node.js agent instruments your application at runtime. Like any other software agent, the Node.js agent requires system resources like CPU, memory, and network bandwidth. The use of resources by the agent is called agent overhead or performance overhead. The Splunk OTel Node.js agent has minimal impact on system performance when instrumenting Node.js applications, although the final agent overhead depends on multiple factors.

Some factors that might increase agent overhead are environmental, such as the physical machine architecture, CPU frequency, amount and speed of memory, system temperature, and resource contention. Other factors include virtualization and containerization, the operating system and its libraries, the Node.js version, Node.js configuration, the algorithmic design of the software being monitored, and software dependencies.

Due to the complexity of modern software and the broad diversity in deployment scenarios, it is impossible to come up with a single agent overhead estimate. To find the overhead of any instrumentation agent in a given deployment, you have to conduct experiments and collect measurements directly. Therefore, all statements about performance must be treated as general information and guidelines that are subject to evaluation in a specific system.

The following sections describe the minimum requirements of the Splunk OTel Node.js agent, as well as potential constraints impacting performance, and guidelines to optimize and troubleshoot the performance of the agent.

.. _nodejs-overhead-requirements:

Minimum requirements for production deployments
=================================================================

.. include:: /_includes/requirements/nodejs.rst


.. _nodejs-overhead-guidelines:

Guidelines to reduce agent overhead
=================================================================

The following best practices and techniques might help in reducing overhead caused by the Node.js agent.

Configure trace sampling
-----------------------------------------------------------------

The volume of spans processed by the instrumentation might impact agent overhead. You can configure trace sampling to adjust the span volume and reduce resource usage. See :ref:`trace-sampling-settings-nodejs` for more information on sampling settings.

The following example shows how to configure trace sampling in the code to drop spans named ``unwanted``:

.. code-block:: javascript

   const { start } = require("@splunk/otel");
   const { SamplingDecision } = require("@opentelemetry/sdk-trace-base");

   start({
   tracing: {
      tracerConfig: {
         sampler: {
           shouldSample: (context, traceId, spanName, spanKind, attributes, links) => {
              if (spanName ===  "unwanted") {
                 return { decision: SamplingDecision.NOT_RECORD };
              }

              return { decision: SamplingDecision.RECORD };
           },
           toString: () => return "CustomSampler",
         }
      },
   },
   });


.. _turn-on-nodejs-instrumentations:

Turn on only the instrumentation you need
-----------------------------------------------------------------

Consider turning on only the instrumentations that you need to further reduce agent overhead and span volume. To turn off all default instrumentations, set ``OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`` to ``false`` and activate specific instrumentations using the ``OTEL_INSTRUMENTATION_<NAME>_ENABLED`` environment variable, where ``<NAME>`` is the name of the instrumentation.

For example, the following option turns on the Bunyan instrumentation while keeping all other instrumentations deactivated:

.. code-block:: shell

   export OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED=false
   export OTEL_INSTRUMENTATION_BUNYAN_ENABLED=true

The previous settings only apply to instrumentations loaded by the Splunk Distribution of OpenTelemetry JS by default. When using the programmatic API to supply a list of user-specified instrumentations, they have no effect. For a complete list of available instrumentations, see :ref:`Requirements <nodes-requirements>`.

.. note:: Use Trace Analyzer in Splunk APM to explore the spans from your application and identify instrumentations you don't need. See :ref:`trace-search-concept` for more information.

Reduce manual instrumentation to a minimum
----------------------------------------------------------------

Manual instrumentation might introduce inefficiencies that increase agent overhead. For example, creating spans in a tight loop might end up producing millions of spans, severely taxing the host.

Provision adequate resources
----------------------------------------------------------------

Make sure to provision enough resources for your instrumentation and for the Collector. The amount of resources such as memory or disk depend on your application architecture and needs. For example, a common setup is to run the instrumented application on the same host as the Splunk Distribution of OpenTelemetry Collector. In that case, consider rightsizing the resources for the Collector and optimize its settings. See :ref:`otel-sizing`.


.. _nodejs-overhead-constraints:

Constraints impacting the performance of the Node.js agent
=================================================================

In general, the more telemetry you collect from your application, the bigger is the impact on agent overhead. For example, tracing methods that aren't relevant to your application can still produce considerable agent overhead because tracing such methods is computationally more expensive than running the method itself. Similarly, high cardinality tags in metrics might increase memory usage. Debug logging also increases write operations to disk and memory usage.

Some instrumentations, for example JDBC or Redis, produce high span volumes that increase agent overhead. For more information on how to turn off unnecessary instrumentations, see :ref:`turn-on-nodejs-instrumentations`.

.. note:: Experimental features of the Node.js agent might increase agent overhead due to the experimental focus on functionality over performance. Stable features are safer in terms of agent overhead.


.. _nodejs-overhead-troubleshooting:

Troubleshooting agent overhead issues
====================================================================

When troubleshooting agent overhead issues, do the following:

- Check minimum requirements. See :ref:`nodejs-overhead-requirements`.
- Use the latest compatible version of the Node.js agent.
- Use the latest compatible version of Node.js.

Consider taking the following actions to decrease agent overhead:

- If your application is approaching memory limits, consider giving it more memory.
- If your application is using all the CPU, you might want to scale it horizontally.
- Try turning off or tuning CPU or memory profiling. See :ref:`profiling-configuration-nodejs`.
- Try turning off or tuning metrics. See :ref:`metrics-configuration-nodejs`.
- Tune trace sampling settings to reduce span volume. See :ref:`trace-sampling-settings-nodejs`.
- Turn off specific instrumentations. See :ref:`turn-on-nodejs-instrumentations`.
- Review manual instrumentation for unnecessary span generation.
- Turn on runtime metrics to check event loop lag. See :ref:`enable_automatic_metric_collection_nodejs`.


.. _nodejs-overhead-measure-diy:

Guidelines for measuring agent overhead
=================================================================

Measuring agent overhead in your own environment and deployments provides accurate data about the impact of instrumentation on the performance of your application or service. The following guidelines describe the general steps for collecting and comparing reliable agent overhead measurements.

Decide what you want to measure
-----------------------------------------------------------------

Different users of your application or service might notice different aspects of agent overhead. For example, while end users might notice degradation in service latency, power users with heavy workloads pay more attention to CPU overhead. On the other hand, users who deploy frequently, for example due to elastic workloads, care more about startup time.

Reduce your measurements to factors that are sure to impact the user experience of your application, so as not to produce datasets that contain irrelevant information. Some examples of measurements include the following:

- User average, user peak, and machine average CPU usage
- Total memory allocated and maximum heap used
- Garbage collection pause time
- Startup time in milliseconds
- Average and percentile 95 (p95) service latency
- Network read and write average throughput

Prepare a suitable test environment
-----------------------------------------------------------------

By measuring agent overhead in a controlled test environment you can better control and identify the factors affecting performance. When preparing a test environment, complete the following:

1. Make sure that the configuration of the test environment resembles production.
2. Isolate the application under test from other services that might interfere.
3. Turn off or remove all unnecessary system services on the application host.
4. Ensure that the application has enough system resources to handle the test workload.

Create a battery of realistic tests
-----------------------------------------------------------------

Design the tests that you run against the test environment to resemble typical workloads as much as possible. For example, if some REST API endpoints of your service are susceptible to high request volumes, create a test that simulates heavy network traffic.

For Node.js applications, use a warm-up phase prior to starting measurements. Node.js performs a large number of optimizations through just-in-time compilation (JIT). The warm-up phase helps the application to finish most of its class loading and gives the JIT compiler time to run the majority of optimizations.

Make sure to run a large number of requests and to repeat the test pass many times. This repetition helps to ensure a representative data sample. Include error scenarios in your test data. Simulate an error rate similar to that of a normal workload, typically between 2% to 10%.

Collect comparable measurements
-----------------------------------------------------------------

To identify which factors might be affecting performance and causing agent overhead, collect measurements in the same environment after modifying a single factor or condition.

For example, you can take 3 different sets of measurements where the only difference is the presence and settings of the instrumentation:

- Condition A: No instrumentation or baseline
- Condition B: Instrumentation without AlwaysOn Profiling
- Condition C: Instrumentation with AlwaysOn Profiling

Analyze the agent overhead data
------------------------------------------------------------------

After collecting data from multiple passes, you can compare averages using simple statistical tests to check for significant differences, or plot results in a chart.

Consider that different stacks, applications, and environments might result in different operational characteristics and different agent overhead measurement results.

You can also compare your results with the official OpenTelemetry JS benchmarks at :new-page:`https://opentelemetry.io/docs/instrumentation/js/benchmarks/ <https://opentelemetry.io/docs/instrumentation/js/benchmarks/>`.


How to get support
=================================================================

.. include:: /_includes/troubleshooting-components.rst
