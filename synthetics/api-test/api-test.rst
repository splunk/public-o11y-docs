.. _api-test:

************************************
Use an API Test to test an endpoint
************************************

.. meta::
    :description:  Use API tests in Splunk Synthetic Monitoring to monitor the API requests that provide core functionality for your applications, and track performance of your endpoints.

.. toctree::

   set-up-api-test
   api-test-results
   api-test-metrics
   

An API test provides a flexible way to check the functionality and performance of API endpoints.

The ongoing shift toward API-first development has magnified the necessity of monitoring the back-end services that provide your core front-end functionality. Whether you're interested in testing multi-step API interactions or you want to gain visibility into the performance of your endpoints, an API test can help you accomplish your goals.


.. note::  Splunk Synthetic Monitoring API tests support REST APIs only. SOAP APIs are not supported. 


.. raw:: html

  <embed>
    <h2>Use cases for an API test</h2>
  </embed>

In an API test, you can:

* Check the availability and performance of individual API endpoints
* Verify that your API endpoints are returning the correct data and response coordinates
* Test transactional API workflows using variables and dynamic data inputs
* Set up alerts based on any part of an HTTP request or response

.. raw:: html

  <embed>
    <h2>What happens during an API test?</h2>
  </embed>

In an API test, Splunk Synthetic Monitoring makes a call to an API endpoint you want to test and reports the endpoint's performance and uptime characteristics. This lets you proactively monitor the performance of your API before customers run into issues with it. 

.. raw:: html

  <embed>
    <h3>API Request </h3>
  </embed>

An API test is made up of one or more API requests. In a request, Splunk Synthetic Monitoring makes a call to an endpoint and collects data from the interaction. Within a request, you can include setup steps, request steps, and validation steps.

.. raw:: html

  <embed>
    <h4>Setup steps</h4>
  </embed>

Setup steps include actions required to set up the API request, such as running a piece of JavaScript or extracting a variable you'll need in the request from existing data or the response body from a previous request. 

The following table presents the types of setup steps you can create: 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Setup step type`
     - :strong:`Description`

   * - Save
     - Store a piece of data to be reused later in the test

   * - Extract
     - Extract a variable from formatted data (JSON, XML, or HTML)

   * - JavaScript
     - Run custom JavaScript code


.. raw:: html

  <embed>
    <h4>Request step</h4>
  </embed>

The request steps forms the body of the API request. This is where you enter the API request URL. You can create a GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS request.

In the request step, you can add one or more request headers.
 
.. raw:: html

  <embed>
    <h4>Validation steps </h4>
  </embed>

You can also include one or more validation steps as part of an API request. Validation steps give you an opportunity to check that the request returned the response you expected, run JavaScript, and save or extract values from the response body.  

The following table presents the types of validation steps you can create: 

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Step type`
     - :strong:`Description`

   * - Assert
     - Make an assertion on two values, which can be either strings or numeric

   * - Save
     - Store a piece of data to be reused later in the test

   * - Extract
     - Extract a variable from formatted data (JSON, XML, or HTML)

   * - JavaScript
     - Run custom JavaScript code

