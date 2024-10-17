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
  :widths: 25 25 25 25
  :header-rows: 1

  * - I want to...
    - Why?
    - When?
    - See...
  * - Control data pre-ingest
    - To optimize data ingestion performance, reduce storage costs, allow for customization, and address privacy concerns by controlling the data sent to Splunk Observability Cloud.
    - Use this when you encounter redundant or unnecessary telemetry data, need to modify data to meet specific requirements, or must sanitize sensitive information before ingestion using the Collector.
    - :ref:`configure-remove`
  * - Work with tags or attributes
    - To add, modify, or remove tags or attributes on data for better organization and control.
    - Use this when learning how to modify tags and attributes on data before ingestion using the Collector.
    - :ref:`otel-tags`
  * - Obfuscate sensitive data in logs
    - To protect privacy by ensuring sensitive log data is not ingested.
    - Use this when sensitive information needs to be sanitized before ingestion using the Collector.
    - :ref:`attributes-processor-obfuscate-logs` 
  * - Obfuscate sensitive data in traces
    - To protect privacy by ensuring sensitive trace data is not ingested.
    - Use this when sensitive information needs to be sanitized before ingestion using the Collector.
    - :ref:`sensitive-data-controls`
  * - Filter unwanted logs
    - To prevent ingestion of unwanted log data by using filtering logic to include or exclude specific logs. This helps to optimize data flow and reduce costs.
    - Use this when you need to collect log data only from certain sources or of specific types, or when log ingestion load is too high.
    - :ref:`filter-processor-logs` 
  * - Filter unwanted metrics
    - To prevent ingestion of unwanted metric data by using filtering logic to include or exclude specific metrics. This helps to optimize data flow and reduce costs.
    - Use this when you need to collect metric data only from certain sources or of specific types, or when metric ingestion load is too high.
    - :ref:`filter-processor-metrics` 
  * - Filter unwanted traces
    - To prevent ingestion of unwanted trace data by using filtering logic to include or exclude specific traces. This helps to optimize data flow and reduce costs.
    - Use this when you need to collect trace data only from certain sources or of specific types, or when trace ingestion load is too high.
    - :ref:`filter-processor-spans` 
  * - Collect a fraction of logs using sampling
    - To reduce log ingestion volume and costs by using probabilistic sampling to collect a percentage of log data.
    - Use this when you need to collect only a sample set of log data which can help address ingesting too many logs.
    - :ref:`probabilistic-sampler-processor` 
  * - Collect a fraction of traces using sampling
    - To reduce trace ingestion volume and costs by using tail sampling to collect a percentage of trace data.
    - Use this when you need to collect only a sample set of trace data which can help address ingesting too many traces.
    - :ref:`tail-sampling-processor` 
  * - Collect custom metrics	
    - To send custom infrastructure and application metrics to Splunk Observability Cloud for deeper custom visibility.
    - Use this when instrumenting a service that isn't natively supported or when specific custom metrics are required.
    - :ref:`send-custom-metrics` 
  * - Collect Prometheus metrics	
    - To collect widely used Prometheus metrics and send them to Splunk Observability Cloud.
    - Use this when instrumenting a Prometheus source for monitoring.
    - :ref:`prometheus-receiver`        
  * - Collect host logs
    - To collect on-disk logs for analysis and monitoring.
    - Use this when you need to collect logs from the local system or host.
    - :ref:`filelog-receiver`
  * - Dynamically collect data from new data sources at runtime
    - To monitor data sources that may be created, removed, or recreated during runtime.
    - Use this when the receiver creator feature is needed to dynamically create receivers at runtime, based on configured rules and observer extensions.
    - :ref:`receiver-creator-receiver`
  * - Look for collector support for a specific environment
    - To ensure that your environment is compatible with the Collector.
    - Validate support for your target environment before deploying your Collector instance.
    - :ref:`requirements`
  * - Evaluate Collector deployment options like Ansible, Chef, PCF, or Puppet
    - Different deployment methods have unique requirements and features, allowing you to tailor the deployment to your specific needs.
    - Before deploying the Collector choose the most suitable deployment mechanism for your environment and requirements.
    - :ref:`otel_deployments`   
  * - Review release changes before	collector version upgrades
    - New Collector versions include important features, optimizations, and fixes, which are documented in the release notes.
    - Always review the release notes before upgrading the collector to understand the changes.
    - * :new-page:`Main changelog for the Splunk distribution of the Collector <https://github.com/signalfx/splunk-otel-collector/blob/main/CHANGELOG.md>` 
      * :new-page:`Collector Contrib repository <https://github.com/open-telemetry/opentelemetry-collector-contrib>` 
      * :new-page:`Upstream changelog (Contrib) <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/CHANGELOG.md>`
      * :new-page:`Upstream changelog (Core) <https://github.com/open-telemetry/opentelemetry-collector/blob/main/CHANGELOG.md>`

.. _collector-how-to-kubernetes:

Tasks specific to Kubernetes environments
==========================================

These tasks are specific to Kubernetes environments:

.. list-table::
  :width: 100%
  :widths: 25 25 25 25
  :header-rows: 1

  * - I want to...
    - Why?
    - When?
    - See...
  * - Collect Kubernetes events 
    - To enable the collection of Kubernetes events (events.k8s.io/v1) for enhanced observability.
    - Use this when you want Kubernetes events to be available in your observability setup for better insight into cluster activities.
    - :ref:`otel-k8s-events` 
  * - Filter collecting telemetry data at different levels in Kubernetes
    - To filter Kubernetes metrics, logs, and traces from specific clusters, namespaces, pods, or containers, reducing unnecessary data collection.
    - Use this when you need to minimize telemetry ingestion by excluding data from certain parts of the cluster or when focusing on specific Kubernetes data souces.
    - :ref:`filter-processor-kubernetes` 
  * - Review release changes before	collector version upgrades
    - New collector versions often include important features, optimizations, and fixes, which are documented in the release notes.
    - Always review the release notes before upgrading the collector to understand the changes.
    - * :new-page:`Changelog for the Helm chart <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/CHANGELOG.md>` 
      * :new-page:`Main changelog for the Splunk distribution of the Collector <https://github.com/signalfx/splunk-otel-collector/blob/main/CHANGELOG.md>` 
      * :new-page:`Collector Contrib repository <https://github.com/open-telemetry/opentelemetry-collector-contrib>` 
      * :new-page:`Upstream changelog (Contrib) <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/CHANGELOG.md>`
      * :new-page:`Upstream changelog (Core) <https://github.com/open-telemetry/opentelemetry-collector/blob/main/CHANGELOG.md>`
