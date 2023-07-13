(snmp)=

# SNMP agent

<meta name="description" content="Use this Splunk Observability Cloud integration for the SNMP agent monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `snmp` monitor type to collect metrics from SNMP agents.

This integration is available for Kubernetes, Windows, and Linux.

```{note}
This monitor doesn't support MIB lookups`.
```

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
  smartagent/snmp:
    type: telegraf/snmp
    ...  # Additional config
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/snmp]
```

### Advanced configuration example

The following is a sample Smart Agent monitor configuration:

```yaml
receivers:
  smartagent/snmp:
    type: telegraf/snmp
    agents: "127.0.0.1:161"
    version: 2
    community: "public"
    fields:
        name: "uptime"
        oid: ".1.3.6.1.2.1.1.3.0"
```

The following is a sample Smart Agent monitor configuration using a discovery rule:

```yaml
receivers:
  smartagent/snmp:
    type: telegraf/snmp
    discoveryRule: container_name =~ "snmp" && port == 161
    version: 2
    community: "public"
      fields:
        name: "uptime"
        oid: ".1.3.6.1.2.1.1.3.0"
```

### Configuration settings

The following table shows the configuration options for the SNMP agent monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | No | `string` | Host name or IP address of the SNMP agent. Host and port are concatenated and appended to the list of SNMP agents to connect to. |
| `port` | No | `integer` | Port of the SNMP agent host. Port and Host are concatenated and appended to the list of SNMP agents to connect to. The default value is `0`. |
| `agents` | No | `list of strings` | List of SNMP agent address and ports to query for information. For example, `0.0.0.0:5555`. If an address is supplied without a port, the default port is `161`. |
| `retries` | No | `integer` | Number of retries. The default value is `0`. |
| `community` | No | `string` | SNMP community to use. The default value is `public`. |
| `maxRepetitions` | No | `uint8` | Maximum number of iterations for repeating variables The default value is `50`. |
| `contextName` | No | `string` | SNMP v3 context name to use with requests. |
| `secLevel` | No | `string` | Security level to use for SNMP v3 messages: `noAuthNoPriv`, `authNoPriv`, or `authPriv`. The default value is `noAuthNoPriv`. |
| `secName` | No | `string` | Name to used to authenticate with SNMP v3 requests. |
| `authProtocol` | No | `string` | Protocol to used to authenticate SNMP v3 requests: `"MD5"`, `"SHA"`, or `""` (default). |
| `authPassword` | No | `string` | Password used to authenticate SNMP v3 requests. |
| `privProtocol` | No | `string` | Protocol used for encrypted SNMP v3 messages: `DES`, `AES`, or `""` (default). |
| `privPassword` | No | `string` | Password used to encrypt SNMP v3 messages. |
| `engineID` | No | `string` | The SNMP v3 engine ID. |
| `engineBoots` | No | `uint32` | The SNMP v3 engine boots. The default value is `0`. |
| `engineTime` | No | `uint32` | The SNMP v3 engine time. The default value is `0`. |
| `name` | No | `string` | The top-level measurement name. |
| `fields` | No | `list of objects (see below)` | The top-level SNMP fields. |
| `tables` | No | `list of objects (see below)` | SNMP Tables. |

The nested `fields` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | No | `string` | Name of the field. The OID is used if no value is supplied. |
| `oid` | No | `string` | The OID to retrieve. |
| `oidIndexSuffix` | No | `string` | The subidentifier to strip off when matching indexes to other fields. |
| `oidIndexLength` | No | `integer` | The index length after the table OID. The index is truncated after this length to remove length index suffixes or nonfixed values. The default value is `0`. |
| `isTag` | No | `bool` | Whether to output the field as a tag. The default value is `false`. |
| `conversion` | No | `string` | Controls the type conversion applied to the value: `"float(X)"`, `"float"`, `"int"`, `"hwaddr"`, `"ipaddr"`, or `""` (default). |

The nested `tables` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | No | `string` | Metric name. If not supplied the OID is used. |
| `inheritTags` | No | `list of strings` | Top level tags to inherit. |
| `indexAsTag` | No | `bool` | Add a tag for the table index for each row. The default value is `false`. |
| `field` | No | `list of objects (see below)` | Specifies the tags and values to look up. |
| `oid` | No | `string` | The OID to retrieve. |

The nested `field` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | No | `string` | Name of the field. The OID are used if no value is supplied. |
| `oid` | No | `string` | The OID to retrieve. |
| `oidIndexSuffix` | No | `string` | The sub-identifier to strip off when matching indexes to other fields. |
| `oidIndexLength` | No | `integer` | The index length after the table OID. The index is truncated after this length to remove length index suffixes or nonfixed values. The default value is `0`. |
| `isTag` | No | `bool` | Whether to output the field as a tag. The default value is `false`. |
| `conversion` | No | `string` | Controls the type conversion applied to the value: `"float(X)"`, `"float"`, `"int"`, `"hwaddr"`, `"ipaddr"`, or `""` (default). |

## Metrics

This integration doesn't produce any metrics.

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
