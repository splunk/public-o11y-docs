.. _splunkoncall:

******************************************************************************
Send alert notifications to Splunk On-Call using Splunk Observability Cloud
******************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to Splunk On-Call when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to Splunk On-Call (formerly VictorOps) when a detector alert condition is met and when the alert clears.

To send Observability Cloud alert notifications to Splunk On-Call, complete the following configuration tasks:

* :ref:`oncall1`

   You must be a Splunk On-Call global admin or alert admin to complete this task.

* :ref:`oncall2`

   You must be a Splunk On-Call global admin or alert admin to complete this task.

* :ref:`oncall3`

   You must be an Observability Cloud administrator to complete this task.

* :ref:`oncall4`


.. _oncall1:

Step 1: Get your Splunk On-Call service API endpoint URL
=================================================================================

You must be a Splunk On-Call global admin or alert admin to complete this task.

To get the service API endpoint URL in Splunk On-Call:

#. Log in to Splunk On-Call.

#. Select the :strong:`Integrations` tab.

#. Select the :strong:`3rd Party Integrations` tab.

#. Select the :strong:`Splunk Observability Cloud Signal Monitoring` tile. The :strong:`Service API Endpoint` value displays.

   If you don't see an endpoint URL value, select :strong:`Enable Integration` to generate one.

#. Copy the entire endpoint URL, including the ``$routing_key`` text, for use in :ref:`oncall3`.


.. _oncall2:

Step 2: Get your Splunk On-Call alert routing key
=================================================================================

You must be a Splunk On-Call global admin or alert admin to complete this task.

For information about how to get your Splunk On-Call alert routing key, see :new-page:`Create & Manage Alert Routing Keys <https://help.victorops.com/knowledge-base/routing-keys/>`.

You'll need your alert routing key in :ref:`oncall3`.


.. _oncall3:

Step 3: Create a Splunk On-Call integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to complete this task.

To create a Splunk On-Call integration in Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Splunk On-Call guided setup <https://login.signalfx.com/#/integrations/integrations/victorops>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Select :guilabel:`Add Integration`.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`Splunk On-Call`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. By default, the name of the integration is :strong:`VictorOps`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`Post URL` field, enter the service API endpoint URL value you copied from Splunk On-Call in :ref:`oncall1`.
#. strong:`Save`.
#. If Splunk Observability Cloud can validate the Splunk On-Call service API endpoint URL, a :strong:`Validated!` success message displays. If you get an error, make sure that the URL value you entered matches the value displayed in Splunk On-Call in :ref:`oncall1`.


.. _oncall4:

Step 4: Add a Splunk On-Call integration as a detector alert recipient in Observability Cloud
=======================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add a Splunk On-Call integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Splunk On-Call integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`VictorOps` and then select the name of the Splunk On-Call integration you want to use to send alert notifications. This is the integration name you created in :ref:`oncall3`.

#. Enter the routing key you got in :ref:`oncall2`

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to your Splunk On-Call timeline when an alert is triggered by the detector and when the alert clears.


Observability Cloud alert notification fields sent to Splunk On-Call
=======================================================================

Here are the Observability Cloud alert notification fields that are sent to Splunk On-Call.

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - :strong:`Field`
     - :strong:`Description`

   * - Detector Definition
     - Displays a link to view the Observability Cloud detector and corresponding alert rules.

   * - Graph
     - Displays a snapshot view of the signal that triggered the alert.

   * - detector
     - Displays the name of the Observability Cloud detector.

   * - inputs
     - Displays detailed information about the Observability Cloud alert, including the rule and detector names, alert triggering conditions, and signal details.

   * - rule
     - Displays the name of the Observability Cloud alert rule where the conditions to trigger and clear alert events are defined.

   * - entity_display_name
     - Displays the Observability Cloud rule and detector name. This information also appears in the rule and detector notification fields.

   * - state_message
     - When the alert is triggered, displays the alert's severity. Valid values include: ``critical``, ``major``, ``minor``, ``warning``, or ``info``. When the alert is resolved, displays the alert's resolution. Valid values include: ``back to normal``, ``stopped``, or ``manually resolved``.

   * - entity_id
     - Displays the incident's ID.

   * - monitoring_tool
     - Displays ``signalfx``.

   * - message_type
     - Displays the alert's severity. Valid values include: ``critical``, ``warning``, ``acknowledgement``, ``info``, or ``recovery``.
