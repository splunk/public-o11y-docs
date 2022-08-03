.. _apm-span-tags:

*******************************
Analyze services with span tags
*******************************

.. meta::
   :description: View metrics for every indexed span tag for a service in a single window.

.. toctree::
   :hidden:

   tag-spotlight
   add-context-trace-span
   index-tag-tips
   index-span-tags

Drill down into service performance with span tags. Span tags provide additional context about operations that spans represent. Default span tags include things like the endpoint, operation, and HTTP method associated with a span. Analyze requests, errors, and latency for spans that contain specific span tags. This context enables you to understand service performance at a glance and helps you discover the root cause of issues faster.

APM processes and generates additional context for span tags you index. When you index a span tag, APM generates a set of metric time series (MTS) called MetricSets. For more information about MetricSets in APM, see :ref:`apm-metricsets`. 

Index span tags to analyze services in the following ways:

- Break down service performance by indexed tags in the Troubleshooting Service Map

- View metric time series of service performance by indexed tags in :ref:`Tag Spotlight <apm-tag-spotlight>`

- Track multiple traces for a specific activity with :ref:`Business Workflows <apm-workflows>`

If you don't index any span tags, you can still view them when analyzing whole traces. You can even download traces and filter or process data by span tags manually. For more information, see :ref:`apm-download-traces`.

Before you can index span tags, send spans with span tags to APM. For more information, see :ref:`apm-add-context-trace-span`.

For information about how APM defines span tags and which span tags to index, see :ref:`apm-index-tag-tips`.

To index span tags so APM generates Troubleshooting MetricSets, see :ref:`apm-index-span-tags`.