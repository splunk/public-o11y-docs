(kubernetes-cluster)=

# Kubernetes cluster (deprecated)

<meta name="description" content="Use this Splunk Observability Cloud integration for the Kubernetes cluster monitor. See benefits, install, configuration, and metrics">

```{note}
This monitor is deprecated in favor of the native OpenTelemetry component `k8s_cluster` receiver. See {ref}`Kubernetes Cluster Receiver <kubernetes-cluster-receiver>` for more information.

If you are using OpenShift, use the `openshift-cluster` monitor type instead. 
```

## Configuration settings

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

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/kubernetes/cluster/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
