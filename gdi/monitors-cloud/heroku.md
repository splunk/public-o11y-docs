(heroku)=

# Heroku

<meta name="description" content="Use this Splunk Observability Cloud integration for the Heroku monitor. See benefits, install, configuration, and metrics">

The Splunk OpenTelemetry Connector for Heroku is a buildpack for the Splunk Distribution of OpenTelemetry Collector. The buildpack installs and runs the Splunk OpenTelemetry Connector on a Dyno to receive, process and export metric and trace data for Splunk Observability Cloud:

* Splunk APM through the `sapm` exporter. The `otlphttp` exporter can be used with a custom configuration. 
* Splunk Infrastructure Monitoring through the `signalfx` exporter.

To learn more about the Splunk Distribution of OpenTelemetry Collector, see [Install and configure the Splunk Distribution of OpenTelemetry Collector](../opentelemetry/opentelemetry.rst)

## Installation

### Prerequisites

Before you can install the Heroku buildpack to collect metrics, you need to have a Heroku app. To learn how to install the Heroku CLI and create an app, see the Heroku documentation for developers.

### Installation steps

Follow these steps to collect metrics with the Heroku buildpack for the Splunk Distribution of OpenTelemetry Collector:

1. In the command-line interface, navigate to the Heroku project directory.

   ``` bash
   cd <HEROKU_APP_DIRECTORY>
   ```
   
   **_Note:_** Running `heroku` command outside of project directories results in unexpected behavior.

2. Configure the Heroku app to expose Dyno metadata, which is required by Splunk OpenTelemetry Connector to set global dimensions such as `app_name`, `app_id` and `dyno_id`. See [here](https://devcenter.heroku.com/articles/dyno-metadata) for more information.
   
   ``` bash
   heroku labs:enable runtime-dyno-metadata
   ```

3. Run both of the following commands together to add the Heroku buildpack.

   ``` bash
   heroku buildpacks:add https://github.com/signalfx/splunk-otel-collector-heroku.git#\
   $(curl -s https://api.github.com/repos/signalfx/splunk-otel-collector-heroku/releases | grep '"tag_name"' | head -n 1 | cut -d'"' -f4)
   ```

   **_Note:_** If you want to use an explict version number for production environment, replace the first command with the following command:
   
   ``` bash
   heroku buildpacks:add https://github.com/signalfx/splunk-otel-collector-heroku.git#<TAG_NAME>
   ```
  
4. Set the required environment variables.
  
   ``` bash
   heroku config:set SPLUNK_ACCESS_TOKEN=<YOUR_ACCESS_TOKEN>
   heroku config:set SPLUNK_REALM=<YOUR_REALM>
   ```

5. (Optional) Define custom configuration file in your Heroku project directory.
   
   ``` bash
   heroku config:set SPLUNK_CONFIG=/app/mydir/myconfig.yaml
   ```

6. To add the buildpack to an existing project, you must create an empty commit before deploying the app.
   
   ``` bash
   git commit --allow-empty -m "empty commit"
   ```
7. Run the following command to deploy the app.

   ``` bash
   git push heroku main
   ```

8. Run the following command to check the logs.

   ``` bash
   heroku logs -a <app-name> --tail
   ```

## Configuration

Use the following environment variables to configure the Heroku buildpack.

| Environment Variable      | Required | Default                                             | Description                                                                                                                |
| ----------------------    | -------- | -------                                             | -------------------------------------------------------------------------                                                  |
| `SPLUNK_ACCESS_TOKEN`     | Yes      |                                                     | [Splunk access token](https://docs.splunk.com/Observability/admin/authentication-tokens/org-tokens.html#admin-org-tokens). |
| `SPLUNK_REALM`            | Yes      |                                                     | [Splunk realm](https://dev.splunk.com/observability/docs/realms_in_endpoints/).                                            |
| `SPLUNK_API_URL`          | No       | `https://api.SPLUNK_REALM.signalfx.com`             | The Splunk API base URL.                                                                                                   |
| `SPLUNK_CONFIG`           | No       | `/app/config.yaml`                                  | The configuration to use. `/app/.splunk/config.yaml` used if default not found.                                            |
| `SPLUNK_INGEST_URL`       | No       | `https://ingest.SPLUNK_REALM.signalfx.com`          | The Splunk Infrastructure Monitoring base URL.                                                                             |
| `SPLUNK_LOG_FILE`         | No       | `/dev/stdout`                                       | Specify location of agent logs. If not specified, logs will go to stdout.                                                  |
| `SPLUNK_MEMORY_TOTAL_MIB` | No       | `512`                                               | Total available memory to agent.                                                                                           |
| `SPLUNK_OTEL_VERSION`     | No       | `latest`                                            | Version of Splunk OTel Connector to use. Defaults to latest.                                                               |
| `SPLUNK_TRACE_URL`        | No       | `https://ingest.SPLUNK_REALM.signalfx.com/v2/trace` | The Splunk APM base URL.                                                                                                   |

## Troubleshooting

```{include} /_includes/troubleshooting.md
```
