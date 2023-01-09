.. _historical-data:

*************************************************************************************
Analyze historical data to optimize system performance using the built-in dashboard
*************************************************************************************

.. meta::
    :description: A Splunk APM use cases describes how to configure APM Business Workflows

Skyler, a performance engineer at Buttercup Games, wants to understand and analyze the end-to-end behavior of microservices to optimize the system. Skyler opens the service-level Splunk APM services dashboard among the :strong:`Built-in Dashboard Groups` in Splunk Observability Cloud:

..  image:: /_images/apm/apm-use-cases/historical-data-01.png
    :width: 75%
    :alt: This screenshot shows selecting the service-level APM Services dashboard from built-in dashboards

|br|

Skyler selects the :strong:`checkoutservice` because the service triggered the APM detector for abnormal latency multiple times during the past six months. Skyler sets the dashboard time range to the past six months to analyze its long-term latency distribution.

..  image:: /_images/apm/apm-use-cases/historical-data-02.png
    :width: 99%
    :alt: This screenshot shows the service-level dashboard of the checkoutservice's performance in six months.

|br|

From the latency chart, Skyler notices that the time when the :strong:`checkoutservice` had high latency are the days that Buttercup Games was having special sales or deploying major code changes to the system. Skyler identifies them as possible causes of the high latency and uses this information to improve system performance.