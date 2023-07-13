(nginx)=

# NGINX

<meta name="description" content="Use this Splunk Observability Cloud integration for the NGINX monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `nginx` monitor type to  to retrieve metrics and logs from an NGINX instance.

This integration is available on Linux and Windows.

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

```yaml
receivers:
  smartagent/nginx:
    type: collectd/nginx
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/nginx]
    logs:
      receivers: [smartagent/nginx]
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | `string` | Hostname or IP address of the NGINX instance. For example, `127.0.0.1`. |
| `port` | Yes | `integer` | The port of the NGINX instance. For example, `8080`. |
| `name` | no | `string` | Name of the NGINX instance.  |
| `url` | no | `string` | URL of the status endpoint. The default value is `http://{{.Host}}:{{.Port}}/nginx_status`, which takes the values defined in `host` and `port`. |
| `username` | no | `string` | Username for HTTP basic authentication, if needed. |
| `password` | no | `string` | Password for HTTP basic authentication, if needed. |
| `timeout` | no | `integer` | Timeout in seconds for the request. The default value is `0`. |

### Nginx configuration

You can configure NGINX to expose status information by editing the NGINX configuration. See `ngx_http_stub_status_module` on the NGINX documentation site.

After you've set up the Collector, follow these steps to configure the Nginx web server to expose status metrics:

1. Add the following configuration to your Nginx server:

   ```
   server {
     location /nginx_status {
       stub_status on;
       access_log off;
       allow 127.0.0.1; # The source IP address of OpenTelemetry Collector.
       deny all;
     }
   }
   ```

2. Restart the Nginx web server.

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/nginx/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
