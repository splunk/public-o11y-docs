.. _devices:

*****************************************
Devices 
*****************************************

.. meta::
    :description: Select a predefined device to simulate a specific viewport size and network connection for a test.

When you set up a test in Splunk Synthetic Monitoring, you can select a predefined device to simulate a specific viewport size and network connection for that test. Every predefined device is a combination of a specific viewport size and network connection. 

* A viewport is the framed area on a device's screen for viewing information, such as the browser window on a desktop. Since a viewport is an integral part of the visual experience of a user interacting with your application or site, viewport settings only apply to visual tests (browser tests). Viewport settings don't apply to API or uptime tests, because these tests are non-visual -- they only capture response data from your application or site.
* A network connection is the network type, speed, bandwidth, and latency experienced by a device. Since a network connection is an integral part of all experiences, network connection settings apply to all test types. Testing your site or application from a variety of network connections helps you to monitor the experience of users in a variety of environments.


Select a device type for Splunk Synthetic Monitoring tests
==========================================================

All tests have the device type :guilabel:`Default Desktop` by default. To change this for any test, follow these steps:

#. From the landing page of Splunk Observability Cloud, navigate to Splunk Synthetic Monitoring.
#. Select the test that you want to change.
#. Select :guilabel:`Edit test`. The test creation view opens.
#. In the :guilabel:`Device` field, select one of the predefined devices.
#. Select :guilabel:`Save`. 

