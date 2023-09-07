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
