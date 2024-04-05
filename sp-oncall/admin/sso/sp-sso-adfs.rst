.. _sso-adfs-spoc:

*****************************************************************************************
Configure Active Directory Federation Services Single Sign-On for Splunk On-Call
*****************************************************************************************

.. meta::
   :description: Enable Splunk On-Call SSO for Active Directory Federation Services (ADFS) your organization. 




Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Full-Stack

To enable single sign-on (SSO) for your organization, you will need to provide an updated metadata file and your IDP. If you are
interested in setting up SSO, please contact :ref:`Splunk On-Call Support <spoc-support>`.



Configure Single Sign On (SSO) between your Identity Provider (IDP) and  Splunk On-Call. Our standard SSO setup uses SAML 2.0 protocol. As long as your IDP can use SAML 2.0 protocol, it can integrate with Splunk On-Call. The exact steps differ depending on which IDP you use, but the process typically involves exporting a .XML metadata file and sending it to our Support team. Once you have sent the .xml file, a Splunk On-Call support specialist will
complete the setup on the back-end and respond with confirmation.

If your IDP does not have SAML capability, please contact Splunk On-Call Support to explore what alternative options may be available. For details on how to contact Splunk On-Call Support, see :ref:`spoc-support`.


Administrator Setup
==========================

Instructions to complete the SSO configuration with Splunk On-Call and your IDP are provided for:

- :ref:`sso-okta-spoc`
- :ref:`sso-google-spoc`
- :ref:`sso-onelogin-spoc`
- :ref:`sso-adfs-ac-spoc`


.. _sso-adfs-ac-spoc:


Active Directory Federation Services (ADFS)
===========================================================

Once you have sent over your Metadata file, and the Splunk On-Call Support team has completed the configuration, you will receive an updated metadata file to complete the configuration on your side.

#. In the ADFS Management console, navigate to :guilabel:`Trust Relationships`, then :guilabel:`Relying Party Trusts` and select :guilabel:`Add Relying Party Trust` in the :menuselection:`Actions` pane.

   .. image:: /_images/spoc/sso-adfs1.png
       :width: 100%
       :alt: Navigate to Add Relying Party Trust in the ADFS management console

#. Select :guilabel:`Start` in the Add Relying Party Trust Wizard.

#. Select :guilabel:`Import data about the relying party trust from a file` and browse to the metadata.xml provided by Splunk On-Call Support. Select :guilabel:`Next`.

   .. image:: /_images/spoc/sso-adfs2.png
       :width: 100%
       :alt: Import the metadata.xml file.

#. Provide a display name and any notes, and then select :guilabel:`Next`.

   .. image:: /_images/spoc/sso-adfs3.png
       :width: 100%
       :alt: Enter a display name.

#. Select :guilabel:`I do not want to configure multi-factor authentication settings for this relying party trust at this time`, and
then select :guilabel:`Next`.

   .. image:: /_images/spoc/sso-adfs4.png
       :width: 100%
       :alt: Depending on your organization's requirements, you might configure multi-factor authentication now or later.

#. (Optionally) Configure multi-factor authentication. This is not necessary for functionality, but may be required for your organization's security
compliance. This step can also be performed later if you need to verify the SAML integration with Splunk On-Call is functioning before bringing
the configuration up to compliance.

#. Select :guilabel:`Permit all users to access this relying party`, then select :guilabel:`Next`.

   .. image:: /_images/spoc/sso-adfs5.png
       :width: 100%
       :alt: Select Permit all users to access this relying party.

#. (Optionally) Select :guilabel:`Select Deny all users access to this relying party` and configure access rules as needed by your organization after completing
this configuration.

#. Review the configuration and select :guilabel:`Next` if it is accurate. You will not be able to go back from the next screen and will have to manually update the configuration later if there are any changes required.

   .. image:: /_images/spoc/sso-adfs6.png
       :width: 100%
       :alt: Review the configuration options you've selected.

#. Ensure you select the :guilabel:`Open the Edit Claim Rules dialog` checkbox, then select :guilabel:`Close`.

   .. image:: /_images/spoc/sso-adfs7.png
       :width: 100%
       :alt: Select the Open the Edit Claim Rules dialog checkbox.

#. Select :guilabel:`Add Rule`.

   .. image:: /_images/spoc/sso-adfs8.png
       :width: 100%
       :alt: Select Add Rule.

#. Select the claim rule template :guilabel:`Send LDAP Attributes as Claims`.

   .. image:: /_images/spoc/sso-adfs9.png
       :width: 100%
       :alt: Select the template: Send LDAP Attributes as Claims.

#. Create a name for the rule and select :guilabel:`Active Directory` as the Attribute store. Under the LDAP Attribute, select :guilabel:`E-Mail-Addresses` and
map it to the Outgoing Claim Type of *Name ID*, then select :guilabel:`Finish`.

#.  Open the Relying Party Trust you just configured for Splunk On-Call by right-clicking the entry and selecting :guilabel:`Properties`. On the Identifers
tab, add https://victorops.com as a Relying party identifier, then select :guilabel:`Apply`.

   .. image:: /_images/spoc/sso-adfs10.png
       :width: 100%
       :alt: Add the VictorOps URL as the identifier.

