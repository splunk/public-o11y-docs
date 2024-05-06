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
* .NET

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

        Java version 8 or higher and supported libraries. See :ref:`java-otel-requirements` for more information.

    .. tab:: Node.js

        Node.js version 14 or higher and supported libraries. See :ref:`nodejs-otel-requirements` for more information.

    .. tab:: .NET

        .NET version 6.0 or higher and supported libraries. See :ref:`dotnet-otel-requirements` for more information.

        Automatic discovery for .NET is only supported for x86_64/AMD64 architectures.

Get started
===============================

To install and use automatic discovery for Linux, follow these steps:

#. :ref:`auto-discovery-linux-install`
#. :ref:`auto-discovery-linux-verify`
#. :ref:`auto-discovery-view-results-linux`

.. _auto-discovery-linux-install:

Install the package
=======================================

Using the installer script, you can install and activate automatic discovery for either all supported applications on the host via the system-wide method or only for applications running as ``systemd`` services. 


.. tabs:: 

    .. tab:: Java

        .. tabs::

            .. tab:: Installer script

                Using the installer script, you can install the automatic discovery package for Java and activate automatic discovery for Java for either all supported Java applications on the host via the system-wide method or for only Java applications running as ``systemd`` services.

                .. note:: By default, automatic discovery is activated for all languages (Java, Node.js, and .NET) when using the installer script. To deactivate automatic discovery for other languages, add the ``--without-instrumentation-sdk [language]`` option in the installer script command.
                
                .. tabs:: 

                    .. tab:: System-wide
                        
                        Run the installer script with the ``--with-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.

                        .. code-block:: bash

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

                        .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance by specifying the ``--with-fluentd`` option.

                        The system-wide automatic discovery method automatically adds environment variables to ``/etc/splunk/zeroconfig/java.conf``.

                        To automatically define the optional ``deployment.environment`` resource attribute at installation time, run the installer script with the ``--deployment-environment <env>`` option. Replace ``<env>`` with the desired attribute value, for example, ``prod``, as shown in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 2

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

                        You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 4

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
                            --enable-profiler --enable-profiler-memory --enable-metrics
                            
                        Next, ensure the service is running and restart your application. See :ref:`auto-discovery-linux-verify` and :ref:`auto-discovery-linux-restart-apps`. 
                
                    .. tab:: systemd

                        Run the installer script with the ``--with-systemd-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.
                        
                        .. code-block:: bash

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>
                        
                        The ``systemd`` instrumentation automatically adds environment variables to ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.

                        .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance by specifying the ``--with-fluentd`` option. 

                        To automatically define the optional ``deployment.environment`` resource attribute at installation time, run the installer script with the ``--deployment-environment <env>`` option. Replace ``<env>`` with the desired attribute value, for example, ``prod``, as shown in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 2

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

                        You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 4

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
                            --enable-profiler --enable-profiler-memory --enable-metrics
                            
                        Next, ensure the service is running and restart your application. See :ref:`auto-discovery-linux-verify` and :ref:`auto-discovery-linux-restart-apps`. 

            .. tab::  Deb/RPM

                .. note:: You must first install the Splunk OpenTelemetry Collector using the :ref:`linux-packages`.

                After installing the Collector, follow these steps to install the package using the Debian or RPM repositories with ``root`` privileges:

                1. You can either download the ``splunk-otel-auto-instrumentation`` package directly from the :new-page:`GitHub Releases page <https://github.com/signalfx/splunk-otel-collector/releases>` or add the Splunk repository to the package repositories on your Linux host. See :new-page:`Debian or RPM package repositories <https://docs.splunk.com/Observability/gdi/opentelemetry/install-linux.html#debian-or-rpm-packages>` for instructions on how to configure your package repository.

                2. Run the following commands to install the package. Replace ``<path to splunk-otel-auto-instrumentation deb/rpm>`` with the local path to the downloaded package.

                    .. tabs::

                        .. code-tab:: bash Debian
                                
                            sudo dpkg -i <path to splunk-otel-auto-instrumentation deb>
                                
                        .. code-tab:: bash RPM
                                
                            sudo rpm -ivh <path to splunk-otel-auto-instrumentation rpm>

                3. Edit the ``/etc/otel/collector/splunk-otel-collector.conf`` file to set the ``SPLUNK_ACCESS_TOKEN`` and ``SPLUNK_REALM`` variables to the values you got earlier. If the file does not exist, use the provided sample at ``/etc/otel/collector/splunk-otel-collector.conf.example`` as a starting point.

                    .. code-block:: bash

                        SPLUNK_ACCESS_TOKEN=<access_token>
                        SPLUNK_REALM=<realm>

                4. Start the collector service:

                    .. code-block:: bash

                        sudo systemctl start splunk-otel-collector

                5. :ref:`auto-discovery-linux-verify`.
                6. :ref:`auto-discovery-linux-restart-apps`.

            .. tab:: Ansible

                See :ref:`ansible-zero-config`.

            .. tab:: Chef

                See :ref:`chef-zero-config`.

            .. tab:: Puppet

                See :ref:`puppet-zero-config`.
                
            .. tab:: Salt

                See :ref:`salt-zero-config-java`.


    .. tab:: Node.js 

        The installer script installs the Node.js package using the ``npm install`` command. To specify a custom path to ``npm`` for installation, use the ``--npm-path <path>`` option as in the following example:

        .. code-block:: bash

            --npm-path /custom/path/to/npm

        .. tabs::

            .. tab:: Installer script

                Using the installer script, you can install and activate automatic discovery for Node.js for either all supported Node.js applications on the host via the system-wide method or for only Node.js applications running as ``systemd`` services.

                .. note:: By default, automatic discovery is activated for all languages (Java, Node.js, and .NET) when using the installer script. To deactivate automatic discovery for other languages, add the ``--without-instrumentation-sdk [language]`` option in the installer script command.

                .. tabs::

                    .. tab:: System-wide

                        To install the package, run the Collector installer script with the ``--with-instrumentation`` option. The installer script will install the Collector and the Node.js agent from the Splunk Distribution of OpenTelemetry JS. The Node.js agent automatically loads when a Node.js application starts on the local machine.

                        Run the installer script with the ``--with-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.

                            .. code-block:: bash

                                curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                                sh /tmp/splunk-otel-collector.sh --with-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

                            .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance by specifying the ``--with-fluentd`` option. 

                        The system-wide automatic discovery method automatically adds environment variables to ``/etc/splunk/zeroconfig/node.conf``.

                        You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 4

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
                            --enable-profiler --enable-profiler-memory --enable-metrics

                        Next, ensure the collector service is running and restart your Node.js application(s). See :ref:`auto-discovery-linux-verify` and :ref:`auto-discovery-linux-restart-apps`. 

                    .. tab:: systemd

                        Run the installer script with the ``--with-systemd-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.
                            
                            .. code-block:: bash

                                curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                                sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>
                            
                            The ``systemd`` automatic discovery method automatically adds environment variables to ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.

                            .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance by specifying the ``--with-fluentd`` option.

                        You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 4

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
                            --enable-profiler --enable-profiler-memory --enable-metrics

                        Next, ensure the collector service is running and restart your Node.js application(s). See :ref:`auto-discovery-linux-verify` and :ref:`auto-discovery-linux-restart-apps`.  

            
            .. tab:: Chef

                See :ref:`chef-zero-config`.

            .. tab:: Puppet

                See :ref:`puppet-zero-config`.

    .. tab:: .NET

        Using the installer script, you can install and activate automatic discovery for .NET for either all supported .NET applications on the host via the system-wide method or for only .NET applications running as ``systemd`` services.

        .. note:: By default, automatic discovery is activated for all languages (Java, Node.js, and .NET) when using the installer script. To deactivate automatic discovery for other languages, add the ``--without-instrumentation-sdk [language]`` option in the installer script command.

        .. tabs::

            .. tab:: Installer script 

                .. tabs:: 

                    .. tab:: System-wide
                                
                        Run the installer script with the ``--with-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.

                        .. code-block:: bash

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

                        .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance by specifying the ``--with-fluentd`` option.

                        The system-wide automatic discovery method automatically adds environment variables to ``/etc/splunk/zeroconfig/dotnet.conf``.

                        To automatically define the optional ``deployment.environment`` resource attribute at installation time, run the installer script with the ``--deployment-environment <env>`` option. Replace ``<env>`` with the desired attribute value, for example, ``prod``, as shown in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 2

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

                        You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 4

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
                            --enable-profiler --enable-profiler-memory --enable-metrics
                                    
                        Next, ensure the service is running and restart your application. See :ref:`auto-discovery-linux-verify` and :ref:`auto-discovery-linux-restart-apps`. 
                        
                    .. tab:: systemd

                        Run the installer script with the ``--with-systemd-instrumentation`` option, as shown in the following example. Replace  ``<SPLUNK_REALM>`` and ``<SPLUNK_ACCESS_TOKEN>`` with your Splunk Observability Cloud realm and token, respectively.
                                
                        .. code-block:: bash

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>
                                
                        The ``systemd`` instrumentation automatically adds environment variables to ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf``.

                        .. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, make sure Fluentd is installed and enabled in your Collector instance by specifying the ``--with-fluentd`` option. 

                        To automatically define the optional ``deployment.environment`` resource attribute at installation time, run the installer script with the ``--deployment-environment <env>`` option. Replace ``<env>`` with the desired attribute value, for example, ``prod``, as shown in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 2

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

                        You can activate AlwaysOn Profiling for CPU and memory, as well as metrics, using additional options, as in the following example:

                        .. code-block:: bash
                            :emphasize-lines: 4

                            curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
                            sudo sh /tmp/splunk-otel-collector.sh --with-systemd-instrumentation --deployment-environment prod \
                            --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN> \
                            --enable-profiler --enable-profiler-memory --enable-metrics
                                    
                        Next, ensure the service is running and restart your application. See :ref:`auto-discovery-linux-verify` and :ref:`auto-discovery-linux-restart-apps`. 

            .. tab:: Ansible

                See :ref:`ansible-zero-config`.

.. _auto-discovery-linux-verify:

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

.. _auto-discovery-linux-restart-apps:

Start your applications
------------------------------------------------

For automatic discovery to take effect, you must either restart the host or manually start or restart any applications on the host where you installed the package. You must restart the host or applications after installing the automatic discovery package for the first time and whenever you make any changes to the configuration file. 

After your applications are running, you can verify your data. See :ref:`auto-discovery-view-results-linux`. You can also configure instrumentation settings. See :ref:`auto-discovery-configure-linux`. 

.. _auto-discovery-configure-linux:

(Optional) Configure the instrumentation
====================================================

You can configure the Splunk Distribution of OpenTelemetry Collector to suit your instrumentation needs. In most cases, modifying the basic configuration is enough to get started.

To learn more, see the following resources:

* Java: :ref:`advanced-java-otel-configuration`.
* Node.js: :ref:`advanced-nodejs-otel-configuration`.

.. _auto-discovery-upgrade-package:

Update automatic discovery and configuration
============================================


.. tabs:: 

    .. tab:: Java

        You can upgrade the package by using the package repository or by using Debian or RPM packages. 

        .. tabs:: 

            .. tab:: Package repository

                If you installed the package using the installer script, or if you configured the Debian or RPM package repositories manually, run the following commands according to your platform. Upgrading the package requires ``root`` privileges. 

                .. tabs:: 

                    .. tab:: Debian

                        Run the following commands:

                        .. code-block:: bash

                            sudo apt-get update
                            sudo apt-get --only-upgrade splunk-otel-auto-instrumentation

                        You might see a prompt to keep or overwrite the configuration file at ``/usr/lib/splunk-instrumentation/instrumentation.conf``. If you choose to overwrite, the configuration file reverts to the default file provided by the upgraded package.

                    .. tab:: RPM

                        For the RPM package management system, run the following commands:

                        yum:

                        .. code-block:: bash

                            sudo yum upgrade splunk-otel-auto-instrumentation

                        dnf: 

                        .. code-block:: bash

                            sudo dnf upgrade splunk-otel-auto-instrumentation

                        zypper:

                        .. code-block:: bash

                            sudo zypper refresh
                            sudo zypper update splunk-otel-auto-instrumentation

                        After you've upgraded the packages, manually start or restart the Java applications on the host for the changes to take effect.

            .. tab:: Debian/RPM packages

                To manually upgrade the package:

                1. Download the ``splunk-auto-auto-instrumentation`` Debian or RPM package for the target system from the :new-page:`GitHub Releases page <https://github.com/signalfx/splunk-otel-collector/releases>`.

                2. Run the following commands to install the package. Replace ``<path to splunk-otel-auto-instrumentation deb/rpm>`` with the local path to the downloaded package:

                .. tabs::

                    .. code-tab:: bash Debian
                    
                        sudo dpkg -i <path to splunk-otel-auto-instrumentation deb>
                    
                    .. code-tab:: bash RPM
                    
                        sudo rpm -Uvh <path to splunk-otel-auto-instrumentation rpm>

                After upgrading the Debian package, you might see a prompt to keep or overwrite the configuration file at ``/usr/lib/splunk-instrumentation/instrumentation.conf``. If you choose to overwrite, the configuration file reverts to the default file provided by the upgraded package.

                You can also upgrade using the same package repositories as the Collector. See :new-page:`Debian or RPM packages <https://docs.splunk.com/Observability/gdi/opentelemetry/install-linux.html#debian-or-rpm-packages>` for more information.

    .. tab:: Node.js 

        To update the Node.js agent to the latest provided version, you must first update the ``splunk-otel-auto-instrumentation`` package.

        You can upgrade the package by using the package repository or by using Debian or RPM packages. 

        .. tabs:: 

            .. tab:: Package repository

                If you installed the package using the installer script, or if you configured the Debian or RPM package repositories manually, run the following commands according to your platform. Upgrading the package requires ``root`` privileges. 

                .. tabs:: 

                    .. tab:: Debian

                        Run the following commands:

                        .. code-block:: bash

                            sudo apt-get update
                            sudo apt-get --only-upgrade splunk-otel-auto-instrumentation

                        You might see a prompt to keep or overwrite the configuration file at ``/usr/lib/splunk-instrumentation/instrumentation.conf``. If you choose to overwrite, the configuration file reverts to the default file provided by the upgraded package.

                    .. tab:: RPM

                        For the RPM package management system, run the following commands:

                        yum:

                        .. code-block:: bash

                            sudo yum upgrade splunk-otel-auto-instrumentation

                        dnf: 

                        .. code-block:: bash

                            sudo dnf upgrade splunk-otel-auto-instrumentation

                        zypper:

                        .. code-block:: bash

                            sudo zypper refresh
                            sudo zypper update splunk-otel-auto-instrumentation

                        After you've upgraded the packages, manually start or restart the Java applications on the host for the changes to take effect.

            .. tab:: Debian/RPM packages

                To manually upgrade the package:

                1. Download the ``splunk-auto-auto-instrumentation`` Debian or RPM package for the target system from the :new-page:`GitHub Releases page <https://github.com/signalfx/splunk-otel-collector/releases>`.

                2. Run the following commands to install the package. Replace ``<path to splunk-otel-auto-instrumentation deb/rpm>`` with the local path to the downloaded package:

                .. tabs::

                    .. code-tab:: bash Debian
                    
                        sudo dpkg -i <path to splunk-otel-auto-instrumentation deb>
                    
                    .. code-tab:: bash RPM
                    
                        sudo rpm -Uvh <path to splunk-otel-auto-instrumentation rpm>

                After upgrading the Debian package, you might see a prompt to keep or overwrite the configuration file at ``/usr/lib/splunk-instrumentation/instrumentation.conf``. If you choose to overwrite, the configuration file reverts to the default file provided by the upgraded package.

                You can also upgrade using the same package repositories as the Collector. See :new-page:`Debian or RPM packages <https://docs.splunk.com/Observability/gdi/opentelemetry/install-linux.html#debian-or-rpm-packages>` for more information.

        After updating the ``splunk-otel-auto-instrumentation`` package, run the following command:

        .. code-block:: bash

            cd /usr/lib/splunk-instrumentation/splunk-otel-js && \
            sudo npm install /usr/lib/splunk-instrumentation/splunk-otel-js.tgz


        The default automatic discovery configuration expects the Node.js agent to be installed under the ``/usr/lib/splunk-instrumentation/splunk-otel-js`` path. 

        If the Node.js agent is installed under a different path, manually update the path for the ``NODE_OPTIONS`` environment variable in either ``/etc/splunk/zeroconfig/node.conf`` for system-wide services or ``/usr/lib/systemd/system.conf.d/00-splunk-otel-auto-instrumentation.conf`` for ``systemd`` services. For example:

        .. code-block:: yaml

            NODE_OPTIONS=-r /custom/nodejs/install/path/@splunk/otel/instrument

.. _auto-discovery-view-results-linux:

View results in Splunk APM
====================================================

After activating automatic discovery, ensure your data is flowing into Splunk Observability Cloud. See :ref:`verify-apm-data`. 
    