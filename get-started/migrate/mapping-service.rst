.. _get-started-mapping-service:

*********************************************
How mapping makes upgrades easier
*********************************************

.. meta::
   :description: Learn about the Smart Agent to OTel mapping service and report.

..	toctree::
   :hidden:

The Mapping Service is a transition tool that defines equivalencies between legacy collectd (Smart Agent) metric naming and semantic conventions to the OpenTelemetry names and formats for metrics and metric metadata. Mapping supports multiple observers, deployment types, and kinds of metadata.

The Mapping Service enables you to migrate from SignalFx Smart Agent deployments to OpenTelemetry without significantly disrupting the form or content of your existing dashboards and detectors. The Mapping Service also enables you to slowly transition from the Smart Agent to OpenTelemetry across your organization (though you cannot use both agents simultaneously on the same host).

Mapping happens automatically as a background operation, but you can view mapping definitions in the Metric Finder view, or download a customized “Mapping and OTel Transition Impact Report” from your browser.

The mapping impact report explains how the transition from Smart Agent to OpenTelemetry affects some of the variables and saved filters in the following components:

- Dashboards

- Charts

- Detectors

The mapping impact report also tells you where to find whatever subset of your content calls functions with Smart Agent names, so that you can update that content either by hand or programmatically to complete your transition to open telemetry.

What is flagged for update in translation
===============================================

The Mapping and OTel Transition Impact Report is specific to your computing environment. The report flags the following items and tells you where to find and update them in your collection of plots, filters, and functions:

- Wildcards

- Direct references to Smart Agent metrics

- Filters that use Smart Agent dimensions

- Aggregates that use Smart Agent dimensions

The mapping impact report also shows which OpenTelemetry metrics and dimensions work well as replacements for specific Smart Agent metrics and dimensions, with the important exception of wildcards not supported by OpenTelemetry.

You can view and save the mapping impact report even if you opt out of mapping.
