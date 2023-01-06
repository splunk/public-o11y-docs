.. _migrate-from-sa-to-otel:

***********************************************************************************************
Migrate from SignalFx Smart Agent to the Splunk Distribution of OpenTelemetry Collector
***********************************************************************************************

.. meta::
   :description: Describes the process of migrating from the SignalFX Smart Agent to the Splunk Distribution of OpenTelemetry Collector.

.. note::
   Using this content assumes that you are running the SignalFx SmartAgent in the Kubernetes, Linux, or Windows environments and want to migrate to the Splunk Distribution of OpenTelemetry Collector to collect telemetry data.

Overview
=================

The Splunk Distribution of OpenTelemetry Collector is the Splunk distribution of the :new-page:`OpenTelemetry Collector <https://opentelemetry.io/docs/concepts/data-collection/>` that provides a unified way to receive, process, and export metrics, traces, and logs to Splunk Observability Cloud.

This distribution provides helpful components to assist current SignalFx Smart Agent (deprecated) users in their transition to the Collector and ensure no functionality loss. The Smart Agent Receiver, its associated extension, and other Collector components provide a means of integrating all Smart Agent metric monitors into your Collector pipelines.

The Smart Agent metric monitors allow real-time insights into how your target services and applications are performing. These metric gathering utilities have an equivalent counterpart in the Collector, known as the metric receiver. The Smart Agent Receiver is a wrapper utility that allows the embedding of Smart Agent monitors within your Collector pipelines.

Benefits
================

The benefits of using the Collector are:

* Open standard based on OpenTelemetry
* Support for new features such as code profiling
* Ability to correlate data between different views within Observability Cloud with :ref:`Related Content <get-started-relatedcontent>` 
* Bundled FluentD for log collection

For example, see the Related Content bar displaying in Splunk APM. With the ``paymentservice`` selected in the APM Service Map, the bar offers easy access to the paymentservice-related Kubernetes cluster data in Splunk Infrastructure Monitoring and logs in Splunk Log Observer:

.. image:: /_images/gdi/3886-related-content-bar.png
   :width: 99%
   :alt: Viewing the Related Content bar in Splunk APM.

.. _migration-process:

Migration process
========================

Do the following to migrate from the Smart Agent to the Collector:

* :ref:`deploy-the-collector-non-prod-env`
* :ref:`validate-deployment-of-collector` 
* :ref:`locate-sa-config-file`
* :ref:`use-translatefx` 
* :ref:`estimate-sizing` 
* :ref:`deploy-non-prod-updated-config` 
* :ref:`deploy-to-prod-updated-config` 

Each step is described in detail in the following sections.

.. _deploy-the-collector-non-prod-env:

1. Deploy the Collector in a non-production environment
------------------------------------------------------------

Deploy the Collector in a non-production environment, for example, a development host or VM or a Kubernetes cluster in staging. The environment should be a copy or identical to your production environment.

Navigate to your instance of Observability Cloud and select :menuselection:`Data Management` in the left navigation bar. Choose the platform you would like to deploy the Collector to.

.. image:: /_images/gdi/3886-choose-your-platform.png
   :width: 99%
   :alt: Select Data Management in the left navigation bar.

Follow the guided setup for your platform to deploy the Collector.

.. note::
   See the tooltips within the guided setup for guidance about the initial configuration.

.. _validate-deployment-of-collector:

2. Validate the deployment of the Collector
---------------------------------------------

Validate the deployment of the Collector using the following approaches in the described order.

Validate using dashboards
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Start with looking at the built-in dashboard for the Collector where you can visualize:

- Process metrics such as memory and CPU usage
- Dropped, failure and success metrics for telemetry processing (metrics, spans, logs)

Select :menuselection:`Dashboards` in the left navigation bar.

.. image:: /_images/gdi/3886-select-dashboards.png
   :width: 99%
   :alt: Select Dashboards in the left navigation bar.

Search for OpenTelemetry Collector to access the built-in dashboard group.

.. image:: /_images/gdi/3886-search-dashboards.png
   :width: 99%
   :alt: Search for the OpenTelemetry Collector.

Navigate to the Critical Monitoring section and review whether there is any data being dropped to ensure that there is no data loss and that telemetry data is not being dropped. You should see a chart for metrics, spans, and logs.

.. image:: /_images/gdi/3886-dashboard-charts.png
   :width: 99%
   :alt: Navigate to the Critical Monitoring section and review whether there is any data being dropped.

If any of the charts indicate a value above zero, then data is being dropped and investigation is needed. To diagnose further, see :ref:`validate-logs`.

Validate using zPages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To ensure that the Collector is configured correctly, enable the zPages extension.

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the Metric Finder to ensure that metrics are coming in from a specific integration. Select :menuselection:`Metric Finder` in the left navigation bar.

.. image:: /_images/gdi/3886-metric-finder.png
   :width: 99%
   :alt: Select Metric Finder in the left navigation bar.

Find the integration as part of the list present. For example, if you deployed the Collector on the Kubernetes platform, scroll to the
Containers category and select :menuselection:`Kubernetes`. Search results from all metrics being pulled in by default from the Kubernetes integration and the associated metadata that can be filtered or excluded are shown.

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
---------------------------------------------------------

The Smart Agent can be configured by editing the agent.yaml file. By default, the configuration is installed at /etc/signalfx/agent.yaml on Linux and \ProgramData\SignalFxAgent\agent.yaml on Windows. If you override the location while installing the Smart Agent using the ``-config`` command line flag, the configuration file is stored at the location that you specify.

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
----------------------------------------------------------------------------

Use translatesfx to translate your existing Smart Agent configuration file into a configuration that can be used by the Collector. translatesfx is a command-line tool provided by Observability Cloud. 

.. note::

   translatesfx aims to automate most of the configuration changes required when migrating from the Smart Agent to the Collector. Any configuration produced by translatesfx should be carefully evaluated and tested before being put into production.

There are two approaches to using translatesfx, from the command line or from the GUI.

From the command line
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To run the tool from the command line, download the executables from the :new-page:`releases page <https://github.com/signalfx/splunk-otel-collector/releases>`. The executables are also contained in the RPM, MSI, and Debian packages as well as the Docker images (version 0.36.1 and higher).

The translatesfx command requires one argument, a Smart Agent configuration file, and accepts an optional second argument, which is the working directory used by any Smart Agent ``#from`` file expansion directives. The translatesfx command uses this working directory to resolve any relative paths to files referenced by any ``#from`` directives at runtime.

.. code-block:: none

   % translatesfx <sfx-file> [<file expansion working directory>]

If this working directory argument is omitted, translatesfx expands relative file paths using the current working directory:

.. code-block:: none

   % translatesfx path/to/sfx/<config-filename>.yaml
   % translatesfx /etc/signalfx/sa-config.yaml

When translatesfx runs, it sends the translated Collector configuration to the standard output. By default, the standard output is printed to the console (command line output), but can be redirected to a file or to another program. To write the contents to disk, redirect this output to a new Collector configuration file:

.. code-block:: none

   % translatesfx /etc/signalfx/sa-config.yaml > /etc/signalfxotel-config.yaml

From the GUI
^^^^^^^^^^^^^^^^^^^^^

#. Access the Smart Agent configuration converter at :new-page:`https://bossofopsando11y.com/configurator/saconverter <https://bossofopsando11y.com/configurator/saconverter>`. This tool is translatesfx with a GUI.
#. Paste your Smart Agent configuration in the :menuselection:`Smart Agent YAML` section of the GUI.

The corresponding translated Collector configuration file is populated in the OpenTelemetry YAML section.

.. image:: /_images/gdi/3886-sa-configuration-tool.png
   :width: 99%
   :alt: View your translated configuration file. 

.. _estimate-sizing:

5. Estimate resource utilization (sizing) for the production environment
----------------------------------------------------------------------------

The sizing of the Collector and the corresponding VM or host it is to be deployed to should be based on the telemetry being collected. The Collector requires 1 CPU core per:

- 15000 spans per second
- 20000 data points per second
- 10000 log records per second

The Smart Agent has an internal metrics monitor that emits metrics about the internal state of the agent. This is useful for debugging performance issues with the Collector and to ensure that the Collector isn't overloaded. Add the following to your Smart Agent configuration file:

.. code-block:: yaml

   monitors:
     - type: internal-metrics

Note that this addition to your Smart Agent configuration file is only necessary to verify the data being sent through the Smart Agent. The Smart Agent configuration file is deleted when you :ref:`deploy the Collector to a production host using the updated configuration file <deploy-to-prod-updated-config>`.

Once the configuration file is updated, restart the Smart Agent.

You can then use the ``sfxagent.datapoints_sent`` and ``sfxagent.trace_spans_sent`` metrics to estimate the number of data points and spans being sent to Observability Cloud respectively. You can plot them on a dashboard and filter based on dimensions to ascertain the total per cluster or host.

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
---------------------------------------------------------------------------------------------------

Once the necessary updates and translation with the configuration file are complete, restart the Collector on the non-production environment using the updated file.

.. _restart-the-collector:

Restart the Collector
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

Once the Collector is restarted successfully, :ref:`validate the deployment <validate-deployment-of-collector>` to make sure data is being collected and that there are no errors with the updated configuration file.

.. _deploy-to-prod-updated-config:

7. Deploy the Collector to a production host using the updated configuration file
---------------------------------------------------------------------------------------

After successfully deploying the Collector to a non-production environment and verifying that data is getting into Observability Cloud as expected, as a first step, stop and uninstall the Smart Agent from a single production host or VM to begin the migration. Follow the commands below for each respective environment:

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

Once the Smart Agent  has been uninstalled, :ref:`deploy the Collector to a production host using the updated configuration file <deploy-to-prod-updated-config>` and then :ref:`validate the deployment of the Collector <validate-deployment-of-collector>`.

After verifying with one host, deploy the Collector with the same configuration to the rest of the hosts.

Understand OpenTelemetry formats for metrics and metric metadata
======================================================================

Splunk provides a Mapping Service that defines equivalencies between legacy Smart Agent metric naming and semantic conventions to the OpenTelemetry names and formats for metrics and metric metadata. Mapping supports multiple observers, deployment types, and kinds of metadata. See :new-page:`Understand OpenTelemetry formats for metrics and metric metadata <https://docs.splunk.com/Observability/gdi/opentelemetry/legacy-otel-mappings.html>` for more information. 

.. include:: /_includes/troubleshooting-steps.rst