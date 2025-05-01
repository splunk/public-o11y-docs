:orphan:

.. _aopt-intro:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
What is Application Optimization?
**********************************************************

Application Optimization is a component within Splunk Observability Cloud. It provides insights into the way you're allocating cloud-native infrastructure :new-page:`resources <https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/>` to your cloud-based services. With Application Optimization you can identify resource overprovisioning which may be costing your organization extra money, and underprovisioning which may be causing performance or reliability problems and costing your organization lost revenue or customer loyalty. Along with insights in the form of metrics, Application Optimization offers simple, immediate actions which you can take to right-size your resource allocations and to improve the overall performance and reliability of your services.

By using Application Optimization together with :new-page:`Splunk Infrastructure Monitoring (IM) <https://docs.splunk.com/observability/en/infrastructure/intro-to-infrastructure.html>`, FinOps teams, DevOps teams, and business leaders are empowered with a holistic view into the correlation between their cloud spend and their business objectives.


Key features
==========================================================

* :guilabel:`Kubernetes Profiler` (the :guilabel:`Application Optimization` dashboard) provides comprehensive insights into the efficiency of your CPU and memory settings for your Kubernetes workloads.	

* :guilabel:`Instant Recommendations` provide suggestions for CPU and memory settings based on historical utilization data (metrics you've sent to Splunk IM). You can apply these suggestions directly to your pods using the YAML snippets it provides. 


Requirements
==========================================================

* Supported cloud platforms:  Amazon Elastic Kubernetes Service (EKS). Since Application Optimization is a consumer of data you send to Splunk IM, see :new-page:`Splunk IM's statement on supported Amazon EKS versions <https://docs.splunk.com/observability/en/gdi/opentelemetry/collector-kubernetes/install-k8s.html#helm-chart-supported-distros>`.

* Supported Kubernetes workload kinds: Deployment, StatefulSet, DaemonSet

* Minimum amount of infrastructure metrics sent to Splunk IM: 14 days

* All metrics that the :new-page:`Splunk IM Kubernetes cluster receiver collects by default <https://docs.splunk.com/observability/en/gdi/opentelemetry/collector-kubernetes/install-k8s.html#helm-chart-supported-distros>` must be present in your data. Since these metrics are enabled by default on your Kubernetes collector you don't need to take any action unless you've disabled them. 

* Horizontal pod autoscaler (HPA) telemetry: Optional, but if you do have HPAs and you send :new-page:`k8s.hpa.* metrics <https://docs.splunk.com/observability/en/gdi/opentelemetry/components/kubernetes-cluster-receiver.html>` to Splunk IM, :guilabel:`Instant Recommendations` can help you to improve them.


Enable Application Optimization
==========================================================

For those participating in the private preview, Splunk will enable Application Optimization on your Splunk Observability Cloud account for you.