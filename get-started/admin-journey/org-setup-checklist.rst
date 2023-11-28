.. _org-setup-checklist:

********************************************************************************
Org setup checklist for Splunk Observability Cloud
********************************************************************************

.. meta::
   :description: Overview of the Observability Cloud admin tasks and links to the documentation.

The goal of this Onboarding period is to familiarize you with the platform, and make sure your onboarding team is ready to support the rest of the organization. During this stage, the main focus is on the technical incubation and training of the staff responsible for the overall management of Splunk Observability Cloud. This is defined into two sets of activities:

- The first set focuses on the integration of Splunk Observability Cloud into the existing environment and standards. 
- The second set focuses on setting up the framework for additional users of the platform. These activities will focus on setting up metric, trace and log integrations, adding Splunk Observability Cloud instrumentation libraries into your development pipelines and best practices.

Here is a list of common activities for the initial 30 day onboarding period:


Multi-team administration
==============================================================


.. list-table::
   :header-rows: 1
   :widths: 30, 70

   * - :strong:`Task Description`
     - :strong:`Documentation`

   * - Request a trial org.
     - If you don't have a paid instance of Splunk Observability Cloud, request a trial org. Usually the org is already created as part of the evaluation process that has taken place as part of the initial process when acquiring the Splunk Observability Cloud. 
     You can verify access to your organizationrg via the link that has been provided to you https:///app.<realm>.signalfx.com where <realm> is specific to the region that has been set up for you. This can be  us0, us1, us2, eu0, aus or jp0. If you do not have this information, please reach out to you technical contact with the request to verify if there is an active trial for your account. If there is no active organization available for your account, you can request a Splunk Observability Cloud Free Trial. :ref:`education-resources`

   * - Decide how to manage users and provide access to Splunk Observability Cloud.
     - There are several options:
  
         * Using an external LDAP and control access via Single Sign On
            - :ref:`sso-about`. Splunk Observability Cloud offers integration with various Single Sign on solutions. You can find instructions on how to enable the various integration types in our documentation.  
            Given, this will often require admin permission within the Local LDAP/SSO solution, please make sure you have the required permissions for your LDAP/SSO solution, and/or have a user with admin privileges available to assist with the setup.

            - Users will be managed in your external LDAP,  they will be replicated automatically to Splunk Observability Cloud.
            - To further secure access you can disable local logins. To remove the ability to login with a regular username and password and force users to use the SSO access, you will need to create a support ticket, please see the example below. Once the support ticket is created, the Splunk support organization will make sure any access to your org via username and password is blocked, while allowing access with a username/password for those in the whitelist in case SSO fails. We strongly recommend having at least two users with full Admin privilege properly set up in your allow list.

            “Hello Splunk Support,
            Note that we grant Splunk support access to [Company] organizations in order to handle the current case.


            Please disable local login for below Splunk Observability Cloud organizations as we have configured access via SSO.


            Splunk Observability Cloud Orgname  OrgID            Realm
            Your Company org 1                      EXXXXXAA   US1 
            Your Company org 2                      AAXXXXXE   JP1

            please whitelist below 2 ids for local authentication -
            Local.admin.1@yourcompany.org 
            Local.admin.2@yourcompany.org
              “

            To find your org name and orgId: In the Splunk Observability Cloud page, go to Settings, and click on your username above the settings menu. This will bring you to your profile page. 
            Click on the Organizations pane, this will bring you to the list of organizations you have access to.
            Here you will find the Realm, Org Name and Org ID Information required (note for current org information).




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

