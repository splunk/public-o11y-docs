.. _ootb-metrics-k8s:

****************************************************************
Collected metrics and dimensions for Kubernetes
****************************************************************

.. meta::
      :description: Out-of-the-box metrics obtained with the Collector for Kubernetes.


If you're using the default configuration of the Collector for Kubernetes, you will obtain the following metrics at the end of the defined pipelines.

Out-of-the-box metrics
========================================================

.. caution:: Metrics imported using receivers might be dropped further into the pipeline by other components, such as the SignalFx exporter. Check the details in the tables below. 

Container level metrics and attributes (dimensions in IM)
----------------------------------------------------------------------------

.. list-table::
  :widths: 30 30 30 10
  :width: 100
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Dropped?

  * - ``container.cpu.utilization``
    - Container CPU utilization
    - 
    - Yes

  * - ``container.cpu.time``
    - Container CPU time
    - 
    - Yes

  * - ``container.memory.available``
    - Container memory available
    - 
    - Yes

  * - ``container.memory.usage``
    - Container memory usage
    - 
    - Yes

  * - ``container.memory.rss``
    - Container memory rss
    - 
    - Yes

  * - ``container.memory.working_set``
    - Container memory ``working_set``
    - 
    - Yes

  * - ``container.memory.page_faults``
    - Container memory ``page_faults``
    - 
    - Yes

  * - ``container.memory.major_page_faults``
    - Container memory ``major_page_faults``
    - 
    - Yes

  * - ``container.filesystem.available``
    - Container filesystem available
    - LINK HERE
    - Yes

  * - ``container.filesystem.capacity``
    - Container filesystem capacity
    - LINK HERE
    - Yes

  * - ``container.filesystem.usage``
    - Container filesystem usage
    - LINK HERE
    - Yes

  * - ``k8s.container.cpu_limit``
    - Container ``cpu_limit``
    - LINK HERE
    - Yes

  * - ``k8s.container.cpu_request``
    - Container ``cpu_request``
    - LINK HERE
    - Yes

  * - ``k8s.container.memory_limit``
    - Container ``memory_limit``
    - LINK HERE
    - Yes

  * - ``k8s.container.memory_request``
    - Container ``memory_request``
    - LINK HERE
    - Yes

Pod level metrics and attributes (dimensions in IM)
----------------------------------------------------------------------------

.. list-table::
  :widths: 30 30 30 10
  :width: 100
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Dropped?

  * - ``k8s.pod.cpu.time``
    - Pod CPU time
    - 
    - Yes

  * - ``k8s.pod.cpu.utilization``
    - Pod CPU utilization
    - 
    - Yes

  * - ``k8s.pod.filesystem.available``
    - Pod filesystem available
    - 
    - Yes

  * - ``k8s.pod.filesystem.capacity``
    - Pod filesystem capacity
    - 
    - Yes

  * - ``k8s.pod.filesystem.usage``
    - Pod filesystem usage
    - 
    - Yes

  * - ``k8s.pod.memory.available``
    - Pod memory available
    - 
    - Yes

  * - ``k8s.pod.memory.page_faults``
    - Pod memory ``page_faults``
    - 
    - Yes

  * - ``k8s.pod.memory.major_page_faults``
    - Pod memory ``major_page_faults``
    - 
    - Yes

  * - ``k8s.pod.memory.rss``
    - Pod memory rss
    - 
    - Yes

  * - ``k8s.pod.memory.usage``
    - Pod memory usage
    - 
    - Yes

  * - ``k8s.pod.memory.working_set``
    - Pod memory ``working_set``
    - 
    - Yes

  * - ``k8s.pod.network.errors``
    - Pod network errors
    - LINKS HERE
    - No

  * - ``k8s.pod.network.io``
    - Pod network IO
    - LINKS HERE
    - No

Node level metrics and attributes (dimensions in IM)
----------------------------------------------------------------------------

.. list-table::
  :widths: 30 30 30 10
  :width: 100
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Dropped?

  * - ``k8s.node.cpu.time``
    - Node CPU time
    - 
    - Yes

  * - ``k8s.node.cpu.utilization``
    - Node CPU utilization
    - 
    - Yes

  * - ``k8s.node.filesystem.available``
    - Node filesystem available
    - 
    - Yes

  * - ``k8s.node.filesystem.capacity``
    - Node filesystem capacity
    - 
    - Yes

  * - ``k8s.node.filesystem.usage``
    - Node filesystem usage
    - 
    - Yes

  * - ``k8s.node.memory.available``
    - Node memory available
    - 
    - Yes

  * - ``k8s.node.memory.page_faults``
    - Node memory ``page_faults``
    - 
    - Yes

  * - ``k8s.node.memory.major_page_faults``
    - Node memory ``major_page_faults``
    - 
    - Yes

  * - ``k8s.node.memory.rss``
    - Node memory rss
    - 
    - Yes

  * - ``k8s.node.memory.usage``
    - Node memory usage
    - 
    - Yes

  * - ``k8s.node.memory.working_set``
    - Node memory ``working_set``
    - 
    - Yes

  * - ``k8s.node.network.errors``
    - Node network errors
    - LINKS HERE
    - Yes

  * - ``k8s.node.network.io``
    - Node network IO
    - LINKS HERE
    - Yes

  * - ``system.cpu.time``
    - System CPU time
    - 
    - Yes

  * - ``system.cpu.utilization``
    - Percentage of CPU time broken down by different states
    - LINKS HERE
    - No

  * - ``system.filesystem.usage``
    - Filesystem bytes used
    - LINKS HERE
    - No

  * - ``system.filesystem.utilization``
    - Fraction of filesystem bytes used
    - LINKS HERE
    - No

  * - ``system.cpu.load_average.1m``
    - Average CPU Load over 1 minute
    - 
    - No

  * - ``system.cpu.load_average.5m``
    - Average CPU Load over 5 minutes
    - 
    - No

  * - ``system.cpu.load_average.15m``
    - Average CPU Load over 15 minutes
    - 
    - No

  * - ``system.memory.usage``
    - Bytes of memory in use
    - * ``state``
    - No

  * - ``system.memory.utilization``
    - Percentage of memory bytes in use
    - * ``state``
    - No

  * - ``system.paging.utilization``
    - Swap (Unix) or pagefile (Windows) utilization
    - 
    - No

Volume level metrics and attributes (dimensions in IM)
----------------------------------------------------------------------------

.. list-table::
  :widths: 30 30 30 10
  :width: 100
  :header-rows: 1

  * - Metric name
    - Metric description
    - Attributes
    - Dropped?

  * - ``k8s.volume.available``
    - The number of available bytes in the volume
    - LINK HERE
    - No

  * - ``k8s.volume.capacity``
    - The number of capacity bytes in the volume
    - LINK HERE
    - No

Internal metrics
----------------------------------------------------------------------------

NEW DOC
https://splunk.atlassian.net/browse/O11YDOCS-5412

Standard resource attributes
----------------------------------------------------------------------------

.. list-table::
  :widths: 40 20 40 
  :width: 100
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



