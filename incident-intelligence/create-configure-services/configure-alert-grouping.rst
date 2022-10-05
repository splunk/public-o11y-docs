.. _configure-alert-grouping:

Configure how alerts are grouped
************************************************************************

Use alert routing to associate alerts with a service. If an alert matches your alert filter conditions, it is routed to the service. To set up your alert routing for the service, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` and then the service you want to add alert routing conditions to.
#. On the :guilabel:`Alert Routing` tab, the list of alerts that are currently routed to the service display.
#. To filter the alerts routed to the service, select :guilabel:`Add Filters`. 
#. Select a filter field. Use :guilabel:`source` to route alerts based on a detector name. 
#. Select the :guilabel:`=` (equal to) or :guilabel:`!=` (not equal to) operator.
#. Select a filter value. 
#. Select enter to save your condition. 
#. Repeat steps 4-8 for any additional alert routing conditions that you want to set up. By default, multiple conditions are joined by an ``AND`` operator. To switch an ``AND`` operator to ``OR``, select the ``AND`` operator and select ``OR``.
#. Review the list of alerts that are currently routed to the service to confirm your filter conditions are correct. 
#. Select :guilabel:`Save alert routing` when you are finished setting up your alert routing conditions.

After you  manage which alerts create an incident and how alerts are grouped into incidents, use incident workflows to determine who is notified when a new incident is triggered. See :ref:`configure-incident-workflows`.
