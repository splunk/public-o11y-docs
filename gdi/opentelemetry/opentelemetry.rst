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
    
Use the Splunk Distribution of the OpenTelemetry Collector to receive, process, and export metric, trace, and log data and metadata for Splunk Observability Cloud.

Learn more about the Splunk Observability Cloud data model at :ref:`data-model`.

.. raw:: html

  <embed>
    <h2>How does the Collector work?<a name="collector-intro-how" class="headerlink" href="#collector-intro-how" title="Permalink to this headline">¶</a></h2>
  </embed>

The OpenTelemetry Collector is a tech-agnostic way to receive, process and export telemetry data.

After you've installed the Collector in your platform, update your config file to define the different Collector components (receivers, processors, and exporters) you want to use. However, receivers and exporters are not enabled until they are in a pipeline, as explained in the next paragraph. You can also add extensions that provide the OpenTelemetry Collector with additional functionality, such as diagnostics and health checks. Find the available components at :ref:`otel-components`.  

Next, you need to configure your service pipelines to determine how to process your data. In the pipelines section you tie together the receivers, processors and exporters, designing the path your data takes. Multiple pipelines can be defined, and a single receiver or exporter definition can be used in multiple pipelines. A single pipeline can also have multiple receivers or exporters within it. Learn more at :ref:`otel-data-processing`. 

.. raw:: html

  <embed>
    <h2>Understand the Collector distributions<a name="collector-distros" class="headerlink" href="#collector-distros" title="Permalink to this headline">¶</a></h2>
  </embed>
    
The OpenTelemetry Collector is an open-source project that has a core version and a contributions (Contrib) version. The core version provides receivers, processors, and exporters for general use. The Contrib version provides receivers, processors, and exporters for specific vendors and use cases. 

The Splunk Distribution of OpenTelemetry Collector is a distribution of the OpenTelemetry Collector. It sits on top of the Contrib version, and it bundles components from OpenTelemetry Core, OpenTelemetry Contrib, and other sources to provide data collection for multiple source platforms.  

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

.. raw:: html

  <embed>
    <h3>Why use the Splunk distribution of the Collector?<a name="collector-distros-splunk" class="headerlink" href="#collector-distros-splunk" title="Permalink to this headline">¶</a></h3>
  </embed>

.. caution::

  Splunk officially supports the Splunk Distribution of OpenTelemetry Collector. 
  Splunk only provides best-effort support for the upstream OpenTelemetry Collector. See :ref:`using-upstream-otel` for more information.

While Splunk Observability Cloud would work with any of the Collector versions as it's native OTel, Splunk can provide better support response for the Splunk distribution. Any changes to the Contrib or Base OpenTelemetry Collector are required to go through the open-source vetting process, which can take some time. If you use the Splunk version, updates and hot fixes are under Splunk control. Note that all major additions to the Splunk version of the Collector do eventually make their way into the Contrib version.

Also, the customizations in the Splunk distribution include these additional features:

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
  *   - Ports and endpoints
      - Check exposed ports to make sure your environment doesn't have conflicts and that firewalls are configured. You can change the ports in the Collector configuration. See :ref:`otel-exposed-endpoints`.

See also :ref:`otel-requirements` for information on:

* :ref:`otel-security`
* :ref:`otel-exposed-endpoints`
* :ref:`otel-sizing`
* :ref:`collector-architecture`

.. raw:: html

  <embed>
    <h2>Install and configure the Collector<a name="otel-intro-install" class="headerlink" href="#otel-intro-install" title="Permalink to this headline">¶</a></h2>
  </embed>

.. note::

  Check :ref:`migrate-from-sa-to-otel` to learn how to migrate your data from the SignalFx Smart Agent (deprecated) to the Collector.

.. raw:: html

  <embed>
    <h3>Deployment modes<a name="collector-intro-deploy" class="headerlink" href="#collector-intro-deploy" title="Permalink to this headline">¶</a></h3>
  </embed>

You can deploy the Collector in two modes: Host monitoring (agent) or data forwarding (gateway) mode:

* In host monitoring (agent) mode, the Collector runs with the application or on the same host as the application. 
* In data forwarding (gateway) mode, one or more Collectors run a standalone service, for example, a container or deployment. 

Learn more at :ref:`otel-deployment-mode`.

.. raw:: html

  <embed>
    <h3>Install the Collector<a name="collector-intro-install" class="headerlink" href="#collector-intro-install" title="Permalink to this headline">¶</a></h3>
  </embed>

Learn how to install, deploy, upgrade or uninstall the Collector in :ref:`otel-install-platform`. Or use :ref:`our guided install <collector-guided-install>`.

This distribution is supported on and packaged for a variety of platforms, including:

- Kubernetes: :ref:`Helm <helm-chart>` (recommended) and :ref:`YAML <resource-yaml-manifests>`.
- Linux: :ref:`installer script <linux-scripts>` (recommended), :ref:`Ansible <deployment-linux-ansible>`, :ref:`Puppet <deployment-linux-puppet>`, :ref:`Heroku <linux-heroku>`, and :ref:`manual <linux-manual>` (including DEB/RPM packages, Docker, and binary).
- Windows: :ref:`installer script <windows-script>` (recommended), :ref:`Ansible <deployment-windows-ansible>`, :ref:`Puppet <deployment-windows-puppet>`, and :ref:`manual <otel-install-windows-manual>` (including MSI with GUI and PowerShell).

After you've installed the Collector, see: 

* :ref:`otel-configuration`  
* :ref:`otel-configuration-ootb`
* :ref:`otel-other-configuration-sources`

.. _otel-monitoring:

.. raw:: html

  <embed>
    <h2>Monitor the Collector<a name="otel-monitoring" class="headerlink" href="#otel-monitoring" title="Permalink to this headline">¶</a></h2>
  </embed>

The default configuration automatically scrapes the Collector's own metrics and sends the data using the ``signalfx`` exporter. A built-in dashboard provides information about the health and status of Collector instances. In addition, logs are automatically collected for the Collector and Journald processes.

The Collector also offers a :ref:`zPages extension <zpages-extension>`, which provides live data about the Collector. zPages are useful for in-process diagnostics without having to depend on any back end to examine traces or metrics.

.. _otel-using:

.. raw:: html

  <embed>
    <h2>Available features for the Collector<a name="otel-using" class="headerlink" href="#otel-using" title="Permalink to this headline">¶</a></h2>
  </embed>

See the features available for the Collector:

* See how to perform common actions and tasks with the Collector at :ref:`collector-how-to`. For example, learn how to :ref:`collector-remove-data` to strip data out of your telemetry, including PII.
* Learn about the discovery mode to detect metrics. See :ref:`discovery_mode`.
* Activate auto-instrumentation so that the Collector can automatically grab traces from your application, and add metrics for certain types of calls. See :ref:`zero-config`.

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


