.. _discovery-receiver:

*************************
Discovery receiver
*************************

.. meta::
      :description: Use the discovery mode provided by the discovery receiver in the Splunk Distribution of OpenTelemetry Collector to detect metric sources and collect metrics automatically.

The discovery mode dynamically creates new receivers at runtime to detect metric sources and collect metric data based on a set of predefined set of receiver configurations. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

The receiver powers the discovery mode of the Splunk Distribution of OpenTelemetry Collector. You can use the discovery mode to automatically detect any service supported by the following observer extensions:

- ``docker_observer``: Detects and reports running container endpoints through the Docker API.
- ``host_observer``: Discovers listening network endpoints of the current host.
- ``k8s_observer``: Detects and reports Kubernetes pod, port, and node endpoints through the Kubernetes API.

A typical use case of the receiver creator is to collect metrics for infrastructure that is deployed dynamically, such as Kubernetes pods or Docker containers. 

.. note:: The discovery receiver is available in the Splunk Distribution of OpenTelemetry Collector version 0.72.0 and higher.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Run the Collector in Discovery mode:

   .. code-block:: shell

      otelcol --discovery

3. (Optional) Configure the receiver.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
