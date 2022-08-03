.. _get-started-mapping-transition-rept:

*****************************************************
About the mapping service transition impact report
*****************************************************

.. meta::
   :description: Learn about the Mapping Service Transition Impact Report.

To make migration of your data and metadata from dashboards, charts, and detectors into OpenTelemetry (OTel) as seamless as possible, the application’s Mapping Service automatically translates collectd (Smart Agent) conventions into the syntax used by the OpenTelemetry Collector.

Mapping applies OpenTelemetry naming standards to the following components:

- Metrics and Metric Time Series (MTSes)

- Dimensions

- Properties

For example, if you track CPU utilization for your Kubernetes pod, your analytics may use the ``kubernetes.container_cpu_limit`` value. In that case, the mapping service updates your existing queries to include both legacy semantics and new semantics (such as ``k8s.container.cpu_limit``) joined by an OR clause. The Mapping Service creates equivalencies between your Smart Agent and OTel metric names.

Mapping logic treats any of the names for a metric or property as referring to that same metric or property in OpenTelemetry, without tracking versions.

You can find a table outlining OpenTelemetry values and their legacy equivalents in GitHub at: :new-page:`Legacy to OTel semantics mapping table <https://github.com/signalfx/integrations/blob/mappings/mappings/mappings.md>`.

Whether you’re using Smart Agent collection or OTel collection, your original dashboards and detectors function the same way. Infrastructure Navigator views use the mapping service to show both old collection data and new collection data.

If you decide as a Splunk admin to turn off the mapping service, you can still generate and download a Mapping and OTel Transition Impact Report specific to migration for your cloud computing environment.

You access the migration transition impact report through a Download button in the :strong:`Billing and Usage > Usage Reports >  OpenTelemetry Migration` dialog.

Interpreting the mapping impact report
==========================================

The Mapping and OTel Transition Impact Report summarizes the scope of component name change associated with your migration to open telemetry. It assesses your data set to list the tokens currently used as metric, dimension, property or tag names, and highlights migration rules that could generate conflict between old and new equivalence groups.

The report explains when migration from an old MTS to a new MTS will trigger detectors, and which detectors those are. For example, heartbeat detectors working with un-aggregated MTSes are affected by design, but if a heartbeat detector is working with a dimension that continues across the transition to OTel, then the mapping service ensures continuity so that you do not have to restart that detector.

The mapping transition impact report assesses migration effects across three categories:

- Data object types

- Team responsibilities

- Migration mitigation steps you should take

Avoiding unexpected results
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Because Mapping Service only renames existing MTSes when filtering or grouping requires renaming to conform to OpenTelemetry Collector conventions, correlation across different datasets yields unexpected results when a mapped MTS is correlated with an unmapped MTS. This can happen, for example, when an MTS attempts to correlate with a time-shifted or transformed version of itself.

If you have charts and detectors built from formulas whose terms use different agents, you won’t get the alerts you expect.

To resolve this issue, explicitly filter or group by dimensions so that Mapping Service renames the fields in all the MTSes in the job to match the name you specified in the filter or grouping.

Data object type information
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The mapping impact report explains migration impacts within your organization to the following object types:

- Dashboards

- Charts

- Detectors

The report shows how many objects of each type are affected, and includes tables that show where to find the affected objects. You can read the report to see, for example, a list of all affected charts on a given dashboard or within a dashboard group.

Team information
^^^^^^^^^^^^^^^^^

The mapping impact report extracts information from your data set about stakeholders, meaning the people who created object types or are affected by changes to them because they’re on email lists of employees to be notified in the event of, for example, a detector being triggered by a critical alert condition.

When applicable, the report shows the names of teams linked to particular detectors. The report also identifies people or teams linked to particular dashboard groups.

Migration mitigation steps
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The mapping impact report explains what effect migration will have on the content highlighted in it, so that you can modify that content as needed to ensure a smoother transition.

Flagged items that need to be modified include the following (as listed in the report):

- Wildcards used in a plot, filter, or function.

- Direct references to Smart Agent metrics.

- Filters that use Smart Agent dimensions.

- Aggregates that use Smart Agent dimensions.

While the mapping impact report highlights items that need revising because they use legacy syntax or conventions, it also pairs those items with the OTel-based metrics and dimensions that you can use as substitutes for them.

In other words, the mapping transition impact report helps take guesswork out of migration tasks.
