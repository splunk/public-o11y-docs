.. _set-up-api-test:

**************************************
Set up an API test
**************************************

.. meta::
    :description: Learn how to set up an API test in Splunk Synthetic Monitoring.

An API test provides a flexible way to check the functionality and performance of API endpoints. See :ref:`api-test` for an overview of API tests in Splunk Synthetic Monitoring.

Set up an API test
=========================

Follow these steps to set up an API test:

#. From the landing page of Splunk Observability Cloud, navigate to Splunk Synthetic Monitoring. 
#. Under Tests, select :guilabel:`Add new test` and select :guilabel:`API test` from the drop-down list. The test creation view opens. 
#. In the :guilabel:`Name` field, enter a name for your test. 
#. Beside :guilabel:`Steps`, select :guilabel:`Add requests` to add requests to your API test. The requests setup page opens. 
#. Add as many requests as you would like to include in your test, including setup and validation steps. 
#. As you build your test, you can use :guilabel:`Try now` to check that the configuration of your test is valid. Run results aren't stored. For more, see :ref:`try-now`. 

.. _api-test-steps:

Add requests to your API test
------------------------------------

Follow these steps to add requests to your API test:

#. Enter a name for your first request, such as "Request Auth Token".
#. In the :guilabel:`Setup` section, use the selectors to add as many setup steps as you want to include. See :ref:`api-test` to learn more about your options.
#. In the :guilabel:`Request` section, choose a method for your request. 
#. Enter the URL for your request, including ``http`` or ``https``.
#. (Optional) To add a request header, select the ``+`` button labeled :guilabel:`Request Headers` and enter the type and content. Requests can include multiple headers.
#. In the :guilabel:`Validation` section, enter any validation steps you want to use to validate the request and response.
#. (Optional) Select :guilabel:`+ Request` to add another request to your test. 
#. Repeat until you have added as many requests as you'd like to include in your API test.
#. Select :guilabel:`Save steps & return to test` to finish creating your test.

.. include:: /_includes/synthetics/configure-test.rst

Example
==================
For an example, see  :ref:`api-test-scenario`.