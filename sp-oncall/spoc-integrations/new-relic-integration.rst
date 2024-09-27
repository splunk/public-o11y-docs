.. _new-relic-spoc:

New Relic integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the New Relic integration for Splunk On-Call.

Use the New Relic integration for Splunk On-Call to define alert queries inside New Relic then deliver them through Splunk On-Call to the proper escalation team. With varied URLs that hold different routing keys, you can manage multiple on-call teams and New Relic channels.

With the Splunk On-Call New Relic integration, teams are able to:

-  Integrate New Relic with Splunk On-Call for complete awareness of application performance and alerts
-  Collaborate in the Splunk On-Call timeline around New Relic monitoring data to solve problems in real time
-  Route alerts and New Relic incidents through Splunk On-Call with on-call schedules to ensure the correct people are notified

Activate the New Relic integration in Splunk On-Call
==========================================================

#. From the main timeline select :guilabel:`Integrations` then :guilabel:`3rd-Party Integrations` then :guilabel:`New Relic`.

   .. image:: /_images/spoc/New-Relic-1-1-scaled.jpg

#. Select :guilabel:`Enable Integration` to generate your API Keys. 
#. Copy the full URL for use later in New Relic.

   .. image:: /_images/spoc/New-Relic-2-1-scaled.jpg

Link Splunk On-Call with New Relic
========================================

#. Bring up the New Relic Alerts & AI and select :guilabel:`Workflows`. 
#. Add a new workflow.

   .. image:: /_images/spoc/New-Relic-1-scaled.jpg

#. Enter a name for the workflow and define your filtering and muting sections.
#. Select :guilabel:`Webhook` under :guilabel:`Notify`.

   .. image:: /_images/spoc/New-Relic-2.jpg

#. Select :guilabel:`Select Destination` then :guilabel:`Create new destination`.

   .. image:: /_images/spoc/New-Relic-3-scaled.jpg

#. Paste in the New Relic URL you copied earlier into the :guilabel:`Endpoint URL`. Replace the trailing ``$routing_key`` with the actual routing key you intend to use for the alert. For more information on routing keys, see :ref:`spoc-routing-keys`.

   .. image:: /_images/spoc/New-Relic-3-1.jpg

#. Save the destination. 
#. Update the payload provided for the webhook. See the following example payload and make any customizations.

   Sample Payload:

   .. code-block::

      {
      "impactedEntities": {{json entitiesData.names}},
      "totalIncidents": {{json totalIncidents}},
      "trigger": {{ json triggerEvent }},
      "isCorrelated": {{ json isCorrelated }},
      "createdAt": {{ createdAt }},
      "updatedAt": {{ updatedAt }},
      "sources": ["newrelic"],
      "alertPolicyNames":{{ json accumulations.policyName }},
      "alertConditionNames": {{ json accumulations.conditionName }},
      "workflowName": {{ json workflowName }},
      "monitoring_tool":"New Relic",
      "incident_id":{{ json issueId }},
      "condition_name" : {{ json accumulations.conditionName }},
      "details" : {{ json annotations.title.[0] }},
      "severity" : "CRITICAL",
      "current_state" : {{#if issueClosedAtUtc}} "CLOSED" {{else if issueAcknowledgedAt}} "ACKNOWLEDGED" {{else}} "OPEN"{{/if}},
      "event_type": "INCIDENT"
      }

#. Select :guilabel:`Send test notification` when you are done with adjustments to ensure the notification arrives in your Splunk On-Call account.

   .. image:: /_images/spoc/Cursor_and_Applied_Intelligence___Edit_channel___Alerts___AI___Workflow_Builder___Alerts___AI___Workflows___New_Relic_One.jpg

#. Select :guilabel:`Update Message` then :guilabel:`Activate Workflow` to save your changes.

The standard setup is now complete. Repeat as necessary to build new workflows that notify different Webhook Channels, each holding different routing keys. This will allow you to route alerts to the appropriate groups in Splunk On-Call.

Legacy version of New Relic
---------------------------

.. raw:: html

   <iframe src="//www.youtube.com/embed/NE2oeVSxEZI" width="666" height="500" frameborder="0" scrolling="auto" allowfullscreen="allowfullscreen">
   </iframe>

#. Add VictorOps as a WebHook in New Relic. Select :guilabel:`Tools` then :guilabel:`Alert policies`  |newrelic9|
#. Select :guilabel:`Channels and Groups` |newrelic10|
#. Select :guilabel:`Create Channel` then :guilabel:`Webhook` |newrelic11| |newrelic12|
   #. Enter any name.
   #. Enter the following for the WebHook URL, make sure to include the correct key and route_key: ``https://alert.victorops.com/integrations/newrelic/20140115/alert/--key--/--routing--``
   #. Select :guilabel:`Integrate with WebHooks` |newrelic13|

.. |newrelic9| image:: /_images/spoc/newrelic9.png
.. |newrelic10| image:: /_images/spoc/newrelic10.png
.. |newrelic11| image:: /_images/spoc/newrelic11.png
.. |newrelic12| image:: /_images/spoc/newrelic12.png
.. |newrelic13| image:: /_images/spoc/newrelic13.png
