:orphan:

.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _respond-to-incident:

Respond to an incident
***************************

.. meta::
   :description: After you configure your services, you can respond to incidents incidents as they are triggered.

After you configure your services, go to the :guilabel:`Incidents` tab in Incident Intelligence to view incidents as they are triggered. You can also view incidents in Splunk Observability Cloud for Mobile. See :ref:`incidents-in-mobile` for more information.

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

.. _incidents-in-mobile:

View incidents in Splunk Observability Cloud for Mobile
==========================================================

You can view incidents within Splunk Observability Cloud for Mobile as well. See :ref:`intro-to-mobile` to get started wth Splunk Observability Cloud for Mobile.

To view incidents in Splunk Observability Cloud for Mobile, go to the :guilabel:`Incidents` tab. 

What can I do with incidents in Splunk Observability Cloud for Mobile?
-------------------------------------------------------------------------

* Filter incidents - The list of incidents is filtered to incidents with a triggered status and critical severity by default. Select the triggered status or critical severity to change the filters. 
* Search for incidents - Use the search field to search for a specific incident. 
* View incident details - Select the incident to view the incident details and list of alerts that are grouped within the incident.
