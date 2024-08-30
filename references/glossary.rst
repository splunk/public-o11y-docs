.. _get-started-glossary:

************************************************
Glossary for Splunk Observability Cloud
************************************************

.. meta::
   :description: Learn about common terms and concepts in Splunk Observability Cloud.

A
==

.. glossary::

   agent (deployment method)
      An agent is a deployment method where an instance of the :term:`Splunk Distribution of OpenTelemetry Collector` runs with the application or on the same host as the application. For example, when you configure the :term:`Splunk Distribution of OpenTelemetry Collector` for Linux, Kubernetes, or Windows, you are using the agent deployment method.

   alert
      An alert is triggered when the conditions for a detector rule are met. For example, a detector monitoring the number of application requests has a rule that produces an alert if the number is below a static threshold, for example, 20 requests per minute, and/or above a calculated one, for example, the mean + 3 standard deviations above the number of requests per minute over the past hour.

      When an alert is triggered, the detector also creates an :term:`event` and might optionally send a :term:`notification`. All currently active alerts can be viewed under Alerts & Detectors 

   analytics
      Analytics are the mathematical functions that can be applied to a collection of data points. For a full list of analytics that can be applied in Splunk Infrastructure Monitoring, see the :ref:`analytics-ref`.

   automatic discovery
      Automatic discovery is a feature of the Splunk Distribution of OpenTelemetry Collector that identifies the applications running in your environment and sends telemetry data from them to Splunk Application Performance Monitoring (APM). The Collector configures an application-specific receiver that collects data from an endpoint exposed on the source application. Automatic discovery is available for applications written in Java, Node.js, and .NET. For more information, see :ref:`discovery_mode`.

   automatic instrumentation
      Automatic instrumentation uses an agent of the Splunk distribution of the OpenTelemetry Collector to instrument your source application for the export of telemetry data without requiring the end user to modify the application code. The agent configures the source application to export data in a supported format to an OTLP endpoint, on either an OTLP receiver or the Splunk Observability Cloud back end. Automatic instrumentation is available for applications written in Java, Node.js, .NET, Go, Python, Ruby, and PHP and automatically collects telemetry data for code written using supported libraries in each language. For more information, see :ref:`get-started-application`.

C
==

.. glossary::

   call stack
      A call stack is the data structure used by a machine to keep track of which methods are currently being called. When the active call stack is sampled, the result is a stack trace.

   counter metric
      The counter metric type represents data that is a count of occurrences in a time interval. It measures occurrences of an activity or event, for example, the number of web pages served by a website or the number of exceptions in a process. Summing counters over a period of time produces the net activity in that interval. Counters can only take integer values of zero or greater and are reset to zero at the conclusion of each reporting interval.

   cumulative counter metric
      The cumulative counter metric type represents a running count of occurrences. It typically represents the total activity in the lifetime of an application or process. Cumulative counters are NOT reset with each reporting interval. Examples of cumulative counters include the total number of Splunk Infrastructure Monitoring API calls served since a web server started up, or the total number of bytes transmitted by an interface since it started up. Cumulative counters can also be used to derive incremental values, just as counters can.

D
==

.. glossary::

   detector
      A detector monitors a signal for conditions that you care about.

      Those conditions are expressed as one or more rules that trigger an alert when the conditions in the rules are met. Individual rules in a detector are labeled according to criticality: Info, Warning, Minor, Major, and Critical.

      For example, a detector that monitors the latency of an API call triggers a critical alert when the latency is significantly higher than normal, as defined in the detector rules.

      For more information, see :ref:`get-started-detectoralert`.

   dimension
      A dimension is a key/value pair that, along with the metric name, is part of the identity of a time series. You can filter and aggregate time series by those dimensions across Infrastructure Monitoring.

E
==

.. glossary::

   event
      An event is a periodic occurrence that can be represented as a structured log line to Splunk Infrastructure Monitoring. For example, the values could be represented as any combination of key/value pairs. Events are secondary to :term:`metrics<Metric>` in Infrastructure Monitoring and are meant to provide context for the metric data. Events can be displayed on charts and viewed in the Events sidebar. See :ref:`events-intro`.

   event time series
      An event time series (ETS) is a sequence of events uniquely identified by the event name and optional, additional dimensions. For example, an event time series with the name ``code push`` and the dimension ``repository`` can be created to record code push events for a given repository. An example of such an ETS could be ``sf_eventType:code push`` and ``repository:ui-code-base``.

F
==

.. glossary::

   flame graph
      The flame graph is a visual representation of a collection of stack traces. For every line of code in the stack trace, there is a corresponding line in the flame graph. The width of each bar in the flame graph represents the number of times the respective line of code appears in the stack traces that have been collected in the time range of the flame graph. For example, if a line of code occupies 100% of the width of the flame graph, then that line of code appears in all of the stack traces in the collection. The  y-axis of the flame graph shows the depth of the stack trace.  The colors of the flame graph are random. The x-axis is not ordered by time. The ordering of stack traces from left to right is random and it does not correlate to a time-based sequence.

   flappy
      A :term:`detector` is said to be "flappy" when it triggers and clears alerts too frequently. For example, if you have a detector set to trigger an alert when a value reaches 90%, and the signal you are monitoring regularly spikes and dips around this value, alerts will be triggered and cleared too often to be of value. To reduce this flappiness, you might want to specify that the value must remain at 90% for a specified amount of time before triggering an alert.

G
==

.. glossary::

   gateway (deployment method)
      Gateway is a deployment method where the :term:`Splunk Distribution of OpenTelemetry Collector` is running by itself. When you configure the Splunk Distribution of OpenTelemetry Collector as a standalone package, you are using the gateway deployment method.

   gauge metric
      The gauge metric type represents data that has a specific value at each point in time. It measures the value of something over time. Examples of gauges used in monitoring include CPU utilization percentage, % free JVM heap, or the size of an internal queue in an application. Reporting frequency (in other words, how often you take a reading) is most important for gauges, as higher frequency is typically associated with higher accuracy.

      For example, measuring CPU utilization every 5 minutes means that any peaks and valleys that may have occurred between readings are missed, and it's entirely possible that those peaks or valleys may be significant.

I
==

.. glossary::

   integration
      An integration is a configurable component of Splunk Observability Cloud that connects Splunk Observability Cloud to a third-party service.
      Most integrations connect third-party data services, but Splunk Observability Cloud also offers SSO and notification integrations.

M
==

.. glossary::

   metric
      Metrics are the primary form of data you send into Splunk Infrastructure Monitoring. A metric is a periodic measurement that is represented as a numerical value. The same metric can be reported from multiple sources or emitters. Typically, each unique combination of a source and a metric results in a :term:`metric time series<metric time series>`.

   metric cardinality
      Metric cardinality is the number of unique metric time series (MTS) produced by a combination of metric name and its associated dimensions. Therefore, a metric has high cardinality when it has a high number of dimension keys, and a high number of possible unique values for those dimension keys.

   metric time series
      A metric time series (MTS) is defined by the unique combination of a metric and a set of dimensions (which may be empty). The most common dimension is a source, like a host or instance for infrastructure metrics, or an application component or service tier for application metrics. The output of analytics pipelines are also metric time series.

   MTS
      See :term:`metric time series`.

   muting rule
      A muting rule defines a period of time during which :term:`notifications<notification>` for specified :term:`alerts<alert>` will not be sent.  See :ref:`mute-notifications`.

N
==

.. glossary::

   notification
      A notification is an action taken when a :term:`detector` triggers an :term:`alert` and when the alert condition clears. Notifications can be sent to an email address; to one of several other systems, such as Slack; or to a webhook URL.

P
==

.. glossary::

   property
      Properties are key-value pairs that can be bound to metrics, dimensions, or time series. They define arbitrary text data that can be used to provide additional operational information on the objects they are associated with. Properties are different from dimensions in the sense that they do not take part in the identity of a time series; changing the value of a property does not affect the identity of that time series.

      Property values are most frequently used as dynamic filters for charts (for example, show 90th percentile of CPU utilization for servers with a location property value of "Seattle"), or for groupings (for example, show 90th percentile of CPU utilization for servers, grouped by location value).

R
==

.. glossary::

   realm
      The self-contained deployment of Splunk Observability Cloud where your organization is hosted. Different realms have different Splunk Observability Cloud API endpoints. For example, the endpoint for sending data in the us1 realm is https://ingest.us1.signalfx.com, while the endpoint for sending data in the eu0 realm is https://ingest.eu0.signalfx.com.
      
   rollup
      An accumulation of data points, with some mathematical or statistical expression applied to it. For example, a 95th percentile calculation over a 1-week window. In an Infrastructure Monitoring plot, rollups determine how Infrastructure Monitoring prepares data points for use in charts or analytic computations. 

      For example, if you change the time range from -1m (past minute) to -1w (past week), multiple data points may be rolled up into one using a rollup function, such as Average, so the data points for the wider timeframe can be effectively displayed.

      For more information, see :ref:`rollups`.

   rule
      A :term:`detector` contains one or more rules that specify conditions under which the detector triggers an :term:`alert`, the severity of the alert, and the recipients of :term:`notifications<notification>` that are sent when the condition occurs and when it clears.

      For more information, see :ref:`build-rules`.

S
==

.. glossary::

   signal
      In the context of a chart in Infrastructure Monitoring, a signal is the metric time series that you want to plot on a chart or use as an input to a detector or to additional analytics.

   stack trace
      A stack trace is a sampled snapshot of the call stack. The stack trace contains the class name, method name, and line number in the call stack for a given thread. For example, AlwaysOn Profiling captures a stack trace for every running thread in the Java Virtual Machine. When stack traces are sampled across all VM threads, the result is a thread dump.

   span
      A span is a single operation within a trace. A session is made up of a collection of spans and traces. 

   Splunk Distribution of OpenTelemetry Collector
      The Splunk Distribution of OpenTelemetry Collector is a package that bundles the Splunk Distribution of OpenTelemetry Collector with additional components to provide integrated collection and forwarding of traces, metrics, and logs for a specific platform. Configuring the Splunk Distribution of OpenTelemetry Collector uses the :term:`agent deployment method <Agent (deployment method)>`.

T
==

.. glossary::

   tag
      Tags can be thought of as labels or keywords assigned to dimensions, metrics, and other objects. They are not key/value pairs.

      The primary use case for tags is when there is a one-to-many relationship between the tag and the object you are assigning it to. For example, suppose you have hosts that are running multiple apps. You can create a tag for each app, then apply multiple tags to each host to specify the apps that are running on that host.

   trace
      A trace is a collection of operations that represents a unique transaction handled by an application and its constituent services. Traces are made of spans, which are calls that microservices make to each other.

