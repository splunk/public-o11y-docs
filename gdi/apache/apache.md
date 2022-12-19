(apache)=

# Apache HTTP Server

<meta name="description" content="Use this Splunk Observability Cloud integration to monitor Apache HTTP server. See benefits, install, configuration, and metrics">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the Apache HTTP Server monitor with the SignalFx Smart Agent receiver. The integration monitors Apache web servers using information `mod_status` provides.

This monitor is available on Kubernetes and Linux.

Apache worker threads can be in one of the following states:

| State        | Remark                                  |
|--------------|-----------------------------------------|
| Open         | Open (unused) slot - no process         |
| Waiting      | Idle and waiting for request            |
| Sending      | Serving response                        |
| KeepAlive    | Kept alive for possible next request    |
| Idle_cleanup | Idle and marked for cleanup             |
| Closing      | Closing connection                      |
| Logging      | Writing to log file                     |
| Reading      | Reading request                         |
| Finishing    | Finishing as part of graceful shutdown  |
| Starting     | Starting up to serve                    |

### Benefits

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
  smartagent/apache:
    type: collectd/apache
    ... # Additional config
```

To complete the integration, include the monitor in a `metrics` pipeline. To do this, add the monitor to the `service > pipelines > metrics > receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/apache]
```  

### Configuration settings

The following configuration options are available for this monitor:

| Options | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | The hostname of the Apache server |
| `port` | **yes** | `integer` | The port number of the Apache server |
| `name` | no | `string` | This will be sent as the `plugin_instance` dimension and can be any name you like. |
| `url` | no | `string` | The URL, either a final URL or a Go template that will be populated with the host and port values. (**default:** `http://{{.Host}}:{{.Port}}/mod_status?auto`) |
| `username` | no | `string` |  |
| `password` | no | `string` |  |

## Apache configuration

After you deploy the monitor in the Splunk Distribution of OpenTelemetry Collector, follow these steps to configure the Apache web server to expose status metrics:

1. Enable the `mod_status` module in your Apache server. Make sure that the URL you provide for your `mod_status` module ends in `?auto`. This returns the status page as `text/plain`, which the monitor requires.
2. Add the following configuration to your Apache server:
   ```
    ExtendedStatus on
    <Location /mod_status>
    SetHandler server-status
    </Location>
    ```
3. Restart the Apache web server.

## Metrics

These metrics are available for this integration.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/apache/metadata.yaml"></div>  

## Troubleshooting
```{include} /_includes/troubleshooting.md
```
  