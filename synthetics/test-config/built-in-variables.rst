.. _built-in-variables:

***********************************
Built-in variables to use in tests
***********************************

.. meta::
    :description: Learn about preset variables in Splunk Synthetic Monitoring.

Splunk Synthetic Monitoring provides built-in variables for use in your synthetic tests. Use the variable name to reference a variable in a test during setup. 

Random variables
==================
Splunk Synthetic Monitoring provides the following set of random variables you can use in your tests: 

.. list-table::
   :header-rows: 1
   :widths: 25 45 30

   * - :strong:`Variable`
     - :strong:`Description`
     - :strong:`Example`

   * - ``random.hex``
     - A random string of hexadecimal digits
     - ``fc7eaf12b54eb220ac1758c657518dee``

   * - ``random.integer``
     -  A random 10-digit integer
     - ``463500376``

Date-and-time variables
===========================

Splunk Synthetic Monitoring provides the following set of date and time variables you can use in your tests: 

.. list-table::
   :header-rows: 1
   :widths: 25 45 30 

   * - :strong:`Variable`
     - :strong:`Description`
     - :strong:`Example`

   * - ``date.today``
     - Today's date, in ``YYYY-MM-DD`` format
     - ``2022-04-22``

   * - ``date.year``
     -  The current year
     - ``2022``

   * - ``date.month``
     -  The current month, in ``MM`` format
     - ``03``

   * - ``date.day``
     -  The current day of the month, in ``DD`` format
     - ``07``
    
   * - ``time.now``
     -  The current time, in ``YYYY-MM-DD HH:SS:MM -XXXX`` format
     - ``2022-04-22 13:46:02 -0400``

Location variables
===========================
Splunk Synthetic Monitoring provides the following set of location variables you can use in your tests: 

.. list-table::
   :header-rows: 1
   :widths: 25 45 30

   * - :strong:`Variable`
     - :strong:`Description`
     - :strong:`Example`

   * - ``location.region``
     - The region of the current location
     - ``us-east-1``

   * - ``location.public.ip``
     -  The public IP address of the current location
     - ``54.208.109.193``

   * - ``location.name``
     -  The name of the current location
     - ``N. Virginia``

   * - ``location.name_as_param``
     -  The name of the current location, formatted as a parameter
     - ``N.-Virginia``
    
   * - ``location.latitude``
     - The latitude value of the current location
     - ``39.0437``

   * - ``location.longitude``
     - The longitude value of the current location
     - ``-77.4875``

   * - ``location.geolocation``
     - The coordinates of the current location
     - ``{"coords":
       {"latitude":"39.0437",
       "longitude":"-77.4875"}}``


Request variables for API Tests 
========================================
Splunk Synthetic Monitoring provides the following set of request variables you can use in your API Tests: 

.. list-table:: 
   :header-rows: 1

   * - :strong:`Variable`
     - :strong:`Description`
     - :strong:`Example`

   * - ``response.body``
     - The JSON response body 
     - ``{"check_id":48243,...}``

   * - ``response.body_size``
     - The size of the JSON response body, in megabytes
     - ``20 MB``

   * - ``response.code``
     - The HTTP response code of the API Test
     - ``200``
     
   * - ``response.response_time``
     - Response time of the request, in milliseconds
     - ``32 ms``

   * - ``response.dns_time``
     - DNS time of the request, in milliseconds
     - ``145 ms``

   * - ``response.first_byte_time``
     - Time to first byte of the request, in milliseconds
     - ``4 ms`` 

Use a variable in a test
===========================
While creating or editing a test, the right-hand :guilabel:`Variables` tab shows a list of built-in variables and existing global variables you can use. Select the name of a variable to copy it to your keyboard and paste it in the field of your choice.
