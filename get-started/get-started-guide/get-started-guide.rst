.. _get-started-guide:

Get started guide for Splunk Observability Cloud admins 
*********************************************************

.. toctree::
   :hidden:
   :maxdepth: 3

   Phase 1: Onboarding readiness <onboarding-readiness>
   Phase 2: Initial rollout <initial-rollout>
   Phase 3: Scaled rollout <scaled-rollout>
   Optional and advanced configurations <get-started-guide-advanced-config>

The journey for getting started with Splunk Observability Cloud has 3 phases: onboarding readiness, initial rollout, and scaled rollout. In the onboarding readiness phase you set up users, teams, and access controls using roles and token management. In the initial rollout phase you get your data into Splunk Observability Cloud and set up the Splunk Observability Cloud solutions that apply to your organization. Solutions include: Infrastructure Monitoring, Application Performance Monitoring (APM), Real User Monitoring (RUM), and Synthetics. In the final, scaled rollout phase you establish repeatable observability practices using automation, data management, detectors, and dashboards.  

Use the following table to get a high-level overview of the primary setup steps involved in each phase. Use the links to each step to go directly to the detailed instructions or go to the phase topic to view all phase steps in detail. In the table, you can also reference optional and advanced configurations that you can make to your setup as part of each phase of your journey. Finally, use the links to education resources for each phase to ensure you have the foundational knowledge and skills to successfully setup Splunk Observability Cloud.

.. note:: This guide is for Splunk Observability Cloud users with the admin role. 
  
.. image:: /_images/get-started/onboarding-guide-2point0-flowonly.svg
   :width: 100%
   :alt: .

.. list-table:: 
   :header-rows: 1
   :widths: 10 30 30 30
   :width: 100%

   * - 
     - :strong:`Phase 1: Onboarding readiness`
     - :strong:`Phase 2: Initial rollout`
     - :strong:`Phase 3: Scaled rollout`

   * - :strong:`Phase description`
     - Set up users, teams, and access controls through roles and token management
     - Bring data in and set up your desired Splunk Observability Cloud solutions
     - Establish repeatable observability practices through automation, data management, detectors, and dashboards

   * - :strong:`Primary setup steps`
     - #. :ref:`phase1-create-trial`
       #. :ref:`phase1-network`
       #. :ref:`phase1-user-access`
       #. :ref:`phase1-teams-tokens`

       See :ref:`get-started-guide-onboarding-readiness` for detailed steps.

     - #. :ref:`phase2-initial-environment`
       #. :ref:`phase2-infra-mon`
       #. :ref:`phase2-apm`
       #. :ref:`phase2-rum`
       #. :ref:`phase2-synthetics`

       See :ref:`get-started-guide-initial-rollout` for detailed steps.

     - #. :ref:`phase3-pipeline`
       #. :ref:`phase3-rotate-token`
       #. :ref:`phase3-mpm`
       #. :ref:`phase3-names-data`
       #. :ref:`phase3-dash-detect`
       #. :ref:`phase3-onboard-all`
 
       See :ref:`get-started-guide-scaled-rollout` for detailed steps.

   * - :strong:`Optional and advanced configurations`
     - * :ref:`advanced-config-custom-URL`
       * :ref:`advanced-config-parent-child`
       * :ref:`advanced-config-logs`
       * :ref:`advanced-config-3rd-party`

       See :ref:`phase1-advanced-config` for detailed steps.

     - * Set up an application framework
       * Complete advanced configurations for the collector
       * Create custom dashboards using charts based on ingested metrics
       * Configure detectors and alerts for specific metric conditions
       * Review metric names and ingested data

     - * Set up Network Explorer to monitor network environment
       * Analyze and troubleshoot usage, limits, and throttles
       * Automate key workflows to accelerate onboarding and standardize consistent practices
       * Identify complex and customized use cases to enhance value and return on investment

   * - :strong:`Education resources`
     - * Get familiar with Open Telemetry concepts
       * Review the default dashboards and detectors
     - * Set up training plans for pilot users
       * Understand OTel sizing requirements
     - * Identify and review mean time to resolution (MTTR)