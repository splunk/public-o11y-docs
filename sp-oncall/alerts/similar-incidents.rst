.. _similar-incidents:

************************************************************************
About incident types
************************************************************************

.. meta::
   :description: Learn about the different types of incidents in Splunk On-Call.



Similar Incidents
==========================

Splunk On-Call leverages natural language processing to look up similar incidents. In the similar incidents tab, you can find both active and past incidents.

Active Incidents
==========================

Active incidents show potentially related incidents that may be occurring right now. By looking up active similar incidents, responders
can coordinate a response against the same problem and diagnose if there are parallel streams of response.

Past Incidents
==========================

By looking up past incidents, responders can find insights from previously resolved incidents that may be related. Incident chats,
responders, and annotations may help derive context from past solutions to remediate current problems faster. Results are stack-ranked by similar payload fields, and then by date if similarity is equal.

You can expect to see similar previous incidents within minutes in the :guilabel:`Similar Incidents` tab of the incident in question.

.. image:: /_images/spoc/incidents1.png
    :width: 100%
    :alt: A 404 error message stating "Could not find credentials".

