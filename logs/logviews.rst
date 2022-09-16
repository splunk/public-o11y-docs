.. _logs-logviews:

*****************************************************************************
Add log views to Splunk Observability Cloud dashboards
*****************************************************************************

.. meta created 2022-07-12
.. meta DOCS-3730

.. meta::
  :description: Add and manage log-derived charts in Observability Cloud dashboards

You can add logs data to your Observability Cloud dashboards without turning your logs into metrics first. On a dashboard, metrics charts show what changed in your systems and when the problem started. A log view on the same dashboard shows you in detail what is happening and why. Your metrics and logs data on the same dashboard respond to the same time selection and other dashboard filters, allowing you to drill down to the source of the problem faster.

.. note:: Log Observer Connect customers can only create log views in dashboards if each Log Observer Connect connection name is unique.

.. _create-logviews-chart:

Add a log view on a dashboard
=============================================================================
To add a log view on a dashboard, follow these steps:

1. Log into Log Observer and create a query. To learn how, see :ref:`logs-keyword` or :ref:`logs-filter-logs-by-field`.

2. In the :strong:`More` menu, select :strong:`Save to dashboard`.

3. Give your log view a name and optionally a description, then select a dashboard.

4. In :strong:`Chart type`, select :strong:`Log view`, then select :strong:`Save`. Or, to see your new log view on its dashboard, select :strong:`Save and go to dashboard`.

You can now see your new log view along with all other charts on the same dashboard.  

Modify your log view from the dashboard
=============================================================================
You cannot directly edit the column headings or data on your log view from the dashboard, but you can delete the chart entirely using the :strong:`More` menu. See :ref:`Chart actions <chart-actions>` to learn more.

Log views respond to any filter or time selection that you make on the dashboard. For example, when you adjust the :strong:`Time` field in the dashboard global control bar, your log view updates in unison with all other charts on the dashboard. 

You can rearrange the columns in your log view by dragging and dropping column headers to a preferred order. You can sort rows in your log view by selecting the column header that you want to sort by.


.. _chart-actions:

Chart actions
=============================================================================
You can take five actions on your log view from its dashboard. Select the :strong:`More` menu on the log view, then select one of the following options:

* View in Log Observer

* Add to clipboard

* Info

* Download chart as image

* Delete

You can only edit the contents of your log view by updating the query you derived it from in Log Observer. Select :strong:`View in Log Observer` to see and edit your log view in Log Observer. In Log Observer, you can update the log view's filters, including field aliases. See :ref:`Align log views with metrics charts on the same dashboard <field-aliasing>` to learn more.

Select :strong:`Add to clipboard` if you want to paste your log view data elsewhere for further examination.

Select :strong:`Info` to see which user added and last updated the log view.

Select :strong:`Download chart as image` to download your log view as a PNG file.

Select :strong:`Delete` to remove your log view from the dashboard. Deleting it from the dashboard does not impact the query you used to create your log view in Log Observer.

.. _field-aliasing:

Align log views with metrics charts on the same dashboard
=============================================================================
To maneuver seamlessly on your dashboard, it is important that logs fields and corresponding metrics fields use the same field names. You can ensure that field names match by aliasing logs fields when field names do not align.

To align logs data with metrics data, follow these steps:

1. On the dashboard you are using to determine the source of a problem, take note of the field names of interest on your metrics charts.

2. In Log Observer, check whether the corresponding logs fields use the same field names. If they do not match, create a field alias for the logs field using the same field name that your metrics charts use. See :ref:`logs-alias` to learn how. 

3. Create a Log Observer query filtering by the new alias you created in the previous step.

4. Follow the steps in :ref:`Add a log view on a dashboard <create-logviews-chart>` to save your new query as a chart.

Now you can easily cross reference data in your log view and data in your metrics charts. Logs fields that correspond to metrics fields on the same dashboard now use the same field name, so you can drill down to the problem faster.

.. note:: Field Aliasing does not rename or remove your original logs field name. When you alias a logs field, you can search for it by its original name or by any of its aliases. 

