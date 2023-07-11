.. _network-explorer-setup-non-k8s:

**************************************************************************
Set up Network Explorer on non-Kubernetes systems
**************************************************************************

.. meta::
    :description: Install and configure Network Explorer on non-Kubernetes systems

To use Network Explorer on non-Kubernetes systems, you must install the Extended Berkeley Packet Filter (eBPF) collector using the appropriate packaging system, RPM Package Manager (RPM) or dpkg.

Install the eBPF collector
==============================

Follow these steps to install and configure the eBPF collector on non-Kubernetes systems: 

#. Download the eBPF packages from the :new-page:`GitHub releases page <https://github.com/open-telemetry/opentelemetry-ebpf/releases>`.
#. Run the following commands to install the reducer, the kernel collector, and the cloud collector components.
  
    .. tabs::

      .. code-tab:: bash RPM 
  
        rpm -i opentelemetry-ebpf-reducer-<VERSION>.rpm
        rpm -i opentelemetry-ebpf-kernel-collector-<VERSION>.rpm
        rpm -i opentelemetry-ebpf-cloud-collector-<VERSION>.rpm

      .. code-tab:: bash dpkg

        dpkg -i opentelemetry-ebpf-reducer-<VERSION>.deb
        dpkg -i opentelemetry-ebpf-kernel-collector-<VERSION>.deb
        dpkg -i opentelemetry-ebpf-cloud-collector-<VERSION>.deb
        
    .. note:: 
        * Install the reducer on only one node.
        * Install the kernel collector on all nodes in a cluster.
        * If a cluster is within Amazon Web Services, install the cloud collector on one node.


#. Edit the /etc/opentelemetry-ebpf/reducer.yaml file to configure the reducer.

    * If you use Splunk Distribution of OpenTelemetry Collector, edit the file according to the following table:

        .. list-table::
          :header-rows: 1
          :widths: 50 50

          * - :strong:`Parameter`
            - :strong:`Value`
          * - ``enable_otlp_grpc_metrics``
            - ``true``
          * - ``otlp_grpc_metrics_address``
            - Host name or IP address of the OTLP gRPC receiver
          * - ``disable_prometheus_metrics``
            - ``true``    

    * If you scrape with Prometheus, edit the file according to the following table:

        .. list-table::
          :header-rows: 1
          :widths: 50 50

          * - :strong:`Parameter`
            - :strong:`Value`
          * - ``prom_bind``
            - IP address and port number on which Prometheus will scrape
          * - ``disable_prometheus_metrics``
            - ``false``    

    * If you use the cloud collector, set ``enable_aws_enrichment`` to ``true``.

#. Run the following command to start or restart the reducer to apply the changes.

    .. tabs::

      .. code-tab:: bash Start command 
  
        systemctl start reducer

      .. code-tab:: bash Restart command

        systemctl restart reducer

#. Edit the /etc/opentelemetry-ebpf/kernel-collector.yaml file to configure the kernel collector. Set the values according to the following table.

    .. list-table::
      :header-rows: 1
      :widths: 50 50

      * - :strong:`Parameter`
        - :strong:`Value`
      * - Intake host
        - IP address or hostname where the reducer is running
      * - Intake port 
        - Same value as ``telemetry_port`` in the reducer.yaml file

#. Run the following command to start or restart the kernel collector to apply the changes.

    .. tabs::

      .. code-tab:: bash Start command 
  
        systemctl start kernel-collector

      .. code-tab:: bash Restart command

        systemctl restart kernel-collector

#. Edit the /etc/opentelemetry-ebpf/cloud-collector.yaml file to configure the kernel collector. Set the values according to the following table.

    .. list-table::
      :header-rows: 1
      :widths: 50 50

      * - :strong:`Parameter`
        - :strong:`Value`
      * - Intake host
        - IP address or hostname where the reducer is running
      * - Intake port 
        - Same value as ``telemetry_port`` in the reducer.yaml file

#. Run the following command to start or restart the cloud collector to apply the changes.

    .. tabs::

      .. code-tab:: bash Start command 
  
        systemctl start cloud-collector

      .. code-tab:: bash Restart command

        systemctl restart cloud-collector

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
