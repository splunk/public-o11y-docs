.. _team-escalation-policy:

************************************************************************
Set up an escalation policy
************************************************************************

.. meta::
   :description: Instructions for configuring an escalation policy for Splunk On-Call

Escalation policies determine set who is actually on-call for a given team and are the link to utilize any rotations that have been created.

Some things to note:

- Only Team and Global Admins are able to make changes to Escalation Policies
- Only users specified in the first step of an Escalation Policy will receive Timeline and Push notifications that they are on-call and will log hours in the on-call report as being on-call. If you would like users in subsequent steps of an escalation policy to receive these notifications and log these hours, see `this guide. <https://help.victorops.com/knowledge-base/tips-tricks-multiple-escalation-policies/#tip-3-surface-secondary-on-call-schedules-in-your-on-call-calendar>`__
- When an Escalation Policy is executed and a user is being notified, the user's `personal paging policy <https://help.victorops.com/knowledge-base/paging-policy/>`__ determines how they will be contacted.

Steps to Creating an Escalation Policy
============================================

#. Navigate to the :guilabel:`Escalation Policies` tab of your team and select :guilabel:`Add Escalation Policy`
#. Give the Escalation Policy a name.
    BEST PRACTICE TIP: Name the policy in a way that will make it easy to find when adding routing keys or creating manual incidents. For example, if the team name is Support then use "Support: Primary" for an escalation policy name.

#. Decide whether or not to “Ignore Custom Paging Policies” If the “Ignore Custom Paging Policies” box is checked then the incident will page the on-call user via their Primary Paging Policy and ignore any custom paging policies they have set.
    Best practice tip: Check this box if the escalation policy handles high severity incidents.

#. Select a time delay for Step 1 of your escalation policy. The time delay you select for Step 1 will be in reference to either when the incident reaches Splunk On-Call or from when the escalation policy is called out by another escalation policy.
    All subsequent steps will have the time delay reference the previous step, not the incident's beginning. That is, if Step 1 has a time delay of 5 minutes and Step 2 has a time delay of 10 minutes then paging for Step 2 will not be triggered until 15 minutes after the incident reaches Splunk On-Call.
    Best practice tip: We recommend selecting 'immediately' for the first step of an escalation policy,  unless you desire a waiting room
type functionality. For information on setting up a waiting room escalation policy, see :ref:`waiting-room`.

#. Select an Escalation Action for Step 1. Access the different escalation actions by clicking on the “Select an escalation” dropdown menu and then scroll down to see all available options. The blue plus box allows for multiple actions to be performed simultaneously within one escalation policy step if desired. 

Available Escalation Policy Actions
=======================================

A number of escalation actions are available. The different options are as follows:

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 40, 60

   * - :strong:`Escalation action`
     - :strong:`Description`

   * - Execute Policy
     - This action provides the ability to invoke a different escalation policy
     - 
   * - Notify the on-duty users in rotation
     - Our most common type of escalation action, this notifies the currently on-duty users in the rotation you specify. If there is no on-call user scheduled in a rotation at the time when this escalation action is triggered, the resulting behavior is that no page will occur in this step. The time delay before the next step will remain as configured. For example, if an incident triggers an Escalation Policy during off-hours and there is no one on call in the rotation to immediately page, the escalation policy will page no one and then wait however long is specified before executing step two.

   * - Notify the next user in current on-duty shift
     - This will notify the user(s) scheduled to be next up within the current on-duty shift.


   * - Notify the previous user within the current on-duty shift
     - This will notify the users that were on-duty previously within the current on-duty shift, or are currently in the schedule position to be the previous user.

   * - Notify user 
     - This will notify the user of your specification regardless of the time of day
 
   * - Notify every member of this team
     - This will notify every member of the team that the escalation policy is created for regardless of the time of day. All users on the team will be paged for an incident, but only one user is required to ack the incident. 

    * - Execute webhook
     - This will execute the `Escalation Webhook <https://help.victorops.com/knowledge-base/escalation-webhooks/>`__
         of your choosing

    * - Send an email to email address
     - This will send an email to the email address you specify
 
  
#. Add additional escalation policy steps. Include multiple steps to assure that an incident is not missed.

#. Select :guilabel:`Save` to save the escalation policy at the bottom of the page.

#. Attach the escalation policy to the desired Routing Key by selecting :guilabel:`Set Up Routing`. Routing keys are a key link to connect incidents to one of your established Escalation Policies. For more information on routing keys, see :ref:`routing-keys`.
    If no routing keys are connected to the escalation policy then it will only be active if called out specifically in a manual incident or
“execute policy” step of another escalation policy.

      ..note:: Only Global and Alert Admins can configure and edit routing keys. Work with a user with these permission levels to assure your
escalation policy is connected to the correct routing key.



Features and Benefits of using Multiple Escalation Policies
===================================================================

- Flexible SLA Configurability: Create urgent escalation policies that notify many people quickly for high-priority issues and relaxed escalation policies that merely send emails to distribution groups.

- Waiting Rooms: Send incidents that often auto-resolve to :ref:`Waiting rooms <waiting-room>` to give them a chance to do so before alerting anyone.

- Schedule Views: Surface the on-call schedules for each escalation policy via separate calendar links.

- Internal Team Rerouting:Reroute easily within your team by setting up primary and secondary escalation policies.

- Flexible Take On-Call: Take on-call for the primary or the secondary escalation policy.

- Flexible Manual Incident Creation: Send a manual incident to separate escalation policies.

- Reuse Policies Across Teams: Reuse globally available escalation policies across multiple teams.

For more detailed examples on how to benefit from the use of multiple escalation policies, see :ref:`mult-escalation-policies`.
