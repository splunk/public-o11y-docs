.. _api-test-results:

******************************************
Interpret API test results 
******************************************

.. meta::
    :description: How to understand and visualize results from API tests run in Splunk Synthetic Monitoring through the request result timeline or performance KPIs chart. 

Every run of an API test in Splunk Synthetic Monitoring produces a set of diagnostics that help you understand the performance of your application in real time. 

.. _api-detector:

View API test history
==========================

On the :guilabel:`Test History` page, view a customizable summary of recent run results so you can assess the performance of your test at a glance. 

#. To open the :guilabel:`Test History` view for a test, select its row in the :guilabel:`Tests` list.

#. You can take the following actions in the Test History page:

    - Select :guilabel:`Edit test` to edit your test configuration.
    - Select :guilabel:`Create detector` to create a detector based on your test. See :ref:`synth-alerts` to learn more. 
    - Select :guilabel:`Actions > Pause test` to pause your test.
    - Select :guilabel:`Actions > Duplicate test` to make a copy of your test. This opens the :guilabel:`New API Test` page with the details of the test pre-filled. 

Customize the Performance KPIs chart 
--------------------------------------------------
See :ref:`test-kpis`.


View results for a specific run
---------------------------------
To navigate to the :guilabel:`Run results` view for a single run, select a data point within the :guilabel:`Performance KPIs` chart with the visualization interval at :strong:`Run level` and the segmentation set to :strong:`Location`. 

If you're viewing aggregate data (for example, at a 20-minute interval instead of run level), selecting a data point zooms you in to see run-level detail. Then you can select a specific run to see the :guilabel:`Run results` from there. 

You can also select a row in the :guilabel:`Recent run results` table below the :guilabel:`Performance KPIs` chart.


Interpret API test run results
=============================================

Every run of an API test generates a set of results and metrics. 

.. note:: 
  In API tests, non-200-level response codes do not automatically indicate the failure of a request step. A request is considered a failure when the request/response cycle cannot be completed. Use an Assert step to validate a response code; see :ref:`api-test` to learn more.

Request result timeline 
------------------------
The request result timeline is an interactive tool you can use to explore and validate the results of each API test. 

In the request result timeline, select the request you're interested in viewing. You can take the following actions for each request: 

* Validate the setup of your test by checking that the assertions, JavaScript code, and extractions are correct. 
* View a detailed summary of the request:

    * Response header and body, and request info.
    * Response body size.
    * Response time, DNS time, TTFB and other metrics. 


* View connection information, such as certificate status and TLS handshake events.
* Check alerts and warnings associated with each test. 

Metrics for API tests
-------------------------------
In addition to these diagnostics, every run of an API test produces a set of metrics that offer a picture of website performance. See :ref:`api-test-metrics` for a complete list of these metrics. 


(Optional) Splunk RUM integration 
------------------------------------
Integrate with Splunk RUM so that you can automatically measure Web Vital metrics against your run results. Web vitals capture key metrics that affect user experience and assess the overall performance of your site. For more, see :ref:`rum-synth`.

