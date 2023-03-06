.. _global-variables:

*****************************************
Create and use Global Variables 
*****************************************

.. meta::
    :description: Learn about global variables in Splunk Synthetic Monitoring.

Define a global variables once, then you can use the variable across all of your Browser and API tests.


How can you use global variables?
===================================
Global variables are stored securely in the Splunk Synthetic Monitoring platform, but the keys and values of all global variables in your account are visible to all users with Manager or Administrator access. 

To preserve your account's security, don't use production credentials, real credit card information, or other sensitive data in global variables for your checks. Instead, try using placeholder credentials to test workflows that require information to be entered during a test.

To use data such as test login credentials, API keys, or other test information, you can permanently conceal the value of a global variable from all users of your account. 

.. _concealed-gv:

What happens when you conceal a global variable?
==================================================
When you :strong:`conceal` a global variable, its value is permanently concealed from all users of the account. This lets you create and save variables such as test login credentials, API keys, and other sensitive information to use in Browser and API tests. 

To preserve security, the value of a concealed global variable is never revealed to any user of the account after it has been created and saved. The value is scrubbed from the Splunk Synthetic Monitoring UI, from test results, and from alert messages.  

Prerequisites
================
You need administrator access in Splunk Synthetic Monitoring to create and reference global variables. 

Create a global variable
===============================
There are two ways to create a global variable:

#. Add a new global variable in the vault:

    a. From the Splunk Synthetic Monitoring landing page, select :guilabel:`Synthetics configuration`. The :guilabel:`Synthetics configuration` page opens, on the :guilabel:`Global variables` tab.
    b. Select :guilabel:`+ Add` to open the creation dialog box. 

#. Add a new global variable while editing a test: 

   a. In the right-hand :guilabel:`Variables` column, scroll to :guilabel:`Global variables` and select :guilabel:`Add`. 

Once you're in the :guilabel:`Add global variable` dialog box, enter the following:
 
#. In the :guilabel:`env` field, enter the name of the variable. You will use this key to access your variable within a test.
#. In the :guilabel:`value` field, enter the value that will replace the variable when the test is run.
#. (Optional) In the :guilabel:`Description` field, enter a description to explain the purpose of the variable for future reference. A description is particularly helpful when you conceal the variable and cannot reveal its value. 
#. (Optional) Select :guilabel:`Conceal value` to permanently conceal the value to all users. 
#. Once you're satisfied with your global variable, select :guilabel:`Add`. 


Edit a Global Variable
====================================
To edit the key or description of a global variable, visit the global variables page and edit within the field. Select :guilabel:`Save` when you're finished editing.

Editing the value of a saved concealed global variable clears the previous value. You must provide a new value and select :guilabel:`Save` to apply it.
  
.. _gv-test:

Use a global variable in a synthetic test
=================================================
You can use a global variable to fill in fields in the :guilabel:`Steps` and :guilabel:`synthetic transactions` of a Browser test, or in the requests of an API test. Global variables cannot be used in cookies. 

While creating or editing a test, the right-hand :guilabel:`Variables` tab provides list of built-in variables and global variables you can use. Select the name of a variable to copy it to your keyboard. 

.. _ gv-browser-test:

Use a global variable in a Browser test
--------------------------------------------
Follow these steps to add a variable to your Browser test:

#. While creating or editing a transactional Browser test, go to your :guilabel:`Steps`.
#. Under :guilabel:`Action`, select :guilabel:`Fill in field` from the dropdown menu. 
#. Under :guilabel:`Value`, enter the key for the global variable you want to use, use the ``env.`` prefix and enclosed in double curly braces. For example, to reference a global variable with the key dev-username, enter ``{{env.dev-username}}`` in the :guilabel:`Value` field. 
#. Finish editing or creating the test.
#. :guilabel:`Save` your test. 

.. _gv-api-test: 

Use a global variable in an API Test
----------------------------------------

You can also use a global variable to fill in any field in an API test. For instance, you can use a global variable to provide a URL for any request, a header value, or any other value. 

Follow these steps to add a variable to your API test:

#. While creating or editing an API test, go to your :guilabel:`Requests`.
#. In a variable field for any setup, request, or validation step, enter the key for the global variable you want to use, use the ``env.`` prefix and enclosed in double curly braces.  For example, to reference a global variable with the key ``staging-url``, enter ``{{env.staging-url}}`` in the field. 
#. Finish editing or creating the test.
#. :guilabel:`Save` your test. 



