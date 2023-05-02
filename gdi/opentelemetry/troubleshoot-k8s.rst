.. _tshoot-k8s-container-runtimes:

***************************************************************
Troubleshoot the Collector for Kubernetes 
***************************************************************

.. meta::
    :description: Describes the Kubernetes and container runtimes in the Splunk Distribution of OpenTelemetry Collector.

This topic describes how to troubleshoot incompatibility issues. A Kubernetes cluster using an incompatible container runtime for its version or configuration could experience the following issues cluster-wide:

- Stats from containers, pods, or nodes being absent or malformed. As a result, the Collector that requires these stats does not produce the desired corresponding metrics.
- Containers, pods, and nodes fail to start successfully or stop cleanly.
- The kubelet process on a node is in a defunct state.

Kubernetes requires you to install a :new-page:`container runtime <https://kubernetes.io/docs/setup/production-environment/container-runtimes/>`` on each node in the cluster so that pods can run there. The compatibility level of a specific Kubernetes version and container runtime can vary, so :ref:`use a version of Kubernetes and a container runtime that are known to be compatible <check-runtimes>`. Multiple container runtimes such as containerd, CRI-O, Docker, and Mirantis Kubernetes Engine (formerly Docker Enterprise/UCP) are all supported. 

.. _check-runtimes:

Check the container runtime compatibility
=============================================================================================
First, run ``kubectl get nodes -o wide`` to determine what version of Kubernetes and container runtime are being used. The ``-o wide`` flag prints the output in the plain-text format with any additional information. For pods, the node name is included. In the following example, ``node-1`` uses Kubernetes 1.19.6 and containerd 1.4.1:

   .. code-block:: yaml

      kubectl get nodes -o wide
      NAME         STATUS   VERSION   CONTAINER-RUNTIME
      node-1       Ready    v1.19.6   containerd://1.4.1

Next, verify that you are using a container runtime compatible with your Kubernetes version. Refer to the following vendor documentation to see the container runtime compatibility:

   - :new-page:`containerd <https://containerd.io/releases/#kubernetes-support>`
   - :new-page:`CRI-O <https://github.com/cri-o/cri-o#compatibility-matrix-cri-o--kubernetes>`
   - :new-page:`Mirantis <https://docs.mirantis.com/container-cloud/latest/compat-matrix.html>`

.. _check-integrity:

Check the integrity of Kubelet Summary API stats
==========================================================
Use the Kubelet Summary API to verify container, pod, and node stats. The Kubelet provides the Summary API to discover and retrieve per-node summarized stats available through the ``/stats`` endpoint.

   - The following examples show how to verify that the CPU, memory, and networks stats the Collector uses to generate Kubelet Stats Receiver metrics are present. You can expand these techniques to evaluate other Kubernetes stats that are available. 
   - All of the stats shown in these examples should be present unless otherwise noted. If your output is missing stats or your stat values appear to be in a different format, your Kubernetes cluster and container runtime might not be fully compatible.

.. _verify-node-stats:

Verify a node's stats
------------------------------
To verify a node's stats:

1. Run the following command to get the names of the nodes in your cluster to pull raw resource usage stats from one of the nodes:

   .. code-block:: yaml

      kubectl get nodes -o wide

2. Pick a node to evaluate, and set its name to an environment variable. In the following example, the node is named ``node-1``:

   .. code-block:: yaml

      NODE_NAME=node-1

3. Verify that the node has the proper stats:

   .. code-block:: none

      kubectl get --raw "/api/v1/nodes/"${NODE_NAME}"/proxy/stats/summary" | jq '{"node": {"name": .node.nodeName, "cpu": .node.cpu, "memory": .node.memory, "network": .node.network}} | del(.node.network.interfaces)'
      {
        "node": {
          "name": "node-1",
          "cpu": {
            "time": "2022-05-20T18:12:08Z",
            "usageNanoCores": 149771849,
            "usageCoreNanoSeconds": 2962750554249399
          },
          "memory": {
            "time": "2022-05-20T18:12:08Z",
            "availableBytes": 2701385728,  
            # Could be absent if node memory allocations were missing.
            "usageBytes": 3686178816,
            "workingSetBytes": 1421492224,
            "rssBytes": 634343424,
            "pageFaults": 18632526,
            "majorPageFaults": 726
          },
          "network": {
            "time": "2022-05-20T18:12:08Z",
            "name": "eth0",
            "rxBytes": 105517219156,
            "rxErrors": 0,
            "txBytes": 98151853779,
            "txErrors": 0
          }
        }
      }

For reference, the following table shows the mapping for the node stat names to the Collector metric names:

.. list-table:: 
   :widths: 50 50 
   :header-rows: 1

   * - Node stat name
     - Collector metric name
   * - ``cpu.usageNanoCores``
     - ``k8s.node.cpu.utilization``
   * - ``cpu.usageCoreNanoSeconds``
     - ``k8s.node.cpu.time``
   * - ``memory.availableBytes``  
     - ``k8s.node.memory.available``
   * - ``memory.usageBytes``
     - ``k8s.node.filesystem.usage``
   * - ``memory.workingSetBytes``
     - ``k8s.node.memory.working_set``
   * - ``memory.rssBytes``
     - ``k8s.node.memory.rss``
   * - ``memory.pageFaults``
     - ``k8s.node.memory.page_faults``
   * - ``memory.majorPageFaults`` 
     - ``k8s.node.memory.major_page_faults``
   * - ``network.rxBytes``
     - ``k8s.node.network.io{direction="receive"}``
   * - ``network.rxErrors``
     - ``k8s.node.network.errors{direction="receive"}``
   * - ``network.txBytes``
     - ``k8s.node.network.io{direction="transmit"}``
   * - ``network.txErrors``
     - ``k8s.node.network.error{direction="transmit"}``

.. _verify-pod-stats:

Verify a pod's stats
----------------------------
.. note::
   
   You must complete steps 1 and 2 in :ref:`verify-node-stats` before completing this section.

To verify a pod's stats:

1. Run the following command to get the names of the pods in your selected node to pull raw resource usage stats from one of the pods:
   
   .. code-block:: yaml

      kubectl get --raw "/api/v1/nodes/"${NODE_NAME}"/proxy/stats/summary" | jq '.pods[].podRef.name'

2. Select a pod to evaluate, and set its name to an environment variable. In the following example, the pod is named ``splunk-otel-collector-agent-6llkr``:
   
   .. code-block:: yaml

      POD_NAME=splunk-otel-collector-agent-6llkr

3. Verify that the pod has the proper stats:

   .. code-block:: none

      kubectl get --raw "/api/v1/nodes/"${NODE_NAME}"/proxy/stats/summary" | jq '.pods[] | select(.podRef.name=='\"$POD_NAME\"') | {"pod": {"name": .podRef.name, "cpu": .cpu, "memory": .memory, "network": .network}} | del(.pod.network.interfaces)'
      {
        "pod": {
          "name": "splunk-otel-collector-agent-6llkr",
          "cpu": {
            "time": "2022-05-20T18:38:47Z",
            "usageNanoCores": 10774467,
            "usageCoreNanoSeconds": 1709095026234
          },
          "memory": {
            "time": "2022-05-20T18:38:47Z",
            "availableBytes": 781959168, 
            # Could be absent if pod memory limits were missing.
            "usageBytes": 267563008,
            "workingSetBytes": 266616832,
            "rssBytes": 257036288,
            "pageFaults": 0,
            "majorPageFaults": 0
          },
          "network": {
            "time": "2022-05-20T18:38:55Z",
            "name": "eth0",
            "rxBytes": 105523812442,
            "rxErrors": 0,
            "txBytes": 98159696431,
            "txErrors": 0
          }
        }
      }

For reference, the following table shows the mapping for the pod stat names to the Collector metric names: 

.. list-table:: 
   :widths: 50 50 
   :header-rows: 1

   * - Pod stat name
     - Collector metric name
   * - ``pod.cpu.usageNanoCores``
     - ``k8s.pod.cpu.utilization``
   * - ``pod.cpu.usageCoreNanoSeconds``
     - ``k8s.pod.cpu.time``
   * - ``pod.memory.availableBytes``  
     - ``k8s.pod.memory.available``
   * - ``pod.memory.usageBytes``
     - ``k8s.pod.filesystem.usage``
   * - ``pod.memory.workingSetBytes``
     - ``k8s.pod.memory.working_set``
   * -  ``pod.memory.rssBytes``
     - ``k8s.pod.memory.rss``
   * - ``pod.memory.pageFaults``
     - ``k8s.pod.memory.page_faults``
   * - ``pod.memory.majorPageFaults``
     - ``k8s.pod.memory.major_page_faults``
   * - ``pod.network.rxBytes``
     - ``k8s.pod.network.io{direction="receive"}`` or ``pod_network_receive_bytes_total``
   * - ``pod.network.rxErrors``
     - ``k8s.pod.network.errors{direction="receive"}`` or ``pod_network_receive_errors_total``
   * - ``pod.network.txBytes``
     - ``k8s.pod.network.io{direction="transmit"}`` or ``pod_network_transmit_bytes_total``
   * - ``pod.network.txErrors``
     - ``k8s.pod.network.error{direction="transmit"}`` or ``pod_network_transmit_errors_total``

.. _verify-container-stats:

Verify a container's stats
----------------------------------
.. note::

   You must complete steps 1 and 2 in both :ref:`verify-node-stats` and :ref:`verify-pod-stats` before completing this section.

To verify a container's stats:

1. Run the following command to get the names of the containers in your selected pod to pull raw resource usage stats from one of the containers:

   .. code-block:: yaml

      kubectl get --raw "/api/v1/nodes/"${NODE_NAME}"/proxy/stats/summary" | jq '.pods[] | select(.podRef.name=='\"$POD_NAME\"') | .containers[].name'

2. Select a container to evaluate, and set its name to an environment variable. In the following example, the container is named ``otel-collector``:
   
   .. code-block:: yaml

      CONTAINER_NAME=otel-collector

3. Verify that the container has the proper stats:

   .. code-block:: none

      kubectl get --raw "/api/v1/nodes/"${NODE_NAME}"/proxy/stats/summary" | jq '.pods[] | select(.podRef.name=='\"$POD_NAME\"') | .containers[] | select(.name=='\"$CONTAINER_NAME\"') | {"container": {"name": .name, "cpu": .cpu, "memory": .memory}}'
      {
        "container": {
          "name": "otel-collector",
          "cpu": {
            "time": "2022-05-20T18:42:15Z",
            "usageNanoCores": 6781417,
            "usageCoreNanoSeconds": 1087899649154
          },
          "memory": {
            "time": "2022-05-20T18:42:15Z",
            "availableBytes": 389480448, 
            # Could be absent if container memory limits were missing.
            "usageBytes": 135753728,
            "workingSetBytes": 134807552,
            "rssBytes": 132923392,
            "pageFaults": 93390,
            "majorPageFaults": 0
          }
        }
      }

For reference, the following table shows the mappings for the container stat names to the Collector metric names:

.. list-table:: 
   :widths: 50 50 
   :header-rows: 1

   * - Container stat name
     - Collector metric name
   * - ``container.cpu.usageNanoCore``
     - ``container.cpu.utilization``
   * - ``container.cpu.usageCoreNanoSeconds``
     - ``container.cpu.time``
   * - ``container.memory.availableBytes``
     - ``container.memory.available``
   * - ``container.memory.usageBytes``
     - ``container.memory.usage``
   * - ``container.memory.workingSetBytes``
     - ``container.memory.working_set``
   * - ``container.memory.rssBytes``
     - ``container.memory.rss``
   * - ``container.memory.pageFaults``
     - ``container.memory.page_faults``
   * - ``container.memory.majorPageFaults``
     - ``container.memory.major_page_faults``


Reported incompatible Kubernetes and container runtime issues
=======================================================================

.. note:: Note

   Managed Kubernetes services might use a modified container runtime, and the service provider might have applied custom patches or bug fixes that are not present within an unmodified container runtime.

This section describes known incompatibilities and container runtime issues.

containerd with Kubernetes 1.21.0 to 1.21.11 
--------------------------------------------------------------------------------

When using Kubernetes 1.21.0 to 1.21.11 with containerd, memory and network stats or metrics can be missing. The following is a list of affected metrics:

- ``k8s.pod.network.io{direction="receive"}`` or ``pod_network_receive_bytes_total``
-  ``k8s.pod.network.errors{direction="receive"}`` or ``pod_network_receive_errors_total``
-  ``k8s.pod.network.io{direction="transmit"}`` or ``pod_network_transmit_bytes_total``
- ``k8s.pod.network.error{direction="transmit"}`` or ``pod_network_transmit_errors_total``
- ``container.memory.available``
- ``container.memory.usage``
- ``container.memory.rssBytes``
- ``container.memory.page_faults``
- ``container.memory.major_page_faults``

Try one of the following workarounds to resolve the issue:

- Upgrade Kubernetes to at least version 1.21.12.
- Upgrade containerd to version 1.4.x or 1.5.x.

containerd 1.4.0 to 1.4.12 with Kubernetes 1.22.0 to 1.22.8 
--------------------------------------------------------------------------------

When using Kubernetes 1.22.0 to 1.22.8 with containerd 1.4.0 to 1.4.12, memory and network stats or metrics can be missing. The following is a list of affected metrics:

- ``k8s.pod.network.io{direction="receive"}`` or ``pod_network_receive_bytes_total``
- ``k8s.pod.network.errors{direction="receive"}`` or ``pod_network_receive_errors_total``
- ``k8s.pod.network.io{direction="transmit"}`` or ``pod_network_transmit_bytes_total``
- ``k8s.pod.network.error{direction="transmit"}`` or ``pod_network_transmit_errors_total``
- ``k8s.pod.memory.available``
- ``container.memory.available``
- ``container.memory.usage``
- ``container.memory.rssBytes``
- ``container.memory.page_faults``
- ``container.memory.major_page_faults``

Try one of the following workarounds to resolve the issue:

- Upgrade Kubernetes to at least version 1.22.9 to fix the the missing container memory and pod network metrics.
- Upgrade containerd to at least version 1.4.13 or 1.5.0 to fix the missing pod memory metrics.

containerd with Kubernetes 1.23.0 to 1.23.6
--------------------------------------------------------------------------------
When using Kubernetes versions 1.23.0 to 1.23.6 with containerd, memory stats or metrics can be missing. The following is a list of affected metrics: 

- ``k8s.pod.memory.available``

At this time, there is no workaround for this issue. 


