.. _zero-code-overview:

**********************************************************************
Instrumentation methods for Splunk Observability Cloud
**********************************************************************

.. meta:: 
    :description: Learn about zero-code instrumentation (formerly automatic instrumentation) for back-end applications.

To stay consistent with the terminology from the OpenTelemetry Collector docs, automatic instrumentation has been changed to zero-code instrumentation, and manual instrumentation has been changed to code-based instrumentation.

See the upstream OpenTelemetry Collector documentation for more information: :new-page:`https://opentelemetry.io/docs/concepts/instrumentation/zero-code/`.

This change is only a terminology update and doesn't require you to install or update the OpenTelemetry Collector or any Splunk instrumentation agents.

.. _zero-code-info:

Zero-code instrumentation
=========================================

Zero-code instrumentation allows you to instrument your applications and export telemetry data without having to modify the application source files. 

The language-specific instrumentation agent configures the source application to export data in a supported format to an OTLP endpoint, on either an OTLP receiver or the Splunk Observability Cloud back end. 

Zero-code instrumentation is available for applications written in Java, Node.js, .NET, Go, Python, Ruby, and PHP and automatically collects telemetry data for code written using supported libraries in each language.

How does zero-code instrumentation differ from automatic discovery and configuration?
-----------------------------------------------------------------------------------------

Automatic discovery and zero-code instrumentation have similar capabilities but are separate features. Both automatic discovery and zero-code instrumentation detect telemetry data and send it to Splunk Observability Cloud, but they differ in several key details.

See the following table for key differences between the automatic discovery and zero-code instrumentation:

.. list-table:: 
    :header-rows: 1
    
    * - Capability
      - Zero-code instrumentation
      - Automatic discovery
    * - Deployment
      - Deployed as a language-specific instrumentation agent, for example, the Splunk OpenTelemetry Java agent.
      - Deployed with the Splunk Distribution of OpenTelemetry Collector as an optional add-on.
    * - Applications instrumented
      - Instruments only back-end applications, for example, Python, Java, and Node.js applications.
      - Collects telemetry data from third-party services such as databases and web servers.
    * - Languages instrumented
      - Agents are language-specific. For example, the NodeJS agent only instruments NodeJS applications. Zero-code instrumentation supports applications written in Java, Node.js, .NET, Go, Python, Ruby, and PHP.
      - Automatic discovery itself does not instrument language runtimes, but can be used to deploy zero-code instrumentation for applications written in Java, Node.JS, and .NET.

.. _code-based-info:

Code-based instrumentation
=======================================

Code-based instrumentation allows you to instrument your applications and export telemetry data to Splunk Observability Cloud by editing your application's source code. 

Unlike zero-code instrumentation, code-based instrumentation requires editing your application's source code. Modifying the application's source code allows it to send telemetry data to a local running instance of the OpenTelemetry Collector, which then processes and forwards the data to Splunk Observability Cloud.

Code-based instrumentation supports applications written in Java, Node.js, .NET, Python, PHP, Go, Ruby, and C++. C++ only supports code-based instrumentation.

Learn more
===========================

* To learn more about automatic discovery and configuration, see :ref:`discovery_mode`.
* For more information about important terms in Splunk Observability Cloud, see :ref:`get-started-glossary`.




