.. _LibreNMS-spoc:

LibreNMS integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the LibreNMS integration for Splunk On-Call.

LibreNMS is an auto-discovering PHP/MySQL-based network monitoring
system. This integration allows you to send all your LibreNMS alerts
into VictorOps so you can make use of all that VictorOps has to offer.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
------------------------------

In Splunk On-Call, select :guilabel:`Integrations`, then search for LibreNMS under the :guilabel:`3rd Party Integrations` tab.

If the integration has not yet been enabled, click the :guilabel:`Enable Integration` button to generate your endpoint URL. Be
sure to replace the “$routing_key” section with the actual routing key you intend to use. (To view or configure route keys in Splunk On-Call,
click :guilabel:`Alert Behavior >> Route Keys`)

.. image:: /_images/spoc/LibreNMS.png


LibreNMS configuration
------------------------------

From the main dashboard, select :guilabel:`Settings` (Gear icon) and
then :guilabel:`Global Settings`.

.. image:: /_images/spoc/libre2.png
   :alt: libre2

   libre2

Select :guilabel:`Alerting Settings`.

.. image:: /_images/spoc/libre3.png
   :alt: libre3

   libre3

Find the :guilabel:`Splunk On-Call` option and paste in your Splunk On-Call “Post URL”. To
test the integration, click :guilabel:`Test transport`.

.. image:: /_images/spoc/libre4.png
   :alt: libre4

   libre4


A test LibreNMS incident is sent into your Splunk On-Call timeline.


.. image:: /_images/spoc/Incident.png

Your LibreNMS integration is now configured successfully. 

Questions? Email victorops-support@splunk.com.
