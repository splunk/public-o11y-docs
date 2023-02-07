.. _ii-snooze-incident:

Snooze an incident
*********************

.. meta::
   :description: Steps to snooze an incident in Incident Intelligence in Splunk Observability Cloud.

You can snooze an incident to silence paging on unactionable or less-urgent incidents for a specified period of time. At the end of the specified time, the incident workflow with which the incident is associated is triggered again, starting with the first step. To snooze an incident, follow these steps:

#. In Incident Intelligence, go to the :guilabel:`Incidents` tab. 
#. Locate the incident and select the :guilabel:`Actions` menu.
#. Select :guilabel:`Snooze`.
#. Next to :guilabel:`Snooze until`, select the date and time when you want to re-trigger the incident workflow.
#. Select :guilabel:`Snooze`.

Unsnooze an incident
=======================

If you need to unsnooze an incident before the specified period of time, follow these steps:

#. In Incident Intelligence, go to the :guilabel:`Incidents` tab. 
#. Locate the incident.
#. Select :guilabel:`Resume`.

When a snoozed incident resumes, the incident workflow is triggered again, starting with the first step. 

See also
===============

* :ref:`ii-respond-to-incident`
* :ref:`ii-add-responders-roles`
* :ref:`ii-add-incident-tools-resources`
* :ref:`ii-edit-incident`
* :ref:`ii-muted-incidents`
* :ref:`ii-mtta-mttr`