.. _view-charts-dashboards:

***********************************************
Specify settings for all charts in a dashboard
***********************************************

.. meta::
      :description: Use the Overrides navigation bar to apply the same settings to multiple dashboards and charts, or override individual settings for dashboards and charts.

There are many situations where you want to align all of the charts on a dashboard to the same filters, time range, or chart display resolution, such as:

-  Troubleshooting

   One of the first steps in root-cause analysis using time series data is slicing and dicing that data along a variety of dimensions, to help highlight patterns or trends. You can do this by using the appropriate dimension, property or tag to filter all of the data on a dashboard.

-  Efficiently creating similar dashboards

   You may want to replicate the monitoring setup you have in one environment into another. You can accomplish this by adding a dimension to the relevant metrics, then saving the dashboard.

-  Using the same dashboard to view metrics for an entire fleet as well as select subsets of it

   Some dashboards (for example, the built-in Amazon Web Services EC2 dashboard) show the total number of instances, instances by type, etc. for the entirety of the AWS account that has been integrated with Splunk Observability Cloud. You can use the same dashboard to see just the subset for a particular region or availability zone, for example, by applying the appropriate filter.

To apply settings to all charts on a dashboard, you can specify settings using the Overrides navigation bar on every dashboard and chart. Any values specified here, whether in a chart or in a dashboard, override any individual values specified in any chart on the dashboard. 

On all charts and dashboards, you can use the Overrides bar to specify :ref:`Filters<filter-dashboard-charts>`, :ref:`Time range<dashboard-time-range>` and :ref:`Chart Resolution<dashboard-resolution>`. The Overrides bar might also contain one or more dashboard variables. To learn more, see :ref:`dashboard-variables`.

If you make changes in the Overrides bar, you can use :guilabel:`Save` or :guilabel:`Save as` to save the dashboard with your changes. To revert to the previous settings, click :guilabel:`Reset`.


.. _filter-dashboard-charts:

Filters
=============================================================================

You can filter the charts in a dashboard based on a number of criteria. This capability lets you create dashboards on demand that are populated with just the relevant subset of your data. Filters can be :term:`dimensions<dimension>`, :term:`properties<property>`, or :term:`tags<tag>`. Dimensions and properties are key-value pairs. 

When you click the :strong:`Filter` field, a dropdown list displays the available options. If you select a key (dimension or property), you can see a colon (:) appended to the key and the list of available values to choose from for that key. You can also type ``sf_tags`` to find a list of tags relevant to the dashboard you are viewing or, if you know the tag you want to use, you can type it in directly. 

If you select multiple values for a filter, those values are OR'd together. If you add multiple different filters, the different filters are ANDed together.

You can specify a filter using a dimension for which you have yet to start sending data. Just type in the dimension and value you know you want to filter by, then press Enter. When data starts arriving for that dimension, the dashboard is filtered as you specify.

.. note::
      As with all overrides, if you are viewing a chart in the Chart Builder when you specify a dashboard filter, the filter is applied to all charts on the dashboard when you save and close the chart.

Any filters you apply here override all conflicting :ref:`filters specified in plot lines <filter-overrides>`.


.. _choosing-data-to-allow:

Choose what data to allow
-------------------------------------------------------------------

If you hover over a filter setting, a caret appears indicate that you have access to a drop-down menu. Click the caret and select an option from the drop-down menu to specify how the filter should be applied, based on whether the property you specify applies to incoming data.

For example, you specify the key-value ``aws_region:us-east-1`` as a filter setting. You can either:


-  Only allow data matching the filter condition (default)

   -  Data that doesn't match the condition is excluded from the results.
   
   -  Data that doesn't contain the property is also be excluded from the results.
   
   -  In this case, only data where the value of ``aws_region`` is ``us-east-1`` is included in the results.

-  Allow data matching the filter condition or missing ``aws_region``

   -  If the incoming data contains the specified property, data that doesn't match the condition is excluded from the results.
   
   -  If the incoming data doesn't contain the specified property, the data is included in the results.

   -  In this case, data where the value of ``aws_region`` is ``us-east-1``, and also data that doesn't contain the property ``aws_region``, are both included in the results.


.. _filter-multiple:

Filter using multiple criteria (AND or OR)
-------------------------------------------------------------------

You can specify multiple filters. If you select multiple tags, dimension keys or property keys, Splunk Observability Cloud uses the intersection of the selected filters, i.e. a Boolean AND.

You can also select multiple values for a single dimension or property key; in this case, Splunk Observability Cloud uses the union of the selected values (for the single key), i.e. a Boolean OR.

For example, the following two filters would be interpreted as: (``aws_region`` is ``us-east-1`` OR ``aws_region`` is ``us-west-2``) AND ``aws_instance_type`` is c3.2xlarge.

.. image:: /_images/images-dashboard/multi-filter.png
      :width: 70%
      :alt: Example of multiple filters.

.. _exclude-criteria:

Filter by excluding specific criteria (creating a NOT filter)
-------------------------------------------------------------------

You can also specify dimensions, properties or tags that you want to exclude from the results. To do so, type an exclamation point (!) in the filter field to represent a Boolean NOT. Once you type an exclamation point (!), the list of filtering options appears. By selecting an option from the list, you specify that you want to exclude any items that match your selection.

Following up on the previous example, the following two filters would be interpreted as: (``aws_region`` is ``us-east-1`` OR ``aws_region`` is ``us-west-2``) AND ``aws_instance_type`` is NOT c3.2xlarge.

.. image:: /_images/images-dashboard/multi-filter-not.png
      :width: 70%
      :alt: Example of filter by exclusion.


.. _filter-from-data-table:

Filter from the data table
-------------------------------------------------------------------

You can also add filters when you view the data table for a chart. To learn more about data table, see :ref:`show-data-table`.

As you hover over dimensions in the data table, an Actions menu (|more|) icon is displayed.

-  To filter the view down so that only data with the specified value is shown, click the menu icon and select :guilabel:`Filter`. The corresponding filter is added in the Overrides bar.

-  To create a NOT filter so that data with the specified value is excluded from the view, click the menu icon and select :guilabel:`Exclude`. The exclamation point (!) that represents a NOT filter is displayed in the filter token. 


.. _dashboard-time-range:

Time range 
=============================================================================

Each chart within a dashboard displays on its x-axis the time range selected when creating the chart.

.. note::
      Single value charts and list charts show a timestamp rather than a range.

You can override the time range for all charts in a dashboard by specifying values in the Time Range selector, or by using your mouse to highlight a range in any of the charts. To learn more, see :ref:`time-range-selector`.

As with all overrides, if you specify a time range when you view the chart in the Chart Builder, your specified time range is applied to all charts on the dashboard when you close the chart.

Any time range you specify here overrides any default time range you might have in the Chart Options tab. To learn more, see :ref:`default-time`.

.. _dashboard-resolution:

Chart display resolution
=============================================================================

When you look at a chart on a dashboard, every chart displays the time duration that each data point represents to the right of the chart title, called the chart resolution. You can use the :strong:`Chart Resolution` selector in the Overrides bar to increase or decrease the resolution. 

This feature is especially useful when different users are comparing two views of the same chart; users can use the resolution selector to increase the likelihood that they are viewing the same chart at the same resolution. Specifying the same chart resolution also makes it easier to compare values across charts on the same dashboard.

If there are no overrides in place, each chart on a dashboard is displayed in a default resolution; the resolution depends on a number of factors for any particular chart.

.. note:: Notes

	- Setting a high resolution doesn't guarantee that all of the charts on the dashboard have the same resolution. Some charts might already be at the finest possible resolution, in which case increasing the chart resolution setting for the dashboard has no effect on those charts. 
	
	- Single value and list charts always display at native resolution, and are unaffected by the chart resolution setting.
	
	- Chart resolution control only affects the visualization of charts and doesn't affect detectors or alerts.
	
	- The chart resolution control is also available when viewing a chart in the Chart Builder. As with all overrides, if you specify a resolution when viewing the chart in the Chart Builder, the specified resolution is applied to all charts on the dashboard when you close the chart.
	
To learn more, see :ref:`chart-resolution`. 

.. _data-links-dropdown:

Data links
=============================================================================

Data links are dynamic links available for properties that appear in a chart's data table and in list charts. As you hover over a property, an Actions menu (|more|) icon is displayed.

If there are data links configured for that property, they are listed when you open the menu.

You can click on a link to navigate to a specified dashboard or external site related to the property value, or click :guilabel:`Configure data links` to add or edit links. To learn more about working with data links, see :ref:`navigate-with-data-links`.


.. _dashboard-max-delay:

Max delay value
=============================================================================

In addition to using the Chart Options tab to set a value for max delay for an individual chart, you can set a max delay value for a dashboard. As with all dashboard overrides, a dashboard max delay value applies to all the charts on the dashboard, overriding any individual chart's max delay settings. 

#. From a dashboard's Actions menu (|more|), select :guilabel:`Dashboard Info`.
#. Click in the :guilabel:`Max Delay` field, then select an option from the drop-down menu or enter a value in seconds or minutes. You can enter a value up to 15 |nbsp| minutes, although values higher than 5 |nbsp| minutes are not recommended. 
#. Click :guilabel:`Save`.

The selected setting will be displayed in the Overrides bar on the dashboard and when someone opens a chart on the dashboard.

To remove the override:

#. If a chart is open, close the chart to return to the dashboard.
#. Click on the :guilabel:`Max Delay` value shown on the Overrides bar to display the Dashboard Info tab. 
#. Click :guilabel:`Reset to default`.
#. Click :guilabel:`Save`.

The max delay override option is no longer displayed in the Overrides bar. Max delay values set for individual charts are applied.

For more information on max delay, see :ref:`delayed-datapoints`.

.. _dashboard-variables:

Dashboard variables
=============================================================================

Dashboard variables allow you to pin frequently used filters to the dashboard, removing the guesswork about which dimensions or properties to use. A dashboard can contain multiple dashboard variables. Filters applied through the use of dashboard variables are also retained by default when you drill down into individual charts, making troubleshooting workflows more efficient. 

When you navigate among dashboards in a dashboard group, selections you make for dashboard variables in one dashboard are reflected in other dashboards that have the same dashboard variable. This feature helps you maintain context when moving from one dashboard to another in a dashboard group.

To add a variable to a dashboard, select :guilabel:`Dashboard Variables` from the dashboard's Actions menu (|more|).

.. note::
      If you don't see :guilabel:`Dashboard Variables`, either you don't have write permissions for the dashboard you are viewing, or you are in a built-in dashboard. To learn more about write permissions, see :ref:`about-permissions`. To learn more about built-in dashboards, see :ref:`built-in-dashboards`.

You can see a modal window that allows you to create, edit, or delete dashboard variables for the specific dashboard that you are viewing. If there are no dashboard variables currently in use, you can see that an Untitled variable has been added, with no values entered for any of its fields. The following sections describe how to use each of the fields.


Property
-------------------------------------------------------------------

Select the dimension or property key that you want to use by clicking in the :guilabel:`Property` field and choosing from among the list of possible keys that appear in the dropdown menu, or by typing the name of the key. You can also type ``sf_tags``, which lets the user filter the dashboard by specified tags. 

Alias
-------------------------------------------------------------------

Provide a label for the variable. The text you enter here appears on the dashboard.

Description
-------------------------------------------------------------------

If you add a description for the dashboard variable, it appears in the mouse-over text for the alias you specify.

Default value and value required
-------------------------------------------------------------------

Click in :guilabel:`Default value` field to display a list of possible values in the drop-down menu. You can choose a dimension or property value to be used by default.

- If you want to use this dashboard without any filters (i.e. if the dashboard is useful without any filters applied) but want a specific filter to be applied to it when you arrive at the dashboard, add a value to the :guilabel:`Default value` field and leave the box next to :guilabel:`Value for variable is required` unchecked.
- If you want to use this dashboard without any filters and don't want any filter applied by default, leave the :guilabel:`Default value` field empty and leave the box next to :guilabel:`Value for variable is required` unchecked.
- If you want to always force a filter to be used with the dashboard, check the box by :guilabel:`Value for variable is required`. Specifying a default value is optional.

.. _dashboard-variable-suggestions:

Suggestions and restricting suggestions
-------------------------------------------------------------------

In some cases, you might want to ensure that certain property or dimension values are shown higher in the drop-down list on the dashboard. To select those values, click the :guilabel:`Suggestions` field and select each of the values you want. Other values still appear in the list, but below the ones you select. You can reorder the values by clicking and dragging the icon that appears when you hover over a suggestion.

Instead of having other values appear below the ones you suggest, you might want to have only your specified values appear in the drop-down list. To do this, select and reorder the values you want in the :guilabel:`Suggestions` field as described previously and check the box next to :guilabel:`Restrict suggestions to predefined list`. The resulting list includes only your suggested values.

.. _how-variables-apply:

Apply to
-------------------------------------------------------------------

You can choose whether the variable condition is applied to all plots on all charts on the dashboard.

-  All plots on all charts (default)

   The dashboard variable setting is applied as a filter to all plots on all charts and behaves just like the Filter option for a dashboard. The dashboard displays data only for metrics that send in the specified property and meet the filter condition.

   ..    If a metric doesn't send in the property or dimension specified, the plot for that metric isn't visible in the charts on the dashboard because it doesn't meet the filter condition. On some dashboards, this can result in a number of blank charts.
   ..
   ..    Use this setting when you want the dashboard to:
   ..
   ..    - apply to and display metrics that send the specified property and meet the variable setting.
   ..    - hide metrics that send the specified property but don't meet the variable setting.
   ..    - hide metrics that don't send the specified property at all.

   A common scenario for this setting is when you want to focus on only data that meets the variable condition, so you want to hide all other data.
   
   .. note::
      Because you hide data, your dashboard might have a number of blank charts.

..    This setting displays a dashboard on which some charts may appear empty, making it easy for you to focus on only the metrics relevant to the dashboard variable. For example, suppose your variable specifies ``aws_availability_zone``, and you have charts on the dashboard that reflect non-AWS data, such as system stats. Those charts will appear empty, because the variable doesn't apply to its plots.

   To summarize:

   -  The only plots you see in charts on the dashboard are those where the plot meets the setting specified in the dashboard variable.
   -  If a metric in a plot doesn't have the property or dimension that is specified as the dashboard variable, plots for that metric isn't displayed.

-  Only plots with filters containing <property>

   The dashboard variable setting applies only to plots that have a filter for the property. Just like the Filter option, if a plot is filtered on a value for ``aws_availability_zone``, a dashboard variable set to ``aws_availability_zone:US-east-1`` overrides that filter in the chart's display.

   However, unlike the Filter option, the variable doesn't apply to plots that don't have a filter for the property; these are displayed on the dashboard as if there were no filter applied.

   ..    If a plot doesn't have the property specified, or doesn't have a filter for the property, the dashboard variable is ignored and the plot is shown in the charts on the dashboard.
   ..
   ..    Use this setting when you want the dashboard variable to:
   ..
   ..    - apply to and display metrics where the plots are filtered on the specified property and meet the variable setting.
   ..    - hide metrics where the plots are filtered on the specified property but don't meet the variable setting.
   ..    - display all other metrics, including metrics that don't send the specified property at all.


   A common scenario this setting is when you have, for instance, two charts, each with a plot that shows the mean of a metric that has the ``aws_availability_zone`` property. You want one chart to always show the mean aggregated across all zones, while in the other chart, you want to be able to use a dashboard variable to drill down to a single zone. In the latter chart, you add a filter for ``aws_availability_zone:*`` (or an OR filter that contains multiple zone values). When the dashboard variable is applied, the filter in that plot is "replaced" by the specified availability zone, so the chart displays values only for that zone. However, because no filter is applied to the plot in the first chart, the mean across all zones is still displayed.

When you return to the dashboard and hover over the dashboard variable field, you either see a tooltip telling you the variable applies to all charts, or you see a different message along with some charts being highlighted on the dashboard. In the latter case, the dashboard variable is being applied to those charts because at least one plot in the chart has a filter matching the dashboard variable property.



..    This option lets you selectively filter charts on the dashboard, so the dashboard variable is applied to some but not others. This option is especially appropriate when a dashboard contains both (what's the word - global/conglomerate) metrics and also charts that drill down for that metric.

   For example, suppose you have two charts, each with a plot that shows the mean of a metric that has the ``aws_availability_zone` property. You want one chart to always show the mean across all zones, while in the other chart you want to be able to drill down to a single zone. In the latter chart, you should add a filter for ``aws_availability_zone:*`` (or an OR filter that contains multiple zone values). When the dashboard variable is applied, the filter in that plot will be "replaced" by the specified availability zone, so the chart will display values only for that zone. However, because no filter has been applied to the plot in the first chart, the mean across all zones will still be displayed.

   Also, this setting does not apply to plots that don't have the property specified in the variable, so they will be shown in the dashboard.

   To summarize:

   -  The dashboard variable will be applied only to plots that have been filtered on the specified property or dimension.
   -  If a metric in a plot doesn't have the property or dimension specified as the dashboard variable, values for that metric will still be displayed.

..
    Also, this setting does not apply to plots that don't have the property specified in the variable, so there are no empty charts on the dashboard. It applies only to plots that are filtered on the property for that dashboard variable. For example, suppose your variable specifies ``aws_availability_zone``, and the dashboard contains charts with plots that have this property. If you want the dashboard variable to apply to those plots, you must filter them on the property. In this example, you would filter on ``aws_availability_zone:*``. When the dashboard variable is applied, that plot will display values for only the specified availability zone.


.. _how-allow-data:

Allow data
-------------------------------------------------------------------

You can choose whether the variable condition displays data that is not sending the property specified in the filter. Assuming the dashboard variable on the dashboard is set to use the default value ``aws_region`` is ``us-east-1``, this option is implemented as follows. 

-  Only allow data matching the filter condition (default)

   -  Data that doesn't match the condition is excluded from the results.
   
   -  Data that doesn't contain the property is also be excluded from the results.
   
   -  In this case, only data where the value of ``aws_region`` is ``us-east-1`` is included in the results.

-  Allow data matching the filter condition or missing ``aws_region``

   -  If the incoming data contains the specified property, data that doesn't match the condition is excluded from the results.
   
   -  If the incoming data doesn't contain the specified property, the data is included in the results.

   -  In this case, data where the value of ``aws_region`` is ``us-east-1``, and also data that doesn't contain the property ``aws_region``, are both included in the results.

When you return to the dashboard and hover over the dashboard variable field, you can see a tooltip telling you what data is being displayed, based on what data you allow.

.. note::
      This setting applies to whatever data is displayed based on the option you specified for :ref:`how-variables-apply`. In other words, :guilabel:`Apply to` specifies how broadly the filter is applied to the charts, while :guilabel:`Allow data` specifies the set of data to which the filter applies.

Saving and using dashboard variables
-------------------------------------------------------------------

When you finish making your changes, click :guilabel:`Save` to return to the dashboard. 

To change the value of the filter applied, click the tokenized filter name to edit it, or on the :strong:`x` to delete it and select from the list of possible values. If the variable is required, clicking :strong:`x` doesn't delete the filter; you have to specify a value.

