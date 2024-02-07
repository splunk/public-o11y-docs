.. instana-spoc:

Instana Integration guide
********************************

.. meta::
    :description: Configure the Instana integration for Splunk OnCall.



Instana was built to monitor cloud, container, and microservice applications.

The VictorOps integration with Instana makes use of our REST API and requires that you've implemented Instana in your environment. The following is a brief walkthrough on how to enable and configure the integration.

Pre-requisties
===================

- Required: Instana Implemented Environment
- VictorOps Version Required: Starter, Growth,or Enterprise



In Splunk OnCall
====================

From the main timeline select :guilabel:`Integrations`. From the resulting lists of integrations, select Instana.*

If the integration has not yet been enabled, select :guilabel:`Enable the Integration`. Copy the resulting API key to your clipboard.



In Instana
=====================


#. Under *Settings >> Team Settings >> Events and Alerts >> Alert Channels >> Add Alert Channel* create a new alert channel for VictorOps alerts.
#. Insert your previously copied api key into the API Key section. The routing key field will route the alert to a specific escalation policy in Splunk OnCall. After entering and saving the information, you can test
the connection with the blue “Test Channel” button. This will fire an "INFO” type alert to your VictorOps timeline.

    .. image:: /_images/spoc/alert_channel_after_creation.png
      :width: 90%
      :alt: Create the alert channel in Instana.


Add this Alert Channel to an alerting configuration. It is possible to add a channel to multiple configurations and to alert several channels in a single configuration.


        .. image:: /_images/spoc/multiple_channels_edit.png
      :width: 90%


After creation your channel should look something like this:

.. image:: /_images/spoc/VO_Alert_Channel_2.png
        .. image:: /_images/spoc/VO_Alert_Channel_2.png
      :width: 90%
