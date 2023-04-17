.. _auto-instrumentation-operator:

*****************************************************************************
Install the Collector with the Kubernetes Operator for Auto Instrumentation
*****************************************************************************

.. meta::
   :description: Use the Collector with the Kubernetes Operator for automatic instrumentation to easily add observability code to your application, enabling it to produce telemetry data.

You can use an Operator in a Kubernetes environment to implement and simplify the management of OpenTelemetry Auto Instrumentation of your applications. 

Requirements
================================================================

Operator Auto Instrumentation requires the following components: 

* The :ref:`Splunk OTel Collector chart <helm-chart>`: It deploys the collector and related resources, including the OpenTelemetry Operator.
* The OpenTelemetry Operator, an upstream implementation of the Kubernetes Operator that manages auto-instrumentation of Kubernetes applications. See more in the :new-page:`OpenTelemetry GH repo <https://github.com/open-telemetry/opentelemetry-operator>`.
* Instrumentation libraries to generate telemetry data when your application uses instrumented components.
* A Kubernetes instrumentation object ``opentelemetry.io/v1alpha1``, which configures auto-instrumentation settings for applications.

Install the Collector with the Kubernetes Operator  
===========================================================================

To use the Operator for Auto Instrumentation, follow these steps:

#. Deploy the Helm chart with the required components, including the Operator, to your Kubernetes cluster. 

#. Deploy the Auto Instrumentation libraries. 

#. Verify the deployments are working correctly. 

#. Apply annotations at the pod or namespace level for the Operator to know which pods to apply auto-instrumentation to.   

#. Check out the results at Splunk Observability APM.

1. Deploy the Helm Chart with the Operator enabled
------------------------------------------------------------

Deploy the :ref:`Collector for Kubernetes with the Helm chart <helm-chart>` with ``operator.enabled=true`` to include the Operator in the deployment.

Add certifications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Operator requires certain TLS cerificates to work. If a certification manager (or any other TLS certificate source) is not available in the cluster, then you'll need to deploy it using ``certmanager.enabled=true``. You can use the commands below to run these steps.

.. code-block:: yaml

   # Check if cert-manager is already installed, don't deploy a second cert-manager.
   kubectl get pods -l app=cert-manager --all-namespaces

   # If cert-manager is not deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set certmanager.enabled=true,operator.enabled=true,environment=dev -n monitoring helm-charts/splunk-otel-collector

   # If cert-manager is already deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set operator.enabled=true,environment=dev -n monitoring helm-charts/splunk-otel-collector

Ingest traces
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In order to be properly ingest trace telemetry data, the attribute ``deployment.environment`` must be on board the exported traces. There are two ways to set this attribute:

* Use the values.yaml optional environment configuration.
* Use the Instrumentation spec with the environment variable ``OTEL_RESOURCE_ATTRIBUTES``.

2. Deploy Auto Instrumentation
------------------------------------------------------------

Deploy ``opentelemetry.io/v1alpha1``, an instrumentation object with specifications on how to configure the instrumentation libraries to use for instrumentation. It must be available to the target pod for auto-instrumentation to function. 

For example:

.. code-block:: yaml

   # splunk-instrumentation.yaml
   apiVersion: opentelemetry.io/v1alpha1
   kind: Instrumentation
   metadata:
      name: splunk-instrumentation
   spec:
      exporter:
         endpoint: http://$(SPLUNK_OTEL_AGENT):4317
      propagators:
         - tracecontext
         - baggage
         - b3
      env:
         - name: SPLUNK_OTEL_AGENT
           valueFrom:
            fieldRef:
               apiVersion: v1
               fieldPath: status.hostIP

   # Install
   kubectl apply -f splunk-instrumentation.yaml

   # Check the current deployed values
   kubectl get otelinst -o yaml

3. Verify all the OpenTelemetry resources are deployed successfully
---------------------------------------------------------------------------

Resources include the Collector, the Operator, webhook, an instrumentation.

Run the following:

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

   kubectl get otelinst -n spring-petclinic
   # NAME                          AGE   ENDPOINT
   # splunk-instrumentation        3m   http://$(SPLUNK_OTEL_AGENT):4317

4. Set annotations to instrument applications
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

5. Check out the results at Splunk Observability APM
------------------------------------------------------------

Allow the Operator to do the work. The Operator intercepts and alters the Kuberenetes API requests to create and update annotated pods, the internal pod application containers are instrumented, and trace and metrics data populates the :ref:`APM dashboard <apm-dashboards>`. 

Learn more
===========================================================================

* See :ref:`auto-instrumentation-java-operator`.
* To learn more about how Auto Instrumentation works in Observability Cloud, see :new-page:`more detailed documentation in GH <https://github.com/jvoravong/splunk-otel-collector-chart/blob/OTL-1409/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* Refer to :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.