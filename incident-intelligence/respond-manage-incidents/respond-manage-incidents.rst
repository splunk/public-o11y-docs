.. _respond-manage-incidents:

Respond to and manage incidents
************************************

.. meta::
   :description: After you configure your services, you can respond to incidents incidents as they are triggered.

After you configure your services, go to the :guilabel:`Incidents` tab in Incident Intelligence to view incidents as they are triggered. You can also view incidents in Splunk Observability Cloud for Mobile. See :ref:`view-incidents-mobile` for more information.

.. toctree::
   :hidden:

   manual-incident
   add-responders-roles
   add-resources
   add-collaboration-tool
   view-incidents-mobile


Incidents begin in the triggered status. The default status lifecycle for incidents is triggered, and then acknowledged, and then resolved.

Acknowledge an incident
=============================

To acknowledge an incident, go to the :guilabel:`Incidents` tab in Incident Intelligence. You can acknowledge incidents in two places:

* Select :guilabel:`Acknowledge` on a triggered incident in the lists of incidents. You can also skip the incident status lifecycle by selecting resolve or reject from the :guilabel:`Actions` menu for the incident.
* Select the triggered incident you want to acknowledge from the list of incidents. On the incident detail page, select :guilabel:`Acknowledge`. You can also select resolve or reject from the :guilabel:`Actions` menu next to the :guilabel:`Acknowledge` button for the incident.

Resolve an incident
=========================
To resolve an incident, go to the :guilabel:`Incidents` tab in Incident Intelligence. You can resolve incidents in two places:

* Select :guilabel:`Resolve` on acknowledged incidents in the lists of incidents. You can also skip the incident status lifecycle by selecting a status from the :guilabel:`Actions` menu on the incident.
* Select an acknowledged incident you want to resolve from the list of incidents. On the incident detail page, select :guilabel:`Resolve`. You can also select a status from the :guilabel:`Actions` menu next to the :guilabel:`Resolve` button to resolve or reject the incident.

Reject an incident
========================
To reject an incident, go to the :guilabel:`Incidents` tab in Incident Intelligence. You can reject incidents in two places:

* Select the :guilabel:`Actions` menu on the incident and select :guilabel:`Reject` from the list.
* Select the incident you want to reject from the list of incidents. On the incident detail page, select the :guilabel:`Actions` menu next to the :guilabel:`Acknowledge` button, and select :guilabel:`Reject` from the list. (This button might say :guilabel:`Resolve` if the incident was previously acknowledged.)

.. _edit-incident:

Edit an incident
===================

Incidents automatically inherit the title and description of the first alert that triggers the incident. To edit the incident title, description, or severity, follow these steps:

#. Go to the :guilabel:`Incidents` tab in Incident Intelligence. 
#. Select the incident from the incident list.
#. Select the :guilabel:`pencil` icon.
#. Edit the title, description, or severity. 
#. Select :guilabel:`Save`.
