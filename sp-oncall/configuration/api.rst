.. _spoc-api:


************************************************************************
Splunk On-Call API
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.


Follow these steps to configure API calls within your Splunk On-Call
account. To see all available API calls and configuration steps please
visit the `API
Documentation <https://portal.victorops.com/public/api-docs.html>`__
page.

The Splunk On-Call API will allow users to take the custom actions they
want and gather the information they need. The following article will
walk you through what it takes to get started with the API and outline
some of the limits currently in place.

--------------

**API Configuration in Splunk On-Call**
---------------------------------------

To access the API, navigate to Integrations >> API. From here you can
retrieve your API ID and create API Keys. Your API calls will be tallied
on this page as well.

*Note: Only Splunk On-Call admin users can create API Keys.*

.. image:: images/Key.jpg

If you check the “Read-only” checkbox when creating an API key, the
created key will only be able to perform GET requests.

**API Usage and Limits**
~~~~~~~~~~~~~~~~~~~~~~~~

-  All packages (Starter, Growth, and Enterprise) have unlimited API
   calls.
-  There is virtually no limit to the number of API keys you may create
   in your Splunk On-Call organization.
-  Each individual call is rate-limited. For specific details please
   `review the
   documentation <https://portal.victorops.com/public/api-docs.html>`__
   for the specific call or contact Splunk On-Call support.

**Interactive API Documentation**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The documentation for the VictorOps API allows you to try out the
different calls in real-time. To get started select the **Read the API
Documentation** link on the API settings page.

.. image:: images/API-Documentation.jpg

This will bring you to the VictorOps API documentation. All available
API calls are listed here.

.. image:: images/Screen-Shot-2019-09-24-at-2.46.46-PM.png

**Additional Endpoint Requests**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If there is an API endpoint you would like to see added
`HERE <https://portal.victorops.com/public/api-docs.html>`__ please let
us know! This is a growing document and we want your input. Please reach
out to On-Call Support via the Splunk Support Portal or in-product chat
with any additional requests.
