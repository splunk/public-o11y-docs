.. _browser-test:

****************************************
Use a Browser test to test a webpage
****************************************

.. meta::
    :description: Learn about Browser Tests in Splunk Synthetic Monitoring.

.. toctree::

   set-up-browser-test
   set-up-transactional-browser-test
   browser-test-results
   browser-test-metrics

A Browser test is a simulated run of a workflow or set of requests that make up the user experience on a single page or transactional user flow. You can run a Browser test from any device and from a number of locations around the world. 

You can configure tests on a schedule so you're continually monitoring your site’s performance in the background. You can also set up detectors to alert your teams of test failures and errors. 

.. raw:: html

  <embed>
    <h2>What happens during a Browser test?</h2>
  </embed>

During a Browser test, Splunk Synthetic Monitoring continuously collects performance data including metrics, network data, and custom user timings. All requests and responses that occur in the test are captured in a HAR file, which is represented visually in a waterfall chart that illustrates the latency of specific resources on the page. See :ref:`waterfall-chart` to learn more about the waterfall chart, and see :ref:`browser-metrics` to learn about the metrics in a Browser test.

During a test, Splunk Synthetic Monitoring also creates a filmstrip and video of all actions executed in the test so that teams can see first-hand what the page looks like to a user. See :ref:`filmstrip` to learn more.

.. raw:: html

  <embed>
    <h2>Single-page Browser test</h2>
  </embed>

A single-page Browser test simulates interactions with a single webpage. To set up a single-page Browser test, provide a single URL from which the test starts. See :ref:`set-up-browser-test` to learn more.


.. raw:: html

  <embed>
    <h2>Transactional Browser test </h2>
  </embed>


A transactional Browser Test includes synthetic transactions comprised of steps to test a transactional or multi-step user workflow. 

.. raw:: html

  <embed>
    <h3>Adding steps</h3>
  </embed>

Steps you might want to test include clicking links, filling out form fields, selecting values from dropdown menus, accepting or dismissing alerts, or running and saving values from JavaScript. You can identify specific page elements involved in these steps by their id, class, name, CSS Path, or XPATH in your Browser test configuration. 

.. raw:: html

  <embed>
    <h3>Adding synthetic transactions </h3>
  </embed>

Steps are grouped into synthetic transactions that make up business-critical workflows. Example synthetic transactions might include the steps required to log into your application, or the steps to complete checkout for a purchase on your site.  


See :ref:`set-up-transactional-browser-test` to learn how to set up a transactional Browser Test.

.. raw:: html

  <embed>
    <h2>Browser test results</h2>
  </embed>

See the following topics to learn more about the results, diagnostics, and metrics that Browser tests capture:

* :ref:`browser-test-results`
* :ref:`browser-metrics`
* :ref:`browser-test-scenario`




