[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

VictorOps Version Required: Starter, Growth, or Enterprise

[/ht_toggle]

Coralogix is a SaaS based log management solution. Combining the
standard ELK stack with Machine Learning, an enhanced UI and out of the
box integrations creates a powerful solution that can help make sense of
the abundance of data produced by your applications and infrastructure.
Coralogix simplifies and shortens root-cause and impact analysis and
using its powerful algorithms can identify issues before you or
customers are aware of them.

--------------

In VictorOps
------------

From the main timeline select **Integrations >> 3rd Party Integrations
>> Coralogix**

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

In Coralogix
------------

Creating your webhook(s)
~~~~~~~~~~~~~~~~~~~~~~~~

From the main dashboard, click on your username symbol in the upper
righthand corner and click \_\ **Settings**\ \_\_.\_  Towards the top of
the screen, navigate to **Webhooks** and then click the blue “+” button
on the righthand side of the screen.  Provide an Alias for the webhook
and change the type from the default ‘Slack’ setting to ‘WebHook’. 
Next, paste in the ‘URL to notify’ that you’d previously copied from
VictorOps.

.. image:: images/Coralogix.png

Leave the Method on the default ‘Post’ setting and expand the ‘Edit
body’ box.  Below is the default payload we recommend sending to
VictorOps, though you’re welcome to include additional fields if
applicable.

``{`` ``"message_type": "CRITICAL",`` ``"entity_id": "$ALERT_ID",``
``"entity_display_name": "$ALERT_NAME",``
``"alert_severity": "$EVENT_SEVERITY",``
``"state_message": "$LOG_TEXT",``
``"description": "$ALERT_DESCRIPTION",``
``"alert_action": "$ALERT_ACTION",`` ``"alert_url": "$ALERT_URL",``
``"log_url": "$LOG_URL",`` ``"monitoring_tool": "Coralogix",``
``"team": "$TEAM_NAME",`` ``"application": "$APPLICATION_NAME",``
``"subsystem": "$SUBSYSTEM_NAME",`` ``"ipAddress": "$IP_ADDRESS",``
``"timestamp": "$EVENT_TIMESTAMP",`` ``"hitCount": "$HIT_COUNT"`` ``}``

There are two specific fields of particular note - the **message_type**
field, which declares the criticality of the alert in VictorOps, and the
**entity_id** field, which serves as the central identifier of the
alert.  Below are the accepted values for the **message_type** field
(more info in `this
article <https://help.victorops.com/knowledge-base/incident-fields-glossary/>`__):

-  CRITICAL
-  WARNING
-  ACKNOWLEDGEMENT
-  INFO
-  RECOVERY

It may be necessary to create multiple webhooks, tied with different
Alerts in Coralogix (explained below), in order to properly send your
desired info with desired criticality to VictorOps.  It may also be
useful to ensure that the entity_id, drawn from the ALERT_ID field in
Coralogix when following the default payload, remains consistent across
these alerts with varying criticality.  This will potentially allow
incidents to auto-acknowledge or auto-resolve in VictorOps when the
right events trigger these webhooks in Coralogix.

For more information on Custom Alert Webhooks, please refer to
Coralogix’ documentation at
https://coralogix.com/tutorials/alert-webhooks/

Testing the webhook
~~~~~~~~~~~~~~~~~~~

After filling out the payload of this webhook, Coralogix offers a
convenient “Test Configuration” button.  If you’d like to verify that
your webhook is properly configured to send alerts to VictorOps, click
this button and check your VictorOps timeline to ensure that the alert
arrived.

Assigning your Webhook to an Alert
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once you’ve created the webhook that points towards VictorOps, you’ll
want to assign it to a Coralogix Alert in order to have the webhook fire
on the proper events.  In Coralogix’ top nav bar, navigate
to **Alerts**\ \_.\_  Either select an existing alert or click the ‘New
Alert’ button.  Apply your intended Alert settings and scroll down to
the ‘Recipients’ section.  Select the VictorOps webhook that you’d
previously created and save the Alert.

.. image:: images/Slice-1-3.png

You should now be configured to send Coralogix alerts into VictorOps.

Note: It may be necessary to create multiple webhooks and alerts in
Coralogix to cover all events you’d like surfaced in VictorOps.  For
detailed assistance, please email victorops-support@splunk.com.
