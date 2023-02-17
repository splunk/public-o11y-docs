.. _otel-install-platform:

***********************************************************************************
Install and deploy the Collector 
***********************************************************************************

.. meta::
      :description: Describes platform-specific installation information for the Splunk Distribution of OpenTelemetry Collector.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    Deployment modes <deployment-modes.rst>
    Kubernetes <install-k8s.rst>
    Linux <install-linux.rst>
    Windows (script) <install-windows.rst>
    Windows (manual) <install-windows-manual.rst>
    deployments/otel-deployments.rst
    uninstall-the-collector.rst

See the available options to install the Splunk Distribution of the OpenTelemetry Collector.

.. _collector-guided-install:

.. raw:: html

  <embed>
    <h2>Guided install for the Collector<a name="collector-guided-install" class="headerlink" href="#collector-guided-install" title="Permalink to this headline">¶</a></h2>
  </embed>

Splunk Observability Cloud offers a guided setup to install the Collector:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.
  
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.

#. Select one of the platforms in the :guilabel:`Splunk OpenTelemetry Collector` section.

#. Follow the step-by-step process provided in the platform's guided setup.

.. raw:: html

  <embed>
    <h2>Install using packages<a name="collector-package-install" class="headerlink" href="#collector-package-install" title="Permalink to this headline">¶</a></h2>
  </embed>

The Splunk Distribution of OpenTelemetry Collector is supported on Kubernetes, Linux, and Windows. Deploy one of the following packages to gather data for Infrastructure Monitoring, APM, and Log Observer:

* Splunk Distribution of OpenTelemetry Collector for Kubernetes or ``splunk-otel-collector-chart``. See :ref:`Install on Kubernetes <otel-install-k8s>`.
* Splunk Distribution of OpenTelemetry Collector for Linux or ``splunk-otel-collector``. See :ref:`Install on Linux <otel-install-linux>`.
* Splunk Distribution of OpenTelemetry Collector for Windows or ``splunk-otel-collector``. See :ref:`Install on Windows <otel-install-windows>` or :ref:`Install on Windows (manual) <otel-install-windows-manual>`.

.. raw:: html

  <embed>
    <h2>Components of the Collector<a name="collector-components-index" class="headerlink" href="#collector-components-index" title="Permalink to this headline">¶</a></h2>
  </embed>

The Collector uses the components listed in the following table:

.. list-table::
  :width: 100%
  :widths: 20 80
  :header-rows: 1

  * - Component
    - Description
  * - :ref:`Receivers <monitor-data-sources>`
    - Get data into the Collector using receivers. Receivers, which can be push or pull based, support one or more data sources. You must configure one or more receivers. By default, no receivers are configured.
  * - Processors
    - Control the data you send using processors. Processors sit between receivers and exporters, reading and sometimes operating on data as it flows through the pipeline. Processors are optional, but you should include processors in your configuration. The order in which processors are listed in the ``processors`` section of the configuration is relevant.
  * - Exporters
    - Send data to one or more destinations using exporters. Exporters, which can be push or pull based, support one or more data sources.

To learn more about Collector components, see :ref:`otel-components`.

When configured, enable these components using pipelines within the service section of the configuration. 

.. raw:: html

  <embed>
    <h2>Collector service<a name="collector-service" class="headerlink" href="#collector-service" title="Permalink to this headline">¶</a></h2>
  </embed>

The service section of the Collector contains two subsections: extensions and pipelines. The extensions section is where you optionally enable any extensions you have configured, and the pipelines section is where you define one or more pipelines, each of which consists of receivers, processors (optional), and exporters. The service section's two subsections are described in the following table.

.. list-table::
  :width: 100%
  :widths: 20 80
  :header-rows: 1

  * - Component
    - Description
  * - Extension
    - Provide capabilities that can be added to the Collector, but which do not require direct access to telemetry data and are not part of pipelines.
  * - Pipeline
    - Pipelines can be traces, metrics, or logs. Pipelines consist of a set of receivers, processors, and exporters. Each receiver, processor, and exporter must be defined in the configuration outside of the service section to be included in a pipeline.

Here's an example configuration:

.. code-block:: yaml

  receivers:
    otlp:
      protocols:
        grpc:
        http:

  processors:
    batch:

  exporters:
    otlp:
      endpoint: otelcol:4317

  extensions:
    health_check:
    pprof:
    zpages:

  service:
    extensions: [health_check,pprof,zpages]
    pipelines:
      traces:
        receivers: [otlp]
        processors: [batch]
        exporters: [otlp]
      metrics:
        receivers: [otlp]
        processors: [batch]
        exporters: [otlp]
      logs:
        receivers: [otlp]
        processors: [batch]
        exporters: [otlp]


