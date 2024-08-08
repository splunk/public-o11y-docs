.. _rapid7-spoc:

Rapid7 integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure Rapid7 integration for Splunk On-Call.


Rapid7 helps you reduce risk across your entire connected environment so your company can focus on what matters most. 

Requirements
==============

Splunk On-Call Version Required: Starter, Growth, or Enterprise

Configure Splunk On-Call
==========================

#. From the main timeline, select :guilabel:`Integrations` then :guilabel:`3rd Party Integrations` then :guilabel:`Rapid7`.
#. Select :guilabel:`Enable Integration`. Copy the URL to notify for use in the next steps.
#. Select :guilabel:`Settings` then :guilabel:`Routing Keys` to find your routing key configuration. Decide which routing key you want to use with this integration and make sure it is associated to the correct escalation policies. For more information on routing keys, see :ref:`spoc-routing-keys`.

Configure the Data Exporter in Rapid7
========================================

#. From your Rapid7 dashboard, select :guilabel:`Data Collection`. 
#. Select :guilabel:`Setup Event Source` then :guilabel:`Add Event Source`.
#. In the :guilabel:`Security Data` section select the :guilabel:`Data Exporter` icon. The Add Event Source panel appears.
#. Select your collector and event source. You can also name your event source if you want.
#. Provide the URL that you previously copied from Splunk On-Call. For security reasons, Rapid7 recommends using HTTPS as the protocol whenever possible.
#. If the secret is not already provided, enter in the :guilabel:`Secret` field.
#. (Optional) Select :guilabel:`Alerts` to export asset-specific Alerts from InsightIDR.
#. (Optional) Select to trust all certificates and self-signed certificates.
#. Select :guilabel:`Save`.

.. image:: /_images/spoc/Screen-Shot-2018-10-19-at-11.14.35-AM.png
    :width: 65%
    :alt: Rapid7 Data Explorer configuration.

The Data Exporter is now configured and will send 2 types of messages.

* A ``test`` event to confirm the URL is working. This message is whenever the webhook data exporter is started or if the configuration is changed. 
* An ``idr_alert`` event. This type of message is whenever an alert triggers in InsightIDR and contains information about the alert in the event. More details about each type of event can be found in Rapid7 documentation :new-page:`https://docs.rapid7.com/insightidr/webhook`.