.. _sp-sso-users:

************************************************************************
Sign in to Splunk On-Call with SSO
************************************************************************

.. meta::
   :description: Signing into Splunk On-Call with SSO, in the Web UI or on mobile. 




Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Full-Stack

To enable single sign-on (SSO) for your organization, you will need to provide an updated metadata file and your IDP. If you are
interested in setting up SSO, please contact :ref:`Splunk On-Call Support <spoc-support>`.



Instructions for Users
===============================

Organization Slug: The phrase "Organization Slug" refers to the slugified version of your organization's name in Splunk On-Call. This process changes your organization name to a lowercase URL-friendly version with no spaces or punctuation, though it may contain dashes. Your Organization Slug can be found at the end of the URL when you are
logged into the Splunk On-Call portal via a web browser.

Contact your Splunk On-Call administrator or reach out to Splunk On-Call Support if you are having trouble finding your Organization Slug.

A user's login experience on the Splunk On-Call platform will be slightly different after enabling Single Sign-On for your organization. If your organization has not explicitly disabled traditional authentication, users will be able to login as normal with their Splunk On-Call credentials or login via SSO. If traditional authentication has been disabled, users will encounter an error message directing them to login via SSO if they attempt to login with their Splunk On-Call credentials.

Web Client UI
=================

The SSO login form can be found at this URL: https://portal.victorops.com/auth/sso

Alternatively, you can create a link or bookmark to skip the typing and bypass the form by appending your company ID to the SSO URL, like this: https://portal.victorops.com/auth/sso/<org-slug-here>

Either of these routes will direct the user's browser to your identity provider, where they will be required to authenticate and are then sent back to the Splunk On-Call timeline.

Mobile Applications
=========================

The Splunk On-Call client for your mobile device will also present a link on the login screen, offering the option to use your SSO credentials.

iOS or Android SSO Login
-----------------------

On the login screen, select :guilabel:`Sign in with Enterprise SSO`. This link will take you to a form prompting for your Organization Slug. After you enter your company's Organization Slug, you are redirected to your
IDP login page in a mobile browser. Once you log in through the IDP you are automatically logged into Splunk On-Call.

.. _sso-linking::

First-Time SSO Login
========================

If your organization is using SSO you will need to do a one-time linking process between your SSO provider and your Splunk On-Call account. This will create a link between your external user ID and your Splunk On-Call user ID. If you have not received an email invitation with the subject “Your invitation to Splunk On-Call”, contact your Splunk On-Call administrator and ask them to send you an invitation.

#.  When you receive an email to activate your Splunk On-Call account, create your username and password and complete the account set up process. You will be directed into the Splunk On-Call platform. 
#. You need to log out and select :guilabel:`Sign in via SSO”` on the login page to perform the one-time link. Verify that you have logged out of Splunk On-Call in every browser you are using and your IDP.
#. You are prompted to :guilabel:`Enter your Org Slug`.


.. image:: /_images/spoc/sso.png
    :width: 100%
    :alt: Enter your org slug to connect your user ID.

#. You are redirected to your IDP page where you log in using your SSO credentials.


.. image:: /_images/spoc/sso-org2.png
    :width: 100%
    :alt: Log in with your SSO credentials.

#. Enter your Splunk On-Call username and password. You will only need to enter your Splunk On-Call username and password once, and then we will not ask for it again.

You are redirected to the Splunk On-Call platform and have finished the one-time SSO linking process.


How to break your SSO linkage
==========================================

If you are receiving an error when trying to log into Splunk On-Call through SSO you may need to break the linkage between your Splunk On-Call username and password and your SSO provider.

To break the linkage, ensure you are signed in to your IDP and then paste the following link into the address bar of your browser: https://portal.victorops.com/do-defederation . If the link between your Splunk On-Call credentials and your SSO provider is successfully broken, you will see the error, shown below.

.. note:: You may have to paste the defederation link into your browser multiple times before the below error message will appear.


.. image:: /_images/spoc/sso-org3.png
    :width: 100%
    :alt: VictorOps broken SSO linkage screen

To re-associate your Splunk On-Call username and password with your SSO provider, repeat the linking steps in :ref:`sso-linking`.

If you have any questions or experience any issues, contact Splunk On-Call Support.

