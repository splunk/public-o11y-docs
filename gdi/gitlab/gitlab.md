(gitlab)=

# GitLab

<meta name="Description" content="Use this Splunk Observability Cloud integration for the GitLab monitor. See benefits, install, configuration, and metrics">


## Description

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` provides this integration as the `gitlab` monitor type by using the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).

GitLab is an open-source web-based git repository manager developed by
GitLab Inc. GitLab has built-in features for creating wiki pages,
issue-tracking and CI/CD pipelines. GitLab is bundled with [Prometheus
exporters](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html),
which can be configured to export performance metrics of itself and of
the bundled software that GitLab depends on. These exporters publish
Prometheus metrics at endpoints that are scraped by this monitor type.

This monitor type is available on Kubernetes, Linux, and Windows using GitLab version 9.3 or later.

### Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

### GitLab configuration

Follow the instructions on
[Monitoring GitLab with Prometheus](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html)
to configure the GitLab's Prometheus exporters to expose metric endpoint
targets. For the GitLab Runner monitoring configuration, see
[GitLab Runner monitoring](https://docs.gitlab.com/runner/monitoring/README.html).

Note that configuring GitLab by editing `/etc/gitlab/gitlab.rb` should be
accompanied by running the command `gitlab-ctl reconfigure` for
the changes to take effect.

Also, configuring nginx by editing the file
`/var/opt/gitlab/nginx/conf/nginx-status.conf`, for instance, should be
accompanied by running command `gitlab-ctl restart`. Note that changes to
the configuration file `/var/opt/gitlab/nginx/conf/nginx-status.conf` in
particular are erased by subsequent runs of `gitlab-ctl reconfigure` because `gitlab-ctl reconfigure` restores the original
configuration file.

The following table shows some of the Prometheus endpoint targets with links to
their respective configuration pages. Note that target `gitlab_monitor`
metrics are just targets `gitlab_monitor_database`,
`gitlab_monitor_process` and `gitlab_monitor_sidekiq` metrics combined.

| Monitor type    |     Reference                          | Standard port | Standard path |
|-----------------------|------------------------------------------|---------------|---------------|
| `gitlab-exporter` | [GitLab exporter](https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_exporter.html) | 9168 | /metrics |
| `gitlab-gitaly` | [Gitaly and Gitaly Cluster ](/gdi/gitlab/gitlab-gitaly.md) | 9236 | /metrics |
| `gitlab-sidekiq` | [GitLab SideKiq](/gdi/gitlab/gitlab-sidekiq.md) | 8082 | /metrics |
| `gitlab-unicorn` | [GitLab Unicorn](/gdi/gitlab/gitlab-unicorn.md)  | 8080 | /-/metrics |
| `gitlab-workhorse` | [GitLab Workhorse](/gdi/gitlab/gitlab-workhorse.md)  | 9229 | /metrics |
| `prometheus/nginx-vts` | [Monitoring GitLab with Prometheus](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html) | 8060 | /metrics |
| `prometheus/node` | [Node exporter](https://docs.gitlab.com/ee/administration/monitoring/prometheus/node_exporter.html) | 9100 | /metrics |
| `prometheus/postgres` | [PostgreSQL Server Exporter](https://docs.gitlab.com/ee/administration/monitoring/prometheus/postgres_exporter.html) | 9187 | /metrics |
| `prometheus/prometheus` | [Monitoring GitLab with Prometheus](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html) | 9090 | /metrics |
| `prometheus/redis` | [Redis exporter](https://docs.gitlab.com/ee/administration/monitoring/prometheus/redis_exporter.html) | 9121 | /metrics |
| `gitlab-runner` | [GitLab Runner](/gdi/gitlab/gitlab-runner.md)  | 9252 | /metrics |

<br>

GitLab Prometheus exporters, nginx, and GitLab Runner must be configured to
accept requests from the host or Docker
container of the OpenTelemetry Collector. For example, the following configuration
in `/etc/gitlab/gitlab.rb` configures the GitLab Postgres Prometheus
exporter to allow network connections on port `9187` from any IP address:

```
postgres_exporter['listen_address'] = '0.0.0.0:9187'
```

The previous configuration can also be written as follows:

```
postgres_exporter['listen_address'] = ':9187'
```

The following excerpt from the file `/var/opt/gitlab/nginx/conf/nginx-status.conf` shows the `location /metrics` block for metric related configuration. This file configures nginx. The statement `allow 172.17.0.0/16;` allows
network connection in the `172.17.0.0/16` IP range. The assumption is that
the IP address associated with the OpenTelemetry Collector is in that IP
range.

```
server {
    ...
    location /metrics {
    ...
    allow 172.17.0.0/16;
    deny all;
    }
}
```

The following line is part of the global section of the file `/etc/gitlab-runner/config.toml`. This file configures GitLab Runner. The following statement configures GitLab Runner's Prometheus metrics HTTP server to allows network connection on port `9252` from any IP address:

```
listen_address = "0.0.0.0:9252"
...

```

#### GitLab sample configuration

Use the following configuration to monitor some of the features supported in GitLab:

```
monitors:
 - type: gitlab-unicorn
   host: localhost
   port: 8080

 - type: gitlab
   host: localhost
   port: 9168

 - type: gitlab-runner
   host: localhost
   port: 9252

 - type: gitlab-workhorse
   host: localhost
   port: 9229

 - type: gitlab-sidekiq
   host: localhost
   port: 8082

 - type: gitlab-gitaly
   host: localhost
   port: 9236

 - type: prometheus/postgres
   host: localhost
   port: 9187

 - type: prometheus/nginx-vts
   host: localhost
   port: 8060

```

You can use autodiscovery by specifying a `discoveryRule` instead of `host` and `port`.

See [GitLab](https://docs.splunk.com/Observability/gdi/gitlab.html) for information on the monitors used in the configuration.

### Collector configuration

```{include} /_includes/configuration.md
```

```
receivers:
  smartagent/gitlab:
    type: gitlab
    ... # Additional config
```

To complete the integration, include the Smart Agent receiver using this monitor in a `metrics` pipeline. To do this, add the receiver item to the `service`/`pipelines`/`metrics`/`receivers` section of your configuration file. For example:

```
receivers:
  smartagent/gitlab-workhorse:
    type: gitlab
    host: localhost
    port: 9229
  smartagent/gitlab-sidekiq:
    type: gitlab
    host: localhost
    port: 8082
exporters:
  logging:
service:
  pipelines:
    metrics:
      receivers:
        - smartagent/gitlab-workhorse
        - smartagent/gitlab-sidekiq
      exporters:
        - logging
```

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

#### Collector configuration options

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by [ParseDuration](https://golang.org/pkg/time/#ParseDuration). The default value is `10s`. |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If `true`, the collector will connect to the server using HTTPS instead of plain HTTP. The default value is `false`.|
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma-separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If `useHTTPS` is `true` and this option is also `true`, the exporter's TLS cert will not be verified. The default value is `false`.|
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to `false`. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. The default value is `false`.|
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics`, which is the default value. |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering. This option has no effect when using the Prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. The default value is `false`. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/gitlab/metrics.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
