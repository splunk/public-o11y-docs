.. _rum-custom-indexed-tags:

***********************************
Custom indexed tags in Splunk RUM 
***********************************

.. meta::
   :description: words


Define meaningful metadata with custom indexed tags so that you can group by and filter spans according to your interests. For example, if you want to sort spans by metadata according to department or customer tier, create custom span tags for each so that when your spans are ingested by Splunk RUM... 

This table explains the types of span tags in Splunk RUM and the use cases for each. 

.. list-table::
   :widths: 20 20 20
   :header-rows: 1

   * - :strong:`Custom span tags`
     - :strong:`Indexed span tags`
     - :strong:`Custom indexed span tags`
   * - An optional step during instrumentation, you can use global attributes that are key-value pairs, to add custom span tags. See: 

        *  :ref:`rum-global_attributes`
        *  :ref:`browser-rum-identify-users` 

     - Indexing a span tag means that RUM also generates a Troubleshooting MetricSets for each index tag. Then, you can use Tag Spotlight to filter and aggregate Troubleshooting MetricSets by indexed tags. See, :ref:`search-indexed-tags`. The following tags are automatically indexed during ingestion.

       * url name
       * operation
       * HTTP Method and status code
       * custom event name
       * browser and version
       * OS name and version
       * city, region, country
        
     - A custom span tag has the advantages of both global attributes and Troubleshooting MetricSets. This provides the added functionality of aggregating and filtering Troubleshooting MetricSets on this tag in Tag Spotlight view. 



Example 
========================================================



Create a custom indexed span tags 
========================================================

To create Troubleshooting MetricSets for your custom span tags, you need to indicate that you want to index that custom tag. High cardinality tags like userID, or orgID aren't optimal use cases, as indexing these tags generate many Troubleshooting MetricSets. For high cardinality ID based tags full-fidelity session search is a better option. 

Manage custom indexed tags 
========================================================
First, create a custom tag by adding global attributes to your Splunk RUM instrumentation. See, Add user metadata using global attributes. For private preview, you need to file a ticket with support to add custom tags, or to stop indexing custom tags. 
