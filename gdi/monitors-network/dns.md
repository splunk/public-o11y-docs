(dns)=

# DNS Query Input

<meta name="description" content="Use this Splunk Observability Cloud integration for the Telegraf DNS monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the DNS Query Input monitor type (an embedded form of the Telegraf DNS Query plugin) to collect DNS data. 

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

```
receivers:
  smartagent/dns:
    type: telegraf/dns
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
 pipelines:
   metrics:
     receivers: [smartagent/dns]
```

### Configuration settings 

The following table shows the configuration options for this integration:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `domains` | no | `list of strings` | Domains or subdomains to query. If this is not provided, it is `["."]` and `RecordType` is forced to `NS`. |
| `network` | no | `string` | Network is the network protocol name. (**default:** `udp`) |
| `port` | no | `integer` | DNS server port. (**default:** `53`) |
| `servers` | **yes** | `list of strings` | Servers to query. |
| `recordType` | no | `string` | Query record type (A, AAAA, CNAME, MX, NS, PTR, TXT, SOA, SPF, SRV). (**default:** `NS`) |
| `timeout` | no | `int64` | Query timeout. Use a duration string that is accepted by https://golang.org/pkg/time/#ParseDuration. (**default:** `2s`) |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/signalfx-agent/main/pkg/monitors/telegraf/monitors/dns/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```