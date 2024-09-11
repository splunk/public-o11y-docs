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

Browse the table below to learn how to carry out common tasks with the Splunk Distribution of the OpenTelemetry Collector.

.. list-table::
  :width: 100%
  :widths: 30 30 40
  :header-rows: 1

  * - I want to...
    - Why and when?
    - See...
  * - Control data pre-ingest
    - Because...
    - :ref:`configure-remove`
  * - Obfuscate sensitive data
    - Because...
    - :ref:`sensitive-data-controls`  
  * - Uniquely identify an instance	
    - Because...
    - :ref:`attributes-processor` 
  * - Use tags or attributes
    - Because...
    - :ref:`otel-tags`   
  * - Remove attributes
    - Because...
    - :ref:`attributes-processor` 
  * - Collect custom metrics	
    - Because...
    - :new-page:`Receive any custom metric with the Collector <https://opentelemetry.io/blog/2023/any-metric-receiver/>`
  * - Collect Prometheus metrics	
    - Because...
    - :ref:`prometheus-receiver`        
  * - Collect logs	
    - Because...
    - :ref:`filelog-receiver`
  * - Observe specific events	
    - Because...
    - :ref:`receiver-creator-receiver`
  * - Look for support for an environment	
    - Because...
    - :ref:`requirements`
  * - Collector deployment options, such as Amazon Fargate, Ansible, Chef, PCF, or Puppet
    - Because...
    - :ref:`otel_deployments`   
  * - Look for changes between versions	
    - Because...
    - * :new-page:`Main changelog for the Splunk distribution of the Collector <https://github.com/signalfx/splunk-otel-collector/blob/main/CHANGELOG.md>` 
      * :new-page:`Changelog for the Helm chart <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/CHANGELOG.md>` 
      * :new-page:`Collector Contrib repository <https://github.com/open-telemetry/opentelemetry-collector-contrib>` 
      * :new-page:`Upstream changelog (Contrib) <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/CHANGELOG.md>`
      * :new-page:`Upstream changelog (Core) <https://github.com/open-telemetry/opentelemetry-collector/blob/main/CHANGELOG.md>`

Tasks specific to Kubernetes environments
==========================================

These tasks are specific to Kubernetes environments:

.. list-table::
  :width: 100%
  :widths: 30 30 40
  :header-rows: 1

  * - I want to...
    - Why and when?
    - See...
  * - Collect Kubernetes events 
    - Because...
    - :ref:`otel-k8s-events` 
  * - Filter Kubernetes elements 
    - Because...
    - :ref:`filter-processor-kubernetes` 
  * - Deactivate Kubernetes metrics
    - Because...
    - :ref:`kubernetes-cluster-receiver`
