.. _linux-advanced-auto-discovery-config:

*****************************************************************************
Advanced customization for automatic discovery in Linux
*****************************************************************************

.. meta:: 
    :description: Learn how to customize your deployment of automatic discovery in a Linux environment.

Learn how to customize Splunk zero config auto instrumentation for advanced scenarios. 

Through advanced customization, you can achieve the following tasks:

* :ref:`Override auto instrumentation settings <override-default-settings-linux>`
* :ref:`Use auto instrumentation with gateway mode <use-with-gateway-linux>`

.. _override-default-settings-linux:

Override default instrumentation settings
=====================================================

You can override default auto instrumentation settings to use features for profiling and runtime metrics collection. 

Activate AlwaysOn Profiling
--------------------------------------

You can activate CPU and memory profiling by updating the environment variables for your instrumentation. AlwaysOn Profiling continuously collects stack traces so that you can discover which lines of code are slowing your processes down. To learn more about Profiling, see :ref:`profiling-intro`.

To activate profiling globally, add the ``--enable-profiler`` flag upon installation for CPU profiling, or ``--enable-profiler-memory`` flag for memory profiling. For example: 

.. code-block:: bash
    :emphasize-lines: 4

    curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
    sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
    --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
    --enable-profiler --enable-profiler-memory

You can also activate profiling for individual languages. By using this approach, you can determine which languages profiling gathers call stacks from.

Follow these steps to activate AlwaysOn Profiling for an individual language: 

#. Open the <language>.conf file located in the ``/etc/splunk/zeroconfig`` directory. 
#. Set the environment variable ``SPLUNK_PROFILER_ENABLED=true`` for CPU profiling, and ``SPLUNK_PROFILER_MEMORY_ENABLED=true`` for memory profiling.
#. Restart your applications.

.. note:: If you're using ``systemd``, the environment variables are instead located in ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.
            
To sample call stacks from a specific interval, change the ``SPLUNK_PROFILER_CALL_STACK_INTERVAL`` setting to your desired interval in milliseconds. The default value is ``10000``.

For example, ``SPLUNK_PROFILER_CALL_STACK_INTERVAL=5000`` sets the call stack interval to 5000 milliseconds.

Activate runtime metrics collection
----------------------------------------------------

You can activate runtime metrics collection by updating the environment variables for your instrumentation. This setting configures the agent to collect additional metrics from your application. 

To activate runtime metrics globally, add the ``--enable-metrics`` flag upon installation. For example: 

.. code-block:: bash
  :emphasize-lines: 4

  curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
  sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
  --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
  --enable-metrics

You can also activate runtime metrics collection for individual languages. By using this approach, you can determine which runtime metrics the Collector sends at a language-level.

To activate runtime metrics collection for an individual language, follow these steps:

#. Open the <language>.conf file located in the ``/etc/splunk/zeroconfig`` directory.
#. Set the environment variable ``SPLUNK_METRICS_ENABLED=true``.
#. Restart your applications.

.. _use-with-gateway-linux:

Use automatic discovery with gateway mode
======================================================

The Splunk OTel Collector Chart uses the agent mode by default. Activating gateway mode deploys an instance of the OpenTelemetry Collector in a separate container, and this instance collects data from the entire cluster.

To learn more about the gateway mode, see :ref:`collector-gateway-mode`.

You can't directly deploy auto instrumentation in gateway mode for Linux, but you can send collected data from auto instrumentation to an existing gateway deployment.

Follow these steps to send data to a gateway deployment of the OpenTelemetry Collector:

#. Open the <language>.conf file located in ``/etc/splunk/zeroconfig``.
#. Set the environment variable ``OTEL_EXPORTER_OTLP_ENDPOINT=<gateway_endpoint>`` where <gateway_endpoint> is the port of your gateway deployment.
#. Restart your applications.

The auto instrumentation now sends data to your gateway deployment. 

Additional settings
===================================

There are many other settings you can customize in zero configuration auto instrumentation.

For a list of settings that you can change for each language, see the following resources:

.. list-table::
  :header-rows: 1
  :width: 100

  * - Language
    - Resource
  * - Java
    - :ref:`advanced-java-otel-configuration`
  * - Node.js
    - :ref:`advanced-nodejs-otel-configuration`