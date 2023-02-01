.. _ii-add-responders-roles:

Add responders and assign roles
***********************************

.. meta::
   :description: Steps to add responders and assign roles within an incident in Incident Intelligence in Splunk Observability Cloud.

If your incident policies have an incident workflow, responders are automatically added to incidents. To add or remove incident responders, follow these steps:

#. In Incident Intelligence, go to the :guilabel:`Incidents` tab. 
#. Select the incident from the incident list.
#. Select :guilabel:`Add Responders`.
#. You can add responders by selecting a schedule and you can add a specific responder by name.
    #. To add a responder by schedule, select a schedule from the :guilabel:`By schedule` list. When you select a schedule, the responder in the schedule who is currently on call is notified. 
    #. To add a responder by name, enter user names in the :guilabel:`By name` field and select the desired user when they appear. You can add multiple responders by name. 
#. If you need to remove a responder, hover over the responder you want to remove, select the menu, and then select :guilabel:`Remove`.
#. Select :guilabel:`Save`.

Add and assign responder roles
==================================

To add responder roles to incident responders, follow these steps:

#. In Incident Intelligence, go to the :guilabel:`Incidents` tab. 
#. Select the incident from the incident list.
#. Hover over the responder you want to add a role to and select the menu, and then select :guilabel:`Edit Role`.
#. Select the roles you want to assign to the responder. The list of roles shows default roles (:guilabel:`Incident Commander`, :guilabel:`Communications Owner`, :guilabel:`Task Manager`, :guilabel:`Customer Liaison`) and any previously created custom roles. To add a new custom role, enter the custom role name you want to use and select enter.
#. Select :guilabel:`Save`. 

See also
============

* :ref:`ii-respond-to-incident`
* :ref:`ii-snooze-incident`
* :ref:`ii-add-incident-tools-resources`
* :ref:`ii-edit-incident`
* :ref:`ii-muted-incidents`
* :ref:`ii-mtta-mttr`