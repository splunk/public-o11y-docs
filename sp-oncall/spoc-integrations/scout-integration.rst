.. _scout-spoc:

Scout APM integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the <integrationName> integration for Splunk On-Call.

Scout is Application Monitoring built for modern development teams. It's built to provide the fastest path to a slow line-of-code. The following guide walks you through the integration process.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
================================

Navigate to :guilabel:`Integrations`, :guilabel:`Third Party Integrations`, :guilabel:`Scout APM` and select :guilabel:`Enable Integration`. Copy the Service API Key for use in the Scout APM configuration.


Scout APM configuration
================================

Go to :guilabel:`Alerts & Notification`, :guilabel:`Notification Channels`.

.. image:: /_images/spoc/scoutapm1.png
   :alt: Notification channels

Select :guilabel:`Splunk On-Call Alert`.

.. image:: /_images/spoc/scoutapm2.png
   :alt: Splunk On-Call button

Add a name for the Channel, set the alerting level, then add the Service API Key which you copied from the Splunk On-Call Integration page. Next, enter a valid routing key and select :guilabel:`Create Integration`.

.. image:: /_images/spoc/scoutapm5.png
   :alt: Create integration

After you've created the integration, you can add the channel to a notification group. When you create alerts, you assign a notification group to alert. That way when an alert occurs all of the channels in that group get notified. On the notification group page, you can either add it to the default notification group, or create a new one.

.. image:: /_images/spoc/scoutapm4.png
   :alt: Notification group

