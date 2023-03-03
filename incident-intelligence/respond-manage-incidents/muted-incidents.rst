.. _ii-muted-incidents:

What is a muted incident?
************************************

.. meta::
   :description: Understand muted incidents in Incident Intelligence in Splunk Observability Cloud.

Incidents are triggered in a muted state when an incident policy is in maintenance. See :ref:`ii-incident-policy-maintenance`.

Muted incidents don't show in your incident list by default. To see your muted incidents, select the :guilabel:`Incidents` tab in Incident Intelligence and add a ``Status = Muted`` filter. No responders are notified when a muted incident is triggered. Muted incidents are read-only and can't be acknowledged, resolved, or dismissed.