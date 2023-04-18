.. _sensitive-data-rum:

************************************************************
Use controls for sensitive data in Splunk RUM
************************************************************

By default, Splunk RUM doesn't capture any sensitive information such as data filled in a text box, the string or label of a button, or the POST request or response body. However, you might have the possibility of a sensitive data leak in the following situations: 

* Names of page or screen elements
* Query parameters in URLs that might contain sensitive information

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
    * - Drop or redact parts of an attribute value.  Specify the name, or parse one or more attributes specified by their name and use regular expressions to match the value. 
      - ``onAttributesSerializing``

    * - Drop specific attributes across all spans or events.
      - ``onAttributesSerializing``
    * - Drop entire spans or events.
      - 
         * ``ignoreURLs``
         * ``suppressTracing``


Examples
-----------------


This code snippet with ``onAttributesSerializing`` uses regular expressions to modify URLs.  

.. code:: js

    onAttributesSerializing: (attributes) => ({
            ...attributes,
            'http.url': typeof attributes['http.url'] === 'string'
              ? attributes['http.url'].replace(/([?&]token=)[^&]+(&|$)/g, '$1<token>$2')
              : attributes['http.url'],

This code snippet shows how to drop all spans that have a failed status.

.. code:: js 

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



Use the format ``(string\|regex)[]`` with ``ignoreUrls`` to drop all URLs that contain ``/payment/``:

.. code:: js

    ignoreUrls: [/\/payment\//] 



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


Examples
-----------------

This code snippet redacts by string key and span name. 

.. code:: js

  .removeSpanAttribute(stringKey("http.user_agent"))
  .rejectSpansByName(spanName -> spanName.contains("ignored"))
   // sensitive data in the login http.url attribute
   // is redacted before data moves to the exporter

This code snippet uses ``spanfilter`` to drop spans. 

.. code:: js 

    options.spanFilter = { spanData in
      var spanData = spanData
      if spanData.name == "DropThis" {
        return nil // spans with this name aren't sent
      }
      var atts = spanData.attributes
      atts["http.url"] = .string("redacted") // change values for all urls
      return spanData.settingAttributes(atts)
    }



Splunk RUM for mobile iOS instrumentation 
================================================

This instrumentation uses the ``splunk-otel-ios`` library. 

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

Examples
-----------------

Use the format ``(string\|regex)[]`` with ``ignoreUrls`` to drop all URLs that contain ``/payment/``:

.. code:: js

    ignoreUrls: [/\/payment\//] 


This code snippet uses ``spanfilter`` to drop spans. 

.. code:: js 

    options.spanFilter = { spanData in
      var spanData = spanData
      if spanData.name == "DropThis" {
        return nil // spans with this name aren't sent
      }
      var atts = spanData.attributes
      atts["http.url"] = .string("redacted") // change values for all urls
      return spanData.settingAttributes(atts)
    }



See also 
=========
The following sample applications with examples of how to use these commands to obscure PII are available on Splunk OpenTelemetry GitHub:

* :new-page:`splunk-otel-js-web <https://github.com/signalfx/splunk-otel-js-web/blob/0ac1df52b2c22f37eeb74f8e4104ccdf0e8fe99e/examples/todolist/public/index.html>` sample application. 

* :new-page:`splunk-otel-android <https://github.com/signalfx/splunk-otel-android/blob/main/sample-app/src/main/java/com/splunk/android/sample/SampleApplication.java>` sample application.

