.. _autodetect-list:

******************************************************
List of available AutoDetect detectors
******************************************************

.. meta::
   :description: The following tables show available AutoDetect detectors and their customizable arguments. To learn more about the driving SignalFlow functions, see the GitHub link in each AutoDetect detector section.

The following tables show available AutoDetect detectors and their customizable arguments. To learn more about the driving SignalFlow functions, see the GitHub link in each AutoDetect detector section.

.. _apm-autodetectors:

Application Monitoring
===================================

Service latency detector
------------------------------------

- Description: Alerts when there is a sudden change in service latency.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/apm/latency.flow>` repository on GitHub.

The following table shows customizable arguments for this detector:

.. list-table::
   :header-rows: 1
   :widths: 33 33 33
   :width: 100%

   * - Argument
     - Description
     - Default value
   
   * - Current window
     - Current windows for the alert, in minutes
     - ``10m``
   * - Historical window
     - Current windows for the alert, in hours
     - ``1h``
   * - Trigger threshold
     - Sensitivity of the alerting
     - ``0.5``
   * - Clear threshold
     - Clear threshold for space running out
     - ``0.1``
   * - Minimum request per second
     - Threshold on number of requests per second
     - 0
   * - Filters
     - Dimensions you want to add to the detector
     - None
   
Error rate
------------------

- Description: Alerts when a sudden change in service error rate occurs.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/apm/errors.flow>` repository on GitHub.

The following table shows customizable arguments for this detector:

.. list-table::
   :header-rows: 1
   :widths: 33 33 33
   :width: 100%

   * - Argument
     - Description
     - Default value
   
   * - Current window
     - Current windows for the alert, in minutes
     - ``10m``
   * - Historical window
     - Current windows for the alert, in hours
     - ``1h``
   * - Trigger threshold
     - Sensitivity of the alerting
     - ``0.5``
   * - Clear threshold
     - Clear threshold for space running out
     - ``0.1``
   * - Minimum request volume
     - Threshold on number of attempts
     - 1
   * - Filters
     - Dimensions you want to add to the detector
     - None

.. _infrastructure-autodetectors:

Infrastructure Monitoring
===================================

.. _autodetect-aws:

AWS
------------

AWS/RDS free disk space is going to run out
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when RDS free disk space is expected to run out in the next 48 hours.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/aws/rds.flow#L6>` repository on GitHub.

The following table shows customizable arguments for this detector:

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
   
.. _autodetect-kafka:

Kafka
-----------

Kafka - Partition is under-replicated
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when at least one Kafka partition is under replicated for at least 5 minutes.
- SignalFlow function: See the function in :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/infra/kafka/broker.flow#L18>` repository on GitHub.

The following table shows customizable arguments for this detector:

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

The following table shows customizable arguments for this detector:

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

The following table shows customizable arguments for this detector:

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


The following table shows customizable arguments for this detector:

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

The following table shows customizable arguments for this detector:

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

The following table shows customizable arguments for this detector:

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

The following table shows customizable arguments for this detector:

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

The following table shows customizable arguments for this detector:

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

The following table shows customizable arguments for this detector:

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
   
.. _autodetect-splunk:

Splunk operational
---------------------------------------------------

Splunk Operational - Container usage is expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: alerts when the container usage percentage is higher than the system limit threshold.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L185>` repository on GitHub.

The following table shows customizable arguments for this detector:

.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - Argument
     - Description
     - Default value
   
   * - Trigger threshold
     - Trigger threshold for the containers usage percentage
     - ``95``

   * - Sensitivity
     - Sensitivity for alerting 
     - ``100% of 30m``

   * - Clear threshold
     - Threshold to clear alerts for containers usage percentage 
     - ``90``

   * - Clear Sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 30m``

   * - Show containers
     - Option to show number of containers instead of percentage
     - ``No``

Splunk Operational - Datapoints are throttled 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the number of throttled data points is higher than the system limit threshold.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L235>` repository on GitHub.

The following table shows customizable arguments for this detector:

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

   * - Clear Sensitivity
     - Sensitivity for clearing alerts
     - ``80% of 5m``


Splunk Operational - Detectors aborted
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when at least one detector has been aborted for the last 5 hours.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L4>` repository on GitHub.

The following table shows customizable arguments for this detector:

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

The following table shows customizable arguments for this detector:

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

Splunk Operational - Host usage percentage is expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the host usage percentage is higher than the system limit threshold.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L89>` repository on GitHub.

The following table shows customizable arguments for this detector:

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

   * - Clear Sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 30m``

   * - Show custom metric time series
     - Option to show number of hosts instead of percentage
     - ``No``

Splunk Operational - Active MTS is expected to reach the limit 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the number of active MTS is projected to reach the organization system limit.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L49>` repository on GitHub.

This detector does not have any customizable arguments.

Splunk Operational - Custom MTS usage is expected to reach the limit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Description: Alerts when the custom MTS usage percentage is higher than the system limit threshold.
- SignalFlow function: See the function in the :new-page:`SignalFlow library <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/detectors/autodetect/splunk/operational.flow#L137>` repository on GitHub.

The following table shows customizable arguments for this detector:

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

   * - Clear Sensitivity
     - Sensitivity for clearing alerts
     - ``100% of 30m``

   * - Show custom metric time series
     - Option to show number of custom MTS instead of percentage
     - ``No``








