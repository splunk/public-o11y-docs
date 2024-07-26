
.. _uptime-test:

**************************************************
Uptime Tests for port and HTTP
**************************************************

.. meta::
    :description: Use API tests in Splunk Synthetic Monitoring to monitor the API requests that provide core functionality for your applications, and track performance of your endpoints.

.. toctree::

   set-up-uptime-test
   uptime-test-results

An Uptime test uses the curl library to make a request to a specified URL and monitors the URL's response time and response code. Unlike Browser tests, Uptime tests do not parse HTML, load images, or run JavaScript. 

Uptime tests record the following metrics:

  * Response time
  * DNS time (HTTP test only)
  * Time to first byte

There are two types of Uptime tests. See :ref:`HTTP Test<http-test>` and :ref:`Port Test<port-test>` below for more information about each of these test types. 

.. _http-test: 

.. raw:: html

  <embed>
    <h2>HTTP test</h2>
  </embed>

An HTTP Uptime test makes a request to the specified URL and waits up to 60 seconds to receive a full response from the URL before closing the connection. The test records the response time and response code of the request. 

You can use an HTTP Uptime test to check the uptime and response code of a single URL or endpoint. 

To monitor the uptime of several URLs or to make a more complex request, use an :ref:`API Test<api-test>` instead. 

.. By default, Splunk Synthetic Monitoring HTTP tests send GET requests. To send a different type of request or to customize other settings for your HTTP tests, see :ref:`Advanced configuration for HTTP uptime tests<>`.

.. _port-test: 

.. raw:: html

  <embed>
    <h2>Port test</h2>
  </embed>

A Port Uptime test checks the response of a server port using Transmission Control Protocol (TCP) or User Datagram Protocol (UDP). When a Port test runs, Splunk Synthetic Monitoring sends a request to the specified port address, waits up to 60 seconds for a full response, and then records the response time and response code.

.. You can optionally configure your port uptime tests for ... . See :ref:`Advanced configuration for port uptime tests<>` to learn more about how you can customize your port uptime tests. 

.. raw:: html

  <embed>
    <h2>Set up an Uptime test</h2>
  </embed>

To learn how to set up an Uptime test, see :ref:`set-up-uptime-test`. 

For an overview of the results and diagnostics that Uptime tests capture, see :ref:`uptime-test-results`.