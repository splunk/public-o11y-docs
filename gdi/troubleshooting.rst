.. _gdi-troubleshooting:

*****************************************************************
Troubleshoot Related Content
*****************************************************************

.. meta created 2021-03-22
.. meta DOCS-2095

.. meta::
   :description: Ensure metadata keys are correct to enable full Related Content and Log Observer functionality.


Related Content, a powerful tool in Observability Cloud, allows you to jump across views of related data while automatically applying the same filters in the new view. You can use the Related Content bar to jump from Splunk APM to Splunk Log Observer to Splunk Infrastructure Monitoring with the same filters and context applied. 

The following table describes when and where in Observability Cloud you can see Related Content:

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Starting Point`
     - :strong:`Possible Destinations`

   * - Specific APM service
     - Kubernetes clusters filtered by service, AWS EC2s, GCP GCEs, Azure VMs, all log lines for the service

   * - Specific trace ID
     - Specific log line

   * - Specific cloud compute instance (AWS EC2, GCP GCE, Azure VM)
     - APM services, log lines for the specific instance

   * - Specific Kubernetes cluster, node, pod, container 
     - Log lines for that node

   * - Specific Kubernetes pod or container 
     - APM service in that pod/container, log lines for that pod/container

   * - Specific log line 
     - Specific APM service, specific trace, specific Kubernetes node/pod/container, specific compute instance (AWS EC2, GCP GCE, Azure VM)
     



Related Content relies on specific metadata keys that allow APM, Infrastructure Monitoring, and Log Observer to pass filters around the suite, allowing you to maintain context. This page explains which metadata keys you can and can't change in order to enable Related Content.

Splunk APM
=================================================================
To ensure full functionality of Related Content, do not change any of the metadata key names provided by Splunk Distribution of OpenTelemetry Collector. 

Splunk Distribution of OpenTelemetry Collector provides the following APM metadata keys that enable Related Content:

- service.name
- deployment.environment

Splunk Infrastructure Monitoring
=================================================================
To ensure full functionality of Related Content, do not change any of the metadata key names provided by Splunk Distribution of OpenTelemetry Collector. 

Splunk Distribution of OpenTelemetry Collector provides the following Infrastructure Monitoring metadata keys that enable Related Content:

- host.name
- k8s.cluster.name
- k8s.node.name
- k8s.pod.name
- container.id
- k8s.namespace.name
- kubernetes.workload.name

Splunk Log Observer
=================================================================
To ensure full functionality of both Log Observer and Related Content, confirm that your log events fields are correctly mapped.
Correct log field mappings enable built-in log filtering, embed logs in APM and
Infrastructure Monitoring functionality, and enable fast searches as well as the Related Content bar. 

If the following keys use different names in your log fields, transform them to these key names:

- severity 
- service.name
- deployment.environment
- host.name
- trace_id
- span_id

For example, if you do not see values for host.name in the Log Observer UI,
check to see whether your logs use a different field name, such as host_name.
If your logs do not contain the default field names exactly as they appear above,
transform your logs using a Field copy processor. See the :strong:`Field copy processors`
section in :ref:`logs-pipeline` to learn how.

Note that all logs must contain the field :strong:`severity`, which has values
:strong:`Debug`, :strong:`Error`, :strong:`Info`, :strong:`Unknown`, and
:strong:`Warning`. Because the :strong:`severity` field is frequently called
:strong:`level`,  Log Observer automatically remaps the log field :strong:`level`
to :strong:`severity`.

Methods of transforming log fields
--------------------------------------------------------------------------
The following table describes the three methods for remapping log fields to
transform your logs:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Remapping Method`
     - :strong:`Instructions`
        
   * - Observability Cloud Logs Pipeline Management
     - Create and apply a field copy processor. See the
       :strong:`Field copy processors` section in
       :ref:`logs-pipeline` to learn how.

   * - Client-side
     - Configure your app to remap the necessary fields.

   * - Collector-side
     - Use a Fluentd or FluentBit configuration. See
       :ref:`Configure Fluentd to send logs <fluentd>` to learn how.



Kubernetes log fields
--------------------------------------------------------------------------
Do not change the following fields, which Splunk Distribution of OpenTelemetry Collector injects into your Kubernetes logs:

- k8s.cluster.name
- k8s.node.name
- k8s.pod.name
- container.id
- k8s.namespace.name
- kubernetes.workload.name


.. _fluentd:

Configure Fluentd to send logs
--------------------------------------------------------------------------

If you already have Fluentd running in your environment, you can reconfigure it
to send logs to an additional output. To send logs to Splunk Observability Cloud
in addition to your current system, follow these steps:

1. Make sure that you have the HEC plugin for Fluentd installed.

:strong:`Option A`
Install the plugin and rebuild the Fluentd using
:new-page:`fluent-plugin-splunk-hec instructions <https://github.com/splunk/fluent-plugin-splunk-hec#installation>`.

:strong:`Option B`
Use an existing Fluentd docker image with HEC plugin included. To get this image, enter
`docker pull splunk/fluentd-hec`.

To learn more, see :new-page:`Fluentd docker image with HEC plugin included <https://hub.docker.com/r/splunk/fluentd-hec>`.

2. Add HEC output.
   Change your Fluentd configuration by adding another output section. The new HEC
   output section points to Splunk’s SignalFx Observability ingest endpoint.

   If, for example, you have one output to elasticsearch (the same applied to any other output), follow these steps:

   - Change type from @elasticsearch to @copy in the match section.
   - Put elasticsearch into the <store> block.
   - Add another <store> block for HEC output.


    The following is a sample of output to @elasticsearch:

    .. code-block:: bash

       <match **>
          @type elasticsearch
          ...
          <buffer>
          ...
          </buffer>
       </match>

    Change the @elasticsearch output to the following:

    .. code-block::

       <match **>
          @type copy
          <store>
            @type elasticsearch
            ...
            <buffer>
            ...
            </buffer>
          </store>
          <store>
            @type splunk_hec
            hec_host "ingest.<SIGNALFX_REALM>.signalfx.com"
            hec_port 443
            hec_token "<SIGNALFX_TOKEN>"
            ...
            <buffer>
            ...
            </buffer>
          </store>
       </match>

    In the new <store> section for splunk_hec, provide at least the following fields:

    ``Instructions hec_host`` - HEC ingest host (for example, ``ingest.us1.signalfx.com hec_port``) - Set to 443.
    
    ``hec_token`` - SignalFx access token.


    Specify the following parameters:

    ``sourcetype_key`` or ``sourcetype`` - Defines source type of logs by using a particular log field or static value.
    
    ``source_key`` or ``source`` - Defines source of logs by using a particular log field or static value.

    Set up a buffer configuration for HEC output. The following is an example using memory buffer:

    .. code-block::

       <buffer>
         @type memory
         chunk_limit_records 100000
         chunk_limit_size 200k
         flush_interval 2s
         flush_thread_count 1
         overflow_action block
         retry_max_times 10
         total_limit_size 600m
       </buffer>

    See :new-page:`About buffer <https://github.com/splunk/fluent-plugin-splunk-hec#about-buffer>`
    for more details on buffer configuration.

    See :new-page:`HEC exporter documentation <https://github.com/splunk/fluent-plugin-splunk-hec#parameters-for-both-splunk_hec-and-splunk_ingest_api>`
    to learn about other optional fields that are helpful.

Using Observability Collector for Kubernetes
----------------------------------------------------------------------------

For Kubernetes environments, instead of changing existing fluentd configuration, you can install a pre-configured agent provided as a helm chart. It goes with a pre-configured Fluentd agent and OpenTelemetry collector for collecting logs, metrics, and traces with all metadata relevant to Kubernetes.

To view the :new-page:`Observability Collector for Kubernetes helm chart <https://github.com/signalfx/o11y-collector-for-kubernetes>`,
request access from support.