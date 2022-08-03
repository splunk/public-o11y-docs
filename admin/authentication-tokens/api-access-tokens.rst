.. _admin-api-access-tokens:

***********************************
Create and manage API access tokens
***********************************

.. meta::
   :description: Learn how to how to create and manage API access tokens.

This topic describes how to obtain a user API access token. You can authenticate API requests with a user API access token (session token). User API access tokens expire after 30 days.

Some API requests require a user API access token associated with an organization user who has administrative access. These users are known as administrators.

If you're sending data to Infrastructure Monitoring, you can't use a user API access token in your API request. Instead, you need to use an :ref:`access token<admin-org-tokens>`.

Administrator User API access tokens
========================================
The following API requests require a user API access token associated with an administrator:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - :strong:`API`
     - :strong:`Task`

   * - Integration
     - Create, update, delete, or validate an integration

   * - Org token
     - Create, update, or delete an org (access) token, or rotate an org token secret

   * - Dashboards and dashboard groups
     - Change or remove write permissions for a user other than yourself

   * - Detectors
     - Change or remove write permissions for a user other than yourself

   * - Organizations
     - The following API requests require a User API access token associated with an administrator:

       * Retrieve information for your organization
       * Retrieve information for one or more organization users
       * Create, update, or delete a custom metric category
       * Invite a user to your organization
       * Invite a group of users to your organization
       * Grant administrative access to a user
       * Delete a user from your organization

   * - Teams
     - Create, update, or delete a team, or remove a team member other than yourself.

You can manage permissions on items for which you already have permissions, even if you're not an administrator.

If you're an administrator, you can see how a user created or updated an object using a particular user API access token by selecting :guilabel:`Info` from the object's :guilabel:`Actions` menu.

For example, to see information for a dashboard, select :menuselection:`Dashboard > Info` from the dashboard's :guilabel:`Actions` menu.

To track API calls by user, ask your users to obtain and use their own user API access token. If the token expires, your users can generate another one.

Create a User API access token
=================================

To create a user API access token:

#. Open the :guilabel:`Settings` menu.
#. Select :menuselection:`My Profile`, then click :guilabel:`Generate User API Access Token`.
#. Click :guilabel:`Show User API Access Token`.
#. To copy the token, click :guilabel:`Copy`.
#. After you copy the token, click :guilabel:`Hide` to prevent others from seeing the token.

After you generate and copy the user API access token, you can't see it again in your profile. Instead, generate a new token. You can generate as many as you want.

You don't need to delete your user API access tokens. Instead, you can let them expire.
