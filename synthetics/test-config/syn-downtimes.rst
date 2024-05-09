.. _syn-downtimes:

************************************************************
Schedule a downtime configuration
************************************************************


When you are working on your site, consider using a downtime configuration to account for maintenance and other planned irregularities in your monitoring. Here is some guidance on how to choose the type of downtime configuration for your situation. 

.. list-table::
  :header-rows: 1
  :widths: 20 80 

  * - :strong:`Downtime configuration`
    - :strong:`Description`
  * - Pause tests 
    - Suppose you are doing some maintenance on your site which impacts the login workflow. Choose to pause tests that are impacted by the maintenance so that you don't need to monitor the recurring failure messages around the known issue of being unable to login because of site maintenance. 
  * - Augment data 
    - If you are obligated to keep monitoring your site for SLAs even while you're doing maintenance, choose to augment the data with a dimension ``under_maintenance``. Then, you can filter out the augmented data so they don't impact your average metrics.  


Schedule a downtime configuration 
====================================

How to schedule a downtime configuration: 

1. In Splunk Synthetic Monitoring, go to settings, then :strong:`Downtime configurations`.
2. Select :strong:`Create downtime configuration`. 
3. Enter a name, choose a type, and select the test you want to include. 
4. Set up the schedule and select :strong:`Create`. 


Schedule requirements: 

* at least fifteen minutes long
* up to one year in advance and one year in duration 


Edit a downtime configuration 
===================================
When a downtime configuration is active, you can't edit, or delete it. You can extend the duration, or cancel while it is active. The record of the results from the tests are stored for 13 months. 

