:orphan:

.. include:: /_includes/mpm-arm/mpm-arm-preview-header.rst

.. _use-MTS-data-routing-pipeline-arm:

*******************************************************************************
Control metric time series (MTS) storage overhead with data routing
*******************************************************************************

.. meta::
    :description: Learn how to improve your storage usage by routing less-important MTS to archived storage or discarding MTS.

|hr|

:strong:`Available in Enterprise Edition`

|hr|

Use data routing to choose the storage location for all the metric time series (MTS) that have the same metric.
Data routing also lets you discard the MTS.

Routing exception rules let you modify the behavior of data routing.

.. _display-pipeline-information-arm:

View existing data routing for a metric
===============================================================================

.. note:: All roles can view data routing.

If the metric you want isn't visible, it doesn't yet have a metrics pipeline management ruleset.

To display the data routing ruleset for a metric, perform the following steps:

#. From the landing page of Splunk Observability Cloud, select :menuselection:`Settings`, then select :menuselection:`Metrics pipeline management`. The main :guilabel:`Metrics pipeline management` page appears.
#. If routing exception and aggregation rules already exist, this page displays aggregation and routing exception rules
   and their associated rulesets.

   If you don't see a list, then you don't yet have any rules configured for your organization. Data routing is set to
   real-time storage for all MTS.

   If you have the admin role, you also see the Action menu (|verticaldots|) icon.

   If you don't see a list, and you want to configure data routing for a metric, follow the steps in the
   :ref:`define-data-routing-arm` section.
#. To find a metric in the list, go to the search box and start entering the name of the metric. The system starts
   displaying matching metric names, using autocomplete.
#. When you see the metric you want, select it from the list of metric names. The summary page for the metric appears.

.. _define-data-routing-arm:

Define data routing for a metric
===============================================================================

.. note:: To complete this task, you must have the Admin role.

To update the data routing for MTS associated with a metric, follow these steps:

#. From the landing page of Splunk Observability Cloud, select :menuselection:`Settings`, then select :menuselection:`Metrics pipeline management`. The main :guilabel:`Metrics pipeline management` page appears.
#. If routing exception and aggregation rules already exist, this page displays aggregation and routing exception rules
   and their associated rulesets.

   If you don't see a list, then you don't yet have any rules configured for your organization. Data routing is set to
   real-time storage for all MTS.

 #. In the search bar, start entering the name of the metric associated with the MTS for which you want to update routing. The system displays
    a dialog with the title :guilabel:`Choose a metric` and a text box with the title :guilabel:`Search for a metric to create rules for`.

#. Start entering the name of a metric. The system uses autosuggest to display metric names that match. If more than one
   metric name matches, you see a list of the matches following the text box. To use one of these names, select it.

    .. note:: Metrics ingested through the ``https://ingest.signalfx.com/v1/collectd`` endpoint might appear, but metrics pipeline management is not available for those metrics.

#. To continue, select :guilabel:`Choose`. The summary page for the metric appears.
#. To select data routing for the metric, in the :guilabel:`Ingestion` box select :guilabel:`Edit`.
#. In the :guilabel:`Update data routing` dialog, select the radio button next to the new routing option.
   To confirm your choice, select :guilabel:`Update`.
#. The system returns to the summary page for the metric. At the top of the page, the system displays a notification about the update:

   - If the update is successful, the notification is highlighted in green. The text confirms that the routing for the metric is updated.
   - If the update isn't applied, the notification is highlighted in red. The text displays the reason that the update wasn't applied.

.. _manage-routing-exception-rules-arm:

Manage routing exception rules
===============================================================================

.. note:: To complete these tasks, you must have the Admin or Power role.

To override the data routing you've selected for a metric and its associated MTS, add routing exception rules. Besides
changing the destination for MTS, routing exception rules can restore historical archived MTS to real-time storage.
Rules also let you drop the incoming raw MTS from which you are creating aggregated MTS.

As with aggregation rules, you can deactivate, activate, and delete routing exception rules.

To learn more about dropping raw incoming MTS after creating an aggregation rule, see :ref:`drop-raw-MTS-arm`.

.. _add-routing-exception-rules-arm:

Add a routing exception rule
--------------------------------------------------------------------------------

Add a routing exception rule to override the default routing for MTS associated with a metric.

To add a routing exception rule for a metric and its associated MTS, follow these steps:

#. On the summary page for the metric, in the :guilabel:`Added by rule` box, select the :guilabel:`Add` (|add| icon) in the
   :guilabel:`Routing exceptions` cell.
#. In the :guilabel:`Create routing exception rule` dialog, enter the following information:

   .. list-table::
      :header-rows: 1
      :widths: 30 40 30

      * - :strong:`Field`
        - :strong:`Description`
        - :strong:`Required?`
      * - :guilabel:`Rule name`
        - Custom name for the new routing exception rule. Metrics pipeline management populates the field with a suggested name.
        - Yes
      * - :guilabel:`Dimensions of the MTS to route to real-time`
        - Metrics pipeline management routes the population of MTS that match these dimensions to real-time instead of their current default routing.
        - Yes
      * - :guilabel:`Period of previously archived MTS to restore`
        - The time period before the current time where you want to restore historical archived MTS to real-time storage.

          When you add a rule, if you make any changes to the dimensions, you can set a new restoration window.
        - No

   To confirm your choice, select :guilabel:`Create`.
#. The system returns to the summary page for the metric. At the top of the page, the system displays a notification about the update:

   - If adding the rule is successful, the notification is highlighted in green. The text confirms that the routing for the metric has been created.
   - If adding the rule wasn't successful, the notification is highlighted in red. The text displays the reason that the rule wasn't created.


.. _drop-raw-MTS-arm:

Drop raw incoming MTS using aggregation rules
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note:: To perform these tasks, you must have the following roles:

   * All roles can create an aggregation rule.
   * Permission to edit charts and detectors depend on the configuration of your organization.
     To learn more, see :new-page-ref:`about-permissions`.
   * To drop raw incoming MTS, you must have the Admin role.

When you create an aggregation rule for raw incoming MTS, you specify a new metric name and the dimensions you want to
keep. By default, metrics pipeline management routes the aggregated MTS to real-time storage. To drop the raw incoming
MTS for the aggregation rule, update metrics pipeline management to drop MTS for the original metric.

To drop raw incoming MTS, perform the following steps:

#. Create the aggregation rule for the aggregated MTS. To learn how, see :ref:`create-aggregation-rule-arm`. When you
   create the aggregation rule, you create a new metric name for the aggregated MTS.
#. View or download the list of charts and detectors that use the raw MTS associated with the original metric name.
   To learn how, see :ref:`view-metrics-usage-list-arm`.
#. Update the charts and detectors that were using the raw incoming MTS to use the aggregated MTS:

   * Charts:

     - On the :guilabel:`Plot Editor` page for each chart, replace the metric with the new metric name.
     - Add, edit, or delete the dimensions for which you want to display data.
     - Save and close the chart.

   * Detectors:

     - On the :guilabel:`Signals` page for each detector, replace the metric with the new metric name.
     - Add, edit, or delete the dimensions for the MTS you want the detector to monitor.
     - Save the detector.
#. Change the data routing for the original metric name so that metrics pipeline management drops the MTS associated
   with the metric. To learn how, see :ref:`define-data-routing-arm`.

Follow the instructions in the :ref:`define-data-routing-arm` section to send the aggregated MTS to archived storage.

.. _edit-routing-exception-rule-arm:

Edit a routing exception rule
--------------------------------------------------------------------------------

.. note:: To perform this task, you must have the Admin or Power user role

To edit an existing routing exception rule, perform the following steps:

#. From the landing page of Splunk Observability Cloud, go to :strong:`Settings > Metrics pipeline management`.
#. The opening page for :guilabel:`Metrics pipeline management` appears. This page displays metrics that have existing
   metrics pipeline management routing and rules, including aggregation and routing exception rules and the
   current data routing for the MTS associated with the metric.
#. From the list of metrics, select the metric for the exception rule you want to change. To search for the metric by
   name, enter characters in the search box. If more than one
   metric name matches, you see a list of the matches following the text box. To use one of these names, select it.

   .. note:: Metrics ingested through the ``https://ingest.signalfx.com/v1/collectd`` endpoint might appear, but metrics pipeline management is not available for those metrics.

   The summary page for the metric appears.
#. In the list of rules, find the exception rule you want to edit, then select :menuselection:`Edit`
   from the :guilabel:`More actions` (|verticaldots| icon) menu. The :guilabel:`Edit routing exception rule` dialog appears.
#. In the dialog, update the routing exception settings you want to change:

.. list-table::
   :header-rows: 1
   :widths: 30 40 30

   * - :strong:`Field`
     - :strong:`Description`
     - :strong:`Required?`
   * - :guilabel:`Rule name`
     - Custom name for the routing exception rule.
     - Yes
   * - :guilabel:`Dimensions of the MTS to route to real-time`
     - Metrics pipeline management routes the population of MTS that match these dimensions to real-time instead of their current default routing. Use this text box to add or delete dimensions.
     - Yes
   * - :guilabel:`Period of previously archived MTS to restore`
     - The time period before the current time where you want to restore historical archived MTS to real-time storage.

       When you edit a rule, the previous restoration time period appears, but when you make changes
       to the dimensions, you can set a new restoration time period.
     - No

#. From the More actions menu, select :guilabel:`Update`.
#. The system returns to the summary page for the metric. At the top of the page, the system displays a notification about the update:

   - If the update is successful, the notification is highlighted in green. The text confirms that the routing for the metric has been updated.
   - If the update isn't applied, the notification is highlighted in red. The text displays the reason that the update wasn't created.

.. _activate-routing-exception-rule-arm:

Activate a routing exception rule
--------------------------------------------------------------------------------

.. note:: To activate a routing exception rule, you need the Admin or Power user role.

.. note::
   * Activating a routing exception rule might move archived MTS to real-time storage. As a result of the change, you usually incur an additional cost.
   * Because activation changes the behavior of MTS, metrics pipeline management prompts you to confirm your change.

To activate a routing exception rule, follow these steps:

#. If you haven't done so already, navigate to the summary page for the metric.
#. In the list of rules, find the rule. If it was deactivated, its status is :guilabel:`Inactive`.
#. Select :menuselection:`Activate` from the :guilabel:`More actions` (|verticaldots| icon) menu.

   If activating the exception rule moves MTS from archived to real-time storage, metrics pipeline management displays
   an information dialog that prompts you for confirmation. The dialog also lets you choose the amount of historical
   archived MTS to restore.
#. To confirm you want to make the changes, select :guilabel:`Activate`.
#. The system displays the summary page for the metric, and a notification appears:

   - If the activation is successful, the notification is highlighted in green. The text confirms the activation.
   - If the activation is unsuccessful, the notification is highlighted in red. The text displays the reason that the activation was unsuccessful.

.. _deactivate-routing-exception-rule-arm:

Deactivate a routing exception rule
--------------------------------------------------------------------------------

.. note:: To activate a routing exception rule, you need the Admin or Power user role.

.. note::
   * Deactivating a routing exception rule might make some MTS unavailable.
   * Because deactivation changes the behavior of MTS, metrics pipeline management prompts you to confirm your change.

To deactivate a routing exception rule, follow these steps:

#. If you haven't done so already, navigate to the summary page for the metric.
#. In the list of rules, find the rule. If it's active, a numeric value appears in the :guilabel:`Real-time MTS added count` column.
#. Select :menuselection:`Deactivate` from the :guilabel:`More actions` (|verticaldots| icon) menu.

   If deactivating the exception rule changes the availability of MTS, metrics pipeline management displays
   an information dialog that prompts you for confirmation.
#. To confirm you want to make the changes, select :guilabel:`Deactivate`.
#. The system displays the summary page for the metric, and a notification appears:

   - If the deactivation is successful, the notification is highlighted in green. The text confirms the deactivation.
   - If the deactivation is unsuccessful, the notification is highlighted in red. The text displays the reason that the deactivation was unsuccessful.

.. _delete-routing-exception-rule-arm:

Delete a routing exception rule
--------------------------------------------------------------------------------

.. note:: To delete a routing exception rule, you need the Admin or Power user role.

.. note::
   * When you delete a routing exception rule, you delete the MTS that it creates. Charts and detectors that depend on the MTS stop working.
   * Because deleting the rule changes the behavior of MTS, metrics pipeline management prompts you to confirm your change.

To delete a routing exception rule, follow these steps:

#. If you haven't done so already, navigate to the summary page for the metric.
#. In the list of rules, find the rule.
#. Select :menuselection:`Delete` from the :guilabel:`More actions` (|verticaldots| icon) menu.

   Metrics pipeline management displays an information dialog with a reminder that you can't restore deleted rules. The
   dialog also lists the charts and detectors that depend on MTS created by the rule. The dialog prompts you to confirm
   the deletion.
#. To confirm you want to delete the rule, select :guilabel:`Delete`.
#. The system displays the summary page for the metric, and a notification appears:

   - If the deletion is successful, the notification is highlighted in green. The text confirms the deletion.
   - If the deletion is unsuccessful, the notification is highlighted in red. The text displays the reason that the deletion was unsuccessful.