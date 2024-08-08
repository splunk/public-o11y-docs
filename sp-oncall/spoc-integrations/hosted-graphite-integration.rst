.. _hosted-graphite-spoc:

Hosted Graphite integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Hosted Graphite integration for Splunk On-Call.

Hosted Graphite allows you to display your monitoring data on graphs and dashboards, and includes alerting. The following guide walks you through the steps needed to integrate these two systems.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
=====================================

From the timeline, go to :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`.

.. image:: /_images/spoc/Integration-ALL-FINAL.png
   :alt: Integrations menu

Select the :guilabel:`Hosted Graphite` integration and copy the service API endpoint to your clipboard.

.. image:: /_images/spoc/Integrations-victorops-17.png
   :alt: Hosted Graphite integration

Hosted Graphite configuration
=====================================

From the Hosted Graphite interface, select :guilabel:`Alerts`, :guilabel:`Notification Channels`.

.. image:: /_images/spoc/hosted2.png
   :alt: Select notification channels

Next, add a new :guilabel:`Notification Channel`.

.. image:: /_images/spoc/hosted3.png
   :alt: Add a new channel

Select the :guilabel:`Splunk On-Call` notification type, give the notification channel a name and then paste the API key you copied from the Splunk On-Call web portal.

.. image:: /_images/spoc/hosted4.png
   :alt: Set up channel

Save your new Splunk On-Call notification channel. Now you can use this channel when creating new alerts in Hosted  Graphite.

To set up an alert, select :guilabel:`Alerts` from the sidebar.

.. image:: /_images/spoc/hosted5.png
   :alt: Set up an alert

When creating or editing an alert, select Splunk On-Call as the :guilabel:`Notify me with…` option.

.. image:: /_images/spoc/hosted6.png
   :alt: Notification settings

Select :guilabel:`Save Alert`.
