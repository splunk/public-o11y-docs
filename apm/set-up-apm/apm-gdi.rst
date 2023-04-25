.. _apm-gdi:

**************************
Send traces to Splunk APM
**************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn how to send traces to Splunk APM and begin monitoring application performance.

Set up your APM experience by sending traces to APM from your services. 

Prerequisites
===============

Before you begin the setup process, consider the following: 

* If you are using multiple components of Splunk Observability Cloud and want to collect host metrics, logs, or other application data in addition to traces, follow the steps in :ref:`get-started-get-data-in` to get data into Observability Cloud. Then see :ref:`verify-apm-data` in this topic to make sure your data is coming into Splunk APM as you expect. 

* If you have already deployed the OpenTelemetry Collector Contrib project, also known as upstream Collector, you can use your existing deployment to send traces to Splunk APM. See :ref:`using-upstream-otel` for more information. However, note that using the Splunk Distribution of OpenTelemetry Collector provides a more supported experience, customized for Splunk Observability Cloud. 

* If you want to start sending traces to Splunk APM with Splunk Distribution of OpenTelemetry Collector using the guided setup wizards in Splunk APM, follow the steps in the sections below. To set it up yourself without the guided process, see :ref:`otel-intro`.

.. note:: Add span tags to your spans

  Span tags, known as "attributes" in OpenTelemetry, add crucial context to your spans to enable troubleshooting and analysis. You can add tags to your spans either during instrumentation or in a processor added to the YAML configuration file of the OpenTelemetry Collector you're using to aggregate data from multiple services. 
  
  The ``deployment.environment`` tag is particularly useful because it enables you to filter your Splunk APM by deployment environment. To learn more about the environment tag, see :ref:`apm-environments`.
  
  See :ref:`apm-add-context-trace-span` to learn how to add span tags to spans.

If you are just setting up Splunk APM and want to use the Splunk Distribution of OpenTelemetry Collector and the guided setup wizards, follow these steps in this order:

  1. :ref:`deploy-connector`
  2. :ref:`instrument-applications`
  3. :ref:`verify-apm-data`


.. _deploy-connector:

Deploy the Splunk Distribution of OpenTelemetry Collector on your hosts
--------------------------------------------------------------------------------------------------

To send traces to Splunk APM, first deploy the Splunk Distribution of OpenTelemetry Collector on the hosts in which your applications are running. Splunk Observability Cloud offers OpenTelemetry Collector distributions for Kubernetes, Linux, and Windows. These distributions integrate the collection of data from hosts and data forwarding to Observability Cloud.

.. note:: Benefits of the Splunk Distribution of OpenTelemetry Collector 

  Although you're not required to install the Splunk Distribution of OpenTelemetry Collector, doing so gets you the following benefits:

  - The collector can add span metadata associated with the infrastructure in which your applications are running.
  - You establish a single configuration point in which you can specify authorization details.
  - You establish a single configuration point in which you add custom tags and custom processing to your spans.
  - You can batch spans together from many sources. By batching spans, you reduce load on the back end.

To deploy the Splunk Distribution of OpenTelemetry Collector on a host, select :guilabel:`Navigation menu > Data Management` and search for the host type you're using. Then follow the steps in the setup wizard. 

See the following table for more information about deploying the Splunk Distribution of OpenTelemetry Collector on Kubernetes, Linux, and Windows hosts:

.. list-table::
   :header-rows: 1
   :widths: 20, 50, 30

   * - :strong:`Host type`
     - :strong:`Collector`
     - :strong:`Documentation`

   * - Kubernetes
     - Splunk Distribution of OpenTelemetry Collector for Kubernetes 
     - :ref:`get-started-k8s`

   * - Linux
     - Splunk Distribution of OpenTelemetry Collector for Linux 
     - :ref:`get-started-linux`

   * - Windows
     - Splunk Distribution of OpenTelemetry Collector for Windows 
     - :ref:`get-started-windows`

.. _instrument-applications:

Instrument your applications and services to get spans into Splunk APM
-------------------------------------------------------------------------------

Use the auto-instrumentation libraries provided by Splunk Observability Cloud to instrument services in supported programming languages. To get the highest level of support, send spans from your applications to the OpenTelemetry Collector you deployed in the previous step.

To instrument a service, send spans from the service to an OpenTelemetry Collector deployed on the host or Kubernetes cluster in which the service is running. How you specify the OpenTelemetry Collector endpoint depends on the language you are instrumenting. 

In the following table, follow the instrumentation steps for the language that each of your applications is running in. 

.. list-table::
   :header-rows: 1
   :widths: 20, 40, 40

   * - :strong:`Language`
     - :strong:`Available instrumentation`
     - :strong:`Documentation`

   * - Java
     - Splunk Distribution of OpenTelemetry Java
     - :ref:`get-started-java`

   * - Python
     - Splunk Distribution of OpenTelemetry Python
     - :ref:`get-started-python`
     
   * - Node.js
     - Splunk Distribution of OpenTelemetry JS
     - :ref:`get-started-nodejs`

   * - Go
     - Splunk Distribution of OpenTelemetry Go
     - :ref:`get-started-go`

   * - Ruby
     - Splunk Distribution of OpenTelemetry Ruby 
     - :ref:`get-started-ruby`

   * - .NET
     - SignalFx Instrumentation for .NET 
     - :ref:`get-started-dotnet`

   * - PHP
     - SignalFx Tracing Library for PHP 
     - :ref:`get-started-php`

After you instrument your applications, you're ready to verify that your data is coming in.

.. note:: To instrument applications or services written in languages other than the ones listed here, see :ref:`apm-instrumentation-other-langs`.

.. _verify-apm-data:

Verify that your data is coming into Splunk APM
=========================================================

After you instrument your applications, wait a few minutes for Splunk Observability Cloud to process incoming spans. Then select :strong:`APM` in the left navigation menu and check that you can see your application data beginning to flow into the APM landing page. 

If your data is not appearing in APM as you expect, see :ref:`instr-troubleshooting`.

Next step
===========

Once have data flowing into APM, it's time to do some exploring. See :ref:`apm-orientation`.
