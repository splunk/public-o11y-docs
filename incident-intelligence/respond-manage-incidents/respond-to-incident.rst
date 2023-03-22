.. _ii-respond-to-incident:

Respond to an incident: Acknowledge, resolve, or dismiss an incident
****************************************************************************

.. meta::
   :description: Incident status overview and steps to respond to an incident in Incident Intelligence in Splunk Observability Cloud.

Incidents begin in the triggered status. The default status lifecycle for incidents is triggered, and then acknowledged, and then resolved.

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Incident status`
     - :strong:`Description`

   * - Triggered
     - Triggered incidents are considered active and open. Triggered incidents notify responders as defined by the steps in the associated incident policy's incident workflow. 

   * - Acknowledged
     - Acknowledged incidents are considered valid and under investigation. Setting an incident status to acknowledged prevents further notifications. 

   * - Dismissed
     - Dismissed incidents are considered invalid and closed; you will no longer be able to make updates to dismissed incidents. Setting an incident status to :guilabel:`Dismissed` prevents further notifications. 

   * - Resolved
     - Resolved incidents are considered investigated and closed. Setting an incident status to resolved prevents further notifications. 

To acknowledge, dismiss, or resolve an incident, select the :guilabel:`Incidents` tab in Incident Intelligence. 

* You can acknowledge an incident from the list of incidents or, alternatively, you can go into the detail of each incident and acknowledge it there.
* From either location, you also have the option to resolve or dismiss the incident.

See also
============

* :ref:`ii-snooze-incident`
* :ref:`ii-add-responders-roles`
* :ref:`ii-add-incident-tools-resources`
* :ref:`ii-edit-incident`
* :ref:`ii-muted-incidents`
* :ref:`ii-mtta-mttr`