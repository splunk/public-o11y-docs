.. _sso-one-login:

*********************************************************************
Configure a OneLogin SSO integration
*********************************************************************

.. meta::
   :description: Splunk Observability Cloud provides the capability for your users to log in using various SSO providers. he OneLogin SSO integration lets your users log in to Observability Cloud using OneLogin.



The OneLogin SSO integration lets your users log in to Observability Cloud using OneLogin.

Before you begin configuring the OneLogin SSO integration, ensure you have completed the steps in :new-page-ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

.. note:: To use this procedure, you must be an administrator of your OneLogin organization and your Observability Cloud organization.

Open a browser tab or window for Observability Cloud, and another for OneLogin.

In OneLogin, do the following:
   #. Select :menuselection:`Security` :strong:`>` :menuselection:`Certificates` :strong:`>` :menuselection:`New`.
   #. Configure the certificate according to your organization security policy.
   #. Make sure to pick :guilabel:`SHA256` or better for the algorithm in the :guilabel:`Signature` field.
   #. Copy the value of the :guilabel:`X.509 certificate` text box and and save it in a text editor so you can use it in the next steps.
   #. Add Observability Cloud by selecting :menuselection:`Apps` :strong:`>` :menuselection:`Add Apps` :strong:`>` :guilabel:`SignalFx`.
   #. In the dialog box, make any changes you want, then click :guilabel:`Save`.
   #. Select :guilabel:`SSO` to open the SSO configuration page.
   #. Select :guilabel:`SHA-256` in the :guilabel:`SAML Signature Algorithm` box.
   #. Copy the value of the :guilabel:`Issuer URL` text box and save it in a text editor so you can use it in the next steps.

Back in Observability Cloud:
   #. Log in to Splunk Observability Cloud.
   #. Open the :new-page:`OneLogin guided setup <https://login.signalfx.com/#/integrations/onelogin/description>`. Optionally, you can navigate to the guided setup on your own:
    
      #. In the left navigation menu, select :menuselection:`Data Management`.
   
      #. Select :guilabel:`Add Integration`.
   
      #. In the integration filter menu, select :guilabel:`All`.
    
      #. In the :guilabel:`Search` field, search for :guilabel:`OneLogin`, and select it.
   
   #. In the :guilabel:`Name` text box, enter the name for your integration.
   #. Copy the :guilabel:`Integration ID` value.

Switch to OneLogin:
   #. Go to the :guilabel:`Configuration` tab, then paste the integration ID into the :guilabel:`SignalFx ID` text box.
   #. In the SignalFx subdomain, enter ``api.<YOUR_REALM>``

In Observability Cloud:
   #. Copy the value of :guilabel:`X.509 certificate` from the text editor and paste it into the :guilabel:`Public Key` text box.
   #. Copy the value of :guilabel:`Issuer URL` from the text editor and paste it into the :guilabel:`Issuer URL` text box.
   #. Select :guilabel:`Save`. The message :guilabel:`Validated!` appears. If you get an error, check the values that you copied and pasted.

The OneLogin SSO integration is now available to users in your OneLogin App portal. When users use the integration for the first time, they receive an email containing a link that they must open in order to authenticate. This only occurs the first
time the user signs in. Subsequent login attempts don't require validation.

If you want to turn off email authentication, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their OneLogin SSO credentials instead. OneLogin SSO authentication and Observability Cloud username/password authentication are independent.

Observability Cloud generates a password for users you create in OneLogin SSO. If the OneLogin portal is unavailable, Observability Cloud users can use the reset password link on the Observability Cloud login page to get native Observability Cloud credentials.

.. include:: /_includes/troubleshooting-steps.rst
