
.. _custom-metricset:

Scenario: Kai monitors detector service latency for a group of customers
**************************************************************************

.. meta::
    :description: This Splunk APM scenario describes how to monitor for service latency.

Kai, a site reliability engineer at the fictitious Buttercup Games, wants to monitor a latency issue affecting a critical checkout workflow for the cart service and ``/getcart`` endpoint for a specific set of customers who most frequently have problems with the service. 

Kai takes the following steps to monitor latency in the cart service:

#. :ref:`custom-metricset-mms`
#. :ref:`custom-metricset-detectors`
#. :ref:`custom-metricset-dashboards`

.. _custom-metricset-mms:

Kai generates a Monitoring MetricSet (MMS) and filters by span tag
====================================================================================
To generate Monitoring MetricSets (MMS) by customer, Kai indexes a span tag to identify each customer: ``version_id``. Kai then generates an MMS using ``version_id`` as a dimension. Kai sets the scope of the MMS to the ``cartservice``, and filters on the tag values for ``version_id`` that represent the specific list of customers Kai wants to investigate. 

This image shows an example MMS configuration for the ``cartservice`` endpoint ``/getcart`` and a filter by tag values for ``version_id``:

..  image:: /_images/apm/span-tags/version_id_metric_set.png
    :width: 60%
    :alt: This screenshot shows how to add a custom Monitoring MetricSet for a single service. 

.. _custom-metricset-detectors:

Kai creates service latency detectors to track metrics 
====================================================================================

Kai uses the custom dimensionalized MMS they created to monitor the performance of this critical checkout workflow in the cart service. To do this, Kai creates a detector using the same custom indexed tag, ``version_id``, to track error rates associated with the checkout workflow.


Kai follows the guided setup detector creation to create their detector based on the error rate in the service :strong:`cartservice:GetCart`, filtered to the custom dimension of ``version_id``.

Kai uses the metric finder to find additional information on the metrics and metadata for their system. Kai applies :guilabel:`sf_dimensionalized:true` as a filter to see related metrics as shown in the following image. 

..  image:: /_images/apm/span-tags/MetricFindercmms.png
    :width: 100%
    :alt: This screenshot shows how to filter the MetricFinder for metrics related to custom MMS. 

.. _custom-metricset-dashboards:

Kai sets up charts, dashboards, and alerts for custom dimensions
==================================================================

Kai also creates charts and dashboards that use the custom dimensions they created.


..  image:: /_images/apm/span-tags/dashboard-cmms-use-case.png
    :width: 100%
    :alt: This screenshot shows how to filter the MetricFinder for metrics related to custom Monitoring MetricSets. 

Summary
==================================================================

By generating an MMS with ``version_id`` as a custom dimension and filtering it to the customers affected by the issue, Kai set up a detector to monitor service and endpoint latency by customer. Kai also created charts and dashboards that show service and endpoint latency for specific customers over time.

Learn more
===========

* See :ref:`apm-index-span-tags` for more information about indexing span tags.
* See :ref:`cmms` for more information about generating a custom MMS.
* See :ref:`metrics-finder-and-metadata-catalog` for more information about additional metrics and metadata.
* See :ref:`apm-alerts` for more information on configuring detectors and alerts for APM.
* See :ref:`Track service performance using dashboards in Splunk APM<apm-dashboards>` for more information about monitoring services in APM dashboards.
* See :ref:`Create charts in Splunk Observability Cloud<create-charts>` for more information about creating charts.
* See :ref:`Create and customize dashboards<dashboard-create-customize>` for more information about creating dashboards.
* See :ref:`Configure detectors and alerts in Splunk APM<apm-alerts>` for more information about creating alerts.