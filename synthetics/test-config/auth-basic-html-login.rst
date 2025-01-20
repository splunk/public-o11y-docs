.. _auth-basic-html-login:

******************************************************************
Basic authentication through HTML login forms  
******************************************************************

.. meta::
    :description: Basic authentication allows your tests to send a username and password to a login form on a target test page.


.. :note:: This authentication method applies to browser tests only.

If your test target provides an HTML form for entering username and password, configure your browser test as follows.

..  image:: /_images/synthetics/auth-basic-html-login.png
    :width: 40%
    :alt: Screenshot showing how to set up a synthetic test with basic authentication through an HTML login form. 


1. Create global variables for this test target's username and password. Best practice is to conceal the global variable you create for the password. For more information, see :new-page:`https://docs.splunk.com/observability/en/synthetics/test-config/global-variables.html`.

2. On the browser test's configuration page, click the :guilabel:`Simple` toggle.

3. Click :guilabel:`Edit steps or synthetic transactions`.

4. Add a step of type :guilabel:`Fill in field`, and set it up as follows:

   1. In :guilabel:`Selector`, enter the ID, name, XPath, CSS, link, or JS path of the target page's username field.  For more information on element selectors, see :new-page:`https://developer.chrome.com/docs/devtools/#selector`.

   2. In :guilabel:`Value`, enter the name of the global varialble you stored the username in, prefixed with env. and enclosed in double curly braces. Example: ``{{env.test1_username}}``.

5. Add a step of type :guilabel:`Fill in field`, and set it up as follows:

   1. In :guilabel:`Selector`, enter the ID of the target page's password field.

   2. In :guilabel:`Value`, enter the name of the global varialble you stored the password in, prefixed with env. and enclosed in double curly braces. Example: ``{{env.test1_password}}``.

6. Add a step of type :guilabel:`Click`, and set it up as follows:

   1. In :guilabel:`Selector`, enter the ID of the target page's login button.

   2. (Optional) Set :guilabel:`Wait` for navigation** to the number of milliseconds to wait.

7. To verify that the login succeeded, add a step of type :guilabel:`Assert text present`, and set it up as follows:

   1. In :guilabel:`Text`, enter a string that should be visible on the test target page only when login is successful.

   2. (Optional) Set :guilabel:`Wait for up to` to a large enough value, in milliseconds, to ensure that the page loads.

8. Click :guilabel:`Submit`.

To verify that the login is working, click :guilabel:`Try now`. Results may take a while. The :guilabel:`Try now result` pane should display each screen that your test navigated to on the target page, plus the message :guilabel:`Success`.

..  image:: /_images/synthetics/auth-basic-html-login-try-now.png
    :width: 40%
    :alt: Screenshot showing how to verify that your synthetic test settings are working. 


