.. _azure-metrics:

*********************************************
Azure metrics in Splunk Observability Cloud
*********************************************

.. meta::
   :description: These are the metrics available for the Azure integration with Splunk Observability Cloud, grouped according to Azure resource.

By default Splunk Observability Cloud includes all available metrics from any Azure integration. 

Azure services metrics
=================================

Metric names and descriptions are generated dynamically from data provided by Microsoft. See all details in Microsoft's :new-page:`Supported metrics with Azure Monitor <https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported>`.

.. include:: /_includes/gdi/available-azure.rst

Types of available metrics
-------------------------------------------

Every metric can either be a counter or a gauge, depending on what dimension is being looked at. If the MTS contains the dimension ``aggregation_type: total`` or ``aggregation_type: count``, then it is sent as a counter. Otherwise, it is sent as a gauge. To learn more, see :ref:`metric-types` and :ref:`metric-time-series`. 

Azure functions metrics
=================================

Splunk Observability Cloud supports Azure functions metrics. To distinguish them, the dimension ``is_Azure_Function`` is automatically added to them.

Azure Monitor publishes Azure functions metrics under ``Microsoft.Web/sites``. For the full list of metrics, see Microsoft's :new-page:`Supported metrics for Microsoft.Web/sites <https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-web-sites-metrics>`.

Organization metrics
=================================

Splunk Observability Cloud organization metrics monitor data related to your Azure integration, such as the number of metric time series (MTS) your integration has created. The names of organization metrics all start with the string ``sf.org.num.azure``. To learn more about these metrics, see :new-page-ref:`org-metrics`.
