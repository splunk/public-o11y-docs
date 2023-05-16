.. _jira:

****************************************************************************
Send alert notifications to Jira using Splunk Observability Cloud
****************************************************************************

.. meta::
   :description: Configure Observability Cloud to send alerts to Jira when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to Jira Cloud or Jira Server to 
create a new issue when a detector alert condition is met and add a comment to the issue when the alert clears.

To send Observability Cloud alert notifications to Jira, follow these configuration steps:

.. note:: You must be an Observability Cloud administrator to complete these steps.

* :ref:`jira1`
* :ref:`jira2`

.. _jira1:

Step 1: Create a Jira integration in Observability Cloud
=================================================================================

The alert notification that this integration sends to Jira can automatically set the following field values:

* Assignee

* Description

* Issue type

* Project

* Reporter

* Summary

If the Jira project you want to create issues in requires additional field values, you receive an error when you save 
the integration.

.. note:: You must be an Observability Cloud administrator to complete these tasks.

To create a Jira integration in Observability Cloud, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Jira guided setup <https://login.signalfx.com/#/integrations/jira>`. Optionally, you can navigate to the guided setup on your own: 

    #. In the left navigation menu, select :menuselection:`Data Management`.

    #. Select :guilabel:`Add Integration`.

    #. In the integration filter menu, select :menuselection:`All`.

   
    #. In the :guilabel:`Search` field, search for :guilabel:`Jira`, and select it.
    
    #. Select :guilabel:`New Integration` to display the configuration options.

#. By default, the name of the integration is :strong:`JIRA`. Give your integration a unique and descriptive name. For 
   information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`JIRA Base URL` field, enter the Jira server base URL. For example, enter a value that looks something 
   like this : ``https://YOUR-DOMAIN.atlassian.net`` or ``http://YOUR-HOSTNAME:PORT``.
#. If you want to create an integration with Jira Cloud, select :guilabel:`JIRA Cloud` and enter a Jira user email 
   address and API token. For information about how to create an Atlassian API token, see :new-page:`Manage API tokens for your Atlassian account <https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/>`.

   If you want to create an integration with Jira server, select :guilabel:`JIRA Server` and enter a Jira username and
   password.

   The user you associate with this integration must have Jira permissions to create issues, add comments, and browse
   projects. This user is the reporter on the Jira issues created by using this integration.

#. In :guilabel:`Select Project`, select the project you want the alert notifications to create issues in, and select
   :guilabel:`Apply`.

#. In :guilabel:`Select Issue Type`, select the issue type you want the alert notifications to create, and select 
   :guilabel:`Apply`.

   If necessary, you can create multiple integrations using other issue types. For example, you can use one integration 
   to create bug issues and another integration to create task issues.

#. In the :strong:`Assignee` field, enter the default assignee for the issues created by this integration. If your Jira 
   instance doesn't require an assignee value to create issues, you can leave this field blank.

   You can override this default by selecting a different alert recipient on the detector in :ref:`jira2`. This gives you 
   the flexibility to set a default assignee on the integration and selectively change the assignee for some detectors.

#. (Optional) Select :guilabel:`Create Test Issue` to test your integration. If the integration is working, it creates a 
   test Jira issue in the selected Jira project. After a short delay, the integration makes a comment on the same issue, 
   stating that the alert has cleared.

#. Select :guilabel:`Save`.

.. _jira2:

Step 2: Add a Jira integration as a detector alert recipient in Observability Cloud
=================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below 
  link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated.

To add a Jira integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Jira integration.

   For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`Jira` and then select the name of the Jira integration you want to use to send alert notifications. 
   This is the integration name you created in :ref:`jira1`.

#. If you set an assignee on the Jira integration, the assignee name displays. To overwrite the assignee or a blank 
   assignee set on the integration, select the assignee and enter a new assignee name.

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification that creates a Jira issue whenever the detector rule condition is 
met. It also adds a comment to that issue when the alert condition clears.
