.. _apm-add-context-trace-span:

***************************************
Add context to traces with span tags
***************************************

.. meta::
   :description: Break down service performance by dimensions you specify with span tags in Splunk Observability Cloud.

Create span tags that add metadata to traces you send to Splunk Observability Cloud. Span tags are field-value pairs that provide additional metadata about spans in a trace.

There are two ways to add span tags:

1. Instrument your application to create span tags
2. Add span tags to spans when you send trace data to a :new-page:`Splunk OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector>`

You can also instrument your application to define some span tags and manage other span tags with an OpenTelemetry Collector. This is useful if you deploy an OpenTelemetry Collector as a gateway to centrally manage data collection from multiple services. 

Instrument your application to create span tags
===============================================

How you instrument code to create span tags depends on your code's language.

For more information about adding span tags at the instrumentation level, see resources for the language you are instrumenting:

.. list-table::
   :header-rows: 1
   :widths: 35, 65

   * - :strong:`Documentation`
     - :strong:`Instrumentation SDK`

   * - :ref:`get-started-java`
     - :new-page:`Splunk distribution of OpenTelemetry Java <https://github.com/signalfx/splunk-otel-java>`

   * - :ref:`get-started-nodejs`
     - :new-page:`SignalFx Tracing Library for JavaScript <https://github.com/signalfx/signalfx-nodejs-tracing>`

   * - :ref:`get-started-dotnet`
     - :new-page:`SignalFx Tracing Library for .NET <https://github.com/signalfx/signalfx-dotnet-tracing>`

   * - :ref:`get-started-python`
     - :new-page:`Splunk distribution of OpenTelemetry Python <https://github.com/signalfx/splunk-otel-python>`

   * - :ref:`get-started-ruby`
     - :new-page:`SignalFx Tracing Library for Ruby <https://github.com/signalfx/signalfx-ruby-tracing>`

   * - :ref:`get-started-php`
     - :new-page:`SignalFx Tracing Library for PHP <https://github.com/signalfx/signalfx-php-tracing>`

..  * - :ref:`get-started-go`
..    - :new-page:`Splunk distribution of OpenTelemetry Go <https://github.com/signalfx/splunk-otel-go>`
  
..  * - :ref:`get-started-webapp`
..    - :new-page:`Splunk distribution of OpenTelemetry JavaScript Browser <https://github.com/signalfx/splunk-otel-js-browser>`

Add span tags with an OpenTelemetry Collector
=============================================

Include span tags in settings for the ``batch`` processor in your OpenTelemetry Collector configuration YAML file. You can create span tags with ``attributes/newenvironment`` which adds span tags to any spans that don't already have the tags or with ``attributes/copyfromexistingkey`` which overrides an existing span tag value.

The settings look like this in an OpenTelemetry Collector configuration YAML file:

.. code-block:: yaml

   processors:
     # Override an existing tag for a span.
     attributes/copyfromexistingkey:
       actions:
       - key: SPAN_TAG_KEY
         from_attribute: "SPAN_TAG_VALUE"
         action: upsert
     # Add a tag to spans missing it.
     attributes/newenvironment:
       actions:
       - key: SPAN_TAG_KEY
         value: "SPAN_TAG_VALUE"
         action: insert

   service:
     pipelines:
       traces:
         # Add the processor to your pipelines.
         processors: [batch]
