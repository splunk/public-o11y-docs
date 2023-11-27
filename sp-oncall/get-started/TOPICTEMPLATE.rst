.. _user-role:

************************************************************************
Get started as user
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


As a user, you are responsible for taking action on incidents that page you while you are on call. You have access to view and edit your own user information, view your on-call schedule, and the ability to take action on alerts. For permissions and capabilities for all roles, see :ref:`user-roles-permissions`.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise

All users have the ability to reach out to Splunk On-Call support at any time with questions.

Live Chat: If you are logged into your Splunk On-Call instance, you will have the ability to Live Chat with the Splunk On-Call Support team.



Splunk Support Portal: You can open a Splunk On-Call support case in the Splunk Support Portal :new-page:`Splunk Support Portal <https://login.splunk.com/>`.

If you are facing any issues when trying to contact us, see XXXXXX Contacting Splunk On-Call Support XXXXXX

.. note:: To create or manage users, you must have administrator access. To get this access, an existing administrative adds it to your user profile. See :ref:`request-admin` for more information.

.. image:: /_images/spoc/sso-troubleshoot1.png
    :width: 100%
    :alt: A 404 error message stating "Could not find credentials".


.. list-table::
   :header-rows: 1
   :widths: 30, 15, 15, 15, 15, 10

   * - :strong:`Capability`
     - :strong:`Global admin`
     - :strong:`Alert admin`
     - :strong:`Team admin`
     - :strong:`User`
     - :strong:`Stakeholder`

   * - Change billing contact info
     - Yes
     - 
     - 
Set up your account
================================

To set up your user account:

#. Accept your email invitation 

#. Create a username if one has not been created for you. Keep in mind that usernames cannot be changed. Please be sure to follow any naming conventions outlined by your account admins. 

#. Add contact methods to your profile: Select the contact methods that you would like to be reached by, for example phone numbers or email address. For push notifications, first download the mobile app and log in. Your device will then appear in your profile and you will be able to use push notifications.

#. Set up your Personal Paging Policies: Your paging policy determines how Splunk On-Call notifies you of an incident. Include multiple steps and multiple notification types in your policy that increase in noise such as push to SMS to a phone call. Note: the last step of your paging policy will repeat until the incident is acknowledged. 
    - Best Practice tips: 
       - Your Primary Paging Policy should be the loudest and most attention-grabbing notification method. While your custom paging policy can be less aggressive for a configured period time that may not require such aggressive paging (i.e. during business hours).
       - Best Practice Tip: Include a phone call in the last step of your paging policy so that you are alerted in the noisiest way until you acknowledge the incident.

#. Download Mobile App & Add Splunk On-Call to your contacts: Splunk On-Call can be easily added to your phone contacts from the mobile app. Navigate to :guilabel:`Notifications` and select Add Splunk On-Call to Contacts. Note: if you need Splunk On-Call notifications to override “Do Not Disturb” see XXXXXX our mobile application articles for directionsXXXXXX.

#. View Your Schedule: Log in to the mobile app and select the calendar icon at the bottom of the screen to see when you are on-call. From within the web interface, navigate to :guilabel:`Teams` then :guilabel:`Your Team` and select :guilabel:`On-Call Schedule`.  
    - Best Practice Tip: You can copy and paste your personal calendar .ics file to your favorite calendar tools such as Google or Outlook.

#. Create a Scheduled Override: If you have a scheduled absence where you will need on-call coverage, create an override so someone can cover your shift for you. 
   - Mobile: From the home screen select :guilabel:`Create Override`` and select the timezone, dates, and times you need to be covered. Note: Another user will need to take the shift(s) from you before the shift is considered covered.
   - Web: Navigate to your team and select :guilabel:`Secduled Overrides`, then :guilabel:`Create an Override`  and select the timezone, dates and time you need to be covered. Note: Another user will need to “take” the shift(s) from you before the shift is considered covered.

#. Use the Manual Take On-Call feature for last-minute coverage: For unplanned absences such as a doctor appointment, the take on-call button can be used to cover another user's shift until they take it back or the shift ends.  
   - On mobile: 
  
      #. Navigate to the home screen
      #. Select :guilabel:`View All` below teammates currently On-Call
      #. Select the :guilabel:`Take shift` button.
          You are now on call until the end of the user's shift unless they take it back.
   
   - In the web interface: 
  
      #. Navigate to the People pane.
      #. Locate the user who needs last-minute coverage.
      #. Select the user.
      #. Click the “Take Shift” button
         You are now on call until the end of the user's shift unless they take it back. 

#. Take action on an incident you are paged for: There are several different actions you can take on an incident you are paged for. The various actions are as follows: 
    - Acknowledge: This will stop the incident from actively paging and continuing through the escalation policy. An acknowledgment signifies that you are aware of an incident and are taking action on it.
    - Resolve: Once the incident is resolved within the monitoring tool it can be resolved within Splunk On-Call. Once resolved any new alert of the same type will create a new incident.
    - Reroute: If the incident needs to be addressed by another user or directed to a different escalation policy the reroute option allows you to do this. 
    - Snooze: If the incident is not urgent and can wait before being address you can snooze it for a specified amount of time using the snooze option. The incident will page users again after the amount of time selected is up.
    - Add Responders/Conference Bridge: If more eyes are needed on an incident and/or a Conference Bridge is needed to troubleshoot the incident, you can click the Add Responders icon and send out a page to desired users or particular escalation policies.
    - Chat: Chat in the incident timeline to collaborate with teammates
       - use @ to notify specific users
       - use @@ to notify a specific team


