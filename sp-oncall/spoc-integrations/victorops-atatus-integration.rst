[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: All**

**VictorOps Version Required:** Starter, Growth, or Enterprise

**What you need to know:**  Annotating the links provided by Atatus to
your alerts requires use of the Alert Rules Engine (Enterprise only
feature)

[/ht_toggle]

`Atatus <https://www.atatus.com/>`__ *is an application performance
management and error tracking solution* *that captures performance
metrics and errors from your servers, frontend environment, and mobile
applications.*

**In Splunk On-Call**
---------------------

From the main timeline select **Integrations** *>>* **Atatus.**

If the integration has not yet been enabled, click the “Enable
Integration” button.  Copy the “Service API Key” to your clipboard.

..image/_images/spoc/Integration-Atatus-final.png

2.  Once you have copied the API key to your clipboard, click
on *Settings >> Routing Keys* page to find your routing key
configuration.  Decide which routing_key will be used with this
integration and make sure it is associated to the correct team/s.  (You
may need to create a new key)  Routing keys are case sensitive.

.. image:: /_images/spoc/atatus2.png
   :alt: atatus2

   atatus2

--------------

**In Atatus**
-------------

 

1. Navigate to *Project Settings>>Team Notifications* and choose the
“VictorOps” tab.  Paste your API key and routing_key from Splunk
On-Call, check the box for “Enable this integration” then click “Save”.

.. image:: /_images/spoc/atatus3.png
   :alt: atatus3

   atatus3

--------------

**Alert Rules Engine: Annotate the Links to Atatus Alerts**
-----------------------------------------------------------

Using the Alert Rules Engine to annotate the links sent by Atatus will
make those links more visible and clickable for users viewing the
incidents in VictorOps, which saves you time when seconds matter.

1. In VictorOps, navigate to **Settings** *>>* **Alert** **Rules
Engine** and select “Add a rule”

2. Configure the Alert Rules Engine rule as follows then click “Save”: -
When **monitoring_tool** matches **Atatus** - Annotate alert with: - URL
>> “Error Details” >> ${{details.errorUrl}}

..image/_images/spoc/Integration-Atatus-Transmog-2-final-final.png

--------------

**Test the Integration**
------------------------

1. From the VictorOps integration settings page in Atatus, click on
“Send test message”

.. image:: /_images/spoc/atatus6.png
   :alt: atatus6

   atatus6

2. Check your Splunk On-Call timeline to make sure an event is
registered from Atatus.
