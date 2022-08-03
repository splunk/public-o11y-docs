.. _rum-rum-org:

*****************************************************************
Instrument and configure Splunk RUM to monitor your application
*****************************************************************

.. meta::
   :description: Learn how to monitor user experiences

With Splunk Real User Monitoring, you can gain insight about the performance and health of the front-end user experience of your application. Splunk RUM collects performance metrics, web vitals, errors, and other forms of data to enable you to detect and troubleshoot problems in your application. For a complete view of your application from browser to back-end, integrate with Splunk APM.

====================
Before you start 
====================
Review the prerequisites, supported browsers, and identify the scope of what you want to monitor in your application. 

Prerequisites 
==============
You need an Observability Account to access the Splunk RUM app in the Observability Cloud. If you are an existing user you can access the Observability Cloud with your SignalFx Account. 


Supported browsers 
=================== 

Splunk RUM supports the following browser versions:

- Edge 12+

- Safari 10.1+  
    - Safari 10.1 doesn't support resourceFetch spans

- Chrome 51+

- Firefox 36+ 


Decide if you want to integrate with Splunk APM
===============================================

If you want to monitor only the browser traces of your application then instrument and configure Splunk RUM by itself. If you want to monitor your application from browser to back-end, then integrate Splunk RUM with Splunk APM. When you integrate Splunk RUM with Splunk APM, you start sending server timing metrics to Splunk RUM along with the back-end trace ID that was generated. Splunk RUM uses server timings to calculate the response time between the front end and back end of your application and to join the front-end and back-end traces for end-to-end visibility in the UI. For information on how to instrument and configure Splunk APM, see :ref:`Monitor applications <get-started-apm>`.


============================================================
Step 1: Generate your RUM Token in the Observability Cloud
============================================================

A RUM token is a public key used only during RUM ingestion. To create the RUM Token you need Admin permissions. For more information, see :ref:`Administer authentication tokens <admin-tokens>`.

.. note::

    RUM access tokens are publicly visible in the client-side javascript code. 


Follow these steps to create a RUM Token for your organization. 

#. Log in to the Splunk Observability Cloud. 

#. Click the Observability menu. 

#. Click Organization Settings > Access tokens. 

#. Click New Token. 

#. Type a name.

#. Select the RUM Token checkbox. 

#. Click Ok. 


.. _modify-spans:

============================================================================================
Step 2: (Optional) Decide if you want to modify spans before they're collected by Splunk RUM 
============================================================================================

Before you instrument and configure Splunk RUM on your application, know which data is collected about your application and determine the scope of what you want to monitor. When you instrument and configure Splunk RUM on your application, RUM collects the text in error.message and the full url of each page in your application.

Data collected by Splunk RUM about your application 
=================================================== 
 When you instrument and configure Splunk RUM on your application, RUM collects the text in error.message and the full url of each page in your application. Splunk RUM collects the following data about your application:

- Document load time

- Page transitions for both multi-page applications and single-page applications

- Full URL including query parameters, but not including POST payloads, timing, and status codes

- Console errors, including text of the error message produced by your app:
    - Unhandled promise rejections
    - Document Object Model (DOM) errors on the document
    - Usage of console.error
    - Uncaught exceptions

- XPath of relevant DOM elements, such as the button a user clicked

- User meta-data captured from headers sent on requests
    - User IP address
    - User location
    - User agent


Opt out of collect error.message responses
============================================
If you do not want Splunk RUM to collect the error.message responses for your application, you can set captureErrors to false in the SplunkRum.init file. For more information, see `Splunk distribution of OpenTelemetry JavaScript Browser README <https://github.com/signalfx/splunk-otel-js-web#splunk-distribution-of-opentelemetry-javascript-browser>`_ on Github.

Change attributes in your span before they’re collected by RUM
==============================================================
If you want to remove or change attributes in your span so that these attributes are not collected by Splunk RUM, see `Redacting Personally Identifiable Information (PII) in the Splunk distribution of OpenTelemetry JavaScript Browser <https://github.com/signalfx/splunk-otel-js-web#redacting-personally-identifiable-information-pii>`_ on Github.



======================================================================================
Step 3: Choose how you want to instrument and configure Splunk RUM on your application
======================================================================================
There are three ways to instrument and configure Splunk RUM on your application.  Splunk RUM uses synchronous loading to capture document load time information about your application.

The versioning of the Splunk RUM splunk-otel-web.js file follows the semantic versioning format. For more information on major, minor, and patch versioning see `SemVer <https://semver.org/>`_.

- If you want to use the most up to date release, then use the latest version of Splunk RUM use "latest". The "latest" version is not compatibile with the self-hosting script method of instrumentation.

- If you want to automatically receive new features but want to remain backwards compatibile with the the open telemetry APIs then the choose the Major choose version such as v0.

- If you want to receive bug fixes automatically but not any new features then use the minor version such as v.0.1.

- If you want to run a specific version of Splunk RUM, then select the patch version such as v.0.1.2.

+-----------------------------------+----------------------------------------------------------------------------+
| :strong:`Instrumentation method`  | :strong:`Description`                                                      |
+===================================+============================================================================+
| CDN                               | When you connect to the CDN network, you automatically receive version     |
|                                   | upgrades as they are released by Splunk RUM. If you are concerned about    |
|                                   | bundle size, or you don’t want to bundle the instrumentation script with   |
|                                   | your application, try instrumenting and configure Splunk RUM with the      |
|                                   | CDN.                                                                       |
+-----------------------------------+----------------------------------------------------------------------------+
| Self-hosted script                | If you want to use your own CDN, have specific performance considerations, |
|                                   | or your application has restrictions on what domains you can load scripts  |
|                                   | from, then try instrumenting and configuring Splunk RUM with the           |
|                                   | self-hosted script.                                                        |            
+-----------------------------------+----------------------------------------------------------------------------+
| NPM                               | If you want control over whether the Splunk RUM instrumentation gets       |
|                                   | pulled into your javascript and when in the code the splunk-otel-web.js    |
|                                   | script runs, try NPM. The splunk-otel-web.js file is bundled directly with | 
|                                   | your application.                                                          |
+-----------------------------------+----------------------------------------------------------------------------+


Use the Data Setup wizard to instrument RUM to monitor your application
========================================================================
Apply the browser integration to automatically instrument your browser-based web application with a browser agent provided by the Splunk Distribution of OpenTelemetry Javascript Browser. 

#. Log in to the Observability cloud. 

#. Click :strong:`Data Setup> Browser Instrumentation`.

#. Follow the wizard to add the Browser Instrumentation integration. 


Instrument and configure Splunk RUM with CDN
=============================================
Follow these steps to instrument and configure Splunk RUM with the CDN.  


For more information on the Splunk RUM instrumentation script, see `Getting Started <https://github.com/signalfx/splunk-otel-js-web>`_ in splunk-otel-js-web on  Github. 

#. Fill out your Splunk RUM instrumentation script with:

    - the link to the version of the CDN you want to use. For access to the link information, see `splunk-otel-js-web <https://github.com/signalfx/splunk-otel-js-web/releases>`_ releases on Github. 

    - your beacon url 

    - your Rum Token

    - a name for your application 
       
    This is an example version of the Splunk RUM instrumentation script that links to the latest version of the splunk-otel-web.js release through CDN. In the script, <REALM> refers to your realm such as us1, eu0. 

    .. code-block::

        <script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web.js"
        crossorigin="anonymous"></script>
            <script>
                SplunkRum.init({
                beaconUrl: 'https://rum-ingest.<REALM>.signalfx.com/v1/rum',
                rumAuth: 'RUM Token',
                app: 'your-application-name'
            });
        </script>

#. Add the Splunk RUM Instrumentation script to the HEAD of every HTML page you want to monitor in your application.

#. (Optional) Modify spans before they're collected by Splunk RUM. For more information, see :ref:`Modify spans <modify-spans>`.

#. Deploy the changes to your application. 


Instrument and configure Splunk RUM with a self-hosted script 
===============================================================
Follow these steps to instrument and configure Splunk RUM with a self-hosted script. When you self-host the script you need to update to newer versions of Splunk RUM as they are released, whereas with the CDN method you recieve the updates automatically. 

#. Go to `splunk-otel-js-web <https://github.com/signalfx/splunk-otel-js-web/releases>`_ releases on Github and download the splunk-otel-web.js file. 

#. (Optional) Download the splunk-otel-web.js.map. 

#. Host the splunk-otel-web.js file in your domain with the your other JavaScript files in a place that all of the users of your application can access the file. 

#. Fill out your Splunk RUM instrumentation script with:

    - a link to the splunk-otel-web.js file 

    - your beacon url 

    - your Rum Token

    - a name for your application 
  
    This is an example version of the Splunk RUM instrumentation script for self-hosting the script. In the script, <REALM> refers to your realm such as us1, eu0. 

    .. code-block::

        <script src="http://example.domain/path/splunk-otel-web.js"></script>
        <script>
            SplunkRum.init({
            beaconUrl: 'https://rum-ingest.<REALM>.signalfx.com/v1/rum',
            rumAuth: 'RUM Token',
            app: 'your-application-name'
        });
        </script>

#. Add the Splunk RUM Instrumentation script to the HEAD of every HTML page you want to monitor in your application.

#. (Optional) Modify spans before they're collected by Splunk RUM. For more information, see :ref:`Modify spans <modify-spans>`.

#. Deploy the changes to your application. 



Instrument and configure Splunk RUM with NPM
============================================
Follow these steps to instrument and configure Splunk RUM with the NPM:

#. This step installs the Splunk RUM NPM package and adds it to your application runtime dependencies in package.json. In the command line, enter: 

    .. code-block::

        npm install @splunk/otel-web --save

#. Create a file dedicated to initialising instrumentation named splunk-instrumentation.js, next to your bundle root file.

#. Fill out the splunk-instrumentation.js file with:

    - your beacon url 

    - your Rum Token

    - a name for your application 
   
    This is an example version of the splunk-instrumentation.js for NPM. In the script, <REALM> refers to your realm such as us1, eu0. 

    .. code-block::

        import SplunkOtelWeb from '@splunk/otel-web';
        SplunkOtelWeb.init({
            beaconUrl: 'https://rum-ingest.<REALM>.signalfx.com/v1/rum',
            rumAuth: '<RUM Token>',
            app: 'your-application-name'
        });

#. The splunk-instrumentation.js file needs to go above other application code files in your bundle root file to ensure that the instrumentation runs before application code. 

#. (Optional) Modify spans before they're collected by Splunk RUM. For more information, see :ref:`Modify spans <modify-spans>`.


#. Deploy the changes to your application. 


==================================
Step 4: Integrate with Splunk APM
==================================

When you integrate Splunk RUM with Splunk APM, you start sending server timing metrics to Splunk RUM and the back-end trace ID that was generated. Splunk RUM uses the server-timing header response times to associate the Splunk RUM Span with the corresponding Splunk APM Trace. 

Requirements
=============
To integrate with Splunk APM, all of your pages, files, and requests must be securely loaded over HTTPS. If you have implemented CORS for any origins in your application, you need to set the 

.. code-block::
    
    Timing-Allowed-Origin


next to your exisiting CORS header. 


Steps
======

To integrate Splunk APM and Splunk RUM, set the system property:  

.. code-block::
    
    splunk.context.server-timing.enabled=true

The following Splunk APM agents are supported: 

OpenTelemetry agents:

- `splunk-otel-java <https://github.com/signalfx/splunk-otel-java>`_
- `splunk-otel-python <https://github.com/signalfx/splunk-otel-python>`_
- `splunk-otel-js <https://github.com/signalfx/splunk-otel-js>`_
- `splunk-otel-go <https://github.com/signalfx/splunk-otel-go>`_


SignalFX agents:

- `signalfx-java-tracing <https://github.com/signalfx/signalfx-java-tracing>`_
- `signalfx-python-tracing <https://github.com/signalfx/signalfx-python-tracing>`_
- `signalfx-dotnet-tracing <https://github.com/signalfx/signalfx-dotnet-tracing>`_
- `signalfx-nodejs-tracing <https://github.com/signalfx/signalfx-nodejs-tracing>`_
- `signalfx-go-tracing <https://github.com/signalfx/signalfx-go-tracing>`_
- `signalfx-ruby-tracing <https://github.com/signalfx/signalfx-ruby-tracing>`_
- `signalfx-php-tracing <https://github.com/signalfx/signalfx-php-tracing>`_




(Optional) Create your own server timing header 
================================================
The splunk-otel-web.js script captures the server trace context from a Server-Timing header in the traceparent format. Optionally, if you want to use an alternate form of instrumentation such as creating a header manually, see `Server trace context <https://github.com/signalfx/splunk-otel-js-web/blob/main/docs/ServerTraceContext.md>`_ on Github. 


========================================
Step 5: Start exploring your data in RUM 
========================================
Follow these steps to check that you can see your data in Splunk RUM:

#. To start sending data to Splunk RUM, you need to first have user activity on your application. 

#. Log in to the Splunk Observability Cloud. 

#. Click  Observability> RUM. 

#. Check that you can see your data in the dashboard. 

#. If you chose to integrate with Splunk APM, go to the Sessions Details page and click on an APM link to verify that the integration is working.

#. Next, start learning about :ref:`Terminology and concepts in Splunk RUM <rum-terminology-concepts>`.











