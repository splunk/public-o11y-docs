.. _java-otel-performance:

***************************************************
Performance overhead of the Splunk OTel Java agent
***************************************************

.. meta::
   :description: The Splunk OpenTelemetry Java agent has minimal impact on system performance. This page contains the latest performance overhead measurements, as well as a description of the testing conditions, and instructions for repeating the tests in your own environment.

The Splunk OpenTelemetry Java agent has minimal impact on system performance when instrumenting Java Virtual Machine (JVM) applications. This page contains the latest performance overhead measurements, a description of the testing conditions, and instructions for repeating the tests in your own environment.

.. caution:: Many factors affect performance results, including JVM configuration, transaction volume, deployment architecture, and hardware. These results represent reference information and do not represent performance in all environments. See :ref:`perf-overhead-java-setup` for more information.

.. _java-perf-overhead-data:

Overhead of the Java agent
===================================================

The following tables compare the overhead for several system metrics across different usage scenarios. The latest version, 1.18.0, is also compared against the previous test version, 1.9.0.

.. tabs::

   .. tab:: CPU

      The following table shows the average CPU load for the user running the test application: 

      .. list-table:: 
         :header-rows: 1
         :widths: 60 40
         :width: 100%

         * - Condition
           - Value
         * - No instrumentation
           - 29%
         * - Splunk OpenTelemetry Java agent 1.18.0
           - 26%
         * - Splunk OpenTelemetry Java agent 1.18.0 (AlwaysOn Profiling enabled)
           - 29%
         * - Splunk OpenTelemetry Java agent version 1.9.0
           - 26%
         * - Splunk OpenTelemetry Java agent version 1.9.0 (AlwaysOn Profiling enabled)
           - 29%

      * Tested on December 9, 2022 using Splunk Java OTel agent version 1.18.0. For a description of the test environment, see :ref:`perf-overhead-java-setup`.

   .. tab:: Network

      The following table shows the network write average: 

      .. list-table:: 
         :header-rows: 1
         :widths: 60 40
         :width: 100%

         * - Condition
           - Value
         * - No instrumentation
           - 10.72 Mbps
         * - Splunk OpenTelemetry Java agent 1.18.0
           - 29.12 Mbps
         * - Splunk OpenTelemetry Java agent 1.18.0 (AlwaysOn Profiling enabled)
           - 28.80 Mbps
         * - Splunk OpenTelemetry Java agent version 1.9.0
           - 28.94 Mbps
         * - Splunk OpenTelemetry Java agent version 1.9.0 (AlwaysOn Profiling enabled)
           - 28.77 Mbps

      * Tested on December 9, 2022 using Splunk Java OTel agent version 1.18.0. For a description of the test environment, see :ref:`perf-overhead-java-setup`.

   .. tab:: Request latency

      The following table shows the average latency for single requests:

      .. list-table:: 
         :header-rows: 1
         :widths: 60 40
         :width: 100%
         
         * - Condition
           - Value
         * - No instrumentation
           - 5.27 milliseconds
         * - Splunk OpenTelemetry Java agent 1.18.0
           - 16.85 milliseconds
         * - Splunk OpenTelemetry Java agent 1.18.0 (AlwaysOn Profiling enabled)
           - 18.70 milliseconds
         * - Splunk OpenTelemetry Java agent version 1.9.0
           - 15.82 milliseconds
         * - Splunk OpenTelemetry Java agent version 1.9.0 (AlwaysOn Profiling enabled)
           - 17.38 milliseconds

      * Tested on December 9, 2022 using Splunk Java OTel agent version 1.18.0. For a description of the test environment, see :ref:`perf-overhead-java-setup`.

   .. tab:: Throughput

      The following table shows application throughput, expressed as requests per second: 

      .. list-table:: 
         :header-rows: 1
         :widths: 60 40
         :width: 100%

         * - Condition
           - Value
         * - No instrumentation
           - 882.92 requests per second
         * - Splunk OpenTelemetry Java agent 1.18.0
           - 631.74 requests per second
         * - Splunk OpenTelemetry Java agent 1.18.0 (AlwaysOn Profiling enabled)
           - 588.97 requests per second
         * - Splunk OpenTelemetry Java agent version 1.9.0
           - 652.22 requests per second
         * - Splunk OpenTelemetry Java agent version 1.9.0 (AlwaysOn Profiling enabled)
           - 620.93 requests per second

      * Tested on December 9, 2022 using Splunk Java OTel agent version 1.18.0. For a description of the test environment, see :ref:`perf-overhead-java-setup`.

   .. tab:: Startup time

      The following table shows application startup time: 

      .. list-table:: 
         :header-rows: 1
         :widths: 60 40
         :width: 100%
         
         * - Condition
           - Value
         * - No instrumentation
           - 11.75 seconds
         * - Splunk OpenTelemetry Java agent 1.18.0
           - 19.65 seconds
         * - Splunk OpenTelemetry Java agent 1.18.0 (AlwaysOn Profiling enabled)
           - 20.86 seconds
         * - Splunk OpenTelemetry Java agent version 1.9.0
           - 19.56 seconds
         * - Splunk OpenTelemetry Java agent version 1.9.0 (AlwaysOn Profiling enabled)
           - 21.43 seconds

      * Tested on December 9, 2022 using Splunk Java OTel agent version 1.18.0. For a description of the test environment, see :ref:`perf-overhead-java-setup`.

.. _perf-overhead-java-setup:

Configuration of the test environment
================================================

The environment for measuring the performance overhead of the Java agent has the following features:

Software configuration
-----------------------------------------------

The instrumented service is ``petclinic-rest`` from the Spring PetClinic sample application. The microservice is deployed together with the k6 test runner in the same Amazon EC2 instance, named ``testbox``. To minimize the impact of external components, the Splunk Distribution of OpenTelemetry Collector and the database run in a separate instance, named ``externals``. The following image shows the architecture of the test environment:

..  image:: /_images/performance/java/test-env.png
   :alt: Diagram of the test environment

The ``petclinic-rest`` microservice runs on OpenJDK version 11.0.11, with no additional arguments except ``-javaagent``, with no heap limits specified. AlwaysOn Profiling uses the JDK Flight Recorder subsystem. System updates, AWS daemons, and unnecessary system processes are disabled or removed to reduce errors. The G1 Garbage Collector is the default for java 11 and is used across all tests.

Hardware configuration
-----------------------------------------------

All tests run on Amazon EC2 instances with the following specifications:

- ``testbox``: m4.xlarge instance
   - 4 vCPU
   - 16 GiB of memory
   - Debian 9 x64 with kernel version 4.9
   - Latest version of ``docker-ce``
- ``externals``: m4.large instance
   - 2 vCPU
   - 8 GiB of memory
   - Debian 9 x64 with kernel version 4.9
   - Latest version of ``docker-ce``

Test scenarios
-----------------------------------------------

The following configurations are tested for each metric:

- No instrumentation agent
- Splunk OpenTelemetry Java agent
- Splunk OpenTelemetry Java agent with AlwaysOn Profiling enabled

Each agent configuration runs 10 times using a fresh JVM. After each test run, the PostgreSQL database of the sample application restarts to eliminate interferences between test runs. The same OTel Collector instance is used across all test runs and configured only for logging export.

The instrumented application warms up for 60 seconds, with some light test traffic prior to beginning measurements. The warm-up phase allows the JVM to cache class instances, perform just-in-time compilation (JIT), and prepare caches, buffers, database connections, and so on. The JDK Flight Recorder (JFR) subsystem collects telemetry during the test run. The JFR contributes less than 2% of the total overhead.

The following sequence runs 10 times for each configuration:

#. Start PostgreSQL.
#. Start Spring PetClinic.
#. Record application start time.
#. Conduct warm-up phase:
   
   #. Start warm-up JFR recording.
   #. Run k6 with 5 users for 60 seconds to generate traffic.
   #. Stop JFR.

#. Record test start time.
#. Start JFR recording.
#. Run k6 script with the following features: 8,500 passes, 30 concurrent users, 900 requests per second.

Measurements come from k6 and from JFR data, and are aggregated across all 10 runs. The test script writes the results to a CSV file and the summary of the final run in a text file.

Measure the performance overhead for your application
===========================================================

To run measurements in your own environment using the same methodology of the test scenarios described in this document, follow the instructions in the :new-page:`splunk-otel-java-overhead-test <https://github.com/signalfx/splunk-otel-java-overhead-test#performing-your-own-tests>` repository in GitHub.

Troubleshooting performance issues
===========================================================

If you run into unusual performance overhead issues when instrumenting services using the Splunk OpenTelemetry Java agent, collect the following information:

- Description of the performance impact or degradation (for example, increase in network latency), and which load your environment is experiencing.
- Description of your environment, including hardware specifications, version of the agent, runtime environment, and so on.

After you've collected the information, you can do the following:

- Ask questions and get answers through community support at Splunk Answers.
- If you have a support contract, file a case using the Splunk Support Portal. See Support and Services.
- To get professional help with optimizing your Splunk software investment, see Splunk Services.