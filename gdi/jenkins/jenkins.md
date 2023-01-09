(jenkins)=

# Jenkins

<meta name="description" content="Use this Splunk Observability Cloud integration for the Jenkins monitor. See benefits, install, configuration, and metrics">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `jenkins` monitor by using the SignalFx Smart Agent Receiver. 

Use this integration to collect metrics from Jenkins instances by hitting the following endpoints:

- Job metrics with the `../api/json` endpoint
- Codahale or Dropwizard JVM metrics with the `metrics/<MetricsKey>/..` endpoint
## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Configuration example

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/jenkins:
    type: collectd/jenkins
    ...  # Additional config
```

To complete the monitor activation, you must also include the `smartagent/jenkins` receiver item in a `metrics` pipeline. To do this, add the receiver item to the `service/pipelines/metrics/receivers` section of your configuration file. For example:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/jenkins]
```

See <a href="https://github.com/signalfx/splunk-otel-collector/tree/main/examples" target="_blank">configuration examples</a> for specific use cases that show how the Splunk Distribution of OpenTelemetry Collector can integrate and complement existing environments.

### Configuration settings

The following table shows the configuration options for this monitor:

| Option| Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `path` | no | `string` |  |
| `metricsKey` | **yes** | `string` | Key required for collecting metrics.  The access key located at `Manage Jenkins > Configure System > Metrics > ADD.` If empty, click `Generate`. |
| `enhancedMetrics` | no | `bool` | Whether to enable enhanced metrics (**default:** `false`) |
| `includeMetrics` | no | `list of strings` | Used to enable individual enhanced metrics when `enhancedMetrics` is set to `false` |
| `username` | no | `string` | User with security access to Jenkins |
| `apiToken` | no | `string` | API Token of the user |
| `useHTTPS` | no | `bool` | Whether to enable HTTPS. (**default:** `false`) |
| `sslKeyFile` | no | `string` | Path to the keyfile |
| `sslCertificate` | no | `string` | Path to the certificate |
| `sslCACerts` | no | `string` | Path to the ca file |
| `skipVerify` | no | `bool` | Skip SSL certificate validation (**default:** `false`) |


### Sample YAML configurations

Sample basic YAML configuration:

```yaml
monitors:
- type: collectd/jenkins
  host: 127.0.0.1
  port: 8080
  metricsKey: reallylongmetricskey
```

Sample YAML configuration with specific enhanced metrics included:

```yaml
monitors:
- type: collectd/jenkins
  host: 127.0.0.1
  port: 8080
  metricsKey: reallylongmetricskey
  includeMetrics:
  - "vm.daemon.count"
  - "vm.terminated.count"
```

Sample YAML configuration with all enhanced metrics included:

```yaml
monitors:
- type: collectd/jenkins
  host: 127.0.0.1
  port: 8080
  metricsKey: reallylongmetricskey
  enhancedMetrics: true
```

## Metrics

These metrics are available for this integration.

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/collectd/jenkins/metadata.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
