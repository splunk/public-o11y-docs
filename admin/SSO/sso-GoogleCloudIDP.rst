.. _sso-google-cloud-identity:

*********************************************************************
Configure a Google Cloud Identity SSO integration
*********************************************************************

.. meta::
   :description: Splunk Observability Cloud provides the capability for your users to log in using various SSO providers. The Google Cloud Identity (GCI) SSO integration lets users log in to Observability Cloud using their Google Cloud credentials.

The Google Cloud Identity (GCI) SSO integration lets users log in to Observability Cloud
using their Google Cloud credentials.

Before you begin to configure the Google Cloud Identity integration, ensure you have completed the steps in :new-page-ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

To configure GCI as an IdP using an Observability Cloud SSO integration,
you must be an administrator for your organization and a super-administrator of your Google domain.
To learn more, see :new-page-ref:`manage_admin-access`.

The :new-page:`G Suite Administrator Help document <https://support.google.com/a/answer/7623225?hl=en>`
topic, developed by Google, describes how to configure the integration.

After you complete these steps, the GCI SSO integration is available to
users in your GCI organization. When users sign in to Observability Cloud
from GCI for the first time, they receive an email containing a link that
they must open in order to authenticate. This only occurs the first time the user
signs in. Subsequent login attempts don't require validation.

If you want to turn off the email authentication feature, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their GCI credentials instead. GCI SSO authentication and Observability Cloud username/password authentication are independent.

.. include:: /_includes/troubleshooting-steps.rst
