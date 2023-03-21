.. _sensitive-data-rum:

************************************************************
Use controls for sensitive data in Splunk RUM
************************************************************

By default, Splunk RUM doesn't capture any sensitive information such as data filled in a text box, the string or label of a button, or the POST request or response body. However, you might have the possibility of a sensitive data leak in the following situations: 

* names of page or screen elements
* query parameters in URLs that may contain sensitive information

Splunk RUM provides additional controls in its instrumentation libraries that allow for additional sanitization of your data. 


What is sensitive data ?
==========================

Sensitive data may fall within the categories of personally identifiable information (PII), customer-identifiable information (CII), cardholder data (CHD), or protected health information (PHI). It is necessary to protect these types of data to ensure compliance with industry requirements such as the Payment Card Industry Data Security Standard (PCI DSS), the Health Insurance Portability and Accountability Act (HIPAA), and the General Data Protection Regulation (GDPR).



Splunk RUM for Browser instrumentation
==============================================
This instrumentation uses the ``splunk-otel-js-web`` library. 


.. list-table::
    :header-rows: 1
    :widths: 40, 60

    * - :strong:`Scenario`
      - :strong:`Command`
    * - Drop or redact parts of an attribute value.  Specify the name, or parse one or more attributes specified by their name and regex matched value. 
      - ``onAttributesSerializing``
    * - Drop specific attributes across all spans or events.
      - ``onAttributesSerializing``
    * - Drop entire spans or events.
      - 
         * ``ignoreURLs``
         * ``suppressTracing``

 

Splunk RUM for Mobile Android instrumentation
==============================================

This instrumentation uses the ``splunk-otel-android`` library. 


.. list-table::
    :header-rows: 1
    :widths: 40, 60

    * - :strong:`Scenario`
      - :strong:`Command`
    * - Drop or redact parts of an attribute value.
      - ``filterSpans(SpanFilterBuilder.replaceSpanAttribute)``
    * - Drop specific attributes across all spans or events.
      - ``filterSpans(SpanFilterBuilder.removeSpanAttribute``
    * - Drop entire spans or events.
      - ``filterSpans(SpanFilterBuilder.rejectSpansByName)``

 


Splunk RUM for mobile iOS instrumentation 
================================================

This instrumentation uses the ``splunk-otel-ios`` library. For an example of these commands, see:

.. list-table::
    :header-rows: 1
    :widths: 40, 60 

    * - :strong:`Scenario`
      - :strong:`Command`
    * - Drop or redact parts of an attribute value.
      - ``options.spanFilter``
    * - Drop specific attributes across all spans or events.
      - ``options.spanFilter``
    * - Drop entire spans or events.
      - 
         * ``ignoreURLs``
         * ``options.spanFilter``


See also 
=========
For instrumentation examples, see the following links from Splunk OpenTelemetry GitHub

* :new-page:`Splunk OpenTelemetry iOS agent <https://github.com/signalfx/splunk-otel-ios/blob/7e7115d9e5ee77a3d1d893a14b974fb619347c40/README.md#span-filtering>`

* :new-page:`Android sample application <https://github.com/signalfx/splunk-otel-android/blob/main/sample-app/src/main/java/com/splunk/android/sample/SampleApplication.java>`

*  :new-page:`Browser sample application <https://github.com/signalfx/splunk-otel-js-web/blob/0ac1df52b2c22f37eeb74f8e4104ccdf0e8fe99e/examples/todolist/public/index.html>` 

* :new-page:`Simple span processor <https://github.com/open-telemetry/opentelemetry-js/blob/0dc4c3d8eb4f52b839365f964bb7aaac08dcefb2/packages/opentelemetry-sdk-trace-base/src/export/SimpleSpanProcessor.ts>`