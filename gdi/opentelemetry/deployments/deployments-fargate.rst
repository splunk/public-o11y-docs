.. _deployments-fargate:

****************************
Amazon Fargate 
****************************

.. meta::
      :description: Deploy the Splunk Observability Cloud OpenTelemetry Collector as a Daemon service in an Amazon ECS EC2 cluster.

Knowledge of AWS Fargate (Fargate) is assumed. See the :new-page:`user guide <https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html>` for more information. 

Unless stated otherwise, the Collector is deployed as a sidecar (additional container) to ECS tasks.

This deployment requires Collector release v0.33.0 or newer, which corresponds to image tag ``0.33.0`` and newer. See the :new-page:`image repository <https://quay.io/repository/signalfx/splunk-otel-collector?tab=tags>` to download the latest image.


Use the guided setup
==========================

Use the guided setup to deploy the Collector as a sidecar to ECS tasks.  Choose one of the following Collector configuration options:

- **Default:** The ``/etc/otel/collector/ecs_ec2_config.yaml`` file in the Collector image is used for the Collector configuration.
- **File:** Specify the file to use for the Collector configuration. See :ref:`ecs-observer-config-fargate`.
- **AWS Parameter Store:** Specify the AWS Parameter Store key or ARN to use for the Collector configuration. See :ref:`ecs-observer-config-fargate`.

Open the :new-page:`Amazon Fargate guided setup <https://login.signalfx.com/#/gdi/scripted/fargate/step-1?category=all&gdiState=%7B%22integrationId%22:%22fargate%22%7D>`. Optionally, you can navigate to the guided setup on your own:

#. Log in to Splunk Observability Cloud.
#. On the navigation menu, select :guilabel:`Data Management`.
#. Select :guilabel:`Add Integration`.
#. On the Integrate Your Data page, select the tile for :guilabel:`Amazon Fargate`.
#. Follow the steps provided in the guided setup.

Getting started
=================================
Copy the default Collector container definition shown in the example.Replace ``MY_SPLUNK_ACCESS_TOKEN`` and ``MY_SPLUNK_REALM`` with valid values. Update the image tag to the newest version, and then add the configuration to the ``containerDefinitions`` section of your task definition.

.. code-block:: none

    {
  "environment": [
    {
      "name": "SPLUNK_ACCESS_TOKEN",
      "value": "MY_SPLUNK_ACCESS_TOKEN"
    },
    {
      "name": "SPLUNK_REALM",
      "value": "MY_SPLUNK_REALM"
    },
    {
      "name": "SPLUNK_CONFIG",
      "value": "/etc/otel/collector/fargate_config.yaml"
    },
    {
      "name": "ECS_METADATA_EXCLUDED_IMAGES",
      "value": "[\"quay.io/signalfx/splunk-otel-collector*\"]"
    }
  ],
  "image": "quay.io/signalfx/splunk-otel-collector:0.33.0",
  "essential": true,
  "name": "splunk_otel_collector"
   }

In this example container definition, the Collector is configured to use the default configuration file ``/etc/otel/collector/fargate_config.yaml``. The Collector image Dockerfile is available at :new-page:`Dockerfile <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/Dockerfile>` and the contents of the default configuration file can be seen at :new-page:`Fargate configuration <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/fargate_config.yaml>`. Note that the ``smartagent/ecs-metadata`` receiver is activated by default.

In summary, the default Collector container definition does the following:

* Specifies the Collector image.
* Sets the access token using environment variable ``SPLUNK_ACCESS_TOKEN``.
* Sets the realm using environment variable ``SPLUNK_REALM``.
* Sets the default configuration file path using environment variable ``SPLUNK_CONFIG``.
* Excludes ``ecs-metadata`` metrics from the Collector image using environment variable ``ECS_METADATA_EXCLUDED_IMAGES``.

Assign a stringified array of metrics you want excluded to environment variable ``METRICS_TO_EXCLUDE``. You can set the memory limit for the ``memory_limiter`` processor using environment variable ``SPLUNK_MEMORY_LIMIT_MIB``. The default memory limit is 512 MiB. 

.. _fargate-custom-config:

Use a custom configuration
==============================
The following example shows an excerpt of the container definition for the Collector configured to use custom configuration file ``/path/to/custom/config/file``. 

``/path/to/custom/config/file`` is a placeholder value for the actual custom configuration file path and ``0.33.0`` is the latest image tag at present. The custom configuration file should be present in a volume attached to the task.

.. code-block:: none

   {
  "environment": [
    {
      "name": "SPLUNK_CONFIG",
      "value": "/path/to/custom/config/file"
    }
  ],
  "image": "quay.io/signalfx/splunk-otel-collector:0.33.0",
  "essential": true,
  "name": "splunk_otel_collector"
   }

The custom Collector container definition essentially:

* Specifies the Collector image.
* Sets environment variable ``SPLUNK_CONFIG`` with the custom configuration file path.

Alternatively, you can specify the custom configuration YAML directly using the ``SPLUNK_CONFIG_YAML`` environment variable, as described in :ref:`ecs-observer-config`.

.. _ecs-observer-config-fargate:

``ecs_observer`` configuration
--------------------------------
Use extension Amazon Elastic Container Service Observer (ecs_observer) in your custom configuration to discover metrics targets in running tasks, filtered by service names, task definitions and container labels. ecs_observer is currently limited to Prometheus targets and requires the read-only permissions below. You can add the permissions to the task role by adding them to a customer-managed policy that is attached to the task role.

.. code-block:: yaml

   ecs:List*
   ecs:Describe*

The following custom configuration examples shows the ``ecs_observer`` configured to find Prometheus targets in the ``lorem-ipsum-cluster`` cluster and ``us-west-2`` region, where the task ARN pattern is ``^arn:aws:ecs:us-west-2:906383545488:task-definition/lorem-ipsum-task:[0-9]+$``. 

The results are written to /etc/ecs_sd_targets.yaml. The ``prometheus`` receiver is configured to read targets from the results file. The values for ``access_token`` and ``realm`` are read from the ``SPLUNK_ACCESS_TOKEN`` and ``SPLUNK_REALM`` environment variables , which must be specified in your container definition.

.. code-block:: yaml

   extensions:
     ecs_observer:
       refresh_interval: 10s
       cluster_name: 'lorem-ipsum-cluster'
       cluster_region: 'us-west-2'
       result_file: '/etc/ecs_sd_targets.yaml'
       task_definitions:
         - arn_pattern: "^arn:aws:ecs:us-west-2:906383545488:task-definition/lorem-ipsum-task:[0-9]+$"
          metrics_ports: [9113]
          metrics_path: /metrics
   receivers:
     prometheus:
       config:
         scrape_configs:
           - job_name: 'lorem-ipsum-nginx'
             scrape_interval: 10s
             file_sd_configs:
               - files:
                   - '/etc/ecs_sd_targets.yaml'
   processors:
     batch:
     resourcedetection:
       detectors: [ecs]
       override: false    
   exporters:
     signalfx:
       access_token: ${SPLUNK_ACCESS_TOKEN}
       realm: ${SPLUNK_REALM}
   service:
     extensions: [ecs_observer]
     pipelines:
       metrics:
         receivers: [prometheus]
         processors: [batch, resourcedetection]
         exporters: [signalfx]

.. note:: 
    
    Using this task ARN pattern causes the ``ecs_observer`` to discover targets in running revisions of task ``lorem-ipsum-task``. This means that when multiple revisions of task ``lorem-ipsum-task`` are running, the ``ecs_observer`` discovers targets outside the task in which the Collector sidecar container is running. In a sidecar deployment, the Collector and the monitored containers are in the same task, so metric targets must be within the task. This problem can be solved by using the complete task ARN as shown below. But, now the task ARN pattern must be updated to keep pace with task revisions.

   .. code-block:: none

    ...
     - arn_pattern: "^arn:aws:ecs:us-west-2:906383545488:task-definition/lorem-ipsum-task:3$"
    ... 

.. _fargate-direct-config:

Use a direct configuration
===================================

The file system is not readily available in Fargate, which means that you should specify the configuration YAML directly using the ``SPLUNK_CONFIG_YAML`` environment variable.

For example, you can store the custom configuration YAML in a parameter called ``splunk-otel-collector-config`` in AWS Systems Manager Parameter Store. In your Collector container definition, assign the parameter to the ``SPLUNK_CONFIG_YAML`` environment variable  using ``valueFrom``. In the following example, ``MY_SPLUNK_ACCESS_TOKEN`` and ``MY_SPLUNK_REALM`` are placeholder values and ``0.33.0`` is the image tag.

.. code-block:: none

   {
  "environment": [
    {
      "name": "SPLUNK_ACCESS_TOKEN",
      "value": "MY_SPLUNK_ACCESS_TOKEN"
    },
    {
      "name": "SPLUNK_REALM",
      "value": "MY_SPLUNK_REALM"
    }
  ],
  "secrets": [
    {
      "valueFrom": "splunk-otel-collector-config",
      "name": "SPLUNK_CONFIG_YAML"
    }
  ],
  "image": "quay.io/signalfx/splunk-otel-collector:0.33.0",
  "essential": true,
  "name": "splunk_otel_collector"
   }

.. note:: 
  
  You should add ``AmazonSSMReadOnlyAccess`` policy to the task role for the task to have read access to the Parameter Store.

Standalone task
--------------------------
The ``ecs_observer`` extension is capable of scanning for targets in the entire cluster. Scanning lets you collect telemetry data by deploying the Collector in a task that is separate from tasks containing monitored applications. This is in contrast to the sidecar deployment where the Collector container, and the monitored application containers are in the same task. 

Do not configure the ECS ``resourcedetection`` processor for the standalone task, as it would detect resources in the standalone Collector task itself as opposed to resources in the tasks containing the monitored applications.

AWS Graviton2
-------------------------
AWS Graviton2 is supported with the default Fargate configuration. The Collector Docker image can run on both AMD64 and ARM64 architectures.


