(snmp)=

# SNMP agent

<meta name="description" content="Documentation on the snmp monitor">


## Description

The [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector) provides this integration as the `snmp` monitor via the Smart Agent Receiver.

This monitor reports metrics from SNMP agents.

**Note:** This `snmp` monitor does not currently support MIB look ups because of a dependency on `net-snmp` and specifically the commands `snmptranslate` and `snmptable`.

See [snmp](https://github.com/signalfx/signalfx-agent/tree/main/pkg/monitors/telegraf/monitors/telegrafsnmp) for the monitor source.


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.

2. Configure the monitor, as described in the next section.


## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `snmp` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
  - type: snmp
    ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/snmp:
    type: snmp
    ...  # Additional config
```

The following table shows the configuration options for the `snmp` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | no | `string` | Host and port will be concatenated and appended to the list of SNMP agents to connect to. |
| `port` | no | `integer` | Port and Host will be concatenated and appended to the list of SNMP agents to connect to. (**default:** `0`) |
| `agents` | no | `list of strings` | SNMP agent address and ports to query for information. An example address is `0.0.0.0:5555`. If an address is supplied without a port, the default port `161` will be used. |
| `retries` | no | `integer` | The number of times to retry. (**default:** `0`) |
| `community` | no | `string` | The SNMP community to use. (**default:** `public`) |
| `maxRepetitions` | no | `uint8` | Maximum number of iterations for repeating variables (**default:** `50`) |
| `contextName` | no | `string` | SNMP v3 context name to use with requests |
| `secLevel` | no | `string` | Security level to use for SNMP v3 messages: `noAuthNoPriv`, `authNoPriv`, or `authPriv`. (**default:** `noAuthNoPriv`) |
| `secName` | no | `string` | Name to used to authenticate with SNMP v3 requests. |
| `authProtocol` | no | `string` | Protocol to used to authenticate SNMP v3 requests: `"MD5"`, `"SHA"`, or `""` (default). |
| `authPassword` | no | `string` | Password used to authenticate SNMP v3 requests. |
| `privProtocol` | no | `string` | Protocol used for encrypted SNMP v3 messages: `DES`, `AES`, or `""` (default). |
| `privPassword` | no | `string` | Password used to encrypt SNMP v3 messages. |
| `engineID` | no | `string` | The SNMP v3 engine ID. |
| `engineBoots` | no | `uint32` | The SNMP v3 engine boots. (**default:** `0`) |
| `engineTime` | no | `uint32` | The SNMP v3 engine time. (**default:** `0`) |
| `name` | no | `string` | The top-level measurement name |
| `fields` | no | `list of objects (see below)` | The top-level SNMP fields |
| `tables` | no | `list of objects (see below)` | SNMP Tables |

The **nested** `fields` config object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | no | `string` | Name of the field. The OID will be used if no value is supplied. |
| `oid` | no | `string` | The OID to fetch. |
| `oidIndexSuffix` | no | `string` | The sub-identifier to strip off when matching indexes to other fields. |
| `oidIndexLength` | no | `integer` | The index length after the table OID. The index will be truncated after this length to remove length index suffixes or non-fixed values. (**default:** `0`) |
| `isTag` | no | `bool` | Whether to output the field as a tag. (**default:** `false`) |
| `conversion` | no | `string` | Controls the type conversion applied to the value: `"float(X)"`, `"float"`, `"int"`, `"hwaddr"`, `"ipaddr"`, or `""` (default). |

The **nested** `tables` config object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | no | `string` | Metric name. If not supplied the OID will be used. |
| `inheritTags` | no | `list of strings` | Top level tags to inherit. |
| `indexAsTag` | no | `bool` | Add a tag for the table index for each row. (**default:** `false`) |
| `field` | no | `list of objects (see below)` | Specifies the ags and values to look up. |
| `oid` | no | `string` | The OID to fetch. |
<!---"field" option above. In the Description, what are "ags"? Should it be "tags"?-->

The **nested** `field` config object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | no | `string` | Name of the field. The OID will be used if no value is supplied. |
| `oid` | no | `string` | The OID to fetch. |
| `oidIndexSuffix` | no | `string` | The sub-identifier to strip off when matching indexes to other fields. |
| `oidIndexLength` | no | `integer` | The index length after the table OID. The index will be truncated after this length to remove length index suffixes or non-fixed values. (**default:** `0`) |
| `isTag` | no | `bool` | Whether to output the field as a tag. (**default:** `false`) |
| `conversion` | no | `string` | Controls the type conversion applied to the value: `"float(X)"`, `"float"`, `"int"`, `"hwaddr"`, `"ipaddr"`, or `""` (default). |

The agent does not do any built-in filtering of metrics coming out of this monitor.


### Example `snmp` Smart Agent monitor configurations

```yaml
monitors:
 - type: snmp
   agents:
     - "127.0.0.1:161"
   version: 2
   community: "public"
   fields:
     - name: "uptime"
       oid: ".1.3.6.1.2.1.1.3.0"
```

Here is an example of using a discovery rule to discover and configure for a specific snmp agent:

```yaml
monitors:
 - type: snmp
   discoveryRule: container_name =~ "snmp" && port == 161
   version: 2
   community: "public"
   fields:
     - name: "uptime"
       oid: ".1.3.6.1.2.1.1.3.0"
```


## Metrics

There are no metrics available for this integration.
