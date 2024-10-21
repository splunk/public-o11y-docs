.. _instrumentation-types:

********************************************************************
Methods of instrumentation for back-end applications
********************************************************************

.. meta:: 
    :description: Learn about the different ways you can instrument your back-end applications and send telemetry data to Splunk Observability Cloud, including zero-code instrumentation, code-based instrumentation, and automatic discovery.

.. toctree::
    :hidden:

    code-based-overview.rst
    zero-code-overview.rst

You can use a variety of different methods to instrument your applications and send telemetry data to Splunk Observability Cloud.

See the following table for information about each type of instrumentation:

.. list-table:: 
    :header-rows: 1

    * - Instrumentation method
      - Description
      - Docs
      - Languages supported
    * - Zero-code instrumentation
      - Instrument your applications using a Splunk Distribution of OpenTelemetry Collector agent. This method doesn't require you to edit your application's source code.
      - :ref:`zero-code-overview`
      - Java, Node.js, .NET, Go, Python, Ruby, and PHP
    * - Code-based instrumentation
      - Edit your application's source code to instrument the application and send data to Splunk Observability Cloud.
      - :ref:`code-based-overview`
      - Java, Node.js, .NET, Go, Python, Ruby, PHP, C++
    * - Automatic discovery
      - Deploy the Splunk Distribution of OpenTelemetry Collector to automatically detect and instrument applications running in your environment. This method doesn't require you to edit your application's source code.
      - :ref:`discovery_mode`
      - Java, Node.js, .NET