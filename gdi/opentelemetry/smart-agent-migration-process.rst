.. _migration-process:

********************************************************************************************************
Migration process from the Smart Agent to the Splunk Distribution of the OpenTelemetry Collector
********************************************************************************************************

.. meta::
   :description: Describes the process of migrating from the SignalFX Smart Agent to the Splunk Distribution of OpenTelemetry Collector.

.. note::
   Using this content assumes that you're running the SignalFx SmartAgent in the Kubernetes, Linux, or Windows environments and want to migrate to the Splunk Distribution of OpenTelemetry Collector to collect telemetry data. Note that you cannot use both agents simultaneously on the same host.

Do the following steps to migrate from the Smart Agent to the Collector:

#. :ref:`Deploy the Collector in a non-production environment <deploy-the-collector-non-prod-env>`
#. :ref:`Validate the deployment of the Collector <validate-deployment-of-collector>` 
#. :ref:`Locate your existing Smart Agent configuration file <locate-sa-config-file>`
#. :ref:`Translate the Smart Agent configuration file using translatesfx <use-translatefx>` 
#. :ref:`Estimate resource utilization (sizing) for the production environment <estimate-sizing>` 
#. :ref:`Deploy the Collector to the non-production environment using the updated configuration file <deploy-non-prod-updated-config>` 
#. :ref:`Deploy the Collector to a production host using the updated configuration file <deploy-to-prod-updated-config>` 

.. _deploy-the-collector-non-prod-env:

1. Deploy the Collector in a non-production environment
================================================================

Deploy the Collector in a non-production environment, for example, a development host or VM or a Kubernetes cluster in staging. The environment needs to be a copy or identical to your production environment.

Navigate to your instance of Splunk Observability Cloud and select :menuselection:`Data Management` in the navigation bar. Choose the platform you would like to deploy the Collector to.

.. image:: /_images/gdi/3886-choose-your-platform.png
   :width: 99%
   :alt: Select Data Management in the navigation bar.

Follow the guided setup for your platform to deploy the Collector.

.. note::
   See the tooltips within the guided setup for guidance about the initial configuration.

.. _validate-deployment-of-collector:

2. Validate the deployment of the Collector
================================================================

Validate the deployment of the Collector using the following approaches in the described order.

Validate using dashboards
---------------------------------------------

Start with looking at the built-in dashboard for the Collector where you can visualize:

- Process metrics such as memory and CPU usage
- Dropped, failure and success metrics for telemetry processing (metrics, spans, logs)

Select :menuselection:`Dashboards` in the navigation bar.

.. image:: /_images/gdi/3886-select-dashboards.png
   :width: 99%
   :alt: Select Dashboards in the navigation bar.

Search for OpenTelemetry Collector to access the built-in dashboard group.

.. image:: /_images/gdi/3886-search-dashboards.png
   :width: 99%
   :alt: Search for the OpenTelemetry Collector.

Navigate to the Critical Monitoring section and review whether there is any data being dropped to ensure that there is no data loss and that telemetry data is not being dropped. You should see a chart for metrics, spans, and logs.

.. image:: /_images/gdi/3886-dashboard-charts.png
   :width: 99%
   :alt: Navigate to the Critical Monitoring section and review whether there is any data being dropped.

If any of the charts indicate a value above zero, then data is being dropped and you need to investigate why. To diagnose further, see :ref:`validate-logs`.

Validate using zPages
---------------------------------------------

To ensure that the Collector is configured correctly, activate the zPages extension.

This is exposed locally on port 55679 by default and can be used to give an overview of the following:

* Services and build, runtime information (``http://localhost:<port>/debug/servicez``)
* Running pipelines (``http://localhost:<port>/debug/pipelinez``)
* Extensions (``http://localhost:<port>/debug/extensionz``)
* Feature gates (``http://localhost:<port>/debug/featurez``)``
* Spans and error samples (``http://localhost:<port>/debug/tracez``)
* RPC statistics (``http://localhost:<port>/debug/servicez/rpcz``)

For containerized environments, you can expose this port on a public interface instead of just locally. This can be configured by adding the following lines to the configuration:

.. code-block:: yaml

   extensions:
      zpages:
         endpoint: 0.0.0.0:55679

Validate using the Metric Finder
---------------------------------------------

Use the Metric Finder to ensure that metrics are coming in from a specific integration. Select :menuselection:`Metric Finder` in the navigation bar.

.. image:: /_images/gdi/3886-metric-finder.png
   :width: 99%
   :alt: Select Metric Finder in the navigation bar.

Find the integration as part of the list present. For example, if you deployed the Collector on the Kubernetes platform, scroll to the Containers category and select :menuselection:`Kubernetes`. Search results from all metrics being pulled in by default from the Kubernetes integration and the associated metadata that can be filtered or excluded are shown.

.. image:: /_images/gdi/3886-find-integration.png
   :width: 99%
   :alt: Find your integration.

Select a specific metric, for example, :menuselection:`container_cpu_utilization`.

.. image:: /_images/gdi/3886-container-cpu-utilization.png
   :width: 99%
   :alt: Select a specific metric.

You can now view the metric as a chart that displays the time series data across the duration you select.

.. image:: /_images/gdi/3886-container-cpu-utilization-chart.png
   :width: 99%
   :alt: View the metric represented as a chart.

If you are unable to find any metrics (in the search results or there are no data points recently in the chart) from an integration configured to be monitored, go to the section on :ref:`validating using logs <validate-logs>`.

.. note::
   If metrics are found in the Metric Finder, but not seen in the chart for the time duration specified, they were reported at some point. Change the time duration specified to help look at logs at a specific timestamp.

.. _validate-logs:

Validate using logs
---------------------------------------------

You can use logs to validate the Collector deployment. Use the following commands based on your environment:

For Docker: 

.. code-block:: yaml

   docker logs my-container >my-container.log

For Journald: 

.. code-block:: yaml

   journalctl -u my-service >my-service.log

For Kubernetes: 

.. code-block:: yaml

   kubectl describe pod my-pod kubectl logs my-pod otel-collector >my-pod-otel.log kubectl logs my-pod fluentd >my-pod-fluentd.log

Check for the following errors:

* Port conflicts: You might see a "bind:address already in use" error message. If you see this message, modify the configuration to use another port.

* HTTP error codes indicating specific use cases: 

  * 401 (UNAUTHORIZED): Configured access token or realm is incorrect

  * 404 (NOT FOUND): Likely configuration parameter is wrong like endpoint or path (for example, /v1/log); possible network/firewall/port issue

  * 429 (TOO MANY REQUESTS): Org is not provisioned for the amount of traffic being sent; reduce traffic or request increase in capacity

  * 503 (SERVICE UNAVAILABLE): If using the Log Observer, this is the same as 429 (because that is how HECv1 responds). Otherwise, check the status page.

To confirm that a specific receiver is fetching metrics exposed by an application, update the configuration file, as shown in the following example.

Set the logging level to ``debug``:

.. code-block:: yaml

   service:
      telemetry:
         logs:
            level: debug

Set ``log_data_points`` to ``true`` using the SignalFx exporter:

.. code-block:: yaml

   exporters:
      signalfx:
         ...
         log_data_points: true
         ...

After updating the configuration, :ref:`restart the Collector <restart-the-collector>`. Check the logs for your environment to validate the deployment.

If you are unable to determine the issue from logs, see :ref:`support`. Gather as much information as possible related to the environment, platforms, configuration, and logs.

.. _locate-sa-config-file:

3. Locate your existing Smart Agent configuration file
================================================================

The Smart Agent can be configured by editing the agent.yaml file. By default, the configuration is installed at ``/etc/signalfx/agent.yaml`` on Linux and ``\ProgramData\SignalFxAgent\agent.yaml`` on Windows. If you override the location while installing the Smart Agent using the ``-config`` command line flag, the configuration file is stored at the location that you specify.

The following is an example YAML configuration file with default values where applicable:

.. code-block:: yaml

   signalFxAccessToken: {"#from": "env:SIGNALFX_ACCESS_TOKEN"}
   ingestUrl: https://ingest.us1.signalfx.com
   apiUrl: https://api.us1.signalfx.com

   bundleDir: /opt/my-smart-agent-bundle

   procPath: /my_custom_proc
   etcPath: /my_custom_etc
   varPath: /my_custom_var
   runPath: /my_custom_run
   sysPath: /my_custom_sys

   observers:
      - type: k8s-api

   collectd:
      readThreads: 10
      writeQueueLimitHigh: 1000000
      writeQueueLimitLow: 600000
   configDir: "/tmp/signalfx-agent/collectd"

   monitors:
      - type: signalfx-forwarder
         listenAddress: 0.0.0.0:9080
      - type: collectd/activemq
         discoveryRule: container_image =~ "activemq" && private_port == 1099
         extraDimensions:
            my_dimension: my_dimension_value
      - type: collectd/apache
         discoveryRule: container_image =~ "apache" && private_port == 80
      - type: postgresql
         discoveryRule: container_image =~ "postgresql" && private_port == 7199
         extraDimensions:
            my_other_dimension: my_other_dimension_value
      - type: processlist


.. _use-translatefx:

4. Translate the Smart Agent configuration file using translatesfx
=====================================================================================

``translatesfx`` is a command-line tool provided by Splunk Observability Cloud that helps you translate your existing Smart Agent YAML configuration file into a configuration that can be used by the Collector. To learn how to use it, see :ref:`Configuration translation tool <otel-translation-tool>`.

.. _estimate-sizing:

5. Estimate resource utilization (sizing) for the production environment
==================================================================================

The sizing of the Collector and the corresponding VM or host it is to be deployed to should be based on the telemetry being collected. The Collector requires 1 CPU core per:

- 15,000 spans per second
- 20,000 data points per second
- 10,000 log records per second

The Smart Agent has an internal metrics monitor that emits metrics about the internal state of the agent. This is useful for debugging performance issues with the Collector and to ensure that the Collector isn't overloaded. Add the following to your Smart Agent configuration file:

.. code-block:: yaml

   monitors:
      - type: internal-metrics

Note that this addition to your Smart Agent configuration file is only necessary to verify the data being sent through the Smart Agent. The Smart Agent configuration file is deleted when you :ref:`deploy the Collector to a production host using the updated configuration file <deploy-to-prod-updated-config>`.

After the configuration file is updated, restart the Smart Agent.

You can then use the ``sfxagent.datapoints_sent`` and ``sfxagent.trace_spans_sent`` metrics to estimate the number of data points and spans being sent to Splunk Observability Cloud respectively. You can plot them on a dashboard and filter based on dimensions to ascertain the total per cluster or host.

.. note::
   The sizing recommendation for logs also accounts for td-agent (Fluentd) that is bundled with the Collector.

If a Collector handles both trace and metric data, then both must be accounted for when sizing. For example, 7.5K spans per second plus 10K data points per second would require 1 CPU core.

Use a ratio of 1 CPU to 2 GB of memory. By default, the Collector is configured to use 512 MB of memory.

Configure ``ballastextension`` and the ``memory_limiter`` processor on every Collector instance, as shown in the following examples:

.. code-block:: yaml

   extensions:
      memory_ballast:
         size_mib:

.. code-block:: yaml

   processors:
      memory_limiter:
         check_interval: 
         limit_mib: 
         spike_limit_mib:

.. note::
   The ballast should be configured to be 1/3 to 1/2 of the memory allocated to the Collector. The ``memory_limiter`` processor should be the first processor defined in the pipeline (immediately after the receivers).

.. _deploy-non-prod-updated-config:

6. Deploy the Collector to the non-production environment using the updated configuration file
===================================================================================================

Complete the necessary updates and translation of the configuration file, and restart the Collector on the non-production environment using the updated file.

.. _restart-the-collector:

Restart the Collector
----------------------------------------

On Linux:

.. code-block:: bash

   sudo systemctl restart splunk-otel-collector

On Windows:

.. code-block:: PowerShell

   Stop-Service splunk-otel-collector
   Start-Service splunk-otel-collector

On Kubernetes:

.. code-block:: YAML

   helm upgrade my-splunk-otel-collector --values my_values.yaml splunk-otel-collector-chart/splunk-otel-collector

After the Collector is restarted successfully, :ref:`validate the deployment <validate-deployment-of-collector>` to make sure data is being collected and that there are no errors with the updated configuration file.

.. _deploy-to-prod-updated-config:

7. Deploy the Collector to a production host using the updated configuration file
=============================================================================================

After successfully deploying the Collector to a non-production environment and verifying that data is getting into Splunk Observability Cloud as expected, as a first step, stop and uninstall the Smart Agent from a single production host or VM to begin the migration. Follow the commands below for each respective environment:

On Linux:

For Debian-based distributions, including Ubuntu, run the following command:

.. code-block:: bash

   sudo dpkg --remove signalfx-agent

For Red Hat, CentOS, and other RPM-based installs, run the following command:

.. code-block:: bash

   sudo rpm -e signalfx-agent

On Windows (installer):

Uninstall the Smart Agent from :menuselection:`Programs and Features` in the Control Panel.

On Windows (ZIP file):

Run the following PowerShell commands to stop and uninstall the ``signalfx-agent`` service:

.. code-block:: PowerShell

   SignalFxAgent\bin\signalfx-agent.exe -service "stop"
   SignalFxAgent\bin\signalfx-agent.exe -service "uninstall"

After uninstalling the Smart Agent, :ref:`deploy the Collector to a production host using the updated configuration file <deploy-to-prod-updated-config>` and then :ref:`validate the deployment of the Collector <validate-deployment-of-collector>`.

After verifying with one host, deploy the Collector with the same configuration to the rest of the hosts.

.. include:: /_includes/troubleshooting-steps.rst