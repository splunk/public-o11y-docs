.. _sso-other-spoc:

*****************************************************************************************
Configure Single Sign-On for Splunk On-Call: Other IDPs
*****************************************************************************************

.. _sso-onelogin-spoc:

Configure OneLogin Single Sign-On for Splunk On-Call
=====================================================

If you are configuring SSO for OneLogin, the default relay state is: ``https://portal.victorops.com/auth/sso/<org-slug-here>``

.. _sso-azure-spoc:

Configure Azure Active Directory Single Sign-On for Splunk On-Call
======================================================================

If you are configuring SSO for Azure Active Directory, use the following values:

-  Identifier: :samp:`https://victorops.com`
-  Reply URL: :samp:`https://sso.victorops.com/sp/ACS.saml2`
-  Sign on URL: :samp:`https://portal.victorops.com/auth/sso/<<org-slug-here>>`
-  Relay State: :samp:`https://portal.victorops.com/auth/sso/<<org-slug-here>>`

.. _sso-aws-spoc:

Configure AWS IAM Identity Center - SAML Sign-On for Splunk On-Call
======================================================================

If you are configuring SSO for AWS IAM Identity Center:

#. In the IAM Identity Center console find the :guilabel:`Applications` tab.
#.  Select :guilabel:`Add Application` and look for VictorOps.
#.  In the configuration settings ensure you set the fields as follows:
     * :guilabel:`Application start URL`: :samp:`https://portal.victorops.com/auth/sso/ssoconfigtester`
     * :guilabel:`Relay state`: :samp:`https://portal.victorops.com/auth/sso/ssoconfigtester`
     * :guilabel:`Session duration`: 1 hour
     * :guilabel:`Application metadata`: Select :guilabel:`Manually type your metadata values`
     * :guilabel:`Application ACS URL`: :samp:`https://sso.victorops.com/sp/ACS.saml2`
     * :guilabel:`Application SAML audience`: :samp:`victorops.com`

.. image:: /_images/spoc/sso-aws1.png
    :width: 75%
    :alt: Application properties page.

.. image:: /_images/spoc/sso-aws2.png
    :width: 75%
    :alt: Application metadata page.