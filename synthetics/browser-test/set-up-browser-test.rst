
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

.. include:: /_includes/synthetics/configure-test.rst


View your Browser test
====================================

Now that you created and saved a test, check whether it’s collecting data as expected: 

#. From the :guilabel:`Tests` list, select the three-dot :guilabel:`Actions` menu and select :guilabel:`Run` arrow icon to manually trigger a live run of the test, or wait for at least one duration of the test frequency you set so that the test has time to run and collect data. 
#. Select the test you’re interested in to open the :guilabel:`Test History` view, where you can view visualizations of recent test results and metrics.

Interpret your Browser test results
======================================
See :ref:`browser-test-results` to learn more about Browser test results. 


Edit your Browser test
========================

To edit your Browser test, do the following:

#. Select the row for the test you want to edit in the :guilabel:`Tests` list to open the :guilabel:`Test History` view.
#. Select :guilabel:`Edit test` to edit your test configuration.

If you change the name of your test or the name of a synthetic transaction, it may take up to 20 minutes for the updated name to appear in your charts and detectors.