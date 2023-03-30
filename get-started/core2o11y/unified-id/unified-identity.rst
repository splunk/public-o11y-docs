.. _unified-id-unified-identity:

******************************************************************************************
Unified Identity: Splunk Cloud Platform and Splunk Observability Cloud
******************************************************************************************

.. meta::
   :description: This page describes and links to setup pages for each component of Observability Cloud.


What is Unified Identity?
==========================================================================================
When Splunk Cloud Platform customers purchase Splunk Observability Cloud, users can access both platforms using a single identity. Users can log into Splunk Observability Cloud with SSO using their Splunk Cloud Platform credentials.

When you integrate your Splunk Cloud Platform and Splunk Observability Cloud instances and activate Unified Identity, administrators can set up all users in a central location, Splunk Cloud Platform. Splunk Cloud Platform admins control user and data access permissions for both platforms separately in respective products. For more information, see :ref:`admin-manage-users`. To learn about user roles and permissions in Splunk Cloud Platform, see :ref:`About configuring role-based user access <https://docs.splunk.com/Documentation/SplunkCloud/9.0.2209/Security/Aboutusersandroles>`. The integration extends permissions to access data indexed in Splunk Cloud Platform to Splunk Observability Cloud applications with no administrative overhead. See :ref:`unified-id-user-provisioning` for more information.


Who can access Single Sign On (SSO) and the benefits of Unified Identity?
==========================================================================================
Currently, Splunk Cloud Platform customers who purchase Splunk Observability Cloud can access Unified Identity between Splunk Cloud Platform and Splunk Observability Cloud. Users must be on Splunk Cloud Platform version 9.x and higher.

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
Splunk Cloud Platform customers who want to purchase Splunk Observability Cloud must inform their Splunk sales representative that they want to purchase Splunk Observability Cloud or start a trial. The sales representative initiates a Splunk Observability Cloud trial that is already integrated with their Splunk Cloud Platform instance.

Only one Splunk Cloud Platform instance can be paired with one Splunk Observability Cloud instance at a time. The integration is a 1:1 mapping of one ad-hoc Splunk Cloud Search Head with one Splunk Observability Cloud instance. Customers with multiple Splunk Observability Cloud organizations must choose one to pair with the chosen Splunk Cloud Platform instance.

.. _unified-id-user-provisioning:

User provisioning
==========================================================================================
The integration automatically maps Splunk Cloud Platform roles to the following Splunk Observability Cloud roles:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Role in Splunk Cloud Platform`
     - :strong:`Role in Splunk Observability Cloud`

   * - sc_admin
     - admin

   * - Power
     - user/member

   * - User and other custom roles
     - user/member


The mapping process is defined by the system, and a user cannot change it at provisioning time or after. 

To add a new user to Splunk Observability Cloud after the integration is complete, a Splunk Cloud Platform administrator must create a new local account in Splunk Cloud Platform or provision a new user with a third party Identity Provider (if Splunk Cloud Platform is not used as IdP). A new user is added to Splunk Cloud Platform after they log in for the first time. At that point, the user can log in to Splunk Observability Cloud with their Splunk Cloud Platform permissions.

.. note:: You can use a third party Identity Provider other than Splunk Cloud Platform, but you will lose the benefits of the integrated experience. See :ref:`unified-identity-benefits`.

Once users are set up, Splunk Cloud Platform admins and Splunk Observability Cloud admins must manage roles independently. After initial setup, role updates in either product platform do not impact a user’s role in the other platform. However, a user’s permissions to specific indexes in Splunk Cloud Platform are always controlled by a user’s role and permissions in Splunk Cloud Platform.


What to expect at first login
==========================================================================================
The first time a user tries to log in to Splunk Observability Cloud after the integration, they are directed to their Splunk Cloud Platform login page. Upon providing their Splunk Cloud Platform credentials, the user is authenticated in Splunk Observability Cloud and can access all Splunk Cloud Platform data that their Splunk Cloud Platform role has permissions to access in Splunk Observability Cloud applications.


Working in Splunk Observability Cloud after the integration
==========================================================================================
In addition to logging in with SSO, users and admins experience other differences after the integration is complete.

Point-and-click log analysis
------------------------------------------------------------------------------------------
One important advantage of the integration is that users can now query their Splunk Cloud Platform logs in Log Observer’s no-code UI. Users can create advanced queries without knowing SPL with Log Observer’s filters and aggregations. See :ref:`logs-queries` for more information.

Related content
------------------------------------------------------------------------------------------
Another significant benefit of the integration is that you can access any data related to your Splunk Cloud Platform logs that resides in other Splunk Observability Cloud applications, such as Infrastructure Monitoring, APM, RUM, and Synthetics. While exploring your data in any of the Splunk Observability Cloud applications, the Related Content bar always populates with links to other Splunk Observability Cloud applications that have related data. Access related metrics, traces, or infrastructure components when you observe your Splunk Cloud Platform logs in Splunk Observability Cloud.

Unified user session
------------------------------------------------------------------------------------------
You can navigate seamlessly back and forth between Splunk Cloud Platform and any Splunk Observability Cloud application (Infrastructure Monitoring, APM, Log Observer, RUM, and Synthetics) to see all data that your Splunk Cloud Platform role has permissions to see. Users need to log in only once to gain access to Splunk Cloud Platform and Splunk Observability Cloud. You don’t need additional login to move from one platform to the other when exploring data.

Splunk Cloud Platform maintenance windows
------------------------------------------------------------------------------------------
During a Splunk Cloud Platform maintenance window, users cannot log in to Splunk Observability Cloud with Splunk Cloud Platform for SSO. Login can be impacted from 2 to 5 minutes curing Splunk Cloud Platform maintenance windows. Users can log into Splunk Observability Cloud again as soon as the maintenance window is completed. 

During a maintenance window, Splunk Cloud Platform displays a banner indicating the start and end time of the window. If a user is already logged in to Splunk Observability Cloud at the start of a maintenance window, the user is not impacted directly. However, access to Splunk Cloud Platform logs in Log Observer are unavailable during the maintenance window. You can continue working in Splunk Observability Cloud. 

Typically, there are two planned maintenance windows per month for a Splunk Cloud Platform instance. Customers can determine the scheduling of maintenance windows and usually set them up to occur during the customer’s downtime. Talk to your Splunk Cloud Platform administrator about the planned maintenance windows.



