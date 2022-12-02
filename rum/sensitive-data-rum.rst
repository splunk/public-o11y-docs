.. _sensitive-data-rum:

************************************************************
Use controls for sensitive data in Splunk RUM
************************************************************

By default, Splunk RUM doesn't capture any sensitive information such as data filled in a text box, the string or label of a button, or the POST request or response body.


What is sensitive data ?
==========================

Sensitive data may fall within the categories of personally identifiable information (PII), customer-identifiable information (CII), cardholder data (CHD), or protected health information (PHI). It is necessary to protect these types of data to ensure compliance with industry requirements such as the Payment Card Industry Data Security Standard (PCI DSS), the Health Insurance Portability and Accountability Act (HIPAA), and the General Data Protection Regulation (GDPR).


Remove sensitive information in the URL parameters
======================================================================
If your APIs contain sensitive information in the URL parameters there are a few ways you can remove the data before it gets to Splunk RUM. 

Drop entire spans or events 
----------------------------
* :code:`ignoreURLs`: drop entire spans, events, or not monitor specific urls or URLs that match a regex pattern. For example, :new-page:`ignoreURLs <https://github.com/signalfx/splunk-otel-js-web/blob/0ac1df52b2c22f37eeb74f8e4104ccdf0e8fe99e/examples/todolist/public/index.html#L41>`.


* :code:`suppressTracing`: temporarily suppress tracing export. 

.. code-block:: javascript 
  
  context.with(suppressTracing(context.active()), () => {
      this._exporter.export([span], result => {
        if (result.code !== ExportResultCode.SUCCESS) {
          globalErrorHandler(
            result.error ??
              new Error(
                `SimpleSpanProcessor: span export failed (status ${result})`
              )
          );
        }
      });


For more, see :new-page:`suppressTracing <https://github.com/open-telemetry/opentelemetry-js/blob/0dc4c3d8eb4f52b839365f964bb7aaac08dcefb2/packages/opentelemetry-sdk-trace-base/src/export/SimpleSpanProcessor.ts#L60>`.


Remove part of an http.url 
---------------------------------------

:code:`filterSpans(SpanFilterBuilder.replaceSpanAttribute)`: control to remove or react parts of an http.url or any other attribute. You can also use this control to drop or redact parts of an attribute value. 
For example: 

.. code-block:: javascript

  .filterSpans(
                                spanFilter ->
                                        spanFilter
                                                .removeSpanAttribute(stringKey("http.user_agent"))
                                                .rejectSpansByName(
                                                        spanName -> spanName.contains("ignored"))
                                                // sensitive data in the login http.url attribute
                                                // will be redacted before it hits the exporter
                                                .replaceSpanAttribute(
                                                        StandardAttributes.HTTP_URL,
                                                        value ->
                                                                HTTP_URL_SENSITIVE_DATA_PATTERN
                                                                        .matcher(value)
                                                                        .replaceAll(
                                                                                "$1=<redacted>")))
                        .build();



For more, see :new-page:`filterSpans(SpanFilterBuilder.removeSpanAttribute) <https://github.com/signalfx/splunk-otel-android/blob/main/sample-app/src/main/java/com/splunk/android/sample/SampleApplication.java#L61>`.


Remove entire spans or events
================================

Suppose you want to remove entire spans before your data is ingested by Splunk RUM. There are a few controls that you could use: 

* :code:`ignoreURLs` drops entire spans or events. For example, the following code sample drops all URLs that contain :code:`“/payment/”`.

.. code:: javascript

  ignoreUrls: [/\/payment\//] 


* :code:`options.spanFilter` drops entire spans or events  A configuration to drop spans whose name matches a certain condition. For more, see 

  * :new-page:`filterSpans(SpanFilterBuilder.removeSpanAttribute) <https://github.com/signalfx/splunk-otel-android/blob/main/sample-app/src/main/java/com/splunk/android/sample/SampleApplication.java#L61>`.
  * :new-page:`filterSpans(SpanFilterBuilder.rejectSpansByName) <https://github.com/signalfx/splunk-otel-android/blob/main/sample-app/src/main/java/com/splunk/android/sample/SampleApplication.java#L62>`.


Remove attributes 
===================
To remove attributes before your data is ingested by Splunk RUM, see: 

 * :code:`onAttributesSerializing`: drop or redact parts of an attribute value Parse one or more attributes specified by the name and matched regex value.  Drop specific attributes across all spans or events. Delete one or more attributes and return the remaining attributes object. 


.. code-block:: javascript

  onAttributesSerializing: (attributes) => ({
            ...attributes,
            'http.url': typeof attributes['http.url'] === 'string'
              ? attributes['http.url'].replace(/([?&]token=)[^&]+(&|$)/g, '$1<token>$2')
              : attributes['http.url'],
          }),

For more, see :new-page:`onAttributesSerializing <https://github.com/signalfx/splunk-otel-js-web/blob/0ac1df52b2c22f37eeb74f8e4104ccdf0e8fe99e/examples/todolist/public/index.html#L47>`.



Examples
==============================
This example walks through how to apply ``ignoreUrls`` to each offering of Splunk RUM. 

Browser 
----------

Description and ignoreUrls copy/pastable code snippet

Android 
-----------

Description and ignoreUrls copy/pastable code snippet

iOS
----

Description and ignoreUrls copy/pastable code snippet
