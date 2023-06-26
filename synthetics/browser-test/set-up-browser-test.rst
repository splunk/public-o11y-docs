
.. _set-up-browser-test:

**************************************
Set up a Browser test
**************************************

.. meta::
    :description: Learn how to set up a Browser test in Splunk Synthetic Monitoring.


A Browser test lets you monitor the user experience for a single page or a multi-step user flow by running a synthetic test of the URLs you provide. Use this type of test to monitor conversion paths or any path that requires multiple steps or runs JavaScript. 

For each page checked in a Browser test, Splunk Synthetic Monitoring captures an HTTP Archive (HAR) file, represented in a waterfall chart, which illustrates the performance of specific resources within the page. Browser tests also capture a set of 40+ metrics. See :ref:`waterfall-chart` and :ref:`browser-metrics` to learn more.

.. note::
   If the site or application you are monitoring uses allow lists or block lists for visitors or an analytics tool to measure traffic, check that it's configured to accommodate traffic from Splunk Synthetic Monitoring. See :ref:`synth-configure-app` for instructions. 




Set up a Browser test
=========================

Follow these steps to set up a Browser test:

#. From the landing page of Splunk Observability Cloud, navigate to Splunk Synthetic Monitoring. 
#. Under Tests, select :guilabel:`Add New Test` and select :guilabel:`Browser Test` from the drop-down list. The test creation view opens. 
#. In the :guilabel:`Name` field, enter a name for your test. 
#. In the :guilabel:`Go to URL` field, enter the URL for the page you want to test, including ``http`` or ``https``.
#. To add steps and synthetic transactions to your Browser test, select :guilabel:`Edit steps or synthetic transactions`. See :ref:`add-transactions` to learn more. 
#. As you build your test, you can use :guilabel:`Try now` to check that the configuration of your test is valid. Run results aren't stored. For more, see :ref:`try-now`. 
#. (Optional) Add a wait time before a step executes. See, :ref:`browser-wait-times`.
#. Save your test. 


.. include:: /_includes/synthetics/configure-test.rst


View your Browser test
====================================

Now that you created and saved a test, check whether it’s collecting data as expected: 

#. From the :guilabel:`Tests` list, select the three-dot :guilabel:`Actions` menu and select :guilabel:`Play` arrow icon to manually trigger a live run of the test, or wait for at least one duration of the test frequency you set so that the test has time to run and collect data. 
#. Select the test you’re interested in to open the :guilabel:`Test history` view, where you can view visualizations of recent test results and metrics.

Interpret your Browser test results
======================================
See :ref:`browser-test-results` to learn more about Browser test results. 


Edit your Browser test
========================

To edit your Browser test, do the following:

#. Select the row for the test you want to edit in the :guilabel:`Tests` list to open the :guilabel:`Test history` view.
#. Select :guilabel:`Edit test` to edit your test configuration.

If you change the name of your test or the name of a synthetic transaction, it may take up to 20 minutes for the updated name to appear in your charts and detectors.



.. _browser-adv-setting:

Advanced settings for Browser tests 
============================================================

There are many reasons why you might want to configure advanced settings for your synthetics tests. Here are a few: 

* Accessing a site with a modal that appears randomly and interrupts the flow of the test. For example, a marketing modal might prompt a user to sign up for a rewards program. To circumvent this issue you can set a cookie to stop the popup modal from appearing and interfering with your test.  
* Running a test on a site that requires users to log in to access the site. 
* Specifying the type of device on which you want to run your test by setting the ``User-Agent`` header on requests.
* Testing out a CDN. For example, you might want to load the HTML page in the browser, but rewrite the hosts for some or all requests to a new host.
* Filtering out requests from analytics on the back end by sending a specific header in the requests.
* Running a test on a pre-production site that has a self-signed certificate.



.. _browser-cookies:

Set cookies
-------------

Set cookies in the browser before the test starts. For example, to circumvent a popup modal from randomly appearing and interfering with your test, you can set cookies. Any cookies that are set will apply to the domain of the starting URL of the check. Splunk Synthetics Monitoring uses the :new-page:`public suffix list <https://publicsuffix.org/>` to determine the domain. 

.. _browser-headers:

Set custom headers
--------------------------

Specify custom headers to send with each request. For example, you can add a header in your request to filter out requests from analytics on the back end by sending a specific header in the requests. You can also use custom headers to set cookies. 


.. _browser-auth:


Authentication
--------------------------

Add credentials to authenticate with sites that require additional security protocols, for example from within a corporate network. By using concealed global variables in the Authentication field, you create an additional layer of security for your credentials simplify the ability to share credentials across checks. For more, see :ref:`concealed-gv`

The Authentication field is available for Browser tests in Chrome only. Firefox tests support Basic Authentication. Splunk Synthetic Monitoring supports a suite of authentication protocols. At this time, Splunk Synthetic Monitoring supports the following in Chrome:

* Basic Authentication
* NTLM
* Kerberos
* Digest
 

.. _browser-overrides:

Host overrides
---------------------------------------
Add host override rules to reroute requests from one host to another. For example, you can create a host override to test an existing production site against page resources loaded from a development site or a specific CDN edge node.


.. _browser-validation:

Enforce SSL/TLS validation 
--------------------------
When activated, this feature is used to enforce the validation of expired, invalid hostname, or untrusted issuer on SSL/TLS certificates.

.. note::
 When testing pre-production environments that have self-signed or invalid certificates, it's best to leave SSL/TLS validation feature deactivated. 

.. _browser-exclude:



Wait times 
---------------------
Optimize your test coverage by adding custom wait times to capture longer page loads and improve the accuracy of run results. Applications with long load times can cause a Browser test to fail. If you know that there are certain steps in a workflow that take longer than 10 seconds, add a custom wait time to your Browser test. 

* Wait times are available with Browser tests only. 
* The maximum cumulative wait time for each test is 200 seconds. 

Follow these steps to configure custom wait times for your Browser tests: 

#. In Splunk Synthetic Monitoring, select :strong:`Edit` on the Browser test to open the configuration panel.
#. Select :strong:`New step > Wait`, from the step type drop down.
#. Add a name and the wait time in ms.
#. When you finish instrumenting your test, save the workflow: :strong:`Return to test > Save`.

The following image shows how to configure a test to go to a URL, wait for 10 seconds, then log in. 

.. image:: /_images/synthetics/wait-times-example.png
   :alt: This image shows a browser test with three steps: go to url, wait 20 seconds, then log in. 


.. _browser-wait-times:


Example
==================
For an example, see  :ref:`browser-test-scenario`.


