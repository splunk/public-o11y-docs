.. _get-data-in-profiling:

Get data into Splunk APM AlwaysOn Profiling
******************************************************

.. meta:: 
   :description: Follow these instructions to get data into Splunk APM AlwaysOn Profiling.

Follow these instructions to get profiling into Splunk APM AlwaysOn Profiling.

.. _profiling-requirements:

Prerequisites
=============================================================

To get data into Splunk APM AlwaysOn Profiling, you need the following:

- Splunk APM activated for your Splunk Observability Cloud organization.
- Splunk Distribution of OpenTelemetry Collector version 0.44.0 or higher running on the host. See :ref:`otel-intro`. If the version of your Splunk OTel Collector is lower than 0.44.0, see :ref:`profiling-pipeline-setup`.

AlwaysOn Profiling is activated for all host-based subscriptions. For subscriptions based on traces analyzed per minute (TAPM), check with your Splunk support representative.

.. note:: You don't need Log Observer to get data into Splunk APM AlwaysOn Profiling. See :ref:`exclude-log-data` for more information.

.. _profiling-setup-helm:

Helm chart deployments
---------------------------------------------------------------

If you're deploying the Splunk Distribution of OpenTelemetry Collector using Helm, pass the following value when installing the chart:

.. code-block:: bash

   --set splunkObservability.profilingEnabled='true' 

You can also edit the parameter in the values.yaml file itself. For example:

.. code-block:: yaml

   # This option enables only the shared pipeline for logs and profiling data.
   # There is no active collection of profiling data.
   # Instrumentation libraries must be configured to send it to the collector.
   # If you don't use AlwaysOn Profiling for Splunk APM, you can disable it.
   profilingEnabled: false

If you don't have a Log Observer entitlement and are using a version of the OTel Collector lower than 0.78.0, make sure to turn off logs collection:

.. code-block:: yaml

   logsEnabled: false

.. note:: Setting ``profileEnabled`` to ``true`` creates the logs pipeline required by AlwaysOn Profiling, but doesn't install the APM instrumentation. To install the instrumentation, see :ref:`profiling-setup`.

.. _profiling-setup:

Get profiling data in
==========================================================

Follow these instructions to get profiling data into Splunk APM using AlwaysOn Profiling:

1. :ref:`profiling-setup-step-instrument`.
2. :ref:`profiling-setup-enable-profiler`.
3. :ref:`profiling-check-data-coming-in`.

.. _profiling-setup-step-instrument:

Instrument your application or service
---------------------------------------------------------------

AlwaysOn Profiling requires APM tracing data to correlate stack traces to your application requests. To instrument your application for Splunk APM, follow the steps for the appropriate programming language: 

.. list-table::
   :header-rows: 1
   :widths: 20, 40, 40

   * - :strong:`Language`
     - :strong:`Available instrumentation`
     - :strong:`Documentation`
   * - Java
     - Splunk Distribution of OpenTelemetry Java version 1.14.2 or higher
     - * :ref:`instrument-java-applications`
       * :ref:`profiling-configuration-java`
   * - Node.js
     - Splunk Distribution of OpenTelemetry JS version 2.0 or higher
     - :ref:`instrument-nodejs-applications`
   * - .NET
     - SignalFx Instrumentation for .NET version 1.0.0 or higher
     - :ref:`instrument-dotnet-applications`

.. note:: See :ref:`apm-data-retention` for information on profiling data retention.

.. _profiling-setup-enable-profiler:

Activate AlwaysOn Profiling
---------------------------------------------------------------

After you've instrumented your service for Splunk Observability Cloud and checked that APM data is getting into Splunk APM, activate AlwaysOn Profiling.

To activate AlwaysOn Profiling, follow the steps for the appropriate programming language:

.. tabs::

   .. group-tab:: Java

      :strong:`Activate CPU and memory profiling`

      - To use CPU profiling, activate the ``splunk.profiler.enabled`` system property, or set the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``.
      - Activate memory profiling by setting the ``splunk.profiler.memory.enabled`` system property or the ``SPLUNK_PROFILER_MEMORY_ENABLED`` environment variable to ``true``. To activate memory profiling, the ``splunk.profiler.enabled`` property must be set to ``true``.

      :strong:`Configure profiling`

      - Check that the OTLP endpoint that exports profiling data is set correctly:
         - The profiling-specific endpoint is configured through the ``splunk.profiler.logs-endpoint`` system property or the ``SPLUNK_PROFILER_LOGS_ENDPOINT`` environment variable.
         - If that endpoint is not set, then the generic OTLP endpoint is used, configured through the ``otel.exporter.otlp.endpoint`` system property or the ``OTEL_EXPORTER_OTLP_ENDPOINT`` environment variable.
         - If that endpoint is not set either, it defaults to \http://localhost:4317.
         -  For non-Kubernetes deployments, the OTLP endpoint has to point to \http://${COLLECTOR_IP}:4317. If the collector and the profiled application run on the same host, then use \http://localhost:4317. Otherwise, make sure there are no firewall rules blocking access to port 4317 from the profiled host to the collector host.
         -  For Kubernetes deployments, the OTLP endpoint has to point to \http://$(K8S_NODE_IP):4317 where the ``K8S_NODE_IP`` is fetched from the Kubernetes downstream API by setting the environment configuration on the Kubernetes pod running the application. For example:
        
            .. code-block:: yaml

               env:  
               - name: K8S_NODE_IP
                 valueFrom:
                   fieldRef:
                     apiVersion: v1
                     fieldPath: status.hostIP
      - Port 9943 is the default port for the SignalFx receiver in the collector distribution. If you change this port in your collector configuration, you need to pass the custom port to the JVM.
      
      The following example shows how to activate the profiler using the system property:

      .. code-block:: bash
         :emphasize-lines: 2,3,4,5

         java -javaagent:./splunk-otel-javaagent.jar \
         -Dsplunk.profiler.enabled=true \
         -Dsplunk.profiler.memory.enabled=true \
         -Dotel.exporter.otlp.endpoint=http(s)://collector:4317 \
         -Dsplunk.metrics.endpoint=http(s)://collector:9943
         -jar <your_application>.jar

      For more configuration options, including setting a separate endpoint for profiling data, see :ref:`profiling-configuration-java`.

      .. note:: AlwaysOn Profiling is not supported on Oracle JDK 8 and IBM J9.
   
   .. group-tab:: Node.js

      :strong:`Requirements`

      AlwaysOn Profiling requires Node.js 16 and higher.

      :strong:`Instrumentation`

      - Activate the profiler by setting the ``SPLUNK_PROFILER_ENABLED`` environment variable to ``true``.
      - Activate memory profiling by setting the ``SPLUNK_PROFILER_MEMORY_ENABLED`` environment variable to ``true``.
      - Check the OTLP the endpoint in the ``splunk.profiler.logs-endpoint`` system property or the ``SPLUNK_PROFILER_LOGS_ENDPOINT`` environment variable:
         -  For non-Kubernetes deployments, the OTLP endpoint has to point to \http://${COLLECTOR_IP}:4317. If the collector and the profiled application run on the same host, then use \http://localhost:4317. Otherwise, make sure there are no firewall rules blocking access to port 4317 from the profiled host to the collector host.
         -  For Kubernetes deployments, the OTLP endpoint has to point to \http://$(K8S_NODE_IP):4317 where the ``K8S_NODE_IP`` is fetched from the Kubernetes downstream API by setting the environment configuration on the Kubernetes pod running the application. For example:
        
            .. code-block:: yaml

               env:  
               - name: K8S_NODE_IP
                 valueFrom:
                   fieldRef:
                     apiVersion: v1
                     fieldPath: status.hostIP

      The following example shows how to activate the profiler from your application's code:

      .. code-block:: javascript

         start({
            serviceName: '<service-name>',
            endpoint: 'collectorhost:port',
            profiling: {                       // Activates CPU profiling
               memoryProfilingEnabled: true,   // Activates Memory profiling
            }
         });

      For more configuration options, including setting a separate endpoint for profiling data, see :ref:`profiling-configuration-nodejs`.

   .. group-tab:: .NET

      :strong:`Requirements`

      AlwaysOn Profiling requires .NET 6.0 or higher.

      Limited support is available for the following legacy versions of .NET:

         - CPU profiling: .NET Core 3.1 and .NET 5.x
         - Memory profiling: .NET Core 5.x

      :strong:`Instrumentation`

      - Activate the profiler by setting the ``SIGNALFX_PROFILER_ENABLED`` environment variable to ``true`` for your .NET process.
      - Activate memory profiling by setting the ``SIGNALFX_PROFILER_MEMORY_ENABLED`` environment variable to ``true``.
      - Make sure that the ``SPLUNK_PROFILER_LOGS_ENDPOINT`` environment variable points to \http://localhost:4317.
      - Check that the ``SIGNALFX_PROFILER_LOGS_ENDPOINT`` environment variable points to \http://localhost:4318/v1/logs or to the Splunk Distribution of OpenTelemetry Collector.

      For more configuration options, including setting a separate endpoint for profiling data, see :ref:`profiling-configuration-dotnet`.

.. _profiling-check-data-coming-in:

Check that Splunk Observability Cloud is receiving profiling data
--------------------------------------------------------------------

After you set up and activate AlwaysOn Profiling, check that profiling data is coming in:

1. Log in to Splunk Observability Cloud. 
2. In the navigation menu, select :menuselection:`APM`.
3. In Splunk APM, select :guilabel:`AlwaysOn Profiling`.
4. Select a service, and switch from the CPU view to the Memory view. 
5. If your service runs in multiple instances, select the instance that you're interested in by selecting the host, container, and process ID.
6. If you've activated memory profiling, explore memory metrics. See :ref:`profiling-memory-metrics`.

.. _profiling-gateway-deployment:

Activate AlwaysOn Profiling in a gateway deployment
=====================================================

Follow these steps to set up AlwaysOn Profiling with a collector in data forwarding or gateway mode, similar to the following example gateway deployment:

.. mermaid::

   flowchart LR
   instrumentation["`**(1)** Instrumentation agent`"] --> collector["`**(2)** Collector in host (agent) monitoring mode`"] --> datacollector["`**(3)** Collector in data forwarding (gateway) mode`"] --> SOC["`**(4)** Splunk Observability Cloud`"]

#. Point the instrumentation agent to the OTLP gRPC receiver for the collector in host monitoring (agent) mode. The OTLP gRPC receiver must be running on the same host and port as the collector in host monitoring (agent) mode.
#. Configure the collector in host monitoring (agent) mode with the following components:

   #. An OTLP gRPC receiver
   #. An OTLP exporter pointed at the collector in data forwarding (gateway) mode
   #. A logs pipeline that connects the receiver and the exporter.  For example, see the default agent configuration with the necessary adjustment to send to a gateway in the :new-page:`Splunk Opentelemetry Collector <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/agent_config.yaml#L195-L204>` on GitHub.

   .. code-block:: yaml

      service:
         pipelines:
            logs:
               receivers: [fluentforward, otlp]
               processors:
               - memory_limiter
               - batch
               - resourcedetection
               #- resource/add_environment
               #exporters: [splunk_hec, splunk_hec/profiling]
               # Use instead when sending to gateway
               exporters: [otlp]

#. Configure the collector in data forwarding (gateway) mode :strong:`(3)` with the following components:
      #. An OTLP gRPC receiver
      #. A splunk_hec exporter
      #. A logs pipeline that connects the receiver and the exporter