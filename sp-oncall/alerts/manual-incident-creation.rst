.. _manual-incident:

************************************************************************
Using Webhooks with Splunk On-Call
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


Splunk On-Call offers the ability to manually trigger a new incident from within the application. This option is available for both the web portal and mobile applications.

**What you need to know about this feature:**

-  Currently, manual incidents are created **outside of the Rules Engine
   flow**. This means that Rules Engine rules will not affect manual
   incidents.
-  A user must be a member of **at least one** **team** in order to
   directly page them via manual incident.
-  Manual incidents trigger personal paging policies the same way that
   any other incident does. Unlike incidents created by monitoring
   tools, manual incidents can be routed to individuals, groups of
   individuals, or directly to an existing escalation policy.

Manual Incident from Web
========================

The “Create Incident” button can be found at the top right of the
Incident Table on your Team Dashboard.

.. image:: images/Manual-Incident-scaled.jpg

To create your incident be sure to complete all fields in the Incident
Form:

.. image:: images/Manual-incident-pop-up-scaled.jpg

.. image:: images/Incident-Creation-scaled.jpg

-  Select which **Teams/Escalation Policies** the incident needs to go
   to
-  Choose your **acknowledge behavior** (Stop paging after one
   acknowledgement or “Multi Responder” functionality
-  Give the incident a clear **Incident Description** and an **Incident
   Body** with the necessary details for the responders.
-  Configure your **Conference Bridge** if applicable

Click “Create Incident” and from here the incident will behave like any
other incident.

Manual Incident from Mobile
===========================

Please refer to the `Mobile App Incident Management
Article <https://help.victorops.com/knowledge-base/mobile-app-incident-management/>`__
for Manual incident creation from the VictorOps Mobile App.
