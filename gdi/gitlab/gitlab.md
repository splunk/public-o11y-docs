
(gitlab)=

# GitLab performance
<meta name="Description" content="Documentation for GitLab monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `gitlab` monitor via the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).


GitLab is an open-source web-based git repository manager developed by
GitLab Inc. GitLab has built-in features for creating wiki pages,
issue-tracking and CI/CD pipelines. GitLab is bundled with [Prometheus
exporters](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html), 
which can be configured to export performance metrics of itself and of
the bundled software that GitLab depends on. These exporters publish
Prometheus metrics at endpoints that are scraped by this monitor.

This monitor requires GitLab version 9.3 or later.

## GitLab configuration

Follow the instructions on 
[Monitoring GitLab with Prometheus](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html)
to configure the GitLab's Prometheus exporters to expose metric endpoint
targets. For GitLab Runner monitoring configuration, see
[GitLab Runner monitoring](https://docs.gitlab.com/runner/monitoring/README.html).

Note that configuring GitLab by editing `/etc/gitlab/gitlab.rb` should be
accompanied by running the command `gitlab-ctl reconfigure` in order for
the changes to take effect.

Also, configuring nginx by editing the file
`/var/opt/gitlab/nginx/conf/nginx-status.conf`, for instance, should be
accompanied by running command `gitlab-ctl restart`. Note that changes to
the configuration file `/var/opt/gitlab/nginx/conf/nginx-status.conf` in
particular are erased by subsequent runs of command `gitlab-ctl
reconfigure` because `gitlab-ctl reconfigure` restores the original
configuration file.

The following table shows some of the Prometheus endpoint targets with links to
their respective configuration pages. Note that target `gitlab_monitor`
metrics are just targets `gitlab_monitor_database`,
`gitlab_monitor_process` and `gitlab_monitor_sidekiq` metrics combined.

| Agent Monitor Type    |     Gitlab Doc                           | Standard Port | Standard Path |
|-----------------------|------------------------------------------|---------------|---------------|
| gitlab | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_exporter.html) | 9168 | /metrics |
| [gitlab-gitaly](./gitlab-gitaly.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/gitaly/#doc-nav) | 9236 | /metrics |
| [gitlab-sidekiq](./gitlab-sidekiq.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html) | 8082 | /metrics |
| [gitlab-unicorn](./gitlab-unicorn.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#unicorn-metrics-available) | 8080 | /-/metrics |
| [gitlab-workhorse](./gitlab-workhorse.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html) | 9229 | /metrics |
| [prometheus/nginx-vts](./prometheus-nginx-vts.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html) | 8060 | /metrics |
| [prometheus/node](./prometheus-node.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/node_exporter.html) | 9100 | /metrics |
| [prometheus/postgres](./prometheus-postgres.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/postgres_exporter.html) | 9187 | /metrics |
| [prometheus/prometheus](./prometheus-prometheus.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html) | 9090 | /metrics |
| [prometheus/redis](./prometheus-redis.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/redis_exporter.html) | 9121 | /metrics |
| [gitlab-runner](./gitlab-runner.md) | [Gitlab doc](https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html) | 9252 | /metrics |

GitLab Prometheus exporters, nginx, and GitLab Runner must be configured to
listen to IP address(es) that include the IP address of the host or docker
container of the SignalFx Smart Agent. For example, the following configuration 
in `/etc/gitlab/gitlab.rb` configures the GitLab Postgres Prometheus
exporter to allow network connections on port `9187` from any IP address.

```
postgres_exporter['listen_address'] = '0.0.0.0:9187'
```

The previous configuration can also be written as:

```
postgres_exporter['listen_address'] = ':9187'
```

The following excerpt from the file `/var/opt/gitlab/nginx/conf/nginx-status.conf` shows the `location /metrics` block for metric related configuration.
This file configures nginx. The statement `allow 172.17.0.0/16;` allows
network connection in the `172.17.0.0/16` IP range. The assumption is that
the IP address associated with the SignalFx Smart Agent is in that IP
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

The following line is part of the global section of the file `/etc/gitlab-runner/config.toml`. This file configures GitLab Runner. The following statement  configures GitLab Runner's Prometheus metrics HTTP server to allows network connection on port `9252` from any IP address.

```
listen_address = "0.0.0.0:9252"
...

```

### Sample configuration

To monitor everything we support in GitLab, use the following configuration in the Smart Agent configuration:

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

You can use auto-discovery by specifying a `discoveryRule` instead of `host` and `port`.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `gitlab` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: gitlab
   ...  # Additional config
```
To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/gitlab:
    type: gitlab
    ... # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `httpTimeout` | no | `int64` | HTTP timeout duration for both read and writes. This should be a duration string that is accepted by https://golang.org/pkg/time/#ParseDuration (**default:** `10s`) |
| `username` | no | `string` | Basic Auth username to use on each request, if any. |
| `password` | no | `string` | Basic Auth password to use on each request, if any. |
| `useHTTPS` | no | `bool` | If true, the agent will connect to the server using HTTPS instead of plain HTTP. (**default:** `false`) |
| `httpHeaders` | no | `map of strings` | A map of HTTP header names to values. Comma separated multiple values for the same message-header is supported. |
| `skipVerify` | no | `bool` | If useHTTPS is true and this option is also true, the exporter's TLS cert will not be verified. (**default:** `false`) |
| `caCertPath` | no | `string` | Path to the CA cert that has signed the TLS cert, unnecessary if `skipVerify` is set to false. |
| `clientCertPath` | no | `string` | Path to the client TLS cert to use for TLS required connections |
| `clientKeyPath` | no | `string` | Path to the client TLS key to use for TLS required connections |
| `host` | **yes** | `string` | Host of the exporter |
| `port` | **yes** | `integer` | Port of the exporter |
| `useServiceAccount` | no | `bool` | Use pod service account to authenticate. (**default:** `false`) |
| `metricPath` | no | `string` | Path to the metrics endpoint on the exporter server, usually `/metrics` (the default). (**default:** `/metrics`) |
| `sendAllMetrics` | no | `bool` | Send all the metrics that come out of the Prometheus exporter without any filtering.  This option has no effect when using the prometheus exporter monitor directly since there is no built-in filtering, only when embedding it in other monitors. (**default:** `false`) |


## Metrics

The monitor sends the following metrics to Splunk Observability Cloud:

<div class="metrics-table" type="gitlab" include="markdown"></div>
