(kubernetes-cluster)=

# Kubernetes cluster

<meta name="description" content="Documentation on the kubernetes-cluster monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as ``kubernetes-cluster`` monitor via the Smart Agent Receiver. This monitor pulls cadvisor metrics through a Kubernetes kubelet instance via the ``/stats/container`` endpoint.

**Note:** If you are using OpenShift, use the ``openshift-cluster`` monitor instead of this ``kubernetes-cluster`` monitor. The ``openshift-cluster`` monitor contains additional OpenShift metrics.

The ``kubernetes-cluster`` monitor collects cluster-level metrics from the Kubernetes API server. This monitor uses the watch functionality of the Kubernetes API to listen for updates about the cluster and maintains a cache of metrics that get sent on a regular interval.

Since the agent is generally running in multiple places in a Kubernetes cluster, and since it is generally more convenient to share the same configuration across 
all agent instances, this monitor by default makes use of a leader election process to ensure that it is the only agent sending metrics in a cluster. All of the 
agents running in the same namespace that have this monitor configured will decide amongst themselves which should send metrics for this monitor, and the rest 
will stand by ready to activate if the leader agent dies. You can override leader election by setting the configuration option ``alwaysClusterReporter`` to ``true``, which will make the monitor always report metrics.

This monitor is similar to ``kube-state-metrics`` and sends many of the same metrics, but in a way that is less verbose and better fitted for Splunk Infrastructure Monitoring.

##  Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

This Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `kubernetes-cluster` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: kubernetes-cluster
   ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  kubernetes-cluster:
    type: kubernetes-cluster
    ...  # Additional config
```

The following tables show the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `alwaysClusterReporter` | no | `bool` | If `true`, leader election is skipped and metrics are always reported. (**default:** `false`) |
| `namespace` | no | `string` | If specified, only resources within the given namespace will be monitored.  If omitted (blank), all supported resources across all namespaces will be monitored. |
| `kubernetesAPI` | no | `object (see below)` | Config for the Kubernetes API client |
| `nodeConditionTypesToReport` | no | `list of strings` | A list of node status condition types to report as metrics.  The metrics will be reported as data points of the form `kubernetes.node_<type_snake_cased>` with a value of `0` corresponding to "False", `1` to "True", and `-1` to "Unknown". (**default:** `[Ready]`) |

The **nested** `kubernetesAPI` config object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `authType` | no | `string` | How to authenticate to the Kubernetes API server.  This can be one of `none` (for no auth), `tls` (to use manually specified TLS client certs, not recommended), `serviceAccount` (to use the standard service account token provided to the agent pod), or `kubeConfig` to use credentials from `~/.kube/config`. (**default:** `serviceAccount`) |
| `skipVerify` | no | `bool` | Whether to skip verifying the TLS cert from the API server.  Almost never needed. (**default:** `false`) |
| `clientCertPath` | no | `string` | The path to the TLS client cert on the pod's filesystem, if using `tls` auth. |
| `clientKeyPath` | no | `string` | The path to the TLS client key on the pod's filesystem, if using `tls` auth. |
| `caCertPath` | no | `string` | Path to a CA certificate to use when verifying the API server's TLS cert. This is provided by Kubernetes alongside the service account token, which will be picked up automatically, so this should rarely be necessary to specify. |

## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="openshift-cluster" include="markdown"></div>

## Dimensions

The following dimensions may occur on metrics emitted by this monitor. Some dimensions may be specific to certain metrics.

| Name | Description |
| ---  | ---         |
| `kubernetes_name` | The name of the resource that the metric describes |
| `kubernetes_namespace` | The namespace of the resource that the metric describes |
| `kubernetes_node_uid` | The UID of the node, as defined by the `uid` field of the node resource. |
| `kubernetes_pod_uid` | The UID of the pod that the metric describes |
| `machine_id` | The machine ID from /etc/machine-id.  This should be unique across all nodes in your cluster, but some cluster deployment tools don't guarantee this.  This will not be sent if the `useNodeName` config option is set to true. |
| `metric_source` | This is always set to `kubernetes` |
| `quota_name` | The name of the Kubernetes ResourceQuota object that the quota is part of |
| `resource` | The Kubernetes resource that the quota applies to |

## Properties

The following [properties](https://docs.signalfx.com/en/latest/metrics-metadata/metrics-metadata.html#properties) are set on the dimension values of the dimension specified.

| Name | Dimension | Description |
| ---  | ---       | ---         |
| `<node label>` | `kubernetes_node_uid` | All non-blank labels on a given node will be synced as properties to the `kubernetes_node_uid` dimension value for that node. Any blank values will be synced as tags on that same dimension. |
| `<pod label>` | `kubernetes_pod_uid` | Any labels with non-blank values on the pod will be synced as properties to the `kubernetes_pod_uid` dimension. Any blank labels will be synced as tags on that same dimension. |
| `container_status` | `container_id` | Status of the container such as `running`, `waiting` or `terminated` are synced to the `container_id` dimension. |
| `container_status_reason` | `container_id` | Reason why a container is in a particular state. This property is synced to `container_id` only if the value of `cotnainer_status` is either `waiting` or `terminated`. |
| `cronjob_creation_timestamp` | `kubernetes_uid` | Timestamp (in RFC3339 format) representing the server time when the cron job was created and is in UTC. This property is synced onto `kubernetes_uid`. |
| `daemonset_creation_timestamp` | `kubernetes_uid` | Timestamp (in RFC3339 format) representing the server time when the daemon set was created and is in UTC. This property is synced onto `kubernetes_uid`. |
| `deployment_creation_timestamp` | `kubernetes_uid` | Timestamp (in RFC3339 format) representing the server time when the deployment was created and is in UTC. This property is synced onto `kubernetes_uid`. |
| `job_creation_timestamp` | `kubernetes_uid` | Timestamp (in RFC3339 format) representing the server time when the job was created and is in UTC. This property is synced onto `kubernetes_uid`. |
| `node_creation_timestamp` | `kubernetes_node_uid` | CreationTimestamp is a timestamp representing the server time when the node was created and is in UTC. This property is synced onto `kubernetes_node_uid`. |
| `pod_creation_timestamp` | `kubernetes_pod_uid` | Timestamp (in RFC3339 format) representing the server time when the pod was created and is in UTC. This property is synced onto `kubernetes_pod_uid`. |
| `replicaset_creation_timestamp` | `kubernetes_uid` | Timestamp (in RFC3339 format) representing the server time when the replica set was created and is in UTC. This property is synced onto `kubernetes_uid`. |
| `statefulset_creation_timestamp` | `kubernetes_uid` | Timestamp (in RFC3339 format) representing the server time when the stateful set was created and is in UTC. This property is synced onto `kubernetes_uid`. |
