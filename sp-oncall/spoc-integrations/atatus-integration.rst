.. _atatus-spoc:

Atatus integration for Splunk On-Call
************************************************

.. meta::
    :description: Configure the Atatus integration for Splunk On-Call.

Atatus is an application performance management and error tracking solution that captures performance metrics and errors from your servers, front-end environment, and mobile applications.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Annotating the links provided by Atatus to your alerts requires Alert Rules Engine, which is an Enterprise feature.


Splunk On-Call configuration
===================================

From the main timeline select :guilabel:`Integrations`, :guilabel:`Atatus.`

If the integration isn't active, select :guilabel:`Enable Integration`. Copy the service API key to your clipboard.

.. image:: /_images/spoc/Integration-Atatus-final.png
   :alt: Atatus integration

After you have copied the API key to your clipboard, select :guilabel:`Settings`, :guilabel:`Routing Keys` to find your routing key configuration. See :ref:`routing-keys`.

.. image:: /_images/spoc/atatus2.png
   :alt: Routing keys for Atatus


Atatus configuration
===============================

1. Navigate to :guilabel:`Project Settings`, :guilabel:`Team Notifications`.
2. Select the :guilabel:`Splunk On-Call` tab, now known as Splunk On-Call.
3. Paste your API key and routing key from Splunk On-Call.
4. Check :guilabel:`Enable this integration`.
5. Save.

.. image:: /_images/spoc/atatus3.png
   :alt: Atatus configuration


Annotate the links to Atatus alerts
==============================================================

Using the Alert Rules Engine to annotate the links sent by Atatus make those links more visible for users viewing the
incidents in Splunk On-Call.

1. In Splunk On-Call, navigate to :guilabel:`Settings`, :guilabel:`Alert Rules Engine`.
2. Select :guilabel:`Add a rule`.
3. Configure the Alert Rules Engine rule as follows:

   * When ``monitoring_tool`` matches ``Atatus``
   * Annotate alert with:

      * URL
      * Error Details
      * ``${{details.errorUrl}}``

4. Save the changes.

.. image:: /_images/spoc/Integration-Atatus-Transmog-2-final-final.png
   :alt: Configure alert rules engine


Test the integration
======================

1. From the Splunk On-Call integration settings page in Atatus, select :guilabel:`Send test message`.

.. image:: /_images/spoc/atatus6.png
   :alt: Send test message in Atatus

2. Check your Splunk On-Call timeline to make sure an event is registered from Atatus.
