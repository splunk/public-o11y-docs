.. _linux-manual:
.. _otel-install-linux-manual:

**************************************************
Install the Collector for Linux manually
**************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Linux manually.

The Splunk Distribution of the OpenTelemetry Collector for Linux is a package that provides integrated collection and forwarding for all data types. To install the package manually, read this doc.

.. note:: You can also install the package using :ref:`the installer script <linux-scripts>` or :ref:`deployment and configuration management tools <linux-deployments>`.

Splunk offers the following manual configuration options:

* :ref:`linux-packages-repo`
* :ref:`linux-docker`
* :ref:`linux-binary-file`
* :ref:`linux-tar`

.. _linux-manual-permissions:

Permissions
===================================

You need at least these capabilities to allow the Collector to run without root permissions, regardless of the user:

* ``cap_dac_read_search``: Allows to bypass file read permission checks, and directory read and execute permission checks.
* ``cap_sys_ptrace``: Allows to trace, manage, and transfer data for arbitrary processes.

Learn more about these recommended capabilities in :new-page:`Linux capabilities - manual page <https://man7.org/linux/man-pages/man7/capabilities.7.html>`.  

.. note::   

   Your systems might require higher or more custom permissions.

If you already have ``setcap/libcap2`` installed, the installer script will set these permissions for you. If you don't, use the following ``setcap`` command to install the permissions:

.. code-block:: bash

   setcap CAP_SYS_PTRACE,CAP_DAC_READ_SEARCH=+eip /usr/bin/otelcol

To set custom permissions after the Collector has been installed, use:

.. code-block:: bash 

   setcap {CUSTOM_CAPABILITIES}=+eip /usr/bin/otelcol

.. _linux-manual-env-var:

Environmental variables
===================================

If you use :ref:`linux-docker`, :ref:`linux-binary-file`, or :ref:`linux-tar`, you can use environmental variables to configure the Collector. The following environmental variables are required:

* ``SPLUNK_REALM`` (no default): Which realm to send the data to. For example: ``us0``.
* ``SPLUNK_ACCESS_TOKEN`` (no default): Access token to authenticate requests.

.. _linux-packages-repo:

Install the Collector for Linux with package repositories
=================================================================

Splunk Observability Cloud supports all Intel, AMD, and ARM systemd-based operating systems, including CentOS, Debian, Oracle, Red Hat, and Ubuntu. Manually installing an integration is useful for containerized environments, or if you want to use other common deployment options.

Each installation method comes with a default configuration with its own set of environment variables, and their values depend on the installation method, as well as your specific needs.

.. caution:: You need ``systemctl`` to run the Collector as a service, since it's the main tool used to examine and control the state of the systemd system and service manager. Otherwise, you need to run the Collector. 

.. _linux-packages-debian:

Install the Collector for Linux with Debian
--------------------------------------------------------------

To install the Collector for Linux using a Debian package, set up the package repository and install the Collector package:

.. code-block:: bash

   curl -sSL https://splunk.jfrog.io/splunk/otel-collector-deb/splunk-B3CD4420.gpg > /etc/apt/trusted.gpg.d/splunk.gpg
   echo 'deb https://splunk.jfrog.io/splunk/otel-collector-deb release main' > /etc/apt/sources.list.d/splunk-otel-collector.list
   apt-get update
   apt-get install -y splunk-otel-collector

   # Optional: install Splunk OpenTelemetry Auto Instrumentation
   apt-get install -y splunk-otel-auto-instrumentation

See also:

* :ref:`linux-packages-post`
* :ref:`linux-packages-auto`
* :ref:`linux-packages-fluentd`

.. _linux-packages-rpm:

Install the Collector for Linux with RPM
--------------------------------------------------------------

To install the Collector for Linux using a RPM package, set up the package repository and install the Collector package:

.. tabs:: 

   .. tab:: yum 

      .. code-block:: bash

         yum install -y libcap  # Required for enabling cap_dac_read_search and cap_sys_ptrace capabilities on the Collector

         cat <<EOH > /etc/yum.repos.d/splunk-otel-collector.repo
         [splunk-otel-collector]
         name=Splunk OpenTelemetry Collector Repository
         baseurl=https://splunk.jfrog.io/splunk/otel-collector-rpm/release/\$basearch
         gpgcheck=1
         gpgkey=https://splunk.jfrog.io/splunk/otel-collector-rpm/splunk-B3CD4420.pub
         enabled=1
         EOH

         yum install -y splunk-otel-collector

         # Optional: install Splunk OpenTelemetry Auto Instrumentation
         yum install -y splunk-otel-auto-instrumentation

   .. tab:: dnf 

      .. code-block:: bash

         dnf install -y libcap  # Required for enabling cap_dac_read_search and cap_sys_ptrace capabilities on the Collector

         cat <<EOH > /etc/yum.repos.d/splunk-otel-collector.repo
         [splunk-otel-collector]
         name=Splunk OpenTelemetry Collector Repository
         baseurl=https://splunk.jfrog.io/splunk/otel-collector-rpm/release/\$basearch
         gpgcheck=1
         gpgkey=https://splunk.jfrog.io/splunk/otel-collector-rpm/splunk-B3CD4420.pub
         enabled=1
         EOH

         dnf install -y splunk-otel-collector

         # Optional: install Splunk OpenTelemetry Auto Instrumentation
         dnf install -y splunk-otel-auto-instrumentation

   .. tab:: zypper 

      .. code-block:: bash

         zypper install -y libcap-progs  # Required for enabling cap_dac_read_search and cap_sys_ptrace capabilities on the Collector

         cat <<EOH > /etc/zypp/repos.d/splunk-otel-collector.repo
         [splunk-otel-collector]
         name=Splunk OpenTelemetry Collector Repository
         baseurl=https://splunk.jfrog.io/splunk/otel-collector-rpm/release/\$basearch
         gpgcheck=1
         gpgkey=https://splunk.jfrog.io/splunk/otel-collector-rpm/splunk-B3CD4420.pub
         enabled=1
         EOH

         zypper install -y splunk-otel-collector

         # Optional: install Splunk OpenTelemetry Auto Instrumentation
         zypper install -y splunk-otel-auto-instrumentation

See also:

* :ref:`linux-packages-post`
* :ref:`linux-packages-auto`
* :ref:`linux-packages-fluentd`

.. _linux-packages:

Install the Collector for Linux with downloaded packages
--------------------------------------------------------------

If you prefer to install the Collector without the installer script or the Debian/RPM repositories, download the individual Debian or RPM package from the GitHub releases page and install it as shown below. 

Note that:

* You need to have root privileges.
* Find the releases in GitHub at :new-page:`Splunk OTel Collector releases <https://github.com/signalfx/splunk-otel-collector/releases>`.
* To install the ``setcap`` dependency and the Collector package, replace ``<path to splunk-otel-collector deb/rpm>`` with the local path to the downloaded Collector package.

.. tabs:: 

   .. tab:: Debian 

      .. code-block:: bash

         apt-get update && apt-get install -y libcap2-bin  # Required for enabling cap_dac_read_search and cap_sys_ptrace capabilities on the Collector
         dpkg -i <path to splunk-otel-collector deb>

   .. tab:: RPM with yum 

      .. code-block:: bash

         yum install -y libcap  # Required for enabling cap_dac_read_search and cap_sys_ptrace capabilities on the Collector
         rpm -ivh <path to splunk-otel-collector rpm>

   .. tab:: RPM with dnf 

      .. code-block:: bash

         dnf install -y libcap  # Required for enabling cap_dac_read_search and cap_sys_ptrace capabilities on the Collector
         rpm -ivh <path to splunk-otel-collector rpm>

   .. tab:: RPM with zypper 

      .. code-block:: bash         

         zypper install -y libcap-progs  # Required for enabling cap_dac_read_search and cap_sys_ptrace capabilities on the Collector
         rpm -ivh <path to splunk-otel-collector rpm>

See also:

* :ref:`linux-packages-post`
* :ref:`linux-packages-auto`
* :ref:`linux-packages-fluentd`

.. _linux-packages-post:

Post-install configuration for Debian/RPM 
--------------------------------------------------------------

The following applies:

* The default configuration file is installed in /etc/otel/collector/agent_config.yaml, if it doesn't already exist.

* The /etc/otel/collector/splunk-otel-collector.conf environment file is required to start the ``splunk-otel-collector`` systemd service.

  * The service automatically starts if this file exists during install or upgrade. 

  * A sample environment file is installed to /etc/otel/collector/splunk-otel-collector.conf.example, and it includes the required environment variables for the default config. To use this sample file, set the variables as you require, and save the file as /etc/otel/collector/splunk-otel-collector.conf.

* You must restart the service for any changes to the config file or environment file to take effect. To start or restart the service, run:

   .. code-block:: 

      sudo systemctl restart splunk-otel-collector


* To check the splunk-otel-collector service status, run:

   .. code-block:: 

      sudo systemctl status splunk-otel-collector

* To view the ``splunk-otel-collector`` service logs and errors in the ``systemd`` journal run:

   .. code-block:: 

      sudo journalctl -u splunk-otel-collector

.. _linux-packages-auto:

Auto Instrumentation with Debian and RPM packages
--------------------------------------------------------------

If you prefer to install the Collector without the installer script or the Debian/RPM repositories, download the individual Debian or RPM package from the GitHub releases page and install it as shown below. 

Note that:

* You need to have root privileges.
* Download the appropriate ``splunk-otel-auto-instrumentation`` Debian or RPM package for the target system in GitHub at :new-page:`Splunk OTel Collector releases <https://github.com/signalfx/splunk-otel-collector/releases>`.
* Replace ``<path to splunk-otel-auto-instrumentation deb/rpm>`` with the local path to the downloaded Auto Instrumentation package.

Run the following commands to install the Auto Instrumentation package:

.. tabs:: 

   .. tab:: Debian 

      .. code-block:: bash

         dpkg -i <path to splunk-otel-auto-instrumentation deb>

   .. tab:: RPM 

      .. code-block:: bash

         rpm -ivh <path to splunk-otel-auto-instrumentation rpm>

To upgrade the Auto Instrumentation package, run:

.. tabs:: 

   .. tab:: Debian 

      .. code-block:: bash

         sudo dpkg -i <path to splunk-otel-auto-instrumentation deb>

   .. tab:: RPM 

      .. code-block:: bash

         sudo rpm -Uvh <path to splunk-otel-auto-instrumentation rpm>

Auto Instrumentation agents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``splunk-otel-auto-instrumentation`` deb/rpm package installs and supports configuration for the following Auto Instrumentation agents:

* :ref:`auto-instrumentation-java`
* :ref:`auto-instrumentation-nodejs`

.. _linux-packages-fluentd:

Install and configure Fluentd for log collection
--------------------------------------------------------------

If you require log collection, perform the following steps to install Fluentd and forward collected log events to the Collector. This requires root privileges.

#. Install, configure, and start the Collector as described in :ref:`linux-packages-repo`. The Collector's default configuration file listens for log events on ``127.0.0.1:8006`` and sends them to Splunk Observability Cloud.

#. Install the ``td-agent`` package appropriate for the Linux distribution/version of the target system. Find the package in :new-page:`Fluentd installation <https://docs.fluentd.org/installation>`. 

   * If necessary, install the ``capng_c`` plugin and dependencies to enable Linux capabilities, for example ``cap_dac_read_search`` and/or ``cap_dac_override``. This requires ``td-agent`` version 4.1 or higher. See :new-page:`Linux capabilities <https://docs.fluentd.org/deployment/linux-capability>`.

   * If necessary, install the ``fluent-plugin-systemd`` plugin to collect log events from the systemd journal. See :new-page:`Fluent plugin systemd <https://github.com/fluent-plugin-systemd/fluent-plugin-systemd>`.

#. Configure Fluentd to collect log events and forward them to the Collector:

   * Option 1: Update the default config file at /etc/td-agent/td-agent.conf provided by the Fluentd package to collect the desired log events and forward them to ``127.0.0.1:8006``.

   * Option 2: The installed Collector package provides a custom Fluentd config file /etc/otel/collector/fluentd/fluent.conf to collect log events from many popular services and forwards them to ``127.0.0.1:8006``. To use these files, you need to override the default config file path for the Fluentd service. To do this, copy the systemd environment file from /etc/otel/collector/fluentd/splunk-otel-collector.conf to /etc/systemd/system/td-agent.service.d/splunk-otel-collector.conf.

#. Ensure that the ``td-agent`` service user/group has permissions to access to the config file(s) from the previous step.

#. Restart the Fluentd service to apply the changes by running ``systemctl restart td-agent``.

#. View Fluentd service logs and errors in /var/log/td-agent/td-agent.log.

See :new-page:`Fluentd configuration <https://docs.fluentd.org/configuration>` for general Fluentd configuration details.

.. _linux-docker:

Docker
===================================

The Linux docker image of the Splunk Distribution of the OpenTelemetry Collector contains a multiarch manifest that specifies the images for AMD64, ARM64, and ppc64le architectures. Docker uses this manifest to download the correct image for the target platform.

Run the following command to install the package using Docker:

.. code-block:: bash

   docker run --rm -e SPLUNK_ACCESS_TOKEN=12345 -e SPLUNK_REALM=us0 \
       -p 13133:13133 -p 14250:14250 -p 14268:14268 -p 4317:4317 -p 6060:6060 \
       -p 7276:7276 -p 8888:8888 -p 9080:9080 -p 9411:9411 -p 9943:9943 \
       --name otelcol quay.io/signalfx/splunk-otel-collector:latest
       # Use a semantic versioning (semver) tag instead of the ``latest`` tag.
       # Semantic versioning is a formal convention for determining the version
       # number of new software releases.

The following list provides more information on the ``docker run`` command options:

* ``--rm`` automatically removes the container when it exits.
* ``-e`` sets simple (non-array) environment variables in the container you're running, or overwrite variables that are defined in the Dockerfile of the image you're running.
* ``-p`` publishes a container's port(s) to the host.

Run the following command to run an interactive bash shell on the container and see the status of the Collector:

.. code-block:: bash

   docker exec -it containerID bash

.. note:: 
   If you are running the Collector in ``--read-only`` mode and using any Smart Agent receiver's legacy collectd monitor types, you need to provide a writable config directory similar to ``--read-only --tmpfs /usr/lib/splunk-otel-collector/agent-bundle/run:uid=999,gid=999`` (default) or as configured by the Smart Agent extension's ``collectd::configDir`` path.

Create a custom Docker configuration
--------------------------------------------------------------

You can provide a custom configuration file instead of the default configuration file. Use the environment variable ``SPLUNK_CONFIG`` or the ``--config`` command line argument to provide the path to this file.

You can also use the environment variable ``SPLUNK_CONFIG_YAML`` to specify your custom configuration file at the command line. This is useful in environments where access to the underlying file system is not readily available. For example, in AWS Fargate, you can store your custom configuration YAML in a parameter in the AWS Systems Manager Parameter Store, then in your container definition specify ``SPLUNK_CONFIG_YAML`` to get the configuration from the parameter.

Command line arguments take precedence over environment variables. This applies to ``--config`` and ``--mem-ballast-size-mib``. ``SPLUNK_CONFIG`` takes precedence over ``SPLUNK_CONFIG_YAML``. For example:

.. code-block:: bash

   docker run --rm -e SPLUNK_ACCESS_TOKEN=12345 -e SPLUNK_REALM=us0 \
       -e SPLUNK_CONFIG=/etc/collector.yaml -p 13133:13133 -p 14250:14250 \
       -p 14268:14268 -p 4317:4317 -p 6060:6060 -p 8888:8888 \
       -p 9080:9080 -p 9411:9411 -p 9943:9943 \
       -v "${PWD}/collector.yaml":/etc/collector.yaml:ro \
       # A volume mount might be required to load the custom configuration file.
       --name otelcol quay.io/signalfx/splunk-otel-collector:latest
       # Use a semantic versioning (semver) tag instead of the ``latest`` tag.
       # Semantic versioning is a formal convention for determining the version
       # number of new software releases.

Use the following configuration to collect and log CPU metrics. The ``cat`` command assigns the ``CONFIG_YAML`` parameter to the YAML. The ``docker run`` command expands and assigns the parameter ``CONFIG_YAML`` to the environment variable ``SPLUNK_CONFIG_YAML``. Note that YAML requires whitespace indentation to be maintained.

.. code-block:: bash

   CONFIG_YAML=$(cat <<-END
   receivers:
      hostmetrics:
         collection_interval: 1s
         scrapers:
            cpu:
   exporters:
      debug:
         # Can be changed to info
         verbosity: detailed
   service:
      pipelines:
         metrics:
            receivers: [hostmetrics]
            exporters: [logging]
   END
   )

   docker run --rm \
       -e SPLUNK_CONFIG_YAML=${CONFIG_YAML} \
       --name otelcol quay.io/signalfx/splunk-otel-collector:latest
       # Use a semantic versioning (semver) tag instead of the ``latest`` tag.
       # Semantic versioning is a formal convention for determining the version
       # number of new software releases.

.. _linux-binary-file:

Binary file
===================================

To install the Collector using the binary file, follow these steps:

#. Download the binary for your architecture from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.

#. If you're not using an existing or custom config file, download the :new-page:`default config file <https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector>` for the Collector. See more at :ref:`linux-config-ootb`.

#. Run the binary from the command line:

.. code-block:: bash

   # see available command-line options
   $ <download dir>/otelcol_<platform>_<arch> --help
   Usage of otelcol:
      --config string          Locations to the config file(s), note that only a single location can be set per flag entry e.g. --config=/path/to/first --config=path/to/second. (default "[]")
      --feature-gates string   Comma-delimited list of feature gate identifiers. Prefix with '-' to disable the feature. '+' or no prefix will enable the feature. (default "[]")
      --no-convert-config      Do not translate old configurations to the new format automatically. By default, old configurations are translated to the new format for backward compatibility.
      --set string             Set arbitrary component config property. The component has to be defined in the config file and the flag has a higher precedence. Array config properties are overridden and maps are joined. Example --set=processors.batch.timeout=2s (default "[]")
      -v, --version                Version of the collector.

   # start the collector with the SPLUNK_REALM and SPLUNK_ACCESS_TOKEN env vars required in our default config files
   $ SPLUNK_REALM=<realm> SPLUNK_ACCESS_TOKEN=<token> <download dir>/otelcol_<platform>_<arch> --config=<path to config file>

   # alternatively, use the SPLUNK_CONFIG env var instead of the --config command-line option
   $ SPLUNK_CONFIG=<path to config file> SPLUNK_REALM=<realm> SPLUNK_ACCESS_TOKEN=<token> <download dir>/otelcol_<platform>_<arch>

   # type Ctrl-c to stop the collector

.. _linux-tar:

Tar file
===================================

The tar.gz archive of the distribution is also available. It contains the default agent and gateway configuration files, which include the environment variables. 

To use the tar file:

#. Unarchive it to a directory of your choice on the target system.

.. code-block:: bash

   tar xzf splunk-otel-collector_<version>_<arch>.tar.gz
   
#. On ``amd64`` systems, go into the unarchived ``agent-bundle`` directory and run ``bin/patch-interpreter $(pwd)``. This ensures that the binaries in the bundle have the right loader set on them, since your host's loader might not be compatible.

Working on non-default locations
--------------------------------------------------------------

If you're running the Collector from a non-default location, the Smart Agent receiver and agent configuration file require that you set two environment variables currently used in the Smart Agent extension:

* ``SPLUNK_BUNDLE_DIR``: The path to the Smart Agent bundle. For example, ``/usr/lib/splunk-otel-collector/agent-bundle``.
* ``SPLUNK_COLLECTD_DIR``: The path to the ``collectd`` config directory for the Smart Agent. For example, ``/usr/lib/splunk-otel-collector/agent-bundle/run/collectd``. 

Next steps
==================================

After you've installed the Collector, you can perform these actions:

* Use :ref:`Infrastructure Monitoring <get-started-infrastructure>` to track the health of your infrastructure.
* Use :ref:`APM <get-started-apm>` to monitor the performance of applications.
* Use :ref:`Log Observer Connect <logs-intro-logconnect>` to analyze log events and troubleshoot issues with your services.
