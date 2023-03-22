.. _kubelet-stats-receiver:

Kubelet Stats receiver
**************************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the kubelet-stats receiver. See benefits, install, configuration, and metrics.

The ``kubeletstats`` receiver pulls pod metrics from the Kubernetes API
server on a kubelet and sends them through the metrics pipeline for
further processing. The supported pipeline type is metrics.

This receiver is a native OpenTelemetry receiver that replaces the
``kubelet-stats``, ``kubelet-metrics``, and ``kubernetes-volumes``
SignalFx Smart Agent monitors.

.. note:: This receiver is in beta and configuration fields are subject to change.

Installation
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   
   - :ref:`otel-install-windows`
   
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Configuration
======================

A kubelet runs on a Kubernetes node and has an API server to which this
receiver connects. To configure this receiver, configure connection and
authentication to the API server, and how often to collect data and send
them to the next consumer.

There are two ways to authenticate, driven by the ``auth_type`` field:

-  ``tls`` tells the receiver to use TLS for authentication and requires
   that the fields ``ca_file``, ``key_file``, and ``cert_file`` be set.
-  ``ServiceAccount`` tells this receiver to use the default service
   account token to authenticate to the kubelet API.

Configure TLS authentication
---------------------------------------

The following example shows how to configure the ``kubeletstats``
receiver with TLS authentication:

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
---------------------------------------------

This section shows how to configure the ``kubeletstats`` receiver with
service account authentication.

Make sure the pod spec sets the node name:

.. code:: yaml

   env:
     - name: K8S_NODE_NAME
       valueFrom:
         fieldRef:
           fieldPath: spec.nodeName

Activate the Collector to reference the ``K8S_NODE_NAME`` environment
variable:

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

.. caution:: A missing or empty ``endpoint`` value causes the host name on which the Collector is running to be used as the endpoint. If the ``hostNetwork`` flag is set, and the Collector is running in a Pod, this host name resolves to the node's network namespace.

Add metrics excluded by default
---------------------------------------------

To import excluded metrics, use ``include_metrics``.

.. code:: yaml

   exporters:
     signalfx:
       include_metrics:
         - metric_names:
             - container.memory.rss.bytes
             - container.memory.available.bytes  

Add extra metadata labels
--------------------------------------

By default, all produced metrics get resource labels based on what
kubelet the ``/stats/summary`` endpoint provides. For some use cases,
this many not be enough. Use other endpoints to fetch additional
metadata entities and set them as extra labels on the metric resource.
The following metadata is supported:

-  ``container.id`` to augment metrics with the Container ID label
   obtained from container statuses exposed using ``/pods``.
-  ``k8s.volume.type`` to collect the volume type from the Pod spec
   exposed using ``/pods`` and have it as a label on volume metrics. If
   there is more information available from the endpoint than just
   volume type, those are synced as well, depending on the available
   fields and the type of volume. For example, ``aws.volume.id`` is
   synced from ``awsElasticBlockStore``, and ``gcp.pd.name`` is synced
   from ``gcePersistentDisk``.

To add the ``container.id`` label to your metrics, set the
``extra_metadata_labels`` field. For example:

.. code:: yaml

   receivers:
     kubeletstats:
       collection_interval: 10s
       auth_type: "serviceAccount"
       endpoint: "${K8S_NODE_NAME}:10250"
       insecure_skip_verify: true
       extra_metadata_labels:
         - container.id

If ``extra_metadata_labels`` is not set, then no additional API calls
are done to fetch extra metadata.

Collect additional volume metadata
---------------------------------------

When dealing with persistent volume claims, it is possible to optionally
sync metadata from the underlying storage resource rather than just the
volume claim by talking to the Kubernetes API. For example:

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

As shown in the example, if ``k8s_api_config`` is set, the receiver
attempts to collect metadata from underlying storage resources for
persistent volume claims. For example, if a Pod is using a persistent
volume claim backed by an EBS instance on AWS, the receiver would set
the ``k8s.volume.type`` label to ``awsElasticBlockStore`` rather than
``persistentVolumeClaim``.

Configure metric groups
-----------------------------

A metric group is a collection of metrics by component type. By default,
metrics from containers, pods, and nodes are collected. If
``metric_groups`` is set, then only metrics from the listed groups are
collected. Valid groups are ``container``, ``pod``, ``node``, and
``volume``. For example, to collect only node and pod metrics from the
receiver:

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
----------------------------------

The following parameters can also be specified:

-  ``collection_interval``, which is the interval at which to collect
   data. The default value is ``10s``.
-  ``insecure_skip_verify``, which specifies whether or not to skip
   server certificate chain and host name verification. The default
   value is ``false``.

Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/kubeletstatsreceiver.yaml"></div>


Get help
======================

.. include:: /_includes/troubleshooting-components.rst
