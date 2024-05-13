.. _k8s-advanced-auto-discovery-config:

***********************************************************************
Advanced customization for automatic discovery in Kubernetes
***********************************************************************

.. meta:: 
    :description: Learn how to customize your deployment of automatic discovery in a Kubernetes environment.

Learn how to customize Splunk automatic discovery and configuration for advanced scenarios. 

Through advanced customization, you can achieve the following tasks:

* :ref:`Change the version of your instrumentation library <change-instrumentation-version-k8s>`
* :ref:`Override automatic discovery settings <override-default-settings-k8s>`
* :ref:`Use automatic discovery with gateway mode <use-with-gateway-k8s>`

.. note:: For advanced customization options in Linux, see :ref:`linux-advanced-auto-discovery-config`.

.. _change-instrumentation-version-k8s:

Change instrumentation version
====================================================

By default, the Splunk Distribution of OpenTelemetry Collector uses the latest version of the related instrumentation library. To change the version of your instrumentation library, follow these steps:

#. Open your ``values.yaml`` file. 
#. In the instrumentation language section, change the ``tag`` value to match your desired version. The following example changes the Java instrumentation version to ``v1.27.0``.

    .. code-block:: yaml
        :emphasize-lines: 14

        clusterName: myCluster
        splunkObservability:
          realm: <splunk-realm>
          accessToken: <splunk-access-token>
        environment: prd
        certmanager:
          enabled: true
        operator:
          enabled: true
          instrumentation:
            spec: 
              java:
                repository: ghcr.io/signalfx/splunk-otel-java/splunk-otel-java
                tag: v1.27.0

#. Reinstall the Splunk OTel Collector Chart with the following command. Replace <CURRENT_VERSION> with the current version of your splunk-otel-collector-chart.

    .. code-block:: bash

        helm upgrade splunk-otel-collector splunk-otel-collector-chart/splunk-otel-collector --version <CURRENT_VERSION> -f values.yaml

.. note:: If you don't see the ``java`` field in your ``values.yaml`` file, then you have to add the field and the ``repository`` value before changing the version. The repository value is always ``ghcr.io/signalfx/splunk-otel-java/splunk-otel-java``.

See the following pages for information about previous versions for each language:

* Java: :ref:`java-otel-requirements`
* Node.js: :ref:`nodejs-otel-requirements`
* .NET: :ref:`dotnet-otel-requirements`

.. _override-default-settings-k8s:

Override default instrumentation settings
======================================================

You can override default automatic discovery settings to use features such as AlwaysOn profiling and runtime metrics.

Configure AlwaysOn Profiling
----------------------------------------

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
                env:
                # Activates AlwaysOn Profiling for Node.js
                - name: SPLUNK_PROFILER_ENABLED
                  value: true
                # Samples call stacks from a 5000 millisecond interval. 
                # If excluded, samples from a 10000 millisecond interval by default.
                - name: SPLUNK_PROFILER_CALL_STACK_INTERVAL
                  value: 5000
      
#. Reinstall the Splunk OTel Collector Chart with the following command. Replace <CURRENT_VERSION> with the current version of your splunk-otel-collector-chart.

    .. code-block:: bash

        helm upgrade splunk-otel-collector splunk-otel-collector-chart/splunk-otel-collector --version <CURRENT_VERSION> -f values.yaml

Activate runtime metrics collection (Java and Node.js only)
-------------------------------------------------------------

You can activate runtime metrics collection for Java and Node.js applications running in your Kubernetes environment. To learn more about runtime metrics collection, see :

Follow these steps to activate runtime metrics collection:

#. Open the values.yaml file.
#. In the ``operator.instrumentation.spec.<language>.env`` section, add the ``SPLUNK_METRICS_ENABLED=true`` environment variable.

    For example, the following values.yaml file activates runtime metrics collection for Java applications:

    .. code-block:: yaml

      operator:
        enabled: true
        instrumentation:  
          spec:
            java:
              env:
              # Activates runtime metrics collection for Java
              - name: SPLUNK_METRICS_ENABLED
                value: true

#. In the ``operator.instrumentation.spec.env`` section, add the following environment variables and values to configure the endpoint to which the Collector sends runtime metrics:

    .. code-block:: yaml

      operator:
        enabled: true
        instrumentation:
          spec:
            env:
            - name: SPLUNK_NODE_IP
              valueFrom:
                fieldRef:
                  apiVersion: v1
                  fieldPath: status.hostIP
            - name: SPLUNK_METRICS_ENDPOINT
              value: http://(SPLUNK_NODE_IP):9943/v2/datapoint

#. Reinstall the Splunk OTel Collector Chart with the following command. Replace <CURRENT_VERSION> with the current version of your splunk-otel-collector-chart.

    .. code-block:: bash

        helm upgrade splunk-otel-collector splunk-otel-collector-chart/splunk-otel-collector --version <CURRENT_VERSION> -f values.yaml

.. _use-with-gateway-k8s:

Use automatic discovery with gateway mode
=======================================================

The Splunk OTel Collector Chart uses the agent mode by default. Activating gateway mode deploys an instance of the OpenTelemetry Collector in a separate container, and this instance collects data from the entire cluster.

To learn more about the gateway mode, see :ref:`collector-gateway-mode`.

Follow these steps to send data to a gateway endpoint:

#. Open the values.yaml file.
#. Set the ``operator.instrumentation.spec.exporter.endpoint`` value to the gateway endpoint. For example:

    .. code-block:: yaml
        :emphasize-lines: 13

        clusterName: myCluster
        splunkObservability:
          realm: <splunk-realm>
          accessToken: <splunk-access-token>
        environment: prd
        certmanager:
          enabled: true
        operator:
            enabled: true
            instrumentation:
              spec:
                exporter:
                  endpoint: <gateway-endpoint>

#. Reinstall the Splunk OTel Collector Chart with the following command. Replace <CURRENT_VERSION> with the current version of your splunk-otel-collector-chart.

    .. code-block:: bash

        helm upgrade splunk-otel-collector splunk-otel-collector-chart/splunk-otel-collector --version <CURRENT_VERSION> -f values.yaml

You can also automatically send data to a deployed gateway endpoint by setting ``agent.enabled: false`` and ``gateway.enabled: true`` in your values.yaml file. For example:

.. code-block:: yaml
    :emphasize-lines: 12, 14

    clusterName: myCluster
    splunkObservability:
      realm: <splunk-realm>
      accessToken: <splunk-access-token>
    environment: prd
    certmanager:
      enabled: true
    operator:
      enabled: true
                
    agent:
      enabled: false
    gateway:
      enabled: true
        
Using this configuration, automatic discovery automatically sends data to a running gateway endpoint.

Additional settings
===================================

There are many other settings you can customize in automatic discovery and configuration.

For a list of settings that you can change for each language, see the following resources:

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