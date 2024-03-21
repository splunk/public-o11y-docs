.. _supported-data-sources:
.. _integrations-list:
.. _monitor-data-sources:

********************************************************************************
Supported integrations in Splunk Observability Cloud
********************************************************************************

.. meta::
  :description: This page provides a listing of integrations and services supported by Splunk Observability Cloud.

.. toctree::
  :maxdepth: 4
  :hidden:

  Cloud services: AWS <integrations/cloud-aws>
  Cloud services: Azure <integrations/cloud-azure>
  Cloud services: GCP <integrations/cloud-gcp>
  Infrastructure monitoring <integrations/infrastructure-available>
  Available APM instrumentation <integrations/apm-instrumentation>
  OTel receivers <opentelemetry/components/a-components-receivers>
  Applications: Caches and memory TOGGLE <caches-memory>
  Applications: Cloud platforms TOGGLE <cloud>
  Applications: Cloudfoundry <monitors-cloudfoundry/cloudfoundry-firehose-nozzle>
  Applications: Conviva <monitors-conviva/conviva>
  Applications: Databases TOGGLE <databases>
  Applications: GitLab TOGGLE <gitlab-monitors>
  Applications: Hosts and servers TOGGLE <hosts-servers>
  Applications: Languages TOGGLE <languages>
  Applications: Messaging TOGGLE <messaging>
  Applications: Monitoring TOGGLE <monitoring>
  Applications: Networks TOGGLE <network>
  Applications: Orchestration TOGGLE <orchestration>
  Applications: Prometheus TOGGLE <prometheus>  

This page provides the list of integrations supported by Splunk Observability Cloud.

* :ref:`Cloud services: AWS <cloud-aws>`
* :ref:`Cloud services: Azure <cloud-azure>`
* :ref:`Cloud services: GCP <cloud-gcp>`   
* :ref:`Infrastructure monitoring <infrastructure-available>`
* :ref:`Available APM instrumentation <apm-instrumentation>`
* :ref:`OTel receivers <otel-components-receivers>`
* :ref:`Applications: Caches and memory <caches-memory>`
* :ref:`Applications: Cloud platforms <cloud>`
* :ref:`Applications: Cloudfoundry <cloudfoundry-firehose-nozzle>`
* :ref:`Applications: Conviva <conviva>`
* :ref:`Applications: Databases <databases>`
* :ref:`Applications: GitLab <gitlab-monitors>`
* :ref:`Applications: Hosts and servers <hosts-servers>`
* :ref:`Applications: Languages <languages>`
* :ref:`Applications: Messaging <messaging>`
* :ref:`Applications: Monitoring <monitoring>`
* :ref:`Applications: Networks <network>`
* :ref:`Applications: Orchestration <orchestration>`
* :ref:`Applications: Prometheus <prometheus>`

RUM instrumentation
--------------------------------------------

Instrument your web and mobile front-end applications to send metrics, web vitals, errors, and other forms of data to Splunk Real User Monitoring.

* :ref:`browser-rum-gdi`
* :ref:`rum-mobile-ios`
* :ref:`rum-mobile-android`

For more information, see :ref:`get-started-rum`.

Community integrations
---------------------------------------------------------------------------------

- Istio
- Jaeger
- Linkerd
- Micrometer
- Prometheus
- Spring Boot
- Telegraf Agent
- Zipkin

For information about these integrations:

#. Log in to Splunk Observability Cloud
#. In the navigation menu, select :menuselection:`Data Management`. 
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for the name of the community integration.
#. Select the community integration tile to display its details.

Notification services
--------------------------------------------

These integrations let you send Splunk Observability Cloud alert notifications to the following third-party notification services:

- Amazon EventBridge
- BigPanda
- Jira
- Microsoft Teams
- Opsgenie
- PagerDuty
- ServiceNow
- Slack
- Splunk On-Call
- Webhook
- xMatters

For more information about integrating with notification services, see :ref:`admin-notifs-index`.

Login services
--------------------------------------------

These login service integrations allow your users to single sign-on (SSO) to Splunk Observability Cloud using a third-party identity provider (IdP) that uses SAML SSO or a custom URL that you specify.

- Microsoft ADFS
- Microsoft Entra ID (formerly Azure Directory)
- Google Cloud Identity
- Google Sign-In
- Okta
- OneLogin
- PingOne
- SAML

For more information about configuring an SSO integration, see :ref:`sso-label`.

Data link destinations
--------------------------------------------

Data links let you link metadata to the following destinations outside of Splunk Observability Cloud:

- Splunk Cloud Platform
- Splunk Enterprise
- Kibana

For more information about creating data links, see :ref:`link-metadata-to-content`.

Other integrations
----------------------------------------------------------------------------------------------

- :new-page:`Grafana <https://grafana.com/grafana/plugins/grafana-splunk-monitoring-datasource/>`

- :new-page:`LaunchDarkly <https://docs.launchdarkly.com/integrations/signalfx>`

- :new-page:`Pulumi <https://www.pulumi.com/docs/intro/cloud-providers/signalfx/>`

- :new-page:`Terraform <https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs>`
