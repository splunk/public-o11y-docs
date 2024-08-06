.. _detectors-best-practices:


**************************************************************************
Best practices for creating detectors in Splunk Observability Cloud
**************************************************************************

.. meta::
   :description: Splunk Observability Cloud uses detectors, events, alerts, and notifications to tell you when certain criteria are met. When a detector condition is met, the detector generates an event, triggers an alert, and can send one or more notifications. Follow these best practices in Splunk Observability Cloud when creating a detector. 

Splunk Observability Cloud uses detectors to set conditions that determine when to send an alert or notification to the appropriate team members. Detectors evaluate metric time series against a specified condition, and optionally for a duration. When a condition is met, detectors generate events with a level of severity. Severity levels are  Info, Warning, Minor, Major, and Critical. These events are alerts that can trigger notifications in incident management platforms, such as PagerDuty, or messaging systems, such as Slack or email.

Using static thresholds
==========================================================================
The most basic kind of alert triggers immediately when a simple metric crosses a static threshold. An example is anytime CPU utilization goes above 70%. Fixed thresholds are easy to implement and interpret when there are absolute goals to measure against. For example, if you know the typical memory per CPU profile of a certain application, you can define bounds that define normal state. Or, if you have a business requirement to serve requests within a certain time period, you know what is an unacceptable latency for that function.

Consistent signal types
==========================================================================
For a detector to work properly, the signal that it evaluates must represent a consistent type of measurement. For example, when Splunk Observability Cloud reports ``cpu.utilization``, it is a value between 0 and 100 and represents the average utilization across all CPU cores for a single Linux instance or host. 

Do not use wildcards. If you use wildcards in your metric name, make sure that the wildcards do not mistakenly include metrics of different types. For example, if you enter ``jvm.*`` as the metric name, your detector can evaluate to ``jvm.heap``, ``jvm.uptime`` and ``jvm.cpu.load`` (assuming each is a metric names in use in your organization) against the same threshold, which might lead to unexpected results.

Viewing at native data resolution
==========================================================================
A common and easy way to create a detector is to first create a chart, which lets you visualize the behavior of the signal you want to alert on, then convert it to a detector. In the chart builder actions menu, select :strong:`Chart` then :strong:`New Detector`. If you choose to use this method to create a detector, make sure you are visualizing the data at its native resolution, as this gives you the most accurate picture of the data that your detector evaluates. For example, if you create a detector using a metric that reports once every 10 seconds, make sure the time range for your chart is small enough (say, 15 minutes) to see individual measurements every 10 seconds. 

By default, Splunk Observability Cloud chooses a chart display resolution that fits within the time range you choose, and summarizes the data to match that resolution. For example, if you use a metric that reports every 10 seconds, but you look at a 1-day window, then by default the data you see on the chart represents 30-minute intervals. Depending on the rollup or summarization method, this could mean that any peaks or dips average out, which gives you an inaccurate understanding of your signal and what constitutes an appropriate detector threshold. Also, analytics pipelines are applied to the rolled-up data, so the meaning of a calculation might change if the resolution changes. For example, duration parameters, which you can use for timeshifting and smoothing data, have no effect when they are smaller than the resolution.

.. _monitor-signal:

Create detectors that monitor a single signal across a population
==========================================================================
Splunk Observability Cloud provides a simple and concise way of defining detectors that monitor a large number of similar items like the CPU utilization for all of the hosts in a given cluster. It accomplishes this through the metadata that is associated with metric time series, which is analogous to how that metadata - dimensions, properties or tags - creates charts.

Let's look at an example. If you have a group of 30 hosts that provide a clustered service like Kafka, it normally includes a dimension like ``service:kafka`` with all of the metrics coming from those hosts. In this case, if you want to track whether CPU utilization remains below 70% for each of those hosts, you can create a single detector for the ``cpu.utilization`` metric that filters hosts using the ``service:kafka`` dimension and evaluates them against the static threshold of 70. This detector triggers individual alerts for each host whose CPU utilization exceeds the threshold - just as if you had 30 separate detectors - but you only need to create one detector, not 30. 

In addition, if the population changes - say, because the cluster grows to 40 hosts - you do not need to make any changes to your detector. As long as you include the ``service:kafka`` dimension for metrics coming from the new hosts, the existing detector finds them and automatically includes them in the threshold evaluation.

Detectors that monitor a single signal work best when all of the members of the population have the same threshold, and the same notification policy. For example, they might publish alerts into the same Slack channel. If you have different thresholds or notification policies, you must create multiple detectors (one for each permutation of threshold and notification) or take advantage of the const function in SignalFlow. In any case, the likely number of such detectors is still fewer than the count of individual members that it monitors. It is important to create a detector for a signal, not for a microservice, in order to avoid accumulating too many detectors that trigger a multitude of alerts.

Use aggregation to monitor sub-groups within a population
==========================================================================
You can also use detectors to monitor sub-groups within the population. For example, let’s say you have 100 hosts in total, divided among 10 services. You want to make sure the 95th percentile of CPU utilization across the cluster of hosts that provide each of those services remains below 70%. In this case, create a single detector for ``cpu.utilization``, then apply an analytics function of P95, and group by ``service``. The aggregation approach works only if ``service`` is a dimension or property. The aggregation approach does not work if ``service`` is a tag. 

This aggregation detector triggers alerts for each service, just as if you had 10 separate detectors - but you only need to create one detector, not 10. If you add additional services, the detector automatically monitors them as long as you have included a ``service`` dimension or property for the new services' metrics.

Note you can also monitor individual members of a population for deviation from the population norm, optionally grouping by dimensions or properties, with the Outlier Detection built-in alert condition. (population_comparison in the SignalFlow library. See the population_comparison detector in the signalflow-library at :new-page:`https://github.com/signalfx/signalflow-library/tree/master/library/signalfx/detectors/population_comparison`.





