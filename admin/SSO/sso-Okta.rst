.. _sso-okta:

*********************************************************************
Configure an Okta SSO integration
*********************************************************************

.. meta::
   :description: Splunk Observability Cloud provides the capability for your users to log in using various SSO providers. The Okta SSO integration lets you log into Observability Cloud using Okta.


The Okta SSO integration lets you log into Observability Cloud using Okta.

Before you begin to configure the Okta SSO integration, ensure you have completed the steps in :new-page-ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

.. caution:: To follow this procedure, you must be an administrator of your Okta organization and an administrator of your Observability Cloud organization.

Open a browser tab or window for Observability Cloud, and another for Okta.

Switch to Okta, then follow these steps to add Observability Cloud as an Okta application:
   #. Select :guilabel:`Admin`, then select :guilabel:`Applications`
   #. Select :guilabel:`Add Application`.
   #. In the directory that appears, find for :guilabel:`SignalFx`, then add it by selecting :guilabel:`Add`.

Switch to Observability Cloud:
   #. Log in to Splunk Observability Cloud.
   #. Open the :new-page:`Okta guided setup <https://login.signalfx.com/#/integrations/okta/description>`. Optionally, you can navigate to the guided setup on your own:

      #. In the left navigation menu, select :menuselection:`Data Management`.
   
      #. Select :guilabel:`Add Integration`.
   
      #. In the integration filter menu, select :guilabel:`All`.
   
      #. In the :guilabel:`Search` field, search for :guilabel:`Okta`, and select it.
   
   #. In the :guilabel:`Name` text box, enter the name of your integration.
   #. Copy the :guilabel:`Integration ID` value. Even if you have multiple organizations that you want to integrate with Okta SSO, leave :guilabel:`Integration-specific Entity ID` deselected. The Observability Cloud Okta integration provides this automatically for multiple organizations.

Switch back to Okta:
   #. Paste the integration ID value into the :guilabel:`Integration ID` text box, then select :guilabel:`Next`.
   #. Assign the :guilabel:`SignalFx` application to users in your Okta organization, then select :guilabel:`Next`.
   #. Select :guilabel:`Sign on`, then select :guilabel:`View Setup instructions`.
   #. Copy the following strings from the instructions, and paste them into a text editor:
      * :guilabel:`Public Key`
      * :guilabel:`Issuer URL`
      * :guilabel:`Metadata URL`
   
.. note:: URLs must belong to Okta in order to validate. Accepted domains are ``okta.com``, ``oktapreview.com``, and ``okta-emea.com``.

Switch to Observability Cloud to finish:
   #. Copy and paste the Okta :guilabel:`Public Key` value into the :guilabel:`Public Key` text box.
   #. Copy and paste the Okta :guilabel:`Issuer URL` value into the :guilabel:`Issuer URL` text box.
   #. Copy and paste the Okta :guilabel:`Metadata URL` value into the :guilabel:`Metadata URL` text box.
   #. Select :guilabel:`Save`. The message :guilabel:`Validated!` appears. 

.. note:: If you get an error, check the values that you copied and pasted.

The Okta SSO integration is now available to users in your Okta organization. When users log in to Observability Cloud from Okta for the first time, they receive an email containing a link that they must open in order to authenticate. This only occurs the first time the user signs in. Subsequent login attempts don't require validation.

If you want to turn off email authentication, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their Okta credentials instead. Okta SSO authentication and Observability Cloud username/password authentication are independent.

Observability Cloud generates a password for users you create in Okta SSO. If the Okta login portal is unavailable, Observability Cloud users can use the reset password link on the Observability Cloud login page to get native Observability Cloud credentials.

.. include:: /_includes/troubleshooting-steps.rst
