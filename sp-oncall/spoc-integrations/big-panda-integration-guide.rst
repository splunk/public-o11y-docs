.. _bigpanda-spoc:

Big Panda integration for Splunk On-Call
******************************************

.. meta::
    :description: Configure the Big Panda integration for Splunk On-Call.

The Splunk On-Call and Big Panda integration allows you to surface incidents from your Big Panda account
in Splunk On-Call.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Ability to create Big Panda Notification Webhooks is required.

Splunk On-Call configuration
====================================

Navigate to the integrations tab in On-Call and select the Big Panda Integration. Select :guilabel:`Enable Integration` to generate a new REST endpoint for your org.

Big Panda configuration
====================================

Follow this guide to create a notification webhook for the alert you want to send to On-Call: :new-page:`https://docs.bigpanda.io/reference/webhook <https://docs.bigpanda.io/reference/webhook>`.

When you get to the point where you need to put in an endpoint that Big Panda will use to send the payload to, enter the endpoint from the On-Call Big Panda integration page with your desired ``routing_key`` filled in.

After you saved, Splunk On-Call starts receiving incidents from the webhook notification that configured in Big Panda.
