.. _dashboards-add:

*****************************************************************
Add information to a dashboard
*****************************************************************

.. meta::
      :description: Add a text note or event feed chart in Splunk Observability Cloud dashboards. Text notes include explanatory information about charts, and event feeds show specific events.

In addition to standard chart types, such as graphs or lists, dashboards can also contain two special chart types --- :ref:`text notes<text-note>` and :ref:`event feeds<dashboard-event-feed>`.

.. _text-note:

Add a text note to a dashboard
=============================================================================

A text note is a type of chart. A text note in a dashboard can be useful when you want to include explanatory information about the chart for future reference. For example, you could display links to external references related to the charts in context.

To add a text note to a dashboard, you can do any of the following:

-	Select :menuselection:`Text Note` from the Create menu.

-	Click :guilabel:`New Text Note` in the New Chart placeholder image that is appears when adding a dashboard.

-	While in the Chart Builder, choose :menuselection:`Text Note` as your chart type.

A text or Markdown editor opens, which shows some tips on creating markdown.

Markdown is high-level, plain text format which is converted into HTML. You can search for resources on Markdown if you need examples of what you can do in the editor.

In the text/markdown editor, you can clear the tips and write your own text or Markdown. A preview is available on the right hand side of the text editor.

If you don't have :ref:`write permissions<about-write-permissions>` for the dashboard you are viewing, or you are in a built-in dashboard, you need to select :guilabel:`Save as` to save the text note.

.. _dashboard-event-feed:

Add an event feed chart to a dashboard
=============================================================================

An event feed chart shows a list of events that meet criteria you specify, including:

- events created when a detector triggers or clears an alert
- custom events that you have manually created in Splunk Infrastructure Monitoring
- custom events that have been sent in from an external source

You can use the Metrics Sidebar to quickly add simple event feed charts to your dashboard (see :ref:`create-charts`). Click :menuselection:`Find Events` in the Metrics Sidebar to include only events in your search results.

To add charts with more robust event feeds to a dashboard, open the dashboard and then select :menuselection:`Chart` from the dashboard's Actions menu (|more|). (Alternately, you can click :guilabel:`New chart` in the placeholder image at the bottom of every dashboard.) From the chart type selector, select :menuselection:`Event Feed`. See :ref:`chart-types` for more information on Event Feed charts.

If you don't have :ref:`write permissions<about-write-permissions>` for the dashboard you are viewing, or you are in a built-in dashboard, you need to select :guilabel:`Save as` to save the chart.

You can add multiple event types to the feed by adding a new plot line for each event. Events are listed in the feed in reverse chronological order.

If you add events generated when a detector triggers an alert, the severity of the alert is shown in the feed.

Click :guilabel:`Save As` to save the event feed to the dashboard; the event feed is placed at the bottom of the dashboard. Once in the dashboard, the event feed can be moved and resized like any other chart. You can also click on custom events listed in the feed to edit or delete them.

When you hover over an event in a dashboard's event feed chart, a vertical line is displayed in all the charts at the time the event occurred. This feature makes it easy for you to visualize correlations between metric values and the event. (Of course, a line is displayed only when the event occurred during the time frame displayed in the dashboard.)

You can export the contents of an event feed chart to a JSON object from the chart's Actions menu (|more|). The most recent events that occurred during the time range of the chart are exported, up to a maximum of 1000  |nbsp| events.

.. _dashboard-event-overlay:

Overlay event markers on charts in a dashboard
=============================================================================

As discussed in :ref:`create-charts`, you can display event markers on a chart by adding the event as a plot. This option works if you want to see those events on only one chart, but if you want to see the events on multiple charts, you have to add a plot for the event to every chart on which you want to see it.

Instead of manually adding plots for events to multiple charts, you can overlay events onto all charts in a dashboard. This lets you show event markers on the fly while viewing a dashboard. You can select multiple events to display, including events that are triggered by a detector, SessionLog events, and custom events.

For background information on events, see :ref:`get-started-detectoralert`.

To select events to display on a dashboard, click :guilabel:`Event Overlay`.

If you (or someone else) in your organization specifies suggested events to choose from, these events are displayed in a drop-down list. To search for other events, begin typing in the Event Overlay search box. As you type, matching events are shown in the drop-down list.

..	tip:: If you aren't sure of the names of events you want to overlay, you can display the :ref:`Events sidebar<create-charts>` to see a list of the most recent events. Click the :menuselection:`Show Sidebar` icon, then select the :menuselection:`Events` tab.

In the Event Overlay drop-down list, select the event(s) you want to overlay onto the dashboard, then click :guilabel:`Show events`. (You might have to scroll to the bottom of the event list to see :guilabel:`Show events`.)

If events occur in the time frame for the charts in the dashboard, event markers are displayed.

By default, events shown in the Events sidebar are filtered to show only the events that are being overlaid on the dashboard. To remove the filter, click :guilabel:`Show All Events`.

.. note:: For Event Overlay, a dashboard filter applies only if the dimension used in the filter exists on the event.

To close the Events sidebar, click the click :guilabel:`Close Sidebar` icon.

If you want the overlaid events to persist when the dashboard is next opened, click :guilabel:`Save` to save the dashboard with the overlay, or use :guilabel:`Save As` from the dashboard's Actions menu (|more|) to create a new version of the dashboard with the overlaid events displayed.

Suggest overlay events for a dashboard
=============================================================================

Depending on which charts are on a dashboard, there might be certain events that are regularly :ref:`overlaid onto the charts<dashboard-event-overlay>`. For example, on a system stats dashboard, users might generally want to see events related to high CPU utilization or low disk space. To make it quick and easy for users to overlay these events, you (or anyone in your organization) can specify events to be suggested by default for that dashboard in the Event Overlay selector.

To manage suggested events, select :menuselection:`Event Overlay Suggestions` from the dashboard's Actions menu (|more|). The Event Overlay tab is displayed.

Click :guilabel:`Add event` to add a new event to the suggested events list. (If you can't edit events, you are in a :ref:`built-in dashboard<built-in>` or do not have :ref:`write permission<about-write-permissions>` for the dashboard.) Search for the event just as you would when adding an overlay to the dashboard. You can also specify a filter and name for the event, the color that should be used for the event (available only for custom events), and whether vertical lines are displayed at times where event markers are shown.

Configure data links for a dashboard
=============================================================================

Data links are dynamic links available for properties that appear in a chart's data table and in list charts. Data links can take you to a dashboard or an external system, such as a Splunk instance or a custom-defined URL. For example, clicking on a value for the property ``aws_region`` in one dashboard could take you to a related dashboard, filtered by that value.

For more information on creating and using data links in dashboards, see :ref:`navigate-with-data-links`.
