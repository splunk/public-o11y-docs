[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported:** N/A (SaaS)

**Splunk On-Call Version Required: Enterprise**

[/ht_toggle]

Site 24x7 allows you to monitor websites remotely and receive alerts if
your website becomes unavailable. This integration uses a Site 24x7
Third-Party Integration and the Splunk On-Call Site24x7 Integration
endpoint.

**In Splunk On-Call**
---------------------

Retrieve your Site 24x7 endpoint URL. To do, so go to **Integrations >>
Site 24/7**

..image/_images/spoc/site-247.png

 

Select the Site 24x7 icon, **enable** the integration, then **copy the
URL** to your clipboard.

..image/_images/spoc/Site24x7-2@2x.png

Please remember to replace the **$routing_key** with an actual Splunk
On-Call routing key, as defined
`HERE <https://help.victorops.com/knowledge-base/routing-keys/>`__.

**In Site 24x7**
----------------

From the main web portal select **Admin** then **Third-Party
Integration** then **Actions** then **Webhooks**.

..image/_images/spoc/Nav@2x.png

On the webhook configuration screen, fill in the values as follows and
then click Save:

| 

Field Name

\|

Value

+-----------------------------------+-----------------------------------+
| Integration name                  | victorops                         |
+-----------------------------------+-----------------------------------+
| Hook URL                          | <url_from_victorops_account>      |
+-----------------------------------+-----------------------------------+
| HTTP Method                       | POST                              |
+-----------------------------------+-----------------------------------+
| Post as JSON                      | TRUE                              |
+-----------------------------------+-----------------------------------+
| Send Incident Parameters          | TRUE                              |
+-----------------------------------+-----------------------------------+
| Send Custom Parameters            | TRUE                              |
+-----------------------------------+-----------------------------------+
| Custom Parameters                 | ``{``                             |
|                                   |  ``"message_type": "critical",``  |
|                                   |                                   |
|                                   |  `                                |
|                                   | `"monitoring_tool": "Site24x7",`` |
|                                   |                                   |
|                                   |  ``"stat                          |
|                                   | e_message": "$INCIDENT_REASON",`` |
|                                   |                                   |
|                                   |  ``"entity_dis                    |
|                                   | play_name": "$INCIDENT_REASON",   |
|                                   |      "entity_id":"$MONITORNAME"`` |
|                                   | ``}``                             |
+-----------------------------------+-----------------------------------+
| Integration level                 | All Monitors                      |
+-----------------------------------+-----------------------------------+

..image/_images/spoc/site24x7-2.png

Auto Resolve Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~

A rules engine rule is needed in order for site 24x7 incidents to
resolve in Splunk On-Call when the monitor status is “UP”. The rule will
be configured to state:

When status matches \*UP\* using wildcard, set message_type to RECOVERY.

..image/_images/spoc/Alert_Rules_Engine_-_votest-manoj.png

Reach out to support if you need assistance!

Notify VictorOps only on Select Monitors
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note that there are varying ways to leverage a third-party integration
to apply more granular alerting settings. To only notify Splunk On-Call
on select monitors, change the Integration from *All Monitors*
to *Monitors*.

For even further customization of how and under what monitor conditions
Splunk On-Call should be notified, `Notification
Profiles <https://www.site24x7.com/help/admin/configuration-profiles/notification-profile.html>`__
can further specify waiting rooms, alert frequency, and number of failed
results before firing a webhook.
