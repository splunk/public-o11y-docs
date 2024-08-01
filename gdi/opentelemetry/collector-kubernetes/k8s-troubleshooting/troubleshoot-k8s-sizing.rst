.. _troubleshoot-k8s-sizing:

***************************************************************
Troubleshoot sizing for the Collector for Kubernetes 
***************************************************************

.. meta::
    :description: Describes troubleshooting specific to sizing the Collector for Kubernetes containers.

.. note:: 
  
  See also:

  * :ref:`otel-troubleshooting`  
  * :ref:`troubleshoot-k8s`
  * :ref:`troubleshoot-k8s-missing-metrics`
  * :ref:`troubleshoot-k8s-container`

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

Set the resources allocated to your cluster receiver deployment based on the cluster size. For example, for a cluster with 100 nodes alllocate these resources:

.. code-block:: yaml

  clusterReceiver:
    resources:
      limits:
        cpu: 1
        memory: 2Gi


Verify if your container is running out of memory
=======================================================================

Even if you didn't provide enough resources for the Collector containers, under normal circumstances the Collector doesn't run out of memory (OOM). This can only happen if the Collector is heavily throttled by the backend and exporter sending queue growing faster than collector can control memory utilization. In that case you should see ``429`` errors for metrics and traces or ``503`` errors for logs. 

For example:

.. code-block:: 

  2021-11-12T00:22:32.172Z	info	exporterhelper/queued_retry.go:325	Exporting failed. Will retry the request after interval.	{"kind": "exporter", "name": "sapm", "error": "server responded with 429", "interval": "4.4850027s"}
  2021-11-12T00:22:38.087Z	error	exporterhelper/queued_retry.go:190	Dropping data because sending_queue is full. Try increasing queue_size.	{"kind": "exporter", "name": "sapm", "dropped_items": 1348}

If you can't fix throttling by bumping limits on the backend or reducing amount of data sent through the Collector, you can avoid OOMs by reducing the sending queue of the failing exporter. For example, you can reduce ``sending_queue`` for the ``sapm`` exporter:

.. code-block:: yaml

  agent:
    config:
      exporters:
        sapm:
          sending_queue:
            queue_size: 512

You can apply a similar configuration to any other failing exporter.

