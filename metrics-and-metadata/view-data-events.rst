.. _events-intro:

*****************************************************************
Add context to metrics using events
*****************************************************************

.. meta::
   :description: Events provide context to metric data by representing what is happening in your systems. Learn how to view event data and create custom events.

An :term:`event <Event>`, or event time series (ETS), is a specific occurrence that can be represented in Splunk Observability Cloud outside of the flow of streaming :term:`metrics <Metric>`. Events provide context to metric data.

Events are very basic. You can't apply analytic functions to events, but you can :ref:`plot them <display-events>` based on their metadata.

.. _how-events-created:

Create events
=============================================================================

In Splunk Observability Cloud, you can create events in several ways.

-  Events are created whenever a :ref:`detector <create-detectors>` triggers an alert. A second event is created when the alert clears, is manually resolved, or is stopped due to the detector being edited or deleted.

-  A `SessionLog event` is created when a user logs into or out of your organization. The `SessionLog` event notes the action, either "session created" or "session deleted", and the ID of the user who created the session.

-  A custom event is created when you capture and send an event to Splunk Observability Cloud. For example, you might send a custom "code push" event each time your development team deploys new code, so that you can correlate it with the resource consumption profiles of your infrastructure before and after the event.

.. _event-type:

Event types
-----------------------------

Each event is an instance of an :strong:`event type`. An event type is a reusable event name that groups together events that you want to show as a stream or series, such as code pushes. 

By reusing event types, you can add an event type to a chart, then view all events that occurred for that event type. You can also create custom events to record specific actions.

.. _display-events:

View events
=============================================================================

You can add any of the event types described in :ref:`how-events-created` to a chart (see :ref:`chart-events`) or to an :ref:`event feed chart on a dashboard <dashboard-event-feed>`.

.. _events-sidebar:

Recent events are also visible in the Events sidebar, available from the navigation bar when you are viewing any dashboard. Click the Show Sidebar icon, then select the :guilabel:`Event Feed` tab.

.. image:: /_images/images-charts/events/show-metrics-sidebar.png
   :width: 99%
   :alt: Event Feed sidebar open on the side

The events list in the sidebar indicates the severity of each event and whether it was a trigger event (solid triangle) or clear event (hollow triangle). The sidebar also indicates if an event was a custom event (hollow diamond).

When you hover over an event in the Event Feed sidebar, a vertical line is shown in all the charts at the time the event occurred. The event line makes it easy for you to visualize correlations between metric values and the event.

.. image:: /_images/images-charts/events/event-line.png
   :width: 99%
   :alt: Event line in all charts

When you click an event in the Event Feed sidebar, you can see details about the event and, for events associated with alerts, an option to open the detector that generated the event. If the event is associated with a currently active alert, you'll also see an option to resolve the alert.

.. note:: You can also :ref:`overlay event markers <dashboard-event-overlay>` onto charts on a dashboard.

.. _custom-event:

Create custom events
=============================================================================

Custom events are usually generated through an integration with another service, or :ref:`through the REST API <rest-api-ingest>`, and are sent to Splunk Observability Cloud when specific events happen outside Observability Cloud. Read more on :new-page:`custom events in our developer portal <https://dev.splunk.com/observability/docs/datamodel/custom_events/>`.

You can also create custom events manually, which you can display on charts alongside other events. To create custom events, select :guilabel:`New event` in the :ref:`Events sidebar <events-sidebar>` or add custom events while using the Chart Builder. To learn more, see :ref:`chart-manual-events`.

Custom events are retained in the platform for a year.

.. _new-event:

Create a new event from the sidebar
--------------------------------------------------------------------------

In the Create Event dialog box, start typing to see a list of event types to choose from. You can also create a new event type by clicking the tooltip.

.. image:: /_images/images-charts/events/create-event.png
   :width: 65%
   :alt: Create Event dialog box with sample event type

Enter the time and describe the event. You can use Markdown as well as plain text in the description. To save the new custom event and the event type (if you've created one) click :guilabel:`Create`.

.. _edit-delete-events:

Delete custom events
=============================================================================

You can only delete custom events. Events generated by detectors can't be deleted.

To delete custom events:

#. Locate and open the custom event:

   -  In the Event Feed sidebar, available from within any dashboard, click on a custom event.
   -  When viewing or editing an :ref:`event feed <dashboard-event-feed>`, click on a custom event.

      .. image:: /_images/images-charts/events/delete-event.png
         :width: 65%
         :alt: Event dialog box

#. Click :guilabel:`Mark For Deletion` to delete the event.

.. note:: Events might not be deleted immediately. 
