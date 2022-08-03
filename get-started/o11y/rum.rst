.. _get-started-rum:

************************
Monitor user experiences
************************

.. meta::
   :description: Get started monitoring use experiences with Splunk Observability Cloud.

With Splunk Real User Monitoring, you can gain insight about the performance and health of the front-end user experience of your application. Splunk RUM collects performance metrics, web vitals, errors, and other forms of data to enable you to detect and troubleshoot problems in your application. For a complete view of your application from browser to back-end, integrate with Splunk APM.  

=============================
Get started with Splunk RUM
=============================
For instructions on how to instrument and configure Splunk RUM to monitor your application, see :ref:`Instrument and configure Splunk RUM to monitor your application <rum-rum-org>`.


=============================
Integrate with Splunk APM 
=============================
If you want to monitor your application from browser to back-end, then integrate Splunk RUM with Splunk APM. When you integrate Splunk RUM with Splunk APM, you start sending server timing metrics to Splunk RUM 
along with the back-end trace ID that was generated. Splunk RUM uses the server-timing header response times to associate the Splunk RUM Span with the corresponding Splunk APM Trace. 
For more information on Splunk APM, see :ref:`Monitor applications with Splunk APM <get-started-apm>`. 
