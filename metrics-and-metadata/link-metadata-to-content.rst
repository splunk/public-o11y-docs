.. _link-metadata-to-content:

**************************************************************************************************************
Link metadata to related resources using global data links 
**************************************************************************************************************

.. meta::
   :description: Link metadata to related resources in Splunk Observability Cloud by creating global data links. Global data links enable you to enrich charts and alert messages with links to useful contextual information.

Global data links let you link metadata displayed in Splunk Observability Cloud to the following relevant resources:

* Dashboards in Splunk Observability Cloud

* Navigators in Splunk Observability Cloud

* Splunk Cloud Platform and Splunk Enterprise

* Custom URLs

* Kibana logs

* Splunk RUM 

* Splunk AppDynamics tiers

In Splunk Observability Cloud, metadata (data about your data) includes :ref:`dimensions <metadata-dimension>`, :ref:`properties <custom-properties>`, and :ref:`tags <metadata-infra-tags>`. Metadata displays in the following locations in the product:

* Alerts

* Dashboards and Splunk Infrastructure Monitoring navigators, in the following locations:

  * List charts

  * Line charts

  * Area charts

  * Column charts

  * Data tables

* Splunk Application Performance Monitoring (APM), in the following locations:

  * Services

  * Traces

  * Spans

For example, here is a global data link displaying for a host property on a dashboard. The global data link leads to an :guilabel:`EC2 Cost and Usage` dashboard in Splunk Observability Cloud, where the system automatically narrows the dashboard to automatically show data that's relevant to the :guilabel:`server4` host.

.. image:: /_images/admin/gdl-ec2-cost-and-usage.png
  :width: 100%
  :alt: This screenshot shows a data table displaying a global data link that leads to an EC2 Cost and Usage dashboard in Splunk Observability Cloud.

For more examples of global data links displayed in context, see :ref:`access-global-data-link`.

Global data links dynamically transfer contextual information about the metadata you're viewing to the linked resource, helping you get to relevant information faster.

When you create a global data link, it appears wherever the designated metadata is visible in dashboards, Splunk Infrastructure Monitoring navigators, Splunk APM, and alert messages. All users who can see the metadata can see the global data link.

By contrast, when you create a local data link, it is only available on the dashboard or navigator you created it on. All users who can see the metadata can see the local data link. For more information about local data links, see :ref:`navigate-with-data-links`.


Prerequisite
================

You must be an administrator to create global data links.

For information about granting administrative access, see :ref:`admin-manage-users`.


.. _create-global-data-link:

Create a global data link
==============================

This procedure describes how to create a global data link for any available metadata using the Global Data Link page.

For information about how to create a global data link using the Splunk Observability Cloud API, see the :new-page:`Link Metadata to Related Content <https://dev.splunk.com/observability/docs/administration/datalinks/>` topic in the Splunk Observability Cloud Developer Guide.

For information about how to create a global data link for Splunk APM properties, see :ref:`apm-create-data-links`.

#. In the Splunk Observability Cloud main menu, select :guilabel:`Settings` then :guilabel:`Global Data Links`.

#. Select :guilabel:`New Link`.

#. In the :guilabel:`Link Label` field, enter the text you want to display as the global data link text.

#. In the :guilabel:`Link to` field, select your link target type. Select from the following targets for your global data link:

    - :guilabel:`Custom URL`: Links to a custom URL.

    - :guilabel:`Splunk`: Links to Splunk Cloud Platform or Splunk Enterprise.

    - :guilabel:`Splunk Observability Cloud Navigator`: Links to a navigator in Splunk Observability Cloud. Select :guilabel:`Choose Navigator` to select the navigator you want to link to.

    - :guilabel:`Splunk Observability Cloud Dashboard`: Links to a dashboard in Splunk Observability Cloud. Select :guilabel:`Choose Dashboard` to select the dashboard you want to link to.

    - :guilabel:`Kibana`: Links to a Kibana log.

    - :guilabel:`AppDynamics tier`: Links to a Splunk AppDynamics tier.

#. In the :guilabel:`Show On` list, select a value that indicates where you want the global data link to display:

    - :guilabel:`Any Metadata Value`: Display the link for any metadata value. This option isn't available if you set the :guilabel:`Link to` field to :guilabel:`Splunk Observability Cloud Dashboard`.

    - :guilabel:`Any Value of`: Display the link for any value of a specific piece of metadata.

      For example, select :guilabel:`Any Value of` and enter :guilabel:`aggregration_type` to display the link for any :guilabel:`aggregration_type` value.

    - :guilabel:`Property:Value Pair`: Display the link for a specific value of a specific piece of metadata.

      For example, select :guilabel:`Property:Value Pair` and enter :guilabel:`aggregration_type:average` to display the link only for an :guilabel:`aggregation_type` value of :guilabel:`average`.

    - :guilabel:`Inferred service`: Display the link for an inferred service. For more information on inferred services, see :ref:`apm-inferred-services`.

#. If you want the link to display based on the :guilabel:`Show On` value and one or more additional conditions, select :guilabel:`Add Conditions`. If you define multiple conditions, the link only displays if all the conditions are true.

    For details about how to use the :guilabel:`Any Value of` and :guilabel:`Property:Value Pair` options, see the previous step.

#. If you set the :guilabel:`Link to` field to :guilabel:`Custom URL`, :guilabel:`Splunk`, :guilabel:`Kibana`, or :guilabel:`AppDynamics tier`, the :guilabel:`URL` field displays. Enter the URL you want the global data link to lead to.
    For more information about the instructions and URL requirements for linking to a Splunk AppDynamics tier, see :ref:`apm-create-gdl-to-appd`.

    Optionally, for :guilabel:`Custom URL` and :guilabel:`Kibana` link target types, you can use any of the following placeholder variables in your URL. When you select the global data link, the system replaces the variables with actual values to create the destination URL.

    -  ``{{key}}``: Use this variable to populate the key name from the context where the link displays. For example, if you set :guilabel:`Show on` to :guilabel:`aggregation_type`, ``aggregation_type`` replaces ``{{key}}`` in the URL.

    -  ``{{value}}``: Use this variable to populate the key value from the context where the link displays. For example, if you set :guilabel:`Show on` to :guilabel:`aggregation_type` and the :guilabel:`aggregation_type` value in context is :guilabel:`average`,  ``average`` replaces ``{{value}}`` in the URL.

    -  ``{{start_time}}``: Use this variable to populate the start time of the time window from the context where the link displays. The system inserts the timestamp using the format you select in the :guilabel:`Time Format` field.

    -  ``{{end_time}}``: Use this variable to populate the end time of the time window from the context where the link displays. The system inserts the timestamp using the format you select in the :guilabel:`Time Format` field.

    -  ``{{properties.<property_name>}}``: Use this variable to populate other metadata from the context of the link display. For example, ``properties`` contains a map of the metadata key names and values that appear in the context of the global data link display. To insert a name and value from this map, use ``{{properties.<your_property_name>}}``. If your property name has a period in it, use square brackets around the value. For example, ``{{properties.[<property.name>]}}``.

#. If you select a :guilabel:`Link to` value of :guilabel:`Custom URL` or :guilabel:`Kibana`, the :guilabel:`Time Format` field appears. Set this field to select the timestamp format used for the global data link's starting and ending timestamps. Setting this field also helps ensure compatibility with the external system you are linking to. Select one of the following time formats:

    - :guilabel:`ISO 8601: YYYY-MM-DDThh:mm:ss.SSSZ`

    - :guilabel:`Unix Time: epoch milliseconds`

    - :guilabel:`Unix Time: epoch seconds`

#. If you select a :guilabel:`Link to` value of :guilabel:`Custom URL`, :guilabel:`Splunk`, or :guilabel:`Kibana`, the :guilabel:`Minimum Time Window` field appears. The time window is the interval during which the system captured the chart, dashboard, service map, or trace data. If this interval is shorter than the minimum time window value you select here, the global data link adjusts the start time to an earlier time so the interval is as long as the minimum time window.

#. If you select a :guilabel:`Link to` value of :guilabel:`Custom URL`, :guilabel:`Splunk`, or :guilabel:`Kibana`, the :guilabel:`Property mapping` options appear. Use property mapping if your :guilabel:`URL` value contains Splunk Observability Cloud key names and values that are referred to differently in the external system you're linking to.

    For example, you can use property mapping to map a Splunk Observability Cloud key name, such as :guilabel:`host`, to an external system key name, such as :guilabel:`hostname`. You can also use property mapping to map an Observability key name, such as :guilabel:`host`, and key value, such as :guilabel:`west-internal-123456`, to an external system key name, such as :guilabel:`hostname`, and key value, such as :guilabel:`123456-west-int`.

    To use property mapping, select :guilabel:`Choose a Property` to select a Splunk Observability Cloud key name or key name and value pair. Then, enter the external key name or key name and value pair that you want to map to in the :guilabel:`External Term` field.

#. Select :guilabel:`Save`.

Alternatively, here are some other locations in Splunk Observability Cloud where you can access the ability to create global data links:

- When you view an alert message that includes data links, select the :guilabel:`More` menu (|more|) next to a data link and select :guilabel:`Configure data links`.

- When you are on a dashboard, select :guilabel:`Data Links` from the :guilabel:`Dashboard actions` menu. If there are existing global data links defined for your organization, you can see a message to that effect on the :guilabel:`Data Links` tab. Select :guilabel:`Global Data Links`.

- When you view a list in a Splunk Infrastructure Monitoring navigator, select the :guilabel:`Actions` menu for any property and select :guilabel:`Configure data links`.

- When you view an inferred service on the APM :guilabel:`Service Map`, select the :guilabel:`(⋯)` menu next to the inferred service name. Then select :guilabel:`Configure data links`.

- To create a global data link when you create a data link from a dashboard, select a scope of :guilabel:`Entire Organization`.


.. _example-global-data-link-config:

Example custom URL global data link configuration
-------------------------------------------------------

To illustrate the field values you enter on the :guilabel:`Global Data Links` page, here's an example configuration for a global data link to a custom URL:

.. image:: /_images/admin/gdl-create.png
  :width: 100%
  :alt: This screenshot shows the :guilabel:`Global Data Links` page populated with field values to create a global data link to a custom URL.

This global data link displays for the :guilabel:`aggregation_type` metadata on a dashboard, as shown here:

.. image:: /_images/admin/gdl-aggregation_type.png
  :width: 100%
  :alt: This screenshot shows a global data link displaying in a chart's data table.

When you select the global data link, the URL you defined on the :guilabel:`Global Data Links` page immediately appears. For example, consider the URL defined in following example:

``https://www.example.com/search/?field={{key}}&value={{value}}&service={{properties.unit}}&st={{start_time}}&et={{end_time}}``

When you select the global data link for an :guilabel:`aggregation_type` metadata value of :guilabel:`total`, the URL appears in the following form:

``https://www.example.com/search/?field=aggreg-type&value=ttl&service=Bytes&st=2021-09-02T01:13:30.000Z&et=2021-09-02T01:18:30.000Z``

For more global data link configuration examples, see the following topics. While these topics are specific to Splunk APM properties, you can apply the guidance to any property:

- :ref:`apm-create-gdl-to-splunk`

- :ref:`apm-create-gdl-to-kibana`


.. _access-global-data-link:

Access global data links
===================================================

After you've created a global data link, it displays for your specified metadata in any of the following relevant areas of Splunk Observability Cloud. While you must be an administrator to create a global data link, anyone can access the global data links you create.

Data tables
--------------

  .. image:: /_images/admin/gdl-in-data-table.png
    :width: 100%
    :alt: This screenshot shows a global data link displayed in a data table.

  For information about data tables, see :ref:`show-data-table`.

List charts
-------------

  .. image:: /_images/admin/gdl-in-list-chart.png
    :width: 100%
    :alt: This screenshot shows a global data link displayed in a list chart.

  For information about list charts, see :ref:`list-charts`.

Alert messages
-----------------

  .. image:: /_images/admin/gdl-in-alert.png
    :width: 100%
    :alt: This screenshot shows a global data link displayed in an alert message.

  For information about alerts, see :ref:`view-alerts`.

Service names and trace IDs in Splunk Application Performance Monitoring (APM)
----------------------------------------------------------------------------------

  .. image:: /_images/admin/gdl-in-apm.png
    :width: 100%
    :alt: This screenshot shows a global data link displayed for a trace ID in Splunk APM.

  For more information about accessing global data links in Splunk APM, see :ref:`apm-use-data-links`.


Next steps
===================================================

- To learn how to create global data links for Splunk Application Performance Monitoring (APM) properties, see :ref:`apm-create-data-links`.
- To learn how data links behave when multiple data links are available for a property, see :ref:`click-on-link`.
