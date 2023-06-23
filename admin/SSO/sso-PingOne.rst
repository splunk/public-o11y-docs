.. _configure-sso-using-pingone:

.. _sso-ping-one:

*********************************************************************
Configure a PingOne SSO integration
*********************************************************************

.. meta::
   :description: Splunk Observability Cloud provides the capability for your users to log in using various SSO providers. The PingOne SSO integration allows you to log into Observability Cloud using PingOne.

The PingOne SSO integration allows you to log into Observability Cloud using PingOne.

Before you begin configuring the OneLogin SSO integration, ensure you have completed the steps in :new-page-ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

.. note:: To use this procedure, you must be an administrator of your PingOne
   organization and your Observability Cloud organization.

To set up your PingOne SSO integration, follow these steps:

Open a browser tab or window for Observability Cloud, and another for PingOne.

In Observability Cloud, do the following:
   #. Log in to Splunk Observability Cloud.
   #. Open the :new-page:`PingOne guided setup <https://login.signalfx.com/#/integrations/pingone/description>`. Optionally, you can navigate to the guided setup on your own:
 
      #. In the left navigation menu, select :menuselection:`Data Management`.
   
      #. Select :guilabel:`Add Integration`.
   
      #. In the integration filter menu, select :guilabel:`All`.
   
      #. In the :guilabel:`Search` field, search for :guilabel:`PingOne`, and select it.
   
   #. In the :guilabel:`Name` text box, enter a name for your PingOne SSO integration.
   #. Copy the value next to :guilabel:`Integration ID` so you can use it in a later step.

In PingOne, do the following:
   #. Select  :guilabel:`Applications`. A list of your installed applications appears.
   #. Select :guilabel:`Add Application`, and then select :menuselection:`Search Application Catalog`.
   #. In the search field, enter :guilabel:`SignalFx`. Select the :guilabel:`SignalFx` application.
   #. If the :guilabel:`Setup` is active, select it. A setup screen appears.

      If the :guilabel:`Setup` button is inactive, and you see the tooltip "You need to setup a connection first", then you might need to connect to an Identity Repository. To connect to an Identity Repository:
         #. At the top of the PingOne page, select :guilabel:`Setup`.
         #. Select :guilabel:`Connect to an Identity Repository`.
         #. Select the Identity Repository you want to use, select :guilabel:`Next` twice, then select :guilabel:`Finished`.

   #. Select :guilabel:`SignalFx`, then select :guilabel:`Setup`.
   #. Optional: Copy the configuration parameters to keep as a reference.
   #. Select :guilabel:`Continue to Next Step`.

Still in PingOne, continue the configuration:
   #. In the :guilabel:`ACS URL` field, a URL similar to ``https://api.signalfx.com/v1/saml/acs/<INTEGRATION_ID>`` appears.
   #. Replace ``<INTEGRATION_ID>`` with the integration ID you copied in a previous step.
   #. Confirm that the :guilabel:`ACS URL` and :guilabel:`Entity ID` URLs refer to your Observability Cloud realm.
   
      If your Observability Cloud organization uses the ``us0`` :ref:`realm <about-realms>`, enter the following:
         - ACS URL: ``https://api.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``
         - Entity ID: ``https://api.signalfx.com/v1/saml/metadata``

      If your Observability Cloud organization uses another realm, enter the following:
        - ACS URL: ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``
        - Entity ID: ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/metadata``

In PingOne, select :guilabel:`Continue to Next Step`. The :guilabel:`Attribute Mapping` screen appears.
   #. For :guilabel:`SAML_SUBJECT`:
       #. Select :guilabel:`Advanced`.
       #. In the :guilabel:`Name ID Format to send to SP` dropdown list, select :menuselection:`urn:oasis:names:tc:SAML:2.0:nameid-format:persistent`, then :guilabel:`Save`.
   #. Select other attributes as needed.

Select :guilabel:`Continue to Next Step`. The Group Access screen appears.
   #. Select the users who should have access to Observability Cloud. Select :guilabel:`Continue to Next Step`. The customization screen appears.
   #. Configure the :guilabel:`SignalFx` application, then select :guilabel:`Continue to Next Step`. The review screen appears.
   #. In the review screen that appears, do the following:
       #. Locate the :guilabel:`Certificate` field, then select :guilabel:`Download` to download the pingone-signing.crt file to your computer.
       #. Locate the :guilabel:`SAML Metadata` field, and then select the :guilabel:`Download` link to download the saml2-metadata-idp.xml file to your computer.
       #. :guilabel:`Finish`. The PingOne Applications list appears. In the list, :guilabel:`SignalFx` appears as an active application.

In Observability Cloud, do the following:
   #. Locate the :guilabel:`Certificate` text box.
   #. Select :guilabel:`Upload File`. A file system dialog box opens.
   #. To upload the certificate file, select the :guilabel:`pingone-signing.crt` file you downloaded in a previous step.
   #. After the upload, the text for :guilabel:`Certificate` changes to match the uploaded file.
   #. Locate the :guilabel:`Metadata` text box:
   #. :guilabel:`Upload File`. A file system dialog box opens.
   #. To upload the metadata file, select :guilabel:`saml2-metadata-idp.xml` file you downloaded in a previous step.
   #. After the upload, the text in the :guilabel:`Metadata` text box changes to match the uploaded file.
   #. :guilabel:`Save`. Observability Cloud displays a :strong:`Validated!` message.

The PingOne SSO integration is now available to users in your PingOne application. When users use the integration for the first time, they receive an email containing a link that they must open in order to authenticate. This only occurs the first
time the user signs in. Subsequent login attempts don't require validation.

If you want to turn off email authentication, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their Okta credentials instead. PingOne SSO authentication and Observability Cloud username/password authentication are independent.

Observability Cloud generates a password for users you create in PingOne SSO. If the PingOne login portal is unavailable, Observability Cloud users can use the reset password link on the Observability Cloud login page to get native Observability Cloud credentials.

.. include:: /_includes/troubleshooting-steps.rst
