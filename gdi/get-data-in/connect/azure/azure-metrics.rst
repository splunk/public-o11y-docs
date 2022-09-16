.. _azure-metrics:


*********************************************
Azure metrics in Splunk Observability Cloud
*********************************************

.. meta::
   :description: These are the metrics available for the Azure integration with Splunk Observability Cloud, grouped according to Azure resource.

These are the metrics available for the Azure integration with Splunk Observability Cloud, grouped according to Azure resource. All metrics are included by default.

.. note::

   Metric names and descriptions are generated dynamically from the "Supported metrics with Azure Monitor" page maintained by Microsoft.

   Every metric can either be a counter or a gauge, depending on what dimension is being looked at.

If the MTS contains the dimension ``aggregation_type: total`` or ``aggregation_type: count``, then it is sent as a counter. Otherwise, it is sent as a gauge. To learn more, see :ref:`metric-time-series`. 


Azure App Service metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-app-service/metrics.yaml"></div>

Azure Batch metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-batch/metrics.yaml"></div>

Azure Event Hubs metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-event-hubs/metrics.yaml"></div>

Azure Functions metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-functions/metrics.yaml"></div>

Azure Kubernetes service metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-kubernetes-service/metrics.yaml"></div>

Azure Logic App metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-logic-app/metrics.yaml"></div>

Azure Redis metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-redis/metrics.yaml"></div>

Azure SQL Databases metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-sql-databases/metrics.yaml"></div>

Azure SQL elastic pools metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-sql-elasticpools/metrics.yaml"></div>

Azure Storage metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-storage/metrics.yaml"></div>

Azure Virtual Machine metrics
=================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-vm/metrics.yaml"></div>

Azure Virtual Machine Scale Sets metrics
==========================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/azure-vmscaleset/metrics.yaml"></div>

Organization metrics
=================================

Observability Cloud organization metrics monitor data related to your Azure integration,
such as the number of metric time series (MTS) your integration has created. The names of organization metrics all
start with the string ``sf.org.num.azure``. To learn more about these metrics, see :new-page-ref:`org-metrics`.
