.. _onboarding-guide:

Onboarding guide for Splunk Observability Cloud admins 
*********************************************************

.. toctree::
   :hidden:
   :maxdepth: 3

   Phase 1: Onboarding readiness <onboarding-readiness>
   Phase 2: Initial rollout <initial-rollout>
   Phase 3: Scaled rollout <scaled-rollout>

The onboarding journey for Splunk Observability Cloud has 3 phases: onboarding readiness, initial rollout, and scaled rollout. In the onboarding readiness phase you set up users, teams, and access controls using roles and token management. In the initial rollout phase you get your data into Splunk Observability Cloud and set up the Splunk Observability Cloud solutions that apply to your organization. Solutions include: Infrastructure Monitoring, Application Performance Monitoring (APM), Real User Monitoring (RUM), and Synthetics. In the final, scaled rollout phase you establish repeatable observability practices using automation, data management, detectors, and dashboards.  

Use the following table to get a high-level overview of the core setup steps involved in each stage. You can also reference common, optional configurations to be made to your setup as part of your onboarding journey. Finally, use the links to education resources for each phase to ensure you have the foundational knowledge and skills to successfully setup Splunk Observability Cloud.

.. image:: /_images/get-started/onboarding-guide-2point0-flowonly.svg
   :width: 100%
   :alt: The Open in Splunk platform icon is at the top, right-hand side of the Logs table.

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

   * - :strong:`Core setup steps`
     - #. Create a trial for your organization
       #. Analyze your required network communication
       #. Decide how to manage user access
       #. Plan your teams structure and token management strategy to control access

       See :ref:`onboarding-guide-onboarding-readiness` for detailed steps.

     - #. Select an initial rollout environment to get data in
       #. Set up Infrastructure Monitoring
       #. Set up Application Performance Monitoring
       #. Set up Real User Monitoring
       #. Set up Synthetics

       See :ref:`onboarding-guide-initial-rollout` for detailed steps.

     - #. Add Splunk Observability Cloud to your CI/CD pipeline
       #. Automate the token rotation process
       #. Use metrics pipeline management tools to reduce cardinality of metric time series (MTS)
       #. Review metric names and ingested data
       #. Build advanced dashboards and detectors
       #. Onboard all users and teams
 
       See :ref:`onboarding-guide-scaled-rollout` for detailed steps.

   * - :strong:`Optional configurations`
     - * Request a custom URL for your organization
       * Separate your teams with a parent-child setup
       * Set up Log Observer Connect for Splunk Platform
       * Create an architecture prototype
       * Analyze how to collect metrics from cloud providers
       * Configure and implement host and Kubernetes metrics 
       * Collect data from third-party metrics providers

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



