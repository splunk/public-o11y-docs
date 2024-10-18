.. _tshoot-k8s-container-runtimes:
.. _troubleshoot-k8s:
.. _troubleshoot-k8s-general:

***************************************************************
General troubleshooting for the Collector for Kubernetes 
***************************************************************

.. meta::
    :description: Describes troubleshooting specific to the Collector for Kubernetes.

.. note:: 
  
  See also:

  * :ref:`troubleshoot-k8s-sizing`
  * :ref:`troubleshoot-k8s-missing-metrics`
  * :ref:`troubleshoot-k8s-container`

Debug logging for the Splunk Opentelemetry Collector in Kubernetes
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


