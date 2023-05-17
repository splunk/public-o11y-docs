.. _admin-associate-team:

********************************************************************************
Link detectors and dashboard groups to teams in Splunk Observability Cloud
********************************************************************************

.. meta::
   :description: Learn how to associate detectors and dashboard groups with a team

You can link detectors and dashboard groups to a team to make these resources accessible on the team's landing page.

To learn more about team landing pages, see :ref:`admin-configure-page`.


.. _detectors-link-teams:

Detectors linked to teams
============================================================================

When you link detectors to a team, you get the following features:

* The team landing page displays lists of active alerts.

* On the Alerts page, users can use filters to display only those detectors linked to a specific team.

.. note:: You can manually add a team as a notification recipient for any detector. You don't have to link the detector to the team.


.. _create-link-detector-teams:

Link a detector to a team
--------------------------------------------------------------------------------

You can only link a detector to a team if you have write permission for the detector. To learn more, see :ref:`detector-manage-permissions`.

You can link a detector to a team when you are viewing the :guilabel:`Detectors` tab on the :guilabel:`Alerts` page or when you are viewing a specific detector.

To link a detector to a team, follow these steps:

#. From the :guilabel:`Actions` menu for the detector, select :guilabel:`Links to teams`.

#. From the drop-down list, select the team you want to link to the detector, then select :guilabel:`Done`.

#. If the team is not already a notification recipient for the detector, Observability Cloud asks if you want to send notifications to the team. Select :guilabel:`Yes` to add the team as a recipient to each detector rule. Select :guilabel:`No` to leave all recipients as is.

.. note:: Sending alert notifications to a team doesn't necessarily mean that every team member is notified. The team's notification policy determines which team members receive notifications. To learn more about configuring team notification policies, see :ref:`admin-team-notifications`.


.. _remove-link-detector-team:

Remove the link between a detector and a team
--------------------------------------------------------------------------------

To remove a link between a detector and a team, you need to have write permission for the detector. To learn more, see :ref:`detector-manage-permissions`.

You can remove the link between a detector and a team when you are viewing the :guilabel:`Detectors` tab on the :guilabel:`Alerts` page or when you are viewing a specific detector.

To remove the link between a detector and a team, follow these steps:

#. From the :guilabel:`Actions` menu for the detector, select :guilabel:`Links to teams`.
#. Select the :guilabel:`x` to remove a team from the linked teams list, then select :guilabel:`Done`.
#. If the team is a notification recipient for the detector, Observability Cloud asks if you want to stop sending notifications to the team. Select :guilabel:`Yes` to remove the team as a recipient from each detector rule. Select :guilabel:`No` to leave all recipients as is.


.. _dashboard-groups-link-team-features:

Dashboard groups linked to teams
============================================================================

When you link a dashboard group to a team, the dashboard group is accessible on the team's landing page.

To link a dashboard group to a team, you need to have write permission for the dashboard group. To learn more, see :ref:`dashboard-manage-permissions`.

The following table provides details about which dashboard group types you can link to a team.

.. list-table::
   :header-rows: 1

   * - Dashboard group type
     - Description
   * - Custom dashboard group
     - | - You need write permission to link a custom dashboard group to a team.
       | - To learn more, see :ref:`about-permissions`.
   * - Built-in dashboard group
     - | - You can't link a built-in dashboard group to a team. However, you can clone built-in dashboards to a custom dashboard group, and link that group to a team.
       | - To learn more, see :ref:`clone-built-in-dashboard`.
   * - User dashboard group
     - You can't link a user dashboard group to a team.


.. _create-link-dashboard-group-team:

Link a dashboard group to a team
--------------------------------------------------------------------------------

You can create a link between a dashboard group and a team from the landing page for the team, or you can create the link from the dashboard group page.

To link a dashboard group to a team from the team landing page, follow these steps:

#. Access the team landing page. To learn how to access team landing pages, see :ref:`view-team-landing-page`.

#. Select :guilabel:`Add Dashboard Group`.

#. Select the dashboard group you want to link.

#. Select :guilabel:`OK`.

To link a dashboard group to a team from the dashboard group:

#. Access the dashboard group. To learn how to access dashboard groups, see :ref:`viewing-dashboards`.

#. Select the :guilabel:`Dashboard group actions` menu (|more|) next to the dashboard group name and select :guilabel:`Links to Teams`.

#. In the text box, start typing a team name. Observability Cloud autocompletes the team name. If Splunk Observability Cloud finds more than one match, it displays a list.

#. Select the team you want to link to from the list.

#. Select :guilabel:`Done`.


.. _remove-link-dashboard-group-team:

Remove the link between a dashboard group and a team
--------------------------------------------------------------------------------

To remove a link between a dashboard group and a team, you need to have write permission for the dashboard group. To learn more, see :ref:`dashboard-manage-permissions`.

To remove the link between a dashboard group and a team, follow these steps:

#. Access the dashboard group. To learn how to access dashboard groups, see :ref:`viewing-dashboards`.

#. Select the :guilabel:`Dashboard group actions` menu (|more|) next to the dashboard group name and select :guilabel:`Links to Teams`.

#. Select the :guilabel:`x` to remove a linked team.

#. Select :guilabel:`Done`.
