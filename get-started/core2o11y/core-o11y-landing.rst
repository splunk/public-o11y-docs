.. _core-o11y-landing:

****************************************************************
The Splunk platform and Splunk Observability Cloud
****************************************************************

.. meta::
    :description: Homepage for Splunk core customers using Splunk core platform logs in the observability space.

.. toctree::
   :hidden:

   slis
   incident-response
   toil-reduction
   core2o11y-collaboration

The Splunk platform is the most thorough logging solution for security, and Splunk Observability Cloud provides comprehensive observability across your stack. With over two hundred out of the box integrations and dashboards on hybrid cloud infrastructure and infrastructure services, Splunk Observability Cloud lets you to start monitoring, troubleshooting, automating, and collaborating immediately. Speed your cloud journey with a single pain of glass for hybrid coverage. Observability Cloud's cloud-native data and analytics scale is ideal for Kubernetes and highly ephemeral environments. With Splunk Observability Cloud, you can quickly find, analyze, and resolve incidents anywhere in your stack from multicloud to microservices to serverless. Increase reliability and lower your mean time to resolution for all integrated systems. Observability Cloud is the purpose built tool for monitoring, maintaining, and improving system reliability.

The practice of reliability with Splunk Observability Cloud
==============================================================================================
Five core principles and practices underpin system reliability: availability, performance, monitoring, incident response, and preparation. See :new-page:`What is site reliability engineering? <https://www.splunk.com/en_us/data-insider/what-is-site-reliability-engineering.html#:~:text=Site%20reliability%20engineering%20(SRE)%20is,production%20systems%20and%20solve%20problems.>` for a deeper understanding of what it takes to achieve reliability in your systems and why Splunk Observability Cloud is the optimal toolset for the job. 

The general principles and practices of reliability fall into four primary categories of tasks:

* :ref:`Monitor SLIs, manage SLOs, and meet SLAs <core2o11y-slis>`

* :ref:`Respond to incidents and write postmortems <core2o11y-incident-response>`

* :ref:`Reduce toil: Automated solutions for interacting with the infrastructure <toil-reduction>`

* :ref:`Collaborate on reliability across teams <toil-reduction>`

Select each of the previous categories to learn how you can execute each major reliability duty in Observability Cloud. The following section explains how to send your data to Observability Cloud.

Set up Observability Cloud components
=============================================================================================
See :ref:`welcome` for a description of each component in Observability Cloud. With the exception of Log Observer Connect, you must send data from your systems to each Observability Cloud component. You do not need to send your Splunk Cloud Platform or Splunk Enterprise logs to Observability Cloud to analyze them in Log Observer Connect. Instead, see :ref:`logs-scp` or :ref:`logs-set-up-logconnect` to execute the native integration that allows you to analyze your Splunk platform logs in Log Observer Connect without sending them outside of your Splunk platform instance.

For each other Observability Cloud component, see the following pages to send your data to Observability Cloud:

- :ref:`apm`

- :ref:`infrastructure-infrastructure`

- :ref:`logs-set-up-logconnect` (Setup is required, but your logs do not leave your Splunk platform instance.)

- :ref:`rum-setup`

- :ref:`set-up-synthetics`

For an overview of setting up all components and the recommended order of setup, see :ref:`get-started-get-data-in`.

.. _core-o11y-differences:

Differences between Observability Cloud and the Splunk platform
=============================================================================================
Observability Cloud and the Splunk platform serve different needs and are conceptually unique. There are three primary ways that the two differ.

The Splunk platform is built around an advanced query language, SPL, that allows users to drill down into their logs in complex and nuanced ways. Observability Cloud, on the other hand, does not require a query language. Instead, Observability Cloud lets novice users analyze their Splunk platform logs along with correlated metrics, traces, and user sessions with point-and-click technology. There is no need to learn SPL or any other query language in Observability Cloud.

A second difference is in alerting. Alerting for the Splunk Platform and alerting for Observability Cloud remain separate. When you set alerts and detectors in the Splunk platform, only users in the Splunk platform instance can receive notifications. Likewise, only Observability Cloud users can receive notifications for alerts and detectors set in Observability Cloud.

A third difference between Observability Cloud and the Splunk platform is in how you must send data to them. The Splunk platform and Splunk Observability Cloud currently use different data collection agents:

- The Splunk platform uses the Universal Forwarder (UF) to capture logs and some metrics (stored as logs).

- Observability Cloud uses OpenTelemetry to capture metrics, traces, and logs. 

See :ref:`collector-with-the-uf` to learn more about the differences between these two collection agents and how you can use them together. 







