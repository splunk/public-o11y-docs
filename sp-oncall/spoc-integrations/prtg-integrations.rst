.. _prtg-legacy-spoc:

PRTG integration for Splunk On-Call (Legacy email version)
************************************************************

.. meta::
    :description: Configure the PRTG legacy integration for Splunk On-Call.

PRTG is a highly flexible and generic software for monitoring IT infrastructure. The following documentation will walk you through how to send PRTG notifications to the Splunk On-Call timeline by using the generic email endpoint.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

To ensure incidents are resolved correctly, choose static fields for the Critical and Resolved subject lines.

Splunk On-Call configuration
=================================

In Splunk On-Call, select :guilabel:`Integrations`, :guilabel:`PRTG`.

If the integration isn't active, select :guilabel:`Enable Integration` to generate your endpoint URL. Make sure to replace the ``$routing_key`` section with the actual routing key you want to use.

.. image:: /_images/spoc/PRTG-Email-final.png
   :alt: Activate PRTG integration

PRTG configuration
==============================

1. From the main dashboard, select :guilabel:`Setup`, :guilabel:`Account Settings`, :guilabel:`Notifications`.
2. Select :guilabel:`Add new notification`.
3. Give the notification a name.
4. Make sure the status is set to ::guilabel:`Started`. Under :guilabel:`Notification summarization`, set the :guilabel:`Method` to :guilabel:`Always notify ASAP`.

Create an incident
--------------------------

1. Select the check box for :guilabel:`Send email`. This expands the email settings.
2. Paste your Splunk On-Call email endpoint address into the :guilabel:`Send to Email Address` field.
3. Use the following text as the subject line:

   **[%sitename] %device %name CRITICAL**

Resolve an incident
---------------------------

If you want PRTG to send a recovery email to close the incident in Splunk On-Call when a monitored device recovers, you need to create a separate notification using another email that uses this text as the subject:

**[%sitename] %device %name RECOVERY**

1.  Set the :guilabel:`Format` field to :guilabel:`Text`, then select :guilabel:`Save`.
2. To test the integration, return to the :guilabel:`Notifications`, find your newly created Splunk On-Call notification method and select :guilabel:`Test`. This triggers an incident in your Splunk On-Call timeline.

