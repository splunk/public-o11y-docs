.. _collector-how-to:

****************************************************************
Use the Collector
****************************************************************

.. meta::
      :description: Learn how to perform common actions with the Collector-

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    Remove data pre-ingest <configure-remove.rst>

Learn how to carry out common tasks with the Splunk Distribution of OpenTelemetry Collector.

.. list-table::
  :width: 100%
  :widths: 40 60
  :header-rows: 1

  * - I want to...
    - See...
  * - Control data pre-ingest
    - :ref:`configure-remove`
  * - Collect logs	
    - :ref:`fluentd-receiver`
  * - Uniquely identify an instance	
    - :ref:`attributes-processor` 
  * - Remove attributes
    - :ref:`attributes-processor` 
  * - Filter Kubernetes elements 
    - :ref:`filter-processor-kubernetes` 
  * - Deactivate Kubernetes metrics
    - :ref:`kubernetes-cluster-receiver`
  * - Observe specific events	
    - :ref:`receiver-creator-receiver`
  * - Look for support for an environment	
    - :ref:`requirements`
  * - Look for changes between versions	
    - * :new-page:`Main changelog for the Splunk distribution of the Collector <https://github.com/signalfx/splunk-otel-collector/blob/main/CHANGELOG.md>` 
      * :new-page:`Changelog for the Helm chart <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/CHANGELOG.md>` 
      * :new-page:`Collector Contrib repository <https://github.com/open-telemetry/opentelemetry-collector-contrib.md>` 
      * :new-page:`Upstream changelog (Contrib) <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/CHANGELOG.md>`
      * :new-page:`Upstream changelog (Core) <https://github.com/open-telemetry/opentelemetry-collector/blob/main/CHANGELOG.md>`
