.. _bmc-truesight-spoc:

BMC TrueSight Pulse integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the BMC TrueSight Pulse integration for Splunk On-Call.

BMC TrueSight Pulse users can now send their alerts to Splunk On-Call using actions. The following steps walk you through the implementation process.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
===============================

From the main timeline select :guilabel:`Integrations`, :guilabel:`BMC Truesight Pulse`.

If the integration isn't active, select :guilabel:`Enable Integration`. Copy the service API key to your clipboard.

.. image:: /_images/spoc/Integration-BMC-page-final.png
   :alt: BMC integration in Splunk On-Call


BMC Truesight Pulse configuration
===================================

Add the Splunk On-Call action to your BMC Truesight Pulse account:

1. Select :guilabel:`Settings` on toolbar to open the dialog.
2. Go to the :guilabel:`Actions` tab.
3. Select :guilabel:`Add Action`.
4. Select :guilabel:`VictorOps` and then select :guilabel:`Add`.

|bmc1|

|bmc2|

5. Give the action a name.
6. Paste in your API key.
7. Select the severity level.
8. Add your Routing Key and save.

|bmc5|

Now you can use the Splunk On-Call action with any of your BMC Truesight Pulse Alarms.

.. |bmc1| image:: /_images/spoc/BMC1.png
.. |bmc2| image:: /_images/spoc/BMC2.png
.. |bmc5| image:: /_images/spoc/BMC5.png
