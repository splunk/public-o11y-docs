.. _monitor-services:

Use case: Monitor service performance using a built-in dashboard
**********************************************************************

.. meta::
    :description: This Splunk APM use case describes how to monitor service performance using the APM dashboard.

Buttercup Games launches a Black Friday sales event. Deepu, the payment service owner, expects higher traffic on the website that might impact the payment service. In addition to setting Splunk APM detectors to alert for the atypical error rate and latency, Deepu uses the Splunk APM Service dashboard for monitoring. 

From the :strong:`APM Overview`, Deepu selects :strong:`Explore` to enter the service map. Deepu click the :strong:`paymentservice` node and selects :strong:`View Dashboard` on the sidebar.

..  image:: /_images/apm/apm-use-cases/monitor-services-01.png
    :width: 99%
    :alt: This screenshot shows how to view the dashboard from the service map.

|br|

Deepu sees the built-in dashboard for the payment service, and then sets the :strong:`Chart Resolution` to very high for monitoring more details. Deepu configured global data links to connect Splunk APM properties to related resources in Splunk Observability Cloud. By clicking a tag with a global data link, Deepu can navigate to an infrastructure-related dashboard that they can use to cross-monitor the payment service and the infrastructure.

Learn more
==============

* For details about how to configure Splunk APM detectors, see :ref:`apm-alerts`.

* To learn more about creating global data links, see :ref:`apm-data-links`.

* For more information about using Splunk Infrastructure Monitoring, see :ref:`get-started-infrastructure`.