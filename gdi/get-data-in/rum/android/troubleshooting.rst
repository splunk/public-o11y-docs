.. _common-android-troubleshooting:

********************************************************************
Troubleshoot Android instrumentation for Splunk Observability Cloud
********************************************************************

.. meta::
   :description: If your instrumented Android application is not sending data to Splunk Observability Cloud, or data is missing, follow these steps to identify and resolve the issue.

When you instrument an Android application using the Splunk OpenTelemetry Instrumentation for Android and you don't see your data in Splunk Observability Cloud, follow these troubleshooting steps.

.. _basic-android-troubleshooting:

Steps for troubleshooting Android OpenTelemetry issues
=======================================================

The following steps can help you troubleshoot Android RUM agent issues:

#. :ref:`activate-desugaring`
#. :ref:`activate-android-debug-logging`

.. _activate-desugaring:

Check that desugaring is activated for your app
-------------------------------------------------

If you see runtime errors related to Java 8 interfaces and classes, make sure you have activated ``coreLibraryDesugaring``. See :ref:`enable-desugaring`.

.. _activate-android-debug-logging:

Activate debug logging
----------------------------------------

Activating debug logging can help you troubleshoot Android instrumentation issues.

To activate logging, add the ``enableDebug()`` method to ``SplunkRum.builder()``. For example:

.. code-block:: java

   SplunkRum.builder()
      .setApplicationName("<name_of_app>")
      .setRealm("<realm>"")
      .setRumAccessToken("<rumAccessToken>")
      .enableDebug()
      .build(this);
   }

.. note:: Activate debug logging only when needed. Debug mode requires more resources.

.. _background-tasks:

Background tasks are introducing noise in the data
=====================================================

Background tasks might introduce unwanted or noisy data to your instrumented application. To deactivate instrumentation for a background task, pass the application ID of the task to the ``disableBackgroundTaskReporting()`` method. For example:

.. code-block:: java
   :emphasize-lines: 12,13

   public class SampleApplication extends Application {

      @Override
      public void onCreate() {
         super.onCreate();

         SplunkRum.builder()

            // Other Settings
            // ...

            // Turn off instrumentation of background processes
            .disableBackgroundTaskReporting(BuildConfig.<id_of_application>)
            .build(this);
         }
      }

.. _gzip-android-issue:

Error: Handling gzip compressed request EOF
=================================================

When including the Splunk RUM agent to your application, Android Studio might show an EOFException related to gzip compression.

Splunk RUM uses gzip encoding to reduce network bandwidth consumption. The Network Inspector in Android Studio attempts to read the body of the HTTP request, breaking the gzip encoding. This results in Splunk Observability Cloud ingest endpoints returning error 400.

As a workaround, deactivate Splunk RUM while profiling your app, or deactivate gzip compression when profiling your app.

.. include:: /_includes/troubleshooting-components.rst
