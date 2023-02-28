.. _otel-kubernetes-config:

*********************************************************************************
Advanced configuration for Kubernetes
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

The following sections describe available settings for configuring the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

Configure the Helm chart
===============================

The :new-page:`values.yaml <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml>` lists all supported configurable parameters for the Helm chart, along with a detailed explanation of each parameter. Review values.yaml to understand how to configure this chart.

The Helm chart can also be configured to support different use cases, such as trace sampling and sending data through a proxy server. See :new-page:`Examples of chart configuration <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/README.md>` for more information.

Configure the following required values to send data to Splunk Enterprise or Splunk Cloud:

.. code-block:: yaml

   splunkPlatform:
     # Required for Splunk Enterprise or Splunk Cloud.
     # Add a URL for the Splunk instance to send data to.
     # For example, "http://X.X.X.X:8088/services/collector".
     # Setting this parameter activates Splunk Platform as a destination.
      endpoint: ""
      # Required for Splunk Enterprise or Splunk Cloud if `endpoint` is specified.
      token: ""
      # The Splunk HTTP Event Collector (HEC) token.

Configure the following required values to send data to Splunk Observability Cloud:

.. code-block:: yaml

   splunkObservability:
   # Required for Observability Cloud.
   # Add the Observability Cloud realm to send telemetry data to.
   # Setting this parameter activates Observability Cloud as a destination.
     accessToken: xxxxxx
     # The Observability Cloud org access token.
     realm: us0
     # Required for Observability Cloud if `realm` is specified.
   clusterName: my-k8s-cluster

See :ref:`admin-org-tokens` for information on creating and managing your access token.

Configure a cloud provider
=================================

If applicable, use the ``cloudProvider`` parameter to provide information about the cloud provider. The following options are supported:

* ``aws`` for Amazon Web Services
* ``gcp`` for Google Cloud Platform
* ``azure`` for Microsoft Azure

For example:

.. code-block:: yaml

   splunkObservability:
     accessToken: xxxxxx
     realm: us0
   clusterName: my-k8s-cluster
   cloudProvider: aws

Configure the Kubernetes distribution
============================================

If applicable, use the ``distribution`` parameter to provide information about the underlying Kubernetes deployment. This parameter allows the connector to automatically scrape additional metadata. The following options are supported:

* ``aks`` for Azure AKS
* ``eks`` for Amazon EKS
* ``eks/fargate`` for Amazon EKS with Fargate profiles
* ``gke`` for Google GKE or Standard mode
* ``gke/autopilot`` for Google GKE or Autopilot mode
* ``openshift`` for Red Hat OpenShift

For example:

.. code-block:: yaml

   splunkObservability:
     accessToken: xxxxxx
     realm: us0
   clusterName: my-k8s-cluster
   distribution: gke

Configure the deployment environment
===========================================

If applicable, use the ``environment`` parameter to specify an additional ``deployment.environment`` attribute to be added to all telemetry data. This attribute helps Observability Cloud users investigate data coming from different sources separately. Example values include ``development``, ``staging``, and ``production``.

.. code-block:: yaml

   splunkObservability:
     accessToken: xxxxxx
     realm: us0
   environment: production

Deactivate particular types of telemetry
============================================

By default, OpenTelemetry sends only metrics and traces to Observability Cloud and sends only logs to Splunk Platform. You can activate or deactivate any kind of telemetry data collection for a specific destination. For example, with the following configuration, the Collector sends all collected telemetry data to Observability Cloud and Splunk Platform, assuming you've properly configured them.

.. code-block:: yaml

   splunkObservability:
     metricsEnabled: true
     tracesEnabled: true
     logsEnabled: true
   splunkPlatform:
     metricsEnabled: true
     logsEnabled: true

Configure Windows worker nodes
===============================================

The Splunk Distribution of OpenTelemetry Collector for Kubernetes supports collecting metrics, traces, and logs (using OpenTelemetry native logs collection only) from Windows nodes. All Windows images are available in the ``quay.io/signalfx/splunk-otel-collector-windows`` repository.

Use the following values.yaml configuration to install the Helm chart on Windows worker nodes:

.. code-block:: yaml

   isWindows: true
   image:
     otelcol:
       repository: quay.io/signalfx/splunk-otel-collector-windows
   logsEngine: otel
   readinessProbe:
     initialDelaySeconds: 60
   livenessProbe:
     initialDelaySeconds: 60

If you have both Windows and Linux worker nodes in your Kubernetes cluster, you need to install the Helm chart twice. One of the installations with the default configuration set to ``isWindows: false`` is applied on Linux nodes. The second installation with the values.yaml configuration (shown in the previous example) is applied on Windows nodes.

Deactivate the ``clusterReceiver`` on one of the installations to avoid cluster-wide metrics duplication. To do this, add the following lines
to the values.yaml configuration of one of the installations:

.. code-block:: yaml

   clusterReceiver:
     activated: false

Configure Google Kubernetes Engine Autopilot
===========================================================

To run the Collector in Google Kubernetes Engine Autopilot mode, set the ``distribution`` option to ``gke/autopilot``, as shown in the following example:

.. code-block:: yaml

   distribution: gke/autopilot

Search for "Autopilot overview" on the :new-page:`Google Cloud documentation site <https://cloud.google.com/docs>` for more information.

.. note::
   Native OpenTelemetry logs collection is not yet supported in Google Kubernetes Engine Autopilot mode.

The Collector agent daemonset can have problems scheduling in Autopilot mode. If this happens, do the following to assign the daemonset a higher priority class to ensure that the daemonset pods are always present on each node:

Create a new priority class for the Collector agent:

.. code-block:: yaml

   cat <<EOF | kubectl apply -f -
   apiVersion: scheduling.k8s.io/v1
   kind: PriorityClass
   metadata:
     name: splunk-otel-agent-priority
   value: 1000000
   globalDefault: false
   description: "Higher priority class for the Splunk Distribution of OpenTelemetry Collector pods."
   EOF

Use the created priority class in the helm install/upgrade command using the ``--set="priorityClassName=splunk-otel-agent-priority"`` argument, or add the following line to your custom values.yaml:

.. code-block:: yaml

   priorityClassName: splunk-otel-agent-priority


.. _config-eks-fargate:

Configure EKS Fargate
===============================

To run the Collector in the Amazon Elastic Kubernetes Service with Fargate profiles, set the required ``distribution`` value to ``eks/fargate``, as shown in the following example:

.. code-block:: yaml

   distribution: eks/fargate

.. note::
   Fluentd and native OpenTelemetry logs collection are not yet automatically configured in EKS with Fargate profiles.

This distribution operates similarly to the ``eks`` distribution, but with the following distinctions:

* The Collector agent daemonset is not applied since Fargate does not support daemonsets. Any desired Collector instances running as agents must be configured manually as sidecar containers in your custom deployments. This includes any application logging services like Fluentd. Set ``gateway.activated`` to ``true`` and configure your instrumented applications to report metrics, traces, and logs to the gateway's ``<installed-chart-name>-splunk-otel-collector`` service address. Any desired agent instances that would run as a daemonset should instead run as sidecar containers in your pods.
* Since Fargate nodes use a VM boundary to prevent access to host-based resources used by other pods, pods are not able to reach their own kubelet. The cluster receiver for the Fargate distribution has two primary differences between regular ``eks`` to work around this limitation:
   * The configured cluster receiver is deployed as a two-replica StatefulSet instead of a Deployment, and uses a Kubernetes Observer extension that discovers the cluster's nodes and, on the second replica, its pods for user-configurable receiver creator additions.Using this observer dynamically creates the Kubelet Stats receiver instances that report kubelet metrics for all observed Fargate nodes. The first replica monitors the cluster with a ``k8s_cluster`` receiver, and the second cluster monitors all kubelets except its own (due to an EKS/Fargate networking restriction).
   * The first replica's Collector monitors the second's kubelet. This is made possible by a Fargate-specific ``splunk-otel-eks-fargate-kubeletstats-receiver-node`` node label. The Collector's ClusterRole for ``eks/fargate`` allows the ``patch`` verb on ``nodes`` resources for the default API groups to allow the cluster receiver's init container to add this node label for designated self monitoring.

Collect logs
=========================

The Helm chart currently uses Fluentd for Kubernetes logs collection. Logs collected with Fluentd are sent through the Collector agent, which does all of the necessary metadata enrichment. The OpenTelemetry Collector also has native functionality for logs collection, which will soon be migrated from Fluentd to the OpenTelemetry logs collection.

Add the following line to your configuration to use OpenTelemetry logs collection instead of Fluentd:

.. code-block:: yaml

   logsEngine: otel

The following are known limitations of native OpenTelemetry logs collection:

* The ``service.name`` attribute is not automatically constructed in an Istio environment, which means that correlation between logs and traces does not work in Splunk Observability Cloud. Use Fluentd for logs collection if you deploy the Helm chart with ``autodetect.istio=true``.
* Journald logs cannot be natively collected by the Collector at this time.
* Logs collection is not supported in GKE Autopilot at this time.
* See also :ref:`other rules and limitations for metrics and dimensions <metric-dimension-names>`. For instance, you can have up to 36 dimensions per MTS, otherwise the data point is dropped.

Add log files from Kubernetes host machines or volumes
----------------------------------------------------------

Add additional log files to be ingested from Kubernetes host machines and Kubernetes volumes by configuring ``agent.extraVolumes``, ``agent.extraVolumeMounts``, and ``logsCollection.extraFileLogs`` in the values.yaml file used to deploy the Collector for Kubernetes.

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
-------------------------------------

The Splunk Distribution of OpenTelemetry Collector for Kubernetes supports parsing of multi-line logs to help read, understand, and troubleshoot the multi-line logs in a better way. Process multi-line logs by adding the following section to your values.yaml configuration:

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

Use :new-page:`regex101 <https://regex101.com/ >` to find a golang regex that works for your format and specify it in the config file for the config option ``firstEntryRegex``.

Collect journald events
------------------------------

The Splunk Distribution of OpenTelemetry Collector for Kubernetes can collect journald events from Kubernetes environment. Process journald events by adding the following section to your values.yaml configuration:

.. code-block:: yaml

  logsCollection:
    journald:
      activated: true
      directory: /run/log/journal
      # List of service units to collect and configuration for each. Update the list as needed.
      units:
        - name: kubelet
          priority: info
        - name: docker
          priority: info
        - name: containerd
          priority: info
      # Optional: Route journald logs to a seperate Splunk Index by specifying the index
      # value. Make sure the index exists in Splunk and is configured to receive HEC
      # traffic (not applicable to Observability Cloud).
      index: ""

Review performance benchmarks
------------------------------------------------------------

Some configurations used with the OpenTelemetry Collector (as set using the Collector for Kubernetes Helm chart) can have an impact on overall performance of log ingestion. The more receivers, processors, exporters, and extensions that are added to any of the pipelines, the greater the performance impact.

The Splunk Distribution of OpenTelemetry Collector for Kubernetes can exceed the default throughput of the HTTP Event Collector (HEC). To address capacity needs, monitor the HEC throughput and back pressure on the Collector for Kubernetes deployments and be prepared to add additional nodes as needed.

The following table provides a summary of performance benchmarks run internally:

.. list-table:: Performance benchmarks
   :header-rows: 1
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

Run the container in non-root user mode
==================================================

Collecting logs often requires reading log files that are owned by the root user. By default, the container runs with ``securityContext.runAsUser = 0``, which gives the root user permission to read those files. To run the container in non-root user mode, set ``.agent.securityContext`` to ``20000`` to cause the container to run the required file system operations as UID and GID ``20000`` (this can be any other UID and GUI).

.. note::
   Setting the ``containerRuntime:`` parameter to ``cri-o`` did not work during internal testing for logs collection.

Override a control plane configuration
==============================================================

If ``agent.controlPlaneEnabled=true``, the Helm chart sets up the Collector to collect metrics from the control plane.

To collect control plane metrics, the Helm chart uses the Collector on each node to use the receiver creator to represent control plane receivers at runtime. The receiver creator has a set of discovery rules that know which control plane receivers to create. The default discovery rules can vary depending on the Kubernetes distribution and version. See :ref:`receiver-creator-receiver` for more information.

If your control plane is using non-standard specifications, then you can provide a custom configuration to allow the Collector to successfully connect to it.

The Collector relies on pod-level network access to collect metrics from the control plane pods. Since most cloud Kubernetes as a service distributions don't expose the control plane pods to the end user, collecting metrics from these distributions is not supported.

The following distributions are supported:

* Kubernetes 1.22 (kops created)
* OpenShift version 4.9

The following distributions are not supported:

* AKS
* EKS
* EKS/Fargate
* GKE
* GKE/Autopilot

See the :new-page:`agent template <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/templates/config/_otel-agent.tpl>` for the  default configurations for the control plane receivers.

Refer to the following documentation for information on the configuration options and supported metrics for each control plane receiver:

* :new-page:`CoreDNS <https://docs.splunk.com/Observability/gdi/coredns/coredns.html>`
* :new-page:`Kubernetes controller manager <https://docs.splunk.com/Observability/gdi/kube-controller-manager/kube-controller-manager.html>`
* :new-page:`Kubernetes API server <https://docs.splunk.com/Observability/gdi/kubernetes-apiserver/kubernetes-apiserver.html>`
* :new-page:`Kubernetes proxy <https://docs.splunk.com/Observability/gdi/kubernetes-proxy/kubernetes-proxy.html>`
* :new-page:`Kubernetes scheduler <https://docs.splunk.com/Observability/gdi/kubernetes-scheduler/kubernetes-scheduler.html>`

There is a known limitation when using the Kubernetes proxy control plane receiver. When using a kops created Kubernetes cluster, a network connectivity issue has been reported that prevents proxy metrics from being collected. The limitation can be addressed by updating the kubeProxy metric bind address in the kops cluster specification:

#. Set ``kubeProxy.metricsBindAddress: 0.0.0.0`` in the kops cluster specification.
#. Run ``kops update cluster {cluster_name}`` and ``kops rolling-update cluster {cluster_name}`` to deploy the change.

Using custom configurations for nonstandard control plane components
-----------------------------------------------------------------------------

You can override the default configuration values used to connect to the control plane. If your control plane uses nonstandard ports or custom TLS settings, you need to override the default configurations. The following example shows how to connect to a nonstandard API server that uses port 3443 for metrics and custom TLS certs stored in the /etc/myapiserver/ directory.

.. code-block:: yaml

   agent:
     config:
       receivers:
         receiver_creator:
           receivers:
             # Template for overriding the discovery rule and configuration.
             # smartagent/{control_plane_receiver}:
             #   rule: {rule_value}
             #   config:
             #     {config_value}
             smartagent/kubernetes-apiserver:
               rule: type == "port" && port == 3443 && pod.labels["k8s-app"] == "kube-apiserver"
               config:
                 clientCertPath: /etc/myapiserver/clients-ca.crt
                 clientKeyPath: /etc/myapiserver/clients-ca.key
                 skipVerify: true
                 useHTTPS: true
                 useServiceAccount: false

Add additional telemetry sources
===========================================

Use the ``autodetect`` configuration option to activate additional telemetry sources.

Set ``autodetect.prometheus=true`` if you want the Collector to scrape Prometheus metrics from pods that have generic Prometheus-style annotations. Add the following annotations on pods to allow a fine control of the scraping process:

* ``prometheus.io/scrape: true``: The default configuration scrapes all pods. If set to ``false``, this annotation excludes the pod from the scraping process.
* ``prometheus.io/path``: The path to scrape the metrics from. The default value is ``/metrics``.
* ``prometheus.io/port``: The port to scrape the metrics from. The default value is ``9090``.

If the Collector is running in an Istio environment, set ``autodetect.istio=true`` to make sure that all traces, metrics, and logs reported by Istio are collected in a unified manner.

For example, use the following configuration to activate automatic detection of both Prometheus and Istio telemetry sources:

.. code-block:: yaml

   splunkObservability:
     accessToken: xxxxxx
     realm: us0
   clusterName: my-k8s-cluster
   autodetect:
     istio: true
     prometheus: true

Override the underlying OpenTelemetry agent configuration
==============================================================

You can override the underlying OpenTelemetry agent configuration to use your own OpenTelemetry Agent configuration. To do this, include a custom configuration in the ``agent.config`` parameter in the values.yaml configuration. This custom configuration is merged into the default agent configuration. Parts of the configuration (for example, ``service``, ``pipelines``, ``logs``, and ``processors`` need to be fully re-defined after the files are merged.

The following example shows a values.yaml file with custom gateway values:

.. code-block:: yaml

   clusterName: my-cluster
   splunkObservability:
     realm: us0
     accessToken: my-access-token

   agent:
     config:
       exporters:
         otlp:
           endpoint: <custom-gateway-url>:4317
           insecure: true
         signalfx:
           ingest_url: http://<custom-gateway-url>:9943
           api_url: http://<custom-gateway-url>:6060
       service:
         pipelines:
           traces:
             exporters: [otlp, signalfx]
           metrics:
             exporters: [otlp]
           logs:
             exporters: [otlp]

   clusterReceiver:
     config:
       exporters:
         signalfx:
           ingest_url: http://<custom-gateway-url>:9943
           api_url: http://<custom-gateway-url>:6060
