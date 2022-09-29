.. _admin-admin:

********************************************************************************
Set up and administer Splunk Observability Cloud
********************************************************************************

.. meta::
   :description: Learn how to how to set up and administer your organization.

One of the first steps in getting started with Observability Cloud is setting up your organization. In Observability Cloud, an organization, or account, is the highest-level security grouping. For example, data within an organization cannot be accessed by other organizations and their users.

To set up your organization, create and carry out a plan that addresses key aspects of your organization as covered below. Many of these tasks require administrator permissions and some tasks might need to be performed on an ongoing administrative basis beyond the initial setup.


What can I do to set up and administer my organization?
==============================================================
Here are key aspects of your Observability Cloud organization to plan for and set up:

.. list-table::
   :header-rows: 1
   :widths: 40, 30, 30

   * - :strong:`Do this`
     - :strong:`UI location`
     - :strong:`Link to documentation`

   * - Set up authentication that follows your security protocols
     - :guilabel:`Data Management`
     - For information, see :ref:`sso-label` and :ref:`allow-services`.

   * - Invite administrators to help with the setup process
     - :guilabel:`Settings > Users`
     - For information, see :ref:`admin-manage-users`.

   * - Create access tokens to authenticate API calls and data ingestion
     - :guilabel:`Settings > Access Tokens`
     - For information, see :ref:`admin-org-tokens`.

   * - Create and configure teams to ensure that correct groups of users have easy access to relevant dashboards and alerts
     - :guilabel:`Settings > Teams`
     - For information, see :ref:`admin-manage-teams`.

   * - Invite users
     - :guilabel:`Settings > Users`
     - For information, see :ref:`admin-manage-users`.

   * - Integrate with notification services to enable team workflows and communication channels
     - :guilabel:`Data Management`
     - For information, see :ref:`admin-notifs-index`.

   * - Create global data links
     - :guilabel:`Settings > Global Data links`
     - For information, see :ref:`link-metadata-to-content`.

   * - Understand your subscription usage
     - :guilabel:`Settings` 
     -  For information about APM subscription usage, see :ref:`apm-billing-usage-index`.

        For information about Infrastructure Monitoring subscription usage, see :ref:`monitor-imm-billing-usage`.

        For information about usage metrics for Observability Cloud, see :ref:`org-metrics`.
