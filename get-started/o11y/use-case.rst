.. _get-started-use-case:

***********************************
Splunk Observability Cloud use case
***********************************

.. meta::
   :description: An example use case for Splunk Observability Cloud.

Buttercup Games, a fictitious games company, recently refactored its e-commerce site to go cloud native. 
The site uses microservices for the application architecture and containers for the underlying infrastructure. 
The SRE team monitors and maintains Buttercup Games site. 
The SRE team relies on Splunk Observability Cloud to monitor the entire Buttercup Games environment. 
When something goes wrong, the SRE team immediately receives a notification from Splunk On-Call. 
The site structure diagram and table from this use case originate from the 
open source microservices-demo and are used to illustrate the example. 
For more information, see the :new-page:`GitHub repository <https://github.com/signalfx/microservices-demo>` for microservices demo.

========================================
About the Buttercup Games site structure
========================================

The following map shows the application architecture:

..  image:: /_images/get-started/online_boutique_microservices_map.png
    :width: 80%
    :alt: This image describes the application architecture for the fictitious Buttercup Games e-commerce site.

The following list describes the Buttercup Games e-commerce microservices:

.. list-table::
   :header-rows: 1
   :widths: 30, 20, 50

   * - :strong:`Service`
     - :strong:`Language`
     - :strong:`Description`

   * - frontend
     - Go
     - Exposes an HTTP server to serve the website. Does not require sign up/log in and generates session ID sautomatically for all users.

   * - cartservice
     - C#
     - Stores the items in the user's shopping cart in Redis and retrieves the information.

   * - productcatalogservice
     - Go
     - Provides the list of products from a JSON file and has the ability to search products and individual products.

   * - currencyservice
     - Node.js
     - Converts an amount of money to a different currency. Users real values fetched from European Central Bank. Currencyservice is the highest QPS service.

   * - paymentservice
     - Node.js
     - Charges the given credit card info with the given amount and returns a transaction ID.

   * - shippingservice
     - Go
     - Gives shipping cost estimates based on the shopping cart. Ships items to the given address.

   * - emailservice
     - Python
     - Sends users an order confirmation email.

   * - checkoutservice
     - Go
     - Retrieves user cart, prepares order and orchestrates the payment, shipping, and email notification.

===========================================================================
Receive notifications of outages and irregular behavior from Splunk On-Call
===========================================================================

Splunk On-Call, an incident response tool available on Splunk Mobile, 
is backed by the analytics of the Splunk real-time metrics platform. 
When the number of purchases on Buttercup Games' e-commerce site dropped significantly, 
Splunk On-Call paged Jenny, a Site Reliability Engineer.

The alert text tells Jenny that the checkout completion rate is 80% lower than normal 
for the current time and day of the week. The alert logic also takes into account seasonal variation, 
so Jenny knows this drop is not an outlier. Jenny logs into Observability Cloud on her laptop to investigate.

===================================================================================
Identify errors and resource response time latency with Splunk Real User Monitoring
===================================================================================

First, Jenny wants to know the impact on users, 
so she goes to Splunk Real User Monitoring. In Splunk RUM, 
Jenny can see a summary of highest page load times, recent user activity, 
and back-end and front-end errors that might impact the performance of the Buttercup Games app.

Identify front-end errors and preview back-end performance
==========================================================

Jenny notices that there is a spike in front-end Javascript errors 
in the front-end application as well as high latency for some of the back-end endpoints. 
Jenny starts by examining the Endpoint Latency which shows a 
latency of 53.53 seconds on the endpoint, ``/cart/checkout``. 
Jenny clicks the endpoint to drill down into the spans in the tag spotlight view. 
She sees a spike related to the fetch operation, which indicates that fetch operation to the endpoint are running more slowly than normal.

She then clicks on the :strong:`Session` tab, 
and sees a list of sample session exemplars. 
She clicks on the first exemplar session, which takes her to the details page 
where she can see all the events in that session end to end. 
The waterfall shows no front-end problem or errors, 
and one of the slowest spans is indeed a Fetch request to the same endpoint. 
Jenny clicks the APM link next to that span within the waterfall and 
she sees a quick summary of the corresponding trace within the backend. 
She then clicks :strong:`traceID` to see back-end performance.

===========================================================
Jump to views of Splunk APM within Observability Cloud
===========================================================

Clicking :strong:`traceID` takes Jenny to Splunk Application Performance Monitoring, 
where she can investigate back-end performance.
When Jenny jumps across views of related data 
in other Observability Cloud tools, 
the same filters are automatically applied in the new view. 
Jenny can be sure that she is seeing the relevant information in the new view.

====================================
Discover root causes with Splunk APM
====================================

The performance issue Jenny sees associated with the user action in RUM leads her to look at 
the full set of services backing the checkout action in Splunk APM. 
On the service map, Jenny sees two errors identified by Splunk APM as root cause errors:

1. Payment service
2. Data store backing the cart service, Galactus Postgres 98321

Notify owners of microservices to take action with Splunk On-Call
=================================================================

Jenny wants to notify the owners of the cart service and the payment service. 
She does this by returning to the Splunk On-Call Incident War Room on her mobile. 
There, she adds the Payment Service and Cart Service teams to the incident. 
Splunk On-Call, which manages on-call team schedules, notifies the appropriate on-call team member for each team. 
Sarah, the cart service owner, and Andrew, the payment service owner, 
receive alerts about the errors and look into the incidents on their respective services.

Determine the impact of the errors on the Buttercup Games site
==============================================================

Jenny first checks out the data store backing the card service, 
to see if any of its errors correlate with the backend latency. 
She clicks Galactus Postgres 98321, the data store, on the service map. 
She then clicks the tab Kubernetes Pods for Galactus Postgres 98321 
at the bottom of the page to see information related to the service, 
such as what infrastructure it runs on, what alerts it has, whether there are any error logs associated with it.

Investigate infrastructure health
=================================

She checks to see whether there are any infrastructure issues. 
She doesn't see any infrastructure issues, but she notices that there was a recent code push, 
so the pods running on the service are relatively new. 
The error messages she can see do not indicate anything that could explain the high latency.

Compare current behavior with past trends
=========================================

Meanwhile, Andrew, the owner of the Payment Service clicks 
paymentservice on the service map to see what, if any, errors 
are occurring on paymentservice. Paymentservice is a custom microservice 
instrumented using OpenTelemetry, the new standard for unified metrics, traces, 
and log data. The paymentservice flyout on the right panel opens. Without needing 
to dig into individual traces, Andrew can see aggregated trends in his errors and 
notices that most errors are from the production environment.

In the Top Tags in Error Spans section of the paymentservice panel on the right, 
Andrew sees that most errors are occurring in the production environment. 
Tag Spotlight has infinite cardinality, allowing Andrew to dig deeper. 
He can see how his requests and errors are distributed by each tag and value. 
This allows him to both identify the root cause and get a sense of the radius of impact on the payment services.

Drill into the details
======================

The versions point to a problematic deploy and all tenant levels appear 
to be affected. He can now narrow his investigation to a version of the code and dive deep into a specific trace.

Andrew notices a trace that shows unexpected behavior so he clicks 
it to see related logs. Because Splunk APM uses Open Telemetry, 
the metadata needed to correlate traces and relevant logs is available. 
Clicking the Trace ID opens Splunk Log Observer where Andrew can see related logs.

=====================================
Take action with Splunk Log Observer
=====================================

Some of the log lines related to the Trace ID Andrew clicked on have errors. 
The error message indicates that there was a failed payment attempt but that 
the checkout eventually went through. To see more details, Andrew clicks on one 
of the log lines that has this error message.


Filter the Trace ID by filtering on error message
=================================================

The Log Details panel on the left shows that the payment failed because 
the API token was a test token, not a production token. 
To confirm his suspicions, Andrew filters Splunk Log Observer by name and message. 
He clicks the name, "paymentservice" then selects :strong:`Filter on value` 
from the drop-down list. He then clicks the message, 
"Failed payment processing through Buttercup payments: Invalid API Token (test20e26…)" 
and selects :strong:`Filter on value.`

Andrew then clears the Trace ID from the filter 
so that he can broaden the data set to include all of the logs with that message for the payment service.

Identify the problematic build
==============================

Next, Andrew wants to group by version number. 
To do this, he closes the Log Details panel on the right and clicks Visual Analysis 
in the top right corner. In the Group by field, he enters "version". 
Andrew instantly sees that all logs with that error message are correlated with version v350.1.

Implement a fix
===============

He reverts the code back to a known good state until he finds 
the correct token to use. To confirm that reverting the code stopped 
the "Failed payment" problem, he switches to Live Tail in Log Observer 
to see if the failed payment messages have stopped appearing in his logs. 
Andrew clicks the time picker in the upper left corner and selects Live Tail from the drop-down. 
The failed payment messages have stopped and a toast notification appears in the upper right corner letting him know that the incident has resolved.
