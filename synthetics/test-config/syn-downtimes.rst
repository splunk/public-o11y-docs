.. _syn-downtimes:

************************************************************
Downtime
************************************************************


When you're working on your site, consider using a downtime configuration to account for maintenance and other planned irregularities in your monitoring. This page provides guidance on how to choose the downtime configuration rule you want to use for your for your situation. 

.. list-table::
  :header-rows: 1
  :widths: 20 80 

  * - :strong:`Downtime configuration`
    - :strong:`Description`
  * - Pause tests 
    - Suppose you are doing some maintenance on your site which impacts the login workflow. Choose to pause tests that are impacted by the maintenance so that you don't need to monitor the recurring failure messages around the known issue of being unable to login because of site maintenance. 
  * - Augment data 
    - If you are obligated to keep monitoring your site for SLAs even while you're doing maintenance, choose to augment the data with a dimension ``under_maintenance``.Then, you can filter out the augmented data so they don't impact your average metrics. All tests from a downtime window have the dimension ``under_maintenance=true``.


Schedule a downtime configuration 
============================================================

Schedule a downtime configuration to pause synthetic monitoring or augment test metrics ahead of site maintenance or anomalous behavior so that you don't skew your test data. 

The best practice is to schedule a downtime configuration with a 15 to 30 minute buffer before and after you start and stop your maintenance work. This gives the system an opportunity to catch up with the maintenance state and reduces the chances of Splunk Synthetic Monitoring generating false positives during maintenance operations.

Schedule requirements: 

* Downtimes configurations must be at least fifteen minutes long.
* Downtimes configurations can be a maximum of one year in advance and one year in duration. 

How to schedule a downtime configuration: 

#. In Splunk Synthetic Monitoring, go to settings, then :guilabel:`Downtime configurations`.
#. Select :guilabel:`Create downtime configuration`. 
#. Enter a unique name, select a downtime rule, and select the tests that you want this downtime rule to apply to. 
#. In the :guilabel:`Schedule` section, set a start and end date and time.
#. Select from the options in :guilabel:`Recurrence`.
#. Select :guilabel:`Create`. 


Modify a downtime configuration
------------------------------------------------------------

* Before a downtime configuration has run: 

   * If it's non-recurring you can edit or delete it.
   * If it's recurring you can edit it, but you can only delete it before its first run. Its status may still be displayed as :guilabel:`Scheduled`, but it's functionally locked after the first occurrence. 
   * To delete a downtime configuration, select the :guilabel:`Delete` action from the vertical dot menu (|verticaldots|).

* While a downtime configuration is active: 

   * If it's non-recurring you can't edit or delete it, but you can extend it or end it immediately.
   * If it's recurring you can't edit, delete, or extend it, but you can end it immediately. 
   
* After the first run of a downtime configuration, whether it's recurring or not, you can't delete or edit it.


Preview the downtime schedule
------------------------------------------------------------

If you selected a value other than :guilabel:`Does not repeat` in the :guilabel:`Recurrence` menu, the :guilabel:`Create a downtime configuration` form displays a preview of the first ten downtime configurations.


Mute alerts during downtime
============================================================

To mute any alerts associated with a test included in a downtime configuration window, see :ref:`mute-notifications`.


View the downtime configurations that apply to a given test
============================================================

To see downtime configurations that apply to any test and time range:

#. Select that test. 
#. Zoom in on the time span of either of the test's charts as needed. 
   
   The start and end time of any applicable downtime configurations are marked on the x-axis of the chart as triangles.



Records 
============================================================

The downtime configuration record shows when the window started and finished. The records are kept for thirteen months. 

During a downtime configuration window, there are gaps in synthetics metrics if you chose to the rule to pause tests. Any metrics with active tests for the rule to augment data have the dimension ``under_maintenance: true``.


