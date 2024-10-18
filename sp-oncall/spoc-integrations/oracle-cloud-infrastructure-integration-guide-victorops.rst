.. _oci-integration-spoc:

Oracle Cloud Infrastructure integration for Splunk On-Call
************************************************************

.. meta::
    :description: Configure the Oracle Cloud Infrastructure integration for Splunk On-Call.

This guide explains how to integrate your Oracle Cloud Infrastructure (OCI) with Splunk On-Call.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

You might require administrative privileges in Oracle Cloud Infrastructure.

Splunk On-Call configuration
====================================

From the Splunk On-Call web portal navigate to :guilabel:`Integrations`, :guilabel:`3rd Party Integrations`, :guilabel:`Oracle Cloud Infrastructure` and then select :guilabel:`Enable Integration`.

Copy the resulting generated service API endpoint to your clipboard for later use in OCI.

Oracle Cloud Infrastructure configuration
===================================================

From the Oracle Cloud console navigate to :guilabel:`Solutions and Platform Monitoring`, :guilabel:`Alarm Definitions`.

.. image:: /_images/spoc/OCI-1.jpg
   :alt: Location of Alarm Definitions in OCI

Select :guilabel:`Create Alarm`. On this screen define your alarm and configure the desired alarm metrics and trigger rules.

.. image:: /_images/spoc/Create-Alarm.jpg
   :alt: Create alarm in OCI

After the alarm configuration is complete, the :guilabel:`Notifications` section populates at the bottom of the :guilabel:`Create Alarm` page. Select :guilabel:`Create a topic`.

.. image:: /_images/spoc/Create-a-topic.jpg
   :alt: Create a new topic in OCI

Provide a topic name. Under :guilabel:`Subscription Protocol`, select :guilabel:`HTTPS`. Paste the service endpoint URL copied in previous step. Replace ``$routing_key`` in the URL with the value of the routing key you have configured.

.. image:: /_images/spoc/URL.jpg
   :alt: Select protocol

.. image:: /_images/spoc/Configure-URL.jpg
   :alt: Create topic and subscription

After creating the topic, select :guilabel:`Save alarm`.

Now, navigate back to Splunk On-Call. An initial ``INFO`` alert from Oracle Cloud appears. Expand the Alert Payload and copy the confirmation url that is included in the alert data under ``raw.ConfirmationURL``.

As the last step, paste the URL into a browser to see a topic subscription confirmation message like the following:

.. image:: /_images/spoc/OCI-Confirmation.jpg
   :alt: Confirmation message for the subscription in OCI
