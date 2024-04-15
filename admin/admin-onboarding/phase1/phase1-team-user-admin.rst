.. _phase1-team-user-admin:

Onboarding part 1: Configure your user and team administration
**********************************************************************

.. meta::
    :description: 

In the first part of the onboarding phase, you make foundational decisions about your organization in Splunk Observability Cloud, including user access management, team structure, and token management. To configure your users and teams, complete the following tasks:

#. :ref:`phase1-create-trial`
#. :ref:`phase1-user-access`
#. :ref:`phase1-custom-URL`
#. :ref:`phase1-teams-tokens`
#. :ref:`phase1-parent-child`

To start at the beginning of the admin onboarding journey, see :ref:`admin-onboarding-guide`. 

.. _phase1-create-trial:

Create a trial for your organization 
========================================

If you have a Splunk technical contact, they can create a Splunk Observability Cloud trial for your organization and provide you with the link to log in to your trial organization. Alternatively, you can sign up for a trial. See :ref:`o11y-trial`.

.. _phase1-user-access:

Decide how to manage user access
========================================

Choose from these 3 options for managing user access:

#. Use an external Lightweight Directory Access Protocol (LDAP) and control access through Single Sign-On (SSO). See :ref:`sso-label` for more information.
#. Use Splunk Observability Cloud user management to allow access using a username and password. See :ref:`user-managment-intro`.
#. Use Splunk Cloud Platform as the unified identity provider. See :ref:`unified-id-unified-identity` for more information.

.. _phase1-custom-URL:

(Optional) Request a custom URL for your organization
=========================================================

Create a Splunk support request to request a custom URL for your organization, for example, acme.signalfx.com. See :ref:`support` for support contact options.

.. _phase1-teams-tokens:

Plan your teams structure and token management to control access
=====================================================================================

If you plan to roll out Splunk Observability Cloud across your organization you likely have multiple internal customers with different access requirements for the various features in Splunk Observability Cloud. To manage these internal customers, you can use the teams feature to organize users together in a team and manage them as a unit.

Define team and token naming conventions
------------------------------------------

Before creating teams and tokens, determine your naming convention. This helps you to track token assignments and control data ingest limits. Aligning team and token names also helps you to identify token owners when viewing the usage reports. For example, you can align team and token names in the following way:

* Team name: FRONTEND_DEV_TEAM 
* Token names: FRONTEND_DEV_TEAM_INGEST, FRONTEND_DEV_TEAM_API, FRONTEND_DEV_TEAM_RUM

See :ref:`admin-manage-usage`.

Plan your team structure
---------------------------

A user with an admin role can manage teams, which includes adding and removing regular users and assigning a team admin. 

By default, users can join or leave teams at will. For larger organizations, you might want enhanced team security. Enhanced team security is useful if the teams are assigned a certain amount of usage rights with their associated tokens. See :ref:`enhanced-team-security`. 

You can also assign team-specific notifications for alerts triggered by the detectors that you set up. Team-specific notifications give your teams different escalation methods for their alerts. See :ref:`admin-team-notifications`.

Manage your tokens
--------------------

Use tokens to secure data ingest and API calls to Splunk Observability Cloud. Tokens are valid for 1 year and can be extended for another 60 days. Your organization has a default token that is automatically generated when the organization is created. 

With the admin role, you can deactivate tokens that are no longer needed. Create a plan to regularly deactivate and rotate tokens.

You can also set limits for data ingestion for your tokens. Use limits to control how many metrics are ingested per token. Limits protect against unexpected data ingestion overage by ensuring teams can't over consume.

See :ref:`admin-tokens` for more information about tokens.

.. _phase1-parent-child:

(Optional) Separate your teams with a parent-child setup
=====================================================================================

If you want to create separate environments, you can use parent-child organizations. Perhaps you want a development environment and a production environment, or you want to make sure Team A is fully separated from Team B. Parent-child organizations are 2 or more separate organizations, where your original organization is the parent organization which includes your original usage entitlement. You can then have 1 or more organizations as child organizations within the parent organization. The organizations are fully separated, including users and data. 

You can request a parent-child organization setup by creating a support case. See :ref:`support` for support contact options.

Next step
===============

Next, design your architecture and being bringing data in to Splunk Observability Cloud. See :ref:`phase1-arch-gdi`.

















