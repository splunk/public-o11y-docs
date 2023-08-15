.. _android-rum-install:

*******************************************************************************
Install the Android RUM agent for Splunk RUM
*******************************************************************************

.. meta::
   :description: Instrument your Android applications in Splunk Observability Cloud real user monitoring / RUM instrumentation using the agent.

You can instrument your Android applications for Splunk RUM using the Android RUM agent from the Splunk OpenTelemetry Instrumentation for Android. 

To instrument your Android application and get data into Splunk RUM, follow the instructions on this page.

.. note:: Splunk APM is not required to instrument Splunk RUM for Android. 

.. _android-rum-requirements:



Decide which version to run in your environment
=======================================================
Latest updates automatically whenever Splunk RUM releases a new version. In pre-production, use latest to try out the most recent version of Splunk RUM. In production environments, use the pinned version which was previously tested in pre-production and update the production version on a monthly cycle.  


Check compatibility and requirements 
===============================================

Splunk RUM for Mobile supports Java and Kotlin applications for Android API Level 21 and higher. API levels 21 to 25 require core library desugaring activated. See :ref:`enable-desugaring`.

.. _enable-desugaring:

Activate desugaring in your application
-----------------------------------------------

To instrument applications that run on Android API levels 21 to 25, you must activate desugaring. 

To activate desugaring in your application, open the build.gradle file for your app module and update the ``compileOptions`` and ``dependencies`` sections as in the following examples:

.. tabs::

   .. code-tab:: kotlin Kotlin

      android {
         compileOptions {
            //...
            coreLibraryDesugaringEnabled = true
            sourceCompatibility = JavaVersion.VERSION_1_8 // Java 8 and higher
            targetCompatibility = JavaVersion.VERSION_1_8 // Java 8 and higher
            //...
         }
      }

      dependencies {
         //...
         coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:1.1.5")
         //...
      }

   .. code-tab:: groovy Groovy

      android {
         compileOptions {
            //...
            coreLibraryDesugaringEnabled true
            sourceCompatibility JavaVersion.VERSION_1_8 // Java 8 and higher
            targetCompatibility JavaVersion.VERSION_1_8 // Java 8 and higher
            //...
         }
      }

      dependencies {
         //...
         coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.1.5'
         //...
      }

Save and sync your project to implement desaguring in your application.

.. note:: Make sure that your Android Gradle plugin is version 4.0.0 and higher.

.. _add-dependency-android-rum-agent:

Install the Android agent as a dependency
========================================================

To activate the agent, you must install the Android RUM agent as a code-level dependency in your Android application.

Follow these steps to install the Android RUM agent using Maven Central:

1. Make sure Maven Central is in the repositories section of your main build.gradle file:

   .. code-block:: kotlin

      allprojects {
         repositories {
            google()
         //...
            mavenCentral()
         }
      }

2. Add the latest Android RUM agent release as a dependency in the build.gradle file of your application:

   .. tabs::

      .. code-tab:: kotlin Kotlin

         dependencies {
         //...
            // Set the desired version of the RUM agent.
            // See available releases: https://github.com/signalfx/splunk-otel-android/releases
            implementation("com.splunk:splunk-otel-android:+")
         //...
         }

      .. code-tab:: groovy Groovy

         dependencies {
         //...
            // Set the desired version of the RUM agent.
            // See available releases: https://github.com/signalfx/splunk-otel-android/releases
            implementation 'com.splunk:splunk-otel-android:+'
         //...
         }

3. Configure and initialize the Android RUM agent by passing a configuration object to the initialization call in ``Application.onCreate()``:

   .. code-block:: kotlin

      import com.splunk.rum.SplunkRum
      import com.splunk.rum.StandardAttributes
      import io.opentelemetry.api.common.Attributes

      class MyApplication extends Application {
         private final String realm = "<realm>";
         private final String rumAccessToken = "<your_RUM_access_token>";

         @Override
         public void onCreate() {
            super.onCreate();

            SplunkRum.builder()
                     .setApplicationName("<name_of_app>")
                     .setDeploymentEnvironment("<name_of_env>") // Environment
                     .setRealm(realm)
                     .setRumAccessToken(rumAccessToken)
                     .setGlobalAttributes(
                           Attributes.builder() // Add the application version. Alternatively, you
                              // can pass BuildConfig.VERSION_NAME as the value.
                              .put(StandardAttributes.APP_VERSION, "<version_of_app>")
                              .build()
                     )
                     // Activates debug logging if needed
                     //.enableDebug()
                     .build(this);
         }
      }

   * The value passed to ``.realm()`` is the Splunk Observability Cloud realm, for example, ``us0``. To find the realm name of your account, follow these steps: 

         1. Open the navigation menu in Splunk Observability Cloud.
         2. Select :menuselection:`Settings`.
         3. Select your username. 

      The realm name appears in the :guilabel:`Organizations` section.

   * To generate a RUM access token, see :ref:`rum-access-token`.

4. Instrument your HTTP client. For example, the following snippets instruments OkHttp:

   .. code-block:: kotlin

      private fun buildOkHttpClient(splunkRum: SplunkRum): Call.Factory {
         return splunkRum.createRumOkHttpCallFactory(OkHttpClient())
      }

   See :ref:`android-rum-http-client-settings` for more information.

5. Release the changes to the Android application.

6. Generate some user activity in your application. After you've interacted with the application, verify that the data is appearing in the RUM dashboard.

   .. note:: You can check whether the Android RUM agent has been initialized by calling the ``SplunkRum.isInitialized()`` method anywhere in your code.

For a sample application using Android RUM, see :new-page:`the sample application in GitHub <https://github.com/signalfx/splunk-otel-android/tree/main/sample-app>`.

.. _android-build-locally:

Build the Android RUM library locally
=========================================================

To download and build the Android RUM library locally, follow these steps:

1. Clone the repository to your machine:

   .. code:: bash

      git clone https://github.com/signalfx/splunk-otel-android.git

2. Build locally and publish to your local Maven repository:

   .. code:: bash

      ./gradlew publishToMavenLocal

3. Make sure to set ``mavenLocal()`` as the repository in your build.gradle file:

   .. code:: kotlin

      allprojects {
         repositories {
            google()
      //...
            mavenLocal()
         }
      }

4. Add the library you've built as a dependency in the build.gradle file:

   .. code:: kotlin

      dependencies {
         //...
            implementation ("com.splunk:splunk-otel-android:<version>")
         //...
      }

.. _android-webview-instrumentation:

Instrument Android WebViews using the Browser RUM agent
==========================================================

You can use Mobile RUM instrumentation and Browser RUM instrumentation simultaneously by sharing the ``splunk.rumSessionId`` between both instrumentations to see RUM data combined in one stream.

The following snippet shows how to integrate Android RUM with Splunk Browser RUM:

.. code-block:: kotlin

   import android.webkit.WebView
   import com.splunk.rum.SplunkRum

   //...
   /*
   Make sure that the WebView instance only loads pages under
   your control and instrumented with Splunk Browser RUM. The
   integrateWithBrowserRum() method can expose the splunk.rumSessionId
   of your user to every site/page loaded in the WebView instance.
   */
   override fun onViewCreated(view: View, @Nullable savedInstanceState: Bundle?) {
      super.onViewCreated(view, savedInstanceState)
      binding.webView.setWebViewClient(LocalContentWebViewClient(assetLoader))
      binding.webView.loadUrl("https://subdomain.example.com/instrumented-page.html")
      binding.webView.getSettings().setJavaScriptEnabled(true)
      binding.webView.addJavascriptInterface(WebAppInterface(getContext()), "Android")
      SplunkRum.getInstance().integrateWithBrowserRum(binding.webView)
   }

.. _integrate-android-apm-traces:

Link RUM with Splunk APM
==================================

Splunk RUM uses server timing to calculate the response time between the front end and back end of your application, and to join the front-end and back-end traces for end-to-end visibility.

By default, the Splunk Distributions of OpenTelemetry already send the ``Server-Timing`` header. The header links spans from the browser with back-end spans and traces.

The APM environment variable for controlling the ``Server-Timing`` header  is ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true``. Set ``SPLUNK_TRACE_RESPONSE_HEADER_ENABLED=true`` to link to Splunk APM. 

Change attributes before they're collected
===============================================

To remove or change attributes in your spans, such as personally identifiable information (PII), see :ref:`android-rum-span-filtering`.

How to contribute
=========================================================

The Splunk OpenTelemetry Instrumentation for Android is open-source software. You can contribute to its improvement by creating pull requests in GitHub. To learn more, see the :new-page:`contributing guidelines <https://github.com/signalfx/splunk-otel-android/blob/main/CONTRIBUTING.md>` in GitHub.