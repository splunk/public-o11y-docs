
.. _custom-metricset:

****************************************************************
Monitor SLO detector service latency for a group of customers
****************************************************************

.. Metadata updated: 1/23/23

.. meta::
    :description: This Splunk APM use case describes how to monitor for service latency.

Kai, a site reliability engineer at the fictitious Buttercup Games, wants to monitor a latency issue affecting a critical checkout workflow for the service ``cartservice`` and endpoint ``/getcart`` for a specific set of customers who most frequently have problems with it. By generating a Monitoring MetricSet with ``customer.id`` as a custom dimension and filtering it to the customers affected by the issue, Kai can set up a detector to monitor service and endpoint latency specifically by customer. They can also create charts and dashboards that show service and endpoint latency for specific customers over time.


Generate a Monitoring MetricSet and filter by span tag
====================================================================================
To generate Monitoring MetricSets by customer:

1. Kai indexes a span tag to identify each customer:  :strong:`customer.id`. See :ref:`apm-index-span-tags` for the steps they take to generate a custom MMS.

2. Kai generates a Monitoring MetricSet using :strong:`customer.id` as a dimension. See :ref:`cmms` for the steps they take to generate a custom MMS.

3. Then, Kai sets the scope of the Monitoring MetricSet to :strong:`cartservice`, and filters on the tag values for :strong:`customer.id` that represent the specific list of customers Kai wants to investigate. 

This image shows a sample Monitoring MetricSet configuration with service selected as :strong:`cartservice`, endpoint as :strong:`/getcart` and filtering by tag values for :strong:`customer.id`:

..  image:: /_images/apm/span-tags/cmms-use-case-modal.png
    :width: 60%
    :alt: This screenshot shows how to add a custom Monitoring MetricSet for a single service. 

|br|


Create service latency detectors to track metrics 
====================================================================================

Kai can leverage the custom dimensionalized Monitoring MetricSet they just created to monitor the performance of this critical checkout workflow in ``cartservice``. To do this, they create a detector using the same custom indexed tag, ``customer.id``, to track error rates associated with the checkout workflow.


1. There are two ways for Kai to navigate to the Detector Creation page to create a detector using their custom Monitoring MetricSet:
    a. From the left navigation panel, select: :strong:`Alerts & Detectors` > :strong:`New Detector`.
    b. From any APM page, click the plus sign on the top bar and select :strong:`Detector` from the drop down. 


2. Kai follows the guided Detector Creation flow to create their detector based on the error rate in :strong:`cartservice:GetCart`, filtered to the custom dimension of :strong:`customer.id`.

3. They use the Metric Finder to find additional information on the metrics and metadata for their system. For more, see :ref:`Metric Finder and Metadata Catalog<metrics-finder-and-metadata-catalog>`. 

The following image shows how to filter the MetricFinder for metrics related to custom monitoring MetricSets.

..  image:: /_images/apm/span-tags/MetricFindercmms.png
    :width: 100%
    :alt: This screenshot shows how to filter the MetricFinder for metrics related to custom monitoring MetricSets. 



Set up charts, dashboards, and alerts for custom dimensions
==================================================================
Kai can also create charts and dashboards that leverage the custom dimensions they created.

They navigate to the built-in APM service endpoint dashboard for :strong:`cartservice:GetCart` using the following steps:

#. From the APM landing page, click the :guilabel:`Dashboards` icon in the left navigation bar.

#. Search APM in the search bar.

#. Under :strong:`APM Services` in the :strong:`Built-in Dashboard Groups` section, click :strong:`Service Endpoint`.

#. Select the relevant environment, then select ``cartservice`` as the :strong:`Service`, ``GetCart`` as the Endpoint, and apply :strong:`sf_dimensionalized:true` as a :strong:`Filter`.


To see the custom dimensions they created in their custom MMS, Kai applies the filter :strong:`sf_dimensionalized:true` in the filter bar while creating their dashboard, as the following image illustrates:


..  image:: /_images/apm/span-tags/dashboard-cmms-use-case.png
    :width: 100%
    :alt: This screenshot shows how to filter the MetricFinder for metrics related to custom monitoring MetricSets. 

|br|

Use the links in the following table to learn more about how to set up charts, dashboards, and alerts.

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


Summary
==================================================================

Kai created a Monitoring MetricSet with a custom dimension to track a checkout workflow for a subset of customers. To learn more about Monitoring MetricSets, see :ref:`cmms`. 


