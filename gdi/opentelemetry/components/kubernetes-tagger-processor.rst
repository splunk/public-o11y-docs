.. _kubernetes-attributes-processor:

*********************************
Kubernetes attributes processor
*********************************

.. meta::
      :description: Use the Kubernetes attributes processor to update, add, or delete resource attributes. Read on to learn how to configure the component.

The Kubernetes attributes processor, also known as k8s_tagger, is an OpenTelemetry Collector component that can set resource attributes using Kubernetes metadata. The processor automatically discovers Kubernetes resources, extracts metadata from them, and adds the extracted metadata to the relevant spans, metrics and logs as resource attributes. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Kubernetes attributes processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the Kubernetes attributes processor, add ``resource`` to the ``processors`` section of your
configuration file, as shown in the following example:

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

Association lists
----------------------------

You can define rules for associating data passing through the processor with Pod metadata using the ``pod_association`` field, which represents a list of associations executed in the specified order until the first one matches.

Each association is a list of sources. Sources contain rules. The processor executes all rules and produce a metadata cache key as a result. To apply an association, each source has to be successfully retrieved from a log, trace, or metric. If you don't configure association rules, the processor associate resources using the IP address of the connection.

Each source rule consists of a pair of ``from`` and ``name`` statements, representing the rule type and attribute name respectively. You can define two types of ``from`` statements:

- ``from: connection``: Extracts the IP address attribute from the connection context, if available.
- ``from: resource_attribute``: Specifies the attribute name to search in the list of attributes.

The following example shows the two type of ``from`` source statements in pod association rules:

.. code-block:: yaml

   pod_association:
     - sources:
         - from: resource_attribute
           name: k8s.pod.ip
     # Association matches for pair `k8s.pod.name` and `k8s.namespace.name`
     - sources:
         - from: resource_attribute
           name: k8s.pod.name
         - from: resource_attribute
           name: k8s.namespace.name

Extracted metadata
----------------------------

You can use the ``metadata`` option to define what resource attributes you want to add. Only attribute names from metadata can be used in the ``pod_association.resource_attribute`` option. Empty or nonexisting values are ignored.

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

The following container level attributes require additional attributes to identify a particular container in a pod:

* Container spec attributes: Set only if ``k8s.container.name`` is available as a resource attribute.

   * ``container.image.name``
   * ``container.image.tag``

* Container attributes: Set only if ``k8s.container.name`` is available as a resource attribute. Set the ``k8s.container.restart_count`` resource attribute to retrieve the association with a particular container instance. If ``k8s.container.restart_count`` is not set, the last container instance is used.

   * ``container.id``: Must be available in the metadata.

Use pods and namespaces labels and annotations
---------------------------------------------------

The Kubernetes attributes processor can also set resource attributes from Kubernetes labels and annotations of pods and namespaces. This configuration is available through the ``annotations`` and ``labels`` lists. 

Annotations and labels are extracted from pods and namespaces and added to spans, metrics, and logs. Each item is specified using the following parameters:

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

Role-based access control
-----------------------------

The k8sattributesprocessor needs get, watch and list permissions on both pods and namespaces resources, for all namespaces and pods included in the configured filters. Here is an example of a ClusterRole to give a ServiceAccount the necessary permissions for all pods and namespaces in the cluster (replace <OTEL_COL_NAMESPACE> with a namespace where collector is deployed):

.. code-block:: yaml

   apiVersion: v1
   kind: ServiceAccount
   metadata:
      name: collector
      namespace: <OTEL_COL_NAMESPACE>
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
     namespace: <OTEL_COL_NAMESPACE>
   roleRef:
      kind: ClusterRole
      name: otel-collector
      apiGroup: rbac.authorization.k8s.io

Deployment scenarios
The processor can be used in collectors deployed both as an agent (Kubernetes DaemonSet) or as a gateway (Kubernetes Deployment).

As an agent
When running as an agent, the processor detects IP addresses of pods sending spans, metrics or logs to the agent and uses this information to extract metadata from pods. When running as an agent, it is important to apply a discovery filter so that the processor only discovers pods from the same host that it is running on. Not using such a filter can result in unnecessary resource usage especially on very large clusters. Once the filter is applied, each processor will only query the k8s API for pods running on it's own node.

Node filter can be applied by setting the filter.node config option to the name of a k8s node. While this works as expected, it cannot be used to automatically filter pods by the same node that the processor is running on in most cases as it is not know before hand which node a pod will be scheduled on. Luckily, kubernetes has a solution for this called the downward API. To automatically filter pods by the node the processor is running on, you'll need to complete the following steps:

Use the downward API to inject the node name as an environment variable. Add the following snippet under the pod env section of the OpenTelemetry container.
1. spec:
  containers:
  - env:
    - name: KUBE_NODE_NAME
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: spec.nodeName
This will inject a new environment variable to the OpenTelemetry container with the value as the name of the node the pod was scheduled to run on.

Set "filter.node_from_env_var" to the name of the environment variable holding the node name.
k8sattributes:
  filter:
    node_from_env_var: KUBE_NODE_NAME # this should be same as the var name used in previous step
This will restrict each OpenTelemetry agent to query pods running on the same node only dramatically reducing resource requirements for very large clusters.

As a gateway
When running as a gateway, the processor cannot correctly detect the IP address of the pods generating the telemetry data without any of the well-known IP attributes, when it receives them from an agent instead of receiving them directly from the pods. To workaround this issue, agents deployed with the k8sattributes processor can be configured to detect the IP addresses and forward them along with the telemetry data resources. Collector can then match this IP address with k8s pods and enrich the records with the metadata. In order to set this up, you'll need to complete the following steps:

Setup agents in passthrough mode Configure the agents' k8sattributes processors to run in passthrough mode.
# k8sattributes config for agent
k8sattributes:
  passthrough: true
This will ensure that the agents detect the IP address as add it as an attribute to all telemetry resources. Agents will not make any k8s API calls, do any discovery of pods or extract any metadata.

Configure the collector as usual No special configuration changes are needed to be made on the collector. It'll automatically detect the IP address of spans, logs and metrics sent by the agents as well as directly by other services/pods.
Caveats
There are some edge-cases and scenarios where k8sattributes will not work properly.

Host networking mode
The processor cannot correct identify pods running in the host network mode and enriching telemetry data generated by such pods is not supported at the moment, unless the association rule is not based on IP attribute.

As a sidecar
The processor does not support detecting containers from the same pods when running as a sidecar. While this can be done, we think it is simpler to just use the kubernetes downward API to inject environment variables into the pods and directly use their values as tags.

.. _resource-processor-settings:

Settings
======================

The following table shows the configuration options for the Kubernetes attributes processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/k8sattributes.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
