.. _auth-basic-http-headers:

******************************************************************
Basic authentication through HTTP headers  
******************************************************************

.. meta::
    :description: PLACEHOLDER.


.. :note:: This authentication method applies to browser tests only.

If your test target expects login credentials to be included in an HTTP header, configure your browser test as follows.

|image3|

1. Create global variables for this test target's username and password.
   Best practice is to conceal the global variable you create for the password. For more information, see :new-page:`https://docs.splunk.com/observability/en/synthetics/test-config/global-variables.html`.

2. On the browser test's configuration page, click the :guilabel:`Advanced` toggle.

3. Scroll down to the **Security** section.

4. On the row for **Authentication**, set values as follows:

   1. In the left field (it might have the hint text **Username**),
      enter username for the target page.

   2. In the right field, enter the name of the global varialble in
      which you stored the password for this target page, prefixed with
      env. and enclosed in double curly braces. Example:
      {{env.test1_password}}. To see the list of available global
      variables, expand the pane on the right.

5. On the browser test's configuration page, click the **Simple**
   toggle.

6. Click **Edit steps or synthetic transactions**.

7. Add a step of type **Go to url**, and in **URL**, enter the URL of
   the target's authentication page.

8. To verify that the login succeeded, add a step of type **Assert text
   present**, and set it up as follows:

   1. In **Text**, enter a string that should be visible on the test
      target page only when login is successful.

   2. (Optional) Set **Wait for up to** to a large enough value, in
      milliseconds, to ensure that the page loads.

..

   |image4|

9. Click **Submit**.

To verify that the login is working, click **Try now**. Results may take
a while. The **Try now result** pane should display each screen that
your test navigated to on the target page, plus the message **Success**.

|image5|


