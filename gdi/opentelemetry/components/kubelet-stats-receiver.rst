.. _kubelet-stats-receiver:

**************************
Kubelet stats receiver
**************************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the kubelet-stats receiver. See benefits, install, configuration, and metrics.

The Kubelet stats receiver pulls pod metrics from the Kubernetes API server on a kubelet and sends them through the metrics pipeline for further processing. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

.. note:: This receiver replaces the ``kubelet-stats``, ``kubelet-metrics``, and ``kubernetes-volumes`` Smart Agent monitors.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Kubelet stats receiver as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

A kubelet runs on a Kubernetes node and has an API server to which the Kubelet stats receiver connects. To configure the receiver, set the connection and authentication details, and how often you want to collect data and send it.

There are two ways to authenticate, as indicated by the ``auth_type`` field:

-  ``tls`` tells the receiver to use TLS for authentication and requires that the ``ca_file``, ``key_file``, and ``cert_file`` fields.
-  ``ServiceAccount`` tells this receiver to use the default service account token to authenticate to the kubelet API.

Configure TLS authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to configure the kubelet stats receiver with TLS authentication:

.. code:: yaml

   receivers:
     kubeletstats:
       collection_interval: 20s
       auth_type: "tls"
       ca_file: "/path/to/ca.crt"
       key_file: "/path/to/apiserver.key"
       cert_file: "/path/to/apiserver.crt"
       endpoint: "192.168.64.1:10250"
       insecure_skip_verify: true

   exporters:
     file:
       path: "fileexporter.txt"
       
   service:
     pipelines:
       metrics:
         receivers: [kubeletstats]
         exporters: [file]

Configure service account authentication
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to configure the ``kubeletstats`` receiver with service account authentication.

1. Make sure the pod spec sets the node name:

   .. code:: yaml

      env:
        - name: K8S_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName

2. Activate the Collector to reference the ``K8S_NODE_NAME`` environment variable:

.. code:: yaml

   receivers:
     kubeletstats:
       collection_interval: 20s
       auth_type: "serviceAccount"
       endpoint: "${K8S_NODE_NAME}:10250"
       insecure_skip_verify: true
   exporters:
     file:
       path: "fileexporter.txt"
   service:
     pipelines:
       metrics:
         receivers: [kubeletstats]
         exporters: [file]

.. caution:: A missing or empty ``endpoint`` value causes the host name on which the Collector is running to be used as the endpoint. If the ``hostNetwork`` flag is set, and the Collector is running in a Pod, the host name resolves to the node's network namespace.

Add metrics excluded by default
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To import excluded metrics, use the ``include_metrics`` option as in the following example:

.. code:: yaml

   exporters:
     signalfx:
       include_metrics:
         - metric_names:
             - container.memory.rss.bytes
             - container.memory.available.bytes  

Add additional metadata attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, all produced metrics get resource attributes based on what kubelet the ``/stats/summary`` endpoint provides. For some use cases, this might not be enough: use other endpoints to retrieve additional metadata entities and set them as extra attributes on the metric resource.

The kubelet stats receiver supports the following metadata:

-  ``container.id``: Enriches metric metadata with the Container ID label obtained from container statuses exposed using ``/pods``.
-  ``k8s.volume.type``: Collects the volume type from the Pod spec exposed using ``/pods`` and add it as an attribute to volume metrics. If more metadata than the volume type is available, the receiver syncs it depending on the available fields and the type of volume. For example, ``aws.volume.id`` is synced from ``awsElasticBlockStore`` and ``gcp.pd.name`` is synced from ``gcePersistentDisk``.

To add the ``container.id`` label to your metrics, set the ``extra_metadata_labels`` field. For example:

.. code:: yaml

   receivers:
     kubeletstats:
       collection_interval: 10s
       auth_type: "serviceAccount"
       endpoint: "${K8S_NODE_NAME}:10250"
       insecure_skip_verify: true
       extra_metadata_labels:
         - container.id

If ``extra_metadata_labels`` isn't set, no additional API calls are made to receive metadata.

Collect additional volume metadata
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When dealing with persistent volume claims, you can sync metadata from the underlying storage resource. For example:

.. code:: yaml

   receivers:
     kubeletstats:
       collection_interval: 10s
       auth_type: "serviceAccount"
       endpoint: "${K8S_NODE_NAME}:10250"
       insecure_skip_verify: true
       extra_metadata_labels:
         - k8s.volume.type
       k8s_api_config:
         auth_type: serviceAccount

If ``k8s_api_config`` is set, the receiver attempts to collect metadata from underlying storage resources for persistent volume claims. For example, if a Pod is using a persistent volume claim backed by an Elastic Block Store (EBS) instance on AWS, the receiver sets the ``k8s.volume.type`` label to ``awsElasticBlockStore`` rather than ``persistentVolumeClaim``.

Configure metric groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A metric group is a collection of metrics by component type. By default, metrics from containers, pods, and nodes are collected. If ``metric_groups`` is set, then only metrics from the listed groups are collected. Valid groups are ``container``, ``pod``, ``node``, and ``volume``.

For example, to collect only node and pod metrics from the receiver:

.. code:: yaml

   receivers:
     kubeletstats:
       collection_interval: 10s
       auth_type: "serviceAccount"
       endpoint: "${K8S_NODE_NAME}:10250"
       insecure_skip_verify: true
       metric_groups:
         - node
         - pod

Configure optional parameters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can also set the following optional parameters:

-  ``collection_interval``, which is the interval at which to collect
   data. The default value is ``10s``.
-  ``insecure_skip_verify``, which specifies whether or not to skip
   server certificate chain and host name verification. The default
   value is ``false``.

Settings
======================

The following table shows the configuration options for the Kubelet stats receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/kubeletstats.yaml"></div>

Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/kubeletstatsreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
