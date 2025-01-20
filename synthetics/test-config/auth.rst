.. _auth:

******************************************************************
Authentication 
******************************************************************

.. meta::
    :description: Your synthetic test can incorporate any authentication method that Splunk Synthetic Monitoring supports for that test type.

.. toctree::

   auth-basic-html-login
   auth-basic-http-headers
   auth-multifactor-sms
   auth-multifactor-email
   auth-multifactor-sso


The following authentication methods are available for you to configure
in your Synthetics tests:

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Test type`
     - :strong:`Authentication method`
   
   * - Browser
     - :ref:`auth-basic-html-login`
     - :ref:`auth-basic-http-headers` 
     - :ref:`auth-multifactor-sms` 
     - :ref:`auth-multifactor-email` 
     - :ref:`auth-multifactor-sso` 

   * - Uptime
     - None 

   * - API
     - :ref:`auth-basic-http-headers` 


