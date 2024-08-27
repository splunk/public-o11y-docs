.. _dotnet-pre-checks:

**********
Pre-checks
**********

.. meta::
    :description: A list of pre-checks for the user to complete before installing the .NET automatic instrumentation.

Before installing the .NET automatic instrumentation, complete the following pre-checks.

Verify platform compatibility
=============================

Make sure that your platform is compatible with the OpenTelemetry Collector. See the following table for action items corresponding to your platform:

.. list-table::
    :widths: 25 75
    :width: 100
    :header-rows: 1

    * - Platform
      - Pre-checks
    * - All platforms
      - * Verify that you are using a supported processor architecture. See :ref:`dotnet-otel-requirements`.
    * - Kubernetes
      - * Verify that you are using a supported Kubernetes distribution. See :ref:`helm-chart-supported-distros`.

        * Review the prerequisites and requirements for installing the instrumentation using the Helm chart. See :new-page:`Auto-instrumentation <https://github.com/signalfx/splunk-otel-collector-chart/blob/d08f989180bcb0e1ec79b63805d8951472b8d230/docs/auto-instrumentation-install.md#steps-for-setting-up-auto-instrumentation>` in the Splunk OpenTelemetry Collector for Kubernetes repository on GitHub.

Verify .NET runtime compatibility
=================================

Verify that you are using a supported version of .NET. See :ref:`dotnet-otel-versions`.

Verify automatic discovery compatibility
========================================

Make sure that your platform is compatible with automatic discovery. See the following table for details:

.. list-table::
    :widths: 25 75
    :width: 100
    :header-rows: 1

    * - Platform
      - Pre-check
    * - Kubernetes
      - Verify automatic discovery compatibility for Kubernetes. See :ref:`Automatic discovery and configuration for back-end applications in Kubernetes <k8s-backend-requirements>`.
    * - Linux
      - Verify automatic discovery compatibility for Linux. See :ref:`linux-backend-auto-discovery`.
    * - Windows
      - Verify automatic discovery compatibility for Windows. See :ref:`windows-backend-auto-discovery`.

Review core dependencies
========================

Make sure that your application's dependencies are compatible with the .NET instrumentation.

#. Verify whether your target applications have the same dependencies as the automatic instrumentation. See :new-page:`OpenTelemetry.AutoInstrumentation <https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/src/OpenTelemetry.AutoInstrumentation/OpenTelemetry.AutoInstrumentation.csproj>` and :new-page:`OpenTelemetry.AutoInstrumentation.AdditionalDeps <https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/src/OpenTelemetry.AutoInstrumentation.AdditionalDeps/Directory.Build.props>`. If there are conflicts, consider installing using the NuGet packages. Otherwise, you must resolve all the dependencies before manually installing the instrumentation.

#. Verify whether your target applications have the same dependencies as the NuGet packages. See the :new-page:`NuGet dependencies <https://www.nuget.org/packages/OpenTelemetry.AutoInstrumentation/#dependencies-body-tab>` in the NuGet documentation. If there are conflicts, you must resolve them before installing the instrumentation using the NuGet packages.

Review supported libraries
==========================

Make sure that your target application uses supported libraries. Complete the following steps:

#. Review the list of automatically instrumented libraries supported by the Splunk distribution of the OpenTelemetry .NET instrumentation. See :ref:`supported-dotnet-otel-libraries`.

#. Review the community-supported extended list of automatically instrumented libraries in the OpenTelemetry Ecosystem. See the :new-page:`OpenTelemetry Registry <https://opentelemetry.io/ecosystem/registry/?language=dotnet&component=instrumentation>`.

Verify networking requirements
==============================

.. list-table::
    :widths: 25 75
    :width: 100
    :header-rows: 1

    * - Platform
      - Pre-check
    * - All platforms
      - Verify that your firewall rules allow for communication with the elected Splunk Observability Cloud instance.
    * - Kubernetes
      - Verify that the manager nodes have access to worker nodes on port ``9443/tcp``.
