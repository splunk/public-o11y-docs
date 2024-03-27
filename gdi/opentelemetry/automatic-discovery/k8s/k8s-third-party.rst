.. _k8s-third-party:

***************************************************************************************
Automatic discovery and configuration for third-party applications in Kubernetes
***************************************************************************************

.. meta:: 
    :description: Learn how to use automatic discovery and configuration to send data from your third-party applications in Kubernetes to Splunk Observability Cloud.

.. _discovery-mode-k8s:

Deploy the Collector with automatic discovery
=================================================

You can configure the DaemonSet from the Splunk Distribution of OpenTelemetry Collector for Kubernetes to run in discovery mode. Edit the properties to add required credentials or service-specific information.

The following example shows how to activate discovery mode in the Helm chart and adds authentication properties for PostgreSQL service discovery:

.. code-block:: yaml

   agent:

     #...

     discovery:
       enabled: true # Turned off by default
       properties:
         extensions:
           k8s_observer:
             config:
               auth_type: serviceAccount  # Default auth_type value
         receivers:
           postgres:
             config:
               # Environment variables populated by secret data
               username: '${env:POSTGRES_USER}'
               password: '${env:POSTGRES_PASSWORD}'
               tls:
                 insecure: true

   # ...

   extraEnvs:
      # Environment variables using a manually created secret
      - name: POSTGRES_USER
        valueFrom:
          secretKeyRef:
            name: postgres-monitoring
            key: username
      - name: POSTGRES_PASSWORD
        valueFrom:
          secretKeyRef:
            name: postgres-monitoring
            key: password

To check discovery progress and statement evaluations, see the agent startup logs or use kubectl. For example:

.. code-block:: shell

   $ kubectl -n monitoring logs splunk-otel-collector-agent | grep -i disco
   Discovering for next 10s...
   Successfully discovered "postgresql" using "k8s_observer" endpoint "k8s_observer/e8a10f52-4f2a-468c-be7b-7f3c673b1c8e/(5432)".
   Discovery complete.

.. note:: By default, the ``docker_observer`` and ``host_observer`` extensions are turned off for discovery in the Helm chart.