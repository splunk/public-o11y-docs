.. _google-voice-spoc:

Google Voice integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the Google Voice integration for Splunk On-Call.

Create a phone number customers can call to page on-call support using Google Voice. 

Requirements
===============

* Splunk On-Call version required: Getting Started, Essentials, or Full-Stack
* This integration requires a Google Voice number

Configure in Google
=======================

#. Go to your Google Voice account and select the main menu then :guilabel:`Legacy Google Voice`.

   .. image:: /_images/spoc/1-Google2.png
      :alt: google3

#. If you don't have a number, select :guilabel:`Get a Voice number`.

   .. image:: /_images/spoc/2-Google2.png
      :alt: google1

#. Go to settings.

   .. image:: /_images/spoc/3-Google2.png
      :alt: google2

#. Go to :guilabel:`Voicemail & Text` and select :guilabel:`Add a new email address`.

   .. image:: /_images/spoc/4google2.png
      :alt: google3

#. In Splunk On-Call go to :guilabel:`Integrations` then :guilabel:`Email Endpoint`. Copy the :guilabel:`Generic Email Endpoint`.

   .. image:: /_images/spoc/Email-Integration.png

#. Add the email to your Google Voice account. Replace the trailing ``$routing_key`` with the routing key you intend to use for the alert. For more information on routing keys, see :ref:`spoc-routing-keys`.

   .. image:: /_images/spoc/5Google2.png
      :alt: google5

#. A confirmation email is sent into the Splunk On-Call timeline. Copy the confirmation link and paste it into a browser to verify the new email address.

   .. image:: /_images/spoc/6google2-1.png
      :alt: google6

   .. image:: /_images/spoc/google7.png
      :alt: google7

#. Go back into the Google Voice Voicemail & Text settings and select the :guilabel:`Email the message to` checkbox and select the VictorOps email endpoint.

   .. image:: /_images/spoc/7google2.png
      :alt: google8

Configure in Splunk On-Call
==============================

You need a Rules Engine rule in order to turn all Voicemails into incidents. You can create the rule based on the transcription of the message or on every voicemail like the following example.

#. Go to :guilabel:`Settings` then :guilabel:`Alert Rules Engine`. 
#. Create a new rule.
#. The subject line of the voicemail always starts with "New voicemail from" so create a wildcard match using that phrase. Then add a transformation that changes the ``*message_type`` to ``CRITICAL``.

   .. image:: /_images/spoc/2-Rules-Engine-Rule.png

#. Test the integration by calling your google voice number and leaving a message. The transcription appears in the ``state_message`` field.

   .. image:: /_images/spoc/lastgoogle2-1.png
      :alt: google11
