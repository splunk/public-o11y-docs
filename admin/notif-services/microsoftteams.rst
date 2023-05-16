.. _microsoftteams:

********************************************************************************
Send alert notifications to Microsoft Teams using Splunk Observability Cloud
********************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to Microsoft Teams when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to a Microsoft Teams channel when a detector alert condition is met and when the alert clears.

To send Observability Cloud alert notifications to Microsoft Teams, complete the following configuration tasks:

* :ref:`microsoftteams1`

   You must be an owner or administrator of the Microsoft Team to complete this task.

* :ref:`microsoftteams2`

   You must be an Observability Cloud administrator to complete this task.

* :ref:`microsoftteams3`

For troubleshooting information, see :ref:`Troubleshooting Microsoft Teams<msteams-troubleshooting>`.

..
  what does the following note mean in the context of the tasks being discussed? Relevant or not?

Existing Office 365 integrations appear in Observability Cloud within the Microsoft Teams tile.


.. _microsoftteams1:

Step 1: Get the webhook URL for the Microsoft Team channel
=============================================================

You must be an owner or administrator of the Microsoft Team to complete this task.

To get the webhook URL for the Microsoft Team channel:

#. Log in to Microsoft Teams and navigate to the list of teams.

#. Select the team that contains the channel you want to send alert notifications to. Expand the list of channels.

#. Find and hover over the channel you want to send alert notifications to. Select :strong:`More options` (...) and then select :strong:`Connectors`.

#. Find the :strong:`Incoming Webhook` connector. Select :strong:`Add`. If the connector has already been added to the channel, select :strong:`Configure`.

#. Enter a descriptive name for the connector.

#. Select :strong:`Create`. Microsoft Teams generates a webhook URL.

#. Select the :strong:`Copy to Clipboard` icon to copy the webhook URL for use in :ref:`microsoftteams2`.

#. Select :strong:`Done`.


.. _microsoftteams2:

Step 2: Create a Microsoft Teams integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to complete this task.

To create a Microsoft Teams integration in Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Microsoft Teams guided setup <https://login.signalfx.com/#/integrations/office365>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Select :guilabel:`Add Integration`.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`Microsoft Teams`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. By default, the name of the integration is :strong:`Microsoft Teams`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`Webhook URL` field, paste the webhook URL you copied in :ref:`microsoftteams1`. The webhook URL looks similar to this: ``https://<tenantName>.webhook.office.com/webhook2/<GroupExternalObjectGuid>@<TenantExternalGuid>/<ProviderName>/<AlternateGuid>/<GroupOwnerExternalObjectGuid>``.
#. :strong:`Save`.
#. If Splunk Observability Cloud can validate the Microsoft Teams webhook URL, a :strong:`Validated!` success message displays. If an error displays instead, make sure that the webhook URL value you entered matches the value displayed in Microsoft Teams in :ref:`microsoftteams1`.


.. _microsoftteams3:

Step 3: Add a Microsoft Teams integration as a detector alert recipient in Observability Cloud
========================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add a Microsoft Teams integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Microsoft Teams integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`Microsoft Teams` and then select the name of the Microsoft Teams integration you want to use to sends alert notifications. This is the integration name you created in :ref:`microsoftteams2`.

#. Activate and save the detector.

Observability Cloud sends an alert notification to the Microsoft Teams channel when the detector triggers an alert and when the alert clears.


.. _msteams-troubleshooting:

Troubleshoot your Microsoft Teams notification service integration
=================================================================================================

If the Microsoft Teams channel stops receiving notifications, consider the following troubleshooting tips:

* Verify that the Microsoft Teams notification service integration in Observability Cloud still exists. To troubleshoot, complete the following steps. You must be an Observability Cloud administrator to complete these steps.

  #. In the Observability Cloud navigation menu, select :strong:`Data Management`.

  #. In the :strong:`CATEGORIES` menu, select :strong:`Notification Services`.

  #. Select the :strong:`Microsoft Teams` tile.

  #. Find your integration and select to expand it.

  #. Select the :strong:`Integrations` menu and select :strong:`Validate`. If you see an error message,  :strong:`Connector configuration not found`, then the :strong:`Incoming Webhook` connector was removed from the Microsoft Teams channel and you must add it back. To do this, see :ref:`microsoftteams2`.

* Verify that the Microsoft Teams notification service integration in Splunk Observability Cloud has not been changed to send alert notifications to a different Microsoft Teams channel.

* Verify that the Microsoft Teams notification service integration is still the alert recipient on the detector in Observability Cloud.

* Verify that the Observability Cloud detector's alert rules have not changed, causing it to send alert notifications for different reasons.
