.. _test-config:

***************************************************
Configure your tests
***************************************************

.. meta::
    :description: Learn about preset variables in Splunk Synthetic Monitoring.

.. toctree::

   synth-configure-app
   synth-alerts
   built-in-variables
   global-variables
   public-locations
   private-locations
   rum-synth


To simulate diverse types of traffic to your site or application, use a range of configuration options to customize each of your tests.

.. raw:: html

  <embed>
    <h2>Devices</h2>
  </embed>

When you set up a test in Splunk Synthetic Monitoring, you can configure the viewport and network connection of the device from which the test is simulated. 

Because Browser tests capture the visual experience of a page, while Uptime and API tests only capture response data, viewport applies to Browser tests only. Network connection applies to all test types. 

.. raw:: html

  <embed>
    <h3>Viewport</h3>
  </embed>


Browser tests in Splunk Synthetic Monitoring capture the visual experience of a user interacting with your application. The viewport is the framed area on a device’s screen for viewing information, such as the browser window on a desktop. By default, Browser tests run from a desktop-sized viewport. You can configure tests to run from other viewport sizes to test the user experience from a variety of window sizes and device types. 

When you set up a test, you can choose the viewport size from a list of common devices, or set a custom viewport by height and width. 


.. raw:: html

  <embed>
    <h3>Network connection</h3>
  </embed>

You can run Browser, Uptime, or API tests to simulate network connections of various latencies, including Mobile LTE, Mobile 3G, DSL, and cable internet. Testing your site from a variety of connection types lets you monitor the experience of users in a variety of settings. 

.. raw:: html

  <embed>
    <h2>Variables</h2>
  </embed>

Use variables to fill in fields, provide URLs, and enter other information during your tests. 

.. list-table::
   :header-rows: 1
   :widths: 20 80 

   * - :strong:`Variable type`
     - :strong:`Description`

   * - Custom variables
     - Custom variables are local to a test, and their values can change over the course of a test. Use them to store a value of interest created in a step, to be consumed in another step downstream in a single test. 
  
   * - Built-in variables 
     - Built-in variables such as random values, dates and times, or location names, for use in your Browser and API Tests. See :ref:`built-in-variables` to learn more.  

   * - Global Variables 
     - Pre-saved, reusable variables you can define once and use across all your Browser and API tests. See :ref:`global-variables` to learn more.   

.. raw:: html

  <embed>
    <h2>Locations</h2>
  </embed>


Specify locations for your tests to simulate traffic from a range of checkpoints around the world, or use private locations to test sites from within a private network.

See :ref:`public-locations` for a list of available public locations. 

.. * See :ref:`private-locations` to set up private locations. 


.. raw:: html

  <embed>
    <h2>Test state and current status</h2>
  </embed>

Tests can be active or paused. You can use the play and pause buttons in the more menu (|more|) of your tests to pause or resume data collection. 

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
     - The test is not currently collecting data. 

   * - Failure
     - The test has encountered a failure. 



