PRTG integration for Splunk On-Call
**********************************************************

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**VictorOps Version Required: Starter, Growth, or Enterprise**

**What you need to know: To ensure incidents are resolved correctly,
choose static fields for the Critical and Resolved subject lines.**

[/ht_toggle]

PRTG is a highly flexible and generic software for monitoring IT
infrastructure.  The following documentation will walk you through how
to send PRTG “Notifications” to the Splunk On-Call timeline by
leveraging our `Generic Email
Endpoint <http://help.victorops.com/knowledge-base/victorops-generic-email-endpoint/>`__.

--------------

**In Splunk On-Call**
---------------------

In VictorOps, select **Integrations** *>>* **PRTG**

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.  Be
sure to replace the “$routing_key” section with the actual routing key
you intend to use. (To view or configure route keys in Splunk On-Call,
click *Settings >> Routing Keys*)

.. image:: /_images/spoc/PRTG-Email-final.png

--------------

**In PRTG**
-----------

-  From the main dashboard select *Setup >> Account Settings
   >> Notifications*.
-  Select *Add new notification*\ **.**
-  Give the notification a name make sure the status is set to
   *Started*. Under *NOTIFICATION SUMMARIZATION* set the *Method*
   to *Always notify ASAP*.

**To create an incident:**
--------------------------

Select the checkbox for *SEND EMAIL*. This will expand the email
settings. Paste your Splunk On-Call email endpoint address into the
*Send to Email Address* field.  Use the following text as the subject
line:

**[%sitename] %device %name CRITICAL**

**To resolve an incident:**
---------------------------

If you would like PRTG to send a recovery email to close the incident in
Splunk On-Call when a monitored device recovers, you will need to create
a *separate* notification, with another email that uses this text as the
subject:

**[%sitename] %device %name RECOVERY**

-  Set the *Format* field to *Text*, then select *Save*\ **.**
-  To test the integration return to the *NOTIFICATIONS* settings page,
   find your newly created Splunk On-Call notification method and select
   *Test*. This will trigger an incident in your Splunk On-Call
   timeline, and the integration is complete!
