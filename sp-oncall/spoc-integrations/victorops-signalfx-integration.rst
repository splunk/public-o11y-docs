SignalFX is a real-time cloud monitoring platform for infrastructure,
microservices, and applications, collecting and analyzing metrics across
your cloud environment. Integrating SignalFX with Splunk On-Call
(formerly VictorOps) allows you to send alert notifications from
SignalFx detectors into your Splunk On-Call timeline.

You must be an administrator in both SignalFx and Splunk On-Call to
establish this integration. Any SignalFx user can send alerts into
Splunk On-Call once it's been integrated.

**In Splunk On-Call**
---------------------

In Splunk On-Call , select **Integrations** *>>* **SignalFx**

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.

..image images/SignalFX_VO@2x.png

**In SignalFx**
---------------

From the SignalFx web portal select **Integrations** then select
the **VictorOps** integration option under **Notification Services**.

..image images/SF_Integration_page@2x-1.png

Select **Create New Integration**.

..image images/Create-New-Integration@2x.png

Give the integration a name and then paste in your Splunk On-Call
generated URL that you copied from the Splunk On-Call portal. Hit
**Save** and a validation message will appear.

..image images/sigfx_vo@2x.png

Add a Splunk On-Call notification to a detector
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Create, edit, or subscribe to a detector for which you want alert
   notifications to be sent to Splunk On-Call (see `Set Up Detectors to
   Trigger
   Alerts <https://docs.signalfx.com/en/latest/detect-alert/set-up-detectors.html#detectors>`__ or `Receiving
   alert notifications from a
   detector <https://docs.signalfx.com/en/latest/detect-alert/manage-notifications.html#receiving-notifications>`__).
2. Select Splunk On-Call as a notification recipient and specify a
   `routing
   key <https://help.victorops.com/knowledge-base/routing-keys/>`__. If
   there are multiple Splunk On-Call integrations, select the name of
   the desired integration.

SignalFx will now send a notification to Splunk On-Call whenever the
detector rule conditions are met and when the alert clears.
