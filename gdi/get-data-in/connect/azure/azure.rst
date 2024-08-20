.. _get-started-azure:

**************************************************************
Connect your Azure account to Splunk Observability Cloud
**************************************************************

.. meta::
  :description: Connect your Microsoft Azure account to Splunk Observability Cloud.

.. toctree::
  :hidden:

  Azure prerequisites <azure-prereqs>
  Supported Azure services <https://docs.splunk.com/observability/en/gdi/integrations/cloud-azure.html>
  Connect to Azure <azure-connect> 
  Azure metrics <azure-metrics>
  Send Azure logs to Splunk Platform <azure-logs-ingestion>

Splunk Observability Cloud provides an integration with Microsoft Azure, lets you travel through Azure entities, and includes built-in dashboards to help you monitor Azure services. 

#. Before you start, check :ref:`azure-prereqs`.
#. Next, see :ref:`azure-connect`.
#. For a list of supported Azure services, see :ref:`azure-integrations`. 

.. raw:: html

  <embed>
    <h2>Install the Splunk Distribution of the OpenTelemetry Collector<a name="install-splunk-otel-collector" class="headerlink" href="#install-splunk-otel-collector" title="Permalink to this headline">¶</a></h2>
  </embed>

To take advantage of the full benefits of the Splunk Observability Cloud platform, install the Splunk Distribution of the OpenTelemetry Collector. See more at :ref:`otel-intro`. 

.. raw:: html

  <embed>
    <h3>Track your OpenTelemetry enablement<a name="install-splunk-otel-collector-enablement" class="headerlink" href="#install-splunk-otel-collector-enablement" title="Permalink to this headline">¶</a></h3>
  </embed>

To track the degree of OpenTelemetry enablement in your Azure integrations: 

1. From Splunk Observability Cloud, go to :guilabel:`Data Management > Deployed integrations > Azure`.

2. Select :guilabel:`OpenTelemetry Enabled` to see whether the OpenTelemetry Collector is installed on each Azure VMs or AKS cluster. This helps you identify the instances that still need to be instrumented. 

..  image:: /_images/gdi/azure-collector-insights.png
  :width: 80%
  :alt: Amount of Azure entities with the Collector installed. 

3. For OpenTelemetry Collector instances that are successfully instrumented, you can see which version of the Collector is deployed.  

.. _next-azure-steps:

.. raw:: html

  <embed>
    <h2>Next steps<a name="next-azure-steps" class="headerlink" href="#next-azure-steps" title="Permalink to this headline">¶</a></h2>
  </embed>

To validate your setup, examine the details of your Azure integration as displayed in the list at the end of the setup page. After you connect your Azure account to Splunk Observability Cloud, you can do the following:

* Import Azure metrics, traces, and metadata. For details about the metrics provided by an Azure integration, see :ref:`azure-metrics`.
* Learn about Splunk Observability Cloud's :ref:`Azure Infrastructure Monitoring options <infrastructure-azure>`. 
* Use Splunk Observability Cloud tools to monitor your Azure services, such as :ref:`navigators <use-navigators-imm>` and :ref:`dashboards <azure-dashboards>`.
* Filter Azure monitoring results using tags or dimensions such as ``region`` and ``host name``. When tagging, Splunk Observability Cloud only allows alphanumeric characters, and the underscore and minus symbols. Unsupported characters include ``.``, ``:``, ``/``, ``=``, ``+``, ``@``, and spaces, which are replaced by the underscore character. 
* To send logs from Azure to Splunk, see :ref:`ingest-azure-log-data`.
* To learn more about Splunk Observability Cloud's data model, refer to :ref:`data-model`.
