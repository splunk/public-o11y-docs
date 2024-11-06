.. _apteligent-spoc:

Apteligent integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Apteligent integration for Splunk On-Call.

Apteligent, formerly Crittercism, is a mobile application performance management solution. The Splunk On-Call (formerly VictorOps) integration with Apteligent opens an incident in Splunk On-Call every time an alert is triggered in Apteligent.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-call configuration
===============================

1. Go into :guilabel:`Integrations`.
2. Select :guilabel:`Apteligent`.
3. Copy the link for the Service API Endpoint.

   |image1|

Apteligent configuration
===========================

1. From the Apteligent UI, select :guilabel:`Alert Center`, then :guilabel:`Alert Integrations`, then :guilabel:`Add integration`.

|crittercism1|

2. Select :guilabel:`VictorOps` for the Integration, and give it a name.
3. Paste in the Service API Endpoint in the :guilabel:`URL` field.

|crittercism5|

4. Make sure to edit ``$routing_key`` for the key that routes to the team you want notified for all Apteligent alerts. See :ref:`spoc-routing-keys`.

|crittercism6|

5. Select :guilabel:`Create Integration`.

Now you can configure any alert to notify the Splunk On-Call timeline by assigning the alert to “VictorOps Integration”.

|crittercism7|

.. |crittercism1| image:: /_images/spoc/Crittercism1.png
.. |crittercism2| image:: /_images/spoc/Crittercism2.png
.. |image1| image:: /_images/spoc/apteligent_button.png
.. |crittercism5| image:: /_images/spoc/Crittercism5.png
.. |crittercism6| image:: /_images/spoc/Crittercism6.png
.. |crittercism7| image:: /_images/spoc/Crittercism7.png
