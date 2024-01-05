.. _deploy-collector-k8s-java:

*********************************************************************
Part 2: Deploy the Collector and Java application
*********************************************************************

Now that we've configured a Kubernetes environment, we can deploy the Splunk Distribution of OpenTelemetry Collector.

Deploy the Splunk Distribution of OpenTelemetry Collector
============================================================

Using Helm, we'll deploy the Splunk Distribution of OpenTelemetry Collector in our Kubernetes namespace:

#. In a command line interface, run the following command:

    .. code-block:: bash

        helm install splunk-otel-collector -f ./spring-petclinic-app/values.yaml --set certmanager.enabled=true,operator.enabled=true,environment=prd -n petclinic splunk-otel-collector-chart/splunk-otel-collector

    This command uses the values.yaml file from the previous step to configure and deploy the Splunk Distribution of OpenTelemetry Collector through Helm. 
  
#. Run the following command to view all pods in the petclinic namespace:

    .. code-block:: bash

        kubectl get pod -n petclinic

    There are now several new pods running:

    .. code-block:: bash

        NAME                                                            READY   STATUS    RESTARTS   AGE
        splunk-otel-collector-agent-nkwwf                               1/1     Running   0          94s
        splunk-otel-collector-certmanager-6d95596898-z7qfz              1/1     Running   0          94s
        splunk-otel-collector-certmanager-cainjector-5c5dc4ff8f-7rlwx   1/1     Running   0          94s
        splunk-otel-collector-certmanager-webhook-69f4ff754c-hm9m2      1/1     Running   0          94s
        splunk-otel-collector-k8s-cluster-receiver-594fd9c8c7-6n545     1/1     Running   0          94s
        splunk-otel-collector-operator-69d476cb7-s8hcl                  2/2     Running   0          94s

    This output indicates that you've successfully deployed the Splunk Distribution of OpenTelemetry Collector, and that the Collector is ready to start receiving data and sending it to Splunk Observability Cloud. 

We've now deployed the Splunk Distribution of OpenTelemetry Collector, and we're ready to deploy the Spring Petclinic application.

.. _k8s-java-deploy-app:

Deploy the Spring Petclinic application
================================================

Let's deploy the Spring Petclinic Java application in our Kubernetes cluster. 

#. Create a new YAML file in your spring-petclinic-app directory called :guilabel:`petclinic-spec.yaml`. This file stores the keys and values used to configure your application deployment in Kubernetes.

#. Include the following important keys and values in the file:

      .. list-table::
          :header-rows: 1
          :width: 100%
          :widths: 33 33 33

          * - Key
            - Value
            - Notes
          * - ``metadata.name``
            - ``spring-petclinic``
            - Name of the deployment
          * - ``metadata.namespace``
            - ``petclinic``
            - Namespace to deploy the application in
          * - ``spec.template.spec.containers``
            - ``- name: petclinic-app``
            - Name of the container for the application
          * - ``spec.template.spec.containers``
            - ``image: ghcr.io/pavolloffay/spring-petclinic:latest``
            - Image for the Spring Petclinic application
          * - ``spec.template.metadata.annotations``
            - ``instrumentation.opentelemetry.io/inject-java: "true"``
            - Activates Splunk OpenTelemetry automatic instrumentation for the Java application

      After adding these keys and values, your petclinic-spec.yaml file looks like the following example:

      .. code-block:: yaml

          apiVersion: v1
          kind: Deployment
          metadata:
          name: spring-petclinic
          namespace: petclinic
          spec:
          selector:
            matchLabels:
            app: spring-petclinic
          template:
            metadata:
              labels:
                app: spring-petclinic
              annotations:
                # Activates automatic instrumentation for the Java application
                instrumentation.opentelemetry.io/inject-java: "true"
            spec:
              containers:
              - name: petclinic-app
                # Java application to instrument
                image: ghcr.io/pavolloffay/spring-petclinic:latest
                imagePullPolicy: Always

#. Run the following command to start the application deployment:

    .. code-block:: bash

        kubectl apply -n petclinic -f spring-petclinic-app/petclinic-spec.yaml

    This command starts running a new deployment called ``spring-petclinic`` as well as a pod with a similar name.

We've now successfully deployed the Spring PetClinic Java application in a Kubernetes pod.

.. _k8s-java-verify:

Verify your deployment
==================================

Let's make sure that everything is running correctly. Run the following command on your application pod, and replace ``<pod-name>`` with the name of your Spring Petclinic application pod:

.. code-block:: bash

    kubectl describe pod -n petclinic <pod-name>

The output shows an ``initContainer`` called ``opentelemetry-auto-instrumentation-java``:

.. code-block:: bash

    Name:             spring-petclinic-65b9764597-lwvkl
    Namespace:        petclinic
    Priority:         0
    Service Account:  default
    Node:             minikube/192.168.49.2
    Start Time:       Wed, 20 Dec 2023 12:55:02 -0600
    Labels:           app=spring-petclinic
                    pod-template-hash=65b9764597
    Annotations:      instrumentation.opentelemetry.io/inject-java: true
    Status:           Running
    IP:               10.244.0.9
    IPs:
    IP:           10.244.0.9
    Controlled By:  ReplicaSet/spring-petclinic-65b9764597
    Init Containers:
    opentelemetry-auto-instrumentation-java:
        Container ID:  docker://1b4a6275e8c3936febc3a5b0dd785e484061d9a0c2f8f1e4b17e9c347797a483
        Image:         ghcr.io/signalfx/splunk-otel-java/splunk-otel-java:v1.30.0
        Image ID:      docker-pullable://ghcr.io/signalfx/splunk-otel-java/splunk-otel-java@sha256:bb3de9e5d7f3577888f547903b62e281885961e3a49baebfb83b6239824ab5a7

The output also shows several ``OTEL`` environment variables:

.. code-block:: bash

    Environment:
      JAVA_TOOL_OPTIONS:                    -javaagent:/otel-auto-instrumentation-java/javaagent.jar
      SPLUNK_OTEL_AGENT:                    (v1:status.hostIP)
      OTEL_SERVICE_NAME:                   spring-petclinic
      OTEL_EXPORTER_OTLP_ENDPOINT:         http://$(SPLUNK_OTEL_AGENT):4317
      OTEL_RESOURCE_ATTRIBUTES_POD_NAME:   spring-petclinic-65b9764597-lwvkl (v1:metadata.name)
      OTEL_RESOURCE_ATTRIBUTES_NODE_NAME:   (v1:spec.nodeName)
      OTEL_PROPAGATORS:                    tracecontext,baggage,b3
      OTEL_RESOURCE_ATTRIBUTES:            splunk.zc.method=splunk-otel-java:v1.30.0,k8s.container.name=petclinic-app,k8s.deployment.name=spring-petclinic,k8s.namespace.name=petclinic,k8s.node.name=$(OTEL_RESOURCE_ATTRIBUTES_NODE_NAME),k8s.pod.name=$(OTEL_RESOURCE_ATTRIBUTES_POD_NAME),k8s.replicaset.name=spring-petclinic-65b9764597,service.version=latest

.. note::

    If you can't see the ``initContainer`` or ``OTEL`` environment, restart your application pod using ``kubectl rollout restart -n petclinic <pod-name>``. The OpenTelemetry Collector pods must be active and running before you deploy your Java application.

Next step
==========================

Now that the application is running, we're ready to start viewing data in Splunk Application Performance Monitoring (APM). See :ref:`k8s-java-view-apm`.

