.. _auth-basic-api-request-headers:

******************************************************************
Basic authentication through API request headers  
******************************************************************

.. meta::
    :description: Basic authentication allows your tests to send a username and password through API request headers.


.. :note:: This authentication method applies to API tests only. The steps below are for targets that support “Basic auth”, in other words, API methods like ``curl -G https://api.twilio.com/2010-04-01/Accounts.json -u <YOUR_ACCOUNT_SID>:<YOUR_AUTH_TOKEN>``.  
    You can modify these steps for targets that support a Bearer token.

If your test target expects login credentials to be included in an an API request header, configure your browser test as follows.

..  image:: /_images/synthetics/auth-basic-api-steps.png
    :width: 90%
    :alt: Screenshot showing how to set up a synthetic test with basic authentication through API request headers. 


1. Get the *base64-encoded string* of the username and password
     combination for your test target. There are several ways to get a base64-encoded string. For example:

   -  Run the JavaScript function btoa from your browser's console: ``btoa("myusername:mypassword")``

   -  Run this command in a Linux terminal: ``echo -n 'myusername:mypassword' | base64``

2. Store the base64 value in a concealed global variable. For more information, see
   :ref:`global-variables`.

3. On the API test's configuration page, select an existing request in
   the test or select :guilabel:`Add requests`.

4. Expand the :guilabel:`Request` section, and enter the following information:

   1. In :guilabel:`URL`, enter the test target's URL.

   2. Select :guilabel:`Add request header`.

   3. Select the Authorization header, and for its value, enter the word ``Basic`` followed by a space and then the name of the global variable containing your base64-encoded combined username and password. The variable must be prefixed with ``env.`` and enclosed in double curly braces. For example, ``{{env.est1_base64_auth}}``. To see the list of available global variables, expand the pane on the right.

5. Select :guilabel:`Submit`.

To verify that the login is working, select :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.


