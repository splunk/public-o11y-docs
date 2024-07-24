.. _rum-session-replay:


**********************************************************************
Session replay in Splunk RUM
**********************************************************************

Replay a session to take a look at exactly what the user experienced and make informed decisions about what to do next. Sessions have a maximum duration of four hours. 

.. note:: Customer is responsible for using Splunk Observability Cloud in compliance with applicable laws, including but not limited to providing notice to and obtaining any necessary consent form individuals whose data will be collected by Customer's use of the services. 


Use cases
===================
There are many reasons why you might want to replay sessions. Here are a few: 

* Reduce the amount of time support teams take to troubleshoot a problem. By seeing errors from the perspective of an actual user, support teams can quickly identify what happened, and take action. Without session replay, support teams could spend a long time investigating a variety of possible causes based on an incomplete description of the problem. 
* Introduce fast fixes to your applications by honing in on errors and seeing what errors impact users. 
* Improve UX by seeing how users interact with your applications and following their navigation path. For example, if customers aren't adding promo codes from a targeted ad campaign, review the checkout workflow to see if customers can even find the dropdown to add a promo code. 


Prerequisite
=================

Session replay is available for enterprise customers only. For more information on each type of subscription, see :new-page:`Splunk RUM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-rum>`.


Set up session replay 
=====================
There are two ways to set up session replay: CDN or NPM. 

.. admonition:: Note
    
    Initialize Splunk Browser RUM before you initialize the session recorder package. 

This example shows the order in which to initialize the scripts:

.. code-block:: html

    <script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web.js" crossorigin="anonymous"></script>
    <script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web-session-recorder.js" crossorigin="anonymous"></script>
    <script>
    SplunkRum.init({
        realm: '<realm>',
        rumAccessToken: '<your_rum_token>',
        applicationName: '<your_app_name>',
        version: '<your_app_version>',
        deploymentEnvironment: '<your_environment_name>'
    });
    SplunkSessionRecorder.init({
        realm: '<realm>',
        rumAccessToken: '<your_rum_token>'
    });
    </script>

Use session replay with Splunk CDN
--------------------------------------------

Initialize this code snippet to set up session replay through Splunk CDN. 

.. code-block:: html

    <script src="https://cdn.signalfx.com/o11y-gdi-rum/latest/splunk-otel-web-session-recorder.js" crossorigin="anonymous"></script>
    <script>
    SplunkSessionRecorder.init({
        realm: '<realm>',
        rumAccessToken: '<your_rum_token>'
    });
    </script>



Use session replay through NPM
--------------------------------------------
Use the following command to set up session replay with NPM through a package named ``@splunk/otel-web-session-recorder``.

.. code-block:: html

    npm install @splunk/otel-web-session-recorder

Next, initialize this code snippet: 

.. code-block:: html

    import SplunkSessionRecorder from '@splunk/otel-web-session-recorder'

    SplunkSessionRecorder.init({
        realm: '<realm>',
        rumAccessToken: '<your_rum_token>'
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
Try these methods:

* If a session is incomplete, it might be because the network bandwidth isn't strong enough, which can cause part of a session to drop off. 
* If a user has multiple tabs of the same application open, then there is a session replay available for each tab. Make sure to open the tab below session replay and navigate to the tab you're interested in. For example, in the following image, the blue tabs at the top of the chart represent a user loading the page again, or opening the app in a different page.


.. image:: /_images/rum/sr-tabs.png
   :alt: This image shows eight tabs in a chart where a user could have loaded the page again, or opened the app in a different tab. 
   :width: 97.3%

* Elements or images aren't appearing in your session replay. It's possible that the images or elements are blocked by a content security policy. Review the policy and CDN provider to confirm.
 
* Aspect ratio is distorted. The aspect ratio is dependent on the user's window size. 







