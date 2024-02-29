.. _migrate-from-splunk-cpp:

****************************************************************************************************
Migrate from the Splunk instrumentation for C++ to the OpenTelemetry instrumentation for C++
****************************************************************************************************

.. meta:: 
    :description: Learn how to migrate from the deprecated Splunk C++ agent to the upstream OpenTelemetry Collector. 

The upstream OpenTelemetry Collector instrumentation for C++ replaces the Splunk instrumentation for C++. Follow these steps to migrate from the Splunk instrumentation to the OpenTelemetry instrumentaiton:

Compatibility and requirements
=============================================

Make sure that you have the correct requirements for the OpenTelemetry C++ instrumentation. See :ref:`cpp-prerequisites`.

Migrate to the OpenTelemetry instrumentation for C++
==================================================================

To migrate from the Splunk instrumentation for C++ to the OpenTelemetry instrumentation for C++, follow these steps:

#. Deactivate the Splunk instrumentation for C++.
#. Install and activate the OpenTelemetry instrumentation for C++. See :ref:`instrument-cpp`.
#. Update your configuration settings.
#. Restart the server and application.

Deactivate the Splunk instrumentation for C++
---------------------------------------------

Since the Splunk instrumentation for C++ is a wrapper for the OpenTelemetry instrumentation, there isn't an official process for uninstalling. 

Instead, you can remove the Splunk Distribution of OpenTelemetry C++ repository and its submodules. When you install and configure your application for OpenTelemetry C++, remove any code that uses the Splunk Distribution and replace it with new code for OpenTelemetry C++ instrumentation.

Change configuration settings
---------------------------------------------

Options passed through ``splunk::OpenTelemetryOptions`` are no longer supported. 

If you passed any options through ``splunk::OpenTelemetryOptions``, change these options to environment variables. 

For example, if you set the following option in your C++ code: 

.. code-block:: cpp

    splunk::OpenTelemetryOptions options = splunk::OpenTelemetryOptions().WithServiceName("my-service")

Change the option to an environment variable by deleting the previous code and running the following command:

.. code-block:: bash

    export OTEL_SERVICE_NAME="my-service"