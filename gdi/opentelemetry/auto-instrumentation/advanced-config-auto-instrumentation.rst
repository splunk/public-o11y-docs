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

Using the values.yaml file
================================

Configuring auto instrumentation requires editing a ``values.yaml`` file. This file contains fields and values that allow you to install the Splunk Distribution of OpenTelemetry Collector through the Helm Chart.

To learn more about the ``values.yaml`` file, see <placeholder>. 

.. _change-zeroconfig-version:

Change instrumentation versions
====================================================

By default, the Splunk Distribution of OpenTelemetry Collector uses the latest version of the related instrumentation library. To change the version of your instrumentation library, follow these steps:

#. Open your ``values.yaml`` file. 
#. In the instrumentation language section, change the ``tag`` value to match your desired version. See the following example YAML:

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

To learn more about the available releases for each instrumentation language, see the OpenTelemetry documentation: :new-page:`https://opentelemetry.io/docs/languages/#status-and-releases`.

.. _override-zeroconfig-settings:

Override auto instrumentation settings
====================================================

You can override default auto instrumentation settings, including ingested telemetry data.

Change ingested telemetry data
----------------------------------------------------

You can edit the types of telemetry data that auto instrumentation ingests. By default, auto instrumentation only collects traces and metrics.

To change the collected data types, edit the ``metricsEnabled``, ``tracesEnabled``, or ``logsEnabled`` fields in your ``values.yaml`` file.

The following example activates log collection:

.. code-block:: yaml
    :emphasize-lines: 7

    clusterName: myCluster
    splunkObservability: 
      realm: <splunk-realm>
      accessToken: <splunk-access-token>
      metricsEnabled: true
      tracesEnabled: true 
      logsEnabled: true

    certmanager:
      enabled: true
    operator:
      enabled: true


.. _deploy-in-gateway:

Deploy auto instrumentation in gateway mode
===================================================

The Splunk OTel Collector Chart uses the agent mode by default. Activating gateway mode deploys an instance of the OpenTelemetry Collector in a separate container, and this instance collects data from the entire cluster.

To learn more about the gateway mode, see :ref:`collector-gateway-mode`.

Follow these steps to activate gateway mode:

#. Open the ``values.yaml`` file that you used to install the ``splunk-otel-collector-chart``.
#. Edit the ``gateway.enabled`` value to ``true``. See the following example:

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