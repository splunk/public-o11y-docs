.. _org-setup-checklist:

********************************************************************************
Org setup checklist for Splunk Observability Cloud
********************************************************************************

.. meta::
   :description: Overview of the Observability Cloud admin tasks and links to the documentation.



Organization set up
==============================================================


.. list-table::
   :header-rows: 1
   :widths: 30, 70

   * - :strong:`Task Description`
     - :strong:`Documentation`

   * - Request a trial org.
     - If you don't have a paid instance of Splunk Observability Cloud, request a trial org. Usually the org is already created as part of the evaluation process that has taken place as part of the initial process when acquiring the Splunk Observability Cloud. You can verify access to your organizationrg via the link that has been provided to you https:///app.<realm>.signalfx.com where [realm] is specific to the region that has been set up for you. This can be  us0, us1, us2, eu0, aus or jp0. If you do not have this information, please reach out to you technical contact with the request to verify if there is an active trial for your account. If there is no active organization available for your account, you can request a Splunk Observability Cloud Free Trial. :ref:`education-resources`

   * - Decide how to manage users and provide access to Splunk Observability Cloud.
     - There are several options:
  
         * Using an external LDAP and control access via Single Sign On. Users will be managed in your external LDAP,  they will be replicated automatically to Splunk Observability Cloud. To further secure access you can disable local logins
         * O11y internal user management and access with a username and password. Manage users in Splunk Observability Cloud. 
         * If your org is hosted on the same cloud provider stack for both Splunk Cloud and Observability Cloud, set up Splunk Cloud as the new unified identity provider within Splunk Observability Cloud. Note: Must always be on the same cloud provider realm as Splunk Cloud. For information, see :ref:`sso-about`.

   * - Create access tokens to authenticate API calls and data ingestion
     - :guilabel:`Settings > Access Tokens`


   * - Create and configure teams to ensure that correct groups of users have easy access to relevant dashboards and alerts
     - :guilabel:`Settings > Teams`


   * - Invite users
     - :guilabel:`Settings > Users`


   * - Integrate with notification services to facilitate team workflows and communication channels
     - :guilabel:`Data Management`


   * - Create global data links
     - :guilabel:`Settings > Global Data links`
     - For information, see :ref:`link-metadata-to-content`.

   * - Understand your subscription usage and billing
     - :guilabel:`Settings` 

