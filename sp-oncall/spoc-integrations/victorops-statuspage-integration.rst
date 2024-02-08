.. _statuspage-integration:

Statuspage integration for Splunk On-Call
**********************************************************

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)** 

**VictorOps Version Required: Full-Stack only**

**What you need to know: Creating templates in StatusPage.io will make
them accessible in On-Call.**

[/ht_toggle]

The On-Call integration with `StatusPage.io <http://statuspage.io>`__
allows you to provide real-time, updated status messages to both
internal and external stakeholders seamlessly, without having to leave
the fire-fight in the main timeline. Today the integration is
person-to-person, meaning that users may leverage templates or create
new incidents that update Statuspage.io subscribers from within the
On-Call interface.

The following guide will walk you through this simple integration.

--------------

**In StatusPage.io**
====================

From the main admin portal, select your user icon in the bottom
left-hand corner and then click **API info**.

On the resulting page, under **Organization API keys** copy the desired
API Key to your clipboard.

--------------

**In On-Call**
==============

From the main timeline, select *Integrations >> StatusPage.io*

Select the StatusPage.io integration and click *Enable Integration.*

In the resulting *StatusPage API Token* text box, paste in your
StatusPage.io API Key:

.. image:: /_images/spoc/1-Insert-API-token-1.png

After doing so, select your proper StatusPage.io ID from the dropdown:

.. image:: /_images/spoc/2.-Select-page-ID.png

And that's it! Now when you go back into the timeline you will see the
StatusPage.io symbol in the upper right-hand corner of the UI.

.. image:: /_images/spoc/3.-SPIO-Icon-1.png

 

Selecting this will give you an option to create new StatusPage.io
incidents using your existing templates:

.. image:: /_images/spoc/4.-New-SPIO.png

 

Or update existing incidents, all without having to leave the VictorOps
UI.

.. image:: /_images/spoc/5.-Update-SPIO.png
