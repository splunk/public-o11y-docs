.. _team-admin:

************************************************************************
Get started as a Team admin
************************************************************************

.. meta::
   :description: About the team admin role in Splunk On-Call.



If you are new to Splunk On-Call a great place to start is with the topic :ref:`user-role`. Once you a familiar with your user permissions, learn about the Alert admin role.

A user can be elevated to a Team Admin for one or more teams. Likewise, there can be multiple Team Admins within a single team. As a Team Admin, you're responsible for a team's on-call schedules, escalation policies, and the overall management of the users who are apart of your team. Team admins have permission to take the following actions: 

Permissions specific to a Team Admin:

* Invite users to your team
* Edit the paging policies of team members
* Create, edit, or delete schedulesCread or assign schedued overrides for team members


Recommendations to be a Successful Team Admin
======================================================

* Setup your profile and familiarize yourself with the Splunk On-Call web and mobile platforms: As a Team Admin, it's your responsibility to ensure that you and the members of your team are familiar with the Splunk On-Call platform.

* Learn your Internal Resources in Splunk On-Call: On the Users tab, you can see specific user roles and find out who your Global Admins or Alert Admins are within your organization. Note: You will need to know who your admins are to request configuration assistance outside of your permissions.

* Set up your Personal Paging Policies: Your paging policy determines how Splunk On-Call notifies you of an incident.
   Your Primary Paging Policy should be the loudest and most attention-grabbing notification method. We recommend a diverse paging policy (Push, SMS, Phone) with multiple steps to avoid single points of notification failure. Use a custom paging policy for a configured period time, a time that may not require such aggressive paging, for example during business hours.

* Learn and understand the difference between a Rotation, Shifts, and Escalation Policies: It is crucial as a Team Admin to understanding how rotations, shifts, and escalation policies interact and depend on one another. 
   Taking the time to understand the relationship between these functions will help you determine the most effective way to configure your team's on-call schedule.

*  Map out your team's schedule before configuring it in Splunk On-Call: Using a spreadsheet or a whiteboard to map out your team's on-call schedule will help you visualize the schedule and determine what kind of rotations and shifts to use.  
    Keep your rotations as simple as possible, preferably with a continuous rotation of the same users to make your on-call schedule easy to manage. Remember that you can leverage scheduled overrides to address holidays or schedule conflicts.  

* Invite your Users to your Team: Add all necessary users to your team. If a team member is not yet in Splunk On-Call you will need a Global Admin to invite them if the Team Admin role has been restricted from inviting users to Splunk On-Call. 

* Create your team's schedule in Splunk On-Call: Following the schedule you mapped out, build your on-call schedule in Splunk On-Call.
  
* Setup your team's Escalation Policies: There are quite a few actions Escalation Policies are able to initiate, take some time to understand what each action does. 
   - When creating escalation policies keep a naming convention that allows others to know which escalation policies belong to your team. Most mapping/callout actions within Splunk On-Call are tied to Escalation Policies.
   - Use the escalation “Page Entire Team” sparingly or as the very last step in an Escalation Policy to avoid notification fatigue.

* Connect with a Global or Alert Admin to create your team's routing key: Once you are ready for alerts to be routed to your team, you will need a Global or Alert Admin to create routing key for your team's Escalation Policies. You can find user roles under the Users tab. Request that your routing key names follow your Escalation Policy naming convention. 
* Understand Scheduled Overrides & Manual Takes: As a Team Admin, you have permissions to manage scheduled overrides for users on your team. Scheduled overrides should be used for planned absences, whereas Manual takes should only be used for last-minute coverage needs.


Team Admin Checklist
=========================

- i have configured my own user account's paging policy and have familiarized myself with the web and mobile applications.
- I understand my permissions and responsibilitiesas a team admi. 
- I know who my internal and external resources are.
- I understand the relationshis between shifts, rotations, and escalation policies.
- I have built my teams on-call schedulein Splunk On-Call to optimize on-call and reduce on-call fatigue.
- I understand scheduled override and manual takes, and when to use one over the other.
