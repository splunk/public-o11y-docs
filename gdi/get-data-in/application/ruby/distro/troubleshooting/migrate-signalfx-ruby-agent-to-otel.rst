.. _migrate-signalfx-ruby-agent-to-otel-distro: 

****************************************************
Migrate from the SignalFx Tracing Library for Ruby
****************************************************

.. meta:: 
   :description: The agent of the Splunk Distribution of OpenTelemetry Ruby replaces the deprecated SignalFx Ruby Tracing Library. To migrate to the Splunk Ruby OTel agent, follow these instructions.

The SignalFx Ruby tracing library is deprecated and will reach End of Support on September 30th, 2023. Replace it with the agent from the Splunk Distribution of OpenTelemetry Ruby.

The agent of the Splunk Distribution of OpenTelemetry Ruby is based on the OpenTelemetry Instrumentation for Ruby, an open-source project that uses the OpenTelemetry API.

Read the following instructions to learn how to migrate to the Splunk Ruby OTel agent.

.. _requirements-splunk-ruby-otel-migration-distro:

Compatibility and requirements
==========================================================

The Splunk Distribution of OpenTelemetry Ruby requires Ruby 2.5 and higher. See :ref:`ruby-otel-requirements`.

.. _migrate-to-splunk-ruby-otel-agent-distro:

Migrate to the Splunk Distribution of OpenTelemetry Ruby
==========================================================

To migrate from the SignalFx Tracing Library for Ruby to the Splunk Distribution of OpenTelemetry Ruby, follow these steps:

#. Remove the tracing library packages. See :ref:`remove-ruby-tracing-library-distro`.
#. Deploy the Splunk Distribution of OpenTelemetry Ruby. See :ref:`install-splunk-otel-ruby-distribution-distro`.
#. Migrate your existing configuration. See :ref:`migrate-settings-ruby-agent-distro`.

.. note:: Semantic conventions for span names and attributes change when you migrate. For more information, see :ref:`migrate-sa-to-otel-collector`.

.. _remove-ruby-tracing-library-distro:

Remove the SignalFx Tracing Library for Ruby
-----------------------------------------------------------------

Follow these steps to remove the tracing library and its dependencies:

#. Uninstall ``signalfx``:

   .. code-block:: bash

      gem uninstall signalfx
   
#. Remove ``signalfx`` from your Gemfile.

#. Remove any additional OpenTracing instrumentation packages you installed.

.. _install-splunk-otel-ruby-distribution-distro:

Deploy the Splunk Ruby agent
-----------------------------------------------

To install the Splunk Distribution of OpenTelemetry Ruby, see :ref:`instrument-ruby-applications`.

.. _migrate-settings-ruby-agent-distro:

Migrate settings for the Splunk Ruby OTel agent
-----------------------------------------------------------------

To migrate settings from the SignalFx tracing library to the Splunk Distribution of OpenTelemetry Ruby, rename the following environment variables:

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

For more information about Splunk Ruby OTel settings, see :ref:`advanced-ruby-otel-configuration-distro`.

Log injection changes
=============================================================

To inject tracing metadata into log statements, see :ref:`correlate-traces-with-logs-ruby`.