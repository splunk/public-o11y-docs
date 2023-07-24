.. _tshoot-logs:

****************************************************************
Troubleshoot Collector logs
****************************************************************

.. meta::
      :description: Describes known issues when collecting logs with the Splunk Distribution of OpenTelemetry Collector.

See the OpenTelemetry project documentation :new-page:`to activate the Collector's debug logging <https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/troubleshooting.md#logs>`.

Here are some common issues related to log collection on the Collector.

Source isn't generating logs
=========================================

If using Linux, run the following commands to check if the source is generating logs:

.. code-block:: bash

  tail -f /var/log/myTestLog.log
  journalctl -u my-service.service -f


If using Windows, run the following command to check if the source is generating logs:

.. code-block:: shell

  Get-Content myTestLog.log 

.. _fluentd-collector-troubleshooting:

Fluentd isn't configured correctly
=========================================

Do the following to check the Fluentd configuration:

#. Check that td-agent is running. On Linux, run ``systemctl status td-agent``. On Windows, run ``Get-Service td-agent``.
#. If you changed the configuration, restart Fluentd. On Linux, run ``systemctl restart td-agent``. On Windows, run ``Restart-Service -Name td-agent``.
#. Check fluentd.conf and conf.d/\*. ``@label @SPLUNK`` must be added to every source to activate log collection.
#. Manual configuration might be required to collect logs off the source. Add configuration files to in the conf.d directory as needed.
#. Activate debug logging in fluentd.conf (``log_level debug``), restart td-agent, and check that the source is generating logs.

While every attempt is made to properly configure permissions, it is possible that td-agent does not have the permission required to collect logs. Debug logging should indicate this issue.

It is possible that the ``<parser>`` section configuration does not match the log events.

If you see a message such as "2021-03-17 02:14:44 +0000 [debug]: #0 connect new socket", Fluentd is working as expected. You need to activate debug logging to see this message.

Collector isn't configured properly
=========================================

Do the following to check the Collector configuration:

#. Go to ``http://localhost:55679/debug/tracez`` to check zPages for samples. You might need to configure the endpoint.
#. Activate logging exporter. See :ref:`logging-exporter` for more information.
#. Run ``journalctl -u splunk-otel-collector.service -f`` to collect the logs for you to review.
#. Review :ref:`otel-splunk-collector-tshoot` if you can't find what you need in the logs.

Test the Collector by sending synthetic data
==================================================================================
You can manually generate logs. By default, Fluentd monitors journald and /var/log/syslog.log for events.

.. code-block:: bash

  echo "2021-03-17 02:14:44 +0000 [debug]: test" >>/var/log/syslog.log
  echo "2021-03-17 02:14:44 +0000 [debug]: test" | systemd-cat

.. note::

  Properly structured syslog is required for Fluentd to properly pick up the log line.

.. _unwanted_profiling_logs:

Unwanted profiling logs appearing in Splunk Observability Cloud
==================================================================================

By default, the Splunk Distribution of the OpenTelemetry Collector sends AlwaysOn Profiling data using the Splunk HEC exporter. See :ref:`no_profiling_data` for more information.

.. _disable_log_collection:

Exclude log data in the Collector
==================================================================================

Depending on its configuration, the Splunk Distribution of the OpenTelemetry Collector might collect and send logs to Splunk Observability Cloud through a ``logs`` pipeline that uses the Splunk HEC exporter. 

To turn off logs colletion, see :ref:`exclude-log-data` for more information.


Send logs from the Collector to Splunk Cloud Platform or Enterprise
==================================================================================

To send logs from the Collector to Splunk Cloud Platform or Splunk Enterprise, see :ref:`send_logs_to_splunk`.

