
.. _data-dropping-impact:

*********************************************************************
Impact and benefits of dropping data 
*********************************************************************

.. meta::
    :description: Learn about the impact of data dropping in metrics pipeline management.


|hr|

:strong:`Available in Enterprise Edition and Service Bureau`

|hr|

When you create or update rules for your metric ingest, you can drop unaggregated raw data to discard metric time series (MTS) you don't want to ingest or monitor in Splunk Observability Cloud. You can also drop a metric without adding an aggregation rule. To learn more, see :ref:`data-dropping`.

.. note:: You must be an Admin to drop data.

Considerations when dropping data
======================================

Before you decide to drop unaggregated raw data for your metric, consider the following impacts:

- You can only drop new incoming data. Existing data can't be dropped.
- You can't recover dropped data.
- Detectors using the metric you drop will misfire alerts or stop alerting.
- Charts using the metric you drop will stop reporting new data.
- If you drop data for metrics associated with built-in charts and AutoDetect detectors, these charts and detectors will be empty and not function correctly. Avoid dropping data for metrics used in built-in charts and AutoDetect detectors. For a list of AutoDetect detectors, see :ref:`autodetect-list`.

Avoid empty charts and detectors when dropping data
------------------------------------------------------------

To prevent charts and detectors from showing no data, you can follow these steps when creating new rules:

#. Keep all data when you first create new rules.
#. Download the list of charts and detectors associated with your metric.
#. Save your new rules.
#. Replace the metric in all associated charts and detectors with the new aggregated metrics.
#. Drop unaggregated raw data for your metric once you have updated associated charts and detectors.

.. _data-dropping-billing:

Use data dropping to reduce billing costs  
======================================================

You can reduce billing by dropping the dimensions in the table. 

However, for host-based subscriptions, dropping these dimensions might affect how MTS are counted. For example, aggregations which drop countable dimensions will be counted as ``custom`` instead of other categories. This could lead to overcounting and potentially throttling of those MTS if the count exceeds the plan limits.

.. list-table::
    :header-rows: 1
    :widths: 20 80

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


Further impacts: Product experience and property sync
------------------------------------------------------------

Keep in mind that dropping any of those billing-related dimensions can also affect product experience, since these dimensions are commonly used for dashboards: 

* If dashboard import qualifiers are modified, then dashboards may not be imported at all. 
* If dashboard analytics are impacted, charts may not report correctly or at all.

Dropping dimensions specific to a resource type and used in dashboard and detector analytics will likely only impact that resource's charts and dashboards. 

Removing any of the base dimensions (generally a subset of those explicitly listed above as related to billing) might affect property synchonization. For instance, if you drop ``AWSUniqueId``, metrics will no longer be associated to the cloud resource properties identified with ``aws_*``, including service-specific attributes and resource group tags.