.. _pagerduty:

*************************************************************************
Send alert notifications to PagerDuty using Splunk Observability Cloud
*************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to PagerDuty when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to PagerDuty when a detector alert condition is met and when the alert clears.

To send Observability Cloud alert notifications to PagerDuty, complete the following configuration tasks:

* :ref:`pagerduty1`

  You must be a PagerDuty administrator to complete this task.

* :ref:`pagerduty2`

  You must be an Observability Cloud administrator to complete this task.

* :ref:`pagerduty3`


.. _pagerduty1:

Step 1: Create an Observability Cloud integration in PagerDuty
=================================================================================

For information about how to create an integration in PagerDuty, see :new-page:`PagerDuty Integration Guide <https://www.pagerduty.com/docs/guides/signalfx-integration-guide/>`.

Copy the :strong:`Integration Key` value for use in :ref:`pagerduty2`.


.. _pagerduty2:

Step 2: Create a PagerDuty integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to perform this task.

To create a PagerDuty integration in Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`PagerDuty guided setup <https://login.signalfx.com/#/integrations/integrations/pagerduty>`. Optionally, you can navigate to the guided setup on your own: 

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Select :guilabel:`Add Integration`.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`PagerDuty`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. By default, the name of the integration is :strong:`PagerDuty`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`API Key` field, enter the integration key you copied from PagerDuty in  :ref:`pagerduty1`.
#. :strong:`Save`.
#. If Splunk Observability Cloud can validate the PagerDuty API key, a :strong:`Validated!` success message displays. If an error displays instead, make sure that the API key you entered match the value displayed in PagerDuty in :ref:`pagerduty1`.


.. _pagerduty3:

Step 3: Add a PagerDuty integration as a detector alert recipient in Observability Cloud
=================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add a PagerDuty integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your PagerDuty integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`PagerDuty` and then select the name of the PagerDuty integration you want to use to send alert notifications. This is the integration name you created in :ref:`pagerduty2`.

#. Activate and save the detector.

Splunk Observability Cloud sendw an alert notification to PagerDuty to create an incident when a detector triggers an alert. It also sends an alert notification to clear the incident when the alert clears.
