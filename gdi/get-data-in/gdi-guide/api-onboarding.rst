.. _api-onboarding:

*******************************************************************
Use the Splunk Observability Cloud API to send custom data
*******************************************************************

.. meta:: 
    :description: Configure your integrations to send custom data to Splunk Observability Cloud through the API.

Now that you have built-in data from your full stack flowing into Splunk Observability Cloud, assess whether there are custom data points you need to bring in. You can use the Splunk Observability Cloud API to bring in custom data.

You might want to use the API if you want to integrate with:

- A third-party tool that provides an API/webhook integration only.
- An application written in a language that Splunk doesn't provide a library for.

This API integration can send all data types to Splunk Observability Cloud, including metrics, traces, and logs.

Send custom data through the API
==============================================================

If you have custom data, you can use the Splunk Observability Cloud API to send this data to Splunk Observability Cloud.

For information about using the Splunk Observability Cloud API to send custom data, see :ref:`rest-api-ingest`.

Use Splunk Observability Cloud to access your data
==============================================================

After you've configured your integration to send custom data, you can access your data in the following locations:

* The Splunk APM landing page
* Splunk APM explorer view
* Splunk metric finder
* Splunk Log Observer

View traces on the APM landing page
-----------------------------------------

The Splunk APM landing page shows a preview of your custom trace data. To learn how to access the APM landing page, see :ref:`apm-landing-page`.

View traces in the APM Explorer view
------------------------------------------

The Splunk APM explorer view shows detailed information about your trace data, such as dependencies among your applications. To learn more, see :ref:`apm-service-map`.

Search for metrics with the Metric Finder
---------------------------------------------------------------------

You can use the Splunk metric finder to search for your custom metrics. For more information, see :ref:`metric-finder`.

Query logs using Log Observer
----------------------------------------------------------

If you chose to ingest logs, you can find logs in Splunk Log Observer. To learn more, see :ref:`logs-timeline`.