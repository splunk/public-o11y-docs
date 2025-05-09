:orphan:

.. _aopt-metric-reference:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
Metric reference
**********************************************************

Application Optimization's workload analysis produces the following metics. All metrics have at least the same dimensions as the workload metrics (for example ``aws-region`` and so on) and use the same attribute names and values.

.. find out what the prefix is and add it to the metric name. ask daniel for the name.

All metric names have a prefix of either ``sf`` or ``o11y``.

.. note::
    Memory is specified in GiB. CPU is specified in cores.



.. list-table::
   :widths: 40 5 55
   :width: 100%
   :header-rows: 1

   - 

      - **Metric**
      - **Scope\***
      - **Description**
   - 

      - ``sf.report.available``
      - W
      - Synthetic metric, 0 for failed, 1 for success. This metric may have additional attributes that represent the report outcome as a whole. At least a ``aopt.profile_report.error_reason`` code.
   - 

      - ``sf.report.window_days``
      - W
      - Number of days (possibly fractional) that were considered in the analysis. In general, this is the smaller of 14 and the number of days since the last resource configuration change for the workload. This is used to determine the validity and confidence level of the report.
   - 

      - ``sf.report.coverage_ratio``
      - W
      - Window coverage with metrics: the ratio of number of actual metrics values found compared to the number of timeslots in the window. This should represent the worst case value (in other words, the minimum of the coverage of each input timeseries we use). This is used to determine the validity and confidence level of the report.
   - 

      - ``sf.report.average_replicas``
      - W
      - Average number of replicas during the analysis window. Does not include pods that allocate resources (such as those scheduled but not started).
   - 

      - ``sf.report.pod.qos_class``
      - W
      - Pod's quality of service (QoS) class, as defined in Kubernetes docs, encoded as integer.
   - 

      - ``sf.report.footprint.cpu_cores``
      - W
      - Number of the allocated CPU cores for all replicas (averaged based on average_replicas). Does not account for usage above request (bursting).
   - 

      - ``sf.report.footprint.memory_gib``
      - W
      - GiB allocated memory for all replicas (averaged based on the average_replicas). Does not account for usage above request (bursting).
   - 

      - ``sf.report.efficiency_rate``
      - W
      - Resource efficiency rate, as percent. Weighted average of resource utilization of CPU and memory. CPU and memory weights according to AWS on-demand cost. Capped at 100%, rounded to whole percent.
   - 

      - ``sf.report.starvation_risk``
      - W
      - Resource starvation risk: Minimal, Low, Medium, High (encoded 0, 1, 2, 3 respectively). 
         Risk levels defined elsewhere:
          - Minimal: no starvation detected
          - Low: could benefit from more overhead
          - Medium: actually bursting but not being limited
          - High: CPU throttled and/or at resource limits.
   - 

      - ``sf.recommendation.available``
      - W
      - Indicates whether a recommendation is available for at least one container, 0 or 1.
   - 

      - ``sf.recommendation.confidence_level``
      - W
      - Recommendations overall confidence level: Low, Medium, High (likely encoded as numbers). Aggregated from container.confidence_level, by taking the lowest confidence value (or the confidence value of the main/largest container).
   - 

      - ``sf.recommendation.container.available``
      - C
      - Indicates whether a recommendation is available, 0 or 1. A recommendation that matches the baseline is considered available.
   - 

      - ``sf.recommendation.container.confidence_level``
      - C
      - Recommendation confidence level: Low, Medium, High (encoded as numbers).
   - 

      - ``sf.recommendation.container.cpu_request``
      - C
      - Per-container recommendation.
   - 

      - ``sf.recommendation.container.memory_request``
      - C
      - Per-container recommendation.
   - 

      - ``sf.recommendation.container.cpu_limit``
      - C
      - Per-container recommendation.
   - 

      - ``sf.recommendation.container.memory_limit``
      - C
      - Per-container recommendation.
   - 

      - ``sf.recommendation.footprint.cpu_cores``
      - W
      - Total footprint of recommendation.
   - 

      - ``sf.recommendation.footprint.memory_gib``
      - W
      - Total footprint of recommendation.
   - 

      - ``sf.recommendation.footprint_change.cpu_cores``
      - W
      - Footprint change of CPU requests, assuming the CPU request recommendations are applied for all containers. May be 0 / missing / NaN if requests are not defined.
   - 

      - ``sf.recommendation.footprint_change.memory_gib``
      - W
      - Footprint change of memory requests, assuming the memory request recommendations are applied for all containers. May be 0 / missing / NaN if requests are not defined.
   - 

      - ``sf.baseline.pod.cpu_request``
      - W
      - Pod-level sum of the baseline for the configuration being analyzed. Note that the request for a container is considered defined if the limit is defined, even if the request is reported as missing/0.
   - 

      - ``sf.baseline.pod.memory_request``
      - W
      - Pod-level sum of the baseline for the configuration being analyzed.  Note that the request for a container is considered defined if the limit is defined, even if the request is reported as missing/0.
   - 

      - ``sf.baseline.pod.cpu_limit``
      - W
      - Pod-level sum of the baseline for the configuration being analyzed. 0 / NaN if at least one limit is missing: as a result, the whole pod doesn't have a limit for this resource.
   - 

      - ``sf.baseline.pod.memory_limit``
      - W
      - Pod-level sum of the baseline for the configuration being analyzed. 0 / NaN if at least one limit is missing: as a result, the whole pod doesn't have a limit for this resource.
   - 

      - ``sf.baseline.container.cpu_request``
      - C
      - Per-container baseline for the configuration being analyzed.
   - 

      - ``sf.baseline.container.memory_request``
      - C
      - Per-container baseline for the configuration being analyzed.
   - 

      - ``sf.baseline.container.cpu_limit``
      - C
      - Per-container baseline for the configuration being analyzed.
   - 

      - ``sf.baseline.container.memory_limit``
      - C
      - Per-container baseline for the configuration being analyzed.



\*Scope is W for workload and C for container. See :ref:`Dimensions <aopt-derived-metrics_dimensions>` for attributes that apply to each scope.



.. _aopt-derived-metrics_dimensions:

Dimensions
==========================================================


Workload-level attributes
----------------------------------------------------------

The following dimensions are applied to all metrics (both workload and container scope):

.. list-table::
   :widths: 40 60
   :width: 100%
   :header-rows: 1

   - 

      - **Attribute name**
      - **Description**
   - 

      - ``environment``
      - Splunk Observability Cloud-specific attribute.
   - 

      - ``k8s.cluster.name``
      - 
   - 

      - ``k8s.namespace.name``
      - 
   - 

      - ``k8s.workload.name``
      - This is our own generic workload info.
   - 

      - ``k8s.workload.kind``
      - Kind of workload: ``deployment``, ``statefulset`` or ``daemonset``. This is our own generic workload info.
   - 

      - ``k8s.workload.uid``
      - This is our own generic workload info.
   - 

      - ``k8s.deployment.name``
      - Present only for ``workload.kind`` == ``deployment``. The same as ``k8s.workload.name``.
   - 

      - ``k8s.deployment.uid``
      - Present only for ``workload.kind`` == ``deployment``. The same as ``k8s.object_uid``.
   - 

      - ``k8s.statefulset.name``
      - Present only for ``workload.kind`` == ``statefulset``. The same as ``k8s.workload.name``.
   - 

      - ``k8s.statefulset.uid``
      - Present only for ``workload.kind`` == ``statefulset``. The same as ``k8s.object_uid``.
   - 

      - ``k8s.daemonset.name``
      - Present only for ``workload.kind`` == ``daemonset``. The same as ``k8s.workload.name``.
   - 

      - ``k8s.daemonset.uid``
      - Present only for ``workload.kind`` == ``daemonset``. The same as ``k8s.object_uid``.
   - 

      - ``k8s.pod.qos``
      - Pod-level QoS
   - 

      - ``aopt.profiler_report.success``
      - Whether the analysis was successful and a report is provided. Values: 0 or 1.
   - 

      - ``aopt.instant_recommendation.present``
      - Whether there is a valid recommendation. Values: 0 or 1.





Container-level attributes
----------------------------------------------------------

The following additional dimensions are applied to per-container metrics (any metric with ``.container.`` name element):


.. list-table::
   :widths: 40 60
   :width: 100%
   :header-rows: 1

   - 

      - **Attribute name**
      - **Description**

   - 

      - ``k8s.container.name``
      - 
   - 

      - ``k8s.container.pseudo_qos``
      - Container-level pseudo-QoS


.. note:: 
   This set of additional attributes matches the set of additional attributes that per-container ``k8s`` metrics (such as memory and CPU utilization), provide on top of workload-level metrics (such as replica count). This excludes metadata attributes that are per pod instance (such ``as k8s.replica.set`` and ``k8s.pod.id``, since we always aggregate metrics across instances), as well as per container instance (such as ``k8s.container.id``) for the same reason.

