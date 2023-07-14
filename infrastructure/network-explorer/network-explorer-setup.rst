

.. _network-explorer-setup:


*******************************************************
Set up Network Explorer
*******************************************************

.. meta::
    :description: Install and configure Network Explorer on Kubernetes systems

.. note:: The following topic only applies to Kubernetes systems. If you want to set up Network Explorer on other systems, see :ref:`network-explorer-setup-non-k8s`.

You can install and configure Network Explorer as part of the Splunk Distribution of OpenTelemetry Collector Helm chart.

Prerequisites
==============================

To use Network Explorer with Kubernetes, you must meet the following requirements.

 .. list-table::
    :header-rows: 1
    :widths: 30 70

    * - :strong:`Prerequisite`
      - :strong:`Description`
        
    * - Environment
      - Network Explorer is supported in Kubernetes-based environments on Linux hosts. Use Helm-based management.
      
    * - Operating system
      - RedHat Linux versions 7.6 or higher, Ubuntu versions 16.04 or higher, Debian Stretch+, Amazon Linux 2, Google COS

    * - Kubernetes version
      - Network Explorer is supported on all active releases of Kubernetes. For more information, see :new-page:`Releases <https://kubernetes.io/releases/>` in the Kubernetes documentation. 

To use Network Explorer with OpenShift, you must meet the following requirements.

 .. list-table::
    :header-rows: 1
    :widths: 30 70

    * - :strong:`Prerequisite`
      - :strong:`Description`
        
    * - OpenShift version
      - An on-premises OpenShift cluster or an OpenShift Rosa cluster version 4.12.18 or 4.12.13
      
    * - Admin role
      - You must be an admin in Splunk Observability Cloud to install Network Explorer on OpenShift


Network Explorer components
=================================

Network Explorer consists of the following components:

 .. list-table::
   :header-rows: 1
   :widths: 20 30 25 25
    
   * - :strong:`Component`
     - :strong:`Description`
     - :strong:`Required?`
     - :strong:`Enabled by default?`

   * - The reducer
     - The reducer takes the data points collected by the collectors and reduces them to actual metric time series (MTS). The reducer also connects to the Splunk Distribution of OpenTelemetry Collector on the OTLP gRPC port.
     - Yes. Install and configure at least one instance of the reducer.     
     - Yes

   * - The kernel collector
     - The Extended Berkeley Packet Filter (eBPF) agent responsible for gathering data points from the kernel. 
     - Yes. Install and configure the kernel collector on each of your hosts. 
     - Yes
        
   * - The Kubernetes collector 
     - The Kubernetes collector further enriches collected data points with additional metadata. 
     - No. If you want to get additional metadata, install and configure at least one instance of the Kubernetes collector on each Kubernetes cluster. 
     - Yes. If you want to disable the Kubernetes collector, set ``k8sCollector.enabled`` to ``false``.

   * - The cloud collector
     - The cloud collector further enriches collected data points with additional metadata.
     - No. If your Kubernetes is hosted by, or installed within, AWS, and you want to get additional metadata, install and configure at least one instance of the cloud collector.
     - No. If you want to enable the cloud collector, set ``cloudCollector.enabled`` to ``true``.
         

.. _install-network-explorer:

Install Network Explorer
=======================================================================================

For the Splunk Distribution of OpenTelemetry Collector to work with Network Explorer, you must install it in data forwarding (gateway) mode, and perform the following steps:

- Enable OTLP gRPC reception by configuring an OTLP gRPC metric receiver on the Gateway.
- Enable SignalFx export by configuring a SignalFx exporter on the Gateway with the valid realm and access token.

The OTLP gRPC metric receiver and SignalFx exporter are already configured in the Helm chart for the Splunk Distribution of OpenTelemetry Collector, so if you use the Helm chart method to install the Splunk Distribution of OpenTelemetry Collector, you don't need to configure these requirements separately.

The following table shows required parameters for this installation:

    .. list-table::
       :header-rows: 1
       :widths: 50 50

       * - :strong:`Parameter`
         - :strong:`Description`
          
       * - ``namespace``
         - The Kubernetes namespace to install into. This value must match the value for the namespace of the Network Explorer.
       * - ``splunkObservability.realm``
         - Splunk realm to send telemetry data to. For example, ``us0``.   
       * - ``splunkObservability.accessToken``
         - The access token for your organization. An access token with ingest scope is sufficient. For more information, see :ref:`admin-org-tokens`.        
       * - ``clusterName``
         - An arbitrary value that identifies your Kubernetes cluster.
       * - ``networkExplorer.enabled``
         - Set this to ``true`` to enable Network Explorer.
       * - ``agent.enabled``
         - * If you are adding Network Explorer to an existing Splunk Distribution of OpenTelemetry Collector configuration, leave ``agent.enabled`` as is.
           * If you are installing a new instance of the Splunk Distribution of OpenTelemetry Collector and only want to collect telemetry from Network Explorer, set this to ``false`` to disable installing the Splunk Distribution of OpenTelemetry Collector in host monitoring (agent) mode on each Kubernetes node.
           * If you are installing a new instance of the Splunk Distribution of OpenTelemetry Collector and want to collect telemetry from both Network Explorer and the individual OpenTelemetry Collector agents, set this to ``true``.
       * - ``clusterReceiver.enabled``
         - * If you are adding Network Explorer to an existing Splunk Distribution of OpenTelemetry Collector configuration, leave ``clusterReceiver.enabled`` as is.
           * If you are installing a new instance of the Splunk Distribution of OpenTelemetry Collector and only want to collect telemetry from Network Explorer, set this to ``false`` since Network Explorer doesn't use ``splunk-otel-collector-k8s-cluster-receiver``.
           * If you are installing a new instance of the Splunk Distribution of OpenTelemetry Collector and want to collect cluster-level metrics from the Kubernetes API server in addition to Network Explorer telemetry, set this to ``true``.
       * - ``gateway.replicaCount``
         - Set this to ``1`` since Network Explorer doesn't support communication to multiple gateway replicas.


Example: Install Network Explorer for Kubernetes
----------------------------------------------------------

In this example, the reducer, the kernel collector, and the Kubernetes collector are configured. The cloud collector isn't enabled.

Follow these steps to install Network Explorer using the Helm chart method:

#. Run the following command to deploy the Helm chart.

    .. code-block:: bash

        helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart

#. Run the following command to update the Helm chart.

    .. code-block:: bash

        helm repo update

#. Run the following command to install the Splunk Distribution of OpenTelemetry Collector. Replace the parameters with their appropriate values.

    .. tabs::

      .. code-tab:: bash Collect only Network Explorer telemetry

          helm --namespace=<NAMESPACE> install my-splunk-otel-collector \
          --set="splunkObservability.realm=<REALM>" \
          --set="splunkObservability.accessToken=<ACCESS_TOKEN>" \
          --set="clusterName=<CLUSTER_NAME>" \
          --set="networkExplorer.enabled=true" \
          --set="agent.enabled=false" \
          --set="clusterReceiver.enabled=false" \
          --set="gateway.replicaCount=1" \
          splunk-otel-collector-chart/splunk-otel-collector
      
      .. code-tab:: bash Collect Network Explorer and other telemetry

          helm --namespace=<NAMESPACE> install splunk-otel-collector \
          --set="splunkObservability.realm=<REALM>" \
          --set="splunkObservability.accessToken=<ACCESS_TOKEN>" \
          --set="clusterName=<CLUSTER_NAME>" \
          --set="splunkObservability.logsEnabled=true" \
          --set="splunkObservability.infrastructureMonitoringEventsEnabled=true" \
          --set="networkExplorer.enabled=true" \
          --set="networkExplorer.podSecurityPolicy.enabled=false" \
          --set="agent.enabled=true" \
          --set="clusterReceiver.enabled=true" \
          --set="gateway.replicaCount=1" \
          --set="environment=<APM_ENV>" \
          --set="gateway.resources.limits.cpu=500m" \
          --set="gateway.resources.limits.memory=1Gi" \
          splunk-otel-collector-chart/splunk-otel-collector


#. (Optional) The Network Explorer kernel collector requires kernel headers to run the kernel in each Kubernetes node. The kernel collector installs the headers automatically unless your nodes don't have access to the internet.

    If you need to install the required packages manually, run the following command:

    .. tabs::

      .. code-tab:: bash Debian

        sudo apt-get install --yes linux-headers-$(uname -r)

      .. code-tab:: bash RedHat Linux/Amazon Linux

        sudo yum install -y kernel-devel-$(uname -r)

For additional Splunk Distribution of OpenTelemetry Collector configuration, see :ref:`otel-install-k8s`.     


Example: Install Network Explorer for OpenShift
----------------------------------------------------------

Follow these steps to install Network Explorer for OpenShift:

#. Each node of an OpenShift cluster runs on Red Hat Enterprise Linux CoreOS, which has SELinux enabled by default. To install the Network Explorer kernel collector, you have to configure Super-Privileged Container (SPC) for SELinux. Run the following script to modify the SELinux SPC policy to allow additional access to ``spc_t`` domain processes. 

    .. code-block:: bash

      tmp_dir=$(mktemp -d -t EBPF_NET-XXXXX)

      cat > "${tmp_dir}/spc_bpf_allow.te" <<END
      module spc_bpf_allow 1.0;
      require {
          type spc_t;
          class bpf {map_create map_read map_write prog_load prog_run};
      }
      #============= spc_t ==============

      allow spc_t self:bpf { map_create map_read map_write prog_load prog_run };
      END
      checkmodule -M -m -o "${tmp_dir}/spc_bpf_allow.mod" "${tmp_dir}/spc_bpf_allow.te"
      semodule_package -o "${tmp_dir}/spc_bpf_allow.pp" -m "${tmp_dir}/spc_bpf_allow.mod"
      semodule -i "${tmp_dir}/spc_bpf_allow.pp"

#. Run the following commands to deploy the Helm chart.
    
    .. code-block:: bash
      
      helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart

#. Run the following command to update the Helm chart.

    .. code-block:: bash

        helm repo update

#. Run the following command to install the Splunk Distribution of OpenTelemetry Collector. Replace the parameters with their appropriate values.

    .. code-block:: bash

        helm --namespace=<NAMESPACE> install my-splunk-otel-collector \
        --set="splunkObservability.realm=<REALM>" \
        --set="splunkObservability.accessToken=<ACCESS_TOKEN>" \
        --set="distribution=openshift" \
        --set="clusterName=<CLUSTER_NAME>" \
        --set="networkExplorer.enabled=true" \
        --set="agent.enabled=true" \
        --set="clusterReceiver.enabled=true" \
        --set="gateway.replicaCount=1" \
        --set="networkExplorer.podSecurityPolicy.enabled=false" \
        --set="networkExplorer.rbac.create=true" \
        --set="networkExplorer.k8sCollector.serviceAccount.create=true" \
        --set="networkExplorer.kernelCollector.serviceAccount.create=true" \
        --set="networkExplorer.kernelCollector.image.tag=4.18.0-372.51.1.el8_6.x86_64" \
        --set="networkExplorer.kernelCollector.image.repository=quay.io/splunko11ytest/network-explorer-debug" \
        --set="networkExplorer.kernelCollector.image.name=kernel-collector-openshift" \
        splunk-otel-collector-chart/splunk-otel-collector

#. The Network Explorer kernel collector pods need privileged access to function. Run the following command to configure privileged access for the kernel collector pods.

    .. code-block:: bash

        oc adm policy add-scc-to-user privileged -z my-splunk-otel-collector-kernel-collector -n <NAMESPACE>

#. Run the following command to update the default security context constraints (SCC) for your OpenShift cluster, so that images are not forced to run as a pre-allocated User Identifier, without granting everyone access to the privileged SCC. 

    .. code-block:: bash

        oc adm policy add-scc-to-user anyuid -z my-splunk-otel-collector-k8s-collector -n <NAMESPACE>

.. _resize-otel-installation:

Change the resource footprint of Splunk Distribution of OpenTelemetry Collector
==================================================================================

Each Kubernetes node has a Splunk Distribution of OpenTelemetry Collector, so you might want to adjust your resources depending on the number of Kubernetes nodes you have.
    
    You can update the :new-page:`Splunk Distribution of OpenTelemetry Collector values file <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml#L972>`, or specify different values during installation.
    
    These are the default resource configurations.

    .. code-block:: yaml

      resources:
        limits:
          cpu: 4
          memory: 8Gi

    Use the following approximations to determine your resource needs.

      .. list-table::
       :header-rows: 1
       :widths: 50 50

       * - :strong:`Approximation`
         - :strong:`Resource needs`
          
       * - Up to 500 nodes/5,000 data points per second
         - CPU: 500m, memory: 1 Gi
       * - Up to 1,000 nodes/10,000 data points per second
         - CPU: 1, memory: 2 Gi
       * - Up to 2,000 nodes/20,000 data points per second
         - CPU: 2, memory: 4 Gi


Example
------------

In the following example, CPU is set to :strong:`500m`, and memory is set to :strong:`1 Gi`.

  .. tabs::

    .. code-tab:: yaml Update the value file
 
      resources:
        limits:
          cpu: 500m
          memory: 1Gi

    .. code-tab:: bash Pass arguments during installation

      helm --namespace=<NAMESPACE> install my-splunk-otel-collector --set="splunkObservability.realm=<REALM>,splunkObservability.accessToken=<ACCESS_TOKEN>,clusterName=<CLUSTER_NAME>,agent.enabled=false,clusterReceiver.enabled=false,networkExplorer.enabled=true,gateway.replicaCount=1,gateway.resources.limits.cpu=500m,gateway.resources.limits.memory=1Gi" splunk-otel-collector-chart/splunk-otel-collector

.. _resize-installation:

Resize your Network Explorer installation
=============================================

Depending on the number of Kubernetes nodes you have, your resource needs might vary. You can make the following adjustments to your installation.

Change the resource footprint of the reducer
----------------------------------------------

The reducer is a single pod per Kubernetes cluster. If your cluster contains a large number of pods, nodes, and services, you can increase the resources allocated to it.

The reducer processes telemetry in multiple stages, with each stage partitioned into one or more shards, where each shard is a separate thread. Increasing the number of shards in each stage expands the capacity of the reducer.
 
Change the following parameters in the :new-page:`Splunk Distribution of OpenTelemetry Collector values file <https://github.com/signalfx/splunk-otel-collector-chart/blob/954a4d66c647b0ce2cd47113a247d26c48164b9d/helm-charts/splunk-otel-collector/values.yaml#L1105>` to increase or decrease the number of shards per reducer stage. You can set between 1-32 shards.

The default configuration is 1 shard per reducer stage.

    .. code-block:: yaml

      networkExplorer:
        reducer:
          ingestShards: 1
          matchingShards: 1
          aggregationShards: 1

Example
+++++++++     

The following example uses 4 shards per reducer stage.

    .. code-block:: yaml

      networkExplorer:
        reducer:
          ingestShards: 4
          matchingShards: 4
          aggregationShards: 4

Estimate reducer CPU and memory usage
+++++++++++++++++++++++++++++++++++++++
To estimate the CPU and memory usage the reducer might require from a node, you can use these simple formulas:

::

    Memory in Mebibytes (Mi) = 4 * Number of nodes in your cluster + 60
    Fractional CPU in milliCPU (m) = Number of nodes in your cluster + 30

This gives you an approximate expected usage. Multiply the final numbers by a factor of 1.5 or 2 to give headroom for growth and spikes in usage.


.. _customize-network-explorer-metrics:

Customize network telemetry generated by Network Explorer
-------------------------------------------------------------

If you want to collect fewer or more network telemetry metrics, you can update the :new-page:`Splunk Distribution of OpenTelemetry Collector values file <https://github.com/signalfx/splunk-otel-collector-chart/blob/954a4d66c647b0ce2cd47113a247d26c48164b9d/helm-charts/splunk-otel-collector/values.yaml#L1109>`.

The following sections show you how to disable or enable different metrics.

Enable all metrics, including metrics turned off by default
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    .. code-block:: yaml 

      networkExplorer:
        reducer:
          disableMetrics:
            - none
              
Disable entire metric categories
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    .. code-block:: yaml 
      
      networkExplorer:
        reducer:
          disableMetrics:
            - tcp.all 
            - udp.all
            - dns.all
            - http.all


Disable an individual TCP metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    .. code-block:: yaml 

      networkExplorer:
        reducer:
          disableMetrics:
            - tcp.bytes
            - tcp.rtt.num_measurements
            - tcp.active
            - tcp.rtt.average
            - tcp.packets
            - tcp.retrans
            - tcp.syn_timeouts
            - tcp.new_sockets
            - tcp.resets


Disable an individual UDP metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    .. code-block:: yaml 

      networkExplorer:
        reducer:
          disableMetrics:
            - udp.bytes
            - udp.packets
            - udp.active
            - udp.drops

Disable an individual DNS metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    .. code-block:: yaml 

      networkExplorer:
        reducer:
          disableMetrics:
            - dns.client.duration.average
            - dns.server.duration.average
            - dns.active_sockets
            - dns.responses
            - dns.timeouts

Disable an individual HTTP metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    .. code-block:: yaml

      networkExplorer:
        reducer:
          disableMetrics:
            - http.client.duration.average
            - http.server.duration.average
            - http.active_sockets
            - http.status_code

Disable an internal metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    .. code-block:: yaml

      networkExplorer:
        reducer:
          disableMetrics:
            - ebpf_net.bpf_log
            - ebpf_net.otlp_grpc.bytes_sent
            - ebpf_net.otlp_grpc.failed_requests
            - ebpf_net.otlp_grpc.metrics_sent
            - ebpf_net.otlp_grpc.requests_sent
            - ebpf_net.otlp_grpc.successful_requests
            - ebpf_net.otlp_grpc.unknown_response_tags

.. note:: This list represents the set of internal metrics which are enabled by default.

Enable entire metric categories
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    .. code-block:: yaml 

      networkExplorer:
        reducer:
          enableMetrics:
            - tcp.all 
            - udp.all
            - dns.all
            - http.all
            - ebpf_net.all

Enable an individual TCP metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    .. code-block:: yaml 

      networkExplorer:
        reducer:
          enableMetrics:
            - tcp.bytes
            - tcp.rtt.num_measurements
            - tcp.active
            - tcp.rtt.average
            - tcp.packets
            - tcp.retrans
            - tcp.syn_timeouts
            - tcp.new_sockets
            - tcp.resets

Enable an individual UDP metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    .. code-block:: yaml 

      networkExplorer:
        reducer:
          enableMetrics:
            - udp.bytes
            - udp.packets
            - udp.active
            - udp.drops

Enable an individual DNS metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    .. code-block:: yaml 

      networkExplorer:
        reducer:
          enableMetrics:
            - dns.client.duration.average
            - dns.server.duration.average
            - dns.active_sockets
            - dns.responses
            - dns.timeouts

Enable an individual HTTP metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    .. code-block:: yaml

      networkExplorer:
        reducer:
          enableMetrics:
            - http.client.duration.average
            - http.server.duration.average
            - http.active_sockets
            - http.status_code

Enable an internal metric
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    .. code-block:: yaml

      networkExplorer:
        reducer:
          enableMetrics:
            - ebpf_net.span_utilization_fraction 
            - ebpf_net.pipeline_metric_bytes_discarded
            - ebpf_net.codetiming_min_ns
            - ebpf_net.entrypoint_info
            - ebpf_net.otlp_grpc.requests_sent

.. note:: This list does not include the entire set of internal metrics.

Example
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In the following example, all HTTP metrics along with certain individual TCP and UDP metrics are disabled. All DNS metrics are collected.

    .. code-block:: yaml

      networkExplorer:
        reducer:
          disableMetrics:
            - http.all
            - tcp.syn_timeouts
            - tcp.new_sockets
            - tcp.resets
            - udp.bytes
            - udp.packets        

In the following example, all HTTP metrics along with certain individual internal metrics are enabled.

  .. note:: The ``disableMetrics`` flag is evaluated before the ``enableMetrics`` flag.

  .. code-block:: yaml

      networkExplorer:
        reducer:
          enableMetrics:
            - http.all
            - ebpf_net.codetiming_min_ns
            - ebpf_net.entrypoint_info

Next steps
====================================

Once you set up Network Explorer, you can start monitoring network telemetry metrics coming into your Splunk Infrastructure Monitoring platform using one or more of the following options:

- Built-in Network Explorer navigators. To see the Network Explorer navigators, follow these steps:

  #. From the Splunk Observability Cloud home page, select :strong:`Infrastructure` on the left navigator.
  #. Select :strong:`Network Explorer`.

      .. image:: /_images/images-network-explorer/network-explorer-navigators.png
        :alt: Network Explorer navigator tiles on the Infrastructure landing page.
        :width: 80%

  #. Select the card for the Network Explorer navigator you want to view.

  For more information, see :ref:`use-navigators-imm`.

- Service map. For more information, see :ref:`network-explorer-network-map`.
- Alerts and detectors. For more information, see :ref:`get-started-detectoralert`.

For more information on metrics available to collect with Network Explorer, see :ref:`network-explorer-metrics`.
