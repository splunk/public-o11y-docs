.. _rackspace-spoc:

Rackspace integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Rackspace integration for Splunk On-Call.

Send your Rackspace alerts directly into the Splunk On-Call timeline using the following instructions.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
====================================

In Splunk On-Call, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`, :guilabel:`Rackspace`.

If the integration isn't active, select :guilabel:`Enable Integration` to generate your endpoint URL. Replace the ``$routing_key`` placeholder with the routing key you want to use. See :ref:`spoc-routing-keys`.


Rackspace configuration
====================================

From the web portal select the account menu and then select :guilabel:`Account Settings`.

.. image:: /_images/spoc/Rackspace2.png
   :alt: Account settings

From the :guilabel:`Account Settings` screen, select the :guilabel:`Servers` menu and then select :guilabel:`Rackspace Intelligence`.

.. image:: /_images/spoc/Rackspace3.png
   :alt: Rackspace intelligence

From the :guilabel:`Rackspace Intelligence` screen select the :guilabel:`Notify` option and then :guilabel:`Notification Plans`, :guilabel:`Create Notification Plan`. Give the plan a name and select :guilabel:`Create Notification Plan`.

.. image:: /_images/spoc/Rackspace4.png
   :alt: Notification plan

After the plan has been created, select :guilabel:`Add Notifications`.

.. image:: /_images/spoc/Rackspace5.png
   :alt: Add notification

Select :guilabel:`Create a new notification`.

.. image:: /_images/spoc/Rackspace6.png
   :alt: Create notification

A menu appears. Enter a name for your new notification, then select :guilabel:`Splunk On-Call` as the type, paste your API key and add the appropriate routing key for the notification plan. Select :guilabel:`Create and Select Notification`, :guilabel:`Save Notification Plan`.

.. image:: /_images/spoc/Rackspace7.png
   :alt: Save notification plan

