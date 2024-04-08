.. _authentication-intro:

********************************************************************************
Authentication and Security
********************************************************************************

.. meta::
   :description: Overview of the Observability Cloud admin tasks and links to the documentation.

.. toctree::
   :hidden:

   scenario-org-security
   Authentication tokens TOGGLE <authentication-tokens/tokens>
   Single Sign On TOGGLE <SSO/sso-about>
   allow-services


As you configure your Splunk Observability Cloud environment, security and authentication are crucial. Use authentication tokens to authenticate Splunk Observability Cloud API requests, track API usage, and control your use of resources. 

Single-sign on (SSO) integrations implement SAML 2.0 for exchanging authentication and authorization information between an identity provider (IdP) such as Ping, Okta, Microsoft Entra ID (formerly Azure Active Directory), or OneLogin and a service provider (SP) such as Splunk Observability Cloud. When you set up a new SSO integration in Splunk Observability Cloud, you authorize Splunk Observability Cloud to trust information from a particular IdP and use it for logging in users in an organization.

Manage network and user access with the following topics:

- :ref:`Configure Authentication tokens <admin-tokens>`
- :ref:`Configure Single Sign On <sso-about>`
- :ref:`Allow Splunk Observability Cloud services in your network <allow-services>`



