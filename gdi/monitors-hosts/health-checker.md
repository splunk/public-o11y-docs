(health-checker)=

# Health Checker

<meta name="description" content="Use this Splunk Observability Cloud integration for the Health Checker monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Health Checker monitor type to check whether the configured JSON value is returned in the response body.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```
### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/health-checker:
    type: collectd/health-checker
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
 pipelines:
   metrics:
     receivers: [smartagent/health-checker]
```

### Configuration settings

The following table shows the configuration options for the Health Checker monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `name` | no | `string` |  |
| `path` | no | `string` | The HTTP path that contains a JSON document to verify (**default:** `/`) |
| `jsonKey` | no | `string` | If `jsonKey` and `jsonVal` are given, the given endpoint will be interpreted as a JSON document and will be expected to contain the given key and value for the service to be considered healthy. |
| `jsonVal` | no | `any` | This can be either a string or numeric type |
| `useHTTPS` | no | `bool` | If `true`, the endpoint will be connected to on HTTPS instead of plain HTTP.  It is invalid to specify this if `tcpCheck` is `true`. (**default:** `false`) |
| `skipSecurity` | no | `bool` | If `true`, and `useHTTPS` is `true`, the server's SSL/TLS cert will not be verified. (**default:** `false`) |
| `tcpCheck` | no | `bool` | If `true`, the plugin will verify that it can connect to the given host/port value. JSON checking is not supported. (**default:** `false`) |

## Metrics

The following metrics are available for this integration:

| Name | Description | Sample value | Category | 
| ---- | ----------- | ---- | ---- | 
| `gauge.service.health.status` | The HTTP response status code for the request made to the application being monitored.  A `200` value means an HTTP 200 OK success status response was returned, so the application is healthy.| `200` | Default| 
| `gauge.service.health.value` | `0` means an unhealthy state, and `1` means a healthy state. | `0` or `1` | Default | 

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
