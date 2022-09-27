:orphan:

.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _manage-incident:

Manage an incident
***********************

.. meta::
   :description: There are several incident management tools available within an incident.

There are several incident management tools available within an incident.

Add a collaboration tool to an incident
===========================================
You can add collaboration tools to incidents to ensure that incident responders know where to go to collaborate to resolve an incident. This might be a Slack channel or a conference bridge. To add a collaboration tool to an incident, follow these steps:

#. Go to the :guilabel:`Incidents` tab in Incident Intelligence. 
#. Select the incident from the incident list.
#. Select :guilabel:`Add Collaboration Tool`.
#. Enter a :guilabel:`Title` for the collaboration tool.
#. Enter a :guilabel:`URL` for the collaboration tool.
#. (Optional) Enter notes about the collaboration tool.
#. Select :guilabel:`Add`. 

Add or remove incident responders
=====================================

If your services have an incident workflow, responders are automatically added to incidents. To add or remove incident responders, follow these steps:

#. Go to the :guilabel:`Incidents` tab in Incident Intelligence. 
#. Select the incident from the incident list.
#. Select :guilabel:`Add Responders`.
#. You can add responders by selecting a schedule or you can add a specific responder by name.
    #. To add a responder by schedule, select a schedule in the :guilabel:`By schedule` list. When you select a schedule, the responder in the schedule who is currently on call is notified. 
    #. To add a responder by name, enter user names in the :guilabel:`By name` field and select the desired user when they appear. You can add multiple responders by name. 
#. If you need to remove a responder, hover over the responders you want to remove, select the menu, and then select :guilabel:`Remove`.
#. Select :guilabel:`Save`.

Add responder roles
=========================

#. To add responder roles to incident responders, follow these steps:
#. Go to the :guilabel:`Incidents` tab in Incident Intelligence. 
#. Select the incident from the incident list.
#. Hover over the responder you want to add a role to and select the menu, and then select :guilabel:`Edit Role`.
#. Select roles you want to assign to the responder. The list of roles shows default roles (:guilabel:`Incident Commander`, :guilabel:`Communications Owner`, :guilabel:`Task Manager`, :guilabel:`Customer Liason`) and any previously-created custom roles. To add a new custom role, enter the custom role name you want to use and select enter.
#. Select :guilabel:`Save`. 

Add resources to the incident
================================
You can add resources to incidents so that incident responders have quick access to any resources they might need. To add a resource to an incident, follow these steps:

#. Go to the :guilabel:`Incidents` tab in Incident Intelligence. 
#. Select the incident from the incident list.
#. Select :guilabel:`Add Resource`.
#. Enter a :guilabel:`Title` for the resource.
#. Enter a :guilabel:`URL` for the resource.
#. (Optional) Enter notes about the resource.
#. Select :guilabel:`Add`. 

Edit an incident
===================

Incidents automatically inherit the title and description of the first alert that triggers the incident. To edit the incident title, description, or severity, follow these steps:

#. Go to the :guilabel:`Incidents` tab in Incident Intelligence. 
#. Select the incident from the incident list.
#. Select the :guilabel:`pencil` icon.
#. Edit the title, description, or severity. 
#. Select :guilabel:`Save`.