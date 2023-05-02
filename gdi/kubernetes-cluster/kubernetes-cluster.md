(kubernetes-cluster)=

# Kubernetes cluster

<meta name="description" content="Use this Splunk Observability Cloud integration for the Kubernetes cluster monitor. See benefits, install, configuration, and metrics">

```{note}
This monitor is deprecated in favor of the `k8s_cluster` receiver. See {ref}`Kubernetes Cluster Receiver <kubernetes-cluster-receiver>` for more information.
```

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the Smart Agent Receiver to provide the `kubernetes-cluster` monitor.

Use this integration to obtain cluster-level resource metrics from the Kubernetes API server.

The `kubernetes-cluster` monitor does the following:

- Uses the watch functionality of the Kubernetes API to listen for updates about the cluster.
- Maintains a cache of metrics that are sent at regular intervals.

This monitor is available on Linux and Windows.

### Overriding leader election

This monitor defaults to a leader election process to ensure that it is the only agent sending metrics in a cluster. The leader election process is used because:
- The agent usually runs in multiple places in a Kubernetes cluster

- It is convenient to share the same configuration across all agent instances

Leader election means that all of the agents running in the same namespace that have this monitor configured decide among themselves which agent sends metrics for this monitor, while the other agents stand by ready to activate if the leader agent expires.

You can override leader election by setting the configuration option `alwaysClusterReporter` to `true`, which makes the monitor always report metrics.

**Note:** If you are using OpenShift, use the ``openshift-cluster`` monitor type instead of this ``kubernetes-cluster`` monitor type. The ``openshift-cluster`` monitor type contains additional OpenShift metrics.


### Benefits

```{include} /_includes/benefits.md
```

##  Installation


```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/kubernetes-cluster:
    type: kubernetes-cluster
    ... # Additional config
```

To complete the integration, include the monitor in a metrics pipeline. To do this, add the monitor to the `service > pipelines > metrics > receivers` section of your configuration file.

See the [kubernetes.yaml](https://github.com/signalfx/splunk-otel-collector/tree/main/examples/kubernetes-yaml) in GitHub for the Agent and Gateway YAML files.

### Configuration settings

The following tables show the configuration options for this monitor type:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `alwaysClusterReporter` | no | `bool` | If `true`, leader election is skipped and metrics are always reported. **Default is** `false`. |
| `namespace` | no | `string` | If specified, only resources within the given namespace will be monitored. If omitted (blank), all supported resources across all namespaces will be monitored. |
| `kubernetesAPI` | no | `object (see below)` | Configuration for the Kubernetes API client |
| `nodeConditionTypesToReport` | no | `list of strings` | A list of node status condition types to report as metrics. The metrics will be reported as data points of the form `kubernetes.node_<type_snake_cased>` with a value of `0` corresponding to "False", `1` to "True", and `-1` to "Unknown". **Default** is `[Ready]`. |

The **nested** `kubernetesAPI` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `authType` | no | `string` | To authenticate to the K8s API server: <br> - `none` for no authentication.<br> - `tls` to use manually specified TLS client certs (not recommended). <br> - `serviceAccount` to use the standard service account token provided to the agent pod. <br> - `kubeConfig` to use credentials from `~/.kube/config`. <br> - **Default** is `serviceAccount`. | |
| `skipVerify` | no | `bool` | Whether to skip verifying the TLS cert from the API server. Almost never needed. **Default** is `false`. |
| `clientCertPath` | no | `string` | The path to the TLS client cert on the pod's filesystem, if using `tls` authentication. |
| `clientKeyPath` | no | `string` | The path to the TLS client key on the pod's filesystem, if using `tls` authentication. |
| `caCertPath` | no | `string` | Path to a CA certificate to use when verifying the API server TLS certificate. This is provided by Kubernetes alongside the service account token, which will be picked up automatically, so this should rarely be necessary to specify. |

## Metrics

The following table shows the legacy metrics that are available for this integration. See [OpenTelemetry values and their legacy equivalents](https://docs.splunk.com/Observability/gdi/opentelemetry/legacy-otel-mappings.html#opentelemetry-values-and-their-legacy-equivalents) for the Splunk Distribution of OpenTelemetry Collector equivalents.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/kubernetes/cluster/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```
