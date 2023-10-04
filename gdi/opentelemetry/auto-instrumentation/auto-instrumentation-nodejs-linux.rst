.. _auto-instrumentation-nodejs-linux:

*****************************************************************************
Zero Configuration Auto Instrumentation for Linux Node.js applications
*****************************************************************************

.. meta::
    :description: How to activate zero configuration automatic instrumentation for Linux Node.js applications, allowing you to collect and send traces to Splunk Application Performance Monitoring (APM) without altering your code.

Zero Configuration Auto Instrumentation for Linux activates automatic instrumentation for Kubernetes Java applications. When you activate automatic instrumentation, you only have to restart any applications that are already running. 

.. _zero-config-js-linux-prereqs:

Prerequisites
=======================================

.. include:: /_includes/gdi/zero-conf-reqs.rst

.. _install-js-package:

Install the package
=======================================

To install the package, run the Collector installer script with the ``--with-instrumentation`` option. The installer script will install the Collector and the JS agent from the Splunk Distribution of OpenTelemetry JS. The JS agent automatically loads when a JS application starts on the local machine.

Run the installer script with the ``--with-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.

    .. code-block:: bash

        npm install @splunk/otel --with-instrumentation \ 
        --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

    .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance. 

To automatically define the optional ``deployment.environment`` resource attribute at installation time, run the installer script with the ``--deployment-environment <env>`` option. Replace ``<env>`` with the desired attribute value, for example, ``prod``, as shown in the following example:

    .. code-block:: bash
        :emphasize-lines: 2

        npm install @splunk/otel --with-instrumentation \ 
        --deployment-environment prod --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> 

You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

    .. code-block:: bash
        :emphasize-lines: 3

        npm install @splunk/otel --with-instrumentation --deployment-environment prod \ 
        --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
        --enable-profiler --enable-profiler-memory --enable-metrics
      
Next, ensure the service is running and restart your application. See :ref:`verify-js-agent-install` and :ref:`start-restart-js-apps`. 

.. _verify-js-agent-install:

Ensure the service is running
---------------------------------------

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

For auto instrumentation to take effect, you must manually start or restart any Node.js applications on the host where you installed the package. You must do restart applications after installing the auto instrumentation package for the first time and whenever you make any changes to the configuration file. 

After your applications are running, you can verify your data. See :ref:`verify-apm-data`. You can also configure instrumentation settings. See :ref:`configure-js-zeroconfig-linux`. 

.. _configure-js-zeroconfig-linux:

(Optional) Configure the instrumentation
====================================================

You can configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

To learn more, see :ref:`advanced-nodejs-otel-configuration`.

.. _js-zeroconfig-linux-nextsteps:

Next steps
====================================================

After activating automatic instrumentation for JS, ensure your data is flowing into Splunk Observability Cloud. See :ref:`verify-apm-data`. 
