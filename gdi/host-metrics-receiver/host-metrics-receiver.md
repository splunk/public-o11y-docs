(host-metrics-receiver)=

# Host metrics receiver

<meta name="Description" content="Documentation on the host metrics receiver">

## Description

A receiver is how data gets into the Splunk Distribution of OpenTelemetry Collector. Receivers support one or more data sources - traces, metrics, or logs.

The host metrics receiver generates metrics about the host system scraped from various sources. Use this receiver when the Collector is deployed as an agent.

The supported pipeline type for this receiver is `metrics`.

```{note}
Metrics produced by this receiver count towards the custom metric ingestion limit. See {ref}`System limits for Splunk Infrastructure Monitoring <sys-limits>`.

To filter unwanted metrics, see the filter processor documentation on GitHub: [https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor).
```

### Benefits

```{include} /_includes/benefits.md
```

## Installation

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   - <a href="https://docs.splunk.com/Observability/gdi/opentelemetry/install-k8s.html" target="_blank">Install on Kubernetes</a>
   - <a href="https://docs.splunk.com/Observability/gdi/opentelemetry/install-linux.html" target="_blank">Install on Linux</a>
   - <a href="https://docs.splunk.com/Observability/gdi/opentelemetry/install-windows.html" target="_blank">Install on Windows</a>
2. Configure the receiver, as described in the next section.
3. Restart the Splunk Distribution of OpenTelemetry Collector.

## Configuration

The collection interval and the categories of metrics to be scraped can be [configured](#scraper-configuration), as shown in the following example.

```yaml
hostmetrics:
  collection_interval: <duration> # The default is 1m.
  scrapers:
    <scraper1>:
    <scraper2>:
    ...
```

The following table shows the available scrapers:

| Scraper    | Supported OS                                                            | Description                                            |
|------------|-------------------------------------------------------------------------|--------------------------------------------------------|
| cpu        | Not supported on macOS when compiled without Cgo, which is the default. | CPU utilization metrics                                |
| disk       | Not supported on macOS when compiled without Cgo, which is the default. | Disk I/O metrics                                       |
| load       | All                                                                     | CPU load metrics                                       |
| filesystem | All                                                                     | File system utilization metrics                        |
| memory     | All                                                                     | Memory utilization metrics                             |
| network    | All                                                                     | Network interface I/O metrics & TCP connection metrics |
| paging     | All                                                                     | Paging or swap space utilization and I/O metrics       |
| processes  | Linux                                                                   | Process count metrics                                  |
| process    | Linux and Windows                                                       | Per process CPU, memory, and disk I/O metrics          |

### Scraper configuration

Scrapers extract data from endpoints and then send that data to a specified target. See the following sections for scraper configurations.

#### Disk

```yaml
disk:
  <include|exclude>:
    devices: [ <device name>, ... ]
    match_type: <strict|regexp>
```

#### File system

.. note:: 
    The SignalFx exporter excludes some available file system metrics by default. Learn more about default metric filters in :new-page:`GitHub <https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/signalfxexporter#default-metric-filters>`. See the complete list of file system metrics in :new-page:`GitHub <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/internal/scraper/filesystemscraper/documentation.md>`. 

```yaml
filesystem:
  <include_devices|exclude_devices>:
    devices: [ <device name>, ... ]
    match_type: <strict|regexp>
  <include_fs_types|exclude_fs_types>:
    fs_types: [ <filesystem type>, ... ]
    match_type: <strict|regexp>
  <include_mount_points|exclude_mount_points>:
    mount_points: [ <mount point>, ... ]
    match_type: <strict|regexp>
```

For example, for Linux systems, `/` is a common mount point:

```yaml
filesystem:
  include_mount_points:
    mount_points: ["/"]
    match_type: strict
```

Similarly, for Windows systems, `C:` is a common mount point.

```yaml
filesystem:
  include_mount_points:
    mount_points: ["C:"]
    match_type: strict
```

Find more examples in our <a href="https://github.com/signalfx/splunk-otel-collector-chart/blob/e9c3758ee9fa8b82c0ec67a5f855095d624b5178/helm-charts/splunk-otel-collector/templates/daemonset.yaml#L450">GitHub repos</a>.

#### Network

```yaml
network:
  <include|exclude>:
    interfaces: [ <interface name>, ... ]
    match_type: <strict|regexp>
```

#### Process

```yaml
process:
  <include|exclude>:
    names: [ <process name>, ... ]
    match_type: <strict|regexp>
  mute_process_name_error: <true|false>
  scrape_process_delay: <time>
```

### Advanced configurations

#### Filtering

To only gather a subset of metrics from a particular source, use the host metrics receiver with the filter processor.

#### Different frequencies

To scrape some metrics at a different frequency than others, configure multiple host metrics receivers with different `collection_interval` values. For example:

```yaml
receivers:
  hostmetrics:
    collection_interval: 30s
    scrapers:
      cpu:
      memory:

  hostmetrics/disk:
    collection_interval: 1m
    scrapers:
      disk:
      filesystem:

service:
  pipelines:
    metrics:
      receivers: [hostmetrics, hostmetrics/disk]

```

## Get help

```{include} /_includes/troubleshooting.md
```
