.. _try-now: 

******************************************************************************************
Validate your test configuration with try now 
******************************************************************************************

.. meta::
    :description: Use a try now run in Splunk Synthetic Monitoring to validate tests and check that your test configurations are correct and accurate. 

When you create a test, you have the option to validate the configuration of your test with a try now run. 

When to run a test or use try now to validate your test configuration 
========================================================================
There are two types of runs in Splunk Synthetic Monitoring try now runs, and persisted runs. A persisted run executes on a schedule and run results are stored, and used for monitoring. Persisted runs are a result of any type of Browser, API, or Uptime test that runs on a schedule.  A try now run executes immediately and results are ephemeral and don’t impact persisted run metrics. Try now runs are used to validate a test. Here is some guidance on when to use each type of run.

.. list-table::
  :header-rows: 1
  :widths: 50 50

  * - :strong:`Type of run`
    - :strong:`Use cases`
  * - Try now run
    -
        * Add on a new test and you want to check that the steps you added are correct.  
        * Edit an existing test and you want to make sure that your changes. 

  * - Persisted run
    - 
        * Review run results. 
        * Run a test on a schedule. 

Limits
========================================================================
You can run a maximum of 1,000 try now runs per hour for each org. 

