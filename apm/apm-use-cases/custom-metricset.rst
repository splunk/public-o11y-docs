
.. _custom-metricset:

Monitor detector service latency for a group of customers
****************************************************************

.. meta::
    :description: This Splunk APM use case describes how to monitor for service latency.

Kai, a site reliability engineer at the fictitious Buttercup Games, wants to monitor a latency issue affecting a critical checkout workflow for the cart service and ``/getcart`` endpoint for a specific set of customers who most frequently have problems with the service. 

Kai takes the following steps to monitor latency in the cart service:

#. :ref:`custom-metricset-mms`
#. :ref:`custom-metricset-detectors`
#. :ref:`custom-metricset-dashboards`

.. _custom-metricset-mms:

Kai generates a Monitoring MetricSet (MMS) and filters by span tag
====================================================================================
To generate Monitoring MetricSets (MMS) by customer, Kai indexes a span tag to identify each customer: ``version_id``. Kai then generates an MMS using ``version_id`` as a dimension. Kai sets the scope of the MMS to the :strong:`cartservice` service, and filters on the tag values for ``version_id`` that represent the specific list of customers Kai wants to investigate. 

This image shows a sample MMS configuration with the service selected as :strong:`cartservice`, endpoint as :strong:`/getcart` and a filter by tag values for ``version_id``:

..  image:: /_images/apm/span-tags/version_id_metric_set.png
    :width: 60%
    :alt: This screenshot shows how to add a custom Monitoring MetricSet for a single service. 

|br|

.. _custom-metricset-detectors:

Kai creates service latency detectors to track metrics 
====================================================================================

Kai can use the custom dimensionalized MMS they created to monitor the performance of this critical checkout workflow in the cart service. To do this, Kai creates a detector using the same custom indexed tag, ``version_id``, to track error rates associated with the checkout workflow.


Kai follows the guided Detector Creation flow to create their detector based on the error rate in the service :strong:`cartservice:GetCart`, filtered to the custom dimension of ``version_id``.

Kai uses the Metric Finder to find additional information on the metrics and metadata for their system. Kai applies :guilabel:`sf_dimensionalized:true` as a filter to see related metrics as shown in the following image. 

..  image:: /_images/apm/span-tags/MetricFindercmms.png
    :width: 100%
    :alt: This screenshot shows how to filter the MetricFinder for metrics related to custom MMS. 

.. _custom-metricset-dashboards:

Kai sets up charts, dashboards, and alerts for custom dimensions
==================================================================
Kai can also create charts and dashboards that use the custom dimensions Kai created.

Kai navigates to the built-in APM service endpoint dashboard for :strong:`cartservice:GetCart` using the following steps:

#. From the :strong:`APM` landing page, select the :guilabel:`Dashboards` icon in the navigation bar.

#. Search :strong:`APM` in the search bar.

#. Under :strong:`APM Services` in the :strong:`Built-in Dashboard Groups` section, select :strong:`Service Endpoint`.

#. Select the relevant environment, then select ``cartservice`` as the :strong:`Service`, ``GetCart`` as the Endpoint, and apply :strong:`sf_dimensionalized:true` as a :strong:`Filter`.

#. To see the custom dimensions Kai created, Kai applies the filter :strong:`sf_dimensionalized:true` in the filter bar while creating their dashboard, as the following image illustrates:


..  image:: /_images/apm/span-tags/dashboard-cmms-use-case.png
    :width: 100%
    :alt: This screenshot shows how to filter the MetricFinder for metrics related to custom Monitoring MetricSets. 


Summary
==================================================================

By generating an MMS with ``version_id`` as a custom dimension and filtering it to the customers affected by the issue, Kai can set up a detector to monitor service and endpoint latency by customer. Kai can also create charts and dashboards that show service and endpoint latency for specific customers over time.

Kai created a MMS with a custom dimension to track a checkout workflow for a subset of customers. 

Learn more
===========

* See :ref:`apm-index-span-tags` for more info about indexing span tags.
* See :ref:`cmms` for more info about generating a custom MMS.
* See :ref:`metrics-finder-and-metadata-catalog` for more info about additional metrics and metadata.
* See :ref:`apm-alerts` for more info on configuring detectors and alerts for APM.
* See :ref:`Track service performance using dashboards in Splunk APM<apm-dashboards>` for more info about monitoring services in APM dashboards.
* See :ref:`Create charts in Splunk Observability Cloud<create-charts>` for more info about creating charts.
* See :ref:`Create and customize dashboards<dashboard-create-customize>` for more info about creating dashboards.
* See :ref:`Configure detectors and alerts in Splunk APM<apm-alerts>` for more info about creating alerts.


.. list-table::
   :header-rows: 1
   :widths: 15, 50

   * - :strong:`Task`
     - :strong:`Instructions`
   * - Create charts
     - :ref:`Create charts in Splunk Observability Cloud<create-charts>`
   * - Create dashboards
     - :ref:`Create and customize dashboards<dashboard-create-customize>`
   * - Create an alert 
     - :ref:`Configure detectors and alerts in Splunk APM<apm-alerts>`
   * - Monitor services in APM dashboards 
     - :ref:`Track service performance using dashboards in Splunk APM<apm-dashboards>`


