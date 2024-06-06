.. _admin-admin:

********************************************************************************
Set up your Splunk Observability Cloud organization
********************************************************************************

.. meta::
   :description: Overview of the Splunk Observability Cloud organization admin tasks and links to the documentation.

The first steps in getting started with Splunk Observability Cloud is setting up your organization. In Splunk Observability Cloud, an organization, or account, is the highest-level security grouping. For example, other organizations and their users can't access the data in your organization.

To set up your organization, create and carry out a plan for addressing the tasks described in this topic. See the :ref:`admin-onboarding-guide` for prescriptive guidance for setting up your organization and other onboarding tasks.

Many of these tasks require administrator access, and you might need to perform some administrative tasks on a regular basis after your initial setup.

The following table shows you aspects of your Splunk Observability Cloud organization that you can plan for and set up:

.. list-table::
   :header-rows: 1
   :widths: 42, 42, 15

   * - :strong:`Do this`
     - :strong:`Link to documentation`
     - :strong:`Role required`

   * - Choose from these 3 options for managing user access:

       #. Use an external Lightweight Directory Access Protocol (LDAP) and control access through Single Sign-On (SSO). 
       #. Use Splunk Observability Cloud user management to allow access using a username and password. 
       #. Use Splunk Cloud Platform as the unified identity provider. 
     - See :ref:`unified-id-unified-identity` to use Splunk Cloud Platform as the unified identity provider.
       
       See :ref:`sso-label` to control access through Single Sign-On (SSO). 
       
       See :ref:`user-managment-intro` to use Splunk Observability Cloud user management. 
     - admin

   * - Allow Splunk Observability Cloud services in your network
     - See :ref:`allow-services`.
     - admin

   * - Invite administrators to help with the setup process
     - See :ref:`admin-manage-users`.
     - admin

   * - Create access tokens to authenticate API calls and data ingestion

     - See :ref:`admin-org-tokens`.
     - admin

   * - Create and configure teams to ensure that correct groups of users have easy access to relevant dashboards and alerts
     - See :ref:`admin-manage-teams`.
     - admin, power

   * - Invite users
     - See :ref:`admin-manage-users`.
     - admin

   * - Integrate with notification services to facilitate team workflows and communication channels
     - See :ref:`admin-notifs-index`.
     - admin

   * - Create global data links
     - See :ref:`link-metadata-to-content`.
     - admin, power

   * - Understand your subscription usage and billing
     - For information about APM subscription usage, see :ref:`apm-billing-usage-index`.

       For information about Infrastructure Monitoring subscription usage, see :ref:`monitor-imm-billing-usage`.

       For information about usage metrics for Splunk Observability Cloud, see :ref:`org-metrics`.
     - admin, usage
    
