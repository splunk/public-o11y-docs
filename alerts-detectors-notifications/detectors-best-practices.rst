.. _detectors-best-practices:


**************************************************************************
Best practices for creating detectors in Splunk Observability Cloud
**************************************************************************

.. meta::
   :description: Splunk Observability Cloud uses detectors, events, alerts, and notifications to tell you when certain criteria are met. When a detector condition is met, the detector generates an event, triggers an alert, and can send one or more notifications. Follow these best practices in Splunk Observability Cloud when creating a detector. 

Splunk Observability Cloud uses detectors to set conditions that determine when to send an alert or notification to the appropriate team members. Detectors evaluate metric time series against a specified condition, and optionally for a duration. When a condition is met, detectors generate events with a level of severity. Severity levels are  Info, Warning, Minor, Major, and Critical. These events are alerts that can trigger notifications in incident management platforms, such as PagerDuty, or messaging systems, such as Slack or email.

==========================================================================
Using static thresholds
==========================================================================
The most basic kind of alert triggers immediately when a simple metric crosses a static threshold. An example is anytime CPU utilization goes above 70%. Fixed thresholds are easy to implement and interpret when there are absolute goals to measure against. For example, if you know the typical memory per CPU profile of a certain application, you can define bounds that define normal state. Or, if you have a business requirement to serve requests within a certain time period, you know what is an unacceptable latency for that function.

==========================================================================
Consistent signal types
==========================================================================
For a detector to work properly, the signal that it evaluates must represent a consistent type of measurement. For example, when Splunk Observability Cloud reports ``cpu.utilization``, it is a value between 0 and 100 and represents the average utilization across all CPU cores for a single Linux instance or host. 

Do not use wildcards. If you use wildcards in your metric name, make sure that the wildcards do not mistakenly include metrics of different types. For example, if you enter ``jvm.*`` as the metric name, your detector can evaluate to ``jvm.heap``, ``jvm.uptime`` and ``jvm.cpu.load`` (assuming each is a metric names in use in your organization) against the same threshold, which might lead to unexpected results.

==========================================================================
Viewing at native data resolution
==========================================================================
A common and easy way to create a detector is to first create a chart, which lets you visualize the behavior of the signal you want to alert on, then convert it to a detector. In the chart builder actions menu, select :strong:`Chart` then :strong:`New Detector`. If you choose to use this method to create a detector, make sure you are visualizing the data at its native resolution, as this gives you the most accurate picture of the data that your detector evaluates. For example, if you create a detector using a metric that reports once every 10 seconds, make sure the time range for your chart is small enough (say, 15 minutes) to see individual measurements every 10 seconds. 

By default, Splunk Observability Cloud chooses a chart display resolution that fits within the time range you choose, and summarizes the data to match that resolution. For example, if you use a metric that reports every 10 seconds, but you look at a 1-day window, then by default the data you see on the chart represents 30-minute intervals. Depending on the rollup or summarization method, this could mean that any peaks or dips average out, which gives you an inaccurate understanding of your signal and what constitutes an appropriate detector threshold. Also, analytics pipelines are applied to the rolled-up data, so the meaning of a calculation might change if the resolution changes. For example, duration parameters, which you can use for timeshifting and smoothing data, have no effect when they are smaller than the resolution.


