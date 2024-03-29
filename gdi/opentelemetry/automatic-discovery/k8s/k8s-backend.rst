.. _k8s-backend:

********************************************************************************
Automatic discovery and configuration for back-end applications in Kubernetes
********************************************************************************

.. meta:: 
    :description: Get started with automatic discovery and configuration for back-end applications and language runtimes in a Kubernetes environment.

When using automatic discovery and configuration, the Splunk Distribution of OpenTelemetry Collector automatically detects back-end applications running in your Kubernetes environment. 

By deploying the Collector with automatic discovery, you can instrument applications and send data to Splunk Observability Cloud without editing your application's code or configuring files.

Automatic discovery for Kubernetes can detect and configure the following applications and language runtimes:

* Java
* .NET
* Node.js

How automatic discovery for Kubernetes works
================================================

Automatic discovery for Kubernetes operates as a Kubernetes DaemonSet that you install with Helm. Using Helm, you can specify which language runtimes you want automatic discovery to find. After installation, Helm deploys a set of Kubernetes pods in your cluster, which includes the Splunk Distribution of OpenTelemetry Collector, the Kubernetes operator, and other supporting resources. 

The Collector and Kubernetes operator listen for requests to your application and gather telemetry data upon detecting activity in your application. The Collector then sends this data to Splunk Application Performance Monitoring (APM).

Get started
==============================

To install automatic discovery for Kubernetes, complete the following steps:

#. :ref:`k8s-auto-discovery-deploy-helm-chart`
#. :ref:`k8s-auto-discovery-verify-resources`
#. :ref:`k8s-auto-discovery-set-annotations`
#. :ref:`k8s-auto-discovery-view-results`

.. _k8s-backend-requirements:

Requirements
===============================================

You need the following components to use automatic discovery for back-end Kubernetes applications:

* Helm version 3 or higher.
* Administrator access to your Kubernetes cluster and familiarity with your Kubernetes configuration.
* Your Splunk Observability Cloud realm and access token with ingest scope. For more information, see :ref:`admin-org-tokens`.

Make sure you've also installed the components specific to your language runtime:

.. tabs:: 

    .. tab:: Java

        Java 8 or higher and supported libraries. See :ref:`java-otel-requirements` for more information.

    .. tab:: .NET

        * .NET version 6.0 or higher and supported .NET application libraries. For a list of supported libraries, see :ref:`supported-dotnet-libraries`.
        * x86 or AMD64 (x86-64) architecture. ARM architectures aren't supported.

    .. tab:: Node.js

        Node.js version 14 or higher and supported libraries. See :ref:`nodejs-otel-requirements` for more information.

.. _k8s-auto-discovery-deploy-helm-chart:

Deploy the Helm Chart with the Kubernetes Operator
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

You might need to populate the file with additional values depending on your environment. See :ref:`k8s-auto-discovery-add-certificates-add-certificates` and :ref:`k8s-auto-discovery-setup-traces` for more information.

.. _k8s-auto-discovery-add-certificates:

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

.. _k8s-auto-discovery-setup-traces:

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
                java:
                  env: 
                    - name: OTEL_RESOURCE_ATTRIBUTES
                      value: "deployment.environment=prd-canary-java"

    .. tab:: Deployment YAML

      Update the application deployment YAML file. This method adds the ``deployment.environment`` attribute to all telemetry data from pods that contain the specified environment variable.

         .. code-block:: yaml

            apiVersion: apps/v1
            kind: Deployment
            metadata:
            name: my-java-app
            spec:
            template:
               spec:
                  containers:
                  - name: my-java-app
                  image: my-java-app:latest
                  env:
                  - name: OTEL_RESOURCE_ATTRIBUTES
                    value: "deployment.environment=prd"

    .. tab:: kubectl

      Update the environment variable ``OTEL_RESOURCE_ATTRIBUTES`` using ``kubectl set env``. For example:

      .. code-block:: bash
        
          kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=environment=prd

.. _k8s-auto-discovery-helmchart-name:

Deploy the Helm Chart
---------------------------------

After configuring values.yaml, use the following command to deploy the Helm Chart:

.. code-block:: bash

   helm install splunk-otel-collector -f ./values.yaml splunk-otel-collector-chart/splunk-otel-collector

You can change the name of the Collector instance and the namespace in which you install the Collector. 

For example, to change the name of the Collector instance to ``otel-collector`` and install it in the ``o11y`` namespace, use the following command:

.. code-block:: bash

   helm install otel-collector -f ./values.yaml splunk-otel-collector-chart/splunk-otel-collector --namespace o11y

.. _k8s-auto-discovery-verify-resources:

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


The pods running in your namespace must include the following:

.. code-block:: yaml

   kubectl get mutatingwebhookconfiguration.admissionregistration.k8s.io -n monitoring
   # NAME                                      WEBHOOKS   AGE
   # splunk-otel-collector-cert-manager-webhook              1          14m
   # splunk-otel-collector-opentelemetry-operator-mutation   3          14m

The namespace must have a running instance of the OpenTelemetry Collector. The name of this Collector instance matches the name that you set in :ref:`k8s-auto-discovery-helmchart-name`.

.. code-block:: yaml

   kubectl get otelinst -n <target_application_namespace>
   # NAME                          AGE   ENDPOINT
   # splunk-instrumentation        3m   http://$(SPLUNK_OTEL_AGENT):4317

.. _k8s-auto-discovery-set-annotations:

Set annotations to instrument applications
==============================================================

If the related Kubernetes object (deployment, daemonset, or pod) is not deployed, add the ``instrumentation.opentelemetry.io/inject-java`` annotation to the application object YAML.

The annotation you set depends on the language runtime you're using. You can set multiple annotations in the same Kubernetes object. See the following available annotations:

.. tabs::

    .. tab:: Java

        Add the ``instrumentation.opentelemetry.io/inject-java`` annotation to the application object YAML.

        For example, given the following deployment YAML:

        .. code-block:: yaml

            apiVersion: apps/v1
            kind: Deployment
            metadata:
            name: my-java-app
            namespace: monitoring
            spec:
            template:
                spec:
                containers:
                - name: my-java-app
                    image: my-java-app:latest

        Activate auto instrumentation by adding ``instrumentation.opentelemetry.io/inject-java: "true"`` to the ``spec``:

        .. code-block:: yaml
            :emphasize-lines: 10

            apiVersion: apps/v1
            kind: Deployment
            metadata:
            name: my-java-app
            namespace: monitoring
            spec:
            template:
                metadata:
                annotations:
                    instrumentation.opentelemetry.io/inject-java: "true"
                spec:
                containers:
                - name: my-java-app
                    image: my-java-app:latest
    
    .. tab:: .NET

        Add the ``instrumentation.opentelemetry.io/inject-dotnet`` annotation to the application object YAML.

        Depending on your environment, you'll need to add another annotation. See the following table for details:

        .. list-table::
            :header-rows: 1
            :width: 100

            * - RID
              - Annotation 
              - Notes
            * - ``linux-x64``
              - ``instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: "linux-x64"``
              - This is the default value and you can omit it.
            * - ``linux-musl-x64``
              - ``instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: "linux-musl-x64"``
              - Use this annotation for applications running in environments based on the ``musl`` library.

        .. tabs:: 

            .. tab:: ``linux-x64``

                Given the following deployment YAML on a ``linux-x64`` runtime environment:

                .. code-block:: yaml

                    apiVersion: apps/v1
                    kind: Deployment
                    metadata:
                    name: my-dotnet-app
                    namespace: monitoring
                    spec:
                    template:
                        spec:
                        containers:
                        - name: my-dotnet-app
                            image: my-dotnet-app:latest

                Activate auto instrumentation by adding ``instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: "linux-x64"`` and ``instrumentation.opentelemetry.io/inject-dotnet: "monitoring/splunk-otel-collector"`` to the ``spec``:

                .. code-block:: yaml
                    :emphasize-lines: 10,11

                    apiVersion: apps/v1
                    kind: Deployment
                    metadata:
                    name: my-dotnet-app
                    namespace: monitoring
                    spec:
                    template:
                        metadata:
                        annotations:
                            instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: "linux-x64"
                            instrumentation.opentelemetry.io/inject-dotnet: "monitoring/splunk-otel-collector"
                        spec:
                            containers:
                            - name: my-dotnet-app
                            image: my-dotnet-app:latest
            
            .. tab:: ``linux-musl-x64``

                Given the following deployment YAML on a ``linux-musl-x64`` runtime environment:

                .. code-block:: yaml

                    apiVersion: apps/v1
                    kind: Deployment
                    metadata:
                      name: my-dotnet-app
                      namespace: monitoring
                    spec:
                      template:
                        spec:
                          containers:
                           - name: my-dotnet-app
                             image: my-dotnet-app:latest

                Activate auto instrumentation by adding ``instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: "linux-musl-x64"`` and ``instrumentation.opentelemetry.io/inject-dotnet: "monitoring/splunk-otel-collector"`` to the ``spec``:

                .. code-block:: yaml
                  :emphasize-lines: 10,11

                    apiVersion: apps/v1
                    kind: Deployment
                    metadata:
                      name: my-dotnet-app
                      namespace: monitoring
                    spec:
                    template:
                      metadata:
                        annotations:
                            instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: "linux-musl-x64"
                            instrumentation.opentelemetry.io/inject-dotnet: "monitoring/splunk-otel-collector"
                      spec:
                        containers:
                        - name: my-dotnet-app
                          image: my-dotnet-app:latest

    .. tab:: Node.js

        Add the ``instrumentation.opentelemetry.io/inject-nodejs`` annotation to the application object YAML.

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

For example, if the current namespace is ``<my-namespace>`` and you installed the Collector in ``monitoring``, set the annotation to ``"instrumentation.opentelemetry.io/inject-<application_language>": "monitoring/splunk-otel-collector"``:

.. code-block:: bash

  kubectl patch deployment <my-deployment> -n <my-namespace> -p '{"spec":{"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-<application_language>":"monitoring/splunk-otel-collector"}}}}}'

Replace ``<application_language>`` with the language of the application you want to discover.

Deactivate automatic discovery
-----------------------------------------------

To deactivate automatic discovery, remove the annotation. The following command removes the annotation for automatic discovery, deactivating it:

.. code-block:: bash

   kubectl patch deployment <my-deployment> -n <my-namespace> --type=json -p='[{"op": "remove", "path": "/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-<application_language>"}]'

Replace ``<application_language>`` with the language of the application for which you want to deactivate discovery.

Verify instrumentation
----------------------------------------

To verify that the instrumentation was successful, run the following command on an individual pod:

.. code-block:: bash

   kubectl describe pod <application_pod_name> -n <namespace>

The instrumented pod contains an initContainer named ``opentelemetry-auto-instrumentation`` and the target application container should have several ``OTEL_*`` environment variables similar to those in the following demo output:

.. code-block:: bash

   # Name:             opentelemetry-demo-frontend-57488c7b9c-4qbfb
   # Namespace:        otel-demo
   # Annotations:      instrumentation.opentelemetry.io/inject-java: true
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
   #       NODE_OPTIONS:                                --require /otel-auto-instrumentation/autoinstrumentation.java
   #       SPLUNK_OTEL_AGENT:                           (v1:status.hostIP)
   #       OTEL_SERVICE_NAME:                          opentelemetry-demo-frontend
   #       OTEL_EXPORTER_OTLP_ENDPOINT:                http://$(SPLUNK_OTEL_AGENT):4317
   #       OTEL_RESOURCE_ATTRIBUTES_POD_NAME:          opentelemetry-demo-frontend-57488c7b9c-4qbfb (v1:metadata.name)
   #       OTEL_RESOURCE_ATTRIBUTES_NODE_NAME:          (v1:spec.nodeName)
   #       OTEL_PROPAGATORS:                           tracecontext,baggage,b3
   #       OTEL_RESOURCE_ATTRIBUTES:                   splunk.zc.method=autoinstrumentation-java:0.41.1,k8s.container.name=frontend,k8s.deployment.name=opentelemetry-demo-frontend,k8s.namespace.name=otel-demo,k8s.node.name=$(OTEL_RESOURCE_ATTRIBUTES_NODE_NAME),k8s.pod.name=$(OTEL_RESOURCE_ATTRIBUTES_POD_NAME),k8s.replicaset.name=opentelemetry-demo-frontend-57488c7b9c,service.version=1.5.0-frontend
   #     Mounts:
   #       /otel-auto-instrumentation from opentelemetry-auto-instrumentation (rw)
   # Volumes:
   #   opentelemetry-auto-instrumentation:
   #     Type:        EmptyDir (a temporary directory that shares a pod's lifetime)


.. _k8s-auto-discovery-view-results:

View results at Splunk Observability APM
===========================================================

Allow the Operator to do the work. The Operator intercepts and alters the Kubernetes API requests to create and update annotated pods, the internal pod application containers are instrumented, and trace and metrics data populates the :ref:`APM dashboard <apm-dashboards>`. 

(Optional) Configure the instrumentation
===========================================================

You can configure the Splunk Distribution of OpenTelemetry Collector to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

You can add advanced configuration like activating custom sampling and including custom data in the reported spans with environment variables and system properties. To do so, use the values.yaml file and  ``operator.instrumentation.sampler`` configuration. For more information, see the :new-page:`documentation in GitHub <https://github.com/open-telemetry/opentelemetry-operator/blob/main/docs/api.md#instrumentationspecsampler>` and :new-page:`example in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/enable-operator-and-auto-instrumentation/instrumentation/instrumentation-add-trace-sampler.yaml>`.

You can also use the methods shown in :ref:`k8s-auto-discovery-setup-traces` to configure your instrumentation with the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable and other environment variables. For example, if you want every span to include the key-value pair ``build.id=feb2023_v2``, set the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable:

  .. code-block:: bash
    
     kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=build.id=feb2023_v2

See :ref:`advanced-config-auto-instrumentation` for more information.

.. _troubleshooting-k8s-auto-discovery:

.. include:: /_includes/gdi/troubleshoot-zeroconfig-k8s.rst

Learn more
===========================================================================

* To learn more about how Zero Config Auto Instrumentation works in Splunk Observability Cloud, see :new-page:`more detailed documentation in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* See :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.
