.. _manual-incident:

************************************************************************
Create incidents manually
************************************************************************

.. meta::
   :description: Splunk On-Call offers the ability to manually trigger a new incident from within the application.


Splunk On-Call offers the ability to manually trigger a new incident from within the application. This option is available for both the web portal and mobile applications.

Note the following:

-  Currently, manual incidents are created outside of the Rules Engine flow. This means that Rules Engine rules will not affect manual incidents.
-  A user must be a member of at least one team in order to directly page them via manual incident.
-  Manual incidents trigger personal paging policies the same way that any other incident does. Unlike incidents created by monitoring tools, manual incidents can be routed to individuals, groups of individuals, or directly to an existing escalation policy.

Manual incident from Web interface
=======================================

The :guilabel:`Create Incident` button can be found at the top right of the
Incident Table on your Team Dashboard.

.. image:: /_images/spoc/manual-incident-1.png
    :width: 100%
    :alt: The Create Incident button in on your Team Dashboard.


To create your incident be sure to complete all fields in the Incident Form:

.. image:: /_images/spoc/manual-incident-2.png
    :width: 100%
    :alt: Complete all the fields.


.. image:: /_images/spoc/manual-incident-3.png
    :width: 100%
    :alt: Complete all the fields.

-  Select which Teams/Escalation Policies the incident needs to go to
-  Choose your acknowledge behavior (Stop paging after one acknowledgement or “Multi Responder” functionality)
-  Give the incident a clear Incident Description and an Incident Body with the necessary details for the responders.
-  Configure your Conference Bridge if applicable

Select :guilabel:`Create Incident` and the incident will then  behave like any other incident.

Manual incident from mobile
==================================

Refer to :ref:`Mobile app incident management <mobile-incidents>` for manual incident creation from the Splunk On-Call mobile app.
