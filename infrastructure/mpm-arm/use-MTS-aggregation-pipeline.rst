:orphan:

.. include:: /_includes/mpm-arm/mpm-arm-preview-header.rst

.. _use-MTS-aggregation-pipeline-arm:

*******************************************************************************
Control your data ingestion volume with aggregation rules
*******************************************************************************

.. meta::
    :description: Learn how to create aggregation rules in metrics pipeline management.

|hr|

:strong:`Available in Enterprise Edition`

|hr|


For each metric time series (MTS) that Splunk Observability Cloud creates from ingested data, you can create
aggregation to control ingestion and storage volume.

.. _view-existing-aggregation-rule-arm:

View existing aggregation rules
===============================================================================

.. note:: All roles can view aggregation rules.

To view existing aggregation rules for a metric, follow these steps:

#. From the landing page of Splunk Observability Cloud, select the :menuselection:`Metrics pipeline management` menu item.
   The :guilabel:`Metrics pipeline management` landing page appears.
#. If data routing and aggregation rules already exist, this page displays the information for all metrics in
   metrics pipeline management, including the aggregation and routing exception rules and the current data routing
   for the MTS associated with each metric.

   If you don't see a list, then you don't yet have any rules configured for your organization. Data routing is set to
   real-time storage for all MTS.

   If you have the Admin or Power user role, you also see the Action menu (|verticaldots|) icon.

   If you don't see a list, and you want to add an aggregation rule, follow the steps in the :ref:`create-aggregation-rule-arm` section.
#. To find a metric in the list, go to the search box and start entering the name of the metric. The system starts
   displaying matching metric names, using autocomplete.
#. When you see the metric you want, select it from the list of metric names. The summary page for the metric appears.

.. _create-aggregation-rule-arm:

Create aggregation rules for MTS
===============================================================================

.. note:: To create an aggregation rule, you must have the Admin or Power user role.

The option to discard raw MTS after creating an aggregation rule is now a data routing option.
To learn more, see the :ref:`drop-raw-MTS-arm` section in the
:strong:`Control metric time series (MTS) storage overhead with data routing` topic.

To create aggregation rules for MTS associated with a metric, follow these steps:

#. From the landing page of Splunk Observability Cloud, select the :menuselection:`Metrics pipeline management` menu item.
   The :guilabel:`Metrics pipeline management` landing page appears. If data routing and aggregation rules for metrics
   already exist, this page displays the information for each metric, including the aggregation and routing exception
   rules and the current data routing for the MTS associated with the metric. If you don't see a list, then you don't
   yet have any metrics pipeline management settings in your organization.
#. Select :guilabel:`Choose a metric`. The metric selection dialog appears.
#. Start entering the name of a metric. The system uses autosuggest to display metric names that match.

   .. note:: Metrics ingested through the ``https://ingest.signalfx.com/v1/collectd`` endpoint might appear in your search, but metrics pipeline management is not available for those metrics.

   If more than one metric name matches, select the name you want from the list.
#. To continue, select :guilabel:`Choose`. The summary page for the metric appears.
#. To create an aggregation rule for the MTS associated with a metric, in the :guilabel:`Added by rule` box select :guilabel:`Add`. The :guilabel:`Create aggregation rule` dialog appears.
#. To create an aggregation rule, enter the following values:

      .. list-table::
         :widths: 30 40 30
         :header-rows: 1

        * - :strong:`Field`
          - :strong:`Description`
          - :strong:`Required?`
        * - :guilabel:`Rule name`
          - Custom name for the new aggregation rule. Metrics pipeline management populates the field with a suggested name.
          - No
        * - MTS volume
          - A combination display and selection area. The :guilabel:`Raw MTS` value is the number of raw incoming MTS
            associated with the metric you chose. :guilabel:`Show filter` controls the display of a search box. To
            search for MTS you want to aggregate, select :guilabel:`Show filter` to display the search box, then enter one or dimensions to search for.
            The search result is a population of MTS. The aggregation rule applies to all MTS in the population.
          - Yes
        * - Dimensions for the aggregated MTS
          - Select :menuselection:`Keep` or :menuselection:`Drop` from the list, then enter the dimensions you want to keep in the aggregated MTS or
            drop from the aggregated MTS. If you don't enter any dimensions, the aggregation rule has no effect, because it doesn't aggregate anything.
          - No.
        * - New metric name
          - New metric name in the MTS that aggregation creates. Metrics pipeline management populates the field with a suggested name.
          - Yes

#. Select :guilabel:`Create`. The metrics summary page appears, and the system displays a notification that the operation succeeded.

To add another aggregation rule, in the :guilabel:`Added by rule` box select :guilabel:`Add`, then following the previous directions.

.. _manage-aggregation-rules-arm:

Edit, activate, deactivate, and delete aggregation rules
===============================================================================

.. note:: Roles for aggregation rule tasks:

   - To delete an aggregation role, you must have the Admin role.
   - To edit, activate, or deactivate an aggregation rule, you must have the Admin or Power user role.

To edit, deactivate, activate, or delete an aggregation rule, follow these steps:

#. If you're not already viewing the opening page for :guilabel:`Metrics pipeline management`, from the landing page of Splunk Observability Cloud,
   select the :menuselection:`Metrics pipeline management` menu item. The :guilabel:`Metrics pipeline management` landing page appears.
#. Select :guilabel:`Choose a metric`. The metric selection dialog appears.
#. Start entering the name of a metric. The system uses autosuggest to display metric names that match.
#. If more than one metric name matches, select the name you want from the list.
#. To continue, select :guilabel:`Choose`. The summary page for the metric appears.
#. From the list of aggregation rules for the metric in the center of the page, find the rule you want to modify.
#. From the :guilabel:`More actions` (|verticaldots| icon) menu for the rule, select the option you want:

   - To edit an existing rule, select :guilabel:`Edit`. The :guilabel:`Edit aggregation rule` dialog appears. To continue, follow the steps shown in the :ref:`edit-aggregation-rule-arm` section.
   - If the rule is deactivated, select :guilabel:`Activate` to activate the rule. The :guilabel:`Activate aggregation rule` dialog appears. To continue, follow the steps shown in the :ref:`activate-aggregation-rule-arm` section.
   - If the rule is activated, select :guilabel:`Deactivate` to deactivate the rule. The :guilabel:`Deactivate aggregation rule` dialog appears. To continue, follow the steps shown in the :ref:`deactivate-aggregation-rule-arm` section.
   - To delete the rule, select :guilabel:`Delete`. The :guilabel:`Delete activation rule` dialog appears. To continue, follow the steps shown in the :ref:`delete-aggregation-rule-arm` section.

.. _edit-aggregation-rule-arm:

Edit an aggregation rule
--------------------------------------------------------------------------------

To edit an aggregation rule, perform the following steps:

#. If you haven't done so already, navigate to the summary page for the metric.
#. In the list of rules, find the rule you want to edit, then select :menuselection:`Edit` from the :guilabel:`More actions` (|verticaldots| icon)
   menu.
#. In the :guilabel:`Edit aggregation rule` dialog, update the settings you want to change. You can't change
   the aggregation rule name or the new metric name:

   .. list-table::
      :header-rows: 1
      :widths: 30 40 30

      * - :strong:`Field`
        - :strong:`Description`
        - :strong:`Required?`
      * - :guilabel:`Rule name`
        - :strong:`Read-only`: The name of the existing aggregation rule.
        - Yes
      * - :guilabel:`MTS volume`
        - A combination display and selection area. The :guilabel:`Raw MTS` value is the number of raw incoming MTS
          associated with the metric you chose. :guilabel:`Show filter` controls the display of a search box. To
          change the population of MTS you want to aggregate, select :guilabel:`Show filter` to display the search box,
          then enter one or dimensions to search for. The search result is a population of MTS. The aggregation rule
          applies to all MTS in the population.
        - No
      * - :guilabel:`Dimensions for the aggregated MTS`
        - The text box displays the dimensions you've set for the existing rule. To delete a dimension in the existing rule, select
          :guilabel:`Delete` (|delete|). Select :menuselection:`Keep` or
          :menuselection:`Drop` from the list, then enter more dimensions you want to keep in the aggregated MTS or
          drop from the aggregated MTS. If you don't enter any dimensions, the aggregation rule has no effect, because it doesn't aggregate anything.
        - No
      * - :guilabel:`New metric name`
        - :strong:`Read-only`: The metric name in the MTS that aggregation is creating based on this rule.
        - No
#. When you're finished entering your changes, select :guilabel:`Update`.
#. The system displays the summary page for the metric, and a notification appears:

   - If your change is successful, the notification is highlighted in green. The text confirms your update.
   - If your change is unsuccessful, the notification is highlighted in red. The text displays the reason that the update was unsuccessful.

.. _activate-aggregation-rule-arm:

Activate an aggregation rule
--------------------------------------------------------------------------------

.. note:: Activating an aggregation rule has no effect on the MTS created by the rule.

Activating a rule might cause metrics pipeline management to move some MTS from archived storage to real-time storage.
When this movement happens, you usually incur an additional cost. Metrics pipeline management displays an
information dialog that prompts you to confirm the activation.

To activate a deactivated aggregation rule, follow these steps:

#. If you haven't done so already, navigate to the summary page for the metric.
#. In the list of rules, find the rule. If it was deactivated, its status is :guilabel:`Inactive`.
#. Select :menuselection:`Activate` from the :guilabel:`More actions` (|verticaldots| icon) menu.

   If activating the aggregation moves MTS from archived to real-time storage, metrics pipeline management displays
   an information dialog that prompts you for confirmation.
#. To confirm you want to activate the rule, select :guilabel:`Activate`.
#. The system displays the summary page for the metric, and a notification appears:

   - If the activation is successful, the notification is highlighted in green. The text confirms the activation.
   - If the activation is unsuccessful, the notification is highlighted in red. The text displays the reason that the activation was unsuccessful.

.. _deactivate-aggregation-rule-arm:

Deactivate an aggregation rule
--------------------------------------------------------------------------------

.. note:: Deactivating an aggregation rule has no effect on the MTS created by the rule. These MTS still exist, but they
   longer receive new data points.

When you deactivate an aggregation rule, you stop the creation of new aggregated MTS for the new metric and dimensions specified in the
rule, and the behavior changes for charts and detectors that use the aggregated MTS. Charts display existing aggregated MTS, but new
aggregated MTS no longer appear. Detectors that monitor the MTS no longer detect anomalies in new aggregated MTS.
Metrics pipeline management displays a information dialog that prompts you to confirm the deactivation.

To deactivate an active aggregation rule, follow these steps:

#. If you haven't done so already, navigate to the summary page for the metric.
#. In the list of rules, find the rule. If it was activated, its status is :guilabel:`Active`.
#. Select :menuselection:`Deactivate` from the :guilabel:`More actions` (|verticaldots| icon) menu.

   Metrics pipeline management might display a confirmation dialog. Deactivating the rule stops the creation of new
   MTS, and the dialog displays a list of the affected charts and detectors.
#. To confirm you want to deactivate the rule, select :guilabel:`Deactivate`.
#. The system displays the summary page for the metric, and a notification appears:

   - If the deactivation is successful, the notification is highlighted in green. The text confirms the deactivation.
   - If the deactivation is unsuccessful, the notification is highlighted in red. The text displays the reason that the deactivation was unsuccessful.

.. _delete-aggregation-rule-arm:

Delete an aggregation rule
--------------------------------------------------------------------------------

.. note:: Deleting an aggregation rule doesn't delete existing MTS created by the rule.

When you delete an aggregation rule, you completely remove it from metrics pipeline management. Charts stop displaying the MTS, and detectors
that monitor the MTS no longer detect anomalies. The only way you can restore a deleted aggregation rule is to add it
again.
To deactivate an active aggregation rule, follow these steps:

#. If you haven't done so already, navigate to the summary page for the metric.
#. In the list of rules, find the rule, then select :menuselection:`Delete` from the :guilabel:`More actions` (|verticaldots| icon)
   menu.

   Metrics pipeline management displays a confirmation dialog, reminding you that you can't restore deleted rules.
#. To confirm you want to delete the rule, select :guilabel:`Delete`.
#. The system displays the summary page for the metric, and a notification appears:

#. After you finish the deactivation, the system displays the summary page for the metric, and a notification appears:

   - If the deletion is successful, the notification is highlighted in green. The text confirms the deletion.
   - If the deletion is unsuccessful, the notification is highlighted in red. The text displays the reason that the deletion was unsuccessful.
