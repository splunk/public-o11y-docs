.. _apm-create-data-links:

*************************************************************
Link APM services, traces, and spans to relevant resources
*************************************************************

.. meta::
   :description: Use global data links to create links for services, traces, and spans to other resources.

   :keywords: Splunk, APM, global data links, traces, services, spans, monitoring, dashboards

Create global data links to link Splunk APM properties, such as services, traces, spans, and span tags, to relevant resources. For example, you can link APM properties to Infrastructure Monitoring dashboards, Splunk instances, Kibana logs, or custom URLs.

Global data links are useful because they dynamically transfer contextual information about the property you're viewing to the resource, helping you get to relevant information faster.

APM supports linking to other resources with global data links only. You can't link other resources to APM properties with local data links.

Global data links for services are slightly different than for inferred services. You have to create a global data link that links to a dashboard for a specific inferred service for the service to have a top-ranked dashboard. Otherwise, the process is the same as for standard services. For more information, see :ref:`apm-data-link-inferred-service`.

For information about using global data links, see :ref:`apm-use-data-links`.


Prerequisites
================

You have to be an administrator in your organization to create global data links and associate resources with APM properties.

.. _apm-data-links-parameters:

Parameters to create global data links for APM properties
============================================================

When you create a global data link, you have to specify fields that represent APM properties for the global data link :strong:`Trigger` parameter. When you create global data links for APM properties, you can transfer available context parameter values for the property to dashboards and custom URLs. These are the fields for APM properties and their context parameters:

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
     - A unique 16 or 32-character identifier associated with a specific trace.

   * - Span ID
     - ``span_id``
     - ``sf_service``, ``sf_operation``, ``trace_id``, ``span_id``, all tags for the span
     - A unique 16-character identifier associated with a specific span.

   * - Span tag
     - An existing span tag value.
     - ``sf_service``, ``sf_operation``, ``span_id``, ``trace_id``, all other tags for the span
     - A field-value pair that describes the span. Span tags are generally specified when configuring instrumentation for the corresponding service, and can also be specified in the Smart Agent or OpenTelemetry Collector configuration.

Link APM properties to Splunk platform logs
==============================================

Create a global data link that connects information about APM services, traces, and spans to Splunk platform searches. This means you can create a resource that runs a Splunk search to parse logs for any service, trace ID, or span ID you're analyzing. Specify either a Splunk Cloud or Splunk Enterprise instance.

You have to create a global data link for each APM property to connect logs in a Splunk instance. For example, if you want to connect Splunk instance logs to trace IDs and span IDs, you have to create two global data links, one that carries the context for trace IDs to a Splunk instance and one that carries the context for span ID's to a Splunk instance.

Follow these steps to create a global data link for trace IDs that runs a Splunk search query for log events that include a specific trace ID in a Splunk instance. The process is the same for services, span IDs, and span tags - just substitute the :strong:`Trigger` for the property you want to create a global data link for.

#. Open the Observability Cloud main menu.
#. Hover over :guilabel:`Organization Settings` and select :guilabel:`Global Data Links`.
#. Click :strong:`New Link`.
#. Enter a :strong:`Link Label`. This is what you select when you want to use the global data link to drill down into a specific trace ID. For example, you could enter ``Splunk Cloud Search``.
#. For :strong:`Link to`, select ``Splunk``.
#. For the :strong:`Trigger`, select ``Any Value of`` and enter ``trace_id``.
#. Enter the Splunk instance fully qualified domain name (FQDN) and port of your Splunk instance for the :strong:`URL`. For example, you could enter ``https://<yourHostname>.splunkcloud.com:443`` for a Splunk Cloud instance. You could also specify the FQDN and port for a Splunk Enterprise instance you have access to.
#. Keep the :strong:`Minimum Time Window` at ``1m``.
#. If your Splunk instance refers to fields differently than APM refers to them, associate APM fields with related fields in Splunk. For example, ``sf_service`` in APM could be ``service`` in your Splunk instance. If something like this is the case, specify the :strong:`Splunk Observability Cloud Term` and :strong:`External Term`. Otherwise, skip this step.
#. Click :strong:`Save`. When you view a specific trace, you can drill down into this global data link and view a Splunk search that includes all log events with the trace ID within the time range of the trace.

Link APM properties to Kibana logs
=====================================

Create a global data link that connects information about APM services, traces, and spans to Kibana. Pass APM properties and their characteristics in a Kibana URL to transfer context from Splunk Observability Cloud to Kibana.

Follow these steps to create a global data link for a log filter in Kibana for a selected trace ID. You can also filter on other APM properties - just substitute the :strong:`Trigger` for the property you want to create a log filter in Kibana for.

#. Open the Observability Cloud main menu.
#. Hover over :guilabel:`Organization Settings` and select :guilabel:`Global Data Links`.
#. Click :strong:`New Link`.
#. Enter a :strong:`Link Label`. This is what you select when you want to use the global data link to drill down into a specific trace ID. For example, you could enter ``Kibana filter``.
#. For :strong:`Link to`, select ``Kibana``.
#. For the :strong:`Trigger`, select ``Any Value of`` and enter ``trace_id``.
#. Enter a Kibana URL that includes the ``trace_id`` field in a log filter for the :strong:`URL`. For example, you could enter this URL:

  .. code-block:: bash

     http://<yourKibanaFQDN>/kibana/app/kibana#/discover?_g=(refreshInterval:(display:Off,pause:!f,value:0),time:(from:'{{start_time}}',mode:absolute,to:'{{end_time}}'))&_a=(columns:!(_source),interval:auto,query:(language:kuery,query:'traceId:{{value}}'),sort:!('@timestamp',desc))

#. Enter your preferred :strong:`Time Format`.
#. Keep the :strong:`Minimum Time Window` at ``1m``.
#. If Kibana refers to fields differently than APM refers to them, associate APM fields with related fields in Kibana. For example, ``sf_service`` in APM could be ``service`` in Kibana. If something like this is the case, specify the :strong:`Splunk Observability Cloud Term` and :strong:`External Term`. Otherwise, skip this step.
#. Click :strong:`Save`. When you view a specific trace, you can drill down into this global data link and view a Splunk search that includes all log events with the trace ID within the time range of the trace.

Transfer APM context in a custom URL
=======================================

You can transfer context of APM services, traces, spans, and tags you're viewing in a custom URL. For parameters that you can use to transfer context in custom URLs, see :ref:`apm-data-links-parameters`.

For example, you could specify a custom URL like this to transfer the context of a service you're viewing to a URL of your choosing:

.. code-block:: bash

   https://anexternalsite.com/search/?field={{key}}&value={{value}}&service={{sf_service}}&st={{start_time}}&et={{end_time}}

For more information about creating global data links with a custom URL, see :new-page:`Configuring global data links <https://docs.signalfx.com/en/latest/managing/data-links.html#global-links>`.


Link APM properties to Infrastructure Monitoring dashboards
==============================================================

Create a global data link that connects information about APM services, traces, and spans to custom dashboards available in the application. When you drill down into a global data link that sends you to an Infrastructure Monitoring dashboard, the entire context of the property you were viewing transfers to the dashboard. For example, if you're viewing a service, a global data link transfers information about any endpoints you filtered for, including any filters for selected endpoints, the selected environment, and any tags you filtered for within the selected time range to the dashboard.

For information about creating dashboards, see :new-page:`Creating, Sharing, and Protecting Dashboards <https://docs.signalfx.com/en/latest/dashboards/dashboard-create-share.html#create-share-dashboards>`.

Follow these steps to associate a global data link for a service to a dashboard. You can set up a global data link for any service, or a specific service.

#. Open the Observability Cloud main menu.
#. Hover over :guilabel:`Organization Settings` and select :guilabel:`Global Data Links`.
#. Click :strong:`New Link`.
#. Enter a :strong:`Link Label`. This is what you select when you want to use the global data link to drill down into a specific service. For example, you could enter ``My better dashboard``.
#. For the :strong:`Trigger`, select ``Any Value of`` and enter ``sf_service`` to associate the global data link with every service. If you want to create the global data link for a specific service, select ``Property:Value Pair`` instead and enter ``sf_service:<yourServiceName>`` for the service you want to create the global data link for.
#. Click :strong:`Choose Dashboard` and select the dashboard you want to associate with the global data link.
#. Click :strong:`Save`. When you view a service that matches the :strong:`Trigger`, you can carry the entire context of the service to the dashboard.

.. _apm-data-link-inferred-service:

Link databases and inferred services to Infrastructure Monitoring dashboards
===============================================================================

Create a global data link specifically for a single inferred service to associate a dashboard with the inferred service as the top-ranked dashboard. The top-ranked dashboard is the :strong:`View Dashboard` option in the :strong:`Monitoring` tab when you view a service from the service list or service map. Triggers for global data links for dashboards that use wildcards (``*``) for service names can't be top-ranked dashboards for inferred services.

For example, a dashboard associated with a global data link that contains a trigger ``sf_service:*`` can't be a top-ranked dashboard for an inferred service. To create a global data link that acts as a default dashboard for an inferred service from the :strong:`Monitoring` tab, the trigger has to include the name of the inferred service. To create a global data link for a default dashboard for an inferred service ``mydb``, the trigger has to be ``sf_service:mydb``.
