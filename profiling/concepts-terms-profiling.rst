.. _concepts-terms-profiling:

*******************************************************
Terms and concepts in AlwaysOn Profiling for Splunk APM
*******************************************************

.. meta:: 
   :description: The following are key concepts and terms you need to know to successfully use AlwaysOn Profiling in Splunk APM. 

.. list-table:: 
   :header-rows: 1
   :widths: 20 80

   * - Term or concept
     - Description
   * - Back-end traces
     - A back-end trace is a collection of back-end spans. Back-end spans are calls that microservices make to each other, such as an account service making a request to a database.
   * - Call stack
     - A call stack is the data structure used by a machine to keep track of which methods are currently being called. When the active call stack is sampled, the result is a stack trace.
   * - Flame graph
     - The flame graph is a visual representation of a collection of stack traces. See :ref:`flamegraph-howto`.
   * - Stack trace
     - A stack trace is a sampled snapshot of the call stack. The stack trace contains metadata such as the class name, method name, and line number in the call stack for a given thread. For example, AlwaysOn Profiling captures a stack trace for every running thread in the Java Virtual Machine, excluding those that are not relevant. When stack traces are sampled across all virtual machine threads, the result is a thread dump. 
   * - Traces and spans
     - A trace is a collection of operations that represents a unique transaction handled by an application and its constituent services. A span is a single operation within a trace. A session is made up of a collection of spans and traces. For more information, see :ref:`apm-traces-spans`.
