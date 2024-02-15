.. _phase1-team-user-admin:

Onboarding phase: Configure your user and team administration
****************************************************************

.. meta::
    :description: 

NEED WORDS

#. :ref:`phase1-create-trial`
#. :ref:`phase1-user-access`
#. :ref:`phase1-custom-URL`
#. :ref:`phase1-teams-tokens`
#. :ref:`phase1-parent-child`

.. _phase1-create-trial:

Create a trial for your organization 
========================================

If you have a Splunk technical contact, they can create a Splunk Observability Cloud trial for your organization and provide you with the link to log in to your trial organization. Alternatively, you can sign up for a trial. See :ref:`o11y-trial`.

.. _phase1-user-access:

Decide how to manage user access
========================================

There are 3 options for managing user access:

#. Use an external Lightweight Directory Access Protocol (LDAP) and control access through Single Sign On (SSO). See :ref:`sso-label` for more information.
#. Use Splunk Observability Cloud user management to allow access using a username and password. See :ref:`user-managment-intro`.
#. Use Splunk Cloud Platform as the unified identity provider. See :ref:`unified-id-unified-identity` for more information.

.. _phase1-custom-URL:

(Optional) Request a custom URL for your organization
=========================================================

Create a Splunk support request to request a custom URL for your organization, for example, acme.signalfx.com. See :ref:`support` for support contact options.

.. _phase1-teams-tokens:

Plan your teams structure and token management to control access
=====================================================================================

If you plan to roll out Splunk Observability Cloud across your enterprise footprint you likely have multiple internal customers and different access requirements for the various features in Splunk Observability Cloud. To manage these internal customers, you can use the teams feature to organize users together in a team and manage them as a unit.

Plan your team structure
---------------------------

A user with admin role can manage teams, this includes adding and removing regular users and assigning a team admin. 

By default, users can join or leave teams at will. For larger organizations, you might want enhanced team security. See :ref:`enhanced-team-security`. This is especially useful if the teams are assigned a certain amount of usage rights with their associated tokens (See below).

You can also assign team-specific notifications for alerts triggered by the detectors that you set up. Team-specific notifications let your different teams to have different escalation methods for their alerts. See :ref:`admin-team-notifications`.

Manage your tokens
--------------------

Use tokens to secure the data ingest and API calls to Splunk Observability Cloud. Tokens are valid for 1 year and can be extended for another 60 days. Your organization has a default token that is automatically generated when the organization is initially created. 

As an admin, you can deactivate tokens that are no longer needed. Create a plan to regularly deactivate and rotate tokens.

You can also set limits for data ingestion for your tokens. Use limits to control how many metrics are ingested per token. Limits protect against unexpected data-ingestion overage by ensuring teams can't over consume.

See :ref:`admin-tokens` for more information about tokens.

Team and token naming
-------------------------

In advance of team and token creation, determine a naming convention for teams and tokens. This helps you to track token assignments and control data ingest limits. Aligning team and token names also helps you to identify token owners when viewing the usage reports. For example, you can align team and token names:

* Team name: FRONTEND_DEV_TEAM 
* Token name: FRONTEND_DEV_TEAM_INGEST, FRONTEND_DEV_TEAM_API, FRONTEND_DEV_TEAM_RUM

See :ref:`admin-manage-usage`.

.. _phase1-parent-child:

(Optional) Consider a parent-child setup to further separate your teams
=====================================================================================

If you want to create separate environments you can use parent-child organizations. Perhaps you want a development environment and a production environment or you want to make sure Team A is fully separated from Team B. Parent-child orgs are 2 or more separate organizations, where your original organization is the parent organization which includes your original usage entitlement. You can then have 1 or more orgs as child organizations within the parent organization. The organizations are fully separated, including users and data. You can request a parent-child organization setup by creating support case. See :ref:`support` for support contact options.

WHAT DOCS ARE AVAILABLE FOR THIS?

Next step
===============

:ref:`phase1-arch-gdi`.

















