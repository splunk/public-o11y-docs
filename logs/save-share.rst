.. _logs-save-share:

*****************************************************************
Save and share Log Observer queries
*****************************************************************

.. meta::
  :description: Collaborate with team members by sharing Log Observer or Log Observer Connect queries. Saved queries include filters, aggregations, and search-time rules.

.. include:: /_includes/log-observer-transition.rst

After you create useful queries in Log Observer, you can save them and share them with team members. You can only save or share queries on the :guilabel:`Observability Cloud data` index. A saved query is made up of a filter and any aggregations or search-time rules you applied during the search. You can only save a query if you have created a filter. Only customers with a Splunk Log Observer entitlement in Splunk Observability Cloud can save and share Log Observer queries.

To learn how to create filters, see :ref:`logs-keyword`.
Log Observer Connect has no default aggregation. Log Observer defaults to :guilabel:`All (*)`` logs grouped by :guilabel:`Severity`. To learn how to create a unique aggregation, see :ref:`logs-aggregations`. To learn how to create search-time rules, see :ref:`logs-search-time-rules`.

.. note:: 
   All organizations have access to pre-defined queries for Kubernetes and Cassandra. These queries appear at the beginning of the list of saved queries and are a part of content packs. Content packs include pre-defined saved queries as well as log processing rules. Splunk Observability Cloud includes content packs for Kubernetes System Events and Cassandra.

You can also download the results of a query as a CSV or JSON file. See :ref:`exportCSV` to learn how.

Prerequisites
================================================================================
To save and share Log Observer queries, you must have an administrator or power user role.


Save a Log Observer query
================================================================================

To create a query, follow these steps:

#. In the control bar, select the desired time increment from the time picker, then in the :guilabel:`Index` field, select :guilabel:`Observability Cloud data`. Select :guilabel:`Add Filter`, then enter a keyword or field.

#. To override the default aggregation, follow these steps:

   #. Using the calculation control, set the calculation type you want from the list. The default is :guilabel:`Count`.
   #. Select the field that you want to aggregate by.
   #. In the :guilabel:`Group by` text box, enter the name of the field you want to group by.
   #. Select :guilabel:`Apply`.
#. Select the :guilabel:`Save` menu icon, then select :guilabel:`Save Query` from the list. 
   The Save Query dialog box appears.
#. In the :guilabel:`Name` text box, enter a name for your query.
#. Optionally, you can describe the query in the :guilabel:`Description` text box.
#. Optionally, in the :guilabel:`Tags` text box, enter tags to help you and your team locate the query.
   Log Observer stores tags you've used before and auto-populates the :guilabel:`Tags` text box.
#. To save this query as a public query, select :guilabel:`Filter sharing permissions set to public`.
   When you save a query as a public query, any user in your organization can view and delete it in Log Observer.


Use Log Observer saved queries
================================================================================

You can view, share, set as default, or delete saved queries in the Saved Queries
catalog. To access the Saved Queries catalog, in the control bar enter :guilabel:`Saved Queries`.

The following table lists the actions you can take in the Saved Queries catalog.

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Desired action`
     - :strong:`Procedure`
        
   * - Find a saved query
     - Enter the name or tags for a saved filter into the search box.

   * - View or apply a saved query
     - Select :guilabel:`Apply` next to the query you want to view.

   * - Set a saved query as the default
     - Select the :guilabel:`More` icon for the query, then select :menuselection:`Make default query on page load`.

   * - Change the current default saved query
     - Select the :guilabel:`More` icon for the query, then select :menuselection:`Unset as default query`, then select :guilabel:`Confirm`. Next, set the new default query.

   * - Delete a saved query from your Saved Queries catalog
     - Select the :guilabel:`More` icon for the query, then select :menuselection:`Delete Query`.

.. note:: If you set a saved query as default, when you open Log Observer, it displays the result of
   that query.

.. _exportCSV:

Export query results as a CSV or JSON file
================================================================================

You can download a maximum of 10,000 logs at a time, even if your query returned more than 10,000 logs. 

To export query results, follow these steps:

1. Click :strong:`Download` at the top of the Logs table.

2. Enter a name for your file.

3. Select :strong:`CSV` or :strong:`JSON`. 

4. Click :strong:`Download`.