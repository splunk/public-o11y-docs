[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported:** N/A (SaaS)

**VictorOps Version Required:** Getting Started, Essentials,***\* or
\****Full-Stack***\*

[/ht_toggle]

AppOptics provides a complete solution for monitoring and understanding
the metrics that impact your business at all levels of the stack.

The VictorOps integration with AppOptics allows you to send all
AppOptics alerts into the VictorOps timeline, enabling your team to act
quickly. The following article provides instructions for the setup of
this integration.

--------------

**In VictorOps**
================

From the main timeline, select *Settings >> Alert Behavior* >>
Integrations >> *AppOptics*.

.. image:: images/800x320@2x.png

If the integration has not yet been enabled, click the *Enable
Integration* button to generate your Service API Key, as seen here:

.. image:: images/AppOptics.png

 

Copy the *Service API Key* to your clipboard and determine which
VictorOps routing-key value will be used for this integration.  For more
information on routing keys and best practices, click
`here <https://help.victorops.com/knowledge-base/routing-keys/>`__.

--------------

In AppOptics
============

From the *Organization Details* section, choose the *Notification
Services* tab, select *VictorOps*, and click *Add Configuration.*

.. image:: images/librato_VO_option@2x.png

 

Give the integration configuration a title, then paste in the service
API key and routing key you copied from VictorOps, then click *Save.*

.. image:: images/librato_VO_settings@2x.png
