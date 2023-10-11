[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Required: Instana Implemented Environment**

**VictorOps Version Required: Starter, Growth,** or **Enterprise**

[/ht_toggle]

Instana was built to monitor cloud, container, and microservice
applications.

The VictorOps integration with Instana makes use of our REST API and
requires that you’ve implemented Instana in your environment. The
following is a brief walkthrough on how to enable and configure the
integration.

--------------

In VictorOps
------------

From the main timeline select *Integrations.* From the resulting lists
of integrations, select *Instana.*

If the integration has not yet been enabled, click the “Enable
Integration” button. Copy the resulting API key to your clipboard.

--------------

In Instana
----------

Under *Settings >> Team Settings >> Events and Alerts >> Alert Channels
>> Add Alert Channel* create a new alert channel for VictorOps alerts.
Insert your previously copied api key into the API Key section. The
routing key field will route the alert to a specific escalation policy
in VictorOps. After entering and saving the information, you can test
the connection with the blue “Test Channel” button. This will fire an
“INFO” type alert to your VictorOps timeline.

.. image:: images/alert_channel_after_creation.png

Add this Alert Channel to an alerting configuration. It is possible to
add a channel to multiple configurations and to alert several channels
in a single configuration.

.. image:: images/multiple_channels_edit.png

After creation your channel should look something like this:

.. image:: images/VO_Alert_Channel_2.png
