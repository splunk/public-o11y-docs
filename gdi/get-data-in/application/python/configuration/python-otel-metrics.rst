.. _python-otel-metrics:

*************************************************************************************
Metrics and attributes collected by the Splunk Distribution of OpenTelemetry Python
*************************************************************************************

.. meta::
   :description: The Splunk Distribution of OpenTelemetry Python collects the following runtime and custom metrics.

The Splunk Distribution of OpenTelemetry Python collects runtime and custom metrics. To learn about the different metric types, see :ref:`metric-types`.

For examples of custom metrics instrumentation and instrument types, see :ref:`custom-metrics-python`.

.. _activate-python-metrics:

Activate metrics collection
=================================

The Splunk Distribution of OpenTelemetry Python collects metrics by default. To deactivate metrics collection, update your environment variable:

.. _python-app-metrics:

Application metrics
================================

The agent of the Splunk Distribution of OpenTelemetry Python collects the following application metrics.

.. _python-default-metrics:

Default metrics dimensions
-----------------------------------

The following dimensions are automatically added to all metrics exported by the agent:

.. list-table::
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - Dimension
    - Description
  * - ``deployment.environment``
    - Value of the ``deployment.environment`` resource attribute, if present.
  * - ``service.name``
    - Name of the service.
  * - ``telemetry.sdk.name``
    - Name of the SDK, set to ``opentelemetry``.
  * - ``telemetry.sdk.language``
    - Language of the SDK, set to ``python``.
  * - ``telemetry.sdk.version``
    - Version of the OpenTelemetry SDK. 

.. _python-supported-libraries:

Supported libraries
-------------------------------------

The agent collects the following metrics through the following supported libraries: 

.. list-table::
  :header-rows: 1
  :widths: 45 20 50
  :width: 100%

  * - Library/Framework
    - Instrumentation
    - Supported versions
  * - Django
    - ``opentelemetry-instrumentation-django``
    - Django version 1.10 or higher
  * - Pyramid
    - ``opentelemetry-instrumentation-pyramid``
    - Pyramid version 1.7 or higher



.. _python-otel-runtime-metrics:

Runtime metrics
------------------------------------

The following runtime metrics are automatically collected and exported:

.. list-table::
   :header-rows: 1
   :widths: 40 10 50
   :width: 100%

   * - Metric
     - Type
     - Description
   * - ``process.runtime.memory``
     - Counter
     - Memory used by the Python runtime.
   * - ``process.runtime.cpu.time``
     - Cumulative counter
     - CPU time used by the Python runtime.
   * - ``process.runtime.gc_count``
     - Cumulative counter
     - Garbage collections executed by the Python runtime.

