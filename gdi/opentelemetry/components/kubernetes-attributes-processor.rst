.. _kubernetes-attributes-processor:

*********************************
Kubernetes attributes processor
*********************************

.. meta::
      :description: Use the Kubernetes attributes processor to update, add, or delete resource attributes. Read on to learn how to configure the component.

The Kubernetes attributes processor is an OpenTelemetry Collector component that manages resource attributes using Kubernetes metadata. The processor automatically discovers resources, extracts metadata from them, and adds the metadata to relevant spans, metrics and logs as resource attributes. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

.. caution:: Don't remove the Kubernetes attributes processor from your configuration. Default attributes extracted by the processor, such as ``k8s.pod.name``, are required for Splunk Observability Cloud capabilities, such as Kuberbetes navigator, Related Content, and accurate subscription usage.

Get started
======================

The Helm chart for the Splunk Distribution of OpenTelemetry Collector already includes the Kubernetes attributes processor, which is activated by default for all deployment modes. See :ref:`helm-chart`.

To manually configure the Kubernetes attributes processor, follow these steps:

#. :ref:`configure-rbac-k8sattributes`
#. :ref:`configure-filter-k8sattributes`
#. :ref:`configure-extracted-metadata-k8sattributes`
#. :ref:`configure-association-lists-k8sattributes`
#. :ref:`configure-labels-k8sattributes`

.. _configure-rbac-k8sattributes:

Configure role-based access control
--------------------------------------

The Kubernetes attributes processor requires ``get``, ``watch`` and ``list`` permissions on both ``pods`` and ``namespaces`` resources for all namespaces and pods included in the configured filters. 

The following example shows how to give a ServiceAccount the necessary permissions for all pods and namespaces in a cluster. Replace ``<col_namespace>`` with the namespace where you've deployed the Collector:

.. code-block:: yaml

   apiVersion: v1
   kind: ServiceAccount
   metadata:
      name: collector
      namespace: <col_namespace>

   ---

   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRole
   metadata:
      name: otel-collector
   rules:
      - apiGroups: [""]
      resources: ["pods", "namespaces"]
      verbs: ["get", "watch", "list"]
   
   ---
   
   apiVersion: rbac.authorization.k8s.io/v1
   kind: ClusterRoleBinding
   metadata:
      name: otel-collector
   subjects:
   - kind: ServiceAccount
     name: collector
     namespace: <col_namespace>
   roleRef:
      kind: ClusterRole
      name: otel-collector
      apiGroup: rbac.authorization.k8s.io

Sample configuration
---------------------------

The following example contains a list of extracted metadata, Kubernetes annotations and labels, and an association list:

.. code:: yaml

   k8sattributes/demo:
     auth_type: "serviceAccount"
     passthrough: false
     filter:
       node_from_env_var: <KUBE_NODE_NAME>
     extract:
       metadata:
         - k8s.pod.name
         - k8s.pod.uid
         - k8s.deployment.name
         - k8s.namespace.name
         - k8s.node.name
         - k8s.pod.start_time
     annotations:
       - key_regex: opentel.* # extracts Keys & values of annotations matching regex `opentel.*`
         from: pod
     labels:
       - key_regex: opentel.* # extracts Keys & values of labels matching regex `opentel.*`
         from: pod
     pod_association:
       - sources:
          - from: resource_attribute
            name: k8s.pod.ip
       - sources:
          - from: resource_attribute
            name: k8s.pod.uid
       - sources:
          - from: connection

To complete the configuration, include the receiver in any pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         processors: [k8sattributes/demo]
       logs:
         processors: [k8sattributes/demo]
       traces:
         processors: [k8sattributes/demo]

.. _configure-filter-k8sattributes:

Discovery filters
-------------------------------------

You can use the Kubernetes attributes processor in Collectors deployed either as agents or as gateways, using DaemonSets or Deployments respectively. See :ref:`otel-deployment-mode` for more information.

Agent configuration
^^^^^^^^^^^^^^^^^^^^^^^^^

In host monitoring (agent) mode, the processor detects IP addresses of pods sending spans, metrics, or logs to the agent and uses this information to extract metadata from pods.

When running the Collector in host monitoring (agent) mode, apply a discovery filter so that only pods from the same host the Collector is running on are discovered. Using a discovery filter also optimizes resource consumption on large clusters.

To automatically filter pods by the node the processors is running on, configure the Downward API to inject the node name as an environment variable. For example:

.. code-block:: yaml

   spec:
     containers:
     - env:
       - name: KUBE_NODE_NAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName

Then, set the ``filter.node_from_env_var`` field to the name of the environment variable that containes the name of the node. For example:

.. code-block:: yaml

   k8sattributes:
     filter:
       node_from_env_var: KUBE_NODE_NAME

Gateway configuration
^^^^^^^^^^^^^^^^^^^^^^^^^

The processor can't resolve the IP address of the pods that emit telemetry data when running in data forwarding (gateway) mode. To receive the correct IP addresses in a Collector gateway, configure the agents to forward addresses.

To forward IP addresses to gateways, configure the Collectors in host monitoring (agent) mode to run in passthrough mode. This ensures that agents detect IP addresses and pass them as an attribute attached to all telemetry resources.

.. code-block:: yaml

   k8sattributes:
     passthrough: true

Then, configure the Collector gateways as usual. The processor automatically detects the IP addresses of spans, logs, and metrics sent by the agents or by other sources, and call the Kubernetes API to extract metadata.

.. _configure-extracted-metadata-k8sattributes:

Extracted metadata
----------------------------

Use the ``metadata`` option to define what resource attributes you want to add. You can only use attribute names from existing metadata defined in ``pod_association.resource_attribute``. The processor ignores empty or nonexisting values.

The following attributes are added by default:

* ``k8s.namespace.name``
* ``k8s.pod.name``
* ``k8s.pod.uid``
* ``k8s.pod.start_time``
* ``k8s.deployment.name``
* ``k8s.node.name``

You can change this list by adding a ``metadata`` section. For example:

.. code-block:: yaml

   k8sattributes:
     auth_type: "serviceAccount"
     passthrough: false
     filter:
       node_from_env_var: KUBE_NODE_NAME
     extract:
       metadata:
         - k8s.pod.name
         - k8s.pod.uid
         - k8s.deployment.name
         - k8s.namespace.name
         - k8s.node.name
         - k8s.pod.start_time

.. caution:: Make sure that default attributes, such as ``k8s.pod.name``, are always extracted, as they're required for Splunk Observability Cloud capabilities, such as Kuberbetes navigator, Related Content, and accurate subscription usage.

The following container level attributes require additional attributes to identify a container in a pod:

* Container spec attributes: Set only if ``k8s.container.name`` is available as a resource attribute.

   * ``container.image.name``
   * ``container.image.tag``

* Container attributes: Set only if ``k8s.container.name`` is available as a resource attribute. 

   * ``container.id``: Must be available in the metadata.

.. note:: Set the ``k8s.container.restart_count`` resource attribute to retrieve the association with a particular container instance. If ``k8s.container.restart_count`` is not set, the last container instance is used.

.. _configure-association-lists-k8sattributes:

Association lists
----------------------------

Define rules for associating data passing through the processor with pod metadata using the ``pod_association`` field, which represents a list of associations executed in the specified order until the first match.

Each association is a list of sources. Sources contain rules. The processor executes all rules and produce a metadata cache key as a result. For example:

.. code-block:: yaml

   pod_association:
    # List of associations
     - sources:
         # List of sources. Each cointains rules
         - from: resource_attribute
           name: k8s.pod.name
         - from: resource_attribute
           name: k8s.namespace.name

To apply an association, each source has to be successfully retrieved from a log, trace, or metric. If you don't configure association rules, the processor associates resources using the connection's address.

Each source rule consists of a pair of ``from`` and ``name`` statements, representing the rule type and attribute name respectively. You can define two types of ``from`` statements:

- ``from: connection``: Extracts the IP address attribute from the connection context, if available.
- ``from: resource_attribute``: Specifies the attribute name to search in the list of attributes.

The following example shows the two type of ``from`` source statements in pod association rules:

.. code-block:: yaml

   pod_association:
     - sources:
       - from: resource_attribute
         name: ip
     - sources:
       - from: resource_attribute
         name: k8s.pod.ip
     - sources:
       - from: resource_attribute
         name: host.name
     - sources:
       - from: connection
         name: ip

.. _configure-labels-k8sattributes:

Kubernetes labels and annotations
---------------------------------------------------

The Kubernetes attributes processor can also set resource attributes from Kubernetes labels and annotations of pods and namespaces. You can configure this through the ``annotations`` and ``labels`` lists inside ``extract``.

The processor extracts annotations and labels from pods and namespaces and adds them to spans, metrics, and logs. You can specify each item using the following parameters:

* ``tag_name``: Name used to tag telemetry.
* ``key``: Key used to extract the value.
* ``from``: Kubernetes object used to extract the value. The two possible values are ``pod`` and ``namespace``. The default value is ``namespace``.

For example:

.. code-block:: yaml

   annotations:
   # Extracts value of annotation from pods with key `annotation-one`
   # and inserts it as a tag with key `a1`
     - tag_name: a1 
       key: annotation-one
       from: pod
   # Extracts value of annotation from namespaces with key `annotation-two` 
   # with regular expressions and inserts it as a tag with key `a2`
     - tag_name: a2
       key: annotation-two
       regex: field=(?P<value>.+)
       from: namespace

   labels:
   # Extracts value of label from namespaces with key `label1`
   # and inserts it as a tag with key `l1`
     - tag_name: l1
       key: label1
       from: namespace
   # Extracts value of label from pods with key `label2` with
   #  regular expressions and inserts it as a tag with key `l2`
     - tag_name: l2
       key: label2
       regex: field=(?P<value>.+)
       from: pod

.. _kubernetes-attributes-processor-settings:

Settings
======================

The following table shows the configuration options for the Kubernetes attributes processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/k8sattributes.yaml"></div>

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/k8sattributesprocessor.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Known limitations
=======================

The Kubernetes attributes processor doesn't work well in the following cases.

Host networking mode
---------------------------

The processor can't identify pods running in the host network mode. Enriching telemetry data generated by such pods only works if the association rule isn't based on the IP address attribute.

Sidecar
------------------------------

The processor can't detect containers from the same pods when running as a sidecar. Instead, use the Kubernetes Downward API to inject environment variables into the pods and use their values as tags.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
