.. _set-host-name-attribute-override:

****************************************************************************
Set the host.name attribute override using the OpenTelemetry Helm chart
****************************************************************************

.. meta::
   :description: Set the host.name attribute override using the OpenTelemetry Helm chart.

To report the correct number of hosts to Splunk Observability Cloud, the ``host.name`` attribute must represent a host, not a container or Kubernetes pod. To make sure this attribute is set correctly, send traces and metrics through the Splunk Distribution of OpenTelemetry Collector for Kubernetes :ref:`deployed as an agent <otel-deployment-mode>` where the attribute is overridden by default.

If you use an open-source distribution of OpenTelemetry Collector, configure the resource detection processor to override host attributes, as shown in the following configuration.

If you use an OpenTelemetry Helm chart, add the following configuration to your custom values.yaml file:

.. code-block:: yaml


   agentCollector:
     configOverride:
       processors:
         resourcedetection:
           detectors:
             - system
           override: true
       service:
         pipelines:
           metrics:
             processors:
               - memory_limiter
               - batch
               - resourcedetection
               # Add other custom processors as needed.
           traces:
             processors:
               - memory_limiter
               - batch
               - resourcedetection
               # Add other custom processors as needed.
