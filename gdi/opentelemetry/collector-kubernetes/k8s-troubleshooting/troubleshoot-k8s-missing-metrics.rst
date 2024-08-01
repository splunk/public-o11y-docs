.. _troubleshoot-k8s-missing-metrics:

***************************************************************
Troubleshoot missing metrics 
***************************************************************

.. meta::
    :description: Describes troubleshooting specific to missing metrics in the Collector for Kubernetes.

.. note:: 
  
  See also:

  * :ref:`otel-troubleshooting`  
  * :ref:`troubleshoot-k8s`
  * :ref:`troubleshoot-k8s-sizing`
  * :ref:`troubleshoot-k8s-container`

The Splunk Collector for Kubernetes is missing metrics starting with ``k8s.pod.*`` and ``k8s.node.*``
========================================================================================================

After deploying the Splunk Distribution of the OpenTelemetry Collector for Kubernetes Chart version 0.87.0 or higher as either a new install or upgrade the following pod and node metrics are not being collected:

* ``k8s.(pod/node).cpu.time``
* ``k8s.(pod/node).cpu.utilization``
* ``k8s.(pod/node).filesystem.available``
* ``k8s.(pod/node).filesystem.capacity``
* ``k8s.(pod/node).filesystem.usage``
* ``k8s.(pod/node).memory.available``
* ``k8s.(pod/node).memory.major_page_faults``
* ``k8s.(pod/node).memory.page_faults``
* ``k8s.(pod/node).memory.rss``
* ``k8s.(pod/node).memory.usage``
* ``k8s.(pod/node).memory.working_set``
* ``k8s.(pod/node).network.errors``
* ``k8s.(pod/node).network.io``

Confirm the metrics are missing
--------------------------------------------------------------------

To confirm these metrics are missing perform the following steps:

1. Confirm that the metrics are missing with the following Splunk Search Processing Language (SPL) command:

.. code-block::

  | mstats count(_value) as "Val" where index="otel_metrics_0_93_3" AND metric_name IN (k8s.pod.*, k8s.node.*) by metric_name

2. Check the Collector's pod logs from the CLI of the Kubernetes node with this command: 

.. code-block::

  kubectl -n {namespace} logs {collector-agent-pod-name} 

Note: Update ``namespace`` and ``collector-agent-pod-name`` based on your environment.

3. You will see a "tls: failed to verify certificate" error similar to the one below in the agent pod logs:

.. code-block::

  2024-02-28T01:11:24.614Z    error   scraperhelper/scrapercontroller.go:200  Error scraping metrics  {"kind": "receiver", "name": "kubeletstats", "data_type": "metrics", "error": "Get \"https://10.202.38.255:10250/stats/summary\": tls: failed to verify certificate: x509: cannot validate certificate for 10.202.38.255 because it doesn't contain any IP SANs", "scraper": "kubeletstats"}
  go.opentelemetry.io/collector/receiver/scraperhelper.(*controller).scrapeMetricsAndReport
    go.opentelemetry.io/collector/receiver@v0.93.0/scraperhelper/scrapercontroller.go:200
  go.opentelemetry.io/collector/receiver/scraperhelper.(*controller).startScraping.func1
    go.opentelemetry.io/collector/receiver@v0.93.0/scraperhelper/scrapercontroller.go:176

Resolution
--------------------------------------------------------------------

The :ref:`kubelet-stats-receiver` collects k8s.(pod or node) metrics from the Kubernetes endpoint ``/stats/summary``. As of version 0.87.0 of the Splunk OTel Collector the kubelet certificate is verified during this process to confirm it's valid. If you are using a self signed or invalid certificate the Kubelet stats receiver cannot collect the metrics.

You have two alternatives to resolve this error:

1. Add valid a certificate to your Kubernetes cluster. See how at :ref:`otel-kubernetes-config`. After updating the ``values.yaml`` file use the Helm upgrade command to upgrade your Collector deployment.

2. Disable certificate verification in the OTel agent Kubelet Stats receiver by setting ``insecure_skip_verify: true`` for the Kubelet stats receiver in the agent.config section of the values.yaml.

For example, use the configuration below to disable certificate verification:

.. code-block::
  
  agent:
    config:
      receivers:
        kubeletstats:
          insecure_skip_verify: true

.. caution:: Keep in mind your security requirements before disabling certificate verification.



