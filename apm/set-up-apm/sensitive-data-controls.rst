.. _sensitive-data-controls:

************************************************************************
Use controls for sensitive data
************************************************************************

.. meta::
   :description: Learn about possible controls for sensitive data in Splunk APM. 


Sensitive data such as email addresses, credit card information, and social security numbers require careful handling to protect users and ensure compliance with industry standards. By default, Splunk APM does not capture any sensitive information. Splunk APM only receives information that is explicitly sent to it. If sensitive information is sent by mistake, however, Splunk APM provides a number of controls to prevent and mitigate leaks.  

Sensitive data may fall within the categories of personally identifiable information (PII), customer-identifiable information (CII), cardholder data (CHD), or protected health information (PHI). It is necessary to protect these types of data to ensure compliance with industry requirements such as the Payment Card Industry Data Security Standard (PCI DSS), the Health Insurance Portability and Accountability Act (HIPAA), and the General Data Protection Regulation (GDPR). 

.. _collector-remove-data:

Remove sensitive data using the Splunk Distribution of OpenTelemetry Collector
============================================================================================

The first line of defense for sensitive information is to use Splunk's auto-instrumentation, which is designed never to capture sensitive information.

If sensitive data has been sent to Splunk Observability Cloud during manual instrumentation, it can be removed using the :ref:`Splunk Distribution of OpenTelemetry Collector<otel-intro>`.  

You can add processors to your build of the Splunk Distribution of OpenTelemetry Collector to delete, redact, or hash specific attributes, or span tags, from spans during the pre-processing step.

.. admonition:: A note about dropping spans   

    Concealing specific values in spans is the best way to hide sensitive information in spans. It is not possible to drop entire spans from your OpenTelemetry pipeline, and attempting to do so is not recommended because excluding spans risks creating traces with missing spans. See :ref:`apm-missing-spans` for more information about traces with missing spans.  
    
Use case: Delete, redact, or hash tags from spans in the Splunk Distribution of OpenTelemetry Collector
-------------------------------------------------------------------------------------------------------------
Moira, a performance engineer, is looking at trace data and realizes that a manual instrumentation is emitting sensitive data from ``checkoutService`` by mistake. While the instrumentation is being updated to prevent this leak, she needs to hide the values of all span tags with the potential to contain sensitive customer information. Using the OpenTelemetry Collector's Attributes Processor, she can delete, redact, or hash sensitive information. 

The following is an example processor that Moira can add to her Splunk Distribution of OpenTelemetry Collector configuration file. In this example, she deletes the keys and values of the ``user.password`` attribute from the spans associated with ``checkoutService`` because she knows this value is not relevant for debugging application performance.

Additionally, Moira hashes the value of ``user.name`` to replace the user's name with a unique hash value that does not contain PII. This way, during debugging, she can use these unique hash values to see whether an issue is impacting one or more users without revealing their names.

She also redacts the values of ``credit.card.number``, ``cvv``, and ``credit.card.expiration.date`` tags from incoming spans because it is useful to know in debugging that a value was entered for these fields, but not necessary to discern the contents of that value. 

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

Then Moira adds the ``attributes/update`` processor to the ``processors`` pipeline under ``pipelines`` in her OpenTelemetry Collector configuration YAML file: 

.. code-block:: yaml

    ... 
    service:
        pipelines:
        traces:
            receivers: ...
            processors: [..., attributes/update, ...] 
            ...

Use visibility filter APIs to block data in Splunk APM
==============================================================================

To handle cases in which data is unintentionally sent to Splunk APM and has not been removed in the data ingestion pipeline, users with administrator access can use an API to set visibility filters that block specific span tags in Splunk APM. This hides the information from everywhere in Splunk APM, as well as in API responses. The hidden information is not purged from Splunk APM until it expires after the 8-day default retention period. 

Below are three examples of scenarios in which you might want to block this kind of information. Note that these APIs are configurable so that you can protect just the span tags that may have leaked data without compromising the overall visibility of your services.

See :new-page:`APM Visibility Filter API <https://quickdraw.splunk.com/redirect/?product=Observability&location=visibility-filter-dev-guide&version=current>` in the developer documentation for detailed guidance on using these APIs. 

Block a specific span tag for a specific service 
-------------------------------------------------
If you know that a specific span tag for a service may contain sensitive information, you can hide that span tag and its values everywhere in the Splunk APM UI.

For instance, imagine that Moira has manually instrumented a checkout service in Splunk APM and forgot to block the tags that use the span tags ``user.email`` and ``credit.card.number`` in her instrumentation of the service. The following example API call would block just those two span tags from all operations (“*”) in ``checkoutService``.

Request: 
::

    POST api-url/v2/apm/visibility-filter


Request JSON: 
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
If you know that a specific service might be the source of leaked information, you can hide the sensitive metadata of the service in Splunk APM. In this case, you can specify ``visibleTags`` from the service to hide all data from the service except for a specified set of well-known or automatically-instrumented ``visibleTags`` so that metrics for the service will still appear. 

For example, imagine that a new service, ``loginService``, has been instrumented in Moira’s Splunk APM instance. This service didn’t know about the latest customer protection regulations, and started leaking customer information. Moira doesn’t know which tags are likely to contain customer information, but she does know the list of tags that she needs for her analysis, which include ``sf_environment``, ``sf_service``, and ``sf_endpoint``. She knows these tags are not associated with sensitive information. To prevent sensitive information from appearing in Splunk APM, Moira could use the following API call to block all spans from the service, except for those that she knows she needs.


Request: 
::

   POST api-url/v2/apm/visibility-filter


Request JSON: 
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

For example, imagine that Moira’s ``checkoutService`` recently introduced a new operation, ``readCartDetails``, which has the potential to leak customer information. She could make the following API call to hide custom span tags associated with that operation only in the given service. She can also specify the start and end time of the possible leak, to perform the blocking only during the period between the release of the operation and the service’s scheduled deployment of a security patch. This granular data hiding allows Moira to be very specific about what she wants to hide, so as to minimally impact her team’s monitoring and troubleshooting experience. 


Request: 
::

   POST api-url/v2/apm/visibility-filter


Request JSON: 
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

