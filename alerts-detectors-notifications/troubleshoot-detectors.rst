.. _troubleshoot-detectors:


******************************************************************
Troubleshoot detectors in Splunk Observability Cloud
******************************************************************



.. meta::
  :description: Learn how to troubleshoot detectors in Splunk Observability Cloud. 

A :term:`detector` monitors signals on a plot line, as on a chart, and triggers alert events and clear events based on conditions you define in rules.

To access a detector, navigate to :guilabel:`Alerts` then :guilabel:`Detectors` from the Alerts menu, or by selecting :guilabel:`Open Detector` from an alert pop-out window. 

See the following sections for more information on how to troubleshoot detectors:

- :ref:`common-detector-issues`

- :ref:`timestamp-issues`

- :ref:`correlation-conflicts`


.. _common-detector-issues:

Troubleshoot common detector issues
===============================================================

If a detector does not trigger an alert under conditions when you expected one, open it and take the following troubleshooting steps:

#. Determine whether your detector is robust enough to accommodate aperiodic data. For example, metrics sent when events are not likely to be generated on a regular and predictable cadence.


#. Check the :guilabel:`Alert Rules`, :guilabel:`Signal`, and :guilabel:`Options` tabs for the detector. If detector rules seem correct, data might have been delayed enough to arrive outside a specified time window, or the resolution of the input data might have changed since the detector was created.


#. Compare the signal against the resolution reported in the :guilabel:`Detail View` of the detector. Mismatch between the signal and the resolution in the Detail View can show up in two ways:


- If the resolution in the Detail View is coarser than the resolution in the signal, then it’s likely that your reporting interval has changed and the detector no longer fires because the data is too unreliable to trigger alert events.

- If the resolution in the Detail View is finer than the resolution of the signal, then rolled up data might be causing an inconsistency in the criteria being evaluated.


.. _timestamp-issues:

Troubleshoot timestamp issues
===================================================================

Apart from not triggering an expected alert, delayed data can sometimes create the opposite problem of triggering an unwarranted alert. If data that you see in the detector does not match the chart preview shown in an alert message, then data might have been unavailable because it was delayed or missing while the detector was running.

The following example describes how to avoid timestamp related issues:

If your detector is set to trigger an alert when a metric is above 50 for 5 minutes, and your data comes in once every minute, this can result in a timestamp mismatch. The following table shows how some metric data points arrive several minutes late:

.. list-table::
   :header-rows: 1
   :widths: 20,40,40

   * - :strong:`Value`
     - :strong:`Timestamp on metric`
     - :strong:`Time metric actually arrived`
   
   * - 30
     - 11:07
     - 11:07
 
   * - 55
     - 11:08
     - 11:08
      
   * - 40
     - 11:09
     - 11:15
    
   * - 30
     - 11:10
     - 11:15
    
   * - 20
     - 11:11
     - 11:16

   * - 45
     - 11:12
     - 11:16
   
   * - 20
     - 11:13
     - 11:16
 

In this example, the detector does not trigger an alert if all data arrives on time. But the value of the metric being monitored was over 50 between 11:08 and 11:15, when the 11:09 data point with a value of 40 finally arrived. With the provided detector parameters, an alert is triggered 5 minutes after 11:08, at 11:13.

When you look later at the detector, however, data points shown in the chart reflect the correct timestamps. That is, all the data points from 11:09 onwards show values under 50 with the correct timestamps (for when metrics were sent and expected to arrive), so it doesn’t look like the triggering threshold condition was met.

You can use several strategies to avoid this problem:

- Set :guilabel:`Max Delay` value to :guilabel:`Auto`. If you manually set a Max Delay value on the detector, reset that value to Auto. Letting Amazon CloudWatch metric sync and Amazon EC2 property sync adjust max delay automatically based on incoming data will usually prevent inadvertent triggering of alerts by delayed data.

- Set the :guilabel:`extrapolation policy` to 0 (zero) for the detector to prevent alerts from being triggered by missing data. Data points not sent within an expected timeframe are considered null by default and excluded from calculations.

- Change the signal and condition that triggers the alert by adding the ``mean analytics`` function to the signal and giving it a transformation value of 5 minutes, with the detector firing immediately. In the example table, there is no 5-minute period during which the mean value is over 50, so no alert would be triggered.

.. _correlation-conflicts:

Troubleshoot correlation conflicts
============================================================================

Correlation is the function that shows how strongly pairs of variables are related to or associated with each other so that they change together at a constant rate.

A time series is defined by a metric name and a set of dimensions. Therefore, if you use a custom alert threshold that compares two plots that each hold a metric, but the metrics involved do not have the same dimensions, then a correlation conflict between them might prevent the alert from firing.

When one metric holds dimensions that the other does not, the analytic engine cannot compare (correlate) the two metrics to each other without extra help.

To fix this, aggregate the two plots, which strips the problematic dimensions and keeps correlation.

.. _count-function:

Use the count function to determine whether an instance should be down
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In an ephemeral infrastructure environment where things are constantly going up and down, traditional monitoring mechanisms require repeated manual configuration. Traditional monitoring mechanisms assume that non-reporting of a metric is always alert-worthy. This is a problem when non-reporting is the expected effect of autoscaling, as when an instance is turned down on purpose. By using analytics, however, you can alert only when non-reporting is unexpected.

The ``count`` analytics function tells you how many time series are reporting a value at a given point in time. If an instance stops reporting a metric, for example, because it has been terminated purposefully, then its time series is not counted. 

.. note:: Be sure to select the analytics function and not the rollup. 

In order for this function to accurately tell you how many instances are reporting, you need a property that tells you the expected state of the instance. For example, Amazon publishes the state of an EC2 instance: terminated, running, and so on. Splunk Infrastructure Monitoring imports that as ``aws_state``. 

Using the ``count`` function you can do the following:

#. Set up a plot that uses a heartbeat metric of your choosing such as ``memory.free``.
#. Filter out the emitters that have been terminated on purpose, for example, ``!aws_state:terminated``.
#. Apply the count function with a group-by on a dimension that represents a single emitter, for example, ``aws_tag_Name``.


This plot then emits a 0 or 1. An alert that is triggered when the output is 0 tells you that the instance is down unexpectedly.

You can apply this general concept to anything you want, as long as you have:

- A heartbeat metric that reports regularly
- A canonical dimension that represents the emitter or source that you care about
- A property on that dimension that denotes the expected state of the emitter


These items are packaged in the Heartbeat Check built-in alert condition. For more information about that alert condition, see :ref:`heartbeat-check`.