:orphan:

.. include:: /_includes/network-explorer/network-explorer-preview-header.rst


.. _network-explorer-troubleshoot:


*******************************************************
Troubleshoot Network Explorer
*******************************************************

.. meta::
    :description: Troubleshooting guide for Network Explorer


Network Explorer isn't showing metrics as expected
====================================================================================

When Network Explorer experiences data issues, you might see the following:

- Very limited or no TCP metrics and HTTP metrics.
- No workloads, or only workloads for ``containerd`` and ``kubelet``.

Causes
----------------

Your ``kubelet`` and ``containerd`` cgroup drivers might be not be the same value.

Solution
----------------

Check the cgroup drivers of your ``kubelet`` and ``containerd`` to make sure that they match. Both of them have to be either ``cgroupfs`` or ``systemd``.


You don't see Kubernetes metadata in Network Explorer metrics
====================================================================================

Your Network Explorer metrics are not generated with Kubernetes metadata, even though the Kubernetes collector isn't disabled.

Causes
----------------

- The service account token might not be available.


Solution
----------------

Follow these steps to troubleshoot this problem.

#. Run the following commands to retrieve the logs for the ``k8s-watcher`` and ``k8s-relay`` containers in the ``k8s-collector`` pod.

    .. code-block:: bash

        kubectl logs network-explorer-splunk-otel-network-explorer-k8s-collectokrm4k -c k8s-watcher
        kubectl logs network-explorer-splunk-otel-network-explorer-k8s-collectokrm4k -c k8s-relay

#. Determine errors based on the logs.


