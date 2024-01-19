.. _similar-incidents:

************************************************************************
About incidents
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.



**Similar Incidents**
---------------------

Splunk On-Call leverages natural language processing to look up similar
incidents. In the similar incidents tab, you can find both active and
past incidents.

**Active Incidents**
~~~~~~~~~~~~~~~~~~~~

Active incidents show potentially related incidents that may be
occurring right now. By looking up active similar incidents, responders
can coordinate a response against the same problem and diagnose if there
are parallel streams of response. 

**Past Incidents**
~~~~~~~~~~~~~~~~~~

By looking up past incidents, responders can find insights from
previously resolved incidents that may be related. Incident chats,
responders, and annotations may help derive context from past solutions
to remediate current problems faster. Results are stack-ranked via
similar payload fields, and then by date if similarity is equal.

You can expect to see similar previous incidents within minutes in the
**Similar Incidents tab** of the incident in question.

.. image:: images/similarIncidentEx.png
