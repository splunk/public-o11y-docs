(kubernetes-events)=

# Kubernetes events
<meta name="Description" content="Documentation on kubernetes-events monitor type">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides the `kubernetes-events` monitor type. This monitor type listens for Kubernetes events by calling the Kubernetes API running on manager nodes, and sends Kubernetes events into Splunk Observability Cloud as Infrastructure Monitoring events through the OTel pipeline using the [Splunk Observability Cloud Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). 

After it starts, the Kubernetes events monitor type sends all of the events that Kubernetes has that are still persisted, and any new events as they come in. The various agents decide which instance will lead and sends event. If ``alwaysClusterReporter`` is set to ``true``, every node emits the same data, and there is no additional querying of the manager node. 

This monitor type is available on Kubernetes, Linux, and Windows.

## Benefits

```{include} /_includes/benefits-events.md
```
## Installation

```{include} /_includes/collector-installation.md
```

### Deploy with Helm

To enable this monitor with the Helm chart, include this argument with the helm install command:

```
-set splunkObservability.infrastructureMonitoringEventsEnabled='true'
```

### Deploy without Helm

To deploy without Helm, include the following in the OTel configuration: 

```
processors:
  resource/add_event_k8s:
    attributes:
      - action: insert
        key: kubernetes_cluster
        value: CHANGEME

receivers:
  smartagent/kubernetes-events:
   type: kubernetes-events
   alwaysClusterReporter: true

service:
  pipelines:
    logs/events:
      exporters:
        - signalfx
      processors:
        - memory_limiter
        - batch
        - resourcedetection
        - resource/add_event_k8s
      receivers:
        - smartagent/kubernetes-events        
```

## Configuration

### 1. Activate the monitor

```{include} /_includes/configuration.md
```

```
receivers:
   smartagent/kubernetes-events:
   type: kubernetes-events
   ... # Additional config
```

### 2. Include the monitor in a pipeline

Next, include the monitor type in an events pipeline in your configuration file. 

```
services:
  logs/events:
    receivers:
      - smartagent/kubernetes-events
```

### 3. Select which events to send

Configure which events to send. You can see the types of events happening in your cluster with the following command:

```
kubectl get events -o yaml --all-namespaces
```

To send all events, set the option ``_sendAllEvents`` to ``true`` in your ``values.yaml``, and remove the ``whitelistedEvents`` option.

From the output, combine **Reason** (Started, Created, Scheduled) and **Kind** (Pod, ReplicaSet, Deployment…) to select which events to send. 
- Specify a single **reason** and **involveObjectKind** individually for each event rule you want to allow.
- Events are placed in the `whitelistedEvents` configuration option as a list of events you want to send. 
- Event names will match the reason name.

## Configuration settings

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `kubernetesAPI` | no | `object (see below)` | Configuration of the Kubernetes API client. |
| `whitelistedEvents` | no | `list of objects (see below)` | A list of event types to send events for.  Only events matching these items will be sent. |
| `alwaysClusterReporter` | no | `bool` | Whether to always send events from this agent instance or to do leader election to only send from one agent instance. **Default** is `false`. |


The **nested** `kubernetesAPI` config object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `authType` | no | `string` | To authenticate to the K8s API server: <br> - `none` for no authentication.<br> - `tls` to use manually specified TLS client certs (not recommended). <br> - `serviceAccount` to use the standard service account token provided to the agent pod. <br> - `kubeConfig` to use credentials from `~/.kube/config`. <br> - **Default** is `serviceAccount`. |
| `skipVerify` | no | `bool` | Whether to skip verifying the TLS certificate from the API server.  Almost never needed. **Default** is `false` |
| `clientCertPath` | no | `string` | The path to the TLS client certificate on the pod's filesystem, if using `tls` authentication. |
| `clientKeyPath` | no | `string` | The path to the TLS client key on the pod's filesystem, if using `tls` authentication. |
| `caCertPath` | no | `string` | Path to a CA certificate to use when verifying the API server's TLS certificate.  Generally this is provided by K8s alongside the service account token, which will be picked up automatically, so this should rarely be necessary to specify. |

The **nested** `whitelistedEvents` configuration object has the following fields:

| Option | Required | Type | 
| --- | --- | --- | 
| `reason` | no | `string` | 
| `involvedObjectKind` | no | `string` | 

Example YAML configuration:

```
receivers:
   smartagent/kubernetes-events:
     type: kubernetes-events
     whitelistedEvents:
       - reason: Created
         involvedObjectKind: Pod
       - reason: SuccessfulCreate
         involvedObjectKind: ReplicaSet
```

## Get help

```{include} /_includes/troubleshooting.md
```
