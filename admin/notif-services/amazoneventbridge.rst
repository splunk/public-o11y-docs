.. _amazoneventbridge:

*******************************************************************************************
Send alert notifications to Amazon EventBridge using Splunk Observability Cloud
*******************************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to Amazon EventBridge when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to Amazon EventBridge when a detector alert condition is met and when the condition clears.

To send Observability Cloud alert notifications to Amazon EventBridge, complete the following configuration tasks:

* :ref:`amazoneventbridge1`

  You must be an Observability Cloud administrator to complete this task.

* :ref:`amazoneventbridge2`

  You must have access to the Amazon EventBridge console to complete this task.

* :ref:`amazoneventbridge3`


.. _amazoneventbridge1:

Step 1: Create an Amazon EventBridge integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to complete this task.

To create an Amazon EventBridge integration in Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Amazon EventBridge guided setup <https://login.signalfx.com/#/integrations/amazoneventbridge>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Select :guilabel:`Add Integration`.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`Amazon EventBridge`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. By default, the name of the integration is :strong:`Amazon EventBridge`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`AWS Account Id` field, enter the ID of the AWS account that you want to send Observability Cloud alert notifications to.
#. The :strong:`Event Source` field displays the name of the partner event source. This value has a one-to-one mapping with the name of the partner event bus you see in :ref:`amazoneventbridge2`.
#. In the :strong:`AWS Region` list, select the region where you want to create the partner event source.
#. :strong:`Save and Enable`.


.. _amazoneventbridge2:

Step 2: Accept Observability Cloud as an event source in Amazon EventBridge
=====================================================================================

You must have access to the Amazon EventBridge console to complete this task.

For information about how to accept Splunk Observability Cloud as a partner event source in Amazon EventBridge, see :new-page:`Receive events from a SaaS partner with Amazon EventBridge <https://docs.aws.amazon.com/eventbridge/latest/userguide/create-partner-event-bus.html>`. In the "Supported SaaS partner integrations" section, select :strong:`SignalFx`.


.. _amazoneventbridge3:

Step 3: Add an Amazon EventBridge integration as a detector alert recipient in Observability Cloud
==============================================================================================================

..
  once detector docs are migrated, this step may be covered in those docs and can be removed from all of these docs. link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add an Amazon EventBridge integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Amazon EventBridge integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`Amazon EventBridge` and then select the name of the Amazon EventBridge integration you want to use to send alert notifications. This is the integration name you created in :ref:`amazoneventbridge1`.

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to Amazon EventBridge when the detector triggers an alert and when the alert clears.
