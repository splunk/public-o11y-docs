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


.. _rum-gdi-install-cli:

Install the splunk-rum CLI
=====================================================================

The ``splunk-rum`` CLI is a tool for enabling automatic source mapping of your browser, iOS, and Android applications at instrumentation time. Although you can prepare and upload source mapping information "on demand" manually through the UI, the best practice is to integrate the use of this CLI into the CI pipeline of your application. By integrating ``splunk-rum`` commands into your CI pipeline, you automate the steps you need to take to enable Splunk RUM to convert stack traces from your browser and mobile applications into human-readable form, and you ensure that this source mapping information always matches your production binaries.


Prerequisites
---------------------------------------------------------------------

* Install Node v18+ on your build machine.
* Get an organization access token with an authorization scope of ``API token`` (not ``RUM token``) and with the ``power`` role. You will save this token in an environment variable named ``SPLUNK_ACCESS_TOKEN``. 


Installation
---------------------------------------------------------------------

#. Download ``splunk-rum`` from :new-page:`the splunk-rum-cli repo<https://github.com/signalfx/splunk-rum-cli>`. This CLI is published to npm as package name ``@splunk/rum-cli``.  
#. Install ``splunk-rum`` in your Linux-based build environment either as:

   * A dependency of your build process, and add ``splunk-rum`` to your ``PATH``:
   
     .. code-block:: bash

        npm install @splunk/rum-cli --global

   * A dependency to your existing ``package.json`` file. Note: This option is for browser applications only, not mobile applications: 

     .. code-block:: bash

        npm install @splunk/rum-cli --save-dev


#. Set these environment variables: 

   .. code-block:: bash

      export SPLUNK_ACCESS_TOKEN=<your-splunk-observability-token>
      export SPLUNK_REALM=<your-splunk-observability-realm>


Next steps
---------------------------------------------------------------------

To use ``splunk-rum`` to upload your application's mapping files to Splunk RUM, follow the steps corresponding to your application's platform:

* For browser applications, see :ref:`set-up-javascript-source-mapping`. 
* For iOS applications, see :ref:`add-dsyms`. 
* For Android applications, see :ref:`add-mapping-file`.

