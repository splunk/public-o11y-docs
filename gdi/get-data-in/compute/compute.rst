.. _get-started-compute:

***************************************
Collect infrastructure metrics and logs
***************************************

.. meta::
   :description: Start sending infrastructure metrics and logs to Splunk Observability Cloud.

..	toctree::
   :hidden:

   k8s
   linux
   windows

Deploy the Splunk Distribution of the OpenTelemetry Collector on your infrastructure to start sending data to Splunk Observability Cloud. For an overview of the Collector, see :ref:`otel-intro`.

See the following topics to set up the Collector on each of these hosts:

- :ref:`get-started-k8s`
- :ref:`get-started-linux`
- :ref:`get-started-windows`

.. raw:: html

   <embed>
      <h2>Send infrastructure data to Splunk Observability Cloud<a name="compute-data" class="headerlink" href="#compute-data" title="Permalink to this headline">¶</a></h2>
   </embed>

Use the Collector to send your infrastructure metrics and logs to Splunk Observability Cloud: 

* To send custom metrics, see :ref:`send-custom-metrics`. 

* To send logs, see :ref:`otel-understand-use`.

  * For Kubernetes, native OpenTelemetry log collection is supported by default. 

  * For Linux and Windows environments, use the Universal Forwarder to send logs to the Splunk platform. 

.. note:: To learn more about the data model of Splunk Observability Cloud, see :ref:`data-model`. 


