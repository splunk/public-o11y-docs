.. _single-sign-sso-google:

************************************************************************
Configure Single Sign-On for Splunk On-Call
************************************************************************

.. meta::
   :description: Enable Splunk On-Call SSO for your organization. 

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Full-Stack

To enable single sign-on (SSO) for your organization, you will need to provide an updated metadata file and your IDP. If you are interested in setting up SSO, please contact :ref:`Splunk On-Call Support <spoc-support>`.



Configure Single Sign On between your Identity Provider (IDP) and  Splunk On-Call. Our standard SSO setup uses SAML 2.0 protocol. As long as your IDP can use SAML 2.0 protocol, it can integrate with Splunk On-Call. The exact steps differ depending on which IDP you use, but the process typically involves exporting a .XML metadata file and sending it to our Support team. Once you have sent the .xml file, a Splunk On-Call support specialist will
complete the setup on the back-end and respond with confirmation.

If your IDP does not have SAML capability, please contact Splunk On-Call Support to explore what alternative options may be available. For details on how to contact Splunk On-Call Support, see :ref:`spoc-support`.


Administrator Setup
==========================

Instructions to complete the SSO configuration with Splunk On-Call and your IDP are provided for:

- :ref:`sso-okta-spoc`
- :ref:`sso-google-spoc`
- 


.. _sso-google-spoc:

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

   .. image:: /_images/spoc/sso-google4.png
       :width: 100%
       :alt: Splunk On-Call SSO Google Apps Setup 5

#. In the :guilabel:`Service Provider Details` step, enter the following values:
   - in the :guilabel:`ACS URL` field: https://sso.victorops.com:443/sp/ACS.saml2
   - in the :guilabel:`Entity ID` field: victorops.com
   - in the :guilabel:`Start URL` field, enter the following with the correct Organization Slug at the end: https://portal.victorops.com/auth/sso/<<org-slug-here>>.


#. Skip the attribute mapping step and select :guilabel:`Finish`.


