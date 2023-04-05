.. _deployments-pivotal-cloudfoundry:

****************************
Pivotal Cloud Foundry 
****************************

.. meta::
      :description: Use Pivotal Cloud Foundry Tanzu to install and configure the OpenTelemetry Collector.

Use Pivotal Cloud Foundry (PCF) to deploy the Collector.

Requirements
=========================

This method is supported for Tanzu Application Service (TAS) version 2. It's not supported for TAS version 3.


Deployment options
=========================

You have three options:

* Cloud Foundry Buildpack: This integration can be used to install and run the Collector as a sidecar to your app. In this configuration, the Collector will run in the same container as the app.

* Bosh release: The Collector is deployed to the PCF environment as a standalone deployment.

* Tanzu Tile: This is a Tanzu Tile of the Collector, which is a packaged release of the collector that can be integrated into the Ops Manager. The Tanzu Tile enables users to download, install, run, configure, and update the collector all from the Ops Manager.

