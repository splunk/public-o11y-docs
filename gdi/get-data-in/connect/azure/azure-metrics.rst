.. _azure-metrics:

*********************************************
Azure metrics in Splunk Observability Cloud
*********************************************

.. meta::
   :description: These are the metrics available for the Azure integration with Splunk Observability Cloud, grouped according to Azure resource.



.. raw:: html

   <div class="include-start" id="gdi/available-azure.rst"></div>

.. include:: /_includes/gdi/available-azure.rst

.. raw:: html

   <div class="include-stop" id="gdi/available-azure.rst"></div>




Azure services metric information
================================================

Metric names and descriptions are generated dynamically from data provided by Microsoft. See all details in Microsoft's :new-page:`Supported metrics with Azure Monitor <https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported>`.

Every metric can either be a counter or a gauge, depending on what dimension is being looked at. If the MTS contains the dimension ``aggregation_type: total`` or ``aggregation_type: count``, then it is sent as a counter. Otherwise, it is sent as a gauge. To learn more, see :ref:`metric-types` and :ref:`metric-time-series`. 

Azure functions metrics
=================================

Splunk Observability Cloud supports Azure functions metrics. For more information about Azure Functions, refer to Microsoft's :new-page:`Azure Functions documentation <https://learn.microsoft.com/en-us/azure/azure-functions/>`.

Azure Monitor publishes Azure functions metrics under ``Microsoft.Web/sites``. To distinguish specific function metrics, Splunk Observability Cloud automatically adds the dimension ``is_Azure_Function`` to them. For the full list of metrics, see Microsoft's :new-page:`Supported metrics for Microsoft.Web/sites <https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-web-sites-metrics>`.

Organization metrics
=================================

Splunk Observability Cloud organization metrics monitor data related to your Azure integration, such as the number of metric time series (MTS) your integration has created. The names of organization metrics all start with the string ``sf.org.num.azure``. To learn more about these metrics, see :new-page-ref:`org-metrics`.
