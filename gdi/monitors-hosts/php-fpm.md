(collectd-php-fpm)=

# PHP FPM

<meta name="Description" content="Use this Splunk Observability Cloud integration for the Collectd PHP-FastCGI Process Manager FPM monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `collectd/php-fpm` monitor type to monitor PHP-FastCGI Process Manager (FPM) using the pool status URL.

This integration is only available on Kubernetes and Linux.

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

### Install PHP

To configure the PHP-FPM service itself to expose status metrics, follow these steps:

1. Activate the status path. See the PHP documentation for more information.
2. Configure access through the web server. The following example shows how to configure access for NGINX:

   ```
    location ~ ^/(status|ping)$ {
      access_log off;
      fastcgi_pass unix:/run/php/php-fpm.sock;
      include fastcgi_params;
      fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
   ```
3. Restart both the web server and PHP-FPM.

Make sure that the URL you provide to reach the FPM status page through your web server ends in `?json`. This returns the metrics as `json`, which this plugin requires.

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/ collectd/php-fpm:
    type: collectd/php-fpm
    ... # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/collectd/php-fpm]
```

### Advanced configuration example

See the following config options:

```yaml
receivers:
  smartagent/ collectd/php-fpm:
    type: collectd/php-fpm
    host: localhost
    port: 80
    useHTTPS: true # will be ignored
    url: "http://{{.host}}:{{.port}}/fpm-status?json"    
    ... # Additional config
```

### Configuration settings

The following table shows the configuration options for `collectd/php-fpm`:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` | The host name of the web server. For example, `127.0.0.1`. |
| `port` | no | `integer` | The port number of the web server. For example, `80`. The default value is `0`. |
| `useHTTPS` | no | `bool` | Whether the monitor connects to Supervisor using HTTPS instead of HTTP. The default value is `false`. |
| `path` | no | `string` | The scrape URL for Supervisor. The default value is `/status`. |
| `url` | no | `string` | URL or Go template that to be populated with the `host`, `port`, and `path` values. |
| `name` | no | `string` | The `plugin_instance` dimension. It can take any value. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/php/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```

