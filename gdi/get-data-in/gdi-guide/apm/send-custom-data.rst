.. _send-custom-data-apm:

******************************************************************************
Part 3: Configure applications and serverless functions to send custom data
******************************************************************************

.. meta:: 
    :description: Configure your applications and serverless functions to send custom data to Splunk APM.

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