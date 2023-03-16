.. _apm-use-case-endpoint-performance:

*******************************************************************************************************
Use case: Monitor service performance using endpoint performance in Splunk APM
*******************************************************************************************************

.. meta::
    :description: Alex uses Splunk APM endpoint performance regularly monitor the performance of the payment service to ensure continuous improvement of the payment experience. 

Alex, a performance engineer at Buttercup games, wants to regularly monitor and optimize the Buttercup Games customer experience. Today, Alex is particularly interested in the checkout experience as there were some enhancements released this morning to that experience. 

To review the performance of the checkout experience, Alex takes the following steps:

#. :ref:`endpoint-performance-card`
#. :ref:`sort-filter-endpoint-performance`
#. :ref:`compare-endpoint-performance`
#. :ref:`tag-spotlight`

.. _endpoint-performance-card:

Alex reviews the endpoints in the Endpoint Performance card
================================================================

Alex opens the dependency map in APM. Because the Buttercups Games app uses a monolith architecture, they can't drill down into a component service using the dependency map; so, Alex reviews the Endpoint Performance card and notices there are checkout endpoints listed in the Endpoint Performance card that show a P90 latency of 2+ seconds. 
.. _sort-filter-endpoint-performance:

Alex sorts and filters endpoints in Endpoint Performance
================================================================


Alex selects the Endpoint Performance card to go to the full Endpoint Performance page to get more details about which checkout endpoints are taking longer than 2 seconds. 

Within Endpoint Performance, Alex sorts the endpoints by P90 Latency so they can quickly see the endpoints with the highest latency. Alex also uses the search to filter to endpoints with /checkout/ in the path. 

.. _compare-endpoint-performance:

Alex compares the last hour performance to the 24 hours previous
=============================================================================

Alex knows there was a release this morning, so they update the time dropdown to -1h and they select -24h for the comparison so that they can compare the last hour to the same time frame yesterday.

Alex notices that the checkout/{cardId} endpoint has a 110% increase in P90 latency compared with the same hour yesterday. 

.. _tag-spotlight:

Alex uses Tag Spotlight to get more context 
=============================================================================

He selects this endpoint and reviews the Tag Spotlight details. Alex notices that a http.status_code 503 is the top high-latency tag. Alex selects this tag to explore in Tag Spotlight. 

In Tag Spotlight Alex locates the 503 status codes and adds a filter Tag Spotlight for 503 responses. Now they can see that the latest version released today is responsible for the majority of the 503 responses. Having identified some latency associated with the 503 responses in the latest version, Alex consults with his team regarding the cause for the 503 responses.

Summary
==========

Alex used Endpoint Performance to monitor endpoints within his monolith. Using the filter, sort, and compare functionality within the Endpoint Performance they were able to quickly isolate an endpoint that had increased latency after a release. 