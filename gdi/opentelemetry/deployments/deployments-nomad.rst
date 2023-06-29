.. _deployments-nomad:

****************************
Nomad
****************************

.. meta::
      :description: Deploy the Splunk Observability Cloud OpenTelemetry Collector using Nomad.

Use the Nomad deployment orchestrator to create a job that provides a unified way to receive, process, and export metric and trace data for Splunk Observability Cloud.

.. note:: 
    
    Job files are provided as a reference only and are not intended for production use.

Get started
=======================
To run the job files, you need:

- Access to a Nomad cluster
- (Optional) Access to a Consul cluster

To start a local dev agent for Nomad and Consul:

1. Download the :new-page:`nomad binary file <https://www.nomadproject.io/downloads>` and the :new-page:`consul binary <https://www.consul.io/downloads>`. 
2. Run the following commands in two different terminals:
   
   .. code-block:: yaml

      $ nomad agent -dev -network-interface='{{ GetPrivateInterfaces | attr "name" }}'

      $ consul agent -dev

To deploy the Collector job on the Nomad cluster, set the environment variable in the Nomad job configuration, as shown in the following example:

.. code-block:: none

   env {
    SPLUNK_ACCESS_TOKEN = "<SPLUNK_ACCESS_TOKEN>"
    SPLUNK_REALM = "<SPLUNK_REALM>"
    SPLUNK_MEMORY_TOTAL_MIB = 2048
    // You can specify more environment variables to override default values.
   }

You can specify content in the :new-page:`template stanza <https://www.nomadproject.io/docs/job-specification/template>` if you want to use your own Collector configuration file, as shown in the following example:

.. code-block:: none

   template {
    data        = <<EOF
   # The following example shows how to set up your Collector configuration file.
   extensions:
     health_check: null
     zpages: null
   receivers:
     hostmetrics:
       collection_interval: 10s
       scrapers:
         cpu: null
         disk: null
         filesystem: null
         load: null
         memory: null
         network: null
         paging: null
         processes: null
   processors:
     batch: null
     memory_limiter:
       ballast_size_mib: ${SPLUNK_BALLAST_SIZE_MIB}
       check_interval: 2s
       limit_mib: ${SPLUNK_MEMORY_LIMIT_MIB}
   exporters:
     signalfx:
       access_token: ${SPLUNK_ACCESS_TOKEN}
       api_url: https://api.${SPLUNK_REALM}.signalfx.com
       correlation: null
       ingest_url: https://ingest.${SPLUNK_REALM}.signalfx.com
       sync_host_metadata: true
     logging:
       verbosity: detailed
   service:
     extensions:
     - health_check
     - zpages
     pipelines:
       metrics:
         exporters:
         - logging
         - signalfx
         processors:
         - memory_limiter
         - batch
         receivers:
         - hostmetrics
         - signalfx
   EOF
       destination = "local/config/otel-agent-config.yaml"
   }

Deployment modes
=============================================
Run the Collector as a gateway or as an agent. See :ref:`otel-deployment-mode` for more information.

Run the Collector as a gateway
-------------------------------------------
Run the Collector as a gateway by registering a service job, as shown in the following example:

.. code-block:: yaml

   $ git clone https://github.com/signalfx/splunk-otel-collector.git
   $ cd splunk-otel-collector/deployments/nomad
   $ nomad run otel-gateway.nomad

Use the ``service`` scheduler to schedule long lived services that should never go down. As such, the ``service`` scheduler ranks a large portion of the nodes that meet the job's constraints and selects the optimal node to place a task group on. 

Service jobs are intended to run until explicitly stopped by an operator. If a service task exits, it is considered a failure and handled according to the job's restart and reschedule stanzas.   

Run the Collector as an agent
-----------------------------------
Run the Collector as an agent by registering a system job, as shown in the following example:

.. code-block:: yaml

   $ git clone https://github.com/signalfx/splunk-otel-collector.git
   $ cd splunk-otel-collector/deployments/nomad
   $ nomad run otel-agent.nomad    

Use the ``system`` scheduler to register jobs that should be run on all clients that meet the job's constraints. The ``system`` scheduler is also invoked when clients join the cluster or transition into the ready state. This means that all registered system jobs are re-evaluated and their tasks are placed on the newly available nodes if the constraints are met.

The ``system`` scheduler type is useful for deploying and managing tasks that should be present on every node in the cluster. Since these tasks are managed by Nomad, they can take advantage of job updating, service discovery, and more.

Since Nomad 0.9, the system scheduler preempts eligible lower priority tasks running on a node if there isn't enough capacity to place a system job. See preemption for details on how tasks that get preempted are chosen.

Systems jobs are intended to run until explicitly stopped either by an operator or preemption. If a system task exits, it is considered a failure and handled according to the job's restart stanza; system jobs do not have rescheduling.
