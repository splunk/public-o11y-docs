.. _sso-label:

*********************************************************************
Configure SSO integrations for Splunk Observability Cloud
*********************************************************************

.. meta::
   :description: Configure the capability for your users to log in using various SSO providers. Login service integration supports both Identity Provider-initiated SSO and Observability Cloud-initiated SSO. The latter lets your users log in to Observability Cloud using your organization's custom URL.



Splunk Observability Cloud provides SSO login service integrations that let your users log in using a third-party
identity provider (IdP) that uses SAML SSO. Observability Cloud supports SSO initiated by the IdP.

Observability Cloud also supports SSO initiated by Observability Cloud, and this option lets your users log in to Infrastructure Monitoring using a custom URL you specify.

Observability Cloud supports the following SSO integrations:

-  :ref:`Microsoft Active Directory Federation Services(ADFS)<sso-adfs>`
-  :ref:`Azure Active Directory<sso-azure>`
-  :ref:`Google<sso-google>`
-  :ref:`Google Cloud Identity (IDP)<sso-google-cloud-identity>`
-  :ref:`Okta<sso-okta>`
-  :ref:`OneLogin<sso-one-login>`
-  :ref:`PingOne<sso-ping-one>`
-  :ref:`Generic SAML SSO<sso-generic>`

.. _about-realms:

.. include:: /_includes/realm-note.rst

.. _custom-url:

.. raw:: html

  <embed>
    <h2>Provide a custom URL for accessing Observability Cloud</h2>
  </embed>


A custom URL is required to allow users to log in to Observability Cloud from your organization's login page. If no custom URL is provided, users can still log in through the identity provider to access Observability Cloud.

When you configure a login service integration and select :guilabel:`Show on login page`, the login details for the service appear on your organization's login page. You can have multiple SSO logins.

You can let users log in to Observability Cloud using a custom URL that you've selected, such as `your_org.signalfx.com`. The URL must be a subdomain of signalfx.com. To utilize a custom URL, contact :ref:`support` and provide the following:

- The subdomain you want to use.
- The organization for which you want to use the custom URL.
- An organization administrator's email address.

.. _naming-note-sso:

.. raw:: html

  <embed>
    <h2>Name an SSO integration</h2>
  </embed>


Give your login service integration a name that your users recognize. On your custom login page,
this name appears in the button your users select to sign in. For example, use the name "Log in with Okta"
for an Okta login service integration.

.. _multiple-integrations-sso:

.. raw:: html

  <embed>
    <h2>Integrate an identity provider with multiple organizations</h2>
  </embed>

When you integrate a login service with Observability Cloud, you need to
provide information about the integration to the login service. Infrastructure
Monitoring gives you an entity identifier (entity ID) that you provide when you
configure the login service itself. The service uses the entity
ID and other information to connect with Observability Cloud.

For multiple organizations, the login service needs an entity ID and other information
for each organization. Observability Cloud can provide you with
an integration-specific entity ID for the integration in each organization.

When you configure the login service, you provide the entity ID along with other information
for each organization you want to connect using the login service. The steps for
integrating with each supported login service include the optional steps for
using integration-specific entity IDs.

The Google SSO integration doesn't support integration-specific entity IDs.

.. note:: You only need an integration-specific entity ID if you want to use the same IdP for multiple organizations.

General integration-specific entity ID steps

.. raw:: html

  <embed>
    <h2>Integrate an identity provider with multiple organizations</h2>
  </embed>


To get an integration-specific entity ID for an integration, do the following when you create the integration:

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`.
#. Select :guilabel:`Add Integration`.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for the login service, and select it.
#. Select the :guilabel:`Integration-specific Entity ID` option. Next to this option, the entity ID displays in the form of a URI. Copy this URI and provide it when you configure the login service to communicate with Observability Cloud.

