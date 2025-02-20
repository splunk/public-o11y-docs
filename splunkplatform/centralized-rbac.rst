

.. _centralized-rbac:

*************************************************************************************************
Centralized user and role management 
*************************************************************************************************

.. meta::
   :description: This page describes how Splunk Cloud Platform admins can manage Splunk Observability Cloud roles from Splunk Cloud Platform.

Administrators can now centrally manage users and roles for both Splunk Cloud Platform and Splunk Observability Cloud in Splunk Cloud Platform. Splunk Cloud Platform becomes the role based access control (RBAC) store for Splunk Observability Cloud. 

Who can access centralized user and role management?
=================================================================================================

All customers who have Unified Identity can access centralized user and role management in Splunk Cloud Platform. Unified Identity is available to Splunk Cloud Platform and Splunk Observability Cloud customers co-located in the same AWS region. 

Prerequisites
=================================================================================================

Customers who meet the following criteria can access centralized user and role management:

* Splunk Cloud Platform version is 9.3.2408 or higher

* Unified Identity is set up. See :ref:`unified-id-unified-identity` for more information.

* Your Splunk Cloud Platform and Splunk Observability Cloud organizations are co-located in the same AWS region. See the following table

.. list-table::
   :header-rows: 1
   :width: 100%

   * - :strong:`Splunk Observability Cloud realm`
     - :strong:`AWS Region`
   * - us0
     - AWS US East Virginia (us-east-1)
   * - us1
     - AWS US West Oregon (us-west-2)
   * - eu0
     - AWS EU Dublin (eu-west-1)
   * - eu1
     - AWS EU Frankfurt (eu-central-1)
   * - eu2
     - AWS EU London (eu-west-2)
   * - au0
     - AWS AP Sydney (ap-southeast-2)
   * - jp0
     - AWS AP Tokyo (ap-northeast-1)


How to set up centralized user and role management
=================================================================================================

You can set up centralized user and role management whether you already have Splunk Observability Cloud or not. If you want to set up centralized user and role management but you do not have Splunk Observability Cloud yet, see the next section, :ref:`rbac-new-o11y-customers`. If you already have Splunk Observability Cloud, follow the instructions in :ref:`rbac-existing-o11y-customers` to set up centralized user and role management.

.. _rbac-new-o11y-customers:

New Splunk Observability Cloud customers
-------------------------------------------------------------------------------------------------

If you do not yet have Splunk Observability Cloud, inform your Splunk sales representative that you want to purchase Splunk Observability Cloud or start a trial. The sales representative initiates a Splunk Observability Cloud trial that is already integrated with your Splunk Cloud Platform instance and has centralized user and role management already configured. 

.. _rbac-existing-o11y-customers:

Existing Splunk Observability Cloud customers
-------------------------------------------------------------------------------------------------

Once you have configured Unified Identity, you can use Admin Config Service (ACS) to set up centralized user and role management. If you haven't installed the ACS command-line tool and want to use it, see :new-page:`Administer Splunk Cloud Platform using the ACS CLI <https://docs.splunk.com/Documentation/SplunkCloud/latest/Config/ACSCLI>`.

To set up centralized user and role management, follow these steps:

1. Confirm that your organization has set up Unified Identity. If not, run the following Admin Config Services (ACS) command to set up Unified Identity: 

    .. code-block:: bash
    
              acs observability pair --o11y-access-token "<enter-o11y-access-token>"

   Replace ``<enter-o11y-access-token>`` in the example above, with the user API access token you retrieved from Splunk Observability Cloud in previous step.

2. Run the following ACS command to add prepackaged Splunk Observability Cloud roles to your Splunk Cloud Platform instance:

    .. code-block:: bash
    
              acs observability enable-capabilities

3. Give all users who should have access to Splunk Observability Cloud the ``o11y_access`` role.

4. Log in to Splunk Cloud Platform as an administrator and go to :guilabel:`Settings` then :guilabel:`Users and Authentication` then :guilabel:`Roles`. Assign Splunk Observability Cloud roles to users. The following Splunk Observability Cloud roles (with ``o11y_*`` prefix) are now visible in Splunk Cloud role management page:

    * o11y_admin

    * o11y_power

    * o11y_read_only

    * o11y_usage

   See :ref:`roles-table-phase` to learn precisely what each role can do.

5. If you want users to have access to real-time Splunk Observability Cloud metrics in Splunk Cloud Platform, give them the ``read_o11y_content`` and ``write_o11y_content`` capabilities.

6. Allow your Splunk Observability Cloud organization to start using Splunk Cloud Platform as the source of role based access controls (RBAC) by enabling centralized RBAC. 

   .. note:: When you run the command to enable centralized RBAC, Splunk Cloud Platform becomes the RBAC store for all Splunk Observability Cloud users who authenticate using their Splunk Cloud Platform credentials. Therefore, you must assign a Splunk Observability Cloud role to each affected user in Splunk Cloud Platform before running the command to enable centralized RBAC. If not, the user will be locked out of Splunk Observability Cloud because they won't have a role.

   Run the following ACS command to enable centralized RBAC:

    .. code-block:: bash
    
      acs observability enable-centralized-rbac --o11y-access-token <access-token>

.. note:: It takes around 30 minutes for a new role to be available on the :guilabel:`Roles` page. 

How centralized user and role management works
=================================================================================================

After setting up centralized user and role management, Splunk Cloud Platform is the source of role based access controls (RBAC) for Splunk Observability Cloud users. Splunk Observability Cloud roles are now visible in Splunk Cloud Platform and assignable to Splunk users. See :ref:`roles-table-phase` to learn exactly what each role can do. 

When a user logs in to Splunk Observability Cloud with their Splunk Cloud Platform credentials, Splunk Cloud Platform becomes the RBAC store, or source of truth for roles. Their role is the role assigned to their user in Splunk Cloud Platform. Their role is visible only in Splunk Cloud Platform, and is no longer visible in the Splunk Observability Cloud UI. An administrator must make updates to roles in Splunk Cloud Platform. 

Conversely, when a user logs in to Splunk Observability Cloud locally or through a third party identity provider and not with Splunk Cloud Platform credentials, then Splunk Observability Cloud remains the source of truth and displays their role in the UI. In this case, an administrator can see and update their role in the Splunk Observability Cloud UI.

Whenever you create a new user in Splunk Observability Cloud using Unified Identity, you still need to give that user the ``o11y_access`` role. 

If you want a Splunk Cloud Platform user who is not a Splunk Observability Cloud user to access Real Time Metrics in Splunk Cloud, you must give them the ``read_o11y_content`` and ``write_o11y_content`` capabilities.

Troubleshooting
=================================================================================================

Following are known issues along with their solutions.

No access issue
-------------------------------------------------------------------------------------------------
The user can’t log in to Splunk Observability Cloud after configuring centralized user and role management. The user sees error message, “You do not have access to Splunk Observability Cloud…”

Cause
-------------------------------------------------------------------------------------------------
The user's Splunk Cloud Platform stack might be undergoing maintenance. Alternatively, the administrator who configured centralized user and role management might have forgotten to give the user the ``o11y_access`` role.

Solution
-------------------------------------------------------------------------------------------------
 
First, confirm that the Splunk Cloud Platform instance is available and not undergoing maintenance.

Next, confirm that the user with login problems has both of the following roles in Splunk Cloud Platform:

* the ``o11y_access`` role

* one of the ``o11y_*`` roles (See the complete step 3 in the previous section.)


Lastly, check the signalboost-rest skynet logs, searching for errors containing the keyword ``SplunkCloudPlatformAuthManager``. 

Multiple errors issue
-------------------------------------------------------------------------------------------------
After an administrator has set up centralized user and role management, the user sees errors across the UI after logging in.

Cause
-------------------------------------------------------------------------------------------------
The user's Splunk Cloud Platform stack might be undergoing maintenance. Another cause might be that token authentication is not active on the Splunk Cloud Platform instance.

Solution
-------------------------------------------------------------------------------------------------
First, confirm that the paired Splunk search head or search head cluster is available and not undergoing maintenance.

Next, check that token authentication is active on the Splunk Cloud Platform instance.

