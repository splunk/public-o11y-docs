(http)=

# HTTP

<meta name="Description" content="Use this Splunk Observability Cloud integration for the HTTP monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `http` monitor type to generate metrics based on whether the HTTP response from the configured URL matches expectations. For example, correct body, status code, and so on.

If applicable, TLS information is automatically fetched from the base URL or redirection, depending on whether the `useHTTPS` parameter is configured.

## Benefits

```{include} /_includes/benefits.md
```

## Setup

To create a webcheck from a URL, split the URL into different configuration options. All of these options determine the URL dimension value from its "normalized" URL, which is in the format of `{scheme}://{host}:{port}{path}`:

* `scheme` is `https` if `useHTTPS:true`, or `http` if `useHTTPS:false`. 
* `host` is the host name of the site to check. This option is required.
* `port` is the port to connect to. If not defined, `port` is `443` if `useHTTPS:true` or `80` if `useHTTPS:false`. The default value for `http` is `80`. If the default value is used, `port` is removed from the configuration because it is implicit and makes the behavior similar to what `curl` does.
* `path` contains the full query including the resource path and finally the `GET` method parameters with `?` separator.

Configure the following options to change the behavior of the request done on this URL:

* Configure the `method` option to define request types such as `GET` or `POST`. See <a href="https://golang.org/src/net/http/method.go" target="_blank">https://golang.org/src/net/http/method.go</a> for the full list of available methods.
* Configure the `username` and `password` options for basic authentication.
* Configure the `httpHeaders` option to define request headers. Use this option to override the `host` header.
* Configure the `requestBody` option to provide a body to the request. The form of this body depends on the `Content-Type` header. For example, `{"foo":"bar"}` with `Content-Type: application/json`.
* Configure the `noRedirects:false` option to stop the URL from following redirects. The default value is `true`.

See [configuration examples](#configuration) for different request behaviors.

The following configuration options change the resulting values:

* The `desiredCode` option determines the `http.code_matched` value. Configure this option if you expect a different "normal" value. The default value is `200`. For example, configure `desiredCode:301` and `noRedirects:false` to check a redirect (and not the end redirected URL) keeping the value to `1` (success).
* The `regex` option does the same with the `http.regex_matched` metric, where the value is `1` only if the provided regex matches the response body.
* The `addRedirectURL` option does not have impact on metrics, but adds a new dimension `redirect_url` with a "dynamic" value. If the `url` dimension changes with the monitor configuration, the `redirect_url` value is impacted by any server change and is always the last URL redirected. This option is deactivated by default because this could cause issues with heartbeat detectors, for example.

The following HTTP headers let the client and the server pass additional information with an HTTP request or response:

* `Cache-Control: no-cache` to send the request to the origin server for validation before releasing a cached copy.
* `Host` to change the request, that is, to bypass CDN or load balancer requesting directly the back end. 
* `Content-Type` to indicate the media type of the resource. For example, `json`, `xml`, or `octet-stream`.

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```bash
receivers:
  smartagent/http:
    type: http
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/http]
```

### Monitor multiple hosts

To monitor multiple hosts, add an `http` monitor entry for each host in the `receivers` section of the configuration. For example:

```yaml
receivers:
  smartagent/host1:
    type: http
    ... # Additional config for host 1
  smartagent/host2:
    type: http
    ... # Additional config for host 2
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/host1, smartagent/host2]
```  

### Configuration options

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` | The host or IP address to monitor. Note: Host is required for functionality, but not for configuration validation.|
| `port` | no | `integer` | The port of the HTTP server to monitor. The default value is `0`. |
| `path` | no | `string` | The HTTP path to use in the test request. |
| `httpTimeout` | no | `int64` | The HTTP timeout duration for both read and writes. This should be a duration string that is accepted by the `ParseDuration` type. The default value is `10s`. |
| `username` | no | `string` | The basic auth username to use on each request, if any. |
| `password` | no | `string` | The basic auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If `true`, the Collector connects to the server using HTTPS instead of plain HTTP. The default value is `false`. |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma-separated multiple values for the same message-header are supported. |
| `skipVerify` | no | `bool` | If `useHTTPS` is true and this option is also `true`, the exporter's TLS cert is not verified. The default value is `false`.|
| `sniServerName` | no | `string` | If `useHTTPS` is `true` and `skipVerify` is `true`, the sniServerName is used to verify the host name on the returned certificates. It is also included in the client's handshake to support virtual hosting unless it is an IP address. |
| `caCertPath` | no | `string` | The path to the CA certificate that has signed the TLS cert. This option is unnecessary if `skipVerify` is set to `false`. |
| `clientCertPath` | no | `string` | The path to the client TLS cert to use for TLS required connections. |
| `clientKeyPath` | no | `string` | The path to the client TLS key to use for TLS required connections. |
| `requestBody` | no | `string` | Optional HTTP request body as string, for example, `{"foo":"bar"}`. |
| `noRedirects` | no | `bool` | Do not follow redirect. The default value is `false`. |
| `method` | no | `string` | HTTP request method to use. The default value is `GET`. |
| `urls` | no | `list of strings` | Provides a list of HTTP URLs to monitor. This option is **deprecated**. Use `host`/`port`/`useHTTPS`/`path` instead. |
| `regex` | no | `string` | Optional regex to match on URL(s) response(s). |
| `desiredCode` | no | `integer` | Desired code to match for URL(s) response(s). The default value is `200`. |
| `addRedirectURL` | no | `bool` | Adds the `redirect_url` dimension, which could differ from `url` when redirection is followed. The default value is `false`. |

## Metrics

These are the metrics available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/http/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
