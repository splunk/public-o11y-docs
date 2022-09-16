(kubernetes-events)=

# Kubernetes events
<meta name="Description" content="Documentation on kubernetes-events monitor type">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides the `kubernetes-events` monitor type by using the [Splunk Observability Cloud Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).

This monitor type listens for Kubernetes events by calling the Kubernetes API running on manager nodes, and sends Kubernetes events into Splunk Observability Cloud as Splunk Infrastructure Monitoring events. 

Upon startup, the Kubernetes events monitor type sends all of the events that Kubernetes has that are still persisted and then send any new events as they come in. The various agents perform leader election amongst themselves to decide which instance will send events, unless the ``alwaysClusterReporter`` option is set to ``true``. 

When ``alwaysClusterReporter`` is set to ``true``, every node, with the configuration, emits the same metrics. There is no additional querying of the manager node. When enabled, each agent on every node of the cluster fetches events from the Kubernetes API, which can bring down the Kubernetes API manager nodes.

This monitor type is available on Kubernetes, Linux, and Windows.

## Benefits

```{include} /_includes/benefits.md
```
## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
   smartagent/kubernetes-events:
   type: kubernetes-events
   ... # Additional config
```
To use this monitor type, configure which events to send. You can see the types of events happening in your cluster with the following command:

```
kubectl get events -o yaml --all-namespaces
```

From the output, you can select which events to send by the **Reason** (Started, Created, Scheduled) and **Kind** (Pod, ReplicaSet, Deployment…) combinations. These events need to be specified individually with a single **reason** and **involveObjectKind** for each event rule you want to allow and are placed in the ``whitelistedEvents`` configuration option as a list of events you want to send. 

**Note** Event names will match the reason name.

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
To complete this monitor type activation, you must also include it in a ``metrics`` pipeline. To do this, add the monitor type to the ``service/pipelines/metrics/receivers`` section of your configuration file. For example:

```
service:
   pipelines:
     metrics:
       receivers: [smartagent/kubernetes-events]
```

### Configuration settings

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

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `reason` | no | `string` |  |
| `involvedObjectKind` | no | `string` |  |

## Get help

```{include} /_includes/troubleshooting.md
```
