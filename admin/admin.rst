.. _admin-admin:

********************************************************************************
Set up and administer Splunk Observability Cloud
********************************************************************************

.. meta::
   :description: Overview of the Observability Cloud admin tasks and links to the documentation.

One of the first steps in getting started with Observability Cloud is setting up your organization. In Observability Cloud, an organization, or account, is the highest-level security grouping. For example, other organizations and their users can't access the data in your organization.

To set up your organization, create and carry out a plan for addressing the tasks described in this topic. Many of these tasks require administrator access, and you might need to perform some administrative tasks on a regular basis after your initial setup.


Set up and administer your organization
==============================================================
The following table shows you aspects of your Observability Cloud organization that you can plan for and set up:

.. list-table::
   :header-rows: 1
   :widths: 35, 25, 25, 15

   * - :strong:`Do this`
     - :strong:`UI location`
     - :strong:`Link to documentation`
     - :strong:`Role required`

   * - Set up authentication that follows your security protocols
     - :guilabel:`Data Management`
     - For information, see :ref:`sso-label` and :ref:`allow-services`.
     - admin

   * - Invite administrators to help with the setup process
     - :guilabel:`Settings > Users`
     - For information, see :ref:`admin-manage-users`.
     - admin

   * - Create access tokens to authenticate API calls and data ingestion
     - :guilabel:`Settings > Access Tokens`
     - For information, see :ref:`admin-org-tokens`.
     - admin

   * - Create and configure teams to ensure that correct groups of users have easy access to relevant dashboards and alerts
     - :guilabel:`Settings > Teams`
     - For information, see :ref:`admin-manage-teams`.
     - admin, power

   * - Invite users
     - :guilabel:`Settings > Users`
     - For information, see :ref:`admin-manage-users`.
     - admin

   * - Integrate with notification services to facilitate team workflows and communication channels
     - :guilabel:`Data Management`
     - For information, see :ref:`admin-notifs-index`.
     - admin

   * - Create global data links
     - :guilabel:`Settings > Global Data links`
     - For information, see :ref:`link-metadata-to-content`.
     - admin, power

   * - Understand your subscription usage and billing
     - :guilabel:`Settings` 
     -  For information about APM subscription usage, see :ref:`apm-billing-usage-index`.

        For information about Infrastructure Monitoring subscription usage, see :ref:`monitor-imm-billing-usage`.

        For information about usage metrics for Observability Cloud, see :ref:`org-metrics`.
     - admin, usage
    
