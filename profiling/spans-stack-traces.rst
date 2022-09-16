.. _spans-stack-traces:

****************************************************************
Browse stack traces linked to spans in Splunk APM
****************************************************************

.. meta:: 
   :description: AlwaysOn Profiling adds stack traces to spans in Splunk APM so that you can browse all available call stacks for a given trace and span. Call stacks include the class or function name, as well as the line of code.

AlwaysOn Profiling adds stack traces to spans in Splunk APM so that you can browse all available call stacks for a given trace and span. Call stacks include the class or function name, as well as the line of code.

Call stacks list all methods and functions called by your code. Stack traces are sampled snapshots of the call stack of your application. By exploring stack traces for specific spans, you can find the path that your code follows. The following animation shows how you can browse stack traces when viewing a span:

..  image:: /_images/apm/profiling/browse-stack-traces-overview.gif
    :alt: Browsing stack traces for a span in Splunk APM.

.. _browse-call-stacks-span:

View all available call stacks for a span
===================================================

To view all sampled call stacks for a span, follow these steps:

1. Open a trace from the :guilabel:`Traces` view in Splunk APM.

2. In the :guilabel:`Waterfall` tab, select a span with call stacks.

3. Select :guilabel:`AlwaysOn Profiling` to see the stack traces.

The dots on a span bar indicate when the profiler took a snapshot of the call stack. Select :guilabel:`Previous` and :guilabel:`Next` to navigate between stack traces:

..  image:: /_images/apm/profiling/switch-stack-traces.gif
    :alt: Navigating between stack traces in Splunk APM.

Every stack trace includes metadata, such as the service, thread state, thread name, and the timestamp of the snapshot. Scroll to browse the stack trace or copy it to the clipboard.

If you don't see stack traces, see :ref:`no-call-stacks`.

.. _visualize-stack-trace-flamegraph:

Visualize all stack traces for a service using the flame graph
===============================================================

To open a service in AlwaysOn Profiling, select :guilabel:`View in AlwaysOn Profiling` in the stack trace view. The flame graph appears with filters set on a 10-minute window around the duration of the span. For more information on the flame graph, see :ref:`flamegraph-howto`.
