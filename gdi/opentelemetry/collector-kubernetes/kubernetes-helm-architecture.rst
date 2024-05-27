.. _kubernetes-helm-architecture:

*****************************************************
Helm architecture and components
*****************************************************

.. meta::
      :description: Describes the architecture and components of the Splunk Distribution of the OpenTelemetry Collector for Kubernetes.

See an overview of the Helm architecture of the Splunk Distribution of the OpenTelemetry Collector for Kubernetes.

.. _helm-chart-components:

Helm chart components
==============================================

The Helm chart for the Collector has three components: agent, cluster receiver, and gateway (optional).

For use cases about the different components, see the GitHub documentation :new-page:`Splunk OpenTelemetry Collector Helm Chart Components: Use Cases <https://github.com/jvoravong/splunk-otel-collector-chart/blob/Feature-components-doc/docs/components.md#use-cases>`.

Agent component
------------------------------------------------

The agent component is deployed to each node in the Kubernetes cluster as a DaemonSet, and monitors all the data sources within each node.

The agent component consists of the following config files:

* daemonset.yaml

  * Defines a DaemonSet to ensure that some (or all) nodes in the cluster run a copy of the agent pod.
  * Collects data from each node in the Kubernetes cluster.

* configmap-agent.yaml

  * Provides configuration data to the agent component.
  * Contains details about how the agent collects and forwards data.

* service-agent.yaml (optional)

  * Defines a Kubernetes Service for the agent.
  * Used for internal communication within the cluster or for exposing specific metrics or health endpoints.

Cluster receiver component
------------------------------------------------

The cluster receiver component runs as a single pod in the cluster created by a deployment, and collects data from a single location. Use this component in scenarios where telemetry data is available from a cluster-wide service or endpoint.

The cluster receiver component consists of the following config files:

* deployment-cluster-receiver.yaml

  * Defines a deployment to manage the replicated application for the cluster receiver.
  * Receives and processes data at the cluster level.

* configmap-cluster-receiver.yaml

  * Provides configuration data to the cluster receiver.
  * Contains details about how the receiver processes and forwards the data it collects.

* pdb-cluster-receiver.yaml

  * Defines a Pod Disruption Budget (PDB) for the cluster receiver.
  * Ensures that a certain number or percentage of replicas remain available during operations like node maintenance.

* service-cluster-receiver-stateful-set.yaml (optional)

  * Defines a Kubernetes service for the cluster receiver.
  * Associated with a StatefulSet and used for load balancing, internal communication, or exposing specific endpoints.

Gateway component (optional)
------------------------------------------------

The gateway component serves as an intermediary. It receives, processes, enriches, and forwards data, enhancing data exportation. Use it primarily in larger clusters to scale monitoring capabilities.

The gateway component consists of the following config files:

* deployment-gateway.yaml

  * Defines a Deployment for the gateway.
  * Processes and forwards data between the agents/receivers and external destinations.

* configmap-gateway.yaml

  * Provides configuration data to the gateway.
  * Contains details about how the gateway processes, transforms, and forwards the data it receives.

* service.yaml

  * Defines a Kubernetes Service for the gateway.
  * Used for internal communication within the cluster for accepting data from the agent or cluster receiver and forwarding it to the Splunk backend endpoint.

* pdb-gateway.yaml

  * Defines a Pod Disruption Budget (PDB) for the gateway.
  * Ensures that a certain number or percentage of replicas of the gateway remain available during voluntary disruptions.

.. _helm-chart-images:

Helm chart images
==============================================

Here's a list of the main chart binaries, images and dependencies available in Splunk Observability Cloud's GitHub. You can use them, for instance, in air gapped environments, push them manually to your own registry, and test them out.

Primary chart image
------------------------------------------------

* :new-page:`https://github.com/signalfx/splunk-otel-collector-chart/releases/download/splunk-otel-collector-X.X.X/splunk-otel-collector-X.X.X.tgz`

Optional subcharts
------------------------------------------------

* :new-page:`https://github.com/open-telemetry/opentelemetry-helm-charts/releases/download/opentelemetry-operator-X.X.X/opentelemetry-operator-X.X.X.tgz`

* :new-page:`https://github.com/cert-manager/cert-manager/archive/refs/tags/vX.X.X.tar.gz` 

Images used by default
------------------------------------------------

* :new-page:`quay.io/signalfx/splunk-otel-collector`

Optional add-on feature images
------------------------------------------------

* :new-page:`docker.io/splunk/fluentd-hec`
* :new-page:`quay.io/signalfx/splunk-otel-collector-windows`
* :new-page:`registry.access.redhat.com/ubi9/ubi`
* :new-page:`ghcr.io/open-telemetry/opentelemetry-operator/opentelemetry-operator`
* :new-page:`quay.io/jetstack/cert-manager-controller`
* :new-page:`quay.io/jetstack/cert-manager-acmesolver`
* :new-page:`quay.io/jetstack/cert-manager-webhook`
* :new-page:`quay.io/jetstack/cert-manager-cainjector`
* :new-page:`quay.io/jetstack/cert-manager-ctl`
* :new-page:`ghcr.io/signalfx/splunk-otel-java/splunk-otel-java`
* :new-page:`ghcr.io/signalfx/splunk-otel-java/splunk-otel-js`
* :new-page:`ghcr.io/signalfx/splunk-otel-java/splunk-otel-dotnet`
* :new-page:`ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-go`
* :new-page:`ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-apache-httpd`
* :new-page:`ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-python`

