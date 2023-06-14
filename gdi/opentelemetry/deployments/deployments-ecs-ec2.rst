.. _deployments-ecs-ec2:

*******************************
Amazon ECS EC2 
*******************************

.. meta::
      :description: Deploy the Splunk Observability Cloud OpenTelemetry Collector as a Daemon service in an Amazon ECS EC2 cluster.

Use the guided setup to deploy the Collector as a Daemon service in an Amazon ECS EC2 cluster. The guided setup provides a JSON task definition for the Collector.

Choose one of the following Collector configuration options:

- **Default:** The file /etc/otel/collector/ecs_ec2_config.yaml in the Collector image is used for the Collector configuration.
- **File:** Specify the file to use for the Collector configuration. See :ref:`ecs-ec2-custom-config`.
- **AWS Parameter Store:** Specify the AWS Parameter Store key or ARN to use for the Collector configuration. See :ref:`ecs-ec2-custom-config`.

To access the guided setup for AWS integration, perform the following steps:

#. Log in to Splunk Observability Cloud.
#. On the navigation menu, select :guilabel:`Data Management`.
#. On the Integrate Your Data page, select the tile for :guilabel:`Amazon ECS EC2`.
#. Follow the steps provided in the guided setup.

Getting started
=================================

The following sections describe how to create a task definition and launch the Collector. A task definition is required to run Docker containers in Amazon ECS. After creating the task definition, you need to launch the Collector.

Create a task definition
---------------------------------
.. note:: 
  
  Knowledge of Amazon ECS using launch type EC2 is assumed. See :new-page:`Getting started with the classic console using Amazon EC2 <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-ecs-ec2.html>` for further reading. 

Creating the task definition requires using release v0.34.1 or newer (which corresponds to image tag 0.34.1 and newer) of the Collector. See the :new-page:`image repository <https://quay.io/repository/signalfx/splunk-otel-collector?tab=tags>` to download the latest image.

To create the task definition:

1. Locate the task definition for the Collector from the :new-page:`repository <https://github.com/signalfx/splunk-otel-collector/blob/main/deployments/ecs/ec2/splunk-otel-collector.json>`.
2. Replace ``MY_SPLUNK_ACCESS_TOKEN`` and ``MY_SPLUNK_REALM`` with valid values. You should pin the image version to a specific version instead of ``latest`` to avoid upgrade issues. 
3. Create a task definition of EC2 launch type. See :new-page:`Creating a task definition using the new console <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-task-definition.html>` for the instructions. The supplied task definition is a minimal definition. See :new-page:`Task definition parameters <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html>` for additional configuration options.

The Collector is configured to use the default configuration file ``/etc/otel/collector/ecs_ec2_config.yaml``. The Collector image Dockerfile is available at :new-page:`Dockerfile <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/Dockerfile>` and the contents of the default configuration file can be seen at :new-page:`ECS EC2 configuration <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/ecs_ec2_config.yaml>`. 

.. note::
   
   You do not need the ``smartagent/ecs-metadata`` metrics receiver in the default configuration file if all you want is tracing. You can take the default configuration, remove the receiver, then use the configuration in a custom configuration following the directions in :ref:`ecs-ec2-custom-config`.

The configured network mode for the task is ``host``. This means that task metadata endpoint version 2 used by the ``smartagent/ecs-metadata`` receiver is not activated by default. See :new-page:`task metadata endpoint <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html>` to determine if task metadata endpoint version 3 is activated by default for your task. If this version is activated, then add the following to the environment list in the task definition:

.. code-block:: none

   {
   "name": "ECS_TASK_METADATA_ENDPOINT",
   "value": "${ECS_CONTAINER_METADATA_URI}/task"
   },
   {
   "name": "ECS_TASK_STATS_ENDPOINT",
   "value": "${ECS_CONTAINER_METADATA_URI}/task/stats"
   }

Assign a stringified array of metrics you want excluded to environment variable ``METRICS_TO_EXCLUDE``. You can set the memory limit for the ``memory_limiter`` processor using environment variable ``SPLUNK_MEMORY_LIMIT_MIB``. The default memory limit is 512 MiB. 

Launch the Collector
=============================
The Collector is designed to be run as a Daemon service in an EC2 ECS cluster. To create a Collector service from the Amazon ECS console:

#. Go to your cluster in the console.
#. Select :guilabel:`Services`. 
#. Select :guilabel:`Create`. 
#. Select the following options:
   #. Launch Type: EC2
   #. Task Definition (Family): splunk-otel-collector
   #. Task Definition (Revision): 1 (or whatever the latest is in your case)
   #. Service Name: splunk-otel-collector
   #. Service type: DAEMON
   #. Leave everything else at default.
#. Select :guilabel:`Next step`.
#. Leave everything on this next page at their defaults and select :guilabel:`Next step`.
#. Leave everything on this next page at their defaults and select :guilabel:`Next step`.
#. Select :guilabel:`Create Service` to deploy the Collector onto each node in the ECS cluster. You should see infrastructure and docker metrics flowing soon.

.. _ecs-ec2-custom-config:

Use a custom configuration
==============================
To use a custom configuration file, replace the value of the ``SPLUNK_CONFIG`` environment variable  with the file path of the custom configuration file in the Collector task definition.

Alternatively, you can specify the custom configuration YAML directly using the ``SPLUNK_CONFIG_YAML`` environment variable, as described in :ref:`ecs-observer-config`.

.. _ecs-observer-config:

``ecs_observer`` configuration
--------------------------------
Use extension Amazon Elastic Container Service Observer (``ecs_observer``) in your custom configuration to discover metrics targets in running tasks, filtered by service names, task definitions, and container labels. ``ecs_observer`` is currently limited to Prometheus targets and requires the read-only permissions below. You can add the permissions to the task role by adding them to a customer-managed policy that is attached to the task role.

.. code-block:: yaml

   ecs:List*
   ecs:Describe*

The following custom configuration examples show the ``ecs_observer`` configured to find Prometheus targets in the ``lorem-ipsum-cluster`` cluster and ``us-west-2`` region, where the task ARN pattern is ``^arn:aws:ecs:us-west-2:906383545488:task-definition/lorem-ipsum-task:[0-9]+$``. 

The results are written to ``/etc/ecs_sd_targets.yaml``. The ``prometheus`` receiver is configured to read targets from the results file. The values for ``access_token`` and ``realm`` are read from the ``SPLUNK_ACCESS_TOKEN`` and ``SPLUNK_REALM`` environment variables , which must be specified in your container definition.

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

.. _aws-parameter-store:

Use the AWS Parameter Store
----------------------------

Use the ``SPLUNK_CONFIG_YAML`` environment variable to specify the configuration YAML directly. Use ``SPLUNK_CONFIG_YAML`` in place of ``SPLUNK_CONFIG``.

For example, first, store the custom configuration for the :ref:`ecs-observer-config` in a parameter called ``splunk-otel-collector-config`` in the AWS Systems Manager Parameter Store.Next, assign the parameter to ``SPLUNK_CONFIG_YAML`` using the ``valueFrom`` option, as shown in the following example:

.. code-block:: none

   {
            "name": "lorem-ipsum-cluster",
            "valueFrom": "^arn:aws:ecs:us-west-2:906383545488:task-definition/lorem-ipsum-task:[0-9]+$""
        }

.. note:: 
    
    You should add policy ``AmazonSSMReadOnlyAccess`` to the task role for the task to have read access to the Parameter Store. See :new-page:`Systems manager parameter store <https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html>` for more information.
