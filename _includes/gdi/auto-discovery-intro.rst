The Splunk Distribution of the OpenTelemetry Collector can automatically identify data sources and collect metrics and traces to send them to Splunk Observability Cloud. With automatic discovery and zero-code instrumentation you don't need to manually configure the Splunk Distribution of the OpenTelemetry Collector or your applications before deploying them: 

* Automatic discovery detects and collects signal data from third-party services, such as databases and web servers. Through auto discovery the Collector automatically generates a configuration snipet that you can modify and incorporate into your existing configuration to retrieve your services' data. 

* With automatic discovery you can also enable zero-code instrumentation, which allows the Collector to retrieve data from application language runtimes without having to modify the source application code or adding any new installation or configuration steps. With this option you won't have to install and configure your instrumentation agents separately. 

.. caution:: 

   Auto discovery of services is only available for the Collector in Linux and Kubernetes environments.

   Zero-code instrumentation using the Collector's automatic discovery feature is only available for Java, Node.js, and .NET applications. If deployed independently from the Collector, zero-code instrumentation is supported for 8 back-end language runtimes. For more information, see :ref:`get-started-application`.