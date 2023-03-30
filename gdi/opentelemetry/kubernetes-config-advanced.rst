.. _otel-kubernetes-config-advanced:

*********************************************************************************
Advanced configuration for Kubernetes
*********************************************************************************

.. meta::
      :description: Advanced configurations for the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

See the following advanced configuration options for the Collector for Kubernetes. 

For basic Helm chart configuration, see :ref:`otel-kubernetes-config`. For log configuration, refer to :ref:`otel-kubernetes-config-logs`.

Override the underlying OpenTelemetry agent configuration
==============================================================

You can override the underlying OpenTelemetry agent configuration to use your own OpenTelemetry Agent configuration. To do this, include a custom configuration in the ``agent.config`` parameter in the values.yaml configuration. This custom configuration is merged into the default agent configuration. Parts of the configuration (for example, ``service``, ``pipelines``, ``logs``, and ``processors`` need to be fully re-defined after the files are merged.

The following example shows a ``values.yaml`` file with custom gateway values:

.. code-block:: yaml

   clusterName: my-cluster
   splunkObservability:
     realm: us0
     accessToken: my-access-token

   agent:
     config:
       exporters:
         otlp:
           endpoint: <custom-gateway-url>:4317
           insecure: true
         signalfx:
           ingest_url: http://<custom-gateway-url>:9943
           api_url: http://<custom-gateway-url>:6060
       service:
         pipelines:
           traces:
             exporters: [otlp, signalfx]
           metrics:
             exporters: [otlp]
           logs:
             exporters: [otlp]

   clusterReceiver:
     config:
       exporters:
         signalfx:
           ingest_url: http://<custom-gateway-url>:9943
           api_url: http://<custom-gateway-url>:6060

Run the container in non-root user mode
==================================================

Collecting logs often requires reading log files that are owned by the root user. By default, the container runs with ``securityContext.runAsUser = 0``, which gives the root user permission to read those files. To run the container in non-root user mode, set ``.agent.securityContext`` to ``20000`` to cause the container to run the required file system operations as UID and GID ``20000`` (this can be any other UID and GUI).

.. note::
  Setting the ``containerRuntime:`` parameter to ``cri-o`` did not work during internal testing for logs collection.

.. _otel-kubernetes-config-resources:

Add additional telemetry sources
===========================================

Use the ``autodetect`` configuration option to activate additional telemetry sources.

Set ``autodetect.prometheus=true`` if you want the Collector to scrape Prometheus metrics from pods that have generic Prometheus-style annotations. Add the following annotations on pods to allow a fine control of the scraping process:

* ``prometheus.io/scrape: true``: The default configuration scrapes all pods. If set to ``false``, this annotation excludes the pod from the scraping process.
* ``prometheus.io/path``: The path to scrape the metrics from. The default value is ``/metrics``.
* ``prometheus.io/port``: The port to scrape the metrics from. The default value is ``9090``.

If the Collector is running in an Istio environment, set ``autodetect.istio=true`` to make sure that all traces, metrics, and logs reported by Istio are collected in a unified manner.

For example, use the following configuration to activate automatic detection of both Prometheus and Istio telemetry sources:

.. code-block:: yaml

  splunkObservability:
    accessToken: xxxxxx
    realm: us0
  clusterName: my-k8s-cluster
  autodetect:
    istio: true
    prometheus: true

Override a control plane configuration
==============================================================

If any of the control plane metric receivers are enabled under the ``agent.controlPlaneMetrics`` configuration section, then the Helm chart will configure the Collector to use the enabled receivers to collect metrics from the control plane.

To collect control plane metrics, the Helm chart uses the Collector on each node to use the receiver creator to represent control plane receivers at runtime. The receiver creator has a set of discovery rules that know which control plane receivers to create. The default discovery rules can vary depending on the Kubernetes distribution and version. See :ref:`receiver-creator-receiver` for more information.

If your control plane is using non-standard specifications, then you can provide a custom configuration to allow the Collector to successfully connect to it.

The Collector relies on pod-level network access to collect metrics from the control plane pods. Since most cloud Kubernetes as a service distributions don't expose the control plane pods to the end user, collecting metrics from these distributions is not supported.

The following distributions are supported:

* Kubernetes 1.22 (kops created)
* OpenShift version 4.9

The following distributions are not supported:

* AKS
* EKS
* EKS/Fargate
* GKE
* GKE/Autopilot

See the :new-page:`agent template <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/templates/config/_otel-agent.tpl>` for the  default configurations for the control plane receivers.

Refer to the following documentation for information on the configuration options and supported metrics for each control plane receiver:

* :new-page:`CoreDNS <https://docs.splunk.com/Observability/gdi/coredns/coredns.html>`
* :new-page:`Kubernetes controller manager <https://docs.splunk.com/Observability/gdi/kube-controller-manager/kube-controller-manager.html>`
* :new-page:`Kubernetes API server <https://docs.splunk.com/Observability/gdi/kubernetes-apiserver/kubernetes-apiserver.html>`
* :new-page:`Kubernetes proxy <https://docs.splunk.com/Observability/gdi/kubernetes-proxy/kubernetes-proxy.html>`
* :new-page:`Kubernetes scheduler <https://docs.splunk.com/Observability/gdi/kubernetes-scheduler/kubernetes-scheduler.html>`

There is a known limitation when using the Kubernetes proxy control plane receiver. When using a kops created Kubernetes cluster, a network connectivity issue has been reported that prevents proxy metrics from being collected. The limitation can be addressed by updating the kubeProxy metric bind address in the kops cluster specification:

#. Set ``kubeProxy.metricsBindAddress: 0.0.0.0`` in the kops cluster specification.
#. Run ``kops update cluster {cluster_name}`` and ``kops rolling-update cluster {cluster_name}`` to deploy the change.

Using custom configurations for non-standard control plane components
-----------------------------------------------------------------------------

You can override the default configuration values used to connect to the control plane. If your control plane uses nonstandard ports or custom TLS settings, you need to override the default configurations. The following example shows how to connect to a nonstandard API server that uses port 3443 for metrics and custom TLS certs stored in the /etc/myapiserver/ directory.

.. code-block:: yaml

   agent:
     config:
       receivers:
         receiver_creator:
           receivers:
             # Template for overriding the discovery rule and configuration.
             # smartagent/{control_plane_receiver}:
             #   rule: {rule_value}
             #   config:
             #     {config_value}
             smartagent/kubernetes-apiserver:
               rule: type == "port" && port == 3443 && pod.labels["k8s-app"] == "kube-apiserver"
               config:
                 clientCertPath: /etc/myapiserver/clients-ca.crt
                 clientKeyPath: /etc/myapiserver/clients-ca.key
                 skipVerify: true
                 useHTTPS: true
                 useServiceAccount: false



