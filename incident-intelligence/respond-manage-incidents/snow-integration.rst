.. _snow-integration:

Create ServiceNow tickets within Splunk Incident Intelligence incidents
**********************************************************************************************************

You can create ServiceNow tickets within Incident Intelligence incidents. With this integration, Splunk Incident Intelligence aggregates your alerts, notifies the on-call responders, while all incident and customer details remain in ServiceNow.

This lets you create and close ServiceNow tickets from within Incident Intelligence. Updates to the ServiceNow ticket must be performed in ServiceNow.



Configure ServiceNow for Incident Intelligence
====================================================

Allow Incident Intelligence to create ServiceNow tickets.

Perform the following steps:

#. Log into Splunk Observability Cloud, 
#. Open the :new-page:`ServiceNOW for Incident Intelligence setup page <https://login.signalfx.com/#/integrations/incidentIntelligenceServiceNow>`. Optionally, you can navigate to the setup on your own:

   #. Select :guilabel:`Data Management`.

   #. Select :guilabel:`Add Integration`.

   #. In the drop-down, select :guilabel:`Product` and search for Incident Intelligence.

   #. Select :guilabel:`ServiceNow Incident Intelligence`.

#. By default, the name of the integration is :guilabel:`ServiceNow`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :ref:`About naming your integrations <naming-note>`.
#. Enter the :guilabel:`ServiceNow URL` for the instance.
#. In the :strong:`Username or Client` field, enter the user ID from ServiceNow or the Oauth client ID.
#. In the :strong:`Password or Client` field, enter the password from ServiceNow or the Oauth client secret.
#. In the :strong:`Provide the timezone` field, enter the time zone name for the ServiceNOW integration.
#. In the :strong:`Observability Integration Token` field, enter the API Access token for your Incident Intelligence org. This must be an org level API access token.
#. Select :guilabel:`Save`

You are now ready to configure ServiceNow as part of the incident policy workflows in Incident Intelligence.


Connect ServiceNow to Splunk Incident Intelligence incident policy workflows
====================================================================================

When you have configured the ServiceNow integration with Observability Cloud, you can configure Splunk Incident Intelligence and ServiceNow in one or more incident policies. This eliminates the need for individual responders to manually run the configuration steps in each incident. Any incident created under the incident policy automatically has the ServiceNow ticket configuration populated.

Perform the following steps:

#. In Splunk Incident Intelligence, select :guilabel:`Incident Management`.
#. On the :guilabel:`Incident Policies` tab, select an incident.
#. Select the :guilabel:`Incident Workflows` tab to configure an action for the policy.
#. Select :guilabel:`Add action`.
#.  On the :guilabel:`Add new action` dialog, in the :guilabel:`Integration` field, select Create ServiceNOW ticket.
#. Complete the following fields:

   #. :guilabel:`Integration Instance`: Select the ServiceNow instance to work with. For example, you might have a production and a test instance.
  
   #. :guilabel:`ServiceNow table`: the default is incident.

   #. :guilabel:`ServiceNow Fields`: Enter the JSON that contains the ServiceNow field values to use. For example, if you have an incident policy for WebUI incidents, you can create a field that says WebUI incident, so the responder doesn't have to fill that in.

   #. (Optional) :guilabel:`Close Incident Mapping JSON`: Enter the JSON to map the fields users are prompted to provide when closing an incident.

   #. (Optional) :guilabel:`Resolve Incident Mapping JSON`: Enter the JSON to map the fields users are prompted to provide when closing an incident.

Once you configure this, any incident created using that incident policy displays the related ServiceNow ticket information in the :guilabel:`Resources` section of the incident details.


.. image:: /_images/incident-intelligence/ii-snow-ticket.png
    :width: 80%
    :alt: On the Incident details page, the ServiceNow ticket link displays in the Resources section.


Manually connect Splunk Incident Intelligence to ServiceNow in a specific incident
====================================================================================

If you do not configure ServiceNow as part of incident workflows, responders can still connect an incident to ServiceNow manually. This requires them to know the configuration values required. 

If you are reviewing or working on a specific incident in Splunk Incident Intelligence, you can manually connect the incident to ServiceNow by performing the following steps:

#. On the :guilabel:`Incidents` tab in Splunk Incident Intelligence, select an incident.
#. In the :guilabel:`Resources` section, select :guilabel:`Add Resource`.
#. On the :guilabel:`Add resource` dialog, in the :guilabel:`Integration` field, select Create ServiceNOW ticket.
#. Complete the following fields:

   #. :guilabel:`Integration Instance`: Select the ServiceNow instance to work with. For example, you might have a production and a test instance.

   #. :guilabel:`ServiceNow table`: the default is incident.

   #. :guilabel:`ServiceNow Fields`: Enter the JSON that contains the ServiceNow field values to use.

   #. (Optional) :guilabel:`Close Incident Mapping JSON`: Enter the JSON to map the fields users are prompted to provide when closing an incident.

   #. (Optional) :guilabel:`Resolve Incident Mapping JSON`: Enter the JSON to map the fields users are prompted to provide when closing an incident.



