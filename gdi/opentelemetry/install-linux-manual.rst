.. _linux-manual:

**************************************************
Install the Collector for Linux manually
**************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Linux manually.

The Splunk Distribution of OpenTelemetry Collector for Linux is a package that provides integrated collection and forwarding for all data types. 

Install the package using one of these methods:

* :ref:`Use the installer script <linux-scripts>`
* :ref:`Use deployment and configuration management tools <linux-deployments>`

.. _linux-deployments:

Deployments
====================

Splunk offers the configuration management options described in this section.

.. _linux-amazon-ecs-ec2:

Amazon ECS EC2
--------------------------------

.. note::

   Available for Prometheus only.

Splunk provides a task definition to deploy the Splunk Distribution of OpenTelemetry Collector to ECS EC2. The task definition is a text file, in JSON format, that describes one or more containers that form your application. See :ref:`deployments-ecs-ec2` for the installation instructions.

.. _linux-amazon-fargate:

Amazon Fargate
---------------------------
.. note::

   Available for Prometheus only. Not yet available for Amazon EKS.

Splunk provides a guided setup to deploy the Splunk Distribution of OpenTelemetry Collector on Amazon Fargate as a sidecar (additional container) to Amazon ECS tasks. See :ref:`deployments-fargate` for the installation instructions.

.. _linux-ansible:

Ansible
-------------------
Splunk provides an Ansible role that installs the package configured to collect data (metrics, traces, and logs) from Linux machines and send that data to Observability Cloud. See :ref:`deployment-linux-ansible` for the instructions to download and customize the role.

.. _linux-chef:

Chef 
----------------
Splunk provides a cookbook to install the Collector using Chef. See :ref:`deployments-chef` for the installation instructions.

.. _linux-heroku:

Heroku
--------------------
The Splunk Distribution of OpenTelemetry Collector for Heroku is a buildpack for the Collector. The buildpack installs and runs the Collector on a Dyno to receive, process, and export metric and trace data for Splunk Observability Cloud. See :new-page:`Heroku <https://docs.splunk.com/Observability/gdi/heroku/heroku.html>` for the steps to install the buildpack.

.. _linux-nomad:

Nomad 
-----------------
Use Nomad to to deploy the Collector. See :ref:`deployments-nomad` for the installation instructions.

.. _linux-pcf:

Pivotal Cloud Foundry
-------------------------------

You can use one of these three options to deploy the Collector with Pivotal Cloud Foundry (PCF):

* Collector standalone deployment.
* Collector as a sidecar to your app. 
* Tanzu Tile.

See more in :ref:`deployments-pivotal-cloudfoundry`.

.. _linux-puppet:

Puppet
-------------------------------
Splunk provides a Puppet module to install and configure the package. A module is a collection of resources, classes, files, definition, and templates. See :ref:`deployment-linux-puppet` for the instructions to download and customize the module.

.. _linux-salt:

Salt
---------------
Splunk provides a Salt formula to install and configure the Collector. See :ref:`deployments-salt` for the instructions.

.. _linux-manual:

Install the Collector manually
===================================

Splunk offers the manual configuration options described in this section:

* :ref:`linux-docker`
* :ref:`linux-packages`
* :ref:`linux-binary-file`
* :ref:`linux-tar`

.. _linux-manual-permissions:

Permissions
----------------

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
----------------

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

Create a custom Docker configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
-------------------------------

All Intel, AMD, and ARM systemd-based operating systems are supported, including CentOS, Debian, Oracle, Red Hat, and Ubuntu. Manually installing an integration is useful for containerized environments, or if you want to use other common deployment options.

Observability Cloud provides a default configuration for each installation method. Each installation method has its own set of environment variables, and their values depend on the installation method, as well as your specific needs.

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
-----------------------
Download pre-built binaries (``otelcol_linux_amd64`` or ``otelcol_linux_arm64``) from :new-page:`GitHub releases <https://github.com/signalfx/splunk-otel-collector/releases>`.

.. _linux-tar:

Tar file
-----------------------

The tar.gz archive of the distribution is also available. It contains the default agent and gateway configuration files, which include the environment variables. 

To use the tar file:

#. Unarchive it to a directory of your choice on the target system.

.. code-block:: bash

   tar xzf splunk-otel-collector_<version>_<arch>.tar.gz
   
#. On ``amd64`` systems, go into the unarchived ``agent-bundle`` directory and run ``bin/patch-interpreter $(pwd)``. This ensures that the binaries in the bundle have the right loader set on them, since your host's loader might not be compatible.

Working on non-default locations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you're running the Collector from a non-default location, the Smart Agent receiver and agent configuration file require that you set two environment variables currently used in the Smart Agent extension:

* ``SPLUNK_BUNDLE_DIR``: The path to the Smart Agent bundle. For example, ``/usr/lib/splunk-otel-collector/agent-bundle``.
* ``SPLUNK_COLLECTD_DIR``: The path to the ``collectd`` config directory for the Smart Agent. For example, ``/usr/lib/splunk-otel-collector/agent-bundle/run/collectd``. 

More options
==================================
Once you have installed the package, you can perform these actions:

* :new-page:`Get started using Log Observer <https://quickdraw.splunk.com/redirect/?product=Observability&location=log.observer.setup&version=current>`.
* :ref:`apm`.
