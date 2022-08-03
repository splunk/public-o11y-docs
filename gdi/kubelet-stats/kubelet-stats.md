(kubelet-stats)=

# Kubernetes network stats

<meta name="description" content="Documentation on the kubelet-stats monitor">

## Description

**Note:** As of Kubernetes 1.18, the ``/spec`` and ``/stats/containers`` endpoints that this monitor uses have been deprecated. Therefore, this monitor is deprecated in favor of the ``kubelet-metrics`` monitor, which uses the non-deprecated ``/stats/summary`` endpoint.

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) uses the Smart Agent Receiver to deploy the ``kubelet-stats`` monitor. This monitor pulls cadvisor metrics through a Kubernetes kubelet instance via the ``/stats/container`` endpoint.

## Pause containers

Network stats for a Kubernetes pod are traditionally accounted for on the "pause" container, which is the container responsible for "owning" the network 
namespace that the other containers in the pod will use, among other things. Therefore, the network stats are usually zero for all non-pause containers and 
accounted for in an aggregated way via the pause container.

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


##  Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

This Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `kubelet-stats` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: kubelet-stats
   ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  kubelet-stats:
    type: kubelet-stats
    ...  # Additional config
```

The following tables show the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `kubeletAPI` | no | `object (see below)` | Kubelet client configuration |


The **nested** `kubeletAPI` configuration object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `url` | no | `string` | URL of the Kubelet instance.  This will default to `http://<current node hostname>:10255` if not provided. |
| `authType` | no | `string` | Can be `none` for no auth, `tls` for TLS client cert auth, or `serviceAccount` to use the pod's default service account token to authenticate. (**default:** `none`) |
| `skipVerify` | no | `bool` | Whether to skip verification of the Kubelet's TLS cert (**default:** `true`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the Kubelet's TLS cert, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use if `authType` is set to `tls` |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use if `authType` is set to `tls` |
| `logResponses` | no | `bool` | Whether to log the raw cadvisor response at the debug level for debugging purposes. (**default:** `false`) |


## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="kubelet-stats" include="markdown"></div>
