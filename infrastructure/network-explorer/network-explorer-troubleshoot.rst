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

Cause
----------------

Your ``kubelet`` and ``containerd`` cgroup drivers might be set to ``systemd``.

Solution
----------------

You need to change the cgroup drivers on all nodes to ``cgroupfs``. Follow these steps for each node in the cluster:

#. Run the following command to drain the node.

    .. code-block:: bash

        kubectl drain <node-name> --ignore-daemonsets

#. Run the following command to stop the ``kubelet``.

    .. code-block:: bash

        systemctl stop kubelet

#. Run the following command to stop the container runtime.

    .. code-block:: bash

        systemctl stop containerd

#. Modify the container runtime cgroup driver to ``cgroupfs``.

   * For ``containerd``, set ``SystemdCgroup = false`` in the ``/etc/containerd/config.toml`` file.

    .. code-block::

        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
            
            ...
        
        [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
                SystemdCgroup = false

    * For ``kubelet``, set ``cgroupDriver: cgroupfs`` in the ``/var/lib/kubelet/config.yaml`` file.

#. Run the following command to start the container runtime.

    .. code-block:: bash

        systemctl start containerd 
    
#. Run the following command to start using ``kubelet``.

    .. code-block:: bash

        systemctl start containerd 

#. Run the following command to uncordon the node.

    .. code-block:: bash

        kubectl uncordon <node-name>