.. _gitlab:

GitLab
======

.. meta::
   :description: Use this Splunk Observability Cloud integration for the GitLab monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the
GitLab monitor type to monitor GitLab.

GitLab is bundled with Prometheus exporters, which can be configured to
export performance metrics of itself and of the bundled software that
GitLab depends on. These exporters publish Prometheus metrics at
endpoints that are scraped by this monitor type.

This integration allows you to monitor the following:

-  Gitaly and Gitaly Cluster: Gitaly is a git remote procedure call
   (RPC) service for handling all git calls made by GitLab. This monitor
   scrapes the Gitlab Gitaly git RPC server.
-  GitLab Runner: GitLab Runner can be monitored using Prometheus. See
   the GitLab Runner documentation on GitLab Docs for more information.
-  GitLab Sidekiq: It scrapes the Gitlab Sidekiq Prometheus Exporter.
-  GitLab Unicorn server: It comes with a Prometheus exporter. The IP
   address of the container or host needs to be allowed for the
   collector to access the endpoint. See the ``IP allowlist``
   documentation on GitLab Docs for more information.
-  GitLab Webservice: It provides the GitLab Rails webserver with two Webservice workers per pod.     
-  GitLab Workhorse: The GitLab service that handles slow HTTP requests.
   Workhorse includes a built-in Prometheus exporter that this monitor
   hits to gather metrics.

This monitor type is available on Kubernetes, Linux, and Windows using
GitLab version 9.3 or higher.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation.rst

Configure GitLab to monitor Prometheus endpoints
--------------------------------------------------------

Follow the instructions on :new-page:`Monitoring GitLab with Prometheus <https://docs.gitlab.com/ee/administration/monitoring/prometheus/index.html>` to configure the GitLab Prometheus exporters to expose metric endpoint targets. 

The following Prometheus endpoint targets are available:

.. list-table::
   :widths: 17 32 11 11
   :width: 100%
   :header-rows: 1

   - 
   
      - Monitor type
      - Reference
      - Default port
      - Standard path
   -

      - ``gitlab-exporter``
      - GitLab exporter
      - 9168
      - /metrics
   - 

      - ``gitlab-gitaly``
      - Gitaly and Gitaly Cluster
      - 9236
      - /metrics
   - 

      - ``gitlab-runner``
      - GitLab Runner
      - 9252
      - /metrics
   - 

      - ``gitlab-sidekiq``
      - GitLab SideKiq
      - 3807
      - /metrics
   - 

      - ``gitlab-unicorn``
      - GitLab Unicorn
      - 8080
      - /metrics
   - 

      - ``gitlab-webservice``
      - GitLab Webservice
      - 8083
      - /metrics
   - 

      - ``gitlab-workhorse``
      - GitLab Workhorse
      - 9229
      - /metrics
   - 

      - ``prometheus/nginx-vts``
      - Monitoring GitLab with Prometheus
      - 8060
      - /metrics
   - 

      - ``prometheus/node``
      - Node exporter
      - 9100
      - /metrics
   - 

      - ``prometheus/postgres``
      - PostgreSQL Server Exporter
      - 9187
      - /metrics
   - 

      - ``prometheus/prometheus``
      - Monitoring GitLab with Prometheus
      - 9090
      - /metrics
   - 

      - ``prometheus/redis``
      - Redis exporter
      - 9121
      - /metrics

Important notes
~~~~~~~~~~~~~~~~~~~~~~

* If you configue GitLab by editing ``/etc/gitlab/gitlab.rb``, run the command ``gitlab-ctl reconfigure`` for the changes to take effect.

* If you configue nginx by editing the file ``/var/opt/gitlab/nginx/conf/nginx-status.conf``, run the command ``gitlab-ctl restart``. 

  * Note that changes to the configuration file ``/var/opt/gitlab/nginx/conf/nginx-status.conf`` in particular are erased by subsequent runs of ``gitlab-ctl reconfigure`` because ``gitlab-ctl reconfigure`` restores the original configuration file.

* You need to configure GitLab Prometheus exporters, nginx, and GitLab Runner to accept requests from the host or Docker container of the OpenTelemetry Collector. 

Examples
~~~~~~~~~~~~~~~~~~~~~~

The following configuration in ``/etc/gitlab/gitlab.rb`` configures the GitLab Postgres Prometheus exporter to allow network connections on port ``9187`` from any IP address:

.. code-block:: yaml

      postgres_exporter['listen_address'] = '0.0.0.0:9187'

Or
   .. code-block:: yaml

      postgres_exporter['listen_address'] = ':9187'

The file ``/var/opt/gitlab/nginx/conf/nginx-status.conf`` configures nginx, and the ``location /metrics`` block shows metric-related configuration. Use the statement ``allow 172.17.0.0/16;`` to allow network connection in the ``172.17.0.0/16`` IP range, assuming that the IP address associated with the OpenTelemetry Collector is in that IP range.

.. code-block:: yaml

   server {
       ...
       location /metrics {
       ...
       allow 172.17.0.0/16;
       deny all;
       }
   }

The ``/etc/gitlab-runner/config.toml`` file configures GitLab Runner. To configure GitLab Runner's Prometheus metrics HTTP server to allow network connection on port ``9252`` from any IP address use:

.. code-block:: yaml

   listen_address = "0.0.0.0:9252"
   ...

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
     smartagent/gitlab:
       type: gitlab
       ... # Additional config

Next, add the services you want to monitor to the
``service.pipelines.metrics.receivers`` section of your configuration
file:

.. code-block:: yaml

   receivers:
     smartagent/gitlab-sidekiq:
       type: gitlab
       host: gitlab-webservice-default.default
       port: 3807
     smartagent/gitlab-workhorse:
       type: gitlab
       host: gitlab-webservice-default.default
       port: 9229

   # ... Other sections

   service:
     pipelines:
       metrics:
         receivers:
           - smartagent/gitlab-sidekiq
           - smartagent/gitlab-workhorse

   # ... Other sections

Configuration options
~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor:

.. list-table::
   :widths: 25 45 15 15
   :width: 100%   
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``httpTimeout``
      - no
      - ``int64``
      - HTTP timeout duration for both read and writes. This should be a
         duration string that is accepted by ParseDuration The default
         value is ``10s``.
   - 

      - ``username``
      - no
      - ``string``
      - Basic Auth username to use on each request, if any.
   - 

      - ``password``
      - no
      - ``string``
      - Basic Auth password to use on each request, if any.
   - 

      - ``useHTTPS``
      - no
      - ``bool``
      - If ``true``, the collector will connect to the server using
         HTTPS instead of plain HTTP. The default value is ``false``.
   - 

      - ``httpHeaders``
      - no
      - ``map of strings``
      - A map of HTTP header names to values. Comma-separated multiple
         values for the same message-header is supported.
   - 

      - ``skipVerify``
      - no
      - ``bool``
      - If ``useHTTPS`` is ``true`` and this option is also ``true``,
         the exporter's TLS cert will not be verified. The default value
         is ``false``.
   - 

      - ``caCertPath``
      - no
      - ``string``
      - Path to the CA cert that has signed the TLS cert, unnecessary if
         ``skipVerify`` is set to ``false``.
   - 

      - ``clientCertPath``
      - no
      - ``string``
      - Path to the client TLS cert to use for TLS required connections
   - 

      - ``clientKeyPath``
      - no
      - ``string``
      - Path to the client TLS key to use for TLS required connections
   - 

      - ``host``
      - **yes**
      - ``string``
      - Host of the exporter. ``gitlab-webservice-default.default`` by default
   - 

      - ``port``
      - **yes**
      - ``integer``
      - Port of the exporter
   - 

      - ``useServiceAccount``
      - no
      - ``bool``
      - Use pod service account to authenticate. The default value is
         ``false``.
   - 

      - ``metricPath``
      - no
      - ``string``
      - Path to the metrics endpoint on the exporter server, usually
         ``/metrics``, which is the default value.
   - 

      - ``sendAllMetrics``
      - no
      - ``bool``
      - Send all the metrics that come out of the Prometheus exporter
         without any filtering. This option has no effect when using the
         Prometheus exporter monitor directly since there is no built-in
         filtering, only when embedding it in other monitors. The
         default value is ``false``.

Metrics
-------

The following metrics are available for this integration.

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/gitlab/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
