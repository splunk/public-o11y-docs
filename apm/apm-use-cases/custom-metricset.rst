
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

Kai generates a Monitoring MetricSet and filters by span tag
====================================================================================
To generate Monitoring MetricSets by customer:

1. Kai indexes a span tag to identify each customer: ``version_id``. 

2. Kai generates a Monitoring MetricSet using ``version_id`` as a dimension. 

3. Kai sets the scope of the Monitoring MetricSet to the :strong:`cartservice` service, and filters on the tag values for ``version_id`` that represent the specific list of customers Kai wants to investigate. 

This image shows a sample Monitoring MetricSet configuration with the service selected as :strong:`cartservice`, endpoint as :strong:`/getcart` and a filter by tag values for ``version_id``:

..  image:: /_images/apm/span-tags/version_id_metric_set.png
    :width: 60%
    :alt: This screenshot shows how to add a custom Monitoring MetricSet for a single service. 

|br|

.. _custom-metricset-detectors:

Kai creates service latency detectors to track metrics 
====================================================================================

Kai can use the custom dimensionalized Monitoring MetricSet they created to monitor the performance of this critical checkout workflow in the :strong:`cartservice` service. To do this, Kai creates a detector using the same custom indexed tag, ``version_id``, to track error rates associated with the checkout workflow.


1. There are 2 ways for Kai to navigate to the Detector Creation page to create a detector using their custom Monitoring MetricSet:
    a. From the navigation panel, select: :strong:`Alerts & Detectors` > :strong:`New Detector`.
    b. From any APM page, select the plus sign :strong:`( + )` on the top bar and select :strong:`Detector` from the list. 


2. Kai follows the guided Detector Creation flow to create their detector based on the error rate in the service :strong:`cartservice:GetCart`, filtered to the custom dimension of ``version_id``.

3. Kai can use the Metric Finder to find additional information on the metrics and metadata for their system. For more, see :ref:`Metric Finder and Metadata Catalog<metrics-finder-and-metadata-catalog>`. Apply :strong:`sf_dimensionalized:true` as a :strong:`Filter` to see related metrics as shown in the following image. 

..  image:: /_images/apm/span-tags/MetricFindercmms.png
    :width: 100%
    :alt: This screenshot shows how to filter the MetricFinder for metrics related to custom monitoring MetricSets. 

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
    :alt: This screenshot shows how to filter the MetricFinder for metrics related to custom monitoring MetricSets. 


Summary
==================================================================

By generating a Monitoring MetricSet with ``version_id`` as a custom dimension and filtering it to the customers affected by the issue, Kai can set up a detector to monitor service and endpoint latency by customer. Kai can also create charts and dashboards that show service and endpoint latency for specific customers over time.

Kai created a Monitoring MetricSet with a custom dimension to track a checkout workflow for a subset of customers. To learn more about Monitoring MetricSets, see :ref:`cmms`. 

Learn more
===========

* See Index span tags to generate Troubleshooting MetricSets for the steps Kai takes to generate a custom MMS.
* See :ref:`cmms` for more info about generating a custom MMS.
* For more, see Metric Finder and Metadata Catalog.
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


