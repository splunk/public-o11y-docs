[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**VictorOps Version Required:** Starter, Growth, or Enterprise

[/ht_toggle]

Bugsnag's cross platform error monitoring automatically detects crashes
in your applications, letting you ship with confidence.

The following will guide you through the steps needed to send you
bugsnag “Team Notifications” into the Splunk On-Call timeline.

**In Splunk On-Call**
---------------------

From the main timeline select **Integrations** *>>* **BugSnag**

If the integration has not yet been enabled, click the “Enable
Integration” button.  Copy the “Service API Key” to your clipboard.
|image

Once you have copied the API key to your clipboard, click on *Settings
>> Routing Keys* page to find your routing key configuration.  Decide
which routing_key will be used with this integration and make sure it is
associated to the correct team/s.  (You may need to create a new key)
 Routing keys are case sensitive.

.. image:: /_images/spoc/atatus2.png
   :alt: atatus2

   atatus2

**In Bugsnag**
--------------

From the main web client, go into Settings.

.. image:: /_images/spoc/bugsnag2.png
   :alt: bugsnag2

   bugsnag2

In settings, select **Team Notifications** and then **VictorOps**.

.. image:: /_images/spoc/bugsnag3.png
   :alt: bugsnag3

   bugsnag3

Setup the alert to notify based on the options provided, and then drop
in your “VictorOps API Key” and the appropriate
`Routing <https://help.victorops.com/knowledge-base/routing-keys/>`__ key.
Hit **save** and you are done!

.. image:: /_images/spoc/bugsnag4.png
   :alt: bugsnag4

   bugsnag4

.. |image1| _images/spoc/Integration-Bugsnag-final.png
