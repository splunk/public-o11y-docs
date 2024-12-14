.. _devices:

*****************************************
Devices 
*****************************************

.. meta::
    :description: When you set up a test in Splunk Synthetic Monitoring, you can configure the viewport and network connection of the device from which the test is simulated.

When you set up a test in Splunk Synthetic Monitoring, you can configure the viewport and network connection of the device from which the test is simulated. 

Because Browser tests capture the visual experience of a page, while Uptime and API tests only capture response data, viewport applies to Browser tests only. Network connection applies to all test types. 


Viewport
===================================
Browser tests in Splunk Synthetic Monitoring capture the visual experience of a user interacting with your application. The viewport is the framed area on a device's screen for viewing information, such as the browser window on a desktop. By default, Browser tests run from a desktop-sized viewport. You can configure tests to run from other viewport sizes to test the user experience from a variety of window sizes and device types. 

When you set up a test, you can choose the viewport size from a list of common devices, or set a custom viewport by height and width. 

Network connection
===================================
You can run Browser, Uptime, or API tests to simulate network connections of various latencies, including Mobile LTE, Mobile 3G, DSL, Mobile 5G, and cable internet. Testing your site from a variety of connection types lets you monitor the experience of users in a variety of settings. 


