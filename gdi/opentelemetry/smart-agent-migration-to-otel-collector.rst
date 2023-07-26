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
   smart-agent-migration-monitors.rst
   legacy-otel-mappings.rst

.. note:: The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs.

  Note that this only affects the agent; Smart Agent receivers bundled in the Splunk Distribution of OpenTelemetry Collector are available and supported.

The Splunk Distribution of the :new-page:`OpenTelemetry Collector <https://opentelemetry.io/docs/concepts/data-collection/>` provides a unified way to receive, process, and export metrics, traces, and logs to Splunk Observability Cloud. Current SignalFx Smart Agent (deprecated) users can easily transition to the Collector without losing any functionality. 

.. raw:: html

   <embed>
      <h2>Benefits<a name="migration-benefits" class="headerlink" href="#migration-benefits" title="Permalink to this headline">¶</a></h2>
   </embed>

The benefits of using the Collector are:

* Open standard based on OpenTelemetry.
* Support for new features such as code profiling.
* Ability to correlate data between different views within Splunk Observability Cloud with :ref:`Related Content <get-started-relatedcontent>`.
* Bundled Fluentd for log collection.

.. raw:: html

   <embed>
      <h2>Migration process<a name="migration-process" class="headerlink" href="#migration-process" title="Permalink to this headline">¶</a></h2>
   </embed>

To migrate from the Smart Agent to the Collector, follow :ref:`these steps <migration-process>`.

.. raw:: html

   <embed>
      <h3>Smart Agent monitors and the Smart Agent Receiver<a name="sa-receiver-monitor" class="headerlink" href="#sa-receiver-monitor" title="Permalink to this headline">¶</a></h2>
   </embed>

While the Smart Agent is deprecated, Smart Agent :ref:`monitors <monitor-data-sources>` are not.

The Smart Agent metric monitors allow real-time insights into how your target services and applications are performing. These metric gathering utilities have an equivalent counterpart in the Collector.   

The :ref:`smartagent-receiver` is a :ref:`component of the Collector <otel-components>` that allows the embedding of existing Smart Agent monitors in your Collector metric pipelines. 

Learn :ref:`how to use Smart Agent monitors in the Collector <migration-monitors>`. 

.. raw:: html

   <embed>
      <h2>Configuration translation tool and data mapping service<a name="migration-data" class="headerlink" href="#migration-data" title="Permalink to this headline">¶</a></h2>
   </embed>

Splunk Observability Cloud provides a :ref:`translation tool <otel-translation-tool>` to help you adapt your Smart Agent YAML configuration file to a YAML that you can use with the Collector. 

Splunk Observability Cloud also has a mapping service that defines equivalencies between legacy Smart Agent metric naming and semantic conventions to the OpenTelemetry names and formats for metrics and metric metadata. See :ref:`Metric mapping service <legacy-otel-mappings>` for more information. 

.. raw:: html

   <embed>
      <h2>Track your Smart Agent instances<a name="track-smartagent" class="headerlink" href="#track-smartagent" title="Permalink to this headline">¶</a></h2>
   </embed>

The ``sfxagent.hostmetadata`` metric tracks the amount of Smart Agent instances installed in your environment. 

Find it using the :ref:`Metric Finder <metric-finder>`, and monitor it using :ref:`dashboards <dashboards>`.

