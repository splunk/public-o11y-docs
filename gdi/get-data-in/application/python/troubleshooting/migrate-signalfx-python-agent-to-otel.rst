.. _migrate-signalfx-python-agent-to-otel: 

****************************************************
Migrate from the SignalFx Tracing Library for Python
****************************************************

.. meta:: 
   :description: The agent of the Splunk Distribution of OpenTelemetry Python replaces the deprecated SignalFx Python Tracing Library. To migrate to the Splunk Python OTel agent, follow these instructions.

The SignalFx Tracing Library for Python is deprecated and will reach End of Support on December 17th, 2022. Replace it with the agent from the Splunk Distribution of OpenTelemetry Python.

The agent of the Splunk Distribution of OpenTelemetry Python is based on the OpenTelemetry Instrumentation for Python, an open-source project that uses the OpenTelemetry API.

Read the following instructions to learn how to migrate to the Splunk Python OTel agent.

.. _requirements-splunk-python-otel-migration:

Compatibility and requirements
==========================================================

The Splunk Distribution of OpenTelemetry Python requires Python 3.7 and higher. See :ref:`python-otel-requirements`.

.. _migrate-to-splunk-python-otel-agent:

Migrate to the Splunk Distribution of OpenTelemetry Python
==========================================================

To migrate from the SignalFx Tracing Library for Python to the Splunk Distribution of OpenTelemetry Python, follow these steps:

#. Remove the tracing library packages. See :ref:`remove-python-tracing-library`.
#. Deploy the Splunk Distribution of OpenTelemetry Python. See :ref:`install-splunk-otel-python-distribution`.
#. Migrate your existing configuration. See :ref:`migrate-settings-python-agent`.
#. Start your Python service or application. See :ref:`start-python-service-after-migration`.

.. note:: Semantic conventions for span names and attributes change when you migrate. For more information, see :ref:`migrate-sa-to-otel-collector`.

.. _remove-python-tracing-library:

Remove the SignalFx Tracing Library for Python
-----------------------------------------------------------------

Follow these steps to remove the tracing library and its dependencies:

#. Uninstall ``signalfx-tracing``:

   .. code-block:: bash

      pip uninstall signalfx-tracing
   
#. Remove ``signalfx-tracing`` from your requirements.txt or pyproject.toml file.

#. If the package manager didn't remove every dependency for ``signalfx-tracing``, remove them manually:
   
   .. code-block:: bash

      pip uninstall opentracing
      pip uninstall jaeger-client
   
#. Remove every instrumentation package installed by the ``sfx-py-trace-bootstrap`` command.

#. Remove any additional OpenTracing instrumentation packages you installed.

Additional steps for Django applications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Splunk Distribution of OpenTelemetry Python doesn't require you to add anything to ``INSTALLED_APPS``.

Follow these steps to update your Django configuration:

#. Remove ``signalfx_tracing`` from ``INSTALLED_APPS`` in settings.py.

#. Set the ``DJANGO_SETTINGS_MODULE`` environment variable to the same value as in manage.py or wsgi.py.

.. _install-splunk-otel-python-distribution:

Deploy the Splunk Python agent
-----------------------------------------------

To install the Splunk Distribution of OpenTelemetry Python, see :ref:`instrument-python-applications`.

.. _migrate-settings-python-agent:

Migrate settings for the Splunk Python OTel agent
-----------------------------------------------------------------

To migrate settings from the SignalFx tracing library to the Splunk Distribution of OpenTelemetry Python, rename the following environment variables:

.. list-table:: 
   :header-rows: 1
   
   * - SignalFx environment variable
     - OpenTelemetry environment variable
   * - ``SIGNALFX_ACCESS_TOKEN``
     - ``SPLUNK_ACCESS_TOKEN``
   * - ``SIGNALFX_SERVICE_NAME``
     - ``OTEL_SERVICE_NAME``
   * - ``SIGNALFX_ENDPOINT_URL``
     - ``OTEL_EXPORTER_JAEGER_ENDPOINT`` or ``OTEL_EXPORTER_OTLP_ENDPOINT``
   * - ``SIGNALFX_RECORDED_VALUE_MAX_LENGTH``
     - ``SPLUNK_MAX_ATTR_LENGTH``

For more information about Splunk Python OTel settings, see :ref:`advanced-python-otel-configuration`.

.. _start-python-service-after-migration:

Start you Python application after completing the migration
------------------------------------------------------------

Run your python application or service using ``splunk-py-trace``. For example, if you run your service using ``python main.py``, you can automatically instrument by running it with ``splunk-py-trace python main.py``. For more information, see :ref:`instrument-python-applications`.

Log injection changes
=============================================================

To inject tracing metadata into log statements, see :ref:`correlate-traces-with-logs-python`.