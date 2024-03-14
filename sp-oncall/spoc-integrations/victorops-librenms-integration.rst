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

In Splunk On-Call, select *Integrations,* then search for LibreNMS under the
*3rd Party Integrations* tab

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below. Be
sure to replace the “$routing_key” section with the actual routing key
you intend to use. (To view or configure route keys in VictorOps,
click *Alert Behavior >> Route Keys*)

.. image:: /_images/spoc/LibreNMS.png


LibreNMS configuration
------------------------------

From the main dashboard, select **Settings** (Gear Icon) and
then **Global Settings**.

.. image:: /_images/spoc/libre2.png
   :alt: libre2

   libre2

Select **Alerting Settings**.

.. image:: /_images/spoc/libre3.png
   :alt: libre3

   libre3

Find the **VictorOps** option and paste in your VictorOps “Post URL”. To
test the integration hit **Test transport.**

.. image:: /_images/spoc/libre4.png
   :alt: libre4

   libre4


A test LibreNMS incident will be sent into your VictorOps timeline.


.. image:: /_images/spoc/Incident.png

And you are done! If you have any questions please reach out to
victorops-support@splunk.com.
