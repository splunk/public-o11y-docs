.. _deployments-fargate-java:

************************************************************************************
Scenario: Monitor a Java service with OpenTelemetry in ECS Fargate
************************************************************************************

.. meta::
  
  :description: Scenario explaining how to monitor a Java service using the Collector in an ECS Fargate emvironment

.. note:: To learn how to deploy the Collector in an AWS ECS Fargate environment, see :ref:`deployments-fargate`.

To instrument a Java service running in ECS Fargate with OpenTelemetry, make the splunk-otel-javaagent.jar file available on the application container in one of these ways:

#. Update the Dockerfile for the application container to explicitly download the splunk-otel-javaagent.jar file so that it's baked into that container image. See :ref:`deployments-fargate-java-one`.

#. Build a separate container image that downloads the splunk-otel-javaagent.jar file, and makes it available as a sidecar ECS container to the application container. See :ref:`deployments-fargate-java-two`.

.. _deployments-fargate-java-one:

Option 1: Bake splunk-otel-javaagent.jar into the application image
==============================================================================

Follow these steps to bake splunk-otel-javaagent.jar into the application image:

1. Update the application's Dockerfile
----------------------------------------------------------------

With this option, the first step is to update the Dockerfile used to build the application container and download the splunk-otel-javaagent.jar file so it's available on the host. This example assumes the application container is based on Tomcat 9 running on Alpine Linux.

To update the Dockerfile, run:

.. code-block:: 

    FROM tomcat:9.0-jre8-alpine

    RUN apk add curl

    # Create a work directory to copy the agent artifacts
    RUN mkdir -p /opt/splunk

    # Download and extract agent artifacts to the work directory
    RUN curl -L0 https://github.com/signalfx/splunk-otel-java/releases/latest/download/splunk-otel-javaagent.jar \
    -o /opt/splunk/splunk-otel-javaagent.jar

    WORKDIR /usr/local/tomcat/webapps

    EXPOSE 8080

    CMD ["/usr/local/tomcat/bin/catalina.sh", "run"]

2. Push the image to your repo
----------------------------------------------------------------

Next, build and push the image to your repo. Replace ``username`` with your Docker Hub username: 

.. code-block:: 

    docker build --platform="linux/amd64" -t tomcat-with-splunk-java-agent:latest --no-cache .

    docker tag tomcat-with-splunk-java-agent:latest username/tomcat-with-splunk-java-agent:latest 

    docker push username/tomcat-with-splunk-java-agent:latest

3. Update the ECS task definition 
----------------------------------------------------------------

After updating and pushing your Dockerfile, update the ECS task definition to use the splunk-otel-javaagent.jar file, now part of your application container in the /opt/splunk directory: 

.. code-block:: 

  {
    "family": "agent-baked-in-example",
    "containerDefinitions": [
        {
            "name": "tomcat",
            "image": "username/tomcat-with-splunk-java-agent:latest",
            "cpu": 0,
            "portMappings": [
                {
                    "name": "tomcat-8080-tcp",
                    "containerPort": 8080,
                    "protocol": "tcp",
                    "appProtocol": "http"
                }
          ],
            "essential": true,
            "environment": [
                {
                    "name": "OTEL_SERVICE_NAME",
                    "value": "myservice"
                },
                {
                    "name": "OTEL_RESOURCE_ATTRIBUTES",
                    "value": "deployment.environment=test,service.version=1.0"
                },
                {
                    "name": "JAVA_TOOL_OPTIONS",
                    "value": "-javaagent:/opt/splunk/splunk-otel-javaagent.jar"
                }
            ],
            "environmentFiles": [],
            "mountPoints": [],
            "volumesFrom": [],
            "dependsOn": [],
            "ulimits": [],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-create-group": "true",
                    "awslogs-group": "/ecs/agent-baked-in-example",
                    "awslogs-region": "eu-west-1",
                    "awslogs-stream-prefix": "ecs"
                },
                "secretOptions": []
            }
        },
        {
            "name": "splunk-otel-collector",
            "image": "quay.io/signalfx/splunk-otel-collector:latest",
            "cpu": 0,
            "portMappings": [],
            "essential": true,
            "environment": [
                {
                    "name": "SPLUNK_CONFIG",
                    "value": "/etc/otel/collector/fargate_config.yaml"
                },
                {
                    "name": "SPLUNK_REALM",
                    "value": "<Realm - us0, us1, etc>"
                },
                {
                    "name": "SPLUNK_ACCESS_TOKEN",
                    "value": "<Access Token>"
                },
                {
                    "name": "ECS_METADATA_EXCLUDED_IMAGES",
                    "value": "[\"quay.io/signalfx/splunk-otel-collector:latest\"]"
                }
            ],
            "environmentFiles": [],
            "mountPoints": [],
            "volumesFrom": [],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-create-group": "true",
                    "awslogs-group": "/ecs/agent-baked-in-example",
                    "awslogs-region": "eu-west-1",
                    "awslogs-stream-prefix": "ecs"
                },
                "secretOptions": []
            }
        }
    ],
    "executionRoleArn": "arn:aws:iam::539254608140:role/ecsTaskExecutionRole",
    "networkMode": "awsvpc",
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "1024",
    "memory": "3072",
    "runtimePlatform": {
        "cpuArchitecture": "X86_64",
        "operatingSystemFamily": "LINUX"
    }
  }

.. _deployments-fargate-java-two:

Option 2: Build a separate container image
====================================================

Follow these steps to use a separate container image:

1. Create a Dockerfile for the Splunk Java agent
----------------------------------------------------------------

First, create a Dockerfile to download the splunk-otel-javaagent.jar file and make it available as a volume: 

.. code-block:: 

    FROM alpine:latest

    RUN apk add --no-cache curl

    # Create a directory for the agent artifacts
    RUN mkdir -p /opt/splunk
    WORKDIR /opt/splunk

    # Download the Splunk Java agent
    RUN curl -L0 https://github.com/signalfx/splunk-otel-java/releases/latest/download/splunk-otel-javaagent.jar \
    -o splunk-otel-javaagent.jar

    # Expose the /opt/splunk directory as a shared volume
    VOLUME ["/opt/splunk"]

    CMD tail -f /dev/null

2. Push the image to your repo
----------------------------------------------------------------

Next, build and push the image to your repo. Replace ``username`` with your Docker Hub username: 

.. code-block:: 

    docker build --platform="linux/amd64" -t tomcat-with-splunk-java-agent:latest --no-cache .

    docker tag tomcat-with-splunk-java-agent:latest username/tomcat-with-splunk-java-agent:latest 

    docker push username/tomcat-with-splunk-java-agent:latest    

3. Update the ECS task definition 
----------------------------------------------------------------

Use this container image in your ECS task definition to make the splunk-otel-javaagent.jar file available to your application container, such as Tomcat:

.. code-block:: 

  {
   "family": "agent-init-container-example",
   "containerDefinitions": [
       {
           "name": "tomcat",
           "image": "tomcat:9.0",
           "cpu": 0,
           "portMappings": [
               {
                   "name": "tomcat-8080-tcp",
                   "containerPort": 8080,
                   "protocol": "tcp",
                   "appProtocol": "http"
               }
           ],
           "essential": true,
           "environment": [
               {
                   "name": "OTEL_SERVICE_NAME",
                   "value": "myservice"
               },
               {
                   "name": "OTEL_RESOURCE_ATTRIBUTES",
                   "value": "deployment.environment=test,service.version=1.0"
               },
               {
                   "name": "JAVA_TOOL_OPTIONS",
                   "value": "-javaagent:/opt/splunk/splunk-otel-javaagent.jar"
               }
           ],
           "environmentFiles": [],
           "mountPoints": [],
           "volumesFrom": [
               {
                   "sourceContainer": "splunk-java-agent",
                   "readOnly": false
               }
           ],
           "dependsOn": [
               {
                   "containerName": "splunk-java-agent",
                   "condition": "START"
               }
           ],
           "ulimits": [],
           "logConfiguration": {
               "logDriver": "awslogs",
               "options": {
                   "awslogs-create-group": "true",
                   "awslogs-group": "/ecs/agent-init-container-example",
                   "awslogs-region": "eu-west-1",
                   "awslogs-stream-prefix": "ecs"
               },
               "secretOptions": []
           }
       },
       {
           "name": "splunk-otel-collector",
           "image": "quay.io/signalfx/splunk-otel-collector:latest",
           "cpu": 0,
           "portMappings": [],
           "essential": true,
           "environment": [
               {
                   "name": "SPLUNK_CONFIG",
                   "value": "/etc/otel/collector/fargate_config.yaml"
               },
               {
                   "name": "SPLUNK_REALM",
                   "value": "<Realm - us0, us1, etc>"
               },
               {
                   "name": "SPLUNK_ACCESS_TOKEN",
                   "value": "<Access Token>"
               },
               {
                   "name": "ECS_METADATA_EXCLUDED_IMAGES",
                   "value": "[\"quay.io/signalfx/splunk-otel-collector:latest\"]"
               }
           ],
           "environmentFiles": [],
           "mountPoints": [],
           "volumesFrom": [],
           "logConfiguration": {
               "logDriver": "awslogs",
               "options": {
                   "awslogs-create-group": "true",
                   "awslogs-group": "/ecs/agent-init-container-example",
                   "awslogs-region": "eu-west-1",
                   "awslogs-stream-prefix": "ecs"
               },
               "secretOptions": []
           }
       },
       {
           "name": "splunk-java-agent",
           "image": "username/splunk-java-agent:latest",
           "cpu": 0,
           "portMappings": [],
           "essential": false,
           "environment": [],
           "environmentFiles": [],
           "mountPoints": [],
           "volumesFrom": []
       }
   ],
   "executionRoleArn": "arn:aws:iam::539254608140:role/ecsTaskExecutionRole",
   "networkMode": "awsvpc",
   "requiresCompatibilities": [
       "FARGATE"
   ],
   "cpu": "1024",
   "memory": "3072",
   "runtimePlatform": {
       "cpuArchitecture": "X86_64",
       "operatingSystemFamily": "LINUX"
   }
  }

Ensure the application container has the required environment variables for Java OpenTelemetry instrumentation: 

.. code-block:: 

           "environment": [
               {
                   "name": "OTEL_SERVICE_NAME",
                   "value": "myservice"
               },
               {
                   "name": "OTEL_RESOURCE_ATTRIBUTES",
                   "value": "deployment.environment=test,service.version=1.0"
               },
               {
                   "name": "JAVA_TOOL_OPTIONS",
                   "value": "-javaagent:/opt/splunk/splunk-otel-javaagent.jar"
               }
           ],

Next, tell the application container to get a volume from the ``splunk-java-agent`` container. Also, specify that the application container depends on the ``splunk-java-agent`` container to ensure the app can access the jar file when it starts: 

.. code-block:: 

  "volumesFrom": [
    {
      "sourceContainer": "splunk-java-agent",
      "readOnly": false
    }
    ],
  "dependsOn": [
    {
      "containerName": "splunk-java-agent",
      "condition": "START"
    }
    ],  