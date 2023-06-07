(apache-httpserver)=

# Apache HTTP Server

<meta name="description" content="Use this Splunk Observability Cloud integration for the Apache HTTP server monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Apache HTTP Server monitor type to monitor Apache web servers using information `mod_status` provides.

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

This integration is only available on Kubernetes and Linux. 

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```
### Example

To activate this integration, add the following to your Collector configuration:

```
receivers:
  smartagent/apache:
    type: collectd/apache
    ... # Additional config
```    

Additional configuration options include host or port, as shown below. If `mod_status` is exposed on an endpoint other than `/mod_status`, you can use the url config option to specify the path:

```
    type: collectd/apache
    host: localhost
    port: 80
    url: "http://{{.Host}}:{{.Port}}/server-status?auto"
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/apache]
```  

### Configuration options

The following configuration options are available for this integration:

| Options | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` | The hostname of the Apache server |
| `port` | **yes** | `integer` | The port number of the Apache server |
| `name` | no | `string` | This will be sent as the `plugin_instance` dimension and can be any name you like. |
| `url` | no | `string` | The URL, either a final URL or a Go template that will be populated with the host and port values. (**default:** `http://{{.Host}}:{{.Port}}/mod_status?auto`) |
| `username` | no | `string` |  |
| `password` | no | `string` |  |

## Apache configuration

After you've set up the Collector, follow these steps to configure the Apache web server to expose status metrics:

1. Activate the `mod_status` module in your Apache server. Make sure that the URL you provide for your `mod_status` module ends in `?auto`. This returns the status page as `text/plain`, which the monitor requires.
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

### Notes

```{include} /_includes/metric-defs.md
```
## Troubleshooting

```{include} /_includes/troubleshooting.md
```
  