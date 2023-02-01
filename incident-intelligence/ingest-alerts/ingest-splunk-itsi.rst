.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-ingest-splunk-itsi-alerts:

Ingest alerts from Splunk Enterprise, Splunk Cloud Platform, and Splunk IT Service Intelligence (ITSI)
***********************************************************************************************************

You can ingest alerts from Splunk Enterprise, Splunk Cloud Platform, and Splunk ITSI using the Splunk Incident Intelligence app on :new-page:`Splunkbase <https://splunkbase.splunk.com/>`.

.. _ii-configure-app:

Download and configure the Splunk Incident Intelligence app
==============================================================

#. Download and install the Splunk Incident Intelligence app from :new-page:`Splunkbase <https://splunkbase.splunk.com/>`.
#. Open the app and select :guilabel:`Setup Org and Token`.
    #. Enter the a :guilabel:`Realm`, :guilabel:`Org Id`, and :guilabel:`SFX Token`. For steps to obtain this information see :ref:`organizations`.
    #. Select :guilabel:`Send Test Alert`. This is only a status code verification that ensures there is a valid response to our ingest endpoint. There won't be a test alert in Incident Intelligence. 
    #. You can repeat these steps to create multiple entries for additional realms or organziations.

Now you are ready to start sending alerts to Incident Intelligence.


Send alerts from a saved search
========================================

#. Create and run as search. 
#. Select :guilabel:`Save As > Alert`.
#. Enter a title and description.
#. Under :guilabel:`Alert type` select :guilabel:`Scheduled` and specify how often you you want to alert to run.
#. Under :guilabel:`Trigger Conditions` create the conditions for when you want to send an alert.
#. Under :guilabel:`Trigger Actions` select :guilabel:`Add Actions > Incident Intelligence`. Under Incident Intelligence select the following settings:
    #.  Select the :guilabel:`Severity` for the alert.
    #.  Enter an :guilabel:`Alert Title`.
    #.  Enter an :guilabel:`Alert description`. The description can include tokens that insert text based on the results of the search. See :new-page:`Pass search result values to alert action tokens <https://docs.splunk.com/Documentation/Splunk/7.1.3/AdvancedDev/ModAlertsLog#Pass_search_result_values_to_alert_action_tokens>` in Splunk Enterprise documentation for more information.
    #.  (Optional) Select a :guilabel:`Realm`, :guilabel:`Org Id`, and :guilabel:`SFX Token` if you want to use something other than the default configured realm, org ID and SFX token. These drop-down lists are populated with the entries added in the configuration step. See :ref:`ii-configure-app`.
    #.  Select a incident policy in the :guilabel:`Service Name` field.
#. Select :guilabel:`Save`.

To access and edit your configured alert go to the :guilabel:`Alerts` tab in the Splunk Incident Intelligence app. 

