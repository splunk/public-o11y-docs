.. _deployments-pivotal-cloudfoundry:

****************************
Pivotal Cloud Foundry 
****************************

.. meta::
      :description: Use Pivotal Cloud Foundry to install and configure the OpenTelemetry Collector. Use BOSH, the buildpack, or the Tanzu file.

Use Pivotal Cloud Foundry (PCF) to deploy the Collector.

There are three deployment options:

* :ref:`otel-pcf-bosch`: The Collector is deployed to the PCF environment as a standalone deployment.

* :ref:`otel-pcf-buildpack`: This integration installs and runs the Collector as a sidecar to your app. In this configuration, the Collector runs in the same container as the app.

* :ref:`otel-pcf-tile`: The Tanzu Tile is a packaged release of the Collector that can be integrated into Pivotal Ops Manager. The Tanzu Tile allows you to download, install, run, configure, and update the Collector from the Ops Manager.

.. caution:: Only Tanzu Application Service (TAS) version 2 is supported. TAS version 3 is not supported.

.. _otel-pcf-bosch:
.. _pivotal-cloud-foundry:

BOSH release
=========================

If deployed using the BOSH release, the Collector acts as a nozzle to :new-page:`Loggregator Firehose <https://docs.pivotal.io/tiledev/2-2/nozzle.html>`, which is one of the architectures Cloud Foundry uses to emit logs and metrics.

Dependencies
----------------------------------

The release script requires:

* The :new-page:`BOSH CLI <https://bosh.io/docs/cli-v2-install/>`, which is the command line tool used for interacting with all things BOSH, from deployment operations to software release management.
* ``wget`` to retrieve content from web servers.
* ``jq`` to process JSON files.

Release and deploy the Collector
----------------------------------

Use the :new-page:`release script <https://github.com/signalfx/splunk-otel-collector/blob/main/deployments/cloudfoundry/bosh/release>` to generate a new release with the latest version of the Splunk Distribution of OpenTelemetry Collector. The script must be run in the BOSH release directory of the Collector repository, or it will not work. This repository has the necessary dependencies for the release to contain its necessary components. 

.. code-block:: 
   
   bosh -d splunk-otel-collector deploy deployment.yaml

The script uses the variables described in the following table: 

.. list-table:: Variables
   :widths: 25 25 50
   :header-rows: 1

   *  - Variable
      - Description
      - Default
   *  - ``OTEL_VERSION``
      - The version of the Collector to deploy as a part of this release.
      - ``latest``. The valid version must be higher than version 0.48.0.
   *  - ``SMART_AGENT_VERSION``
      - The version of the SignalFx Smart Agent to download. This is a dependency of the Collector SignalFx receiver.
      - ``latest``
   *  - ``BOSH_RELEASE_VERSION``
      - The version of the BOSH release being created.
      - ``false (0)``, if not specified. Any release except the first release should have a pre-set value.
   *  - ``IS_DEV_RELEASE``
      - Boolean (int). If this variable is set, this script creates the release locally. If this variable is set to ``true``, the script can be used in development.
      - ``false (0)``
   *  - ``UPLOAD_RELEASE``
      - Boolean (int). If this variable is set to ``true``, the script uploads the release to the BOSH Director, which is primarily used for the GitHub workflow for testing.
      - ``true (1)``

See :new-page:`configuration examples <https://github.com/signalfx/splunk-otel-collector/tree/main/deployments/cloudfoundry/bosh/example>`.

Deploy the Collector using a YAML file
--------------------------------------------------------------------

Run the following command to deploy the Collector using the deployment.yaml file:

.. code-block:: yaml

   bosh -d splunk-otel-collector deploy deployment.yaml

The following is an example deployment.yaml file:

.. code-block:: yaml

   name: splunk-otel-collector

   releases:
     - name: splunk-otel-collector
       version: latest

   stemcells:
     - alias: default
       os: ubuntu-bionic
       version: latest

   update:
     canaries: 1
     max_in_flight: 1
     canary_watch_time: 1000-30000
     update_watch_time: 1000-30000

   instance_groups:
     - name: splunk-otel-collector
       instances: 1
       azs: [z1, z2]
       jobs:
         - name: splunk-otel-collector
           release: splunk-otel-collector
           properties:
             cloudfoundry:
               rlp_gateway:
                 endpoint: "https://log-stream.sys.<TAS environment name>.cf-app.com"
                 shard_id: "otelcol"
                 tls:
                   insecure_skip_verify: false
               uaa:
                 endpoint: "https://uaa.sys.<TAS environment name>.cf-app.com"
                 username: "..."
                 password: "..."
                 tls:
                   insecure_skip_verify: false
             splunk:
               access_token: "..."
               realm: "..."
       vm_type: default
       stemcell: default
       networks:
         - name: default

To include a custom Collector configuration for the deployment, use a custom configuration file, as shown in the following example:

.. code-block:: yaml

   name: splunk-otel-collector

   releases:
     - name: splunk-otel-collector
       version: latest

   stemcells:
     - alias: default
       os: ubuntu-bionic
       version: latest

   update:
     canaries: 1
     max_in_flight: 1
     canary_watch_time: 1000-30000
     update_watch_time: 1000-30000

   instance_groups:
     - name: splunk-otel-collector
       instances: 1
       azs: [z1, z2]
       jobs:
         - name: splunk-otel-collector
           release: bosh
           properties:
             otel:
               config_yaml: |
                 receivers:
                   cloudfoundry:
                     rlp_gateway:
                       endpoint: "https://log-stream.sys.<TAS environment name>.cf-app.com"
                     uaa:
                       endpoint: "https://uaa.sys.<TAS environment name>.cf-app.com"
                       username: "..."
                       password: "..."

                 exporters:
                   signalfx:
                     access_token: "..."
                     realm: "..."

                 processors:
                   resourcedetection:
                     detectors: [ system ]

                 service:
                   pipelines:
                     metrics:
                       receivers: [ cloudfoundry ]
                       processors: [ resourcedetection ]
                       exporters: [ signalfx ]

       vm_type: default
       stemcell: default
       networks:
         - name: default

Learn more
----------------------------------

See the following GitHub repos and files:

* The Collector's :new-page:`BOSH release repo <https://github.com/signalfx/splunk-otel-collector/tree/main/deployments/cloudfoundry/bosh>`
* The Collector's :new-page:`development guide for PCF BOSH <https://github.com/signalfx/splunk-otel-collector/blob/main/deployments/cloudfoundry/bosh/DEVELOPMENT.md>`

.. _otel-pcf-buildpack:

Cloud Foundry Buildpack
=========================

The Cloud Foundry Buildpack deploys the Collector as a sidecar for the actual app being deployed. The Collector is able to observe the app as a nozzle to the Loggregator Firehose, seeing all metrics and logs sent to the Loggregator Firehose as long as it's running.

Dependencies
----------------------------------

* ``wget``
* ``jq``

Install the pack and deploy the Collector
--------------------------------------------------

To install the Buildpack:

* Clone the Collector's :new-page:`Buildpack GitHub repository <https://github.com/signalfx/splunk-otel-collector/tree/main/deployments/cloudfoundry/buildpack>`.
* Go to the newly created repo.
* Run the following command to add the Buildpack for the Collector:

.. code-block:: 

   cf create-buildpack otel_collector_buildpack . 99 --enable

Learn more
----------------------------------

See the following GitHub repos and files:

* :new-page:`Configuration options <https://github.com/signalfx/splunk-otel-collector/tree/main/deployments/cloudfoundry/buildpack#configuration>`
* :new-page:`Troubleshooting <https://github.com/signalfx/splunk-otel-collector/tree/main/deployments/cloudfoundry/buildpack#troubleshooting>`

.. _otel-pcf-tile:

Tanzu Tile
=========================

The Tanzu tile uses the :ref:`otel-pcf-bosch` to deploy the Collector as a nozzle to :new-page:`Loggregator Firehose <https://docs.pivotal.io/tiledev/2-2/nozzle.html>`.

Dependencies
----------------------------------

The release script requires:

* The :new-page:`BOSH CLI <https://bosh.io/docs/cli-v2-install/>`
* The :new-page:`Tile generator <https://docs.vmware.com/en/Tile-Developer-Guide/2.10/tile-dev-guide/tile-generator.html>`
* ``wget``
* ``jq``

Release and deploy the Collector
----------------------------------

Run the following command to create the BOSH release packaged as a dependency of the Tanzu tile, and build the tile. 

.. code-block:: 

   ./make-latest-tile

If the command is successful, you can find the tile in ``./product/splunk-otel-collector-<VERSION>.pivotal``.

Learn more
----------------------------------

See the following GitHub repos and files:

* The Collector's :new-page:`Tanzu Tile GitHub repo <https://github.com/signalfx/splunk-otel-collector/tree/main/deployments/cloudfoundry/tile>`