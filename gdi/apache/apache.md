(apache)=

# Apache web server

<meta name="description" content="Documentation for the apache monitor">

## Description

The [Splunk OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `apache` monitor with the [SignalFx Smart Agent receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver). The integration monitors Apache web servers using information `mod_status` provides.

To see the monitor source, view the [signalfx-agent project](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/collectd/apache) on GitHub.

Apache worker threads can be in one of the following states:

| State        | Remark                                  |
|--------------|-----------------------------------------|
| Open         | Open (unused) slot - no process         |
| Waiting      | Idle and waiting for request            |
| Sending      | Serving response                        |
| KeepAlive    | Kept alive for possible next request    |
| Idle_cleanup | Idle and marked for cleanup             |
| Closing      | Closing connection                      |
| Logging      | Writing to log file                     |
| Reading      | Reading request                         |
| Finishing    | Finishing as part of graceful shutdown  |
| Starting     | Starting up to serve                    |

## Installation

**Note:** Providing an `apache` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

Follow these steps to deploy the integration:

1. Deploy the Splunk OpenTelemetry Collector to your host or container platform.
2. Complete the [Splunk OpenTelemetry Collector configuration](#splunk-opentelemetry-collector-configuration).
3. Complete the [Apache configuration](#apache-configuration).

## Splunk OpenTelemetry Collector configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

After you deploy the Splunk OpenTelemetry Collector, follow these steps to activate the monitor in the Splunk OpenTelemetry Collector:

1. Add the following monitor to your agent configuration:

   ```
   monitors:  # All monitor config goes under this key
    - type: apache
      ...  # Additional config
   ```

2. Restart the Splunk OpenTelemetry Collector.

## Apache configuration

After you deploy the monitor in the Splunk OpenTelemetry Collector, follow these steps to configure the Apache web server to expose status metrics:

1. Enable the `mod_status` module in your Apache server. Make sure that the URL you provide for your `mod_status` module ends in `?auto`. This returns the status page as `text/plain`, which the monitor requires.
2. Add the following configuration to your Apache server:

   ```
    ExtendedStatus on
    <Location /mod_status>
    SetHandler server-status
    </Location>
   ```
3. Restart the Apache web server.

## Metrics

These metrics are available for this integration.

<div class="metrics-table" type="apache"  include="markdown"></div>
