.. _auto-instrumentation-dotnet-k8s:

*****************************************************************************
Zero Configuration Auto Instrumentation for Kubernetes .NET applications
*****************************************************************************

.. meta::
   :description: Use the Collector with the upstream Kubernetes Operator for automatic instrumentation to easily add observability code to your application, enabling it to produce telemetry data.

You can use the OTel Collector with an upstream Operator in a Kubernetes environment to automatically instrument your .NET applications. 

Requirements
================================================================

Zero Config Auto Instrumentation for .NET requires the following components: 

* The :ref:`Splunk OTel Collector chart <helm-chart>`: It deploys the Collector and related resources, including the OpenTelemetry Operator.
* The OpenTelemetry Operator, which manages auto-instrumentation of Kubernetes applications. See more in the :new-page:`OpenTelemetry GitHub repo <https://github.com/open-telemetry/opentelemetry-operator>`.
* A Kubernetes instrumentation object ``opentelemetry.io/v1alpha1``, which configures auto-instrumentation settings for applications.

Deploy the Helm Chart with the Operator enabled
=========================================================

Add certifications and deploy the Helm Chart
--------------------------------------------------------

The Operator requires certain TLS certificates to work. Use the following command to check whether a certification manager is available:

.. code-block:: yaml

   # Check if cert-manager is already installed, don't deploy a second cert-manager.
   kubectl get pods -l app=cert-manager --all-namespaces

If a certification manager (or any other TLS certificate source) is not available in the cluster, then you'll need to deploy it using ``certmanager.enabled=true``. Use the following commands to deploy the Helm Chart.

.. code-block:: yaml 

   # If cert-manager is not deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set certmanager.enabled=true,operator.enabled=true,environment=dev -n monitoring splunk-otel-collector-chart/splunk-otel-collector
   
   # If cert-manager is already deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set operator.enabled=true,environment=dev -n monitoring splunk-otel-collector-chart/splunk-otel-collector

.. _zeroconfig-dotnet-traces:

Ingest traces
------------------------------------------------

In order to be properly ingest trace telemetry data, the attribute ``environment`` must be on board the exported traces. There are three ways to set this attribute:

* Update the environment variable ``OTEL_RESOURCE_ATTRIBUTES``. For example:

   .. code-block:: bash

      kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=environment=prod

* Use the ``values.yaml`` optional environment configuration. You can set the variable globally or set the environment variable by using the instrumentation spec.

.. tabs::

    .. tab:: ``values.yaml``

      Add the environment variable using the ``extraEnvs`` option in the ``values.yaml`` file. This adds the ``deployment.environment`` attribute to all telemetry data the Collector receives, including data from automatically-instrumented pods.

      .. code-block:: yaml

          extraEnvs: [OTEL_RESOURCE_ATTRIBUTES=deployment.environment=prod]

    .. tab:: ``values.yaml`` (Instrumentation spec)

      Add the environment variable to the ``instrumentation`` spec as shown in the following example code. This method adds the ``deployment.environment`` attribute to all telemetry data from automatically-instrumented pods.

      .. code-block:: yaml

          operator:
            enabled: true
            instrumentation:
              spec:
                env: 
                  - name: OTEL_RESOURCE_ATTRIBUTES
                    value: "deployment.environment=prod"
                dotnet:
                  env: 
                    - name: OTEL_RESOURCE_ATTRIBUTES
                      value: "deployment.environment=prd-canary-dotnet"

* Update the application deployment YAML file. This method adds the ``deployment.environment`` attribute to all telemetry data from pods that contain the specified environment variable.

    .. code-block:: yaml

      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: my-dotnet-app
      spec:
        template:
          spec:
            containers:
            - name: my-dotnet-app
              image: my-dotnet-app:latest
              env:
              - name: OTEL_RESOURCE_ATTRIBUTES
                value: "deployment.environment=prod"

Verify all the OpenTelemetry resources are deployed successfully
==========================================================================

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

Set annotations to instrument .NET applications
===================================================================

You can activate auto instrumentation for .NET applications before or during runtime.

Activate and deactivate auto instrumentation before runtime
-------------------------------------------------------------------

If the deployment is not deployed, add the ``otel.splunk.com/inject-dotnet`` annotation to the application deployment YAML file or add the .NET auto instrumentation repository to your ``values.yaml`` instrumentation spec.

.. tabs:: 

  .. tab:: Deployment YAML

    Add the ``otel.splunk.com/inject-dotnet`` annotation to the application deployment YAML file. For example, given the following deployment YAML:

    .. code-block:: yaml

      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: my-dotnet-app
      spec:
        template:
          spec:
            containers:
            - name: my-dotnet-app
              image: my-dotnet-app:latest

    Activate auto instrumentation by adding ``otel.splunk.com/inject-dotnet: "true"`` to the ``spec``:

    .. code-block:: yaml
      :emphasize-lines: 9

      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: my-dotnet-app
      spec:
        template:
          metadata:
            annotations:
              otel.splunk.com/inject-dotnet: "true"
          spec:
            containers:
            - name: my-dotnet-app
              image: my-dotnet-app:latest
    
    To deactivate automatic instrumentation, remove the annotation or set its value to ``false``.

  .. tab:: Instrumentation spec

    Add the .NET auto instrumentation repository to the ``operator`` spec in your ``values.yaml`` file. For example:

    .. code-block:: yaml
      :emphasize-lines: 5,6,7

      operator:
        enabled: true
        instrumentation:
          spec:
            dotnet:
              repository: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-dotnet
              tag: 1.0.0-rc.2

    To deactivate automatic instrumentation, remove ``dotnet`` and its fields from the instrumentation spec.

The Collector operator activates automatic instrumentation for any .NET applications in the deployment.

Activate and deactivate auto instrumentation for .NET on a running workload
--------------------------------------------------------------------------------

To activate auto instrumentation for your .NET deployment, run the following command. Replace ``<my-deployment>`` with the deployment name and ``<my-namespace>`` with the name of the target application namespace.

.. code-block:: bash

   kubectl patch deployment <my-deployment> -n <my-namespace> -p '{"spec": {"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-dotnet":"<splunk_otel_collector_namespace>/splunk-otel-collector"}}}} }'

.. note::
   * The deployment pod will restart after running this command.
   * If the chart is not installed in the "default" namespace, modify the annotation value to be "{chart_namespace}/splunk-otel-collector".

To deactivate auto instrumentation for your .NET deployment, run the same command but change the annotation value to ``false``:

.. code-block:: bash

   kubectl patch deployment <my-deployment> -n <my-namespace> --type=json -p='[{"op": "remove", "path": "/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-dotnet"}]'

Verify instrumentation
-----------------------------------------------

To verify that the instrumentation was successful, run the following command on an individual pod. Your instrumented pod should contain an initContainer named ``opentelemetry-auto-instrumentation`` and the target application container should have several ``OTEL_*`` environment variables similar to those in the demo output below.

.. code-block:: bash

   kubectl describe pod -n otel-demo -l app.kubernetes.io/name=opentelemetry-demo-frontend
   # Name:             opentelemetry-demo-frontend-57488c7b9c-4qbfb
   # Namespace:        otel-demo
   # Annotations:      instrumentation.opentelemetry.io/inject-dotnet: default/splunk-otel-collector
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
   #       NODE_OPTIONS:                                --require /otel-auto-instrumentation/autoinstrumentation.dotnet
   #       SPLUNK_OTEL_AGENT:                           (v1:status.hostIP)
   #       OTEL_SERVICE_NAME:                          opentelemetry-demo-frontend
   #       OTEL_EXPORTER_OTLP_ENDPOINT:                http://$(SPLUNK_OTEL_AGENT):4317
   #       OTEL_RESOURCE_ATTRIBUTES_POD_NAME:          opentelemetry-demo-frontend-57488c7b9c-4qbfb (v1:metadata.name)
   #       OTEL_RESOURCE_ATTRIBUTES_NODE_NAME:          (v1:spec.nodeName)
   #       OTEL_PROPAGATORS:                           tracecontext,baggage,b3
   #       OTEL_RESOURCE_ATTRIBUTES:                   splunk.zc.method=autoinstrumentation-dotnet:0.41.1,k8s.container.name=frontend,k8s.deployment.name=opentelemetry-demo-frontend,k8s.namespace.name=otel-demo,k8s.node.name=$(OTEL_RESOURCE_ATTRIBUTES_NODE_NAME),k8s.pod.name=$(OTEL_RESOURCE_ATTRIBUTES_POD_NAME),k8s.replicaset.name=opentelemetry-demo-frontend-57488c7b9c,service.version=1.5.0-frontend
   #     Mounts:
   #       /otel-auto-instrumentation from opentelemetry-auto-instrumentation (rw)
   # Volumes:
   #   opentelemetry-auto-instrumentation:
   #     Type:        EmptyDir (a temporary directory that shares a pod's lifetime)

View results at Splunk Observability APM
===========================================================

Allow the Operator to do the work. The Operator intercepts and alters the Kubernetes API requests to create and update annotated pods, the internal pod application containers are instrumented, and trace and metrics data populates the :ref:`APM dashboard <apm-dashboards>`. 

(Optional) Configure the instrumentation
===========================================================

You can configure the Splunk Distribution of OpenTelemetry .NET to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

You can add advanced configuration like activating custom sampling and including custom data in the reported spans with environment variables and .NET system properties.

For example, if you want every span to include the key-value pair ``build.id=feb2023_v2``, set the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable.

  .. code-block:: bash
    
     kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=build.id=feb2023_v2

You can also use the methods shown in :ref:`zeroconfig-dotnet-traces` to configure your instrumentation with the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable and other environment variables.

Learn more
===========================================================================

* To learn more about how Zero Config Auto Instrumentation works in Splunk Observability Cloud, see :new-page:`more detailed documentation in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* Refer to :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.
