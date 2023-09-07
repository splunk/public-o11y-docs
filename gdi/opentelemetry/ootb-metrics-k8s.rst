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