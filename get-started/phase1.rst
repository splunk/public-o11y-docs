.. _phase1:

Get started with Splunk Observability Cloud: Onboarding phase
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

#. Request a trial org to begin setting up your organization's instance.
#. Decide how to manage user access.
#. Request a custom URL for your organization.
#. Further separate teams and functionality using the parent-child setup.
#. Plan your teams structure and token management to control access.

Run the initial setup of your organization's instance
------------------------------------------------------------------------

In preparation for the roll out of Splunk Observability Cloud in your organization, you need to have access to your own organization in one of Splunk Observability Cloud realms in the US, Europe or Asia Pacific.

Usually the Org is already created as part of the evaluation process that has taken place as part of the initial process when acquiring the Splunk Observability Cloud. You can verify access to your Org via the link that has been provided to you https:///app.{REALM].signalfx.com where [REALM] is specific to the region/realm that has been set up for you. (This can be  us0, us1, us2, eu0, aus or jp0). If you do not have this information, please reach out to you technical contact with the request to verify if there is an active trial for your account.

If there is no active organization available for your account, you can request a Splunk Observability Cloud Free Trial.
You will need to provide the following information:
Your preferred region : 

Please pick the location closest to you,
or the one that has been recommended by your 
Splunk Technical contact and click Next.


In the follow up screen provide the following information:
First Name & Last Name, Business Email address,
Phone number, the company name and select 
the country.

As a last step, select the term agreement and select Start Free Trial.


Please Note:

The name and emails address provided
will be used to create the first user on the system 
and will be granted admin privilege automatically.
The company name will be used to name 
the organization, so please select one which describes
your account as well as its function,
for example “ACME Dev Platform ”Upon submission of the form, an email will be sent out shortly.
(Please check the spam folder if it takes longer than 10 minutes)

Click on the Verify Button, or past the link provided in your browser, and a dialog box will appear, please enter your password.

Click on Sign In Now to access your New Splunk Observability Cloud Trial.

Decide how to manage user access
-------------------------------------

There are 3 options for managing user access:

#. Use an external LDAP and control access through Single Sign On (SSO). See :ref:`sso-label` for more information.
#. Use Splunk Observability Cloud user management to allow access through a username and password. See :ref:`user-managment-intro`.
#. Use Splunk Cloud as the unified identity provider. See :ref:`unified-id-unified-identity` for more information.

Request a custom URL for your organization
-----------------------------------------------

You can request a custom Customer URL for your Organizations by creating a Splunk support ticket.
Note: You can only request a single-level URL (i.e. level_one.signalfx,com)  ✅
Splunk Observability Cloud does not support multi-level URL (i.e. level_one.level_two.signalfx.com )  ❌
And all custom URLs will end in .signalfx.com.


In the unlikely event your preferred URL is already in use or reserved, Splunk support team will contact you and discuss alternatives.

If this request is for a new child org… you can combine the request into the same Splunk support ticket.

“Hello Splunk Support,
Note that we grant Splunk support access to [Company] organizations in order to handle the current case.


Please add the following custom URL to the following organization:


Splunk Observability Orgname  OrgID            Realm  Requested Custom Url
Your Company org 1                      EXXXXXAA   US1     your_company_US.signalfx.com
Your Company org 2                      AAXXXXXE   JP1     your_company_JP.signalfx.com

Further separate teams and functionality using the parent-child setup
------------------------------------------------------------------------------

A common request that comes up during the onboarding period are questions such as,
“Is it possible to separate my organization’s development & test environment from my production environment?” or ”How can we make sure Team A is fully separated from Team B?”.

As an answer to these questions, Splunk Observability Cloud offers you the ability to completely separate environments from each other, using a functionality called Parent/Child Orgs.

Parent/Child orgs are two or more fully separate orgs, where your original org will become the parent org, and one or more orgs will be its child orgs. They are fully separated, including user information and data.
The parent org (or your original org) will be the org that holds the original usage entitlement you received when you first signed up for Splunk Observability Cloud.

You can request this via a Support case ticket, specifying admin contacts for each separate child orgs and license allocations by product.

Plan your teams structure and token management to control access
------------------------------------------------------------------------

Most customers of Splunk Observability Cloud plan to roll the solution out across their enterprise footprint and will have multiple internal customers. Often it involves different requirements when using the various features of the product.

To manage these internal customers you can use the teams feature, this allows you to organize users together in a team and manage them as a functional unit.

A user with Admin privilege can manage teams, this includes adding and/or removing regular users and assigning a Team Admin.

By default, users can choose to join or leave teams at will. For larger organizations we recommend that you enable  enhanced team security. This is especially useful if the teams are assigned a certain amount of usage rights with their associated tokens (See below).

You can find an overview of the various team roles and permissions here .

teams can also assign team specific notification methods for alerts raised by detectors that are set up in Splunk Observability Cloud as different teams may have different escalation methods for their alerts.

Determining naming convention for teams is essential to ensure uniformity and easily identified when assigning access tokens to be able to control data ingest limits.
One of the more common best practices is to synch Team And Token names such as:
Team name: FRONTEND_DEV_TEAM 
Token name: FRONTEND_DEV_TEAM_INGEST, FRONTEND_DEV_TEAM_API, FRONTEND_DEV_TEAM_RUM

This will make it easier to identify the owners of tokens when viewing the usage reports.

Tokens are used to secure the data Ingest & API calls when sending data to Splunk Observability Cloud.
Tokens are valid for one year, and can be extended for another 60 days.
As a platform owner, you can disable (via the Splunk Observability Cloud user interface) and/or delete tokens (via the API) those tokens that are no longer valid.


The default Token is automatically generated when the Org is initially created. It is a good practice to disable and/or rotate the token regularly.

It is a common practice to set a naming convention for your tokens, it is recommended to align the token name with the Team name. This will make it easier to identify the users/owners of the token in the usage reports.




Another feature of the Token management is to set limits for data ingestion, allowing you to limit how many metrics is ingested per token, this will ensure teams cannot over consume and to protect against unexpected overage of data ingestion.

This can be done by selecting a token that you want to set the limit and select: Manage Token Limit, which will open a dialog that allows you to set the limits on metrics usage. 
Data ingested above these limits will be ignored until it drops below the limit.



