.. _apm-inferred-services:

************************************************
Analyze the performance of inferred services
************************************************

.. meta::
   :description: Learn how Splunk APM can infer the presence of the remote service or inferred service.

In certain cases, a remote service might not have tracing turned on, either because it is not instrumented yet, or because instrumentation is not possible. Splunk APM can infer the presence of the remote service, or inferred service, if the span calling the remote service has the necessary information. 

Splunk APM adds an inferred span to the relevant trace to represent an operation occurring in an inferred service. For further details on how Splunk APM infers services, see :ref:`how-apm-infers-services`.

The following table describes common types of inferred services:

.. list-table::
   :header-rows: 1
   :widths: 20 20 60

   * - :strong:`Type`
     - :strong:`Example`
     - :strong:`Notes`

   * - | Generic service 
       | (dotted circle in the service map)
     - AWS service 
     - | This service type includes external service providers, generic remote procedure calls (RPCs), and HTTP services. See the following sections to learn more about each of these types:
       
          * :ref:`http-inf-logic`
          * :ref:`rpc-inf-logic`
          * :ref:`generic-inf-logic`

       | If your system interacts with a large number of HTTP services, inferring HTTP services might increase the cardinality of your Troubleshooting MetricSets (TMS). If so, you might turn off inferring HTTP services in your org to prevent excessive cardinality. See  :ref:`infer-http-services` to manage inferred HTTP services.     
       
   * - | Publisher/subscriber queues (pub/sub)

       | (dotted arrow in the service map)

     - Kafka, Kinesis
     - To learn more about inferred pub/sub queues, see :ref:`pubsub-inf-logic`.

   * - | Database

       | (dotted cylinder in the service map) 

     - MySQL, AWS S3, Redis, MongoDB
     - In addition to the details described in :ref:`inf-service-info`, Splunk APM provides additional analytics for inferred SQL databases. See :ref:`db-query-performance` to learn more about database insights in Splunk APM. 


.. _inf-service-info: 

What information about inferred services is available?
========================================================

Because inferred services are not instrumented, Splunk APM only has access to spans from instrumented services that call inferred services. Splunk APM places inferred services in their inferred locations in the service map and provides :ref:`Troubleshooting MetricSets<troubleshooting-metricsets>` (TMS), or request, error, and duration (RED) metrics, based on the associated client-side spans. You can continue to troubleshoot with these metrics in :ref:`Tag Spotlight<apm-tag-spotlight>`. If the inferred service is servicing other uninstrumented services, these reported RED metrics might not provide a complete picture of the inferred service's interactions. 

Splunk APM does not create :ref:`Monitoring MetricSets<monitoring-metricsets>` (MMS) for inferred services because MMS are created in real time from spans where ``span.kind = SERVER`` or ``span.kind = CONSUMER``, and Splunk APM does not receive server or consumer-side spans from uninstrumented services. This means that even though inferred services appear in the list of services on the landing page, you can't get real-time MMS data on inferred services in the APM landing page or in dashboards and alerts, and you can't create detectors based on inferred services. 

.. _inferred-service-map:

Viewing inferred services in the service map
---------------------------------------------

Inferred services, pub/subs, and databases appear in their inferred locations in the service map. When you select on an inferred service in the service map, you can view its service type, service names, and request, error rate, and latency (RED) metrics. Metrics are based on referring spans from instrumented services and might not provide a complete picture of the inferred service's interactions.

.. _inferred-service-trace-view:

Viewing inferred services in trace view
---------------------------------------------

Inferred services, pub/subs, and databases also appear as spans in the Trace Waterfall view. They appear in a gray box with italicized print, as in the following screenshot:

..  image:: /_images/apm/inferred-services/inferred-service-trace-view.png
    :width: 95%
    :alt: This screenshot shows an example of inferred spans appearing in Trace View. 

When you select an inferred span in the Trace Waterfall, it expands to show the metadata of the corresponding parent span. The length of the operation represented as the gray striped bar in the waterfall visualization is also inherited from the parent span and might not be exactly representative of the operation duration in the inferred service.

.. _how-apm-infers-services:

How does Splunk APM identify inferred services?
=================================================

When a client or producer span doesn't have a corresponding server span, Splunk APM checks whether the unpaired span contains tags that indicate interaction with an uninstrumented service. 

To identify an inferred service, Splunk APM first checks for tags that indicate the ``type`` of the inferred service, and then checks for tags that indicate the service ``name``. After Splunk APM identifies a client or producer span with a tag or tags that indicate interaction with one of these service types, it creates an inferred span to represent the operation in the uninstrumented service. 

The table in :ref:`inferred-service-types` provides a list of types of inferred services and the tags and the inference methods that Splunk APM uses to identify each type of inferred service. In the case of inferred pub/sub services, the inferred span inherits the metadata from the corresponding client or producer span and is attached directly to that span. 

For inferred service types other than pub/sub, Splunk APM applies additional logic to ensure it captures only the most important application-level information. If there are multiple client spans without a corresponding server span, the inferred span inherits the metadata from the parent-most of these client spans. The inferred service span is then attached to the most recent of these client spans. Otherwise, if there is a single client span without a corresponding server span, the inferred span inherits the metadata from that client span and is attached to that same span. 

.. _infer-http-services: 

Manage inferring HTTP services
=============================================

You can configure Inferring HTTP services to control over inferred services appear in the service map and generate Troubleshooting MetricSets. 

The advantage of inferring HTTP services is that you have visibility into their interactions with instrumented services. The potential downside is that if there are a lot of different HTTP services called from your system, they might crowd the service map and increase TMS cardinality.

Splunk APM administrators can manage inferred HTTP services in the :guilabel:`APM Configuration`, providing flexibility based on your particular system. 

Prerequisites
---------------

You need to be an administrator in Splunk APM to manage HTTP inferred services.

Configure Splunk APM to infer HTTP services 
---------------------------------------------------

Follow these steps to configure inferred HTTP services in Splunk APM:

#. From the Splunk APM Landing page, select :guilabel:`APM Configuration` and select :guilabel:`APM Service & Traces` from the menu. The :guilabel:`APM Services & Traces` page opens.
#. Under :guilabel:`Inferred services`, find the row for :guilabel:`Inferred HTTP service` and select :guilabel:`Configure`. The configuration dialog box opens. 
#. In the :guilabel:`Configure Inferred HTTP Services` configuration dialog box, select `Infer HTTP services`.
#. :guilabel:`Save` your changes. 

.. note::

  Inferring HTTP services generates Troubleshooting MetricSets for each new inferred service and therefore increases Troubleshooting MetricSet cardinality. Select :guilabel:`Subscription Usage` to view your current cardinality usage. See :ref:`troubleshoot-mms` to learn more about managing cardinality.
  
.. _inferred-service-types:

Types of inferred services and how they're inferred
====================================================

The following table provides a list of types of inferred services and the tags and the inference methods that Splunk APM uses to identify each type of inferred service. The span tags used in these inference rules are based on OpenTelemetry semantic conventions.

Splunk APM infers the following types of services:

* :ref:`http-inf-logic`
* :ref:`rpc-inf-logic`
* :ref:`generic-inf-logic`
* :ref:`pubsub-inf-logic`
* :ref:`db-inf-logic`

.. _http-inf-logic: 

Inferred HTTP services
-----------------------

When Splunk APM infers an HTTP service, it means an instrumented service is talking to a remote HTTP endpoint.

To assign a service name for an inferred HTTP service, Splunk APM does the following:

1. Verify that the ``span.kind`` of the referring span is equal to ``CLIENT``.
2. If one or more of ``http.host``, ``http.url`` or ``net.peer.name`` exist, and ``peer.service`` exists as well, use ``peer.service`` for the service name. This ensures that the ``peer.service`` is an HTTP service.
3. Look for the service name in the following tags, in this order:

    a. ``http.host``: host name extracted as-is
    b. ``peer.hostname``: host name extracted as-is
    c. ``peer.address``: host name is extracted from the URL
    d. ``http.url``: host name is extracted from the URL
    e. ``net.peer.name``: host name extracted as-is

4. If any of these tags are found, infer the service name from the first appearing tag. If none of these tags are found, the span is not considered related to an inferred HTTP service.

.. note:: To reduce noise in the service map and managing cardinality, Splunk APM excludes services without a host name or that use their IP address as host name. If you need to turn on IP addresses, contact your sales representative.

.. _rpc-inf-logic:

Inferred RPC services
------------------------

When Splunk APM infers an RPC service, it means an instrumented service is making a remote procedure call.

To infer an RPC service, Splunk APM does the following:

#. Verify that the ``span.kind`` of the referring span is equal to ``CLIENT``.       
#. Verify that the referring span contains the ``rpc.system`` span tag. This tag is used to identify the remote system, such as ``grpc``, ``java_rmi``, or ``wcf``. 
#. Look for the service name in the ``rpc.service``, ``net.peer.name`` and ``rpc.system``` tags, in that order.
#. If any of these tags are found, infer the service name from the first appearing tag. If none of these tags are found, the span is not considered related to an inferred RPC service.

.. _generic-inf-logic:

Generic inferred services
----------------------------
This is a catch-all layer to infer generic services using the ``peer.service`` span tag.

To infer a generic service from a client span, Splunk APM does the following:

#. Verify that the ``span.kind`` of the referring span is equal to ``CLIENT``.
#. Look for the service name in the ``peer.service`` tag
#. If the ``peer.service`` tag exists, infer the service name from it. If the ``peer.service`` tag doesn't exist, the span isn't considered to be related to a generic inferred service.
 
**Note on AWS services:** To identify AWS services, the span must contain ``http.url``. Splunk APM applies heuristics on this tag's value to determine the AWS Service type from the URL.

.. _pubsub-inf-logic:

Inferred publisher/subscriber (pub/sub) queues
------------------------------------------------------

When Splunk APM infers a publisher/subscriber queue, it means an instrumented service is interacting with an uninstrumented pub/sub. To identify an inferred pub/sub, Splunk APM does the following:

#. Verifies that the ``span.kind`` of the referring span is equal to ``PRODUCER`` or ``CLIENT``.
#. Verifies that the span contains either ``messaging.destination`` (in libraries that support OpenTelemetry semantic conventions version 1.16.0 or lower) or ``messaging.destination.name`` (in libraries that support OpenTelemetry semantic conventions version 1.17.0 or higher). The value of these tags is used to specify the name of the topic or channel that messages are sent to.

    #. If both ``messaging.system`` and ``messaging.destination.name`` exist, the inferred service name is equal to <Value of ``messaging.system`` tag>:<Value of ``messaging.destination.name`` tag>.
    #. If ``messaging.system`` is null, the inferred service name is equal to <Value of ``messaging.destination.name`` tag>.
    #. If ``messaging.destination.name`` is null, the inferred service name is equal to <Value of ``messaging.system`` tag>.

.. _db-inf-logic:

Inferred databases
---------------------

When Splunk APM infers a database, it means an instrumented service is making a call to an uninstrumented database. 

To identify a database, the ``kind`` of the referring span must be equal to ``client``, and the span must contain at least one of the following tags: 
            
* ``db.system``
* ``db.name``
* ``db.type``
* ``db.instance``

To determine the ``name`` of an inferred database, Splunk APM applies this logic in the following order: 

#. If the ``db.system`` tag exists, its value is used to specify the type of database being queried, for example, ``mysql``, ``redis``, and so on. If only this tag is present, its value is also used as the ``service.name`` for the inferred database.
#. If the ``db.name`` tag exists, its value is concatenated with ``db.system`` to form the name of the inferred service: ``db.system:db.name`` (for example, ``mysql:sql_db_1``).
#. If the ``db.connection_string`` tag is present and its value conforms to a known format such as Java database connectivity (JDBC), Splunk APM extracts the database name portion of the url and concatenates it with the value of ``db.system`` to form the database name, such as ``mysql:dbname``. If the value of ``db.connection_string`` does not conform to a known format or the database portion cannot be extracted and ``db.name`` also does not exist, Splunk APM uses the raw value of ``db.connection_string`` as the database name. If ``db.system`` also exists, the two values are concatenated. 

Splunk APM also provides additional analytics for supported SQL databases. See :ref:`db-query-performance` to learn more.

