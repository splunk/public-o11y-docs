:orphan:

.. include:: /_includes/mpm-arm/mpm-arm-preview-header.rst

.. _data-dropping-impact-arm:

*********************************************************************
Impact and benefits of dropping data 
*********************************************************************

.. meta::
    :description: Learn about the impact of dropping incoming raw MTS in metrics pipeline management.


|hr|

:strong:`Available in Enterprise Edition`

|hr|

When you update data routing for metric time series (MTS) associated with a metric, you can discard MTS
you don't want to ingest or monitor in Splunk Observability Cloud. To learn more, see :ref:`use-MTS-data-routing-pipeline-arm`.

.. note:: You must have the Admin or Power role to drop MTS data.

.. _considerations-drop-MTS-arm:

Considerations for dropping MTS
===============================================================================

Before you decide to drop raw incoming MTS for a metric, consider the following impacts:

- You can only drop new incoming data. Data dropping has no effect on existing MTS.
- You can't recover dropped data.
- Detectors using the MTS you drop stop working. Alerts fire incorrectly, or the detector no longer issues any alerts.
- Charts using the MTS you drop stop reporting new data.
- If you drop data for MTS associated with built-in charts and AutoDetect detectors, these charts and detectors don't function correctly:

  - The charts no longer report data.
  - The detectors issue incorrect alerts or no longer issue alerts.
- Because of these problems, you need to avoid dropping data for metrics used in built-in charts and AutoDetect detectors.
  For a list of AutoDetect detectors, see :ref:`autodetect-list`.

.. _avoid-empty-charts-detectors-arm:

Avoid empty charts and detectors when dropping data
===============================================================================

To prevent charts and detectors from showing no data, you can follow these steps when updating data routing:

#. Start by keeping all data in real-time storage.
#. Download the list of charts and detectors that use MTS for your metric.
#. If you want to use aggregated MTS instead of raw MTS, create your aggregation rules.
#. Replace the MTS in all associated charts and detectors with the new aggregated MTS.
#. Change data routing to drop unaggregated raw data for your MTS after you have updated associated charts and detectors.

.. _data-dropping-billing-arm:

Use data dropping to reduce billing costs  
======================================================

You can reduce billing by dropping the dimensions in the table. 

However, for host-based subscriptions, dropping these dimensions might affect how MTS are counted. For example,
aggregations which drop countable dimensions will be counted as ``custom`` instead of other categories. This could
lead to overcounting and potentially throttling of those MTS if the count exceeds the plan limits.

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

Keep in mind that dropping any of those billing-related dimensions can also affect product experience, since
these dimensions are commonly used for dashboards:

* If dashboard import qualifiers are modified, then dashboards may not be imported at all.
* If dashboard analytics are impacted, charts may not report correctly or at all.

Dropping dimensions specific to a resource type and used in dashboard and detector analytics will likely only impact
that resource's charts and dashboards.

Removing any of the base dimensions (generally a subset of those explicitly listed above as related to billing)
might affect property synchronization. For instance, if you drop ``AWSUniqueId``, metrics will no longer be associated
with the cloud resource properties identified with ``aws_*``, including service-specific attributes and resource group tags.