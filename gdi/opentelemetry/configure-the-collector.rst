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

.. raw:: html

  <embed>
    <h2>Use the Collector<a name="collector-use-index" class="headerlink" href="#collector-use-index" title="Permalink to this headline">¶</a></h2>
  </embed>  

See the following to understand how the Collector works, and how to use it:

* :ref:`collector-env-var`
* :ref:`metrics-internal-collector`
* :ref:`otel-data-processing`
* :ref:`otel-tags`
* :ref:`collector-how-to`
* :ref:`configure-remove`

.. raw:: html

  <embed>
    <h2>Components and services of the Collector<a name="collector-components-index" class="headerlink" href="#collector-components-index" title="Permalink to this headline">¶</a></h2>
  </embed>

By default, the Collector is configured as explained in :ref:`configure-the-collector-ootb`.

.. include:: /_includes/collector-components.rst
