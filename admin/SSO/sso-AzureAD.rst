.. _sso-azure:

*********************************************************************
Configure an Azure Active Directory (Azure AD) SSO integration
*********************************************************************

.. meta::
   :description: Configure the Microsoft Azure Active Directory (Azure AD) integration to let users log in to Observability Cloud using their Azure AD account.


The Microsoft Azure Active Directory (Azure AD) integration lets users log in to Observability Cloud using their Azure AD account.

Before you begin configuring the Azure AD integration, ensure you have completed the steps in :new-page-ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

To configure an Azure AD SSO integration, you must be an administrator for your organization.
To learn more, see :new-page-ref:`manage_admin-access`.

.. note:: The procedure for creating multiple integrations for Azure AD is
   different from the procedure for creating a single integration.

Configure Azure AD for a single organization
--------------------------------------------------------------

For instructions, see :new-page:`Tutorial: Azure Active Directory single sign-on (SSO) integration with SignalFx <https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/signalfx-tutorial>` on the Microsoft documentation website.

Configure Azure AD for multiple organizations
------------------------------------------------------------------------------------------

#. In a new browser tab or window, access :new-page:`Tutorial: Azure Active Directory single sign-on (SSO) integration with SignalFx <https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/signalfx-tutorial>` on the Microsoft documentation website.
#. After you complete step 7, do the following:

   #. In the Azure AD integration tile, select :guilabel:`Integration-specific Entity ID`.
   #. Copy the URI that appears next to check box, so you can use it in steps 4a and 4b of
      the section :strong:`Step 3: Configure Azure AD SSO`.
#. When you reach step 4a and 4b of :strong:`Step 3: Configure Azure AD SSO`, use the
   integration-specific entity ID you copied from Observability Cloud instead of the
   URLs listed in the instructions.
#. Proceed with the rest of the instructions.

After you complete these steps, the Azure AD SSO integration is available to users
in your Azure AD organization. When users sign in to Observability Cloud
from Azure AD for the first time, they receive an email containing a link that
they must open in order to authenticate. This only occurs the first time the user
signs in. Subsequent login attempts don't require validation.

If you want to turn off the email authentication feature, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their Azure AD credentials instead. Azure AD SSO authentication and Observability Cloud username/password authentication are independent.

.. include:: /_includes/troubleshooting-steps.rst
