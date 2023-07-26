.. _common-browser-troubleshooting:

********************************************************************
Troubleshoot browser instrumentation for Splunk Observability Cloud
********************************************************************

.. meta::
   :description: If your instrumented your web application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a browser or web application using the Browser RUM agent and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-browser-troubleshooting:

General steps for troubleshooting browser RUM instrumentation
==============================================================

The following steps can help you troubleshoot browser RUM agent issues:

#. :ref:`browser-check-requirements`
#. :ref:`multiple-browser-tools`
#. :ref:`activate-browser-debug-logging`

.. _browser-check-requirements:

Check compatibility and requirements
------------------------------------------------------

See :ref:`rum-browser-requirements` for a complete list of compatible versions and requirements.


.. _multiple-browser-tools:

Make sure you're not using multiple agents
------------------------------------------------------

Some development and observability tools include functionality similar to Splunk RUM. Using multiple tools for the same purpose, for example crash reporting, might result in undefined behavior. Use only one tool for each purpose.


.. _activate-browser-debug-logging:

Activate debug logging
----------------------------------------

Activating debug logging can help you troubleshoot browser RUM instrumentation issues.

To activate logging, add the ``debug: true)`` setting to ``SplunkRum.init``. For example:

.. code-block:: html
   :emphasize-lines: 9

   <script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web.js" crossorigin="anonymous"></script>
   <script>
         SplunkRum.init(
         {
            beaconEndpoint: 'https://rum-ingest.us0.signalfx.com/v1/rum'
            rumAccessToken: 'ABC123...789',
            applicationName: 'my-awesome-app',
            version: '1.0.1',
            debug: true
         });
   </script>

.. note:: Activate debug logging only when needed. Debug mode requires more resources.

.. _browser-no-metrics:

Web app metrics don't appear in Splunk RUM
============================================

If you can't find telemetry for your web app in Splunk RUM, try the following:

* Activate debug logging to search for simulator debug logs. See :ref:`activate-browser-debug-logging`.
* Make sure that the values of ``rumAccessToken`` and ``realm`` are defined and correct.
   * The RUM token must be active and part of the org you are trying to send data to.
   * The realm must be the same as your organization's realm.

To find the realm name of your account, follow these steps:

1. Open the navigation menu in Splunk Observability Cloud.
2. Select :menuselection:`Settings`.
3. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

If you've defined a custom ``beaconEndpoint``, make sure the value is correct.

.. _browser-site-crash:

Instrumented web application has issues
============================================

If your web app is malfunctioning after instrumenting it, try the following:

* Remove the instrumentation and run the app to check if the errors disappear.
   * If the errors persist, there might be a different issue in your application
   * If the errors disappear, try a different version of the browser RUM agent. Don't use ``latest`` without testing it in preproduction first.
* Activate debug logging to search for simulator debug logs. See :ref:`activate-browser-debug-logging`.


.. include:: /_includes/troubleshooting-steps.rst
