.. _infrastructure-virtual-metrics:

***************************************************
Virtual metrics in Splunk Infrastructure Monitoring
***************************************************

.. meta::
	:description: Overview about virtual metrics in Splunk Infrastructure Monitoring

The following topic provides an overview of virtual metrics in Splunk Infrastructure Monitoring, list of available virtual metrics, and some current limitations.

.. note::

  Virtual metrics is a beta feature. While in beta, virtual metrics might be periodically updated or removed when new dimensions, such as ``host.name``, are introduced.

=====================
About virtual metrics
=====================

When you collect infrastructure data from different sources, infrastructure metrics for the same host can vary in naming conventions and value scale. For example, infrastructure metrics from AWS CloudWatch, Google Cloud Platform, Azure Monitor, and the Splunk Distribution of OpenTelemetry Collector might not all share the same naming conventions.

To make it easier for you to find and work with metrics coming in from different sources, Splunk Infrastructure Monitoring pulls data from different sources, transforms them, and returns them in a unified format called virtual metrics.

Virtual metrics remove the complexity of choosing the most appropriate metric source among various 
available options. With virtual metrics, you can use a generic metric name, 
such as ``^aws.ec2.cpu.utilization``, and let Infrastructure Monitoring select the best metric source for each host.

Each virtual metric time series (MTS) has two data sources: the Splunk Distribution of OpenTelemetry Collector, and a public cloud 
such as AWS, GCP, or Azure. For a single host, if metrics from both sources are present, Infrastructure Monitoring
uses data from the Splunk Distribution of OpenTelemetry Collector because it has higher resolution and faster updates.

Virtual metrics power different built-in host navigators, including AWS EC2 navigator, 
GCP Compute Engine navigator, Azure Virtual Machine navigator, and the My Data Center hosts navigator. 
You can also use virtual metrics in your custom charts and detectors.

=======================
List of virtual metrics
=======================

The following table shows available virtual metrics in Splunk Infrastructure Monitoring:

.. list-table::
   :header-rows: 1
   :widths: 30, 70

   * - :strong:`Virtual metric`
     - :strong:`Description`

   * - ``^aws.ec2.cpu.utilization``
     - Uses best available data from ``CPUUtilization`` (namespace:EC2, stat:mean) from AWS CloudWatch and ``cpu.utilization`` from the Splunk Distribution of OpenTelemetry Collector.

   * - ``^aws.ec2.disk.io.read.total``
     - Uses best available data from ``DiskReadBytes`` (namespace:EC2, stat:sum) from AWS CloudWatch and ``system.disk.io.total`` (direction:read) from the Splunk Distribution of OpenTelemetry Collector.

   * - ``^aws.ec2.disk.io.write.total``
     - Uses best available data from ``DiskWriteBytes`` (namespace:EC2, stat:sum) from AWS CloudWatch and ``system.disk.io.total`` (direction:write) from the Splunk Distribution of OpenTelemetry Collector.

   * - ``^aws.ec2.disk.ops.read.total``
     - Uses best available data from ``DiskReadOps`` (namespace:EC2, stat:sum) from AWS CloudWatch and ``system.disk.operations.total`` (direction:read) from the Splunk Distribution of OpenTelemetry Collector.
   
   * - ``^aws.ec2.disk.ops.write.total``
     - Uses best available data from ``DiskWriteOps`` (namespace:EC2, stat:sum) from AWS CloudWatch and ``system.disk.operations.total`` (direction:write) from the Splunk Distribution of OpenTelemetry Collector.
  
   * - ``^aws.ec2.network.io.receive.total``
     - Uses best available data from ``NetworkIn`` (namespace:EC2, stat:sum) from AWS CloudWatch and ``system.network.io.total`` (direction:receive) from the Splunk Distribution of OpenTelemetry Collector.
   
   * - ``^aws.ec2.network.io.transmit.total``
     - Uses best available data from ``NetworkOut`` (namespace:EC2, stat:sum) from AWS CloudWatch and ``system.network.io.total`` (direction:transmit) from the Splunk Distribution of OpenTelemetry Collector.
   
   * - ``^azure.vm.cpu.utilization``
     - Uses best available data from ``Percentage CPU`` from Azure Monitoring and ``cpu.utilization`` from the Splunk Distribution of OpenTelemetry Collector.

   * - ``^azure.vm.disk.io.read.total``
     - Uses best available data from ``Disk Read Bytes`` from Azure Monitoring and ``system.disk.io.total`` from the Splunk Distribution of OpenTelemetry Collector.

   * - ``^azure.vm.disk.io.write.total``
     - Uses best available data from ``Disk Write Bytes`` from Azure Monitoring and ``system.disk.io.total`` from the Splunk Distribution of OpenTelemetry Collector.     

   * - ``^azure.vm.disk.ops.read.total``
     - Uses best available data from ``Disk Read Operations/Sec`` from Azure Monitoring and ``system.disk.io.total`` from the Splunk Distribution of OpenTelemetry Collector.
  
   * - ``^azure.vm.disk.ops.write.total``
     - Uses best available data from ``Disk Write Operations/Sec`` from Azure Monitoring and ``system.disk.io.total`` from the Splunk Distribution of OpenTelemetry Collector.

   * - ``^azure.vm.network.io.receive.total``
     - Uses best available data from ``Network In`` from Azure Monitoring and ``system.network.io.total`` from the Splunk Distribution of OpenTelemetry Collector.

   * - ``^azure.vm.network.io.transmit.total``
     - Uses best available data from ``Network Out`` from Azure Monitoring and ``system.network.io.total`` from the Splunk Distribution of OpenTelemetry Collector.

   * - ``^gcp.gce.cpu.utilization``
     - Uses best available data from ``instance/cpu/utilization`` from Google Cloud Monitoring and ``cpu.utilization`` from the Splunk Distribution of OpenTelemetry Collector.
    
   * - ``^gcp.gce.disk.io.read.total``
     - Uses best available data from ``instance/disk/read_bytes_count`` from Google Cloud Monitoring and ``system.network.io.total`` from the Splunk Distribution of OpenTelemetry Collector.     

   * - ``^gcp.gce.disk.io.write.total``
     - Uses best available data from ``instance/disk/write_bytes_count`` from Google Cloud Monitoring and ``system.network.io.total`` from the Splunk Distribution of OpenTelemetry Collector.               

   * - ``^gcp.gce.disk.ops.read.total``
     - Uses best available data from ``instance/disk/read_ops_count`` from Google Cloud Monitoring and ``system.disk.operations.total`` from the Splunk Distribution of OpenTelemetry Collector.     

   * - ``^gcp.gce.disk.ops.write.total``
     - Uses best available data from ``instance/disk/write_ops_count`` from Google Cloud Monitoring and ``system.disk.operations.total`` from the Splunk Distribution of OpenTelemetry Collector.          

   * - ``^gcp.gce.network.io.receive.total``
     - Uses best available data from ``instance/network/received_bytes_count`` from Google Cloud Monitoring and ``system.network.io.total`` from the Splunk Distribution of OpenTelemetry Collector.
  
   * - ``^gcp.gce.network.io.transmit.total``
     - Uses best available data from ``instance/network/sent_bytes_count`` from Google Cloud Monitoring and ``system.network.io.total`` from the Splunk Distribution of OpenTelemetry Collector.

==============================
Limitations of virtual metrics
==============================

Virtual metrics have the following limitations:

- You can't use non-exact searches on virtual metric names. For example, you can't query for ``sf_metric:^aws.ec2.disk.ops.*.total`` to  get both read and write ops.
- Virtual metric results don't get a guaranteed boost in results from the Metric Finder. Searching for a substring or full virtual metric name might not show matching virtual metrics.
- Virtual MTS contains only dimensions that are present on both underlying data sources:

  - For AWS, virtual MTS has dimension ``AWSUniqueId``. 
  - For GCP, virtual MTS has dimension ``gcp_id``.
  - For Azure, virtual MTS has dimension ``azure_resource_id``.

- Virtual metrics support only default rollup and rate rollup.
- Virtual metric queries don't support partition filters.
