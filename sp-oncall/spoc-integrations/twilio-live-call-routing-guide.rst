.. _twilio-live-call-spoc:

Twilio Live Call Routing integration for Splunk On-Call


.. meta::
    :description: Configure the Twilio Live Call Routing integration for Splunk On-Call.

The Splunk On-Call and Twilio integration creates a live call routing and alerting system. For instance, when an alert is initiated, a phone call goes out to the on-call person or team.

If the responder answers the phone, a conference call is automatically initiated and the incident is marked as “Acknowledged” in Splunk On-Call and annotated with conference call details. After the call is complete, a “Recovery” alert is sent to Splunk On-Call with additional information about the call, and the incident is marked as “Resolved.” If the alert is routed automatically through your escalation policies and nobody answers the phone, the caller can leave a voicemail which is transcribed and sent into the Splunk On-Call timeline as a critical incident.

Live call routing with Splunk On-Call and Twilio creates an integrated system for on-call alerting and collaborative incident response through phone calls. On-call responders and cross-functional teams can use the Splunk On-Call and Twilio integration to collaborate around alerts in real-time and rapidly remediate critical incidents.

-  Create a single phone number for live call routing in Splunk On-Call, connecting multiple teams and escalation policies to incidents as they're reported.
-  Integrate on-call schedules with alert routing, escalations and call routing in order to automate much of the incident response workflow
-  Track historical incident details such as call information, alert data and chat history in a centralized timeline for better post-incident reviews.
-  Collaborate in real time across multiple channels and teams with the Splunk On-Call and Twilio integration.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Trial Twilio accounts require all phone numbers the integration might end up calling to be verified. To see how this integration works successfully before verifying numbers or purchasing a Twilio phone number, contact Splunk support.

Enable Twilio in Splunk On-Call
====================================

There are a few Splunk On-Call items that you need to complete the Live Call Routing Integration setup.

Twilio Service API Key
-------------------------------

To locate the Twilio Service API Key, navigate to the Integrations page within Splunk On-Call and search for Twilio Live Call Routing or scroll down until you find the icon.

Turn on the integration if you have not previously done so, then copy the Service API Key to your clipboard.

Splunk On-Call API ID and API Key
--------------------------------------

You need your Splunk On-Call API ID and API Key to complete this configuration. The Twilio script uses some of Splunk On-Call documented API calls to pull contact information for the on-call users you are trying to contact.

To locate your API ID and Key, navigate back to the Integrations page, then select the API tab. Activate the API if you have not previously done so, then copy the API ID and one of your API Keys to the clipboard.

.. image:: _images/spoc/API.png
   :alt: API configuration

Splunk On-Call team name and escalation policy name
----------------------------------------------------------------------------

This is the Splunk On-Call team name and associated escalation policy you want to notify. To get this, go to your Splunk On-Call portal and select :guilabel:`Teams`. Copy the team name you want to use for this integration.

.. image:: _images/spoc/Team-Name.png
   :alt: Select team name

To acquire the escalation policy name, select the desired team and select the :guilabel:`Escalation Policies` tab. Copy the name of the escalation policy you'd like to use.

.. image:: _images/spoc/Escalation-Policy-Name.pngç
   :alt: Escalation policy name

You can notify multiple teams and escalation policies using the Live Call Routing Integration. If you want to add more than 1 team or escalation policy to the configuration, repeat this step for all of the teams and escalation policies that you want to get notified from.

Escalation policy considerations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If multiple people are on-duty for a given escalation policy step, only 1 on-duty user is called for that step, chosen at random. The integration then calls somebody from the next specified escalation policy step.

This integration can call a maximum of 3 users, so unless one of the escalation policy steps does not have anybody on-duty, only the first 3 steps of the escalation policy specified are used.

The integration ignores any time delay configured between each escalation policy step. For example, if Step 1 is set to occur immediately, and then Step 2 after 15 minutes, the caller doesn't have to wait 15 minutes for the Step 2 user to be called. The system looks for the separation of steps and call users in that order.

If one of the steps in your escalation policy is to “Execute Policy”, the policy called out isn't executed. Only policy steps that call out rotations or users is executed.

Routing Keys
-------------------------------

To route the incidents created by the Twilio integration to the correct teams in Splunk On-Call, specific routing keys need to be created. After choosing the team and escalation policy you want to use for the integration, copy the URL-friendly team slug out of Splunk On-Call.

.. image:: _images/spoc/URL.png
   :alt: API URL exampleº

Next go to :guilabel:`Settings`, :guilabel:`Routing Keys` and create a new routing key with the URL-friendly team slug associated to that team. Paste the slug you copied into the Routing Key field and select the Team and Escalation Policy it associates with in the Escalation Policies field.

.. image:: _images/spoc/Routing-Key.png
   :spoc: Select policy and teams

This assures that all incidents are sent to the correct escalation policy.

.. note:: If you are using either the Multi-Team Phone Tree or Multiple Phone Numbers to Route to Different Teams setup, you need to repeat this step for all teams specified through the integration, thus creating multiple routing keys.

Integrate Splunk On-Call in Twilio
=================================================

The remaining configuration takes place in Twilio. This integration requires that you have a Twilio account and Twilio phone number.

After you have created an account in Twilio pin 3 items to the menu bar on the left. From your main Twilio console, select :guilabel:`Explore Products`` on the left hand side under the :guilabel:`Develop` tab.

.. image:: _images/spoc/twilio1.png
   :alt: Twilio console

Locate the Voice app under :guilabel:`Programmable Communications` and select the pin icon located on the top right of
the tile. This pins the app to the side bar for easy access later on.

.. image:: _images/spoc/twilio2.png
   :alt: Pin an application

Repeat this process to pin the Phone Numbers app and the Functions app.

.. image:: _images/spoc/twilio3.png
   :alt: Pin remaining apps

Acquiring a Twilio phone number
----------------------------------------

From the main console dashboard select Phone Numbers and then :guilabel:`Manage`. Then select :guilabel:`Buy a Number` if you haven't done so already, and set the :guilabel:`Capabilities` to :menuselection:`Voice`. Select :guilabel:`Search`.

.. image:: _images/spoc/twilio4.png
   :alt: Search for Capabilities

Once you find the number that bests suits your needs, select :guilabel:`Buy` for the number.

Twilio Voice
-----------------------------------------

To turn on some features used in Live Call Routing, you need to activate Enhanced Programmable SIP Features.

To do this, go to :guilabel:`Voice`, :guilabel:`Settings`, :guilabel:`General`. Scroll down to the bottom of the page until you see :guilabel:`Enhanced Programmable SIP Features`. Select :guilabel:`Disabled` to turn on the feature and save.

.. image:: _images/spoc/twilio5.png
   :alt: Turn on SIP features

Twilio Functions
----------------------------

This integration uses Twilio's Functions.

To navigate to the Functions feature from the Twilio console, select :guilabel:`Runtime` from the menu. Next select :guilabel:`Functions` and select :guilabel:`Create Service`.

.. image:: _images/spoc/Slice-1-4.png
   :alt: Create service in Twilio Functions

Name the service ``Splunk On-Call-Live-Call-Routing`` and select :guilabel:`Next`. On the next screen, select :guilabel:`Add +` and then select :guilabel:`Add Function`.

.. image:: _images/spoc/Slice-2-1.png
   :alt: Add function

Name the path for the function as ``/victorops-live-call-routing``. Click away to see the default code generated by Twilio.

Function's code
------------------------------

Highlight the default code that Twilio provides and delete it. Locate the code you want to copy and paste in there at the following link:

:new-page:`https://github.com/victorops/twilio-live-call-routing/blob/master/Splunk-On-Call-Twilio <https://github.com/victorops/twilio-live-call-routing/blob/master/Splunk-On-Call-Twilio>`

Paste the code into your function and save.

Configure environment variables
---------------------------------

Once you save your Function you need to configure a few variables. Under :guilabel:`Settings` towards the bottom of your screen, select :guilabel:`Environment Variables`.

.. image:: _images/spoc/Slice-4-1.png
   :alt: Environment variables

Make sure :guilabel:`Add my Twilio Credentials (ACCOUNT_SID)` and :guilabel:`(AUTH_TOKEN) to ENV` are checked.

Add  ll the environment variables shown in the screenshot. Note that the ``TEAM_1`` and ``ESC_POL_1`` values are case sensitive and must match the Splunk On-Call spelling and capitalization exactly.

.. image:: _images/spoc/carter-testing-1483_twil_io___Twilio_Functions.jpg
   :alt: Environment variables example

The :guilabel:`Key` column's inputs are the following:

- ``EAM_1``
- ``ESC_POL_1``
- ``NUMBER_OF_MENUS``
- ``VICTOROPS_API_ID``
- ``VICTOROPS_API_KEY``
- ``VICTOROPS_TWILIO_SERVICE_API_KEY``

Configure dependencies
---------------------------

In the same section, select :guilabel:`Dependencies`. Make sure the Node Version selected on the menu is Node
v16. Then, similar to the inputs for Environment Variables, enter the Modules and Versions to match the following screenshot.

.. image:: _images/spoc/victorops-live-call-routing-2060_twil_io___Twilio_Functions.png
   :alt: Dependencies configuration

The list of modules and versions is the following:

- ``xmldom``: ``0.1.27``
- ``lodash``: ``4.17.10``
- ``fs``: ``0.0.1-security``
- ``twilio``:	``3.6.3``
- ``got``:	``9.6.0``
- ``util``:	``0.11.0``

.. note:: After completing these steps, select :guilabel:`Deploy All`.  This publishes your Function, Environment Variables, and Dependencies and is necessary for the integration to operate.

Add function to a phone number
----------------------------------

The last step in Twilio is to add the function to the phone number you plan on using for this integration. From the left side Twilio menu, select :guilabel:`Phone Numbers` and then select the specific phone number you plan to use.

.. image:: _images/spoc/Active-Numbers.png
   :alt: Select phone number

Under the :guilabel:`Voice and Fax` section set the :guilabel:`A CALL COMES IN` to :guilabel:`Function`. Select :guilabel:`Splunk On-Call-Live-Call-Routing` as the Service, :guilabel:`ui` as the Environment, and ``victorops-live-call-routing`` as the Function Path.

.. image:: _images/spoc/Twilio-1-1.png
   :alt: Configure A CALL COMES IN

After saving these changes, Twilio changes the Function to a Webhook. While different in name, these operate
identically and do not impact the functionality of your integration.

The standard setup is now complete.

Optional configuration settings
=======================================

A number of optional configuration settings are available. For each, follow the standard setup as described in previous sections and then proceed with the configuration setting you want to implement.

Multi Team phone tree
---------------------------

To add a phone tree, additional environment variables are required. For every additional team you want in the phone tree, enter ``TEAM_2``, ``TEAM_3``, and so on into the Key box. Then, enter the corresponding Escalation Policy with a
Key of ``ESC_POL_2``, ``ESC_POL_3``, and so on, specifying the Escalation Policy's name in the Value box.

You also need to set a variable called ``NUMBER_OF_MENUS`` and set it to ``1`` or ``2``. Setting this to ``1`` results in the operator reading ``Press 1 for <Team 1>``, ``Press 2 for <Team 2>``. Setting this to ``2`` results in an initial
option of ``Please press 1 to reach an On-Call representative or press 2 to leave a message``, before reading out the available team names.

.. note:: Teams are read out from the phone tree in reverse alphabetical order, meaning that a team beginning with 'A' will always be read out after a team beginning with 'Z', regardless of how they are entered amongst TEAM_1, TEAM_2, etc.

The end result looks like the following screenshot:

.. image:: _images/spoc/Evironmental-Variables-2.png
   :alt: Teams listing

Each team added to this function corresponds to a unique Routing Key created during the Routing Keys step.

After adding these environment variables, select :guilabel:`Deploy All`.


Multiple phone numbers to route to different teams
------------------------------------------------------

If instead of the phone tree, you want designated phone numbers to route to different Splunk On-Call teams, a few additional steps are necessary on top of the standard setup. You need to purchase additional Twilio numbers, create new a new Service and Function (with matching Environment Variables and Dependencies), and assign the Service and Function to your new phone number.

To purchase additional Twilio numbers, follow the process specified in the section Acquiring a Twilio Phone Number.

Next, create a new Service and Function. Repeat the steps for Twilio Functions through Add Functio to a Phone Number, this time specifying the Team and Escalation Policy you want this number to call. Name your new service something slightly different than you named the first one.

Routing keys
^^^^^^^^^^^^^^^^

The last part of the configuration takes place in Splunk On-Call. For detailed instructions, see the Routing Keys section.

No call functionality
--------------------------

If you want to prevent the live-calling functionality of this integration that tries to connect a caller live on the phone with an on-call individual, instead immediately prompting the caller to leave a voicemail, an additional Environment Variable is necessary.

In Twilio, navigate to :guilabel:`Develop`, :guilabel:`Functions`, :guilabel:`Services` and locate the service you'd previously created. Next, select :guilabel:`Environment Variables` at the bottom of the screen and add a new Environment Variable. Set the Key as ``NO_CALL`` and Value as ``TRUE``.

.. image:: _images/spoc/NO_CALL-scaled.jpg
   :alt: Configuring NO_CALL

Once this is added, select :guilabel:`Deploy All` to push your changes.

No voicemail functionality
--------------------------

If you want to prevent the ability for a caller to leave a voicemail if no on-call individuals answer the phone, instead informing the caller that an incident will be created and they'll be called back shortly, an additional environment variable is necessary.

In Twilio, navigate to :guilabel:`Develop`, :guilabel:`Functions`, :guilabel:`Services` and locate the service you'd previously created. Next, select on :guilabel:`Environment Variables` at the bottom of the screen and add a new Environment Variable. Set the Key as ``NO_VOICEMAIL`` and Value as ``TRUE``.

.. image:: _images/spoc/NO_VOICEMAIL.jpg
   :alt: Configuring NO_VOICEMAIL

Once this is added, select :guilabel:`Deploy All` to push your changes.

Voicemail transcription and recording URL emailed to static email address
-------------------------------------------------------------------------

To email a recording URL and transcription of any voicemails to a static email address, a SendGrid account is necessary.

In SendGrid, select :guilabel:`Settings`, :guilabel:`API Keys`, :guilabel:`Create API Key`.  Give the API Key a name, select :guilabel:`Full Access`, and select :guilabel:`Create & View`. Copy the API Key value and store is somewhere secure. The remainder of the configuration takes place in Twilio.

Navigate into the Twilio function you've created under :guilabel:`Develop`, :guilabel:`Functions`, :guilabel:`Services`, :guilabel:`Splunk On-Call-Live-Call-Routing`. Select :guilabel:`Environment Variables`.

Four new Environment Variables need to be added to connect the Twilio account to the SendGrid one and achieve this emailing functionality. The ``Key`` column's inputs are the following:

- ``SENDGRID_API_SECRET``:	the API Key you'd previously copied from SendGrid
- ``FROM_EMAIL_ADDRESS``: the email address you verified in SendGrid
- ``TO_EMAIL_ADDRESS``: the static email address to send the email to
- ``VM_EMAIL``: set to ``TRUE``

The ``SENDGRID_API_SECRET`` value is the API Key you previously copied in SendGrid, the ``TO_EMAIL_ADDRESS`` is the email address you want the email send to.

.. image:: _images/spoc/SendGrid-Env-Variables-2.jpg
   :alt: Sendgrid configuration in Twilio

Select :guilabel:`Dependencies` to add the ``@sendgrid/mail 7.6.0`` dependency.

.. image:: _images/spoc/SendGrid-dependency.jpg
   :alt: Add dependency

After you've added these new environment variables and new dependency, select :guilabel:`Deploy All`. Now, when a caller leaves a voicemail, an email is sent to the ``TO_EMAIL`` value you've specified that includes the voicemail transcription and recording URL.

Call or voicemail menu
----------------------

If you want to set an additional menu item that asks if the user want to leave a voicemail or be connected directly to the on-call representative, set the ``NUMBER_OF_MENUS`` created in the Multi Phone Tree step to ``2``.

.. note:: This is not compatible with the No Voicemail or No Call configurations.

Voicemail transcription
-----------------------

Transcription is limited to voicemails with a duration greater than 2 seconds and less than 120 seconds. If you request transcription for a recording outside these duration limits, Twilio writes a warning to your debug log rather than transcribing the recording. In case that the message cannot be transcribed, a critical incident is posted in Splunk On-Call, with a ``Twilio was unable to transcribe message`` note within the alert payload.

Listen to voicemail
-------------------

Although voicemail is transcribed and posted to your Splunk On-Call timeline, some users might prefer to listen to the actual voicemail. This can be done through the Twilio platform, which can be linked to from Splunk On-Call using annotations.

Create the following Rules Engine rule to link back to a specific call's history and to listen to or download the voicemail.

When ``monitoring_tool`` matches ``Twilio`` annotate the alert with:

1. Label: ``Listen to Voicemail``
2. URL:
   ``https://www.twilio.com/console/voice/calls/logs/${{entity_id}}``

When navigating to the link, users need to first sign into the Twilio account.


Troubleshooting Twilio and Splunk On-Call
=================================================

See the following common issues and the suggested solutions.

**Problem 1**:  The on-call individuals do not receive phone calls.

The caller hears “Trying next on-call representative, Trying next
on-call representative, Trying next on-call representative… Please leave
a message for the ${Team} and hang up when you are finished”.

This might be because a Trial Twilio account is being used (as opposed to
a paid Twilio account), and therefore the phone numbers attempting to be
called will need to be verified within Twilio before they can be
reached. Additionally, even with a paid Twilio account, phone numbers
in certain countries (such as Slovakia) still need to verify
numbers before calling them.

You are able to verify the numbers you're calling to by following the
steps under the 'Add a Verified Caller ID using the Console Site' section.

**Problem 2**:  'There is a missing configuration value.  Please
contact your administrator to fix the problem.'

This message represents that either one of the Twilio Dependencies or
Environment variables is incorrectly configured

Check that these values in your Twilio account exactly match the
recommended ones:

.. image:: _images/spoc/Environmental-Variables-1.png
   :alt: Recommended environment variables

.. image:: _images/spoc/Twilio_Cloud_Communications___Web_Service_API_for_building_Voice_and_SMS_Applications.jpg
   :alt: Annotations

**Problem 3**:  'There was an error retrieving the list of teams for
your organization.'

This message represents that the team attempting to be notified doesn't
exist, has not been specified properly, or that the ``VICTOROPS_API_KEY`` or
``VICTOROPS_TWILIO_SERVICE_API_KEY`` hasn't been copied and pasted
accurately.

Double check that the spelling of the team in Splunk On-Call (including
capitalization) is matched exactly within the Twilio Environment
Variables and that the proper value is in place for the
``VICTOROPS_API_KEY`` and ``VICTOROPS_TWILIO_SERVICE_API_KEY``.

**Problem 4**: 'There was an error retrieving the on-call phone
numbers. Please try again.'

This means that the number attempting to be called has not yet been
verified in Splunk On-Call

Verify the number by selecting the 'Verify' button next to it within the
User's Splunk On-Call personal profile, and then enter in the verification
code sent to the device

**Problem 5**: 'Team ${team-name} does not exist. Please contact
your administrator to fix the problem'

This indicates that the team spelling or capitalization in Twilio (under
the Value column in Environment Variables) might not perfectly mirror the
team spelling/capitalization in Splunk On-Call

Double check this and correct if necessary.

**Problem 6**:  The user attempting to be called does not receive a
call.  The integration skips to calling the next user specified in the
escalation policy.

This situation can occur if the user who does not receive a call does
not have a verified number entered into their Splunk On-Call profile. Enter a number for this user, and then try again.

**Problem 7**:  The integration only calls 3 users before prompting
the caller to leave a voicemail.

This is an inherent limitation of the integration, and cannot be adjusted.

**Problem 8**: There are multiple people on-duty for a given escalation policy step, but only one of them receive a call.

This is another inherent limitation of the integration, and cannot be adjusted.  If multiple people are on-duty at the
same time for a given escalation policy step, the integration chooses one user at random each time a call is placed to route the call to.

**Problem 9**: Nobody is called. The caller is prompted to leave a
message.

This might be caused by a mismatch between the values in Twilio's
Environment Variables and the corresponding values in Splunk On-Call. Check that the spelling of the Team and Escalation Policy in Twilio match exactly what is used in Splunk On-Call.

**Problem 10**: 'We were unable to reach an on-call representative'

This message means that the team attempting to be notified either doesn't exist, or has not been specified properly

Double check that the spelling of the team in Splunk On-Call (including capitalization) is matched exactly within the Twilio Environment Variables.

This also might be because a Trial Twilio account is being used (as opposed to a paid Twilio account), and therefore the phone numbers attempting to be called will need to be verified within Twilio before they can be reached. Additionally, even with a paid Twilio account, phone numbers in certain countries (such as Slovakia) will still need to
verify numbers before calling them.

You are able to verify the numbers you're calling to by following the steps under the 'Add a Verified Caller ID via the Console Site' section.

**Problem 11**: 'An application error has occurred.  Goodbye' and/or you
see 82002 and 11200 errors in the Twilio logs

This indicates that the code used within the Splunk On-Call function is not properly copied and pasted, that the path is not specified properly, that the Dependencies haven't all been copied over (oftentimes the 'got' module), that there's a typo in the Environment Variables, that the defined Escalation Policy references an 'Execute Policy' step, or that the Splunk On-Call user attempting to be called doesn't have a number in their user profile. Check these areas.

**Problem 12**: A Splunk On-Call user has multiple phone numbers configured within their profile and the wrong one is called by the integration

The phone number that has been in the Splunk On-Call user profile the longest will be the one used by the integration.  It may be necessary to remove numbers you do not want called and then re-add them in order to have the one you do want called be the oldest.

**Problem 13**: 'The number you have dialed is not in service. Please check the number and try again'

This message may mean that the function has not been properly assigned to your Twilio phone number.  Ensure that the number is configured to perform the Splunk On-Call function when a call comes in.

**Problem 14**: After selecting 'Save' on the Functions >> Configure page, you see a “Failed to deploy your Function” message

If you encounter this error message when trying to save on the Configure page in Twilio (where Environment Variables and Dependencies are listed), this may be due to a recent change of the accepted values for the 'got' dependency.  Previously, we recommended people leave the version for this 'got' dependency blank, though with a recent change to
the v10 package of 'got', we now must specify this version as 9.6.0.  Ensure all dependencies match the screenshot/table in the above “Configure Environment Variables” section and re-try saving.

..image images/spoc/Voice-2.png
   :alt: Voice configuration

**Problem 15**: The integration calls a seemingly random team, not the one you've specified within the Functions >> Configure section in Twilio

This might be because the code used in your Twilio function isn't the one intended for your use case.  If setting up the standard, single-phone number configuration, delete the existing code in place within *Functions >> Manage >> Splunk On-Call* and replace it with the code found at
https://github.com/victorops/twilio-live-call-routing/blob/master/victorops-twilio.js

.. note::  In your escalation policy within Splunk On-Call, live call routing only calls users or rotations referenced either by rotation or directly in the escalation policy. Live call routing does not recognize the step to execute a different escalation policy, rather, it skips that step and immediately progress to the next one.
