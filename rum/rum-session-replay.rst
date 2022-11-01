.. _rum-session-replay:


**********************************************************************
Session replay in Splunk RUM
**********************************************************************

.. admonition:: Preview feature

    Preview features described in this document are provided by Splunk to you "as is" without any warranties, maintenance and support, or service level commitments. Splunk makes this preview feature available in its sole discretion and may discontinue it at any time. These documents are not yet publicly available and we ask that you keep such information confidential. Use of preview features is subject to the :new-page:`Splunk Pre-Release Agreement for Hosted Services <https://www.splunk.com/en_us/legal/pre-release-agreement-for-hosted-services.html>`.


:strong:`Description`


Replay a session to take a look at exactly what the user experienced and make informed decisions about what to do next. Click into... in the waterfall. Session replay videos are segmented into chunks, which ... A session replay has a maximum of ...       

Prerequisite
=================

Session replay is available for enterprise customers only. For more information on each type of subscription, see :new-page:`Splunk RUM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-rum>`.


Setup session replay 
=====================
There are two ways to setup session replay: CDN, or NPM. 

.. admonition:: Important
    
    Initialize Splunk Browser RUM before you initialize the session recorder package. 

This example shows the order in which to initialize the scripts:

.. code-block:: html

    <script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web.js" crossorigin="anonymous"></script>
    <script src="https://cdn.signalfx.com/o11y-gdi-rum/packages/otel-web-session-recorder/latest/splunk-otel-web-session-recorder.js" crossorigin="anonymous"></script>
    <script>
    SplunkRum.init({
        beaconUrl: 'https://rum-ingest.<realm>.signalfx.com/v1/rum',
        rumAuth: '<your_rum_token>',
        app: '<your_app_name>',
        version: '<your_app_version>',
        environment: '<your_environment_name>'
    });
    SplunkSessionRecorder.init({
        beaconUrl: 'https://rum-ingest.<realm>.signalfx.com/ ...',
        rumAuth: '<auth token>'
    });
    </script>


Install the NPM package for session replay 
--------------------------------------------
Use the following command to install a NPM package named ``@splunk/otel-web-session-recorder``.

``npm install @splunk/otel-web-session-recorder``

Next, 

.. code-block:: html

    import SplunkSessionRecorder from '@splunk/otel-web-session-recorder'

    SplunkSessionRecorder.init({
    // Also ingest hasn't been ready so we've been hijacking normal ingest, most likely this would be good to assume:
    beaconUrl: 'https://rum-ingest.<realm>.signalfx.com/ ...',
    rumAuth: '<auth token>'
    });



Install the CDN package for session replay 
--------------------------------------------

.. code-block:: html

    <script src="https://cdn.signalfx.com/o11y-gdi-rum/packags/otel-web-session-recorder/latest/splunk-otel-web-session-recorder.js" crossorigin="anonymous"></script>
    <script>
    SplunkSessionRecorder.init({
        beaconUrl: 'https://rum-ingest.<realm>.signalfx.com/ ...',
        rumAuth: '<auth token>'
    });
    </script>



Deactivate session replay 
--------------------------------------------
Follow these steps to deactivate session replay: 

1. 
2. 
3. 

Redact information
==============================
Text is redacted by default, you can optionally configure image redaction as well. 


Image redaction 
----------------

..  
    code snippet 


For more information on how to customize your instrumentation, see the Privacy section of the :new-page:`rrweb guide <https://github.com/rrweb-io/rrweb/blob/master/guide.md#privacy>` on GitHub. 


Replay a session
================
Follow these steps: 

1. Open the session you're interested in session waterfall.

2. If there's a replay option available, click :strong:`Replay`. 

3. ...



Use case 
===================

For more, see :ref:`rum-use-case-session-replay` in the Splunk RUM use case library. 









