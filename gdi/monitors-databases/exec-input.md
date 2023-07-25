(exec-input)=

# Exec Input

<meta name="description" content="Use this Splunk Observability Cloud integration for the Telegraf Exec monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the Exec Input monitor type, an embedded form of the Telegraf Exec plugin, to receive metrics or logs from exec files.  

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation.md
```

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/exec:
    type: telegraf/exec
    ...  # Additional config
```

Next, include the monitor in a `logs` pipeline that utilizes an exporter that makes the event submission requests. Use a Resource Detection processor to ensure that host identity and other useful information is made available as event dimensions. For example:

```yaml
service:
  pipelines:
    logs:
      receivers:
        - smartagent/exec
      processors:
        - resourcedetection
      exporters:
        - signalfx
```

### Configuration settings

The following tables show the configuration options for this monitor type:

| Option                      | Required | Type                 | Description                                                                                                                                                                      |
| --------------------------- | -------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `commands`                  | no       | `list of strings`    |                                                                                                                                                                                  |
| `command`                   | no       | `string`             |                                                                                                                                                                                  |
| `timeout`                   | no       | `int64`              | The default value is `0`.                                                                                                                                                        |
| `telegrafParser`            | no       | `object (see below)` | `telegrafParser` is a nested object that defines configurations for a Telegraf parser. Refer to the Telegraf documentation for more information on Telegraf parsers.             |
| `signalFxCumulativeMetrics` | no       | `list of strings`    | A list of metric names typed as "cumulative counters" in Splunk Observability Cloud. The Telegraf Exec plugin only emits `untyped` metrics, which are sent as gauges by default. |

The **nested** `telegrafParser` configuration object has the following fields:

| Option                         | Required | Type              | Description                                                                                                                                                                                              |
| ------------------------------ | -------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataFormat`                   | no       | `string`          | dataFormat specifies a data format to parse: `json`, `value`, `influx`, `graphite`, `value`, `nagios`, `collectd`, `dropwizard`, `wavefront`, `grok`, `csv`, or `logfmt`. The default value is `influx`. |
| `defaultTags`                  | no       | `map of strings`  | defaultTags are tags added to all metrics. (`json`, `value`, `graphite`, `collectd`, `dropwizard`, `wavefront`, `grok`, `csv` and `logfmt` only)                                                         |
| `metricName`                   | no       | `string`          | metricName applies to (`json` and `value`). This is the name of the measurement.                                                                                                                         |
| `dataType`                     | no       | `string`          | dataType specifies the value type to parse the value to: `integer`, `float`, `long`, `string`, or `boolean`. (`value` only)                                                                              |
| `JSONTagKeys`                  | no       | `list of strings` | A list of tag names to fetch from JSON data. (`json` only)                                                                                                                                               |
| `JSONStringFields`             | no       | `list of strings` | A list of fields in JSON to extract and use as string fields. (json only)                                                                                                                                |
| `JSONNameKey`                  | no       | `string`          | A path used to extract the metric name in JSON data.  (`json` only)                                                                                                                                      |
| `JSONQuery`                    | no       | `string`          | A gjson path for json parser. (`json` only)                                                                                                                                                              |
| `JSONTimeKey`                  | no       | `string`          | The name of the timestamp key. (`json` only)                                                                                                                                                             |
| `JSONTimeFormat`               | no       | `string`          | Specifies the timestamp format. (`json` only)                                                                                                                                                            |
| `separator`                    | no       | `string`          | Separator for Graphite data. (`graphite` only).                                                                                                                                                          |
| `templates`                    | no       | `list of strings` | A list of templates for Graphite data. (`graphite` only).                                                                                                                                                |
| `collectdAuthFile`             | no       | `string`          | The path to the collectd authentication file (`collectd` only)                                                                                                                                           |
| `collectdSecurityLevel`        | no       | `string`          | Specifies the security level: `none` (default), `sign`, or `encrypt`. (`collectd only`)                                                                                                                  |
| `collectdTypesDB`              | no       | `list of strings` | A list of paths to collectd TypesDB files. (`collectd` only)                                                                                                                                             |
| `collectdSplit`                | no       | `string`          | Indicates whether to separate or join multivalue metrics. (`collectd` only)                                                                                                                              |
| `dropwizardMetricRegistryPath` | no       | `string`          | An optional gjson path used to locate a metric registry inside of JSON data. The default behavior is to consider the entire JSON document. (`dropwizard` only)                                           |
| `dropwizardTimePath`           | no       | `string`          | An optional gjson path used to identify the drop wizard metric timestamp. (`dropwizard` only)                                                                                                            |
| `dropwizardTimeFormat`         | no       | `string`          | The format used for parsing the drop wizard metric timestamp. The default format is `time.RFC3339`. (`dropwizard` only)                                                                                  |
| `dropwizardTagsPath`           | no       | `string`          | An optional gjson path used to locate drop wizard tags. (`dropwizard` only)                                                                                                                              |
| `dropwizardTagPathsMap`        | no       | `map of strings`  | A map of gjson tag names and gjson paths used to extract tag values from the JSON document. This is only used if `dropwizardTagsPath` is not specified. (`dropwizard` only)                              |
| `grokPatterns`                 | no       | `list of strings` | A list of patterns to match. (`grok` only)                                                                                                                                                               |
| `grokNamedPatterns`            | no       | `list of strings` | A list of named grok patterns to match.  (`grok` only)                                                                                                                                                   |
| `grokCustomPatterns`           | no       | `string`          | Custom grok patterns. (`grok` only)                                                                                                                                                                      |
| `grokCustomPatternFiles`       | no       | `list of strings` | List of paths to custom grok pattern files. (`grok` only)                                                                                                                                                |
| `grokTimezone`                 | no       | `string`          | Specifies the timezone. The default is UTC time.  Other options are `Local` for the local time on the machine, `UTC`, and `Canada/Eastern` (unix style timezones).  (`grok` only)                        |
| `CSVDelimiter`                 | no       | `string`          | The delimiter used between fields in the csv. (`csv` only)                                                                                                                                               |
| `CSVComment`                   | no       | `string`          | The character used to mark rows as comments. (`csv` only)                                                                                                                                                |
| `CSVTrimSpace`                 | no       | `bool`            | Indicates whether to trim leading white from fields. (`csv` only) The default value is `false`.                                                                                                          |
| `CSVColumnNames`               | no       | `list of strings` | List of custom column names. All columns must have names. Unnamed columns are ignored. This configuration must be set when `CSVHeaderRowCount` is 0. (`csv` only)                                        |
| `CSVColumnTypes`               | no       | `list of strings` | List of types to assign to columns. Acceptable values are `int`, `float`, `bool`, or `string` (`csv` only).                                                                                              |
| `CSVTagColumns`                | no       | `list of strings` | List of columns added as tags. Unspecified columns are added as fields. (`csv` only)                                                                                                                     |
| `CSVMeasurementColumn`         | no       | `string`          | The name of the column to extract the metric name from (`csv` only)                                                                                                                                      |
| `CSVTimestampColumn`           | no       | `string`          | The name of the column to extract the metric timestamp from. `CSVTimestampFormat` must be set when using this option.  (`csv` only)                                                                      |
| `CSVTimestampFormat`           | no       | `string`          | The format to use for extracting timestamps. (`csv` only)                                                                                                                                                |
| `CSVHeaderRowCount`            | no       | `integer`         | The number of rows that are headers. By default, no rows are treated as headers. (`csv` only) The default value is `0`.                                                                                  |
| `CSVSkipRows`                  | no       | `integer`         | The number of rows to ignore before looking for headers. (`csv` only) The default value is `0`.                                                                                                          |
| `CSVSkipColumns`               | no       | `integer`         | The number of columns to ignore before parsing data on a given row. (`csv` only) The default value is `0`.                                                                                               |

## Metrics

The agent does not do any built-in filtering of metrics coming out of this monitor.

By default, all metrics are emitted as gauges. If you have cumulative counter metrics that you want properly typed in Splunk Observability Cloud, use one of the following options:

- Set the configuration option `signalFxCumulativeCounters` to the list of metric names to be considered as counters. Note that these names are the full names that are sent to Splunk Observability Cloud (for example, `<metric>.<field>`).
- Set a tag named `signalfx_type` on the metric emitted by the exec script to `cumulative`. All other values are ignored. Note that you **must allow this tag value through in your parser configuration** if the parser ignores certain fields. For example, the JSON parser requires adding `signalfx_type` to the `JSONTagKeys` configuration option.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
