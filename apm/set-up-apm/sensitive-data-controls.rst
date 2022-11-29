.. _sensitive-data-controls:

************************************************************************
Use controls for sensitive data in Splunk APM
************************************************************************

.. meta::
   :description: Learn about possible controls for sensitive data in Splunk APM. 


Sensitive data such as email addresses, credit card information, and social security numbers require careful handling to protect users and ensure compliance with industry standards. By default, Splunk APM does not capture any sensitive information. Splunk APM only receives information that is explicitly sent to it. If sensitive information is sent by mistake, however, Splunk APM provides a number of controls to prevent and mitigate leaks.  

Sensitive data might fall within the categories of personally identifiable information (PII), customer-identifiable information (CII), cardholder data (CHD), or protected health information (PHI). It is necessary to protect these types of data to ensure compliance with industry requirements such as the Payment Card Industry Data Security Standard (PCI DSS), the Health Insurance Portability and Accountability Act (HIPAA), and the General Data Protection Regulation (GDPR). 

.. _collector-remove-data:

Remove sensitive data using the Splunk Distribution of OpenTelemetry Collector
============================================================================================

The first line of defense for sensitive information is to use Splunk's autoinstrumentation, which never captures sensitive information.

If sensitive data has been sent to Splunk Observability Cloud during manual instrumentation, you can remove it by configuring the :ref:`Splunk Distribution of OpenTelemetry Collector<otel-intro>`. You can add processors to your build of the Splunk Distribution of OpenTelemetry Collector to delete, redact, or hash specific attributes, or span tags, from spans during the pre-processing step.

.. note:: A note about dropping spans   

    Concealing specific values in spans is the best way to hide sensitive information in spans. It's not possible to drop entire spans from your OpenTelemetry pipeline, and attempting to do so is not recommended, as excluding spans risks creating traces with missing spans. See :ref:`apm-missing-spans` for more information.

Use case: Delete, redact, or hash tags from spans in the Splunk Distribution of OpenTelemetry Collector
-------------------------------------------------------------------------------------------------------------

Moira, a performance engineer, is looking at trace data and realizes that manual instrumentation is emitting sensitive data from the ``checkoutService`` by mistake. While the instrumentation is being updated to prevent this leak, they need to hide the values of all span tags with the potential to contain sensitive customer information. Using the ``attributes`` processor, they can delete, redact, or hash sensitive information. 

The following is an example of a processor that Moira can add to their Splunk Distribution of OpenTelemetry Collector configuration file. In this example, they delete the keys and values of the ``user.password`` attribute from the spans associated with ``checkoutService`` because they know this value is not relevant for debugging application performance.

Additionally, Moira hashes the value of ``user.name`` to replace the user's name with a unique hash value that doesn't contain PIIs. This way, during debugging, they can use these unique hash values to see whether an issue is impacting one or more users without revealing their names.

Moira also redacts the values of ``credit.card.number``, ``cvv``, and ``credit.card.expiration.date`` tags from incoming spans because it's useful to know in debugging that a value was entered for these fields, but not necessary to discern the contents of that value. 

.. code-block:: yaml

    extensions: 
        ...  
    processors:
      attributes/update:
        actions:
          - key: user.password
            action: delete
          - key: user.name
            action: hash
          - key: credit.card.number
            value: redacted
            action: update
          - key: cvv
            value: redacted
            action: update
          - key: credit.card.expiration.date
            value: redacted
            action: update
    service:
        ...
    ...

After configuring the processor, Moira adds the ``attributes/update`` processor to the ``processors`` pipeline under ``pipelines`` in her OpenTelemetry Collector configuration YAML file: 

.. code-block:: yaml

    ... 
    service:
        pipelines:
        traces:
            receivers: ...
            processors: [..., attributes/update, ...] 
            ...

.. _apm-visibility-filters:

Use visibility filter APIs to block data in Splunk APM
==============================================================================

To handle cases in which data is unintentionally sent to Splunk APM and hasn't been removed in the data ingestion pipeline, users with administrator access can use an API to set visibility filters that block specific span tags in Splunk APM. This hides the information from everywhere in Splunk APM, as well as in API responses. The hidden information is not purged from Splunk APM until it expires after the 8-day default retention period. 

The following are three examples of scenarios in which you might want to block this kind of information. Note that these APIs are configurable so that you can protect the span tags that might have leaked data without compromising the overall visibility of your services.

.. note:: See :new-page:`APM Visibility Filter API <https://quickdraw.splunk.com/redirect/?product=Observability&location=visibility-filter-dev-guide&version=current>` in the developer documentation for detailed guidance on using these APIs. 

Block a specific span tag for a specific service 
-------------------------------------------------

If you know that a specific span tag for a service might contain sensitive information, you can hide that span tag and its values everywhere in the Splunk APM UI.

For instance, imagine that Moira has manually instrumented a checkout service in Splunk APM and forgot to block the tags that use the span tags ``user.email`` and ``credit.card.number`` in their instrumentation of the service. The following example API call would block just those two span tags from all operations (“*”) in ``checkoutService``.

.. include:: /_includes/realm-note.rst

Request: 
::

    POST https://api.<SPLUNK_REALM>.signalfx.com/v2/apm/visibility-filter


JSON payload: 
::

    {

        "description": "Data blocked due to leak on 04/03/21",
        "startTime": "2021-04-03T15:00:00.073876Z",
        "matcher": {
        
            "sf_service": "checkoutService",
            "sf_operation": "*"
        },
        "hiddenTags": ["user.email", "credit.card.number"]
    }


Block all custom tags from a particular service
-----------------------------------------------------------------

If you know that a specific service might be the source of leaked information, you can hide the sensitive metadata of the service in Splunk APM. In this case, you can specify ``visibleTags`` from the service to hide all data from the service except for a specified set of well-known or automatically-instrumented ``visibleTags``, so that metrics for the service continue to appear. 

For example, consider a new service, ``loginService``, which appears in Moira's Splunk APM instance. This service isn't compliant with the latest customer protection regulations, and starts leaking customer information. Moira doesn't know which tags are likely to contain customer information, but they know the list of tags that they need to check, which include ``sf_environment``, ``sf_service``, and ``sf_endpoint``. Moira knows these tags aren't associated with sensitive information. 

To prevent sensitive information from appearing in Splunk APM, Moira can use the following API call to block all spans from the service, except for those they require.

.. include:: /_includes/realm-note.rst

Request: 
::

   POST https://api.<SPLUNK_REALM>.signalfx.com/v2/apm/visibility-filter


JSON payload: 
::

    {

        "description": "Data blocked due to leak on 04/03/21",
        "startTime": "2021-04-03T15:00:00.073876Z",
        "matcher": {

            "sf_service": "loginService",
            "sf_operation": "*"			
        },
        "visibleTags": ["sf_environment", "sf_service", "sf_endpoint", "sf_operation", "sf_httpMethod", "sf_kind", "sf_workflow", "sf_failure_root_cause_service", "sf_error"]
    }


Block tags from a particular operation within a service
------------------------------------------------------------------------

If you know that sensitive information might be leaked from instances of a particular tag associated with a specific operation in a particular service, you can hide that tag and its values where associated with a particular operation in the Splunk APM UI. 

For example, imagine that Moira's ``checkoutService`` recently introduced a new operation, ``readCartDetails``, which has the potential to leak customer information. They can make the following API call to hide custom span tags associated with that operation only in the given service. They can also set the start and end time of the possible leak, to enact blocking only during the period between the release of the operation and the service's scheduled deployment of a security patch. This granular data hiding allows Moira to be specific about what they want to hide, so as to minimally impact her team's monitoring and troubleshooting experience. 

.. include:: /_includes/realm-note.rst

Request: 
::

   POST https://api.<SPLUNK_REALM>.signalfx.com/v2/apm/visibility-filter


JSON payload: 
::

    {
        "description": "Data blocked due to leak on 04/03/21",
        "startTime": "2021-04-03T15:00:00.073876Z",
        "endTime": "2021-04-21T17:00:00.073876Z",	

        "matcher": {

            "sf_service": "checkoutService",
            "sf_operation": "readCartDetails",
        },
        "visibleTags": ["sf_environment", "sf_service", "sf_endpoint", "sf_operation", "sf_httpMethod", "sf_kind", "sf_workflow", "sf_failure_root_cause_service", "sf_error"],
    }

.. _db-monitoring-pii-handling:

Remove sensitive information from database queries
==========================================================

To provide analytics for database queries, Splunk APM captures SQL statements, or queries, from the span in which each call happens. Database queries or statements might contain sensitive information.

After removing identifiable information using the ``attributes`` processor of the Collector, Splunk APM replaces all dynamic elements with the ``?`` character, a procedure also known as normalization.

The following screenshot shows normalized database queries in Database Query Performance with replaced dynamic elements:

.. image:: /_images/apm/db-query-perf/normalized-queries.png
   :width: 100%
   :alt: Highlighted ? characters in normalized queries, which replace dynamic elements to reduce cardinality and sanitize data from sensitive information.

As the ``db.statement`` attribute for SQL databases and the ``db.operation`` attribute for NoSQL databases might still contain sensitive information after normalization, use visibility filters to hide that information in Splunk APM. See :ref:`apm-visibility-filters` for more information.

.. note:: To disable database query normalization, see :ref:`disable-db-normalization`. 