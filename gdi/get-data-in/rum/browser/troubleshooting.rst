.. _common-browser-troubleshooting:

********************************************************************
Troubleshoot browser instrumentation for Splunk Observability Cloud
********************************************************************

.. meta::
   :description: If your instrumented web application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument a browser or web application using the Browser RUM agent and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-browser-troubleshooting:

General steps for troubleshooting Browser RUM instrumentation
==============================================================

The following steps can help you troubleshoot Browser RUM agent issues:

#. :ref:`browser-check-requirements`
#. :ref:`multiple-browser-tools`
#. :ref:`activate-browser-debug-logging`

.. _browser-check-requirements:

Check compatibility and requirements
------------------------------------------------------

See :ref:`rum-browser-requirements` for a complete list of compatible versions and requirements.

Browser RUM supports Internet Explorer 11 through the ``splunk-otel-web-legacy.js`` version of the agent. Make sure to use that version if you need to collect data from Internet Explorer.


.. _multiple-browser-tools:

Make sure you're not using multiple agents
------------------------------------------------------

Some development and observability tools include functionality similar to Splunk RUM. Using multiple tools for the same purpose, for example crash reporting, might result in undefined behavior. Use only one tool for each purpose.


.. _activate-browser-debug-logging:

Activate debug logging
----------------------------------------

Activating debug logging can help you troubleshoot browser RUM instrumentation issues.

To activate logging, add the ``debug: true`` setting to ``SplunkRum.init``. For example:

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

Web app data don't appear in Splunk RUM
============================================

If you can't find telemetry for your web app in Splunk RUM, try the following.

Check for errors using developer tools
----------------------------------------------

Use your browser's developer tools to check for Browser RUM errors:

* Check the console for configuration errors. Errors are prefixed with ``SplunkRum:`` in the console.
* Check the :guilabel:`Network` tab in your browser's developer tools to confirm that the agent is sending data:
   * Make sure there are requests sent to ``rum-ingest.<realm>.signalfx.com``.
   * If the requests have a status of ``429``, you might have surpassed the session quota. See :ref:`rum-limits`.
   * Make sure the request isn't blocked by browser extensions or specific settings.
* Activate debug logging to search for simulator debug logs. See :ref:`activate-browser-debug-logging`.


Check your RUM configuration settings
--------------------------------------------------

Check the value of the main configuration settings:

* If you've defined a custom ``beaconEndpoint``, make sure the value is correct.
* Make sure that the values of ``rumAccessToken`` and ``realm`` are defined and correct.
   * The RUM token must be active and part of the org you are trying to send data to.
   * The realm must be the same as your organization's realm.

To find the realm name of your account, follow these steps:

1. Open the navigation menu in Splunk Observability Cloud.
2. Select :menuselection:`Settings`.
3. Select your username.

The realm name appears in the :guilabel:`Organizations` section.


Check how you're initializing RUM
-----------------------------------------------

Make sure you're initializing Browser RUM correctly:

* Make sure you're initializing the agent synchronously and as early as possible. See :ref:`loading-initializing_browser-rum`.
* If your app is a single-page application (SPA), see :ref:`browser-rum-spas`.


.. _browser-rum-break-site:

Browser RUM is causing issues in my site
================================================================

If you think Browser RUM might be causing issues in your website or breaking existing behavior or design, check the following:

* Confirm the site works as expected after removing or deactivating Browser RUM in the same environment where you're experiencing issues.
* Try activating Browser RUM with all instrumentations turned off. See :ref:`browser-rum-instrumentation-settings` for more information. For example:

   .. code-block:: typescript

      instrumentations: {
        // Comment out lines one by one to turn on each item
        // and test which instrumentation is causing issues.
        document: false,
        errors: false,
        fetch: false,
        interactions: false,
        longtask: false,
        postload: false,
        webvitals: false,
        xhr: false,
      }

.. include:: /_includes/troubleshooting-steps.rst
