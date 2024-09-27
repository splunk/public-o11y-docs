.. _docker-compose:

************************************************
Part 1: Configure the log collection environment
************************************************

Configure all the necessary services for the tutorial environment, including the log-producing containers, the Splunk Distribution of the OpenTelemetry Collector, and the Splunk Enterprise server. For an overview of the tutorial, see :ref:`about-logs-collector-splunk-tutorial`.

.. note::

   In this tutorial part, you start by creating the logging, Collector, and Splunk Enterprise containers. In the next part of the tutorial, you will define the Collector components that receive, process, and export the logs from the logging container volumes and the indexes that receive and store the processed logging data.

Create the log collection environment
=====================================

All the configuration files used in this tutorial are in a single directory. Follow these steps to create the directory and your first file:

#. Create a directory called log-collection.

#. Create a file in the log-collection directory called docker-compose.yml.

Add the logging services
========================

Docker Compose deploys and manages the services used in ths tutorial. To configure the log-emitting Bash services, add the following to the ``docker-compose.yml`` file:

.. code-block:: yaml

   services:
     logging1:
       image: bash:latest
       container_name: logging1
       # Command that runs when the container starts.
       command: bash -c "while(true) do echo '{\"message\":\"logging1\"}' >> /output/file.log ; sleep 1; done"
       # Sets the logging services not to start until the Collector service starts.
       depends_on:
         - otelcollector
       # Routes the `./output` directory from the host machine to the `/output` volume. 
       volumes:
         - ./output1:/output
     logging2:
       image: bash:latest
       container_name: logging2
       command: bash -c "while(true) do echo '{\"message\":\"logging2\"}' >> /output/file.log ; sleep 1; done"
       depends_on:
         - otelcollector
       volumes:
         - ./output2:/output

Add the Collector service
=========================

Create the Collector service that accepts incoming log data from the logging services and runs the Collector components defined in the next part of the tutorial. In the ``services`` section, add the following code:

.. code-block:: yaml

   otelcollector:
     image:  quay.io/signalfx/splunk-otel-collector:latest
     container_name: otelcollector
     # Command that runs when the container starts.
     command: ["--config=/etc/otel-collector-config.yml"]
     # Routes files and directories from the host machine to the container volumes
     volumes:
       - ./otel-collector-config.yml:/etc/otel-collector-config.yml
       - ./output1:/output1
       - ./output2:/output2
     # Sets the otelcollector service not to start until splunk service starts
     # and is in the Healthy state.
     depends_on:
       splunk:
         condition: service_healthy
     # Host machine port 18088 forwards to the container port 8088,
     # on which the otelcollector service listens for incoming log data.
     ports:
       - 18088:8088

Add the Splunk Enterprise service
=================================

Create the Splunk Enterprise service that accepts incoming log data from the Collector service. In the ``services`` section, add the following code:

.. code-block:: yaml

   splunk:
     image: splunk/splunk:9.1.2
     container_name: splunk
     # Sets environment variables to automatically accept the license agreement,
     # define the token for the Splunk HTTP Event Collector (HEC), and define the administrator password.
     environment:
       - SPLUNK_START_ARGS=--accept-license
       - SPLUNK_HEC_TOKEN=00000000-0000-0000-0000-0000000000000
       - SPLUNK_PASSWORD=changeme
     # Host machine port 18000 forwards to the container port 8000,
     # on which the splunk service listens for incoming log data.
     ports:
       - 18000:8000
     # Command that runs at regular intervals to check the health of the splunk service.
     healthcheck:
       test: ['CMD', 'curl', '-f', 'http://localhost:8000']
       interval: 5s
       timeout: 5s
       retries: 20
     # Routes the `./splunk.yml` file from the host machine to the `/tmp/defaults/default.yml` file
     # inside the container, and creates persistent storage locations for data and configuration files.
     volumes:
       - ./splunk.yml:/tmp/defaults/default.yml
       - /opt/splunk/var
       - /opt/splunk/etc

.. note::

   Be sure to use the ``9.1.2`` tag for the ``splunk/splunk`` image. There is a known issue related to the creation of HEC tokens that you can encounter if you use the ``latest`` tag.

Next step
=========

You've now configured the services needed to use the Collector to gather container logs and send them to a Splunk Enterprise instance. Next, configure the Collector components used to receive, process, and export the container logs. Then, configure the Splunk Enterprise indexes where you store the logs for search and retrieval in Splunk Web. To continue, see :ref:`collector-splunk`.

Learn more
==========

* For more information about using the Collector to monitor Docker containers, see :ref:`docker`.
* For more information about the Splunk Enterprise container, see the `docker-splunk <https://splunk.github.io/docker-splunk/>`__ documentation and the `Docker-Splunk <https://github.com/splunk/docker-splunk>`__ GitHub repository.