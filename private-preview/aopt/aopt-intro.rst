:orphan:

.. _aopt-intro:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
What is Application Optimization?
**********************************************************

Application Optimization is a component within Splunk Observability Cloud. It provides insights into the way you're allocating cloud-native infrastructure :new-page:`resources <https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/>` to your cloud-based services. With Application Optimization, you can identify resource overprovisioning that may be costing your organization extra money and underprovisioning that may be causing performance or reliability problems and costing your organization lost revenue or customer loyalty. Along with insights in the form of metrics, Application Optimization offers simple, immediate actions which you can take to right-size your resource allocations and to improve the overall performance and reliability of your services.

By using Application Optimization together with :new-page:`Splunk Infrastructure Monitoring (IM) <https://docs.splunk.com/observability/en/infrastructure/intro-to-infrastructure.html>`, FinOps teams, DevOps teams, and business leaders are empowered with a holistic view into the correlation between their cloud costs and their business objectives.


Key features
==========================================================

* :guilabel:`Kubernetes Profiler` (the :guilabel:`Application Optimization` dashboard) provides insights into the efficiency of your CPU and memory settings for your Kubernetes workloads. You can use the profiler to:

   * Obtain insight summaries by applying filters of your choice (environment, cluster, namespace, and so on).
   * Find the workloads most in need of attention based on your priorities, which could be performance, reliability, or cost savings.

* :guilabel:`Instant Recommendations` provide suggestions for CPU and memory settings based on historical utilization across all pods of a workload. Utilization data comes from the metrics you've sent to Splunk IM. You can apply these suggestions directly to your workloads using the YAML snippets it provides. For workloads that use autoscaling, it also suggests how to update the autoscaling configuration.


Requirements
==========================================================

* Supported cloud platforms:  Amazon Elastic Kubernetes Service (EKS). Since Application Optimization is a consumer of data you send to Splunk IM, see :new-page:`Splunk IM's statement on supported Amazon EKS versions <https://docs.splunk.com/observability/en/gdi/opentelemetry/collector-kubernetes/install-k8s.html#helm-chart-supported-distros>`.

* Supported Kubernetes workload kinds: Deployment, StatefulSet, DaemonSet

* Minimum amount of infrastructure metrics you must send to Splunk IM: 14 contiguous days. This isn't strictly a requirement because instant recommendationss are still generated for less data, but with lower confidence scores

* All metrics that the :new-page:`Splunk IM Kubernetes cluster receiver collects by default <https://docs.splunk.com/observability/en/gdi/opentelemetry/collector-kubernetes/install-k8s.html#helm-chart-supported-distros>` must be present in your data. Since these metrics are enabled by default on your Kubernetes collector you don't need to take any action unless you've disabled them. 

* Horizontal pod autoscaler (HPA) telemetry: Optional, but if you do have HPAs and you send :new-page:`k8s.hpa.* metrics <https://docs.splunk.com/observability/en/gdi/opentelemetry/components/kubernetes-cluster-receiver.html>` to Splunk IM, :guilabel:`Instant Recommendations` can help you to improve them.  See :ref:`aopt-workload-hpa`.


Enable Application Optimization
==========================================================

For those participating in the private preview, Splunk will enable Application Optimization on your Splunk Observability Cloud account for you.