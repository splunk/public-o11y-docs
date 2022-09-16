.. _rum-sample-app:

*******************************************************************************
Experiment with the demo applications for Splunk RUM for Mobile 
*******************************************************************************

There are two demo applications for you to explore for RUM for Mobile.  


Android demo app 
===================

The splunk-otel-android library includes a demo application called sample-app that you can use to test the RUM product. To build and run the sample application, you need to configure a :code:`local.properties` file in the root of the project. To learn more about realms, see :ref:`Note about realms<about-realms>`.

To access the sample app, see the :new-page:`sample-app <https://github.com/signalfx/splunk-otel-android/tree/main/sample-app>` in the splunk-otel-android project on GitHub.  

To use the sample app, configure the following two properties in the :code:`local.properties file` :

.. code-block:: 

    rum.access.token=<Splunk RUM access token>
    rum.beacon.url=https://rum-ingest.<realm>.signalfx.com/v1/rum

iOS demo app 
===================

The splunk-otel-ios library includes a demo application called Demo Boutique. 

To access the sample app,  see :new-page:`Demo Boutique <https://github.com/signalfx/tracing-examples/tree/main/ios/Demo%20Boutique>` in tracing-examples/iOS on GitHub. 

To use the demo app, open :code:`Demo Boutique.xcodeproj` in Xcode and run the Demo Boutique application.

