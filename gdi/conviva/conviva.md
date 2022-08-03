(conviva)=

# Conviva Real-Time/Live video play

<meta name="Description" content="Documentation on the conviva monitor">

## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `conviva` monitor via the [Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver).

This monitor uses version 2.4 of the Conviva Experience Insights REST APIs to pull
`Real-Time/Live` video playing experience metrics from Conviva.

Only `Live` conviva metrics listed on the
[Conviva Developer Community](https://community.conviva.com/site/global/apis_data/experience_insights_api/index.gsp#metrics) page
are supported. All metrics are gauges. The Conviva metrics are converted to Splunk Observability Cloud metrics with dimensions named account and filter. The account dimension is the name of the Conviva account and the filter dimension is the name of the Conviva filter applied to the metric. In the case of MetricLenses, the constituent MetricLens metrics and MetricLens dimensions are included. The values of the MetricLens dimensions are derived from the values of the associated MetricLens dimension entities.

## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `conviva` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: conviva
   ...  # Additional config
```

To activate this monitor in the OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/conviva:
    type: conviva
    ... # Additional config
```

The following table shows the configuration options for this monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `pulseUsername` | **yes** | `string` | Conviva Pulse username required with each API request. |
| `pulsePassword` | **yes** | `string` | Conviva Pulse password required with each API request. |
| `timeoutSeconds` | no | `integer` |  (**default:** `10`) |
| `metricConfigs` | no | `list of objects (see below)` | Conviva metrics to fetch. The default is quality_metriclens metric with the "All Traffic" filter applied and all quality_metriclens dimensions. |


The **nested** `metricConfigs` config object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `account` | no | `string` | Conviva customer account name. The default account is fetched used if not specified. |
| `metricParameter` | no | `string` |  (**default:** `quality_metriclens`) |
| `filters` | no | `list of strings` | Filter names. The default is `All Traffic` filter |
| `metricLensDimensions` | no | `list of strings` | MetricLens dimension names. The default is names of all MetricLens dimensions of the account |
| `excludeMetricLensDimensions` | no | `list of strings` | MetricLens dimension names to exclude. |
| `maxFiltersPerRequest` | no | `integer` | Max number of filters per request. The default is the number of filters. Multiple requests are made if the number of filters is more than maxFiltersPerRequest (**default:** `0`) |

## Example configurations

This is a sample YAML configuration showing the most basic configuration of the Conviva monitor
using only the required fields. For this configuration, the monitor will default to fetching quality MetricLens
metrics for all dimensions from the default Conviva account using the `All Traffic` filter.

```
monitors:
- type: conviva
 pulseUsername: <username>
 pulsePassword: <password>
```

Individual metrics are configured as a list of metricConfigs as shown in the following sample configuration. The
metrics a fetched using the specified metricParameter. See the list of metric parameters in the [Conviva monitor metric parameters and metrics](#conviva-monitor-metric-parameters-and-metrics) section.

The Conviva metrics reported to SignalFx are prefixed by `conviva.`, `conviva.quality_metriclens.` and
`conviva.audience_metriclens.` accordingly. The metric names are the `titles` of the metrics, which correspond to the Conviva
`metric parameters` on the [Conviva Developer Community](https://community.conviva.com/site/global/apis_data/experience_insights_api/index.gsp#metrics) page.

Where an account is not provided, the default account is fetched and used. Where no filters are specified the
`All Traffic` filter is used. Where `MetricLens` dimensions are not specified, all `MetricLens` dimensions
are fetched and used. The `_ALL_` keyword means all. `MetricLens` dimension configuration applies only to `MetricLenses`.
If specified for a regular metric, they will be ignored. `MetricLens` dimensions listed in `excludeMetricLensDimensions`
are excluded.

```
monitors:
- type: conviva
 pulseUsername: <username>
 pulsePassword: <password>
 metricConfigs:
   - account: c3.NBC
     metricParameter: quality_metriclens
     filters:
       - All Traffic
     metricLensDimensions:
       - Cities
   - metricParameter: avg_bitrate
     maxFiltersPerRequest: 99
     filters:
       - _ALL_
   - metricParameter: concurrent_plays
   - metricParameter: audience_metriclens
     filters:
       - All Traffic
     metricLensDimensions:
       - _ALL_
     excludeMetricLensDimensions:
       - CDNs
```

Add the extra dimension metric_source as shown in following sample configuration for the convenience of searching
for your metrics in SignalFx using the metric_source value you specify. Also, version 2.4 of the Conviva Experience
Insights REST APIs limits the number of filters per request to 99. Specify the maximum number of filters per request
using `maxFiltersPerRequest` as shown in the previous example in order to limit the number of filters per request.

```
monitors:
- type: conviva
 pulseUsername: <username>
 pulsePassword: <password>
 extraDimensions:
   metric_source: conviva
```
## Conviva monitor metric parameters and metrics

Metric parameters are conviva monitor `metricParameter` configuration values. Metrics are the metrics that get reported to Splunk Observability Cloud.

|Metric Parameters|Metrics|Description|
|----------------|------|-----------|
|attempts|conviva.<br/>attempts|Attempts time-series|
|avg_bitrate|conviva.<br/>avg_bitrate|Average bitrate time-series|
|concurrent_plays|conviva.<br/>concurrent_plays|Concurrent plays time-series|
|connection_induced<br/>_rebuffering_ratio|conviva.<br/>connection_induced<br/>_rebuffering_ratio|Connection induced rebuffering ratio simple-series|
|connection_induced<br/>_rebuffering_ratio<br/>_timeseries|conviva.<br/>connection_induced<br/>_rebuffering_ratio<br/>_timeseries|Connection induced rebuffering ratio time-series|
|duration_connection<br/>_induced_rebuffering<br/>_ratio_distribution|conviva.<br/>duration_connection<br/>_induced_rebuffering<br/>_ratio_distribution|Duration vs. connection induced rebuffering ratio distribution label-series|
|exits_before<br/>_video_star|conviva.<br/>exits_before<br/>_video_start|Exits before video start time-series|
|ended_plays|conviva.<br/>ended_plays|Ended plays simple-series|
|ended_plays<br/>_timeseries|conviva.<br/>ended_plays<br/>_timeseries|Ended plays time-series|
|plays|conviva.<br/>plays|Plays time-series|
|play_bitrate<br/>_distribution|conviva.<br/>play_bitrate<br/>_distribution|Play bitrate distribution label-series|
|play_buffering<br/>_ratio_distribution|conviva.<br/>play_buffering<br/>_ratio_distribution|Play buffering ratio distribution label-series|
|play_connection<br/>_induced_rebuffering<br/>_ratio_distribution|conviva.<br/>play_connection<br/>_induced_rebuffering<br/>_ratio_distribution|Play connection induced rebuffering ratio distribution label-series|
|quality_summary|conviva.<br/>quality_summary|Quality summary label-series|
|rebuffered_plays|conviva.<br/>rebuffered_plays|Rebuffered plays time-series|
|rebuffering_ratio|conviva.<br/>rebuffering_ratio|Rebuffering ratio time-series|
|top_assets_15_mins|conviva.<br/>top_assets_15_mins|Top assets over last 15 minutes simple-table|
|top_assets_summary|conviva.<br/>top_assets_summary|Top assets summary label-series|
|video_playback<br/>_failures|conviva.<br/>video_playback<br/>_failures|Video playback failures simple-series|
|video_playback<br/>_failures_timeseries|conviva.<br/>video_playback<br/>_failures_timeseries|Video playback failures time-series|
|video_playback<br/>_failures_distribution|conviva.<br/>video_playback<br/>_failures_distribution|Video playback failures distribution label-series|
|video_restart<br/>_time|conviva.<br/>video_restart<br/>_time|Video restart time simple-series|
|video_restart<br/>_time_timeseries|conviva.<br/>video_restart<br/>_time_timeseries|Video restart time time-series|
|video_restart<br/>_time_distribution|conviva.<br/>video_restart_time<br/>_distribution|Video restart time distribution label-series|
|video_start<br/>_failures|conviva.<br/>video_start<br/>_failures|Video start failures time-series|
|video_start<br/>_failures_errornames|conviva.<br/>video_start<br/>_failures_errornames|Video start failures by error names simple-table|
|video_startup_time|conviva.<br/>video_startup_time|Video startup time label-series|
|quality_metriclens|conviva.<br/>quality_metriclens.<br/>total_attempts|Attempts|
||conviva.<br/>quality_metriclens.<br/>video_start<br/>_failures_percent|Video Start Failures(VSF) (%)|
||conviva.<br/>quality_metriclens.<br/>exits_before<br/>_video_start<br/>_percent|Exits Before Video Starts (EBVS) (%)|
||conviva.<br/>quality_metriclens.<br/>plays_percent|Plays (%)|
||conviva.<br/>quality_metriclens.<br/>video_startup<br/>_time_sec|Video Startup Time (sec)|
||conviva.<br/>quality_metriclens.<br/>rebuffering_ratio<br/>_percent|Rebuffering Ratio (%)|
||conviva.<br/>quality_metriclens.<br/>average_bitrate<br/>_kbps|Average Bitrate (bps). This metric can be returned in kbps with the ab_units=kbps parameter. Unless this parameter is specified, average bitrate is bps.|
||conviva.<br/>quality_metriclens.<br/>video_playback<br/>_failures_percent|Video Playback Failures (%)|
||conviva.<br/>quality_metriclens.<br/>ended_plays|Ended Plays|
||conviva.<br/>quality_metriclens.<br/>connection_induced<br/>_rebuffering_ratio<br/>_percent|Connection Induced ReBuffering Ratio (%)|
||conviva.<br/>quality_metriclens.<br/>video_restart_time|Video Restart Time|
|audience_metriclens|conviva.<br/>audience_metriclens.<br/>concurrent_plays|Concurrent Plays|
||conviva.<br/>audience_metriclens.<br/>plays|Plays|
||conviva.<br/>audience_metriclens.<br/>ended_plays|Ended Plays|

## Metrics

The monitor sends the following metrics to Splunk Observability Cloud:

<div class="metrics-table" type="conviva" include="markdown"></div>