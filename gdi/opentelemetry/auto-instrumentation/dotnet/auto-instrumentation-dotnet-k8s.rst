.. _auto-instrumentation-dotnet-k8s:

************************************************************************************
Automatic discovery for Kubernetes .NET applications
************************************************************************************

.. meta::
   :description: Use the Collector with the Kubernetes Operator for automatic instrumentation to easily add observability code to your application and produce telemetry data.

Use the OTel Collector with the Operator in a Kubernetes environment to automatically instrument your .NET applications. By using zero configuration automatic instrumentation, you can quickly send .NET application data to Splunk APM without configuring the OpenTelemetry Collector or changing your application code.

To install zero configuration automatic instrumentation for .NET applications, complete the following steps:

#. :ref:`Deploy the Helm Chart with the Kubernetes Operator <deploy-helm-chart-dotnet-k8s>`
#. :ref:`Verify all OpenTelemetry resources are deployed correctly <verify-otel-resources-dotnet-k8s>`
#. :ref:`Set annotations to instrument .NET applications <set-dotnet-annotations-k8s>`
#. :ref:`View results in Splunk APM <view-results-dotnet-k8s>`

Requirements
================================================================

Zero Config Auto Instrumentation for .NET requires the following components: 

* .NET version 6.0 or higher and supported .NET application libraries. For a list of supported libraries, see :ref:`supported-dotnet-libraries`.
* x86 or AMD64 (x86-64) architecture. ARM architectures aren't supported.
* Your Splunk Observability Cloud realm and access token. For more information, see :ref:`admin-org-tokens`.

.. _deploy-helm-chart-dotnet-k8s:

Deploy the Helm Chart with the Kubernetes Operator
=========================================================

To deploy the Helm Chart, create a file called values.yaml. This file defines the settings to activate or deactivate when installing the OpenTelemetry Collector with the Helm Chart.

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

You might need to populate the file with additional values depending on your environment. See :ref:`dotnet-add-certificates` and :ref:`zeroconfig-dotnet-traces` for more information.

.. _dotnet-add-certificates:

Add certificates
----------------------------------------

The Operator requires TLS certificates to work. Use the following command to check whether a certification manager is available:

.. code-block:: yaml

   # Check if cert-manager is already installed, don't deploy a second cert-manager.
   kubectl get pods -l app=cert-manager --all-namespaces

If a certification manager isn't available in the cluster, then you'll need to add ``certmanager.enabled=true`` to your values.yaml file. For example:

.. code-block:: yaml
  :emphasize-lines: 6,7

  clusterName: my-cluster
  splunkObservability:
    realm: <splunk_realm>
    accessToken: <splunk_access_token>
  
  certmanager:
    enabled: true
  operator:
    enabled: true

.. _zeroconfig-dotnet-traces:

Set the deployment environment
------------------------------------------------

To ingest trace telemetry data, the attribute ``deployment.environment`` must be included in the exported traces. The following table shows the different methods for setting this attribute:

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 33 33 33

  * - Method
    - Scope
    - Implementation
  * - Through the values.yaml file ``environment`` configuration
    - Applies the attribute to all telemetry data (metrics, logs, traces) exported through the collector.
    - The chart sets an attribute processor to add ``deployment.environment=prd`` to all telemetry data processed by the collector.
  * - Through the values.yaml file and ``operator.instrumentation.spec.env`` or ``operator.instrumentation.spec.{instrumentation_library}.env`` configuration
    - Sets ``deployment.environment`` either for all auto-instrumented applications collectively or per auto-instrumentation language.
    - Add the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable, setting its value to ``deployment.environment=prd``.
  * - Through your Kubernetes application deployment, daemonset, or pod specification
    - Sets ``deployment.environment`` at the level of individual deployments, daemonsets, or pods.
    - Employ the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable, assigning the value ``deployment.environment=prd``.

The following examples show how to set the attribute using each method:

.. tabs::

    .. tab:: Environment option

      Set the environment option in the values.yaml file. This adds the ``deployment.environment`` attribute to all telemetry data the Collector receives, including data from automatically-instrumented pods.

      .. code-block:: yaml
        :emphasize-lines: 6

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

      Add the environment variable to the ``instrumentation`` spec as shown in the following example code. This method adds the ``deployment.environment`` attribute to all telemetry data from automatically-instrumented pods.

      .. code-block:: yaml

          operator:
            enabled: true
            instrumentation:
              spec:
                env: 
                  - name: OTEL_RESOURCE_ATTRIBUTES
                    value: "deployment.environment=prd"
                dotnet:
                  env: 
                    - name: OTEL_RESOURCE_ATTRIBUTES
                      value: "deployment.environment=prd-canary-dotnet"

    .. tab:: Deployment YAML

      Update the application deployment YAML file. This method adds the ``deployment.environment`` attribute to all telemetry data from pods that contain the specified environment variable.

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
                    value: "deployment.environment=prd"

    .. tab:: kubectl

      Update the environment variable ``OTEL_RESOURCE_ATTRIBUTES`` using ``kubectl set env``. For example:

      .. code-block:: bash
        
          kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=environment=prd

.. _zeroconfig-dotnet-deploy:

Deploy the Helm Chart
------------------------------------------------------

After configuring values.yaml, use the following command to deploy the Helm Chart:

.. code-block:: bash

   helm install splunk-otel-collector -f ./values.yaml splunk-otel-collector-chart/splunk-otel-collector --namespace monitoring

You can change the name of the Collector instance and the namespace in which you install the Collector. 

For example, to change the name of the Collector instance to ``otel-collector`` and install it in the ``o11y`` namespace, use the following command:

.. code-block:: bash

   helm install otel-collector -f ./values.yaml splunk-otel-collector-chart/splunk-otel-collector --namespace o11y

.. _verify-otel-resources-dotnet-k8s:
      
Check that all the OpenTelemetry resources are deployed successfully
==========================================================================

Helm deploys the OpenTelemetry resources as Kubernetes pods. These resources include the Collector, the Operator, webhook, and instrumentation. 

Each resource has a prefix containing the helm release name that you set in :ref:`zeroconfig-dotnet-deploy`. For example, if you set the Collector instance name to ``otel-collector``, each pod name is prefixed with ``otel-collector``.

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

The pods running in your namespace must include the following:

.. code-block:: yaml

   kubectl get mutatingwebhookconfiguration.admissionregistration.k8s.io -n monitoring
   # NAME                                      WEBHOOKS   AGE
   # splunk-otel-collector-cert-manager-webhook              1          14m
   # splunk-otel-collector-opentelemetry-operator-mutation   3          14m

The namespace must have a running instance of the OpenTelemetry Collector. The name of this Collector instance matches the name that you set in :ref:`zeroconfig-dotnet-deploy`.

.. code-block:: yaml

   kubectl get otelinst -n monitoring
   # NAME                            AGE   ENDPOINT
   # splunk-otel-collector   5m    http://$(SPLUNK_OTEL_AGENT):4317

.. _set-dotnet-annotations-k8s:

Set annotations to instrument .NET applications
===================================================================

To instrument your .NET applications, add an annotation to your Kubernetes object yaml.

.NET automatic instrumentation uses annotations to set the .NET runtime identifiers (RIDs). Find the annotation that corresponds to your runtime environment and add it to the application object YAML.

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

The following example YAML files show how to add the appropriate annotations for auto instrumentation.

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

Applying annotations in a different namespace
------------------------------------------------

If the current namespace isn't ``monitoring``, change the annotation to specify the namespace in which you installed the OpenTelemetry Collector. 

For example, if the current namespace is ``<my-namespace>`` and you installed the Collector in ``monitoring``, set the annotation to ``"instrumentation.opentelemetry.io/inject-dotnet": "monitoring/splunk-otel-collector"``:

.. code-block:: bash

  kubectl patch deployment <my-deployment> -n <my-namespace> -p '{"spec":{"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-dotnet":"monitoring/splunk-otel-collector"}}}}}'

Deactivate automatic instrumentation
-----------------------------------------

To deactivate automatic instrumentation, remove the annotation. The following command removes the annotation for automatic instrumentation, deactivating it:

.. code-block:: bash

    kubectl patch deployment <my-deployment> -n <my-namespace> --type=json -p='[{"op": "remove", "path": "/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-dotnet"}]'

Verify instrumentation
-----------------------------------------------

To verify that the instrumentation was successful, run the following command on an individual pod:

.. code-block:: bash

  kubectl describe pod <my-application-name> -n <my-namespace>

Your instrumented pod should contain an initContainer named ``opentelemetry-auto-instrumentation`` and the target application container should have several ``OTEL_*`` environment variables similar to those in the following demo output:

.. code-block:: bash

    # Name:             my-dotnet-app-8499bc67dc-wn2fm
    # Namespace:        monitoring
    # Labels:           app=my-dotnet-app
    #                   pod-template-hash=8499bc67dc
    # Annotations:      instrumentation.opentelemetry.io/inject-dotnet: true
    #                   instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: linux-x64
    # Status:           Running
    # Init Containers:
    #   opentelemetry-auto-instrumentation-dotnet:
    #     Image:         my-dotnet-app:latest
    #     State:          Terminated
    #       Reason:       Completed
    #       Exit Code:    0
    # Containers:
    #   my-dotnet-app:
    #     State:          Running
    #     Ready:          True
    #     Environment:
    #     OTEL_DOTNET_AUTO_PLUGINS:            Splunk.OpenTelemetry.AutoInstrumentation.Plugin, Splunk.OpenTelemetry.AutoInstrumentation
    #     OTEL_EXPORTER_OTLP_ENDPOINT:         http://splunk-otel-collector-agent:4318
    #     CORECLR_ENABLE_PROFILING:            1
    #     CORECLR_PROFILER:                    {918728DD-259F-4A6A-AC2B-B85E1B658318}
    #     CORECLR_PROFILER_PATH:               /otel-auto-instrumentation-dotnet/linux-x64/OpenTelemetry.AutoInstrumentation.Native.so
    #     DOTNET_STARTUP_HOOKS:                /otel-auto-instrumentation-dotnet/net/OpenTelemetry.AutoInstrumentation.StartupHook.dll
    #     DOTNET_ADDITIONAL_DEPS:              /otel-auto-instrumentation-dotnet/AdditionalDeps
    #     OTEL_DOTNET_AUTO_HOME:               /otel-auto-instrumentation-dotnet
    #     DOTNET_SHARED_STORE:                 /otel-auto-instrumentation-dotnet/store
    #     SPLUNK_OTEL_AGENT:                    (v1:status.hostIP)
    #     OTEL_SERVICE_NAME:                   my-dotnet-app:latest
    #     OTEL_RESOURCE_ATTRIBUTES_POD_NAME:   my-dotnet-app-8499bc67dc-wkf98 (v1:metadata.name)
    #     OTEL_RESOURCE_ATTRIBUTES_NODE_NAME:   (v1:spec.nodeName)
    #     OTEL_PROPAGATORS:                    tracecontext,baggage,b3
    #     OTEL_RESOURCE_ATTRIBUTES:            splunk.zc.method=splunk-otel-dotnet:v1.3.0,k8s.container.name=my-dotnet-app,k8s.deployment.name=my-dotnet-app,k8s.namespace.name=monitoring,k8s.node.name=$(OTEL_RESOURCE_ATTRIBUTES_NODE_NAME),k8s.pod.name=$(OTEL_RESOURCE_ATTRIBUTES_POD_NAME),k8s.replicaset.name=my-dotnet-app-8499bc67dc,service.version=latest
    #     Mounts:
    #       /otel-auto-instrumentation-dotnet from opentelemetry-auto-instrumentation-dotnet (rw)
    #       /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-j5wm6 (ro)
    # Volumes:
    #   opentelemetry-auto-instrumentation-dotnet:
    #     Type:        EmptyDir (a temporary directory that shares a pod's lifetime)
    #     Medium:
    #     SizeLimit:   200Mi

.. _view-results-dotnet-k8s:

View results in Splunk APM
===========================================================

The Operator intercepts and alters the Kubernetes API requests to create and update annotated pods, the internal pod application containers are instrumented, and trace and metrics data populates the :ref:`APM dashboard <apm-dashboards>`. 

If you don't see data in Splunk APM after 2 to 5 minutes, try verifying the instrumentation again. See :ref:`troubleshoot-zeroconfig-dotnet` for additional troubleshooting guidance.

(Optional) Configure the instrumentation
===========================================================

You can configure the Splunk Distribution of OpenTelemetry .NET to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

You can add advanced configuration like activating custom sampling and including custom data in the reported spans with environment variables and .NET system properties. To do so, use the values.yaml file and  ``operator.instrumentation.sampler`` configuration. For more information, see the :new-page:`documentation in GitHub <https://github.com/open-telemetry/opentelemetry-operator/blob/main/docs/api.md#instrumentationspecsampler>` and :new-page:`example in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/enable-operator-and-auto-instrumentation/instrumentation/instrumentation-add-trace-sampler.yaml>`.

You can also use the methods shown in :ref:`zeroconfig-dotnet-traces` to configure your instrumentation with the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable and other environment variables. For example, if you want every span to include the key-value pair ``build.id=feb2023_v2``, set the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable:

.. code-block:: bash
    
    kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=build.id=feb2023_v2

See :ref:`advanced-dotnet-otel-configuration` for the full list of supported environment variables.

.. _troubleshoot-zeroconfig-dotnet:

.. include:: /_includes/gdi/troubleshoot-zeroconfig-k8s.rst

Examine .NET logs
---------------------------------

For further troubleshooting insights, examine the logs located in ``/var/log/opentelemetry/dotnet`` within the instrumented pod.

Learn more
===========================================================================

* To learn more about how Zero Config Auto Instrumentation works in Splunk Observability Cloud, see :new-page:`more detailed documentation in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* See :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.
