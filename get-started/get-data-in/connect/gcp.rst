.. _get-started-gcp:

**************
Connect to GCP
**************

.. meta::
   :description: Connect your GCP account to Splunk Observability Cloud.

.. toctree::
   :hidden:

You can monitor Google Cloud Platform (GCP) in Splunk Infrastructure Monitoring using Google StackDriver metrics. If you haven't already done so, follow the instructions to connect Infrastructure Monitoring to GCP.

Infrastructure Monitoring provides a robust integration with StackDriver, has a StackDriver-powered mode for the Infrastructure Navigator, and includes many built-in-dashboards to help you get started monitoring Google Cloud Platform services.

=============
Prerequisites
=============

Before you begin, you must be an administrator of your Splunk account.

1. Select a role for the GCP service account.

2. Configure GCP.

=====================
Start the integration
=====================

1. On the Observability Cloud home page, click :strong:`Data Setup`. The Connect Your Data page is displayed.

2. Select :strong:`All`.

3. Select :strong:`GCP` in the list of integration tiles.

4. Click :strong:`New Integration` and enter the GCP name and other details for integrating with GCP.

5. Click :strong:`Save`.


StackDriver metrics
===================

After connecting to GCP, metrics from StackDriver under :new-page:`Google Cloud metrics <https://cloud.google.com/monitoring/api/metrics_gcp>` in the StackDriver metric list sync with Infrastructure Monitoring. Agent metrics from AWS or StackDriver do not sync. You can use AWS integration to monitor those metrics.

These metrics from StackDriver contain dimensions that correspond to the Labels described in the GCP metrics reference and the :new-page:`StackDriver Monitored Resource Types <https://cloud.google.com/monitoring/api/resources>` reference. Use the ``monitored_resource`` dimension to determine which metric corresponds to a particular resource.

=======
Metrics
=======

These are the metrics available for the Google Cloud Platform integration.

Google App Engine metrics
=========================

.. raw:: html

   <div class="metrics-table" type="google-appengine" include="markdown"></div>

Google BigQuery metrics
=======================

.. raw:: html

   <div class="metrics-table" type="google-bigquery" include="markdown"></div>

Google Cloud Bigtable metrics
=============================

.. raw:: html

   <div class="metrics-table" type="google-cloud-bigtable" include="markdown"></div>

Google Cloud Datastore metrics
==============================

.. raw:: html

   <div class="metrics-table" type="google-cloud-datastore" include="markdown"></div>

Google Cloud Functions metrics
==============================

.. raw:: html

   <div class="metrics-table" type="google-cloud-functions" include="markdown"></div>

Google Cloud Pub/Sub metrics
============================

.. raw:: html

   <div class="metrics-table" type="google-cloud-pubsub" include="markdown"></div>

Google Cloud Router metrics
===========================

.. raw:: html

   <div class="metrics-table" type="google-cloud-router" include="markdown"></div>

Google Cloud Spanner metrics
============================

.. raw:: html

   <div class="metrics-table" type="google-cloud-spanner" include="markdown"></div>

Google Cloud Storage metrics
============================

.. raw:: html

   <div class="metrics-table" type="google-cloud-storage" include="markdown"></div>

Google Compute Engine metrics
=============================

.. raw:: html

   <div class="metrics-table" type="google-compute-engine" include="markdown"></div>

Google Container Engine metrics
===============================

.. raw:: html

   <div class="metrics-table" type="google-container-engine" include="markdown"></div>

Google Kubernetes Engine metrics
================================

.. raw:: html

   <div class="metrics-table" type="google-kubernetes-engine" include="markdown"></div>
