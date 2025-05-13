.. _ios-rum-install:

**************************************************************
Install the iOS RUM library for Splunk RUM
**************************************************************

.. meta::
   :description: Instrument your iOS applications for Splunk Observability Cloud real user monitoring / RUM using the iOS RUM library from the Splunk OpenTelemetry Instrumentation for iOS.

To instrument your iOS application using the iOS RUM library and get data into Splunk RUM, follow the instructions on this page. You can install the library using Swift Package Manager, or by building an XCFramework.

.. note:: Splunk APM is not required to instrument Splunk RUM for iOS.


Decide which version to run in your environment
=======================================================

Latest updates automatically whenever Splunk RUM releases a new version. In pre-production, use latest to try out the most recent version of Splunk RUM. In production environments, use the pinned version which was previously tested in pre-production and update the production version on a monthly cycle.


.. _ios-rum-requirements:

Check compatibility and requirements
===============================================



.. raw:: html

   <div class="include-start" id="requirements/ios.rst"></div>

.. include:: /_includes/requirements/ios.rst

.. raw:: html

   <div class="include-stop" id="requirements/ios.rst"></div>





.. _rum-ios-install:

Generate customized instructions using the guided setup
====================================================================

Before you instrument and configure Splunk RUM for your iOS application, understand which data RUM collects about your application and determine the scope of what you want to monitor. See :ref:`rum-data-collected`.

:strong:`Tip:` To generate all the basic installation commands for your environment and application, use the iOS Instrumentation guided setup. To access the iOS Instrumentation guided setup, follow these steps:

1. Log in to Splunk Observability Cloud.

2. In the navigation menu, select :menuselection:`Data Management`. 

3. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

4. In the integration filter menu, select :guilabel:`By Use Case`.

5. Select the :guilabel:`Monitor user experience` use case.

6. Select the :guilabel:`iOS Instrumentation` tile to open the iOS Instrumentation guided setup.


.. _rum-ios-install-manually:

Install the iOS RUM library manually
==================================================================

To install the iOS RUM library manually, follow these steps:

- :ref:`ios-rum-add-package`
- :ref:`rum-ios-initialize`
- :ref:`rum-ios-crash-reporting`

.. _ios-rum-add-package:

Add the dependency in Xcode
---------------------------------------------------------

To add the iOS RUM package to your project, follow the steps for your dependency manager. To build an XCFramework, see :ref:`xcframeork-ios-rum`.


Swift package manager (SPM)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To install the iOS RUM library using the Swift Package Manager (SPM) follow these steps:

1. In Xcode, select :strong:`File`, then :strong:`Add Packages...` or :strong:`File`, then :strong:`Swift Packages`, then :strong:`Add Package Dependency`, and enter the following URL in the search bar:

   ``https://github.com/signalfx/splunk-otel-ios``

2. Select :guilabel:`Add Package` to install the package.


.. _rum-ios-initialize:

Initialize the iOS RUM package
----------------------------------------------------------

Follow these steps to initialize the iOS RUM package.

1. Initialize the iOS RUM library with your configuration parameters:

   .. tabs::

      .. code-tab:: swift Swift

         import SplunkOtel
         //..
         SplunkRumBuilder(realm: "<realm>", rumAuth: "<rum-token>")
         // Call functions to configure additional options
            .deploymentEnvironment(environment: "<environment>")
            .setApplicationName("<your_app_name>")
            .build()

      .. code-tab:: objective-c Objective-C

         @import SplunkOtel;

         SplunkRumBuilder *builder = [[SplunkRumBuilder alloc] initWithRealm:@"<realm>"  rumAuth: @"<rum-token>"]];
         [builder deploymentEnvironmentWithEnvironment:@"<environment-name>"];
         [builder setApplicationName:@"<your_app_name>"];
         [builder build];

   * ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.

   * To generate a RUM access token, see :ref:`rum-access-token`.

2. Deploy the changes to your application.

.. _rum-ios-crash-reporting:

Activate crash reporting
==============================================

The Splunk iOS Crash Reporting module adds crash reporting to the iOS RUM library using PLCrashReporter.

.. caution:: Before activating crash reporting in the iOS RUM library, deactivate any other crash reporting package or library in your application. Existing crash reporting functionality might produce unexpected results, including build failures.

To activate crash reporting in the iOS RUM library, follow these steps.

Add the dependency
------------------------------------------------

To add the iOS Crash Reporting package to your project, follow the steps for your package manager.


Swift package manager (SPM)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To install the iOS RUM library using the Swift Package Manager (SPM) follow these steps:

1. In Xcode, select :strong:`File`, then :strong:`Add Packages...` or :strong:`File`, then :strong:`Swift Packages`, then :strong:`Add Package Dependency`, and enter the following URL in the search bar:

   ``https://github.com/signalfx/splunk-otel-ios-crashreporting``

2. Select :guilabel:`Add Package` to install the package.


Initialize Crash Reporting
---------------------------------------------------

Initialize the crash reporting module with your configuration parameters:

.. tabs::

   .. code-tab:: swift Swift

      import SplunkOtel
      import SplunkOtelCrashReporting

      import SplunkOtel
      //..
      SplunkRumBuilder(realm: "<realm>", rumAuth: "<rum-token>")
         .deploymentEnvironment(environment: "<environment>")
         .setApplicationName("<your_app_name>")
         .build()
      // Initialize crash reporting module after the iOS agent
      SplunkRumCrashReporting.start()

   .. code-tab:: objective-c Objective-C

      @import SplunkOtel;
      @import SplunkOtelCrashReporting;
      //...
      SplunkRumBuilder *builder = [[SplunkRumBuilder alloc] initWithRealm:@"<realm>"  rumAuth: @"<rum-token>"]];
      [builder deploymentEnvironmentWithEnvironment:@"<environment-name>"];
      [builder setApplicationName:@"<your_app_name>"];
      [builder build];
      // Initialize crash reporting module after the iOS agent
      [SplunkRumCrashReporting start]

* ``realm`` is the Splunk Observability Cloud realm, for example, ``us0``. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.

* To generate a RUM access token, see :ref:`rum-access-token`.


.. _xcframeork-ios-rum:

Build an XCFramework
=================================

If you want to import the iOS RUM Agent as a framework into your project, follow these steps:

1. Check the build settings

Clone the :new-page:`splunk-otel-ios <https://github.com/signalfx/splunk-otel-ios>` repository and open the SplunkRumWorkspace.xcworkspace file in Xcode.

Navigate to the :guilabel:`Build Settings` tab on the ``SplunkOtel`` target and make sure the following settings are present:

- :strong:`Skip Install`: No
- :strong:`Build Libraries for Distribution`: Yes

2. Create a new archives directory

Open a terminal and navigate to the directory where the SplunkRum.xcodeproj file is located, for example ``SplunkRumWorkspace/SplunkRum``.

Run the following command to create a new archives directory containing the ``SplunkRum-iOS.xcarchive`` file:

.. code-block:: bash

   xcodebuild archive -project SplunkRum.xcodeproj -scheme SplunkOtel -destination "generic/platform=iOS" -archivePath "archives/SplunkRum-iOS"

Repeat the process for the simulator platform:

.. code-block:: bash

   xcodebuild archive -project SplunkRum.xcodeproj -scheme SplunkOtel -destination "generic/platform=iOS Simulator" -archivePath "archives/SplunkRum-iOS_Simulator"

3. Create the new XCFramework

Run the following command to create the XCFramework:

.. code-block:: bash

   xcodebuild -create-xcframework -archive archives/SplunkRum-iOS.xcarchive -framework SplunkOtel.framework -archive archives/SplunkRum-iOS_Simulator.xcarchive -framework SplunkOtel.framework -output xcframeworks/SplunkOtel.xcframework

4. Import the XCFramework into your project

Open your project in Xcode and drag the SplunkOtel.xcframework file into the project navigator. This automatically imports the framework. Go into the General tab in any targets using the framework and set their Embed property to Embed & Sign.

.. _integrate-ios-apm-traces:

Link RUM with Splunk APM
==================================

Splunk RUM uses server timing to calculate the response time between the front end and back end of your application, and to join the front-end and back-end traces for end-to-end visibility.

By default, the Splunk Distributions of OpenTelemetry already send the ``Server-Timing`` header. The header links spans from the browser with back-end spans and traces.

The APM environment variable for controlling the ``Server-Timing`` header  is ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED``. Set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true`` to link to Splunk APM.

.. _ios-webview-instrumentation:

Instrument iOS WebViews using the Browser RUM library
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

Next steps
================

* To add custom attributes, adapt the instrumentation to your environment and application, customize sampling, and more, see :ref:`configure-ios-instrumentation`.
* To check that your data is in your Splunk RUM for Mobile instance, see :ref:`rum-check-mobile-data`.
* To troubleshoot, see :ref:`common-ios-troubleshooting`.
