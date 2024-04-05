.. _waiting-room:

************************************************************************
Configure a Waiting Room for incidents
************************************************************************

.. meta::
   :description: About the user role in Splunk On-Call.


Many resilient monitoring systems will automatically resolve a problem without any human interaction required. Paging users for incidents that could auto-resolve creates unnecessary noise for your on-call users. To avoid this issue, you may want to set up a waiting room. 

When you set up a waiting room escalation policy it will temporarily hold an incident for a configurable time period to allow for an automated resolution to an issue. When this action takes place, the incident is then automatically closed in Splunk On-Call and on-call users will not be paged. If the incident remains open longer than the chosen interval, it is then routed to the responsible team or escalation policy as a triggered alert.

.. note:: The Rules Engine section of this configuration requires a Full-Stack level of service.


Configure a new Escalation policy
=====================================

#. Navigate to the team in need of a waiting room escalation policy. Select :guilabel:`Escalation Policies`, then :guilabel:`Add Escalation Policy`.
#. Select the drop-down for :guilabel:`Immediately` and choose a time interval to delay alerts that are sent to this team's Waiting Room escalation policy.
#. For the :guilabel:`Escalation type` select :guilabel:`Execute Policy` and then choose the policy from the team that will be responsible for these incidents should they fail to auto-resolve within the configured time delay.

.. image:: /_images/spoc/waitingroom.png
    :width: 100%
    :alt: Select the time interval and the escalation policy if the incident doesn't auto-resolve.


Create a Routing Key
============================

#. Navigate to :guilabel:`Settings`, then :guilabel:`Routing Keys`.
#. Select :guilabel:`Add Key`, give the new routing key a name, and choose the waiting room team you've just created.

.. image:: /_images/spoc/waitingroom2.png
    :width: 100%
    :alt: Create and add a routing key to the team you created.


Set up a Rules Engine rule to route these incidents to the Waiting Room
===============================================================================

#. Navigate to :guilabel:`Settings`, then :guilabel:`Add a Rule`. 
#. Select :guilabel:`Add a Rule`. In the following example, the rule is configured to match the ``entity_id`` field to a wildcard phrase within variable of the ``entity_id`` field. 
    Any incoming alert that has this matching condition will be routed to the waiting room escalation policy. This allows you to limit the scope of the matching condition to these issues only, without affecting an on-call team's ability to be paged immediately in the event of an urgent issue. For more information on using the Rules Engine, see :ref:`alert-rules-engine`. 

    .. image:: /_images/spoc/waitingroom3.png
        :width: 100%
        :alt: Use the entity_id field to match a wildcard phrase.

If you have a variety of incidents that require this approach, and multiple teams or escalation policies that will be responsible, you will need to set up a unique waiting room escalation policy with its own routing_key for each of those teams' policies. For example, “Ops Waiting Room” with an escalation policy that points to the Ops team, an “SRE Waiting Room” with an escalation policy that points to the SRE team.
