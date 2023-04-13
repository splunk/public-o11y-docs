.. _auto-instrumentation-operator:

*****************************************************************************
Install the Collector with the Kubernetes Operator for Auto Instrumentation
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to easily add observability code to your application, enabling it to produce telemetry data.

You can use an Operator in a Kubernetes environment to implement and simplify the management of OpenTelemetry Auto Instrumentation of your applications. Learn more about :new-page:`the operator pattern in Kubernetes <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>`.

Requirements
================================================================

Operator Auto Instrumentation requires the following components: 

* The :ref:`Splunk OTel Collector chart <helm-chart>`: It deploys the collector and related resources, including the OpenTelemetry Operator.
* The OpenTelemetry Operator, an upstream implementation of the Kubernetes Operator that manages auto-instrumentation of Kubernetes applications. See more in the :new-page:`OpenTelemetry GH repo <https://github.com/open-telemetry/opentelemetry-operator>`.
* Instrumentation libraries to generate telemetry data when your application uses instrumented components.
* A Kubernetes instrumentation object ``opentelemetry.io/v1alpha1``, which configures auto-instrumentation settings for applications.

To learn more about how Auto Instrumentation works in Observability Cloud, see :new-page:`more detailed documentation in GH <https://github.com/jvoravong/splunk-otel-collector-chart/blob/OTL-1409/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.

Install the Operator
================================================================

To use the Operator for Auto Instrumentation, follow these steps:

#. Deploy OpenTelemetry components to your Kubernetes cluster including cert-manager, Splunk OTel Collector, OpenTelemetry Operator, and Auto-Instrumentation Spec.
#. Apply annotations at the pod or namespace level for the Operator to know which pods to apply auto-instrumentation to.
#. Next, allow the Operator to do the work. As Kuberenetes api requests for create and update annotated pods are processed, the Operator will intercept and alter those requests so that the internal pod application containers are instrumented.




