.. _try-now: 

******************************************************************************************
Validate your test configuration with try now 
******************************************************************************************

.. meta::
    :description: Use a try now run in Splunk Synthetic Monitoring to validate tests and check that your test configurations are correct and accurate. 


When you're building a test, try now adds a layer of convenience to troubleshooting and validating your test configuration. As you add steps, select Try now to see if the test you built has a valid setup. 

When to use try now to validate your test configuration 
========================================================================
There are two types of runs in Splunk Synthetic Monitoring try now runs, and persisted runs. A persisted run executes on a schedule and run results are stored and used for monitoring. Persisted runs are a result of any type of Browser, API, or Uptime test that runs on a schedule. A try now run executes immediately, results are ephemeral, and don’t impact persisted run metrics. Try now runs are for validating the configruation of your test. Here is some guidance on when to use each type of run.

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



Example
=======
Here is a situation when you might want to use try now. Suppose you have a Browser test which monitors an add to cart workflow in your application. You want to add a set of steps to verify that users can add a promo code during the payment process. 

1. Open the edit view of the test. 
2. Add a set of steps for the promo code process. 
3. Select :strong:`Try now` to run.

The results from the try now run show whether or not the test completed successfully. If there is an issue with one of your steps, the try now results show which step is the problem and you can troubleshoot before adding the test to your monitoring suite. 

Limits
========================================================================
You can run a maximum of 1,000 try now runs per hour for each org. 

