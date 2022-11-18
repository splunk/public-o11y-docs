.. _auto-instrumentation-java:

*****************************************************************************
Splunk OpenTelemetry Zero Configuration Auto Instrumentation for Java
*****************************************************************************

.. meta::
   :description: Use automatic instrumentation to send traces to Splunk APM without altering your code.

Splunk OpenTelemetry Zero Configuration Auto Instrumentation for Java provides a package that automatically instruments your local Java applications to capture and report distributed traces to the Splunk Distribution of OpenTelemetry Collector, and then on to Splunk APM.

Splunk OpenTelemetry Zero Configuration Auto Instrumentation for Java provides the following benefits:

- You can start streaming traces and monitor distributed applications with Splunk APM in minutes.
- You don't need to configure or instrument your Java back-end services or applications before deployment.

.. _install-the-package:

Install the package
=========================================================

You can install the package in two ways:

- :ref:`install-with-script`
- :ref:`install-manually`

.. _install-with-script:

Install using the Collector installer script
---------------------------------------------

By default, the installer script only installs the Collector. If the ``--with-instrumentation`` option is specified, the installer script also installs the agent from the Splunk Distribution of OpenTelemetry Java, which is then loaded automatically when a Java application starts on the local machine.

Run the installer script with the ``--with-instrumentation`` option, as shown in the following example:

.. code-block:: yaml

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
   sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

To automatically define the optional ``deployment.environment`` resource attribute at installation time, run the installer script with the ``--deployment-environment <VALUE>`` option. Replace ``<VALUE>`` with the desired attribute value, for example, ``prod``, as shown in the following example:

.. code-block:: yaml

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
   sudo sh /tmp/splunk-otel-collector.sh --with-instrumentation --deployment-environment prod --realm <SPLUNK_REALM> -- <SPLUNK_ACCESS_TOKEN>

See :ref:`configure-the-script` for the supported configuration parameters.

After successful installation, the Java applications on the host need to be manually started or restarted for automatic instrumentation to take effect.

.. _install-manually:

Install using Debian or RPM packages
---------------------------------------------

Follow these steps to install the package using the Debian or RPM repositories with ``root`` privileges:

1. Download the ``splunk-otel-auto-instrumentation`` Debian or RPM package for the target system from the :new-page:`GitHub Releases page <https://github.com/signalfx/splunk-otel-collector/releases>`.

2. Run the following commands to install the package. Replace ``<path to splunk-otel-auto-instrumentation deb/rpm>`` with the local path to the downloaded package.

.. tabs::

   .. code-tab:: bash Debian
      
      dpkg -i <path to splunk-otel-auto-instrumentation deb>
      
   .. code-tab:: bash RPM
      
      rpm -ivh <path to splunk-otel-auto-instrumentation rpm>

3. See :ref:`configure-the-script` for additional details.

You can also install the ``splunk-otel-auto-instrumentation`` package using the same package repositories as the Collector. See :new-page:`Debian or RPM packages <https://docs.splunk.com/Observability/gdi/opentelemetry/install-linux.html#debian-or-rpm-packages>` for more information.

Configuration file of the package
---------------------------------------------

The package includes the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file, which is read by the shared object library ``libsplunk.so`` when applications are started. The .so library, which is installed with the configuration file and the JAR file, is a set of files used by multiple applications. 

By default, the configuration file looks like the following example:

.. code-block:: yaml

   java_agent_jar=/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar

The ``java_agent_jar`` parameter points to the default location of the JAR file. See :ref:`configure-the-script` for more information on the supported parameters.

.. _configure-the-script:

Supported parameters
====================================

The following table shows the supported parameters for the ``/usr/lib/splunk-instrumentation/instrumentation.conf`` file:

.. list-table::       
   :header-rows: 1
   :widths: 20 60 20
   :width: 100%
   
   * - Parameter
     - Description
     - Required
   * - ``java_agent_jar``
     - The full path to the JAR file provided by the installer.
     -  Yes
   * - ``service_name``
     - Optional override for the service name that is generated by the shared object before Java startup. By default, this line is commented out, but can be uncommented to override the generated name. If this parameter is set, all instrumented Java applications on the host have their service name set using the  ``OTEL_SERVICE_NAME`` environment variable. 
     - No
   * - ``resource_attributes`` 
     - Contains a list of name-value pairs, separated by ``=s``, that the shared object sets to the ``RESOURCE_ATTRIBUTES`` environment variable. The ``RESOURCE_ATTRIBUTES`` environment variable is then picked up by the Java instrumentation JAR file. The installer script sets this to something like ``resource_attributes=deployment.environment=test``, which defines the deployment environment.
     - No  

Keep the following information in mind after the installation:

- The ``/etc/ld.so.preload`` file is automatically created or updated with the default path to the installed instrumentation library, which is ``/usr/lib/splunk-instrumentation/libsplunk.so``. If necessary, custom library paths can be manually added to this file.
- The ``/usr/lib/splunk-instrumentation/instrumentation.conf`` configuration file can be manually configured for resource attributes and other parameters. By default, this file contains the ``java_agent_jar`` parameter set to the path of the installed :new-page:`Java Instrumentation Agent <https://github.com/signalfx/splunk-otel-java>`, which is ``/usr/lib/splunk-instrumentation/splunk-otel-javaagent.jar``. If the ``--deployment-environment VALUE`` installer script option is specified, the ``deployment.environment=VALUE`` resource attribute is automatically added to this file.

After any configuration changes, the Java applications on the host need to be manually started or restarted to source the updated values from the configuration file.

.. _upgrade-the-package:

Upgrade the package
==========================

You can upgrade the package in two ways:

- :ref:`upgrade-with-script`
- :ref:`upgrade-manually`

.. _upgrade-with-script:

Upgrade using the package repository
---------------------------------------------

If you installed the package using the installer script, or if you configured the Debian or RPM package repositories manually, run the following commands according to your platform. Upgrading the package requires ``root`` privileges. 

Debian
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the following commands:

.. code-block:: bash

   sudo apt-get update
   sudo apt-get --only-upgrade splunk-otel-auto-instrumentation

You might be prompted to keep or overwrite the configuration file at ``/usr/lib/splunk-instrumentation/instrumentation.conf``. If you choose to overwrite, the configuration file reverts to the default file provided by the upgraded package.

RPM
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For the RPM package management system, run the following commands:

yum
##############################

.. code-block:: bash

   sudo yum upgrade splunk-otel-auto-instrumentation

dnf
###################

.. code-block:: bash

   sudo dnf upgrade splunk-otel-auto-instrumentation

zypper
################

.. code-block:: bash

   sudo zypper refresh
   sudo zypper update splunk-otel-auto-instrumentation

After you've upgraded the packages, manually start or restart the Java applications on the host for the changes to take effect.

.. _upgrade-manually:

Upgrade using Debian or RPM packages
---------------------------------------------

To manually upgrade the package:

1. Download the ``splunk-auto-auto-instrumentation`` Debian or RPM package for the target system from the :new-page:`GitHub Releases page <https://github.com/signalfx/splunk-otel-collector/releases>`.

2. Run the following commands to install the package. Replace ``<path to splunk-otel-auto-instrumentation deb/rpm>`` with the local path to the downloaded package:

   .. tabs::

      .. code-tab:: bash Debian
      
         sudo dpkg -i <path to splunk-otel-auto-instrumentation deb>
      
      .. code-tab:: bash RPM
      
         sudo rpm -Uvh <path to splunk-otel-auto-instrumentation rpm>

After upgrading the Debian package, you might be prompted to keep or overwrite the configuration file at ``/usr/lib/splunk-instrumentation/instrumentation.conf``. If you choose to overwrite, the configuration file reverts to the default file provided by the upgraded package.

You can also upgrade using the same package repositories as the Collector. See :new-page:`Debian or RPM packages <https://docs.splunk.com/Observability/gdi/opentelemetry/install-linux.html#debian-or-rpm-packages>` for more information.

Disable automatic instrumentation
=========================================

Use one of the following options to disable automatic instrumentation:

- Uninstall the package by running ``curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \sudo sh /tmp/splunk-otel-collector.sh --uninstall``. See :ref:`otel-linux-uninstall-otel-and-tdagent` for more information on the files deleted by the uninstall.

- Set ``DISABLE_SPLUNK_AUTOINSTRUMENTATION`` to any non-empty value other than ``false``, ``FALSE``, or ``0``.

- Set the ``JAVA_TOOL_OPTIONS`` environment variable to some value that you want the JVM to pick up.

- Delete or move the ``instrumentation.conf`` configuration file.

.. include:: /_includes/troubleshooting-steps.rst
