.. _logs-search-time-rules:

*****************************************************************
Apply processing rules across historical data
*****************************************************************

.. meta::
  :description: Transform your data with a log processing rule, then apply the rule to logs that came in before the rule existed. Learn about search-time vs. index-time rules.

.. note:: Only customers with a Splunk Log Observer entitlement in Splunk Observability Cloud can apply processing rules across historical data. If you do not have a Log Observer entitlement and are using Splunk Log Observer Connect instead, see :ref:`logs-intro-logconnect` to learn what you can do with the Splunk Enterprise integration.

What are search-time rules?
--------------------------------------------------------------------------------

Search-time rules are the application of log processing rules across historical data. Log processing rules can occur at index time or at search time. Index-time rules can only be applied to data that streams in after the index-time rule was created. To learn more about index-time rules, see :ref:`logs-processors`. It can be helpful to apply an index-time rule to data that streamed in before the index-time rule existed. To do so, create a search-time rule.

The following table compares search-time rules and index-time rules.

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Search-time rule`
     - :strong:`Index-time rule`
        
   * - Transforms your data or a subset of your data
     - Transforms your data or a subset of your data

   * - Apply to data from any time period
     - Apply only to data that streamed in after the rule was created and activated

   * - Is part of a query
     - Is part of the logs pipeline

   * - Activate or deactivate in :guilabel:`Saved Queries` or :guilabel:`Active search-time rules` in Log Observer
     - Activate or deactivate in :guilabel:`Data Configuration > Logs Pipeline Management`


Do not activate search-time rules except when you are intentionally applying index-time rules to historical data. Applying search-time rules does not impact the subscription usage, but does impact performance. Search-time rules are transformations that increase the time it takes to complete a search. Applying index-time rules can impact index subscription usage, but does not impact performance.


Use case for applying search-time rules
--------------------------------------------------------------------------------

You can apply search-time rules when you discover a problem after the fact. For example, suppose an error occurred between 2 am and 5 am last night and no one was on duty to track down the cause. This morning at 9 am, you discover the error occurred and try to figure out what went wrong. You create field extractions to define a few fields to make filtering easier. The new fields, which were created with index-time rules, can only be applied to logs that stream in after you created the fields at 9 am. To apply your newly created fields to logs that streamed in between 2 am and 5 am, create a search-time rule based on the index-time rule you created at 9 am, then activate it as a search-time rule and apply it to logs that came in between 2 am and 5 am.


Create and activate a search-time rule
--------------------------------------------------------------------------------

To create a search-time rule, follow these steps:

1. Create an index-time rule from an individual log or in Logs Pipeline Management. See the :guilabel:`Field extraction processors` section of :ref:`logs-processors` to learn how. :guilabel:`Note`: You can apply only Regex processing rules at search time.
2. Click :guilabel:`Active Search-time rules` in Log Observer. A :guilabel:`Search-time rules` panel appears.
3. On the :guilabel:`Search-time rules` panel, click the :guilabel:`Index-time rules` tab.
4. Find and select your index-time rule in the list to activate it at search time, then click :guilabel:`Apply 1 rule at search time`.
5. Click the :guilabel:`Search-time rules` tab.
6. Drag the active search-time rules to obtain the order in which you want to apply the rules.
7. Adjust the time in the Log Observer time picker to apply the rule to the historical data you want.


Deactivate a search-time rule
--------------------------------------------------------------------------------

To deactivate a search-time rule, follow these steps:

1. In Log Observer, click :guilabel:`Active search-time rules`.
2. On the :guilabel:`Search-time rules` panel, click the :guilabel:`Active search-time rules` tab.
3. Find and select the rule you want to deactivate, then click :guilabel:`Deactivate 1 rule`.


Save a search-time rule
--------------------------------------------------------------------------------

When you create a search-time rule, it automatically becomes part of the current query. To save the rule, save the query. See :ref:`logs-save-share` to learn how.
