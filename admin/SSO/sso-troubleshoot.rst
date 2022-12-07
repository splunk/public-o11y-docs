.. _sso-troubleshoot:

*********************************************************************
Troubleshoot your SSO integration
*********************************************************************

.. meta::
   :description: Common misconfigurations and troubleshooting information and resolutions.



Configuration checklist
=======================


If you experience configuration issues, use this checklist of common misconfigurations.

  * :guilabel:`Entity ID` and :guilabel:`ACS URL` (also called :guilabel:`Reply URL`) point to the correct realm.
  * :guilabel:`Integration-specific Entity ID`, if used, and :guilabel:`ACS URL` contain the correct Integration ID.
  * :guilabel:`Entity ID` (also called :guilabel:`Metadata URL` or :guilabel:`SAML audience`) is the same in the IdP and Splunk Observability Cloud.  :guilabel:`Entity ID` can contain the Integration ID or not. Whether it is included is controlled by a checkbox in the Splunk Observability Cloud integration setup page. Make sure that the same Entity ID is configured in the IdP.
  * Check that claims are configured correctly. Claims are case sensitive. :code:`Email` won't work, it must be :code:`User.email`


Troubleshooting
------------------

If you are still encountering configuration errors, review the following troubleshooting information for symptoms and potential solutions.

  * After the first redirect to the IdP, the IdP does not recognize the application.
  
    :strong:`Symptoms`
      This example is from AzureAD:

      :code:`AADSTS700016: Application with identifier 'https://api.signalfx.com/v1/saml/metadata/EiObDvcAYAA' was not found in the directory 'fa80159f-****-****-****-************'.`

    :strong:`Causes`
      * This can happen if the application has not been installed by the administrator of the tenant or consented to by any user in the tenant. 
      * You might have sent your authentication request to the wrong tenant. 
      * The IdP doesn't recognize the identifier, which also called Metadata URL or Entity Id or Issuer URL.
    
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

* You receive a 404 error from Observability Cloud after you log in to the IdP.
  
  :strong:`Symptom`
    .. image:: /_images/admin/sso-troubleshoot1.png
      :width: 50%
      :alt: A 404 error message stating "Could not find credentials".

  :strong:`Cause`
    The likely cause is that your configuration is pointing to the incorrect realm.
  :strong:`Solution`
    Verify that the :code:`ACS URL` contains the correct realm and :code:`Integration ID`.

* You receive a 401 error after you log in to the IdP.
  
  :strong:`Symptom`
    .. image:: /_images/admin/sso-troubleshoot401.png
      :width: 50%
      :alt: A 401 error message stating "Authentication required".

  :strong:`Cause`
    Most likely the :code:`Subject` attribute in the assertion has a format other than :code:`Persistent`. :code:`Subject` identifies the subject of a SAML assertion, which is typically the user who is being authenticated. A :code:`Persistent` subject means that IdP guarantees that this attribute will always stay the same for a given user. Observability Cloud requires the subject to be in persistent format.
  :strong:`Solution`
    Change the subject format to persistent in the IdP settings.

* You see an error message that your SAML provider is unsupported.
  
  :strong:`Symptom`
    .. image:: /_images/admin/sso-troubleshoot-unsupported.png
      :width: 50%
      :alt: A 500 error message stating "Unsupported SAML provider".

  :strong:`Cause`
    For IdP specific integrations for example, PingOne, Okta, OneLogin,  Observability Cloud expects that the requests will be coming from particular domains or URLs.
  :strong:`Solution`
    Use the Generic SAML integration instead of the integration dedicated to your IdP. Most IdPs have built-in generic SAML 2.0 plugins which should be used for this purpose. Enabling generic SAML requires additional actions :ref:`sso-generic`.
 
* You don't see a login button on the login page.
  
  :strong:`Symptom`
    As stated, the login button is not visible.

  :strong:`Cause`
    Splunk Observability Clound can render a login button only for orgs with a custom subdomain.
  :strong:`Solution`
    Contact your CSM to request a custom URL.
     