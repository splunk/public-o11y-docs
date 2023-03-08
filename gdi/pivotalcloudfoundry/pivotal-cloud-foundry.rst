.. _pivotal-cloud-foundry:

*********************************************************************
Pivotal Cloud Foundry
*********************************************************************

.. meta::
      :description: Use this BOSH release to deploy the Splunk Distribution of OpenTelemetry Collector to a Pivotal Cloud Foundry (PCF) environment.

Description
=====================================

The BOSH release is a form of deploying the Splunk Distribution of OpenTelemetry Collector to a Pivotal Cloud Foundry (PCF) environment. The BOSH release deploys the Collector so that it acts as a :new-page:`Loggregator Firehose Nozzle <https://docs.pivotal.io/tiledev/2-2/nozzle.html>` to pull metrics and send them to Splunk Observability Cloud. 

Run the release script
=======================================

Use the information in this section to run the release script.

The release script requires using the following dependencies:

- the ``bosh`` CLI, which is the command line tool used for interacting with all things BOSH, from deployment operations to software release management.
- ``wget`` to retrieve content from web servers.
- ``jq`` to process JSON files.

Use the :new-page:`release script <https://github.com/signalfx/splunk-otel-collector/blob/main/deployments/cloudfoundry/bosh/release>` to create a BOSH release of the Collector. The script must be run in the BOSH release directory of the Collector repository, or it will not work. This repository has the necessary dependencies for the release to contain its necessary components. 

The script uses the variables described in the following table: 

   .. list-table:: Variables
      :widths: 25 25 50
      :header-rows: 1

      * - Variable
        - Description
        - Default
      * - ``OTEL_VERSION``
        - The version of the Collector to deploy as a part of this release.
        - ``latest``. The valid version must be higher than version 0.48.0.
      * - ``SMART_AGENT_VERSION``
        - The version of the SignalFx Smart Agent to download. This is a dependency of the Collector SignalFx receiver.
        - ``latest``
      * - ``BOSH_RELEASE_VERSION``
        - The version of the BOSH release being created.
        - ``false (0)``, if not specified. Any release except the first release should have a pre-set value.
      * - ``IS_DEV_RELEASE``
        - Boolean (int). If this variable is set, this script creates the release locally. If this variable is set to ``true``, the script can be used in development.
        - ``false (0)``
      * - ``UPLOAD_RELEASE``
        - Boolean (int). If this variable is set to ``true``, the script uploads the release to the BOSH Director, which is primarily used for the GitHub workflow for testing.
        - ``true (1)``

Deploy the Collector using a YAML file
===================================================

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
