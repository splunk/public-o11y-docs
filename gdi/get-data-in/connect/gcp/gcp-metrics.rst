.. _gcp-metrics:

************************************************
Google Cloud Monitoring metrics and metadata
************************************************

.. meta::
   :description: Google Cloud Platform / GCP metrics and metadata in Splunk Observability Cloud.

.. toctree::
   :hidden:

After :ref:`connecting to GCP <get-started-gcp>`, metrics from Google Cloud Monitoring sync with Infrastructure Monitoring. 

Metrics from Google Cloud Monitoring (formerly Stackdriver) contain dimensions that correspond to the Labels described in the Google Cloud metrics reference and the :new-page:`Monitored Resource Types <https://cloud.google.com/monitoring/api/resources>` reference. Use the ``monitored_resource`` dimension to determine which metric corresponds to a particular resource.

Although you can configure :new-page:`Cloud Monitoring <https://cloud.google.com/monitoring/api/metrics_aws>` to monitor AWS metrics, the GCP integration with Splunk Observability Cloud does not ingest them by default. You can enter additional GCP service domains while configuring your integration. 

Available GCP metrics and metadata
========================================

.. include:: /_includes/gdi/available-gcp.rst

* For a detailed list of the available Google Cloud Monitoring metrics, including services not supported out-of-the-box, see the official Google documentation at :new-page:`Google Cloud metrics <https://cloud.google.com/monitoring/api/metrics_gcp>`. 
* To track and understand your consumption, see :ref:`monitor-imm-billing-usage`.

GCP project metadata: Properties and lables
------------------------------------------------------

Splunk Observability Cloud also fetches the following metadata from your synchronized GCP projects:

* Project properties, which are attached to the ``project_id`` dimension and are propagated to all MTSes with this dimension. 

  * ``gcp_project_creation_time``

  * ``gcp_project_name``

  * ``gcp_project_number``

  * ``gcp_project_status``

* Project labels, which are prefixed with ``project_label_``.

.. note:: To add your GCP subprojects in your project's fields you need to explicitly mention them in the integration configuration. 

Organization metrics
=================================

Splunk Observability Cloud organization metrics monitor data related to your GCP integration, such as the number of metric time series (MTS) your integration has created. The names of organization metrics all start with the string ``sf.org.num.gcp``. To learn more about these metrics, see :new-page-ref:`org-metrics`.
