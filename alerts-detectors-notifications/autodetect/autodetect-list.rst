.. _autodetect-list:

******************************************************
List of available AutoDetect detectors
******************************************************

.. meta::
   :description: Reference of available AutoDetect detectors and their customizable arguments. 

The following tables show available AutoDetect detectors and their customizable arguments. To learn more about the driving SignalFlow functions, see the detectors functions in the SignalFlow library in :new-page:`GitHub <https://github.com/signalfx/signalflow-library/tree/master/library/signalfx/detectors/autodetect>`. Links to each specific function are also included in the following documentation for each detector. 

To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. _apm-autodetectors:

Splunk APM
===================================

Request, error, duration (RED) detectors
--------------------------------------------

.. _apm-autodetector-service-latency:

Service latency
^^^^^^^^^^^^^^^^^^^

- Description: Alerts when there is a sudden change in service latency. By default, the alert fires when the latency in the last ten minutes (current window) exceeds the baseline of the preceding hour (historical window) by more than 5 deviations. The alert clears when the latency goes back to less than 4 deviations above the norm.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/apm/latency.flow>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33
   :width: 100%

   * - Argument
     - Description
     - Default value
   
   * - Current window
     - Time window to test for anomalous values, in minutes.
     - ``10m``
   * - Historical window
     - Time window to use for historical normal values, in hours.
     - ``1h``
   * - Trigger threshold
     - Triggers the alert when the current value is greater than the specified number of deviations above historical data.
     - ``5``
   * - Clear growth threshold
     - Clear the alert when the current value is less than the specified number of deviations above historical data.
     - ``4``
   * - Minimum request per second (% of history)
     - Minimum request rate, as a percentage of historical request rate, required in the current window to trigger the alert. This prevents alerts for sparse data.
     - ``20``
   * - Filters
     - Dimensions you want to add to the detector.
     - None

.. _apm-autodetector-error-rate:

Service error rate
^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when a sudden change in service error rate occurs. By default, the alert fires when the error rate in the last ten minutes (current window) exceeds the baseline of the preceding hour (historical window) by more than 100%. The alert clears when the error rate goes back to less than 80% above the norm.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/apm/errors.flow>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33
   :width: 100%

   * - Argument
     - Description
     - Default value
   
   * - Current window
     - Time window to test for anomalous values, in minutes.
     - ``10m``
   * - Historical window
     - Time window to use for historical normal values, in hours.
     - ``1h``
   * - Trigger threshold
     - Triggers the alert when the current value is greater than the specified percentage above historical data.
     - ``100``
   * - Clear threshold
     - Clear the alert when the current value is less than the specified percentage above historical data.
     - ``80``
   * - Minimum request volume
     - Minimum number of requests in the current window. This prevents alerts for sparse data.
     - ``10``
   * - Filters
     - Dimensions you want to add to the detector.
     - None

.. _apm-autodetector-service-request-rate:

Service request rate
^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when a sudden change in request rate occurs. By default, the alert fires when the request rate in the last ten minutes (current window) exceeds the baseline of the preceding hour (historical window) by more than 3 deviations. The alert clears when the request rate goes back to less than 2.5 deviations above the norm.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/apm/requests.flow>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33
   :width: 100%

   * - Argument
     - Description
     - Default value
   
   * - Current window
     - Time window to test for anomalous values, in minutes.
     - ``10m``
   * - Historical window
     - Time window to use for historical normal values, in hours.
     - ``1h``
   * - Trigger threshold
     - Triggers the alert when the current value is greater than the specified number of deviations above historical data.
     - ``3.0``
   * - Clear growth threshold
     - Clear the alert when the current value is less than the specified number of deviations above historical data.
     - ``2.5``
   * - Filters
     - Dimensions you want to add to the detector.
     - None

.. _infrastructure-autodetectors:

Splunk Infrastructure Monitoring
===================================

.. _autodetect-aws:

AWS
------------

AWS/RDS free disk space is going to run out
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when RDS free disk space is expected to run out in the next 48 hours.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/aws/rds.flow#L6>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for space running out (in hours)
     - ``48``
   * - Sensitivity
     - Sensitivity of the alerting
     - ``80% of 10m``
   * - Clear threshold
     - Clear threshold for space running out (in hours)
     - ``96``
   * - Filters
     - Dimensions you want to add to the detector
     - None

AWS ALB: Sudden change in HTTP 5xx server errors
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when there is a sudden change in the number of HTTP 5xx server error codes that originate from the load balancer. By default, the alert fires when the change in HTTP 5xx server error count in the last ten minutes (current window) exceeds the baseline of the preceding hour (historical window) by more than 3.5 deviations.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/aws/alb.flow#L35>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   * - Current window
     - Time window to test for anomalous values (in minutes)
     - ``10m``
   * - Historical window
     - Time window to use for historical normal values (in hours)
     - ``1h``
   * - Trigger threshold
     - Triggers the alert when the current value is greater than the specified number of deviations above historical data.
     - ``3.5``
   * - Filters
     - Dimensions you want to add to the detector.
     - None

AWS Route 53: Health checkers' connection time took over 9 seconds
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when Amazon Route 53 health checkers' connection time took more than 9 seconds for the past 2 minutes.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/aws/route53.flow#L5>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   * - Trigger threshold
     - Trigger threshold for long connection time (in milliseconds)
     - ``9000``
   * - Sensitivity
     - Sensitivity of the alerting
     - ``100% of 2m``
   * - Clear threshold
     - Clear threshold for long connection time (in milliseconds)
     - ``8000``
   * - Clear sensitivity
     - Clear sensitivity of the alerting
     - ``100% of 2m``    
   * - Filters
     - Dimensions you want to add to the detector
     - None

AWS Route 53: Unhealthy status of health check endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the status of Amazon Route 53 health check endpoint is unhealthy. By default, the alert fires when the health check endpoint has been unhealthy for 80% of the past 10 minutes. The alert clears when the health check endpoint has been healthy for 80% of the past 10 minutes.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/aws/route53.flow#L41>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   * - Sensitivity
     - Sensitivity of the alerting
     - ``80% of 10m``
   * - Clear sensitivity
     - Clear sensitivity of the alerting
     - ``80% of 10m``    
   * - Filters
     - Dimensions you want to add to the detector
     - None



.. _autodetect-azure:

Azure
------------

Azure - CPU utilization expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when Azure CPU utilization of the elastic pool is above its designated threshold. 
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/azure/elasticpools.flow#L48>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Specifies trigger threshold in % for CPU utilization
     - ``80%``

   * - Trigger sensitivity
     - Sensitivity for alerting associated with the trigger threshold
     - ``80% of 10m``

   * - Clear threshold
     - Specifies clear threshold in % for the CPU utilization
     - ``80%``

   * - Clear sensitivity
     - Specifies clear sensitivity associated with clear threshold
     - ``80% of 10m`` 

   * - Filter
     - Specifies dimensional scope of the detector
     - ``None``     


Azure - eDTU utilization expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when eDTU (elastic Data Transaction Unit) utilization is above its designated threshold. 
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/azure/elasticpools.flow#L4>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Specifies trigger threshold in % for the eDTU utilization
     - ``80%``

   * - Trigger sensitivity
     - Specifies sensitivity associated with the trigger threshold
     - ``80% of 10m``

   * - Clear threshold
     - Specifies clear threshold in % for the eDTU utilization
     - ``80%``

   * - Clear sensitivity
     - Specifies sensitivity associated with the clear threshold
     - ``80% of 10m``     

   * - Filter
     - Specifies dimensional scope of the detector
     - ``None``     


Azure - Storage utilization expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Detects when storage utilization of elastic pool is above its desginated threshold. 
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/azure/elasticpools.flow#L93>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Specifies trigger threshold in % for the storage utilization
     - ``80%``

   * - Trigger sensitivity
     - Specifies sensitivity associated with the trigger threshold
     - ``80% of 10m``

   * - Clear threshold
     - Specifies clear threshold in % for the storage utilization
     - ``80%``

   * - Clear sensitivity
     - Specifies sensitivity associated with the clear threshold
     - ``80% of 10m``     

   * - filter
     - Specifies dimensional scope of the detector
     - ``None``     


.. _autodetect-kafka:

Kafka
-----------

Kafka - Partition is under-replicated
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when at least one Kafka partition is under replicated for at least 5 minutes.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/kafka/broker.flow#L18>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
  
   * - Trigger threshold
     - Trigger threshold for number of under replicated partitions
     - ``0``
   * - Sensitivity
     - Sensitivity of the alerting
     - ``100% of 5m``
   * - Filters
     - Dimensions you want to add to the detector
     - None
   
Kafka - No Active Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when there is no active controller in a cluster.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/kafka/broker.flow#L5>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.r:

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   * - Filters
     - Dimensions you want to add to the detector
     - None

Kafka - Offline partitions on a broker
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when there is no active leader for a partition, and the partition cannot be read from or written to.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/kafka/broker.flow#L39>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   * - Trigger threshold
     - Trigger threshold for number of offline partitions
     - ``0``
   * - Filters
     - Dimensions you want to add to the detector
     - None

Kafka - Consumer Group lag
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when a consumer group has been lagging behind the latest offset by 100 for 2 minutes.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/kafka/consumer.flow#L5>` repository on GitHub.


The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value   
   * - Trigger threshold
     - Trigger threshold for the consumer group lag
     - ``100``
   * - Sensitivity
     - Sensitivity of the alerting
     - ``100% of 2m``
   * - Clear threshold
     - Clear threshold for the consumer group lag
     - ``100``
   * - Clear sensitivity
     - Clear sensitivity of the alerting
     - ``100% of 5m``     
   * - Filters
     - Dimensions you want to add to the detector
     - None

.. _autodetect-k8s:

Kubernetes
---------------------------------------------------

K8s Cluster DaemonSet ready vs scheduled
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when number of ready and scheduled DaemonSets have diverged.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/k8s/daemonsets.flow#L5>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value   
   * - Trigger threshold
     - Trigger threshold for difference between the number of ready and scheduled DaemonSets
     - ``0``
   * - Sensitivity
     - Sensitivity of the alerting
     - ``95% of 5m``
   * - Filters
     - Dimensions you want to add to the detector
     - None

K8s Cluster Deployment is not at spec
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the numbers of ready and available pods in Cluster Deployments have diverged.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/k8s/deployments.flow#L5>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for difference between the number of ready and available pods in the deployment
     - ``0``
   * - Sensitivity
     - Sensitivity of the alerting
     - ``80% of 5m``
   * - Filters
     - Dimensions you want to add to the detector
     - None

K8s Container Restart Count is > 0
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when container restart count in the last 5 minutes is greater than 0.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/k8s/containers.flow#L5>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
     
   * - Filters
     - Dimensions you want to add to the detector
     - None

K8s Node Memory Utilization is high
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when a Kubernetes Node has been using more than 90% memory for 5 minutes.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/k8s/nodes.flow#L21>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for percentage of node memory utilization
     - ``90``
   * - Sensitivity
     - Sensitivity of the alerting
     - ``100% of 5m``
   * - Filters
     - Dimensions you want to add to the detector
     - None

K8s Nodes are not ready
^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when Kubernetes Nodes are not in a ready state after 30 seconds.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/k8s/nodes.flow#L5>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value

   * - Sensitivity
     - Sensitivity of the alerting
     - ``100% of 30s``
   * - Filters
     - Dimensions you want to add to the detector
     - None
   

.. _autodetect-oracle:

Oracle
---------------------------------------------------
Oracle - Process utilization expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Description: Alerts when Oracle process utilization is above its designated threshold. 
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/db/oracle.flow#L50>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Specifies trigger threshold in % for the process utilization
     - ``90%``

   * - Trigger sensitivity
     - Sensitivity for alerting associated with the threshold
     - ``80% of 5m``

   * - Clear threshold
     - Specifies clear threshold in % for the process utilization
     - ``< 90%``

   * - Clear sensitivity
     - Specifies clear sensitivity associated with clear threshold
     - ``80% of 5m``     

   * - filter
     - Dimensions you want to add to the scope of the detector, if any
     - None  



Oracle - Session utilization expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Description: Alerts when Oracle session utilization is above its designated threshold. 
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/db/oracle.flow#L5>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Sets threshold ``fire_threshold`` for CPU usage percentage
     - ``90%``

   * - Trigger sensitivity
     - Sensitivity for alerting
     - ``80% of 5m``

   * - Clear threshold
     - Sets value for when to clear alerts for CPU usage percentage
     - ``90%``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``80% of 5m``     

   * - filter
     - Dimensions you want to add to the scope of the detector, if any
     - None  


Oracle - Sudden change in hard parses count
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Description: Alerts when the number of hard parses suddenly increases. 
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/db/oracle.flow#L137>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger deviation
     - Expressed in standard deviations from baseline
     - ``4.5``

   * - Evaluation window
     - The time range being monitored
     - ``20m``

   * - Historical window
     - The time range used to define the recent trend
     - ``3h`` 

   * - filter
     - Dimensions you want to add to the scope of the detector, if any
     - None

.. _autodetect-redis:

Redis
---------------------------------------------------  

Redis Server - CPU Continuously near limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- Description: Alerts when Redis CPU usage exceeds the threshold for 80% of the last 10 minutes. The alert clears when Redis CPU usage drops below the clear threshold for 100% of the last 10 minutes.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/db/redis.flow#L6>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for CPU usage percentage
     - ``90``

   * - Sensitivity
     - Sensitivity for alerting
     - ``80% of 10m``

   * - Clear threshold
     - Threshold to clear alerts for CPU usage percentage
     - ``80``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 10m``

   * - Filters
     - Dimensions you want to add to the detector
     - None

.. _autodetect-splunk:

Splunk operational
========================

Splunk operational detectors let you know when you reach certain limits within your Splunk Observability Cloud products. 

Splunk operational APM detectors
------------------------------------

.. _apm-autodetector-profile-msg-throttled:

Splunk operational - APM profiling messages are throttled
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Generates an alert when the number of profiling messages that are dropped due to throttling is above the specified threshold. 
- SignalFlow function: See the APM ``operational.flow`` function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/apm/operational.flow#L4>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for APM profiling messages throttled
     - ``0``

   * - Sensitivity
     - Sensitivity for alerting 
     - ``80% of 5m``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 5m``

   * - Default severity
     - The default alert severity
     - ``Critical``

.. _apm-autodetector-spans-throttled:

Splunk operational - APM spans are throttled
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Generates an alert when the number of spans that are dropped due to throttling is above the specified threshold.
- SignalFlow function: See the ``operational.flow`` function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/apm/operational.flow#L29>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.


.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for APM spans throttled
     - ``0``

   * - Sensitivity
     - Sensitivity for alerting 
     - ``80% of 5m``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 5m``

   * - Default severity
     - The default alert severity
     - ``Critical``

.. _apm-autodetector-spans-blocked:

Splunk operational - APM spans are blocked
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Generates an alert when the number of blocked spans is above the specified threshold.
- SignalFlow function: See the ``operational.flow`` function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/apm/operational.flow#L53>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for APM spans blocked
     - ``0``

   * - Sensitivity
     - Sensitivity for alerting 
     - ``80% of 5m``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 5m``

   * - Default severity
     - The default alert severity
     - ``Info``

Splunk operational detector-related detectors
------------------------------------------------

Splunk Operational - Detectors aborted
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when at least one detector has been aborted for the last 5 hours.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L4>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for number of aborted detectors
     - ``0``
   * - Over period
     - Period of time to compute the number of aborted detectors
     - ``5h``
   * - Filters
     - Dimensions you want to add to the detector
     - None

Splunk Operational - The number of detectors is expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when number of detectors about to reach the organization system limit. This limit includes customized detectors created from AutoDetect detectors.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L23>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   * - Trigger threshold
     - Percentage system limit reached for maximum number of detectors in an organization
     - ``90``
   * - Sensitivity
     - Sensitivity of the alerting
     - ``100% of 3h``

Splunk operational Infrastructure Monitoring detectors
-----------------------------------------------------------

Splunk Operational - Container usage is expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the container usage percentage is higher than the system limit threshold.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L185>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for containers usage percentage
     - ``95``

   * - Sensitivity
     - Sensitivity for alerting 
     - ``100% of 30m``

   * - Clear threshold
     - Threshold to clear alerts for containers usage percentage 
     - ``90``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 30m``

   * - Show containers
     - Option to show number of containers instead of percentage
     - ``No``

Splunk Operational - Datapoints are throttled 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the number of throttled data points is higher than the system limit threshold.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L235>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for the number of throttled datapoints
     - ``10``

   * - Sensitivity
     - Sensitivity for alerting 
     - ``80% of 5m``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``80% of 5m``

Splunk Operational - Host usage percentage is expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the host usage percentage is higher than the system limit threshold.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L89>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for the host usage percentage
     - ``95``

   * - Sensitivity
     - Sensitivity for alerting 
     - ``100% of 30m``

   * - Clear threshold
     - Threshold to clear alerts for host usage percentage
     - ``90``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 30m``

   * - Show custom metric time series
     - Option to show number of hosts instead of percentage
     - ``No``

Splunk Operational - Active metric time series (MTS) is expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the number of active metric time series (MTS) is projected to reach the organization system limit.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L49>` repository on GitHub.

This detector does not have any customizable arguments.

Splunk Operational - Custom metric time series (MTS) usage is expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the custom MTS usage percentage is higher than the system limit threshold.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L137>` repository on GitHub.

The following table shows customizable arguments for this detector. To learn how to use and customize AutoDetect detectors, see :ref:`autodetect`.

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for the custom MTS usage percentage
     - ``95``

   * - Sensitivity
     - Sensitivity for alerting 
     - ``100% of 30m``

   * - Clear threshold
     - Threshold to clear alerts for custom MTS usage percentage
     - ``90``

   * - Clear sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 30m``

   * - Show custom metric time series
     - Option to show number of custom MTS instead of percentage
     - ``No``








