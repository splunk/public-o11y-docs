.. _linux-backend-auto-discovery:

*****************************************************************************
Automatic discovery and configuration for back-end applications in Linux
*****************************************************************************

.. meta:: 
    :description: Get started with automatic discovery and configuration for back-end applications in Linux environments.

When using automatic discovery and configuration, the Splunk Distribution of OpenTelemetry Collector automatically detects back-end applications running in your Linux environment. 

By deploying the Collector with automatic discovery, you can instrument applications and send data to Splunk Observability Cloud without editing your application's code or configuring files.

Automatic discovery for Linux can detect and configure the following applications and language runtimes:

* Java
* Node.js

How automatic discovery for Linux works
===================================================

Automatic discovery for Linux operates as a mode of the Splunk Distribution of OpenTelemetry Collector. You install and activate automatic discovery for the Collector by using the Linux installer script or package manager. During installation, you can specify the types of language runtimes you want the Collector to detect. 

After installation, the Collector runs in your Linux environment and listens for requests to your applications. When the Collector detects activity, it gathers telemetry data from your application runtime and sends this data to Splunk Application Performance Monitoring (APM).

Requirements
==================================================

You need the following components to use automatic discovery for back-end Linux applications:

* ``systemd``
* ``curl``
* ``sudo``

Make sure you've also installed the components specific to your language runtime:

.. tabs:: 

    .. tab:: Java

    .. tab:: Node.js

Get started
===============================

To get started with automatic discovery in Linux, see the guides for the application or language runtime that you want to gather data from:

* Java: :ref:`auto-instrumentation-java-linux`
* .NET: :ref:`auto-instrumentation-dotnet-linux`
* Node.js: :ref:`auto-instrumentation-nodejs-linux`

For a guide showing advanced customization options for Linux, see :ref:`linux-advanced-auto-discovery-config`.

Install the package
=======================================

You can install the ``splunk-otel-auto-instrumentation`` package in the following ways:

Using the installer script, you can install the auto instrumentation package for Node.js and activate auto instrumentation for Node.js for either all supported Node.js applications on the host via the system-wide method or for only Node.js applications running as ``systemd`` services. 

The installer script installs the Node.js package using the ``npm install`` command. To specify a custom path to ``npm`` for installation, use the ``--npm-path <path>`` option as in the following example:

.. code-block:: bash

    --npm-path /custom/path/to/npm

.. tabs::

    .. tab:: Installer script

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

                The system-wide auto instrumentation method automatically adds environment variables to ``/etc/splunk/zeroconfig/node.conf``.

                You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

                .. code-block:: bash
                    :emphasize-lines: 4

                    curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                    sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
                    --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
                    --enable-profiler --enable-profiler-memory --enable-metrics

                Next, ensure the collector service is running and restart your Node.js application(s). See :ref:`verify-js-agent-install` and :ref:`start-restart-js-apps`. 

            .. tab:: systemd

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

    
    .. tab:: Chef

        See :ref:`chef-zero-config`.

    .. tab:: Puppet

        See :ref:`puppet-zero-config`.



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

For auto instrumentation to take effect, you must either restart the host or manually start or restart any applications on the host where you installed the package. You must restart the host or applications after installing the automatic discovery package for the first time and whenever you make any changes to the configuration file. 

After your applications are running, you can verify your data. See :ref:`verify-apm-data`. You can also configure instrumentation settings. See :ref:`configure-js-zeroconfig-linux`. 

.. _configure-js-zeroconfig-linux:

(Optional) Configure the instrumentation
====================================================

You can configure the Splunk Distribution of OpenTelemetry JS to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

To learn more, see the following resources:

* Java: :ref:`advanced-java-otel-configuration`.
* Node.js: :ref:`advanced-nodejs-otel-configuration`.

.. _update-js-zeroconfig-linux:

Update zero config auto instrumentation
============================================

To update the Node.js agent to the latest provided version, you must first update the ``splunk-otel-auto-instrumentation`` package. To learn more, see :ref:`upgrade-the-package`.

.. tabs:: 

    .. tab:: Java

    .. tab:: Node.ks 

        After updating the ``splunk-otel-auto-instrumentation`` package, run the following command:

        .. code-block:: bash

            cd /usr/lib/splunk-instrumentation/splunk-otel-js && \
            sudo npm install /usr/lib/splunk-instrumentation/splunk-otel-js.tgz


        The default auto instrumentation configuration expects the Node.js agent to be installed under the ``/usr/lib/splunk-instrumentation/splunk-otel-js`` path. 

        If the Node.js agent is installed under a different path, manually update the path for the ``NODE_OPTIONS`` environment variable in either ``/etc/splunk/zeroconfig/node.conf`` for system-wide services or ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf`` for ``systemd`` services. For example:

        .. code-block:: yaml

            NODE_OPTIONS=-r /custom/nodejs/install/path/@splunk/otel/instrument

.. _js-zeroconfig-linux-nextsteps:

Next steps
====================================================

After activating automatic instrumentation for Node.js, ensure your data is flowing into Splunk Observability Cloud. See :ref:`verify-apm-data`. 


    