.. _send-custom-metrics:


****************************
Other data ingestion methods
****************************

.. meta::
   :description: Other data ingestion methods for getting your custom metrics to where they can be processed by the application

Splunk Infrastructure Monitoring offers client libraries for many languages
(including Java, Python, Ruby, Go, and node.js) that you can use to send metrics
from your code to the application. For links to these libraries, see
:new-page:`SignalFlow client libraries <https://dev.splunk.com/observability/docs/signalflow/messages/information_messages_specification/#SignalFlow-client-libraries>`.

If you're monitoring Lambda functions, see :ref:`Observability Cloud wrappers for AWS Lambda functions and apps <wrapper-ingest>` for 
instructions on how to send custom metrics to Infrastructure Monitoring.

The application also supports an extensive REST API that enables you to send
data points to Infrastructure Monitoring; see an example of how to do that in a
Bash shell using a `curl` command in :ref:`rest-api-ingest`.

.. toctree::
   :maxdepth: 3
   :hidden:

   rest-APIs-for-datapoints

.. toctree::
   :maxdepth: 3
   :hidden:

   wrappers-AWS-lambda
