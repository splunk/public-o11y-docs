.. _send-custom-data-apm:

******************************************************************************
Part 3: Configure applications and serverless functions to send custom data
******************************************************************************

.. meta:: 
    :description: Configure your applications and serverless functions to send custom data to Splunk APM.

Now that you have built-in data from your full stack flowing into Splunk Observability Cloud, assess whether there are custom data points you need to bring in. 

For many teams, some of the most meaningful data is custom data because you can define these data points to focus on what is most important to you in your specific environment.

For example, if you run an ecommerce site, you might configure your application to send a custom metric about the number of orders placed. You can then create a detector to receive an alert when the number of orders drops significantly. You can also configure your application to send a custom metric about how long payment processing takes. You can then create a detector to issue alerts when the processing time exceeds a threshold.

Configure back-end applications to send custom data
=======================================================================

Splunk has client libraries for several types of applications. By instrumenting your code with these libraries, you can send custom data to Splunk Observability Cloud.

Use the library for your application language:

- :new-page:`Go client library for SignalFx <https://github.com/signalfx/signalflow-client-go>` on GitHub

- For Java, use one of these available integrations:

      - :ref:`Splunk Distribution of OpenTelemetry Java <get-started-java>`
      - :new-page:`Java client libraries for SignalFx <https://github.com/signalfx/signalflow-client-java>` on GitHub

- :new-page:`Node.js client library for SignalFx <https://github.com/signalfx/signalflow-client-js>` on GitHub

- :new-page:`Python client library for SignalFx <https://github.com/signalfx/signalflow-client-python>` on GitHub

Configure serverless functions to send custom data
=======================================================================

To instrument your AWS Lambda serverless functions, see :ref:`instrument-serverless-functions`.

Use Splunk Observability Cloud to access your custom data
=======================================================================

Access your custom data in the following locations:

* The Splunk APM landing page
* Splunk APM explorer view
* Splunk metric finder

View traces on the APM landing page
------------------------------------------

The Splunk APM landing page shows a preview of your custom trace data. To learn how to access the APM landing page, see :ref:`apm-landing-page`.

View traces in the APM Explorer view
-------------------------------------------

The Splunk APM explorer view shows detailed information about your trace data, such as dependencies among your applications. To learn more, see :ref:`apm-service-map`.

Search for metrics using the metric finder
---------------------------------------------------------------------

You can use the Splunk metric finder to search for your custom metrics. 

   .. image:: /_images/gdi/metric-finder.png
      :width: 100%
      :alt: This screenshot shows metric search results in the Metric Finder

For more information, see :ref:`metric-finder`.
