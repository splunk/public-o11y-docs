.. _about-logs-collector-splunk-tutorial:

***********************************************************************
Tutorial: Use the Collector to send container logs to a Splunk instance
***********************************************************************

.. meta::
   :description: Learn how to use the OpenTelemetry Collector to send Docker container logs to a Splunk Enterprise instance.

.. toctree::
   :hidden:
   :maxdepth: 4

   docker-compose.rst
   collector-splunk.rst
   deploy-verify-environment.rst

This tutorial demonstrates how to use the OpenTelemetry Collector to send Docker container logs to a Splunk Enterprise instance, using Docker Compose to manage the multicontainer environment.

Using the Collector to process the logs before sending them to Splunk indexes offers the following benefits over sending the logs directly to Splunk:

* Log format standardization, transformation, and processing
* Centralized configuration
* Metadata enrichment
* Log filtering to avoid sending unneeded logs
* Load balancing
* Routing of logs to specific indexes
* Open standards and interoperability

.. raw:: html

   <h2>What's in this tutorial</h2>

After completing this tutorial, you can accomplish the following tasks:

* Create a Docker Compose environment that manages all the services used to send container logs to a Splunk Enterprise server.
* Configure the Collector to receive, process, and export container logs.
* Configure Splunk indexes for log storage.
* Deploy and verify the complete pipeline, from container log emission to Splunk Enterprise indexing and search.

.. raw:: html

   <h2>How to use this tutorial</h2>

Each part of this tutorial builds on the previous part. Follow the tutorial parts in order.

#. Configure the logging, Collector, and Splunk services using Docker Compose. See :ref:`docker-compose`.
#. Configure the Collector components and the Splunk indexes. See :ref:`collector-splunk`.
#. Deploy and verify your complete containerized environment. See :ref:`deploy-verify-environment`

.. raw:: html

   <h2>Prerequisites</h2>

* Docker, Docker Compose, and Git installed on your system.
* Sufficient resources available to run a multicontainer environment, including at least 4 GB of RAM.
* The following ports available and not blocked by a firewall:

    * ``18000:8000`` - Splunk Web interface
    * ``18088:8088`` - OpenTelemetry Collector

.. raw:: html

   <h2>Get started</h2>

To get started with the tutorial, see :ref:`docker-compose`.