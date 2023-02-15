.. _migration-monitors:

********************************************************************************************************
Use Smart Agent monitors with the Collector
********************************************************************************************************

.. meta::
   :description: Describes how to use Smart Agent monitors with the Smart Agent Receiver in the Collector.

.. _note: 

   The Smart Agent receiver is fully supported only on x86_64/amd64 platforms.

The ``smartagent`` receiver lets you use :ref:`SignalFx Smart Agent monitors <monitor-data-sources>` in the Splunk Distribution of OpenTelemetry Collector. Many monitors also require a Smart Agent release bundle, which the Splunk Distribution of OpenTelemetry Collector installs on supported x86_64/amd64 platforms.

Configure the Smart Agent receiver
================================================================

For each Smart Agent monitor you want to add to the Collector, add a ``smartagent`` receiver configuration block in the Collector config file. Each ``smartagent`` receiver acts as a drop-in replacement for its corresponding Smart Agent monitor.

#. Put any Smart Agent or collectd configuration into the global Smart Agent Extension section of your Collector configuration.
#. Instead of using discoveryRule, use the Collector's Receiver Creator and Observer extensions.
#. If you're using a SignalFx Forwarder monitor, add it to both a traces and a metrics pipeline, and use a Sapm exporter and a SignalFx exporter, as each pipeline's exporter, respectively.
#. To replace or modify metrics, use Collector processors.
#. If you have a monitor that sends events (e.g. kubernetes-events, nagios, processlist, and some telegraf monitors like telegraf/exec), add it to a logs pipeline that uses a SignalFx exporter. It's recommended, and in the case of the Processlist monitor required, to put into the same pipeline a Resource Detection processor, which will add host information and other useful dimensions to the events. An example is provided below.
#. If you have a monitor that updates dimension properties or tags, for example ecs-metadata, heroku-metadata, kubernetes-cluster, openshift-cluster, postgresql, or sql, put the name of your SignalFx exporter in its dimensionClients field in the Collector's SignalFx receiver configuration block. If you don't specify any exporters in this array field, the receiver attempts to use the Collector pipeline to which it's connected. If the next element of the pipeline isn't compatible with updating dimensions, and if you configured a single SignalFx exporter, the receiver uses that SignalFx exporter. If you don't require dimension updates, you can specify the empty array ``[]`` to disable it.

Example
================================================================

.. code-block:: yaml

   receivers:
      smartagent/signalfx-forwarder:
         type: signalfx-forwarder
      smartagent/postgresql:
         type: postgresql
         host: mypostgresinstance
         port: 5432
         dimensionClients:
            - signalfx
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
         access_token: "${SIGNALFX_ACCESS_TOKEN}"
         realm: us1
      sapm:
         access_token: "${SIGNALFX_ACCESS_TOKEN}"
         endpoint: https://ingest.us1.signalfx.com/v2/trace

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


