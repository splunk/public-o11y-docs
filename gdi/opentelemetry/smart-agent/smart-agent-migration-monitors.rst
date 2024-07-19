.. _migration-monitors:
.. _otel-smart-agent:

********************************************************************************************************
Use Smart Agent monitors with the Collector
********************************************************************************************************

.. meta::
   :description: Describes how to use Smart Agent monitors with the Smart Agent Receiver in the Collector.

.. caution:: Smart Agent monitors are being deprecated and will no longer be available to send data to Splunk Observability Cloud when they reach End of Support. Instead, you can use native OpenTelemetry receivers to gather data with the OTel Collector. See :ref:`migration-monitors-native`.

The Smart Agent receiver and its associated extension are Collector components that allow you to add legacy SignalFx Smart Agent monitors to the pipelines of your Splunk Distribution of OpenTelemetry Collector. Many monitors also require a Smart Agent release bundle, which the Splunk Distribution of OpenTelemetry Collector installs on supported x86_64/amd64 platforms.

Learn more at :ref:`smartagent-receiver` and :ref:`otel-components`.

For a list of available application monitors, see :ref:`monitor-data-sources`.

.. _migration-monitors-native:

Use native OTel components to monitor you applications or services
=====================================================================================

Some Smart Agent monitors are being deprecated, and during this period only critical security and bug fixes are provided. When End of Support is reached, the monitor will be removed and no longer be supported, and you won't be able to use it with the Smart Agent receiver to send data to Splunk Observability Cloud.

If a monitor has been deprecated, you can use a native OTel receiver to monitor you applications or services instead. Find the list of available receivers at :ref:`otel-components-receivers`.

.. _migration-monitors-legacy:

Use the Smart Agent receiver with active application integrations or monitors
=====================================================================================

.. note:: 

   The Smart Agent receiver is fully supported only on x86_64/amd64 platforms.

For each Smart Agent monitor you want to add to the Collector, add a ``smartagent`` receiver and ``smartagent`` service pipeline in your :ref:`Collector configuration file <otel-configuration>`. Each ``smartagent`` receiver acts as a drop-in replacement for its corresponding Smart Agent monitor.

Instead of using ``discoveryRule``, use the Collector receiver creator and observer extensions. See :ref:`receiver-creator-receiver` for more information.

If you're using a SignalFx Forwarder monitor (deprecated), add it to both a ``traces`` and a ``metrics`` pipeline, and use a Sapm exporter and a SignalFx exporter, as each pipeline's exporter, respectively. See more on :ref:`exporters <collector-components-processors>`.

Configure the Smart Agent receiver 
------------------------------------------------------------

To configure your different data types, see:

Configure metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To replace or modify metrics, use :ref:`Collector processors <collector-components-processors>`.

Configure events
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you have a monitor that sends events, add it to a logs pipeline that uses a SignalFx exporter. 

  * Sample monitors: ``kubernetes-events``, ``nagios``, ``processlist``, and some telegraf monitors like ``telegraf/exec``.

It's recommended, and in the case of the ``Processlist`` monitor required, to put into the same pipeline a Resource Detection processor, which adds host information and other useful dimensions to the events. See the :ref:`example below <migration-monitors-example>`.

Configure metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you have a monitor that updates dimension properties or tags, put the name of your SignalFx exporter in its ``dimensionClients`` field in the Collector's SignalFx receiver configuration block. 

  * Sample monitors: ``ecs-metadata``, ``heroku-metadata``, ``kubernetes-cluster``, ``openshift-cluster``, ``postgresql``, or ``sql``.

If you don't specify any exporters in this array field, the receiver attempts to use the Collector pipeline to which it's connected. If the next element of the pipeline isn't compatible with updating dimensions, and if you configured a single SignalFx exporter, the receiver uses that SignalFx exporter. If you don't require dimension updates, you can specify the empty array ``[]`` to deactivate it.

Smart Agent extension
------------------------------

The Smart Agent extension offers collectd and Python extensions. Extensions are available primarily for tasks that do not involve processing data. Examples of extensions include health monitoring, service discovery, and data forwarding. Extensions are optional.

See :new-page:`SignalFx Smart Agent Extension <https://github.com/signalfx/splunk-otel-collector/blob/main/pkg/extension/smartagentextension/README.md>` in GitHub to copy the configuration YAML file.

.. _migration-monitors-example:

Configuration example
------------------------------

.. code-block:: yaml


   receivers:
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
               - otlp
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
               - otlp
            processors:
               - resourcedetection
            exporters:
               - sapm


