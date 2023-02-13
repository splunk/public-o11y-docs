.. _migrate-from-sa-to-otel:
.. _migrate-sa-to-otel-collector:

***********************************************************************************************
Migrate from SignalFx Smart Agent to the Splunk Distribution of OpenTelemetry Collector
***********************************************************************************************

.. meta::
   :description: Describes the process of migrating from the SignalFX Smart Agent to the Splunk Distribution of OpenTelemetry Collector.

.. toctree::
   :maxdepth: 4
   :titlesonly:
   :hidden:

   Migration process <smart-agent-migration-process.rst>
   translation-tool.rst
   legacy-otel-mappings.rst

The Splunk Distribution of OpenTelemetry Collector is the Splunk distribution of the :new-page:`OpenTelemetry Collector <https://opentelemetry.io/docs/concepts/data-collection/>` that provides a unified way to receive, process, and export metrics, traces, and logs to Splunk Observability Cloud.

This distribution provides helpful components to assist current SignalFx Smart Agent (deprecated) users in their transition to the Collector and ensure no functionality loss. The Smart Agent Receiver, its associated extension, and other Collector components provide a means of integrating all Smart Agent metric monitors into your Collector pipelines.

The Smart Agent metric monitors allow real-time insights into how your target services and applications are performing. These metric gathering utilities have an equivalent counterpart in the Collector, known as the metric receiver. The Smart Agent Receiver is a wrapper utility that allows the embedding of Smart Agent monitors within your Collector pipelines.

.. raw:: html

   <embed>
      <h2>Benefits<a name="migration-benefits" class="headerlink" href="#migration-benefits" title="Permalink to this headline">¶</a></h2>
   </embed>

The benefits of using the Collector are:

* Open standard based on OpenTelemetry
* Support for new features such as code profiling
* Ability to correlate data between different views within Observability Cloud with :ref:`Related Content <get-started-relatedcontent>` 
* Bundled FluentD for log collection

For example, see the Related Content bar displaying in Splunk APM. With the ``paymentservice`` selected in the APM Service Map, the bar offers easy access to the paymentservice-related Kubernetes cluster data in Splunk Infrastructure Monitoring and logs in Splunk Log Observer:

.. image:: /_images/gdi/3886-related-content-bar.png
   :width: 99%
   :alt: Viewing the Related Content bar in Splunk APM.

.. raw:: html

   <embed>
      <h2>Understand OpenTelemetry formats for metrics and metric metadata<a name="migration-data" class="headerlink" href="#migration-data" title="Permalink to this headline">¶</a></h2>
   </embed>

Splunk provides a mapping service that defines equivalencies between legacy Smart Agent metric naming and semantic conventions to the OpenTelemetry names and formats for metrics and metric metadata. Mapping supports multiple observers, deployment types, and kinds of metadata. See :new-page:`Metric mapping service <legacy-otel-mappings>` for more information. 
