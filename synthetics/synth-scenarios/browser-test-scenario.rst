.. _browser-test-scenario:

*********************************************
Scenario: Kai monitors a multi-step workflow 
*********************************************

Kai, a site reliability engineer at Buttercup Industries, a fictitious e-commerce company, uses Splunk Synthetic Monitoring to monitor the performance of the Buttercup Industries site. Kai's scenario demonstrates how Browser test monitoring can help keep you ahead of potential issues with your organization's site or application.

Set up a Browser test to monitor a critical workflow 
======================================================

Buttercup Industries has a large conference coming up. Kai sets up an Browser test to monitor the performance of the website hosting to make sure that all attendees can access the website and see the agenda for the conference. Kai uses a global variable to retrieve the user credentials during the login workflow. For more, see :ref:`global-variables`. 

Kai's Browser test captures this user workflow: 

1. Log into an account using access credentials.
2. Navigate to the education portal.
3. Open a virtual session page.

Here is how Kai set up the browser test for the login workflow. 

1. Kai creates a step to go the Buttercup Games homepage and adds a few second delay between steps by selecting :guilabel:`Wait for navigation`. 

..  image:: /_images/synthetics/browser-test-one.png
    :width: 100% 
    :alt: This image shows a completed browser test. 

2. Kai creates a step for the login button. 

..  image:: /_images/synthetics/browser-test-two.png
    :width: 100% 
    :alt: This image shows a completed browser test. 

3. Kai creates a step to check the username using a global variable. 

..  image:: /_images/synthetics/browser-test-three.png
    :width: 100% 
    :alt: This image shows a completed browser test. 

4. Kai creates a step to enter a password using a global variable. 

..  image:: /_images/synthetics/browser-test-four.png
    :width: 100% 
    :alt: This image shows a completed browser test. 

5. Kai creates a step to submit the credentials and finish the login workflow. 

..  image:: /_images/synthetics/browser-test-five.png
    :width: 100% 
    :alt: This image shows a completed browser test. 

All together, the test looks like this: 

..  image:: /_images/synthetics/browser-test-all.png
    :width: 100% 
    :alt: This image shows a completed browser test. 


Learn more 
=======================
See the following topics to learn how to set up a a Browser test, and to learn more about the results, diagnostics, and metrics that Browser tests capture:

* :ref:`set-up-browser-test`
* :ref:`browser-metrics`
* :ref:`browser-test-results`