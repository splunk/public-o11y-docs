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

#. Use an external LDAP and control access through Single Sign On (SSO).
#. Use Splunk Observability Cloud user management to allow access through a username and password.
#. Use Splunk Cloud as the unified identity provider. 


Request a custom URL for your organization
-----------------------------------------------

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