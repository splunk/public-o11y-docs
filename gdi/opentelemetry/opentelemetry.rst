.. _otel-intro:

*******************************************************************************************
Get started with the Splunk Distribution of the OpenTelemetry Collector
*******************************************************************************************

.. meta::
    :description: Install and configure the Splunk Distribution of OpenTelemetry Collector to receive, process, and export metric, trace, and log data for Splunk Observability Cloud. Splunk Observability Cloud offers a guided setup to install the Splunk Distribution of OpenTelemetry Collector. 

.. toctree::
    :maxdepth: 5
    :hidden:

    Migrate from the Smart Agent to the Collector <smart-agent-migration-to-otel-collector.rst>
    otel-requirements.rst
    components.rst
    install-the-collector.rst
    configure-the-collector.rst
    collector-how-to.rst
    Zero config auto instrumentation <zero-config.rst>
    Discover metric sources automatically <discovery-mode.rst>
    Use the Universal Forwarder <collector-with-the-uf.rst>
    Troubleshooting <troubleshooting.rst>
    Commands reference <otel-commands.rst>
    
Use the OpenTelemetry Collector to receive, process, and export metric, trace, and log data for Splunk Observability Cloud.

The Collector uses pipelines to receive, process, and export trace data with components known as receivers, processors, and exporters. You can also add extensions that provide the OpenTelemetry Collector with additional functionality, such as diagnostics and health checks.

.. raw:: html

  <embed>
    <h2>Understand the Collector distributions<a name="collector-distros" class="headerlink" href="#collector-distros" title="Permalink to this headline">¶</a></h2>
  </embed>
    
The OpenTelemetry Collector has a core version and a contributions version. The core version provides receivers, processors, and exporters for general use. The contributions version provides receivers, processors, and exporters for specific vendors and use cases.

.. caution::

  Splunk officially supports the Splunk Distribution of OpenTelemetry Collector. 
  Splunk only provides best-effort support for the upstream OpenTelemetry Collector. See :ref:`using-upstream-otel` for more information.

The Splunk Distribution of OpenTelemetry Collector is a distribution of the OpenTelemetry Collector. The distribution is a project that bundles components from OpenTelemetry Core, OpenTelemetry Contrib, and other sources to provide data collection for multiple source platforms. 

.. mermaid::

  flowchart LR
    subgraph "\nSplunk Distribution of OpenTelemetry Collector"
    receivers
    processors
    exporters
    extensions
    end

    Infrastructure -- "metrics, logs" --> receivers
    B[Back-end services] -- "traces, metrics, logs" --> receivers
    C[Front-end experiences] -- "traces" --> S[Splunk Observability Cloud]

    receivers --> processors
    processors --> exporters

    exporters --> S[Splunk Observability Cloud]
    exporters --> P[Splunk Cloud Platform]

The customizations in the Splunk distribution include these features:

* Better defaults for Splunk products
* Discovery mode for metric sources
* Zero configuration auto instrumentation
* Fluentd for log capture, deactivated by default
* Tools to support migration from SignalFx products

.. _otel-intro-resources:

.. raw:: html

  <embed>
    <h2>Resources and other requirements<a name="otel-intro-resources" class="headerlink" href="#otel-intro-resources" title="Permalink to this headline">¶</a></h2>
  </embed>

The following table describes everything you need to start using the Collector:

.. list-table::
  :widths: 25 75
  :header-rows: 1

  *   - Resource
      - Description
  *   - Access token
      - Use an access token to track and manage your resource usage. Where you see ``<access_token>``, replace it with the name of your access token. See :ref:`admin-org-tokens`.
  *   - Realm
      - A realm is a self-contained deployment that hosts organizations. You can find your realm name on your profile page in the user interface. Where you see ``<REALM>``, replace it with the name of your organization's realm. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.   
  *   - Host monitoring (agent) or data forwarding (gateway) mode
      - In host monitoring (agent) mode, the Collector runs with the application or on the same host as the application. In data forwarding (gateway) mode, one or more Collectors run a standalone service, for example, a container or deployment. See :ref:`otel-deployment-mode`.
  *   - Ports and endpoints
      - Check exposed ports to make sure your environment doesn't have conflicts and that firewalls are configured. You can change the ports in the Collector configuration. See :ref:`otel-exposed-endpoints`.

See also :ref:`otel-requirements`.

.. raw:: html

  <embed>
    <h2>Install and configure the Collector<a name="otel-intro-install" class="headerlink" href="#otel-intro-install" title="Permalink to this headline">¶</a></h2>
  </embed>

.. note::

  Check :ref:`migrate-from-sa-to-otel` to learn how to migrate your data from the SignalFx Smart Agent (deprecated) to the Collector.

Learn how to install, deploy, upgrade or uninstall the Collector in :ref:`otel-install-platform`. Or use :ref:`our guided install <collector-guided-install>`.

This distribution is supported on and packaged for a variety of platforms, including:

- Kubernetes: :ref:`Helm <helm-chart>` (recommended) and :ref:`YAML <resource-yaml-manifests>`.
- Linux: :ref:`installer script <linux-scripts>` (recommended), :ref:`Ansible <deployment-linux-ansible>`, :ref:`Puppet <deployment-linux-puppet>`, :ref:`Heroku <linux-heroku>`, and :ref:`manual <linux-manual>` (including DEB/RPM packages, Docker, and binary).
- Windows: :ref:`installer script <windows-script>` (recommended), :ref:`Ansible <deployment-windows-ansible>`, :ref:`Puppet <deployment-windows-puppet>`, and :ref:`manual <otel-install-windows-manual>` (including MSI with GUI and PowerShell).

After you've installed the Collector, see: 

* :ref:`otel-configuration`  
* :ref:`otel-other-configuration-sources`
* :ref:`otel-components` 

.. _otel-monitoring:

.. raw:: html

  <embed>
    <h2>Monitor the Collector<a name="otel-monitoring" class="headerlink" href="#otel-monitoring" title="Permalink to this headline">¶</a></h2>
  </embed>

The default configuration automatically scrapes the Collector's own metrics and sends the data using the ``signalfx`` exporter. A built-in dashboard provides information about the health and status of Collector instances. In addition, logs are automatically collected for the Collector and Journald processes.

The Collector also offers a :new-page:`zPages extension <https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md>`, which provides live data about the Collector. zPages are useful for in-process diagnostics without having to depend on any back end to examine traces or metrics.

.. _otel-using:

.. raw:: html

  <embed>
    <h2>Available features for the Collector<a name="otel-using" class="headerlink" href="#otel-using" title="Permalink to this headline">¶</a></h2>
  </embed>

See the features available for the Collector:

* See how to perform common actions and tasks with the Collector at :ref:`collector-how-to`. For example, learn how to :ref:`collector-remove-data` to strip data out of your telemetry, including PII.
* Learn about the discovery mode to detect metrics. See :ref:`discovery_mode`.
* Activate auto-instrumentation. See :ref:`zero-config`.

For more information:

- :ref:`otel-troubleshooting`. Try these troubleshooting techniques and learn how to open a support request.
- Read :ref:`otel-collector-scenario`.

.. _otel-intro-enterprise:

.. raw:: html

  <embed>
    <h2>Use the Collector to send data to Splunk Enterprise<a name="otel-intro-enterprise" class="headerlink" href="#otel-intro-enterprise" title="Permalink to this headline">¶</a></h2>
  </embed>

If you want to send data to Splunk Enterprise using the Collector, the following applies:

* For Kubernetes, Splunk Enterprise supports receiving metrics and logs from the Collector. Trace collection is not supported.
* For Linux and Windows environments (physical hosts and virtual machines), Splunk Enterprise is not compatible with the Collector. Instead, use the Universal Forwarder to send metrics, traces, and logs to the Splunk platform. See more at :ref:`collector-with-the-uf`.


