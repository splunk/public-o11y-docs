
.. _rum-custom-indexed-tags:

**********************************************************************
Filter and troubleshoot with custom tags 
**********************************************************************


.. meta::
   :description: words


Create custom tags to improve filtering and troubleshooting capabilities in Tag Spotlight. First, create a custom span tag, then index it by adding a MetricSet to the span tag. Adding a MetricSet to a span tag gives you all of the features associated with indexed span tags.

Key concepts
==================
How span tags, indexed span tags, and MetricSets relate to each other. 

.. include:: /_includes/synthetics/metricset-def.rst

Example: track custom processes 
=================================

Adding your own tags that are meaningful to your organization like custom tags, helps you refine results and glean insights most pertinent to you. Custom span tags are especially useful for tracking processes that are unique to your organization. 

Here are some examples of what you could use as span tags:

* customer support tier or loyalty level
* department
* internal geo locations for facilities
* branch locations

 ..
   "How can I add my own tags to Tag Spotlight?", "How can I filter on custom tags?" "How can I troubleshoot with custom tags?



Add custom tags to Tag Spotlight
========================================================

You need to be an admin to do this task. Follow these steps to add custom tags to Tag Spotlight: 

1. Add a span tag following these steps: :ref:`create-a-span-rum`.

2. There are two ways to navigate to the MetricSets configuration page. Choose either one: 

   * In Splunk RUM, select :strong:`RUM MetricSet` from the MetricSets configuration page as seen in the screenshot below. 

      .. image:: /_images/rum/rum-metricset.png
            :width: 20%
            :alt: Settings panel for adding metric sets. 

   * From the left-nav, select :strong:`Settings`, then :strong:`MetricSets` then the :strong:`RUM` tab. 


      .. image:: /_images/rum/metric-set-left-nav.png
            :width: 20%
            :alt: Settings panel for adding metric sets. 

3. Choose the tag you want to index to trigger the cardinality analyzer. If the cardinality check passes, select :strong:`Add MetricSet` and confirm with the check mark. 


Troubleshooting
================

If the cardinality analysis fails, then you might have exceeded your entitlements. 

Avoid high cardinality in MetricSets
--------------------------------------
Choose tags with a reasonable amount of cardinality. Tags like userID, or sessionID have high cardinality because there is a unique value for users in your organization and visitors to your application. Creating a troubleshooting MetricSet for each userID is not optimal for performance. For high-cardinality, ID-based tags, full-fidelity session search is a better option, see :ref:`rum-tag-search`.

High cardinality MetricSets can also affect your org limits :ref:`rum-limits`. Limits are determined by your subscription: enterprise and standard. For more information on each type of subscription, see :new-page:`Splunk RUM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-rum>`.
