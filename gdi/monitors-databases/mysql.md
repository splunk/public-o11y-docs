(mysql)=
# MySQL

<meta name="description" content="Use this Splunk Observability Cloud integration for the MySQL monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the MySQL monitor type to retrieve metrics and logs from MySQL.

This monitor connects to a MySQL instance and reports on the values returned by a `SHOW STATUS` command, which include the following:

- Number of commands processed
- Table and row operations (handlers)
- State of the query cache
- Status of MySQL threads
- Network traffic

This integration is only available on Kubernetes and Linux. 

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

### Creating a MySQL user for this monitor

To create a MySQL user for this monitor, run the following commands:

```sql
 CREATE USER '<username>'@'localhost' IDENTIFIED BY '<password>';
 -- Give appropriate permissions
 -- ("GRANT USAGE" is synonymous to "no privileges")
 GRANT USAGE ON *.* TO '<username>'@'localhost';
 -- Permissions for the stats options
 GRANT REPLICATION CLIENT ON *.* TO '<username>'@'localhost';
```

The new user only has enough privileges to connect to the database. Additional privileges are not required.

### Considerations on localhost

For connections to `localhost`, MySQL programs attempt to connect to the local server by using a Unix socket file. To ensure that the client makes a TCP/IP connection to the local server specify a host name value of `127.0.0.1`, or the IP address or name of the local server.

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/mysql:
    type: collectd/mysql
    host: 127.0.0.1
    port: 3306
    username: <global-username-for-all-db>
    password: <global-password-for-all-db>
    databases:
      - name: <name-of-db>
        username: <username> #Overrides global username
        password: <password> #Overrides global password
```

The following is a sample YAML configuration that shows how to connect multiple MySQL databases:

```yaml
receivers:
  smartagent/mysql:
    type: collectd/mysql
    host: 127.0.0.1
    port: 3306
    databases:
      - name: <name>
        username: <username>
        password: <password>
      - name: <name>
        username: <username>
        password: <password>
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```yaml
service:
  pipelines:
    metrics:
      receivers: [smartagent/mysql]
    logs:
      receivers: [smartagent/mysql]
```

### Configuration settings

The following table shows the configuration options for this monitor:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `host` | Yes | `string` | Hostname or IP address of the MySQL instance. For example, `127.0.0.1`. |
| `port` | Yes | `integer` | The port of the MySQL instance. For example, `3306`. |
| `databases` | Yes | `list of objects` | A list of databases along with optional authentication credentials. |
| `username` | No | `string` | Username for all databases. You can override it by defining each username in the `databases` object. |
| `password` | No | `string` | Password for all databases. You can override it by defining each username in the `databases` object. |
| `reportHost` | No | `bool` | When set to `true`, the `host` dimension is set to the name of the MySQL database host. When `false`, the monitor uses the global `hostname` configuration instead. The default value is `false`. When `disableHostDimensions` is set to `true`, the host name in which the agent or monitor is running is not used for the `host` metric dimension value.  |
| `innodbStats` | No | `bool` | Collects InnoDB statistics. Before activating InnoDB metrics make sure that you granted the `PROCESS` privilege to your user. The default value is `false`. |

The nested `databases` configuration object has the following fields:

| Option | Required | Type | Description |
| --- | --- | --- | --- |
| `name` | Yes | `string` | Name of the database. |
| `username` | No | `string` | Username of the database. |
| `password` | No | `string` | Password of the database. |

## Metrics

The following metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/mysql/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
