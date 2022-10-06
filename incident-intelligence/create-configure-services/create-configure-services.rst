.. _create-configure-services:

************************************************************************
Create and configure services
************************************************************************

.. meta::
   :description: Use services to organize incidents depending on the impacted environmental component.

Use services to organize incidents depending on the impacted environmental component. Begin by creating a service. Then, route alerts to the service, see :ref:`configure-alert-routing`. Next, specify which alerts create an incident and how alerts are grouped into incidents, see :ref:`configure-alert-grouping`. Finally, create incident workflows with escalating steps to determine who is notified to respond when a new incident is triggered, see :ref:`configure-incident-workflows`.

.. toctree::
   :hidden:

   configure-alert-routing
   configure-alert-grouping
   configure-incident-workflows


.. _create-service:

.. raw:: html

   <embed>
      <h2>Create a service</h2>
   </embed>

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` > :guilabel:`Create service`.
#. Give your service a unique name and a description. 
#. Select :guilabel:`Create service`.

.. raw:: html

   <embed>
      <h2>Next step</h2>
   </embed>

After you create your service, you are directed to configure which alerts are routed to your service. See :ref:`configure-alert-routing`.
