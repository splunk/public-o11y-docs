.. _try-now: 

******************************************************************************************
Validate your test configuration with try now 
******************************************************************************************

When you create a test, you have the option to validate the configuration of your test with a try now run. 

When to run a test or use try now to validate your test configuration 
========================================================================
There are two types of runs in Splunk Synthetic monitoring try now runs, and persisted runs. A try now run executes immediately and doesn't store any metrics. Try now runs are used to validate your test. A persisted run is executed on a schedule, metrics are stored, and used for monitoring. Persisted runs are results from any type of Browser, API, or Uptime test that runs on a schedule. Here is some guidance on when to use each type of run.

.. list-table::
  :header-rows: 1
  :widths: 50 50

  * - :strong:`Try now run`
    - :strong:`Persisted run`
  * - If you want to: 
        * add on a new test and you want to check that the steps you added are correct  
        * edit an existing test and you want to make sure that your changes 
    -  If you want to: 
        * review run results 
        * execute a test on a schedule 
