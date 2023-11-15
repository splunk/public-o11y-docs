.. _rum-gdi:

******************************************************************
Instrument mobile and web applications for Splunk RUM
******************************************************************

.. meta::
   :description: Instrument your mobile or web application to send front-end application data to Splunk Observability Cloud real user monitoring / RUM.

..	toctree::
   :hidden:

   Instrument browser-based web applications TOGGLE <browser/get-browser-data-in>
   Instrument iOS applications TOGGLE <ios/get-ios-data-in>
   Instrument Android applications TOGGLE <android/get-android-data-in>
   Instrument React Native applications TOGGLE <react/get-react-native-data-in>

Instrument your mobile and web applications to send data to Splunk Real User Monitoring (RUM). Splunk RUM provides visibility into the user behaviors in mobile and web applications. To learn more about Splunk RUM, see :ref:`get-started-rum`.

Splunk RUM instrumentation sends traces from web and mobile applications to Splunk Observability Cloud. 

.. mermaid::
   
   flowchart LR

      accTitle: Splunk RUM instrumentation diagram
      accDescr: Splunk RUM instrumentation encompasses web applications, mobile applications, and React Native applications. RUM instrumentation sends traces from these applications to Splunk RUM. Splunk APM and Splunk RUM send server-timing data between each other.

      subgraph "Splunk RUM Instrumentation"
      B["Browser-based web applications"]
      M["Mobile applications (iOS, Android)"]
      R["React Native applications"]
      end

      A["Splunk APM"]
      A <-. "Server-Timing data" .-> S

      B -- traces --> S
      M -- traces --> S
      R -- traces --> S

      S["Splunk RUM"]

.. raw:: html

  <embed>
    <h2>Available front-end instrumentations<a name="otel-frontend-instrumentations" class="headerlink" href="#otel-frontend-instrumentations" title="Permalink to this headline">¶</a></h2>
  </embed>

You can instrument the following types of application:

- :ref:`Browser-based web applications <browser-rum-gdi>`
- :ref:`iOS applications <rum-mobile-ios>`
- :ref:`Android applications <rum-mobile-android>`
- :ref:`React Native applications <rum-mobile-react>`
