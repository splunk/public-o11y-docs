.. _migrate-from-sa-to-otel:
.. _migrate-sa-to-otel-collector:
.. _otel-translation-tool:
.. _translatefx:

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
   smart-agent-migration-monitors.rst
   monitors-common-config

.. caution:: 
   
   The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs. 
   
   Smart Agent monitors are also being deprecated and will no longer be available to send data to Splunk Observability Cloud when they reach End of Support. Instead, you can use native OpenTelemetry receivers to gather data with the OTel Collector. See :ref:`migration-monitors-native`.

The Splunk Distribution of the OpenTelemetry Collector provides a unified way to receive, process, and export metrics, traces, and logs to Splunk Observability Cloud. If you're using the SignalFx Smart Agent (End Of Support) you must transition to the Collector. 

.. raw:: html

   <embed>
      <h2>Benefits<a name="migration-benefits" class="headerlink" href="#migration-benefits" title="Permalink to this headline">¶</a></h2>
   </embed>

The benefits of using the Collector are:

* Open standard based on OpenTelemetry.
* Support for new features such as code profiling.
* Ability to correlate data between different views within Splunk Observability Cloud with :ref:`Related Content <get-started-relatedcontent>`.
* Fluentd for log collection, deactivated by default for Linux and Windows.

.. raw:: html

   <embed>
      <h2>Migration process<a name="migration-process" class="headerlink" href="#migration-process" title="Permalink to this headline">¶</a></h2>
   </embed>

To migrate from the Smart Agent to the Collector, follow :ref:`these steps <migration-process>`.

.. raw:: html

   <embed>
      <h2>Smart Agent monitors and the Smart Agent Receiver<a name="sa-receiver-monitor" class="headerlink" href="#sa-receiver-monitor" title="Permalink to this headline">¶</a></h2>
   </embed>

While the Smart Agent is deprecated, Smart Agent :ref:`monitors <monitor-data-sources>` are not.

The Smart Agent metric monitors allow real-time insights into how your target services and applications are performing. These metric gathering utilities have an equivalent counterpart in the Collector.   

The :ref:`smartagent-receiver` is a :ref:`component of the Collector <otel-components>` that allows the embedding of existing Smart Agent monitors in your Collector metric pipelines. 

Learn :ref:`how to use Smart Agent monitors with the Collector <migration-monitors>`. 

.. raw:: html

   <embed>
      <h2>Track your Smart Agent instances<a name="track-smartagent" class="headerlink" href="#track-smartagent" title="Permalink to this headline">¶</a></h2>
   </embed>

The ``sfxagent.hostmetadata`` metric tracks the amount of Smart Agent instances installed in your environment. 

Find it using the :ref:`Metric Finder <metric-finder>`, and monitor it using :ref:`dashboards <dashboards>`.

