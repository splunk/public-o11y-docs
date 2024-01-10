.. _sso-troubleshoot:

*********************************************************************
Troubleshoot your SSO integration
*********************************************************************

.. meta::
   :description: Common misconfigurations and troubleshooting information and resolutions.



If you experience configuration issues, check these common misconfigurations.

  * Confirm that :guilabel:`Entity ID` and :guilabel:`ACS URL`, also called :guilabel:`Reply URL` point to the correct realm.
  * Check whether :guilabel:`Integration-specific Entity ID`, if used, and :guilabel:`ACS URL` contain the correct Integration ID.
  * See whether :guilabel:`Entity ID`, also called :guilabel:`Metadata URL` or :guilabel:`SAML audience`, is the same in the IdP and Splunk Observability Cloud.  The :guilabel:`Entity ID` can contain the integration ID or not. Whether it is included is controlled by a checkbox in the Splunk Observability Cloud integration setup page. Make sure that the same Entity ID is configured in the IdP.
  * Check that claims are configured correctly. Claims are case sensitive. :code:`Email` doesn't work, so you must use :code:`User.email`.


If you are still encountering configuration errors, review the following troubleshooting information for symptoms and potential solutions.

After the first redirect to the IdP, the IdP does not recognize the application
---------------------------------------------------------------------------------
  
Symptom
*********

You might see this error message:

:code:`Application with identifier https://api.signalfx.com/v1/saml/metadata/EiObDvcAYAA was not found in the directory fa80159f-****-****-****-************.``


Causes
********

  * The IdP might not recognize the application if the application has not been installed by the administrator of the tenant or consented to by any user in the tenant. 
  * You might have sent your authentication request to the wrong tenant. 
  * The IdP doesn't recognize the identifier, which is also called Metadata URL, Entity Id, or Issuer URL.
    
Solutions
************

  * Verify that the Metadta URL identifier points to the correct realm. 
  * Verify the Entity ID is correct.


After logging in, the user ends up in a different organization than expected
-------------------------------------------------------------------------------
  
Cause
******

The likely cause is having more than one Splunk Observability Cloud integration configured your IdP and the IdP cannot distinguish between them. The user is sent to the wrong one, usually the first one configured.

Solutions
**********

Make sure that all of your SSO integrations have the :guilabel:`Entity ID` checked. Ensure that in the IdP, the Splunk Observability Cloud connection is configured to accept the new format of the Entity ID, which is displayed next to the checkbox and contains the Integration ID in it.


You receive a 404 error from Observability Cloud after you log in to the IdP.
-------------------------------------------------------------------------------
  

Symptom
*******
For example, you see an error message that says "Could not find credentials".
  .. image:: /_images/admin/sso-troubleshoot1.png
    :width: 50%
    :alt: A 404 error message stating "Could not find credentials".

Cause
******

Your configuration is pointing to the incorrect realm.
  
Solution
*********

Verify that the :guilabel:`ACS URL` contains the correct realm and :guilabel:`Integration ID`.


You receive a 401 error after you log in to the IdP
------------------------------------------------------
  
Symptom
*********
For example, you see an error message stating that authentication is required.
  .. image:: /_images/admin/sso-troubleshoot401.png
    :width: 50%
    :alt: A 401 error message stating "Authentication required".

Cause
******

The :code:`Subject` attribute in the assertion has a format other than :code:`Persistent`. The :code:`Subject` attribute identifies the subject of a SAML assertion, which is typically the user who is being authenticated. A :code:`Persistent` subject means that IdP guarantees that this attribute always stays the same for a given user. Observability Cloud requires the subject to be in Persistent format.

Solution
**********

Change the subject format to Persistent in the IdP settings.

You see an error message that your SAML provider is unsupported
-------------------------------------------------------------------
  
Symptom
*********

.. image:: /_images/admin/sso-troubleshoot-unsupported.png
  :width: 50%
  :alt: A 500 error message stating "Unsupported SAML provider".

Cause
******

For IdP specific integrations such as, PingOne, Okta, or OneLogin, Observability Cloud expects that the requests come from particular domains or URLs.

Solution
**********
    Use the generic SAML integration instead of the integration dedicated to your IdP. Most IdPs have built-in generic SAML 2.0 plugins that are used for this purpose. Enabling generic SAML requires additional actions. See :ref:`sso-generic`.

You don't see a login button on the login page
-------------------------------------------------
  
Cause
*******

Splunk Observability Cloud can render a login button only for organizations with a custom subdomain.

Solution
***********
Contact your CSM to request a custom URL.