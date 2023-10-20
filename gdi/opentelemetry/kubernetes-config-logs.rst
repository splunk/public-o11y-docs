.. _otel-kubernetes-config-logs:
.. _kubernetes-config-logs:

*********************************************************************************
Configure logs and events for Kubernetes
*********************************************************************************

.. meta::
      :description: Configure logs and events for the Splunk Distribution of OpenTelemetry Collector for Kubernetes.


.. note:: See how to configure the Collector for Kubernetes at :ref:`otel-kubernetes-config` and :ref:`otel-kubernetes-config-advanced`.

Starting on version 0.86.0, the Splunk Distribution of Collector for Kubernetes collects native OpenTelemetry logs by default.

The following applies:

* Use version 0.80.0 (or higher) of the Splunk OpenTelemetry Collector to correlate logs and traces in Istio environments. 

  * If you're unable to upgrade the Collector to the required version, use Fluentd for log collection and deploy the Helm chart with ``autodetect.istio=true``. See :new-page:`Splunk OpenTelemetry collector version 0.80.0 <https://github.com/signalfx/splunk-otel-collector-chart/releases/tag/splunk-otel-collector-0.80.0>` for more information.

* The Collector cannot collect Journald logs natively.

* Log collection is not supported in GKE Autopilot.

* See also :ref:`other rules and limitations for metrics and dimensions <metric-dimension-names>`. For instance, you can have up to 36 dimensions per MTS, otherwise the data point is dropped.

Use Fluentd to collect logs
===========================================================================

You can also use Fluentd to collect Kubernetes logs and send them through the Collector, which does all of the necessary metadata enrichment. 

Add the following line to your configuration to use Fluentd to collect logs.

.. code-block:: yaml

  logsEngine: fluentd

Add log files from Kubernetes host machines or volumes
===========================================================================

To add additional log files to be ingested from Kubernetes host machines and Kubernetes volumes, use ``agent.extraVolumes``, ``agent.extraVolumeMounts``, and ``logsCollection.extraFileLogs`` in the values.yaml file used to deploy the Collector for Kubernetes.

The following example shows how to add logs from Kubernetes host machines:

.. code-block:: yaml

  logsCollection:
    extraFileLogs:
      filelog/audit-log:
        include: [/var/log/kubernetes/apiserver/audit.log]
        start_at: beginning
        include_file_path: true
        include_file_name: false
        resource:
          com.splunk.source: /var/log/kubernetes/apiserver/audit.log
          host.name: 'EXPR(env("K8S_NODE_NAME"))'
          com.splunk.sourcetype: kube:apiserver-audit
  agent:
    extraVolumeMounts:
      - name: audit-log
        mountPath: /var/log/kubernetes/apiserver
    extraVolumes:
      - name: audit-log
        hostPath:
          path: /var/log/kubernetes/apiserver

Process multi-line logs
===========================================================================

The Splunk Distribution of OpenTelemetry Collector for Kubernetes supports parsing of multi-line logs to help read, understand, and troubleshoot the multi-line logs in a better way. 

To process multi-line logs, add the following section to your values.yaml configuration:

.. code-block:: yaml

  logsCollection:
    containers:
      multilineConfigs:
        - namespaceName:
            value: default
          podName:
            value: buttercup-app-.*
            useRegexp: true
          containerName:
            value: server
            firstEntryRegex: ^[^\s].*

Use :new-page:`regex101 <https://regex101.com/ >` to find a Golang regex that works for your format and specify it in the config file for the config option ``firstEntryRegex``.

Manage log ingestion using annotations
===========================================================================

The following annotations for log ingestion management are supported: 

* Use the ``splunk.com/index`` annotation on pods or namespaces to indicate which Splunk platform indexes you want to send logs to. Pod annotation will take precedence over namespace annotation when both are annotated. 

  * For example, to send logs from the ``kube-system`` namespace to the ``k8s_events`` index, use the command: 
  
  .. code-block:: yaml


    kubectl annotate namespace kube-system splunk.com/index=k8s_events

* Filter logs using pod or namespace annotations:

  * If ``logsCollection.containers.useSplunkIncludeAnnotation`` is ``false`` (default value), set the ``splunk.com/exclude`` annotation to ``true`` on pods or namespaces to exclude their logs from being ingested.
  
  * If ``logsCollection.containers.useSplunkIncludeAnnotation`` is ``true``, set the ``splunk.com/include`` annotation to ``true`` on pods or namespaces to only ingest their logs. All other logs will be ignored.

* Use the ``splunk.com/sourcetype`` annotation on a pod to overwrite the ``sourcetype`` field. If not set, it will default to ``kube:container:CONTAINER_NAME``.

Review performance benchmarks
===========================================================================

Configurations set using the Collector for Kubernetes Helm chart might have an impact on overall performance of log ingestion. The more receivers, processors, exporters, and extensions you add to any of the pipelines, the greater the performance impact.

The Collector for Kubernetes can exceed the default throughput of the :ref:`HTTP Event Collector (HEC) <splunk-hec-receiver>`. To address capacity needs, monitor the HEC throughput and back pressure on the Collector for Kubernetes deployments and, if necessary, add additional nodes.

The following table provides a summary of performance benchmarks run internally:

.. list-table:: Performance benchmarks
  :header-rows: 1
  :width: 100%
  :widths: 25 25 25 25

  * - Log generator count
    - Event size (byte)
    - Agent CPU usage
    - Agent EPS

  * - 1
    - 256
    - 1.8
    - 30,000

  * - 1
    - 516
    - 1.8
    - 28,000

  * - 1
    - 1024
    - 1.8
    - 24,000

  * - 5
    - 256
    - 3.2
    - 54,000

  * - 7
    - 256
    - 3
    - 52,000

  * - 10
    - 256
    - 3.2
    - 53,000

The data pipelines for these test runs involved reading container logs as they are being written, then parsing filename for metadata, enriching it with Kubernetes metadata, reformatting the data structure, and sending logs (without compression) to the Splunk HEC endpoint.

.. _otel-k8s-events:

Collect events
===========================================================================

Collect Kubernetes events
----------------------------------

To collect Kubernetes events using the Collector, you need to add ``k8sObjects`` to your configuration file, and set ``logsEnabled`` to ``true`` in either ``splunkObservability`` or ``splunkPlatform``. Events are processed in the ``logs`` pipeline.

``k8sObjects`` has the following fields:

* ``name``. :strong:`Required`. Name of the object, for example ``pods`` or ``namespaces``.

* ``mode``. Defines in which way this type of object is collected: either ``pull`` or ``watch``. ``pull`` by default.

  * ``pull`` mode reads all objects of this type using the list API at an interval. 
  
  * ``watch`` mode sets up a long connection using the watch API to get updates only.

* ``namespaces``. If specified, the Collector only collects objects from the specified namespaces. By default, the matching objects from all namespaces are included. 

* ``labelSelector``. Selects objects by label(s).

* ``fieldSelector``. Select objects by field(s).

* ``interval``. Only applies to ``pull`` mode. The interval at which object is pulled. ``60`` seconds by default. 

For example:

.. code:: yaml

  k8sObjects:
    - name: pods
      mode: pull
      label_selector: environment in (production),tier in (frontend)
      field_selector: status.phase=Running
      interval: 15m
    - name: events
      mode: watch
      group: events.k8s.io
      namespaces: [default]
  
For more information, refer to the Github documentation for the cluster receiver Helm chart deployment at :new-page:`Kubernetes objects collection using OpenTelemetry Kubernetes Object Receiver <https://github.com/signalfx/splunk-otel-collector-chart/blob/da261f5c75444e50cc68e93164587bfec43b7270/helm-charts/splunk-otel-collector/values.yaml#L466C5>`.

Collect journald events
----------------------------------

The Splunk Distribution of OpenTelemetry Collector for Kubernetes can collect journald events from Kubernetes environments. To process journald events, add the following section to your values.yaml configuration:

.. code-block:: yaml

  logsCollection:
    journald:
      enabled: true
      directory: /run/log/journal
      # List of service units to collect and configuration for each. Update the list as needed.
      units:
        - name: kubelet
          priority: info
        - name: docker
          priority: info
        - name: containerd
          priority: info
      # Optional: Route journald logs to a separate Splunk Index by specifying the index
      # value. Make sure the index exists in Splunk and is configured to receive HEC
      # traffic (not applicable to Splunk Observability Cloud).
      index: ""