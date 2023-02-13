.. _link-metadata-to-content:

**************************************************************************************************************
Link metadata to related resources using global data links in Splunk Observability Cloud
**************************************************************************************************************

.. meta::
   :description: Link metadata to related resources in Splunk Observability Cloud by creating global data links. Global data links enable you to enrich charts and alert messages with links to useful contextual information.


Global data links enable you to link metadata displayed in Splunk Observability Cloud to the following relevant resources:

* Dashboards in Splunk Observability Cloud

* Splunk Cloud Platform and Splunk Enterprise

* Custom URLs

* Kibana logs

In Observability Cloud, metadata (data about your data) includes :ref:`dimensions <metadata-dimension>`, :ref:`properties <custom-properties>`, and :ref:`tags <metadata-tags>`. Metadata displays in the following locations in the product:

* Alerts

* Dashboards and Splunk Infrastructure Monitoring navigators. Specifically, metadata displays in the following locations:

   * List charts

   * Line charts

   * Area charts

   * Column charts

   * Data tables

* Splunk Application Performance Monitoring (APM). Specifically, metadata displays in the following locations:

   * Services

   * Traces

   * Spans

For example, here is a global data link displaying for a host property on a dashboard. The global data link leads to an :strong:`EC2 Cost and Usage` dashboard in Observability Cloud, where the dashboard will be automatically narrowed to show data relevant to the :strong:`server4` host only.

.. image:: /_images/admin/gdl-ec2-cost-and-usage.png
  :width: 100%
  :alt: This screenshot shows a data table displaying a global data link that leads to an EC2 Cost and Usage dashboard in Observability Cloud.

For more examples of global data links displayed in context, see :ref:`access-global-data-link`.

Global data links dynamically transfer contextual information about the metadata you’re viewing to the linked resource, helping you get to relevant information faster.

When you create a global data link, it is displayed wherever the designated metadata is visible in dashboards, Splunk Infrastructure Monitoring navigators, Splunk APM, and alert messages. All users who can see the metadata can see the global data link.

By contrast, when you create a local data link, it is only available on the dashboard or navigator you created it on. All users who can see the metadata can see the local data link. For more information about local data links, see :ref:`navigate-with-data-links`.


Prerequisite
================

You must be an administrator to create global data links.

For information about granting administrative access, see :ref:`manage_admin-access`.


.. _create-global-data-link:

Create a global data link
==============================

This procedure describes how to create a global data link for any available metadata using the Global Data Link page.

For information about how to create a global data link using the Observability Cloud API, see the :new-page:`Link Metadata to Related Content <https://dev.splunk.com/observability/docs/administration/datalinks/>` topic in the Observability Cloud Developer Guide.

For information about how to create a global data link specifically for Splunk APM properties, see :ref:`apm-create-data-links`.

#. Open the Observability Cloud navigation :strong:`Menu`.

#. Hover over :strong:`Data Configuration` and select :strong:`Global Data Links`.

#. Click :strong:`New Link`.

#. In the :strong:`Link Label` field, enter the text you want to display as the global data link text.

#. In the :strong:`Link to` field, select your link target type. Select from:

    - :strong:`Custom URL`: Select to link your global data link to a custom URL.

    - :strong:`Splunk`: Select to link your global data link to Splunk Cloud Platform or Splunk Enterprise.

    - :strong:`Splunk Observability Cloud Dashboard`: Select to link your global data link to a dashboard in Observability Cloud. Click :strong:`Choose Dashboard` to select the dashboard you want to link to.

    - :strong:`Kibana`: Select to link your global data link to a Kibana log.

#. In the :strong:`Show On` drop-down menu, select a value that indicates where you want the global data link to display.

    - :strong:`Any Metadata Value`: Select to display your global data link for any metadata value. This option isn't available if you set :strong:`Link to` to :strong:`Splunk Observability Cloud Dashboard`.

    - :strong:`Any Value of`: Select to display your global data link for any value of a specific piece of metadata.

      For example, select :strong:`Any Value of` and enter :strong:`aggregration_type` to display the global data link for any :strong:`aggregration_type` value.

    - :strong:`Property:Value Pair`: Select to display your global data link for a specific value of a specific piece of metadata.

      For example, select :strong:`Property:Value Pair` and enter :strong:`aggregration_type:average` to display the global data link only for an :strong:`aggregation_type` value of :strong:`average`.

#. If you want the global data link to display based on the :strong:`Show On` value and one or more additional conditions, click :strong:`Add Conditions`. If you define multiple conditions, all conditions must be met for the link to display.

    For details about how to use the :strong:`Any Value of` and :strong:`Property:Value Pair` options, see the previous step.

#. If you set :strong:`Link to` to :strong:`Custom URL`, :strong:`Splunk`, or :strong:`Kibana`, the :strong:`URL` field displays. Enter the URL you want the global data link to lead to.

    Optionally, for :strong:`Custom URL` and :strong:`Kibana` link target types, you can use any of the following variables in your URL. When a user clicks the global data link, the variables are replaced with actual values to render the destination URL.

    -  ``{{key}}``: Use this variable to populate the key name from the context where the link displays. For example, if you set :strong:`Show on` to :strong:`aggregation_type`, ``{{key}}`` is replaced with ``aggregation_type`` in the URL.

    -  ``{{value}}``: Use this variable to populate the key value from the context where the link displays. For example, if you set :strong:`Show on` to :strong:`aggregation_type` and the :strong:`aggregation_type` value in context is :strong:`average`, ``{{value}}`` is replaced with ``average`` in the URL.

    -  ``{{start_time}}``: Use this variable to populate the start time of the time window from the context where the link displays. The timestamp is inserted using the format you specify in the :strong:`Time Format` field.

    -  ``{{end_time}}``: Use this variable to populate the end time of the time window from the context where the link displays. The timestamp is inserted using the format you specify in the :strong:`Time Format` field.

    -  ``{{properties.<property_name>}}``: Use this variable to populate other metadata from the context where the link displays. For example, ``properties`` contains a map of the metadata key names and values that display in the context where the global data link will display. To insert a name and value from this map, use ``{{properties.<your_property_name>}}``. If your property name has a period in it, use square brackets around the value. For example, ``{{properties.[<property.name>]}}``.

#. If you selected a :strong:`Link to` value of :strong:`Custom URL` or :strong:`Kibana`, the :strong:`Time Format` field displays. Set this field value to specify the timestamp format used for the global data link's starting and ending timestamps. Setting this field value also helps ensure compatibility with the external system you are linking to. Select one of the following time formats:

    - :strong:`ISO 8601: YYYY-MM-DDThh:mm:ss.SSSZ`

    - :strong:`Unix Time: epoch milliseconds`

    - :strong:`Unix Time: epoch seconds`

#. If you selected a :strong:`Link to` value of :strong:`Custom URL`, :strong:`Splunk`, or :strong:`Kibana`, the :strong:`Minimum Time Window` field displays. The time window is the interval during which the chart, dashboard, service map, or trace data was captured. If this interval is shorter than the minimum time window value you select here, the global data link adjusts the start time to an earlier time so the interval is as long as the minimum time window.

#. If you selected a :strong:`Link to` value of :strong:`Custom URL`, :strong:`Splunk`, or :strong:`Kibana`, the :strong:`Property mapping` options display. Use property mapping if your :strong:`URL` value contains Observability Cloud key names and values that are referred to differently in the external system you're linking to.

    For example, you can use property mapping to map an Observability Cloud key name, such as :strong:`host`, to an external system key name, such as :strong:`hostname`. You can also use property mapping to map an Observability key name, such as :strong:`host`, and key value, such as :strong:`west-internal-123456`, to an external system key name, such as :strong:`hostname`, and key value, such as :strong:`123456-west-int`.

    To use property mapping, select :strong:`Choose a Property` to select an Observability Cloud key name or key name and value pair. Then, enter the external key name or key name and value pair that you want to map to in the :strong:`External Term` field.

#. Click :strong:`Save`.

Alternatively, here are some other locations in Observability Cloud where you can access the ability to create global data links:

- When you view an alert message that includes data links, click the :guilabel:`More` menu (|more|) next to a data link and select :guilabel:`Configure data links`.

- When you are on a dashboard, select :guilabel:`Data Links` from the :guilabel:`Dashboard actions` menu. If there are existing global data links defined for your organization, you can see a message to that effect on the :strong:`Data Links` tab. Click :guilabel:`Global Data Links`.

- When you view a list in a Splunk Infrastructure Monitoring navigator, click the :guilabel:`Actions` menu for any property and select :guilabel:`Configure data links`.

- To create a global data link when you create a data link from a dashboard, select a scope of :guilabel:`Entire Organization`.


.. _example-global-data-link-config:

Example custom URL global data link configuration
-------------------------------------------------------

To help illustrate the impact of the field values you enter on the :guilabel:`Global Data Links` page, here's an example configuration for a global data link to a custom URL:

.. image:: /_images/admin/gdl-create.png
  :width: 100%
  :alt: This screenshot shows the :guilabel:`Global Data Links` page populated with field values to create a global data link to a custom URL.

This global data link displays for the :strong:`aggregation_type` metadata on a dashboard, as shown here:

.. image:: /_images/admin/gdl-aggregation_type.png
  :width: 100%
  :alt: This screenshot shows a global data link displaying in a chart's data table.

When a user clicks the global data link, the URL you defined on the :guilabel:`Global Data Links` page is rendered in real-time. For example, let's take this URL defined in this example:

``https://www.example.com/search/?field={{key}}&value={{value}}&service={{properties.unit}}&st={{start_time}}&et={{end_time}}``

When the user clicks the global data link for an :strong:`aggregation_type` metadata value of :strong:`total`, the URL is rendered as follows:

``https://www.example.com/search/?field=aggreg-type&value=ttl&service=Bytes&st=2021-09-02T01:13:30.000Z&et=2021-09-02T01:18:30.000Z``

For more global data link configuration examples, see the following topics. While these topics are written specific to Splunk APM properties, you can apply the guidance to any property.

- :ref:`apm-create-gdl-to-splunk`

- :ref:`apm-create-gdl-to-kibana`


.. _access-global-data-link:

Access :guilabel:`Global Data Links`
===================================================

After you've created a global data link, it displays for your specified metadata in any of the following relevant areas of Observability Cloud. While you must be an administrator to create a global data link, anyone can access the global data links you create.

- Data tables

  .. image:: /_images/admin/gdl-in-data-table.png
    :width: 100%
    :alt: This screenshot shows a global data link displayed in a data table.

  For information about data tables, see :ref:`show-data-table`.

- List charts

  .. image:: /_images/admin/gdl-in-list-chart.png
    :width: 100%
    :alt: This screenshot shows a global data link displayed in a list chart.

  For information about list charts, see :ref:`list-charts`.

- Alert messages

  .. image:: /_images/admin/gdl-in-alert.png
    :width: 100%
    :alt: This screenshot shows a global data link displayed in an alert message.

  For information about alerts, see :ref:`view-alerts`.

- Service names and trace IDs in Splunk Application Performance Monitoring (APM)

  .. image:: /_images/admin/gdl-in-apm.png
    :width: 100%
    :alt: This screenshot shows a global data link displayed for a trace ID in Splunk APM.

  For more information about accessing global data links in Splunk APM, see :ref:`apm-use-data-links`.


Next steps
===================================================

- To learn how to create global data links specifically for Splunk Application Performance Monitoring properties, see :ref:`apm-create-data-links`.

- To learn about how data links behave when multiple data links are available for a property, see :ref:`click-on-link`.
