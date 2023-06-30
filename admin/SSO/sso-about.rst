.. _sso-about:

*********************************************************************
About SSO integrations for Splunk Observability Cloud
*********************************************************************

.. meta::
   :description: An overview of key SSO configuration parameters and common troubleshooting solutions.

.. toctree::
   :hidden:

   sso
   sso-ADSF
   sso-AzureAD
   sso-Google
   sso-GoogleCloudIDP
   sso-Okta
   sso-OneLogin
   sso-PingOne
   sso-GeneralSAML
   sso-troubleshoot


Single-sign on (SSO) integrations implement SAML 2.0, which is a standard for exchanging authentication and authorization information between an identity provider (IdP) such as Ping, Okta, AzureAD, or OneLogin and a service provider (SP) such as Splunk Observability Cloud.  
When you set up a new SSO integration in Splunk Observability Cloud, you authorize Splunk Observability Cloud to trust information from a particular IdP and use it for logging in users in an organization. After that trust is set up, users can log in from the IdP in an IdP-initiated flow, which starts with a portal or an app page within the IdP, or using an SP-initiated flow from a Splunk Observability Cloud login page (only available if your org has a custom domain configured).

You can see the general SSO SAML flow in the following image:


.. image:: /_images/admin/sso-samlflow.png
      :width: 90%
      :alt: Diagram showing the back and forth flow of an IdP-initiated authentication request

Splunk Observability Cloud adds additional security with email verification to guard against attacks between different organizations.

.. raw:: html

  <embed>
    <h2>Information required</h2>
  </embed>


When setting up SSO integration, you need to provide information that permits your IdP to trust Splunk Observability Cloud and Splunk Observability Cloud to trust your IdP. 

The following image shows Okta configuration information, however, all IdPs require similar information.

.. image:: /_images/admin/sso-oktaexample.png
      :width: 80%
      :alt: The Okta SSO integration screen in Splunk Observability Cloud with text indicating the purpose of each field.

The IdP requires the following information:
  - Application ACS (Assertion Consumer Service) URL: Where to send the assertion. 
  - Application SAML audience: How Splunk Observability Cloud identifies itself.

Additionally, the IdP needs to know what parameters to send to Splunk Observability Cloud. The following image shows the AWS attribute mappings for the SAML assertion.

.. image:: /_images/admin/sso-parameters.png
      :width: 90%
      :alt: The attributes that the IdP sends to Splunk Observability Cloud.

The product-specific integrations provide default values for most of these fields and you don't have to configure them manually.  When setting up generic SAML or Active Directory Federation Searches (FS), you need to provide all the values yourself. 

The following table uses Azure Active Directory as an example and shows the corresponding field names in Splunk Observability Cloud. Different IdPs may have slightly different field names. Example values are indicated in brackets.

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Splunk Observability Cloud field name`
     - :strong:`Azure Active Directory field name`

   * - :guilabel:`Integration ID` (EPAMIDfalsg)
     - :guilabel:`Reply URL` (Assertion Consumer Service URL) (https://your_realm/v1/saml/acsEPAMIDfalsg)
  
   * - :guilabel:`Integration-specific Entity ID`` (EPAMIDfalsg)
     - :guilabel:`Identifier (Entity ID)` (https://your_realm/v1/saml/acsEPAMIDfalsg)

   * - :guilabel:`Certificate (Base64)`  (upload file to replace)
     - :guilabel:`Certificate (Base64)` (download file)`
  
   * - :guilabel:`Integration ID` (EPAMIDfalsg)
     - :guilabel:`Reply URL (Assertion Consumer Service URL)` (https://your_realm/v1/saml/acsEPAMIDfalsg)
   
   * - :guilabel:`Azure AD Identifier` (https://your_domain/081aaa5f-fsec-m01c-03dfalke45n)
     - :guilabel:`Azure AD Identifier`  (https://your_domain/081aaa5f-fsec-m01c-03dfalke45n)
     
   * - For user attributes and claims, :code:`FullName` or :code:`User.FirstName` and :code:`User.LastName` are required, in addition to :code:`PersonImmutableID` and :code:`User.email`
     - :guilabel:`User.FirstName`  (user.givenname), :guilabel:`LastName` (user.surname), PersonImmutableID (user.userprincipal name), :guilabel:`FullName` (user.displayname), :guilabel:`email` (user.othermail)
     


