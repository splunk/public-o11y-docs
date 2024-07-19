
.. _data-dropping-impact:

*********************************************************************
Impact and benefits of archiving or dropping data 
*********************************************************************

.. meta::
    :description: Learn about the impact of data archiving and dropping in metrics pipeline management.


|hr|

:strong:`Available in Enterprise Edition`. For more information, see :ref:`sd-subscriptions`.

|hr|

With MPM you can decide to keep, drop, or send unnecessary data to the low-cost Archived data tier. You can also create or update rules for your metric ingest to keep specific dimensions of an aggregated MTS or discard unaggregated raw data altogether.

To learn more, see :ref:`metrics-pipeline-intro`.

.. note:: You must have the Admin or Power user role to archive or drop data. For more information, see :ref:`roles-and-capabilities`.

.. _data-dropping-billing:

Archive or drop your data to reduce billing costs
======================================================

Reduce billing by archiving your data
------------------------------------------------------------

Archived Metrics allow you to store infrequently accessed metric data in a low-cost archival tier, which is billed at one tenth of the cost of regular metrics.  

Archived data can be accessed through route exceptions in charts and detectors, and allows you to backfill historical data up to 8 days as well.

Learn more about this use case in :ref:`use-case-archive`.

Reduce billing by dropping data
------------------------------------------------------------

You can reduce billing by dropping the dimensions in the table. 

However, for host-based subscriptions, dropping these dimensions might affect how MTS are counted. For example, aggregations which drop countable dimensions will be counted as ``custom`` instead of other categories. This could lead to overcounting and potentially throttling of those MTS if the count exceeds the plan limits.

.. list-table::
    :header-rows: 1
    :widths: 20 80
    :width: 100%

    *   - Source
        - Dimensions to drop

    *   - Any agent  
        - ``host``, ``host.name``, ``container.id``, ``container_id``, ``metric_source``, ``plugin``, ``redis.version`` , ``state`` , ``url``

    *   - AWS 
        - ``AWSUniqueId``, ``InstanceId``, ``namespace``

    *   - Azure 
        - ``azure_resource_id``, ``resource_type``, ``monitored_resource``

    *   - GCP 
        - ``gcp_id``, ``service``

    *   - VMware 
        - ``vcenter``

    *   - Heroku 
        - ``dyno_id``

    *   - NPM 
        - ``sf_product``

Considerations when archiving data
======================================

Before you decide to send your metrics to the Archived Metrics tier, consider the following impacts:

* You can restore historical archived MTS to real-time storage, although it's limited to up to 8 days of archived data.
* Detectors using the metric you archive will misfire alerts or stop alerting.
* Charts using the metric you archive will stop reporting new data.

Considerations when dropping data
======================================

Before you decide to drop unaggregated raw data for your metric, consider the following impacts:

- You can drop new incoming data, but you can't drop existing data.
- You can't recover dropped data.
- Detectors using the metric or custom properties you drop will misfire alerts or stop alerting.
- Charts using the metric or custom properties you drop will stop reporting new data.
- Custom properties assigned to dropped dimensions or metrics will be deleted. To learn more, see :ref:`custom-properties`.
- If you drop data for metrics associated with built-in charts and AutoDetect detectors, these charts and detectors will be empty and not function correctly. Avoid dropping data for metrics used in built-in charts and AutoDetect detectors. For a list of AutoDetect detectors, see :ref:`autodetect-list`.

Further impacts: Product experience and property sync
============================================================================

Keep in mind that archiving or dropping any of those billing-related dimensions can also affect product experience, since these metrics and their dimensions are commonly used for dashboards:

* If dashboard import qualifiers are modified, then dashboards may not be imported at all. 
* If dashboard analytics are impacted, charts may not report correctly or at all.

Archiving metrics or dropping dimensions specific to a resource type and used in dashboard and detector analytics will likely only impact that resource's charts and dashboards.

Example: Dropping a metric's Id
------------------------------------------------------------

If you remove any of the base dimensions of a metric (generally a subset of those explicitly listed above as related to billing), property synchronization might be affected. 

For instance, if you drop ``AWSUniqueId``, metrics will no longer be associated to the cloud resource properties identified with ``aws_*``, including service-specific attributes and resource group tags.

Avoid empty charts and detectors when archiving or dropping data
---------------------------------------------------------------------------------------

To prevent charts and detectors from showing no data, you can follow these steps when creating new rules:

#. Keep all data when you first create new rules.
#. Download the list of charts and detectors associated with your metric.
#. Save your new rules.
#. Replace the metric in all associated charts and detectors with the new aggregated metrics.
#. Drop unaggregated raw data for your metric once you have updated associated charts and detectors.

Avoid deleting custom properties when dropping data
----------------------------------------------------------------------------

To prevent custom properties from being deleted, you can follow these steps when creating new rules:

#. Keep all data when you first create new rules.
#. Find custom properties assigned to the dimensions or metrics you want to drop using the Metadata Catalog or the Metrics Metadata API.

    * To find a custom property using the Metadata Catalog, see :ref:`search-edit-metadata`.

        .. note:: The Metadata Catalog doesn't distinguish between dimensions and properties when returning search results.

    * To retrieve a list of custom properties using the API, see the :new-page:`GET endpoint for the Metrics Metadata API <https://dev.splunk.com/observability/reference/api/metrics_metadata/latest#endpoint-retrieve-dimensions-query>`.

#. Assign any custom property you want to keep to the new aggregated metrics.
#. Drop unaggregated raw data for your metric once you have assigned custom properties to the new metrics.





