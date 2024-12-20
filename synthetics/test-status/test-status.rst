.. _test-status:

***************************************************
Test status
***************************************************

.. meta::
    :description: words

    
.. toctree::

   test-kpis
   
========================================================================================
Test state and current status
========================================================================================
You can use the play and pause buttons in the more menu (|more|) of your tests to pause or resume data collection. 

The current status of a test is updated every time you load the :guilabel:`Test Overview` page in Splunk Synthetic Monitoring. The following table describes the possible status types for each test. 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Current status`
     - :strong:`Description`

   * - Pending
     - Splunk Synthetic Monitoring is still retrieving the status of this test. 

   * - Available
     - The test is functioning properly. If the test is active, data is being collected at the set interval and can be viewed in the :guilabel:`Test History` page. If the test is paused, it can be unpaused and will resume collecting data.

   * - No Data 
     - The test isn't currently collecting data. 

   * - Failure
     - The test encountered a failure. 



========================================================================================
Filter tests
========================================================================================
You can filter by test type, key-value pairs, and more. 

.. image:: /_images/synthetics/syn-filter-test.png
      :width: 60%
      :alt: This image shows the filter env:prod for all tests on the Synthetic homepage..
