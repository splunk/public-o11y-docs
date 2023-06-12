(telegraf-logparser)=

# Logparser

<meta name="description" content="Use this Splunk Observability Cloud integration for the telegraf/logparser plugin monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `telegraf/logparser` monitor type to tail log files.

This integration is based on the Telegraf logparser plugin, and all emitted metrics have the plugin dimension set to `telegraf-logparser`.

## Benefits

```{include} /_includes/benefits.md
```

##  Installation

```{include} /_includes/collector-installation.md
```

## Configuration  

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/logparser:
    type: telegraf/logparser
    ...  # Additional config
```

To complete the integration, include this monitor type as a member of a `logs` pipeline. Use the SignalFx exporter to make event submission requests. Use the Resource Detection processor to ensure that host identity and other useful information is made available as event dimensions. For example:

```yaml
service:
  pipelines:
    logs:
      receivers:
        - smartagent/logparser
      processors:
        - resourcedetection
      exporters:
        - signalfx
```

The following example shows a sample YAML configuration:

```yaml
receivers:
  smartagent/logparser:
    type: telegraf/logparser
    files:
     - '$file'
    watchMethod: poll
    # Specifies the file watch method ("inotify" or "poll").
    fromBeginning: true     
    # Specifies to read from the beginning.
    measurementName: test-measurement 
    # This is the metric name prefix.
    patterns:
     - "%{COMMON_LOG_FORMAT}" 
    # Specifies the Apache Common Log Format (CLF).
    timezone: UTC
```

### Configuration options

The following table shows the configuration options for this monitor type:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `files` | **yes** | `list of strings` | Paths to files to be tailed |
| `watchMethod` | no | `string` | Method for watching changes to files ("ionotify" or "poll"). The default value is `poll`. |
| `fromBeginning` | no | `bool` | Whether to start tailing from the beginning of the file. The default value is `false`. |
| `measurementName` | no | `string` | Name of the measurement |
| `patterns` | no | `list of strings` | A list of patterns to match. |
| `namedPatterns` | no | `list of strings` | A list of named grok patterns to match. |
| `customPatterns` | no | `string` | Custom grok patterns. (`grok` only) |
| `customPatternFiles` | no | `list of strings` | List of paths to custom grok pattern files. |
| `timezone` | no | `string` | Specifies the timezone. The default is UTC time. Other options are `Local` for the local time on the machine, `UTC`, and `Canada/Eastern` (unix style timezones). |

## Metrics

The Splunk Distribution of OpenTelemetry Collector does not do any built-in filtering of metrics coming out of this monitor type.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
