.. _monitor-services:

Scenario: Deepu monitors service performance using a built-in dashboard
************************************************************************

.. meta::
    :description: This Splunk APM scenario describes how to monitor service performance using the APM dashboard.

Buttercup Games launches a Black Friday sales event. Deepu, the payment service owner, expects higher traffic on the website that might impact the payment service. In addition to setting Splunk APM detectors to alert for the atypical error rate and latency, Deepu uses the Splunk APM Service dashboard for monitoring. 

These are the steps Deepu takes to monitor the payment service using a Splunk APM Service dashboard:

#. :ref:`monitor-services-open-dash`
#. :ref:`monitor-services-chart-res`

.. _monitor-services-open-dash:

Deepu opens the APM Service dashboard for the payment service
===============================================================

From the :guilabel:`APM Overview`, Deepu selects :guilabel:`Explore` to enter the service map. Deepu selects the ``paymentservice`` node and selects :guilabel:`View Dashboard` on the sidebar.

..  image:: /_images/apm/apm-use-cases/MonitorServices.png
    :width: 99%
    :alt: This screenshot shows the option to view the dashboard from the service map.

.. _monitor-services-chart-res:

Deepu adjusts the dashboard chart resolution and uses a data link to go to a related infrastructure dashboard
================================================================================================================

Deepu sees the built-in dashboard for the payment service and then sets the :guilabel:`Chart Resolution` to very high for monitoring more details. Deepu configured global data links to connect Splunk APM properties to related resources in Splunk Observability Cloud. By selecting a tag with a global data link, Deepu can navigate to an infrastructure-related dashboard that they can use to cross-monitor the payment service and the infrastructure.

..  image:: /_images/apm/apm-use-cases/MonitorServicesDashboard.png
    :width: 99%
    :alt: This screenshot shows the APM Service dashboard for the payment service.

Learn more
==============

* For details about how to configure Splunk APM detectors, see :ref:`apm-alerts`.

* To learn more about creating global data links, see :ref:`apm-data-links`.

* For more information about using Splunk Infrastructure Monitoring, see :ref:`get-started-infrastructure`.