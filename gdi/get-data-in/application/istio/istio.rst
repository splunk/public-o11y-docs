.. _get-started-istio:

************************************************************
Send traces from Istio to Splunk Observability Cloud
************************************************************

.. meta::
   :description: Start sending back-end application metrics and spans to Splunk Observability Cloud.

Istio instrumentation allows...  Native support... Send data to O11y Cloud...

SignalFx Istio Mixer Adapter is deprecated...

Requirements
==============================

Istio 1.8 and higher
Set B3 context propagation using...
Splunk OpenTelemetry Collector for Kubernetes in agent mode

NOTE: Does not support OpenCensus

Install and configure the Splunk OpenTelemetry Collector
=============================================================

To get started, deploy the Splunk OpenTelemetry Connector for Kubernetes (only agent-mode is required). The components required from the Connector depend on product entitlements and the desired data to be collected.

The only required configuration for istio starting from the chart version 0.29.1 is autodetect.istio=true, which cat be added as --set autodetect.istio=true to helm install/upgrade command or added to user’s values.yaml file (passed with -f myvalues.yaml argument) as:
autodetect:
  istio: true
   
Importantly, when Istio sends telemetry to the collector that communication itself needs to not generate telemetry. There are a few ways to ensure this:


Run the collector in its own namespace that is not annotated to automatically inject the Istio proxy.
Specifically add a label to the collector pods to prevent the Istio proxy being injected. Default configuration if autodatect.istio=true
If the Istio proxy is required for collector pods, then make sure to disable tracing specifically for the collector pods. E.g.
...
otelK8sClusterReceiver:
  podAnnotations:
    proxy.istio.io/config: '{"tracing":{}}'
otelCollector:
  podAnnotations:
    proxy.istio.io/config: '{"tracing":{}}'

Note that the agent pod is a DaemonSet and is by default not injected with a proxy. If proxies are injected on agent pods then tracing should be disabled using a podAnnotation.

Configure the Istio Operator
==============================================

Next, create or update the existing Istio Operator configuration.
If desired, set environment.deployment
Use the Zipkin tracer and configure it to send to the Splunk OpenTelemetry Collector agent running on the host.

$ cat <<EOF > ./tracing.yaml
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
spec:
  meshConfig:
    # Requires Splunk Log Observer entitlement or can be disabled
    accessLogFile: /dev/stdout
    # Requires Splunk APM entitlement or should be disabled
    enableTracing: true
    defaultConfig:
      tracing:
        max_path_tag_length: 99999
        sampling: 100
        zipkin:
          address: $(HOST_IP):9411
        custom_tags:
          # Optional, but recommended
          #environment.deployment:
            #literal:
              #value: dev
EOF
$ istioctl install -f ./tracing.yaml

WARNING: In order for the new tracing configuration to take effect restart pods injected with Istio proxies.

Update all pods in the service mesh
===========================================

Update all pods that are in the Istio service mesh to include an app label. Istio uses this to define the Splunk service. Not setting this label will make it harder to see the proxy in relationship to your service.

As stated in the warnings above, your service will need to be configured to use B3 headers for tracing context propagation.

Recommendations
=========================================

Additional Information
These getting started settings include updates to the sampling rate and the maximum tag length for paths. Splunk APM is a full fidelity distributed tracing solution and all trace data should be included to ensure the best monitoring of your application.

        sampling: 100

If sampling is not set to 100 and applications are instrumented then some traces may have a root span from the Istio proxy and others will have a root span from the application due to the sampling configuration.

        max_path_tag_length: 99999

If this configuration parameter is not increased then it is likely that important identifying attributes will be truncated and will impact observability.

For more information on how to configure Istio see the Istio distributed tracing installation documentation.

.. include:: /_includes/troubleshooting-steps.rst