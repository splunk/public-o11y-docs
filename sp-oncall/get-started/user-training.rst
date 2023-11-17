.. _user-training:


****************************************
User training 
****************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


As a user, you are responsible for taking action on incidents that page you while you are on call. You have access to view and edit your own user information, view your on-call schedule, and the ability to take action on alerts.

To learn more about all roles and permissions, see :ref:`user-roles-and-permissions`.

Your Resources as a User
=============================

- Documentation: Splunk On-Call has an extensive documentation which is always a good place to start if you are unsure how something works.
- Contact us: All users have the ability to reach out to Splunk On-Call support at any time with any questions.
    - Live chat: If you are logged into your Splunk On-Call instance, you will have the ability to Live Chat with the Splunk On-Call Support team.
    - You can open a Splunk On-Call support case in the Splunk Support Portal:https://login.splunk.com/

If you are facing any issues when trying to contact us please have a look XXXXXX `HERE <https://help.victorops.com/knowledge-base/important-splunk-on-call-support-changes-coming-nov-11th/>`

Setting up your account
==========================

#. Accept your email invitation.
#. Create a username if one has not been created for you: Keep in mind that usernames cannot be changed. Please be sure to follow any naming conventions outlined by your account admins.
#. Add contact methods to your profile: Add the contact methods you would like us to use. For example, phone numbers, emails. For push
   notifications, first download the mobile app and log in. Your device will then appear in your profile and you will be able to use push notifications.
#. Set up your Personal Paging Policies: Your paging policy determines how Splunk On-Call notifies you of an incident.
   Include multiple steps and multiple notification types** in your policy that increase in noise such as push to SMS to a phone call.
   
    ..note:: the last step of your paging policy will repeat until the incident is acknowledged. Quick video on** `Personal Paging
   Policies <https://share.vidyard.com/watch/gpRuaMFxCK8wZyB9oFRXBA?>`

       - Best Practice tip: Your Primary Paging Policy should be the loudest and most attention-grabbing notification method. While your custom paging policy can be less aggressive for a configured period time that may not require such aggressive paging, for example, during business hours.

   **♦** **Best Practice Tip** **♦ Include a phone call in the last step
   of your paging policy so that you are alerted in the noisiest way
   until you acknowledge the incident.**

1. **Download Mobile App & Add Splunk On-Call to your contacts:** Splunk
   On-Call can be easily added to your phone contacts from the mobile
   app. Just navigate to the Menu, Notifications, and select “Add Splunk
   On-Call to Contacts”. *NOTE: if you need Splunk On-Call notifications
   to override “Do Not Disturb” please visit our mobile application
   articles for directions.*

2. **View Your Schedule:** **Login to the mobile app and select the
   calendar icon at the bottom of the screen to see when you are
   on-call. From the Web UI,  Navigate to Teams >> “Your Team” >>
   On-Call Schedule.** Quick video on `viewing an On-call
   Schedule <https://share.vidyard.com/watch/XPs4a4PfdkmtDXKeM3pduE?>`__!***\* 

   **♦** **Best Practice Tip** **♦** You can copy and paste your
   personal calendar .ics file to your favorite calendar tools such as
   Google or Outlook.

3. **Create a Scheduled Override:** Heading out of town or have a
   scheduled absence where you will need on-call coverage? Create an
   override so someone can cover your shift for you. \****Quick video on
   `Scheduled
   Overrides <https://share.vidyard.com/watch/5W1zAqWnYD8aXsi9XPwtbt?>`__!***\*

   -  **Mobile:** From the home screen select “Create Override” and
      select the timezone and dates/times you need to be covered.
      *NOTE:* **Another user will need to “take” the shift(s) from you
      before the shift is considered covered.**
   -  **Web:** Navigate to your team >> Scheduled Overrides >> Create an
      Override and select the timezone and dates/time you need to be
      covered. *NOTE:* **Another user will need to “take” the shift(s)
      from you before the shift is considered covered**

4. **Use the Manual Take On-Call feature for last-minute coverage:** For
   unplanned absences (i.e. a doctor’s appointment), the take on-call
   button can be used to cover another user’s shift until they take it
   back or the shift ends. **Quick video on** `Manual
   Takes <https://share.vidyard.com/watch/Jfm3pcAxRkpw8bQE4JF91i?>`__\ **!**  

   -  **Mobile:** 

      1. Navigate to the home screen
      2. Click “View All” below teammates currently On-Call
      3. Click the “Take shift” button
      4. You are now on call until the end of the user’s shift unless
         they take it back.

   -  **Web:** 

      1. Navigate to the people pane
      2. Locate the user that needs last-minute coverage
      3. Select the user
      4. Click the “Take Shift” button
      5. You are now on call until the end of the user’s shift unless
         they take it back. 

5. **Take action on an incident you are paged for:** There are several
   different actions you can take on an incident you are paged for. The
   various actions are described below: \****Quick video on incident
   actions on the `Web
   UI <https://share.vidyard.com/watch/Nd1KzLjZKbSnRvAdnhgDcW?>`__ &
   `Mobile
   UI <https://share.vidyard.com/watch/mkPu5XngyjgyNnrpRCSx1Q?>`__!***\* 

   -  **Acknowledge**: This will stop the incident from actively paging
      and continuing through the escalation policy. An acknowledgment
      signifies that you are aware of an incident and are taking action
      on it.
   -  **Resolve**: Once the incident is resolved within the monitoring
      tool it can be resolved within Splunk On-Call. Once resolved any
      new alert of the same type will create a new incident.
   -  **Reroute**: If the incident needs to be addressed by another user
      or directed to a different escalation policy the reroute option
      allows you to do this. 
   -  **Snooze**: If the incident is not urgent and can wait before
      being address you can snooze it for a specified amount of time
      using the snooze option. The incident will page users again after
      the amount of time selected is up.
   -  **Add Responders/Conference Bridge**: If more eyes are needed on
      an incident and/or a Conference Bridge is needed to troubleshoot
      the incident, you can click the Add Responders icon and send out a
      page to desired users or particular escalation policies.
   -  **Chat**: Chat in the incident timeline to collaborate with
      teammates

      -  use @ to notify specific users
      -  use @@ to notify a specific team

User Onboarding Checklist
~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: images/Screen-Shot-2020-11-12-at-8.29.23-AM.png
