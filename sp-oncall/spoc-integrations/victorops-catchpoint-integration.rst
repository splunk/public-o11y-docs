[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**VictorOps Version Required: Starter, Growth,** or **Enterprise**

**What you need to know: If you would like to customize the alert
payload, refer to** `this
article <https://help.victorops.com/knowledge-base/victorops-restendpoint-integration/>`__
**for more information on formatting.**

[/ht_toggle]

Catchpoint delivers world-class Web Performance Monitoring for all
Internet services: Website, Mobile, App, Ads, API, DNS, CDN, Streaming,
Cloud, & more.

The following will walk you through the steps needed to integrate
Catchpoint with Splunk On-Call.

**In Splunk On-Call**
=====================

In VictorOps, select **Integrations** *>>* **Catchpoint**

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.  Be
sure to replace the “$routing_key” section with the actual routing key
you intend to use. (To view or configure route keys in Splunk On-Call,
click *Settings>> Routing Keys*)

.. image:: images/Catchpoint-skitch.png

--------------

**In Catchpoint**
=================

1) Navigate to *Settings* >> *API.* |catchpoint2|

2) Under Alert Webhook set the status to Active, Paste in your “API URL”
   that you got in Splunk On-Call.

3) Select *Template* and then *Add new*

.. image:: images/Screenshot-2017-05-18-15.33.00.png

4) Give it a name (“VictorOps Integration” for example) and then set the
   Format to *JSON*

.. image:: images/API___Catchpoint_®.png

5) Paste the following code in the *Template* section:

{
“message_type”:“:math:`{switch('`\ {notificationLevelId}‘,'0',‘warning',‘1',‘critical',‘2',‘recovery',‘3',‘recovery')}”,
“monitoring_tool”: “Catchpoint”, “entity_display_name”: “Catchpoint
Alert for ${testName} on node :math:`{nodeDetails(`\ {nodeName})}”,
“entity_id”: “:math:`{testId}\_`\ {AlertInitialTriggerDateUtcEpoch}”,
“state_message”: “Alert Type
ID-:math:`{alertTypeId}, Test Type ID-`\ {testTypeId},
Node-:math:`{nodeDetails('`\ {nodeName}')}, Product-
:math:`{productId}, Test\_url-`\ {testUrl}” }

6) Select your newly created template, hit *Save,* and you're done!

.. image:: images/Screenshot-2017-05-18-15.43.31.png

Also, if you're looking for additional variables to add to your payload,
please seek out the Alert Webhook Macros in `the support section of the
Catchpoint platform <https://support.catchpoint.com/>`__. Please note,
you may add as many variables as you want, but customizing the
parameters of the existing Template may result in degraded
functionality.

.. |catchpoint2| image:: images/catchpoint2.png
