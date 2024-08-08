.. _microsoftteams:

********************************************************************************
Send alert notifications to Microsoft Teams using Splunk Observability Cloud
********************************************************************************

.. meta::
      :description: Configure Splunk Observability Cloud to send alerts to Microsoft Teams when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to a Microsoft Teams channel when a detector alert condition is met and when the alert clears.

To send Splunk Observability Cloud alert notifications to Microsoft Teams, complete the following configuration tasks:

* :ref:`microsoftteams1`

   You must be an owner or administrator of the Microsoft Team to complete this task.

* :ref:`microsoftteams2`

   You must be a Splunk Observability Cloud administrator to complete this task.

* :ref:`microsoftteams3`

..
  what does the following note mean in the context of the tasks being discussed? Relevant or not?

Existing Office 365 integrations appear in Splunk Observability Cloud within the Microsoft Teams tile.


.. _microsoftteams1:

Step 1: Get the webhook URL for the Microsoft Team channel
=============================================================

You must be an owner or administrator of the Microsoft Team to complete this task.

To get the webhook POST URL for the Microsoft Team channel:

#. Log in to Microsoft Teams and navigate to the list of teams.

#. Select the team that contains the channel you want to send alert notifications to. Expand the list of channels.

#. Find and hover over the channel you want to send alert notifications to. Select :strong:`More options` (...) and then select :strong:`Workflows`.

#. Find and select the :strong:`Post to a channel when a webhook request is received` template.

#. Enter a descriptive name for the workflow.

#. Select :guilabel:`Next`.

#. Add a team and channel for your workflow.

#. Select :strong:`Add workflow`. Microsoft Teams generates a URL to make a POST request to.

#. Select the :strong:`Copy to Clipboard` icon to copy the webhook URL for use in :ref:`microsoftteams2`.

#. Select :strong:`Done`.


.. _microsoftteams2:

Step 2: Create a Microsoft Teams integration in Splunk Observability Cloud
=================================================================================

You must be a Splunk Observability Cloud administrator to complete this task.

To create a Microsoft Teams integration in Splunk Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Microsoft Teams guided setup <https://login.signalfx.com/#/integrations/office365>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`Microsoft Teams`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. By default, the name of the integration is :strong:`Microsoft Teams`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`Webhook URL` field, paste the webhook URL you copied in :ref:`microsoftteams1`. The webhook POST URL looks similar to this: ``https://<region>.logic.azure.com:<port>/workflows/<workflowId>/triggers/manual/paths/invoke?<apiVersion>&<signature>``.
#. :strong:`Save`.
#. If Splunk Observability Cloud can validate the Microsoft Teams webhook URL, a :strong:`Validated!` success message displays. If an error displays instead, make sure that the webhook URL value you entered matches the value displayed in Microsoft Teams in :ref:`microsoftteams1`.


.. _microsoftteams3:

Step 3: Add a Microsoft Teams integration as a detector alert recipient in Splunk Observability Cloud
========================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add a Microsoft Teams integration as a detector alert recipient in Splunk Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Microsoft Teams integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`Microsoft Teams` and then select the name of the Microsoft Teams integration you want to use to sends alert notifications. This is the integration name you created in :ref:`microsoftteams2`.

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to the Microsoft Teams channel when the detector triggers an alert and when the alert clears.


.. _update-msteams-365-connectors-retirement:

Update existing Microsoft Teams integration configurations for Office 365 connectors retirement
=================================================================================================

.. note:: After December 31, 2024, Office 365 connectors in Microsoft Teams will be retired. 

To continue using the Microsoft Teams integration in Splunk Observability Cloud without any interruption, follow these steps:

#.  Transition from Office 365 connectors to Workflows:

    #. In the Microsoft Teams Workflows app, select the :strong:`Create` tab.
    #. Find and select the :strong:`Post to a channel when a webhook request is received` template.
    #. Enter a descriptive name for the workflow.
    #. Add a team and channel for your workflow.
    #. Select :guilabel:`Add workflow`. Microsoft Teams generates a URL to make a POST request to.
    #. Select the :strong:`Copy to Clipboard` icon to copy the webhook POST URL.
    #. Select :guilabel:`Done`.

#. Edit existing Microsoft Teams integration configurations in Splunk Observability Cloud: 

    #. From the Splunk Observability Cloud home page, go to the :strong:`Data Management` page.
    #. Find the Microsoft Teams connection you want to edit.
    #. In the :guilabel:`Webhook URL` field, replace the existing URL with the webhook POST URL you copied from the Microsoft Teams Workflows app.
    #. Select :guilabel:`Save`.
