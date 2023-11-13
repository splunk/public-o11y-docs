.. include:: /_includes/gdi/zero-config-preview-header.rst

.. _auto-instrumentation-nodejs-linux:

*****************************************************************************
Zero Configuration Auto Instrumentation for Linux Node.js applications
*****************************************************************************

.. meta::
    :description: How to activate zero configuration automatic instrumentation for Linux Node.js applications, allowing you to collect and send traces to Splunk Application Performance Monitoring (APM) without altering your code.

Zero Configuration Auto Instrumentation for Linux activates automatic instrumentation for Linux Node.js applications. When you activate automatic instrumentation, you only have to restart any applications that are already running. 

.. _zero-config-js-linux-prereqs:

Prerequisites
=======================================

- Automatic instrumentation is only available for applications using supported Node.js libraries. See :ref:`nodes-requirements`. If your application isn't supported, manually instrument your service to generate trace data. See :ref:`nodejs-manual-instrumentation` .

- :ref:`nodejs-otel-requirements`.

- Your Splunk Observability Cloud realm and access token.

   - To get an access token, see :ref:`admin-api-access-tokens`.

   - To find the realm name of your account, open the navigation menu in Splunk Observability Cloud. Select :menuselection:`Settings`, and then select your username. The realm name appears in the :guilabel:`Organizations` section.

.. _install-js-package:

Install the package
=======================================

You can install the ``splunk-otel-auto-instrumentation`` package in the following ways:


Using the installer script, you can install the auto instrumentation package for Node.js and activate auto instrumentation for Node.js for either all supported Node.js applications on the host via the system-wide method or for only Node.js applications running as ``systemd`` services.

.. note:: By default, auto instrumentation is activated for both Java and Node.js when using the installer script. To deactivate auto instrumentation for Java, add the ``--without-instrumentation-sdk java`` or ``--with-instrumentation-sdk node`` option in the installer script command.

.. tabs:: 

    .. tab:: System-wide

        To install the package, run the Collector installer script with the ``--with-instrumentation`` option. The installer script will install the Collector and the Node.js agent from the Splunk Distribution of OpenTelemetry JS. The Node.js agent automatically loads when a Node.js application starts on the local machine.

        Run the installer script with the ``--with-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.

            .. code-block:: bash

                curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                sh /tmp/splunk-otel-collector.sh --with-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

            .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance by specifying the ``--with-fluentd`` option. 

        The auto instrumentation method automatically adds environment variables to ``/etc/splunk/zeroconfig/node.conf``.

        You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

        .. code-block:: bash
            :emphasize-lines: 4

            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
            sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
            --enable-profiler --enable-profiler-memory --enable-metrics

        Next, ensure the collector service is running and restart your Node.js application(s). See :ref:`verify-js-agent-install` and :ref:`start-restart-js-apps`. 

    .. tab:: ``systemd``

        Run the installer script with the ``--with-systemd-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.
            
            .. code-block:: bash

                curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>
            
            The ``systemd`` auto instrumentation method automatically adds environment variables to ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.

            .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance by specifying the ``--with-fluentd`` option.

        You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

        .. code-block:: bash
            :emphasize-lines: 4

            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
            sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --deployment-environment prod \
            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
            --enable-profiler --enable-profiler-memory --enable-metrics

        Next, ensure the collector service is running and restart your Node.js application(s). See :ref:`verify-js-agent-install` and :ref:`start-restart-js-apps`.  

.. _verify-js-agent-install:

Ensure the collector service is running
--------------------------------------------

After a successful installation, run the following command to ensure the ``splunk-otel-collector`` service is running:

.. code-block:: bash

   sudo systemctl status splunk-otel-collector

If the service is not running, start or restart it with the following command:

.. code-block:: bash

   sudo systemctl restart splunk-otel-collector

If the service fails to start, check that the ``SPLUNK_REALM`` and ``SPLUNK_ACCESS_TOKEN`` in ``/etc/otel/collector/splunk-otel-collector.conf`` are correct. You can also view the service logs with this command:

.. code-block:: bash

   sudo journalctl -u splunk-otel-collector

.. _start-restart-js-apps:

Start your applications
------------------------------------------------

For auto instrumentation to take effect, you must either reboot the host or manually start or restart any Node.js applications on the host where you installed the package. You must restart the host or applications after installing the auto instrumentation package for the first time and whenever you make any changes to the configuration file. 

After your applications are running, you can verify your data. See :ref:`verify-apm-data`. You can also configure instrumentation settings. See :ref:`configure-js-zeroconfig-linux`. 

.. _configure-js-zeroconfig-linux:

(Optional) Configure the instrumentation
====================================================

You can configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

To learn more, see :ref:`advanced-nodejs-otel-configuration`.

.. _js-zeroconfig-linux-nextsteps:

Next steps
====================================================

After activating automatic instrumentation for Node.js, ensure your data is flowing into Splunk Observability Cloud. See :ref:`verify-apm-data`. 

