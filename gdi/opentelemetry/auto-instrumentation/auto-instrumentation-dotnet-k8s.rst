.. _auto-instrumentation-dotnet-k8s:

************************************************************************************
Zero Configuration Automatic Instrumentation for Kubernetes .NET applications
************************************************************************************

.. meta::
   :description: Use the Collector with the upstream Kubernetes Operator for automatic instrumentation to easily add observability code to your application, enabling it to produce telemetry data.

You can use the OTel Collector with an upstream Operator in a Kubernetes environment to automatically instrument your .NET applications. 

Requirements
================================================================

Zero Config Auto Instrumentation for .NET requires the following components: 

* .NET version ``6.0`` or higher and supported .NET application libraries. For a list of supported libraries, see :ref:`supported-dotnet-libraries`.
* x86 or AMD64 (x86-64) architecture. ARM architectures aren't supported.

Deploy the Helm Chart with the Kubernetes Operator
=========================================================

Add certifications and deploy the Helm Chart
--------------------------------------------------------

The Operator requires certain TLS certificates to work. Use the following command to check whether a certification manager is available:

.. code-block:: yaml

   # Check if cert-manager is already installed, don't deploy a second cert-manager.
   kubectl get pods -l app=cert-manager --all-namespaces

If a certification manager (or any other TLS certificate source) is not available in the cluster, deploy it using ``certmanager.enabled=true``. Use the following commands to deploy the Helm Chart.

.. code-block:: yaml 

   # If cert-manager is not deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set certmanager.enabled=true,operator.enabled=true,environment=prd -n monitoring splunk-otel-collector-chart/splunk-otel-collector
   
   # If cert-manager is already deployed.
   helm install splunk-otel-collector -f ./my_values.yaml --set operator.enabled=true,environment=prd -n monitoring splunk-otel-collector-chart/splunk-otel-collector

.. _zeroconfig-dotnet-traces:

Ingest traces
------------------------------------------------

To ingest trace telemetry data, the attribute ``deployment.environment`` must be onboard the exported traces. The following table demonstrates the different methods for setting this attribute:

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

The following examples show how to set the attribute using each method:

.. tabs::

    .. tab:: Environment option

      Set the environment option in the ``values.yaml`` file. This adds the ``deployment.environment`` attribute to all telemetry data the Collector receives, including data from automatically-instrumented pods.

      .. code-block:: yaml

          environment: prd

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

    .. tab:: Deployment ``.yaml`` file

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

    .. tab:: ``kubectl``

      Update the environment variable ``OTEL_RESOURCE_ATTRIBUTES`` using ``kubectl set env``. For example:

      .. code-block:: bash
        
          kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=environment=prd
      
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

You can activate auto instrumentation for .NET applications before runtime.

.NET auto instrumentation uses annotations to set the .NET runtime identifiers (RIDs). Find the annotation that corresponds to your runtime environment and add it to the application object YAML.

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

For example, given the following deployment YAML on a ``linux-x64`` runtime environment:

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

Activate auto instrumentation by adding ``instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: "linux-x64"`` to the ``spec``:

    .. code-block:: yaml
      :emphasize-lines: 10

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
          spec:
            containers:
            - name: my-dotnet-app
              image: my-dotnet-app:latest
    
To deactivate automatic instrumentation, remove the annotation. The following command removes the annotation for automatic instrumentation, deactivating it:

    .. code-block:: bash

      kubectl patch deployment <my-deployment> -n <my-namespace> --type=json -p='[{"op": "remove", "path": "/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-dotnet"}]'

Verify instrumentation
-----------------------------------------------

To verify that the instrumentation was successful, run the following command on an individual pod:

.. code-block:: bash

  kubectl describe pod <my-application-name> -n <my-namespace>

Your instrumented pod should contain an initContainer named ``opentelemetry-auto-instrumentation`` and the target application container should have several ``OTEL_*`` environment variables similar to those in the demo output below.

.. code-block:: bash

    # Name:             dotnet-test-8499bc67dc-wn2fm
    # Namespace:        dotnet-demo
    # Labels:           app=dotnet-test
    #                   pod-template-hash=8499bc67dc
    # Annotations:      instrumentation.opentelemetry.io/inject-dotnet: true
    #                   instrumentation.opentelemetry.io/otel-dotnet-auto-runtime: linux-x64
    # Status:           Running
    # Init Containers:
    #   opentelemetry-auto-instrumentation-dotnet:
    #     Image:         ghcr.io/signalfx/splunk-otel-dotnet/splunk-otel-dotnet:v1.3.0
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
    #     OTEL_SERVICE_NAME:                   dotnet-test
    #     OTEL_RESOURCE_ATTRIBUTES_POD_NAME:   dotnet-test-8499bc67dc-wkf98 (v1:metadata.name)
    #     OTEL_RESOURCE_ATTRIBUTES_NODE_NAME:   (v1:spec.nodeName)
    #     OTEL_PROPAGATORS:                    tracecontext,baggage,b3
    #     OTEL_RESOURCE_ATTRIBUTES:            splunk.zc.method=splunk-otel-dotnet:v1.3.0,k8s.container.name=dotnet-test,k8s.deployment.name=dotnet-test,k8s.namespace.name=dotnet-demo,k8s.node.name=$(OTEL_RESOURCE_ATTRIBUTES_NODE_NAME),k8s.pod.name=$(OTEL_RESOURCE_ATTRIBUTES_POD_NAME),k8s.replicaset.name=dotnet-test-8499bc67dc,service.version=latest
    #     Mounts:
    #       /otel-auto-instrumentation-dotnet from opentelemetry-auto-instrumentation-dotnet (rw)
    #       /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-j5wm6 (ro)
    # Volumes:
    #   opentelemetry-auto-instrumentation-dotnet:
    #     Type:        EmptyDir (a temporary directory that shares a pod's lifetime)
    #     Medium:
    #     SizeLimit:   200Mi

View results at Splunk Observability APM
===========================================================

Allow the Operator to do the work. The Operator intercepts and alters the Kubernetes API requests to create and update annotated pods, the internal pod application containers are instrumented, and trace and metrics data populates the :ref:`APM dashboard <apm-dashboards>`. 

(Optional) Configure the instrumentation
===========================================================

You can configure the Splunk Distribution of OpenTelemetry .NET to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

You can add advanced configuration like activating custom sampling and including custom data in the reported spans with environment variables and .NET system properties. To do so, use the ``values.yaml`` file and  ``operator.instrumentation.sampler`` configuration. For more information, see the :new-page:`documentation in GitHub <https://github.com/open-telemetry/opentelemetry-operator/blob/main/docs/api.md#instrumentationspecsampler>` and :new-page:`example in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/examples/enable-operator-and-auto-instrumentation/instrumentation/instrumentation-add-trace-sampler.yaml>`.

You can also use the methods shown in :ref:`zeroconfig-dotnet-traces` to configure your instrumentation with the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable and other environment variables. For example, if you want every span to include the key-value pair ``build.id=feb2023_v2``, set the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable:

.. code-block:: bash
    
    kubectl set env deployment/<my-deployment> OTEL_RESOURCE_ATTRIBUTES=build.id=feb2023_v2

See :ref:`advanced-dotnet-otel-configuration` for the full list of supported environment variables.

Troubleshooting
===========================================================

To troubleshoot .NET auto instrumentation for Kubernetes, examine the logs located in ``/var/log/opentelemetry/dotnet`` within the instrumented pod. These logs provide valuable debugging insights.

Learn more
===========================================================================

* To learn more about how Zero Config Auto Instrumentation works in Splunk Observability Cloud, see :new-page:`more detailed documentation in GitHub <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/docs/auto-instrumentation-install.md#how-does-auto-instrumentation-work>`.
* See :new-page:`the operator pattern in the Kubernetes documentation <https://kubernetes.io/docs/concepts/extend-kubernetes/operator/>` for more information.
