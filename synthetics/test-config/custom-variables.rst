.. _custom-variables:

*********************************************************************
Custom variables 
*********************************************************************

.. meta::
    :description: Define a custom variable that you can use in an individual synthetic test.


Custom variables are variables you can set and use within a single test. Whereas global variables are static and stored in the env namespace, custom variables are dynamic and are stored in the custom namespace.  You can use them to store and retrieve dynamic values in your browser and API tests. You can't use custom variables in uptime (HTTP or port) tests.


How to create a custom variable
=====================================================================

You can create a custom variable and assign a value to it in a browser test or API test.  For example, in a browser test, you can add a :guilabel:`Save return value from Javascript` step and specify a name for the variable in the :guilabel:`Variable` field. Variable names must be unique within an individual test.

How to use a custom variable
=====================================================================

You can use a custom variable in a browser test or API test. Always reference a custom variable as ``{{custom.your-variable-name}}``. For example, in a browser test:

* Add a :guilabel:`Go to URL` step and specify the variable name in the :guilabel:`URL` field. 

* Add a :guilabel:`Fill in field` step and specifiy the variable name in the :guilabel:`Value` field.


You can only reference custom variables after you've defined them in an earlier step.


See also
=====================================================================

* :ref:`built-in-variables`
* :ref:`global-variables`

