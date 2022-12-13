.. _rum-session-replay:


**********************************************************************
Session replay in Splunk RUM
**********************************************************************

.. admonition:: Preview feature

    Preview features described in this document are provided by Splunk to you "as is" without any warranties, maintenance and support, or service level commitments. Splunk makes this preview feature available in its sole discretion and may discontinue it at any time. These documents are not yet publicly available and we ask that you keep such information confidential. Use of preview features is subject to the :new-page:`Splunk Pre-Release Agreement for Hosted Services <https://www.splunk.com/en_us/legal/pre-release-agreement-for-hosted-services.html>`.


Replay a session to take a look at exactly what the user experienced and make informed decisions about what to do next. Sessions have a maximum duration of four hours. 

Use cases
===================
There are many reasons why you might want to replay sessions. Here are a few: 

* Reduce the amount of time support teams take to troubleshoot a problem. By seeing errors from the perspective of an actual user, support teams can quickly identify what happened, and take action. Without session replay, support teams could spend time a long time investigating a variety of possible causes based off of an incomplete description of the problem. 
* Introduce fast fixes to your applications by honing in on errors and seeing what errors impact users. 
* Improve UX by seeing how users interact with your applications and following their navigation path. For example, if customers aren't adding promo codes from a targeted ad campaign, review the checkout workflow to see if customers can even find the dropdown to add a promo code. 


Prerequisite
=================

Session replay is available for enterprise customers only. For more information on each type of subscription, see :new-page:`Splunk RUM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-rum>`.


Setup session replay 
=====================
There are two ways to setup session replay: CDN, or NPM. 

.. admonition:: Note
    
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

Use session replay through Splunk CDN
--------------------------------------------

Initialize this code snippet to set up session replay through Splunk CDN. 

.. code-block:: html

    <script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web-session-recorder.js" crossorigin="anonymous"></script>
    <script>
    SplunkSessionRecorder.init({
        beaconUrl: 'https://rum-ingest.<realm>.signalfx.com/v1/rumreplay',
        rumAuth: '<auth token>'
    });
    </script>



Use session replay through Splunk NPM
--------------------------------------------
Use the following command to set up session replay with NPM through a package named ``@splunk/otel-web-session-recorder``.

``npm install @splunk/otel-web-session-recorder``

Next, initialize this code snippet: 

.. code-block:: html

    import SplunkSessionRecorder from '@splunk/otel-web-session-recorder'

    SplunkSessionRecorder.init({
    // Also ingest hasn't been ready so we've been hijacking normal ingest, most likely this would be good to assume:
    beaconUrl: 'https://rum-ingest.<realm>.signalfx.com/ ...',
    rumAuth: '<auth token>'
    });


Deactivate session replay 
--------------------------------------------
To deactivate session replay you can either:

* Turn it off for the particular session replay. 
* Remove the instrumentation if you want to deactivate it completely. 


Additional instrumentation settings
------------------------------------

For more information on configuration options, see :new-page:`rrweb guide <https://github.com/rrweb-io/rrweb/blob/master/guide.md#guide>` on GitHub. 

Redact information
==============================
Text is redacted by default, you can optionally configure image redaction as well. The following image shows how the Splunk RUM homepage looks with text redaction enabled. All text is replaced by * symbols. 

.. image:: /_images/rum/SR-text-redaction.png
   :alt: Example home screen of a website with the text replaced by the star symbol to show redacted text. 
   :width: 70%



Image redaction 
----------------

To redact images, set ``inlineImages: false`` in  the ``splunksessionrecorder.init`` function. 

For more information on how to customize your instrumentation, see the Privacy section of the :new-page:`rrweb guide <https://github.com/rrweb-io/rrweb/blob/master/guide.md#privacy>` on GitHub. 


Replay a session
================
To replay a session,  open the session you're interested in session waterfall, and if there's a replay option available, click :strong:`Replay`. Here are a few controls you can configure:

* Adjust the speed of the session and the size of the window. 
* Toggle the timeline to see multiple replay segments if the user had multiple instances of the application open at the same time. 



Troubleshooting  
===================
Try these steps: 

* If a session is incomplete, it might be because the network bandwidth isn't strong enough, which can cause part of a session to drop off. 
* If a user has multiple tabs of the same application open, then there is a session replay available for each tab. Make sure to open the tab below session replay and navigate to the tab you're interested in. 









