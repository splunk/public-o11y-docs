.. _phase1-team-user-admin:

Onboarding phase: Configure your user and team administration
****************************************************************

#. Create a trial for your organization.
#. Decide how to manage user access.
#. (Optional) Request a custom URL for your organization.
#. (Optional) Further separate teams and functionality using the parent-child setup.
#. Plan your teams structure and token management to control access.

Create a trial for your organization 
========================================

To request a Splunk Observability Cloud Free Trial, follow these steps:

#. Go to https://www.splunk.com/en_us/download/o11y-cloud-free-trial.html.
#. Select your preferred region and then select :guilabel:`Next`. Select the location closest to you, or the region that has been recommended by your Splunk technical contact, if you have one.
#. Enter your contact information and select the term agreement.
    #. The name and emails address you enter are used to create the first user which is granted admin capabilities automatically.
    #. The company name you enter is used to name the organization, so enter a name describes your account, as well as, its function. For example “ACME Dev Platform” 
#. Select :guilabel:`Start Free Trial`.
#. After you submit the form an trial confirmation email is sent. Check your spam folder if it takes longer than 10 minutes.
#. In the confirmation email, select the :guilabel:`Verify` or paste the link provided in your browser. 
#. Enter your password in the popup.
#. Select on :guilabel:`Sign In Now` to access your new Splunk Observability Cloud trial.

Alternatively, if you have a Splunk technical contact they can create a Splunk Observability Cloud trial for your organization. 

Decide how to manage user access
-------------------------------------

There are 3 options for managing user access:

#. Use an external LDAP and control access through Single Sign On (SSO). See :ref:`sso-label` for more information.
#. Use Splunk Observability Cloud user management to allow access through a username and password. See :ref:`user-managment-intro`.
#. Use Splunk Cloud as the unified identity provider. See :ref:`unified-id-unified-identity` for more information.

(Optional) Request a custom URL for your organization
=========================================================

Create a Splunk support request to request a custom URL for your organization, for example, acme.signalfx.com. See :ref:`support` for support contact options.

(Optional) Further separate teams and functionality using the parent-child setup
=====================================================================================

If you want to create separate environments you can use parent-child organizations. Perhaps you want a development environment and a production environment or you want to make sure Team A is fully separated from Team B. Parent-child orgs are 2 or more separate organizations, where your original organization is the parent organization which include your original usage entitlement. You can then have 1 or more orgs as child organizations within the parent organiation. The organiations are fully separated, including users and data. You can request a parent-child organization setup by creating support case. See :ref:`support` for support contact options.

Plan your teams structure and token management to control access
=====================================================================================

If you plan to roll out the Splunk Observability Cloud across your enterprise footprint and thus have multiple internal customers, you likely have different access requirements for the various features of the product. To manage these internal customers you can use the teams feature to organize users together in a team and manage them as a unit.

Teams
---------

A user with admin role can manage teams, this includes adding and removing regular users and assigning a team admin. By default, users can choose to join or leave teams at will. For larger organizations, you might want to enable enhanced team security. This is especially useful if the teams are assigned a certain amount of usage rights with their associated tokens (See below).

You can also assign team-specific notifications for alerts triggered by the detectors that you set up. Team-specific notifications allow your different teams to have different escalation methods for their alerts.

Tokens
----------

Tokens are used to secure the data ingest and API calls for sending data to Splunk Observability Cloud. Tokens are valid for 1 year and can be extended for another 60 days. As a platform owner, you can disable tokens and delete tokens that are no longer valid. Your organization has a default token that is automatically generated when the organization is initially created. It is a good practice to regularly disable and rotate tokens.

You can also set limits for data ingestion for your tokens. Use limits to control how many metrics are ingested per token. Limits protect against unexpected data-ingestion overage by ensuring teams can't over consume.

Team and token naming
-------------------------

You want to determine a naming convention for teams to ensure uniformity and easy identification when assigning access tokens to control data ingest limits.One of the more common best practices is to align team and token names, for example:

* Team name: FRONTEND_DEV_TEAM 
* Token name: FRONTEND_DEV_TEAM_INGEST, FRONTEND_DEV_TEAM_API, FRONTEND_DEV_TEAM_RUM

Aligning team and token names makes it easier to identify the owners of tokens when viewing the usage reports.















