.. _phase1:

Admin onboarding guide: Onboarding phase
****************************************************************

.. toctree::
   :hidden:
   :maxdepth: 3

   phase1/team-user-admin
   phase1/arch-gdi
   phase1/rollout-plan

Your goal in the onboarding phase is to understand the platform and make sure your onboarding team is ready to support the rest of the organization. During the onboarding phase, your main focus is on technical incubation and training of the staff responsible for the overall management of Splunk Observability Cloud. This is defined into 3 high-level sets of activities:

#. :ref:`Configure your user and team administration<phase1-team-user-admin>`
#. Design your architecture and get data in
#. Plan your rollout

Configure your user and team administration
===============================================

Create a trial for your organization 
-----------------------------------------------------------------------

If you have a Splunk technical contact, they can create a Splunk Observability Cloud trial for your organization and provide you with the link to log in to your trial organization. Alternatively, you can sign up for a trial. See :ref:`o11y-trial`.

Decide how to manage user access
-------------------------------------

There are 3 options for managing user access:

#. Use an external LDAP and control access through Single Sign On (SSO). See :ref:`sso-label` for more information.
#. Use Splunk Observability Cloud user management to allow access through a username and password. See :ref:`user-managment-intro`.
#. Use Splunk Cloud as the unified identity provider. See :ref:`unified-id-unified-identity` for more information.

(Optional) Request a custom URL for your organization
-------------------------------------------------------

Create a Splunk support request to request a custom URL for your organization, for example, acme.signalfx.com. See :ref:`support` for support contact options.

(Optional) Further separate teams and functionality using the parent-child setup
---------------------------------------------------------------------------------

If you want to create separate environments you can use parent-child organizations. Perhaps you want a development environment and a production environment or you want to make sure Team A is fully separated from Team B. Parent-child orgs are 2 or more separate organizations, where your original organization is the parent organization which include your original usage entitlement. You can then have 1 or more orgs as child organizations within the parent organiation. The organiations are fully separated, including users and data. You can request a parent-child organization setup by creating support case. See :ref:`support` for support contact options.

Plan your teams structure and token management to control access
------------------------------------------------------------------------

If you plan to roll out the Splunk Observability Cloud across your enterprise footprint and thus have multiple internal customers, you likely have different access requirements for the various features of the product. To manage these internal customers you can use the teams feature to organize users together in a team and manage them as a unit.

Teams
^^^^^^^^^

A user with admin role can manage teams, this includes adding and removing regular users and assigning a team admin. By default, users can choose to join or leave teams at will. For larger organizations, you might want to enable enhanced team security. This is especially useful if the teams are assigned a certain amount of usage rights with their associated tokens (See below).

You can also assign team-specific notifications for alerts triggered by the detectors that you set up. Team-specific notifications allow your different teams to have different escalation methods for their alerts.

Tokens
^^^^^^^^^^

Tokens are used to secure the data ingest and API calls for sending data to Splunk Observability Cloud. Tokens are valid for 1 year and can be extended for another 60 days. As a platform owner, you can disable tokens and delete tokens that are no longer valid. Your organization has a default token that is automatically generated when the organization is initially created. It is a good practice to regularly disable and rotate tokens.

You can also set limits for data ingestion for your tokens. Use limits to control how many metrics are ingested per token. Limits protect against unexpected data-ingestion overage by ensuring teams can't over consume.

Team and token naming
^^^^^^^^^^^^^^^^^^^^^^^^^

You want to determine a naming convention for teams to ensure uniformity and easy identification when assigning access tokens to control data ingest limits.One of the more common best practices is to align team and token names, for example:

* Team name: FRONTEND_DEV_TEAM 
* Token name: FRONTEND_DEV_TEAM_INGEST, FRONTEND_DEV_TEAM_API, FRONTEND_DEV_TEAM_RUM

Aligning team and token names makes it easier to identify the owners of tokens when viewing the usage reports.

Design your architecture and get data in
==========================================

Get familiar with the OpenTelemetry Collector concepts
------------------------------------------------------------------------------------------------------------

Gather requirements to create an architecture prototype
------------------------------------------------------------------------------------------------------------

Analyze your required network communication
------------------------------------------------------------------------------------------------------------

Analyze how to collect metrics from hosts, containers, cloud providers
------------------------------------------------------------------------------------------------------------

Configure and implement host and Kubernetes metrics
------------------------------------------------------------------------------------------------------------

Collect data from 3rd-party metrics providers
------------------------------------------------------------------------------------------------------------

Get familiar familiar with the Splunk Observability APM concepts
------------------------------------------------------------------------------------------------------------

Add an auto-instrumentation library to a service to send traces to Splunk APM
------------------------------------------------------------------------------------------------------------

(Optional) Consider the zero-config implementation for .Net & Java
------------------------------------------------------------------------------------------------------------

(Optional) Enable AlwaysOn Profiling to continuously collect stack traces
------------------------------------------------------------------------------------------------------------

(Optional) Enable Log Observer Connect for Splunk Cloud and Splunk Enterprise
------------------------------------------------------------------------------------------------------------

Review the default dashboards 
------------------------------------------------------------------------------------------------------------

Review the default detectors (auto-detect)
------------------------------------------------------------------------------------------------------------ 














