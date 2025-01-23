.. _otel-components:

******************************************
Collector components
******************************************

.. meta::
    :description: Learn about the components that make up the Splunk Observability Cloud OpenTelemetry Collector.

.. toctree::
    :titlesonly:
    :hidden:


    Receivers <components/a-components-receivers.rst>
    Processors <components/a-components-processors.rst>
    Exporters <components/a-components-exporters.rst>
    Extensions <components/a-components-extensions.rst>  
    Connectors <components/a-components-connectors.rst>            


The OpenTelemetry Collector includes the following component types:

* :ref:`Receivers <collector-components-receivers>`: Get data into the Collector from multiple sources.
* :ref:`Processors <collector-components-processors>`: Perform operations on data before it's exported. For example, filtering.
* :ref:`Exporters <collector-components-exporters>`: Send data to one or more backends or destinations. 
* :ref:`Extensions <collector-components-extensions>`: Extend the capabilities of the Collector.
* :ref:`Connectors <collector-components-connectors>`: Send telemetry data between different collector pipelines.

You can activate components by configuring :ref:`service pipelines <otel-data-processing>` in the Collector configuration. See :ref:`otel-configuration` to learn how to define multiple instances of components as well as their pipelines.

The Splunk Distribution of the OpenTelemetry Collector includes and supports the components listed on this doc.

.. note:: The following lists might not contain all the latest additions. For a complete list of Collector components, including components that aren't included in the Splunk Distribution of OpenTelemetry Collector, see the ``opentelemetry-contrib`` repository in GitHub.

.. _collector-components-receivers:

.. raw:: html

  <embed>
    <h2>Receivers<a name="collector-components-receivers" class="headerlink" href="#collector-components-receivers" title="Permalink to this headline">¶</a></h2>
  </embed>

.. raw:: html

   <div class="include-start" id="otel-receivers-table.rst"></div>

.. include:: /_includes/gdi/otel-receivers-table.rst

.. raw:: html

   <div class="include-stop" id="otel-receivers-table.rst"></div>


.. _collector-components-processors:

.. raw:: html

  <embed>
    <h2>Processors<a name="collector-components-processors" class="headerlink" href="#collector-components-processors" title="Permalink to this headline">¶</a></h2>
  </embed>

.. raw:: html

   <div class="include-start" id="collector-available-processors.rst"></div>

.. include:: /_includes/gdi/collector-available-processors.rst

.. raw:: html

   <div class="include-stop" id="collector-available-processors.rst"></div>


.. _collector-components-exporters:
.. _otel-exporters:

.. raw:: html

  <embed>
    <h2>Exporters<a name="collector-components-exporters" class="headerlink" href="#collector-components-exporters" title="Permalink to this headline">¶</a></h2>
  </embed>

.. raw:: html

   <div class="include-start" id="collector-available-exporters.rst"></div>

.. include:: /_includes/gdi/collector-available-exporters.rst

.. raw:: html

   <div class="include-stop" id="collector-available-exporters.rst"></div>

.. _collector-components-extensions:

.. raw:: html

  <embed>
    <h2>Extensions<a name="collector-components-extensions" class="headerlink" href="#collector-components-extensions" title="Permalink to this headline">¶</a></h2>
  </embed>

.. raw:: html

   <div class="include-start" id="collector-available-extensions.rst"></div>

.. include:: /_includes/gdi/collector-available-extensions.rst

.. raw:: html

   <div class="include-stop" id="collector-available-extensions.rst"></div>

.. _collector-components-connectors:

.. raw:: html

  <embed>
    <h2>Connectors<a name="collector-components-connectors" class="headerlink" href="#collector-components-connectors" title="Permalink to this headline">¶</a></h2>
  </embed>

A connector connects different pipelines and helps you send telemetry data between them. A connector acts as an exporter to one pipeline and a receiver to another. 

Each pipeline in the OpenTelemetry Collector acts on one type of telemetry data. If you need to process one form of telemetry data into another one, route the data accordingly to its proper collector pipeline.

.. raw:: html

   <div class="include-start" id="collector-available-connectors.rst"></div>

.. include:: /_includes/gdi/collector-available-connectors.rst

.. raw:: html

   <div class="include-stop" id="collector-available-connectors.rst"></div>

.. raw:: html

  <embed>
    <h2>Next steps<a name="next-steps" class="headerlink" href="#next-steps" title="Permalink to this headline">¶</a></h2>
  </embed>

See the following docs:

* :ref:`otel-install-platform`
* :ref:`collector-how-to`
