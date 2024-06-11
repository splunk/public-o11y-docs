.. _api-onboarding:

*******************************************************************
Use the Splunk Observability Cloud API to send custom data
*******************************************************************

.. meta:: 
    :description: Configure your integrations to send custom data to Splunk Observability Cloud through the API.

.. _gdi-8:

8. Use the Splunk Observability Cloud API to send custom data
========================================================================================

Now that you have built-in data from your full stack flowing into Splunk Observability Cloud, assess whether there are custom data points you need to bring in. You can use the Splunk Observability Cloud API to bring in custom data.

You might want to use the API if you want to integrate with:

- A third-party tool that provides an API/webhook integration only.
- An application written in a language we don't provide a library for.

This API integration can send all types of data to Splunk Observability Cloud. While you can use the API to send logs to Log Observer, we recommend using other integration types to do so. For details about which integrations can send logs to Log Observer.

After you've configured your integration to send custom data, you can access your data in the following locations:

- View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`.
- View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`.
- Search for metrics at the :ref:`Metric Finder <metric-finder>`, or use the :ref:`metrics pipeline management tool <metrics-pipeline-intro>`.
- Query logs :ref:`using Log Observer <logs-timeline>`, if you chose to ingest logs.

Steps
--------------------------------------------------------------------

For information about using the Splunk Observability Cloud API to send custom data, see :ref:`rest-api-ingest`.


Next: Leverage the full benefits of Splunk Observability Cloud
=============================================================================

Now that you have your desired full stack of data coming into Splunk Observability Cloud, consider exploring the following features that can help you monitor, visualize, and coordinate team work around your data:

- :ref:`Create detectors <create-detectors>` to receive alerts about conditions in your data that are important you.
- :ref:`Create charts <create-charts>` to visualize your data.
- :ref:`Use Related Content <get-started-relatedcontent>` to jump between components of Splunk Observability Cloud by clicking related data.
- :ref:`Create and customize dashboards <dashboard-create-customize>` to organize and share your charts.
- :ref:`admin-manage-teams` to coordinate team work around your data.
- Check system critical metrics, access real-time alerts, and view mobile-friendly dashboards on the go using the :ref:`Splunk Observability Cloud mobile app <intro-to-mobile>`.
- Learn more about :ref:`the Splunk Observability Cloud data model <data-model>`.
- Learn more about each product in the Splunk Observability Cloud suite:
   - :ref:`get-started-apm`
   - :ref:`get-started-infrastructure`
   - :ref:`get-started-logs`
   - :ref:`get-started-rum`