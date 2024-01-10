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

Deploy the Helm Chart with the Operator enabled
=================================================================

Add certifications and deploy the Helm Chart
-----------------------------------------------------

The Operator requires certain TLS certificates to work. Use the following command to check whether a certification manager is available:

.. code-block:: yaml

   # Check if cert-manager is already installed, don't deploy a second cert-manager.
   kubectl get pods -l app=cert-manager --all-namespaces

If a certification manager (or any other TLS certificate source) is not available in the cluster, then you'll need to deploy it using ``certmanager.enabled=true``. Use the following commands to deploy the Helm Chart.

.. code-block:: yaml 

   # If cert-manager is not deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set certmanager.enabled=true,operator.enabled=true,environment=prd -n monitoring splunk-otel-collector-chart/splunk-otel-collector

   # If cert-manager is already deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set operator.enabled=true,environment=prd -n monitoring splunk-otel-collector-chart/splunk-otel-collector

.. _zeroconfig-nodejs-traces:

Ingest traces
------------------------------------------------

To properly ingest trace telemetry data, the attribute ``deployment.environment`` must be onboard the exported traces. The following table demonstrates the different methods for setting this attribute:

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 33 33 33

  * - Method
    - Scope
    - Implementation
  * - Through the ``values.yaml`` file ``environment`` configuration
    - Applies the attribute to all telemetry data (metrics, logs, traces) exported through the collector.
    - The chart will set an attribute processor to add ``deployment.environment=prd`` to all telemetry data processed by the collector.
  * - Through the ``values.yaml`` file and ``operator.instrumentation.spec.env`` or ``operator.instrumentation.spec.{instrumentation_library}.env`` configuration
    - Allows you to set ``deployment.environment`` either for all auto-instrumented applications collectively or per auto-instrumentation language.
    - Add the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable, setting its value to ``deployment.environment=prd``.
  * - Through your Kubernetes application deployment, daemonset, or pod specification
    - Allows you to set ``deployment.environment`` at the level of individual deployments, daemonsets, or pods.
    - Employ the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable, assigning the value ``deployment.environment=prd``.

The following examples demonstrate how to set the attribute using each method:

.. tabs::

    .. tab:: Environment option


      Set the ``environment`` option in the ``values.yaml`` file. This adds the ``deployment.environment`` attribute to all telemetry data the Collector receives, including data from automatically-instrumented pods.

      .. code-block:: yaml

          environment: prd

    .. tab:: Instrumentation spec

      Add the environment variable to the ``values.yaml`` instrumentation spec as shown in the following example code. This method adds the ``deployment.environment`` attribute to all telemetry data from automatically-instrumented pods.

      .. code-block:: yaml

          operator:
            enabled: true
            instrumentation:
              spec:
                env: 
                  - name: OTEL_RESOURCE_ATTRIBUTES
                    value: "deployment.environment=prd"
                nodejs:
                  env: 
                    - name: OTEL_RESOURCE_ATTRIBUTES
                      value: "deployment.environment=prd-canary-nodejs"

    .. tab:: Deployment YAML

      Update the application deployment YAML file. This method adds the ``deployment.environment`` attribute to all telemetry data from pods that contain the specified environment variable.

         .. code-block:: yaml

            apiVersion: apps/v1
            kind: Deployment
            metadata:
            name: my-nodejs-app
            spec:
            template:
               spec:
                  containers:
                  - name: my-nodejs-app
                  image: my-nodejs-app:latest
                  env:
                  - name: OTEL_RESOURCE_ATTRIBUTES
                    value: "deployment.environment=prd"

    .. tab:: kubectl

      Update the environment variable ``OTEL_RESOURCE_ATTRIBUTES`` using ``kubectl set env``. For example:

      .. code-block:: bash
        
          kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=environment=prd

Verify all the OpenTelemetry resources are deployed successfully
==========================================================================

Resources include the Collector, the Operator, webhook, and instrumentation.

Run the following commands to verify the resources are deployed correctly:

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

   kubectl get otelinst -n <target_application_namespace>
   # NAME                          AGE   ENDPOINT
   # splunk-instrumentation        3m   http://$(SPLUNK_OTEL_AGENT):4317

Set annotations to instrument Node.js applications
==============================================================

You can activate auto instrumentation for Node.js applications before runtime.

If the related Kubernetes object (deployment, daemonset, or pod) is not deployed, add the ``instrumentation.opentelemetry.io/inject-nodejs`` annotation to the application object YAML.

For example, given the following deployment YAML:

.. code-block:: yaml

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: my-nodejs-app
      namespace: monitoring
    spec:
      template:
        spec:
          containers:
          - name: my-nodejs-app
            image: my-nodejs-app:latest

Activate auto instrumentation by adding ``instrumentation.opentelemetry.io/inject-nodejs: "true"`` to the ``spec``:

.. code-block:: yaml
    :emphasize-lines: 10

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: my-nodejs-app
      namespace: monitoring
    spec:
      template:
        metadata:
          annotations:
            instrumentation.opentelemetry.io/inject-nodejs: "true"
        spec:
          containers:
          - name: my-nodejs-app
            image: my-nodejs-app:latest

To deactivate automatic instrumentation, remove the annotation. The following command removes the annotation for automatic instrumentation, deactivating it:

.. code-block:: bash

   kubectl patch deployment <my-deployment> -n <my-namespace> --type=json -p='[{"op": "remove", "path": "/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-nodejs"}]'

Verify instrumentation
--------------------------------------------------------------

To verify that the instrumentation was successful, run the following command on an individual pod:

.. code-block:: bash

   kubectl describe pod <application_pod_name> -n <namespace>

Instrumented pods contain an initContainer named ``opentelemetry-auto-instrumentation`` and the target application container should have several ``OTEL_*`` environment variables similar to those in the following demo output:

.. code-block:: bash

   # Name:             opentelemetry-demo-frontend-57488c7b9c-4qbfb
   # Namespace:        otel-demo
   # Annotations:      instrumentation.opentelemetry.io/inject-nodejs: true
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

View results at Splunk Observability APM
==========================================================

Allow the Operator to do the work. The Operator intercepts and alters the Kubernetes API requests to create and update annotated pods, the internal pod application containers are instrumented, and trace and metrics data populates the :ref:`APM dashboard <apm-dashboards>`.

.. _configure-js-zeroconfig-k8s:

(Optional) Configure the instrumentation
==========================================================

You can configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

You can add advanced configuration like activating custom sampling and including custom data in the reported spans with environment variables and Node.js system properties. To do so, use the ``values.yaml`` file and  ``operator.instrumentation.sampler`` configuration. For more information, see the :new-page:`documentation in GitHub <https://github.com/open-telemetry/opentelemetry-operator/blob/main/docs/api.md#instrumentationspecsampler>` and :new-page:`example in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/enable-operator-and-auto-instrumentation/instrumentation/instrumentation-add-trace-sampler.yaml>`.

For example, if you want every span to include the key-value pair ``build.id=feb2023_v2``, set the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable.

  .. code-block:: bash
    
     kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=build.id=feb2023_v2

You can also use the methods shown in :ref:`zeroconfig-nodejs-traces` to configure your instrumentation with the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable and other environment variables.

See :ref:`advanced-nodejs-otel-configuration` for the full list of supported environment variables.

Learn more
===========================================================================

* To learn more about how Zero Config Auto Instrumentation works in Splunk Observability Cloud, see :new-page:`more detailed documentation in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* Refer to :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.

