.. _jaeger-receiver:

*************************
Jaeger receiver
*************************

.. meta::
      :description: The Jaeger receiver gathers trace data in Jaeger format.

The Jaeger receiver gathers trace data in Jaeger format. The supported pipeline type is ``traces``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the Jaeger receiver as described in the next section.
3. Restart the Collector.

Sample configurations
--------------------------------

To activate the Jaeger receiver, add ``syslog`` to the ``receivers`` section of your configuration file, as in the following sample configurations. See :ref:`syslog-receiver-settings` for more details.

.. code-block:: yaml

  receivers:
    syslog:

This example shows how to configure logs received using TCP:

.. code-block:: yaml

  receivers:
    syslog:
      tcp:
        listen_address: "0.0.0.0:54526"
      protocol: rfc5424



Advanced configurations
--------------------------------

You can find more examples in the GitHub repository :new-page:`splunk-otel-collextor/examples <https://github.com/signalfx/splunk-otel-collector/tree/main/examples>`.

.. _syslog-receiver-settings:

Settings
======================

The following table shows the configuration options for the Syslog receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/jaeger.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
