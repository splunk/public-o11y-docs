
.. _set-up-browser-test:

**************************************
Set up a Browser test
**************************************

.. meta::
    :description: Steps to set up a browser test to track the performance of specific site resources, or a multi-step user flow, in Splunk Synthetic Monitoring.


Use a Browser test to monitor the user experience for a single page or a multi-step user flow by running a synthetic test of the URLs you provide. Use this type of test to monitor conversion paths or any path that requires multiple steps or runs JavaScript. For an example, see :ref:`browser-test-scenario`.


For each page checked in a Browser test, Splunk Synthetic Monitoring captures an HTTP Archive (HAR) file, represented in a waterfall chart, which illustrates the performance of specific resources within the page. Browser tests also capture a set of 40+ metrics. See :ref:`waterfall-chart` and :ref:`browser-metrics` to learn more.

.. note::
   If the site or application you are monitoring uses allow lists or block lists for visitors or an analytics tool to measure traffic, check that it's configured to accommodate traffic from Splunk Synthetic Monitoring. See :ref:`synth-configure-app` for instructions.




Set up a Browser test
=========================


For optimal experience, synthetics browser tests use a stable version of Google Chrome: ``116.0.5845.96-1`` to simulate user activity.

Follow these steps to set up a Browser test:

#. From the landing page of Splunk Observability Cloud, navigate to Splunk Synthetic Monitoring.

#. Under Tests, select :guilabel:`Add New Test` and select :guilabel:`Browser Test` from the drop-down list. The test creation view opens.

#. In the :guilabel:`Name` field, enter a name for your test.

#. To add steps and synthetic transactions to your Browser test, select :guilabel:`Edit steps or synthetic transactions`. See :ref:`add-transactions` to learn more.

#. As you build your test, you can use :guilabel:`Try now` to check that the configuration of your test is valid. Try now results are ephemeral and don’t impact persisted run metrics. For more, see :ref:`try-now`.

#. (Optional) Add a wait time before a step executes. See, :ref:`browser-wait-times`.
#. (Optional) Turn on automatic test retry in the event a test initially fails.


#. Save your test.


.. include:: /_includes/synthetics/configure-test.rst

Import a JSON file generated from Google Chrome Recorder
============================================================

To simplify the test creation process, make a recording using Google Chrome Recorder. Then, import the JSON file to Splunk Synthetic Monitoring to automatically import the steps in the workflow instead of adding each individual interaction you want to track. Recordings are especially helpful for complex user flows, or tests that have a large number of steps.


Create a Google Chrome Recorder JSON file
--------------------------------------------------------

For steps on how to make a Google Chrome recording, see :new-page:`Record, replay, and measure user flows <https://developer.chrome.com/docs/devtools/recorder/>` in the Chrome Developer user guide in Google documentation.

:strong:`Requirements`

* In Google Chrome Recorder, select either CSS or XPATH for Selector type to record.

* Browser tests run in one Browser tab only. Your recording can't span multiple tabs.

Import a Google Chrome Recorder JSON file
--------------------------------------------------------

.. Note:: Included within recordings from Google Chrome Recorder is the specific viewport size of the browser window used in the recording. When imported, this recorded viewport is not imported into the Synthetics Browser test. Check that the Synthetics Browser test device selection accurately represents the viewport size used by the recorded browser window.


Follow these steps to import a JSON file from Google Chrome Recorder to a new or existing Browser test.


#. In Splunk Synthetic Monitoring, select :guilabel:`Edit` on an existing Browser test to open the test configuration page, or create a new test.
#. Select Import.
#. Upload the Google Chrome Recorder JSON file.
#. If a step is not supported, you need to edit or delete the step in the test configuration page.
#. (Optional) Add a name to each step.
#. Save your changes.


Troubleshoot unsupported steps
=======================================
If your recording contains unsupported steps, you need to edit the step to reformat it into one of the supported Synthetic Browser step types. The following table shows how Google Chrome Recorder step names and code snippets map to their counterparts in Splunk Synthetic Browser tests. These examples use Buttercup Games, a fictitious game company.


.. tabs::

       .. tab:: ``navigate``

          .. code-block:: javascript

             {
              // Google Chrome Recorder
               "type": "navigate",
               "url": "www.buttercupgames.com",
               "assertedEvents": [
                  {
                     "type": "navigation",
                     "url": "www.buttercupgames.com",
                     "title": "Buttercup Games"
                  }
               ]
               }

       .. tab:: ``go_to_url``

          .. code-block:: javascript

               {
               // Splunk Synthetic Monitoring code snippet
               "name": "Go to URL",
               "type": "go_to_url",
               "url": "www.buttercupgames.com",
               "wait_for_nav": true
               }

.. tabs::

       .. tab:: ``click`` with resulting navigation

          .. code-block:: javascript

               {
               // Google Chrome Recorder
                  "type": "click",
                  "target": "main",
                  "selectors": [
                     [
                        "div:nth-of-type(2) > div:nth-of-type(2) a > div"
                     ],
                     [
                        "xpath//html/body/main/div/div/div[2]/div[2]/div/a/div"
                     ]
                  ],
                  "offsetY": 211,
                  "offsetX": 164,
                  "assertedEvents": [
                     {
                        "type": "navigation",
                        "url": "www.buttercupgames.com/product/example",
                        "title": "Buttercup Games"
                     }
                  ]
               }
       .. tab:: ``click_element`` with resulting navigation:

          .. code-block:: javascript

              {
               // Splunk Synthetic Monitoring code snippet

                  "name": "",
                  "type": "click_element",
                  "selector_type": "css",
                  "selector": "div:nth-of-type(2) > div:nth-of-type(2) a > div",
                  "wait_for_nav": true
               }




.. tabs::

       .. tab:: ``click`` without resulting navigation:

          .. code-block:: javascript

             {
              // Google Chrome Recorder
              "type": "click",
               "target": "main",
               "selectors": [
                  [
                     "div:nth-of-type(2) > div:nth-of-type(2) a > div"
                  ],
                  [
                     "xpath//html/body/main/div/div/div[2]/div[2]/div/a/div"
                  ]
               ],
               "offsetY": 211,
               "offsetX": 164,
               "assertedEvents": []

               }

       .. tab:: ``click_element`` without resulting navigation:

          .. code-block:: javascript

               {
               // Splunk Synthetic Monitoring code snippet

                  "name": "",
                  "type": "click_element",
                  "selector_type": "css",
                  "selector": "div:nth-of-type(2) > div:nth-of-type(2) a > div",
                  "wait_for_nav": false
               }

.. tabs::

       .. tab:: ``change``:

          .. code-block:: javascript

             {
              // Google Chrome Recorder
                  "type": "change",
                  "value": "5",
                  "selectors": [
                     [
                        "#quantity"
                     ],
                     [
                        "xpath///*[@id=\"quantity\"]"
                     ]
                  ],
                  "target": "main"
                  }

      .. tab:: ``enter_value``:

               .. code-block:: javascript

                  {
                  // Splunk Synthetic Monitoring code snippet
                        "name": "",
                        "type": "enter_value",
                        "selector_type": "id",
                        "selector": "quantity",
                        "option_selector_type": "index",
                        "option_selector": "5",
                        "wait_for_nav": false
                        }



.. tabs::


      .. tab:: ``waitForElement``:

               .. code-block:: javascript

                  {
                  // Google Chrome Recorder
                        "type": "waitForElement",
                        "selectors": [
                           [
                              "body",
                              "#homepage_example",
                              ".css-4t2fjl",
                              ".eanm77i0"
                           ]
                        ]
                        }

      .. tab:: ``assert_element_present``:

               .. code-block:: javascript

                  {
                  // Splunk Synthetic Monitoring code snippet
                        "name": "",
                        "type": "assert_element_present",
                        "wait_for_nav": false,
                        "selector_type": "css",
                        "selector": "body,#homepage_example, .css-4t2fjl, .eanm77i0"
                     }


.. tabs::


      .. tab:: ``waitForElement`` visible false:

               .. code-block:: javascript

                  {
                  // Google Chrome Recorder
                     "type": "waitForElement",
                     "selectors": [
                        [
                           "body",
                           "#homepage_product_brand-example",
                           ".css-4t2fjl",
                           ".eanm77i0"
                        ]
                     ],
                     "visible": false
                  }

      .. tab:: ``assert_element_not_present``:

               .. code-block:: javascript

                  {
                  // Splunk Synthetic Monitoring code snippet
                        "name": "",
                        "type": "assert_element_not_present",
                        "wait_for_nav": false,
                        "selector_type": "css",
                        "selector": "body,#homepage_product_brand-example"
                        }


.. tabs::


      .. tab:: ``customStep``:
               .. code-block:: javascript

                  {
                  // Google Chrome Recorder
                     "type": "customStep",
                     "timeout": 5000,
                     "target": "main",
                     "name": "customParam",
                     "parameters": {}
                  }


      .. tab:: ``run_javascript``:

               .. code-block:: javascript

                  {
                  // Splunk Synthetic Monitoring code snippet
                     "name": "Unsupported step customStep",
                     "type": "run_javascript",
                     "value": "",
                     "wait_for_nav": false
                  }



View your Browser test
====================================

Now that you created and saved a test, check whether it's collecting data as expected:

#. From the :guilabel:`Tests` list, select the three-dot :guilabel:`Actions` menu and select :guilabel:`Play` arrow icon to manually trigger a live run of the test, or wait for at least one duration of the test frequency you set so that the test has time to run and collect data.
#. Select the test you're interested in to open the :guilabel:`Test history` view, where you can view visualizations of recent test results and metrics.

#. See :ref:`browser-test-results` to learn more about Browser test results.


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



.. _collect-interactive-metrics:

Collect interactive metrics
---------------------------------
Interactive metrics are collected by default for each page in the test flow, but this can result in longer run durations depending on how long it takes for the page to become fully interactive. You can turn off interactive metrics in advanced settings to speed up run durations and see results faster. If you turn off interactive metrics then the following metrics might be missing from your test:

* First CPU idle: Time until the page is minimally interactive and responds to user input.
* Time to interactive: This measures the time until the page responds to user input quickly. It is used to identify when the page is actually usable, not just when the page load looks complete.
* Lighthouse score: A weighted aggregation of several Browser test metric values calculated using v10 of the Lighthouse desktop scoring algorithm. See :new-page:`https://developer.chrome.com/docs/lighthouse/performance/performance-scoring#lighthouse_10` in the Google developer documentation to learn more about Lighthouse scoring.


.. _auto-retry:

Auto-retry
----------------

Run a test again automatically if it fails without any user intervention. It's a best practice to turn on auto-retry to reduce unnecessary failures from temporary interruptions like network issues, timeouts, or itermittent issues on your site. Auto-retry runs do not impact subscription usage, only the completed run result counts towards your subscription usage. Auto-retry requires at least runner version 0.9.29.

.. Security

.. _browser-validation:

TLS/SSL validation
--------------------------
When activated, this feature is used to enforce the validation of expired, invalid hostname, or untrusted issuer on TLS/SSL certificates.

.. note::
 When testing pre-production environments that have self-signed or invalid certificates, it's best to leave TLS/SSL validation feature deactivated.


.. _browser-auth:

Authentication
--------------------------

Add credentials to authenticate with sites that require additional security protocols, for example from within a corporate network. To use Authentication, a username and password need to be provided. The username can be entered as plain text or be defined by a global variable, but the password must be defined using a global variable. It is recommended to use a concealed global variable for your password to create an additional layer of security for your credentials. For more, see :ref:`concealed-gv`.

When executing the browser test, the Chrome browser is configured with the credentials defined in the test configuration. Authentication is not integrated at the OS level, it is only configured in the browser. At this time, Chrome supports the following authentication protocols:

* Basic Authentication
* NTLM
* Kerberos
* Digest

More details on Chrome authentication are available :new-page:`here list <https://www.chromium.org/developers/design-documents/http-authentication/>`.

.. Custom content

.. _browser-headers:

Custom headers
--------------------------

Specify custom headers to send with each request. For example, you can add a header in your request to filter out data from back-end analytics. To add a custom header, a name and value are required. You may optionally provide a domain to scope the header to. If a domain is specified, only requests sent to that domain will include the header. Otherwise the header will be included in requests to all domains.

You can also use headers to change the user agent. The default user agent is the given one for the selected device, which updates whenever the Chrome version changes for synthetic runners. To customize the user agent header for all domains, turn off the "Use device default" toggle next to the user agent field and then enter the new value. To change the user agent for specific domains, add a custom header and provide the domain you wish to apply that user agent to. If a domain is not specified, the top-level user agent setting takes precedence.

Custom headers can be used to set cookies, but we recommend using the Cookies settings instead outlined in the section below.

.. _browser-cookies:

Cookies
-------------

Set cookies in the browser before the test starts. For example, your site may respond to a cookie to circumvent a popup modal from randomly appearing and interfering with your test flow.

To set a cookie, a key and value must be provided. A domain and path may optionally be provided to only apply the cookie to requests to the given domain and/or path. By default, the cookie will aply to the to the domain of the starting URL of the check and all paths on that domain. Splunk Synthetics Monitoring uses the :new-page:`public suffix list <https://publicsuffix.org/>` to determine the domain.


.. _browser-host-overrides:

Host overrides
---------------------------------------
Add host override rules to reroute requests from one host to another. For example, you can create a host override to test an existing production site against page resources loaded from a development site or a specific CDN edge node.

You can also indicate whether to retain the original HOST header by activating :strong:`Keep host headers`. If activated, the original request's headers remain intact (recommended). If deactivated, a change in the HOST header to the new host might occur, potentially leading to an internal direct (307). It is activated by default.

.. _browser-wait-times:

Wait times
---------------------
Optimize your test coverage by adding custom wait times to capture longer page loads and improve the accuracy of run results. Applications with long load times can cause a Browser test to fail. If you know that there are certain steps in a workflow that take longer than 10 seconds, add a custom wait time to your Browser test.

* Wait times are available with Browser tests only.
* The maximum custom wait time for each test is 200 seconds.

Follow these steps to configure custom wait times for your Browser tests:

#. In Splunk Synthetic Monitoring, select :strong:`Edit` on the Browser test to open the configuration panel.
#. Select :strong:`New step > Wait`, from the step type drop down.
#. Add a name and the wait time in ms.
#. When you finish instrumenting your test, save the workflow: :strong:`Return to test > Save`.

The following image shows how to configure a test to go to a URL, wait for 10 seconds, then log in.

.. image:: /_images/synthetics/wait-times-example.png
   :alt: This image shows a browser test with three steps: go to url, wait 20 seconds, then log in.

.. _configurable-wait-times:

Limits and defaults for configurable wait times 
------------------------------------------------------

Here are the limits for each type of wait time. The maximum limit for a run is 30 minutes, after which it times out.


.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Description`
     - :strong:`Limit`

   * - Assert steps
     - 90 seconds

   * - Wait for navigation
     - 20 seconds


.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Description`
     - :strong:`Default`

   * - Wait time for assert
     - 10 seconds

   * - Wait for navigation
     - 2 seconds







.. _browser-custom-props:

Custom properties
----------------------
Add custom properties in the test creation page in advanced settings. Use key-value pairs to create custom properties to filter and group dashboards, charts, and create alerts. A list of suggested custom properties is available for each test based on the tags associated with your test. For example: ``env:test``, ``role:developer``, ``product:rum``. When you have multiple key-value pairs the logic is AND among the results. So in this case, the results show all tests for the RUM product with a developer role in the environment test.

.. image:: /_images/synthetics/custom-prop-syn.png
    :width: 60%
    :alt: This image shows two custom property key value pairs, env:prod and role:developer.


Custom properties are single-valued and don’t support multiple values, like ``region:eu, us``. For each test, you can only use one and unique key. For example, you can have ``env1:test`` and ``env:test`` in the same test, but you can't have ``env:test``, and ``env:prod``.


Key requirements:

   * Keys must start with an uppercase or lowercase letter. Keys can't start with special characters or numbers.
   * The remainder of the key can contain letters, numbers, underscores and hyphens.
   * Keys can’t be named ``test_id`` or ``test``.
   * Key size can't exceed 128 characters.

   See, :ref:`custom-properties`.



.. add screenshot here




Example
==================
For an example, see :ref:`browser-test-scenario`.


