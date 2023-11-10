.. _collector-architecture:

******************************************
Processor architecture
******************************************

.. meta::
   :description: Describes the compatible CPU architectures and operating systems of the Splunk Distribution of OpenTelemetry Collector.

.. note:: For information on the Collector's deployment modes and their architecture, see :ref:`otel-deployment-mode`. 

The Collector supports the following processor architectures and operating systems:

.. list-table::
   :width: 100%
   :widths: 20 40 40
   :header-rows: 1

   * - Architecture
     - Install methods
     - Supported components
   * - x86_64 and AMD64
     - 
        * Linux packages (deb, rpm, and tar.gz)
        * Linux binary file (otelcol_linux_amd64)
        * Windows installer and NuGet package (msi and nupkg)
        * macOS binary file (otelcol_darwin_amd64)
        * Docker image. See :ref:`Docker image for Linux <linux-docker>` and :ref:`Docker image for Windows <windows-docker>`
     - For information about supported platforms for the Smart Agent receiver, see :ref:`architecture-support`.
   * - ARM64
     - 
        * Linux packages (deb, rpm, and tar.gz)
        * Linux binary file (otelcol_linux_arm64)
        * macOS binary file (otelcol_darwin_arm64)
        * Docker image. See :ref:`Docker image for Linux <linux-docker>`
     - Some monitors within the Smart Agent receivers are considered experimental for ARM64. For more information, see :ref:`subprocess-monitors-support-matrices`.
   * - ppc64le, including IBM Private Cloud
     - 
        * Linux binary file (otelcol_linux_ppc64le)
        * Docker image. :ref:`Docker image for Linux <linux-docker>`
     - Some Smart Agent monitors are not supported on ppc64le. For more information, see :ref:`subprocess-monitors-support-matrices`.
