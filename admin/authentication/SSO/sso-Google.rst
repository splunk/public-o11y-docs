.. _sso-google:

*********************************************************************
Configure a Google SSO integration
*********************************************************************

.. meta::
   :description: Configure the Google SSO integration to allow users in your Google domain to log in to the application using their Google credentials. 


.. note:: The Google SSO integration doesn't support integration-specific entity IDs.

The Google SSO integration lets users in your Google domain log in to the application
using their Google credentials.

Before you begin configuring the Google SSO integration, ensure you have completed the steps in :new-page-ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

To configure a Google SSO integration, you must be an administrator for your organization.
To learn more, see :new-page-ref:`manage_admin-access`.

.. note:: When you configure the Google SSO integration for a domain,
   everyone in the domain has access to the organization, even if they have not
   yet been added as an organization user.

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for :guilabel:`Google Sign-In`.
#. Select the :guilabel:`Google Sign-In` tile to open the Google Sign-In page.
#. To add Google SSO for a new domain, click :guilabel:`Add Domain`.

#. A Google dialog box appears. Select the email address associated with the Google domain that you want to add. For example, if you select the Google account ``myAddress@myGoogleDomain.com``, you add ``myGoogleDomain.com`` as the authenticated domain for logging in.

#. Exit the dialog box. The domain appears in the list of domains for the Google SSO integration.
   Anyone who has credentials for that domain can use them to log in to Observability Cloud.

If at least one Google domain has access to your organization, the option to sign in
with Google appears on the Observability Cloud login screen. If your organization
has a :ref:`custom URL<custom-url>`, the option to sign in with Google also appears on
the custom URL login page.

To remove a Google domain's login access:

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`. 
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for :guilabel:`Google Sign-In`.
#. Select the :guilabel:`Google Sign-In` tile to open the Google Sign-In page.
#. Select the "x" for the domain you want to remove.


.. TO-DO: Need a test account in order to figure out how to document integration-specific entity ID.

Configure a Google Cloud Identity SSO integration
=================================================================

The Google Cloud Identity (GCI) SSO integration lets users log in to Observability Cloud
using their Google Cloud credentials.

Before you proceed, review the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integration.

To configure GCI as an IdP using an Observability Cloud SSO integration,
you must be an administrator for your organization and a super-administrator of your Google domain.
To learn more, see :new-page-ref:`manage_admin-access`.

The :new-page:`G Suite Administrator Help document <https://support.google.com/a/answer/7623225?hl=en>`
topic, developed by Google, describes how to configure the integration.

After you complete these steps, the GCI SSO integration is available to
users in your GCI organization. When users log in to Observability Cloud
from GCI for the first time, they receive an email containing a link that
they must open in order to authenticate. This only occurs the first time the user
signs in. Subsequent login attempts don't require validation.

If you want to turn off the email authentication feature, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their GCI credentials instead. GCI SSO authentication and Observability Cloud username/password authentication are independent.

.. include:: /_includes/troubleshooting-steps.rst
