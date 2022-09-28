.. _sso-label:

*********************************************************************
Configure SSO integrations for Splunk Observability Cloud
*********************************************************************

.. meta::
   :description: Splunk Observability Cloud provides the capability for your users to log in using various SSO providers. Login service integration supports both Identity Provider-initiated SSO and Observability Cloud-initiated SSO. The latter lets your users log in to Observability Cloud using your organization's custom URL.

.. toctree::
   :hidden:

   Microsoft Active Directory Federation Services (ADFS)<sso/sso-ADSF>`
   Azure Active Directory<sso/sso-AzureAD>
   Google<sso/sso-Google>
   Google Cloud Identity (IDP)<sso/sso-GoogleCloudIDP>
   Okta<sso/sso-Okta>
   OneLogin<sso/sso-OneLogin>
   PingOne<sso/sso-PingOne>
   Generic SAML SSO<sso/sso-GeneralSAML>

Splunk Observability Cloud provides SSO login service integrations that let your users log in using a third-party
identity provider (IdP) that uses SAML SSO. Observability Cloud supports SSO initiated by the IdP.

Observability Cloud also supports SSO initiated by Observability Cloud, and this option lets your users log in to Infrastructure Monitoring using a :ref:`custom URL<custom-url>` you specify.

Observability Cloud supports the following SSO integrations:

-  :ref:`Microsoft Active Directory Federation Services (ADFS)<sso-adfs>`
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

Provide a custom URL for accessing Observability Cloud
======================================================================

A custom URL is required to allow users to log in to Observability Cloud from your organization's login page. If no custom URL is provided, users can still log in through the identity provider to access Observability Cloud.

When you configure a login service integration and select :guilabel:`Show on login page`, the login details for the service appear on your organization's login page. You can have multiple SSO logins.

You can allow users to log in to Observability Cloud using a custom URL that you've selected, such as `your_org.example.com`. To set this up, contact :ref:`support` and provide the following:

- The URL you want to use.
- The organization for which you want to use the custom url.
- An organization administrator's email address.


.. _naming-note-sso:

Name an SSO integration
=================================

Give your login service integration a name that your users recognize. On your custom login page,
this name appears in the button your users select to sign in. For example, use the name "Log in with Okta"
for an Okta login service integration.

.. _multiple-integrations-sso:

Integrate an identity provider with multiple organizations
============================================================================

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
-------------------------------------------------

To get an integration-specific entity ID for an integration, do the following when you create the integration:

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`.
#. Select :guilabel:`Add Integration`.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for the login service, and select it.
#. Select the :guilabel:`Integration-specific Entity ID` option. Next to this option, the entity ID displays in the form of a URI. Copy this URI and provide it when you configure the login service to communicate with Observability Cloud.


.. _configure-sso-using-adfs:
.. _sso-adfs:

Configure an ADFS SSO integration
================================================================

The Microsoft Active Directory Federation Services (ADFS) SSO integration lets your users log in to Observability Cloud using your Microsoft ADFS portal.

Before you proceed, review the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

This integration is only available for Microsoft Active Directory with ADFS. In addition, you need to have the following fields in your ADFS configuration:

- First Name
- Last Name
- Email

The procedure for configuring ADFS with Observability Cloud has these sections:

* :ref:`notify-splunk-support`
* :ref:`create-adfs-imm-integration`
* :ref:`add-adfs-relying-party`
* :ref:`obtain-adfs-cert`
* :ref:`obtain-adfs-metadata`
* :ref:`upload-adfs-cert-metadata-im`

.. _notify-splunk-support:

Send your domain information to Splunk Support
--------------------------------------------------------

Your users can't authenticate using an ADFS SSO integration until Splunk activates it. To request the activation, contact :ref:`support`.

Be ready to provide your login email domain. For example, if your users log in to SSO with user IDs like ``kai@example.com``, then ``example.com`` is the login email domain.

After support activates the integration, users can authenticate using ADFS SSO.


.. _create-adfs-imm-integration:

Create a new ADFS SSO integration in Observability Cloud
------------------------------------------------------------------------

To create a new ADFS integration in Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`.
#. Select :guilabel:`Add Integration`.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for :guilabel:`Active Directory FS`, and select it.
#. In the :guilabel:`Name` field, enter a name for your ADFS SSO integration.
#. Save the :guilabel:`Integration ID` field value to a file. You'll need this value in a subsequent step.
#. If you want to set up ADFS to integrate with multiple organizations:
   #. Select :guilabel:`Integration-specific Entity ID`.
   #. Save the URI displayed next to the check box. You'll need it in a subsequent step to configure ADFS. To learn more, see :ref:`Integrate an identity provider with multiple organizations<multiple-integrations-sso>`.
#. Keep this page open. You'll upload the :strong:`Certificate` and :strong:`Metadata` files in a subsequent step.


.. _add-adfs-relying-party:

Add Observability Cloud to ADFS
------------------------------------------------------------------

Add Observability Cloud as a relying party in ADFS:

#. In separate browser tab or window, log in to the ADFS server and open the ADFS management console.
#. In the console, right-click on :guilabel:`Relying Party Trusts`, select
   :menuselection:`Add Relying Party Trust`, then click :guilabel:`Start`.
#. Select :menuselection:`Claims aware`, then click :guilabel:`Next`.
#. Select :menuselection:`Enter data about the relying party manually`, then click :guilabel:`Next`.
#. For :guilabel:`Display name`, enter :guilabel:`Splunk Observability Cloud`,
   then click :guilabel:`Next`.
#. On the screen that appears, leave the default certificate settings unchanged.
#. On the :guilabel:`Configure URL` page, leave the two options deselected and click :guilabel:`Next`.
#. On the :guilabel:`Configure Identifiers` page, enter your entity ID in the :guilabel:`Relying party trust identifiers` text box:

      * If you're setting up multiple integrations for ADFS, enter the integration-specific entity ID you obtained previously.
      * If you're using a single integration for ADFS, enter one of these entity IDs, depending on the realm you're in:

          * If your organization uses realm ``us0``, enter the following:

            ``https://api.signalfx.com/v1/saml/metadata``

          * If your organization uses another realm, enter the following:

            ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/metadata``

      To learn more about realms, see :ref:`Note about realms<about-realms>`.

#. Click :guilabel:`Add`, then click :guilabel:`Next`.
#. The next step in the wizard lets you configure multi-factor authentication.
   Because Observability Cloud doesn't require this option, click :guilabel:`Next`.
#. On the :guilabel:`Choose access control policy` page, do the following:

   #. Select :menuselection:`Permit everyone`.
   #. Optionally, you can select :guilabel:`I do not want to configure access control policies at this time`
      In a later step, you can add authorization rules. Adding rules isn't part of the integration procedure,
      so it's not described here.
   #. Click :guilabel:`Next`.
#. Review your settings, and then click :guilabel:`Next`.
#. On the :guilabel:`Ready to Add Trust` page, click :guilabel:`Next`.
#. On the :guilabel:`Finish` page, deselect :guilabel:`Configure claims issuance policy for this application`,
   then click :guilabel:`Close`.
#. On the page that appears, select :menuselection:`Relying Party Trusts`,
   right-click :guilabel:`Splunk Observability Cloud`, then select :menuselection:`Properties`.
#. Click the :guilabel:`Advanced` tab, then from the :guilabel:`Secure Hash Algorithm` drop-down list, select :menuselection:`SHA-256`.
#. Click the :guilabel:`Endpoints` tab, then click :guilabel:`Add SAML...` In the dialog box, do the following:

    * From the :guilabel:`Endpoint type` drop-down list, select :guilabel:`SAML Assertion Consumer`.
    * From the :guilabel:`Binding` drop-down list, select :guilabel:`POST`.
    * Select :guilabel:`Set the trusted URL as default`.
    * For :guilabel:`Trusted URL`, enter the URL, replacing ``<INTEGRATION_ID>`` with the integration ID you copied in step 3 of the section :ref:`Create a new ADFS SSO integration in Observability Cloud<create-adfs-imm-integration>`:

        * If your organization is in realm ``us0``, enter the following:

         ``https://api.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``

        * If your organization is in another realm, enter the following:

         ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``

      To learn more about realms, see :ref:`Note about realms<about-realms>`.

#. Click :guilabel:`OK` to close the :guilabel:`Add an endpoint` dialog box.
#. Click :guilabel:`OK` to close the :guilabel:`Splunk Observability Cloud Properties` dialog box.
#. On the page that appears, select :guilabel:`Relying Party Trusts` and right-click on :guilabel:`Splunk Observability Cloud`.
#. From the :guilabel:`Claim rule policy` drop-down list, select :menuselection:`Edit Claim Issuance Policy...`.
#. Select :guilabel:`Add Rule...`.
#. Select :menuselection:`Send LDAP Attributes as Claims`, and then click :guilabel:`Next`.
#. Enter a name for the claim rule, such as "LDAP", then from the :guilabel:`Attribute store` drop-down list,
   select :guilabel:`Active Directory`.
#. In the :guilabel:`Mapping of LDAP attributes to outgoing claim types` pane,
   use the drop-down lists to set the mappings between the
   :guilabel:`LDAP Attribute` and :guilabel:`Outgoing Claim Type` columns:

      * :guilabel:`E-Mail-Addresses` (email address LDAP attribute): :guilabel:`User.email`
      * :guilabel:`Given-Name` (First Name LDAP attribute): :guilabel:`User.FirstName`
      * :guilabel:`Surname` (Last Name LDAP attribute): :guilabel:`User.LastName`
      * :guilabel:`SAM-Account-Name` (unique user identifier LDAP attribute): :guilabel:`PersonImmutableID`.

#. Select :guilabel:`Add rule...` again, then select :guilabel:`Transform an incoming claim`.
#. Enter a name for the claim rule, such as "Email to name ID".
#. Configure this rule to pass through Name ID, if it's not already provided by your ADFS or SAML implementation.

   For example, if you want to pass through ``User.email`` as the Name ID, do the following:

   #. From the :guilabel:`Incoming claim type` drop-down list, select :guilabel:`User.email`.
   #. From the :guilabel:`Outgoing claim type` drop-down list, select :guilabel:`Name ID`.
   #. Regardless of the types you choose, from the :guilabel:`Outgoing name ID format` drop-down list, select :guilabel:`Persistent Identifier`.
   #. Click :guilabel:`Finish`.

.. _obtain-adfs-cert:

Obtain ADFS certificate to install to Observability Cloud
-------------------------------------------------------------------------

Obtain an ADFS certificate to install to Observability Cloud:

#. In the ADFS management console, select :guilabel:`Service`, then select :guilabel:`Certificates`.
#. From the :guilabel:`Token-signing` list, right-click the certificate, then select :menuselection:`View Certificate`.
#. Select :guilabel:`Detail`, then click :guilabel:`Copy to file`. The certificate export wizard appears.
#. Click :menuselection:`Next`, then select :menuselection:`DER encoded binary X.509`.
#. Enter certificate.cer, then click :guilabel:`Finish`.
#. Convert the certificate from a .cer format to a .pem format, using the ``openssl`` tool:

   ``openssl x509 -inform der -in certificate.cer -out certificate.pem``

   In a following step, you upload this file to Observability Cloud.

.. _obtain-adfs-metadata:

Obtain federation metadata file to install to Observability Cloud
---------------------------------------------------------------------------------

Obtain a federation metadata file to install to Observability Cloud:

#. In the ADFS management console, navigate to :guilabel:`Endpoints`.
#. Locate the :guilabel:`Federation Metadata` endpoint and copy the URL that appears. It's similar to the following:

   ``https://<YOUR_SERVER_IP>/FederationMetadata/2007-06/FederationMetadata.xml``.
#. Open a new browser window or tab, then navigate to the URL you copied. This opens a file download dialog box.
#. Save the file FederationMetadata.xml. In a following step, you upload this file to Observability Cloud.

.. _upload-adfs-cert-metadata-im:

Upload the ADFS certificate and federation metadata to Observability Cloud
------------------------------------------------------------------------------------------

In Observability Cloud, do the following:

#. Find the Active Directory FS page you opened in a previous step.
#. Click the :strong:`Upload File` link in the :guilabel:`Certificate` field and upload the ``certificate.pem`` file.
#. Click the :strong:`Upload File` link in the :guilabel:`Metadata` field and upload the ``FederationMetadata.xml`` file.
#. Click :guilabel:`Save`.

The Microsoft ADFS SSO integration is now available to users in your ADFS organization.
When users sign in to Observability Cloud from ADFS for the first time,
they receive an email containing a link that they must open in order to authenticate.
This only occurs the first time the user signs in. Subsequent login attempts don't
require validation.

If you want to turn off the email authentication feature, contact :ref:`support`.

.. note:: The ADFS portal is the only way that your users can log in to Observability Cloud.


.. _sso-azure:

Configure an Azure Active Directory (Azure AD) SSO integration
========================================================================

The Microsoft Azure Active Directory (Azure AD) integration lets users log in
to Observability Cloud using their Azure AD account.

Before you proceed, review the section :ref:`Name an SSO integration<naming-note-sso>` to learn about
naming your integrations.

To configure an Azure AD SSO integration, you must be an administrator for your organization.
To learn more, see :new-page-ref:`manage_admin-access`.

.. note:: The procedure for creating multiple integrations for Azure AD is
   different from the procedure for creating a single integration.

Configure Azure AD for a single organization
--------------------------------------------------------------

For instructions, see :new-page:`Tutorial: Azure Active Directory single sign-on (SSO) integration with SignalFx <https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/signalfx-tutorial>` on the Microsoft documentation website.

Configure Azure AD for multiple organizations
------------------------------------------------------------------------------------------

#. In a new browser tab or window, access :new-page:`Tutorial: Azure Active Directory single sign-on (SSO) integration with SignalFx <https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/signalfx-tutorial>` on the Microsoft documentation website.
#. After you complete step 7, do the following:

   #. In the Azure AD integration tile, select :guilabel:`Integration-specific Entity ID`.
   #. Copy the URI that appears next to check box, so you can use it in steps 4a and 4b of
      the section :strong:`Step 3: Configure Azure AD SSO`.
#. When you reach step 4a and 4b of :strong:`Step 3: Configure Azure AD SSO`, use the
   integration-specific entity ID you copied from Observability Cloud instead of the
   URLs listed in the instructions.
#. Proceed with the rest of the instructions.

After you complete these steps, the Azure AD SSO integration is available to users
in your Azure AD organization. When users sign in to Observability Cloud
from Azure AD for the first time, they receive an email containing a link that
they must open in order to authenticate. This only occurs the first time the user
signs in. Subsequent login attempts don't require validation.

If you want to turn off the email authentication feature, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their Azure AD credentials instead. Azure AD SSO authentication and Observability Cloud username/password authentication are independent.

.. _sso-google:

Configure a Google SSO integration
============================================

.. note:: The Google SSO integration doesn't support integration-specific entity IDs.

The Google SSO integration lets users in your Google domain log in to the application
using their Google credentials.

Before you proceed, review the section :ref:`Name an SSO integration<naming-note-sso>` to learn about
naming your integrations.

To configure a Google SSO integration, you must be an administrator for your organization.
To learn more, see :new-page-ref:`manage_admin-access`.

.. note:: When you configure the Google SSO integration for a domain,
   everyone in the domain has access to the organization, even if they have not
   yet been added as an organization user.

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for :guilabel:`Google Sign-In`.
#. Select the :guilabel:`Google Sign-In` tile to open the Google Sign-In page.
#. To add Google SSO for a new domain, click :guilabel:`Add Domain`.

#. A Google dialog box appears. Select the email address associated with the Google domain that you want to add. For example, if you select the Google account ``myAddress@myGoogleDomain.com``, you add ``myGoogleDomain.com`` as the authenticated domain for logging in.

#. Exit the dialog box. The domain appears in the list of domains for the Google SSO integration.
   Anyone who has credentials for that domain can use them to log in to Observability Cloud.

If at least one Google domain has access to your organization, the option to sign in
with Google appears on the Observability Cloud login screen. If your organization
has a :ref:`custom URL<custom-url>`, the option to sign in with Google also appears on
the custom URL login page.

To remove a Google domain's login access:

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`. 
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for :guilabel:`Google Sign-In`.
#. Click the :guilabel:`Google Sign-In` tile to open the Google Sign-In page.
#. Click the "x" for the domain you want to remove.


.. _sso-google-cloud-identity:

.. TO-DO: Need a test account in order to figure out how to document integration-specific entity ID.

Configure a Google Cloud Identity SSO integration
=================================================================

The Google Cloud Identity (GCI) SSO integration lets users log in to Observability Cloud
using their Google Cloud credentials.

Before you proceed, review the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integration.

To configure GCI as an IdP using an Observability Cloud SSO integration,
you must be an administrator for your organization and a super-administrator of your Google domain.
To learn more, see :new-page-ref:`manage_admin-access`.

The :new-page:`G Suite Administrator Help document <https://support.google.com/a/answer/7623225?hl=en>`
topic, developed by Google, describes how to configure the integration.

After you complete these steps, the GCI SSO integration is available to
users in your GCI organization. When users sign in to Observability Cloud
from GCI for the first time, they receive an email containing a link that
they must open in order to authenticate. This only occurs the first time the user
signs in. Subsequent login attempts don't require validation.

If you want to turn off the email authentication feature, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their GCI credentials instead. GCI SSO authentication and Observability Cloud username/password authentication are independent.


.. _sso-okta:

Configure an Okta SSO integration
===========================================

The Okta SSO integration allows you to log into Observability Cloud using Okta.

Before you start, review the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

.. note:: To use this procedure, you must be an administrator of your Okta organization **and** your Observability Cloud organization.

Open a browser tab or window for Observability Cloud, and another for Okta.

Switch to Okta, then follow these steps to add Observability Cloud as an Okta application:
   #. Click :guilabel:`Admin`, then click :guilabel:`Applications`
   #. Click :guilabel:`Add Application`.
   #. In the directory that appears, find for :guilabel:`SignalFx`, then add it by clicking :guilabel:`Add`.

Switch to Observability Cloud:
   #. Log in to Splunk Observability Cloud.
   #. In the left navigation menu, select :menuselection:`Data Management`.
   #. Select :guilabel:`Add Integration`.
   #. In the integration filter menu, select :guilabel:`All`.
   #. In the :guilabel:`Search` field, search for :guilabel:`Okta`, and select it.
   #. In the :guilabel:`Name` text box, enter the name of your integration.
   #. Copy the :guilabel:`Integration ID` value. Even if you have multiple organizations that you want to integrate with Okta SSO, leave :guilabel:`Integration-specific Entity ID` deselected. The Observability Cloud Okta integration provides this automatically for multiple organizations.

Switch back to Okta:
   #. Paste the integration ID value into the :guilabel:`Integration ID` text box, then click :guilabel:`Next`.
   #. Assign the :guilabel:`SignalFx` application to users in your Okta organization, then click :guilabel:`Next`.
   #. Click :guilabel:`Sign on`, then click :guilabel:`View Setup instructions`.
   #. Copy the following strings from the instructions, and paste them into a text editor:
      * :guilabel:`Public Key`
      * :guilabel:`Issuer URL`
      * :guilabel:`Metadata URL`

Switch to Observability Cloud to finish:
   #. Copy and paste the Okta :guilabel:`Public Key` value into the :guilabel:`Public Key` text box.
   #. Copy and paste the Okta :guilabel:`Issuer URL` value into the :guilabel:`Issuer URL` text box.
   #. Copy and paste the Okta :guilabel:`Metadata URL` value into the :guilabel:`Metadata URL` text box.
   #. Click :guilabel:`Save`. The message :guilabel:`Validated!` appears. If you get an error, double-check the values that you copied and pasted.

The Okta SSO integration is now available to users in your Okta organization. When users sign in to Observability Cloud from Okta for the first time, they receive an email containing a link that they must open in order to authenticate. This only occurs the first time the user signs in. Subsequent login attempts don't require validation.

If you want to turn off email authentication, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their Okta credentials instead. Okta SSO authentication and Observability Cloud username/password authentication are independent.

Observability Cloud generates a password for users you create in Okta SSO. If the Okta login portal is unavailable, Observability Cloud users can use the reset password link on the Observability Cloud login page to get native Observability Cloud credentials.


.. _sso-one-login:

Configure a OneLogin SSO integration
================================================================

The OneLogin SSO integration lets your users log in to Observability Cloud using OneLogin.

Before you start, review the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

.. note:: To use this procedure, you must be an administrator of your OneLogin organization and your Observability Cloud organization.

Open a browser tab or window for Observability Cloud, and another for OneLogin.

In OneLogin, do the following:
   #. Select :menuselection:`Security` :strong:`>` :menuselection:`Certificates` :strong:`>` :menuselection:`New`.
   #. Configure the certificate according to your organization security policy.
   #. Make sure to pick :guilabel:`SHA256` or better for the algorithm in the :guilabel:`Signature` field.
   #. Copy the value of the :guilabel:`X.509 certificate` text box and and save it in a text editor so you can use it in the next steps.
   #. Add Observability Cloud by selecting :menuselection:`Apps` :strong:`>` :menuselection:`Add Apps` :strong:`>` :guilabel:`SignalFx`.
   #. In the dialog box, make any changes you want, then click :guilabel:`Save`.
   #. Select :guilabel:`SSO` to open the SSO configuration page.
   #. Select :guilabel:`SHA-256` in the :guilabel:`SAML Signature Algorithm` box.
   #. Copy the value of the :guilabel:`Issuer URL` text box and save it in a text editor so you can use it in the next steps.

Back in Observability Cloud:
   #. Log in to Splunk Observability Cloud.
   #. In the left navigation menu, select :menuselection:`Data Management`.
   #. Select :guilabel:`Add Integration`.
   #. In the integration filter menu, select :guilabel:`All`.
   #. In the :guilabel:`Search` field, search for :guilabel:`OneLogin`, and select it.
   #. In the :guilabel:`Name` text box, enter the name for your integration.
   #. Copy the :guilabel:`Integration ID` value.

Switch to OneLogin:
   #. Go to the :guilabel:`Configuration` tab, then paste the integration ID into the :guilabel:`SignalFx ID` text box.
   #. In the SignalFx subdomain, enter ``api.<YOUR_REALM>``

In Observability Cloud:
   #. Copy the value of :guilabel:`X.509 certificate` from the text editor and paste it into the :guilabel:`Public Key` text box.
   #. Copy the value of :guilabel:`Issuer URL` from the text editor and paste it into the :guilabel:`Issuer URL` text box.
   #. Click :guilabel:`Save`. The message :guilabel:`Validated!` appears. If you get an error, double-check the values that you copied and pasted.

The OneLogin SSO integration is now available to users in your OneLogin App portal. When users use the integration for the first time, they receive an email containing a link that they must open in order to authenticate. This only occurs the first
time the user signs in. Subsequent login attempts don't require validation.

If you want to turn off email authentication, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their OneLogin SSO credentials instead. OneLogin SSO authentication and Observability Cloud username/password authentication are independent.

Observability Cloud generates a password for users you create in OneLogin SSO. If the OneLogin portal is unavailable, Observability Cloud users can use the reset password link on the Observability Cloud login page to get native Observability Cloud credentials.


.. _configure-sso-using-pingone:
.. _sso-ping-one:

Configure a PingOne SSO integration
================================================================

The PingOne SSO integration allows you to log into Observability Cloud using PingOne.

Before you start, review the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

.. note:: To use this procedure, you must be an administrator of your PingOne
   organization and your Observability Cloud organization.

To set up your PingOne SSO integration, follow these steps:

Open a browser tab or window for Observability Cloud, and another for PingOne.

In Observability Cloud, do the following:
   #. Log in to Splunk Observability Cloud.
   #. In the left navigation menu, select :menuselection:`Data Management`.
   #. Select :guilabel:`Add Integration`.
   #. In the integration filter menu, select :guilabel:`All`.
   #. In the :guilabel:`Search` field, search for :guilabel:`PingOne`, and select it.
   #. In the :guilabel:`Name` text box, enter a name for your PingOne SSO integration.
   #. Copy the value next to :guilabel:`Integration ID` so you can use it in a later step.

In PingOne, do the following:
   #. Click  :guilabel:`Applications`. A list of your installed applications appears.
   #. Click :guilabel:`Add Application`, and then select :menuselection:`Search Application Catalog`.
   #. In the search field, enter :guilabel:`SignalFx`. Click the :guilabel:`SignalFx` application.
   #. If the :guilabel:`Setup` is active, click it. A setup screen appears.

      If the :guilabel:`Setup` button is disabled, and you see the tooltip "You need to setup a connection first," then you might need to connect to an Identity Repository. To connect to an Identity Repository:
      #. At the top of the PingOne page, click :guilabel:`Setup`.
      #. Click :guilabel:`Connect to an Identity Repository`.
      #. Select the Identity Repository you want to use, click :guilabel:`Next` twice, then click :guilabel:`Finished`.

   #. Click :guilabel:`SignalFx`, then click :guilabel:`Setup`.
   #. Optional: Copy the configuration parameters to keep as a reference.
   #. Click :guilabel:`Continue to Next Step`.

Still in PingOne, continue the configuration:
   #. In the :guilabel:`ACS URL` field, a URL similar to ``https://api.signalfx.com/v1/saml/acs/<INTEGRATION_ID>`` appears.
   #. Replace ``<INTEGRATION_ID>`` with the integration ID you copied in a previous step.
   #. Confirm that the :guilabel:`ACS URL` and :guilabel:`Entity ID` URLs refer to your Observability Cloud realm.
   
      If your Observability Cloud organization uses the ``us0`` :ref:`realm <about-realms>`, enter the following:
      * ACS URL: ``https://api.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``
      * Entity ID: ``https://api.signalfx.com/v1/saml/metadata``

      If your Observability Cloud organization uses another realm, enter the following:
      * ACS URL: ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``
      * Entity ID: ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/metadata``

In PingOne, select :guilabel:`Continue to Next Step`. The :guilabel:`Attribute Mapping` screen appears.
   #. For :guilabel:`SAML_SUBJECT`:
      #. Select :guilabel:`Advanced`.
      #. In the :guilabel:`Name ID Format to send to SP` dropdown list, select :menuselection:`urn:oasis:names:tc:SAML:2.0:nameid-format:persistent`, then :guilabel:`Save`.
   #. Select other attributes as needed.

Select :guilabel:`Continue to Next Step`. The Group Access screen appears.
   #. Select the users who should have access to Observability Cloud. Click :guilabel:`Continue to Next Step`. The customization screen appears.
   #. Configure the :guilabel:`SignalFx` application, then click :guilabel:`Continue to Next Step`. The review screen appears.
   #. In the review screen that appears, do the following:
      #. Locate the :guilabel:`Certificate` field, then click :guilabel:`Download` to download the pingone-signing.crt file to your computer.
      #. Locate the :guilabel:`SAML Metadata` field, and then click the :guilabel:`Download` link to download the saml2-metadata-idp.xml file to your computer.
      #. :guilabel:`Finish`. The PingOne Applications list appears. In the list, :guilabel:`SignalFx` appears as an active application.

In Observability Cloud, do the following:
   #. Locate the :guilabel:`Certificate` text box.
   #. Select :guilabel:`Upload File`. A file system dialog box opens.
   #. To upload the certificate file, select the :guilabel:`pingone-signing.crt` file you downloaded in a previous step.
   #. After the upload, the text for :guilabel:`Certificate` changes to match the uploaded file.
   #. Locate the :guilabel:`Metadata` text box:
   #. :guilabel:`Upload File`. A file system dialog box opens.
   #. To upload the metadata file, select :guilabel:`saml2-metadata-idp.xml` file you downloaded in a previous step.
   #. After the upload, the text in the :guilabel:`Metadata` text box changes to match the uploaded file.
   #. :guilabel:`Save`. Observability Cloud displays a :strong:`Validated!` message.

The PingOne SSO integration is now available to users in your PingOne application. When users use the integration for the first time, they receive an email containing a link that they must open in order to authenticate. This only occurs the first
time the user signs in. Subsequent login attempts don't require validation.

If you want to turn off email authentication, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their Okta credentials instead. PingOne SSO authentication and Observability Cloud username/password authentication are independent.

Observability Cloud generates a password for users you create in PingOne SSO. If the PingOne login portal is unavailable, Observability Cloud users can use the reset password link on the Observability Cloud login page to get native Observability Cloud credentials.


.. _sso-generic:

Configure SSO using a generic SAML SSO integration
================================================================

If you use an SSO login service other than the ones listed previously, you can create a generic SAML SSO integration for your organization. 

If you already have a SAML SSO integration for your organization, follow the steps in:ref:`saml-install` to install it in Observability Cloud.

.. _saml-creators:

Generic SAML SSO integrations
-------------------------------------------------------

Observability Cloud provides integrations for specific SAML SSO providers. If your provider isn't in the list of supported integrations, your organization administrator can request a generic integration from Observability Cloud. You can use this integration to test and develop a SAML SSO provider. Using this integration, administrators can direct Observability Cloud
to use any publicly-available SSO endpoint to authenticate users.

To enable the generic SAML SSO integration, contact :ref:`support`.

Be prepared to provide the domain for the ID/email address that your users provide when they log in. The domain is the part of the user ID/email address string that follows the ``@`` sign.

.. note::  You can only use one type of ``PersonImmutableID`` for each generic SAML integration you create. If you create a second generic SAML integration using the same ``PersonImmutableID``, you must deactivate the first one and delete its users. Until you do so, users will not be able to use the same type of ID to log in to the organization. For example, if the first integration uses the  ``emailId`` as the PersonImmutableID, you can't use ``emailId`` in a second integration. 
   For details on how to use the API to delete users, see :new-page:`Delete/organization/member <https://dev.splunk.com/observability/reference/api/organizations/latest#endpoint-delete-member-using-id>`.


Information required for generic SAML SSO integrations
----------------------------------------------------------------
:strong:`User information``

* One of:
   * ``User.FirstName`` and ``User.LastName``: User's first and last name
   * ``User.FullName``: User's full name
* ``User.email``: User's email address
* ``PersonImmutableID``: A unique identifier for this user

:strong:`ACS URL`

* Some ACS URLs include realm information. To learn more, see :ref:`Note about realms<about-realms>`.
* The ACS URL includes an integration ID that's unique for each integration.
* The SAML page displays this ID.

The URL has one of the following formats:
   * If your organization uses the ``us0`` realm: ``https://api.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``
   * If your organization uses a realm other than ``us0``: ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``

:strong:```<ENTITY-ID>```, which is the entity ID displayed when you start creating a new integration.

* If you have a single organization, enter the following entity ID:
   * If your organization uses the ``us0`` realm, enter the following: ``https://api.signalfx.com/v1/saml/metadata/<ENTITY-ID>``
   * If your organization uses a realm other than ``us0``, enter the following: ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/metadata<ENTITY-ID>``

* If you have multiple organizations that you want to integrate with a single IdP, do the following:
   #.Select :guilabel:`Integration-specific Entity ID`. Next to the option, the integration-specific entity ID appears in the form of a URI.
   #. Copy the entity ID and provide it when you configure the login service to communicate with Observability Cloud.

:strong:`Assertion Signature`

The SSO provider must put the assertion signature in the assertion message, not in the request itself. The assertion must be signed with the SHA256 algorithm or better.

:strong:`RelayState``

Observability Cloud sends a dynamic RelayState, so the SSO provider must accept and pass back the dynamic RelayState.

.. _saml-install:

Install a generic SAML SSO integration
-------------------------------------------------

This section describes how to install a generic SAML SSO integration that your organization
has implemented.

.. _generic-sso-prerequisites:

Prerequisites
^^^^^^^^^^^^^^^^^^^^^^^

Before you start an installation, you need the following information:

* :strong:`Name`: Descriptive name that appears in the Generic SAML SSO tile.
* :strong:`Public key`: The SAML provider's public key, which must be signed with the SHA256 algorithm or better.
* :strong:`Issuer URL`: The issuer URL provided by the SSO provider.
* One of the following:
   - A publicly-accessible metadata URL provided by the SSO provider.
   - Metadata for the SSO provider in XML format. The entity ID that the provider sends as part of the metadata must match the issuer URL.

If you use multiple email domains in a single Splunk Observability Cloud organization (for example, kai@example.com and deepu@examplehq.com), contact :ref:`support` for help with enabling multiple domains.

Steps
^^^^^^^^^^^^^^^

To install a generic SAML SSO integration, follow these steps:

   #. Log in to Splunk Observability Cloud.
   #. In the left navigation menu, select :menuselection:`Data Management`.
   #. Select :guilabel:`Add Integration`.
   #. In the integration filter menu, select :guilabel:`All`.
   #. In the :guilabel:`Search` field, search for :guilabel:`SAML`, and select it.
   #. In the :guilabel:`Name` field, enter the name for this integration. If your organization has a :ref:`custom URL<custom-url>`, this name appears as the text for the button users click to sign in (see the section :ref:`naming-note-sso`).
   #. In the remaining fields, enter the information you gathered in the :ref:`generic-sso-prerequisites` section.
   #. :guilabel:`Save`. The message :strong:`Validated!` appears.

The generic SSO integration is now available to users of the SSO provider. When users use the integration for the first time, they receive an email containing a link that they must open in order to authenticate. This only occurs the first
time the user signs in. Subsequent login attempts don't require validation.

If you want to turn off email authentication, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their generic SAML SSO credentials instead. Generic SAML SSO authentication and Observability Cloud username/password authentication are independent.

Observability Cloud generates a password for users you create in generic SAML SSO. If the generic SAML login portal is unavailable, Observability Cloud users can use the reset password link on the Observability Cloud login page to get native Observability Cloud credentials.

.. important::  This integration can send credential information to unverified destinations. Although you can use generic SAML SSO integrations to authenticate users, Observability Cloud doesn't support these integrations as your primary authentication mechanism. The Observability Cloud support team can't help you diagnose or repair problems you encounter while trying to authenticate users using generic SSO integrations, aside from ensuring that the integration itself is working.