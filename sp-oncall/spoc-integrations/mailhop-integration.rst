
.. _mailhop-spoc:

Mailhop integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Mailhop integration for Splunk On-Call.


Mailhop automatically backs up your email and acts as a queue while your email server is offline. Mailhop can be configured to send alerts to
Splunk On-Call. 

In Splunk On-Call
==========================

1. From the Splunk On-Call interface, select :guilabel:`Settings`, then :guilabel:`Alert Behavior`. Then select :guilabel:`Integrations`. 

.. image:: /_images/spoc/Integration-ALL-FINAL.png

#. Select the Mailhop integration.

.. image:: /_images/spoc/Mailhop-final.png

#. Copy the :guilabel:`Service API Key` to the clipboard.

.. image:: /_images/spoc/Mailhop-2-final.png

In Mailhop
=====================

#. Log in to the Mailhop web interface as an admin.

.. image:: /_images/spoc/Screen_Shot_2017-04-03_at_4_45_53_PM.png

#. From the Mailhop dashboard, click **Services**.

.. image:: /_images/spoc/Dashboard-Mailhop.png

# Select your Product or Service .  In this example, select "guilabel`Business Plus`.

.. image:: /_images/spoc/Dashboard-Mailhop-1.png

#. Scroll down on the “Manage Product” page, then select :guilabel:`Launch Control Panel` on the Product Information tab.

.. image:: /_images/spoc/Dashboard-Mailhop-2.png

#. From the Mailhop Control panel, select :guilabel:`Monitoring`, then select :guilabel:`Alerting`

.. image:: /_images/spoc/Mailhop.png

#. In the :guilabel:`ADD NEW RECEIVER`, select Splunk On-Call (formerly VictorOps) from the :guilabel:`Alert type` menu, then enter a name for the alert n the Receiver label field.

#. Next, paste the API key from the In Splunk On-Call section into the :guilabel:`API key field, then enter the routing key you want to use into the :guilabel`Routing key / Team`` field. 

#. Select the option you want from the Priority” dropdown menu and select :guilabel:`Create Receiver`.

.. image:: /_images/spoc/Mailhop-1.png

#. Select :guilabel:`SNMP Server`` from the menu on the left.

.. image:: /_images/spoc/Mailhop-2.png

#. Set :guilabel:`Monitoring status` to Enabled, then select :guilabel:`Save`.

.. image:: /_images/spoc/Mailhop-3.png

Mailhop alerts should start showing up in your Splunk On-Call timeline as they are generated after a 10-15 minute delay for the settings to take
effect.

.. image:: /_images/spoc/Timeline-vops_davetesting.png

