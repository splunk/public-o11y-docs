.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-ingest-splunk-itsi-alerts:

Ingest alerts from Splunk Enterprise, Splunk Cloud Platform, and Splunk IT Service Intelligence (ITSI)
***********************************************************************************************************

You can ingest alerts from Splunk Enterprise, Splunk Cloud Platform, and Splunk ITSI using the Splunk Incident Intelligence app on :new-page:`Splunkbase <https://splunkbase.splunk.com/>`.

Download and configure the Splunk Incident Intelligence app
==============================================================

#. Download and install the Splunk Incident Intelligence app from :new-page:`Splunkbase <https://splunkbase.splunk.com/>`.
#. Open the app and select :guilabel:`Setup Org and Token`.
    #. Enter the following your realm, Org ID, and SFX Token. For steps to obtain this information see :ref:`organizations`.
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
#. Under :guilabel:`Trigger Actions` select :guilabel:`Add Actions > Incident Intelligence`.
    #.  


