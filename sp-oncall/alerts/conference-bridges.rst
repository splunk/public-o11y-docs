
.. _conference-bridges:

************************************************************************
Use your own conference bridges
************************************************************************

.. meta::
   :description: The conference bridge feature allows teams to add their conference bridge information to an incident in Splunk On-Call. 



Requirements
===================

This feature is for Enterprise customers.

The conference bridge feature allows teams to add their conference bridge information to an incident in Splunk On-Call. This mobilizes your team when it matters most. You can use your preferred web conferencing provider for faster incident response.

Adding Pre-Set Conference Bridge Information
=========================================================

Under :guilabel:`Settings`, then :guilabel:`Conference Bridges`, users with either Global or Alert
Admin permissions can select “add conference bridge” to add a conference bridge that will be saved and can be retrieved when adding responders and a conference bridge from the War Room. You may add up to 25 pre-set conference bridges.

.. image:: /_images/spoc/confbridge.png
    :width: 100%
    :alt: You can add up to 25 conference bridges.


Selecting a Pre-Set Conference Bridge
=============================================

From the War Room, pre-set conference bridge information may be added so additional responders can rally to an incident.

Note, you will not be able to select pre-set conference bridges from the incident pane.

.. image:: /_images/spoc/confbridge2.png
    :width: 100%
    :alt: You can add up to 25 conference bridges.

Creating an Ad-Hoc Conference Bridge
=============================================

Add conference bridge information from a manual incident or when adding responders to an existing incident.

.. image:: /_images/spoc/confbridge3.png
    :width: 100%
    :alt: Add bridge information to a manual incident.


Mobile or Web display


This is available in both the mobile and web UI:

.. image:: /_images/spoc/confbridge4.png
    :width: 100%
    :alt: Mobile or web view.


.. image:: /_images/spoc/confbridge5.png
    :width: 100%
    :alt: Mobile or web view.

From the War Room, when you've successfully added your pre-set conference bridge, the conference bridge name will be displayed on the incident overview pane.


.. image:: /_images/spoc/confbridge6.png
    :width: 100%
    :alt: The conference bridge name displays.

Notification Updates
==========================

SMS
-------


After acknowledging an SMS notification, Splunk On-Call will either send your conference bridge URL, the primary phone number, or the deep link URL to an incident as part of the acknowledgment receipt.

.. image:: /_images/spoc/confbridge7.png
    :width: 100%
    :alt: The conference bridge name is sent using SMS.

Push Notification
---------------------

After acknowledging a push notification, a user can select acknowledge and join a conference call.

.. image:: /_images/spoc/confbridge8.png
    :width: 100%
    :alt: The conference bridge name sent using push notification.


Email
--------------

Splunk On-Call sends the incident deep link URL from a Splunk On-Call email notification. This will open the mobile app if the mobile app is downloaded on the user's device, or open the incident pane when the
mobile app is not available.


