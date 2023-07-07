(openshift-cluster)=

# OpenShift cluster

<meta name="description" content="Use this Splunk Observability Cloud integration for the OpenShift cluster monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `openshift-cluster` monitor type to collect cluster-level metrics from the Kubernetes API server, which includes all metrics from the [kubernetes-cluster monitor](https://docs.splunk.com/Observability/gdi/kubernetes-cluster/kubernetes-cluster.html#nav-Kubernetes-cluster) with additional OpenShift-specific metrics. You only need to use the `openshift-cluster` monitor for OpenShift deployments, as it incorporates the `kubernetes-cluster` monitor automatically.

This monitor is available on Kubernetes, Linux, and Windows.

## Behaviour

Since the agent is generally running in multiple places in a Kubernetes cluster, and since it is generally more convenient to share the same configuration across all agent instances, this monitor by default makes use of a leader election process to ensure that it is the only agent sending metrics in a cluster.

All of the agents running in the same namespace that have this monitor configured decide amongst themselves which agent should send metrics for this monitor. This agent becomes the leader agent. The remaining agents stand by, ready to activate if the leader agent dies. You can override leader agent election by setting the `alwaysClusterReporter` option to `true`, which makes the monitor always report metrics.

## Benefits

```{include} /_includes/benefits.md
```
## Installation

Follow these steps to deploy this integration:  

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
   
   By default the Collector is installed in the namespace you're logged into. To deploy the Collector into a different namespace, use the `--namespace` flag to indicate where to place the Collector in.

   - {ref}`Install on Kubernetes <otel-install-k8s>`. When installing Kubernetes using the Helm chart, use the `--set distribution='openshift'` option to generate specific OpenShift metrics, in addition to the standard Kubernetes metrics. 
   
      For example:
        ```
        helm install --set cloudProvider=' ' --set distribution='openshift' --set splunkObservability.accessToken='******' --set            clusterName='cluster1' --namespace='namespace1' --set splunkObservability.realm='us0' --set gateway.enabled='false' --generate-name splunk-otel-collector-chart/splunk-otel-collector
        ```
   
      Find more information in our [GitHub repos](https://github.com/signalfx/splunk-otel-collector-chart).

   - {ref}`Install on Linux <otel-install-linux>`
   
   - {ref}`Install on Windows <otel-install-windows>`

2. Configure the monitor, as described in the Configuration section.

3. Restart the Splunk Distribution of OpenTelemetry Collector.


## Configuration

```{include} /_includes/configuration.md
```

### Configuration options

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `alwaysClusterReporter` | no | `bool` | If `true`, leader election is skipped and metrics are always reported. The default value is `false`. |
| `namespace` | no | `string` | If specified, only resources within the given namespace are monitored. If omitted (blank), all supported resources across all namespaces are monitored. |
| `kubernetesAPI` | no | `object` | Config for the K8s API client |
| `nodeConditionTypesToReport` | no | `list of strings` | A list of node status condition types to report as metrics. The metrics are reported as data points of the form `kubernetes.node_<type_snake_cased>` with a value of `0` corresponding to "False", `1` to "True", and `-1` to "Unknown". The default value is `[Ready].) |

The **nested** `kubernetesAPI` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `authType` | no | `string` | How to authenticate to the K8s API server. This can be one of `none` (for no auth), `tls` (to use manually specified TLS client certs, not recommended), `serviceAccount` (to use the standard service account token provided to the agent pod), or `kubeConfig` to use credentials from `~/.kube/config`. The default value is `serviceAccount`. |
| `skipVerify` | no | `bool` | Whether to skip verifying the TLS cert from the API server. Almost never needed. The default value is `false`. |
| `clientCertPath` | no | `string` | The path to the TLS client cert on the pod's filesystem, if using `tls` auth. |
| `clientKeyPath` | no | `string` | The path to the TLS client key on the pod's filesystem, if using `tls` auth. |
| `caCertPath` | no | `string` | Path to a CA certificate to use when verifying the API server's TLS cert.  Generally, this is provided by Kubernetes alongside the service account token, which is picked up automatically, so this should rarely be necessary to specify. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/kubernetes/cluster/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
