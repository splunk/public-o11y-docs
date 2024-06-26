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
  Infrastructure monitoring <get-data-in/compute/compute>
  APM instrumentation <get-data-in/application/application>
  RUM instrumentation <get-data-in/rum/rum-instrumentation>  
  OpenTelemetry receivers <opentelemetry/components/a-components-receivers>
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
  Notification services </admin/notif-services/admin-notifs-index>  
  Login services </admin/authentication/SSO/sso>  
  Data link destinations </metrics-and-metadata/link-metadata-to-content>
  Community and other <integrations/community-integrations>

This page provides the list of integrations supported by Splunk Observability Cloud.

.. raw:: html

   <embed>
      <h2>Cloud services<a name="cloud-services" class="headerlink" href="#cloud-services" title="Permalink to this headline">¶</a></h2>
   </embed>

See the available services for each Cloud services provider at:

* :ref:`Cloud services: AWS <cloud-aws>`
* :ref:`Cloud services: Azure <cloud-azure>`
* :ref:`Cloud services: GCP <cloud-gcp>`   

.. raw:: html

   <embed>
      <h2>Infrastructure monitoring<a name="infrastructure-monitoring" class="headerlink" href="#infrastructure-monitoring" title="Permalink to this headline">¶</a></h2>
   </embed>

See :ref:`get-started-compute` for information on how to collect data for:

* :ref:`Kubernetes <get-started-k8s>`
* :ref:`Linux <get-started-linux>`
* :ref:`Microsoft Windows <get-started-windows>`

.. raw:: html

   <embed>
      <h2>APM instrumentation<a name="apm-instrumentation" class="headerlink" href="#apm-instrumentation" title="Permalink to this headline">¶</a></h2>
   </embed>

See :ref:`Available APM instrumentation <get-started-application>`, including:

- :ref:`Java <get-started-java>`
- :ref:`Node.js <get-started-nodejs>`
- :ref:`.NET <get-started-dotnet-otel>`
- :ref:`Go <get-started-go>`
- :ref:`Python <get-started-python>`
- :ref:`Ruby <get-started-ruby>`
- :ref:`PHP <get-started-php>`
- :ref:`C++ <get-started-cpp>`

You can also instrument your applications to send metrics to Infrastructure Monitoring.

- :new-page:`Go <https://github.com/signalfx/signalfx-go>`
- :new-page:`Java <https://github.com/signalfx/signalfx-java>`
- :new-page:`Node.js <https://github.com/signalfx/signalfx-nodejs>`
- :new-page:`Python <https://github.com/signalfx/signalfx-python>`
- :new-page:`Ruby <https://github.com/signalfx/signalfx-ruby>`

.. raw:: html

   <embed>
      <h2>RUM instrumentation<a name="rum-instrumentation" class="headerlink" href="#rum-instrumentation" title="Permalink to this headline">¶</a></h2>
   </embed>

Instrument your web and mobile front-end applications to send metrics, web vitals, errors, and other forms of data to Splunk Real User Monitoring.

* :ref:`browser-rum-gdi`
* :ref:`rum-mobile-ios`
* :ref:`rum-mobile-android`
* :ref:`rum-mobile-react`

For more information, see :ref:`get-started-rum`.

.. raw:: html

   <embed>
      <h2>OpenTelemetry receivers<a name="native-otel-receivers" class="headerlink" href="#native-otel-receivers" title="Permalink to this headline">¶</a></h2>
   </embed>

Learn more at :ref:`OpenTelemetry receivers <otel-components-receivers>`.

These are the available OTel receivers:

.. include:: /_includes/gdi/otel-receivers-table.rst

.. raw:: html

   <embed>
      <h2>Application and host integrations<a name="app-monitors" class="headerlink" href="#app-monitors" title="Permalink to this headline">¶</a></h2>
   </embed>

.. note:: The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs.

Smart Agent integrations and application receivers are available and supported through the Splunk Distribution of the OpenTelemetry Collector. For more information, see :ref:`migration-monitors`.    

Browse available monitors by category:

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

These are the available Smart Agent monitors:

.. include:: /_includes/gdi/application-receiver-table.rst

.. raw:: html

   <embed>
      <h2>Notification services<a name="notification-services" class="headerlink" href="#notification-services" title="Permalink to this headline">¶</a></h2>
   </embed>

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

.. raw:: html

   <embed>
      <h2>Login services<a name="login-services" class="headerlink" href="#login-services" title="Permalink to this headline">¶</a></h2>
   </embed>

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

.. raw:: html

   <embed>
      <h2>Data link destinations<a name="data-link-destinations" class="headerlink" href="#data-link-destinations" title="Permalink to this headline">¶</a></h2>
   </embed>

Data links let you link metadata to the following destinations outside of Splunk Observability Cloud:

- Splunk Cloud Platform
- Splunk Enterprise
- Kibana

For more information about creating data links, see :ref:`link-metadata-to-content`.

.. raw:: html

   <embed>
      <h2>Community and other integrations<a name="community-integrations" class="headerlink" href="#community-integrations" title="Permalink to this headline">¶</a></h2>
   </embed>

The following Community integrations are available:

- Istio
- Jaeger
- Linkerd
- Micrometer
- Prometheus
- Spring Boot
- Telegraf Agent
- Zipkin

.. raw:: html

   <embed>
      <h3>Other integrations<a name="other-integrations" class="headerlink" href="#other-integrations" title="Permalink to this headline">¶</a></h3>
   </embed>

Other integrations include:

- :new-page:`Grafana <https://grafana.com/grafana/plugins/grafana-splunk-monitoring-datasource/>`
- :new-page:`LaunchDarkly <https://docs.launchdarkly.com/integrations/signalfx>`
- :new-page:`Pulumi <https://www.pulumi.com/docs/intro/cloud-providers/signalfx/>`
- :new-page:`Terraform <https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs>`
