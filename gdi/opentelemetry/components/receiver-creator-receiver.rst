.. _receiver-creator-receiver:

*************************
Receiver creator receiver
*************************

.. meta::
      :description: Use the receiver creator to create receivers at runtime in the OpenTelemetry Collector based on rules. Read on to learn how to configure the component.

The receiver creator receiver allows the Splunk Distribution of OpenTelemetry Collector to create new receivers at runtime based on configured rules and observer extensions. The supported pipeline types are ``metrics``, ``traces``, and ``logs``. See :ref:`otel-data-processing` for more information.

You can use any of the following observer extensions as listeners for the receiver creator:

- ``docker_observer``: Detects and reports running container endpoints through the Docker API.
- ``ecs_task_observer``: Detects and reports container endpoints for running ECS tasks.
- ``host_observer``: Discovers listening network endpoints of the current host.
- ``k8s_observer``: Detects and reports Kubernetes pod, port, and node endpoints through the Kubernetes API.

This receiver can use other receivers for applications and hosts, like the ``kubeletstats`` or ``hostmetrics`` receivers. A typical use case of the receiver creator is to collect metrics for infrastructure that is deployed dynamically, such as Kubernetes pods or Docker containers. 

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver creator receiver as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the receiver creator receiver, add the desired extensions to the ``extensions`` section of your configuration file, followed by ``receiver_creator`` instances in the ``receivers`` section. For example:

.. code-block:: yaml

   extensions:
      # Configures the Kubernetes observer to watch for pod start and stop events.
      k8s_observer:

   receivers:
     receiver_creator/k8skubeletstats:
       watch_observers: [k8s_observer]
       receivers:
         kubeletstats:
           # If this rule matches an instance of this receiver will be started.
           rule: type == "k8s.node"
           config:
             auth_type: serviceAccount
             collection_interval: 15s
             endpoint: '`endpoint`:`kubelet_endpoint_port`'
             extra_metadata_labels:
               - container.id
             metric_groups:
               - container
               - pod
               - node

   service:
     extensions: [k8s_observer]
     pipelines:
       metrics:
         receivers: [receiver_creator/k8skubeletstats]

You can nest and configure any supported receiver inside the ``receivers`` section of a ``receiver_creator`` configuration. Which receiver you can nest depends on the type of infrastructure the receiver creator is watching through the extensions defined in ``watch_observers``.

Rules expressions
------------------------------------

New receivers are created dynamically based on rules. Each rule must start with ``type == ("pod"|"port"|"hostport"|"container"|"k8s.node") &&`` such that the rule matches only one endpoint type. For a list of variable available to each endpoint type, see :new-page:`Rules expressions <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md#rule-expressions>` on GitHub.


Docker observer example
------------------------------------

The following example shows how to configure the receiver creator using the Docker observer:

.. code-block:: yaml

   extensions:
     docker_observer:
       # Default is unix:///var/run/docker.sock
       # Collector must have read access to the Docker Engine API 
       endpoint: path/to/docker.sock
       excluded_images: ['redis', 'another_image_name']
       # Docker observer requires Docker API version 1.22 or higher
       api_version: 1.42
       # Time to wait for a response from Docker API. Default is 5 seconds
       timeout: 15s

   receivers:
     receiver_creator:
       watch_observers: [docker_observer]
       receivers:
         nginx:
           rule: type == "container" and name matches "nginx" and port == 80
           config:
             endpoint: '`endpoint`/status'
             collection_interval: 10s

.. note:: See :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/dockerobserver/README.md` for a complete list of settings.

Kubernetes observer example
------------------------------------

The following example shows how to configure the receiver creator using the Kubernetes observer:

.. code-block:: yaml

   extensions:
     k8s_observer:
       auth_type: serviceAccount
       # Can be set to the node name to limit discovered endpoints
       # The value can be obtained using the downward API 
       node: ${env:K8S_NODE_NAME}
       observe_pods: true
       observe_nodes: true

   receivers:
     receiver_creator:
       watch_observers: [k8s_observer]
       receivers:
         kubeletstats:
           rule: type == "k8s.node"
           config:
             auth_type: serviceAccount
             collection_interval: 10s
             endpoint: "`endpoint`:`kubelet_endpoint_port`"
             extra_metadata_labels:
               - container.id
             metric_groups:
               - container
               - pod
               - node

.. note:: See :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/k8sobserver/README.md` for a complete list of settings.

Settings
======================

The following table shows the configuration options for the receiver creator receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/receiver_creator.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
