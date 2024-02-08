[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

Splunk On-Call Version Required: Starter, Growth, or Enterprise

[/ht_toggle]

Rapid7 is here to help you reduce risk across your entire connected
environment so your company can focus on what matters most. Whether you
need to easily manage vulnerabilities, monitor for malicious behavior,
investigate and shut down attacks, or automate your operations — Rapid7
has solutions and guidance for you.

--------------

In Splunk On-Call
-----------------

From the main timeline select **Integrations >> 3rd Party Integrations
>> Rapid7**

If the integration has not yet been enabled, click the “Enable
Integration” button.  Copy the “URL to notify” to your clipboard.

Once you have copied the URL to notify to your clipboard, click on
**Settings**\ * >> *\ **Routing Keys** page to find your routing key
configuration.  Decide which routing_key will be used with this
integration and make sure it is associated to the correct escalation
policy/policies. For more information on routing keys or instructions on
creating a new one, please see `this
article <https://help.victorops.com/knowledge-base/routing-keys/>`__.

--------------

In Rapid7
---------

Configuring the Data Exporter
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. From your dashboard, select **Data Collection** on the left hand
   menu.
2. When the Data Collection page appears, click the **Setup Event
   Source** dropdown and choose **Add Event Source**.
3. From the “Security Data” section, click the **Data Exporter** icon.
   The “Add Event Source” panel appears.
4. Choose your collector and event source. You can also name your event
   source if you want.
5. Provide the URL that you previously copied from Splunk On-Call. For
   security reasons, Rapid7 recommends using HTTPS as the protocol
   whenever possible.
6. If the secret is not already provided, enter in the “Secret” field.
7. Optionally choose to export asset-specific Alerts from InsightIDR by
   checking the **Alerts** box.
8. Optionally choose to trust all certificates and/or self-signed
   certificates by checking the appropriate boxes.
9. Click **Save**.

..image:: /_images/spoc/Screen-Shot-2018-10-19-at-11.14.35-AM.png

The Data Exporter is now configured and will send two types of messages.
The first is a ``test`` event to confirm the URL is working. This
message will be sent whenever the webhook data exporter is started or if
the configuration is changed. The second type is an ``idr_alert`` event.
This type of message will be sent whenever an alert triggers in
InsightIDR and contains information about the alert in the event. More
details about each type of event can be found in Rapid7's documentation
`here <https://docs.rapid7.com/insightidr/webhook>`__.
