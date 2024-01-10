.. _flamegraph-howto:

****************************************************************
Understand and use the flame graph
****************************************************************

.. meta:: 
   :description: You can visualize aggregated stack traces using the flame graph in AlwaysOn Profiling. Use the flame graph to discover which lines of code might be causing performance issues, and to confirm whether the changes you make to the code have the intended effect.

You can visualize aggregated stack traces using the flame graph in AlwaysOn Profiling. The flame graph represents a summary of all stack traces captured from your application. Use the flame graph to discover which lines of code might be causing performance issues, and to confirm whether the changes you make to the code have the intended effect.

Accessing the flame graph
============================================

You can access the flame graph for your instrumented application or service in the following ways:

- In Splunk APM, select a service and then select the :guilabel:`AlwaysOn Profiling` section of the details panel.

   .. image:: /_images/apm/profiling/profiling-from-apm.png
      :alt: Filtering the flame graph and table in AlwaysOn Profiling.

- When viewing the details of a span in Splunk APM, select :guilabel:`View in AlwaysOn Profiler` to open the flame graph for a 10-minute window around the span duration.

   .. image:: /_images/apm/profiling/profiling-profile-available2.png
      :alt: Filtering the flame graph and table in AlwaysOn Profiling.

.. note:: If the :guilabel:`AlwaysOn Profiling` section is not visible, see :ref:`profiling-troubleshooting`.

Understanding the flame graph
============================================

AlwaysOn Profiling is constantly taking snapshots, or stack traces, of your application's code. Because reading through thousands of stack traces is not practical, AlwaysOn Profiling aggregates and summarizes profiling data, providing a convenient way to explore call stacks.

Stack frames
----------------------------------------------

Each bar in the flame graph is a stack frame, tied to a function in your code. AlwaysOn Profiling extracts the stack frames by aggregating all call stacks during a period of time. When several stack traces start with the same frames, the bars representing those frames merge into a single bar.

.. image:: /_images/apm/profiling/profiling-bars.png
   :alt: Filtering the flame graph and table in AlwaysOn Profiling.

The width of each bar is an important clue to the performance of your code. The wider a bar or stack frame is, the more often the related function appears in stack traces, which might mean that the frame consumes more resources relative to the other stack frames.

.. list-table::
   :header-rows: 1
   :widths: 10, 80
   :width: 100%

   * - Type
     - Meaning of stack frame width
   * - CPU
     - How often a function appears in stack traces. CPU usage relative to other stack traces.
   * - Memory
     - How much memory is allocated by a function relative to other stack traces

You can group stack frames and turn them into the root frame by selecting the tile button that appears after expanding a stack frame. Select the button again to restore the view. You can also select the :guilabel:`Total` frame at any time to go back. The following animation shows how to group and ungroup stack frames:

.. image:: /_images/apm/profiling/group-frames.gif
   :alt: Grouping and ungrouping stack frames.

CPU and memory
-------------------------------------------------

You can switch the view of the AlwaysOn Profiling flame graph between :guilabel:`CPU` and :guilabel:`Memory` at any time. Memory data only appears if you've activated memory profiling. See :ref:`profiling-setup-enable-profiler`.

The following image shows the memory profiling flame graph for a Java application:

   .. image:: /_images/apm/profiling/prof-flame-graph.png
      :alt: Sample memory flame graph for a Java application.

Frame table
----------------------------------------------

In the AlwaysOn Profiling table, :guilabel:`Count` shows how many times a line appeared in stack traces, while :guilabel:`Self time` expresses the time spent executing the function, minus the time spent calling other functions. A high self time value can also indicate performance issues. In some cases it might mean the thread is idle and doesn't consume resources.

When you select a frame, an information panel appears with the amount of call stacks where the code is present. Select :guilabel:`Show thread info` to see which threads contributed call stacks. The following image shows the frame information panel with a list of threads:

.. image:: /_images/apm/profiling/profiling-thread-info.png
   :alt: Information panel on a highlighted thread.

Filters
-------------------------------------

In the AlwaysOn Profiling flame graph, bars have random colors to let you identify lines of code faster. Within each bar you can find the class name, file name, and line of code for the method called by your application. You can use this information as a filter, so that only the functions you're looking for are visible. You can also filter stack traces by their thread state, environment, and service.

.. image:: /_images/apm/profiling/profiling-bars3.png
   :alt: Bars in the profiling flame graph.

The flame graph of AlwaysOn Profiling stacks all bars from top to bottom, following the hierarchy between function calls. The root or topmost bar is the start of the call stack. The depth of each stack in the flame graph shows the sequence of function calls, until there are no more descendants. There is no horizontal order, as the flame graph arranges bars to save space.

Use the flame graph to identify and confirm issues
===================================================

In most cases, you open the flame graph following the lead of a problematic span or endpoint, or after having identified performance issues in your infrastructure, like a service hitting its CPU or memory limits. Together with the context you get from spans and metrics of your application, the flame graph can assist you in identifying the lines of code that might be causing issues. 

The top bars of the flame graph, which are the widest, frequently represent framework code, and might be less relevant for troubleshooting. To highlight your application components, type function or class names in the filter and scroll to the highlighted bars. Select each bar to maximize their width and drill down into the methods called from that function.

The structure of each flame graph depends on the amount of profiling data and on the behavior of the application. Forks in the flame graph indicate different code paths in the data set. Whenever a function calls other functions, its bar has several bars underneath. The wider a bar, the more calls to the function AlwaysOn Profiling captured.

When you're examining a frame, the flame graph shows the flow of the code from that point onwards by stacking other frames underneath. Any unusual pattern in the calls originated by the frame can imply issues in your application's code or opportunities for optimization.

For sample scenarios featuring the flame graph, see :ref:`profiling-scenario-landingpage`.
