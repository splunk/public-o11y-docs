BugSnag integration for Splunk On-Call
**********************************************************

Use this guide to send your BugSnag team notifications to the Splunk On-Call timeline.

Requirements
================

Splunk On-Call required version: Starter, Growth, or Enterprise

In Splunk On-Call
====================

#. From the main timeline select :guilabel:`Integrations` then :guilabel:`BugSnag`.
#. If the integration has not yet been enabled, select :guilabel:`Enable Integration`. Copy the :guilabel:`Service API Key` to your clipboard.
#. Once you have copied the API key to your clipboard, select :guilabel:`Settings` then :guilabel:`Routing Keys` to find your routing key configuration. Decide which routing_key will be used with this integration and make sure it is associated to the correct teams. You might need to create a new key.Routing keys are case sensitive.

In BugSnag
==================

#. From the main web client, go into :guilabel:`Settings`.
#. In settings, select :guilabel:`Team Notifications` then :guilabel:`VictorOps`.
#. Set up the alert to notify based on the options provided, and then paste in your :guilabel:`VictorOps API Key` and the routing key. 
#. Select :guilabel:`Save`.
