.. _apm-identities:

**********************
Identities
**********************

.. meta::
   :description: Learn about identities in Splunk Observability Cloud. Identities represent an object with a set of unique indexed span tags in Splunk Observability Cloud.

An identity represents a unique set of indexed span tags for a Splunk APM object, and always includes at least one service. 

APM objects can generate multiple identities that correspond to the same APM object. If a set of indexed span tags for a span that corresponds to a certain APM object is unique, the APM object generates a new identity for the unique set of indexed span tags. 

For example, a service ``myService`` reports a tenant span tag ``something`` for its endpoint ``/foo/bar``, and doesn't report a tenant span tag for its endpoint ``/another/endpoint``. Because ``myService`` reports a tenant span tag for one endpoint and not another, it forces the endpoint without a specified tenant span tag to have a tenant span tag value of ``unknown``. As a result, the service has two unique sets of span tags, and two identities. 

An identity can represent any one of these APM objects:

.. list-table::
   :header-rows: 1
   :widths: 20, 40, 40

   * - :strong:`APM object`
     - :strong:`Example`
     - :strong:`Description`
   
   * - Service
     - ``Service-1``
     - The name of a service you instrumented and are collecting traces from.

   * - Endpoint
     - ``Service-1.Endpoint-1``
     - The first span for a service.

   * - Operation
     - ``Service-1.Operation-1``
     - A span within a single service.

   * - Edge
     - ``Service-1.Endpoint-1->Service-2.Endpoint-2``
     - The span between two services.

   * - Workflow
     - ``Service-1.InitEndpoint-1``
     - The endpoint where traces initiate.