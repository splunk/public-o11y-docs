.. _advanced-config-auto-instrumentation:

*************************************************************************
Advanced configuration for zero config auto instrumentation
*************************************************************************

.. meta::
    :description: Learn how to configure Splunk zero config auto instrumentation for advanced scenarios.

Learn how to configure Splunk zero config auto instrumentation for the advanced scenarios. After reading this doc, you can:

* Change instrumentation version
* Override auto instrumentation settings
* Deploy auto instrumentation in gateway mode

.. _change-zeroconfig-version:

Change instrumentation versions (Kubernetes only)
====================================================

By default, the Splunk Distribution of OpenTelemetry Collector uses the latest version of the related instrumentation library. To change the version of your instrumentation library, follow these steps:

#. Open your ``values.yaml`` file. 
#. In the instrumentation language section, change the ``tag`` value to match your desired version. The following example changes the Java instrumentation version to ``v1.27.0``.

    .. code-block:: yaml
        :emphasize-lines: 12

        clusterName: myCluster
        splunkObservability:
          realm: <splunk-realm>
          accessToken: <splunk-access-token>
        environment: prd
        certmanager:
          enabled: true
        operator:
          enabled: true
        java:
          repository: ghcr.io/signalfx/splunk-otel-java/splunk-otel-java
          tag: v1.27.0

#. Reinstall the Splunk OTel Collector Chart with the following command:

    .. code-block:: bash

        helm install splunk-otel-collector -f values.yaml

.. note:: If you don't see the ``java`` field in your ``values.yaml`` file, then you have to add the field and the ``repository`` value before changing the version. The repository value is always ``ghcr.io/signalfx/splunk-otel-java/splunk-otel-java``.

To see a list of the available releases for each instrumentation language, see the OpenTelemetry documentation: :new-page:`https://opentelemetry.io/docs/languages/#status-and-releases`.

.. _override-zeroconfig-settings:

Override auto instrumentation settings
====================================================

You can override default auto instrumentation settings to use features such as profiling and runtime metrics collection. 

Activate AlwaysOn Profiling (Linux only)
----------------------------------------------------

You can activate CPU and memory profiling by updating the environment variables for your instrumentation. AlwaysOn Profiling continuously collects stack traces so that you can discover which lines of code are slowing your processes down. To learn more about Profiling, see :ref:`profiling-intro`.

Follow these steps to activate AlwaysOn Profiling: 

#. Open the <language>.conf file located in the ``/etc/splunk/zeroconfig`` directory. 
#. Set the environment variable ``SPLUNK_PROFILER_ENABLED=true`` for CPU profiling, and ``SPLUNK_PROFILER_MEMORY_ENABLED=true`` for memory profiling.
#. Restart your applications.

.. note:: If you're using ``systemd``, the environment variables are instead located in ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.
      
To sample call stacks from a specific interval, change the ``SPLUNK_PROFILER_CALL_STACK_INTERVAL`` setting to your desired interval in milliseconds. 

For example, ``SPLUNK_PROFILER_CALL_STACK_INTERVAL=10000`` sets the call stack interval to 10000 milliseconds.

Activate runtime metrics collection (Linux only)
----------------------------------------------------

You can activate runtime metrics collection by updating the environment variables for your instrumentation. This setting configures the agent to collect additional metrics from your application. 

Follow these steps to activate runtime metrics collection:

#. Open the <language>.confg file located in the ``/etc/splunk/zeroconfig`` directory.
#. Set the environment variable ``SPLUNK_METRICS_ENABLED=-rue``.
#. Restart your applications.

.. _deploy-in-gateway:

Use auto instrumentation in gateway mode 
===========================================================

The Splunk OTel Collector Chart uses the agent mode by default. Activating gateway mode deploys an instance of the OpenTelemetry Collector in a separate container, and this instance collects data from the entire cluster.

To learn more about the gateway mode, see :ref:`collector-gateway-mode`.

.. tabs:: 

    .. tab:: Linux

        You can't deploy auto instrumentation in gateway mode for Linux, but you can send collected data from auto instrumentation to an existing gateway deployment.

        Follow these steps to send data to a gateway deployment of the OpenTelemetry Collector:

        #. Open the <language>.conf file located in ``/etc/splunk/zeroconfig``.
        #. Set the environment variable ``OTEL_EXPORTER_OTLP_ENDPOINT=<gateway_endpoint>`` where <gateway_endpoint> is the port of your gateway deployment.
        #. Restart your applications.

        The auto instrumentation now sends data to your gateway deployment.

    .. tab:: Kubernetes

        You can change the Collector deployment mode in Kubernetes. If you change the deployment mode to gateway, the instrumentation automatically routes data to the gateway deployment.

        Follow these steps to activate gateway mode in Kubernetes:

        #. Open the values.yaml file.
        #. Edit the ``gateway.enabled`` value to ``true``. The following example activates gateway mode:

            .. code-block:: yaml
                :emphasize-lines: 12

                clusterName: myCluster
                splunkObservability:
                realm: <splunk-realm>
                accessToken: <splunk-access-token>
                environment: prd
                certmanager:
                  enabled: true
                operator:
                  enabled: true
                
                gateway:
                  enabled: true

        #. Reinstall the Splunk OTel Collector Chart with the following command:

            .. code-block:: bash

                helm install splunk-otel-collector -f values.yaml

Additional settings
===================================

For a list of settings that you can change in Linux, see the following resources:

.. list-table::
  :header-rows: 1
  :width: 100

  * - Language
    - Resource
  * - Java
    - :ref:`advanced-java-otel-configuration`
  * - Node.js
    - :ref:`advanced-nodejs-otel-configuration`

For a complete list of settings that you can modify in values.yaml for Kubernetes, see :new-page:`https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml`.