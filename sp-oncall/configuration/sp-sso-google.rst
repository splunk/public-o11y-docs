.. _single-sign-sso:

************************************************************************
Configure Single Sign-On for Splunk On-Call
************************************************************************

.. meta::
   :description: Enable Splunk On-Call SSO for your organization. 




Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Full-Stack

To enable single sign-on (SSO) for your organization, you will need to provide an updated metadata file and your IDP. If you are
interested in setting up SSO, please contact :ref:`Splunk On-Call Support <spoc-support>`.



Configure Single Sign On between your Identity Provider (IDP) and  Splunk On-Call. Our standard SSO setup uses SAML 2.0 protocol. As long as your IDP can use SAML 2.0 protocol, it can integrate with Splunk On-Call. The exact steps differ depending on which IDP you use, but the process typically involves exporting a .XML metadata file and sending it to our Support team. Once you have sent the .xml file, a Splunk On-Call support specialist will
complete the setup on the back-end and respond with confirmation.

If your IDP does not have SAML capability, please contact Splunk On-Call Support to explore what alternative options may be available. For details on how to contact Splunk On-Call Support, see :ref:`spoc-support`.


Administrator Setup
==========================

Instructions to complete the SSO configuration with Splunk On-Call and your IDP are provided for:

- :ref:`sso-okta-spoc`
- :ref:`sso-google-spoc`
- 


.. _sso-google-spoc::

Google Apps
================

To configure SSO for Splunk On-Call using Google Apps:

#. Access the Admin portal for Google Apps and navigate to :guilabel:`Apps` then :guilabel:`SAML Apps`.

   .. image:: /_images/spoc/sso-google1.png
       :width: 100%
       :alt: Splunk On-Call SSO Google Apps Setup 1 

#. Select :guilabel:`Set up my own custom app`.

   .. image:: /_images/spoc/sso-google2.png
       :width: 100%
       :alt: Splunk On-Call SSO Google Apps Setup 2

#. From Step 2 of the wizard, select :guilabel:`Option 2` to download IDP metadata in XML format. Attach and send the downloaded .xml file to :ref:`Splunk On-Call Support <spoc-support>`.

   .. image:: /_images/spoc/sso-google3.png
       :width: 100%
       :alt: Splunk On-Call SSO Google Apps Setup 3

#. Save the Splunk On-Call logo file found `HERE <https://help.victorops.com/wp-content/uploads/2016/11/256x256-VictorOps-Oakleaf.png>`__.
#. Enter a name for the application (Splunk On-Call) and upload the logo file.

.. figure:: images/SSO5.png
   :alt: VictorOps SSO Google Apps Setup 5

   VictorOps SSO Google Apps Setup 5

-  On the “Service Provider Details” step place the following in the
   :guilabel:`ACS URL` line:

   -  https://sso.victorops.com:443/sp/ACS.saml2

-  For the Entity ID place the following:

   -  victorops.com

-  For the Start URL place the following with the correct Organization
   Slug at the end:

   -  https://portal.victorops.com/auth/sso/**org-slug-here**

**VictorOps SSO Google Apps Setup 6**

-  Finally, skip the attribute mapping step and click FINISH

.. figure:: images/SSO7.png
   :alt: VictorOps SSO Google Apps Setup 7

   VictorOps SSO Google Apps Setup 7



--------------

**ADFS (Active Directory Federation Services)**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once you have sent over your Metadata file, and the Splunk On-Call
Support team has completed the Configuration, they will send you an
updated metadata file needed to complete the configuration on your side.

In the ADFS Management console, navigate to Trust Relationships >
Relying Party Trusts and click *Add Relying Party Trust* in the Actions
pane

.. figure:: images/ADFS_1.jpg
   :alt: ADFS SSO Setup 1

   ADFS SSO Setup 1

Click *Start* in the Add Relying Party Trust Wizard

.. figure:: images/ADFS_2.jpg
   :alt: ADFS SSO Setup 2

   ADFS SSO Setup 2

Select the middle option, “Import data about the relying party trust
from a file” and browse to the metadata.xml provided by Splunk On-Call
Support, and click *Next\ ADFS SSO Setup 3*

Provide a display name and any notes, and then click *Next*.

.. figure:: images/ADFS_4.jpg
   :alt: ADFS SSO Setup 4

   ADFS SSO Setup 4

Choose the *box* next to “I do not want to configure multi-factor
authentication settings for this relying party trust at this time”, and
then click *Next*.

.. figure:: images/ADFS_5.jpg
   :alt: ADFS SSO Setup 5

   ADFS SSO Setup 5

(Optional: Configure multi-factor authentication. This is not necessary
for functionality, but may be required for your organization’s security
compliance. This step can also be performed later if you need to verify
the SAML integration with Splunk On-Call is functioning before bringing
the configuration up to compliance.)

Choose “Permit all users to access this relying party”, then
click *Next*.

.. figure:: images/ADFS_6.jpg
   :alt: ADFS SSO Setup 6

   ADFS SSO Setup 6

(Optional: Choose “Deny all users access to this relying party” and
configure access rules as needed by your organization after completing
this configuration.)

Review the configuration and click Next if it appears accurate. You will
not be able to go back from the next screen and will have to manually
update the configuration later, if there are any issues.

.. figure:: images/ADFS_7.jpg
   :alt: ADFS SSO Setup 7

   ADFS SSO Setup 7

Make sure to check the *box* next to Open the Edit Claim Rules dialog,
and click *Close*.

.. figure:: images/ADFS_8.jpg
   :alt: ADFS SSO Setup 8

   ADFS SSO Setup 8

Click *Add Rule*

.. figure:: images/ADFS_9.jpg
   :alt: ADFS SSO Setup 9

   ADFS SSO Setup 9

Select the claim rule template *Send LDAP Attributes as Claims*

.. figure:: images/ADFS_10.jpg
   :alt: ADFS SSO Setup 10

   ADFS SSO Setup 10

Create a name for the rule and choose *Active Directory* as the
Attribute store. Under the LDAP Attribute, choose *E-Mail-Addresses* and
map it to the Outgoing Claim Type of *Name ID*, then click *Finish*.

.. figure:: images/ADFS_11b.jpg
   :alt: ADFS SSO Setup 11

   ADFS SSO Setup 11

Open the Relying Party Trust you just configured for Splunk On-Call by
right clicking the entry and choosing *Properties*. On the Identifers
tab, add https://victorops.com as a Relying party identifier, then
click *Apply*.

.. figure:: images/ADFS_12b.jpg
   :alt: ADFS SSO Setup 12

   ADFS SSO Setup 12

--------------

Azure Active Directory (SAML-based Sign-on)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Identifier: https://victorops.com
-  Reply URL: https://sso.victorops.com/sp/ACS.saml2
-  Sign on URL: https://portal.victorops.com/auth/sso/**org-slug-here**
-  Relay State: https://portal.victorops.com/auth/sso/**org-slug-here**

AWS IAM Identity Center - SAML
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  In the IAM Identity Center console find the :guilabel:`Applications` tab.
-  Hit :guilabel:`Add Application` and look for **VictorOps.** 
-  In the configuration settings make sure you set the fields as
   followed:

   -  Important - Make sure the Session Duration is set to 1hour.

.. image:: images/Screenshot-2023-09-26-at-9.57.43-PM.png

.. image:: images/Screenshot-2023-09-26-at-9.58.08-PM.png
