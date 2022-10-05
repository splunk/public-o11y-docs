.. _configure-alert-routing:

Configure the alerts that are routed to your service
************************************************************************

Use alert routing to associate alerts with a service. If an alert matches your alert filter conditions, it is routed to the service. To set up your alert routing for the service, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` and then the service you want to add alert routing conditions to.
#. On the :guilabel:`Alert Routing` tab, the list of alerts that are currently routed to the service display.
#. Select a filter field. Use :guilabel:`source` to route alerts based on a detector name. 
#. Select the :guilabel:`=` (equal to) or :guilabel:`!=` (not equal to) operator.
#. Select a filter value. You can select multiple values for the same filter field. Multiple values for the same filter field are joined with an ``or`` operator.
#. Select enter to save your condition. 
#. Repeat steps 4-7 for any additional alert routing conditions that you want to set up. Multiple conditions are joined by an ``or`` operator.
#. Select :guilabel:`Save alert routing` when you are finished setting up your alert routing conditions.

After you configure which alerts are routed to your service, use alert grouping to manage which alerts create an incident and how alerts are grouped into incidents. See :ref:`configure-alert-grouping`