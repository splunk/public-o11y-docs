.. _dashboard-create-customize:

********************************************************************************
Create and customize dashboards
********************************************************************************

.. meta::
   :description: Learn how to create and customize a dashboard.

You can quickly visualize the metrics you monitor using Splunk Observability Cloud dashboards. This topic
explains how to create and customize these dashboards, as well as how to customize mirrored dashboards. 

Prerequisites 
==================

- If you are unfamiliar with dashboards or need a refresher, see :ref:`dashboard-basics`.

- See :ref:`simple-charts-dashboards` for information about simple charts.

.. _create-dashboard:

Create a dashboard
==================

Using Splunk Infrastructure Monitoring, you can quickly add simple charts to a new dashboard and share a copy of that dashboard with others. 

To create a dashboard:

1. Select :guilabel:`Dashboard` from the Splunk Observability Cloud home page.
2. Click the Create menu (plus sign) on the navigation bar.
3. Select :guilabel:`Dashboard`. 

.. note::

  - If you see :guilabel:`Dashboard (unsaved)`, you have already added charts to a new dashboard and haven't saved the dashboard yet. Clicking this option opens the unsaved dashboard. You can only have one unsaved dashboard at a time.
  - If you see :guilabel:`Dashboard with <n> copied charts`, you have copied some charts from one or more dashboards and haven't yet added any charts to a new (unsaved) dashboard. Clicking this option creates a dashboard and pastes the copied charts into it.
  - In the Chart Builder, when saving a new chart or using :guilabel:`Save as` to save a copy of an existing chart, you can create a dashboard on which to place the chart.

.. _change-dashboard-name-description:

Change a dashboard's name or description
=========================================

To rename a dashboard or change the dashboard's description, select :guilabel:`Rename` on the dashboard's Actions menu to display the Dashboard Info tab. Make any desired changes, then click :guilabel:`Save and close`.

.. _customize-dashboard-filters:

Customize dashboard filters
=========================================

Once the dashboard is created, there are two ways to customize the dashboard filters: from the Overrides bar or the Dashboard Info tab. As with any dashboard, changes you make to filters on the Overrides bar are applied immediately, which lets you modify your view and explore your data in real time.

Customizing mirrored dashboard filters
-----------------------------------------

- Specify any filters you want applied to the dashboard. By default, the dashboard will have the same filter(s) as the dashboard you are mirroring. Setting filters here means the target mirror will have different default filters applied. Filters can also be set later by any user with write permissions for that group.

- If you apply filters and want them to be displayed on the mirror by default, click :guilabel:`Save` to save the mirror with the filters applied. Once saved, the new filters will be stored in the customization section in the dashboard info tab.

- On the Dashboard Info tab, anyone with :guilabel:`dashboard write permissions` can apply filters to the dashboard (in the top portion of the tab). These filters will be applied to all mirrors that don’t have filter customizations applied.

- If you specify that you want to apply a filter override, you can either specify a filter to use in place of the dashboard default filter, or you can leave the filter value blank. Leaving the filter value blank means the mirror will not have any filter applied by default.


.. _customize-dashboard-variables:

Customize dashboard variables
=========================================

You can specify various dashboard variable settings that will apply to the dashboard in this dashboard group. Select :guilabel:`Dashboard Variables` from the dashboard’s Actions menu.

When these settings are saved, the dashboard variable and the suggested values now reflect the customizations you specified.

Customizing mirrored dashboard variables
----------------------------------------

- You can make changes directly on the :guilabel:`Overrides` bar; if you save the mirror, these settings will be saved as default values in the :guilabel:`Variable Details` section of the :guilabel:`Dashboard Variables` tab.

- When you save customization options that you set in the :guilabel:`Dashboard Variables` tab, these changes are automatically saved as default settings for this mirror.

- On the :guilabel:`Dashboard Variables` tab, anyone with dashboard write permissions can add, delete, and edit dashboard variables and their settings. These variables will be applied to all mirrors that don’t have variable customizations applied.

- If you want to override the dashboards default variables with no variables, you can leave the value blank. Doing so means you are overriding the dashboard variable default value with a setting of “no default value.”