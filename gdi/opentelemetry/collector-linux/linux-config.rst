.. _otel-linux-config:

*********************************************************************************
Advanced configuration for Linux
*********************************************************************************

.. meta::
      :description: Optional configurations for the Splunk Distribution of OpenTelemetry Collector for Linux.

The Collector comes with a default configuration, as explained in :ref:`linux-config-ootb`. Read on to modify advanced settings. 

.. _otel-linux-full:

Change the default configuration file
===========================================

For extended configuration options, see :new-page:`full_config_linux.yaml <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/full_config_linux.yaml>`. This configuration requires using :new-page:`OpenTelemetry Collector Contrib project <https://github.com/open-telemetry/opentelemetry-collector-contrib>` or a similar distribution.

After you modify the configuration, restart the Collector service. For example:

.. code-block:: bash

  sudo systemctl restart splunk-otel-collector

You can view the ``splunk-otel-collector`` service logs and errors in the systemd journal using the following command:

.. code-block:: bash

  sudo journalctl -u splunk-otel-collector   

.. note:: See :ref:`about-collector-configuration-tutorial` to learn how to configure the Collector.

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