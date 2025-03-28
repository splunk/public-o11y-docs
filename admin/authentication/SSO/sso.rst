.. _sso-label:

*********************************************************************
Configure SSO integrations for Splunk Observability Cloud
*********************************************************************

.. meta::
   :description: Configure the capability for your users to log in using various SSO providers. Login service integration supports both Identity Provider-initiated SSO and Splunk Observability Cloud-initiated SSO. The latter lets your users log in to Splunk Observability Cloud using your organization's custom URL.



Splunk Observability Cloud provides SSO login service integrations that let your users log in using a third-party
identity provider (IdP) that uses SAML SSO. Splunk Observability Cloud supports SSO initiated by the IdP.

Splunk Observability Cloud also supports SSO initiated by Splunk Observability Cloud, and this option lets your users log in to Infrastructure Monitoring using a custom URL you specify.

Splunk Observability Cloud supports the following SSO integrations:

-  :ref:`Splunk Cloud Platform<unified-id-unified-identity>`
-  :ref:`Microsoft Active Directory Federation Services (ADFS)<sso-adfs>`
-  :ref:`Microsoft Entra ID (formerly Azure Active Directory) <sso-azure>`
-  :ref:`Google<sso-google>`
-  :ref:`Google Cloud Identity (IDP)<sso-google-cloud-identity>`
-  :ref:`Okta<sso-okta>`
-  :ref:`OneLogin<sso-one-login>`
-  :ref:`PingOne<sso-ping-one>`
-  :ref:`Generic SAML SSO<sso-generic>`

.. _about-realms:



.. raw:: html

   <div class="include-start" id="realm-note.rst"></div>

.. include:: /_includes/realm-note.rst

.. raw:: html

   <div class="include-stop" id="realm-note.rst"></div>




.. _custom-url:

.. raw:: html

  <embed>
    <h2>Provide a custom URL for accessing Splunk Observability Cloud</h2>
  </embed>


A custom URL is required to allow users to log in to Splunk Observability Cloud from your organization's login page. If no custom URL is provided, users can still log in through the identity provider to access Splunk Observability Cloud.

When you configure a login service integration and select :guilabel:`Show on login page`, the login details for the service appear on your organization's login page. You can have multiple SSO logins.

You can let users log in to Splunk Observability Cloud using a custom URL that you've selected, such as `your_org.signalfx.com`. The URL must be a subdomain of signalfx.com. To utilize a custom URL, contact :ref:`support` and provide the following:

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

.. _default-sso-role:

.. raw:: html

  <embed>
    <h2>Set up default SSO role</h2>
  </embed>


When you set up SSO, the default role for a user signing in to Splunk Observability Cloud through SSO is the :guilabel:`power` role. You can change the default SSO role to any of the available roles in Splunk Observability Cloud. These are :guilabel:`admin`, :guilabel:`power`, :guilabel:`usage`, and :guilabel:`read_only`. To learn more about roles, see :ref:`roles-and-capabilities`. 

.. note:: Changing the default SSO role affects only new SSO users. If a user already has an existing role defined by the previous default SSO role, you must change it manually. To change a user's role, see :ref:`assign-role-existing`.

To change the default SSO role, do the following:

1. Go to :guilabel:`Settings` then select :guilabel:`General Settings`.

2. In the :guilabel:`User Management` section, set a default role for SSO login by selecting a role from the drop-down list. The drop-down list defaults to the :guilabel:`power` role. The role you select becomes the role of any new user logging in through an SSO service. You can return to :guilabel:`General Settings` and update the default role for SSO login at any time.


.. _multiple-integrations-sso:

.. raw:: html

  <embed>
    <h2>Integrate an identity provider with multiple organizations</h2>
  </embed>

When you integrate a login service with Splunk Observability Cloud, you need to
provide information about the integration to the login service. Infrastructure
Monitoring gives you an entity identifier (entity ID) that you provide when you
configure the login service itself. The service uses the entity
ID and other information to connect with Splunk Observability Cloud.

For multiple organizations, the login service needs an entity ID and other information
for each organization. Splunk Observability Cloud can provide you with
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
#. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for the login service, and select it.
#. Select the :guilabel:`Integration-specific Entity ID` option. Next to this option, the entity ID displays in the form of a URI. Copy this URI and provide it when you configure the login service to communicate with Splunk Observability Cloud.

