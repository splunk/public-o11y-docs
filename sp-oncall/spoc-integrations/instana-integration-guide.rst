.. _instana-spoc:

Instana integration for Splunk On-Call
*****************************************

.. meta::
    :description: Configure the Instana integration for Splunk OnCall.

The Splunk On-Call integration with Instana uses the REST API and requires that you've implemented Instana in your environment. The following is a brief walkthrough on how to turn on and configure the integration.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
==============================

From the main timeline select :guilabel:`Integrations`. From the resulting lists of integrations, select :guilabel:`Instana`.

If the integration isn't active, select :guilabel:`Enable the Integration`. Copy the resulting API key to your clipboard.

Instana configuration
===========================

#. Under :guilabel:`Settings`, :guilabel:`Team Settings`, :guilabel:`Events and Alerts`, :guilabel:`Alert Channels`, :guilabel:`Add Alert Channel` to create a new alert channel for Splunk On-Call alerts.

#. Insert your previously copied api key into the API Key section. The routing key field routes the alert to a specific escalation policy in Splunk OnCall.

After entering and saving the information, you can test the connection with the :guilabel:`Test Channel` button. This triggers an ``INFO`` type alert to your Splunk On-Call timeline.

.. image:: /_images/spoc/alert_channel_after_creation.png
   :width: 90%
   :alt: Create the alert channel in Instana.

#. Add this Alert Channel to an alerting configuration. It is possible to add a channel to multiple configurations and to alert several channels in a single configuration.

.. image:: /_images/spoc/multiple_channels_edit.png
   :width: 90%

#. After creation your channel looks like this:

.. image:: /_images/spoc/VO_Alert_Channel_2.png

.. image:: /_images/spoc/VO_Alert_Channel_2.png
   :width: 90%
