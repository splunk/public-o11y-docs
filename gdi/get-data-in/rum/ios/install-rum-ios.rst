.. _ios-rum-install:

**************************************************************
Install the iOS RUM agent for Splunk RUM
**************************************************************

.. meta::
   :description: Instrument your iOS applications for Splunk Observability Cloud real user monitoring / RUM using the iOS RUM agent from the Splunk OpenTelemetry Instrumentation for iOS.

You can instrument your iOS applications for Splunk RUM using the iOS RUM agent from the Splunk OpenTelemetry Instrumentation for iOS.

To instrument your iOS application and get data into Splunk RUM, follow the instructions on this page.


.. note:: Splunk APM is not required to instrument Splunk RUM for iOS. 

.. _ios-rum-requirements:

Check compatibility and requirements 
===============================================

Splunk RUM for Mobile supports iOS 11 and higher, including iPadOS 13 and higher.

.. _rum-ios-install:

Instrument your iOS application for Splunk RUM
====================================================================

Before you instrument and configure Splunk RUM for your iOS application, understand which data RUM collects about your application and determine the scope of what you want to monitor. See :ref:`rum-data-collected`.

:strong:`Tip:` To generate all the basic installation commands for your environment and application, use the iOS Instrumentation guided setup. To access the iOS Instrumentation guided setup, follow these steps:

1. Log in to Observability Cloud.

2. In the left navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.

3. In the integration filter menu, select :guilabel:`By Use Case`.

4. Select the :guilabel:`Monitor user experience` use case.

5. Click the :guilabel:`iOS Instrumentation` tile to open the iOS Instrumentation guided setup.

.. _rum-ios-initialize:

Import and initialize the iOS RUM package
---------------------------------------------------------

Follow these steps to import and initialize the iOS RUM package.

1. In Xcode, select :strong:`File` > :strong:`Add Packages...` or :strong:`File` > :strong:`Swift Packages` > :strong:`Add Package Dependency` and enter the following URL in the search bar:

   ``https://github.com/signalfx/splunk-otel-ios``

2. Click :guilabel:`Add Package` to install the package.

3. Initialize the iOS RUM agent with your configuration parameters:

   .. tabs::

      .. code-tab:: swift Swift

         import SplunkOtel
         //..
         SplunkRum.initialize(beaconUrl: "https://rum-ingest.<realm>.signalfx.com/v1/rum",
               rumAuth: "<rum-token>",
               options: SplunkRumOptions(environment:"<environment-name>"))

      .. code-tab:: objective-c Objective-C

         @import SplunkOtel;

         //...
         SplunkRumOptions *options = [[SplunkRumOptions alloc] init];
         options.environment = @"<environment-name>";
         [SplunkRum initializeWithBeaconUrl:@"https://rum-ingest.<realm>.signalfx.com/v1/rum" rumAuth: @"<rum-token>" options: options];

   * In the beacon URL, ``realm`` is the Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

         1. Open the left navigation menu in Observability Cloud.
         2. Select :menuselection:`Settings`.
         3. Select your username. 

      The realm name appears in the :guilabel:`Organizations` section.

   * To generate a RUM access token, see :ref:`rum-access-token`.

   .. note:: If your application uses CocoaPods, import the iOS RUM package into your main app. If you import the package into your Pods project, the dependency might disappear when you recreate the project.

4. Deploy the changes to your application.

.. _rum-ios-crash-reporting:

Activate crash reporting
-------------------------------------

The Splunk iOS Crash Reporting module adds crash reporting to the iOS RUM agent using PLCrashReporter.

.. caution:: Before enabling crash reporting in the iOS RUM agent, deactivate any other crash reporting package or library in your application. Existing crash reporting functionality might produce unexpected results, including build failures.

To activate crash reporting in the iOS RUM agent, follow these steps:

1. In Xcode, select :strong:`File` > :strong:`Add Packages...` or :strong:`File` > :strong:`Swift Packages` > :strong:`Add Package Dependency` and enter the following URL in the search bar:

   ``https://github.com/signalfx/splunk-otel-ios-crashreporting``

2. Click :guilabel:`Add Package` to install the package.

3. Initialize the crash reporting module with your configuration parameters:

   .. tabs::

      .. code-tab:: swift Swift
         :emphasize-lines: 2,7,8

         import SplunkOtel
         import SplunkOtelCrashReporting
         //..
         SplunkRum.initialize(beaconUrl: "https://rum-ingest.<realm>.signalfx.com/v1/rum",
                           rumAuth: "<rum-token>",
                           options: SplunkRumOptions(environment:"<environment-name>"))
         // Initialize crash reporting module after the iOS agent
         SplunkRumCrashReporting.start()

      .. code-tab:: objective-c Objective-C
         :emphasize-lines: 2,7,8

         @import SplunkOtel;
         @import SplunkOtelCrashReporting;
         //...
         SplunkRumOptions *options = [[SplunkRumOptions alloc] init];
         options.environment = @"<environment-name>";
         [SplunkRum initializeWithBeaconUrl: @"https://rum-ingest.<realm>.signalfx.com/v1/rum" rumAuth: @"<rum-token>" options: nil];
         // Initialize crash reporting module after the iOS agent
         [SplunkRumCrashReporting start]

   * In the beacon URL, ``realm`` is the Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

         1. Open the left navigation menu in Observability Cloud.
         2. Select :menuselection:`Settings`.
         3. Select your username. 

      The realm name appears in the :guilabel:`Organizations` section.
      
   * To generate a RUM access token, see :ref:`rum-access-token`.

4. Deploy the changes to your application.

.. note:: Symbolication is not supported.

.. _integrate-ios-apm-traces:

Link RUM with Splunk APM
==================================

Splunk RUM uses server timing to calculate the response time between the front end and back end of your application, and to join the front-end and back-end traces for end-to-end visibility.

By default, the Splunk Distributions of OpenTelemetry already send the ``Server-Timing`` header. The header links spans from the browser with back-end spans and traces.

The APM environment variable for controlling the ``Server-Timing`` header  is ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``. Set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true`` to link to Splunk APM. 


.. _ios-webview-instrumentation:

Instrument iOS WebViews using the Browser RUM agent
====================================================================

You can use Mobile RUM instrumentation and Browser RUM instrumentation simultaneously to see RUM data combined in one stream. You can do this by sharing the ``splunk.rumSessionId`` between both instrumentations.

The following Swift snippet shows how to integrate iOS RUM with Splunk Browser RUM:

.. code-block:: swift

   import WebKit
   import SplunkOtel

   ...
      /* 
   Make sure that the WebView instance only loads pages under 
   your control and instrumented with Splunk Browser RUM. The 
   integrateWithBrowserRum() method can expose the splunk.rumSessionId
   of your user to every site/page loaded in the WebView instance.
   */
      let webview: WKWebView = ...
      SplunkRum.integrateWithBrowserRum(webview)

Change attributes before they're collected
====================================================================

To remove or change attributes in your spans, such as personally identifiable information (PII), see :ref:`ios-rum-span-filtering`.

How to contribute
=========================================================

The Splunk OpenTelemetry Instrumentation for iOS is open-source software. You can contribute to its improvement by creating pull requests in GitHub. To learn more, see the :new-page:`contributing guidelines <https://github.com/signalfx/splunk-otel-ios/blob/main/CONTRIBUTING.md>` in GitHub.