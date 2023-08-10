(kong)=

# Kong Gateway

<meta name="description" content="Use this Splunk Observability Cloud integration for the Kong monitor. See benefits, install, configuration, and metrics">

The {ref}`Splunk Distribution of OpenTelemetry Collector <otel-intro>` uses the {ref}`Smart Agent receiver <smartagent-receiver>` with the `kong` monitor type to provide service traffic metrics using `kong-plugin-signalfx`, which emits metrics for configurable request and response lifecycle groups, including:

* Counters for response counts
* Counters for cumulative response and request sizes
* Counters for cumulative request, upstream, and Kong latencies

You can partition request and response lifecycle groups by:

* API or Service Name/ID
* Route ID
* Request HTTP Method
* Response HTTP Status Code

In addition, the integration provides system-wide connection statistics, including:

* A counter for total fielded requests
* Gauges for active connections and their various states
* A gauge for database connectivity

This integration is only available on Kubernetes and Linux, and requires version 0.11.2 or higher of Kong and version 0.0.1 or higher of `kong-plugin-signalfx`. This integration is only supported for Kong Gateway Community Edition (CE). 

## Benefits

```{include} /_includes/benefits.md
```

## Installation

```{include} /_includes/collector-installation-linux.md
```

### Kong installation

In addition to the Collector, you also need both the `kong-plugin-signalfx` Kong plugin and the `kong` SignalFx monitor to activate this integration.

Follow these steps to deploy the integration:

1. Run the following commands on each Kong server with a configured `LUA_PATH`:
    ```sh
    luarocks install kong-plugin-signalfx
    # Or directly from the source repo
    git clone git@github.com:signalfx/kong-plugin-signalfx.git
    cd kong-plugin-signalfx
    luarocks make
    # Then notify Kong of the plugin or add to your existing configuration file
    echo 'custom_plugins = signalfx' > /etc/kong/signalfx.conf
    ```
2. Add the following `lua_shared_dict` memory declarations to the NGINX configuration file of Kong, or add them directly to `/usr/local/share/lua/5.1/kong/templates/nginx_kong.lua` if you are using Kong default setup:
    ```
    lua_shared_dict kong_signalfx_aggregation 10m;
    lua_shared_dict kong_signalfx_locks 100k;
    ```
3. Reload Kong to make the plugin available and install it globally:
    ```sh
    kong reload -c /etc/kong/signalfx.conf  # Or specify your modified configuration file
    curl -X POST -d "name=signalfx" http://localhost:8001/plugins
    ```
4. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform.
5. Configure the monitor, as described in the next section.

## Configuration

```{include} /_includes/configuration.md
```

### Example

To activate this integration, add the following to your Collector configuration:

```yaml
receivers:
  smartagent/kong:
   type: collectd/kong
   host: 127.0.0.1
   port: 8001
   metrics:
    - metric: request_latency
      report: true
    - metric: connections_accepted
      report: false
    ...  # Additional config  
```

Next, add the monitor to the `service.pipelines.metrics.receivers` section of your configuration file:

```
service:
  pipelines:
    metrics:
      receivers: [smartagent/kong]
```

### Filter example

The following is a sample configuration with custom `/signalfx` route and filter lists:

```
receivers:
  smartagent/kong:
    type: collectd/kong
    host: 127.0.0.1
    port: 8443
    url: https://127.0.0.1:8443/routed_signalfx
    authHeader:
      header: Authorization
      value: HeaderValue
    metrics:
      - metric: request_latency
        report: true
    reportStatusCodeGroups: true
    statusCodes:
      - 202
      - 403
      - 405
      - 419
      - "5*"
    serviceNamesBlacklist:
      - "*SomeService*"
```

### Kong configuration

Like most Kong plugins, you can configure the SignalFx `kong` integration globally or by specific service, route, API, or
consumer object contexts by making `POST` requests to each `plugins` endpoint. For example:

```sh
curl -X POST -d "name=signalfx" http://localhost:8001/services/<my_service>/plugins
curl -X POST -d "name=signalfx" http://localhost:8001/routes/<my_route_id>/plugins
```

For each request made to the respective registered object context, the `kong` integration obtains metric content 
and aggregates it for automated retrieval at the `/signalfx` endpoint of the Admin API. Although you can activate request 
contexts for specific Consumer objects, consumer IDs or unique visitor metrics are not calculated.

By default, the `kong` integration aggregates metrics by a context determined by the HTTP method of the request and by 
the status code of the response. If you're monitoring a large infrastructure with hundreds of routes, grouping by HTTP 
method might be too granular. You can deactivate context grouping by setting `aggregate_by_http_method` to `false`:

```sh
curl -X POST -d "name=signalfx" -d "config.aggregate_by_http_method=false" http://localhost:8001/plugins
# or to edit an existing plugin
curl -X PATCH -d "config.aggregate_by_http_method=false" http://localhost:8001/plugins/<sfx_plugin_id>
```

## Metrics

These metrics are available for this integration:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/kong/metadata.yaml"></div>

### Notes

```{include} /_includes/metric-defs.md
```

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
