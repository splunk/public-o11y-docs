.. _ii-ingest-snow:

Create ServiceNow tickets within Splunk Incident Intelligence incidents
**********************************************************************************************************

You can create ServiceNow tickets within Incident Intelligence incidents using the Splunkbase SNOW integration. With this integration Incident Intelligence aggregates your alerts, notifies the on-call responders, while all incident and customer details remain in ServiceNow.

Before you can ingest alerts from Splunk Enterprise and Splunk Cloud Platform, you must configure Incident Intelligence in Splunk Observability Cloud.

.. _ii-configure-app:

Download and configure the Splunk Incident Intelligence app
==============================================================

#. Download and install the Splunk Incident Intelligence app from :new-page:`Splunkbase <https://splunkbase.splunk.com/>`.
#. Open the app and select :guilabel:`Setup Org and Token`.
    #. Enter the :guilabel:`Realm`, :guilabel:`Org Id`, and :guilabel:`SFX Token`. For steps to obtain this information, see :ref:`organizations`. When obtaining your access token, select the default token or a token with INGEST and API scopes, in the list of tokens.
    #. Select :guilabel:`Send Test Alert`. This is only a status code verification that ensures there is a valid response to the ingest endpoint. There is no test alert in Incident Intelligence. 
    #. You can repeat these steps to create multiple entries for additional realms or organizations.

Now you are ready to start sending alerts to Incident Intelligence.


Post ITSI episodes as incidents in Incident Intelligence
==================================================================

You can send Splunk ITSI episodes as incidents in Incident Intelligence. 

Prerequisites
-----------------

You must have ITSI version 4.17 or higher.

To post ITSI episodes as incidents, do the following steps:

#. In ITSI, navigate to :guilabel:`ITSI > Configuration > Notable Event Aggregation Policies`.
#. Create a new notable event Aggregation policy or edit an existing notable event Aggregation policy. 
   * If creating a new policy, define the appropriate filtering criteria and instructions. 
   * If editing an existing policy, select the :guilabel:`Action Rules` tab.
#. Within the rule select :guilabel:`Change severity to` and select :guilabel:`Create an Incident intelligence incident`. 
#. Select :guilabel:`Configure` and update the following settings"
    #. Select the :guilabel:`Severity` for the alert.
    #. Enter an :guilabel:`Alert Title`.
    #. Enter an :guilabel:`Alert description`. The description can include tokens that insert text based on the results of the search. For more information, see :new-page:`Pass search result values to alert action tokens <https://docs.splunk.com/Documentation/Splunk/7.1.3/AdvancedDev/ModAlertsLog#Pass_search_result_values_to_alert_action_tokens>` in the Splunk Enterprise `Developing Views and Apps for Splunk Web` manual.
    #.  Select a :guilabel:`Realm`, :guilabel:`Org Id`, and :guilabel:`SFX Token` if you want to use something other than the default configured realm, org ID, and SFX token. These lists populate with the entries added in the configuration step. See :ref:`ii-configure-app`.
    #.  (Optional) Select a incident policy in the :guilabel:`Service Name` field.
#. Select :guilabel:`Save`.




Ingest Splunk Enterprise alerts using saved searches
============================================================

Create or save existing alerts to ingest from Splunk Enterprise into Incident Intelligence.

#. In Splunk Enterprise create and run a search. 
#. Select :guilabel:`Save As > Alert`.
#. Enter a title and description.
#. Under :guilabel:`Alert type`, select :guilabel:`Scheduled` and indicate how often you want the alert to run.
#. Under :guilabel:`Trigger Conditions`, create the conditions for when you want to send the alert.
#. Under :guilabel:`Trigger Actions`, select :guilabel:`Add Actions > Incident Intelligence`. 
#. Under :guilabel:`Incident Intelligence`, select the following settings:
    #.  Select the :guilabel:`Severity` for the alert.
    #.  Enter an :guilabel:`Alert Title`.
    #.  Enter an :guilabel:`Alert description`. The description can include tokens that insert text based on the results of the search. For more information, see :new-page:`Pass search result values to alert action tokens <https://docs.splunk.com/Documentation/Splunk/7.1.3/AdvancedDev/ModAlertsLog#Pass_search_result_values_to_alert_action_tokens>` in the Splunk Enterprise `Developing Views and Apps for Splunk Web` manual.
    #.  (Optional) Select a :guilabel:`Realm`, :guilabel:`Org Id`, and :guilabel:`SFX Token` if you want to use something other than the default configured realm, org ID, and SFX token. These lists populate with the entries added in the configuration step. See :ref:`ii-configure-app`.
    #.  (Optional) Select an incident policy in the :guilabel:`Service Name` field.
#. Select :guilabel:`Save`.

