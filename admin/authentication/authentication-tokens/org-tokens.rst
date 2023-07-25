.. _admin-org-tokens:

********************************************************************************
Create and manage organization access tokens using Splunk Observability Cloud
********************************************************************************

.. meta::
   :description: Create and manage organization access tokens: defaults, manage, visibility, change a token, rename, or disable.

Access tokens, also known as org tokens, are long-lived organization-level tokens. You can use access tokens in all API requests except those that require a token associated with a user who has administrative access. See :ref:`admin-api-access-tokens` for more information.

Use access tokens to:

- Send data points to Infrastructure Monitoring with API calls.
- Run scripts that call the API.
- Manage your resource by tracking usage for different groups of users, services, teams, and so on. For example, you have users in the U.S. and Canada sending data to Infrastructure Monitoring. You can give each group its specific access token to compare the amount of data coming from each country.

.. note:: By default, only users who are administrators can search for and view all access tokens. You can change this default when you create or update an access token.

Token expiry 
================

Access tokens expire one year after the creation date. For access tokens created prior to February 28, 2022, the expiration date remains 5 years from the creation date. You can rotate a token before it expires using Splunk Observability Cloud APIs. For details, see :new-page:`Org Token <https://dev.splunk.com/observability/reference/api/org_tokens/latest>` in the developer documentation.

All of an organizations admins will receive an email 30 days before a token in their org expires. The email includes a link to the Splunk Observability Cloud user interface that displays a list of expiring tokens. These email notifications are sent to all org admins and can't be customized.

You can't rotate tokens after they expire. If you don't rotate a token before it expires, you must create a new token to replace it.

The default access token
===========================

By default, every organization has one organization-level access token. If you don't create any additional tokens, every API request that sends data to Infrastructure Monitoring must use this access token.

.. _manage-access-token:

Manage access tokens
=======================

To manage your access (org) tokens:

#. Open the :guilabel:`Settings` menu.
#. Select :menuselection:`Access Tokens`.
#. To find the access token in a large list, start entering its name in the search box. Infrastructure Monitoring returns matching results.
#. To look at the details for an access token, select the expand icon to the left of the token name.

   For information about the access token permissions allowed by the :guilabel:`Authorization Scopes` field value, see the permissions step in :ref:`create-access-token`.
#. If you're an organization administrator, the actions menu (|more| icon) appears to the right side of the token listing. You can select token actions from this menu.

#. To change the token visibility, follow these steps:

   #. To display the available permissions, select the right arrow in the :guilabel:`Access Token Permissions` box. The following
      permission options appear:

      * :menuselection:`Only Admins can Read`: Only admin users can view or read the new token. The token isn't visible to other users.
      * :menuselection:`Admins and Select Users or Teams can Read`: Admin users and users or teams you select can view or read the new token. The token isn't visible to anyone else.
      * :menuselection:`Everyone can Read`: Every user and team in the organization can view and read the token.
   #. To add permissions, select the left arrow below :guilabel:`Access Token Permissions`.
   #. If you selected :guilabel:`Admins and Select Users or Teams can Read`, select the users or teams to whom you want to give access:

      #. Select :guilabel:`Add Team or User`. Observability Cloud displays a list of teams and users in your organization.
      #. To find the team or username in a large list, start entering the name in the search box. Infrastructure Monitoring returns matching results.
         Select the user or team.
      #. If you need to add more teams or users, select :guilabel:`Add Team or User` again.

         .. note::

            You might see the following message in the middle of the dialog:

            You are currently giving permissions to a team with Restrict Access deactivated. This means any user can join this team and is  able to access this Access Token.

            This message means that all users are able to join the team and then view or read the access token.

      #. To remove a team or user, select the delete icon (:strong:`X`) next to the team or username.
   #. To update the token, select :guilabel:`Update`.


View and copy access tokens
==============================

To view the value of an access token, select the token name and then select :guilabel:`Show Token`.

To copy the token value, select :guilabel:`Copy`. You don't need to be an administrator to view or copy an access token.


.. _create-access-token:

Create an access token
==========================

.. note::

   To do the following tasks, you must be an organization administrator.

To create an access token:

#. Open the Observability Cloud main menu.
#. Select :menuselection:`Settings` and select :menuselection:`Access Tokens`.
#. Select :guilabel:`New Token`. If your organization has a long list of access tokens, you might need to scroll down to the bottom of the list to access this button.
#. Enter a unique token name. If you enter a token name that is already in use, even if the token is inactive, Infrastructure Monitoring doesn't accept the name.
#. Select an authorization scope for the token from one of the following values:    
   
   .. note:: Assign only one authorization scope to each token. Applying both the :strong:`API` and :strong:`Ingest` authorization scopes to the same token might raise a security concern.

   - :strong:`RUM Token`: Select this authorization scope to use the token to authenticate with RUM ingest endpoints. These endpoints use the following base URL: :code:`https://rum-ingest.<REALM>.signalfx.com/v1/rum`.
      
      .. caution::
         RUM displays the RUM token in URIs that are visible in a browser. To preserve security, you can't assign the :strong:`Ingest` or :strong:`API` authorization scope to a RUM token.

   - :strong:`Ingest Token`: Select this authorization scope to use the token to authenticate with data ingestion endpoints. These endpoints use the following base URLs:

        - POST :code:`https://ingest.<REALM>.signalfx.com/v2/datapoint`
        - POST :code:`https://ingest.<REALM>.signalfx.com/v2/datapoint/otlp`
        - POST :code:`https://ingest.<REALM>.signalfx.com/v2/event`
        - POST :code:`https://ingest.<REALM>.signalfx.com/v1/trace`

      For information about these endpoints, see :new-page:`Send Monitoring Metrics and Custom Events <https://dev.splunk.com/observability/docs/datamodel/ingest/>`.
   - :strong:`API Token`: Select this authorization scope to use the token to authenticate with Infrastructure Monitoring endpoints. Example use cases are Terraform, programmatic usage of the API for business objects, and so on. These endpoints use the following base URLs: 
        
        - :code:`https://api.<REALM>.signalfx.com`
        - :code:`wss://stream.<REALM>.signalfx.com`

      For information about these endpoints, see :new-page:`Summary of Splunk Infrastructure Monitoring API Endpoints <https://dev.splunk.com/observability/docs/apibasics/api_list/>`.

#. Edit the visibility permissions:

   #. To display the available permissions, select the right arrow in the :guilabel:`Access Token Permissions` box. The following
      permission options appear:

      * :menuselection:`Only Admins can Read`: Only admin users can view or read the new token. The token isn't visible to other users.
      * :menuselection:`Admins and Select Users or Teams can Read`: Admin users and users or teams you select can view or read the new token. The token isn't visible to anyone else.
      * :menuselection:`Everyone can Read`: Every user and team in the organization can view and read the token.
   #. To add permissions, select the left arrow below :guilabel:`Access Token Permissions`.
#. If you selected :guilabel:`Admins and Select Users or Teams can Read`, select the users or teams to whom you want to give access:

   #. Select :guilabel:`Add Team or User`. Observability Cloud displays a list of teams and users in your organization.
   #. To find the team or username in a large list, start entering the name in the search box. Infrastructure Monitoring returns matching results.
      Select the user or team.
   #. To add more teams or users, select :guilabel:`Add Team or User` again.

      .. note::

         You might see the following message in the middle of the dialog:

         You are currently giving permissions to a team with Restrict Access deactivated. This means any user can join this team and can access this Access Token.

         This message means that all users are able to join the team and then view or read the access token.

   #. To remove a team or user, select the delete icon (:strong:`X`) next to the team or username.
#. To create the new token, select :guilabel:`Create`.


Rename an access token
=========================

To rename a token:

#. Select :menuselection:`Edit Token` from the token's actions menu (|more|).
#. Enter a new name for the token.
#. Select :guilabel:`OK`.

Renaming a token does not affect the value of the token.

.. note::

   For :ref:`Cloud integrations (AWS, GCP, or Azure) <get-started-connect>`, after renaming an access token you need to select a new token name using the API. For AWS, you can also set up a new token :ref:`in the UI <aws-wizardconfig>`.

Deactivate or activate an access token
========================================

.. note::

   You can't delete tokens. You can only deactivate them.

To deactivate a token, select :menuselection:`Disable` from the token's actions menu (|more| icon).
The line that displays the token has a shaded background, which indicates that the
token is inactive. The UI displays deactivated tokens at the end of the tokens list,
after the activated tokens.

To activate a deactivated token, select :menuselection:`Enable` from the deactivated
token's actions menu (|more| icon). The line that displays the token has a light background,
which indicates that the token is inactive.
