.. _sso-about:

*********************************************************************
About SSO integrations for Splunk Observability Cloud
*********************************************************************

.. meta::
   :description: Splunk Observability Cloud provides the capability for your users to log in using various SSO providers. Login service integration supports both Identity Provider-initiated SSO and Observability Cloud-initiated SSO. The latter lets your users log in to Observability Cloud using your organization's custom URL.

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


SSO integrations implement SAML 2.0 which is a standard for exchanging authentication and authorization information between an Identity Provider (IdP) such as Ping, Okta, AzureAD, OneLogin and a Service Provider (SP) such as Splunk Observability Cloud.  
When you setup a new SSO integration in Splunk Observability Cloud, you tell Splunk Observability Cloud that it can trust information from a particular IdP and use it for logging in users in an organization. After that trust is set up, users can login from the IdP in an IdP-initiated flow, which starts with a portal or an app page within the IdP, or using an SP-initiated flow from a Splunk Observability Cloud login page.

You can see the general SSO SAML flow in the following image:


.. image:: /_images/admin/sso-samlflow.png
      :width: 99%
      :alt: Diagram showing the back and forth flow of an IdP-initiated authentication request

Splunk Observability Cloud adds an additional security with email verification to guard against attacks between different organizations.

.. raw:: html

  <embed>
    <h2>Information required</h2>
  </embed>


When setting up SSO integration you need to provide information which will enable your IdP to trust Splunk Observability Cloud and Splunk Observability Cloud to trust your IdP. 

The following image shows Okta configuration information however, all IdPs require similar information.

.. image:: /_images/admin/sso-oktaexample.png
      :width: 90%
      :alt: The Okta SSO integration screen in Splunk Observability Cloud with text indicating the purpose of each field.

The IdP requires the following information:
  - Application ACS URL: Where to send the assertion. 
  - Application SAML audience: How Splunk Observability Cloud will identify itself.

Additionally, the IdP will need to know what parameters to sent to Splunk Observability Cloud.

.. image:: /_images/admin/sso-parameters.png
      :width: 90%
      :alt: The attributes that the IdP will send to Splunk Observability Cloud.

The product-specific integrations provide default values for most of these fields and you don't have to configure them manually.  When setting up Generic SAML or Active Directory FS, you need to provide all the values yourself. 

The following table uses Azure Active Directory as an example and shows the corresponding field names in Splunk Observability Cloud. Different IdPs may have slightly different field names. Example values are indicated in brackets.

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Splunk Observability Cloud field name`
     - :strong:`Azure Active Directory field name`

   * - :guilabel: `Integration ID` (EPAMIDfalsg)
     - :guilabel:`Reply URL`` (Assertion Consumer Service URL (https://<your_realm>/v1/saml/acsEPAMIDfalsg)
  
   * - :guilabel: `Integration-specific Entity ID`` (EPAMIDfalsg)
     - :guilabel:`Identifier (Entity ID)` (https://<your_realm>/v1/saml/acsEPAMIDfalsg)

   * - :guilabel: `Certificate (Base64)`  (upload file to replace)
     - :guilabel:`Certificate (Base64)` (download file)`
  
   * - :guilabel: `Integration ID` (EPAMIDfalsg)
     - :guilabel:`Reply URL (Assertion Consumer Service URL` (https://<your_realm>/v1/saml/acsEPAMIDfalsg)
   
   * - :guilabel: `Azure AD Identifier` (https://<domain>/081aaa5f-fsec-m01c-03dfalke45n)
     - :guilabel:`Azure AD Identifier`  (https://<domain>/081aaa5f-fsec-m01c-03dfalke45n)
     
   * - For the user attributes and claims, User.FullName or User.FirstName + User.LastName are required, in addition to PersonImmutableID and User.email.
     - :guilabel:`User.FirstName`  (user.givenname), :guilabel:`LastName` (user.surname), PersonImmutableID (user.userprincipal name), :guilabel:`FullName` (user.displayname), :guilabel:`email` (user.othermail)
     


.. raw:: html

  <embed>
    <h2>Configuration checklist</h2>
  </embed>


If you experience configuration issues, use this checklist of common misconfigurations.

  * :guilabel:`Entity ID` and :guilabel:`ACS URL` (also called :guilabel:`Reply URL`) point to the correct realm.
  * :guilabel:`Integration-specific Entity ID`, if used, and :guilabel:`ACS URL` contain the correct Integration ID.
  * :guilabel:`Entity ID` (also called :guilabel:`Metadata URL` or :guilabel:`SAML audience`) is the same in the IdP and Splunk Observability Cloud.  :guilabel:`Entity ID` can contain the Integration ID or not. Whether it is included is controlled by a checkbox in the Splunk Observability Cloud integration setup page. Make sure that the same Entity ID is configured in the IdP.
  * Check that claims are configured correctly. Claims are case sensitive. :code:`Email` won't work, it must be :code:`User.email`


.. raw:: html

  <embed>
    <h3>Troubleshooting
  </h3>
  </embed>

If you are still encountering configuration errors, review the following troubleshooting information for symptoms and potential solutions.

  * After the first redirect to the IdP, the IdP does not recognize the application.
  
    :strong:`Symptoms`
    This example is from AzureAD:

      :code:`AADSTS700016: Application with identifier 'https://api.signalfx.com/v1/saml/metadata/EiObDvcAYAA' was not found in the directory 'fa80159f-****-****-****-************'.`

    :strong:`Causes`
      * This can happen if the application has not been installed by the administrator of the tenant or consented to by any user in the tenant. 
      * You might have sent your authentication request to the wrong tenant. 
      * The IdP doesn't recognize the SignalFx identifier, which also called Metadata URL or Entity Id or Issuer URL.
    
    :strong:`Solutions`
      * Verify that the identifier (Metadata URL) points to the correct realm. 
      * Verify the Entity ID is correct.

* After login, the user ends up in a different organization than expected.
  
  :strong:`Symptom`
  The user ends up in a different organization than expected.

  :strong:`Cause`
    The likely cause is having more than one Splunk Observability Cloud integration configured your IdP and the IdP cannot distinguish between them. The user is sent to the wrong one, usually the first one configured.
  :strong:`Solution`
    Make sure that all of your SSO integrations have the :guilabel:`Entity ID` checked. Ensure that in the IdP, the Splunk Observability Cloud connection is configured to accept the new format of the Entity ID, which is displayed next to the checkbox and contains Integration ID in it.