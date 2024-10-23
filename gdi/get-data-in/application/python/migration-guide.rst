.. _python-migration-guide:

*************************************************************
Migrate to the Splunk Python 2.X instrumentation
*************************************************************

.. meta:: 
    :description: Learn how to migrate from the Splunk OpenTelemetry Python 1.X instrumentation to the Python 2.X instrumentation.

OpenTelemetry Python instrumentation 2.X contains a set of breaking changes introduced with the OpenTelemetry semantic conventions updates. 

This migration guide assumes that you're using a 1.x version of the Splunk Distribution of OpenTelemetry Python. 

.. _python-2.x-migration-prereqs:

Prerequisites
====================================

To migrate to the Splunk Distribution of OpenTelemetry Python version 2.X, you need the following:

* Splunk Distribution of OpenTelemetry Collector version 0.98 or higher deployed.
* Administrator permissions for Splunk Observability Cloud.

.. _migrate-python-2.x-steps:

Migrate to Splunk OTel Python 2.X
=====================================

.. _python-2.x-new-instrumentation:

New instrumentation parameters for Python 2.X
====================================================

Splunk OpenTelemetry Python version 2.X changes the parameters for zero-code instrumentation.

See the following table for a list of changes:

.. list-table:: 
    :header-rows: 1

    * - Version 1.X name
      - Version 2.X name
      - Description
    * - `splunk-py-trace`, `splk-py-trace`
      - `opentelemetry-instrument`
      - Activates the Splunk OpenTelemetry Python agent and sends traces and metrics to Splunk Observability Cloud. 
    * - `splunk-py-trace-bootstrap`, `splk-py-trace-bootstrap`
      - `opentelemetry-bootstrap`
      - Installs instrumentation libraries and dependencies for Splunk OpenTelemetry Python.


.. _python-2.x-new-functions:

New function names for Python 2.X
====================================

Functions configure certain telemetry data settings in your Python application code.

See the following table for new function names in Python 2.X:

.. list-table:: 
    :header-rows: 1

    * - Version 1.X name
      - Version 2.X name
      - Description
    * - `start_tracing()`, `start_metrics()`
      - `start_otel()`
      - Configures tracing, metrics, and logs for Splunk OpenTelemetry Python.


.. _python-2.x-troubleshooting:

Troubleshooting
====================================