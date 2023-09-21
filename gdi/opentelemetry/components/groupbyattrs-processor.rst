.. _groupbyattrs-processor:

************************************
Group by attributes processor
************************************

.. meta::
      :description: Use the Group by Attributes processor to reassociate spans, log records, and metric data points to a resource that matches with the specified attributes. As a result, all spans, log records, or metric data points with the same values for the specified attributes are grouped under the same resource.

The Group by Attributes processor is an OpenTelemetry Collector component that reassociates spans, log records, and metric data points to a resource that matches with the specified attributes. As a result, all spans, log records, or metric data points with the same values for the specified attributes are grouped under the same resource. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the ``groupbyattrs`` processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the resource processor, add ``resource`` to the ``processors`` section of your
configuration file, as shown in the following example:

.. code:: yaml



To complete the configuration, include the receiver in any pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         processors: [resource]
       logs:
         processors: [resource]
       traces:
         processors: [resource]

.. _groupbyattrs-processor-settings:

Settings
======================

The following table shows the configuration options for the ``groupbyattrs`` processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/groupbyattrs.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
