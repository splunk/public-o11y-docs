.. _admin-org-tokens:

********************************************
Create and manage organization access tokens
********************************************

.. meta::
   :description: Learn how to how to create and manage organization access tokens

Access tokens, also known as org tokens, are long-lived organization-level tokens.
By default, these tokens persist for five years so that you can use them in API
calls that continually send data points to Infrastructure Monitoring. You can also
use them in any continually-running scripts that call the API.

You can also use access tokens to track usage for different groups of users. This
feature helps you track and manage your resource usage. For example, if you have
users in the U.S. and Canada sending data to Infrastructure Monitoring gives each
group its specific access token. You can then compare the amount of data coming
from each country.

You can't use access tokens for API requests that are associated with an administrator. See :ref:`admin-api-access-tokens` for more information.

.. note:: All access tokens are available to any user in your organization, so
   you can't restrict access to specific tokens. Instead, use your company's
   security and management procedures to let users know which token you want
   them to use.

The default access token
===========================
By default, every organization has one organization-level access token. If you don't
create any additional tokens, every API request that sends data to Infrastructure
Monitoring must use this access token.


Manage access tokens
=======================

To manage your access (org) tokens:

#. Open the :guilabel:`Settings` menu.

#. Hover over :menuselection:`Organization Settings`, then select :menuselection:`Access Tokens`.

#. To find an access token in a large list, start entering its name in the search box. Infrastructure Monitoring returns matching results.

#. To look at the details for an access token, click the expand icon to the left of the token name.

   For information about the access token permissions enabled by the :guilabel:`Authorization Scopes` field value, see the permissions step in :ref:`create-access-token`.

#. If you're an organization administrator, the :guilabel:`Actions` menu appears on the right side of the token listing. You can select token actions from this menu.

View and copy access tokens
==============================

To view the value of an access token, click the token name and then click
:guilabel:`Show Token`.

To copy the token value, click :guilabel:`Copy`. You don't need to be an administrator to
view or copy an access token.


.. _create-access-token:

Create an access token
==========================

.. note::

   To perform the following tasks, you must be an organization administrator.

To create an access token:

#. Open the Observability Cloud main menu.

#. Hover over :guilabel:`Organization Settings` and select :guilabel:`Access Tokens`.

#. Click :guilabel:`New Token`. If your organization has a long list of access tokens, you might need to scroll down to the bottom of the list to access this button.

#. Provide a unique token name. If you enter a token name that is already in use, even if the token is disabled, Infrastructure Monitoring won't accept the name.

#. Select the permissions you want to set for the token. Use the principle of "least privilege". Select options that create a token with the most restrictive permissions needed for the operations that use the token. Select from the following values:

   * :guilabel:`RUM Token`: Select this option to use the token to authentication with RUM ingestion endpoints that use the following base URL: :code:`https://rum-ingest.<REALM>.signalfx.com/v1/rum`

      .. caution:: RUM functionality displays the RUM token in URIs that are visible in a browser. For this reason, we preserve security by not allowing you to assign the :guilabel:`Ingest Token` or :guilabel:`API Token` permission to a RUM token.

   * :guilabel:`Ingest Token`: Select this option to use the token to authenticate with ingestion-related endpoints only. Here are the endpoints that accept an Ingest Token as authentication:

        * POST :code:`https://ingest.<REALM>.signalfx.com/v2/datapoint`

        * POST :code:`https://ingest.<REALM>.signalfx.com/v2/event`

        * POST :code:`https://ingest.<REALM>.signalfx.com/v1/trace`

        For information about these endpoints, see :new-page:`Send Monitoring Metrics and Custom Events <https://dev.splunk.com/observability/docs/datamodel/ingest/>`

   * :guilabel:`API Token`: Select this option to use the token to authenticate with Infrastructure Monitoring endpoints that don’t do ingestion. These endpoints have base URLs with the formats :code:`https://api.<REALM>.signalfx.com` and :code:`wss://stream.<REALM>.signalfx.com`.

      For information about these endpoints, see :new-page:`Summary of Splunk Infrastructure Monitoring API Endpoints <https://dev.splunk.com/observability/docs/apibasics/api_list>`

#. Click :guilabel:`OK`.


Rename an access token
=========================

To rename a token:

#. Select :menuselection:`Rename Token` from the token's :guilabel:`Actions` menu.
#. Enter a new name for the token.
#. Click :guilabel:`OK`.

 Renaming a token does not affect the value of the token.

Disable or enable an access token
=====================================

 .. note::

    You can't delete tokens; you can only disable them.

To disable a token, select :menuselection:`Disable` from the token's Actions menu.
The line that displays the token has a shaded background, which indicates that the
token is disabled. The UI displays disabled tokens at the end of the tokens list,
after the enabled tokens.

To re-enable a disabled token, select :menuselection:`Enable` from the disabled
token's Actions menu. The line that displays the token has a light background,
which indicates that the token is enabled.
