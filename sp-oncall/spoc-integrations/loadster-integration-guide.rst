.. _loadster-integration-spoc:

Loadster integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Loadster integration for Splunk On-Call.

Loadster is a cloud-hybrid load testing solution for high-performance websites and applications. Load test your sites to find bottlenecks, improve stability, and optimize user experience.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
========================================

From the main timeline select :guilabel:`Integrations`, :guilabel:`3rd Party Integrations`, :guilabel:`Loadster`.

If the integration isn't active, select :guilabel:`Enable Integration`. Copy the service API key to your clipboard.

After you have copied the API key to your clipboard, select :guilabel:`Settings`, :guilabel:`Routing Keys` to find your routing key configuration. Decide which routing key you want to use with the integration and make sure it is associated to the correct escalation policies.

Loadster configuration
========================================

From the main dashboard, select the profile icon in the upper righthand corner and then select :guilabel:`Integrations`.

Scroll down to Splunk On-Call and then select :guilabel:`Enable Splunk On-Call`.

Next, enter the Service API Key you copied and, optionally, the routing key you want to direct Loadster alerts to.

Testing the Loadster integration
========================================

Now that the integration is active, each time one of your Loadster monitors fails, an incident is created in Splunk On-Call. Incidents usually show up in Splunk On-Call within a minute or two. When the same Loadster monitor recovers, the incident is resolved.

You can test this by creating a Loadster monitor that points to an invalid location, submits invalid data, or is otherwise broken.
