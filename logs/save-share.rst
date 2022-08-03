.. _logs-save-share:

*****************************************************************
Save and share Log Observer queries
*****************************************************************

.. meta created 2021-02-17
.. meta DOCS-1962

.. meta::
  :description: Save and share Log Observer queries

After you create useful queries in Log Observer, you can save them and share them
with team members as public queries. A saved query is made up of a filter and any aggregations or search-time rules you applied during the search. You can only save a query if you have created a filter. 

To learn how to create filters, see :ref:`logs-keyword`.
The default aggregation is All (*) logs grouped by Severity.
To learn how to create a unique aggregation, see :ref:`logs-aggregations`. To learn how to create search-time rules, see :ref:`logs-search-time-rules`.

All organizations have access to pre-defined queries for Kubernetes and
Cassandra. These queries appear at the beginning of the list of saved queries
and are a part of content packs. Content packs include pre-defined saved queries
as well as log processing rules. Splunk Observability Cloud
includes content packs for Kubernetes System Events and Cassandra.

Save a Log Observer query
----------------------------------------------------------------------------

To create a query, follow these steps:

#. In the control bar, click :guilabel:`+`, then enter a keyword.
#. To override the default aggregation, follow these steps:

   #. In the :guilabel:`Group by` text box, type the name of the field you want to group by.
   #. Using the calculation control, set calculation type you want.
   #. Using the calculation field control, set the field on which you want to do the calculation.
#. In the control bar, click the main menu icon and select :menuselection:`+ Save query` from the drop-down menu. The
   Save Query dialog box appears.
#. In the :guilabel:`Name` text box, enter a name for your query.
#. Optionally, you can describe the query in the :guilabel:`Description` text box.
#. Optionally, in the :guilabel:`Tags` text box, enter tags to help you and your team locate the query.
   Log Observer stores tags you've used before and auto-populates the :guilabel:`Tags` text box as you type.
#. To save this query as a public query, click :guilabel:`Filter sharing permissions set to public`.
   When you save a query as a public query, any user with access to Log Observer can view and delete it.

The following screenshot shows you the Save Query dialog box:

..  image:: /_images/logs/log-observer-save-query-save-box-screenshot.png
    :width: 99%
    :alt: Save query dialog box

Use saved Log Observer queries
----------------------------------------------------------------------------

You can view, share, set as default, or delete saved queries in the Saved Queries
catalog. The following screen shot shows you an example of a Saved Queries catalog:

..  image:: /_images/logs/log-observer-saved-queries-dialog-screenshot.png
    :width: 99%
    :alt: Saved queries catalog

To access the Saved Queries catalog, in the control bar click :guilabel:`Saved Queries`.

The following table lists the actions you can take in the Saved Queries catalog.

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Desired action`
     - :strong:`Procedure`
        
   * - Find a saved query
     - Type the name or tags for a saved filter into the search box.

   * - View or apply a saved query
     - Click :guilabel:`Apply` to the right of the query you want to view.

   * - Set a saved query as the default
     - Click the :guilabel:`menu` icon for the query, then select :menuselection:`Set as default query`.

   * - Change the current default saved query
     - Click the :guilabel:`menu` icon for the query, select :menuselection:`Unset as default query`, then set
       the new default query.

   * - Delete a saved query from your Saved Queries catalog
     - Click the :guilabel:`menu` icon for the query, then select :menuselection:`Delete query`.

.. note:: If you set a saved query as default, when you open Log Observer it displays the result of
   that query.
