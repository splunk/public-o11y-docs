(splunk-apm-exporter)=

Splunk APM
**************************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the Splunk APM exporter. See benefits, install, configuration, and traces

Description
-----------

The Splunk Distribution of OpenTelemetry Collector offers support for
the Splunk APM (SAPM) exporter. The SAPM exporter is in beta, but
breaking changes will not be introduced in a new release.

The SAPM exporter builds on the Jaeger protocol and adds additional
batching on top, which allows the Collector to export traces from
multiple nodes or services in a single batch. See `SAPM
protocol <https://github.com/signalfx/sapm-proto/>`__ for complete
details on the schema.

Review the Collector’s `security
documentation <https://docs.splunk.com/Observability/gdi/opentelemetry/security.html>`__,
which contains recommendations on securing sensitive information such as
the API key required by this exporter.

   **Note:** The SAPM exporter only collects trace data.

Benefits
--------

After you configure the integration, you can access these features:

-  View metrics using the built-in dashboard. For information about
   dashboards, see `View dashboards in Observability
   Cloud <https://docs.splunk.com/Observability/data-visualization/dashboards/view-dashboards.html#nav-View-dashboards>`__.
-  View a data-driven visualization of the physical servers, virtual
   machines, AWS instances, and other resources in your environment that
   are visible to Infrastructure Monitoring. For information about
   navigators, see `Splunk Infrastructure Monitoring
   navigators <https://docs.splunk.com/Observability/infrastructure/navigators/navigators.html#nav-Splunk-Infrastructure-Monitoring-navigators>`__.
-  Access Metric Finder and search for metrics sent by the monitor. For
   information about Metric Finder, see `Use the Metric
   Finder <https://docs.splunk.com/Observability/metrics-and-metadata/metrics-finder-metadata-catalog.html#use-the-metric-finder>`__.

Installation
------------

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   
   - :ref:`otel-install-windows`
   
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Configuration
-------------

Include the ``sapm`` exporter in the ``exporters``\ section of your
configuration file, as shown in the following example:

.. code:: yaml

   exporters:
     sapm:
       access_token: YOUR_ACCESS_TOKEN
       access_token_passthrough: true
       endpoint: https://ingest.YOUR_SIGNALFX_REALM.signalfx.com/v2/trace
       max_connections: 100
       num_workers: 8

   service:
     pipelines:
       # To complete the integration, include the exporter in a traces metrics pipeline. 
       traces:
           receivers: [nop]
           processors: [nop]
           exporters: [sapm]

Use the following extended example configuration to activate this
exporter in the Collector:

.. code:: yaml

   receivers:
     nop:

   processors:
     nop:

   exporters:
     sapm:
     sapm/customname:

       # Endpoint is the destination to where traces are sent in SAPM format.
       # The endpoint must be a full URL and include the scheme, port, and path. 
       # For example, ``https://ingest.us0.signalfx.com/v2/trace``
       endpoint: test-endpoint

       # AccessToken is the authentication token provided by Splunk Infrastructure Monitoring.
       access_token: abcd1234

       # NumWorkers is the number of workers that should be used to export traces.
       # The exporter can make as many requests in parallel as the number of workers.
       num_workers: 3

       # MaxConnections is used to set a limit to the maximum idle HTTP connection the exporter can keep open.
       max_connections: 45

       access_token_passthrough: false
       # The option to use the ``com.splunk.signalfx.access_token`` trace resource attribute, if any, as the 
       # access  token. In either case, this attribute is deleted during final translation. Use this option 
       # with an identical configuration option for the SAPM receiver to preserve trace origin. The default 
       # value is ``true``

       timeout: 10s
       # The timeout for every attempt to send data to the back end.
       # The default value is ``5s``.
       sending_queue:
         enabled: true
         num_consumers: 2
         queue_size: 10
       retry_on_failure:
         enabled: true
         initial_interval: 10s
         max_interval: 60s
         max_elapsed_time: 10m

   service:
     pipelines:
       # To complete the integration, include the exporter in a traces metrics pipeline. 
       traces:
           receivers: [nop]
           processors: [nop]
           exporters: [sapm]

Configuration options
~~~~~~~~~~~~~~~~~~~~~

The following table shows the required and optional configuration
options:

.. list-table::
   :widths: 24 24 24
   :header-rows: 1

   - 

      - Option
      - Description
      - Required
   - 

      - ``access_token``
      - The authentication token provided by Splunk Infrastructure
         Monitoring or another backend that supports the SAPM protocol.
         See `Create and manage authentication tokens using Splunk
         Observability
         Cloud <https://docs.splunk.com/Observability/admin/authentication-tokens/tokens.html>`__.
         There is no default value.
      - Yes
   - 

      - ``endpoint``
      - The destination to where traces are sent in SAPM format. The
         endpoint must be a full URL and include the scheme, port, and
         path. For example,
         ``https://ingest.us0.signalfx.com/v2/trace``. The endpoint can
         be to the Splunk Infrastructure Monitoring backend or to
         another data collection agent that has the SAPM receiver
         enabled. There is no default value.
      - Yes
   - 

      - ``max_connections``
      - Used to set a limit to the maximum idle HTTP connection the
         exporter can keep open. The default value is ``100``.
      - No
   - 

      - ``num_workers``
      - The number of workers that should be used to export traces. The
         exporter can make as many requests in parallel as the number of
         workers. Note that this option may be removed in a future
         release. The default value is ``8``.
      - No
   - 

      - ``access_token_passthrough``
      - The option to use the ``com.splunk.signalfx.access_token`` trace
         resource attribute, if any, as the access token. In either
         case, this attribute is deleted during final translation. Use
         this option with an identical configuration option for the SAPM
         receiver to preserve trace origin. The default value is
         ``true``.
      - No
   - 

      - ``timeout``
      - The timeout for every attempt to send data to the back end. The
         default value is ``5s``.
      - No

Proxy support configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Collector provides proxy support for the SAPM exporter. Beyond the
standard YAML configuration, the SAPM exporter uses the net/http package
and the following proxy environment variables:

-  HTTP_PROXY
-  HTTPS_PROXY
-  NO_PROXY

Restart the Collector after adding these environment variables to your
configuration.

Get help
--------

.. include:: /_includes/troubleshooting.rst
