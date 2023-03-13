.. _apm-use-case-endpoint-performance:

*******************************************************************************************************
Use case: Improve service performance using endpoint performance in Splunk APM
*******************************************************************************************************

.. meta::
    :description: Alex uses Splunk APM endpoint performance regularly monitor the performance of the payment service to ensure continuous improvement of the payment experience. 

Alex, a performance engineer at Buttercup games, wants to regularly monitor and optimize the experience of the for Buttercup Games customers. Today Alex is particularly interested in the checkout experience as there were some enhancements released this morning to the checkout experience. 

Alex opens the dependency map in APM. Because the Buttercups Games app uses a monolith architecture, he can drill down into an component service using the dependency map. So, Alex uses the Endpoint Performance card and notices there are checkout endpoints listed in the Endpoint Performance card that show a P90 latency of 2+ seconds. Alex select the Endpoint Performance card to get more details about which checkout endpoints are taking longer than 2 seconds. 

Within Endpoint Performance, Alex sorts the endpoints by P90 Latency so he can quickly see the endpoints with the highest latency. He also uses the search to filter to endpoints with /checkout/ in the path. 

Alex knows there was a release this morning, so they want to compare the performance from the last hour to yesterday. So they update the time dropdown to -1h and the select -24h for the comparison so that they can compare the last hour to the same time frame yesterday.

Alex notices that the checkout/{cardId} endpoint has a 110% increase in P90 latency compared with yesterday. He selects this endpoint and reviews the Tag Spotlight details. He notices that the http.status_code 503 is the top high-latency tag. He selects this tag to explore in Tag Spotlight. 

In Tag Spotlight Alex locates the 503 status codes and adds a filter Tag Spotlight for 503 responses. Now he can see that the latest version released today is responsible for the majority of the 503 responses. Having identified some latency associated with the 503 responses in the latest version, Alex consults with his team regarding the cause for the 503 responses.