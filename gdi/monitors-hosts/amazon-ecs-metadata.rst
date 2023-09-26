(amazon-ecs-metadata)=

Amazon ECS Task Metadata endpoint
=================================

.. raw:: html

   <meta name="Description" content="Use this Splunk Observability Cloud integration for the ECS metadata monitor. See benefits, install, configuration, and metrics">

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``ecs-metadata`` monitor type to read metadata and Docker stats from
Amazon ECS Task Metadata Endpoint version 2. This integration does not
currently support CPU share and quota metrics.

This integration is only available on Kubernetes and Linux.

Benefits
--------

``{include} /_includes/benefits.md``

Installation
------------

``{include} /_includes/collector-installation-linux.md``

Configuration
-------------

``{include} /_includes/configuration.md``

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

::

   receivers:
     smartagent/ecs-metadata:
       type: ecs-metadata
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

::

   service:
     pipelines:
       metrics:
         receivers: [smartagent/ecs-metadata]

Metrics
-------

The following metrics are available for this integration:

.. container:: metrics-yaml

Notes
~~~~~

``{include} /_includes/metric-defs.md``

Troubleshooting
---------------

``{include} /_includes/troubleshooting.md``
