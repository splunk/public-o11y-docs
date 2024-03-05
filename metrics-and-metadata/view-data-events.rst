.. _events-intro:

*****************************************************************
Add context to metrics using events
*****************************************************************

.. meta::
   :description: Events provide context to metric data by representing what is happening in your systems. Learn how to view event data and create custom events.

An :term:`event <Event>`, or event time series (ETS), is a specific occurrence that can be represented in Splunk Observability Cloud outside of the flow of streaming :term:`metrics <Metric>`. Events provide context to metric data.

Events are very basic, and you can't apply analytic functions to events. However, you can :ref:`plot them <display-events>` based on their metadata.

.. _how-events-created:

Events in Splunk Observability Cloud
=============================================================================

In Splunk Observability Cloud, events are created in different situations:

-  Events are created whenever a :ref:`detector <create-detectors>` triggers an alert. A second event is created when the alert clears, is manually resolved, or is stopped due to the detector being edited or deleted.

-  The SessionLog events capture 2 actions: "session created" or "session deleted". A SessionLog event is created when a user explicitly logs into or out of your organization. Users who navigate to Splunk Observability Cloud who already have an active session aren't prompted to log in and, therefore, don't create a SessionLog event. SessionLog events include the userId, email, and a timestamp. 

-  A custom event is created when you capture and send an event to Splunk Observability Cloud. For example, you might send a custom "code push" event each time your development team deploys new code, so that you can correlate it with the resource consumption profiles of your infrastructure before and after the event.

.. _event-type:

Event types
-----------------------------

Each event is an instance of an :strong:`event type`. An event type is a reusable event name that groups together events that you want to show as a stream or series, such as code pushes. 

By reusing event types, you can add an event type to a chart, then view all events that occurred for that event type. You can also create custom events to record specific actions.

.. _event-valid-values:

Valid values for events
-----------------------------

Event values must meet certain criteria. Invalid payloads are dropped, and you can track them with org metrics such as ``sf.org.numEventsDroppedInvalidByToken``. 

These are the valid values for events:

* c.maxDimValueLen = conf.Int("signalboost.dao.dimension.maximumValueLength", 256)
* c.maxDpDimLen = conf.Int("sbingest.dao.datapoint.dimension.maximumLength", 36)
* c.maxEventDimCount = conf.Int("sbingest.dao.event.dimension.maximumLength", 36)
* c.maxDimKeyLen = conf.Int("sbingest.dao.dimension.maximumKeyLength", 128)
* c.maxEventDimValueLen = conf.Int("signalboost.dao.event.dimension.maximumValueLength", 256)
* c.MaxEventPropertiesAllowed = conf.Int("signalboost.dao.event.properties.maximumLength", 1024)
* c.maxEventDimKeyLen = conf.Int("sbingest.dao.event.dimension.maximumKeyLength", 128)
* c.propertiesAllowed = conf.Str("sbingest.stream.properties.allowed", "trace_chain, message")
* c.dimensionsBlocked = conf.Str("tscreation.perOrgBlockedPrefixes", "{}")
* c.totalTagAnnotationDataSize = conf.Int("sbingest.spans.totalTagAnnotationDataSizeInBytes", 131072)
* c.maxSpanNameSize = conf.Int("sf.sbingest.spans.maxNameSize", 1024)
* c.enableSpanFailureResponse = conf.Bool("sf.sbingest.spans.enableFailureResponse", true)
* c.spanTagAllowed = conf.Str("sf.sbingest.spans.tagAllowedList", `["sf_metricized","sf_source","sf_count","sf_cluster","sf_initiator","sf_serviceMesh","sf_dimensionalized"]`)
* c.dmsTagAllowed = conf.Str("sf.sbingest.dms.tagAllowedList", `["sf_workflow","sf_source","sf_hires","sf_hasService","sf_serviceMesh","sf_dimensionalized","sf_ua_browsername","sf_ua_osname","sf_node_type","sf_node_name","sf_environment","sf_product","sf_operation","sf_functionId"]`)

.. _custom-event:

Custom events
=============================================================================

Custom events are usually generated through an integration with another service or :ref:`through the REST API <rest-api-ingest>`, and are sent to Splunk Observability Cloud when specific events happen outside it. Read more on :new-page:`custom events in our developer portal <https://dev.splunk.com/observability/docs/datamodel/custom_events/>`.

You can also create custom events manually, which you can display on charts alongside other events. See :ref:`new-event`.

.. note:: Custom events are retained in the platform for a year.

.. _new-event:

Create a new custom event manually
--------------------------------------------------------------------------

To create a new custom event:

#. From the :ref:`Events sidebar <events-sidebar>`, select :guilabel:`New event`.

#. In the Create Event dialog box, start typing to see a list of event types to choose from. You can also create a new event type by selecting the tooltip.

   .. image:: /_images/images-charts/events/create-event.png
      :width: 50%
      :alt: Create Event dialog box with sample event type

#. Enter the time and describe the event. 

#. To save the new custom event and the event type (if you created one), select :guilabel:`Create`.

.. note:: Alternatively, you can also create the new custom event while using the Chart Builder. To learn more, see :ref:`chart-manual-events`.

.. _edit-delete-events:

Delete custom events
--------------------------------------------------------------------------

You can only delete custom events. Events generated by detectors can't be deleted.

To delete custom events:

#. Locate and open the custom event:

   -  In the Event Feed sidebar, available from within any dashboard, select a custom event.
   -  When viewing or editing an :ref:`event feed <dashboard-event-feed>`, select a custom event.

#. Select :guilabel:`Mark For Deletion` to delete the event.

.. note:: Events might not be deleted immediately. 

.. _display-events:

View events
=============================================================================

You can add any of the event types described in :ref:`how-events-created` to a chart (see :ref:`chart-events`) or to an :ref:`event feed chart on a dashboard <dashboard-event-feed>`.

.. _events-sidebar:

Recent events are also visible in the Events sidebar, available from the navigation bar when you are viewing any dashboard. Click the Show Sidebar icon, then select the :guilabel:`Event Feed` tab.

.. image:: /_images/images-charts/events/show-metrics-sidebar.png
   :width: 70%
   :alt: Event Feed sidebar open on the side

The events list in the sidebar indicates the severity of each event and whether it was a trigger event (solid triangle) or clear event (hollow triangle). The sidebar also indicates if an event was a custom event (hollow diamond).

When you hover over an event in the Event Feed sidebar, a vertical line is shown in all the charts at the time the event occurred. The event line makes it easy for you to visualize correlations between metric values and the event.

.. image:: /_images/images-charts/events/event-line.png
   :width: 70%
   :alt: Event line in all charts

When you select an event in the Event Feed sidebar, you can see details about the event and, for events associated with alerts, an option to open the detector that generated the event. If the event is associated with a currently active alert, you'll also see an option to resolve the alert.

.. note:: You can also :ref:`overlay event markers <dashboard-event-overlay>` onto charts on a dashboard.