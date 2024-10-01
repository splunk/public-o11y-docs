.. _get-started-gcp:

********************************************************
Connect to Google Cloud Platform 
********************************************************

.. meta::
   :description: Connect your Google Cloud Platform / GCP account to Splunk Observability Cloud.

.. toctree::
   :hidden:

   GCP prerequisites <gcp-prereqs>
   Supported GCP services <https://docs.splunk.com/observability/en/gdi/integrations/cloud-gcp.html>
   Connect to GCP <azure-connect> 
   gcp-metrics
   Send GCP logs to Splunk Platform <gcp-logs>   

With a Google Cloud Platform (GCP) integration in Splunk Observability Cloud, you can track your Google Cloud Monitoring metrics and monitor your GCP services in one place. To configure a GCP integration with Splunk Infrastructure Monitoring, check the prerequisites and follow the instructions on this document. You can also :ref:`use the API <gcp-api>` to connect to GCP. 

#. Before you start, check :ref:`gcp-prereqs`.
#. Next, see :ref:`gcp-connect`.
#. For a list of supported Azure services, see :ref:`gcp-integrations`. 

.. raw:: html

   <embed>
      <h2>Install the Splunk Distribution of OpenTelemetry Collector<a name="install-splunk-otel-collector" class="headerlink" href="#install-splunk-otel-collector" title="Permalink to this headline">¶</a></h2>
   </embed>

To take advantage of the full benefits of the Splunk Observability Cloud platform, install the :ref:`OpenTelemetry Collector <otel-intro>`. 

.. raw:: html

   <embed>
      <h3>Track your OpenTelemetry enablement<a name="install-splunk-otel-collector-enablement" class="headerlink" href="#install-splunk-otel-collector-enablement" title="Permalink to this headline">¶</a></h3>
   </embed>

To track the degree of OpenTelemetry enablement in your GCP integrations: 

1. From Splunk Observability Cloud, go to :guilabel:`Data Management > Deployed integrations > Google Cloud Platform`.

2. Select :guilabel:`OpenTelemetry Enabled` to see whether the OTel Collector is installed on each GCE instance or GKE cluster. This helps you identify the instances that still need to be instrumented. 

..  image:: /_images/gdi/gcp-collector-insights.png
   :width: 80%
   :alt: Amount of GCP entities with the Collector installed.  

3. For OTel Collector instances that are successfully instrumented, you can see which version of the Collector is deployed.  

.. _next-gcp-steps:

.. raw:: html

   <embed>
      <h2>Next steps<a name="next-gcp-steps" class="headerlink" href="#next-gcp-steps" title="Permalink to this headline">¶</a></h2>
   </embed>

To validate your setup, examine the details of your GCP integration as displayed in the list at the end of the setup page.

* For details about the metrics provided by an GCP integration, see :ref:`gcp-metrics`.
* To send logs from GCP to Splunk Observability Cloud, follow the instructions in :ref:`gcp-logs`.
* Learn about Splunk Observability Cloud's :ref:`GCP Infrastructure Monitoring options <infrastructure-gcp>`. 
* To learn more about Splunk Observability Cloud's data model, refer to :ref:`data-model`.
