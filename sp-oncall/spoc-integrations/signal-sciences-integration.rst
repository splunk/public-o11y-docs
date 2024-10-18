.. _signal-sciences-spoc:

Signal Sciences integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Signal Sciences integration for Splunk On-Call.

Signal Sciences gives you theinsights you need to prioritize your security resources to address
attacks as they occur. With greater visibility and awareness, you can make informed decisions and confidently run your web applications. The following guide walks you through this integration.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
=======================================

From the Splunk On-Call web portal, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`.

.. image:: /_images/spoc/Integration-ALL-FINAL.png
   :alt: Select integration

Select the :guilabel:`Signal Sciences` integration option.

|image| 

Copy the :guilabel:`Service API Endpoint` to the clipboard and replace the ``$routing_key`` section with the routing key you want to use. See :ref:`spoc-routing-keys`.

.. image:: /_images/spoc/Integrations-SignalSciences_vo_endpoint.png
   :alt: Add routing key in endpoint

Signal Sciences configuration
=======================================

From the Signal Sciences web interface, select the :guilabel:`Configurations` menu, then select :guilabel:`Integrations`.

.. image:: /_images/spoc/Zoom_Meeting_ID__340-382-347.png
   :alt: Configurations menu

Locate the :guilabel:`Splunk On-Call alert` integration on the list of available integrations and select :guilabel:`Add`.

.. image:: /_images/spoc/Zoom_Meeting_ID__340-382-347__3_.png
   :alt: Add integration

Paste the URL from the previous section into the :guilabel:`Webhook URL` field, then select the events that trigger an alert and select :guilabel:`Add`.

.. image:: /_images/spoc/Zoom_Meeting_ID__340-382-347__5_-1.png
   :alt: Configure webhook

Splunk On-Call alert appears as a configured integration. Select :guilabel:`Test` to send a test alert to Splunk On-Call. Make sure that you see the alert in your Splunk On-Call timeline.

.. image:: /_images/spoc/Zoom_Meeting_ID__340-382-347__4_-2.png
   :alt: Send test alert

.. |image| image:: /_images/spoc/SignalSciences-final.png
