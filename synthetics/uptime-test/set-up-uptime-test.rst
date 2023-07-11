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
#. As you build your test, you can use :guilabel:`Try now` to check that the configuration of your test is valid. Run results aren't stored. For more, see :ref:`try-now`.  

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



.. _uptime-advanced-settings:

Advanced settings for uptime tests 
================================================

There are many reasons why you might want to configure advanced settings for your synthetics tests. Here are a few: 

* Accessing a site with a modal that appears randomly and interrupts the flow of the test. For example, a marketing modal might prompt a user to sign up for a rewards program. To circumvent this issue you can set a cookie to stop the popup modal from appearing and interfering with your test.  
* Running a test on a site that requires users to log in to access the site. 
* Specifying the type of device on which you want to run your test by setting the ``User-Agent`` header on requests.
* Testing out a CDN. For example, you might want to load the HTML page in the browser, but rewrite the hosts for some or all requests to a new host.
* Filtering out requests from analytics on the back end by sending a specific header in the requests.
* Running a test on a pre-production site that has a self-signed certificate.


.. _uptime-request-time:

Select an HTTP method
---------------------------
Select an HTTP method and add a payload. 


.. _uptime-custom-headers:

Set custom headers 
---------------------------

Specify custom headers to send with each request. For example, you can add a header in your request to filter out requests from analytics on the back end by sending a specific header in the requests. You can also use custom headers to set cookies. 

.. _uptime-success-critera:

Activate SSL/TLS validation
----------------------------
When activated, this feature is used to enforce the validation of expired, invalid hostname, or untrusted issuer on SSL/TLS certificates. When testing pre-production environments that have self-signed or invalid certificates, it's best to leave this feature deactivated.


.. _uptime- assertions:

Add assertions
----------------

You can make an assertion on two values. Add two parameters along with the comparison that you would like to perform between the two. There are three types of comparisons: string, numeric, and regular expression. For string and numeric comparisons, values are coerced to the comparison type before the comparison is made. For a regular expression comparison, the first parameter is a string and the second parameter is a regular expression. An assertion step fails if the assertion is false when the step runs.



Example
==================
For an example, see :ref:`uptime-test-scenario`.
