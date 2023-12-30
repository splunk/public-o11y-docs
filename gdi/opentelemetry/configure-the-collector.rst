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

    data-processing.rst
    tags.rst
    collector-how-to.rst
    Remove data pre-ingest <configure-remove.rst>    
    environment-variables.rst
    Internal metrics <metrics-internal-collector.rst>

For a quick overview of the Collector, see :ref:`otel-intro`.  

To learn how to install and configure the Collector, see :ref:`otel-install-platform`.

.. raw:: html

  <embed>
    <h2>Use the Collector<a name="collector-use-index" class="headerlink" href="#collector-use-index" title="Permalink to this headline">¶</a></h2>
  </embed>  

.. include:: /_includes/collector-works.rst

See also the following documents to understand how the Collector works, and how to use it:

* :ref:`otel-tags`
* :ref:`collector-how-to`
* :ref:`configure-remove`

.. raw:: html

  <embed>
    <h2>Components and services of the Collector<a name="collector-components-index" class="headerlink" href="#collector-components-index" title="Permalink to this headline">¶</a></h2>
  </embed>

By default, the Collector is configured as explained in :ref:`configure-the-collector-ootb`.

.. include:: /_includes/collector-components.rst

.. raw:: html

  <embed>
    <h2>Collector variables and internal metrics<a name="collector-internal-index" class="headerlink" href="#collector-internal-index" title="Permalink to this headline">¶</a></h2>
  </embed>  

The Collector operates using these environmental variables and internal metrics:

* :ref:`collector-env-var`
* :ref:`metrics-internal-collector`