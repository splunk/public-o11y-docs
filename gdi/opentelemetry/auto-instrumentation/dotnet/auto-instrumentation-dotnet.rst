

.. _auto-instrumentation-dotnet:

*****************************************************************************
Splunk OpenTelemetry Zero Configuration Auto Instrumentation for .NET
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to send traces to Splunk Observability Cloud Application Performance Monitoring (APM) without altering your code.

Splunk OpenTelemetry Zero Configuration Auto Instrumentation for .NET provides a package that automatically instruments your local ASP.NET applications to capture and report distributed traces to the Splunk Distribution of OpenTelemetry Collector, and then on to Splunk APM.

The Zero Configuration package provides the following benefits:

- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.
- You don't need to configure or instrument your .NET back-end services or applications before deployment.

.. note:: For details on the .NET supported versions, see :ref:`dotnet-requirements`.

.. toctree::
   :hidden:
   :maxdepth: 3
   
   Kubernetes <auto-instrumentation-dotnet-k8s.rst>
   Windows <auto-instrumentation-dotnet-windows.rst>


.. _install-the-package-dotnet:


  
.. raw:: html

   <h2>Install Zero Configuration Auto Instrumentation</h2>

To install zero config for OpenTelemetry .NET, follow the instructions relevant to your platform:

* :ref:`auto-instrumentation-dotnet-k8s`
* :ref:`auto-instrumentation-dotnet-windows`

.. raw:: html

   <h2>Learn more</h2>

* Auto instrumentation sends trace data to Splunk APM. To learn more, see :ref:`get-started-apm`
* For more information about the Splunk Distribution of OpenTelemetry .NET, see :ref:`get-started-dotnet-otel`.
* For information about performance, see :ref:`dotnet-otel-performance`.