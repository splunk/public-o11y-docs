.. _fluentd-receiver:

*************************
Fluent Forward receiver
*************************

.. meta::
      :description: The Fluent Forward receiver allows the Splunk Distribution of OpenTelemetry Collector to collect logs and events using the Fluent Forward protocol.

The Fluent Forward receiver allows the Splunk Distribution of the OpenTelemetry Collector to collect events using the bundled Fluentd application. The supported pipeline type is ``logs``. See :ref:`otel-data-processing` for more information.

The receiver accepts data formatted as Fluent Forward events through a TCP connection. All three Fluent event types, message, forward, and packed forward, are supported, including compressed packed forward.

.. caution:: Fluentd is deactivated by default for Linux and Windows. To activate it, use the ``--with-fluentd`` option when installing the Collector for Linux, or the ``with_fluentd = 1`` option when installing the Collector for Windows.

Get started
======================

.. note:: 
  
  This component is included in the default configuration of the Splunk Distribution of the OpenTelemetry Collector when deploying in host monitoring (agent) mode. See :ref:`otel-deployment-mode` for more information. 
  
  For details about the default configuration, see :ref:`otel-kubernetes-config`, :ref:`linux-config-ootb`, or :ref:`windows-config-ootb`. You can customize your configuration any time as explained in this document.

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next document.
3. Restart the Collector.

By default, the Splunk Distribution of the OpenTelemetry Collector includes the Fluent Forward receiver in the ``logs`` pipeline:

.. code-block:: yaml

  receivers:
    fluentforward:
      endpoint: 127.0.0.1:8006

  service:
    pipelines:
      logs:
        receivers: [fluentforward]

For more information on how to install Fluentd when manually installing the Collector, see:

* :ref:`fluentd-manual-config-linux`
* :ref:`fluentd-manual-config-windows`
* :ref:`windows-manual-fluentd`

Settings
======================

The following table shows the configuration options for the Fluent Forward receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/fluentforward.yaml"></div>

Troubleshooting
======================

For troubleshooting Fluentd, see:

* :ref:`fluentd-collector-troubleshooting`
* :ref:`otel-linux-uninstall-both-otel-and-tdagent`

.. caution:: If you have a Log Observer entitlement or wish to collect logs for the target host with Fluentd, make sure Fluentd is installed and turned on in your Collector instance.
