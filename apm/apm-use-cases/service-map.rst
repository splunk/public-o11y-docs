.. _service-map:

*************************************************************************
Investigate the root cause of an error with Splunk APM service map
*************************************************************************

.. meta::
    :description: A Splunk APM use cases describes how to use APM service map to investigate root cause error rate

Kai, a site reliability engineer at Buttercup Games, receives tickets from multiple customers getting “Invalid request” errors when purchasing games on the Buttercup Games website. To figure out the most downstream service causing the error, Kai selects the :strong:`Explore` window in Splunk APM to open the service map for troubleshooting. 

Kai looks through the real-time service map, which contains nodes and dependencies of services instrumented in Splunk APM. The service map identifies the root cause error rate using red color. Kai finds that the :strong:`paymentservice` node has a red dot, and the dependency arrow from the :strong:`checkoutservice` node and the :strong:`paymentservice` node is red.

..  image:: /_images/apm/apm-use-cases/service-map-01.png
    :width: 80%
    :alt: This screenshot shows the service map view of the Buttercup Games website where nodes with root cause errors are highlighted in red.

|br|

Kai clicks the :strong:`paymentservice` node to discover the endpoint with the top error rate on the Tag Spotlight sidebar. Kai finds that all of the errors occur in one endpoint, as shown in the following screenshot:


..  image:: /_images/apm/apm-use-cases/service-map-02.png
    :width: 70%
    :alt: This screenshot shows the Tag Spotlight preview of the endpoints with the top error rate and the top latency.

Kai adds the link to the endpoint’s Tag Spotlight and a note identifying the endpoint as the root cause of the error to customers’ tickets. Kai sends the ticket to the payment service owner for further troubleshooting.

Learn more
==============

To learn more about the service map in Splunk APM, see :ref:`apm-service-map`. 

For information about how to instrument your applications to send application metrics and traces to Splunk Observability Cloud, see :ref:`get-started-application`.