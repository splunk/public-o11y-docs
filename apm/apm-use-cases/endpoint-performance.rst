.. _apm-use-case-endpoint-performance:

*******************************************************************************************************
Use case: Improve service performance using endpoint performance in Splunk APM
*******************************************************************************************************

.. meta::
    :description: Alex uses Splunk APM endpoint performance regularly monitor the performance of the payment service to ensure continuous improvement of the payment experience. 

Alex, a performance engineer at Buttercup games, wants to regularly monitor and optimize the experience of the checkout experience for Buttercup Games customers. The checkout service is a monolith service that 

Alex opens the dependency map in APM and notices there are several endpoints listed in the Endpoint Performance card that show a P90 latency of 2+ seconds. They select the endpoint performance card to get more details about which endpoints are taking longer than 2 seconds. 

Within Endpoint Performance, Alex sorts the endpoints by P90 Latency so he can quickly see the endpoints with the highest latency. 

Alex knows there was a release this morning, so they want to compare the performance from the last hour to yesterday. So they updates the time dropdown to -1h and the select -24h for the comparison so that they can compare the last hour to the same time frame yesterday.

Alex notices that the _______ endpoint has a 110% increase in P90 latency compared with yesterday. He selects this endpoint and reviews the Tag Spotlight details. He notices that the http.status_code 503 is the top high-latency tag. He selects this tag to explore in Tag Spotlight. 

In Tag Spotlight Alex locates the 503 status codes and adds a filter Tag Spotlight for 503 responses. Now he can see that the latest version released today is responsible for the majority of the 503 responses. Having identified some latency associated with the 503 responses in the latest version, Alex consults with his team regarding the cause for the 503 responses.