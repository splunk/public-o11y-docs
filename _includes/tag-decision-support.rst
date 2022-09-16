.. admonition:: Deciding where to add a span tag    

   When you add span tags to spans via application instrumentation, you have the most control at the per-application level. The tradeoff is that it can be more time-consuming to add an attribute via instrumentation for each of your applications. 

   Adding span tags in a downstream OpenTelemetry Collector can save time, at the cost of granularity. If a tag is applicable to 100% of the data received by the OpenTelemetry Collector in which you are adding it, adding the tag in your OpenTelemetry Collector config file is fastest. But if you need to apply logic to differentiate the spans that receive a tag via the OpenTelemetry Collector, it is likely faster to add the tags at the application level via instrumentation. 

   For instance, if multiple applications exist on the same host in a K8s deployment, but in different environments (for instance, ``production``, ``development``, and ``staging``), setting the ``deployment.environment`` tag using the instrumentation library allows you to differentiate environments among spans from the same host. 