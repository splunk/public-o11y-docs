.. _ii-ingest-splunk-itsi-alerts:

Ingest alerts from Splunk Enterprise and Splunk Cloud Platform
**********************************************************************************************************

You can ingest alerts into Incident Intelligence from Splunk Enterprise and Splunk Cloud Platform using Splunk Incident Intelligence. 

Before you can ingest alerts from Splunk Enterprise and Splunk Cloud Platform, you must configure Incident Intelligence in Splunk Observability Cloud.

.. _ii-configure-app:

Download and configure the Splunk Incident Intelligence app
==============================================================

#. Download and install the Splunk Incident Intelligence app from :new-page:`Splunkbase <https://splunkbase.splunk.com/app/6721>`.
#. Open the app and select :guilabel:`Setup Org and Token`.
    #. Enter the :guilabel:`Realm`, :guilabel:`Org Id`, and :guilabel:`SFX Token`. For steps to obtain this information, see :ref:`organizations`. When obtaining your access token, select the default token or a token with INGEST and API scopes, in the list of tokens.
    #. Select :guilabel:`Send Test Alert`. This is only a status code verification that ensures there is a valid response to the ingest endpoint. There is no test alert in Incident Intelligence. 
    #. You can repeat these steps to create multiple entries for additional realms or organizations.

Now you are ready to start sending alerts to Incident Intelligence.


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

