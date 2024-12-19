.. _global-variables:

*****************************************
Create and use global variables 
*****************************************

.. meta::
    :description: Define a variable that you can use in multiple browser and API tests in Splunk Synthetic Monitoring.

Define a global variable once, and then use it across all of your browser and API tests.


How can you use a global variable?
===================================
Use global variables to store non-sensitive information for your browser and API tests. Splunk Synthetic Monitoring saves your global variables, but note that their values are visible to all users in your account. 

To preserve your account's security, don't use global variables to store sensitive information such as login credentials, API keys, or credit card information. 

.. _concealed-gv:

What happens when you conceal a global variable?
==================================================
When you conceal a global variable, Splunk Synthetic Monitoring encrypts the variable's value in its database and scrubs its value from the Splunk Synthetic Monitoring UI, from test results, and from alert messages. However, concealed global variables were not designed to safeguard sensitive information or critical data; do not misuse them for such purposes.


Create a global variable
===============================
There are two ways to create a global variable:

* Add a new global variable in the vault:

    #. From the Splunk Synthetic Monitoring landing page, select :guilabel:`Synthetics configuration`. The :guilabel:`Synthetics configuration` page opens, on the :guilabel:`Global variables` tab.
    #. Select :guilabel:`+ Add` to open the creation dialog box. 

* Add a new global variable while editing a test: 

   In the right-hand :guilabel:`Variables` column, scroll to :guilabel:`Global variables` and select :guilabel:`Add`. 

When you're in the :guilabel:`Add global variable` dialog box, enter the following:
 
#. In the :guilabel:`env` field, enter the name of the variable. You will use this key to access your variable within a test.
#. In the :guilabel:`value` field, enter the value that will replace the variable when the test is run.
#. (Optional) In the :guilabel:`Description` field, enter a description to explain the purpose of the variable for future reference. A description is particularly helpful when you conceal the variable and cannot reveal its value. 
#. (Optional) Select :guilabel:`Conceal value`. 
#. Select :guilabel:`Add`. 


Edit a global variable
====================================
To edit the key or description of a global variable, visit the :guilabel:`Global variables` page and edit within the field. Select :guilabel:`Save` when you're finished editing.

Editing the value of a saved concealed global variable clears the previous value. You must provide a new value and select :guilabel:`Save` to apply it.
  
.. _gv-test:

Use a global variable in a synthetic test
=================================================
You can use a global variable to fill in fields in the :guilabel:`Steps` and :guilabel:`synthetic transactions` of a browser test, or in the requests of an API test. Global variables cannot be used in cookies. 

While creating or editing a test, the right-hand :guilabel:`Variables` tab provides list of built-in variables and global variables you can use. Select the name of a variable to copy it to your keyboard. 

.. _ gv-browser-test:

Use a global variable in a browser test
--------------------------------------------
Follow these steps to add a variable to your browser test:

#. While creating or editing a transactional browser test, go to your :guilabel:`Steps`.
#. Under :guilabel:`Action`, select :guilabel:`Fill in field` from the dropdown menu. 
#. Under :guilabel:`Value`, enter the key for the global variable you want to use, prefixed with ``env.`` and enclosed in double curly braces. For example, to use a global variable with the key ``dev-username``, enter ``{{env.dev-username}}`` in the :guilabel:`Value` field. 
#. Finish editing or creating the test.
#. :guilabel:`Save` your test. 

.. _gv-api-test: 

Use a global variable in an API Test
----------------------------------------

You can also use a global variable to fill in any field in an API test. For instance, you can use a global variable to provide a URL for any request, a header value, or any other value. 

Follow these steps to add a variable to your API test:

#. While creating or editing an API test, go to your :guilabel:`Requests`.
#. In a variable field for any setup, request, or validation step, enter the key for the global variable you want to use, prefixed with ``env.`` and enclosed in double curly braces.  For example, to use a global variable with the key ``staging-url``, enter ``{{env.staging-url}}`` in the field. 
#. Finish editing or creating the test.
#. :guilabel:`Save` your test. 



