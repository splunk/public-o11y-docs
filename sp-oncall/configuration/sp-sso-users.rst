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


Administrator Setup
==========================

Instructions to complete the SSO configuration with Splunk On-Call and your IDP are provided for:

- :ref:`sso-okta-spoc`
- :ref:`sso-google-spoc`
- 

.. _sso-okta-spoc::

Okta
==========

#. From the Okta user homepage, select :guilabel:`Admin` to access the Okta Admin dashboard.


.. image:: /_images/spoc/sso-okta1.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 1


#. From the Okta Admin Dashboard, Select :guilabel:`Applications`, then select :guilabel:`Applications` from
the drop-down.

.. image:: /_images/spoc/sso-okta2.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 2



#. Within Applications, select :guilabel:`Add Application`.

.. image:: /_images/spoc/sso-okta3.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 3

#. Begin entering Splunk On-Call in the search bar. When Splunk On-Call appears, select :guilabel:`Add`.

.. image:: /_images/spoc/sso-okta4.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 4

#. The Application label, or name, should auto-populate with the name Splunk On-Call, but you can re-name this label. The Browser plugin auto-submit should be auto-populated as well. Verify that this setting is selected and select :guilabel:`Next`.

.. image:: /_images/spoc/sso-okta5.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 5

#. On the :guilabel:`Sign-On Options` tab, in the :guilabel:`Default Relay State` field enter the following URL:

   -  Default Relay State: https://portal.victorops.com/auth/sso/<your-org-slug>

.. image:: /_images/spoc/sso-okta6.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 6. Org slug example.

#. Once the URL has been added, select :guilabel:`Identity Provider metadata` to download the metadata file. Splunk On-Call requires this file to complete the SSO configuration. Email this file to Splunk On-Call Support.
#. After downloading the file, select :guilabel:`Next`.

#. Select the users that should have access to add the Splunk On-Call app to their Okta homepage and log in to Splunk On-Call through SSO. Once all of the users have been listed, select :guilabel:`Next`.

.. image:: /_images/spoc/sso-okta7.png
    :width: 100%
    :alt: Add users who should have access to the Splunk On-Call app.

#. Select :guilabel:`Done`.


Once the users have added the app they will be directed to a one-time linking process to connect their Splunk On-Call credentials to Okta. To conduct the one-time linking process outside of the Okta Homepage, see :ref:`sso-linking`.


.. _sso-google-spoc::

Google Apps
================

To configure SSO for Splunk On-Call using Google Apps:

#. Access the Admin portal for Google Apps and navigate to :guilabel:`Apps` then :guilabel:`SAML Apps`.

.. figure:: images/SSO2.png
   :alt: VictorOps SSO Google Apps Setup 1

   VictorOps SSO Google Apps Setup 1
   .. image:: /_images/spoc/sso-okta7.png
       :width: 100%
       :alt: Add users 

-  Select “Set up my own custom app”:

.. figure:: images/SSO3.png
   :alt: VictorOps SSO Google Apps Setup 2

   VictorOps SSO Google Apps Setup 2

-  From the following screen, select *Option 2* to download IDP metadata
   in XML format.  Attach and send the downloaded .xml file to `Splunk
   On-Call
   Support <https://help.victorops.com/knowledge-base/important-splunk-on-call-support-changes-coming-nov-11th/>`__.

.. figure:: images/SSO4.png
   :alt: VictorOps SSO Google Apps Setup 4

   VictorOps SSO Google Apps Setup 4

-  Save the logo image file found
   `HERE <https://help.victorops.com/wp-content/uploads/2016/11/256x256-VictorOps-Oakleaf.png>`__.
-  Next, give the application a name (Splunk On-Call) and upload the
   logo file.

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

**OneLogin**
~~~~~~~~~~~~

-  Default relay state:
   https://portal.victorops.com/auth/sso/**org-slug-here**

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
