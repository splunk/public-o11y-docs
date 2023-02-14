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

The Splunk Distribution of the :new-page:`OpenTelemetry Collector <https://opentelemetry.io/docs/concepts/data-collection/>` provides a unified way to receive, process, and export metrics, traces, and logs to Splunk Observability Cloud. Current SignalFx Smart Agent (deprecated) users can easily transition to the Collector without losing any functionality. 

.. raw:: html

   <embed>
      <h2>Benefits<a name="migration-benefits" class="headerlink" href="#migration-benefits" title="Permalink to this headline">¶</a></h2>
   </embed>

The benefits of using the Collector are:

* Open standard based on OpenTelemetry.
* Support for new features such as code profiling.
* Ability to correlate data between different views within Observability Cloud with :ref:`Related Content <get-started-relatedcontent>`.
* Bundled FluentD for log collection.

For example, see the Related Content bar displaying in Splunk APM. With the ``paymentservice`` selected in the APM Service Map, the bar offers easy access to the paymentservice-related Kubernetes cluster data in Splunk Infrastructure Monitoring and logs in Splunk Log Observer:

.. image:: /_images/gdi/3886-related-content-bar.png
   :width: 99%
   :alt: Viewing the Related Content bar in Splunk APM.

.. raw:: html

   <embed>
      <h2>Migration process<a name="migration-process" class="headerlink" href="#migration-process" title="Permalink to this headline">¶</a></h2>
   </embed>

To migrate from the Smart Agent to the Collector, follow :ref:`these steps <migration-process>`.

.. raw:: html

   <embed>
      <h3>Smart Agent monitors and Receiver<a name="sa-receiver-monitor" class="headerlink" href="#sa-receiver-monitor" title="Permalink to this headline">¶</a></h2>
   </embed>

The Smart Agent metric monitors allow real-time insights into how your target services and applications are performing. These metric gathering utilities have an equivalent counterpart in the Collector.   

The Smart Agent Receiver is a wrapper utility that allows the embedding of Smart Agent monitors within your Collector pipelines. Its associated extension, and other Collector components will continue to provide a means of integrating all Smart Agent metric monitors into your Collector pipelines.

.. raw:: html

   <embed>
      <h2>Configuration translation tool and data mapping service<a name="migration-data" class="headerlink" href="#migration-data" title="Permalink to this headline">¶</a></h2>
   </embed>

Observability Cloud provides a :ref:`translation tool <otel-translation-tool>` to help you adapt your Smart Agent YAML configuration file to a YAML that you can use with the Collector. 

Observability Cloud also has a mapping service that defines equivalencies between legacy Smart Agent metric naming and semantic conventions to the OpenTelemetry names and formats for metrics and metric metadata. See :ref:`Metric mapping service <legacy-otel-mappings>` for more information. 
