.. _get-started-migrate-to-otel:

********************************************************************************************
Replace the SignalFx Smart Agent with the Splunk Distribution of OpenTelemetry Collector
********************************************************************************************

.. meta::
   :description: Replace the Smart Agent with the Splunk Distribution of OpenTelemetry Collector.

This document guides you through migrating from the Smart Agent to the Splunk Distribution of OpenTelemetry Collector.

The Splunk Distribution of OpenTelemetry Connector performs a similar role to the Smart Agent, including creating and collecting data from your services and software and then forwarding that data to various analysis tools. But the OpenTelemetry Collector has additional capabilities, including log collection, the ability to correlate related signals, and more.

.. admonition:: Note about the SignalFx Smart Agent

  If you want to use Splunk Observability Cloud integration for any of the following services, you still need to deploy the SignalFx Smart Agent instead of the Splunk Distribution of OpenTelemetry Collector:

    - CloudFoundry and VMWare Tanzu Application Service, also known as Pivotal CloudFoundry or PFC
    - OpenShift
    - ECS and ECS/Fargate
    - Docker

  Note also that any metrics ingested via the Splunk Distribution of OpenTelemetry Collector will not appear in the classic SignalFx UI. Smart Agent and cloud metrics will continue to appear in either experience, but you can only view OpenTelemetry-sourced metrics in the Splunk Observability Cloud UI. 

  For instructions on how to deploy the SignalFx Smart Agent, see :new-page:`Deploying the SignalFx Smart Agent <https://docs.signalfx.com/en/latest/apm-pg/apm-pg-deployment/smart-agent.html#apm-pg-smart-agent>`.

The Smart Agent's metric monitors allow real-time insights into how your target services and applications are performing. These metric gathering utilities have an equivalent counterpart in the Splunk OpenTelemetry Connector, the ``smartagent`` receiver. This receiver is a wrapper utility that allows the embedding of Smart Agent monitors within your collector pipelines. Over time, these monitors will be converted to work natively with OpenTelemetry.

The ``smartagent`` receiver in the Splunk OpenTelemetry Collector works in much the same way your Smart Agent monitors do.

Configuration
==================
Given the following, example Smart Agent monitor configuration:

.. code-block:: yaml

   signalFxAccessToken: {"#from": "env:SIGNALFX_ACCESS_TOKEN"}
   ingestUrl: https://ingest.us1.signalfx.com
   apiUrl: https://api.us1.signalfx.com

   bundleDir: /opt/my-smart-agent-bundle

   observers:
     - type: k8s-api

   collectd:
     readThreads: 10
     writeQueueLimitHigh: 1000000
     writeQueueLimitLow: 600000

   monitors:
     - type: signalfx-forwarder
       listenAddress: 0.0.0.0:9080
     - type: collectd/activemq
       discoveryRule: container_image =~ "activemq" && private_port == 1099
       extraDimensions:
         my_dimension: my_dimension_value
     - type: collectd/apache
       discoveryRule: container_image =~ "apache" && private_port == 80
     - type: postgresql
       discoveryRule: container_image =~ "postgresql" && private_port == 7199
       extraDimensions:
         my_other_dimension: my_other_dimension_value

Here is an equivalent, recommended OpenTelemetry Collector configuration. Notice that the ``signalfx-forwarder`` monitor's associated ``smartagent/signalfx-forwarder`` receiver instance is part of a ``traces`` pipeline using the ``sapm`` exporter. The additional metric monitors use the receiver creator.

This receiver can instantiate other receivers at runtime based on whether observed endpoints match a configured rule. To use the receiver creator, you must first configure one or more observers that discover networked endpoints that you may be interested in. The configured rules are evaluated for each endpoint discovered. If the rule evaluates to true, then the receiver for that rule is started against the matched endpoint.

.. code-block:: yaml

   extensions:
     k8s_observer:
       auth_type: serviceAccount
       node: ${K8S_NODE_NAME}
     smartagent:
       bundleDir: /opt/my-smart-agent-bundle
       collectd:
         readThreads: 10
         writeQueueLimitHigh: 1000000
         writeQueueLimitLow: 600000

   receivers:
     smartagent/signalfx-forwarder:
       type: signalfx-forwarder
       listenAddress: 0.0.0.0:9080
     receiver_creator:
       receivers:
         smartagent/activemq:
           rule: type == "port" && pod.name matches "activemq" && port == 1099
           config:
             type: collectd/activemq
             extraDimensions:
               my_dimension: my_dimension_value
         smartagent/apache:
           rule: type == "port" && pod.name matches "apache" && port == 80
           config:
             type: collectd/apache
         smartagent/postgresql:
           rule: type == "port" && pod.name matches "postgresql" && port == 7199
           config:
             type: postgresql
             extraDimensions:
               my_other_dimension: my_other_dimension_value
       watch_observers:
         - k8s_observer

   processors:
     resourcedetection:
       detectors:
         - system
         - env
     k8s_tagger:
       extract:
         metadata:
           - namespace
           - node
           - podName
           - podUID
       filter:
         node_from_env_var: K8S_NODE_NAME
     resource/add_cluster_name:
       attributes:
         - action: upsert
           key: k8s.cluster.name
           value: my_desired_cluster_name

   exporters:
     signalfx:
       access_token: "${SIGNALFX_ACCESS_TOKEN}"
       realm: us1
     sapm:
       access_token: "${SIGNALFX_ACCESS_TOKEN}"
       endpoint: https://ingest.us1.signalfx.com/v2/trace

   service:
     extensions:
       - k8s_observer
       - smartagent
     pipelines:
       metrics:
         receivers:
           - receivor_creator
         processors:
           - resourcedetection
         exporters:
           - signalfx
       traces:
         receivers:
           - smartagent/signalfx-forwarder
         processors:
           - resourcedetection
         exporters:
           - sapm
   
SignalFx Smart Agent Receiver
=====================================
The Smart Agent Receiver allows you to use existing Smart Agent monitors as OpenTelemetry Collector metric receivers. Before configuring the Smart Agent Receiver, configure your environment with a functional Smart Agent release bundle on your system.

Each ``smartagent`` receiver configuration acts as a drop-in replacement for each supported Smart Agent Monitor configuration with the following exceptions:

#. In lieu of ``discoveryRule`` support, the Collector's receiver creator and associated observer extensions should be used.
#. The ``signalfx-forwarder`` monitor should be made part of a ``traces`` pipeline utilizing the ``sapm`` exporter.
#. All metric content replacement and transformation rules should use the existing Collector processors.
#. Monitors with dimension property and tag update functionality allow an associated ``dimensionClients`` field that references the name of the exporter you are using in your pipeline. If you do not specify any exporters via this field, the receiver attempts to use the associated pipeline. If the next element of the pipeline isn't compatible with the dimension update behavior, and if you configured a single exporter for your deployment, the monitor selects the exporter. You can specify the empty array ``[]`` to disable dimension update behavior if not required. See :new-page:`SignalFx Metrics Exporter <https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/signalfxexporter#signalfx-metrics-exporter>` for more information.
#. Monitors with event-sending functionality should also be members of a logs pipeline that utilizes an exporter to make event submission requests. In the case of the ``processlist`` monitor, you should use a resource detection processor to ensure that host identity and other helpful information are made available as event dimensions. 

The following example configuration adds ``nagios``, ``processlist``, and potentially any ``telegraf/*`` monitors like ``telegraf/exec`` as receiver entries to the logs pipelines.

.. code-block:: yaml

   receivers:
     smartagent/signalfx-forwarder:
       type: signalfx-forwarder
     smartagent/postgresql:
       type: postgresql
       host: mypostgresinstance
       port: 5432
       dimensionClients:
         - signalfx  # references the SignalFx Exporter configured below.
     smartagent/processlist:
       type: processlist
     smartagent/kafka:
       type: collectd/kafka
       host: mykafkabroker
       port: 7099
       clusterName: mykafkacluster
       intervalSeconds: 5

   processors:
     resourcedetection:
       detectors:
         - system

   exporters:
     signalfx:
     sapm:

   service:
     pipelines:
       metrics:
         receivers:
           - smartagent/postgresql
           - smartagent/kafka
           - smartagent/signalfx-forwarder
         processors:
           - resourcedetection
         exporters:
           - signalfx
       logs:
         receivers:
           - smartagent/processlist
         processors:
           - resourcedetection
         exporters:
           - signalfx
       traces:
         receivers:
           - smartagent/signalfx-forwarder
         processors:
           - resourcedetection
         exporters:
           - sapm
