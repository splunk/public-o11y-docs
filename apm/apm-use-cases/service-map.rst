.. _service-map:

Scenario: Kai investigates the root cause of an error with the Splunk APM service map
***************************************************************************************

.. meta::
    :description: This Splunk APM scenario describes how to use the APM service map to investigate root cause error rate.

Kai, a site reliability engineer at Buttercup Games, receives tickets from multiple customers getting "Invalid request" errors when purchasing games on the Buttercup Games website. 

To troubleshoot the invalid request error reports, Kai takes the following steps:

#. :ref:`service-map-use-case-service map`
#. :ref:`root-cause-errors`
#. :ref:`select-service`
#. :ref:`tag-spotlight-link`

.. _service-map-use-case-service map:

Kai opens the service map
===========================

To investigate the downstream service causing the error, Kai selects the :strong:`Explore` card in Splunk APM to open the service map for troubleshooting. Kai looks through the real-time service map, which contains nodes and dependencies of services instrumented in Splunk APM. 

.. _root-cause-errors:

Kai looks for services that have root-cause errors
====================================================

The service map identifies the root cause error rate using red. Kai finds that the :strong:`paymentservice` node has a red dot, and the dependency arrow from the :strong:`checkoutservice` node and the :strong:`paymentservice` node is red. 

..  image:: /_images/apm/apm-use-cases/service-map-01.png
    :width: 65%
    :alt: This screenshot shows the service map view of the Buttercup Games website where nodes with root-cause errors are highlighted in red.

|br|

.. _select-service:

Kai selects the service to gather more details
===========================================================================

Kai selects the :strong:`paymentservice` node to discover the endpoint with the top error rate in the Tag Spotlight sidebar. Kai finds that all of the errors occur in one endpoint, as shown in the following screenshot:

..  image:: /_images/apm/apm-use-cases/service-map-02.png
    :width: 50%
    :alt: This screenshot shows the Tag Spotlight card with endpoint data showing the top error rate and the top latency.

.. _tag-spotlight-link:

Kai adds a link to Tag Spotlight for the offending endpoint to the customer ticket
=====================================================================================

Kai gets a link to the Tag Spotlight for the endpoint and includes it in a note they add to the customer tickets identifying the endpoint as the root cause of the error. Kai sends the ticket to the payment service owner for further troubleshooting.

Summary
==============

Kai used the service map to quickly isolate a service with a high root cause error rate and identified it as the likely culprit of invalid request errors customers were reporting. Kai shares this info with the service owner for further troubleshooting.

Learn more
==============

To learn more about the service map in Splunk APM, see :ref:`apm-service-map`. 

For information about how to instrument your applications to send application metrics and traces to Splunk Observability Cloud, see :ref:`get-started-application`.