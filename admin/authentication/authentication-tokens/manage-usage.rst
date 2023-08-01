.. _admin-manage-usage:

*****************************************************************************************
Manage data ingest using access tokens 
*****************************************************************************************

.. meta::
   :description: Cost-related token limits, pricing-plan token limits, rate-related token limits, set up custom alerts for access tokens, and monitor token usage.

If you have Infrastructure Monitoring Enterprise Edition, you can manage costs
associated with sending in data by setting limits on access tokens.

Regardless of the edition you're using, access tokens also help you control the
rate at which you use Infrastructure Monitoring resources. This feature allows
you to provide exemplary performance in the user interface.

Cost-related token limits
=============================

You can manage costs by setting cost-related resource limits in an access token. Each
limit is the maximum amount of a resource you want to use. For example, the hosts
limit sets the maximum number of hosts who can use the token in an API request to
send data to Infrastructure Monitoring.

When a host uses the token to send data, Infrastructure Monitoring compares the
token limits to all hosts' cumulative resource usage that use the token. When cumulative
resource usage exceeds the limit, Infrastructure Monitoring issues an alert and
stops ingesting data sent by hosts using the token.

Because the limits for one access token don't affect limits for other access tokens,
you can set different limits for different types of hosts. For example, set high
limits for an access token used in production and low limits for an access token
used in testing.

Cost-related token limits example
-------------------------------------

For example, suppose your pricing plan lets you send up to 5,000 custom metrics
in a time period. If you have hosts that you use for testing, you don’t want data
sent from them to count towards your limit. In this case, you can create a testing
token with a limit of 100 custom metrics and use it to send data from your test hosts.
When you use a separate token for production, your production hosts always have at
least 4,900 custom metrics available.

Threshold option example
----------------------------------

You can also set a threshold option for each access token limit. When the host exceeds
70% of the limit, Infrastructure Monitoring issues an alert and sends a notification,
but doesn't stop further resource use.

Token limits per pricing plan
================================
The limits you can set for a token depend on your pricing plan. Each limit represents
the maximum number of resources that can use a specific access token. The following
table describes the limits for each pricing plan:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - :strong:`Pricing plan`
     - :strong:`Available limits`

   * - DPM
     - Maximum data points per minute from all hosts

   * - Host-based pricing
     - One or more of the following limits:

       * Hosts
       * Docker containers
       * Custom metrics
       * High-resolution metrics

   * - Usage-based pricing
     - One or more of the following limits:

       * Custom metrics
       * High-resolution metrics

Notifications for cost-related limits
-------------------------------------------

Infrastructure Monitoring can optionally send you notifications when resource usage
for a token exceeds 90% of the limit for more than 5 minutes. If you use this option,
you also get a notification when the usage is within 70% of exceeding the limit.
You can receive notifications in one or more of the following ways, according to
choices you configure:

* As a message in the user interface
* As an email message
* As a notification sent by using a third-party notification service such as Slack or Splunk On-Call

Cost-related limit notifications always have Critical severity.

Impact of exceeding a cost-related limit example
----------------------------------------------------
When API requests using an access token meet or exceed a particular token limit, Infrastructure Monitoring rejects new metrics associated with the limit.

For example, suppose you're on the host-based pricing plan. You set the custom metrics
limit for your access token to 10. You use the token to send data from ``host1``,
including seven custom metrics. Infrastructure Monitoring ingests the data because sending
custom metrics using the token hasn't exceeded the token limit.

At some point, you use the token to send data from ``host2``, including five
different custom metrics. Infrastructure Monitoring rejects the request because
it exceeds the custom metrics limit in the token. Infrastructure Monitoring
continues to ingest data from ``host1``.

Rate-related token limits
============================
You can manage your rate of resource use by setting rate-related limits in an access token.
Each limit is the rate at which you can make an API request for a resource using
the access token. When you exceed the rate, the API request fails with HTTP
response code: ``429 Too Many Requests`` .

You can't set up alerts or notifications for rate-related token limits.

You can set two Infrastructure Monitoring rate-related limits:

#. SignalFlow job start limit: The rate at which you start SignalFlow analytics
   jobs.

   * The token limit applies to the
     :new-page:`POST /v2/signalflow/execute <https://dev.splunk.com/observability/reference/api/signalflow/latest#endpoint-start-signalflow-computation>`. SignalFlow analytics job start request.

   * Use a value between 1 and 60. If you don't select a limit, Infrastructure Monitoring
     removes the existing limit. A value of 0 also removes the existing limit.

   * Impact: Setting a limit improves the performance of charts in the Infrastructure Monitoring user interface.

   * To learn more about SignalFlow analytics jobs, see the :new-page:`Analyze Data Using SignalFlow <https://dev.splunk.com/observability/docs/signalflow>`
     topic in the Splunk Observability Cloud Developer Guide.

#. Event search limit: The rate at which you search for events.

   * The token limit applies to the :new-page:`GET /v1/event <https://dev.splunk.com/observability/reference/api/retrieve_events_v1/latest>`
     event search request.

   * Use a value between 1 and 30. If you don't select a limit, Infrastructure Monitoring
     removes the existing limit. A value of 0 also removes the existing limit.

   * Impact: Setting a limit helps you get good performance in the Infrastructure Monitoring user interface.

Using a rate-related token limit
-----------------------------------

Use a rate-related token limit to prevent a runaway program from consuming all of your organization's job start or event search resources. By limiting the amount of resource usage, the token limit ensures that requests coming from users aren't affected by program problems.

For example, suppose you set the job start limit for a token to 20 per minute. By doing so, you ensure that your organization has many resources available for running analytics jobs that start when users open a chart.

Set up access token limits and alerts
=========================================

To set token limits:

#. Select :menuselection:`Manage Token Limit` from the token's actions menu (|more|). The Manage Token Limits options appear. Depending on your pricing model, you see up to four cost-related token limits you can set. You can also set the :guilabel:`Job Start Rate` and :guilabel:`Event Search Rate` rate-related limits.

#. Enter a value for the limit or limits you want to set.

   * For cost-related limits, to remove an existing limit, select :guilabel:`Remove Limit`.
   * For rate-related limits, to remove an existing limit, delete everything from the text box.

#. To send a notification to recipients when a cost-related usage exceeds one of the limits, select :guilabel:`Add Recipient` and select the recipient or notification method you want to use.

#. Select :guilabel:`Update`. This creates a detector based on the access token limits you set. When a limit condition is met, the detector displays an alert on the Alerts page and sends a notification to any designated recipients.

#. If you chose a team as a notification recipient and you want to have alerts display on the team's Dashboards page, you must link the detector you created in the previous step to the team. To do this:

    #. Access the left navigation panel and select :menuselection:`Alerts & Detectors`.
    #. Select the :guilabel:`Detectors` tab.
    #. Search for the detector you created. By default, the detector's name includes the name of the access token it was created for. So, an easy way to find the detector is to search for the name of the access token.
    #. Open the detector's action menu (|more|) and select :guilabel:`Links to Teams`. Select a team.
    #. Select :guilabel:`Done`.
    #. When the detector issues a notification about the access token, an alert displays on the team's Dashboards page.

    For more information about linking detectors to teams, see :ref:`create-link-detector-teams`.

    For more information about Dashboards pages for teams, also known as team landing pages, see :ref:`admin-configure-page`.


Set up custom alerts for use with access tokens
==================================================

You can create a regular detector to set up an alert for a token when its usage has reached a different level than 90%. You can also use a detector to monitor resource usage by a token if the resource isn't part of the limits provided by Infrastructure Monitoring.

You can't set up alerts or notifications for rate-related token limits.

To track token usage, use one of the following metrics:

-  sf.org.numResourcesMonitoredByToken (for hosts and containers)
-  sf.org.numCustomMetricsByToken
-  sf.org.numHighResolutionMetricsByToken

In your detector, filter these metrics using the property ``tokenName`` to identify the token you want to monitor.

Manage resource usage for a team
====================================
To manage resource usage by team:

#. Create a token you want team members to use.
#. Set limits for the token.
#. Tell team members to use the specified token when sending data to Infrastructure Monitoring.

Monitor access token usage
==============================
To see usage status for an access token:

#. Navigate to your profile page.
#. In the area that lists your organization, select :guilabel:`Access Tokens`.
#. Select the token name. The details for the token appear. The display is specific to your pricing model and the limits you've set.

Tokens can be Above Limit, Close to Limit, or Below Limit. Token status is Close to Limit if the usage of any of its limits is greater than or equal to 90%.

The usage status is the status of the usage that's closest to its limit.
For example, suppose you have set limits for both Hosts and Custom Metrics for a
token. The tokens page displays the usage for the token as Above Limit if the
Hosts usage is over its limit, even if the Custom Metrics value is below its limit.

To view usage values for a token, hover over its usage status. To display more detailed information for the token, select the token name.

If API requests are using the token to send data to Infrastructure Monitoring, a chart shows how much ingest levels in the past seven days for each usage limit. The chart displays data at a one-hour resolution.

Infrastructure Monitoring monitors the token whether you set limits for the token or not.
