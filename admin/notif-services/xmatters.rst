.. _xmatters:

************************************************************************
Send alert notifications to xMatters using Splunk Observability Cloud
************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to xMatters when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to xMatters when a detector alert condition is met and when the alert clears.

To send Observability Cloud alert notifications to xMatters, complete the following configuration tasks:

* :ref:`xmatters1`

  You must be an xMatters administrator to complete this task.

* :ref:`xmatters2`

  You must be an Observability Cloud administrator to complete this task.

* :ref:`xmatters3`


.. _xmatters1:

Step 1: Create an Observability Cloud integration in xMatters
=================================================================================

For information about how to create an Observability Cloud integration in xMatters, you can search "Splunk Infrastructure Monitoring" on xMatters website.


.. _xmatters2:

Step 2: Create an xMatters integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to perform this task.

To create an xMatters integration in Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Webhook guided setup <https://login.signalfx.com/#/integrations/xmatters?search_pattern=xMatter&category=all>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.
   
   #. Select :guilabel:`Add Integration`.
   
   #. In the integration filter menu, select :guilabel:`All`.
   
   #. In the :guilabel:`Search` field, search for :guilabel:`xMatters`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.
#. Enter a name for the integration. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`URL` field, enter the URL you copied from xMatters in :ref:`xmatters1`.
#. :strong:`Save`.
#. If Splunk Observability Cloud can validate the xMatters URL, a :strong:`Validated!` success message displays. If you get an error, make sure that the URL you entered matches the URL displayed in xMatters in :ref:`xmatters1`.


.. _xmatters3:

Step 3: Add an xMatters integration as a detector alert recipient in Observability Cloud
=================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add an xMatters integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your xMatters integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`xMatters` and then select the name of the xMatters integration you want to use to send alert notifications. This is the integration name you created in :ref:`xmatters2`.

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to xMatters when the detector triggers an alert by the detector and when the alert clears.
