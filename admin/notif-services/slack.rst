.. _slack:

*********************************************************************
Send alert notifications to Slack using Splunk Observability Cloud
*********************************************************************

.. meta::
      :description: Configure Splunk Observability Cloud to send alerts to Slack when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to Slack when a detector alert condition is met and when the alert clears.

To send Splunk Observability Cloud alert notifications to Slack, complete the following configuration tasks:

* :ref:`slack1`. You must be a Splunk Observability Cloud administrator, Slack administrator, and authorized to add apps to Slack to complete this task.

* :ref:`slack2`

.. caution:: If the user who creates the integration leaves your organization and their Slack account is deactivated, the Slack integration stops working.   

.. _slack1:

Step 1: Create a Slack integration in Splunk Observability Cloud
=================================================================================

You must be a Splunk Observability Cloud administrator, Slack administrator, and be authorized to add apps to Slack to complete this task.

This method of integrating with Slack replaces a prior design. Slack integrations created using the prior design display an option to upgrade in the Splunk Observability Cloud UI. While the prior design continues to work, upgrade your integrations to use the newer integration design. You must upgrade your integration if you want image previews to display when pasting a chart URL into Slack. To learn more, see :ref:`pasting-chart-url-into-slack`.

To create a Slack integration in Splunk Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Slack guided setup <https://login.signalfx.com/#/integrations/slack>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

   #. In the integration filter menu, select :guilabel:`All`.
 
   #. In the :guilabel:`Search` field, search for :guilabel:`Slack`, and select it.

#. Select :strong:`New Integration` to display the configuration options. If you get an error, you aren't authorized to add apps to Slack and aren't be able to create this integration. Contact your Slack administrator for help.

#. Review the permissions required by Slack and select :strong:`Authorize`.
#. By default, the name of the integration is :strong:`Slack`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. :strong:`Save`.

.. note::

   Splunk Observability Cloud uses the following Slack APIs: ``oauth.access``, ``conversations.list``, ``chat.postMessage``, and ``chat.unfurl``.

.. _slack2:

Step 2: Add a Slack integration as a detector alert recipient in Splunk Observability Cloud
=================================================================================================

To add a Slack integration as a detector alert recipient in Splunk Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Slack integration.

   For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`Slack` and then select the name of the Slack integration you want to use to send alert notifications. This is the integration name you created in :ref:`slack1`.

#. * For public Slack channels, enter the name of the channel you want to send the notifications to.
   
   * For private Slack channels, you must invite the :strong:`SignalFx` app to your channel:

     #. In Slack, navigate to the private channel you want to send notifications to.
     #. In the message field, enter the ``/invite @SignalFx, <YOUR_ORG_REALM>`` command. For example, ``/invite @SignalFx, US1``.

         .. note:: For US0 realm, the invitation command is ``/invite @SignalFx``.
    
     #. In the detector subscription configuration, enter the private channel name. Splunk Observability Cloud can't find and autocomplete private Slack channels, but you can still send notifications to them.

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to the Slack channel when an alert is triggered by the detector and when the alert clears.


