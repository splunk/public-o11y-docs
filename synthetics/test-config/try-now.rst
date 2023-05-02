.. _try-now: 

******************************************************************************************
Validate your test configuration with try now 
******************************************************************************************

When you create a test, you have the option to validate the configuration of your test with a try now run. 

When to run a test or use try now to validate your test configuration 
========================================================================
There are two types of runs in Splunk Synthetic Monitoring try now runs, and persisted runs. A persisted run executes on a schedule and run results are stored, and used for monitoring. Persisted runs are a result of any type of Browser, API, or Uptime test that runs on a schedule.  A try now run executes immediately and run results aren't stored. Try now runs are used to validate a test. Here is some guidance on when to use each type of run.

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
        * Execute a test on a schedule. 


