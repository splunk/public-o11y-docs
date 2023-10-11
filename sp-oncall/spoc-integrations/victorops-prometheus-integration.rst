About VictorOps and Prometheus
------------------------------

The VictorOps and Prometheus integration provides you with the real-time
monitoring data of an open source time-series database and the
collaboration tools you need to easily address system issues or
incidents. `Prometheus’s <https://prometheus.io/>`__ time-series
database and monitoring specializes in providing your team with
real-time, live updating system metrics to more quickly show when errors
occur or requests fail.

The VictorOps and Prometheus integration is easily configurable to help
you aggregate time-series data and respond to incidents in one
centralized location. Prometheus integrates with VictorOps to help you
identify, diagnose, and resolve incidents in real-time, as well as
conduct more thorough post-incident reviews.

**TSDBs and Incident Response: Actionable Real-Time Data and
Collaboration**

-  Powerful querying capability allows you to easily dissect incident
   data and generate visually-appealing, deeply informative
   post-incident reviews
-  Precise configurations allow for notifications that reduce alert
   fatigue for your team and silence unactionable alerts
-  Prometheus offers data visualizations which provide contextual
   substance to incidents and allows deeper collaboration through the
   VictorOps timeline
-  Configure VictorOps with the Prometheus integration for highly
   scalable storage, alerting, and customizable data monitoring
   configurations

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: AlertManager v0.8.0 and
Prometheus-2.0.0-beta.2.\***

**VictorOps Version Required: Getting Started, Essentials,** or
**Full-Stack**

**What you need to know: Please note: we are in the process of testing
older version of AlertManager. If you are looking to use the Prometheus
Integration, and have an older version of AlertManager, please contact**
`VictorOps Support <support@victorops.com>`__\ **, to verify if the
integration will work.**

[/ht_toggle]

Prometheus is an open-source systems monitoring and alerting toolkit
with an active ecosystem.  Alerting with Prometheus is separated into
two parts.  Alerting rules in Prometheus servers send alerts to an
Alertmanager.  The Alertmanager then manages those alerts, including
silencing, inhibition, aggregation and sending out notifications via
methods such as VictorOps.  The following guide will walk you through
this integration.

Enable Prometheus in VictorOps
------------------------------

From the VictorOps web portal, navigate to *Integrations >> 3rd Party
Integrations >> Prometheus* and click *Enable Integration.*

Copy the **Service API Key** to the clipboard to use in the following
steps.

Configure VictorOps in Prometheus
---------------------------------

`Download <https://prometheus.io/download/#alertmanager>`__ and
`configure <https://prometheus.io/docs/alerting/configuration/>`__ the
Alertmanager for Prometheus.  Here is the code to use in the YAML
configuration file for the Alertmanager.  Make sure to replace the
“api_key” with the previously-saved **Service API Key** and change the
“routing_key” to the actual routing key you intend to use.

route: group_by: [‘alertname’, ‘cluster’, ‘service’] group_wait: 30s
group_interval: 5m repeat_interval: 3h receiver: victorOps-receiver

receivers: - name: victorOps-receiver victorops_configs: - api_key:
558e7ebc-XXXX-XXXX-XXXX-XXXXXXXXXXXX routing_key: Sample_route
state_message: ‘Alert: {{ .CommonLabels.alertname }}. Summary:{{
.CommonAnnotations.summary }}. RawData: {{ .CommonLabels }}’

If you would like to use custom fields or a proxy url, use the following
as a template.

route: group_by: [‘alertname’, ‘cluster’, ‘service’] group_wait: 30s
group_interval: 5m repeat_interval: 3h receiver: victorOps-receiver

receivers: - name: victorOps-receiver victorops_configs: - api_key:
routing_key: entity_display_name: ‘{{ .CommonAnnotations.summary }}’
message_type: ‘{{ .CommonLabels.severity }}’ state_message: ‘Alert: {{
.CommonLabels.alertname }}. Summary:{{ .CommonAnnotations.summary }}.
RawData: {{ .CommonLabels }}’ custom_fields: : ‘{{ .CommonLabels.eai_nbr
}}’ # We must set a proxy to be able to send alerts to external systems
such as VictorOps http_config: proxy_url:
‘http://internet.proxy.com:3128’

Start Prometheus from the command line and configure it to talk to the
Alertmanager.  In this example, “prometheus.yml” is the configuration
file for Prometheus and “http://localhost:9093” is the instance of the
Alertmanager that Prometheus is pointing to.

./prometheus -config.file=prometheus.yml
-alertmanager.url=http://localhost:9093

Next, start the Alertmanager from the command line using the
Alertmanager configuration file from earlier.  In this example,
“alertmanager.yml” is the name of the configuration file.

./alertmanager -config.file=alertmanager.yml

Alerts from Prometheus should now appear in the Alertmanager as they are
generated.

If you don’t want to wait for an alert to be generated by Prometheus,
you can send a test message to the Alertmanager.  Below is an example
using curl with an instance of Alertmanager at “http://localhost:9093”.

curl -H “Content-Type: application/json” -d
‘[{“labels”:{“alertname”:“TestAlert”}}]’ localhost:9093/api/v1/alerts

For any questions or feedback, please `contact VictorOps
Support <https://victorops.com/contact-support/>`__.
