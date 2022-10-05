.. _configure-incident-workflow:

Configure incident workflows for your service
************************************************************************

Use incident workflows to determine who is notified when a new incident is triggered. To create an automatic incident workflow, add escalating steps to notify responders of the incident. To add an incident workflow, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` and then the service where you want to create an incident workflow.
#. Select the :guilabel:`Incident workflows` tab. 
#. To add responders, select :guilabel:`Configure invite` under :guilabel:`Immediately`. 
#. In the :guilabel:`Configure invite` window, add responders by name or by schedule.
    #. To add responders by name, enter user names in the :guilabel:`Search people` field and select the user when they appear. 
    #. To add responders by schedule, enter a schedule name in the :guilabel:`Search schedules` field and select the schedule when it appears. Adding a schedule to a workflow step notifies the user that is on call when that workflow step is triggered. 
    #. Repeat these steps until you have all the responders you want to invite to incidents for this step in the workflow. 
#. Select :guilabel:`Add responders`.
#. Select :guilabel:`Add New Step` to add additional escalating steps with additional responders to your incident workflow.
#. Select an elapsed time period in the drop-down list next to :guilabel:`If unacknowledged after`.
#. Select :guilabel:`Configure invite` to add responders.
#. Repeat these steps until you have a complete incident workflow for the service. 