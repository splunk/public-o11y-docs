.. _resourcedetection-processor:

****************************
Resource detection processor
****************************

.. meta::
      :description: Use the resource detection processor to detect resources and manipulate information about them in OpenTelemetry format. Read on to learn how to configure the component.

The resource detection processor is an OpenTelemetry Collector component that can detect resources in the incoming telemetry and collect additional metadata about them. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

The resource detection processor uses detectors to collect system metadata from a variety of sources. The detection targets supported by the resource detection processor are the following:

* On-host environment variables
* On-host system information
* Amazon Web Services EC2, ECS, EKS, Elastic Beanstalk, and Lambda
* Azure instances and AKS
* Google Cloud Platform GCE, GKE, Cloud Run, Cloud Functions, and App Engine
* Consul agents
* Openshift and Kubernetes
* Docker containers
* Heroku

You can use metadata collected by the resource detection processor to expand or overwrite resource values in the collected telemetry. By default, the processor overrides existing resource metadata. You can also choose to append attributes to existing resources.

.. note:: For information about the Resource processor, see :ref:`resource-processor`.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the resource detection processor in all the predefined pipelines when deploying in host monitoring (agent) mode. When deploying the Collector in data forwarding (gateway) mode, the resource detection processor collects internal metrics. See :ref:`otel-deployment-mode` for more information.

To detect more types of resources, you can configure additional processors and add them to existing or new pipelines, as shown in the following sample configurations.

.. caution:: Don't remove the ``resourcedetection`` or the ``resourcedetection/internal`` processors from the configuration. Removing the processor might prevent Splunk Observability Cloud from collecting infrastructure metadata.

Main configuration
---------------------------------------------------

The resource attributes processor accepts a list of detectors in ``detectors``. You can specify which resource attributes are collected or ignored for each detector, as well as whether existing attributes must be overridden. See :ref:`resourcedetection-processor-metadata` for a list of detectors.

The following example shows the main configuration settings of the resource attributes processor:

.. code-block:: yaml

   resourcedetection:
     # List of detectors
     detectors: [system, ec2]
     # Whether to override existing attributes. Default is true
     override: true
     system:
       resource_attributes:
         host.name:
           enabled: true
         host.id:
           enabled: false
     ec2:
       resource_attributes:
         host.name:
           enabled: false
         host.id:
           enabled: true

.. note:: Starting from version 0.81 of the Collector, the ``attributes`` setting is deprecated. To migrate from ``attributes`` to ``resource_attributes``, see :ref:`migration-from-attributes-to-resource-attributes`.


Sample configurations
---------------------------------------------------

The following sample configurations show how to detect resources from different targets.

Collect EC2 resources and tags
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how detect resources, environment variables, and selected tags from EC2 instances without overwriting existing metadata:

.. code-block:: yaml

   processors:
     resourcedetection/ec2:
       detectors: [env, ec2]
       timeout: 2s
       override: false
       ec2:
       # List of attributes to collect or ignore
        resource_attributes:
          host.name:
            enabled: false
          host.id:
            enabled: true
       # Regex patterns for tag keys you want to add as resource attributes
         tags:
           - ^tag1$
           - ^tag2$
           - ^label.*$

Collect OpenShift resources over a TLS connection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to collect resource attributes from OpenShift and the Kubernetes API by specifying an IP address and port, as well as a TLS certificate and service token:

.. code-block:: yaml

   processors:
     resourcedetection/openshift:
       detectors: [openshift]
       timeout: 2s
       override: false
       openshift:
         address: "127.0.0.1:4444"
         token: "<token>"
         tls:
           insecure: false
           ca_file: "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"

Collect system metadata using all available sources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to use all sources available to the ``system`` detector to determine the host name. The ``resource_attributes`` field tells the processor to only include the selected attributes.

.. code-block:: yaml

   processors:
     resourcedetection/system:
       detectors: ["system"]
       system:
         # Default is "dns" and "os"
         hostname_sources: ["lookup", "cname", "dns", "os"]
         # Attributes to collect or ignore. Invalid names are ignored
         resource_attributes:
           host.name:
             enabled: true
           host.id:
             enabled: true

.. _migration-from-attributes-to-resource-attributes:

Migration from attributes to resource_attributes
---------------------------------------------------

Starting from version 0.81 of the Collector, the resource detection processor deprecates the ``attributes`` option and replaces it with ``resource_attributes``, which is specific to each detector.

To migrate, move the attributes inside of ``attributes`` to the relevant ``resource_attributes`` lists of each detector. For example, consider the following configuration:

.. code-block:: yaml

   resourcedetection:
     detectors: [system]
     # Deprecated in version 0.81
     attributes: ['host.name', 'host.id']

You can replace the previous configuration with the following:

.. code-block:: yaml

   resourcedetection:
     detectors: [system]
     system:
       resource_attributes:
         host.name:
           enabled: true
         host.id:
           enabled: true
         os.type:
           enabled: false

.. _resourceattributes-ordering-considerations:

Ordering considerations
------------------------------------

If multiple detectors insert the same attribute name, only the first detector is considered. For example, if you use the ``eks`` and ``ec2`` detectors, the value of the ``cloud.platform`` attribute is ``aws_eks`` instead of ``ec2``.

When using multiple detectors, follow this order:

* AWS: ``lambda``, ``elastic_beanstalk``, ``eks``, ``ecs``, ``ec2``
* GCP: ``gke``, ``gce``

.. _resourcedetection-processor-metadata:

Available detectors and metadata
==================================

The resource detection processor uses detectors to collect resource metadata. By default, the following detectors are active in the Splunk Distribution of OpenTelemetry Collector: ``gcp``, ``ecs``, ``ec2``, ``azure``, and ``system``.

Amazon Elastic Beanstalk metadata
------------------------------------

The ``elastic_beanstalk`` detector collects the following resource attributes by reading the AWS X-Ray configuration on all Beanstalk instances that have X-Ray activated:

* ``cloud.provider`` (Value: ``aws``)
* ``cloud.platform`` (Value: ``aws_elastic_beanstalk``)
* ``deployment.environment``
* ``service.instance.id``
* ``service.version``

Amazon EKS metadata
------------------------------------

The ``eks`` detector collects the following resource attributes:

* ``cloud.provider`` (Value: ``aws``)
* ``cloud.platform`` (Value: ``aws_eks``)

AWS EC2 metadata
------------------------------------

The ``ec2`` detector collects the following resource attributes:

* ``cloud.provider`` (Value: ``aws``)
* ``cloud.platform`` (Value: ``aws_ec2``)
* ``cloud.account.id``
* ``cloud.region``
* ``cloud.availability_zone``
* ``host.id``
* ``host.image.id``
* ``host.name``
* ``host.type``

The ``ec2`` detector can also collect tags. To collect tags, add the ``ec2:DescribeTags`` permission to the EC2 instance's policy. If you're using a proxy on the EC2 instance, allow requests for metadata.

AWS ECS metadata
------------------------------------

The ``ecs`` detector collects the following resource attributes. Only Task Metadata Endpoint (TMDE) version 3 and 4 are supported.

* ``cloud.provider`` (Value: ``aws``)
* ``cloud.platform`` (Value: ``aws_ecs``)
* ``cloud.account.id``
* ``cloud.region``
* ``cloud.availability_zone``
* ``aws.ecs.cluster.arn``
* ``aws.ecs.task.arn``
* ``aws.ecs.task.family``
* ``aws.ecs.task.revision``
* ``aws.ecs.launchtype`` (TMDE version 4 only)
* ``aws.log.group.names`` (TMDE version 4 only)
* ``aws.log.group.arns`` (TMDE version 4 only)
* ``aws.log.stream.names`` (TMDE version 4 only)
* ``aws.log.stream.arns`` (TMDE version 4 only)

AWS Lambda metadata
------------------------------------

The ``lambda`` detector collects the following resource attributes using runtime environment variables:

* ``aws.log.group.names`` (Value: ``$AWS_LAMBDA_LOG_GROUP_NAME``)
* ``aws.log.stream.names`` (Value: ``$AWS_LAMBDA_LOG_STREAM_NAME``)
* ``cloud.provider`` (Value: ``aws``)
* ``cloud.platform`` (Value: ``aws_lambda``)
* ``cloud.region`` (Value: ``$AWS_REGION``)
* ``faas.name`` (Value: ``$AWS_LAMBDA_FUNCTION_NAME``)
* ``faas.version`` (Value: ``$AWS_LAMBDA_FUNCTION_VERSION``)
* ``faas.instance`` (Value: ``$AWS_LAMBDA_LOG_STREAM_NAME``)
* ``faas.max_memory`` (Value: ``$AWS_LAMBDA_FUNCTION_MEMORY_SIZE``)

Azure metadata
------------------------------------

The ``azure`` detector collects the following resource attributes through the Azure Instance Metadata Service:

* ``cloud.provider`` (Value: ``azure``)
* ``cloud.platform`` (Value: ``azure_vm``)
* ``cloud.region``
* ``cloud.account.id`` (Value: Subscription ID)
* ``host.id`` (Value: Virtual machine ID)
* ``host.name``
* ``azure.vm.name`` (Same as ``host.name``)
* ``azure.vm.size`` (Value: Virtual machine size)
* ``azure.vm.scaleset.name`` (Value: Name of the scale set, if any)
* ``azure.resourcegroup.name`` (Value: Resource group name)

Azure AKS metadata
------------------------------------

The ``aks`` detector collects the following resource attributes:

* ``cloud.provider`` (Value: ``azure``)
* ``cloud.platform`` (Value: ``azure_aks``)

Consul metadata
------------------------------------

The ``consul`` detector collects the following resource attributes by querying a Consul agent and reading its configuration endpoint:

* ``cloud.region`` (Value: Consul data center)
* ``host.id`` (Value: Consul node id)
* ``host.name`` (Value: Consul node name)

The detector also collects all key-value pairs in Consul metadata and converts them into label-value pairs.

Docker metadata
------------------------------------

The ``docker`` detector collects the following resource attributes from the host machine by querying the Docker daemon:

* ``host.name``
* ``os.type``

For Heroku applications, the ``dyno`` ID identifies the virtualized environment.

.. note:: To contact the Docker daemon, mount the Docker socket. On Linux, the socket is ``/var/run/docker.sock``.

Environment variables
------------------------------------

The ``env`` detector collects resource information from the ``OTEL_RESOURCE_ATTRIBUTES`` environment variable as a list of key-value pairs separated by the ``=`` character.

GCP metadata
------------------------------------

The ``gcp`` detector uses the Google Cloud client libraries to read resource information from the metadata server, as well as environment variables. The detector uses the metadata to determine which GCP application is running and extracts relevant attributes.

GCE metadata
^^^^^^^^^^^^^^^^^^^^

The ``gcp`` detector collects the following resource attributes from GCE:

* ``cloud.provider`` (Value: ``gcp``)
* ``cloud.platform`` (Value: ``gcp_compute_engine``)
* ``cloud.account.id`` (Value: Project ID)
* ``cloud.region `` (For example, ``us-central1``)
* ``cloud.availability_zone`` (For example, ``us-central1-c``)
* ``host.id`` (Value: Instance ID)
* ``host.name`` (Value: Instance name)
* ``host.type`` (Value: Machine type)

GKE metadata
^^^^^^^^^^^^^^^^^^^^

The ``gcp`` detector collects the following resource attributes from GKE:

* ``cloud.provider`` (Value: ``gcp``)
* ``cloud.platform`` (Value: ``gcp_kubernetes_engine``)
* ``cloud.account.id`` (Value: Project ID)
* ``cloud.region`` (Only for regional GKE clusters. For example, ``us-central1``)
* ``cloud.availability_zone`` (Only for zonal GKE clusters. For example, ``us-central1-c``)
* ``k8s.cluster.name``
* ``host.id`` (Value: Instance ID)
* ``host.name`` (Value: Instance name, only when workload identity is deactivated)

Google App Engine metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``gcp`` detector collects the following resource attributes from Google App Engine:

* ``cloud.provider`` (Value: ``gcp``)
* ``cloud.platform`` (Value: ``gcp_app_engine``)
* ``cloud.account.id`` (Value: Project ID)
* ``cloud.region`` (For example, ``us-central1``)
* ``cloud.availability_zone`` (For example: ``us-central1-c``)
* ``faas.id`` (Value: Instance ID)
* ``faas.name`` (Value: Service name)
* ``faas.version`` (service version)

Google Cloud Run metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``gcp`` detector collects the following resource attributes from Google Cloud Run:

* ``cloud.provider`` (Value: ``gcp``)
* ``cloud.platform`` (Value: ``gcp_cloud_run``)
* ``cloud.account.id`` (Value: Project ID)
* ``cloud.region`` (For example, ``us-central1``)
* ``faas.id`` (Value: Instance ID)
* ``faas.name`` (Value: Service name)
* ``faas.version`` (Value: Service version)

Google Cloud Functions metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ``gcp`` detector collects the following resource attributes from Google Cloud Functions:

* ``cloud.provider`` (Value: ``gcp``)
* ``cloud.platform`` (Value: ``gcp_cloud_functions``)
* ``cloud.account.id`` (Value: Project ID)
* ``cloud.region`` (For example, ``us-central1``)
* ``faas.id`` (Value: Instance ID)
* ``faas.name`` (function name)
* ``faas.version`` (function version)

Heroku metadata
------------------------------------

The ``heroku`` detector collects the following resource attributes through the Heroku metadata feature:

* ``heroku.release.version`` (Value: Identifier for the current release)
* ``heroku.release.creation_timestamp`` (Value: Creation time and date of the release)
* ``heroku.release.commit`` (Value: Commit hash for the current release)
* ``heroku.app.name`` (Value: Application name)
* ``heroku.app.id`` (Value: Unique identifier for the application)
* ``heroku.dyno.id`` (Value: Dyno identifier. Used as host name)

.. note:: Activate the Heroku metadata feature for your application before using the ``heroku`` detector.

Openshift metadata
------------------------------------

The ``openshift`` detector collects the following resource attributes by querying the OpenShift and Kubernetes API:

* ``cloud.provider``
* ``cloud.platform``
* ``cloud.region``
* ``k8s.cluster.name``

By default, the detector determines the API address using the ``KUBERNETES_SERVICE_HOST`` and ``KUBERNETES_SERVICE_PORT`` environment variables; the default service token is ``/var/run/secrets/kubernetes.io/serviceaccount/token``. If TLS is active and you don't define a CA file, the detector uses the certificate in ``/var/run/secrets/kubernetes.io/serviceaccount/ca.crt``. All settings can be overridden in the configuration.

System metadata
------------------------------------

The ``system`` detector collects the following resource attributes:

* ``host.name``
* ``host.id``
* ``os.type``

By default, the ``host.name`` attribute is the fully qualified domain name (FQDN) when available. The detector uses the host name as fallback.

The default configuration of the detector is ``hostname_sources: ["dns", "os"]``, which can be overridden using the following supported values: 

* ``cname``: Canonical name.
* ``dns``: Either the host name from the ``hosts`` file, the ``CNAME``, or the result of a reverse DNS query, in that order.
* ``lookup``: Reverse DNS lookup of the current host's IP address.
* ``os``: Host name provided by the local machine's kernel.

To avoid using the FQDN, set the value of the ``hostname_sources`` field to ``os``.

.. note:: Use the ``docker`` detector if you're running the Collector as a Docker container.

.. _resourcedetection-processor-settings:

Settings
======================

The following table shows the configuration options for the resource detection processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/resourcedetection.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
