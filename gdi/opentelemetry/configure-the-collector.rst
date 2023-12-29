.. _otel-configuration:

****************************************************************
Understand and use the Collector
****************************************************************

.. meta::
      :description: Configure the Splunk Distribution of OpenTelemetry Collector. There are a variety of default configuration files available, as well additional components that can be configured.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    environment-variables.rst
    Internal metrics <metrics-internal-collector.rst>
    data-processing.rst
    tags.rst
    collector-how-to.rst
    Remove data pre-ingest <configure-remove.rst>    

Read the following to better understand how the Collector works:

* :ref:`collector-env-var`
* :ref:`metrics-internal-collector`
* :ref:`otel-data-processing`
* :ref:`otel-tags`

.. raw:: html

  <embed>
    <h2>Components of the Collector<a name="collector-components-index" class="headerlink" href="#collector-components-index" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/collector-components.rst

By default, the Splunk Distribution is configured as explained in :ref:`configure-the-collector-ootb`. You can also use a set of :ref:`additional Collector components <otel-components>` that you can configure separately. 

.. note:: See how to perform common actions and tasks with the Collector at :ref:`collector-how-to`. To understand how data is processed, see :ref:`otel-data-processing`.

.. raw:: html

  <embed>
    <h2>Use the Collector<a name="collector-components-index" class="headerlink" href="#collector-components-index" title="Permalink to this headline">¶</a></h2>
  </embed>  

See the following:

* :ref:`otel-data-processing`
* :ref:`otel-tags`
* :ref:`collector-how-to`
* :ref:`configure-remove`