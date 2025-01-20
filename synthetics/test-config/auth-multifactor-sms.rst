.. _auth-multifactor-sms:

******************************************************************
Multifactor authentication through SMS  
******************************************************************

.. meta::
    :description: Multifactor authentication allows your test to authenticate to a target page by sending it a code it receives through SMS.


.. :note:: This authentication method applies to browser tests only.

If your test target sends a one time passcode (OTP) through SMS for multifactor authentication, your browser test must retrieve the OTP from the SMS message and enter it into the input field on the target's page. To do this, configure your browser test as follows.


Prerequisites
============================

-  Virtual phone number
   To authenticate through SMS, you must have a virtual phone number that can receive one time passcodes through SMS. Several services offer virtual phone numbers and provide SMS content through an API, such as the http://sinch.com service. For instructions on receiving messages through this service, see :new-page:`https://developers.sinch.com/docs/sms/api-reference/sms/tag/Inbounds/#tag/Inbounds/operation/ListInboundMessages`.
   Certain services, such as Twilio, may block incoming SMS messages containing OTPs. For more information regarding this issue, see Twilio's documentation: :new-page:`https://www.twilio.com/docs/api/errors/30038`.

-  SMS notifications
   To enhance the authorization process, you must have a service that sends SMS notifications, such as ``github.com <https://github.com>``.


Limitations
============================

Some services may not be accessible during Synthetics tests due to violations of Content-Security-Policy (CSP). In such instances, a workaround is to implement third-party services on your server and provide an endpoint configured with CSP to allow connect-src.

..  image:: /_images/synthetics/auth-multifactor-sms-one.png
    :width: 70%
    :alt: Screenshot showing how to set up a synthetic test with multifactor authentication through SMS. 

1. On the browser test's configuration page, select the :guilabel:`Simple` toggle.

2. Select :guilabel:`Edit steps or synthetic transactions`.

3. Add a step of type :guilabel:`Go to url`, and in :guilabel:`URL`, enter the URL of the target's authentication page.

..  image:: /_images/synthetics/auth-multifactor-sms-two.png
    :width: 70%
    :alt: Screenshot showing the "Go to URL" step. 


4. Add a step of type :guilabel:`Save return value from JavaScript`, and in the code field, paste the following JavaScript.
   This script retrieves data from a specified URL using ``XMLHttpRequest`` and extracts the OTP from that data. You configure your test to save this OTP in a global variable named ``otp``.

   .. :note::  In the script, set the variable url to the URL of your  own virtual phone number's SMS service.

..  image:: /_images/synthetics/auth-multifactor-sms-three.png
    :width: 70%
    :alt: Screenshot showing the JavaScript that retrieves data from a specified URL. 

   .. code-block:: javascript

     function getOtp() {
     const url = "https://api.alfa.smartlook.cloud/sms";
     var request = new XMLHttpRequest();
     request.open("GET", url, false);
     request.send();
     if (request.status == 200) {
     return parseOtp(JSON.parse(request.responseText));
     }
     return;
     }

     function parseOtp(jsonResponse) {
     const firstInbound = jsonResponse.inbounds[0];
     if (firstInbound && firstInbound.body) {
     // Extract the number using a regular expression
     const match = firstInbound.body.match(/\\b\\d{6}\\b/);
     if (match) {
     return match[0]; // Return the first matched number
     }
     }
     return;
     }
     return getOtp();

5. Add a step of type :guilabel:`Wait`, and specify a wait time in milliseconds. This time needs to be long enough for the target to send the OTP code to your virtual phone number, and for your JavaScript to process the OTP.

6. Add a step of type :guilabel:`Fill in field`, and set it up as follows:

   1. In :guilabel:`Selector`, enter the ID of the element on the target page where the user must enter the OTP.

   2. In :guilabel:`Value`, enter the name of the custom varialble your JavaScript stored the OTP in, prefixed with custom. and enclosed in double curly braces. For example, ``{{custom.otp}}``.

..  image:: /_images/synthetics/auth-multifactor-sms-four.png
    :width: 70%
    :alt: Screenshot showing the "Fill in field" step. 

7. To verify that the login succeeded, add a step of type :guilabel:`Assert text present`, and set it up as follows:

   1. In :guilabel:`Text`, enter a string that should be visible on the test target page only when login is successful.

   2. (Optional) Set :guilabel:`Wait for up to` to a large enough value, in milliseconds, to ensure that the page loads.

8. Select :guilabel:`Submit`.

To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.

..  image:: /_images/synthetics/auth-multifactor-sms-five.png
    :width: 70%
    :alt: Screenshot showing how to verify that your synthetic test settings are working. 

