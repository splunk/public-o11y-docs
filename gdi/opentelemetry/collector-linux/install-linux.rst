.. _otel-install-linux:

***************************************************************
Install the Collector for Linux with the installer script
***************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Linux using the script or deployment tools.

The Splunk Distribution of the OpenTelemetry Collector for Linux is a package that provides integrated collection and forwarding for all data types.

Install the package using one of these methods:

* :ref:`Use the installer script <linux-scripts>`, as described in this document
* :ref:`Use deployment and configuration management tools <linux-deployments>`
* :ref:`Install the Collector for Linux manually <linux-manual>`

.. _linux-otel-packages:

Supported versions
=================================

.. include:: /_includes/requirements/collector-linux.rst

Included packages
==========================

The installer script deploys and configures these elements:

* The Splunk Distribution of the OpenTelemetry Collector for Linux
* Fluentd, using the td-agent. Turned off by default. See :ref:`fluentd-manual-config-linux` and :ref:`fluentd-receiver` for more information
* JMX metric gatherer
  
.. _linux-scripts:

Install the Collector using the installer script
===================================================

To install the Collector package using the installer script, follow these steps:

#. Ensure you have ``systemd``, ``curl`` and ``sudo`` installed.

#. Download and run the installer script using this command: 

  .. code-block:: bash

    curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
    sudo sh /tmp/splunk-otel-collector.sh --realm $SPLUNK_REALM --memory $SPLUNK_MEMORY_TOTAL_MIB -- $SPLUNK_ACCESS_TOKEN

  Replacing the following variables for your environment:

  * ``SPLUNK_REALM``: This is the Realm to send data to. The default is ``us0``. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.
  
  * ``SPLUNK_MEMORY_TOTAL_MIB``: This is the total allocated memory in mebibytes (MiB). For example, ``512`` allocates 512 MiB (500 x 2^20 bytes) of memory.
  
  * ``SPLUNK_ACCESS_TOKEN``: This is the base64-encoded access token for authenticating data ingest requests. See :ref:`admin-org-tokens`.

Configure memory allocation
----------------------------------

To configure memory allocation, change the ``--memory`` parameter. By default, this parameter is set to 512 MiB, or 500 x 2^20 bytes, of memory. Increase this setting to allocate more memory, as shown in the following example.

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sudo sh /tmp/splunk-otel-collector.sh --realm $SPLUNK_REALM --memory $SPLUNK_MEMORY_TOTAL_MIB \
       -- $SPLUNK_ACCESS_TOKEN

Configure proxy settings
----------------------------------

To configure proxy settings to install and run the OpenTelemetry Collector, see :ref:`configure-proxy-collector`.

Use configured repos
--------------------------------

By default, apt/yum/zypper repo definition files are created to download the package and Fluentd deb/rpm packages from
:new-page:`https://splunk.jfrog.io/splunk <https://splunk.jfrog.io/splunk>` and :new-page:`https://packages.treasuredata.com <https://packages.treasuredata.com>`, respectively.

To skip these steps and use configured repos on the target system that provide the ``splunk-otel-collector`` and ``td-agent`` deb/rpm packages, specify the ``--skip-collector-repo`` or ``--skip-fluentd-repo`` options. For example:

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
   sudo sh /tmp/splunk-otel-collector.sh --realm $SPLUNK_REALM --skip-collector-repo --skip-fluentd-repo \
    -- $SPLUNK_ACCESS_TOKEN

.. _configure-auto-instrumentation:

Configure automatic discovery for back-end applications
==================================================================

You can also automatically instrument your Java, Node.js, and .NET applications along with the Collector installation. Automatic discovery removes the need to configure receivers for each back-end application. See :ref:`linux-backend-auto-discovery` for the installation instructions. 

For more information on instrumentation, see: 

* :ref:`get-started-java` 
* :ref:`get-started-nodejs`
* :ref:`get-started-dotnet-otel`    

.. _collector-linux-with-docker:

Collector for Linux with Docker
====================================================================

Install the Collector in a host with Docker
--------------------------------------------------------------------

If you're installing your Collector instance in a host with Docker, you need to configure a client to establish a connection with the daemon. Depending on your Docker installation and Collector deployment method, try one of these options:

1. If your daemon is listening to a domain socket (for example ``/var/run/docker.sock``), your Collector service or executable needs appropriate permissions and access. Add the ``splunk-otel-collector`` user to the Docker group as configured on your system:

  .. code-block:: bash

    $ usermod -aG docker splunk-otel-collector

2. When using the :new-page:`quay.io/signalfx/splunk-otel-collector <https://quay.io/repository/signalfx/splunk-otel-collector>` image, add the default container user to the required group as configured on your system, and the bind and mount the domain socket:

  .. code-block:: bash

    $ docker run -v /var/run/docker.sock:/var/run/docker.sock:ro --group-add $(stat -c '%g' /var/run/docker.sock) quay.io/signalfx/splunk-otel-collector:latest <...>
    
    # or if specifying the user:group directly
    $ docker run -v /var/run/docker.sock:/var/run/docker.sock:ro --user "splunk-otel-collector:$(stat -c '%g' /var/run/docker.sock)" quay.io/signalfx/splunk-otel-collector:latest <...>

Use auto discovery with containers 
--------------------------------------------------------------------

If your Collector instance is running in a Docker container and the discovery targets are also containers, you need to share the Docker socket when launching the Collector container:

.. code-block:: bash

  $ docker run -v /var/run/docker.sock:/var/run/docker.sock:ro --group-add <socket_gid>

To use host bindings, run this command:

.. code-block:: bash

  --set=splunk.discovery.extensions.docker_observer.config.use_host_bindings=true

.. _otel-installer-options-linux:

Options of the installer script of the Collector for Linux
==================================================================

The Linux installer script supports the following options for the Collector, Automatic Discovery for back-end services and Fluentd.

To display all the configuration options supported by the script, use the ``-h`` flag.

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh;
   sh /tmp/splunk-otel-collector.sh -h

Collector
----------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 40 30

   * - Option
     - Description
     - Default value
   * - ``--api-url <url>``
     - Set the API endpoint URL explicitly instead of using the endpoint inferred from the specified realm.
     - ``https://api.REALM.signalfx.com``
   * - ``--collector-config <path>``
     -  Set the path to an existing custom configuration file for the Collector service instead of using the default configuration file provided by the Collector package based on the ``--mode <agent|gateway>`` option. If the specified file requires custom environment variables, you can manually add both the variables and values to ``/etc/otel/collector/splunk-otel-collector.conf`` after installation. Restart the Collector service with the ``sudo systemctl restart splunk-otel-collector`` command for the changes to take effect.
     - ``/etc/otel/collector/agent_config.yaml`` for ``agent`` mode; ``/etc/otel/collector/gateway_config.yaml`` for ``gateway`` mode
   * - ``--collector-version <version>``
     - The Collector package version to install.
     - ``latest``
   * - ``--discovery``
     - Activate discovery mode on Collector startup. See :ref:`discovery_mode` for more information.
     -
   * - ``--hec-token <token>``
     - Set the HEC token if it is different than the specified ``access_token``.
     -
   * - ``--hec-url <url>``
     -  Set the HEC endpoint URL explicitly instead of using the endpoint inferred from the specified realm.
     -  ``https://ingest.REALM.signalfx.com/v1/log``
   * - ``--ingest-url <url>``
     - Set the ingest endpoint URL explicitly instead of using the endpoint inferred from the specified realm.
     - ``https://ingest.REALM.signalfx.com``
   * - ``--memory <memory size>``
     - Total memory in MIB to allocate to the Collector. This option automatically calculates the ballast size. See :ref:`otel-sizing` for more information on how to scale and size the Collector.
     - ``512``
   * - ``--mode <agent|gateway>``
     - Configure the Collector service to run in host monitoring (``agent``) or data forwarding (``gateway``) mode. See :ref:`otel-deployment-mode` for more information.
     - ``agent``
   * - ``--listen-interface <ip>``
     - Network interface the Collector receivers listen on.
     - ``127.0.0.1`` for ``agent`` mode, otherwise ``0.0.0.0``
   * - ``--realm <us0|us1|eu0|...>``
     - The Splunk realm to use. The ingest, API, trace, and HEC endpoint URLs are automatically generated using this value.
     - ``us0``
   * - ``--service-group <group>``
     - Set the group for the splunk-otel-collector service. The option creates the group if it doesn't exist.
     - ``splunk-otel-collector``
   * - ``--service-user <user>``
     - Set the user for the splunk-otel-collector service. The option creates the user if it doesn't exist.
     - ``splunk-otel-collector``
   * - ``--skip-collector-repo``
     - By default, a apt, yum, or zypper repo definition file is created to download the Collector package from ``https://splunk.jfrog.io``. Use this option to skip the previous step and use a pre-configured repo on the target system that provides the ``splunk-otel-collector`` deb or rpm package.
     -
   * - ``--trace-url <url>``
     - Set the trace endpoint URL explicitly instead of the endpoint inferred from the specified realm.
     - ``https://ingest.REALM.signalfx.com/v2/trace``
   * - ``--``
     - Use ``--``  if the access token starts with ``-``, for example ``-- -MY-ACCESS-TOKEN``.
     -
   * - ``--uninstall``
     - Removes the Splunk OpenTelemetry Collector for Linux.
     -

Automatic Discovery for back-end services
--------------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 40 30

   * - Option
     - Description
     - Default value
   * - ``--with[out]-instrumentation``
     - Whether to install the ``splunk-otel-auto-instrumentation`` package and add the ``libsplunk.so`` shared object library to ``/etc/ld.so.preload`` to activate auto instrumentation for all supported processes on the host. Cannot be combined with the ``--with-systemd-instrumentation`` option. See :ref:`linux-backend-auto-discovery` for more information.
     - ``--without-instrumentation``
   * - ``--with[out]-systemd-instrumentation``
     - Whether to install the ``splunk-otel-auto-instrumentation`` package and configure a systemd drop-in file to activate auto instrumentation for all supported applications running as systemd services. Cannot be combined with the ``--with-instrumentation`` option. See :ref:`linux-backend-auto-discovery` for more information.
     - ``--without-systemd-instrumentation``
   * - ``--with[out]-instrumentation-sdk <sdk>``
     - Whether to enable auto instrumentation for a specific language. This option takes a comma separated set of values representing supported auto-instrumentation SDKs. Currently supported values: ``java``, ``node``, and ``dotnet``. Use ``--with-instrumentation-sdk`` to enable only the specified language(s), for example ``--with-instrumentation-sdk java``. Note: .NET (``dotnet``) auto instrumentation is only supported on x86_64/amd64.
     - ``--with-instrumentation-sdk java,nodejs,dotnet``
   * - ``--npm-path <path>``
     - If Auto Instrumentation for Node.js is enabled, ``npm`` is required to install the included Splunk OpenTelemetry Auto Instrumentation for Node.js package. If ``npm`` is not found via the ``command -v npm`` shell command or if installation fails, Auto Instrumentation for Node.js will not be activated. Use this option to specify a custom path to ``npm``, for example ``--npm-path /my/path/to/npm``.
     - ``npm``
   * - ``--deployment-environment <value>``
     - Set the ``deployment.environment`` resource attribute to the specified value. If not specified, the ``Environment`` in the Splunk APM UI will appear as ``unknown`` for all instrumented applications. The resource attribute will be appended to the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable.
     -
   * - ``--service-name <name>``
     - Override the auto-generated service names for all instrumented applications with the specified value. The value will be set to the ``OTEL_SERVICE_NAME`` environment variable.
     -
   * - ``--otlp-endpoint <host:port>``
     - Set the OTLP endpoint for captured traces, logs, and metrics for all activated SDKs. The value will be set to the ``OTEL_EXPORTER_OTLP_ENDPOINT`` environment variable. If not specified, the default behavior is to defer to the default ``OTEL_EXPORTER_OTLP_ENDPOINT`` value for each activated SDK.
     -
   * - ``--otlp-endpoint-protocol <protocol>``
     - Set the protocol for the OTLP endpoint, for example ``grpc`` or ``http/protobuf``. The value will be set to the ``OTEL_EXPORTER_OTLP_PROTOCOL`` environment variable. If not specified, the default behavior is to defer to the default ``OTEL_EXPORTER_OTLP_PROTOCOL`` value for each activated SDK.
     -
   * - ``--metrics-exporter <exporters>``
     - Comma-separated list of exporters for collected metrics by all activated SDKs, for example ``otlp,prometheus``. Set the value to ``none`` to disable collection and export of metrics. The value will be set to the ``OTEL_METRICS_EXPORTER`` environment variable. The default behavior is to defer to the default ``OTEL_METRICS_EXPORTER`` value for each activated SDK.
     -
   * - ``--logs-exporter <exporter>``
     - Set the exporter for collected logs by all activated SDKs, for example ``otlp``. Set the value to ``none`` to deactivate collection and export of logs. The ``OTEL_LOGS_EXPORTER`` environment variable contains this value. By default, each activated SDK uses the default ``OTEL_LOGS_EXPORTER`` value.
     -
   * - ``--[enable|disable]-profiler``
     - Activate or deactivate AlwaysOn CPU Profiling for all activated SDKs that support the ``SPLUNK_PROFILER_ENABLED`` environment variable.
     - ``--disable-profiler``
   * - ``--[enable|disable]-profiler-memory``
     - Activate or deactivate AlwaysOn Memory Profiling for all activated SDKs that support the ``SPLUNK_PROFILER_MEMORY_ENABLED`` environment variable.
     - ``--disable-profiler-memory``
   * - ``--[enable|disable]-metrics``
     - Activate or deactivate collection and exporting metrics for all activated SDKs that support the ``SPLUNK_METRICS_ENABLED`` environment variable.
     - ``--disable-metrics``
   * - ``--instrumentation-version``
     - The ``splunk-otel-auto-instrumentation`` package version to install. Note: The minimum supported version for Java and Node.js auto instrumentation is 0.87.0, and the minimum supported version for .NET auto instrumentation is 0.99.0.
     - ``latest``

Fluentd
--------------------------------------------------------------------

.. list-table::
   :header-rows: 1
   :width: 100%
   :widths: 30 40 30

   * - Option
     - Description
     - Default value
   * - ``--with[out]-fluentd``
     - Whether to install and configure fluentd to forward log events to the Collector. See :ref:`fluentd-manual-config-linux` for more information.
     - ``--without-fluentd``
   * - ``--skip-fluentd-repo``
     - By default, a apt/yum repo definition file will be created to download the fluentd deb/rpm package from ``https://packages.treasuredata.com``. Use this option to skip the previous step and use a pre-configured repo on the target system that provides the ``td-agent`` deb/rpm package.
     -

Next steps
==================================

.. include:: /_includes/gdi/collector-linux-next-steps.rst
