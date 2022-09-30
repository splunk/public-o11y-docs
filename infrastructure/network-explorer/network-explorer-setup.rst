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

You need to have the following requirements to use Network Explorer.

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
      - Network Explorer is supported on all active releases of Kubernetes.


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

        helm --namespace=<NAMESPACE> install my-splunk-otel-collector --set="splunkObservability.realm=<REALM>,splunkObservability.accessToken=<ACCESS_TOKEN>,clusterName=<CLUSTER_NAME>,gateway.enabled=true,agent.enabled=false" splunk-otel-collector-chart/splunk-otel-collector

.. note:: This example shows an installation using only the required parameters. You might need to specify additional configurations for your environment.

For additional Splunk Distribution of OpenTelemetry Collector configuration, see :ref:`otel-install-k8s`.

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

#. (Optional) The Network Explorer kernel collector requires kernel headers to run kernel in each Kubernetes node. The kernel collector installs the headers automatically unless it fails to start, or your nodes don't have access to the internet.

    If you need to install the required packages manually, run the following command.

    .. tabs::

      .. code-tab:: bash Debian

        sudo apt-get install --yes linux-headers-$(uname -r)

      .. code-tab:: bash RedHat Linux/Amazon Linux

        sudo yum install -y kernel-devel-$(uname -r)


.. note:: This example shows an installation using only the required parameters. You might need to specify additional configurations for your environment.

For additional configurations, see :new-page:`Network Explorer for Kubernetes <https://github.com/Flowmill/splunk-otel-network-explorer-chart/blob/master/README.md>` on GitHub.


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
