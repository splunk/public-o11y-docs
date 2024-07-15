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
Suppose you want to troubleshoot and filter by department or customer support tier. First, ... 

For example, if you want to sort spans by metadata according to department or customer tier, create custom span tags for each so that when your spans are ingested by Splunk RUM... 

internal geolocation 
want to know if it's all of our facilities or just one

Add custom tags to Tag Spotlight
========================================================

Follow these steps to add custom tags to Tag Spotlight.

.. https://docs.splunk.com/observability/en/gdi/get-data-in/rum/browser/manual-rum-browser-instrumentation.html#create-a-span
1. Add a span tag following these steps: :ref:`apm-add-context-trace-span`.

2. In Splunk RUM, select :bold:`RUM MetricSet`. 

.. image:: /_images/rum/rum-metricset.png
      :width: 90%
      :alt: Diagram showing the back and forth flow of an IdP-initiated authentication request


3. Select Add MetricSet. 


Prevent high cardinality in MetricSets
--------------------------------------
Choose tags with a reasonable amount of cardinality. Tags like userID, or orgID are inefficient choices because there could be a huge number of users in your organization and creating a troubleshooting MetricSet for each userID is not optimal for performance. For high cardinality ID based tags full-fidelity session search is a better option. High cardinality MetricSets can also affect your org limits :ref:`rum-limits`. Limits are determined by your subscription: enterprise and standard. For more information on each type of subscription, see :new-page:`Splunk RUM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-rum>`.

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

