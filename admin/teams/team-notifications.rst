.. _admin-team-notifications:

*****************************************************************
Manage team notification policies
*****************************************************************

.. meta::
      :description: Teams can be recipients for alert notifications. By default, adding a team as a notification recipient sends notifications to all team members. You can also specify where to send notifications when a team is a recipient.

Teams can be recipients for alert notification. By default, adding a team as a notification recipient
sends notifications to all team members. You can also specify where to send notifications when a team is a recipient.
You can specify a single notification option for a team, or different notification options based on the
severity of the alert.

Any team member can edit the notification policies for the team. Administrators can edit the policies for any team.

.. note:: A team's notification policy applies to all detectors where the team is a notification recipient. You can't specify different notification policies for different detectors.

To specify team notification policies, open the Settings menu navigation bar,
hover over :menuselection:`Organization Settings`, and then select :menuselection:`Teams`.
Then click :guilabel:`Notification policy` (to the left of the team's Actions menu). You'll see
the default policy options.

If you choose to configure separate notification tiers, you have the same options as above for each severity level.

Add and remove recipients as desired, just as you would do when creating or editing a detector.

When the team is later specified as the recipient of a detector,
notifications will be sent based on the policy you specified.


|br|



