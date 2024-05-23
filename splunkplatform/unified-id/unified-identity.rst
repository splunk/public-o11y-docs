.. _unified-id-unified-identity:

******************************************************************************************
Unified Identity: Splunk Cloud Platform and Splunk Observability Cloud
******************************************************************************************

.. meta::
   :description: This page describes Unified Identity between Splunk Cloud Platform and Splunk Observability Cloud, including how to set it up.

Splunk Cloud Platform offers Unified Identity with Splunk Observability Cloud.


What is Unified Identity?
==========================================================================================

Unified Identity is the integration of Splunk Cloud Platform and Splunk Observability Cloud. Users can access both platforms using a single identity by logging into Splunk Observability Cloud with SSO using their Splunk Cloud Platform credentials. Splunk Cloud Platform serves as the Identity Provider (IdP). You can use a third party identity provider, such as Okta, but you will lose the benefits of the integrated experience. See :ref:`unified-identity-benefits`

When you integrate your Splunk Cloud Platform and Splunk Observability Cloud instances and activate Unified Identity, administrators can set up all users in a central location, Splunk Cloud Platform. Splunk Cloud Platform admins control user and data access permissions for both platforms separately in respective products. For more information, see :ref:`admin-manage-users`. To learn about user roles and permissions in Splunk Cloud Platform, see :new-page:`About configuring role-based user access <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/Aboutusersandroles>`. The integration extends permissions to access data indexed in Splunk Cloud Platform to Splunk Observability Cloud applications with no administrative overhead. See :ref:`unified-id-user-provisioning` for more information.


Who can access Single Sign On (SSO) and the benefits of Unified Identity?
==========================================================================================
 
All customers who have both Splunk Cloud Platform and Splunk Observability Cloud can access Unified Identity. Users must be on Splunk Cloud Platform version 9.x and higher. The AWS region for your Splunk Cloud Platform instance must be the same as your Splunk Observability Cloud instance realm. Unified Identity is not supported in GovCloud regions.


.. _unified-identity-benefits:

What are the benefits of Unified Identity?
==========================================================================================

Organizations that complete the integration of Splunk Cloud Platform and Splunk Observability Cloud experience the following benefits:

* End users can access Splunk Observability Cloud with Single Sign On (SSO) using Splunk Cloud Platform as the Identity Provider (IdP).

* Splunk Cloud Platform administrators can extend SAML settings for SSO configured in Splunk Cloud Platform to Splunk Observability Cloud applications.

* When using any Splunk Observability Cloud application, a user can access all data in Splunk Cloud Platform indexes that the user's role in Splunk Cloud Platform has permissions to access.

* Users can navigate data and dashboards between Splunk Cloud Platform and Splunk Observability Cloud seamlessly after logging in with Splunk Cloud Platform SSO once.

.. note:: You can use a third party identity provider other than Splunk Cloud Platform, but you will lose the benefits of the integrated experience.


How to set up Unified Identity
==========================================================================================

You can pair only one Splunk Cloud Platform instance with one Splunk Observability Cloud instance at a time. Only one Splunk Observability Cloud organization can pair with a single Splunk Cloud Platform search head. Customers with multiple Splunk Observability Cloud organizations must choose one to pair with the chosen Splunk Cloud Platform instance.


Prerequisites
------------------------------------------------------------------------------------------

You must be an admin of the Splunk Cloud Platform and Splunk Observability Cloud instances that you want to pair.


New Splunk Observability Cloud customers
------------------------------------------------------------------------------------------

Splunk Cloud Platform customers who want to purchase Splunk Observability Cloud must take the following actions to set up Unified Identity:

1. Inform your Splunk sales representative that you want to purchase Splunk Observability Cloud or start a trial. The sales representative initiates a Splunk Observability Cloud trial that is already integrated with their Splunk Cloud Platform instance. 

2. Turn on token authentication to allow Splunk Observability Cloud to view your Splunk Cloud Platform logs. See :new-page:`Enable or disable token authentication <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/EnableTokenAuth>` to learn how.


Existing Splunk Observability Cloud customers
------------------------------------------------------------------------------------------

If you already have a Splunk Cloud Platform account and a Splunk Observability Cloud account, take the following actions to set up Unified Identity:

1. Turn on token authentication to allow Splunk Observability Cloud to view your Splunk Cloud Platform logs. See :new-page:`Enable or disable token authentication <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/EnableTokenAuth>` to learn how.

2. Obtain a user API access token (session token) from your Splunk Observability Cloud account. See :ref:`admin-api-access-tokens` to learn how.

   .. note:: The API token must have ``admin`` privileges.

3. To pair orgs, open Terminal and enter the following Admin Config Services (ACS) command:

   .. code-block:: bash
    
           acs observability pair --o11y-access-token "GrkvoDav1M-FNyxdONtK2Q"

   Replace the access token, ``GrkvoDav1M-FNyxdONtK2Q`` in the example above, with the user API access token you retrieved from Splunk Observability Cloud in previous step.

   .. note:: If you haven't installed the ACS command-line tool, see :new-page:`Administer Splunk Cloud Platform using the ACS CLI <https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ACSCLI>`.

   The pairing command returns a pairing id:

   .. image:: /_images/splunkplatform/pairingID.png
     :width: 90%
     :alt: This screenshot shows the response in Terminal showing the pairing id for the new pairing.

4. You can use the pairing id to get the current status of the pairing. To get the status, run the following ACS command:

  .. code-block:: bash

          acs observability pairing-status-by-id --pairing-id "GGPH8FPAAAA" --o11y-access-token "GrkvoDav1M-FNyxdONtK2Q"

  Replace the pairing id and the access token with your own values. The system returns a status message showing whether or not the pairing was a success. 

   .. image:: /_images/splunkplatform/unifiedID-pairingSuccess.png
     :width: 90%
     :alt: This screenshot shows a success status for the new pairing.


Users will receive an email telling them to authenticate to Splunk Observability Cloud using the new authentication method through Splunk Cloud Platform SSO. Note that users can continue to use their previous login method. If you want to force all users to authenticate through Splunk Cloud Platform SSO, reach out to Splunk Customer Support to deactivate local login. To deactivate login through a third party identity provider, go to :strong:`Data Managemen > Available integrations` in Splunk Observability Cloud, select the appropriate integration (for example, Okta), and select :strong:`Deactivate`. 


.. _unified-id-user-provisioning:

User provisioning
==========================================================================================

To benefit from Unified Identity, all users must have a Splunk Cloud Platform user with the ``o11y_access`` role.


.. _existing-scp-users:

Existing Splunk Cloud Platform users
------------------------------------------------------------------------------------------

In Splunk Cloud Platform, create the custom role ``o11y_access`` and assign it to all users who you want to grant access to Splunk Observability Cloud. See :new-page:`Create and manage roles with Splunk Web <https://docs.splunk.com/Documentation/Splunk/latest/Security/Addandeditroles#Add_or_edit_a_role>` for more information on Splunk Cloud Platform roles. Follow only the instructions in the :guilabel:`Add or edit a role` section. Note that you do not need to assign the role any capabilities or indexes. 

.. note:: If you do not create and assign the custom role ``o11y_access``, users receive the following error message when trying to log in to Observability Cloud: "You do not have access to Splunk Observability Cloud. Contact your Splunk Cloud Platform administrator for assistance."

If the user does not exist in Observability Cloud, the integration automatically creates a user in Observability Cloud and maps Splunk Cloud Platform roles to the following Observability Cloud roles:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Role in Splunk Cloud Platform`
     - :strong:`Role in Splunk Observability Cloud`

   * - sc_admin
     - admin

   * - power, can_delete
     - power

   * - user
     - power


The system defines the mapping process, and a user cannot change it at provisioning time or after. The mapping is strictly from Splunk Cloud Platform to Splunk Observability Cloud, and not the reverse. No Splunk Cloud Platform roles map to the Splunk Observability Cloud roles "usage" or "read_only".


Existing Splunk Observability Cloud users
------------------------------------------------------------------------------------------

If an existing Observability Cloud user does not have a Splunk Cloud Platform account, create a Splunk Cloud Platform user for them and give it the ``o11y_access`` role. You do not need to assign the ``o11y_access`` role any capabilities or indexes. The user can now access Splunk Cloud Platform and can sign into Observability Cloud with SSO using their Splunk Cloud Platform credentials. Splunk Cloud Platform and Observability Cloud Log Observer respect index access assigned to the user in Splunk Cloud Platform. The Observability Cloud user retains their existing Observability Cloud role. 

If an existing Observability Cloud user already has a Splunk Cloud Platform user, assign the ``o11y_access`` role to the user in the Splunk Cloud Platform instance.


New users
------------------------------------------------------------------------------------------

To add a new user to Splunk Observability Cloud after the integration is complete, a Splunk Cloud Platform administrator must do the following:

1. Create a new user in Splunk Cloud Platform either locally or through a third party IdP. 

2. Give the new user the custom ``o11y_access`` role. 
   You do not need to assign the role any capabilities or indexes. 

The user can now log in to Splunk Observability Cloud with their Splunk Cloud Platform permissions.


After initial user provisioning
-------------------------------------------------------------------------------------------

Once users are set up, Splunk Cloud Platform admins and Splunk Observability Cloud admins must manage roles independently. After initial setup, role updates in either product platform do not impact a user's role in the other platform. However, a user's permissions to specific indexes in Splunk Cloud Platform are always controlled by a user's role and permissions in Splunk Cloud Platform.


What to expect at first login
==========================================================================================

The first time a user tries to log in to Splunk Observability Cloud after the integration, they are directed to their Splunk Cloud Platform login page. 

Follow these steps at first login to Splunk Observability Cloud:

1. Select :strong:`Sign in with Splunk Cloud`.

2. Provide your Splunk Cloud Platform credentials. If you get the :strong:`No access` error message, contact your administrator. See :ref:`no-access-error` for more information.

3. Enter and confirm your email. If you already have an Observability Cloud user, enter the email associated with it to link it to your Splunk Cloud Platform user. If you enter an email address that does not exist in Observability Cloud, the system creates a new Observability Cloud user and assigns it a role based on the role mapping table in the :ref:`existing-scp-users` section.

4. You then receive an e-mail to verify your identity. Verify your identity in the e-mail to be authenticated in Splunk Observability Cloud. After authentication, the Observability Cloud user can only see logs data in Log Observer that their Splunk Cloud Platform user has permissions to see. 

After the first login, you do not need to provide your Splunk Cloud Platform credentials again. On subsequent logins, if you are already logged in to Splunk Cloud Platform, select :strong:`Sign in with Splunk Cloud` and you are automatically signed in to Splunk Observability Cloud.


.. _no-access-error:

No access error
------------------------------------------------------------------------------------------

Contact your Splunk Cloud Platform administrator if you receive the following :strong:`No access` error message:

.. image:: /_images/splunkplatform/no-access-error.png
     :width: 50%
     :alt: This screenshot shows the no access error.

Users receive this error message if their Splunk Cloud Platform administrator did not give them the custom role ``o11y_access``. The ``o11y_access`` role is required to access Splunk Observability Cloud.


Working in Splunk Observability Cloud after the integration
==========================================================================================

In addition to logging in with SSO, users and admins experience other differences after the integration is complete.


Point-and-click log analysis
------------------------------------------------------------------------------------------

One important advantage of the integration is that users can now query their Splunk Cloud Platform logs in Log Observer's no-code UI. Users can create advanced queries without knowing SPL with Log Observer's filters and aggregations. See :ref:`logs-queries` for more information.


Related Content
------------------------------------------------------------------------------------------

Another significant benefit of the integration is that you can access any data related to your Splunk Cloud Platform logs that resides in other Splunk Observability Cloud applications, such as Infrastructure Monitoring, APM, RUM, and Synthetics. While exploring your data in any of the Splunk Observability Cloud applications, the Related Content bar always populates with links to other Splunk Observability Cloud applications that have related data. Access related metrics, traces, or infrastructure components when you observe your Splunk Cloud Platform logs in Splunk Observability Cloud.


Unified user session
------------------------------------------------------------------------------------------

You can navigate seamlessly back and forth between Splunk Cloud Platform and any Splunk Observability Cloud application (Infrastructure Monitoring, APM, Log Observer, RUM, and Synthetics) to see all data that your Splunk Cloud Platform role has permissions to see. Users need to log in only once to gain access to Splunk Cloud Platform and Splunk Observability Cloud. You don't need additional login to move from one platform to the other when exploring data.


Splunk Cloud Platform maintenance windows
------------------------------------------------------------------------------------------

During a Splunk Cloud Platform maintenance window, users cannot log in to Splunk Observability Cloud with Splunk Cloud Platform for SSO. Login can be impacted from 2 to 5 minutes during Splunk Cloud Platform maintenance windows. Users can log into Splunk Observability Cloud again as soon as the maintenance window is completed. 

During a maintenance window, Splunk Cloud Platform displays a banner indicating the start and end time of the window. If a user is already logged in to Splunk Observability Cloud at the start of a maintenance window, the user is not impacted directly. However, access to Splunk Cloud Platform logs in Log Observer Connect are unavailable during the maintenance window. You can continue working in Splunk Observability Cloud. 

Typically, there are two planned maintenance windows per month for a Splunk Cloud Platform instance. Customers can determine the scheduling of maintenance windows and usually set them up to occur during the customer's downtime. Talk to your Splunk Cloud Platform administrator about the planned maintenance windows.


Changing identity providers
------------------------------------------------------------------------------------------

If you no longer want to use Splunk Cloud Platform as your identity provider for SSO when signing in to Splunk Observability Cloud, set up a third party IdP for Splunk Observability Cloud login before you deactivate your Splunk Cloud Platform instance. Deactivating Splunk Cloud Platform only after setting up a new third party IdP ensures that your Splunk Observability Cloud users do not lose access.
