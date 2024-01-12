.. _otel-kubernetes-config-advanced:

*********************************************************************************
Advanced configuration for Kubernetes
*********************************************************************************

.. meta::
      :description: Advanced configurations for the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

See the following advanced configuration options for the Collector for Kubernetes.

For basic Helm chart configuration, see :ref:`otel-kubernetes-config`. For log configuration, see :ref:`otel-kubernetes-config-logs`.

.. note::

  The :new-page:`values.yaml <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml>` file lists all supported configurable parameters for the Helm chart, along with a detailed explanation of each parameter. :strong:`Review it to understand how to configure this chart`.

  The Helm chart can also be configured to support different use cases, such as trace sampling and sending data through a proxy server. See :new-page:`Examples of chart configuration <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/README.md>` for more information.

Override the default configuration
==============================================================

You can override the default configuration to use your own. To do this, include a custom configuration using the ``agent.config`` parameter in the values.yaml file. For example:

.. code-block:: yaml
 

  agent:
    enabled: true

  # Metric collection from k8s control plane components.
    controlPlaneMetrics:
      apiserver:
        enabled: true
      controllerManager:
        enabled: true
      coredns:
        enabled: false
      proxy:
        enabled: true
      scheduler:
        enabled: false

This custom configuration is merged into the default agent configuration.

.. caution:: After merging the files you need to fully redefine parts of the configuration, for example ``service``, ``pipelines``, ``logs``, and ``processors``.

.. _otel-kubernetes-config-advanced-control-plane:

Override a control plane configuration
==============================================================

If any of the control plane metric receivers are activated under the ``agent.controlPlaneMetrics`` configuration section, then the Helm chart will configure the Collector to use the activated receivers to collect metrics from the control plane.

To collect control plane metrics, the Helm chart uses the Collector on each node to use the receiver creator to represent control plane receivers at runtime. The receiver creator has a set of discovery rules that know which control plane receivers to create. The default discovery rules can vary depending on the Kubernetes distribution and version. See :ref:`receiver-creator-receiver` for more information.

If your control plane is using non-standard specifications, then you can provide a custom configuration to allow the Collector to successfully connect to it.

Availability and configuration instructions
-----------------------------------------------------------------------------

The Collector relies on pod-level network access to collect metrics from the control plane pods. Since most cloud Kubernetes as a service distributions don't expose the control plane pods to the end user, collecting metrics from these distributions is not supported.

The following table shows which Kubernetes distributions support control plane metrics collection:

.. list-table::
  :header-rows: 1
  :width: 60%

  * - Supported
    - Unsupported
  * - * Kubernetes
      * OpenShift
    - * AKS
      * EKS
      * EKS/Fargate
      * GKE
      * GKE/Autopilot

See the :new-page:`agent template <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/templates/config/_otel-agent.tpl>` for the default configurations for the control plane receivers.

See the following documentation for information on the configuration options and supported metrics for each control plane receiver:

* :ref:`CoreDNS <coredns>`.
* :ref:`etcd`. To retrieve etcd metrics, see :new-page:`Setting up etcd metrics <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/advanced-configuration.md#setting-up-etcd-metrics>`.
* :ref:`Kubernetes controller manager <kube-controller-manager>`.
* :ref:`Kubernetes API server <kubernetes-apiserver>`.
* :ref:`Kubernetes proxy <kubernetes-proxy>`.
* :ref:`Kubernetes scheduler <kubernetes-scheduler>`.

Known issue
-----------------------------------------------------------------------------

There is a known limitation for the Kubernetes proxy control plane receiver. When using a Kubernetes cluster created using kops, a network connectivity issue prevents proxy metrics from being collected. The limitation can be addressed by updating the kubeProxy metric bind address in the kops cluster specification:

#. Set ``kubeProxy.metricsBindAddress: 0.0.0.0`` in the kops cluster specification.
#. Run ``kops update cluster {cluster_name}`` and ``kops rolling-update cluster {cluster_name}`` to deploy the change.

Use custom configurations for non-standard control plane components
-----------------------------------------------------------------------------

You can override the default configuration values used to connect to the control plane. If your control plane uses nonstandard ports or custom TLS settings, you need to override the default configurations.

The following example shows how to connect to a nonstandard API server that uses port ``3443`` for metrics and custom TLS certs stored in the /etc/myapiserver/ directory.

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


Run the container in non-root user mode
==================================================

Collecting logs often requires reading log files that are owned by the root user. By default, the container runs with ``securityContext.runAsUser = 0``, which gives the ``root`` user permission to read those files.

To run the container in ``non-root`` user mode, use ``agent.securityContext`` to adjust log data permissions to match the ``securityContext`` configurations. For instance:

.. code-block:: yaml

  agent:
    securityContext:
      runAsUser: 20000
      runAsGroup: 20000

.. note:: Running the collector agent for log collection in non-root mode is not currently supported in CRI-O and OpenShift environments at this time. For more details, see the :new-page:`related GitHub feature request issue <https://github.com/signalfx/splunk-otel-collector-chart/issues/891>`.


Collect network telemetry using eBPF
==================================================

You can collect network metrics and analyze them in Network Explorer using the OpenTelemetry eBPF Helm chart. See :ref:`network-explorer-intro` for more information.

To install and configure the eBPF Helm chart, see :ref:`ebpf-chart-setup`.

.. note:: Starting from version 0.88 of the Helm chart, the ``networkExplorer`` setting of the Splunk OpenTelemetry Collector Helm chart is deprecated. For instructions on how to migrate from the ``networkExplorer`` setting to the eBPF Helm chart, see :ref:`ebpf-chart-migrate`.

Prerequisites
-----------------------------------------------------------------------------

The OpenTelemetry eBPF Helm chart requires:

* Kubernetes 1.24 or higher
* Helm 3.9 or higher

Network metrics collection is only supported in the following Kubernetes-based environments on Linux hosts:

* Red Hat Linux 7.6 or higher
* Ubuntu 16.04 or higher
* Debian Stretch or higher
* Amazon Linux 2
* Google COS

Modify the reducer footprint
-----------------------------------------------------------------------------

The reducer is a single pod per Kubernetes cluster. If your cluster contains a large number of pods, nodes, and services, you can increase the resources allocated to it.

The reducer processes telemetry in multiple stages, with each stage partitioned into 1 or more shards, where each shard is a separate thread. Increasing the number of shards in each stage expands the capacity of the reducer. There are 3 stages: ingest, matching, and aggregation. You can set between 1 to 32 shards for each stage. There is one shard per reducer stage by default.

The following example sets the reducer to use 4 shards per stage:

.. code-block:: yaml

   reducer:
     ingestShards: 4
     matchingShards: 4
     aggregationShards: 4

Customize network telemetry generated by eBPF
-----------------------------------------------------------------------------

You can deactivate metrics through the Helm chart configuration, either individually or by entire categories. See the :new-page:`values.yaml <https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-ebpf/values.yaml>` for a complete list of categories and metrics.

To deactivate an entire category, give the category name, followed by ``.all``:

.. code-block:: yaml

   reducer:
     disableMetrics:
       - tcp.all

Deactivate individual metrics by their names:

.. code-block:: yaml

   reducer:
     disableMetrics:
       - tcp.bytes

You can mix categories and names. For example, to turn off all HTTP metrics and the ``udp.bytes`` metric, use:

.. code-block:: yaml

   reducer:
     disableMetrics:
       - http.all
       - udp.bytes

Reactivate metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To activate metrics you previously deactivated, use ``enableMetrics``.

The ``disableMetrics`` flag is evaluated before ``enableMetrics``, so you can deactivate an entire category, then reactivate individual metrics in that category that you are interested in.

For example, to deactivate all internal and http metrics but keep ``ebpf_net.collector_health``, use:

.. code-block:: yaml

   reducer:
     disableMetrics:
       - http.all
       - ebpf_net.all
     enableMetrics:
       - ebpf_net.collector_health

Configure features using gates
==================================================

Use the ``agent.featureGates``, ``clusterReceiver.featureGates``, and ``gateway.featureGates`` configs to activate or deactivate features of the ``otel-collector`` agent, ``clusterReceiver``, and gateway, respectively. These configs are used to populate the otelcol binary startup argument ``-feature-gates``.

For example, to activate ``feature1`` in the agent, activate ``feature2`` in the ``clusterReceiver``, and deactivate ``feature2`` in the gateway, run:

.. code-block:: yaml

   helm install {name} --set agent.featureGates=+feature1 --set clusterReceiver.featureGates=feature2 --set gateway.featureGates=-feature2 {other_flags}

Set the pod security policy manually
==================================================

Support of Pod Security Policies (PSP) was removed in Kubernetes 1.25. If you still rely on PSPs in an older cluster, you can add PSP manually:

1. Run the following command to install the PSP. Don't forget to add the ``--namespace`` kubectl argument if needed:

  .. code-block:: yaml


    cat <<EOF | kubectl apply -f -
    apiVersion: policy/v1beta1
    kind: PodSecurityPolicy
    metadata:
      name: splunk-otel-collector-psp
      labels:
        app: splunk-otel-collector-psp
      annotations:
        seccomp.security.alpha.kubernetes.io/allowedProfileNames: 'runtime/default'
        apparmor.security.beta.kubernetes.io/allowedProfileNames: 'runtime/default'
        seccomp.security.alpha.kubernetes.io/defaultProfileName:  'runtime/default'
        apparmor.security.beta.kubernetes.io/defaultProfileName:  'runtime/default'
    spec:
      privileged: false
      allowPrivilegeEscalation: false
      hostNetwork: true
      hostIPC: false
      hostPID: false
      volumes:
      - 'configMap'
      - 'emptyDir'
      - 'hostPath'
      - 'secret'
      runAsUser:
        rule: 'RunAsAny'
      seLinux:
        rule: 'RunAsAny'
      supplementalGroups:
        rule: 'RunAsAny'
      fsGroup:
        rule: 'RunAsAny'
    EOF

2. Add the following custom ClusterRole rule in your values.yaml file along with all other required fields like ``clusterName``, ``splunkObservability`` or ``splunkPlatform``:

  .. code-block:: yaml


    rbac:
      customRules:
        - apiGroups:     [extensions]
          resources:     [podsecuritypolicies]
          verbs:         [use]
          resourceNames: [splunk-otel-collector-psp]

3. Install the Helm chart:

  .. code-block:: yaml

    helm install my-splunk-otel-collector -f my_values.yaml splunk-otel-collector-chart/splunk-otel-collector

Configure data persistence queues
==================================================

Without any configuration, data is queued in memory only. When data can't be sent, it's retried a few times for up to 5 minutes by default, and then dropped. If, for any reason, the Collector is restarted in this period, the queued data is discarded.

If you want the queue to be persisted on disk if the Collector restarts, set ``splunkPlatform.sendingQueue.persistentQueue.enabled=true`` to enable support for logs, metrics and traces.

By default, data is persisted in the ``/var/addon/splunk/exporter_queue`` directory. To override this path, use the ``splunkPlatform.sendingQueue.persistentQueue.storagePath`` option.

Check the :new-page:`Data Persistence in the OpenTelemetry Collector <https://community.splunk.com/t5/Community-Blog/Data-Persistence-in-the-OpenTelemetry-Collector/ba-p/624583>` for a detailed explantion.

.. note:: Data can only be persisted for agent daemonsets.

Config examples
-----------------------------------------------------------------------------

Use following in values.yaml to disable data persistense for logs, metrics, or traces:

Logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: yaml

  agent:
    config:
      exporters:
          splunk_hec/platform_logs:
            sending_queue:
              storage: null


Metrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: yaml

  agent:
    config:
      exporters:
        splunk_hec/platform_metrics:
          sending_queue:
            storage: null

Traces
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: yaml

  agent:
    config:
      exporters:
        splunk_hec/platform_traces:
          sending_queue:
            storage: null

Support for persistent queue
-----------------------------------------------------------------------------

The following support is offered:

Support for ``GKE/Autopilot`` and ``EKS/Fargate`` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Persistent buffering is not supported for ``GKE/Autopilot`` and ``EKS/Fargate``, since the directory needs to be mounted via ``hostPath``.

Also, ``GKE/Autopilot`` and ``EKS/Fargate`` don't allow volume mounts, as Splunk Observability Cloud doesn't manage the underlying infrastructure.

Refer to :new-page:`aws/fargate <https://docs.aws.amazon.com/eks/latest/userguide/fargate.html>` and :new-page:`gke/autopilot <https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security#built-in-security>` for more information.

Gateway support
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The filestorage extention acquires an exclusive lock for the queue directory.

It's not possible to run persistent buffering if there are multiple replicas of a pod. Even if support could be provided, only one of the pods will be able to acquire the lock and run, while the others will be blocked and unable to operate.

Cluster Receiver support
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Cluster receiver is a 1-replica deployment of the OpenTelemetry Collector. Because the Kubernetes control plane can select any available node to run the cluster receiver pod (unless ``clusterReceiver.nodeSelector`` is explicitly set to pin the pod to a specific node), ``hostPath`` or ``local`` volume mounts don't work for such environments.

Data persistence is currently not applicable to the Kubernetes cluster metrics and Kubernetes events.
