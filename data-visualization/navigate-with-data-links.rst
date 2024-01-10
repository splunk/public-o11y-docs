.. _navigate-with-data-links:

*****************************************************************
Navigate to related resources with data links
*****************************************************************



.. meta::
  	:description: Data links help you get additional insights and resolve issues faster by tapping into the right data in the right system at the right time. Data links accomplish this by giving you seamless and context-aware transitions between Splunk Infrastructure Monitoring dashboards and third party software you use.

This topic shows you how to configure data links in charts and dashboards as well as how to use them to navigate to related resources. To learn more about data links, see :ref:`data-link-def`.

.. note::
    You can configure data links only for dashboards and charts you have write permissions for. For example, you can't configure data links for built-in dashboards and mirrors of dashboards. To learn more, see :ref:`about-permissions`.

.. _local-global:

Choose a data link type
-------------------------------

There are two types of data links for a property, local and global. See the following table to choose the appropriate data link type.


.. list-table::
   :header-rows: 1
   :widths: 20 80

   * - :strong:`Type`
     - :strong:`Description`
  
   * - Local
     - | - Available on only on dashboard.
       | - Anyone with write permission for a dashboard can add data links that appear on that dashboard.
       | - Example: While viewing a dashboard, you can create a link from any value of ``InstanceId`` to the built-in dashboard "EC2 Instance". Following the link opens the EC2 Instance dashboard filtered to the value of ``InstanceId`` you select. This link is available for any appearance of ``InstanceId`` in that dashboard; it doesn't appear as a link on any other dashboard or in alert messages.
   
   * - Global
     - | - Available on all dashboards and alert messages, as well as in the Infrastructure Monitoring navigators.
       | - Only Splunk Observability Cloud administrators can create global links.
       | - Example: If you create the link described in the previous example as a global instead of local link, the link is available for every appearance of ``InstanceId`` in Splunk Infrastructure Monitoring, including dashboards created after the link is created.
   

.. caution::  If you want your link to be available for properties that appear in alert messages, you must create a global data link.


.. _local-links:

Configure local data links
=============================================================================

When you view properties in a chart on a dashboard, either in the data table or on a list chart, you can configure local data links by using the :strong:`Actions` menu. The following steps show you how to create a new local data link:

#. Hover over the property and select the (|more|) icon.

#. Select :strong:`Configure data links` to display the :strong:`Data Links` tab.

#. Select :guilabel:`New Link` to display the link configuration options. If the :guilabel:`New Link` button is not available, you don't have write permission for the dashboard and can't create local data links.

#. Add a label for the link. This label is what the user sees in a property's :strong:`Actions` menu, so use a concise and clear label.

#. Select the type of destination to link to:

    - Infrastructure Monitoring Dashboard: You have to select the dashboard in a following step.
    - Splunk: A Splunk search for a property:value pair.
    - Kibana: You have to create the URL template for the link in a following step.
    - Custom URL: Any URL-addressable destination.

#.  In the :strong:`Show On` drop-down menu, select a value that indicates where you want the data link to display.

    - Any Metadata Value: Link from all values of all properties. (Not available for Dashboard destinations.)
    - Any Value of: Link from any value of a property. The property you start from is pre-filled as the trigger, but you can delete it and select a different trigger.
    - Property:Value Pair: Link from a specific value of a property. The property:value you start from is pre-filled, but you can delete it and select a different trigger.

#. If you want the data link to display based on the :strong:`Show On` value and one or more additional conditions, select :strong:`Add Conditions`. If you define multiple conditions, all conditions must be met for the link to display.

#. Choose the scope of visibility of this link. You can choose:

    - Entire Organization (available only for administrators): Use this option to create a global data link instead of a local data link.

      For more information about global data links, see :ref:`link-metadata-to-content`.

    - This Dashboard Only: This link is available only on charts in the current dashboard.

#. Configure the actual destination for your link, depending on the type of destination you chose.

    - If your destination is a dashboard, select :guilabel:`Choose Dashboard`, search for the target dashboard, then select :guilabel:`OK`.

        - If the target dashboard is in the same dashboard group as the source dashboard, any filters that you apply on the source dashboard are preserved on the destination dashboard.

        - If the link uses the ``Any Metadata Value`` or ``Any Value of`` option, the property value that you select is also applied as a filter on the destination dashboard.

        - If the link uses the ``Property:Value Pair`` option, the assumption is that the destination dashboard is already specific to that value, and the property value that you select isn't applied as a filter on the destination dashboard. For example, if the trigger is ``service:analytics``, the target dashboard must be specific to the analytics service, with any appropriate filters already applied.

    - If your destination is a Splunk instance, enter the instance URL in the URL field. The property:value information is passed to Splunk.

    - If your destination is a custom URL or Kibana, enter the full address of the URL in the URL field. You can insert variables to vary the resulting URL by property values. Available values are shown when you select the URL field. Common variables and associated syntax include:

        - start and end time: ``&st={{start_time}}&et={{end_time}}``
        - property name (key) and value for the trigger: ``&field={{key}}&value={{value}}``
        - value of any property (for example, ``host``): ``&host={{properties.host}}``

	You can also choose the time format of the ``start_time`` and ``end_time`` variables, as well the minimum time window between them.

#. (optional) If your destination is a custom URL, Splunk instance, or Kibana, you can use Property Mapping to dynamically rename a key or key:value pair in the URL. Use this if you want to link to a destination that has similar data, but different names for the properties that appear in your dashboard.

#. Select :guilabel:`Save` to create the new link.

The link now appears on the :strong:`Actions` menu for the property.

.. note:: If you selected Entire Organization as the scope, the link is also added to the :guilabel:`Global Data Links` page.


.. _click-on-link:

Select a property value to follow a link
=============================================================================

If a link target is an Infrastructure Monitoring dashboard, you can follow a link by selecting on the property value. When multiple links to dashboards are available for a property, the application selects which link to follow based on the following order of operations.

.. note:: In any dashboard, all local and global data links are available by using a property's :guilabel:`Actions` (|more|) menu. You don't have to click on a property value to navigate to a link.

More specific data links override less specific data links
----------------------------------------------------------------------------------

If multiple links that go to Infrastructure Monitoring dashboards are triggered by the same property, clicking the linked value goes to the destination for the trigger that is most specific to that value. In other words, a trigger on a property:value pair is more specific than a trigger on any value of a property.

For example, suppose Link A is a local data link triggered by any value of ``service``, and Link B is a global data link triggered by ``service:analytics``.

- Clicking on ``service:analytics`` in that dashboard follows Link B because the global data link is more specific than the local data link.
- Clicking on any other value of service in that dashboard, such as ``service:testing``, follows Link A.


Local data links override equally specific global data links
----------------------------------------------------------------------------------

If a property has equally specific local and global data links that go to Infrastructure Monitoring dashboards, clicking on the property value navigates to the local link.

For example, suppose Link C is a local data link triggered by ``service:analytics`` with a destination of Dashboard |nbsp| X; link D is a global data link also triggered by ``service:analytics``, with a destination of Dashboard |nbsp| Y.

- Clicking on ``service:analytics`` in that dashboard follows the local data link to Dashboard |nbsp| X because the local data link overrides the global data link.
- Clicking on ``service:analytics`` in a different dashboard or in an alert message follows the global data link to Dashboard |nbsp| Y.


.. _default-links:

Default links override non-default links
----------------------------------------------------------------------------------

If there are multiple, equally-specific triggers that go to Infrastructure Monitoring dashboards for a property, clicking the property value follows the link that has been specified as the default.

For example, suppose two links are triggered by any value of ``host``, but they have different destination dashboards. One link is designated as the default; clicking on any value of ``host`` follows the link to the default destination.

To change the default link for a trigger, expand the link for the desired default destination so you can see its settings, then open the :strong:`Actions` menu and select :guilabel:`Make default`.

Use and view data links
=============================================================================

If data links are available in your organization, you have access to them from a number of locations in Splunk Infrastructure Monitoring.

- When a property has a data link with an Infrastructure Monitoring dashboard as the target, hovering over the property displays the cursor pointer. A tooltip indicates the dashboard you can navigate to if you click on the property; the dashboard group is shown in parentheses.

    .. image:: /_images/images-data-links/link-tooltip.png
        :width: 40%
        :alt: This image shows the tooltip that appears when you hover over over a property that has a data link.

- Alternately, you can view available data links in the :guilabel:`Actions` menu for any property. To access the :strong:`Actions` menu, hover over a property and select the (|more|) icon that appears. If there are data links defined for the property, the list of links is displayed when you select the (|more|) icon, and you can navigate to any of them from this menu.

    .. note:: To navigate to targets other than dashboards, you must use the :strong:`Actions` menu.

- To view all the local data links for a dashboard, select :guilabel:`Data Links` from the :strong:`Dashboard actions` menu.
- To view all the global data links for an organization, go to :guilabel:`Navigation menu > Data Configuration`, then select :guilabel:`Global Data Links`. Alternately, you can select :guilabel:`Global Data links` when viewing the list of local data links.

.. _about-links:

About defining data links
----------------------------------------------------------------------------------

- You can define multiple data links for a property.

- If a link target is a Splunk Infrastructure Monitoring dashboard, you can follow the link by clicking on the property value.

- If a property is linked to multiple target dashboards, a few factors determine which dashboard are opened when you click on the property value; see :ref:`click-on-link`.

- If your organization has the permissions feature available, you can define or remove local data links only if you have write permissions for the source dashboard. However, you don't need write permissions for the target dashboard. To learn more, see :ref:`about-permissions`.

- You must be an administrator to define or remove global data links. However, anyone can view the list of existing global data links.

- If you create a link from a location other than a chart, such as from a navigator or an alert message, you can only create a global data link.

|br|
