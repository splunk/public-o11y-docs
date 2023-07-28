.. _sso-generic:

*********************************************************************
Configure SSO using a generic SAML SSO integration
*********************************************************************

.. meta::
   :description: Prerequisites and installation steps to configure SSO using a generic SAML SSO integration. 

.. caution::  This integration can send credential information to unverified destinations. Although you can use generic SAML SSO integrations to authenticate users, Observability Cloud doesn't support these integrations as your primary authentication mechanism. The Observability Cloud support team can't help you diagnose or repair problems you encounter while trying to authenticate users using generic SSO integrations, aside from ensuring that the integration itself is working.

If you use an SSO login service other than the ones listed in :ref:`sso-label`, you can create a generic SAML SSO integration for your organization. 

Before you begin configuring the generic SAML SSO integration, ensure you have completed the steps in :new-page-ref:`sso-label`, including the section :ref:`Name an SSO integration<naming-note-sso>` to learn about naming your integrations.

If you already have a SAML SSO integration for your organization, follow the steps in :ref:`saml-install` to install it in Observability Cloud.

.. _saml-creators:

Generic SAML SSO integrations
-------------------------------------------------------

Observability Cloud provides integrations for specific SAML SSO providers. If your provider isn't in the list of supported integrations, your organization administrator can request a generic integration from Observability Cloud. You can use this integration to test and develop a SAML SSO provider. Using this integration, administrators can direct Observability Cloud
to use any publicly-available SSO endpoint to authenticate users.

To permit the generic SAML SSO integration, contact :ref:`support`.

Be prepared to provide the domain for the ID/email address that your users provide when they log in. The domain is the part of the user ID/email address string that follows the ``@`` sign.

.. note::  You can only use one type of ``PersonImmutableID`` for each generic SAML integration you create. If you create a second generic SAML integration using the same ``PersonImmutableID``, you must deactivate the first one and delete its users. Until you do so, users will not be able to use the same type of ID to log in to the organization. For example, if the first integration uses the  ``emailId`` as the PersonImmutableID, you can't use ``emailId`` in a second integration. 
   For details on how to use the API to delete users, see :new-page:`Delete/organization/member <https://dev.splunk.com/observability/reference/api/organizations/latest#endpoint-delete-member-using-id>`.


Information required for generic SAML SSO integrations
----------------------------------------------------------------
:strong:`User information`

* One of:
   * ``User.FirstName`` and ``User.LastName``: User's first and last name
   * ``User.FullName``: User's full name
* ``User.email``: User's email address
* ``PersonImmutableID``: A unique identifier for this user

:strong:`ACS URL`

* Some ACS URLs include realm information. To learn more, see :ref:`Note about realms<about-realms>`.
* The ACS URL includes an integration ID that's unique for each integration.
* The SAML page displays this ID.

The URL has one of the following formats:
   * If your organization uses the ``us0`` realm: ``https://api.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``
   * If your organization uses a realm other than ``us0``: ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``

:strong:`<ENTITY-ID>`, which is the entity ID displayed when you start creating a new integration.

* If you have a single organization, enter the following entity ID:
   * If your organization uses the ``us0`` realm, enter the following: ``https://api.signalfx.com/v1/saml/metadata/<ENTITY-ID>``
   * If your organization uses a realm other than ``us0``, enter the following: ``https://api.<YOUR_REALM>.signalfx.com/v1/saml/metadata<ENTITY-ID>``

* If you have multiple organizations that you want to integrate with a single IdP, do the following:
   #. Select :guilabel:`Integration-specific Entity ID`. Next to the option, the integration-specific entity ID appears in the form of a URI.
   #. Copy the entity ID and provide it when you configure the login service to communicate with Observability Cloud.

:strong:`Assertion Signature`

The SSO provider must put the assertion signature in the assertion message, not in the request itself. The assertion must be signed with the SHA256 algorithm or better.

:strong:`RelayState`

Observability Cloud sends a dynamic RelayState, so the SSO provider must accept and pass back the dynamic RelayState. RelayState is part of SAML specifications. In the Splunk Observability Cloud system it is part of message context in the AuthN request that is sent to the identity provider. The message context also contains a token that can be verified on the service provider side later. The Relay State is set by the Splunk Observability Cloud system and sent with the request to the IDP. The IDP is expected to send the relay state back to the service provider with the same value that was received after a successful authentication on the IDP side. 

.. _saml-install:

Install a generic SAML SSO integration
-------------------------------------------------

This section describes how to install a generic SAML SSO integration that your organization
has implemented.

.. _generic-sso-prerequisites:

Prerequisites
^^^^^^^^^^^^^^^^^^^^^^^

Before you start an installation, you need the following information:

* :strong:`Name`: Descriptive name that appears in the Generic SAML SSO tile.
* :strong:`Public key`: The SAML provider's public key, which must be signed with the SHA256 algorithm or better.
* :strong:`Issuer URL`: The issuer URL provided by the SSO provider.
* One of the following:
   - A publicly-accessible metadata URL provided by the SSO provider.
   - Metadata for the SSO provider in XML format. The entity ID that the provider sends as part of the metadata must match the issuer URL.

If you use multiple email domains in a single Splunk Observability Cloud organization (for example, kai@example.com and deepu@examplehq.com), contact :ref:`support` for help with enabling multiple domains.

Steps
^^^^^^^^^^^^^^^

To install a generic SAML SSO integration, follow these steps:

   #. Log in to Splunk Observability Cloud.
   #. Open the :new-page:`SAML guided setup <https://login.signalfx.com/#/integrations/saml/description>`. Optionally, you can navigate to the guided setup on your own:
      #. In the left navigation menu, select :menuselection:`Data Management`.
   
      #. Select :guilabel:`Add Integration`.
   
      #. In the integration filter menu, select :guilabel:`All`.
   
      #. In the :guilabel:`Search` field, search for :guilabel:`SAML`, and select it.
   
   #. In the :guilabel:`Name` field, enter the name for this integration. If your organization has a :ref:`custom URL<custom-url>`, this name appears as the text for the button users select to log in (see the section :ref:`Name an SSO integration<naming-note-sso>`).
   #. In the remaining fields, enter the information you gathered in the :ref:`generic-sso-prerequisites` section.
   #. :guilabel:`Save`. The message :strong:`Validated!` appears.

The generic SSO integration is now available to users of the SSO provider. When users use the integration for the first time, they receive an email containing a link that they must open in order to authenticate. This only occurs the first
time the user signs in. Subsequent login attempts don't require validation.

If you want to turn off email authentication, contact :ref:`support`.

Once you have a custom URL configured, your users can continue to log in using their existing username/password pair, or they can use their generic SAML SSO credentials instead. Generic SAML SSO authentication and Observability Cloud username/password authentication are independent.

Observability Cloud generates a password for users you create in generic SAML SSO. If the generic SAML login portal is unavailable, Observability Cloud users can use the reset password link on the Observability Cloud login page to get native Observability Cloud credentials.

.. include:: /_includes/troubleshooting-steps.rst
