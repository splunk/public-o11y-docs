.. _configure-incident-workflow:

Configure incident workflows for your service
************************************************************************

Use incident workflows to determine who is notified when a new incident is triggered. To create an automatic incident workflow, add a series of escalating steps to notify responders of the incident. To add an incident workflow, follow these steps:

#. In Incident Intelligence, go to :guilabel:`Incident Response Configuration`.
#. Select :guilabel:`Services` and then the service where you want to create an incident workflow.
#. Select the :guilabel:`Incident workflows` tab. 
#. To add responders, select :guilabel:`Configure invite` under :guilabel:`Immediately`. 
#. In the :guilabel:`Configure invite` window add responders or schedules.
    #. Enter user names in the :guilabel:`Search people` field and select the user when they appear. Repeat these steps until you have all the responders you want to invite to incidents for this service.
    #. Enter a schedule name in the :guilabel:`Search schedules` field and select the schedule when it appears. You can only select one schedule in a given incident workflow step. If you haven't already created an on-call schedule, see :ref:`create-on-call-schedules`.
#. Select :guilabel:`Add responders`.
#. Select :guilabel:`Add New Step` to add additional escalating steps with additional responders to your incident workflow.
#. Select an elapsed time period in the drop-down list next to :guilabel:`If unacknowledged after`.
#. Select :guilabel:`Configure invite` to add responders as you did in the previous steps.
#. Repeat these steps until you have a complete incident workflow for the service. 
