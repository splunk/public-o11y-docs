.. _advanced-config-auto-instrumentation:

*************************************************************************
Advanced customization for zero config auto instrumentation
*************************************************************************

.. meta::
    :description: Learn how to customize Splunk zero config auto instrumentation for advanced scenarios.

Learn how to customize Splunk zero config auto instrumentation for the advanced scenarios. 

Through advanced customization, you can achieve the following tasks:

* :ref:`Change instrumentation version <change-zeroconfig-version>`
* :ref:`Override auto instrumentation settings <override-zeroconfig-settings>`
* :ref:`Deploy auto instrumentation in gateway mode <deploy-in-gateway>`

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

See the following pages for information about previous versions for each language:

* Java: :ref:`java-otel-requirements`
* Node.js: :ref:`nodejs-otel-requirements`
* .NET: :ref:`dotnet-otel-requirements`

.. _override-zeroconfig-settings:

Override auto instrumentation settings
====================================================

You can override default auto instrumentation settings to use features such as profiling and runtime metrics collection. 

Activate AlwaysOn Profiling
----------------------------------------------------

You can activate CPU and memory profiling by updating the environment variables for your instrumentation. AlwaysOn Profiling continuously collects stack traces so that you can discover which lines of code are slowing your processes down. To learn more about Profiling, see :ref:`profiling-intro`.

.. tabs:: 

  .. tab:: Linux 

      To activate profiling globally, add the ``--enable-profiler`` flag upon installation for CPU profiling, or ``--enable-profiler-memory`` flag for memory profiling. For example: 

      .. code-block:: bash
        :emphasize-lines: 4

        curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
        sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
        --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
        --enable-profiler --enable-profiler-memory

      You can also activate profiling for individual languages. By using this approach, you can determine which languages profiling gathers call stacks from.

      Follow these steps to activate AlwaysOn Profiling for an individual language: 

      #. Open the <language>.conf file located in the ``/etc/splunk/zeroconfig`` directory. 
      #. Set the environment variable ``SPLUNK_PROFILER_ENABLED=true`` for CPU profiling, and ``SPLUNK_PROFILER_MEMORY_ENABLED=true`` for memory profiling.
      #. Restart your applications.

      .. note:: If you're using ``systemd``, the environment variables are instead located in ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.
            
      To sample call stacks from a specific interval, change the ``SPLUNK_PROFILER_CALL_STACK_INTERVAL`` setting to your desired interval in milliseconds. The default value is ``10000``.

      For example, ``SPLUNK_PROFILER_CALL_STACK_INTERVAL=5000`` sets the call stack interval to 5000 milliseconds.
  
  .. tab:: Kubernetes

      You can configure AlwaysOn Profiling in Kubernetes by editing the values.yaml file for the Helm Chart.

      Follow these steps to activate Profiling for a language:

      #. Open the values.yaml file.
      #. In the ``operator.instrumentation.spec.<language>.env`` section, add the ``SPLUNK_PROFILER_ENABLED=true`` environment variable and the ``SPLUNK_PROFILER_CALL_STACK_INTERVAL`` environment variable.

          For example, the following values.yaml file configures AlwaysOn Profiling to sample call stacks from a 5000 millisecond interval:

          .. code-block:: yaml

            operator:
              enabled: true
              instrumentation:  
                spec:
                  nodejs:
                    repository: ghcr.io/signalfx/splunk-otel-js/splunk-otel-js
                    tag: v2.7.0
                    env:
                    # Activates AlwaysOn Profiling for Node.js
                    - name: SPLUNK_PROFILER_ENABLED
                      value: true
                    # Samples call stacks from a 5000 millisecond interval. 
                    # If excluded, samples from a 10000 millisecond interval by default.
                    - name: SPLUNK_PROFILER_CALL_STACK_INTERVAL
                      value: 5000
      
      #. Reinstall the Splunk OTel Collector Chart with the following command:

            .. code-block:: bash

                helm install splunk-otel-collector -f values.yaml

Activate runtime metrics collection (Linux only)
----------------------------------------------------

You can activate runtime metrics collection by updating the environment variables for your instrumentation. This setting configures the agent to collect additional metrics from your application. 

To activate runtime metrics globally, add the ``--enable-metrics`` flag upon installation. For example: 

.. code-block:: bash
  :emphasize-lines: 4

  curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
  sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
  --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
  --enable-metrics

You can also activate runtime metrics collection for individual languages. By using this approach, you can determine which runtime metrics the Collector sends at a language-level.

To activate runtime metrics collection for an individual language, follow these steps:

#. Open the <language>.conf file located in the ``/etc/splunk/zeroconfig`` directory.
#. Set the environment variable ``SPLUNK_METRICS_ENABLED=true``.
#. Restart your applications.

.. _deploy-in-gateway:

Use auto instrumentation in gateway mode 
===========================================================

The Splunk OTel Collector Chart uses the agent mode by default. Activating gateway mode deploys an instance of the OpenTelemetry Collector in a separate container, and this instance collects data from the entire cluster.

To learn more about the gateway mode, see :ref:`collector-gateway-mode`.

.. tabs:: 

    .. tab:: Linux

        You can't directly deploy auto instrumentation in gateway mode for Linux, but you can send collected data from auto instrumentation to an existing gateway deployment.

        Follow these steps to send data to a gateway deployment of the OpenTelemetry Collector:

        #. Open the <language>.conf file located in ``/etc/splunk/zeroconfig``.
        #. Set the environment variable ``OTEL_EXPORTER_OTLP_ENDPOINT=<gateway_endpoint>`` where <gateway_endpoint> is the port of your gateway deployment.
        #. Restart your applications.

        The auto instrumentation now sends data to your gateway deployment. 

    .. tab:: Kubernetes

        You can change the Collector deployment mode in Kubernetes. If you change the deployment mode to gateway, the instrumentation automatically routes data to the gateway deployment.

        Follow these steps to activate gateway mode in Kubernetes:

        #. Open the values.yaml file.
        #. Set the ``gateway.enabled`` value to ``true``. The following example activates gateway mode:

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

There are many other settings you can customize in zero configuration auto instrumentation.

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