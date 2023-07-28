.. _configure-sso-using-adfs:

.. _sso-adfs:

*********************************************************************
Configure an ADFS SSO integration
*********************************************************************

.. meta::
   :description: Configure the Microsoft Active Directory Federation Services (ADFS) SSO integration to let your users log in to Observability Cloud using your Microsoft ADFS portal.

The Microsoft Active Directory Federation Services (ADFS) SSO integration lets your users log in to Observability Cloud using your Microsoft ADFS portal.

Before you begin configuring the Microsoft Active Directory Federation Services (ADFS) integration, ensure you have completed the steps in :ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

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
#. Open the :new-page:`Active Directory FS guided setup <https://login.signalfx.com/#/integrations/adfs/description>`. Optionally, you can navigate to the guided setup on your own:

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
   :menuselection:`Add Relying Party Trust`, then select :guilabel:`Start`.
#. Select :menuselection:`Claims aware`, then select :guilabel:`Next`.
#. Select :menuselection:`Enter data about the relying party manually`, then select :guilabel:`Next`.
#. For :guilabel:`Display name`, enter :guilabel:`Splunk Observability Cloud`,
   then select :guilabel:`Next`.
#. On the screen that appears, leave the default certificate settings unchanged.
#. On the :guilabel:`Configure URL` page, leave the two options deselected and select :guilabel:`Next`.
#. On the :guilabel:`Configure Identifiers` page, enter your entity ID in the :guilabel:`Relying party trust identifiers` text box:

      * If you're setting up multiple integrations for ADFS, enter the integration-specific entity ID you obtained previously.
      * If you're using a single integration for ADFS, enter one of these entity IDs, depending on the realm you're in:

          * If your organization uses realm ``us0``, enter the following:

            ``https://api.signalfx.com/v1/saml/metadata``

          * If your organization uses another realm, enter the following:

            ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/metadata``

      To learn more about realms, see :ref:`Note about realms<about-realms>`.

#. Select :guilabel:`Add`, then select :guilabel:`Next`.
#. The next step in the guided setup lets you configure multifactor authentication.
   Because Observability Cloud doesn't require this option, select :guilabel:`Next`.
#. On the :guilabel:`Choose access control policy` page, do the following:

   #. Select :menuselection:`Permit everyone`.
   #. Optionally, you can select :guilabel:`I do not want to configure access control policies at this time`
      In a later step, you can add authorization rules. Adding rules isn't part of the integration procedure,
      so it's not described here.
   #. Select :guilabel:`Next`.
#. Review your settings, and then select :guilabel:`Next`.
#. On the :guilabel:`Ready to Add Trust` page, select :guilabel:`Next`.
#. On the :guilabel:`Finish` page, deselect :guilabel:`Configure claims issuance policy for this application`,
   then select :guilabel:`Close`.
#. On the page that appears, select :menuselection:`Relying Party Trusts`,
   right-click :guilabel:`Splunk Observability Cloud`, then select :menuselection:`Properties`.
#. Select the :guilabel:`Advanced` tab, then from the :guilabel:`Secure Hash Algorithm` list, select :menuselection:`SHA-256`.
#. Select the :guilabel:`Endpoints` tab, then select :guilabel:`Add SAML...` In the dialog box, do the following:

    * From the :guilabel:`Endpoint type` list, select :guilabel:`SAML Assertion Consumer`.
    * From the :guilabel:`Binding` list, select :guilabel:`POST`.
    * Select :guilabel:`Set the trusted URL as default`.
    * For :guilabel:`Trusted URL`, enter the URL, replacing ``<INTEGRATION_ID>`` with the integration ID you copied in step 3 of the section :ref:`Create a new ADFS SSO integration in Observability Cloud<create-adfs-imm-integration>`:

        * If your organization is in realm ``us0``, enter the following:

         ``https://api.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``

        * If your organization is in another realm, enter the following:

         ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``

      To learn more about realms, see :ref:`Note about realms<about-realms>`.

#. Select :guilabel:`OK` to close the :guilabel:`Add an endpoint` dialog box.
#. Select :guilabel:`OK` to close the :guilabel:`Splunk Observability Cloud Properties` dialog box.
#. On the page that appears, select :guilabel:`Relying Party Trusts` and right-click on :guilabel:`Splunk Observability Cloud`.
#. From the :guilabel:`Claim rule policy` list, select :menuselection:`Edit Claim Issuance Policy...`.
#. Select :guilabel:`Add Rule...`.
#. Select :menuselection:`Send LDAP Attributes as Claims`, and then select :guilabel:`Next`.
#. Enter a name for the claim rule, such as "LDAP", then from the :guilabel:`Attribute store` list,
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
   #. Select :guilabel:`Finish`.

.. _obtain-adfs-cert:

Obtain ADFS certificate to install to Observability Cloud
-------------------------------------------------------------------------

Obtain an ADFS certificate to install to Observability Cloud:

#. In the ADFS management console, select :guilabel:`Service`, then select :guilabel:`Certificates`.
#. From the :guilabel:`Token-signing` list, right-click the certificate, then select :menuselection:`View Certificate`.
#. Select :guilabel:`Detail`, then select :guilabel:`Copy to file`. The certificate export wizard appears.
#. Select :menuselection:`Next`, then select :menuselection:`DER encoded binary X.509`.
#. Enter certificate.cer, then select :guilabel:`Finish`.
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

 .. note:: URLs must belong to ADFS in order to validate. Accepted domains include ``windows.net`` and ``windows-ppe.net``.

.. _upload-adfs-cert-metadata-im:

Upload the ADFS certificate and federation metadata to Observability Cloud
------------------------------------------------------------------------------------------

In Observability Cloud, do the following:

#. Find the Active Directory FS page you opened in a previous step.
#. Select the :strong:`Upload File` link in the :guilabel:`Certificate` field and upload the ``certificate.pem`` file.
#. Select the :strong:`Upload File` link in the :guilabel:`Metadata` field and upload the ``FederationMetadata.xml`` file.
#. Select :guilabel:`Save`.

The Microsoft ADFS SSO integration is now available to users in your ADFS organization.
When users log in to Observability Cloud from ADFS for the first time,
they receive an email containing a link that they must open in order to authenticate.
This only occurs the first time the user signs in. Subsequent login attempts don't
require validation.

If you want to turn off the email authentication feature, contact :ref:`support`.

.. note:: The ADFS portal is the only way that your users can log in to Observability Cloud.

.. include:: /_includes/troubleshooting-steps.rst
