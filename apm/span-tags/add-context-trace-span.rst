.. _apm-add-context-trace-span:

*****************************************************
Add context to spans with span tags in Splunk APM
*****************************************************

.. meta::
   :description: Use span tags to slice and dice service performance by dimensions in Splunk APM.

Enrich the context of the spans you send to Splunk APM by adding span tags. Span tags are key-value pairs that provide additional metadata about spans in a trace.

.. note:: 

   :guilabel:`Span tags` are key-value pairs added to spans through instrumentation. In OpenTelemetry, these key-value pairs are known as ``attributes``. 

There are two ways to add span tags to your spans:

  * Instrument your application to create span tags. This option gives you the most flexibility at the per-application level. Scroll to :ref:`instrument-tags` in this topic to learn how.
  * Add span tags as OpenTelemetry attributes to spans when you send data to the Splunk Distribution of OpenTelemetry Collector. This option lets you add span tags to spans in bulk. Scroll to :ref:`otel-span-tags` in this topic to learn how.

If you deploy the Splunk Distribution of OpenTelemetry Collector as a gateway to centrally manage data collection from multiple services, you might choose to instrument your application to define some span tags and manage other span tags with the OpenTelemetry Collector. 

.. _span-tag-naming:

Follow span tag naming conventions
=========================================
Tags provide more value when you construct a simple, dependable metadata model to use them. Define clear tag names to use for all your applications. Because span tag key-value pairs are text strings, you can create a model to fit your specific needs. As a starting point, OpenTelemetry provides a set of semantic conventions you can use with your spans and traces. For more information, see :new-page:`Trace Semantic Conventions <https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions>` on GitHub.
  
Add tags to spans 
===================
The following sections describe two ways to add tags to your spans: 

* :ref:`instrument-tags`
* :ref:`otel-span-tags`

Begin by considering where to add your span tags. 

.. include:: /_includes/tag-decision-support.rst

Note that the ``deployment.environment`` span tag is particularly useful because it lets you filter your entire APM experience by deployment environment. To learn more about environments in Splunk APM, see :ref:`apm-environments`. 

.. _instrument-tags:

Instrument your application code to add tags to spans
----------------------------------------------------------
When you add span tags via instrumentation, you can specify tags on a per-application basis.

How you instrument code to create span tags (attributes) depends on the programming language and instrumentation library you're using. 

The following examples show how to create a custom tag for an existing span:

.. tabs::

   .. code-tab:: java Java

      // Splunk Distribution of OpenTelemetry Java

      import io.opentelemetry.api.trace.Span;

      Span customizedSpan = Span.current();

      customizedSpan.setAttribute("my.attribute","value");

   .. code-tab:: python Python

      # Splunk Distribution of OpenTelemetry Python

      from opentelemetry import trace

      customizedSpan = trace.get_current_span()

      customizedSpan.set_attribute("my.attribute", "value");

   .. code-tab:: javascript Node.js

      // Splunk Distribution of OpenTelemetry JS

      const { context, trace } = require('@opentelemetry/api');
      
      // A span must already exist in the context

      const customizedSpan = trace.getSpan(context.active());

      customizedSpan.setAttribute('my.attribute', 'value');

   .. code-tab:: csharp .NET

      // SignalFx Instrumentation for .NET

      using OpenTracing;
      using OpenTracing.Util;

      // A scope for the span must already exist

      var span = scope.Span;
      span.SetTag("some.tag", "some value");

      // You can also set global tags using the SIGNALFX_TRACE_GLOBAL_TAGS 
      // environment variable, which accepts a list of comma-separated key-value
      // pairs. For example, key1:val1,key2:val2.

   .. code-tab:: ruby Ruby

      # SignalFx Ruby Tracing Library

      require 'signalfx/tracing'

      customizedSpan = OpenTracing.active_span
      if customizedSpan
         customizedSpan.set_tag('some.tag', 'some value')
      end

      # You can also set global tags using the SIGNALFX_SPAN_TAGS 
      # environment variable, which accepts a list of comma-separated key-value
      # pairs. For example, key1:val1,key2:val2.

   .. code-tab:: php PHP
      
      <?php

      // SignalFx PHP Tracing Library

      use SignalFx\GlobalTracer;

      $tracer = GlobalTracer::get(); //  Will provide the tracer instance used by provided instrumentations
      $customizedSpan = $tracer->startActiveSpan('myApplicationLogic')->getSpan();
      $customizedSpan->setTag('some.tag', 'some value');

      // You can also set global tags using the SIGNALFX_TRACE_GLOBAL_TAGS
      // environment variable, which accepts a list of comma-separated key-value
      // pairs. For example: key1:val1,key2:val2. 
      ?>

   .. code-tab:: go Golang

      // SignalFx Go Tracing Library

      package main

      import (
         "github.com/signalfx/signalfx-go-tracing/ddtrace/tracer"
      )

      if span, ok := tracer.SpanFromContext(ctx); ok {
         span.SetTag("some.tag", "some value")
      }

      // You can also set global tags using the SIGNALFX_SPAN_TAGS
      // environment variable, which accepts a list of comma-separated key-value
      // pairs. For example, key1:val1,key2:val2.      

.. _otel-span-tags: 

Add span tags with the Splunk Distribution of OpenTelemetry Collector
-------------------------------------------------------------------------
To add a span tag to spans received by the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`, you can use the ``attributes`` processor in your OpenTelemetry Collector configuration YAML file. The generic attributes processor is called ``attributes``, and any subsequent  ``attributes/<NAME>`` processors are uniquely named instances of this defined processor. 

Follow these steps to define a new attributes processor and add it to your pipeline: 

  1. Define an attributes processor that adds your desired span tag. There are two ways to do this:

      - Use the ``insert`` action to set a new key-value pair.

        For instance, the following code sample adds these key-value pair ``enduser.role:"admin"`` in spans where the key ``enduser.role`` doesn't already exist: 

        .. code-block:: yaml

          processors:
            ...
            attributes/setenduser.role:
              actions:
              - key: enduser.role
                  value: "admin"
                  action: insert

      - Use the ``upsert`` action to copy a value from an existing key in the spans and add it to a new key, overriding any existing values for that key. 

        For instance, the following code sample copies the value from the existing ``myTenant`` key to the ``tenant`` key and overrides any existing values for the ``tenant`` key: 

        .. code-block:: yaml

            processors:
              ...
              attributes/settenant:
                actions:
                - key: tenant
                    from_attribute: myTenant
                    action: upsert 


  2. Add the attributes processor you've created to the list of processors under ``pipelines``. Place it after the ``batch`` processor and before the ``queued_retry`` processor, as the ``attributes/settenant`` processor is placed in the following code sample:

      .. code-block:: yaml

        service:
          pipelines:
            traces:
              receivers: ...
              processors: [...,  batch, attributes/settenant,  queued_retry, ...] 
              ...

.. _host-span-tags:

Where do host-specific span tags come from?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If you send trace data to the :new-page:`Splunk Distribution of OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector>`, the collector automatically adds a ``host`` span tag to every span to identify which infrastructure component each span uses. The ``host`` span tag value is generally the ``hostname`` or unique resource identifier for the infrastructure component. 

The ``host`` span tag allows Splunk APM to render key infrastructure metrics and link to default dashboards for infrastructure components. This can help you more easily monitor the performance of your applications at the infrastructure level and leverage interactions between Splunk APM and Splunk Infrastructure Monitoring. 

In addition to the ``host`` span tag, the OpenTelemetry Collector automatically adds certain span tags to every span captured on that host, according to the type of host. These additional span tags provide more information about infrastructure components each span uses, render corresponding infrastructure metrics, and link to more complete dashboards for the underlying infrastructure component.

The following table provides examples of host-specific span tags:

.. list-table::
   :header-rows: 1

   * - :strong:`Span tag`
     - :strong:`Description`
    
   * - ``AWSUniqueId`` or ``gcp_id``
     - Unique resource identifier for cloud providers.

   * - ``container_id``
     - Unique resource identifier for Docker containers.

   * - ``kubernetes_pod_uid``
     - Unique resource identifier for a resource in a Kubernetes cluster.
