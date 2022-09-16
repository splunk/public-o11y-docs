.. _gcp-metrics:

******************************************
Google Cloud Monitoring metrics
******************************************

.. meta::
   :description: GCP metrics in Splunk Observability Cloud.

.. toctree::
   :hidden:

After you connect to GCP, metrics from Google Cloud Monitoring under :new-page:`Google Cloud metrics <https://cloud.google.com/monitoring/api/metrics_gcp>` sync with Infrastructure Monitoring.  Not all metrics are synced by default. To learn more, see :ref:`Connect to GCP <get-started-gcp>`. 

Metrics from Google Cloud Monitoring (formerly Stackdriver) contain dimensions that correspond to the Labels described in the Google Cloud metrics reference and the :new-page:`Monitored Resource Types <https://cloud.google.com/monitoring/api/resources>` reference. Use the ``monitored_resource`` dimension to determine which metric corresponds to a particular resource.

Although you can configure :new-page:`Cloud Monitoring <https://cloud.google.com/monitoring/api/metrics_aws>` to monitor AWS metrics, the GCP integration with Splunk Observability Cloud does not ingest them by default. You can enter additional GCP service domains while configuring your integration. Such a configuration does not connect your Observability Cloud instance to AWS.

========
Metrics
========

You can integrate the :ref:`following GCP services with Splunk Observability Cloud <gcp-integrations>`. 

These are the metrics available for the Google Cloud Platform integration with Splunk Observability Cloud, grouped by GCP resource. All metrics are included by default.

Google App Engine metrics
=========================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-appengine/metrics.yaml"></div>

Google BigQuery metrics
=======================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-bigquery/metrics.yaml"></div>

Google Cloud Bigtable metrics
=============================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-cloud-bigtable/metrics.yaml"></div>

Google Cloud Datastore metrics
==============================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-cloud-datastore/metrics.yaml"></div>

Google Cloud Functions metrics
==============================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-cloud-functions/metrics.yaml"></div>

Google Cloud Pub/Sub metrics
============================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-cloud-pubsub/metrics.yaml"></div>

Google Cloud Router metrics
===========================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-cloud-router/metrics.yaml"></div>

Google Cloud Spanner metrics
============================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-cloud-spanner/metrics.yaml"></div>

Google Cloud Storage metrics
============================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-cloud-storage/metrics.yaml"></div>

.. _gce-metrics:

Google Compute Engine metrics
=============================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-compute-engine/metrics.yaml"></div>

Google Container Engine metrics
===============================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-container-engine/metrics.yaml"></div>

Google Kubernetes Engine metrics
================================

.. raw:: html

   <div class="metrics-yaml" category="included" url="https://raw.githubusercontent.com/signalfx/integrations/master/google-kubernetes-engine/metrics.yaml"></div>

