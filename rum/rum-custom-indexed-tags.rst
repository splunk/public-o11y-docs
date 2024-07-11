.. _rum-custom-indexed-tags:

**********************************************************************
Filter and troubleshoot with custom tags 
**********************************************************************


.. meta::
   :description: words


Create custom tags to improve filtering and troubleshooting capabilities in Tag Spotlight. First, create a custom span tag, then index it by adding a MetricSet to the span tag. Adding a MetricSet to the span tags lets you use all of the features associated with indexed span tags. See, :ref:`apm-index-span-tags`. Adding your own tags that are meaningful to your organization like custom tags, helps you refine results and glean insights most pertinent to you. 



 ..
   "How can I add my own tags to Tag Spotlight?", "How can I filter on custom tags?" "How can I troubleshoot with custom tags?

Example 
========================================================

For example, if you want to sort spans by metadata according to department or customer tier, create custom span tags for each so that when your spans are ingested by Splunk RUM... 



Add custom indexed tags 
========================================================

Create a custom tag by adding global attributes to your Splunk RUM instrumentation. See,... Add user metadata using global attributes...


Prevent high cardinality 
--------------------------------------
Choose tags with a reasonable amount of cardinality. Tags like userID, or orgID are inefficient choices because there could be a huge number of users in your organization and creating a troubleshooting MetricSet for each userID is not optimal for performance. For high cardinality ID based tags full-fidelity session search is a better option. 

The following tags are automatically indexed during ingestion by default:

       * url name
       * operation
       * HTTP Method and status code
       * custom event name
       * browser and version
       * OS name and version
       * city, region, country



Delete custom indexed tags 
==============================