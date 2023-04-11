.. _apm-create-data-links:

*************************************************************
Link APM services, traces, and spans to relevant resources
*************************************************************

.. meta::
   :description: An overview of global data links for services, traces, and spans to other resources.

Create global data links to link Splunk APM properties, such as services, traces, spans, and span tags, to relevant resources. For example, you can link APM properties to Infrastructure Monitoring dashboards, Splunk instances, Kibana logs, or custom URLs.

Global data links are also useful because they can dynamically transfer contextual information about the property you're viewing to the linked resource, helping you get to relevant information faster.

For information about how to access global data links, see :ref:`apm-use-data-links`.


Prerequisite
================

You must be an administrator to create global data links.


.. _apm-data-links-parameters:

Parameters to create global data links for APM properties
============================================================

When you create a global data link for an APM property, you can transfer the property's context parameter values to dashboards and custom URLs. Here are the APM properties and their context parameters.

.. list-table::
   :header-rows: 1
   :widths: 20, 20, 20, 40

   * - :strong:`Property`
     - :strong:`Field`
     - :strong:`Context parameters`
     - :strong:`Description`

   * - Service
     - ``sf_service``
     - ``sf_environment``, ``sf_operation``, ``sf_endpoint``
     - The name of the service in APM. This is generally specified when configuring instrumentation for the service.

   * - Trace ID
     - ``trace_id``
     - ``sf_service``, ``sf_operation``, any global tags for the trace
     - A unique 16- or 32-character identifier associated with a specific trace.

   * - Span ID
     - ``span_id``
     - ``sf_service``, ``sf_operation``, ``trace_id``, ``span_id``, all tags for the span
     - A unique 16-character identifier associated with a specific span.

   * - Span tag
     - An existing span tag value.
     - ``sf_service``, ``sf_operation``, ``span_id``, ``trace_id``, all other tags for the span
     - A field-value pair that describes the span. Use span tags to describe the span. Specify the tags when you configure instrumentation for the service. You can also specify span tags in the Splunk Distribution of OpenTelemetry Collector (or the Smart Agent, now deprecated) configuration. 


Link APM properties to Splunk Infrastructure Monitoring dashboards
=====================================================================

You can create a global data link that passes information about APM services, traces, and spans to custom dashboards available in Splunk Observability Cloud. When you select a global data link to an Infrastructure Monitoring dashboard, the entire context of the property you were viewing transfers to the dashboard. For example, if you were viewing a service, the global data link transfers information about any endpoints you filtered for, including any filters for selected endpoints, the selected environment or environments, and any tags you filtered for within the selected time range to the dashboard.

The following task describes how to create a global data link for a service that links to an Infrastructure Monitoring dashboard. You can set up a global data link for any service, or a specific service.

#. In the Observability Cloud main menu, select :guilabel:`Settings` > :guilabel:`Global Data Links`.
#. Select :strong:`New Link`.
#. Enter a :strong:`Link Label`. This is what you select when you want to use the global data link to drill down into a specific service. For example, you might enter :strong:`Trace Ingest Dashboard`.
#. For :strong:`Show On`, select :strong:`Any Value of` and enter :strong:`sf_service` to associate the global data link with every service. If you want to create the global data link for a specific service, select :strong:`Property:Value Pair` instead and enter :strong:`sf_service:<yourServiceName>` for the service you want to create the global data link for.
#. If you want the global data link to display based on the :strong:`Show On` value and one or more additional conditions, select :strong:`Add Conditions`. To define a condition based on a property name, select :strong:`Any Value of` and enter a property name. To define a condition based on a property name and a specific value, select :strong:`Property:Value Pair` and enter a property name and value pair. If you define multiple conditions, all conditions must be met for the link to display.
#. Select :strong:`Choose Dashboard` and select the dashboard you want to associate with the global data link.
#. Select :strong:`Save`. When you view a service that matches the :strong:`Show On` value, you can carry the entire context of the service to the dashboard.


.. _apm-create-gdl-to-splunk:

Link APM properties to Splunk platform logs
==============================================

You can create a global data link that passes information about an APM service, trace, or span to a Splunk Cloud Platform or Splunk Enterprise search. This means you can create a global data link that runs a Splunk search query to parse logs for any service, trace ID, or span ID you're analyzing.

Create a global data link for each APM property that you want to connect to logs in a Splunk instance. For example, if you want to connect a trace ID to a logs in a Splunk instance, create a global data link that carries the trace ID context to the Splunk instance. To connect a span ID to logs in a Splunk instance, create a global data link that carries the span ID context to the Splunk instance.

The following task describes how to create a global data link for a trace ID. The global data link runs a Splunk search query for log events that include a specific trace ID in a Splunk instance. The process is the same for creating a global data link for a service, span ID, or span tag: use a :strong:`Show On` value for the property you want to create a global data link for.

#. In the Observability Cloud main menu, select :guilabel:`Settings` > :guilabel:`Global Data Links`.
#. Select :strong:`New Link`.
#. Enter a :strong:`Link Label`. This is what you select when you want to use the global data link to drill down into a specific trace ID. For example, you might enter :strong:`Splunk Cloud Platform Search`.
#. For :strong:`Link to`, select :strong:`Splunk`.
#. For :strong:`Show On`, select :strong:`Any Value of` and enter :strong:`trace_id`.
#. If you want the global data link to display based on the :strong:`Show On` value and one or more additional conditions, select :strong:`Add Conditions`. To define a condition based on a property name, select :strong:`Any Value of` and enter a property name. To define a condition based on a property name and a specific value, select :strong:`Property:Value Pair` and enter a property name and value pair. If you define multiple conditions, all conditions must be met for the link to display.
#. Enter the Splunk instance fully qualified domain name (FQDN) and port of your Splunk instance for the :strong:`URL`. For example, you might enter :strong:`https://<yourHostname>.splunkcloud.com:443` for a Splunk Cloud Platform instance. You might also specify the FQDN and port for a Splunk Enterprise instance you have access to.
#. Keep the :strong:`Minimum Time Window` at :strong:`1m`.
#. If your Splunk instance refers to fields differently than APM refers to them, associate APM fields with related fields in Splunk. For example, ``sf_service`` in APM could be ``service`` in your Splunk instance. If something like this is the case, specify the :strong:`Splunk Observability Cloud Term` value and map it to an :strong:`External Term` value.
#. Select :strong:`Save`. When you view a specific trace, you can drill down into this global data link and view a Splunk search that includes all log events with the trace ID within the time range of the trace.


.. _apm-create-gdl-to-kibana:

Link APM properties to Kibana logs
=====================================

You can create a global data link that passes information about an APM service, trace, or span to a Kibana URL. By passing APM properties and their characteristics in a Kibana URL, you can transfer context from Splunk Observability Cloud to Kibana.

The following task describes how to create a global data link for a log filter in Kibana for a selected trace ID. You can also filter on other APM properties: use a :strong:`Show On` value for the property you want to create a global data link for.

#. Open the Observability Cloud main menu.
#. Hover over :guilabel:`Data Configuration` and select :guilabel:`Global Data Links`.
#. Select :strong:`New Link`.
#. Enter a :strong:`Link Label`. This is what you select when you want to use the global data link to drill down into a specific trace ID. For example, you might enter :strong:`Kibana filter`.
#. For :strong:`Link to`, select :strong:`Kibana`.
#. For :strong:`Show On`, select :strong:`Any Value of` and enter :strong:`trace_id`.
#. If you want the global data link to display based on the :strong:`Show On` value and one or more additional conditions, select :strong:`Add Conditions`. To define a condition based on a property name, select :strong:`Any Value of` and enter a property name. To define a condition based on a property name and a specific value, select :strong:`Property:Value Pair` and enter a property name and value pair. If you define multiple conditions, all conditions must be met for the link to display.
#. Enter a Kibana URL that includes the :strong:`trace_id` field in a log filter for the :strong:`URL`. For example, you can enter a URL like this one: :code:`http://<yourKibanaFQDN>/kibana/app/kibana#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:'{{start_time}}',mode:absolute,to:'{{end_time}}'))&_a=(columns:!(_source),interval:auto,query:(language:kuery,query:'traceId:{{value}}'),sort:!('@timestamp',desc))`
#. Enter your preferred :strong:`Time Format`.
#. Keep the :strong:`Minimum Time Window` at :strong:`1m`.
#. If Kibana refers to fields differently than APM refers to them, associate APM fields with related fields in Kibana. For example, ``sf_service`` in APM could be ``service`` in Kibana. If something like this is the case, specify the :strong:`Splunk Observability Cloud Term` and :strong:`External Term`. If the field names are the same, skip this step.
#. Select :strong:`Save`. When you view a specific trace, you can drill down into this global data link and view a Splunk search that includes all log events with the trace ID within the time range of the trace.


Transfer APM context in a custom URL
=======================================

You can create a global data link that passes information about an APM service, trace, or span to a custom URL. For parameters that you can use to transfer context in custom URLs, see :ref:`apm-data-links-parameters`.

For example, you can specify a custom URL like this one to transfer the context of a service to a URL: :code:`https://www.example.com/search/?field={{key}}&value={{value}}&service={{properties.sf_service}}&st={{start_time}}&et={{end_time}}`.

For more information about creating global data links to a custom URL, see :ref:`link-metadata-to-content`.


.. _apm-data-link-inferred-service:

Link databases and inferred services to Infrastructure Monitoring dashboards
===============================================================================

Create a global data link specifically for a single inferred service to associate a dashboard with the inferred service as the top-ranked dashboard. The top-ranked dashboard is the :strong:`View Dashboard` option in the :strong:`Monitoring` tab when you view a service from the service list or service map. Triggers for global data links for dashboards that use wildcards (:strong:`*`) for service names can't be top-ranked dashboards for inferred services.

For example, a dashboard associated with a global data link that contains a :strong:`Show On` value of :strong:`sf_service:*` can't be a top-ranked dashboard for an inferred service. To create a global data link that acts as a default dashboard for an inferred service from the :strong:`Monitoring` tab, the :strong:`Show On` value must include the name of the inferred service. For instance, if you are creating a global data link for a default dashboard for the inferred service ``mydb``, the :strong:`Show On` value must be :strong:`sf_service:mydb`.
