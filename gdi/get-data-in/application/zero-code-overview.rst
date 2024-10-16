.. _zero-code-overview:

**********************************************************************
Zero-code instrumentation for Splunk Observability Cloud
**********************************************************************

.. meta:: 
    :description: Learn about zero-code instrumentation (formerly automatic instrumentation) for back-end applications.

To stay consistent with the terminology from the OpenTelemetry Collector docs, automatic instrumentation has been changed to zero-code instrumentation. 

This change is only a terminology update and doesn't require you to install or update the OpenTelemetry Collector or any Splunk instrumentation agents.

What is zero-code instrumentation?
=========================================

Zero-code instrumentation allows you to instrument your applications and export telemetry data without having to modify the application source files. 

The language-specific instrumentation agent configures the source application to export data in a supported format to an OTLP endpoint, on either an OTLP receiver or the Splunk Observability Cloud back end. 

Zero-code instrumentation is available for applications written in Java, Node.js, .NET, Go, Python, Ruby, and PHP and automatically collects telemetry data for code written using supported libraries in each language.

How does zero-code instrumentation differ from automatic discovery and configuration?
-----------------------------------------------------------------------------------------

Automatic discovery and zero-code instrumentation have similar capabilities but are separate features. Both automatic discovery and zero-code instrumentation can instrument applications without requiring you to modify application code, but they differ in several key details.

See the following table for key differences between the automatic discovery and zero-code instrumentation:

.. list-table:: 
    :header-rows: 1
    
    * - Capability
      - Zero-code instrumentation
      - Automatic discovery
    * - Deployment
      - Deployed as a language-specific instrumentation agent, for example, the Splunk OpenTelemetry Java agent.
      - Deployed with the OpenTelemetry Collector as an optional add-on.
    * - Applications instrumented
      - Instruments only back-end applications, for example, Python, Java, and Node.js applications.
      - Instruments back-end applications and third-party services.
    * - Languages instrumented
      - Agents are language-specific. For example, the NodeJS agent only instruments NodeJS applications. Zero-code instrumentation supports applications written in Java, Node.js, .NET, Go, Python, Ruby, and PHP.
      - Can instrument multiple applications written in separate languages. Automatic discovery supports applications written in Java, Node.js, and .NET.

When should I use zero-code instrumentation?
================================================

.. Not sure whether to include this section, but I think at least one section that has some guidance for users would help.

Learn more
===========================

* For OpenTelemetry docs on zero-code instrumentation, see :new-page:`https://opentelemetry.io/docs/concepts/instrumentation/zero-code/`.
* To learn more about automatic discovery, see :ref:`discovery_mode`.
* For more information about important terms in Splunk Observability Cloud, see :ref:`get-started-glossary`.




