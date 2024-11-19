.. _deployments-ecs-ec2:

********************************************************
Deploy the Collector with Amazon ECS EC2
********************************************************

.. meta::
      :description: Deploy the Splunk Observability Cloud OpenTelemetry Collector as a Sidecar in an Amazon ECS EC2 cluster.

Use the guided setup to deploy the Collector as a sidecar in an Amazon ECS EC2 cluster. 

To access the guided setup for AWS integration, perform the following steps:

#. Log in to Splunk Observability Cloud.
#. On the navigation menu, select :guilabel:`Data Management`.
#. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
#. Select the tile for :guilabel:`Amazon ECS EC2`.
#. Follow the steps provided in the guided setup, which provides a JSON task definition for the Collector.

Choose one of the following Collector configuration options:

- **Default:** The file /etc/otel/collector/ecs_ec2_config.yaml in the Collector image is used for the Collector configuration.
- **File:** Specify the file to use for the Collector configuration. See :ref:`ecs-ec2-custom-config`.
- **AWS Parameter Store:** Specify the AWS Parameter Store key or ARN to use for the Collector configuration. See :ref:`ecs-ec2-aws-store`.

Add the Collector as a sidecar
==================================================================

.. note:: To use this option you need to be familiar with Amazon ECS EC2 launch. See :new-page:`Getting started with the classic console using Amazon EC2 <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-ecs-ec2.html>` for further reading. 

Open the ECS task definition in which you'll add the Collector sidecar:

1. Locate the task definition for the Collector from the :new-page:`repository <https://github.com/signalfx/splunk-otel-collector/blob/main/deployments/ecs/ec2/splunk-otel-collector.json>`.
2. Merge the definitions of the Collector with the existing ECS task definition.
3. Replace ``MY_SPLUNK_ACCESS_TOKEN`` and ``MY_SPLUNK_REALM`` with valid values. You can pin the image version to a specific version instead of ``latest`` if you want to avoid automatic upgrades. 

The Collector is configured to use the default configuration file ``/etc/otel/collector/ecs_ec2_config.yaml``. The Collector image Dockerfile is available at :new-page:`Dockerfile <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/Dockerfile>` and the contents of the default configuration file can be seen at :new-page:`ECS EC2 configuration <https://github.com/signalfx/splunk-otel-collector/blob/main/cmd/otelcol/config/collector/ecs_ec2_config.yaml>`. 

Notes:

* You do not need the ``awsecscontainermetrics`` receiver in the default configuration file if all you want is tracing. You can take the default configuration, remove the receiver, then use the configuration in a custom configuration following the directions in :ref:`ecs-ec2-custom-config`.

* To exclude metrics assign them as a stringified array to environment variable ``METRICS_TO_EXCLUDE``. 

* You can set the memory limit for the ``memory_limiter`` processor using environment variable ``SPLUNK_MEMORY_LIMIT_MIB``. The default memory limit is 512 MiB. 

* To run Docker containers in Amazon ECS you need a task definition and to launch the Collector.

.. _ecs-ec2-custom-config:

Deploy the Collector using a custom configuration
============================================================

To use a custom configuration file, replace the value of the ``SPLUNK_CONFIG`` environment variable  with the file path of the custom configuration file in the Collector task definition.

Alternatively, you can specify the custom configuration YAML directly using the ``SPLUNK_CONFIG_YAML`` environment variable, as described in :ref:`ecs-observer-config`.

.. _ecs-observer-config:

Configure ``ecs_observer`` 
--------------------------------

Use extension Amazon Elastic Container Service Observer (``ecs_observer``) in your custom configuration to discover metric targets in running tasks, filtered by service names, task definitions, and container labels. ``ecs_observer`` is currently limited to Prometheus targets and requires the read-only permissions below. The Collector should be configured to run as an ECS Daemon. You can add the permissions to the task role by adding them to a customer-managed policy that is attached to the task role.

.. code-block:: yaml

   ecs:List*
   ecs:Describe*

The following custom configuration examples show the ``ecs_observer`` configured to find Prometheus targets in the ``lorem-ipsum-cluster`` cluster and ``us-west-2`` region, where the task ARN pattern is ``^arn:aws:ecs:us-west-2:906383545488:task-definition/lorem-ipsum-task:[0-9]+$``. 

The results are written to ``/etc/ecs_sd_targets.yaml``. The ``prometheus`` receiver is configured to read targets from the results file. The values for ``access_token`` and ``realm`` are read from the ``SPLUNK_ACCESS_TOKEN`` and ``SPLUNK_REALM`` environment variables, which must be specified in your container definition.

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

.. _ecs-ec2-aws-store:

Deploy the Collector using the AWS Parameter Store
=========================================================================================

To use the AWS Parameter Store, specify the config YAML directly in the ``SPLUNK_CONFIG_YAML`` environment variable instead of using ``SPLUNK_CONFIG``. 

.. note:: To have read access to the Parameter Store add the policy ``AmazonSSMReadOnlyAccess`` to the task role. See :new-page:`Systems manager parameter store <https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html>` for more information.

Follow these steps: 

#. Store the custom configuration for the :ref:`ecs-observer-config` in the parameter ``splunk-otel-collector-config`` in the AWS Systems Manager Parameter Store. 
#. Next, assign the ``splunk-otel-collector-config`` parameter to ``SPLUNK_CONFIG_YAML`` using the ``valueFrom`` option, as shown in the following example:

.. code-block:: none

  {
  "name": "lorem-ipsum-cluster",
  "valueFrom": "^arn:aws:ecs:us-west-2:906383545488:task-definition/lorem-ipsum-task:[0-9]+$""
  }

.. caution:: The AWS Parameter Store limits the size of the config file to 4096 bytes.

Launch the Collector as a Daemon from the ECS console
============================================================

To launch the Collector from the Amazon ECS console:

#. Go to your cluster in the console and select :guilabel:`Services`. 
#. Select :guilabel:`Create` and define the following options:
  #. Launch Type: EC2
  #. Task Definition (Family): splunk-otel-collector
  #. Task Definition (Revision): 1 (or whatever the latest is in your case)
  #. Service Name: splunk-otel-collector
  #. Service type: DAEMON
#. Leave everything else at default and proceed to :guilabel:`Next step` until you're required to create the service.
#. Select :guilabel:`Create Service` to deploy the Collector onto each node in the ECS cluster. You should see infrastructure and docker metrics flowing soon.