.. _appoptics-spoc:

AppOptics integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the AppOptics integration for Splunk On-Call.

AppOptics provides a complete solution for monitoring and understanding
the metrics that impact your business at all levels of the stack.

With the Splunk On-Call integration with AppOptics you can send all
AppOptics alerts into the Splunk On-Call timeline, allowing your team to act
quickly.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
==============================

From the main timeline, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`, :guilabel:`AppOptics`.

.. image:: /_images/spoc/800x320@2x.png
   :alt: Integrations menu

If the integration has not yet been activated, select :guilabel:`Enable Integration` to generate your Service API Key:

.. image:: /_images/spoc/AppOptics.png
   :alt: API key

Copy the Service API Key to your clipboard and determine which Splunk On-Call routing-key value you use for this integration. For more information on routing keys and best practices, see :ref:`routing-keys`.

AppOptics configuration
========================

From the :guilabel:`Organization Details` section, select :guilabel:`Notification Services`, :guilabel:`Splunk On-Call`, and then select :guilabel:`Add Configuration`.

.. image:: /_images/spoc/librato_VO_option@2x.png
   :alt: Select Splunk On-Call

Give the integration configuration a title, then paste the service API key and routing key you copied from Splunk On-Call, then save.

.. image:: /_images/spoc/librato_VO_settings@2x.png
   :alt: Save the changes
