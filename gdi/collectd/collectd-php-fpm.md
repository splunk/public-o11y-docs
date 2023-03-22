(collectd-php-fpm)=

# Collectd PHP FPM
<meta name="Description" content="Use this Splunk Observability Cloud integration for the Collectd PHP-FastCGI Process Manager FPM monitor. See benefits, install, configuration, and metrics">

## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `collectd/php-fpm` monitor type for the Smart Agent Receiver.

Use this integration to monitor PHP-FastCGI Process Manager (FPM) using the pool status URL.

```{note}
This monitor is not available on Windows as collectd plugins are only supported in Linux and Kubernetes. 
```

## Requirements

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

Make sure that the URL you provide to reach the FPM status page through your web server ends in `?json`. This returns the 
metrics as `json`, which this plugin requires.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

## Configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/ collectd/php-fpm:
    type: collectd/php-fpm
    ... # Additional config
```

To complete the integration, include the Smart Agent receiver using this monitor in a metrics pipeline. To do this, add the receiver to the service > pipelines > metrics > receivers section of your configuration file.

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/collectd/php-fpm]
```

### Configuration settings

The following table shows the configuration options for the collectd/php-fpm receiver:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` | The host name of the web server. For example, `127.0.0.1`. |
| `port` | no | `integer` | The port number of the web server. For example, `80`. The default value is `0`. |
| `useHTTPS` | no | `bool` | Whether the monitor connects to Supervisor using HTTPS instead of HTTP. The default value is `false`. |
| `path` | no | `string` | The scrape URL for Supervisor. The default value is `/status`. |
| `url` | no | `string` | URL or Go template that to be populated with the `host`, `port`, and `path` values. |
| `name` | no | `string` | The `plugin_instance` dimension. It can take any value. |


## Configuration examples

The following example shows how to configure the host and port for the monitor:

```
monitors:
 - type: collectd/php-fpm
   host: localhost
   port: 80
```

If the FPM status page is exposed on an endpoint other than `/status`, use the `path` config option as in the following example:

```
monitors:
 - type: collectd/php-fpm
   host: localhost
   port: 80
   path: "/status"
```

You can also define the entire URL yourself using the `url` config option. In that case, the `useHTTPS` setting is ignored.

```
monitors:
 - type: collectd/php-fpm
   host: localhost
   port: 80
   useHTTPS: true # will be ignored
   url: "http://{{.host}}:{{.port}}/fpm-status?json"
```

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/php/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```

