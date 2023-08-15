.. _linux-manual:
.. _otel-install-linux-manual:

**************************************************
Install the Collector for Linux manually
**************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Linux manually.

The Splunk Distribution of OpenTelemetry Collector for Linux is a package that provides integrated collection and forwarding for all data types. To install the package manually, read this doc.

.. note:: You can also install the package using :ref:`the installer script <linux-scripts>` or :ref:`deployment and configuration management tools <linux-deployments>`.

Splunk offers the following manual configuration options:

* :ref:`linux-docker`
* :ref:`linux-packages`
* :ref:`linux-binary-file`
* :ref:`linux-tar`

.. _linux-manual-permissions:

Permissions
===================================

You need at least these capabilities to allow the Collector to run without root permissions, regardless of the user:

* ``cap_dac_read_search``: Allows to bypass file read permission checks, and directory read and execute permission checks.
* ``cap_sys_ptrace``: Allows to trace, manage, and transfer data for arbitrary processes.

Learn more about :new-page:`these recommended capabilities <https://man7.org/linux/man-pages/man7/capabilities.7.html>`.  

.. note::   

   Your systems might require higher or more custom permissions.

If you already have ``setcap/libcap2`` installed, the installer script will set these permissions for you. If you don't, use the following ``setcap`` command to install the permissions:

.. code-block:: bash

   setcap CAP_SYS_PTRACE,CAP_DAC_READ_SEARCH=+eip /usr/bin/otelcol

To set custom permissions after the Collector has been installed, use:

.. code-block:: bash 

   setcap {CUSTOM_CAPABILITIES}=+eip /usr/bin/otelcol

.. _linux-docker:

Docker
===================================

The Linux docker image of the Splunk Distribution of OpenTelemetry Collector contains a multiarch manifest that specifies the images for AMD64, ARM64, and ppc64le architectures. Docker uses this manifest to download the correct image for the target platform.

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

See :new-page:`docker-compose.yml <https://github.com/signalfx/splunk-otel-collector/blob/main/examples/docker-compose/docker-compose.yml>` in GitHub to download a ``docker-compose`` example.

.. note:: 
   Ensure that ``ReadonlyRootFileSystem`` is set to ``true`` as the collector needs to write to the container file system on startup.



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

If the custom configuration includes a ``memory_limiter`` processor, then the ``ballast_size_mib`` parameter should be the same as the ``SPLUNK_BALLAST_SIZE_MIB`` environment variable. For example:

.. code-block:: bash

   extensions:
     memory_ballast:
     # In general, the ballast should be set to 1/3 of the Collector's memory.
     # The ballast is a large allocation of memory that provides stability to the heap.
     # The limit should be 90% of the Collector's memory.
     # Specify the ballast size by setting the value of the 
     # SPLUNK_BALLAST_SIZE_MIB env variable.
     # The total memory size must be more than 99 MiB for the Collector to start.
        size_mib: ${SPLUNK_BALLAST_SIZE_MIB}

Use the following configuration to collect and log CPU metrics. The ``cat`` command assigns the ``CONFIG_YAML`` parameter to the YAML. The ``docker run`` command expands and assigns the parameter ``CONFIG_YAML`` to the environment variable ``SPLUNK_CONFIG_YAML``. Note that YAML requires whitespace indentation to be maintained.

.. code-block:: bash

   CONFIG_YAML=$(cat <<-END
   receivers:
      hostmetrics:
         collection_interval: 1s
         scrapers:
            cpu:
   exporters:
      logging:
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

.. _linux-packages:

Debian or RPM packages
===================================

All Intel, AMD, and ARM systemd-based operating systems are supported, including CentOS, Debian, Oracle, Red Hat, and Ubuntu. Manually installing an integration is useful for containerized environments, or if you want to use other common deployment options.

Splunk Observability Cloud provides a default configuration for each installation method. Each installation method has its own set of environment variables, and their values depend on the installation method, as well as your specific needs.

.. note::
   systemctl is the main tool used to examine and control the state of the systemd system and service manager. systemctl is a requirement to run the Collector as a service. If you don't have systemctl, you need to start the Collector manually.

Do the following to install the package using a Debian or RPM package:

#. Set up the package repository and install the package, as shown in the following examples. The first example shows the Debian package and the subsequent examples show the RPM package. A default configuration is installed to /etc/otel/collector/agent_config.yaml, if it does not already exist::

    # Debian
    curl -sSL https://splunk.jfrog.io/splunk/otel-collector-deb/splunk-B3CD4420.gpg > /etc/apt/trusted.gpg.d/splunk.gpg
    echo 'deb https://splunk.jfrog.io/splunk/otel-collector-deb release main' > /etc/apt/sources.list.d/splunk-otel-collector.list
    apt-get update
    apt-get install -y splunk-otel-collector

    # RPM with yum
    yum install -y libcap
    # Required for activating cap_dac_read_search and cap_sys_ptrace capabilities.

    cat <<EOH > /etc/yum.repos.d/splunk-otel-collector.repo
    [splunk-otel-collector]
    name=Splunk Distribution of OpenTelemetry Collector Repository
    baseurl=https://splunk.jfrog.io/splunk/otel-collector-rpm/release/\$basearch
    gpgcheck=1
    gpgkey=https://splunk.jfrog.io/splunk/otel-collector-rpm/splunk-B3CD4420.pub
    enabled=1
    EOH

    yum install -y splunk-otel-collector

    # RPM with dnf
    dnf install -y libcap
    # Required for activating cap_dac_read_search and cap_sys_ptrace capabilities.

    cat <<EOH > /etc/yum.repos.d/splunk-otel-collector.repo
    [splunk-otel-collector]
    name=Splunk Distribution of OpenTelemetry Collector Repository
    baseurl=https://splunk.jfrog.io/splunk/otel-collector-rpm/release/\$basearch
    gpgcheck=1
    gpgkey=https://splunk.jfrog.io/splunk/otel-collector-rpm/splunk-B3CD4420.pub
    enabled=1
    EOH

    dnf install -y splunk-otel-collector

    # RPM with zypper
    zypper install -y libcap-progs
    # Required for activating cap_dac_read_search and cap_sys_ptrace capabilities.

    cat <<EOH > /etc/zypp/repos.d/splunk-otel-collector.repo
    [splunk-otel-collector]
    name=Splunk Distribution of OpenTelemetry Collector Repository
    baseurl=https://splunk.jfrog.io/splunk/otel-collector-rpm/release/\$basearch
    gpgcheck=1
    gpgkey=https://splunk.jfrog.io/splunk/otel-collector-rpm/splunk-B3CD4420.pub
    enabled=1
    EOH

    zypper install -y splunk-otel-collector
#. Configure the splunk-otel-collector.conf environment file with the appropriate variables. You need this environment file to start the ``splunk-otel-collector`` systemd service. When you install the package in step 1, a sample environment file is installed to /etc/otel/collector/splunk-otel-collector.conf.example. This file includes the required environment variables for the default configuration.
#. Run ``sudo systemctl restart splunk-otel-collector.service`` to start or restart the service.

.. _linux-binary-file:

Binary file
===================================

To install the Collector using the binary file, follow these steps:

#. Download the binary for your architecture from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.

#. If you're not using an existing or custom config file, download the :new-page:`default config file <https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector>`` for the Collector. See more at :ref:`otel-configuration-ootb`.

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

* :ref:`Configure the Collector <otel-configuration>`.
* Use :ref:`Infrastructure Monitoring <get-started-infrastructure>` to track the health of your infrastructure.
* Use :ref:`APM <get-started-apm>` to monitor the performance of applications.
* Use :ref:`Log Observer Connect <logs-intro-logconnect>` to analyze log events and troubleshoot issues with your services.
