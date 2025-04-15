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

#. (Optional) Add a service attribute filter in order to populate all services that contain the specified attribute on the team landing page. This filter groups services by a specific property or namespace. For example, adding the attribute ``service.namespace = apm`` will display all services with the APM namespace on your team landing page.  

To link a service to a team from the :guilabel:`Team page setup`, follow these steps: 

#. From the team's landing page, select the :guilabel:`Team details` button, and then select :guilabel:`Edit page`.
#. On the :guilabel:`Team page setup` page, go to the :guilabel:`Services` section. Add services from your environment to your team. 
#. (Optional) Add a service attribute filter in order to populate all services that contain the specified attribute on the team landing page. This filter groups services by a specific property or namespace. For example, adding the attribute ``service.namespace = apm`` will display all services with the APM namespace on your team landing page.  

.. _remove-link-service-team:

Remove a service from a team 
--------------------------------------------------------------------------

To remove a link to a service from the team landing page, follow these steps:

#. From the :guilabel:`Services` section, select :guilabel:`Edit services`.
#. Select the :guilabel:`x` to remove a service or a service attribute filter from their respective lists, then select :guilabel:`Save`.

To remove a link to a service from the :guilabel:`Team page setup`, follow these steps: 
#. From the team's landing page, select the :guilabel:`Team details` button, and then select :guilabel:`Edit page`.
#. On the :guilabel:`Team page setup` page, go to the :guilabel:`Services` section. Select the :guilabel:`x` to remove a service or a service attribute filter from their respective lists. Your changes will be reflected on the team landing page.