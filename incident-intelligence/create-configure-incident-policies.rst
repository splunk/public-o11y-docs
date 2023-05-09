.. _ii-create-configure-incident-policies:

************************************************************************
Create and configure incident policies
************************************************************************

.. meta::
   :description: Steps to create and configure incident policies to organize incidents for Incident Intelligence in Splunk Observability Cloud.

Use incident policies to organize incidents depending on the impacted environmental component, for example, your web application service or checkout service. Begin by creating an incident policy. Then, route alerts to the incident policy. Next, identify which alerts create an incident and how alerts are grouped into incidents. Finally, create incident workflows with escalating steps to determine who is notified to respond when a new incident triggers.

.. _ii-create-incident-policy:

Create an incident policy
===========================

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select :guilabel:`Incident policies` > :guilabel:`Create incident policy`.
#. Give your incident policy a unique name and a description. 
#. Select :guilabel:`Create incident policy`.

After you create your incident policy, you can configure which alerts are routed to your incident policy. 


Delete an incident policy
===========================

If you want to stop using an existing incident policy, you can either modify or delete the policy and create a new one. When you delete an incident policy, new alerts that were previously routed to the incident policy are no longer grouped to new or existing incidents. The deleted incident policy is no longer listed when creating manual incidents.

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. In the Incident Policies list, locate the policy you want to delete. 
#. Select the :guilabel:`Action` menu (|more|).
#. Select :guilabel:`Delete`.


.. _ii-configure-alert-routing:

Configure the alerts routed to your incident policy
============================================================

Use alert routing to associate alerts with an incident policy. If an alert matches your alert filter conditions, it is routed to the incident policy. To set up your alert routing for the incident policy, follow these steps:

.. note:: The rank order of your incident policy also determines where alerts are routed. Alerts are only routed to one incident policy even if they match multiple policies. The incident policy that alerts are routed to is based on your policy's alert routing conditions and incident policy rank order. See :ref:`ii-rank-incident-policies`

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select :guilabel:`Incident policies` and then the incident policy you want to add alert routing conditions to.
#. Select the :guilabel:`Alert Routing` tab to see the list of alerts that are currently routed to the incident policy.
#. To filter the alerts routed to the incident policy based on the data in the alerts, select :guilabel:`Add Filters`. 
    #. Select a filter field. For example, use :guilabel:`source` to route alerts based on a detector name. Key names are case sensitive and require an exact match.
    #. Select the :guilabel:`=` (equal to) or :guilabel:`!=` (not equal to) operator.
    #. Select a filter value. Key values are case sensitive and require an exact match.
    #. Select :guilabel:`Enter` to save your condition. 
#. Repeat these steps for any additional alert routing conditions that you want to set up. By default, multiple conditions are joined by an ``OR`` operator. To switch an ``OR`` operator to ``AND``, select the ``OR`` operator and select ``AND``.
#. Review the list of alerts that are currently routed to the incident policy to confirm your filter conditions are correct. 
#. Select :guilabel:`Save alert routing` when you finish setting up your alert routing conditions.

After you configure which alerts are routed to your incident policy, configure how alerts are grouped into incidents.

.. _ii-configure-alert-grouping:

Configure how alerts are grouped
====================================

Use alert grouping to manage how alerts are grouped into incidents and which alerts trigger a new incident. Alert grouping is specific to each incident policy and you can customize it to create the workflow that works for you. 

 To configure alert grouping, follow these steps:

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select :guilabel:`Incident policies` and then the incident policy you want to add alert grouping conditions to. Each incident policy can have one alert grouping configuration.
#. Select the :guilabel:`Alert grouping` tab.
#. Under :guilabel:`Alert metadata grouping (optional)`, select metadata fields you want to group by. The fields you are using in your alert routing conditions are available to select. However any custom field that is common in the alert routing metadata can be entered as a custom value. If you want add a field that is not displayed, enter the field name and select it from the dropdown to add it as a selected metadata field. Any custom field that is common in the alert routing metadata can be entered as a ``group by`` field.
#. In the :guilabel:`Incident breaking conditions` section, define the conditions that cause an incident to stop accumulating new alerts. When any one of the conditions you set in this section are met any subsequent alerts will trigger a new incident instead of being added to the existing incident.

   #. To break the existing incident if there has been a pause in alerts that lasts for the time duration you specify, select the pause duration from the :guilabel:`Select time value` drop down. Note: If you choose a time duration that is too short, you might encounter the situation where every alert triggers a new incident.  This is not generally desirable if the alerts are coming in within a short time span.
   
   #. To break the existing incident when an alert with specific values are included, select :guilabel:`Add Filters` and choose the key-value pair which will prevent new alerts coming to the existing incident.
   
   #. To break the existing incident after a specific amount of time has passed for the current alert, select that time duration in the :guilabel:`Select time value` dropdown.
   
   #. To break the existing incident after a specific number of alerts has been received in an incident, enter that value in the :guilabel:`The number of alerts in an incident reaches` field.

#. Select :guilabel:`Save`.

After you manage which alerts create an incident and how alerts are grouped into incidents, configure incident workflows for your incident policy.  

.. _ii-configure-incident-workflows:

Configure incident workflows for your incident policy
=========================================================

Use incident workflows to determine who is notified when a new incident is triggered. To create an automatic incident workflow, add escalating steps to notify responders of the incident. To add an incident workflow, follow these steps:

#. In Incident Intelligence, select :guilabel:`Incident Management`.
#. Select :guilabel:`Incident policies` and then the incident policy where you want to create an incident workflow.
#. Select the :guilabel:`Incident workflows` tab. 
#. To add responders, select :guilabel:`+ Add responders` under :guilabel:`Immediately`. 
#. In the :guilabel:`Configure invite` window, add responders by name or by schedule. If you don't have an on-call schedule, see :ref:`ii-create-manage-on-call-schedules`.
   
    .. list-table::
        :header-rows: 1
        :widths: 25, 75

        * - :strong:`Add responder option`
          - :strong:`Steps`

        * - Add responders by name
          - Enter user names in the :guilabel:`Search people` field and select the user when they appear. 
  
        * - Add responders by schedule
          - Enter a schedule name in the :guilabel:`Search schedules` field and select the schedule when it appears. Adding a schedule to a workflow step notifies the user that is on call when that workflow step is triggered. 

#. Repeat these steps until you have all the responders you want to invite to incidents for this step in the workflow. 
#. Select :guilabel:`Add responders`.
#. Select :guilabel:`Add New Step` to add additional escalating steps with additional responders to your incident workflow.
#. Select an elapsed time period in the list next to :guilabel:`If unacknowledged after`.
#. Select :guilabel:`+ Add responders` to add responders.
#. Repeat these steps until you have a complete incident workflow for the incident policy. 

.. _ii-rank-incident-policies:

Rank your incident policies to ensure alerts are appropriately routed
========================================================================

If you have more than one incident policy, organize them in the order of their importance (top to bottom) to your infrastructure. Alerts are only routed to one incident policy even if they match multiple policies. The incident policy that alerts are routed to is based on your policy's alert routing conditions and incident policy rank order. To rank your incident policies, go to :guilabel:`Incident Management` > :guilabel:`Incident policies` > :guilabel:`Incident policy ranking`. 

.. _ii-incident-policy-maintenance:

Mute notifications using incident policy maintenance
=======================================================

Use incident policy maintenance to mute notifications while you are making changes to the incident policy. 

To put your incident policy in maintenance, select the :guilabel:`Actions` menu on the incident policy you want to put in maintenance and select :guilabel:`Maintenance`. The incident policy status shows as :guilabel:`Maintenance`. 

All incidents associated with the incident policy that are triggered while the incident policy is in maintenance are created in a muted state. A muted incident does not notify responders. Muted incidents don't show in your incident list by default. To see your muted incidents, select the :guilabel:`Incidents` tab in Incident Intelligence and add a ``Status = Muted`` filter. Muted incidents are read-only and you can't acknowledge, resolve, or dismiss them.  

Take an incident policy out of maintenance
---------------------------------------------

To take an incident policy out of maintenance and resume triggering incidents, select the :guilabel:`Actions` menu on the incident policy you want to take out of maintenance and select :guilabel:`Enable`. The incident policy status shows as :guilabel:`Enabled`. This resumes triggering incidents associated with the incident policy.   

Next step
============

If you are setting up Incident Intelligence for the first time, next you need to create an on-call schedule. See :ref:`ii-create-manage-on-call-schedules`.