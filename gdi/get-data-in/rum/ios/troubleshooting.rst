.. _common-ios-troubleshooting:

********************************************************************
Troubleshoot iOS instrumentation for Splunk Observability Cloud
********************************************************************

.. meta::
   :description: If your instrumented iOS application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument an iOS application using the Splunk OpenTelemetry Instrumentation for iOS and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-ios-troubleshooting:

Steps for troubleshooting iOS OpenTelemetry issues
=======================================================

The following steps can help you troubleshoot iOS RUM library issues:

#. :ref:`ios-check-requirements`
#. :ref:`multiple-ios-tools`
#. :ref:`activate-ios-debug-logging`

.. _ios-check-requirements:

Check compatibility and requirements
------------------------------------------------------

See :ref:`ios-rum-requirements` for a complete list of compatible versions and requirements.


.. _multiple-ios-tools:

Make sure you're not using multiple tools
------------------------------------------------------

Some development and observability tools include functionality similar to Splunk RUM. Using multiple tools for the same purpose, for example crash reporting, might result in undefined behavior. Use only one tool for each purpose.


.. _activate-ios-debug-logging:

Activate debug logging
----------------------------------------

Activating debug logging can help you troubleshoot iOS instrumentation issues. 

To activate logging, add the ``debug(enabled: true)`` method to ``SplunkRumBuilder``. For example:

.. code-block:: swift
   :emphasize-lines: 5

   import SplunkOtel
   //..
   SplunkRumBuilder(realm: "<realm>", rumAuth: "<rum-token>")
   // Call functions to configure additional options
      .debug(enabled: true)
      .build()

.. note:: Activate debug logging only when needed. Debug mode requires more resources.

.. _ios-no-metrics:

iOS metrics don't appear in Splunk RUM
============================================

If you can't find telemetry for your iOS app in Splunk RUM, try the following:

* Activate debug logging to search for simulator debug logs. See :ref:`activate-ios-debug-logging`.
* Make sure that the values of ``rumAuth`` and ``realm`` are defined and correct.
   * The RUM token must be active and part of the org you are trying to send data to.
   * The realm must be the same as your organization's realm.

To find the realm name of your account, follow these steps: 

1. Open the navigation menu in Splunk Observability Cloud.
2. Select :menuselection:`Settings`.
3. Select your username. 

The realm name appears in the :guilabel:`Organizations` section.

If you've defined a custom ``beaconUrl``, make sure the value is correct.

.. _ios-no-http-requests:

HTTP requests don't appear in Splunk RUM
=============================================

If HTTP requests don't appear in Splunk RUM, try the following:

* Check which library you're using. Splunk RUM doesn't support the deprecated Apple NSURLConnection API. Splunk RUM for iOS supports libraries based on Apple URLSession, which includes other libraries like AFNetworking and AlamoFire.
* Use the ``ignoreUrls`` setting if you already have another telemetry library or SDK configured. See :ref:`ios-rum-settings`.
* Consider using Splunk RUM only for capturing network calls. More than one library or tool capturing network calls might cause issues and undefined behavior.

.. _ios-no-crash-reports:

Crashes don't appear in Splunk RUM
============================================

If crash information doesn't appear in Splunk RUM, try the following:

* Make sure that the crash reporting feature of Splunk RUM is the only active crash reporter. For example, if you're also using Crashlytics, deactivate it and try again.
* Make sure that you're opening the application after a crash, so that the RUM library can send the report.

.. _ios-naming-collisions:

Avoid naming collisions
=========================================

If your code causes a naming collision, add the module that contains the symbol you want to use. For example, if you declare a type that SplunkOtel also declares, you can add its module name as a prefix.

.. code-block:: Swift

   import SplunkOtel
   //..
   var a = MyModule.MyConflictingType()

.. _ios-xcode-deps:

Xcode can't resolve package dependencies
================================================

If you use any of the dependencies that Splunk RUM already uses, check whether their versions can be resolved to their versioning rules. See the :new-page:`dependencies.txt file <https://github.com/signalfx/splunk-otel-ios/blob/main/dependencies.txt>` in the GitHub repository.

Xcode might inform you that a dependency failed to resolve. If you don't see any versioning rule issue, close and reopen Xcode and try adding the package again.

.. _ios-sqlite-errors:

Avoid SQLite redefinition errors
=============================================

If you're using another tool that uses SQLite, like WCDB, try replacing the ``use_frameworks!`` line in your Podfile with ``use_modular_headers!``.

.. include:: /_includes/troubleshooting-steps.rst
