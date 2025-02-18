.. _sp-sso-users:

************************************************************************
Sign in to Splunk On-Call with SSO
************************************************************************

.. meta::
   :description: Signing into Splunk On-Call with SSO, in the Web UI or on mobile. 

Splunk On-Call user can use this topic for steps to log in to Splunk On-Call with SSO. To enable single sign-on (SSO) for your organization see :ref:`single-sign-sso`.

Obtain your organization slug
===============================

Your organization has a URL-friendly "organization slug" in Splunk On-Call. Find your organization slug at the end of the URL when you are logged into the Splunk On-Call portal in a web browser. Contact your Splunk On-Call administrator or reach out to Splunk On-Call Support if you are having trouble finding your organization slug.

.. _sso-linking:

First-time SSO log in
========================

If your organization is using SSO you need to complete a one-time linking process between your SSO provider and your Splunk On-Call account. This  process creates a link between your external user ID and your Splunk On-Call user ID. If you haven't received an email invitation with the subject “Your invitation to Splunk On-Call”, contact your Splunk On-Call administrator and ask them to send you an invitation.

#.  When you receive an email to activate your Splunk On-Call account, create your username and password and complete the account set up process. You will be directed into the Splunk On-Call platform. 
#. You need to log out and select :guilabel:`Sign in via SSO”` on the log in page to complete the one-time link process. Verify that you have logged out of Splunk On-Call in every browser you are using and your IDP.
#. You are prompted to :guilabel:`Enter your Org Slug`.

    .. image:: /_images/spoc/sso.png
        :width: 80%
        :alt: Enter your org slug to connect your user ID.

#. You are redirected to your IDP page where you log in using your SSO credentials.

    .. image:: /_images/spoc/sso-org2.png
        :width: 80%
        :alt: Log in with your SSO credentials.

#. Enter your Splunk On-Call username and password. You will only need to enter your Splunk On-Call username and password once.

You are redirected to the Splunk On-Call platform and have finished the one-time SSO linking process.

How to break your SSO linkage
-------------------------------

If you are receiving an error when trying to log in to Splunk On-Call through SSO you may need to break the linkage between your Splunk On-Call username and password and your SSO provider.

To break the linkage, ensure you are signed in to your IDP and then paste the following link into the address bar of your browser: :samp:`https://portal.victorops.com/do-defederation`. If the link between your Splunk On-Call credentials and your SSO provider is successfully broken, you will see the following message.

    .. image:: /_images/spoc/sso-org3.png
        :width: 80%
        :alt: VictorOps broken SSO linkage screen

.. note:: You might have to paste the defederation link into your browser multiple times before the message appears.


To re-associate your Splunk On-Call username and password with your SSO provider, repeat the linking steps in :ref:`sso-linking`.

Your login experience
=========================

Your log in experience on the Splunk On-Call platform is different after enabling Single Sign-On for your organization. If your organization has not explicitly disabled traditional authentication, you will be able to log in as normal with your Splunk On-Call credentials or log in through SSO. If traditional authentication has been disabled, you will see an error message to login through SSO if you attempt to login with your Splunk On-Call credentials.

Web Client UI
----------------

The SSO log in form can be found at this URL: https://portal.victorops.com/auth/sso

Alternatively, you can create a link or bookmark to bypass the SSO form. To do so, append your organization slug to the SSO URL, like this: ``https://portal.victorops.com/auth/sso/<org-slug-here>``

Either of these routes will direct your browser to your identity provider, where you are required to authenticate and are then sent back to the Splunk On-Call timeline.

Mobile Applications
----------------------

The Splunk On-Call client for your mobile device also presents a link on the log in screen offering the option to use your SSO credentials.

iOS or Android SSO log in
-------------------------

On the log in screen, select :guilabel:`Sign in with Enterprise SSO`. This link takes you to a form prompting you for your organization slug. After you enter your company's organization slug, you are redirected to your IDP log-in page in a mobile browser. Once you log in through the IDP you are automatically logged into Splunk On-Call.

