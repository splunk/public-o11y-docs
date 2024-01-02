.. _rum-custom-indexed-tags:

***********************************
Custom indexed tags in Splunk RUM 
***********************************

description 

.. meta::
   :description: words


This table shows the differences among the types of span tags in Splunk RUM. 

.. list-table::
   :widths: 20 20 20
   :header-rows: 1

   * - :strong:`Custom span tags`
     - :strong:`Indexed span tags`
     - :strong:`Custom indexed span tags`
   * - Created using global attributes in Splunk RUM instrumentation. 
     - RUM Troubleshooting MetricSets are generated for indexed tags, so that you can filter and aggregate Troubleshooting MetricSets by indexed tags on Tag Spotlight. There are a number of tags that are indexed by default, such as the ``sf_ua_browserversion`` tag. Indexing a span tag generates Troubleshooting MetricSets for that tag.
     - A custom span tag that you indicate is a tag for which you would like to generate Troubleshooting MetricSets. This provides the added functionality of aggregating and filtering Troubleshooting MetricSets on this tag in Tag Spotlight view.
   * - words 
     - words
     - words 



Examples and guidance on custom indexed span tags  
========================================================

Custom tags provide the flexibility of adding whatever metadata you're interested in to spans you send to Splunk RUM. For example, if you want to send metadata by department, or customer tier you can create custom span tags for each.

To create Troubleshooting MetricSets for your custom span tags, you need to indicate that you want to index that custom tag. High cardinality tags like userID, or orgID aren't optimal use cases, as indexing these tags generate many Troubleshooting MetricSets. For high cardinality ID based tags full-fidelity session search is a better option. 

Manage custom indexed tags 
========================================================
First, create a custom tag by adding global attributes to your Splunk RUM instrumentation. See, Add user metadata using global attributes. For private preview, you need to file a ticket with support to add custom tags, or to stop indexing custom tags. 
