(kubelet-stats)=

# Kubernetes network stats

<meta name="description" content="Use this Splunk Observability Cloud integration for the kubelet-stats / kubernetes network stats monitor. See benefits, install, configuration, and metrics">

```{note}
This monitor is deprecated in favor of the `kubeletstats` receiver. See {ref}`Kubelet Stats Receiver <kubelet-stats-receiver>` for more information.
```
## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the Smart Agent Receiver to deploy the ``kubelet-stats`` monitor. This monitor pulls cadvisor metrics through a Kubernetes kubelet instance using the ``/stats/container`` endpoint.

## Pause containers

Network stats for a Kubernetes pod are traditionally accounted for on the "pause" container, which is the container responsible for "owning" the network
namespace that the other containers in the pod will use, among other things. Therefore, the network stats are usually zero for all non-pause containers and
accounted for in an aggregated way using the pause container.

Since the only generally useful stats of the pause container are network stats, this monitor will omit non-network metrics for any containers named ``POD``. This
is the standard name for the "pause" container in Kubernetes when using the Docker runtime, but the pause container has no name under other runtimes. Therefore,
you need to explicitly filter out non-network metrics from pause containers when using non-Docker runtimes. The following configuration will do that:

```
monitors:
- type: kubelet-stats
  datapointsToExclude:
  - dimensions:
      container_image:
       - '*pause-amd64*'
       - 'k8s.gcr.io/pause*'
    metricNames:
      - '*'
      - '!*network*'
```

If your deployment uses an image name for the pause container that does not fit the given patterns, you should change it to fit the pattern.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

This Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `kubelet-stats` monitor entry in your Collector or Smart Agent (deprecated) configuration is required for its use. Use the appropriate form for your agent type.

```
receivers:
  smartagent/kubelet-stats: 
    type: kubelet-stats
    ... # Additional config
```

To complete the integration, include the Smart Agent receiver using this monitor in a metrics pipeline. To do this, add the receiver to the `service > pipelines > metrics > receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/kubelet-stats]
```

### Configuration settings

The following tables show the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `kubeletAPI` | no | `object` (see the following table) | Kubelet client configuration |

<br>

The **nested** `kubeletAPI` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `url` | no | `string` | URL of the Kubelet instance.  This will default to `http://<current node hostname>:10255` if not provided. |
| `authType` | no | `string` | Can be `none` for no auth, `tls` for TLS client cert auth, or `serviceAccount` to use the pod's default service account token to authenticate. The default value is `none`. |
| `skipVerify` | no | `bool` | Whether to skip verification of the Kubelet TLS cert. The default value is `true`.|
| `caCertPath` | no | `string` | Path to the CA cert that has signed the Kubelet TLS cert, unnecessary if `skipVerify` is set to `false`. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use if `authType` is set to `tls` |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use if `authType` is set to `tls` |
| `logResponses` | no | `bool` | Whether to log the raw cadvisor response at the debug level for debugging purposes. The default value is `false`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/kubernetes/kubeletmetrics/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Get help

```{include} /_includes/troubleshooting.md
```
