The Splunk Distribution of OpenTelemetry .NET supports the following .NET versions:

- Instrumentation for traces and metrics:

   - .NET 9.0 (End of Support: May 12, 2026)
   - .NET 8.0 (End of Support: November 10, 2026)
   - .NET Framework 4.7 and higher
   - .NET Framework 4.6.2 (End of Support: January 12, 2027)

- AlwaysOn Profiling:

   - .NET 9.0 (End of Support: May 12, 2026)
   - .NET 8.0 (End of Support: November 10, 2026)

      .. note:: .NET Framework is not supported for AlwaysOn Profiling.

.. warning::

   Version 1.9.0 of Splunk Distribution of OpenTelemetry .NET will no longer work with .NET 6 or .NET 7.
   .NET 6 reached End of Life on November 12, 2024 and .NET 7 reached End of Life on May 14, 2024.
   Customers who want to continue instrumenting .NET 6 or .NET 7 services must use Splunk Distribution of OpenTelemetry .NET version 1.8.0 or less.
   Best effort support for Splunk Distribution of OpenTelemetry .NET is provided up to November 12, 2025
   for the last versions of .NET 6 (version 6.0.36) or .NET 7 (version 7.0.20) only.

The distribution supports the following architectures:

- x86
- AMD64 (x86-64)

.. note:: ARM architectures are not supported.
