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

Your ``kubelet`` and ``containerd`` cgroup drivers might be not be the same value.

Solution
----------------

Check the cgroup drivers of your ``kubelet`` and ``containerd`` to make sure that they match. Both of them have to be either ``cgroupfs`` or ``systemd``.