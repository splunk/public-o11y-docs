.. _enable-db-perf:

************************************************************************
Enable Database Query Performance
************************************************************************

.. meta::
   :description: Enable Database Query Performance in Splunk APM so you can monitor the impact of your database queries on service availability without having to instrument your databases. 

Database Query Performance is available by default, so all you need to do is enable the feature so that APM automatically begins indexing a set of database-related span tags. See :ref:`db-tags` for the list of tags.

.. note:: Indexing Database Query Performance tags counts toward the MetricSet entitlement in your Splunk APM contract. See :ref:`apm-limits-metricsets` to learn more about cardinality in APM.

.. _db-perf-requirements:

Prerequisites
==============================================

To use Database Query Performance, you need an instrumented back-end service that connects to at least one database. See :ref:`get-started-application`.


.. _db-perf-enable:

Enable Database Query Performance
==============================================

Follow these steps to enable Database Query Performance and begin indexing database tags:

1. From the APM landing page, click :guilabel:`APM Configuration` and select :guilabel:`MetricSets Configuration`. The APM MetricSets Configuration page opens. 
2. In the Database Query Performance section, check that the :guilabel:`Status` is Active. If it is, skip to the next step. If it's not, click :guilabel:`Resume Indexing` to initiate cardinality analysis, and then wait for the cardinality analysis to run in the Pending MetricSet section at the top of the table. 
    
    .. image:: /_images/apm/db-query-perf/db-cardinality-success.png
         :width: 100%
         :alt: This screenshot shows what you see when the cardinality analysis for indexing new span tags passes within entitlement.

    a. If the cardinality analysis passes within entitlement, as in the above screenshot, click the checkmark to accept the cardinality contribution and begin indexing database tags.
    b. If the cardinality contribution is above your entitlement, consider reviewing the cardinality contributions of your other indexed span tags to free up cardinality for Database Query Performance. To learn more about optimizing cardinality, see :ref:`apm-limits-metricsets`. 

3. Navigate to the APM landing page and click the :guilabel:`Database Query Performance` card to confirm databases are appearing in Database Query Performance. If they are not appearing as expected, see :ref:`db-perf-troubleshooting`.

Learn more 
-----------
See the following links for more information about Database Query Performance: 

* For an overview of Database Query Performance, see :ref:`db-query-performance`.
* For a detailed use case using Database Query Performance, see :ref:`db-perf-use-case`. 
* To troubleshoot issues with Database Query Performance, see :ref:`db-perf-troubleshooting`. 
* For reference material about Database Query Performance, see :ref:`db-perf-reference`.