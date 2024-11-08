

.. _centralized-rbac:

*************************************************************************************************
Centralized user and role management 
*************************************************************************************************

.. meta::
   :description: This page describes how Splunk Cloud Platform admins can control Splunk Observability Cloud roles from Splunk Cloud Platform.

Administrators can now centrally control users and roles for both Splunk Cloud Platform and Splunk Observability Cloud in Splunk Cloud Platform. Splunk Cloud Platform is the role based access control (RBAC) store for Splunk Observability Cloud. 


Who can access centralized user and role management?
=================================================================================================

All Unified Identity customers are able to access the Centralized User and Role Management in Splunk feature. Unified Identity is available to Splunk Cloud and O11y customers co-located in the same AWS region.

All customers who have Unified Identity can access centralized user and role management in Splunk Cloud Platform. 

Prerequisites
=================================================================================================

Customers who meet the following criteria can access centralized user and role management:

* Be on Splunk Cloud Platform version 9.x or higher

* Have Unified Identity configured. See :ref:`unified-id-unified-identity`` for more information.

* Your Splunk Cloud Platform and Splunk Observability Cloud organizations must be co-located in the same AWS region. See the following table

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

You can set up centralized user and role management whether you already have Splunk Observability Cloud or not.


New Splunk Observability Cloud customers
-------------------------------------------------------------------------------------------------

If you do not yet have Splunk Observability Cloud, inform your Splunk sales representative that you want to purchase Splunk Observability Cloud or start a trial. The sales representative initiates a Splunk Observability Cloud trial that is already integrated with your Splunk Cloud Platform instance and has centralized user and role management already configured. 

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

3. In the Splunk Cloud Platform admin UI, assign Splunk Observability Cloud roles to users. The following Splunk Observability Cloud roles (with o11y_* prefix) are now visible in Splunk Cloud role management page:

    * o11y_admin

    * o11y_power

    * o11y_read_only

    * o11y_usage

   See :ref:`roles-table-phase` to learn precisely what each role can do.

4. Allow your Splunk Observability Cloud organization to start using Splunk Cloud Platform as the source of role based access controls (RBAC) by running the following ACS command:

    .. code-block:: bash
    
              acs observability enable-centralized-rbac --o11y-access-token <access-token>

5. Give all users who should have access to Splunk Observability Cloud the ``o11y_access`` role.

6. For users who should be able to access real-time Splunk Observability Cloud metrics in Splunk Cloud Platform, give them the ``read_o11y_content`` and ``write_o11y_content`` capabilities.
              

How centralized user and role management works
=================================================================================================

Now Splunk Cloud Platform is the source of role based access controls (RBAC) for Splunk Observability Cloud users. The roles will no longer be visible in the Splunk Observability Cloud UI. An administrator must make updates to the roles in Splunk Cloud Platform. 

Access to content in Splunk Observability Cloud is determined by the user's Splunk Observability Cloud role, which the Splunk Cloud Platform administrator now controls. See :ref:`roles-table-phase` to learn exactly what each role can do.

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
First, confirm that the paired Splunk SH/SHC is available and not undergoing maintenance.

Next, check that token authentication is active on the Splunk Cloud Platform instance.

Lastly, check the signalboost-rest skynet logs, searching for errors containing the keyword ``SplunkCapabilitiesService``.