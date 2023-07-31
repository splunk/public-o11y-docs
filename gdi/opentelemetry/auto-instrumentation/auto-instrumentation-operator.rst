.. _auto-instrumentation-operator:

***************************************************************************************************
Install the Collector and the upstream Kubernetes Operator for Auto Instrumentation
***************************************************************************************************

.. meta::
   :description: Use the Collector with the upstream Kubernetes Operator for automatic instrumentation to easily add observability code to your application, enabling it to produce telemetry data.

You can use the OTel Collector with an upstream Operator in a Kubernetes environment to implement and simplify the management of OpenTelemetry Auto Instrumentation of your applications. 

.. caution:: This instance of the Kubernetes Operator is part of the upstream OpenTelemetry Collector Contrib project. It's not related to the Splunk Operator for Kubernetes, which is used to deploy and operate Splunk Enterprise deployments in a Kubernetes infrastructure. 

Requirements
================================================================

Operator Auto Instrumentation requires the following components: 

* The :ref:`Splunk OTel Collector chart <helm-chart>`: It deploys the Collector and related resources, including the OpenTelemetry Operator.
* The OpenTelemetry Operator, which manages auto-instrumentation of Kubernetes applications. See more in the :new-page:`OpenTelemetry GitHub repo <https://github.com/open-telemetry/opentelemetry-operator>`.
* Instrumentation libraries generate telemetry data when your application uses instrumented components.
* A Kubernetes instrumentation object ``opentelemetry.io/v1alpha1``, which configures auto-instrumentation settings for applications.

Install the Collector using the Kubernetes Operator  
===========================================================================

To use the Operator for Auto Instrumentation, follow these steps:

#. Deploy the Helm chart with the required components, including the Operator, to your Kubernetes cluster. 

#. Verify the deployed resources are working correctly. 

#. Apply annotations at the pod or namespace level for the Operator to know which pods to apply auto-instrumentation to.   

#. Check out the results at Splunk Observability APM.

1. Deploy the Helm Chart with the Operator enabled
------------------------------------------------------------

Deploy the :ref:`Collector for Kubernetes with the Helm chart <helm-chart>` with ``operator.enabled=true`` to include the Operator in the deployment.

Ingest traces
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In order to be properly ingest trace telemetry data, the attribute ``environment`` must be on board the exported traces. There are two ways to set this attribute:

* Use the `values.yaml` optional environment configuration.
* Use the Instrumentation spec with the environment variable ``OTEL_RESOURCE_ATTRIBUTES``.

Add certifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Operator requires certain TLS cerificates to work. If a certification manager (or any other TLS certificate source) is not available in the cluster, then you'll need to deploy it using ``certmanager.enabled=true``. You can use the following commands to run these steps.

.. code-block:: yaml

   # Check if cert-manager is already installed, don't deploy a second cert-manager.
   kubectl get pods -l app=cert-manager --all-namespaces

   # If cert-manager is not deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set certmanager.enabled=true,operator.enabled=true,environment=dev -n monitoring helm-charts/splunk-otel-collector

   # If cert-manager is already deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set operator.enabled=true,environment=dev -n monitoring helm-charts/splunk-otel-collector

2. Verify all the OpenTelemetry resources are deployed successfully
---------------------------------------------------------------------------

Resources include the Collector, the Operator, webhook, an instrumentation.

Run the following to verify the resources are deployed correctly:

.. code-block:: yaml
   
   kubectl  get pods -n monitoring
   # NAME                                                          READY
   # NAMESPACE     NAME                                                            READY   STATUS
   # monitoring    splunk-otel-collector-agent-lfthw                               2/2     Running
   # monitoring    splunk-otel-collector-cert-manager-6b9fb8b95f-2lmv4             1/1     Running
   # monitoring    splunk-otel-collector-cert-manager-cainjector-6d65b6d4c-khcrc   1/1     Running
   # monitoring    splunk-otel-collector-cert-manager-webhook-87b7ffffc-xp4sr      1/1     Running
   # monitoring    splunk-otel-collector-k8s-cluster-receiver-856f5fbcf9-pqkwg     1/1     Running
   # monitoring    splunk-otel-collector-opentelemetry-operator-56c4ddb4db-zcjgh   2/2     Running

   kubectl get mutatingwebhookconfiguration.admissionregistration.k8s.io -n monitoring
   # NAME                                      WEBHOOKS   AGE
   # splunk-otel-collector-cert-manager-webhook              1          14m
   # splunk-otel-collector-opentelemetry-operator-mutation   3          14m

   kubectl get otelinst -n {target_application_namespace}
   # NAME                          AGE   ENDPOINT
   # splunk-instrumentation        3m   http://$(SPLUNK_OTEL_AGENT):4317

3. Set annotations to instrument applications
------------------------------------------------------------

You can add an ``instrumentation.opentelemetry.io/inject-{instrumentation_library}`` annotation to the following:

* Namespace: All pods within that namespace will be instrumented.
* Pod Spec Objects: PodSpec objects that are available as part of Deployment, Statefulset, or other resources can be annotated.

Instrumentation annotations can have the following values:

* ``"true"``: Inject, and the Instrumentation resource from the namespace to use.
* ``"my-instrumentation"``: Name of Instrumentation CR instance in the current namespace to use.
* ``"my-other-namespace/my-instrumentation"``: Name and namespace of Instrumentation CR instance in another namespace to use.
* ``"false"``: Do not inject.

Sample annotations include:

* ``instrumentation.opentelemetry.io/inject-java: "true"``
* ``instrumentation.opentelemetry.io/inject-dotnet: "true"``
* ``instrumentation.opentelemetry.io/inject-nodejs: "true"``
* ``instrumentation.opentelemetry.io/inject-python: "true"``

4. Check out the results at Splunk Observability APM
------------------------------------------------------------

Allow the Operator to do the work. The Operator intercepts and alters the Kubernetes API requests to create and update annotated pods, the internal pod application containers are instrumented, and trace and metrics data populates the :ref:`APM dashboard <apm-dashboards>`. 

Learn more
===========================================================================

* See :ref:`auto-instrumentation-java-operator`.
* To learn more about how Auto Instrumentation works in Splunk Observability Cloud, see :new-page:`more detailed documentation in GH <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* Refer to :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.