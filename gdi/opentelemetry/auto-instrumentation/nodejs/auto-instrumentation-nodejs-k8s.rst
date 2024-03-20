.. _auto-instrumentation-nodejs-k8s:

************************************************************************************
Zero Configuration Automatic Instrumentation for Kubernetes Node.js applications
************************************************************************************

.. meta::
   :description: Use the Collector with the upstream Kubernetes Operator for automatic instrumentation to easily add observability code to your application, enabling it to produce telemetry data.

Use the OTel Collector with the Operator in a Kubernetes environment to automatically instrument your Node.js applications. By using zero configuration automatic instrumentation, you can quickly send Node.js application data to Splunk APM without configuring the OpenTelemetry Collector or changing your application code.

To install zero configuration automatic instrumentation for Node.js, complete the following steps:

#. :ref:`Deploy the Helm Chart with the Kubernetes Operator <deploy-helm-chart-nodejs-k8s>`
#. :ref:`Verify all OpenTelemetry resources are deployed correctly <nodejs-k8s-verify-resources>`
#. :ref:`Set annotations to instrument Node.js applications <nodejs-k8s-set-annotations>`
#. :ref:`View results in Splunk APM <nodejs-k8s-view-results>`

Requirements
================================================================

Zero Config Auto Instrumentation for Node.js requires the following components: 

* Node.js version 14 or higher and supported libraries. See :ref:`nodejs-otel-requirements` for more information.
* Your Splunk Observability Cloud realm and access token with ingest scope. For more information, see :ref:`admin-org-tokens`.

.. _deploy-helm-chart-nodejs-k8s:

\1. Deploy the Helm Chart with the Kubernetes Operator
=================================================================

To deploy the Helm Chart, create a file called values.yaml. In this file, you can define the settings to activate or deactivate when installing the OpenTelemetry Collector with the Helm Chart.

Populate values.yaml with the following fields and values:

.. code-block:: yaml

  clusterName: <your_cluster_name>

  # Your Splunk Observability Cloud realm and access token
  splunkObservability:
    realm: <splunk_realm>
    accessToken: <splunk_access_token>
  
  # Activates the OpenTelemetry Kubernetes Operator
  operator:
    enabled: true

You might need to populate the file with additional values depending on your environment. See :ref:`nodejs-add-certificates` and :ref:`zeroconfig-nodejs-traces` for more information.

.. _nodejs-add-certificates:

Add certificates
----------------------------------------

The Operator requires certain TLS certificates to work. Use the following command to check whether a certification manager is available:

.. code-block:: yaml

   # Check if cert-manager is already installed, don't deploy a second cert-manager.
   kubectl get pods -l app=cert-manager --all-namespaces

If a certification manager isn't available in the cluster, then you'll need to add ``certmanager.enabled=true`` to your values.yaml file. For example:

.. code-block:: yaml
  :emphasize-lines: 7,8

  clusterName: my-cluster

  splunkObservability:
    realm: <splunk_realm>
    accessToken: <splunk_access_token>
  
  certmanager:
    enabled: true
  operator:
    enabled: true

.. _zeroconfig-nodejs-traces:

Set the deployment environment
------------------------------------------------

To properly ingest trace telemetry data, the attribute ``deployment.environment`` must be onboard the exported traces. The following table demonstrates the different methods for setting this attribute:

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 33 33 33

  * - Method
    - Scope
    - Implementation
  * - Through the values.yaml file ``environment`` configuration
    - Applies the attribute to all telemetry data (metrics, logs, traces) exported through the collector.
    - The chart will set an attribute processor to add ``deployment.environment=prd`` to all telemetry data processed by the collector.
  * - Through the values.yaml file and ``operator.instrumentation.spec.env`` or ``operator.instrumentation.spec.{instrumentation_library}.env`` configuration
    - Allows you to set ``deployment.environment`` either for all auto-instrumented applications collectively or per auto-instrumentation language.
    - Add the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable, setting its value to ``deployment.environment=prd``.
  * - Through your Kubernetes application deployment, daemonset, or pod specification
    - Allows you to set ``deployment.environment`` at the level of individual deployments, daemonsets, or pods.
    - Employ the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable, assigning the value ``deployment.environment=prd``.

The following examples show how to set the attribute using each method:

.. tabs::

    .. tab:: Environment option


      Set the ``environment`` option in the values.yaml file. This adds the ``deployment.environment`` attribute to all telemetry data the Collector receives, including data from automatically-instrumented pods.

      .. code-block:: yaml
        :emphasize-lines: 7

          clusterName: my-cluster

          splunkObservability:
            realm: <splunk_realm>
            accessToken: <splunk_access_token>
          
          environment: prd
          
          certmanager:
            enabled: true
          operator:
            enabled: true

    .. tab:: Instrumentation spec

      Add the environment variable to the values.yaml instrumentation spec as shown in the following example code. This method adds the ``deployment.environment`` attribute to all telemetry data from automatically-instrumented pods.

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

.. _k8s-nodejs-deploy-command:

Deploy the Helm Chart
---------------------------------

After configuring values.yaml, use the following command to deploy the Helm Chart:

.. code-block:: bash

   helm install splunk-otel-collector -f ./values.yaml splunk-otel-collector-chart/splunk-otel-collector --namespace monitoring

You can change the name of the Collector instance and the namespace in which you install the Collector. 

For example, to change the name of the Collector instance to ``otel-collector`` and install it in the ``o11y`` namespace, use the following command:

.. code-block:: bash

   helm install otel-collector -f ./values.yaml splunk-otel-collector-chart/splunk-otel-collector --namespace o11y

.. _nodejs-k8s-verify-resources:

\2. Verify all the OpenTelemetry resources are deployed successfully
==========================================================================

Helm deploys the OpenTelemetry resources as Kubernetes pods. These resources include the Collector, the Operator, webhook, and instrumentation. 

Each resource has a prefix containing the helm release name that you set in :ref:`k8s-nodejs-deploy-command`. For example, if you set the Collector instance name to ``otel-collector``, each pod name is prefixed with ``otel-collector``.

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

The pods running in your namespace must include the following:

.. code-block:: yaml

   kubectl get mutatingwebhookconfiguration.admissionregistration.k8s.io -n monitoring
   # NAME                                      WEBHOOKS   AGE
   # splunk-otel-collector-cert-manager-webhook              1          14m
   # splunk-otel-collector-opentelemetry-operator-mutation   3          14m

The namespace must have a running instance of the OpenTelemetry Collector. The name of this Collector instance matches the name that you set in :ref:`k8s-nodejs-deploy-command`.

.. code-block:: yaml

   kubectl get otelinst -n <target_application_namespace>
   # NAME                          AGE   ENDPOINT
   # splunk-instrumentation        3m   http://$(SPLUNK_OTEL_AGENT):4317

.. _nodejs-k8s-set-annotations:

\3. Set annotations to instrument Node.js applications
==============================================================

You can activate auto instrumentation for Node.js applications before runtime.

If the related Kubernetes object (deployment, daemonset, or pod) is not deployed, add the ``instrumentation.opentelemetry.io/inject-nodejs: "true"`` annotation to the application object YAML.

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

Applying annotations in a different namespace
------------------------------------------------

If the current namespace isn't ``monitoring``, change the annotation to specify the namespace in which you installed the OpenTelemetry Collector. 

For example, if the current namespace is ``<my-namespace>`` and you installed the Collector in ``monitoring``, set the annotation to ``"instrumentation.opentelemetry.io/inject-nodejs": "monitoring/splunk-otel-collector"``:

.. code-block:: bash

   kubectl patch deployment <my-deployment> -n <my-namespace> -p '{"spec":{"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-nodejs":"monitoring/splunk-otel-collector"}}}}}'

Deactivate automatic instrumentation
-------------------------------------------------

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

.. _nodejs-k8s-view-results:

\4. View results at Splunk Observability APM
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

See :ref:`advanced-config-auto-instrumentation` for more information.

.. _troubleshooting-zeroconfig-nodejs-k8s:

.. include:: /_includes/gdi/troubleshoot-zeroconfig-k8s.rst

Learn more
===========================================================================

* To learn more about how Zero Config Auto Instrumentation works in Splunk Observability Cloud, see :new-page:`more detailed documentation in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* See :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.

