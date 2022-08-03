(mysql)=
# MySQL
<meta name="description" content="Documentation on the mysql monitor">

## Description

The Splunk Distribution of OpenTelemetry Collector provides this integration as the `mysql` via the Smart Agent Receiver.

This monitor connects to a MySQL instance and reports on the values returned by a `SHOW STATUS` command. This includes the following:

  - Number of commands processed
  - Table and row operations (handlers)
  - State of the query cache
  - Status of MySQL threads
  - Network traffic


## Installation

This monitor is available in the [SignalFx Smart Agent Receiver](https://github.com/signalfx/splunk-otel-collector/tree/main/internal/receiver/smartagentreceiver), which is part of the [Splunk Distribution of OpenTelemetry Collector](https://github.com/signalfx/splunk-otel-collector).

To install this integration:
1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
2. Configure the monitor, as described in the next section.


<!--- notes from source file: -->
### Creating a MySQL user for this monitor

To create a MySQL user for this monitor:

```
 CREATE USER '<username>'@'localhost' IDENTIFIED BY '<password>';
 -- Give appropriate permissions
 -- ("GRANT USAGE" is synonymous to "no privileges")
 GRANT USAGE ON *.* TO '<username>'@'localhost';
 -- Permissions for the stats options
 GRANT REPLICATION CLIENT ON *.* TO '<username>'@'localhost';
```

The new user will only have privileges to connect to the database. Additional privileges are not required.

### Note on localhost
On Unix, MySQL programs treat the host name `localhost` specially, in a way
that is likely different from what is expected compared to other
network-based programs. For connections to `localhost`, MySQL programs
attempt to connect to the local server by using a Unix socket file. To ensure
that the client makes a TCP/IP connection to the local server specify a host
name value of `127.0.0.1`, or the IP address or name of the local server.

### Databases
You have to specify each database you want to monitor individually under
the `databases` config option.  If you have a common authentication to all
databases being monitored, you can specify that in the top-level
`username`/`password` options, otherwise they can be specified at the
database level.

### InnoDB metrics
If you want to enable InnoDB metrics (`innodbStats` to `true`), be sure that
you granted to your user the `PROCESS` privilege.

## Configuration

The Splunk Distribution of OpenTelemetry Collector allows embedding a Smart Agent monitor configuration in an associated Smart Agent Receiver instance.

**Note:** Providing a `mysql` monitor entry in your Smart Agent or Collector configuration is required for its use. Use the appropriate form for your agent type.

To activate this monitor in the Smart Agent, add the following to your agent configuration:

```
monitors:  # All monitor config goes under this key
 - type: mysql
   ...  # Additional config
```

To activate this monitor in the Splunk Distribution of OpenTelemetry Collector, add the following to your agent configuration:

```
receivers:
  smartagent/mysql:
    type: mysql
    ...  # Additional config
```


Sample YAML configuration to connect multiple MySQL databases:

```
monitors:
 - type: mysql
   host: 127.0.0.1
   port: 3306
   databases:
     - name: dbname
     - name: securedb
       username: admin
       password: s3cr3t
   username: dbuser
   password: passwd
```


Sample YAML configuration to connect a single MySQL database:

```
monitors:
 - type: mysql
    host: 127.0.0.1
    port: 3306
    databases:
      - name:
    username: YOURUSERNAMEHERE
    password: YOURPASSWORDHERE
```


The following table shows the configuration options for the `mysql` monitor:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | **yes** | `string` |  |
| `port` | **yes** | `integer` |  |
| `name` | no | `string` |  |
| `databases` | **yes** | `list of objects (see below)` | A list of databases along with optional authentication credentials. |
| `username` | no | `string` | These credentials serve as defaults for all databases if not overridden |
| `password` | no | `string` |  |
| `reportHost` | no | `bool` | A SignalFx extension to the plugin that allows us to disable the normal behavior of the MySQL plugin where the `host` dimension is set to the hostname of the MySQL database server.  When `false` (the recommended and default setting), the globally configured `hostname` config is used instead. (**default:** `false`) |
| `innodbStats` | no | `bool` |  (**default:** `false`) |


The **nested** `databases` config object has the following fields:

| Config option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | **yes** | `string` |  |
| `username` | no | `string` |  |
| `password` | no | `string` |  |

<!--- skipped some content in source file under "Built in content" -->

## Metrics

These are the metrics available for this integration.

<div class="metrics-table" type="mysql" include="markdown"></div>
