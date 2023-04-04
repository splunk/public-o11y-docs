.. _historical-data:

Analyze historical data to optimize system performance using the built-in dashboard
*************************************************************************************

.. meta::
    :description: This Splunk APM use case describes how to use historical data to optimize system function.

Skyler, a performance engineer at Buttercup Games, wants to understand and analyze the end-to-end performance of microservices to optimize the system. 

These are the steps Wei takes to analyze microservice performance:

#. :ref:`historical-data-service-dashboard`
#. :ref:`historical-data-checkout-service`

.. _historical-data-service-dashboard:

Skyler opens the service-level dashboard
===============================================================

Skyler opens the service-level Splunk APM services dashboard under :guilabel:`Dashboards` > :guilabel:`Built-in Dashboard Groups` in Splunk Observability Cloud:

..  image:: /_images/apm/apm-use-cases/HistoricalDataServiceDashboard.png
    :width: 99%
    :alt: This screenshot shows selecting the service-level APM Services dashboard from built-in dashboards

.. _historical-data-checkout-service:

Skyler selects the checkout service to view long-term latency
===============================================================

Skyler selects the ``checkoutservice`` because the service triggered the APM detector for atypical latency multiple times during the past 6 months. Skyler sets the dashboard time range to the past 6 months to analyze its long-term latency distribution.

..  image:: /_images/apm/apm-use-cases/historical-data-02.png
    :width: 99%
    :alt: This screenshot shows the service-level dashboard of the checkoutservice's performance in 6 months.

|br|

Summary
============

From the latency chart, Skyler notices that the time when the checkoutservice had high latency are the days that Buttercup Games was having special sales or deploying major code changes to the system. Skyler identifies them as possible causes of the high latency and uses this information to improve system performance.

Learn more
==============

See :ref:`apm-dashboards` for more information on built-in APM dashboards.