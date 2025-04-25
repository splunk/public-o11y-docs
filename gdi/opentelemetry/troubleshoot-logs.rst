.. _tshoot-logs:

****************************************************************
Troubleshoot log collection
****************************************************************

.. meta::
      :description: Describes known issues when collecting logs with the Splunk Distribution of the OpenTelemetry Collector.

This document describes common issues related to log collection with the Collector.

To troubleshoot the health and performance of the Collector see the :new-page:`OpenTelemetry Project troublehooting docs <https://opentelemetry.io/docs/collector/troubleshooting>`. It includes information about troubleshooting tools and debugging.

For more information on log collection see:

.. list-table::
    :width: 100%
    :widths: 25 75
    :header-rows: 1

    * - Platform
      - Docs

    * - Kubernetes
      - :ref:`kubernetes-config-logs`

    * - Linux
      - :ref:`linux-config-logs`

    * - Windows
      - :ref:`windows-config-logs`
  
My source isn't generating logs
=========================================

If using Linux, run the following commands to check if the source is generating logs:

.. code-block:: bash

  tail -f /var/log/myTestLog.log
  journalctl -u my-service.service -f


If using Windows, run the following command to check if the source is generating logs:

.. code-block:: shell

  Get-Content myTestLog.log 

The Collector isn't configured properly
=========================================

Do the following to check the Collector configuration:

#. Go to ``http://localhost:55679/debug/tracez`` to check zPages for samples. You might need to configure the endpoint.
#. Activate logging exporter. See :ref:`logging-exporter` for more information.
#. Run ``journalctl -u splunk-otel-collector.service -f`` to collect the logs for you to review.
#. Review :ref:`otel-splunk-collector-tshoot` if you can't find what you need in the logs.

Test the Collector by sending synthetic data
==================================================================================

You can manually generate logs. 

.. code-block:: bash

  echo "2021-03-17 02:14:44 +0000 [debug]: test" >>/var/log/syslog.log
  echo "2021-03-17 02:14:44 +0000 [debug]: test" | systemd-cat

.. _unwanted_profiling_logs:

Unwanted profiling logs appearing in Splunk Observability Cloud
==================================================================================

By default, the Splunk Distribution of the OpenTelemetry Collector sends AlwaysOn Profiling data using the Splunk HEC exporter. See :ref:`no_profiling_data` for more information.

.. _disable_log_collection:

Exclude log data in the Collector
==================================================================================

Depending on its configuration, the Splunk Distribution of the OpenTelemetry Collector might collect and send logs to Splunk Observability Cloud through a ``logs`` pipeline that uses the Splunk HEC exporter. 

To turn off logs colletion, see :ref:`exclude-log-data` for more information.

Send logs to Splunk Cloud Platform or Enterprise using the Collector
==================================================================================

To send logs from the Collector to Splunk Cloud Platform or Splunk Enterprise, see :ref:`send_logs_to_splunk`.

