[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**VictorOps Version Required: Getting Started, Essentials,** or
**Full-Stack**

**What you need to know: This integration requires you have a Google
Voice number along with your VictorOps account** 

[/ht_toggle]

One number customers can call in order to page on-call support using
Google Voice. The following walks through the steps needed to integrate
a google voice number with VictorOps.

--------------

**In Google**:
--------------

Enter your Google Voice account and click on the top left hand main menu
button to see the drop-down menu and select *Legacy Google Voice*. By
clicking on the *Legacy Google Voice* button, it will take you to a new
tab specifically for your Voice account.

.. figure:: images/1-Google2.png
   :alt: google3

   google3

If you don't have a number already, get one by selecting the *Get a
Voice number* link.

.. figure:: images/2-Google2.png
   :alt: google1

   google1

Once you have a number go into settings.

.. figure:: images/3-Google2.png
   :alt: google2

   google2

Go into the “Voicemail & Text” section and select the “Add a new email
address” link.

.. figure:: images/4google2.png
   :alt: google3

   google3

Grab your VictorOps `Generic Email
Endpoint <https://help.victorops.com/knowledge-base/victorops-generic-email-endpoint/>`__
from the VictorOps portal by navigating to *Integrations >> Email
Endpoint*)

.. image:: images/Email-Integration.png

Add the email to your Google Voice account and hit save. Make sure to
include the correct routing key.

.. figure:: images/5Google2.png
   :alt: google5

   google5

A confirmation email will be sent into the VictorOps timeline. Copy out
the confirmation link and enter it to a browser to verify the new email
address.

.. figure:: images/6google2-1.png
   :alt: google6

   google6

.. figure:: images/google7.png
   :alt: google7

   google7

Go back into the Voicemail & Text settings and select the “Email the
message to” checkbox and select the VictorOps email endpoint.

.. figure:: images/7google2.png
   :alt: google8

   google8

--------------

**In VictorOps:**
-----------------

You will need a Rules Engine rule in order to turn all Voicemails into
incidents. You can create the rule based on the transcription of the
message or on every voicemail like the example below.

Navigate to the Rules Engine by visiting *Settings >> Alert Rules
Engine* and create a new rule.

The subject line of the voicemail will always start with “New voicemail
from” so create a wildcard match using that phrase. Then add a
transformation that changes the **message_type** to **CRITICAL**:

.. image:: images/2-Rules-Engine-Rule.png

Test the integration by calling your google voice number and leaving a
message. The transcription will appear in the **state_message** field.

.. figure:: images/lastgoogle2-1.png
   :alt: google11

   google11

That's it, you're done!
