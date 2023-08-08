.. _get-started-get-data-in:

************************************************************************
Get data into Splunk Observability Cloud
************************************************************************

.. meta::
   :description: This topic walks you through recommended steps for getting data from each layer of your stack into Splunk Observability Cloud to get meaningful insights about your infrastructure, applications, and real user experiences.

Use Splunk Observability Cloud to achieve full-stack observability of all your data sources, including your infrastructure, applications, and user interfaces. Splunk Observability Cloud includes the following products:

- :ref:`Splunk Infrastructure Monitoring <infrastructure-infrastructure>`
- :ref:`Splunk Application Performance Monitoring (APM) <get-started-apm>`
- :ref:`Splunk Real User Monitoring (RUM) <rum-gdi>`
- :ref:`Splunk Log Observer <get-started-logs>` and :ref:`Log Observer Connect <logs-intro-logconnect>`

Here's a high-level overview of your options for getting data from each layer of your stack into the Splunk Observability Cloud product best suited to provide insights about your system. 

.. image:: /_images/gdi/GDI_sequence.png
   :width: 80%   

.. source in Figma: https://www.figma.com/file/0tm4yT04K6MlwM7dMA62ad/Docs-Graphic

For standard environments and workflows, perform all the steps described below to get the most out of Splunk Observability Cloud. However, depending on your observability goals and environment, you can choose to perform only a subset of the steps. For example, if you don't use every Splunk Observability Cloud product, or if you don't want to collect data from every eligible data source.

.. _gdi-per-product:

Per product integration recommendations
============================================

If you're not yet implementing full-stack observability as described in the diagram above, and are using only one or a few products, see the table to learn which steps are recommended, optional, or not applicable (n/a) based on your use case. 

.. list-table::
   :header-rows: 1
   :widths: 30 17 17 17 17

   *  -  :strong:`Step`
      -  :strong:`Infrastructure Monitoring only`
      -  :strong:`APM only`
      -  :strong:`RUM only`
      -  :strong:`Sends logs?`

   *  -  :ref:`1. Integrate with cloud services <gdi-1>`
      -  :strong:`Recommended`
      -  n/a
      -  n/a
      -  Yes

   *  -  :ref:`2. Install the OpenTelemetry Collector for servers and clusters <gdi-2>`
      -  :strong:`Recommended`
      -  :strong:`Recommended`
      -  n/a
      -  Yes

   *  -  :ref:`3. Configure third-party server apps <gdi-3>`
      -  Optional
      -  Optional
      -  n/a
      -  Yes

   *  -  :ref:`4. Instrument apps and back-end services <gdi-4>`
      -  Optional
      -  :strong:`Recommended`
      -  n/a
      -  Yes

   *  -  :ref:`5. Instrument serverless functions <gdi-5>`
      -  Optional
      -  :strong:`Recommended`
      -  n/a
      -  No

   *  -  :ref:`6. Configure apps and serverless functions to send custom data <gdi-6>`
      -  n/a
      -  n/a
      -  :strong:`Recommended`
      -  No

   *  -  :ref:`7. Instrument user interfaces <gdi-7>`
      -  :strong:`Recommended`
      -  :strong:`Recommended`
      -  n/a
      -  No

   *  -  :ref:`8. Use the API to send custom data <gdi-8>`
      -  Optional
      -  Optional
      -  n/a
      -  Yes

.. _gdi-1:

1. Integrate with cloud services to send metrics and logs
===================================================================================

If you're using cloud services for your infrastructure, the first step is to integrate these services with Splunk Observability Cloud. Cloud integrations can send metrics and metadata (such as tags, labels and other properties) to Infrastructure Monitoring.

After you've integrated with your cloud services, you can access your data in the following locations:

- View metrics in Infrastructure Monitoring navigators

   .. image:: /_images/infrastructure/ebs-navigator.png
      :width: 100%
      :alt: This screenshot shows the EBS navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from EBS.

   For more information, see:

      - :ref:`monitor-aws-services`
      - :ref:`monitor-gcp-services`
      - :ref:`monitor-azure-services`

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for AWS, GCP, and Azure services

- Search for metrics :ref:`using the Metric Finder <metric-finder>`. For the list of metrics provided by a cloud service, see:

   - :new-page:`AWS official documentation <https://docs.aws.amazon.com/index.html#general_resourcess>`
   - :ref:`GCP metrics <gcp-metrics>`
   - :ref:`Azure metrics <azure-metrics>`

Steps
--------------------------------------------------------------

- To integrate with Amazon Web Services, use the method that better suits your environment:

   - :ref:`Connect to AWS using the guided setup <aws-wizardconfig>`
   - :ref:`Connect to AWS using the API <get-configapi>`
   - :ref:`Connect to AWS using Terraform <terraform-config>`

- To integrate with Google Cloud Platform services, use the method that best suits your environment:

   - :ref:`Connect to GCP using the guided setup in Splunk Observability Cloud <get-started-gcp>`
   - :new-page:`Connect to GCP using the Splunk Observability Cloud API <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview>`
   - :ref:`Connect to GCP using Terraform <terraform-config>`

- To integrate with Microsoft Azure services, use the method that best suits your environment:

   - :ref:`Connect to Azure using the guided setup in Splunk Observability Cloud <get-started-azure>`
   - :new-page:`Connect to Azure using the Splunk Observability Cloud API <https://dev.splunk.com/observability/docs/integrations/msazure_integration_overview>`
   - :ref:`Connect to Azure using Terraform <terraform-config>`

For example, you might want to use the guided setup if you are setting up just a few integrations. However, if you are setting up many integrations, such as for different accounts and regions, use the API or Terraform. Note that if you need all of the latest integration features, you might want to use the API because support might not yet be available using Terraform.

.. _gdi-2:

2. Install the OpenTelemetry Collector to send server and cluster data
=============================================================================================================

Install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` on any hosts or clusters you're using as a part of your infrastructure, such as servers running in your data center or on a virtual machine running in the cloud to: 

- Send metrics to Infrastructure Monitoring
- Send logs to Log Observer
- Set up your environment to receive logs and traces from applications instrumented in step :ref:`gdi-4`

After you've installed the Collector and configured your servers and clusters, you can access your data in the following locations:

- View metrics in Infrastructure Monitoring navigators

   .. image:: /_images/infrastructure/hosts-navigator.png
      :width: 100%
      :alt: This screenshot shows the Hosts navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from hosts.

   For more information, see:

      - :ref:`monitor-hosts`
      - :Ref:`use-the-k8s-navigator`

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for hosts and Kubernetes

- Search for metrics :ref:`using Metric Finder <metric-finder>`

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

Steps
-------------------------------------------------------------------

- To configure Windows servers, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install on Windows <get-started-windows>`
   - :ref:`Manually install on Windows <otel-install-windows-manual>`

- To configure Linux servers, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install on Linux <get-started-linux>`
   - :ref:`Manually install on Linux <otel-install-linux-manual>`

- To configure Kubernetes clusters, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install in a Kubernetes cluster <get-started-k8s>`
   - :ref:`Manually install in a Kubernetes cluster <otel-install-k8s>`

One of the benefits of using the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud is that Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud, is easier to implement. For more information, see :ref:`get-started-relatedcontent`.

.. _gdi-3:

3. Configure third-party server applications to send metrics, logs, and traces
=========================================================================================================================

After you've completed step :ref:`gdi-2` and installed the Splunk Distribution of OpenTelemetry Collector on your servers (hosts) or in your clusters, configure the Collector's :ref:`native receivers <collector-components-receivers>` or :ref:`any of these third-party applications <monitor-data-sources>`, such as Apache, Cassandra, Hadoop, Kafka, and NGINX, to monitor your systems.

After you've configured the Collector's pipelines for your desired server applications, access your data in the following locations:

- View metrics using any built-in dashboards available for your server applications. For example, here is the built-in Kafka dashboard:

   .. image:: /_images/gdi/kafka-dashboard.png
      :width: 100%
      :alt: This screenshot shows the Kafka built-in dashboard.

   For more information about dashboards, see :ref:`view-dashboards`.

- Search for metrics :ref:`using Metric Finder <metric-finder>`. For the list of metrics provided by an application receiver, see the :ref:`documentation for the application receiver <monitor-data-sources>`.

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

- For SignalFx Forwarder only, you can:

      - View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`
      - View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`

.. _gdi-4:

4. Instrument back-end services and applications to send traces, logs, and metrics
========================================================================================

You can choose to instrument applications that you've developed in-house to send data to Splunk Observability Cloud:

- Traces to APM
- Logs (events) to Log Observer
- Metrics to Infrastructure Monitoring (Java only)

After you've instrumented your application, you can access your data in the following locations:

- View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`

- View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`

   .. image:: /_images/apm/set-up-apm/set-up-apm-02.png
      :width: 100%
      :alt: This screenshot shows an example of the Splunk APM Explore view

- For a Java application, you can search for metrics :ref:`using Metric Finder <metric-finder>`

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

Steps
------------------------------------------------------------------------------------

See the instrumentation documentation for your application language:

- :ref:`Instrument Java applications <get-started-java>`

- :ref:`Instrument Python applications <get-started-python>`

- :ref:`Instrument Node.js applications <get-started-nodejs>`

- :ref:`Instrument .NET applications <get-started-dotnet>`

- :ref:`Instrument Go applications <get-started-go>`

- :ref:`Instrument Ruby applications <get-started-ruby>`

- :ref:`Instrument PHP applications <get-started-php>`

.. note:: If you use the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud, you can benefit from Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud. For more information, see :ref:`get-started-relatedcontent`.

.. _gdi-5:

5. Instrument serverless functions to send traces and metrics
==========================================================================================================

You can choose to instrument your serverless functions.

:strong:`Note:` This step is about bringing in built-in metrics and traces. Once you have a chance to familiarize yourself with your data coming in, you can use this same instrumentation to bring in custom data. For more information, see step :ref:`gdi-7`.

This integration can send:

- Traces to APM
- Metrics to Infrastructure Monitoring

After you've instrumented your serverless functions, you can access your data in the following locations:

- View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`

- View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`

- View metrics in the Infrastructure Monitoring Lambda Functions navigator

   .. image:: /_images/gdi/lambda-navigator.png
      :width: 100%
      :alt: This screenshot shows the Lambda Functions navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from serverless functions.

   For more information, see :ref:`monitor-aws-services`.

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for AWS Lambda

- Search for metrics :ref:`using Metric Finder <metric-finder>`

Steps
----------------------------------------------------------------------------

To instrument your AWS Lambda serverless functions, see :ref:`instrument-serverless-functions`.

.. _gdi-6:

6. Instrument user interfaces to send user sessions
========================================================================================

You can instrument browser and mobile user interfaces to monitor front-end application user experiences, sending your user sessions to RUM to review key metrics and vitals, as well as investigate errors in your spans:

.. image:: /_images/gdi/rum-landing.png
   :width: 100%
   :alt: This screenshot shows an example of the Splunk RUM landing page

Steps
-------------------------------------------------

- To instrument web browsers to send user session data, see :ref:`browser-rum-gdi`.
- To instrument an iOS application to send user session data, see :ref:`rum-mobile-ios`.
- To instrument an Android application to send user session data, see :ref:`rum-mobile-android`.

.. _gdi-7:

7. Configure applications and serverless functions to send custom data
========================================================================================

Now that you have built-in data from your full stack flowing into Splunk Observability Cloud, assess whether there are custom data points you need to bring in. 

For many teams, some of the most meaningful data is custom data because you can define these data points to focus on what is most important to you in your specific environment.

For example, if you run an e-commerce site, you might configure your application to send a custom metric about the number of orders placed. You can then create a detector to receive an alert when the number of orders drops significantly. You might also configure your application to send a custom metric about how long payment processing takes. You can then create a detector to issue alerts when the processing time exceeds a threshold.

You can configure applications to send custom metrics and instrument serverless functions to send custom traces. Access your custom data in the following locations:

- View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`
- View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`
- Search for metrics :ref:`using Metric Finder <metric-finder>`

   .. image:: /_images/gdi/metric-finder.png
      :width: 100%
      :alt: This screenshot shows metric search results in the Metric Finder


Configuration steps for back-end applications
-------------------------------------------------------------------------

Use the library for your application language:

- :new-page:`Go client library for SignalFx <https://github.com/signalfx/signalfx-go>` on GitHub

- For Java, use one of these available integrations:

      - :ref:`Splunk Distribution of OpenTelemetry Java <get-started-java>`
      - :new-page:`Java client libraries for SignalFx <https://github.com/signalfx/signalfx-java>` on GitHub

- :new-page:`Node.js client library for SignalFx <https://github.com/signalfx/signalfx-nodejs>` on GitHub

- :new-page:`Python client library for SignalFx <https://github.com/signalfx/signalfx-python>` on GitHub

- :new-page:`Ruby client library for SignalFx <https://github.com/signalfx/signalfx-ruby>` on GitHub


Instrument serverless functions
---------------------------------------------------------------

To instrument your AWS Lambda serverless functions, see :ref:`instrument-serverless-functions`.

.. _gdi-8:

8. Use the Splunk Observability Cloud API to send custom data
========================================================================================

Now that you have built-in data from your full stack flowing into Splunk Observability Cloud, assess whether there are custom data points you need to bring in. You can use the Splunk Observability Cloud API to bring in custom data.

You might want to use the API if you want to integrate with:

- A third-party tool that provides an API/webhook integration only.
- An application written in a language we don't provide a library for.

This API integration can send all types of data to Splunk Observability Cloud. While you can use the API to send logs to Log Observer, we recommend using other integration types to do so. For details about which integrations can send logs to Log Observer, see :ref:`gdi-per-product`.

After you've configured your integration to send custom data, you can access your data in the following locations:

- View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`.
- View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`.
- Search for metrics at the :ref:`Metric Finder <metric-finder>`, or use the :ref:`metrics pipeline management tool <metrics-pipeline-intro>`.
- Query logs :ref:`using Log Observer <logs-timeline>`, if you chose to ingest logs.

Steps
--------------------------------------------------------------------

For information about using the Splunk Observability Cloud API to send custom data, see :ref:`rest-api-ingest`.


Next: Leverage the full benefits of Splunk Observability Cloud
=============================================================================

Now that you have your desired full stack of data coming into Splunk Observability Cloud, consider exploring the following features that can help you monitor, visualize, and coordinate team work around your data:

- :ref:`Create detectors <create-detectors>` to receive alerts about conditions in your data that are important you.
- :ref:`Create charts <create-charts>` to visualize your data.
- :ref:`Use Related Content <get-started-relatedcontent>` to jump between components of Splunk Observability Cloud by clicking related data.
- :ref:`Create and customize dashboards <dashboard-create-customize>` to organize and share your charts.
- :ref:`admin-manage-teams` to coordinate team work around your data.
- Check system critical metrics, access real-time alerts, and view mobile-friendly dashboards on the go using the :ref:`Splunk Observability Cloud mobile app <intro-to-mobile>`.
- Learn more about :ref:`the Splunk Observability Cloud data model <data-model>`.
- Learn more about each product in the Splunk Observability Cloud suite:
   - :ref:`get-started-apm`
   - :ref:`get-started-infrastructure`
   - :ref:`get-started-logs`
   - :ref:`get-started-rum`

Support
=================

If you need assistance setting up or using Splunk Observability Cloud, check the Troubleshooting docs for each feature, or contact :ref:`support`.