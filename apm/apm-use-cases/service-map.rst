.. _service-map:

*************************************************************************
Investigate the root cause of an error with Splunk APM service map
*************************************************************************

.. meta::
    :description: This Splunk APM use case describes how to use APM service map to investigate root cause error rate.

Kai, a site reliability engineer at Buttercup Games, receives tickets from multiple customers getting “Invalid request” errors when purchasing games on the Buttercup Games website. 

To troubleshoot the invalid request error reports, Kai takes the following steps:

#. Kai opens the service map
#. Kai looks for services that have a red dot
#. Kai selects service to gather more details about the root cause error
#. Kai adds a link to Tag Spotlight for the offending endpoint to the customer ticket

Kai opens the service map
===========================

To figure out the most downstream service causing the error, Kai selects the :strong:`Explore` card in Splunk APM to open the service map for troubleshooting. Kai looks through the real-time service map, which contains nodes and dependencies of services instrumented in Splunk APM. 

Kai looks for services that have a red dot
=============================================

The service map identifies the root cause error rate using red color. Kai finds that the :strong:`paymentservice` node has a red dot, and the dependency arrow from the :strong:`checkoutservice` node and the :strong:`paymentservice` node is red. 

..  image:: /_images/apm/apm-use-cases/service-map-01.png
    :width: 80%
    :alt: This screenshot shows the service map view of the Buttercup Games website where nodes with root cause errors are highlighted in red.

|br|

Kai selects service to gather more details about the root cause error
=======================================================================

Kai selects the :strong:`paymentservice` node to discover the endpoint with the top error rate in the Tag Spotlight sidebar. Kai finds that all of the errors occur in one endpoint, as shown in the following screenshot:

..  image:: /_images/apm/apm-use-cases/service-map-02.png
    :width: 70%
    :alt: This screenshot shows the Tag Spotlight preview of the endpoints with the top error rate and the top latency.

Kai adds a link to Tag Spotlight for the offending endpoint to the customer ticket
=====================================================================================

Kai gets a the link to the Tag Spotlight for the endpoint and includes it in a note he adds identifying the endpoint as the root cause of the error to customers' tickets. Kai sends the ticket to the payment service owner for further troubleshooting.

Summary
==============

Kai used the service map to quickly isolate a service with a high root cause error rate rate and identifies it as the likely culprit of invalid request errors customers were reporting. He shares this info with the service owner for further troubleshooting.

Learn more
==============

To learn more about the service map in Splunk APM, see :ref:`apm-service-map`. 

For information about how to instrument your applications to send application metrics and traces to Splunk Observability Cloud, see :ref:`get-started-application`.