.. _sentry-integration:

************************************************************************
Matching conditions for the Rule Engine
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.

**Versions Supported:** N/A (SaaS)

**VictorOps Version Required:** **Starter, Growth,** or **Enterprise**

**What you need to know:  Sentry's real-time error tracking gives you
insight into production deployments and information to reproduce and fix
crashes. This simple to set up integration sends all your Sentry alerts
into the VictorOps timeline.**

[/ht_toggle]

**In Splunk On-Call**
---------------------

In Splunk On-call, select *Integrations >> Sentry.io*.

If the integration has not yet been enabled, click the *Enable
Integration* button to generate your Service API Key.

Copy the “Service API Key” to your keyboard.

**In Sentry**
-------------

From your project select **Settings** then **Integrations**, search
**VictorOps**.

..image/_images/spoc/Screen_Shot_2019-12-16_at_11_59_42_AM.png

Paste in your API key, select the appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__. Next,
select **Save Changes** and then **Enable Plugin**.

In order to send alerts using the VictorOps service you will need to
have an alert rule (found at Settings >> Alerts) which specifies which
alerts will utilize the service. For an initial verification that alerts
will pass to VictorOps you an create a rule to trigger on “any event”
which notifies the VictorOps service. You may need to spoof an alert to
reach VictorOps.

You are done. If you have any questions please reach out to the
`VictorOps
support <mailto:support@victorops.com?Subject=Sentry.io%20VictorOps%20Integration>`__
team.
