.. _spoc-api:

************************************************************************
Splunk On-Call API
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.


Follow these steps to configure API calls within your Splunk On-Call account. To see all available API calls and configuration steps  visit the :new-page:`API Documentation <https://portal.victorops.com/public/api-docs.html>` page.

The Splunk On-Call API will allow users to take the custom actions they want and gather the information they need. The following topic will walk you through what it takes to get started with the API and outline some of the limits currently in place.



API Configuration in Splunk On-Call
================================================

To access the API, navigate to :guilabel:`Integrations`, then :guilabel:`API`. From here you can retrieve your API ID and create API Keys. Your API calls will be tallied on this page as well.

.. note:: Only Splunk On-Call admin users can create API Keys.

.. image:: /_images/spoc/api1.png
    :width: 100%
    :alt: Select New Key to add API keys.

If you select :guilabel:`Read-only` when creating an API key, the created key will only be able to perform GET requests.

API Usage and Limits
--------------------------

-  All packages (Starter, Growth, and Enterprise) have unlimited API calls.
-  There is virtually no limit to the number of API keys you may create in your Splunk On-Call organization.
-  Each individual call is rate-limited. For specific details, see `the API documentation <https://portal.victorops.com/public/api-docs.html>` for the specific call or contact Splunk On-Call support.

Interactive API Documentation
-----------------------------------

The documentation for the Splunk On-Call API allows you to try out the different calls in real-time. To get started select the :guilabel:`Read the API Documentation` link on the API settings page.

.. image:: /_images/spoc/api2.png
    :width: 100%
    :alt: Follow the link on the API settings page to try API calls in real-time.

This will bring you to the Splunk On-Call API documentation. All available API calls are listed here.

.. image:: /_images/spoc/api3.png
    :width: 100%
    :alt: The Splunk On-Call API documentation.


Additional Endpoint Requests
-------------------------------------

If there is an API endpoint you would like to see added to the public API site, let us know. Reach out to On-Call Support via the Splunk Support Portal or in-product chat with any additional requests.
