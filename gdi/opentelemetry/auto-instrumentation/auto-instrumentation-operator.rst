.. include:: /_includes/gdi/zero-config-preview-header.rst

.. _auto-instrumentation-operator:

*****************************************************************************
Splunk OpenTelemetry Auto Instrumentation with the Kubernetes Operator
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to easily add observability code to your application, enabling it to produce telemetry data.

You can use an operator in a Kubernetes environment to implement and simplify the management of OpenTelemetry Auto Instrumentation of your applications.

It requires the following components: 

* Splunk OTel Collector Chart: Deploys the collector and related resources, including the OpenTelemetry Operator.
* OpenTelemetry Operator: Manages auto-instrumentation of Kubernetes applications.
* Instrumentation Libraries: Generates telemetry data when your application uses instrumented components.
* Kubernetes Object - opentelemetry.io/v1alpha1 Instrumentation: Configures auto-instrumentation settings for applications.
* Splunk OTel Auto-instrumentation

Quick Start
================================================================

To use the operator for Auto Instrumentation, follow these steps:

#. Deploy OpenTelemetry components to your Kubernetes cluster including cert-manager, Splunk OTel Collector, OpenTelemetry Operator, and Auto-Instrumentation Spec.
#. Apply annotations at the pod or namespace level for the Operator to know which pods to apply auto-instrumentation to.
#. Next, allow the Operator to do the work. As Kuberenetes api requests for create and update annotated pods are processed, the Operator will intercept and alter those requests so that the internal pod application containers are instrumented.