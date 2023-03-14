.. _troubleshoot-mms:

**********************************************************************
Troubleshoot cardinality in Monitoring MetricSets 
**********************************************************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn how to troubleshoot cardinality using Monitoring MetricSets.

Follow these steps to troubleshoot high cardinality issues and Monitoring MetricSet configurations. 


You’ve reached your subscription limit or you’re unable to create new Monitoring MetricSets
=========================================================================================================

Cause: Your cardinality is too high
------------------------------------
If the cardinality of your Monitoring MetricSets is high, you might reach your subscription limits and be unable to create new Monitoring MetricSets.

.. _reduce-cardinality: 

Solution: Configure your MMS to be more efficient 
------------------------------------------------------------------------


If you have high cardinality metrics that exceed the system limit or subscription quota for your contract, try these methods to reduce cardinality for your metric set: 

* Turn off an endpoint MetricSet by choosing Service MMS only.
* Add a :strong:`filter by tag` value to reduce the number of results.
* Remove or filter down existing Monitoring MetricSets. The cardinality check in APM estimates your total cardinality of existing MMS in addition to your proposed changes.  
* MetricSets with zero cardinality are not considered valid. If you have zero cardinality, verify that your configuration details are correct, or try again after you are ingesting the relevant tracing data. 
* try adding filters and running it again if the Monitoring MetricSet timed out.
* Provide a list of tag values, or a regular expression in the MMS. 

For more information on troubleshooting high and low cardinality, see :ref:`Guidelines for working with low and high cardinality data<guideline-cardinality>`. 



Solution: Check that your Monitoring MetricSet is set up correctly 
------------------------------------------------------------------------
After you set up your Monitoring MetricSet, go to the APM Troubleshooting MetricSet Configuration page to make sure that the status is active. After your MMS is active, you will start seeing metrics as soon as matching traces arrive.

See also:

 * See :ref:`Status of configured  MetricSets<tms-status>` for when and why you might want to pause, or stop, your MetricSet.
 * See :ref:`Manage existing Monitoring MetricSets<manage-TMS>` for how to edit existing MMS. 


Solution: Make sure you chose the right service or endpoint-level MetricSets
------------------------------------------------------------------------------------------------------------------

The following table outlines the difference between endpoint and service level MetricSets. 

.. list-table::
      :header-rows: 1
      :widths: 50 50

      * - :strong:`Endpoint-level MetricSet`
        - :strong:`Service-level MetricSet`
    
      * - * If you already know which endpoints you're interested in, start with an endpoint level MetricSet to help reduce the cardinality of your MetricSet
          * To choose a subset of endpoints, you can add a list or write a regular expression pattern to match the endpoints you want to track 
        - * If you are interested in metrics about the overall health of you service, start with a a service level MetricSet 
          * The Monitoring MetricSets at the service level are an aggregation of the metric sets at the endpoint-level
          * If you don’t specify any filters, then the tag is added to all of the endpoints for the Monitoring MetricSet for the service



The MMS at the service level are an aggregation of the metric sets at the endpoint-level. If you specify the endpoints that are of interest to you in your Monitoring MetricSet, then you can reduce the amount of data.

However, limiting the number of endpoints in your Monitoring MetricSet isn’t always a guaranteed way to reduce your cardinality. 

Solution: Apply tag filters  
------------------------------------------------------------------------------------------------------------------
In this example, the custom dimension is :code:`customer.id`. 

Suppose you want to track a checkout workflow on your application. In your environment, this workflow is called the checkout service. You create a Monitoring MetricSet with two endpoints, add-to-cart, and checkout. However, you find that your cardinality is high for the Monitoring MetricSet for these two endpoints because there are 10,000 unique customer IDs for the :code:`customer.id` tag associated with these endpoints.To reduce the overall cardinality for this Monitoring MetricSet, you can filter by tag values to a smaller subset of customer IDs that are of interest to you instead of needlessly processing 10,000 unique tags.

