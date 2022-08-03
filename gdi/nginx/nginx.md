(nginx)=
# NGINX
<meta name="description" content="Documentation on the nginx monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `nginx` monitor via the Smart Agent Receiver. This monitor keeps track of an NGINX instance.

Note that this monitor requires special configuration enabled in NGINX (see **NGINX-specific configuration**).

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:
1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

To activate this monitor in the Smart Agent, add the
following to your agent config:

```
monitors:  # All monitor config goes under this key
 - type: nginx
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/nginx:
    type: nginx
    ...  # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `name` | no | `string` |  |
| `url` | no | `string` | The full URL of the status endpoint; can be a template (**default:** `http://{{.Host}}:{{.Port}}/nginx_status`) |
| `username` | no | `string` |  |
| `password` | no | `string` |  |
| `timeout` | no | `integer` |  (**default:** `0`) |

### NGINX-specific configuration

You must configure NGINX to expose status information by editing the NGINX configuration.  Please see
[ngx_http_stub_status_module](http://nginx.org/en/docs/http/ngx_http_stub_status_module.html)
for a guide to configuring the NGINX stats module
`ngx_http_stub_status_module`.

## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="nginx" include="markdown"></div>
