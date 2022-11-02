.. _set-up-uptime-test:

**************************************
Set up an Uptime test
**************************************

.. meta::
    :description: Learn how to set up an Uptime test in Splunk Synthetic Monitoring.
  
An Uptime test lets you make a request to a specified URL or port address and monitor its response time and response code. Uptime tests record three metrics from each run: response time, DNS time, and time to first byte. 

Decide whether you want to set up an HTTP Uptime test or Port Uptime test, and then follow the steps below to set up your test. To learn more about the types of Uptime tests, see :ref:`uptime-test`.

.. note::
   If the site or application you are monitoring uses allow lists or block lists for visitors or an analytics tool to measure traffic, check that it is configured to accommodate traffic from Splunk Synthetic Monitoring. See :ref:`synth-configure-app` for instructions. 

.. _configure-http-test:

Configure an HTTP Uptime test
==============================

Follow these steps to set up a HTTP Uptime test: 

#. From the landing page of Splunk Observability Cloud, navigate to Splunk Synthetic Monitoring. 
#. In the :guilabel:`Tests` section, select :guilabel:`Add New Test` and select :guilabel:`Uptime Test` from the drop-down list. This opens the :guilabel:`New Uptime Test` page.
#. Make sure the :guilabel:`HTTP` tab is selected.
#. In the :guilabel:`Name` field, enter a name for your test. You will use this name to identify data from the test in your alerts and reports. 
#. In the :guilabel:`URL` field, paste the URL for the page you want to test, including ``http`` or ``https``.

.. _configure-port-test:

Configure a Port Uptime test
============================

Follow these steps to set up a Port Uptime test:

#. From the landing page of Splunk Observability Cloud, navigate to Splunk Synthetic Monitoring. 
#. In the :guilabel:`Tests` section, select :guilabel:`Add New Test` and select :guilabel:`Uptime Test` from the drop-down list. This opens the :guilabel:`New Uptime Test` page.
#. Select the :guilabel:`Port` tab.
#. In the :guilabel:`Name` field, enter a name for your test. You will use this name to identify data from the test in your alerts and reports. 
#. In the :guilabel:`Address` field, use the drop-down list to indicate whether the port you are monitoring follows TCP or UDP protocol. Enter the host and port addresses. 

.. include:: /_includes/synthetics/configure-test.rst

View your Uptime test
======================

Now that you created and saved a test, check whether it’s collecting data as expected: 

#. From the :guilabel:`Tests` list, select the three-dot :guilabel:`Actions` menu and select :guilabel:`Play` arrow icon to manually trigger a live run of the test, or wait for at least one duration of the test frequency you set so that the test has time to run and collect data. 
#. Select the test you’re interested in to open the :guilabel:`Test History` view, where you can view visualizations of recent test results and metrics.

Interpret your Uptime test results
====================================
See :ref:`uptime-test-results` for an overview of run-level Uptime test results. 



