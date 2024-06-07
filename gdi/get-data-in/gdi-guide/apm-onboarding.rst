.. _apm-onboarding:

****************************************************
Send application and function data to Splunk APM
****************************************************

.. meta:: 
    :description: Configure your applications and serverless functions to send metrics, traces, and logs to Splunk APM. 

.. _gdi-4:

4. Instrument back-end services and applications to send traces, logs, and metrics
========================================================================================

You can choose to instrument applications that you've developed in-house to send data to Splunk Observability Cloud:

- Traces to APM
- Logs (events) to Log Observer
- Metrics to Infrastructure Monitoring (Java only)

After you've instrumented your application, you can access your data in the following locations:

- View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`

- View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`

   .. image:: /_images/apm/set-up-apm/set-up-apm-02.png
      :width: 100%
      :alt: This screenshot shows an example of the Splunk APM Explore view

- For a Java application, you can search for metrics :ref:`using Metric Finder <metric-finder>`

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

Steps
------------------------------------------------------------------------------------

See the instrumentation documentation for your application language:

- :ref:`Instrument Java applications <get-started-java>`

- :ref:`Instrument Python applications <get-started-python>`

- :ref:`Instrument Node.js applications <get-started-nodejs>`

- :ref:`Instrument .NET applications <get-started-dotnet-otel>`

- :ref:`Instrument Go applications <get-started-go>`

- :ref:`Instrument Ruby applications <get-started-ruby>`

- :ref:`Instrument PHP applications <get-started-php>`

.. note:: If you use the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud, you can benefit from Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud. For more information, see :ref:`get-started-relatedcontent`.

.. _gdi-5:

5. Instrument serverless functions to send traces and metrics
==========================================================================================================

You can choose to instrument your serverless functions.

:strong:`Note:` This step is about bringing in built-in metrics and traces. Once you have a chance to familiarize yourself with your data coming in, you can use this same instrumentation to bring in custom data. For more information, see step :ref:`gdi-7`.

This integration can send:

- Traces to APM
- Metrics to Infrastructure Monitoring

After you've instrumented your serverless functions, you can access your data in the following locations:

- View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`

- View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`

- View metrics in the Infrastructure Monitoring Lambda Functions navigator

   .. image:: /_images/gdi/lambda-navigator.png
      :width: 100%
      :alt: This screenshot shows the Lambda Functions navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from serverless functions.

   For more information, see :ref:`monitor-aws-services`.

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for AWS Lambda

- Search for metrics :ref:`using Metric Finder <metric-finder>`

Steps
----------------------------------------------------------------------------

To instrument your AWS Lambda serverless functions, see :ref:`instrument-serverless-functions`.

.. _gdi-7:

7. Configure applications and serverless functions to send custom data
========================================================================================

Now that you have built-in data from your full stack flowing into Splunk Observability Cloud, assess whether there are custom data points you need to bring in. 

For many teams, some of the most meaningful data is custom data because you can define these data points to focus on what is most important to you in your specific environment.

For example, if you run an e-commerce site, you might configure your application to send a custom metric about the number of orders placed. You can then create a detector to receive an alert when the number of orders drops significantly. You might also configure your application to send a custom metric about how long payment processing takes. You can then create a detector to issue alerts when the processing time exceeds a threshold.

You can configure applications to send custom metrics and instrument serverless functions to send custom traces. Access your custom data in the following locations:

- View traces on the APM landing page to :ref:`assess the health of your applications <apm-landing-page>`
- View traces in the APM Explorer view to :ref:`assess dependencies among your applications <apm-service-map>`
- Search for metrics :ref:`using Metric Finder <metric-finder>`

   .. image:: /_images/gdi/metric-finder.png
      :width: 100%
      :alt: This screenshot shows metric search results in the Metric Finder


Configuration steps for back-end applications
-------------------------------------------------------------------------

Use the library for your application language:

- :new-page:`Go client library for SignalFx <https://github.com/signalfx/signalfx-go>` on GitHub

- For Java, use one of these available integrations:

      - :ref:`Splunk Distribution of OpenTelemetry Java <get-started-java>`
      - :new-page:`Java client libraries for SignalFx <https://github.com/signalfx/signalfx-java>` on GitHub

- :new-page:`Node.js client library for SignalFx <https://github.com/signalfx/signalfx-nodejs>` on GitHub

- :new-page:`Python client library for SignalFx <https://github.com/signalfx/signalfx-python>` on GitHub

- :new-page:`Ruby client library for SignalFx <https://github.com/signalfx/signalfx-ruby>` on GitHub


Instrument serverless functions
---------------------------------------------------------------

To instrument your AWS Lambda serverless functions, see :ref:`instrument-serverless-functions`.