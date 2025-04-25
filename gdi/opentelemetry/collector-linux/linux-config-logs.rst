.. _otel-install-linux-logs:
.. _linux-config-logs:

***************************************************************
Collect logs with the Collector for Linux
***************************************************************

.. meta::
  
  :description: Describes how to collect logs for the Splunk Distribution of OpenTelemetry Collector for Linux.

Use the Universal Forwarder to send logs to the Splunk platform. See more at :ref:`collector-with-the-uf`.

Do not use Fluentd to collect logs. If you already installed Fluentd on a host, re-install the Collector without Fluentd using the ``--without-fluentd`` option. 

