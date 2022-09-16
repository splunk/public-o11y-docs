(kubernetes-cluster-receiver)=

# Kubernetes Cluster Receiver

<meta name="description" content="Documentation on the kubernetes-cluster receiver">

## Description

The Kubernetes Cluster Receiver, `k8s_cluster`, collects cluster-level metrics from the Kubernetes API server. The receiver uses the Kubernetes API to listen for updates. A single instance of this receiver can be used to monitor a cluster.

This receiver is a native OpenTelemetry receiver that replaces the `kubernetes-cluster` SignalFx Smart Agent monitor.

> **Note:** This receiver is in beta and configuration fields are subject to change.

### Benefits

```{include} /_includes/benefits.md
```

> **Note:** Kubernetes version 1.21 and higher are compatible with the Kubernetes navigator. Using lower versions of Kubernetes is not fully supported for this receiver and may result in the navigator not displaying all clusters. See [endoflife.date](https://endoflife.date/kubernetes) for more information.

##  Installation

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   - <a href="https://docs.splunk.com/Observability/gdi/opentelemetry/install-k8s.html" target="_blank">Install on Kubernetes</a>
   - <a href="https://docs.splunk.com/Observability/gdi/opentelemetry/install-linux.html" target="_blank">Install on Linux</a>
   - <a href="https://docs.splunk.com/Observability/gdi/opentelemetry/install-windows.html" target="_blank">Install on Windows</a>
2. Configure the receiver, as described in the next section.
3. Restart the Splunk Distribution of OpenTelemetry Collector.

## Configuration

Use the following example configuration to activate this receiver in the Collector:

```yaml
receivers:
  k8s_cluster:
    auth_type: kubeConfig
    collection_interval: 30s
    node_conditions_to_report: ["Ready", "MemoryPressure"]
    allocatable_types_to_report: ["cpu","memory"]
    metadata_exporters: [signalfx]
```

See <a href="https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/full_config_linux.yaml" target="_blank">https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/full_config_linux.yaml</a> for the full, Linux configuration.

The following table shows the required and optional settings:

| Option                                            | Description                                                                                                                                                                                                                                           | Required |
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `auth_type`   | Determines how to authenticate to the Kubernetes API server. The options are `none` for no auth, `serviceAccount` to use the standard service account token provided to the agent pod, or `kubeConfig` to use credentials from `~/.kube/config`. The default value is `serviceAccount`.     | Yes      |
| `collection_interval` | The `k8s_cluster` receiver continuously watches for cluster events using the Kubernetes API. However, the metrics collected are emitted only once every collection interval. The `collection_interval` option determines the frequency at which metrics are emitted by this receiver. The default value is `10s`.| No       |
| `node_conditions_to_report` | An array of node conditions this receiver reports. The `k8s_cluster` receiver emits one metric per entry in the array. The default value is `[Ready]`. To learn more, search for "Conditions" on the <a href="https://kubernetes.io/docs/home/" target="_blank">Kubernetes documentation</a> site. | No       |
| `distribution` | The Kubernetes distribution being used by the cluster. Supported versions are `kubernetes` and `openshift`. Setting the value to `openshift` enables OpenShift specific metrics in addition to standard Kubernetes metrics. The default value is `kubernetes`.   | No       |
| `allocatable_types_to_report` | An array of allocatable resource types that this receiver reports. `cpu`, `memory`, `ephemeral-storage`, and `storage` are the available types. The default value is `[]`.   | No       |

<br>

See <a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sclusterreceiver/config.go" target="_blank">https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/k8sclusterreceiver/config.go</a> for the full list of settings exposed for this receiver.

### `node_conditions_to_report`

Use the following configuration to have the `k8s_cluster` receiver emit two metrics, `k8s.node.condition_ready` and `k8s.node.condition_memory_pressure`, one for each condition in the configuration. The value is `1` if the `ConditionStatus` for the corresponding `Condition` is `True`, `0` if it is `False`, and `-1` if it is `Unknown`.

```yaml
# ...
k8s_cluster:
  node_conditions_to_report:
    - Ready
    - MemoryPressure
# ...
```

To learn more, search for "Conditions" on the <a href="https://kubernetes.io/docs/home/" target="_blank">Kubernetes documentation</a> site.

## Configure with the SignalFx Exporter

The following example shows a deployment of the Collector that sets up the `k8s_cluster` receiver along with the SignalFx Metrics Exporter.

This example shows how to set up the following Kubernetes resources that are required for the deployment:

- ConfigMap
- Service account
- RBAC
- Deployment

### ConfigMap

Create a ConfigMap with the configuration for `otelcontribcol`. Replace `SIGNALFX_TOKEN` and `SIGNALFX_REALM` with valid values.

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: otelcontribcol
  labels:
    app: otelcontribcol
data:
  config.yaml: |
    receivers:
      k8s_cluster:
        collection_interval: 10s
        metadata_exporters: [signalfx]
    exporters:
      signalfx:
        access_token: <SIGNALFX_TOKEN>
        realm: <SIGNALFX_REALM>

    service:
      pipelines:
        metrics:
          receivers: [k8s_cluster]
          exporters: [signalfx]
EOF
```

### Service account

Create a service account for the Collector:

```bash
<<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    app: otelcontribcol
  name: otelcontribcol
EOF
```

### Role-based access control (RBAC)

Create a `ClusterRole` with required permissions:

```bash
<<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: otelcontribcol
  labels:
    app: otelcontribcol
rules:
- apiGroups:
  - ""
  resources:
  - events
  - namespaces
  - namespaces/status
  - nodes
  - nodes/spec
  - pods
  - pods/status
  - replicationcontrollers
  - replicationcontrollers/status
  - resourcequotas
  - services
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - apps
  resources:
  - daemonsets
  - deployments
  - replicasets
  - statefulsets
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - extensions
  resources:
  - daemonsets
  - deployments
  - replicasets
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - batch
  resources:
  - jobs
  - cronjobs
  verbs:
  - get
  - list
  - watch
- apiGroups:
    - autoscaling
  resources:
    - horizontalpodautoscalers
  verbs:
    - get
    - list
    - watch
EOF
```

Create a `ClusterRoleBinding` to grant the role to the service account created in the service account example:

```bash
<<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: otelcontribcol
  labels:
    app: otelcontribcol
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: otelcontribcol
subjects:
- kind: ServiceAccount
  name: otelcontribcol
  namespace: default
EOF
```

### Deployment

Create a deployment to the Collector:

```bash
<<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: otelcontribcol
  labels:
    app: otelcontribcol
spec:
  replicas: 1
  selector:
    matchLabels:
      app: otelcontribcol
  template:
    metadata:
      labels:
        app: otelcontribcol
    spec:
      serviceAccountName: otelcontribcol
      containers:
      - name: otelcontribcol
        image: otelcontribcol:latest # specify image
        args: ["--config", "/etc/config/config.yaml"]
        volumeMounts:
        - name: config
          mountPath: /etc/config
        imagePullPolicy: IfNotPresent
      volumes:
        - name: config
          configMap:
            name: otelcontribcol
EOF
```

## Metrics

The following table shows the legacy metrics that are available for this integration. See [OpenTelemetry values and their legacy equivalents](https://docs.splunk.com/Observability/gdi/opentelemetry/legacy-otel-mappings.html#opentelemetry-values-and-their-legacy-equivalents) for the Splunk Distribution of OpenTelemetry Collector equivalents.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/kubernetes/cluster/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
