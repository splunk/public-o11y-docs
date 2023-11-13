.. include:: /_includes/gdi/zero-config-preview-header.rst

.. _auto-instrumentation-nodejs-k8s:

************************************************************************************
Zero Configuration Automatic Instrumentation for Kubernetes Node.js applications
************************************************************************************

.. meta::
   :description: Use the Collector with the upstream Kubernetes Operator for automatic instrumentation to easily add observability code to your application, enabling it to produce telemetry data.

You can use the OTel Collector with an upstream Operator in a Kubernetes environment to automatically instrument your Node.js applications. 

.. note::
   For a specific example of how a customer automatically instruments a Node.js application, see :new-page:`https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/enable-operator-and-auto-instrumentation/otel-demo-nodejs.md`.

Requirements
================================================================

Zero Config Auto Instrumentation for Node.js requires the following components: 

* The :ref:`Splunk OTel Collector chart <helm-chart>`: It deploys the Collector and related resources, including the OpenTelemetry Operator.
* The OpenTelemetry Operator, which manages auto-instrumentation of Kubernetes applications. See more in the :new-page:`OpenTelemetry GitHub repo <https://github.com/open-telemetry/opentelemetry-operator>`.
* A Kubernetes instrumentation object ``opentelemetry.io/v1alpha1``, which configures auto-instrumentation settings for applications.

1. Set up the environment for instrumentation
------------------------------------------------------------

Create a namespace for your Node.js applications and deploy your Node.js applications to that namespace. 

.. code-block:: bash

   kubectl create namespace <namespace>

2. Deploy the Helm Chart with the Operator enabled
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

3. Verify all the OpenTelemetry resources are deployed successfully
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

4. Set annotations to instrument Node.js applications
------------------------------------------------------------

Activate and deactivate auto instrumentation for Node.js
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To activate auto instrumentation for your Node.js deployment, run the following command:

.. code-block:: bash

   kubectl patch deployment <deployment_name> -n <namespace> -p '{"spec": {"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-nodejs":"<splunk_otel_collector_namespace>/splunk-otel-collector"}}}} }'

.. note::
   * The deployment pod will restart after running this command.
   * If the chart is not installed in the "default" namespace, modify the annotation value to be "{chart_namespace}/splunk-otel-collector".

To deactivate auto instrumentation for your Node.js deployment, run the following command:

.. code-block:: bash

   kubectl patch deployment <deployment_name> -n <namespace> --type=json -p='[{"op": "remove", "path": "/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-nodejs"}]'

Verify instrumentation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To verify that the instrumentation was successful, run the following command on an individual pod. Your instrumented pod should contain an initContainer named ``opentelemetry-auto-instrumentation`` and the target application container should have several ``OTEL_*`` environment variables similar to those in the output below.

.. code-block:: bash

   kubectl describe pod -n otel-demo -l app.kubernetes.io/name=opentelemetry-demo-frontend
   # Name:             opentelemetry-demo-frontend-57488c7b9c-4qbfb
   # Namespace:        otel-demo
   # Annotations:      instrumentation.opentelemetry.io/inject-nodejs: default/splunk-otel-collector
   # Status:           Running
   # Init Containers:
   #   opentelemetry-auto-instrumentation:
   #     Command:
   #       cp
   #       -a
   #       /autoinstrumentation/.
   #       /otel-auto-instrumentation/
   #     State:          Terminated
   #       Reason:       Completed
   #       Exit Code:    0
   # Containers:
   #   frontend:
   #     State:          Running
   #     Ready:          True
   #     Environment:
   #       FRONTEND_PORT:                              8080
   #       FRONTEND_ADDR:                              :8080
   #       AD_SERVICE_ADDR:                            opentelemetry-demo-adservice:8080
   #       CART_SERVICE_ADDR:                          opentelemetry-demo-cartservice:8080
   #       CHECKOUT_SERVICE_ADDR:                      opentelemetry-demo-checkoutservice:8080
   #       CURRENCY_SERVICE_ADDR:                      opentelemetry-demo-currencyservice:8080
   #       PRODUCT_CATALOG_SERVICE_ADDR:               opentelemetry-demo-productcatalogservice:8080
   #       RECOMMENDATION_SERVICE_ADDR:                opentelemetry-demo-recommendationservice:8080
   #       SHIPPING_SERVICE_ADDR:                      opentelemetry-demo-shippingservice:8080
   #       WEB_OTEL_SERVICE_NAME:                      frontend-web
   #       PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT:  http://localhost:8080/otlp-http/v1/traces
   #       NODE_OPTIONS:                                --require /otel-auto-instrumentation/autoinstrumentation.js
   #       SPLUNK_OTEL_AGENT:                           (v1:status.hostIP)
   #       OTEL_SERVICE_NAME:                          opentelemetry-demo-frontend
   #       OTEL_EXPORTER_OTLP_ENDPOINT:                http://$(SPLUNK_OTEL_AGENT):4317
   #       OTEL_RESOURCE_ATTRIBUTES_POD_NAME:          opentelemetry-demo-frontend-57488c7b9c-4qbfb (v1:metadata.name)
   #       OTEL_RESOURCE_ATTRIBUTES_NODE_NAME:          (v1:spec.nodeName)
   #       OTEL_PROPAGATORS:                           tracecontext,baggage,b3
   #       OTEL_RESOURCE_ATTRIBUTES:                   splunk.zc.method=autoinstrumentation-nodejs:0.41.1,k8s.container.name=frontend,k8s.deployment.name=opentelemetry-demo-frontend,k8s.namespace.name=otel-demo,k8s.node.name=$(OTEL_RESOURCE_ATTRIBUTES_NODE_NAME),k8s.pod.name=$(OTEL_RESOURCE_ATTRIBUTES_POD_NAME),k8s.replicaset.name=opentelemetry-demo-frontend-57488c7b9c,service.version=1.5.0-frontend
   #     Mounts:
   #       /otel-auto-instrumentation from opentelemetry-auto-instrumentation (rw)
   # Volumes:
   #   opentelemetry-auto-instrumentation:
   #     Type:        EmptyDir (a temporary directory that shares a pod's lifetime)

5. View results at Splunk Observability APM
------------------------------------------------------------

Allow the Operator to do the work. The Operator intercepts and alters the Kubernetes API requests to create and update annotated pods, the internal pod application containers are instrumented, and trace and metrics data populates the :ref:`APM dashboard <apm-dashboards>`. 

Learn more
===========================================================================

* To learn more about how Zero Config Auto Instrumentation works in Splunk Observability Cloud, see :new-page:`more detailed documentation in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* Refer to :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.

