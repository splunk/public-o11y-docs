.. _mpm-rule-routing:

*******************************************************************************
Use data routing to keep, archive, or discard your metrics
*******************************************************************************

.. meta::
  :description: Learn how to improve your storage usage by routing less-important MTS to archived storage or discarding MTS.

|hr|

:strong:`Available in Enterprise Edition`. For more information, see :ref:`sd-subscriptions`.

|hr|

Use data routing to choose how to ingest and store all the metric time series (MTS) that have the same metric. Routing options include to keep metrics in real-time, archive them, or drop them altogether. 

Routing exception rules let you modify the behavior of data routing. See :ref:`<mpm-rule-routing-exception>`.

.. _mpm-rule-routing-view:  

Use data routing rules to define how to store your metrics
===============================================================================

.. note:: All roles can view data routing. You must have the admin user role to edit default routing. For more information, see :ref:`roles-and-capabilities`.

Routing rule options
--------------------------------------------------------------------------------

You have the following options to route your MTS:

* Ingest and keep metrics real-time (default). Metrics stored in the real-time tier are available in charts and detectors.
* Send your data to archived metrics. Archived metrics are not available in charts and detectors. You can change routing to real time or filter a subset of data to real time to make those metrics available in charts and detectors again. You can restore archived data from up to 8 days ago in case you need it.
* Drop your metrics. If you select this option, metrics are dropped and aren't available for monitoring. You can still keep aggregated MTS derived from those metrics.

.. note:: You cannot archive histogram metrics.

Edit the routing rule for a metric
-----------------------------------------------------------------------

To edit the routing rules for a metric and its MTS, follow these steps:

#. Access your Splunk Observability Cloud account.
#. In the left navigation menu, select :guilabel:`Settings > Metrics Pipeline Management` to access the landing screen with a list of all your metrics and a summary of their rulesets. 
#. Select or search for a metric to access the metric's summary page.
#. From a metric's summary screen, select :guilabel:`Edit` next to the :guilabel:`Ingestion tile`.
#. In the :guilabel:`Update data routing` dialog, select the radio button next to the new routing option you want to set.
#. The system returns to the summary page for the metric. At the top of the page, the system displays a notification about the update:

  * If the update is successful, the notification is highlighted in green. The text confirms that the routing for the metric is updated.
  * If the update isn't applied, the notification is highlighted in red. The text displays the reason that the update wasn't applied.

.. _mpm-rule-routing-exception:

Use routing exception rules to route a specific MTS or restore archived data
===============================================================================

.. note:: You must have the admin or power user role to create or edit an exception rule. For more information, see :ref:`roles-and-capabilities`.

Use routing exception rules to override archiving selected metrics and their associated MTS. 

Routing exception rules allow you to:

* Change the destination for an MTS.
* Restore historical archived MTS to real-time storage. You can restore up to 8 days of archived data. 

Note that if you create different routing exception rules with the same filters, MPM will not duplicate any MTS. If you decide to send those MTS to real time monitoring, MPM only restores the data points for those MTS once.

.. _mpm-rule-routing-exception-options:

Routing exception rule options
--------------------------------------------------------------------------------

Routing exception rules have the following options:

.. list-table::
  :header-rows: 1
  :widths: 40 40 20

  * - :strong:`Field`
    - :strong:`Description`
    - :strong:`Required?`
  
  * - :guilabel:`Rule name and description`
    - Custom name for the new routing exception rule. 
    - Yes
  
  * - :guilabel:`Filter MTS population for real-time monitoring`
    - Metrics pipeline management routes the population of MTS that match these dimensions to real time instead of archiving them.
    - Yes
    
  * - :guilabel:`Restore archived MTS from filtered population`
    - The time period before the current time where you want to restore historical archived MTS to real-time storage. When you add or reactivate a rule, if you make any changes to the dimensions, you can set a new restoration window.
    - No

Add a routing exception rule
--------------------------------------------------------------------------------

Add a routing exception rule to override the default routing for MTS associated with a metric.

To add the rule, follow these steps:

#. Access your Splunk Observability Cloud account.
#. In the left navigation menu, select :guilabel:`Settings > Metrics Pipeline Management` to access the landing screen with a list of all your metrics and a summary of their rulesets. 
#. Select or search for a metric to access the metric's summary page.
#. From a metric's summary screen, select :guilabel:`Add (+)` icon in the :guilabel:`Routing exceptions` tile.
#. In the :guilabel:`Create routing exception rule` dialog, complete the options. See :ref:`mpm-rule-routing-exception-options`.
#. The system returns to the summary page for the metric. Check the status column to verify the routing exception has been added successfully.

Edit a routing exception rule
--------------------------------------------------------------------------------

.. note:: To change the restoration time period, deactivate the routing exception rule, and then reactivate it and choose a new time window.

To edit an existing routing exception rule, perform the following steps:

#. Access your Splunk Observability Cloud account.
#. In the left navigation menu, select :guilabel:`Settings > Metrics Pipeline Management` to access the landing screen with a list of all your metrics and a summary of their rulesets. 
#. Select or search for a metric to access the metric's summary page.
#. From the list of rules, find the one you want to change, then select :guilabel:`Edit` in the :guilabel:`More actions (⋮)` menu.
#. In the dialog, update the routing exception settings you want to change, and select :guilabel:`Update`. See :ref:`mpm-rule-routing-exception-options`.

Activate or deactivate a routing exception rule
--------------------------------------------------------------------------------

.. caution:: 
  
  Activating a routing exception rule might move archived MTS to real-time storage and your usage will most likely increase.
  
  Deactivating a routing exception rule makes real-time data for those MTS unavailable. Historical data already routed to real-time metrics is not modified and stays in charts.  

To activate or deactivate a routing exception rule, follow these steps:

#. Access your Splunk Observability Cloud account.
#. In the left navigation menu, select :guilabel:`Settings > Metrics Pipeline Management` to access the landing screen with a list of all your metrics and a summary of their rulesets. 
#. Select or search for a metric to access the metric's summary page.
#. In the list of rules, find the rule. If it was deactivated, its status is :guilabel:`Inactive`.
#. In the :guilabel:`More actions (⋮)` menu, select :guilabel:`Activate` or Deactivate, and confirm. 

  * If activating the exception rule moves MTS from archived to real-time storage, metrics 

  * The dialog also lets you choose the amount of historical archived MTS to restore.

Delete a routing exception rule
--------------------------------------------------------------------------------

.. caution:: When you delete a routing exception rule, the related MTS are no longer routed to real-time metrics. As a result, charts and detectors that depend on the MTS stop working.

To delete a routing exception rule, follow these steps:

#. Access your Splunk Observability Cloud account.
#. In the left navigation menu, select :guilabel:`Settings > Metrics Pipeline Management` to access the landing screen with a list of all your metrics and a summary of their rulesets. 
#. Select or search for a metric to access the metric's summary page.
#. In the list of rules, find the rule you want to delete.
#. In the :guilabel:`More actions (⋮)` menu, select :guilabel:`Delete` and confirm. 

Extrapolate data in charts and dashboards
===============================================================================

During and after restoring data, you might see horizontal lines going across the empty part of the chart and connecting data points. The straight lines on the chart are an extrapolation that connects 2 existing data points. They correspond to the archived data that was not restored because they were not included in the exception rule. 

You can set the extrapolation policy in the Configure Plot setting to either :guilabel:`Last Value` or :guilabel:`Zero`, which changes the straight lines into a horizontal 1 or 0.
