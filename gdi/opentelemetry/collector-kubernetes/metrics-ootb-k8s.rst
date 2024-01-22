.. _ootb-metrics-k8s:

****************************************************************
Collected metrics and dimensions for Kubernetes
****************************************************************

.. meta::
      :description: Out-of-the-box metrics and dimensions obtained with the Collector for Kubernetes.


The following sections list the collected metrics when you use the default configuration for the Collector for Kubernetes in host monitoring (agent) mode.

The Collector processes collected data as configured in your pipelines. Therefore, metrics that are imported by receivers might be excluded further into the pipeline by other components. For instance, the :ref:`signalfx-exporter`, included in the default Collector configuration, drops certain metrics and applies :ref:`translation rules <exclusion-rules>` that impact the metrics the Collector sends to Splunk Observability Cloud.    

Learn more about the Collector's configuration and data processing at:

* :ref:`collector-kubernetes-intro`
* :ref:`otel-deployment-mode`
* :ref:`otel-data-processing`
* :ref:`signalfx-exporter`

.. note:: To see the Collector's internal metrics, refer to :ref:`metrics-internal-collector`.

Container level metrics and dimensions
============================================================================

.. caution:: 
  
  The :strong:`Translated?` column indicates whether the metric is translated by the SignalFx exporter.
  
  The :strong:`Exported?` column indicates if the metric is finally sent to Splunk Observability Cloud after going through the Collector pipelines. 

.. list-table::
  :widths: 25 25 30 10 10
  :width: 100%
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Translated?
    - Exported?

  * - ``container.cpu.utilization``
    - Container CPU utilization
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes
    - Yes

  * - ``container.cpu.time``
    - Container CPU time
    - 
    - No
    - No
  
  * - ``container.memory.available``
    - Container memory available
    - 
    - No
    - No

  * - ``container.memory.usage``
    - Container memory usage
    - 
    - No
    - No

  * - ``container.memory.rss``
    - Container memory rss
    - 
    - No
    - No

  * - ``container.memory.working_set``
    - Container memory ``working_set``
    - 
    - No
    - No

  * - ``container.memory.page_faults``
    - Container memory ``page_faults``
    - 
    - No
    - No

  * - ``container.memory.major_page_faults``
    - Container memory ``major_page_faults``
    - 
    - No
    - No

  * - ``container.filesystem.available``
    - Container filesystem available
    - :ref:`ootb-metrics-k8s-attributes`
    - No
    - Yes

  * - ``container.filesystem.capacity``
    - Container filesystem capacity
    - :ref:`ootb-metrics-k8s-attributes`
    - No
    - Yes

  * - ``container.filesystem.usage``
    - Container filesystem usage
    - :ref:`ootb-metrics-k8s-attributes`
    - No
    - Yes

  * - ``k8s.container.cpu_limit``
    - Container ``cpu_limit``
    - :ref:`ootb-metrics-k8s-attributes`
    - No
    - Yes

  * - ``k8s.container.cpu_request``
    - Container ``cpu_request``
    - :ref:`ootb-metrics-k8s-attributes`
    - No
    - Yes

  * - ``k8s.container.memory_limit``
    - Container ``memory_limit``
    - :ref:`ootb-metrics-k8s-attributes`
    - No
    - Yes

  * - ``k8s.container.memory_request``
    - Container ``memory_request``
    - :ref:`ootb-metrics-k8s-attributes`
    - No
    - Yes

Pod level metrics and dimensions
============================================================================

.. caution:: 
  
  The :strong:`Exported?` column indicates if the metric is finally sent to Splunk Observability Cloud after going through the Collector pipelines. 

.. list-table::
  :widths: 30 30 30 10
  :width: 100%
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Exported?

  * - ``k8s.pod.cpu.time``
    - Pod CPU time
    - 
    - No

  * - ``k8s.pod.cpu.utilization``
    - Pod CPU utilization
    - 
    - No

  * - ``k8s.pod.filesystem.available``
    - Pod filesystem available
    - 
    - No

  * - ``k8s.pod.filesystem.capacity``
    - Pod filesystem capacity
    - 
    - No

  * - ``k8s.pod.filesystem.usage``
    - Pod filesystem usage
    - 
    - No

  * - ``k8s.pod.memory.available``
    - Pod memory available
    - 
    - No

  * - ``k8s.pod.memory.page_faults``
    - Pod memory ``page_faults``
    - 
    - No

  * - ``k8s.pod.memory.major_page_faults``
    - Pod memory ``major_page_faults``
    - 
    - No

  * - ``k8s.pod.memory.rss``
    - Pod memory rss
    - 
    - No

  * - ``k8s.pod.memory.usage``
    - Pod memory usage
    - 
    - No

  * - ``k8s.pod.memory.working_set``
    - Pod memory ``working_set``
    - 
    - No

  * - ``k8s.pod.network.errors``
    - Pod network errors
    - * ``interface``. See :ref:`kubelet-stats-receiver`
      * ``direction``. See :ref:`kubelet-stats-receiver`
      * :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``k8s.pod.network.io``
    - Pod network IO
    - * ``interface``. See :ref:`kubelet-stats-receiver`
      * ``direction``. See :ref:`kubelet-stats-receiver`
      * :ref:`ootb-metrics-k8s-attributes`
    - Yes

Node level metrics and dimensions
============================================================================

.. caution:: 
  
  The :strong:`Translated?` column indicates whether the metric is translated by the SignalFx exporter.
  
  The :strong:`Exported?` column indicates if the metric is finally sent to Splunk Observability Cloud after going through the Collector pipelines. 

.. list-table::
  :widths: 30 30 30 10
  :width: 100%
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Exported?

  * - ``k8s.node.cpu.time``
    - Node CPU time
    - 
    - No

  * - ``k8s.node.cpu.utilization``
    - Node CPU utilization
    - 
    - No

  * - ``k8s.node.filesystem.available``
    - Node filesystem available
    - 
    - No

  * - ``k8s.node.filesystem.capacity``
    - Node filesystem capacity
    - 
    - No

  * - ``k8s.node.filesystem.usage``
    - Node filesystem usage
    - 
    - No
  
  * - ``k8s.node.memory.available``
    - Node memory available
    - 
    - No

  * - ``k8s.node.memory.page_faults``
    - Node memory ``page_faults``
    - 
    - No

  * - ``k8s.node.memory.major_page_faults``
    - Node memory ``major_page_faults``
    - 
    - No

  * - ``k8s.node.memory.rss``
    - Node memory rss
    - 
    - No

  * - ``k8s.node.memory.usage``
    - Node memory usage
    - 
    - No

  * - ``k8s.node.memory.working_set``
    - Node memory ``working_set``
    - 
    - No

  * - ``k8s.node.network.errors``
    - Node network errors
    - * ``interface``. See :ref:`kubelet-stats-receiver`
      * ``direction``. See :ref:`kubelet-stats-receiver`
      * :ref:`ootb-metrics-k8s-attributes`
    - No

  * - ``k8s.node.network.io``
    - Node network IO
    - * ``interface``. See :ref:`kubelet-stats-receiver`
      * ``direction``. See :ref:`kubelet-stats-receiver`
      * :ref:`ootb-metrics-k8s-attributes`
    - No

  * - ``system.cpu.time``
    - System CPU time
    - 
    - No

  * - ``system.cpu.utilization``
    - Percentage of CPU time broken down by different states
    - * ``cpu``. See :ref:`host-metrics-receiver`
      * ``state``. See :ref:`host-metrics-receiver`
      * :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``system.filesystem.usage``
    - Filesystem bytes used
    - * ``device``. See :ref:`host-metrics-receiver`
      * ``mode``. See :ref:`host-metrics-receiver`
      * ``mountpoint``. See :ref:`host-metrics-receiver`
      * ``type``. See :ref:`host-metrics-receiver`
      * ``state``. See :ref:`host-metrics-receiver`      
      * :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``system.filesystem.utilization``
    - Fraction of filesystem bytes used
    - * ``device``. See :ref:`host-metrics-receiver`
      * ``mode``. See :ref:`host-metrics-receiver`
      * ``mountpoint``. See :ref:`host-metrics-receiver`
      * ``type``. See :ref:`host-metrics-receiver`
      * :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``system.cpu.load_average.1m``
    - Average CPU Load over 1 minute
    - 
    - Yes

  * - ``system.cpu.load_average.5m``
    - Average CPU Load over 5 minutes
    - 
    - Yes

  * - ``system.cpu.load_average.15m``
    - Average CPU Load over 15 minutes
    - 
    - Yes

  * - ``system.memory.usage``
    - Bytes of memory in use
    - ``state``. See :ref:`host-metrics-receiver`     
    - Yes

  * - ``system.memory.utilization``
    - Percentage of memory bytes in use
    - ``state``. See :ref:`host-metrics-receiver`   
    - Yes

  * - ``system.paging.utilization``
    - Swap (Unix) or pagefile (Windows) utilization
    - 
    - Yes

Node level metrics and dimensions after translation
============================================================================

.. caution:: 
  
  The :strong:`Exported?` column indicates if the metric is finally sent to Splunk Observability Cloud after going through the Collector pipelines. 

.. note:: These metrics are compatible with the :ref:`signalfx-exporter`.

.. list-table::
  :widths: 30 30 30 10
  :width: 100%
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Exported?

  * - ``cpu.idle``
    - CPU time in centicores spent in any state other than those in the table
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.interrupt``
    - CPU time in centicores spent while servicing hardware interrupts
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.nice``
    - CPU time in centicores spent in userspace running ``'nice'-ed processes``
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.softirq``
    - CPU time in centicores spent while servicing software interrupts
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.steal``
    - CPU time in centicores spent waiting for a hypervisor to service requests from other virtual machines
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.system``
    - CPU time in centicores spent running in the kernel
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.user``
    - CPU time in centicores spent running in userspace
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.wait``
    - CPU time in centicores spent idle while waiting for an I/O operation to complete
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.num_processors``
    - The number of logical processors on the host
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``cpu.utilization``
    - Percent of CPU used on this host
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``disk.summary_utilization``
    - Percent of disk space utilized on all volumes on this host
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``disk.utilization``
    - Percent of disk used on this volume
    - * ``device``
      * :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``memory.total``
    - Total bytes of system memory on the system
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``memory.utilization``
    - Percent of memory in use on this host
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``network.total``
    - Total amount of inbound and outbound network traffic on this host, in bytes
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``process.cpu_time_seconds``
    - Total CPU usage of the process in seconds
    - * ``process.pid``
      * ``process.parent_pid``
      * ``process.executable.name``
      * ``process.executable.path``
      * ``process.command``
      * ``process.command_line``
      * ``process.owner``
      * :ref:`ootb-metrics-k8s-attributes`
    - Yes

Volume level metrics and dimensions 
============================================================================

.. caution:: 
  
  The :strong:`Exported?` column indicates if the metric is finally sent to Splunk Observability Cloud after going through the Collector pipelines. 


.. list-table::
  :widths: 30 30 30 10
  :width: 100%
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Exported?

  * - ``k8s.volume.available``
    - The number of available bytes in the volume
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

  * - ``k8s.volume.capacity``
    - The number of capacity bytes in the volume
    - :ref:`ootb-metrics-k8s-attributes`
    - Yes

.. _ootb-metrics-k8s-control-plane:

Control plane metrics
============================================================================

To see the control plane metrics the Collector provides, see:

* :ref:`CoreDNS <coredns>`
* :ref:`etcd`
* :ref:`Kubernetes controller manager <kube-controller-manager>`
* :ref:`Kubernetes API server <kubernetes-apiserver>`
* :ref:`Kubernetes proxy <kubernetes-proxy>`
* :ref:`Kubernetes scheduler <kubernetes-scheduler>`

The following distributions support control plane metrics configuration:

* Kubernetes 1.22 (kops created)
* OpenShift version 4.9

For information about control plane metrics, see :ref:`otel-kubernetes-config-advanced-control-plane`.

.. _ootb-metrics-k8s-attributes:

Standard resource dimensions
============================================================================

.. list-table::
  :widths: 40 20 40 
  :width: 100%
  :header-rows: 1

  * - Name
    - Type 
    - Description

  * - ``k8s.node.name``
    - string
    - The name of the node

  * - ``k8s.pod.uid``
    - string
    - The UID of the pod

  * - ``k8s.pod.name``
    - string
    - The name of the pod

  * - ``k8s.namespace.name``
    - string
    - The name of the namespace that the pod is running in

  * - ``k8s.container.name``
    - string
    - Container name used by container runtime

  * - ``container.id``
    - string
    - Container id used to identify container

  * - ``k8s.volume.name``
    - string
    - The name of the volume

  * - ``k8s.volume.type``
    - string
    - The type of the volume

  * - ``k8s.persistentvolumeclaim.name``
    - string
    - The name of the Persistent Volume Claim

  * - ``aws.volume.id``
    - string
    - The id of the AWS Volume

  * - ``fs.type``
    - string
    - The filesystem type of the volume

  * - ``partition``
    - string
    - The partition in the volume

  * - ``gce.pd.name``
    - string
    - The name of the persistent disk in GCE

  * - ``glusterfs.endpoints.name``
    - string
    - The endpoint name that details Glusterfs topology

  * - ``glusterfs.path``
    - string
    - Glusterfs volume path



