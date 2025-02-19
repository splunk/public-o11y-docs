.. _python-migration-guide:

*************************************************************
Migrate to the Splunk Python 2.0 instrumentation
*************************************************************

.. meta:: 
    :description: Learn how to migrate from the Splunk OpenTelemetry Python 1.X instrumentation to the Python 2.0 instrumentation.

OpenTelemetry Python instrumentation 2.0 contains a set of breaking changes introduced with the OpenTelemetry semantic conventions updates. 

This migration guide assumes that you're using a 1.x version of the Splunk Distribution of OpenTelemetry Python.

.. _python-2.x-migration-prereqs:

Prerequisites
====================================

To migrate to the Splunk Distribution of OpenTelemetry Python version 2.0, you need the following:

* Splunk Distribution of OpenTelemetry Collector version 0.98 or higher deployed.
* Administrator permissions for Splunk Observability Cloud.
* pip version 3.0 or higher.

.. _migrate-python-2.x-steps:

Migrate to Splunk OTel Python 2.0
=====================================

Upgrading to Splunk OTel Python 2.0 requires upgrading the Splunk Distribution of OpenTelemetry Collector. 

To upgrade to Splunk OTel Python 2.0, follow these steps:

#. Open a terminal.
#. Enter the following command:

    .. code-block:: bash

        pip install --upgrade splunk-opentelemetry

#. Restart any running Python applications that you plan to instrument.

.. _python-2.x-new-instrumentation:

Instrumentation parameters for Python 2.0
====================================================

Splunk OpenTelemetry Python version 2.0 changes the parameters for zero-code instrumentation.

See the following table for a list of changes:

.. list-table:: 
    :header-rows: 1

    * - Version 1.x name
      - Version 2.0 name
      - Description
    * - ``splunk-py-trace``, ``splk-py-trace``
      - ``opentelemetry-instrument``
      - Activates the Splunk OpenTelemetry Python agent and sends traces and metrics to Splunk Observability Cloud. 
    * - ``splunk-py-trace-bootstrap``, ``splk-py-trace-bootstrap``
      - ``opentelemetry-bootstrap``
      - Installs instrumentation libraries and dependencies for Splunk OpenTelemetry Python.

.. _python-2.x-new-functions:

Function names for Python 2.0
====================================

Functions configure certain telemetry data settings in your Python application code.

See the following table for new function names in Python 2.0:

.. list-table:: 
    :header-rows: 1

    * - Version 1.x name
      - Version 2.0 name
      - Description
    * - ``start_tracing()``, ``start_metrics()``
      - ``init_splunk_otel()``
      - Configures tracing, metrics, and logs for Splunk OpenTelemetry Python.

.. _python-2.x-troubleshooting:

Troubleshooting
====================================

.. include:: /_includes/troubleshooting-components.rst