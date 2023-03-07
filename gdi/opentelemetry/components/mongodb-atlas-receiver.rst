.. _mongodb-atlas-receiver:

MongoDB Atlas receiver
***********************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the MongoDB Atlas receiver. See benefits, install, configuration, and metrics.

The MongoDB Atlas receiver fetches metrics from MongoDB Atlas by using
their monitoring APIs. Database metrics are dimensionalized by project
and database attributes, for example, ``project_name`` and
``database_name``. The supported pipeline type is metrics.

Use the MongoDB Atlas receiver in place of the SignalFx Smart Agent
``mongodb-atlas`` cluster monitor.

Installation
=======================

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   
   - :ref:`otel-install-windows`
   
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Configuration
=======================

Include the MongoDB Atlas receiver in the ``receivers`` section of your
configuration file, as shown in the following example:

.. code:: yaml

   receivers:
     mongodbatlas:
       public_key: ${MONGODB_ATLAS_PUBLIC_KEY}
       # You can obtain the public key from the API Keys tab of the MongoDB Atlas Project Access Manager. 
       # This value is required.
       private_key: ${MONGODB_ATLAS_PRIVATE_KEY}
       # You can obtain the private key from the API Keys tab of the MongoDB Atlas Project Access Manager. 
       # This value is required.

In this example, both values are pulled from the environment.

To complete the integration, include the receiver in
the\ ``service/pipelines/metrics/receivers`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [mongodbatlas]

Configuration options
--------------------------------

The following table shows the configuration options:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/mongodbatlas.yaml"></div>

Metrics
=======================

The following attributes, resource attributes, and metrics are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/mongodbatlasreceiver.yaml"></div>

To deactivate any metric, apply the following configuration:

.. code:: yaml

   metrics:
     <metric_name>:
       enabled: false

Get help
======================

.. include:: /_includes/troubleshooting-components.rst
