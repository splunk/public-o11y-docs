.. _auth:

******************************************************************
Authentication 
******************************************************************

.. meta::
    :description: Your synthetic test can incorporate any authentication method that Splunk Synthetic Monitoring supports for that test type.


The following authentication methods are available for you to configure in your Synthetics tests:

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Test type`
     - :strong:`Authentication method`
   
   * - Browser
     - :ref:`auth-basic-html-login`

       :ref:`auth-basic-http-headers`
       
       :ref:`auth-multifactor-sms`
       
       :ref:`auth-multifactor-email`
       
       :ref:`auth-multifactor-sso`

       :ref:`auth-multifactor-totp` 

   * - Uptime
     - None 

   * - API
     - :ref:`auth-basic-api-request-headers` 



.. _auth-basic-html-login:

Basic authentication through HTML login forms  
==================================================================

.. meta::
    :description: Basic authentication allows your tests to send a username and password to a login form on a target test page.

.. note:: 
   This authentication method applies to browser tests only.


If your test target provides an HTML form for entering username and password, configure your browser test as follows.

..  image:: /_images/synthetics/auth-basic-html-steps.png
    :width: 90%
    :alt: Screenshot showing how to set up a synthetic test with basic authentication through an HTML form. 

#. Create global variables for this test target's username and password. Best practice is to conceal the global variable you create for the password. For more information, see :ref:`global-variables`.

#. On the browser test's configuration page, select the :guilabel:`Simple` toggle.

#. Select :guilabel:`Edit steps or synthetic transactions`.

#. Add a step of type :guilabel:`Fill in field`, and set it up as follows:

   #. In :guilabel:`Selector`, enter the ID, name, XPath, CSS, link, or JS path of the target page's username field.  For more information on element selectors on Chrome, see :new-page:`Chrome DevTools <https://developer.chrome.com/docs/devtools/#selector>`.

   #. In :guilabel:`Value`, enter the name of the global variable you stored the username in, prefixed with env. and enclosed in double curly braces. For example, ``{{env.test1_username}}``.

#. Add a step of type :guilabel:`Fill in field`, and set it up as follows:

   #. In :guilabel:`Selector`, enter the ID of the target page's password field.

   #. In :guilabel:`Value`, enter the name of the global variable you stored the password in, prefixed with env. and enclosed in double curly braces. For example, ``{{env.test1_password}}``.

#. Add a step of type :guilabel:`Click`, and set it up as follows:

   #. In :guilabel:`Selector`, enter the ID of the target page's login button.

   #. (Optional) Set :guilabel:`Wait` for navigation** to the number of milliseconds to wait.

#. To verify that the login succeeded, add a step of type :guilabel:`Assert text present`, and set it up as follows:

   #. In :guilabel:`Text`, enter a string that should be visible on the test target page only when login is successful.

   #. (Optional) Set :guilabel:`Wait for up to` to a large enough value, in milliseconds, to ensure that the page loads.

#. Select :guilabel:`Submit`.

To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.



.. _auth-basic-http-headers:

Basic authentication through HTTP headers  
==================================================================

.. meta::
    :description: Basic authentication allows your tests to send a username and password through HTTP headers.

.. note::
   This authentication method applies to browser tests only.

If your test target expects login credentials to be included in an HTTP header, configure your browser test as follows.


#. Create global variables for this test target's username and password.
   Best practice is to conceal the global variable you create for the password. For more information, see :ref:`global-variables`.

#. On the browser test's configuration page, select the :guilabel:`Advanced` toggle.

#. Scroll down to the :guilabel:`Security` section.

#. On the row for :guilabel:`Authentication`, set values as follows:

   #. In the left field (with hint text :guilabel:`Username`), enter the username for the target page.

   #. In the right field, enter the name of the global variable in which you stored the password for this target page, prefixed with ``env.`` and enclosed in double curly braces. For example, ``{{env.test1_password}}``. To see the list of available global variables, expand the pane on the right.

#. On the browser test's configuration page, select the :guilabel:`Simple` toggle.

#. select :guilabel:`Edit steps or synthetic transactions`.

#. Add a step of type :guilabel:`Go to url`, and in :guilabel:`URL`, enter the URL of the target's authentication page.

#. To verify that the login succeeded, add a step of type :guilabel:`Assert text present`, and set it up as follows:

   #. In :guilabel:`Text`, enter a string that should be visible on the test target page only when login is successful.

   #. (Optional) Set :guilabel:`Wait for up to` to a large enough value, in milliseconds, to ensure that the page loads.

#. select :guilabel:`Submit`.

To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that
your test navigated to on the target page, plus the message :guilabel:`Success`.



.. _auth-basic-api-request-headers:

Basic authentication through API request headers  
==================================================================

.. meta::
    :description: Basic authentication allows your tests to send a username and password through API request headers.

.. note::
   This authentication method applies to API tests only. The steps below are for targets that support “Basic auth”, in other words, API methods like ``curl -G https://api.twilio.com/2010-04-01/Accounts.json -u <YOUR_ACCOUNT_SID>:<YOUR_AUTH_TOKEN>``.  You can modify these steps for targets that support a bearer token.

If your test target expects login credentials to be included in an an API request header, configure your browser test as follows.

..  image:: /_images/synthetics/auth-basic-api-steps.png
    :width: 90%
    :alt: Screenshot showing how to set up a synthetic test with basic authentication through API request headers. 


#. Get the base64-encoded string of the username and password combination for your test target. There are several ways to get a base64-encoded string. For example:

   -  Run the JavaScript function btoa from your browser's console: ``btoa("myusername:mypassword")``

   -  Run this command in a Linux terminal: ``echo -n 'myusername:mypassword' | base64``

#. Store the base64 value in a concealed global variable. For more information, see
   :ref:`global-variables`.

#. On the API test's configuration page, select an existing request in the test or select :guilabel:`Add requests`.

#. Expand the :guilabel:`Request` section, and enter the following information:

   #. In :guilabel:`URL`, enter the test target's URL.

   #. Select :guilabel:`Add request header`.

   #. Select the :guilabel:`Authorization` header, and for its value, enter the word ``Basic`` followed by a space and then the name of the global variable containing your base64-encoded combined username and password. The variable must be prefixed with ``env.`` and enclosed in double curly braces. For example, ``{{env.est1_base64_auth}}``. To see the list of available global variables, expand the pane on the right.

#. Select :guilabel:`Submit`.

To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.


.. _auth-multifactor-sms:

Multifactor authentication through SMS  
==================================================================

.. meta::
    :description: Multifactor authentication allows your test to authenticate to a target page by sending it a code it receives through SMS.

.. note::
    This authentication method applies to browser tests only.

If your test target sends a one time passcode (OTP) through SMS for multifactor authentication, your browser test must retrieve the OTP from the SMS message and enter it into the input field on the target's page. To do this, configure your browser test as follows.


Prerequisites
------------------------------------------------------------------

-  Virtual phone number

     To authenticate through SMS, you must have a virtual phone number that can receive one time passcodes through SMS. Several services offer virtual phone numbers and provide SMS content through an API, such as the :new-page:`Sinch service <http://sinch.com>`. For instructions on receiving messages through this service, see :new-page:`the Sinch API <https://developers.sinch.com/docs/sms/api-reference/sms/tag/Inbounds/#tag/Inbounds/operation/ListInboundMessages>`.

     Certain services, such as Twilio, may block incoming SMS messages containing OTPs. For more information, see Twilio's :new-page:`OTP Message Body Filtered <https://www.twilio.com/docs/api/errors/30038>` documentation.

-  SMS notifications

     To enhance the authorization process, you must have a service that sends SMS notifications, such as :new-page:`GitHub <https://github.com>`.


Limitations
------------------------------------------------------------------

Some services may not be accessible during Synthetics tests due to violations of Content-Security-Policy (CSP). In such instances, a workaround is to implement third-party services on your server and provide an endpoint configured with CSP to allow ``connect-src``.


#. On the browser test's configuration page, select the :guilabel:`Simple` toggle.

#. Select :guilabel:`Edit steps or synthetic transactions`.

#. Add a step of type :guilabel:`Go to url`, and in :guilabel:`URL`, enter the URL of the target's authentication page.

#. Add a step of type :guilabel:`Save return value from JavaScript`, and in the :guilabel:`code` field, paste the following JavaScript. This script retrieves data from a specified URL using ``XMLHttpRequest`` and extracts the OTP from that data. You configure your test to save this OTP in a global variable named ``otp``.

   .. note::
       In the script, set the variable url to the URL of your own virtual phone number's SMS service.

   .. code-block:: javascript

     function getOtp() {
       const url = "https://your-page.example.com/sms";
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

#. Add a step of type :guilabel:`Wait`, and specify a wait time in milliseconds. This time needs to be long enough for the target to send the OTP code to your virtual phone number, and for your JavaScript to process the OTP.

#. Add a step of type :guilabel:`Fill in field`, and set it up as follows:

   #. In :guilabel:`Selector`, enter the ID of the element on the target page where the user must enter the OTP.

   #. In :guilabel:`Value`, enter the name of the custom variable your JavaScript stored the OTP in, prefixed with custom. and enclosed in double curly braces. For example, ``{{custom.otp}}``.

   ..  image:: /_images/synthetics/auth-multifactor-sms-fillinfield.png
       :width: 70%
       :alt: Screenshot showing the "Fill in field" step. 

#. To verify that the login succeeded, add a step of type :guilabel:`Assert text present`, and set it up as follows:

   #. In :guilabel:`Text`, enter a string that should be visible on the test target page only when login is successful.

   #. (Optional) Set :guilabel:`Wait for up to` to a large enough value, in milliseconds, to ensure that the page loads.

#. Select :guilabel:`Submit`.

To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.



.. _auth-multifactor-email:

Multifactor authentication through email  
==================================================================

.. meta::
    :description: Multifactor authentication allows your test to authenticate to a target page by sending it a code it receives through email.

.. note::
    This authentication method applies to browser tests only.

If your test target sends a one-time passcode (OTP) through email for multifactor authentication, your browser test must retrieve the OTP from the email message and enter it into the input field on the target's page. To do this, configure your browser test as follows.


Prerequisites
------------------------------------------------------------------

You must have an email service that supports connecting to your email account and managing your emails through an API. The steps below feature an example using the :new-page:`Nylas service <http://nylas.com>`. For detailed information on how to retrieve messages from this service, refer to its :new-page:`API documentation <https://developer.nylas.com/docs/api/v3/ecc/?redirect=api#get-/v3/grants/-grant_id-/messages>`.

Additionally, the steps below demonstrate the use of :new-page:`GitHub <http://github.com>` to send an authorization email, which is essential for extracting the OTP from it.

Limitations
------------------------------------------------------------------

Your email service must be accessible through an API. Some services may not be accessible during Synthetics tests due to violations of Content-Security-Policy (CSP). In such instances, a workaround is to implement third-party services on your server and provide an endpoint configured with CSP to allow connect-src.

#. On the browser test's configuration page, select the :guilabel:`Simple` toggle.

#. Select :guilabel:`Edit steps or synthetic transactions`.

#. Add a step of type :guilabel:`Go to url`, and in :guilabel:`URL`, enter the URL of the target's authentication page.

#. Add a step of type :guilabel:`Save return value from JavaScript`, and in the :guilabel:`code` field, paste the following JavaScript. This script retrieves data from a specified URL using ``XMLHttpRequest`` and extracts the OTP from that data. You configure your test to save this OTP in a custom variable named ``otp``. 

   .. note::
      In the script, set the variable url to the URL of your own email inbox API endpoint.

   .. note::
      If you are utilizing the Nylas service, you can locate unread emails by searching for specific text in the subject line or other parameters. For more information, please refer to the :new-page:`Nylas API documentation for messages <https://developer.nylas.com/docs/api/v3/ecc/?redirect=api#get-/v3/grants/-grant_id-/messages>`.

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

#. Add a step of type :guilabel:`Wait`, and specify a wait time in milliseconds. This time needs to be long enough for the target to send the OTP code to your email service, and for your JavaScript to process the OTP.

#. Add a step of type :guilabel:`Fill in field`, and set it up as follows:

   #. In :guilabel:Selec`tor, enter the ID of the element on the target page where the user must enter the OTP.

   #. In :guilabel:`Value`, enter the name of the custom variable your JavaScript stored the OTP in, prefixed with custom. and enclosed in double curly braces. For example, ``{{custom.otp}}``.

     .. image:: /_images/synthetics/auth-multifactor-email-fillinfield.png
          :width: 70%
          :alt: Screenshot showing the "Fill in field" step. 

#. To verify that the login succeeded, add a step of type :guilabel:`Assert text present`, and set it up as follows:

   #. In :guilabel:`Text`, enter a string that should be visible on the test target page only when login is successful.

   #. (Optional) Set :guilabel:`Wait for up to` to a large enough value, in milliseconds, to ensure that the page loads.

#. Select :guilabel:`Submit`.

To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.



.. _auth-multifactor-sso:

Multifactor authentication through SSO and Active Directory  
==================================================================

.. meta::
    :description: Multifactor authentication allows your test to authenticate to a target page by logging in through an SSO or Active Directory service.


Authentication through Single Sign-On (SSO) is similar to :ref:`basic authentication <auth-basic-html-login>`. To create a test that uses SSO or Active Directory (AD), you must configure a series of steps that include opening the webpage, selecting the SSO authentication link, and entering the required information for SSO authentication. Additional webpages may load during this process, so it's crucial that you include steps to confirm that all of the components of each webpage have fully loaded before proceeding.

SSO authentication frequently involves additional authentication factors. If the identity provider (such as Google, Microsoft, Okta, Duo, and so on) does not mandate an extra login factor, your test might only need the authentication steps that are illustrated in the example below:

..  image:: /_images/synthetics/auth-multifactor-sso-sample.png
    :width: 90%
    :alt: Screenshot showing steps to create in a synthetic test that authenicates with SSO or Active Directory. 


Limitations
------------------------------------------------------------------

Identity providers often require various additional factors for login, such as verification via email, SMS, or TOTP. In such cases, it is essential to modify or add steps to accommodate these additional login factors.



.. _auth-multifactor-totp:

Multifactor authentication through TOTP  
==================================================================

.. note::
    This authentication method applies to browser tests only.


If your test needs to send a time-based one-time passcode (TOTP) to its test target, configure your test as follows.


Get the secret key for generating a TOTP
------------------------------------------------------------------

The secret key is a shared value which both your test target and your test's authenticator app (such as Okta) will use to generate the same unique TOTP. You can get this secret key from:

* The test target's QR code (an image).

* The plain-text secret key, which is visible as an embedded string in the test target's QR code when you view the QR code as a URL string.  For example, if the QR code is ``otpauth://totp/Slack:<username>@<somedomain>?secret=<long-string>&issuer=<app-name>&algorithm=SHA1&digits=6&period=30``, the secret key is ``<long-string>``.


Save the secret key in a global variable of type TOTP
------------------------------------------------------------------

There are two ways to create a global variable:

* From the Splunk Synthetic Monitoring landing page:

  #. From the Splunk Synthetic Monitoring landing page, select the settings icon, and then select :guilabel:`Global variables`. 
  #. Select :guilabel:`Create variable`.

* From an existing test's page:

  #. Select :guilabel:`Edit test`.
  #. Expand the :guilabel:`Variables` panel on the right, scroll to :guilabel:`Global variables` and select :guilabel:`Add`.


In the :guilabel:`Add variable` dialog box, enter the following:

..  image:: /_images/synthetics/auth-multifactor-totp-add-variable.png
    :width: 40%
    :alt: Screenshot showing how to create a global variable. 


#. In the :guilabel:`Variable` type pull-down menu, select :guilabel:`TOTP`.
#. In the :guilabel:`Variable name` field, enter the name of the variable. You will use this name to access your variable within a test.
#. Save the secret key either by:

   * Selecting the :guilabel:`QR code` tab and dragging the QR code image to it.
   * Selecting the :guilabel:`Manual input` tab and pasting the ``<long-string>`` you retrieved from the QR code.

#. (Optional) In the :guilabel:`Description` field, enter a description to explain the purpose of the variable for future reference. A description is particularly helpful when you conceal the variable and cannot reveal its value.
#. (Optional) Expand :guilabel:`Advanced Settings` and specify optional settings:

   * (Optional) Set :guilabel:`digits` to the number of digits in the generated TOTP. Valid values: 4-8. Default: 6.
   * (Optional) Set :guilabel:`TOTP expiration` to the the duration of the validity of the TOTP, in seconds. Valid values: 10s-90s. Default: 30s.

#. (Optional) To validate the secret key you entered, select :guilabel:`Generate TOTP`.
#. Select :guilabel:`Add`.


.. note::
   Splunk Synthetic Monitoring automatically conceals the value of variables of type TOTP.


Set up a browser test that uses a TOTP
------------------------------------------------------------------

#. On the browser test's configuration page, select the :guilabel:`Simple` toggle.
#. Select :guilabel:`Edit steps or synthetic transactions`.
#. Add a step of type :guilabel:`Fill in field`, and in :guilabel:`Value`, scroll down to the :guilabel:`TOTP` section (or type ``totp`` into the search field) and select the name of the TOTP variable you created. You can also enter this variable name directly as ``{{totp.<variable-name>}}``. 

   .. image:: /_images/synthetics/auth-multifactor-totp-fillinfield.png
      :width: 70%
      :alt: Screenshot showing the "Fill in field" step. 
   

#. To verify that the login succeeded, add a step of type :guilabel:`Assert text present`, and set it up as follows:

   #. In :guilabel:`Text`, enter a string that should be visible on the test target page only when login is successful.
   #. (Optional) Set :guilabel:`Wait for up to` to a large enough value, in milliseconds, to ensure that the page loads.

#. Select :guilabel:`Submit`.


To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.

     .. image:: /_images/synthetics/auth-multifactor-totp-trynow.png
          :width: 70%
          :alt: Screenshot showing the "Try now" step. 

