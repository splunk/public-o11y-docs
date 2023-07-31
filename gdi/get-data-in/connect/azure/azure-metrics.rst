.. _azure-metrics:


*********************************************
Azure metrics in Splunk Observability Cloud
*********************************************

.. meta::
   :description: These are the metrics available for the Azure integration with Splunk Observability Cloud, grouped according to Azure resource.

All available metrics are included by default in any Azure integration with Splunk Observability Cloud.

Metric names and descriptions are generated dynamically from the :strong:`Supported metrics with Azure Monitor` page maintained by Microsoft. See all details in :new-page:`https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported`.

Every metric can either be a counter or a gauge, depending on what dimension is being looked at. If the MTS contains the dimension ``aggregation_type: total`` or ``aggregation_type: count``, then it is sent as a counter. Otherwise, it is sent as a gauge. To learn more, see :ref:`metric-time-series`. 

Organization metrics
=================================

Splunk Observability Cloud organization metrics monitor data related to your Azure integration, such as the number of metric time series (MTS) your integration has created. The names of organization metrics all start with the string ``sf.org.num.azure``. To learn more about these metrics, see :new-page-ref:`org-metrics`.
