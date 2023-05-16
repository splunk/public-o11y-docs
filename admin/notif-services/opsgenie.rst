.. _opsgenie:

************************************************************************
Send alert notifications to Opsgenie using Splunk Observability Cloud
************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to Opsgenie when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to one or more Opsgenie teams when a detector alert condition is met and when the alert clears.

To send Observability Cloud alert notifications to Opsgenie, complete the following configuration tasks:

* :ref:`opsgenie1`

   You must be an Opsgenie account owner or administrator to complete this task. 

* :ref:`opsgenie2`

   You must be an Observability Cloud administrator to complete this task.

* :ref:`opsgenie3`


.. _opsgenie1:

Step 1: Create an Observability Cloud integration in OpsGenie
=================================================================================

You must be an Opsgenie account owner or administrator to complete these tasks.

To create an Observability Cloud integration in OpsGenie:

#. Log in to Opsgenie.

#. Determine whether you want to create an integration to one team or multiple teams. The option to create an integration to multiple teams is not available for all Opsgenie accounts.

   * If you want to create an integration to one Opsgenie team, access the :new-page:`Team Dashboard <https://app.opsgenie.com/teams>`. Select the team that you want to receive alert notifications from Observability Cloud. Select the :strong:`Integrations` tab and then select :strong:`Add Integration`.

   * If you want to create an integration to multiple Opsgenie teams, access the :new-page:`Integration list <https://app.opsgenie.com/integration#/integration-list>` page.

#. Find and hover over the :strong:`API` icon. Select :strong:`Add`.

#. Enter a descriptive name for the integration.

#. Copy the API key for use in :ref:`opsgenie2`.

#. Select :strong:`Save Integration`.


.. _opsgenie2:

Step 2: Create an Opsgenie integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to complete this task.

To create an Opsgenie integration in Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`OpsGenie guided setup <https://login.signalfx.com/#/integrations/opsgenie?search_pattern=opsge&category=all>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Select :guilabel:`Add Integration`.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`Opsgenie`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. Enter a name for the integration. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`Service Region` list, select your Opsgenie service region.
#. In the :strong:`Token` field, enter the token copied from Opsgenie in :ref:`opsgenie1`.
#. :strong:`Save`.
#. If Splunk Observability Cloud can validate the Opsgenie API key, a :strong:`Validated!` success message displays. If an error displays instead, make sure that the API key you entered matches the API key value displayed in Opsgenie in :ref:`opsgenie1`.


.. _opsgenie3:

Step 3: Add an Opsgenie integration as a detector alert recipient in Observability Cloud
=================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add an Opsgenie integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Opsgenie integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`Opsgenie` and then select the name of the Opsgenie integration you want use to send alert notifications. This is the integration name you created in :ref:`opsgenie2`.

   * If you select an integration that you set up for one Opsgenie team, alert notifications are sent to that team.

   * If you select an integration that you set up for multiple Opsgenie teams, you can do one of the following:

      * Select a specific team to send alert notifications to instead of having Opsgenie determine how to handle the notifications.

      * Select :strong:`(No team)` to indicate that you want Opsgenie to determine how to handle the notifications. Opsgenie handles the notifications based on settings associated with the API key you created in :ref:`opsgenie1`.

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to Opsgenie when the detector triggers an alert and when the alert clears.
