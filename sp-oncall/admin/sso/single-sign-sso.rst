.. _single-sign-sso:

************************************************************************
Configure Single Sign-On for Splunk On-Call
************************************************************************

.. meta::
   :description: Enable Splunk On-Call SSO for your organization. 

.. toctree::
   :hidden: 

   sso-okta-spoc
   sso-google-spoc
   sso-onelogin-spoc
   sso-azure-spoc
   sso-aws-spoc

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
- :ref:`sso-azure-spoc`
- :ref:`sso-aws-spoc`



.. _sso-onelogin-spoc:


OneLogin
-------------

If you are configuring SSO for OneLogin, the Default relay state is:

   https://portal.victorops.com/auth/sso/<<org-slug-here>>


.. _sso-azure-spoc:


Azure Active Directory (SAML-based Sign-on)
-------------------------------------------------------

If you are configuring SSO for Azure Active Directory, use the following values:

-  Identifier: https://victorops.com
-  Reply URL: https://sso.victorops.com/sp/ACS.saml2
-  Sign on URL: https://portal.victorops.com/auth/sso/<<org-slug-here>>
-  Relay State: https://portal.victorops.com/auth/sso/<<org-slug-here>>


.. _sso-aws-spoc:

AWS IAM Identity Center - SAML
-------------------------------------------------------

If you are configuring SSO for AWS IAM Identity Center:


#. In the IAM Identity Center console find the :guilabel:`Applications` tab.
#.  Select :guilabel:`Add Application` and look for VictorOps.
#.  In the configuration settings ensure you set the fields as follows:

   -  Important: Ensure the Session Duration is set to 1hour.

.. image:: /_images/spoc/sso-aws1.png
    :width: 100%
    :alt: Application properties page.

.. image:: /_images/spoc/sso-aws2.png
    :width: 100%
    :alt: Application metadata page.