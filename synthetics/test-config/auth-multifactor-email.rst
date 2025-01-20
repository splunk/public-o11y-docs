.. _auth-multifactor-email:

******************************************************************
Multifactor authentication through email  
******************************************************************

.. meta::
    :description: Multifactor authentication allows your test to authenticate to a target page by sending it a code it receives through email.


.. :note:: This authentication method applies to browser tests only.

If your test target sends a one time passcode (OTP) through email for multifactor authentication, your browser test must retrieve the OTP from the email message and enter it into the input field on the target's page. To do this, configure your browser test as follows.


Prerequisites
============================

You must have an email service that supports connecting to your email account and managing your emails through an API. The steps below feature an example using the :new-page:`Nylas service <http://nylas.com>`. For detailed information on how to retrieve messages from this service, refer to its :new-page:`API documentation https://developer.nylas.com/docs/api/v3/ecc/?redirect=api#get-/v3/grants/-grant_id-/messages`.

Additionally, the steps below demonstrate the use of http://Github.com to send an authorization email, which is essential for extracting the OTP from it.

Limitations
============================

Your email service must be accessible through an API. Some services may not be accessible during Synthetics tests due to violations of Content-Security-Policy (CSP). In such instances, a workaround is to implement third-party services on your server and provide an endpoint configured with CSP to allow connect-src.

1. On the browser test's configuration page, select the :guilabel:`Simple` toggle.

2. select :guilabel:`Edit steps or synthetic transactions`.

3. Add a step of type :guilabel:`Go to url`, and in :guilabel:`URL`, enter the URL of the target's authentication page.

4. Add a step of type :guilabel:`Save return value from JavaScript`, and in the code field, paste the following JavaScript.
   This script retrieves data from a specified URL using ``XMLHttpRequest`` and extracts the OTP from that data. You configure your test to save this OTP in a custom variable named ``otp``. 
   .. :note:: In the script, set the variable url to the URL of your own email inbox API endpoint.
   .. :note::  If you are utilizing the Nylas service, you can locate unread emails by searching for specific text in the subject line or other parameters. For more information, please refer to the :new-page:`Nylas API documentation for messages <https://developer.nylas.com/docs/api/v3/ecc/?redirect=api#get-/v3/grants/-grant_id-/messages>`.

   .. code-block:: javascript

      function getOtp() {
      const grantId = "<NYLAS_GRANT_ID>";
      const jwToken = "<NYLAS_API_KEY>";
      const from = "noreply@github.com";
      const subject = "Your GitHub launch code";
      const unread = "true";
      const url = "https://api.us.nylas.com/v3/grants/" + grantId + "/messages?limit=1&unread=" + unread + "from=" + from + "&subject=" + subject;
      var request = new XMLHttpRequest();
      request.open("GET", url, false);
      request.setRequestHeader('Authorization', 'Bearer ' + jwToken)
      request.send();
      if (request.status == 200) {
      return parseOtp(JSON.parse(request.responseText));
      }
      return "ERR";
      }

      function parseOtp(jsonResponse) {
      const firstInbound = jsonResponse. data[0];
      if (firstInbound && firstInbound.snippet) {
      // Extract the number using a regular expression
      const match = firstInbound.snippet.match(/\\b\\d{8}\\b/);
      if (match) {
      return match[0]; // Return the first matched number
      }
      }
      return "NO-OTP";
      }
      return getOtp();

5. Add a step of type :guilabel:`Wait`:, and specify a wait time in milliseconds. This time needs to be long enough for the target to send the OTP code to your email service, and for your JavaScript to process the OTP.

6. Add a step of type :guilabel:`Fill in field`, and set it up as follows:

   1. In :guilabel:Selec`tor, enter the ID of the element on the target page where the user must enter the OTP.

   2. In :guilabel:`Value`, enter the name of the custom varialble your JavaScript stored the OTP in, prefixed with custom. and enclosed in double curly braces. For example, ``{{custom.otp}}``.

  ..  image:: /_images/synthetics/auth-multifactor-email-fillinfield.png
      :width: 70%
      :alt: Screenshot showing the "Fill in field" step. 

7. To verify that the login succeeded, add a step of type :guilabel:`Assert text present`, and set it up as follows:

   1. In :guilabel:`Text`, enter a string that should be visible on the test target page only when login is successful.

   2. (Optional) Set :guilabel:`Wait for up to` to a large enough value, in milliseconds, to ensure that the page loads.

8. Select :guilabel:`Submit`.

To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.


