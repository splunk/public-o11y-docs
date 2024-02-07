.. _ootb-metrics-linux:

****************************************************************
Collected metrics and dimensions for Linux
****************************************************************

.. meta::
      :description: Out-of-the-box metrics and dimensions obtained with the Collector for Kubernetes.


The following sections list the collected metrics when you use the default configuration for the Collector for Linux in host monitoring (agent) mode. 

The Collector processes collected data as configured in your pipelines. Therefore, metrics that are imported by receivers might be excluded further into the pipeline by other components. For instance, the :ref:`signalfx-exporter`, included in the default Collector configuration, drops certain metrics and applies :ref:`translation rules <exclusion-rules>` that impact the metrics the Collector sends to Splunk Observability Cloud.    

Learn more about the Collector's configuration and data processing at:

* :ref:`collector-linux-intro`
* :ref:`linux-config-ootb`
* :ref:`otel-deployment-mode`
* :ref:`otel-data-processing`
* :ref:`signalfx-exporter`

.. note:: To see the Collector's internal metrics, refer to :ref:`metrics-internal-collector`.

Container level metrics and dimensions
============================================================================

.. caution:: 
  
  The :strong:`Translated?` column indicates whether the metric is translated by the SignalFx exporter.
  
  The :strong:`Exported?` column indicates if the metric is finally sent to Splunk Observability Cloud after going through the Collector pipelines. 





