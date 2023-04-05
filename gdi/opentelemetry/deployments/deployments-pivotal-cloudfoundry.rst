.. _deployments-pivotal-cloudfoundry:

****************************
Pivotal Cloud Foundry 
****************************

.. meta::
      :description: Use Pivotal Cloud Foundry Tanzu to install and configure the OpenTelemetry Collector.

Use Pivotal Cloud Foundry (PCF) to deploy the Collector.

Deployment options
=========================

You have three deployment options:

* Cloud Foundry Buildpack: This integration can be used to install and run the Collector as a sidecar to your app. In this configuration, the Collector runs in the same container as the app.

* Bosh release: The Collector is deployed to the PCF environment as a standalone deployment.

* Tanzu Tile: The Tanzu Tile is a packaged release of the Collector that can be integrated into Pivotal's Ops Manager. The Tanzu Tile enables you to download, install, run, configure, and update the Collector from the Ops Manager.

  * This method is supported for Tanzu Application Service (TAS) version 2. It's not supported for TAS version 3.
