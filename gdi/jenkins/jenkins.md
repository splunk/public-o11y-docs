(jenkins)=

# Jenkins

<meta name="description" content="Documentation for the jenkins monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `jenkins` monitor with the [SignalFx Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). The integration collects metrics from Jenkins instances by hitting these endpoints:

- Job metrics with the `../api/json` endpoint
- Codahale or Dropwizard JVM metrics with the `metrics/<MetricsKey>/..` endpoint

To see the monitor source, view the [signalfx-agent project](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/jenkins) on GitHub.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

Follow these steps to deploy the integration:

1. Download the Metrics Plugin in Jenkins. For more information, see [Metrics](https://plugins.jenkins.io/metrics/) on the Jenkins website.
2. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
3. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `jenkins` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

After you deploy the Splunk OpenTelemetry Collector, follow these steps to activate the monitor in the Splunk OpenTelemetry Collector:
```
monitors:  # All monitor config goes under this key
 - type: jenkins
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/jenkins:
    type: jenkins
    ...  # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pythonBinary` | no | `string` | Path to a python binary that should be used to execute the Python code. If not set, a built-in runtime will be used.  Can include arguments to the binary as well. |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `path` | no | `string` |  |
| `metricsKey` | **yes** | `string` | Key required for collecting metrics.  The access key located at `Manage Jenkins > Configure System > Metrics > ADD.` If empty, click `Generate`. |
| `enhancedMetrics` | no | `bool` | Whether to enable enhanced metrics (**default:** `false`) |
| `includeMetrics` | no | `list of strings` | Used to enable individual enhanced metrics when `enhancedMetrics` is false |
| `username` | no | `string` | User with security access to jenkins |
| `apiToken` | no | `string` | API Token of the user |
| `useHTTPS` | no | `bool` | Whether to enable HTTPS. (**default:** `false`) |
| `sslKeyFile` | no | `string` | Path to the keyfile |
| `sslCertificate` | no | `string` | Path to the certificate |
| `sslCACerts` | no | `string` | Path to the ca file |
| `skipVerify` | no | `bool` | Skip SSL certificate validation (**default:** `false`) |


### Sample YAML configuration

Sample basic YAML configuration:

```yaml
monitors:
- type: jenkins
  host: 127.0.0.1
  port: 8080
  metricsKey: reallylongmetricskey
```

Sample YAML configuration with specific enhanced metrics included:

```yaml
monitors:
- type: jenkins
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
- type: jenkins
  host: 127.0.0.1
  port: 8080
  metricsKey: reallylongmetricskey
  enhancedMetrics: true
```

## Metrics

These metrics are available for this integration.

<div class="metrics-table" type="jenkins"  include="markdown"></div>