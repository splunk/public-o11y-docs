.. _sentry-integration:

Sentry integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the Sentry integration for Splunk On-Call.

Sentry's real-time error tracking gives you insight into production deployments and information to reproduce and fix
crashes. This integration sends all your Sentry alerts into the Splunk On-Call timeline

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
--------------------------------

1. In Splunk On-Call, select :guilabel:`Integrations` then :guilabel:`Sentry.io`

2. If the integration has not yet been enabled, click the :guilabel:`Enable Integration` button to generate your Service API Key.

3. Copy the “Service API Key” to your keyboard.

Sentry configuration
-----------------------

From your project select :guilabel:`Settings` then :guilabel:`Integrations` and search
:guilabel:`Splunk On-Call`.

.. image:: /_images/spoc/Screen_Shot_2019-12-16_at_11_59_42_AM.png

Paste in your API key, select the appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__. Next,
select :guilabel:`Save Changes` and then :guilabel:`Enable Plugin`.

To send alerts using Splunk On-Call, you need to
have an alert rule (found at :guilabel:`Settigns >> Alerts`) that specifies which
alerts utilize the service. For an initial verification that alerts
will pass to Splunk On-Call, you can create a rule to trigger on “any event”
that notifies the Splunk On-Call service. You may need to spoof an alert to
reach Splunk On-Call.

Questions? Reach out to the 
`Splunk On-Call
support <mailto:support@victorops.com?Subject=Sentry.io%20Splunk On-Call%20Integration>`__
team.
