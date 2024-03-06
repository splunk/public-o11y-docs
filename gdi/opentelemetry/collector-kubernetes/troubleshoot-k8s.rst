.. _tshoot-k8s-container-runtimes:
.. _troubleshoot-k8s:

***************************************************************
Troubleshoot the Collector for Kubernetes 
***************************************************************

.. meta::
    :description: Describes troubleshooting specific to the Collector for Kubernetes.

.. note:: 
    
    For general troubleshooting, see :ref:`otel-troubleshooting`. 
    To troubleshoot issues with your Kubernetes containers, see :ref:`troubleshoot-k8s-container`.

Debug logging for the Splunk Otel Collector in Kubernetes
=============================================================================================

You can change the logging level of the Collector from ``info`` to ``debug`` to help you troubleshoot. 

To do this, apply this configuration:

.. code-block:: yaml

  service:
    telemetry:
      logs:
        level: "debug"

Export your logs
=============================================================================================

The Collector's logs are not exported by default. If you already export your logs to Splunk Platform or Splunk Observability, then you might want to export the collector's logs too. 

For example, you can configure the Collector to output debug logs and export them to Splunk Platform or Splunk Observability:

.. code-block:: yaml

  agent:
    config:
      service:
        telemetry:
          logs:
            # Enable debug logging from the collector.
            level: debug
  # Optional for exporting logs.
  logsCollection:
    containers:
      # Enable the logs from the collector/agent to be collected at the container level.
      excludeAgentLogs: false

To view logs, use:

.. code-block:: 

  kubectl logs {splunk-otel-collector-agent-pod}

Size your Collector instance
=============================================================================================

Set the resources allocated to your Collector instance based on the amount of data you expecte to handle. For more information, see :ref:`otel-sizing`.

Use the following configuration to bump resource limits for the agent:

.. code-block:: yaml

  agent:
    resources:
      limits:
        cpu: 500m
        memory: 1Gi

Resources allocated to cluster receiver deployment should be based on the cluster size. For a cluster with 100 nodes you would need the following resources:

.. code-block:: yaml

clusterReceiver:
  resources:
    limits:
      cpu: 1
      memory: 2Gi





