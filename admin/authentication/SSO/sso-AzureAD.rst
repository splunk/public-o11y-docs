.. _sso-azure:

**************************************************************************************
Configure a Microsoft Entra ID (formerly Azure Active Directory) SSO integration
**************************************************************************************

.. meta::
   :description: Configure the Microsoft Entra ID (formerly Azure Active Directory) integration to let users log in to Observability Cloud using their Entra ID account.

The Microsoft Entra ID (formerly Azure Active Directory) integration lets users log in to Observability Cloud using their Microsoft Entra ID account.

Before you begin configuring this integration, ensure you have completed the steps in :new-page-ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

To configure a Microsoft Entra ID SSO integration, you must be an administrator for your organization.
To learn more, see :new-page-ref:`admin-manage-users`.

.. note:: The procedure for creating multiple integrations for Microsoft Entra ID is
   different from the procedure for creating a single integration.

Configure Microsoft Entra ID for a single organization
--------------------------------------------------------------

For instructions, see :new-page:`Tutorial: Microsoft Entra ID single sign-on (SSO) integration with SignalFx <https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/signalfx-tutorial>` on the Microsoft documentation website.

Configure Microsoft Entra ID for multiple organizations
------------------------------------------------------------------------------------------

#. In a new browser tab or window, access :new-page:`Tutorial: Microsoft Entra ID single sign-on (SSO) integration with SignalFx <https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/signalfx-tutorial>` on the Microsoft documentation website.
#. After you complete step 7, do the following:

   #. In the Microsoft Entra ID integration tile, select :guilabel:`Integration-specific Entity ID`.
   #. Copy the URI that appears next to check box, so you can use it in steps 4a and 4b of
      the section :strong:`Step 3: Configure Microsoft Entra ID SSO`.
#. When you reach step 4a and 4b of :strong:`Step 3: Configure Microsoft Entra ID SSO`, use the
   integration-specific entity ID you copied from Splunk Observability Cloud instead of the
   URLs listed in the instructions.
#. Proceed with the rest of the instructions.

After you complete these steps, the Microsoft Entra ID SSO integration is available to users
in your Microsoft Entra ID organization. When users sign in to Splunk Observability Cloud
from Microsoft Entra ID for the first time, they receive an email containing a link that
they must open in order to authenticate. This only occurs the first time the user
signs in. Subsequent login attempts don't require validation.

If you want to turn off the email authentication feature, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their Microsoft Entra ID credentials instead. Microsoft Entra ID SSO authentication and Observability Cloud username/password authentication are independent.

.. include:: /_includes/troubleshooting-components.rst
