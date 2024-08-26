Span tags
-----------

Use span tags or processes to break down services and inter-service calls along trace characteristics or attributes. To get additional value from a span tag or process, an  administrator can run an action known as indexing, which activates additional analysis of the indexed span tag or process. One benefit of indexing is to get aggregated metrics, called MetricSets, across all spans that contain a specified indexed tag or process.


MetricSets
-----------

MetricSets are metric time series (MTS) you can use to track the performance of specific metrics over time. 

Default tags
-------------

The following tags are automatically indexed during ingestion by default depending on the metric:

       * url name
       * operation
       * HTTP method and status code
       * custom event name
       * browser and version
       * OS name and version
       * city, region, country

