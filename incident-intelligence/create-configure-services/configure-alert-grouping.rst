.. _configure-alert-grouping:

Configure how alerts are grouped
************************************************************************

Use alert grouping to manage which alerts create an incident and how alerts are grouped into incidents. Alert grouping is specific to each service and you can customize it to create the workflow that works for you. You can use alert severity to determine if an incident is created and also group alerts by time period. To configure alert grouping, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` and then the service you want to add alert grouping conditions to. Each service can have one alert grouping rule.
#. On the :guilabel:`Alert grouping` tab, select the minimum severity level you want to require for an incident to be triggered in the drop-down list next to :guilabel:`Trigger an incident when alerts reach severity level`.
#. If you want to group alerts into incidents, select :guilabel:`Group alerts from the same time period into incidents`, and then select a time period between 10 minutes and 24 hours, from the drop-down list next to :guilabel:`Create a new incident if there is a pause in alerts for`.
#. Select :guilabel:`Save alert grouping`.

After you manage which alerts create an incident and how alerts are grouped into incidents, use incident workflows to determine who is notified when a new incident is triggered. See :ref:`configure-incident-workflows`.
