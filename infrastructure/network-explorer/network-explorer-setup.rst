:orphan:

.. include:: /_includes/network-explorer/network-explorer-preview-header.rst


.. _network-explorer-setup:


*******************************************************
Set up Network Explorer
*******************************************************

.. meta::
    :description: Install and configure Network Explorer

In summary, you need to install two main components:

#. Splunk Distribution of OpenTelemetry Collector in Gateway mode. You must configure this mode first before you can install Network Explorer. See :ref:`network-explorer-otel-collector`.
#. Network Explorer. See :ref:`install-network-explorer`.

Prerequisites
==============================

To use Network Explorer, you must meet the following requirements.

 .. list-table::
    :header-rows: 1
    :widths: 30 70

    * - :strong:`Prerequisite`
      - :strong:`Description`
        
    * - Environment
      - Network Explorer is only supported in Kubernetes-based environments on Linux hosts. Use Helm-based management.
      
    * - Operating system
      - RedHat Linux: 7.6+, Ubuntu 16.04+, Debian Stretch+, Amazon Linux 2, Google COS

    * - Kubernetes version
      - Network Explorer is supported on all active releases of Kubernetes. For more information, see :new-page:`Releases <https://kubernetes.io/releases/>` in the Kubernetes documentation. 


.. _network-explorer-otel-collector:

Step 1: Install the Splunk Distribution of OpenTelemetry Collector for Network Explorer
=======================================================================================

For the Splunk Distribution of OpenTelemetry Collector to work with Network Explorer, you must install it in Gateway mode, and perform the following steps:

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
       * - ``gateway.enabled``
         - Set this to ``true`` to enable Gateway mode.
       * - ``agent.enabled``
         - Set this to ``false`` to disable installing the Splunk Distribution of OpenTelemetry Collector in Agent mode on each Kubernetes node.
       * - ``clusterReceiver.enabled``
         - Set this to ``false`` since Network Explorer doesn't use ``splunk-otel-collector-k8s-cluster-receiver``.
       * - ``gateway.replicaCount``
         - Set this to ``1`` since Network Explorer doesn't support communication to multiple gateway replicas.


Example
--------------------------

Follow these steps to install the Splunk Distribution of OpenTelemetry Collector for Network Explorer using the Helm chart method: 

#. Run the following command to deploy the Helm chart.

    .. code-block:: bash

        helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart

#. Run the following command to update the Helm chart.

    .. code-block:: bash

        helm repo update

#. Run the following command to install the Splunk Distribution of OpenTelemetry Collector. Replace the parameters with their appropriate values.

    .. code-block:: bash

        helm --namespace=<NAMESPACE> install my-splunk-otel-collector --set="splunkObservability.realm=<REALM>,splunkObservability.accessToken=<ACCESS_TOKEN>,clusterName=<CLUSTER_NAME>,gateway.enabled=true,agent.enabled=false,clusterReceiver.enabled=false,gateway.replicaCount=1" splunk-otel-collector-chart/splunk-otel-collector

For additional Splunk Distribution of OpenTelemetry Collector configuration, see :ref:`otel-install-k8s`.     

.. _resize-otel-installation:

Change the resource footprint of Splunk Distribution of OpenTelemetry Collector
-------------------------------------------------------------------------------------------------------------------

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
+++++++++++++++++++++++

In the following example, CPU is set to :strong:`500m`, and memory is set to :strong:`1 Gi`.

  .. tabs::

    .. code-tab:: yaml Update the value file
 
      resources:
        limits:
          cpu: 500m
          memory: 1Gi

    .. code-tab:: bash Pass arguments during installation

      helm --namespace=<NAMESPACE> install my-splunk-otel-collector --set="splunkObservability.realm=<REALM>,splunkObservability.accessToken=<ACCESS_TOKEN>,clusterName=<CLUSTER_NAME>,agent.enabled=false,clusterReceiver.enabled=false,gateway.enabled=true,gateway.replicaCount=1,gateway.resources.limits.cpu=500m,gateway.resources.limits.memory=1Gi" splunk-otel-collector-chart/splunk-otel-collector
  

.. _install-network-explorer:

Step 2: Install Network Explorer
======================================================================================

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

The following table shows required parameters for this installation:

    .. list-table::
       :header-rows: 1
       :widths: 50 50

       * - :strong:`Parameter`
         - :strong:`Description`
          
       * - ``namespace``
         - The Kubernetes namespace to install into. This value must match the value for the namespace of the Splunk Distribution of OpenTelemetry Collector.

       * - ``clusterName``
         - An arbitrary value that identifies your Kubernetes cluster.
        
       * - ``otlp.receiver.host``
         - Name of the Splunk Distribution of OpenTelemetry Collector service.
         

Example
--------------------------

In this example, the reducer, the kernel collector, and the Kubernetes collector are configured. The cloud collector isn't enabled.

Follow these steps to install Network Explorer:

#. Run the following command to deploy the Helm chart.
    
    .. code-block:: bash

        helm repo add splunk-otel-network-explorer-chart https://flowmill.github.io/splunk-otel-network-explorer-chart/

#. Run the following command to update the Helm chart.

    .. code-block:: bash

        helm repo update

#. Run the following command to install Network Explorer. Replace the parameters with their appropriate values.

    .. code-block:: bash

        helm --namespace=<NAMESPACE> install network-explorer splunk-otel-network-explorer-chart/splunk-otel-network-explorer --set="clusterName=<CLUSTER_NAME>,otlp.receiver.host=my-splunk-otel-collector"

#. (Optional) The Network Explorer kernel collector requires kernel headers to run the kernel in each Kubernetes node. The kernel collector installs the headers automatically unless your nodes don't have access to the internet.

    If you need to install the required packages manually, run the following command:

    .. tabs::

      .. code-tab:: bash Debian

        sudo apt-get install --yes linux-headers-$(uname -r)

      .. code-tab:: bash RedHat Linux/Amazon Linux

        sudo yum install -y kernel-devel-$(uname -r)


For additional configurations, see :new-page:`Network Explorer for Kubernetes <https://github.com/Flowmill/splunk-otel-network-explorer-chart/blob/master/README.md>` on GitHub.

.. _resize-installation:

Resize your Network Explorer installation
--------------------------------------------------

Depending on the number of Kubernetes nodes you have, your resource needs might vary. You can make the following adjustments to your installation.

Change the resource footprint of the reducer
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The reducer is a single pod per Kubernetes cluster. If your cluster contains a large number of pods, nodes, and services, you can increase the resources allocated to it.

The reducer processes telemetry in multiple stages, with each stage partitioned into one or more shards, where each shard is a separate thread. Increasing the number of shards in each stage expands the capacity of the reducer.
 
Change the following parameters in the :new-page:`Network Explorer values file <https://github.com/Flowmill/splunk-otel-network-explorer-chart/blob/master/values.yaml#L87>` to increase or decrease the number of shards per reducer stage. You can set between 1-32 shards.

The default configuration is 1 shard per reducer stage.

    .. code-block:: yaml

        reducer:
          ingestShards: 1
          matchingShards: 1
          aggregationShards: 1

Example
***************************************************************************      

The following example uses 4 shards per reducer stage.

    .. code-block:: yaml

        reducer:
          ingestShards: 4
          matchingShards: 4
          aggregationShards: 4

.. _customize-network-explorer-metrics:

Customize network telemetry generated by Network Explorer
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you want to collect fewer or more network telemetry metrics, you can update the :new-page:`Network Explorer values file <https://github.com/Flowmill/splunk-otel-network-explorer-chart/blob/master/values.yaml#L92>`.

The following sections show you how to disable or enable different metrics.

Enable all metrics, including metrics turned off by default
***************************************************************************

    .. code-block:: yaml 

      disableMetrics:
        - none
              
Disable entire metric categories
***************************************************************************

    .. code-block:: yaml 

      disableMetrics:
        - tcp.all 
        - udp.all
        - dns.all
        - http.all


Disable an individual TCP metric
***************************************************************************
    
    .. code-block:: yaml 

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
***************************************************************************
    
    .. code-block:: yaml 

      disableMetrics:
        - udp.bytes
        - udp.packets
        - udp.active
        - udp.drops

Disable an individual DNS metric
***************************************************************************
    
    .. code-block:: yaml 

      disableMetrics:
        - dns.client.duration.average
        - dns.server.duration.average
        - dns.active_sockets
        - dns.responses
        - dns.timeouts

Disable an individual HTTP metric
***************************************************************************
    
    .. code-block:: yaml

      disableMetrics:
        - http.client.duration.average
        - http.server.duration.average
        - http.active_sockets
        - http.status_code

Disable an internal metric
********************************************************************************************

    .. code-block:: yaml

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
*********************************

    .. code-block:: yaml 

      enableMetrics:
        - tcp.all 
        - udp.all
        - dns.all
        - http.all
        - ebpf_net.all

Enable an individual TCP metric
***************************************************************************

    .. code-block:: yaml 

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
***************************************************************************
    
    .. code-block:: yaml 

      enableMetrics:
        - udp.bytes
        - udp.packets
        - udp.active
        - udp.drops

Enable an individual DNS metric
***************************************************************************
    
    .. code-block:: yaml 

      enableMetrics:
        - dns.client.duration.average
        - dns.server.duration.average
        - dns.active_sockets
        - dns.responses
        - dns.timeouts

Enable an individual HTTP metric
***************************************************************************
    
    .. code-block:: yaml

      enableMetrics:
        - http.client.duration.average
        - http.server.duration.average
        - http.active_sockets
        - http.status_code

Enable an internal metric
****************************************************************************
    
    .. code-block:: yaml

      enableMetrics:
        - ebpf_net.span_utilization_fraction 
        - ebpf_net.pipeline_metric_bytes_discarded
        - ebpf_net.codetiming_min_ns
        - ebpf_net.entrypoint_info
        - ebpf_net.otlp_grpc.requests_sent

.. note:: This list does not include the entire set of internal metrics.

Example
***************************************************************************

In the following example, all HTTP metrics along with certain individual TCP and UDP metrics are disabled. All DNS metrics are collected.

    .. code-block:: yaml

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

- Custom dashboards. For more information, see :ref:`dashboard-create-customize`.
- Alerts and detectors. For more information, see :ref:`get-started-detectoralert`.

For more information on metrics available to collect with Network Explorer, see :ref:`network-explorer-metrics`.
