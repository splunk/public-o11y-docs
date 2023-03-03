.. _logs-logviews:

*****************************************************************************
Add logs data to Splunk Observability Cloud dashboards
*****************************************************************************

.. meta created 2022-07-12
.. meta DOCS-3730

.. meta::
  :description: Add logs data to Observability Cloud dashboards without turning your logs into metrics first. Align log views, log timeline charts, and metrics charts on one dashboard.

You can add logs data to your Observability Cloud dashboards without turning your logs into metrics first. On a dashboard, metrics charts show what changed in your systems and when the problem started. Logs data on the same dashboard shows you in detail what is happening and why. Your metrics and logs data on the same dashboard respond to the same time selection and other dashboard filters, allowing you to drill down to the source of the problem faster.

There are two ways you can add logs data to dashboards:

* Log view

* Log timeline

A log view chart displays a table showing log records in chronological order for the duration of the period selected in the time picker. A log timeline chart displays a histogram of logged events over time grouped by fields and values of your choice. Both types of logs charts automatically update to dashboard filters. Filter and aggregate logs in Log Observer before creating a log view or log timeline chart.

.. note:: Log Observer Connect customers can only create logs charts in dashboards if each Log Observer Connect connection name is unique.

.. _create-logviews-chart:

Add logs data to a dashboard
=============================================================================
To add a log view or log timeline chart on a dashboard, follow these steps:

1. Log into Log Observer and create a query. To learn how, see :ref:`logs-queries`.

2. In the :strong:`Save` menu, select :strong:`Save to dashboard`.

3. Give your log view or log timeline chart a name and optionally a description, then select a dashboard.

4. In :strong:`Chart type`, select :strong:`Log timeline` or :strong:`Log view`, then select :strong:`Save`. Or, to see your new logs chart on its dashboard, select :strong:`Save and go to dashboard`.

You can now see your new logs chart along with all other charts on the same dashboard.  

Modify your logs chart from the dashboard
=============================================================================
You cannot directly edit a logs chart from the dashboard. For example, you cannot edit the column headings or data on your log view chart from the dashboard. You can delete a log view or log timeline chart entirely using the :strong:`More` menu. See :ref:`Chart actions <chart-actions>` to learn more.

Log view and log timeline charts respond to any filter or time selection that you make on the dashboard. For example, when you adjust the :strong:`Time` field in the dashboard global control bar, logs charts update in unison with all other charts on the dashboard. 

You can rearrange the columns in a log view by dragging and dropping column headers to a preferred order. You can sort rows in your log view by selecting the column header that you want to sort by.


.. _chart-actions:

Chart actions
=============================================================================
You can take six actions on your logs chart from its dashboard. Select the :strong:`More` menu on your logs chart, then select one of the following options:

* View in Log Observer

* Copy

* Info

* Download chart as image

* Troubleshoot from this Time Window (APM)

* Troubleshoot from this Time Window (RUM)

* Delete

You can only edit the contents of your logs chart by updating the query you derived it from in Log Observer. Select :strong:`View in Log Observer` to see and edit your logs chart in Log Observer. In Log Observer, you can update the logs chart's filters, including field aliases. See :ref:`Align log views with metrics charts on the same dashboard <field-aliasing>` to learn more.

Select :strong:`Copy` if you want to paste your logs chart elsewhere for further examination.

Select :strong:`Info` to see which user added and last updated the logs chart.

Select :strong:`Download chart as image` to download your logs chart as a PNG file.

Select :strong:`Troubleshoot from this Time Window (APM)` to explore related data in Splunk APM. (This option only exists if APM contains data related to data in the logs chart.)

Select :strong:`Troubleshoot from this Time Window (RUM)` to explore related data in Splunk RUM. (This option only exists if RUM contains data related to data in the logs chart.)

Select :strong:`Delete` to remove your logs chart from the dashboard. Deleting it from the dashboard does not impact the query you used to create your logs chart in Log Observer.

.. _field-aliasing:

Align logs charts with metrics charts on the same dashboard
=============================================================================
To maneuver seamlessly on your dashboard, logs fields and corresponding metrics fields should use the same field names. You can ensure that field names match by aliasing logs fields when field names do not align.

To align logs data with metrics data, follow these steps:

1. On the dashboard you are using to determine the source of a problem, take note of the field names of interest on your metrics charts.

2. In Log Observer, check whether the corresponding logs fields use the same field names. If they do not match, create a field alias for the logs field using the same field name that your metrics charts use. See :ref:`logs-alias` to learn how. 

3. Create a Log Observer query filtering by the new alias you created in the previous step.

4. Follow the steps in :ref:`create-logviews-chart` to save your new query as a chart.

Now you can easily cross reference data in your logs chart and data in your metrics charts. Logs fields that correspond to metrics fields on the same dashboard now use the same field name, so you can drill down to the problem faster.

.. note:: Field Aliasing does not rename or remove your original logs field name. When you alias a logs field, you can search for it by its original name or by any of its aliases. 

