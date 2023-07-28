.. _unified-id-unified-identity:

******************************************************************************************
Unified Identity: Splunk Cloud Platform and Splunk Observability Cloud
******************************************************************************************

.. meta::
   :description: This page describes and links to setup pages for each component of Observability Cloud.

Splunk Cloud Platform offers Unified Identity with Splunk Observability Cloud.

What is Unified Identity?
==========================================================================================
When Splunk Cloud Platform customers purchase Splunk Observability Cloud, users can access both platforms using a single identity. Users can log into Splunk Observability Cloud with SSO using their Splunk Cloud Platform credentials.

When you integrate your Splunk Cloud Platform and Splunk Observability Cloud instances and activate Unified Identity, administrators can set up all users in a central location, Splunk Cloud Platform. Splunk Cloud Platform admins control user and data access permissions for both platforms separately in respective products. For more information, see :ref:`admin-manage-users`. To learn about user roles and permissions in Splunk Cloud Platform, see :new-page:`About configuring role-based user access <https://docs.splunk.com/Documentation/SplunkCloud/9.0.2209/Security/Aboutusersandroles>`. The integration extends permissions to access data indexed in Splunk Cloud Platform to Splunk Observability Cloud applications with no administrative overhead. See :ref:`unified-id-user-provisioning` for more information.


Who can access Single Sign On (SSO) and the benefits of Unified Identity?
==========================================================================================
Currently, Splunk Cloud Platform customers who purchase Splunk Observability Cloud can access Unified Identity between Splunk Cloud Platform and Splunk Observability Cloud. Users must be on Splunk Cloud Platform version 9.x and higher. The AWS region for your Splunk Cloud Platform instance must be the same as your Splunk Observability Cloud instance realm.

.. _unified-identity-benefits:

What are the benefits of Unified Identity?
==========================================================================================
Organizations that complete the integration of Splunk Cloud Platform and Splunk Observability Cloud experience the following benefits:

* End users can access Splunk Observability Cloud with Single Sign On (SSO) using Splunk Cloud Platform as the Identity Provider (IdP).

* Splunk Cloud Platform administrators can extend SAML settings for SSO configured in Splunk Cloud Platform to Splunk Observability Cloud applications.

* When using any Splunk Observability Cloud application, a user can access all data in Splunk Cloud Platform indexes that the user’s role in Splunk Cloud Platform has permissions to access.

* Users can navigate data and dashboards between Splunk Cloud Platform and Splunk Observability Cloud seamlessly after logging in with Splunk Cloud Platform SSO once.


How to set up the Unified Identity
==========================================================================================
Splunk Cloud Platform customers who want to purchase Splunk Observability Cloud must inform their Splunk sales representative that they want to purchase Splunk Observability Cloud or start a trial. The sales representative initiates a Splunk Observability Cloud trial that is already integrated with their Splunk Cloud Platform instance. Turn on token authentication to allow Splunk Observability Cloud to view your Splunk Cloud Platform logs. See :new-page:`Enable or disable token authentication <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/EnableTokenAuth>`` to learn how.

Only one Splunk Cloud Platform instance can be paired with one Splunk Observability Cloud instance at a time. The integration is a 1:1 mapping of one ad-hoc Splunk Cloud Search Head Unit with one Splunk Observability Cloud instance. Customers with multiple Splunk Observability Cloud organizations must choose one to pair with the chosen Splunk Cloud Platform instance.

.. _unified-id-user-provisioning:

User provisioning
==========================================================================================
The integration automatically maps Splunk Cloud Platform roles to the following Splunk Observability Cloud roles:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Role in Splunk Cloud Platform`
     - :strong:`Role in Splunk Observability Cloud`

   * - admin
     - admin

   * - power, can_delete
     - power

   * - user
     - power

   * - N/A
     - usage


The mapping process is defined by the system, and a user cannot change it at provisioning time or after. 

To add a new user to Splunk Observability Cloud after the integration is complete, a Splunk Cloud Platform administrator must create a new local account in Splunk Cloud Platform or provision a new user with a third party IdP (if Splunk Cloud Platform is not used as IdP). A new user is added to Splunk Cloud Platform after they log in for the first time. At that point, the user can log in to Splunk Observability Cloud with their Splunk Cloud Platform permissions.

.. note:: You can use a third party identity provider other than Splunk Cloud Platform, but you will lose the benefits of the integrated experience. See :ref:`unified-identity-benefits`.

Once users are set up, Splunk Cloud Platform admins and Splunk Observability Cloud admins must manage roles independently. After initial setup, role updates in either product platform do not impact a user’s role in the other platform. However, a user’s permissions to specific indexes in Splunk Cloud Platform are always controlled by a user’s role and permissions in Splunk Cloud Platform.


What to expect at first login
==========================================================================================
The first time a user tries to log in to Splunk Observability Cloud after the integration, they are directed to their Splunk Cloud Platform login page. 

Follow these steps at first login to Splunk Observability Cloud:

1. Select :strong:`Sign in with Splunk Cloud`.

2. Provide your Splunk Cloud Platform credentials. If your Splunk Cloud Platform user has an associated email, the :strong:`Email` field autopopulates. If your Splunk Cloud Platform user does not have an associated email, you must enter your email address twice.

3. You then receive an e-mail to verify your identity. Verify your identity in the e-mail to be authenticated in Splunk Observability Cloud. After authentication, you can access all Splunk Cloud Platform data that your Splunk Cloud Platform role has permissions to access in Splunk Observability Cloud applications. If you see an Internal Server Error, follow these steps.

    a. Remove the verification code from the text box.

    b. Re-enter the verification code you received in the confirmation email.

    c. If you still see the Internal Server Error, select :strong:`Restart verification process`, then check for a second confirmation    email, retrieve the new verification code, and enter it in the text box. If you continue to see the Internal Server Error, file a ticket with Splunk Support.
  
    d. Check your role in Splunk Observability Cloud. If you should have an admin role inherited from Splunk Cloud Platform but you see a power role in Splunk Observability Cloud instead, open a support ticket with your Splunk Cloud Platform admin to request admin status in Splunk Observability Cloud.


After the first login, you do not need to provide your Splunk Cloud Platform credentials again. On subsequent logins, if you are already logged in to Splunk Cloud Platform, select :strong:`Sign in with Splunk Cloud` and you are automatically signed in to Splunk Observability Cloud.


Working in Splunk Observability Cloud after the integration
==========================================================================================
In addition to logging in with SSO, users and admins experience other differences after the integration is complete.

Point-and-click log analysis
------------------------------------------------------------------------------------------
One important advantage of the integration is that users can now query their Splunk Cloud Platform logs in Log Observer’s no-code UI. Users can create advanced queries without knowing SPL with Log Observer’s filters and aggregations. See :ref:`logs-queries` for more information.

Related Content
------------------------------------------------------------------------------------------
Another significant benefit of the integration is that you can access any data related to your Splunk Cloud Platform logs that resides in other Splunk Observability Cloud applications, such as Infrastructure Monitoring, APM, RUM, and Synthetics. While exploring your data in any of the Splunk Observability Cloud applications, the Related Content bar always populates with links to other Splunk Observability Cloud applications that have related data. Access related metrics, traces, or infrastructure components when you observe your Splunk Cloud Platform logs in Splunk Observability Cloud.

Unified user session
------------------------------------------------------------------------------------------
You can navigate seamlessly back and forth between Splunk Cloud Platform and any Splunk Observability Cloud application (Infrastructure Monitoring, APM, Log Observer, RUM, and Synthetics) to see all data that your Splunk Cloud Platform role has permissions to see. Users need to log in only once to gain access to Splunk Cloud Platform and Splunk Observability Cloud. You don’t need additional login to move from one platform to the other when exploring data.

Splunk Cloud Platform maintenance windows
------------------------------------------------------------------------------------------
During a Splunk Cloud Platform maintenance window, users cannot log in to Splunk Observability Cloud with Splunk Cloud Platform for SSO. Login can be impacted from 2 to 5 minutes during Splunk Cloud Platform maintenance windows. Users can log into Splunk Observability Cloud again as soon as the maintenance window is completed. 

During a maintenance window, Splunk Cloud Platform displays a banner indicating the start and end time of the window. If a user is already logged in to Splunk Observability Cloud at the start of a maintenance window, the user is not impacted directly. However, access to Splunk Cloud Platform logs in Log Observer are unavailable during the maintenance window. You can continue working in Splunk Observability Cloud. 

Typically, there are two planned maintenance windows per month for a Splunk Cloud Platform instance. Customers can determine the scheduling of maintenance windows and usually set them up to occur during the customer’s downtime. Talk to your Splunk Cloud Platform administrator about the planned maintenance windows.

Changing identity providers
------------------------------------------------------------------------------------------
If you no longer want to use Splunk Cloud Platform as your identity provider for SSO when signing in to Splunk Observability Cloud, set up a third party IdP for Splunk Observability Cloud login before you deactivate your Splunk Cloud Platform instance. Deactivating Splunk Cloud Platform only after setting up a new third party IdP ensures that your Splunk Observability Cloud users do not lose access.
