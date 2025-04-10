.. _test-status:

***************************************************
Test status
***************************************************

.. meta::
    :description: words

    
.. toctree::

   test-kpis
   

The Splunk Synthetics landing page is the :guilabel:`Test Overview`. This page displays a paginated table of all synthetic tests that you have access to. Each page in the table contains a maximum of 20 tests.


Filter tests
========================================================================================

To filter the table, select a test type, location, key-value pair, and more.

.. image:: /_images/synthetics/syn-filter-test.png
      :width: 60%
      :alt: This image shows the filter env:prod for all tests on the Synthetics homepage.



View test state
========================================================================================

Splunk Synthetics updates the current state of each test every time you load the :guilabel:`Test Overview` page. The following table describes the possible values for test state.


.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Test state`
     - :strong:`Description`

   * - Active
     - The test is running. Data is being collected at the set interval. You can view this data on the :guilabel:`Test History` page. 

   * - Paused
     - The test is paused. To resume data collection, unpause it.



View run status
========================================================================================

The :guilabel:`Last run status` column displays the outcome of each test's last run.  

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Last run status`
     - :strong:`Description`

   * - Success
     - The last run succeeded. 

   * - Pending
     - Splunk Synthetics is still retrieving the run status.

   * - Failed 
     - The last run encountered a failure. 



Single actions
========================================================================================

To perform an action on a single test, select the kabob menu (|more|) in its rightmost column. Supported actions are play and pause.


Bulk actions
========================================================================================

You can perform bulk actions on multiple tests simultaneously. Supported actions are play, pause, and delete. No special permissions are required for bulk actions.

To perform a bulk action on tests:

#. Select the tests to change by either: 

   * Selecting the checkbox next in the leftmost column of one or more tests.
   * Selecting the checkbox in the table header. This checkbox selects all tests on the current page -- a maximum of 20 tests. You can scroll through the pages to select more tests. The maximum you can select at one time is 500. 

#. At the top of the table, select the desired action: :guilabel:`Play`, :guilabel:`Pause`, or :guilabel:`Delete`.
   If the entire bulk action succeeds, the :guilabel:`Test state` column displays the new state of each of the affected tests. If any part of the bulk action fails, the entire bulk action is cancelled and none of the tests are updated. For example, if the bulk action was to delete 400 tests and one deletion fails, none of the tests are deleted.

