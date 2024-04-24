.. _collector-how-to:

****************************************************************
Use the Collector: How to perform common tasks
****************************************************************

.. meta::
      :description: Learn how to perform common actions with the Collector.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

Browse the table below to learn how to carry out common tasks with the Splunk Distribution of OpenTelemetry Collector.

.. list-table::
  :width: 100%
  :widths: 40 60
  :header-rows: 1

  * - I want to...
    - See...
  * - Control data pre-ingest
    - :ref:`configure-remove`
  * - Obfuscate sensitive data
    - :ref:`sensitive-data-controls`  
  * - Uniquely identify an instance	
    - :ref:`attributes-processor` 
  * - Use tags or attributes
    - :ref:`otel-tags`   
  * - Remove attributes
    - :ref:`attributes-processor` 
  * - Collect custom metrics	
    - :new-page:`Receive any custom metric with the Collector <https://opentelemetry.io/blog/2023/any-metric-receiver/>`
  * - Collect Prometheus metrics	
    - :ref:`prometheus-receiver`        
  * - Collect logs	
    - :ref:`filelog-receiver`
  * - Collect Kubernetes events 
    - :ref:`otel-k8s-events` 
  * - Filter Kubernetes elements 
    - :ref:`filter-processor-kubernetes` 
  * - Deactivate Kubernetes metrics
    - :ref:`kubernetes-cluster-receiver`
  * - Observe specific events	
    - :ref:`receiver-creator-receiver`
  * - Look for support for an environment	
    - :ref:`requirements`
  * - Collector deployment options, such as Amazon Fargate, Ansible, Chef, PCF, or Puppet
    - :ref:`otel_deployments`   
  * - Look for changes between versions	
    - * :new-page:`Main changelog for the Splunk distribution of the Collector <https://github.com/signalfx/splunk-otel-collector/blob/main/CHANGELOG.md>` 
      * :new-page:`Changelog for the Helm chart <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/CHANGELOG.md>` 
      * :new-page:`Collector Contrib repository <https://github.com/open-telemetry/opentelemetry-collector-contrib>` 
      * :new-page:`Upstream changelog (Contrib) <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/CHANGELOG.md>`
      * :new-page:`Upstream changelog (Core) <https://github.com/open-telemetry/opentelemetry-collector/blob/main/CHANGELOG.md>`
