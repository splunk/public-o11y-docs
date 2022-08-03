(docker)=

# Docker API server container

<meta name="description" content="Documentation on the docker monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) deploys this integration as the `docker` monitor  via the Smart Agent Receiver.

This monitor reads container stats from a Docker API server.  

The monitor currently does not support CPU share/quota metrics.

For more information on block IO metrics, see [Linux cgroup block io
controller](https://www.kernel.org/doc/Documentation/cgroup-v1/blkio-controller.txt).

If you are running the agent directly on a host (outside of a container
itself) and you are using the default Docker UNIX socket URL, add the `signalfx-agent` user to the `docker` group in order to have permission to access the Docker API via the socket.

Docker API version 1.22+ is required.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `docker` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:
```
monitors:  # All monitor config goes under this key
 - type: docker
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/docker:
    type: docker
    ...  # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `enableExtraBlockIOMetrics` | no | `bool` | Sends all extra block IO metrics. (**default:** `false`) |
| `enableExtraCPUMetrics` | no | `bool` | Sends all extra CPU metrics. (**default:** `false`) |
| `enableExtraMemoryMetrics` | no | `bool` | Sends all extra memory metrics. (**default:** `false`) |
| `enableExtraNetworkMetrics` | no | `bool` | Sends all extra network metrics. (**default:** `false`) |
| `dockerURL` | no | `string` | The URL of the docker server. (**default:** `unix:///var/run/docker.sock`) |
| `timeoutSeconds` | no | `integer` | The maximum amount of time to wait for docker API requests. (**default:** `5`) |
| `cacheSyncInterval` | no | `integer` | The time to wait before resyncing the list of containers the monitor maintains through the docker event listener. An example is `cacheSyncInterval: "20m"` (**default:** `60m`) |
| `labelsToDimensions` | no | `map of strings` | A mapping of container label names to dimension names. The corresponding label values become the dimension value for the mapped name.  For example, `io.kubernetes.container.name: container_spec_name` results in a dimension called `container_spec_name` that has the value of the `io.kubernetes.container.name` container label. |
| `envToDimensions` | no | `map of strings` | A mapping of container environment variable names to dimension names.  The corresponding env var values become the dimension values on the emitted metrics.  For example, `APP_VERSION: version` results in datapoints having a dimension called `version` whose value is the value of the `APP_VERSION` envvar configured for that particular container, if present. |
| `excludedImages` | no | `list of strings` | A list of filters of images to exclude.  Supports literals, globs, and regex. |


## Metrics

These are the metrics available for this integration: 

<div class="metrics-table" type="docker" include="markdown"></div>