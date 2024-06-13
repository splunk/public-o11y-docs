.. _apm-onboarding:

****************************************************
Send application and function data to Splunk APM
****************************************************

.. meta:: 
    :description: Configure your applications and serverless functions to send metrics, traces, and logs to Splunk APM. 

.. toctree::
   :hidden:

   apm/instrument-back-end.rst
   apm/instrument-serverless-funcs.rst
   apm/send-custom-data.rst

Configure your applications (such as Java, Python, and Ruby) and serverless functions to send data to Splunk APM. Splunk APM receives traces from your applications, allowing you to dive into your application code and find problems with your services. 

Splunk APM also collects metrics and logs from your applications. 

.. raw:: html

   <h2>Get started</h2>

If you're setting up full-stack observability, follow each part of the guide in order:

* :ref:`instrument-back-end-services-apm`
* :ref:`instrument-serverless-functions-apm`
* :ref:`send-custom-data-apm`

Otherwise, see the following table for which parts you can skip:

.. list-table:: 
    :header-rows: 1

    * - Part
      - Recommended/Optional
      - Notes
    * - :ref:`instrument-back-end-services-apm`
      - Recommended
      - None
    * - :ref:`instrument-serverless-functions-apm`
      - Recommended 
      - None
    * - :ref:`send-custom-data-apm`
      - Optional
      - You must complete parts 1 and 2 before starting this part.