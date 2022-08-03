.. _admin-associate-team:

**********************************************
Associate detectors and dashboards with a team
**********************************************

.. meta::
   :description: Learn how to associate detectors and dashboards with a team
..	toctree::
   :hidden:   
   
When you link Splunk Observability Cloud detectors and dashboard groups to a team,
you can create a single status page, called a team landing page, that displays
the detectors and dashboard groups.


.. _detectors-link-teams:

Detectors linked to teams
============================================================================

.. _detectors-link-team-features:

Features of detectors linked to teams
--------------------------------------------------------------------------------

When you link detectors to a team, you get the following features:

* The team landing page displays lists of active alerts.
* On the Alerts page, users can filter the detectors that appear in tabs to
  display only those detectors linked to a specific team.
* You can configure the team so that it's automatically added as a notification recipient
  for the linked detectors. To learn more about specifying teams as notification recipients,
  see :ref:`admin-team-notifications`.


.. note:: You can manually add a team as a notification recipient for any detector; you don't have to link the detector to the team.

.. _create-link-detector-teams:

Link a detector to a team
--------------------------------------------------------------------------------

You can link a detector to a team when you are viewing the :guilabel:`Detectors` tab on the
:guilabel:`Alerts` page or when you are viewing a specific detector. You must have
write permissions for the detector. To learn more about write permissions, see
:new-page-ref:`admin-manage-permissions`.

To link a detector to a team, follow these steps:

#. From the :guilabel:`Actions` menu for the detector, select :menuselection:`Links to teams`.
#. From the drop-down list, select the team you want to link to the detector, then click :guilabel:`Done`.
#. If the team is not already a notification recipient for the detector, Observability Cloud
   asks if you want to send notifications to the team. Click :guilabel:`Yes` to add the team
   as a recipient to each detector rule. Click :guilabel:`No` to leave all recipients as is.

.. note:: Sending alert notifications to a team doesn’t necessarily mean that every team member is
   notified. The team’s notification policy determines which team members receive notifications.
   To learn more about notification policies, see :new-page-ref:`admin-team-notifications`.

.. _remove-link-detector-team:

Remove the link between a detector and a team
--------------------------------------------------------------------------------

You can remove the link between a detector and a team when you are viewing the
:guilabel:`Detectors` tab on the :guilabel:`Alerts` page or when you are viewing
a specific detector. You must have write permissions for the detector.
To learn more about write permissions, see :new-page-ref:`admin-manage-permissions`.

To remove the link between a detector and a team, follow these steps:

#. From the :guilabel:`Actions` menu for the detector, select :menuselection:`Links to teams`.
#. Click the :guilabel:`x` to remove a team from the linked teams list, then click :guilabel:`Done`.
#. If the team is a notification recipient for the detector, Observability Cloud asks
   if you want to stop sending notifications to the team. Click :guilabel:`Yes` to
   remove the team as a recipient from each detector rule. Select :guilabel:`No` to leave all
   recipients as is.

.. _dashboard-groups-link-team-features:

Features of dashboard groups linked to teams
============================================================================

You can link the following types of dashboard groups to a team:

* Built-in dashboard groups
* Custom dashboard groups for which you have write permissions

.. note:: You can't link user dashboard groups to a team.

.. _create-link-dashboard-group-team:

Create a link between a dashboard group and a team
--------------------------------------------------------------------------------

You can create a link between a dashboard group and a team from the landing page for the team, or
you can create the link from the dashboard group page.

To create the link from a dashboard group to a team from the landing page for the team,
follow these steps:

#. Open the landing page for the team. To learn how open this page, see :new-page-ref:`view-team-landing-page`.
#. Click :guilabel:`Add dashboard group`.
#. Select the dashboard group you want to link and click :guilabel:`OK`.

To create the link from a dashboard group to a team from a dashboard group page, follow these steps:

#. Open the dashboard group.
#. From the dashboard group’s :guilabel:`Actions` menu, select :menuselection:`Links to teams`.
#. In the text box, start typing a team name. Observability Cloud auto-completes the team name.
   If Observability Cloud finds more than one match, it displays a drop-down list; select the
   team you want to link to from the list.
#. When you've selected the team, click :guilabel:`Done`.

.. _remove-link-dashboard-group-team:

Remove the link between a dashboard group and a team
--------------------------------------------------------------------------------

If the dashboard group is not a built-in dashboard group, you must have write
permissions for the group to unlink it from a team.
To learn more about write permissions, see :new-page-ref:`admin-manage-permissions`.

To remove the link between a dashboard group and a team, follow these steps:

#. Open a dashboard in the dashboard group that is linked to the team.
#. From the :guilabel:`Actions` menu of the dashboard group, select :menuselection:`Links to teams`.
#. Click the :guilabel:`x` to remove a team from the list of links, then click :guilabel:`Done`.