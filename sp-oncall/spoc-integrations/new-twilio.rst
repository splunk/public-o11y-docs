.. _twilio-live-call-routing-spoc:

Twilio live call routing integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the Twilio live call routing integration for Splunk On-Call.

The Splunk On-Call (formerly VictorOps) and Twilio integration creates a live call routing and alerting system to improve MTTA and MTTR for DevOps and IT operations teams.

Live call routing with Splunk On-Call and Twilio creates an integrated system for on-call alerting and collaborative incident response through the phone. On-call responders and cross-functional teams can use the Splunk On-Call and Twilio integration to collaborate around alerts in real time and rapidly remediate critical incidents.

For instance, when an alert is initiated, the on-call person or team is called. If the responder answers, a conference call is automatically initiated and the incident is marked as acknowledged in Splunk On-Call and is annotated with conference call details. Once the call is complete, a recovery alert is sent to Splunk On-Call with additional information about the call, and the incident is marked as resolved. 

If the alert is routed through your escalation policies and nobody answers the phone, the caller can leave a voicemail which is transcribed and sent into the Splunk On-Call timeline as a critical incident.

How live call routing and integrated on-call alerting leads to rapid incident resolution
============================================================================================

-  Create a single phone number for live call routing in Splunk On-Call to connect multiple teams or escalation policies to incidents as they're reported
-  Integrate on-call schedules with alert routing, escalations, and call routing in order to automate much of the incident response workflow
-  Track historical incident details such as call information, alert data, and chat history in a centralized timeline for better post-incident reviews
-  Collaborate in real time across multiple channels and teams with the Splunk On-Call and Twilio integration

Requirements
=================

- A Twilio account
- Splunk On-Call Versions: Getting Started, Growth, or Enterprise
- At this time, trial Twilio accounts require all phone numbers the integration might end up calling. Follow the phone number verification process for all Splunk On-Call VictorOps users' phone numbers. Search "How to Add and Remove a Verified Phone Number or Caller ID with Twilio" in Twilio documentation. To see how this integration works before verifying numbers or purchasing a Twilio phone number, contact Splunk On-Call Support.

Twilio integration overview
===============================

Use 1 phone number to call your on-call teams and connect directly to the on-call user for that team. If the on-call user doesn't respond the call escalates through the escalation policy until someone answers (up to 3 called users). When someone answers, an acknowledgement alert is sent to Splunk On-Call, and an incident is opened. This alert contains information about who is calling and who was notified. Once the call is complete, a recovery alert is sent into Splunk On-Call with additional information about the length of the call, and the incident is resolved.

In the event that the call goes through all the escalation steps and no one answers, the caller is prompted to leave a voicemail. That voicemail is transcribed and sent into the timeline as a critical message routed to the team that was responsible for the call.

There is also the option to add a phone tree in front of this process if you want to use a single number for multiple teams at your company or
escalation policies in Splunk On-Call, and additionally the option to configure separate numbers to call separate teams and escalation
policies. The following guide walks you through the process to get up and running with Splunk On-Call and Twilio.

Enable Twilio in Splunk On-Call
==================================

There are a few Splunk On-Call items that you need to complete the live call routing integration setup. 

Twilio service API key
------------------------

To locate the Twilio service API key, go to :guilabel:`Integrations` in Splunk On-Call. Search for Twilio Live Call Routing or scroll until you find the icon. The integrations list is in alphabetical order.

Enable the integration then copy the Service API Key and save it for use later.

|image1|

Splunk On-Call API ID and API key
---------------------------------------

You also need your Splunk On-Call API ID and API key to complete this configuration. The Twilio script uses Splunk On-Call API calls to pull contact information to contact your on-call users.

To locate your API ID and key, go to :guilabel:`Integrations` then :guilabel:`API`. Enable the API, then copy the :guilabel:`API ID` and 1 of your :guilabel:`API Keys` and save it for later.

.. image:: /_images/spoc/API.png

Splunk On-Call team name and escalation policy name
-------------------------------------------------------

This is the Splunk On-Call team name and associated escalation policy you want to notify. To get this, go to Splunk On-Call and select :guilabel:`Teams`. Copy the team name you want to use for this integration. In the following example, we use the DevOps team.

.. image:: /_images/spoc/Team-Name.png

To get the escalation policy name, select your desired team, and go to the :guilabel:`Escalation Policies` tab and copy the name of the escalation policy you want to use. In the following example, we use the standard escalation policy for the DevOps team.

.. image:: /_images/spoc/Escalation-Policy-Name.png

You can notify multiple teams and escalation policies. If you want to add more than 1 team or escalation policy to the configuration, repeat this step for
all of the teams and escalation policies that you want to notify.

Escalation policy notes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If multiple people are on-call for a given escalation policy step, 1 on-call user will be chosen at random to be called for that step. The integration then call somebody from the next specified escalation policy step.

This integration can call a maximum of 3 users. So, only the first 3 steps of the escalation policy specified are used.

The integration ignores any time delay configured between each escalation policy step. For example, if step 1 is set to occur immediately, and then step 2 after 15 minutes, the caller will not have to wait 15 minutes for the step 2 user to be called.

If 1 of the steps in your escalation policy is to execute a policy, the policy called out will not be executed. Only policy steps that call
out rotations or users are executed.

Routing keys
-----------------

To route the incidents created by the Twilio integration to the correct teams in Splunk On-Call, create routing keys. After choosing the team and escalation policy you want to use for the integration, copy the URL-friendly team slug from Splunk On-Call. The following image shows tthe team slug for the DevOps team.

.. note:: 
   For teams created after 2017 the team slug is formatted similar to: ``team-35Rgt19gE35g3``.

.. image:: /_images/spoc/URL.png

Next go to :guilabel:`Settings` then :guilabel:`Routing Keys`. create a new routing key with the URL-friendly team slug associated to that team. Paste the slug in the :guilabel:`Routing Key`` field and select the team and escalation policy in the :guilabel:`Escalation Policies` field.

.. image:: /_images/spoc/Routing-Key.png

This ensures that all incidents are sent to the correct escalation policy.

.. note:: 
   If you are using the multi-team phone tree or multiple phone numbers to route to different teams setup, you need to repeat this step for all teams specified through the integration, thus creating multiple routing keys.

Configure Splunk On-Call in Twilio
======================================

The remaining configuration is in Twilio. You  have to have a Twilio account and Twilio phone number. 

In your Twilio account, pin 3 items to the menu bar. Select :guilabel:`Develop` then :guilabel:`Explore Products`.

.. image:: /_images/spoc/twilio1.png

Go to :guilabel:`Programmable Communications` and find the :guilabel:`Voice`. Select the pin icon to pin the app to the side bar.

.. image:: /_images/spoc/twilio2.png

Repeat this process to pin the :guilabel:`Phone Numbers` app located under :guilabel:`Super Network` and the :guilabel:`Functions (Beta)` app located under :guilabel:`Developer Tools`.

.. image:: /_images/spoc/twilio3.png

.. _get-phone-number:

Get a Twilio phone number
-----------------------------

#. Go to :guilabel:`Phone Numbers` then :guilabel:`Manage`. 
#. Select :guilabel:`Buy a Number`. 
#. Set the :guilabel:`Capabilities` to :guilabel:`Voice` and select :guilabel:`Search`.

.. image:: /_images/spoc/twilio4.png

Find the number that bests suits your needs and select :guilabel:`Buy`. The fee is be $1.00 monthly.

Twilio voice
-----------------

To activate some features used in Live Call Routing, you need to activate :guilabel:`Enhanced Programmable SIP Features`.

#. Go to :guilabel:`Voice` then :guilabel:`Settings` then :guilabel:`General`. 
#. Scroll to :guilabel:`Enhanced Programmable SIP Features` and select to activate.
#. Select :guilabel:`Save`.

.. image:: /_images/spoc/twilio5.png

.. _twilio-functions:

Configure a Twilio function
---------------------------------

This integration makes use of Twilio Functions. See :new-page:`https://www.twilio.com/docs/runtime/functions`.

Configuration
^^^^^^^^^^^^^^^^^^

#. Go to :guilabel:`Runtime` then :guilabel:`Functions`.
#. Select :guilabel:`Create Service`.

   .. image:: /_images/spoc/Slice-1-4.png

#. Name the service “VictorOps-Live-Call-Routing” and select :guilabel:`Next`.
#. Select :guilabel:`Add +` then :guilabel:`Add Function`.

   .. image:: /_images/spoc/Slice-2-1.png

#. Set the name the path for the function as “/victorops-live-call-routing”. 

Default code for the function shows.

   .. image:: /_images/spoc/Slice-3-1.png

Add the function code
^^^^^^^^^^^^^^^^^^^^^^^^^

#. Delete the default code.  
#. Copy the code from the following link: :new-page:`https://github.com/victorops/twilio-live-call-routing/blob/master/Splunk-On-Call-Twilio`.
#. Paste the copied code in your function.
#. Select :guilabel:`Save`.

Configure environment variables
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Next, you need to configure a few variables.

#. Select :guilabel:`Settings` then :guilabel:`Environment Variables`.  

   .. image:: /_images/spoc/Slice-4-1.png

#. Select :guilabel:`Add my Twilio Credentials (ACCOUNT_SID) and (AUTH_TOKEN) to ENV`.
#. Add all the environment variables in any order.
    * Enter in your API credentials and Twilio service API key that you located in Splunk On-Call. 
    * For :strong:`TEAM_1`, use the team name copied from your Splunk On-Call account.
    * For :strong:`ESC_POL_1`, use the name of the target escalation policy. 
    * For :strong:`NUMBER_OF_MENUS`, enter 0 unless you want a multi-team phone tree (see below).

The following list includes the key column inputs:

   * ``TEAM_1``
   * ``ESC_POL_1``
   * ``NUMBER_OF_MENUS``
   * ``VICTOROPS_API_ID``
   * ``VICTOROPS_API_KEY``
   * ``VICTOROPS_TWILIO_SERVICE_API_KEY``

.. note::
   :strong:`TEAM_1` and :strong:`ESC_POL_1` values are case sensitive and have to match the Splunk On-Call format exactly.

   .. image:: /_images/spoc/carter-testing-1483_twil_io___Twilio_Functions.jpg

Configure dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Select :guilabel:`Dependencies`.
#. Enter modules and versions in any order.

   .. image:: /_images/spoc/victorops-live-call-routing-2060_twil_io___Twilio_Functions.png

#. After completing these preceding steps, select :guilabel:`Deploy All` to publish your function, environment variables, and dependencies.

A green check mark displays next to the function and a "Deployed to environment" message displays at the bottom of the logs. I takes 5-15 seconds for functions to deploy. 

.. _add-function-to-phone:

Add function to a phone number
--------------------------------

The last step in Twilio is to add the function to the phone number you plan on using for this integration. 

#. Select :guilabel:`Phone Numbers` then select the phone number you plan to use.

   .. image:: /_images/spoc/Active-Numbers.png

#. Under the :guilabel:`Voice and Fax` section, set the :guilabel:`A CALL COMES IN` to :guilabel:`Function`.
#. Select :guilabel:`VictorOps-Live-Call-Routing` as the :guilabel:`Service`.
#. Select :guilabel:`ui` as the :guilabel:`Environment`.
#. Select :guilabel:`/victorops-live-call-routing` as the :guilabel:`Function Path`.

   .. image:: /_images/spoc/Twilio-1-1.png

Optional configuration settings
=================================

Multi-team phone tree
-----------------------------

To add a phone tree, you have to add additional environmental variables. 

#. For every team you want in the phone tree, enter :guilabel:`TEAM_2`, :guilabel:`TEAM_3`, and so on in into the :guilabel:`Key` field. 
#. Enter the corresponding escalation policy with a keys that correspond. For example, :guilabel:`ESC_POL_2`, :guilabel:`ESC_POL_3*`, and so on.
#. Enter the escalation policy name in the :guilabel:`Value` field. 
#. You also need to enter a :guilabel:`NUMBER_OF_MENUS` variable and set it to :strong:`1` or :guilabel:`2`. 
    * When the number of menus variable is set to 1, the operator says "Press 1 for <Team 1>, Press 2 for <Team 2>."" 
    * When the number of menus variable is set 2 the operator says "Please press 1 to reach an on-call representative or press 2 to leave a message”, before reading out the available team names.

.. note:: 
   Your teams are read out in descending order. For example, if you have 3 teams, TEAM_3 is announced first, then TEAM_2, then TEAM_1.

The end result looks like the following image:

.. image:: /_images/spoc/Evironmental-Variables-2.png

Each team added to this function must correspond to a unique Routing Key. See :ref:`spoc-routing-keys`.

Multiple phone numbers to route to different Teams
-------------------------------------------------------

If you want designated phone numbers to route to different Splunk On-Call teams, a few additional steps are necessary. You need to purchase
additional Twilio numbers, create new a new service and function with matching environmental variables and dependencies, and assign the
service and function to your new phone number.

#. To purchase additional Twilio numbers, see :ref:`get-phone-number`.
#. Create a new service and repeat the following steps:
    #. Configure a Twilio function. See :ref:`twilio-functions`.
    #. Add the function to a phone number. See :ref:`add-function-to-phone`.

Call or voicemail menu
---------------------------

If you want to set an additional menu item that asks if the user wants to leave a voicemail or be connected directly to the on-call representative, set the :guilabel:`NUMBER_OF_MENUS` created in the previous multi phone tree step to 2.

.. note:: 
   This is not compatible with the No Voicemail or No Call configurations.

Voicemail transcription
-----------------------------

Transcription is limited to voicemails with a duration greater than 2 seconds and less than 120 seconds. If you request transcription for a recording outside these duration limits, Twilio writes a warning to your debug log rather than transcribing the recording. In the ase that the message can't be transcribed, a critical incident is still posted in Splunk On-Call, with a "Twilio was unable to transcribe message" note within the alert payload.

Listen to voicemail
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Although voicemail is transcribed and posted to your Splunk On-Call timeline, some users might prefer to listen to the actual voicemail. You can do so in the Twilio platform, which can be easily linked to from VictorOps using :ref:`annotations <rules-engine-annot>`.

Create the following Rules Engine rule to link back to a specific call history and to listen to or download the voicemail.

* When ``monitoring_tool`` matches ``Twilio``
* Annotate the alert with ``URL``
    * Label: ``Listen to Voicemail``
    * URL: ``https://www.twilio.com/console/voice/calls/logs/${{entity_id}}``

When navigating to the link, users are prompted to first sign into Twilio.

Configuring the voicemail voice
--------------------------------

If you set this integration up prior to May 7th, 2020, the voice that Twilio uses to speak defaults to "woman". After May 7th, 2020, the default voice is "Polly.Salli", which comes with a cost increase. See :new-page:`https://www.twilio.com/docs/voice/twiml/say/text-speech#pricing`.

If you want use the Polly.Salli voice, follow these steps:

#. Go to your VictorOps function. Depending on whether you set this up in Twilio's Functions Classic UI or their new Functions Services UI, the function is in slightly different places.

   #. If you set up integration in Twilio's Functions Classic UI go to :guilabel:`Functions` then :guilabel:`Overview` then :guilabel:`Manage Services` then :guilabel:`VictorOps Live Call Routing` then :guilabel:`Functions`.
   #. If you set up the in tegration in Twilio's new Services UI, go to :guilabel:`Functions` then :guilabel:`Services`` then :guilabel:`Manage Services` then :guilabel:`VictorOps-Live-Call-Routing` then :guilabel:`Functions`.

#. In line 82 in the code for the function, approximately, find a line that says: ``'woman';`` and replace it with ``'Polly.Salli';``.
#. In line 28, approximately, find this line ``greeting: 'Welcome to Victor Ops Live Call Routing.',``
#. Change the word ``Live`` to ``Lyve`` so that the end result looks like: ``greeting: 'Welcome to Victor Ops Lyve Call Routing.',``.
#. Make an equivalent edit on line 38, approximately. Change the word ``Live`` to ``Lyve``. This forces the voice to pronounce the word correctly.
#. Select :guilabel:`Save` then :guilabel:`Deploy All`` button.

A confirmation message displays letting you know the deploy has been successful.

Use a different voice
^^^^^^^^^^^^^^^^^^^^^^^

Polly.Salli is 1 of the many Amazon Polly voices that you can use for this integration. If you'd like to see how others sound, follow these steps.

#. In the Twilio Console UI, go to :guilabel:`Programmable Voice` then :guilabel:`TwiML` then :guilabel:`Text-to-Speech`. 
#. Select the plus button under :guilabel:`Current Language Mapping`. 
#. Select a language.
#. Select :guilabel:`Amazon Polly` as the :guilabel:`Provider`, and then select your desired voice. 
#. Enter sample text to to test. 
#. After settling on an Amazon Polly voice, follow the preceding instructions, replacing ``Salli`` with the voice you want.

Troubleshooting Twilio and Splunk On-Call
-----------------------------------------

Problem 1: The on-call individuals do not receive phone calls.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The caller hears "Trying next on-call representative, Trying next on-call representative, Trying next on-call representative. Please leave a message for the ${Team} and hang up when you are finished".

This might be because a trial Twilio account is being used instead of a paid Twilio account. You have to verify phone numbers in Twilio before they can be
called. Additionally, even with a paid Twilio account, phone numbers in certain countries (such as Slovakia) need to be verified in Twilio numbers before calling them.

To verify the numbers you're calling, search for "Add a Verified Caller ID via the Console Site" in Twillio documentaiton and follow the documented steps.

Problem 2: There is a missing configuration value. Please contact your administrator to fix the problem.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This message means 1 of the Twilio dependencies or environmental variables is incorrectly configured. Check that these values in your Twilio account exactly match the recommended values below:

.. image:: /_images/spoc/Environmental-Variables-1.png

.. image:: /_images/spoc/Twilio_Cloud_Communications___Web_Service_API_for_building_Voice_and_SMS_Applications.jpg

Problem 3: There was an error retrieving the list of teams for your organization.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This message means the team attempting to be notified doesn't exist, has not been entered properly, or that the ``VICTOROPS_API_KEY`` or
``VICTOROPS_TWILIO_SERVICE_API_KEY`` is incorrect. Check that the spelling and casing of the team in Splunk On-Call matches exactly with the Twilio Environmental Variables and that the proper value is in place for the ``VICTOROPS_API_KEY`` and ``VICTOROPS_TWILIO_SERVICE_API_KEY``.

Problem 4: There was an error retrieving the on-call phone numbers. Please try again.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This message means the number attempting to be called has not been verified in VictorOps. Verify the number by clicking :guilabel:`Verify` next to the number in the user's Splunk On-Call personal profile, and then enter in the verification code sent to the device.

Problem 5: Team ${team-name} does not exist. Please contact your administrator to fix the problem.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This message indicates that the team spelling or capitalization in Twilio in the :guilabel:`Value`` column for :guilabel:`Environmental Variables` might not exactly match the team spelling andcapitalization in Splunk On-Call

Problem 6: The user attempting to be called does not receive a call. 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This can happen if the user doesn't have a verified phone number entered into their Splunk On-Call profile. Verify the phone number for this user.

Problem 7: The integration only calls 3 users before prompting the caller to leave a voicemail.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is a limitation of the integration which can't be adjusted.

Problem 8: There are multiple people on-duty for a given escalation policy step, but only 1 of them receive a call.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This is a limitation of the integration which can't be adjusted. If multiple people are on-duty at the same time for a given escalation policy step, the integration selects 1 user at random each time a call is placed.

Problem 9: Nobody is called. The caller is prompted to leave a message.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This might be caused by a mismatch between the values in Twilio's Environmental Variables and the corresponding values in Splunk On-Call. Check that the spelling of the Team and Escalation Policy in Twilio match exactly what is used in Splunk On-Call.

Problem 10: We were unable to reach an on-call representative
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This message means the team attempting to be notified either doesn't exist, or has not been entered properly. Check that the spelling and casing of the team in Splunk On-Call matches exactly within the Twilio Environmental Variables.

This might be because a trial Twilio account is being used instead of a paid Twilio account. You have to verify phone numbers in Twilio before they can be
called. Additionally, even with a paid Twilio account, phone numbers in certain countries (such as Slovakia) need to be verified in Twilio numbers before calling them.

To verify the numbers you're calling, search for "Add a Verified Caller ID via the Console Site" in Twilio documentation and follow the documented steps.

Problem 11: An application error has occurred. Goodbye.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You might also see 82002 and 11200 errors in the Twilio logs in this case. 

This indicates that the code used within the Splunk On-Call function is not correct, that the path is not specified properly. The path for the function needs to be: ``/victorops-live-call-routing``. The Dependencies haven't all been copied over (oftentimes the ‘got' module), or that the Splunk On-Call user attempting to be called doesn't have a number in their user profile. Double check these areas.

Problem 12: The wrong phone number is called by the for a Splunk On-Call user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If a Splunk On-Call user has multiple phone numbers in their profile, the phone number that has been in the Splunk On-Call user profile the
longest is used by the integration. You can remove numbers you do not want called and then re-add them to control which number is called.  

Problem 13: The number you have dialed is not in service. Please check the number and try again
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This message might mean that the function has not been properly assigned to your Twilio phone number. Ensure that the number is configured to run the Splunk On-Call function when a call comes in.

Problem 14: You see a "Failed to deploy your function" message
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you encounter this error message when trying to save on the :guilabel:`Configure` page in Twilio where Environmental Variables and Dependencies are
listed, this might be due to a recent change of the accepted values for the `got` dependency. Previously, we recommended user leave the version for this `got` dependency blank, though with a recent change to the v10 package of `got`, you must specify this version as `9.6.0`. Ensure all dependencies match the table in the above “Configure Environmental Variables” section and save again.

.. image:: /_images/spoc/Voice-2.png

Problem 15: The integration calls a seemingly random team
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This might be because the code used in your Twilio function isn't the 1 intended for your use case. If setting up the standard, single phone number configuration, delete the existing code in :guilabel:`Functions` then :guilabel:`Manage` then :guilabel:`VictorOps` and replace it with the code
found at :new-page:`https://github.com/victorops/twilio-live-call-routing/blob/master/victorops-twilio.js`.

**Note:**

In your escalation policy within VictorOps, live call routing will only
call users or rotations referenced either by rotation or directly in the
escalation policy. Live call routing will not recognize the step to
execute a different escalation policy, rather, it will skip that step
and immediately progress to the next one.

.. |image1| image:: /_images/spoc/Twilio-Integrations-Page.png
