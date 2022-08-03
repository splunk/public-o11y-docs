.. _rum-terminology-concepts:

***********************************************
Terminology and concepts in Splunk RUM
***********************************************

.. meta::
   :description: Learn about important terminology and concepts in Splunk RUM. 

The following sections introduce important terminology and concepts in Splunk RUM.

Traces and spans
================
A trace is a collection of operations that represents a unique transaction handled by an application and its constituent services. A span is a single operation within a trace. The definitions for trace and span are the same in both Splunk RUM and Splunk APM. For more information, see :ref:`apm-add-context-trace-span`.


Sessions
---------
A session is made up of a collection of traces that correspond to the actions a single user takes when interacting with a system over a period of time. Sessions have a maximum duration of 24 hours. For example, suppose you are monitoring a retail application with Splunk RUM. A session in your application might consist of a user taking the following actions: login, add-to-cart, check-out, apply coupon, submit payment method, purchase complete.

Session ID
-----------
A session ID is created by the browser. The session ID is a field name that identifies each session in your application that you are monitoring with Splunk RUM.

Browser trace
-------------
A browser trace is a collection of spans that signifies activity on the browser such as an xhr request or a document load.

Backend traces
--------------
Backend spans are calls that microservices make to each other such as an account service making a request to a database. A collection of backend spans is a backend trace.

Span
----
In Splunk RUM, a browser span can represent one of the following actions:
- document load
- resource request
- network request
- UI calls to the server
- user xpath requests and interactions with pages

Exemplar
=========
An exemplar is an example session that contains a certain behavior you want to analyze. For example, suppose users are encountering 404 errors on your application. In Splunk RUM you can view exemplars that represent sessions where users encountered 404 errors so that you can better understand the cause and impact of the problem.

Tag
===
A tag is a field name that is an attribute of your span that you can use to filter events. An example of a tag is a property about the user, such as the operating system or the browser the user uses to view your application.

Node
====
In Splunk RUM, a node is a resource, page, or view that is instrumented and emits data about itself. For example, suppose you have a "cart" page in your application. This page reports when it was loaded, generated an error, or initiated a network request.

Inferred node
=============
An inferred node is a resource, page or view that does not directly report data about itself to Splunk RUM. You can glean information about inferred nodes by investigating the interactions other nodes have with the inferred node. For example, in this diagram, the page is an instrumented node that reports data about itself. The endpoint, an inferred node, reports back on the signals executed by the network, service and database. In this example, the endpoint, network, service and database don't directly self-report data to Splunk RUM.

..  image:: /_images/rum/inferred_node.png
    :width: 99%
    :alt: <This diagram shows how nodes relate to inferred nodes. The page node communicates with the endpoint, an inferred node. The endpoint reports back the information about the network, service, and database.>

Edge
====
An edge is the the interaction between a page and an endpoint. Edges are represented by arrows in Splunk RUM.
