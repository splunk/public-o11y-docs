.. _admin-associate-service:

********************************************************************************
Link services to teams in Splunk Observability Cloud
********************************************************************************

.. meta::
   :description: Learn how to associate services with a team in Splunk Observability Cloud.

You can link services to a team to make these resources accessible on the team's landing page.

To learn more about team landing pages, see :ref:`admin-configure-page`.


.. _service-link-teams:

Services linked to teams
============================================================================

When you link services to a team, you get the following features:

* The team landing page displays lists of services and alerts for that service.

* On the APM page, filter the services listed by teams to view only the services relevant to your team.  


.. _create-link-service-teams:

Link a service to a team
--------------------------------------------------------------------------------

You can link a service to a team from the team’s landing page, or the :guilabel:`Team page setup`. To link a service to a team, follow these steps: 

To link a service to a team from the landing page, follow these steps:

#. From the :guilabel:`Services` section, select the :guilabel:`Edit services` button from the landing page.

#. From the modal, select the services that you want to add to the team.

#. (Optional) Add a service attribute filter in order to populate all services that contain the specified attribute on the team landing page. This filter groups services by a specific attribute or namespace. For example, adding the attribute ``service.namespace = apm`` will display all services with the APM namespace on your team landing page.  

To link a service to a team from the :guilabel:`Team page setup`, follow these steps: 

#. From the team's landing page, select the :guilabel:`Team details` button, and then select :guilabel:`Edit page`.


.. _remove-link-service-team:

Remove a service from a team 
--------------------------------------------------------------------------

To remove a team from the landing page, follow these steps:

#. From the :guilabel:`Actions` menu for the detector, select :guilabel:`Links to teams`.
#. Select the :guilabel:`x` to remove a team from the linked teams list, then select :guilabel:`Done`.
#. If the team is a notification recipient for the detector, Splunk Observability Cloud asks if you want to stop sending notifications to the team. Select :guilabel:`Yes` to remove the team as a recipient from each detector rule. Select :guilabel:`No` to leave all recipients as is.


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

#. In the text box, start typing a team name. Splunk Observability Cloud autocompletes the team name. If Splunk Observability Cloud finds more than one match, it displays a list.

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
