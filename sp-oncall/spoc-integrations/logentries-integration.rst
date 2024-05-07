.. _logentries-spoc:

LogEntries integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the LogEntries integration for Splunk On-Call.

Logentries offers real-time log management and analytics at any scale. This integration allows you to send tagged Logentries alerts into Splunk On-Call using the Generic Email Endpoint. The following guide walks you through the steps needed to implement this integration.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call
====================

In Splunk On-Call, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations, :guilabel:`LogEntries`.

|image1|

If the integration isn't active, select :guilabel:`Enable Integration` to generate your endpoint URL. Copy the URL to the clipboard and replace the ``$routing_key`` fragment with the routing key you want to use. See :ref:`spoc-routing-keys`.:guilabel:`

.. image:: /_images/spoc/Integrations-Splunk On-Call_Demo_19.png:guilabel:`

LogEntries configuration
==============================

From the main dashboard, select :guilabel:`Tags & Alerts` from the menu.

.. image:: /_images/spoc/log2.png
   :alt: Tags and alerts

Edit an existing tag or create a new one. When naming the tag, append the Splunk On-Call severity level you want for that alert. For example appending the term ``warning`` creates a warning alert in Splunk On-Call, while appending the term ``critical`` creates a critical incident in Splunk On-Call.

.. image:: /_images/spoc/log3.png
   :alt: Sample alert

Add your Splunk On-Call email endpoint to the email addresses notified by the Logentries alert tag.

.. image:: /_images/spoc/log4.png
   :alt: Add email endpoint

Now whenever the search is matched, an alert is sent to the Splunk On-Call timeline with the associated severity level.

.. image:: /_images/spoc/log5.png
   :alt: Timeline with alert

.. |image1| image:: /_images/spoc/Integration-ALL-FINAL.png
