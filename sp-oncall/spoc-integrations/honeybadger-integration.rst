.. _honeybadger-spoc:

HoneyBadger integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the HoneyBadger integration for Splunk On-Call.

Honeybadger provides exception, uptime and performance monitoring to keep your web apps error-free. The following will guide you through the steps needed to integrate Honeybadger with Splunk On-Call. Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
===================================

From the web portal, select :guilabel:`Settings`, :guilabel:`Integrations`, :guilabel:`HoneyBadger`.

.. image:: /_images/spoc/Integration-ALL-FINAL.png
   :alt: Integrations menu

Copy the API key to your clipboard.

.. image:: /_images/spoc/Honeybadger-final.png
   :alt: REST API key


Honeybadger configuration
===================================

From the web portal select :guilabel:`Settings` and then :guilabel:`Alerts & Integrations`.:guilabel:`

.. image:: /_images/spoc/honey4.png
   :alt: Alerts and integrations

Select the :guilabel:`Splunk On-Call` integration option.

Paste in your Splunk On-Call API key and add in the appropriate routing key. See :ref:`spoc-routing-keys`.

.. image:: /_images/spoc/honey6.png
   :alt: Routing key

Fill out the rest of the form, test the integration to make sure the connection is successful. Select :guilabel:`Save`.

.. image:: /_images/spoc/honey7.png
   :alt: Save integration
